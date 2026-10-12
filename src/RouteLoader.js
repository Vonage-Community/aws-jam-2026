import { Router } from 'express';
import glob from 'fast-glob';
import fs from 'fs';
import path from 'path';
import { applyWs } from './services/App.js';

const BASE_DIR = path.dirname('..');

export default async function RouteLoader(globPattern) {
    let router = Router();
    applyWs(router);
    let files = [];
    try {
        files = await glob(globPattern, {cwd: BASE_DIR});
    } catch (error) {
        console.error(error);
    }

    for (const file of files) {
        if (fs.statSync(file).isFile() && path.extname(file).toLowerCase() === '.js') {
            try {
                const routeModule = await import((path.resolve(file)));
                router = (routeModule.default || routeModule)(router);
            } catch (e) {
                throw new Error(`Error when loading route file: ${file} [ ${e.toString()} ]`);
            }
        }
    }

    return router;
}

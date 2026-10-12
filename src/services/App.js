import expressWs from 'express-ws';
import express from 'express';

const instance = expressWs(express());
const { app, getWss } = instance;

export function getApp() {
    return app;
}

export function getWebsocket() {
    return getWss();
}

// Express 5 changed Router internals, so express-ws can no longer monkeypatch
// `.ws` onto the global Router factory. Apply it to each router instance instead.
export function applyWs(router) {
    instance.applyTo(router);
    return router;
}
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({ region: 'us-west-2' });

export async function getSecret(SecretId) {
    try {
        const data = await client.send(new GetSecretValueCommand({ SecretId }));

        if (data.SecretString) {
            return JSON.parse(data.SecretString);
        }

        console.error(`aws: Secret was not a string, check value - ${SecretId}`);
        throw new Error(`Secret value was not a string`);
    } catch (error) {
        console.error(`aws: Error fetching secret: ${SecretId}`);
        throw error;
    }
}

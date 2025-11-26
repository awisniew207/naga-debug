
import { createAuthManager, storagePlugins } from "@lit-protocol/auth";
import { litClient } from "./lit-client.js";
import { authData, pkpPublicKey } from "./account.js";

export const authManager = createAuthManager({
    storage: storagePlugins.localStorageNode({
        appName: "my-node-app",
        networkName: "naga-test",
        storagePath: "./lit-auth-storage",
    }),
});

export const authContext = await authManager.createPkpAuthContext({
    authData: authData,
    pkpPublicKey: pkpPublicKey,
    authConfig: {
        resources: [
            ["pkp-signing", "*"],
            ["lit-action-execution", "*"],
        ],
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        statement: "",
        domain: "localhost",
    },
    litClient: litClient,
});
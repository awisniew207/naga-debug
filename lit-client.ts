import { nagaDev, nagaTest } from "@lit-protocol/networks";
import { createLitClient } from "@lit-protocol/lit-client";

export const litClient = await createLitClient({
    network: nagaTest,
});
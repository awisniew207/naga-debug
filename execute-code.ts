import { authContext } from "./lit-auth.js";
import { litClient } from "./lit-client.js";
import { account, authData, pkpPublicKey } from "./account.js";

console.log('='.repeat(60));
console.log('🚀 Executing Lit Action Code');
console.log('='.repeat(60));

console.log('\n📋 Configuration:');
console.log(`  Account Address: ${account.address}`);
console.log(`  PKP Public Key: ${pkpPublicKey}`);
console.log(`  Auth Method Type: ${authData.authMethodType}`);
console.log(`  Auth Method ID: ${authData.authMethodId}`);
console.log(`  Network: naga-test (Lit Protocol Testnet)`);

console.log('\n📝 Lit Action Code:');
const litActionCode = `(async () => {
    const { pubkey, username, password } = jsParams;
    console.log(\`Username: \${username}, Password: \${password}\`);
    console.log(\`1 + 1 = \${1 + 1}\`);
  
    // Sign a message with the PKP
  })();`;
console.log(litActionCode);

console.log('\n📦 JS Parameters:');
console.log(`  pubkey: ${pkpPublicKey}`);
console.log(`  username: alice`);
console.log(`  password: password`);

console.log('\n⚡ Executing...\n');

// Execute Lit Action with custom code
const result = await litClient.executeJs({
    code: litActionCode,
    authContext: authContext,
    jsParams: {
        pubkey: pkpPublicKey,
        username: "alice",
        password: "password",
    },
});

console.log('\n✅ Execution Result:');
console.log(result);
console.log('\n' + '='.repeat(60));
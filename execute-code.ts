import { authContext } from "./lit-auth.js";
import { litClient } from "./lit-client.js";
import { account, authData, pkpPublicKey, pkpEthAddress } from "./account.js";

console.log('='.repeat(60));
console.log('🚀 Executing Lit Action Code');
console.log('='.repeat(60));

console.log('\n📋 Configuration:');
console.log(`  Account Address: ${account.address}`);
console.log(`  PKP Public Key: ${pkpPublicKey}`);
console.log(`  PKP ETH Address: ${pkpEthAddress}`);
console.log(`  Auth Method Type: ${authData.authMethodType}`);
console.log(`  Auth Method ID: ${authData.authMethodId}`);
console.log(`  Network: naga-test (Lit Protocol Testnet)`);

// Fund the PKP before executing code
console.log('\n💰 Funding PKP...');
const paymentManager = await litClient.getPaymentManager({
    account
});

const fundingResult = await paymentManager.depositForUser({
    amountInEth: '1',
    userAddress: pkpEthAddress!,
});

// Verify transaction was confirmed
if (!fundingResult.receipt) {
    throw new Error('Transaction was not confirmed - no receipt received');
}

if (fundingResult.receipt.status !== 'success') {
    throw new Error(`Transaction failed with status: ${fundingResult.receipt.status}`);
}

console.log(`  ✅ Funding transaction confirmed!`);
console.log(`  Transaction Hash: ${fundingResult.hash}`);
console.log(`  Block Number: ${fundingResult.receipt.blockNumber}`);
console.log(`  Gas Used: ${fundingResult.receipt.gasUsed}`);

// Check balance after funding
console.log('\n💵 Checking balance...');
const balance = await paymentManager.getBalance({
    userAddress: pkpEthAddress!
});
console.log(`  PKP Balance:`, balance);

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
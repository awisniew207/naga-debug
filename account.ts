import { ViemAccountAuthenticator } from '@lit-protocol/auth';
import 'dotenv/config';
import { Hex } from 'viem';
// 1. import the privateKeyToAccount function from viem/accounts
import { privateKeyToAccount } from 'viem/accounts';

// Validate and normalize PRIVATE_KEY
const privateKeyRaw = process.env.PRIVATE_KEY;
if (!privateKeyRaw) {
    throw new Error('PRIVATE_KEY environment variable is not set');
}

const privateKey = (privateKeyRaw.startsWith('0x') ? privateKeyRaw : `0x${privateKeyRaw}`) as Hex;
if (!/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
    throw new Error('PRIVATE_KEY must be a valid 64-character hexadecimal string');
}

// 2. Convert your private key to a viem account object that can be used for payment operations.
export const account = privateKeyToAccount(privateKey);

export const authData = await ViemAccountAuthenticator.authenticate(account);

// Validate and normalize PUBKEY
const pubkeyRaw = process.env.PUBKEY;
if (!pubkeyRaw) {
    throw new Error('PUBKEY environment variable is not set');
}

const pubkey = (pubkeyRaw.startsWith('0x') ? pubkeyRaw : `0x${pubkeyRaw}`) as Hex;
if (!/^0x[0-9a-fA-F]{130}$/.test(pubkey)) {
    throw new Error('PUBKEY must be a valid 130-character hexadecimal string (0x + 128 hex chars)');
}

export const pkpPublicKey = pubkey;
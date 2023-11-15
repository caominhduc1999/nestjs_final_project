import * as crypto from 'crypto';
import { promisify } from 'util';

export async function pbkdf2(secret: string, salt?: string) {
    const saltBuffer = salt ? Buffer.from(salt, 'hex') : await promisify(crypto.randomBytes)(32);
    const derivedKey = await promisify(crypto.pbkdf2)(secret, saltBuffer, 100_000, 32, 'sha256');
  
    return saltBuffer.toString('hex') + '::' + derivedKey.toString('hex');
}

/** Compate a hash from "hashPbkdf2" to a input secret. Extracts the salt from the hash. */
export async function comparePbkdf2(input: string, hash: string): Promise<boolean> {
    const inputBuffer = Buffer.from(await pbkdf2(input, getSaltFromPbkdf2(hash)));
    const hashBuffer = Buffer.from(hash);
    return crypto.timingSafeEqual(inputBuffer, hashBuffer);
}

/** Extract the salt from a hash created with the "hashPbkdf2" method */
function getSaltFromPbkdf2(hash: string): string {
    return hash.split('::')[0];
}
  
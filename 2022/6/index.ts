import { readFileSync } from 'fs';

const input = readFileSync("./input.txt").toString();

function find(length: number): number {
    for (let idx = 0; idx < input.length - length; idx++) {
        let chars = input.substring(idx, idx + length);
        if(new Set(chars.split('')).size == length) {
            return idx + length
        }
    }
    return -1;
}

console.log(`Start of packet: ${find(4)}`);
console.log(`Start of message: ${find(14)}`);
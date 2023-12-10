import { readFileSync } from 'fs';

const input = readFileSync("./input.txt").toString();

const histories = input.split('\r\n').map((str) => str.split(' ').map(Number));

function process(history: number[]): [ number, number ] {
    if(history.every((n) => n === 0)) return [ 0, 0 ];
    const sub: number[] = [];
    for (let i = 0; i < history.length - 1; i++) {
        sub.push(history[i + 1] - history[i]);
    }
    const n = process(sub);
    return [
        history[history.length - 1] + n[0],
        history[0] - n[1]
    ];
}

const processed = histories
    .map((history) => process(history));

console.log(`Part 1: ${processed.reduce((acc, n) => acc + n[0], 0)}`);
console.log(`Part 2: ${processed.reduce((acc, n) => acc + n[1], 0)}`);
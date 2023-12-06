import { readFileSync } from 'fs';

const input = readFileSync("./input.txt").toString();

const lines = input.split("\n");
const times = lines[0].substring(12).split(/\s+/).filter((v) => v !== '').map((str) => Number(str))
const distances = lines[1].substring(12).split(/\s+/).filter((v) => v !== '').map((str) => Number(str))

const possibilities: number[] = [];

for (let idx = 0; idx < times.length; idx++) {
    const time = times[idx];
    const distance = distances[idx];
    let possible = 0;

    for (let speed = 0; speed < time; speed++) {
        const left = time - speed;
        const d = speed * left;
        if(d > distance) {
            possible++;
        }
    }

    possibilities.push(possible);
}

console.log(`Part 1: ${possibilities.reduce((acc, n) => acc * n)}`);

const time = Number(lines[0].substring(12).split(/\s+/).filter((v) => v !== '').join(''));
const distance = Number(lines[1].substring(12).split(/\s+/).filter((v) => v !== '').join(''));
let possible = 0;

for (let speed = 0; speed < time; speed++) {
    const left = time - speed;
    const d = speed * left;
    if(d > distance) {
        possible++;
    }
}

console.log(`Part 2: ${possible}`);
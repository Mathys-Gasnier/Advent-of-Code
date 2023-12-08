import { readFileSync } from 'fs';

const input = readFileSync("./input.txt").toString();

const [ instructionsStr, mapStr ] = input.split('\n\n');

const instructions = instructionsStr.trim().split('').map((char) => char === 'L' ? 0 : 1);

const map: Record<string, [ string, string ]> = { };

for(const crossing of mapStr.split('\n')) {
    map[crossing.substring(0, 3)] = [
        crossing.substring(7, 10),
        crossing.substring(12, 15)
    ];
}

let where = 'AAA';
let idx = 0;
while(where !== 'ZZZ') {
    where = map[where][instructions[idx % instructions.length]];
    idx++;
}
console.log(`Part 1: ${idx}`);

let wheres = Object.keys(map).filter((c) => c.endsWith('A'));
idx = 0;
while(!wheres.map((c) => c.endsWith('Z')).reduce((acc, c) => acc && c)) {
    wheres = wheres.map((c) => map[c][instructions[idx % instructions.length]]);
    console.log(`Missing: ${wheres.length - wheres.filter((c) => c.endsWith('Z')).length}`)
    idx++;
}

console.log(`Part 2: ${idx}`);
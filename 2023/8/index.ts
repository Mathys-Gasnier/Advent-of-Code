import { readFileSync } from 'fs';

const input = readFileSync("./input.txt").toString();

const [ instructionsStr, mapStr ] = input.split('\r\n\r\n');

const instructions = instructionsStr.trim().split('').map((char) => char === 'L' ? 0 : 1);

const map: Record<string, [ string, string ]> = { };

for(const crossing of mapStr.split('\r\n')) {
    map[crossing.substring(0, 3)] = [
        crossing.substring(7, 10),
        crossing.substring(12, 15)
    ];
}

function indexFor(start: string): number {
    let where = start;
    let idx = 0;
    while(!where.endsWith('Z')) {
        where = map[where][instructions[idx % instructions.length]];
        idx++;
    }
    return idx;
}

console.log(`Part 1: ${indexFor('AAA')}`);

const starts = Object.keys(map).filter((c) => c.endsWith('A'));
const indexForStarts = starts.map((start) => indexFor(start));

function lcm(numbers: number[]) {
    const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
    const _lcm = (x: number, y: number): number => (x * y) / gcd(x, y);
    return [...numbers].reduce((a, b) => _lcm(a, b));
}

console.log(`Part 2: ${lcm(indexForStarts).toLocaleString('fullwide', { useGrouping: false })}`);

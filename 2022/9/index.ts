import { readFileSync } from 'fs';

const input = readFileSync("./input.txt").toString();

interface Position {
    x: number,
    y: number
}

const parts: Position[] = new Array(10).fill(null).map(() => ({
    x: 0,
    y: 0
} as Position))

const visitedPartOne: Set<string> = new Set();
const visitedPartTwo: Set<string> = new Set();

const instructions = input.split("\r\n");

function log() {
    visitedPartOne.add(`${parts[1].x.toFixed(0)} ${parts[1].y.toFixed(0)}`);
    visitedPartTwo.add(`${parts[9].x.toFixed(0)} ${parts[9].y.toFixed(0)}`);
}

function isTrailSafe(partIdx: number): boolean {
    const part = parts[partIdx];
    const trail = parts[partIdx + 1];
    if(!trail) return true;
    if(Math.abs(part.x - trail.x) <= 1 && Math.abs(part.y - trail.y) <= 1) return true;
    return false;
}

function trailFollow(partIdx: number) {
    
    const part = parts[partIdx];
    const trail = parts[partIdx + 1];

    if(!trail) return;

    trail.x += Math.sign(part.x - trail.x);
    trail.y += Math.sign(part.y - trail.y);

    log();

    if(!isTrailSafe(partIdx + 1)) trailFollow(partIdx + 1);
}

function move(direction: string) {
    
    if(direction === 'U') parts[0].y++;
    else if(direction === 'D') parts[0].y--;
    else if(direction === 'L') parts[0].x--;
    else if(direction === 'R') parts[0].x++;

    if(!isTrailSafe(0)) trailFollow(0);
}

log();

for (const instruction of instructions) {
    const [ direction, amountStr ] = instruction.split(" ");
    const amount = Number(amountStr);

    for (let idx = 0; idx < amount; idx++) {
        move(direction);
    }
}

console.log(`Part 1: ${visitedPartOne.size}`);
console.log(`Part 2: ${visitedPartTwo.size}`);

// 6081
// 2487
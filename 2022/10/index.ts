import { readFileSync } from 'fs';

const input = readFileSync("./input.txt").toString();

let X = 1;
let cycle = 0;
let total = 0;
const lines: string[] = [];
let CRTLine = "";

function doCycle() {
    cycle++;
    if((cycle + 20) % 40 == 0) {
        total += X * cycle;
    }
    CRTLine += CRTLine.length >= X - 1 && CRTLine.length <= X + 1 ? '#' : '.';
    if(cycle % 40 == 0) {
        lines.push(CRTLine);
        CRTLine = "";
    }
}
function add(V: number) {
    doCycle(); doCycle();
    X += V;
}

function noop() {
    doCycle();
}

const instructions = input.split("\r\n");

for(const instruction of instructions) {
    const splited = instruction.split(" ");

    if(splited[0] === 'noop') noop();
    else {
        add(Number(splited[1]));
    }
}

console.log(`Part 1: ${total}`);
console.log(`Part 2: \n${lines.join('\n')}`);
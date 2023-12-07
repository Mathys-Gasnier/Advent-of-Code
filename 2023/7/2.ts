
import { readFileSync } from 'fs';

const input = readFileSync("./input.txt").toString();

const cardPower = 'J23456789TQKA';

type Set = number[];

function quantify(str: string): number[] {
    const result: Record<number, number> = { };

    const jokers = (str.match(/J/g) ?? []).length;

    for (const char of str) {
        if(char === 'J') continue;
        result[cardPower.indexOf(char)] = (result[cardPower.indexOf(char)] ?? 0) + 1;
    }

    const quantities = Object.values(result).sort((a, b) => b - a);

    quantities[0] ??= 0;
    quantities[0] += jokers;

    return quantities.concat(str.split('').map((char) => cardPower.indexOf(char)));
}

function compareSet(a: Set, b: Set) {
    for (let i = 0; i < a.length; i++) {
        if(a[i] !== b[i]) {
            return a[i] - b[i];
        }
    }
    return 0;
}

const sets = input.split('\r\n').map((set) => {
    const [ played, bid ] = set.split(' ');

    const quantities = quantify(played);

    return { quantities, bid: Number(bid) };
}).sort((a, b) => compareSet(a.quantities, b.quantities));

console.log(`Part 2: ${sets.reduce((acc, set, idx) => acc + set.bid * (idx + 1), 0)}`);
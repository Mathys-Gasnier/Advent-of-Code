
import { readFileSync } from 'fs';

const input = readFileSync("./input.txt").toString();

const cardPower = '23456789TJQKA';

type Set = {
    played: string, bid: number, quantities: [string, number][]
}

enum HandType {
    Five, Four, Full, Three, Two, One, High
}

function quantify(str: string): [ string, number ][] {
    const result: Record<string, number> = {};

    for (const char of str) {
        result[char] = (result[char] ?? 0) + 1;
    }

    return Object.entries(result);
}

function kindOf(set: Set) {
    if(set.quantities.length == 1) return HandType.Five;
    if(set.quantities.find((q) => q[1] >= 4)) return HandType.Four;
    if(set.quantities.find((q) => q[1] >= 3) && set.quantities.find((q) => q[1] == 2)) return HandType.Full;
    if(set.quantities.find((q) => q[1] >= 3)) return HandType.Three;
    if(set.quantities.filter((q) => q[1] >= 2).length >= 2) return HandType.Two;
    if(set.quantities.find((q) => q[1] >= 2)) return HandType.One;
    return HandType.High;
}

function compareSet(a: Set, b: Set) {
    const kindA = kindOf(a);
    const kindB = kindOf(b);
    if(kindA != kindB) return kindB - kindA;
    
    for (let i = 0; i < a.played.length; i++) {
        const aCard = cardPower.indexOf(a.played[i]);
        const bCard = cardPower.indexOf(b.played[i]);
        if(aCard == bCard) continue;
        return aCard - bCard;
    }

    return 0
}

const sets = input.split('\r\n').map((set) => {
    const [ played, bid ] = set.split(' ');

    const quantities = quantify(played);

    return { played, bid: Number(bid), quantities };
}).sort(compareSet);

console.log(`Part 1: ${sets.reduce((acc, set, idx) => acc + set.bid * (idx + 1), 0)}`);
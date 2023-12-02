import { readFileSync } from 'fs';

const input = readFileSync("./input.txt").toString();

const trees = input.split('\r\n').map((line) => {
    return line.split('').map((height) => Number(height));
});

function get(x: number, y: number) {
    return trees[y][x];
}

function isVisible(x: number, y: number) {
    if(x == 0 || x == trees.length - 1 || y == 0 || y == trees.length - 1) return true;
    const height = get(x, y);
    let visible = true;
    for (let preX = 0; preX < x; preX++) {
        if(get(preX, y) >= height) visible = false;
    }
    if(visible) return true;
    visible = true;
    for (let postX = x + 1; postX < trees.length; postX++) {
        if(get(postX, y) >= height) visible = false;
    }
    if(visible) return true;
    visible = true;
    for (let preY = 0; preY < y; preY++) {
        if(get(x, preY) >= height) visible = false;
    }
    if(visible) return true;
    visible = true;
    for (let postY = y + 1; postY < trees.length; postY++) {
        if(get(x, postY) >= height) visible = false;
    }
    if(visible) return true;

    return false;
}

function scenicScore(x: number, y: number) {
    if(x == 0 || x == trees.length - 1 || y == 0 || y == trees.length - 1) return 0;
    let scenicScore = 0;
    const height = get(x, y);
    
    let tmp = 0;
    for (let preX = x - 1; preX >= 0; preX--) {
        tmp++;
        if(get(preX, y) >= height) {
            break;
        }
    }
    scenicScore = tmp;
    tmp = 0;
    
    for (let postX = x + 1; postX < trees.length; postX++) {
        tmp++;
        if(get(postX, y) >= height) {
            break;
        }
    }
    scenicScore *= tmp;
    tmp = 0;
    
    for (let preY = y - 1; preY >= 0; preY--) {
        tmp++;
        if(get(x, preY) >= height) {
            break;
        }
    }
    scenicScore *= tmp;
    tmp = 0;
    
    for (let postY = y + 1; postY < trees.length; postY++) {
        tmp++;
        if(get(x, postY) >= height) {
            break;
        }
    }
    scenicScore *= tmp;
    tmp = 0;

    return scenicScore;
}

const visibleTrees = trees.map((line, y) => {
    return line.map((_, x) => isVisible(x, y));
});

const totalVisible = visibleTrees.reduce((acc, line) => {
    return acc + line.reduce((acc, visible) => visible ? acc + 1 : acc, 0)
}, 0);

console.log(`Part 1: ${totalVisible}`);

const scenicScores = trees.map((line, y) => {
    return line.map((_, x) => scenicScore(x, y));
});

const bestScenicScore = scenicScores.map((line) => {
    return line.reduce((best, scenic) => scenic > best ? scenic : best, 0);
}).reduce((best, scenic) => scenic > best ? scenic : best, 0);

console.log(`Part 2: ${bestScenicScore}`);
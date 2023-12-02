import { readFileSync } from 'fs';

interface File {
    name: string,
    size: number
}

interface Folder {
    [key: string]: File | Folder
}

const input = readFileSync("./input.txt").toString();

const lines = input.split("\r\n");
let index = 0;

function peek() {
    if(index >= lines.length) return null;
    return lines[index];
}

function consume() {
    index++;
}

const fileSystem: Folder = {

};
let cwd = '/';

function putAt(name: string, fileOrFolder: File | Folder) {
    let f = fileSystem;
    for (const path of cwd.substring(1).split("/").filter((v) => v !== '')) {
        f = f[path] as Folder;
    }
    try {
        f[name] = fileOrFolder;
    }catch(e) {
        console.log("Caught error creating " + name);
        console.log(cwd);
        console.log(fileSystem);
        console.log(f);
        process.exit();
    }
}

function exists(name: string) {
    let f = fileSystem;
    for (const path of cwd.substring(1).split("/").filter((v) => v !== '')) {
        f = f[path] as Folder;
    }
    return name in f;
}

function cd(name: string) {
    if(!exists(name)) putAt(name, { });
    cwd += `/${name}`;
}

while(index < lines.length) {
    const line = lines[index];
    if(!line.startsWith("$ ")) throw new Error(line);
    const [ command, ...args ] = line.split("$ ")[1].split(" ");
    if(command === 'cd') {
        consume();
        const path = args[0];
        if(path == '/') cwd = '/';
        else if(path == '..') cwd = cwd.substring(0, cwd.lastIndexOf('/') - 1);
        else cd(`/${path}`);
    }else if(command === 'ls') {
        consume();
        while(peek() != null && !peek()!.startsWith("$")) {
            const line = peek()!;
            consume();
            const [ dirOrSize, name ] = line.split(" ");
            if(dirOrSize == "dir") putAt(name, { });
            else putAt(name, { name: name, size: Number(dirOrSize) });
        }
    }
}

function traverseFolderFiles(folder: Folder, fn: (file: File) => void) {
    Object.entries(folder).forEach(([ name, fileOrFolder ]) => {
        if('size' in fileOrFolder) {
            fn(fileOrFolder as File);
        }else {
            traverseFolderFiles(fileOrFolder, fn);
        }
    });
}

function traverseFolder(folder: Folder, fn: (folder: Folder) => void) {
    Object.entries(folder).forEach(([ name, fileOrFolder ]) => {
        if(!('size' in fileOrFolder)) {
            fn(fileOrFolder);
            traverseFolder(fileOrFolder, fn);
        }
    });
}

function size(folder: Folder) {
    let size = 0;

    traverseFolderFiles(folder, (file) => size += file.size);

    return size;
}

const foldersSize: number[] = [];

traverseFolder(fileSystem, (folder) => {
    foldersSize.push(size(folder));
});

let underTotal = foldersSize.filter((size) => size <= 100000).reduce((acc, size) => acc + size);

console.log(`Part 1: ${underTotal}`);

const unused = 70000000 - size(fileSystem);
const toFree = 30000000 - unused;

console.log(`Part 2: ${foldersSize.sort((a, b) => a - b).find((size) => size > toFree)}`);
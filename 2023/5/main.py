import sys

with open("input.txt") as file:
    content = file.read()

blocks = content.split("\n\n")

seeds = [
    int(seed) for seed in blocks[0][7:].split(" ")
]

seeds_ranged = []
for i in range(0, len(seeds), 2):
    seeds_ranged.append([ seeds[i], seeds[i+1] ])

maps = [
    
]

def parse_map(block):
    map = [
        [ int(n) for n in line.split(" ") ] for line in block.split("\n")[1:]
    ]
    maps.append(map)
        
for block in blocks[1:]:
    parse_map(block)

def pass_seed(seed):
    x = seed
    for map in maps:
        for r in map:
            if x >= r[1] and x < r[1] + r[2]:
                x = r[0] + (x - r[1])
                break
    return x

mini = sys.maxsize
for seed in seeds:
    position = pass_seed(seed)
    if position < mini:
        mini = position

print(f"Part 1: {mini}")

mini = sys.maxsize ** 100

def pass_seed_range(map, R):
    A = []
    for r in map:
        dest = r[0]
        src = r[1]
        src_end = r[1] + r[2]
        NR = []
        while R:
            start, size = R.pop()
            end = start + size
            before = [ start, min(end, src) ]
            inner = [ max(start, src), min(src_end, end) ]
            after = [ max(src_end, start), end ]
            if before[1] > before[0]:
                NR.append(before)
            elif inner[1] > inner[0]:
                A.append([ inner[0] - src + dest, inner[1] - src + dest ])
            elif after[1] > after[0]:
                NR.append(after)
    
        R = NR
        
    return A + R
    # i = seed[0]
    # while i < seed[0] + seed[1]:
    #     print(i)
    #     x = i
    #     i = -1
    #     for map in maps:
    #         for r in map:
    #             if x >= r[1] and x - r[1] < r[2]:
    #                 if i == -1:
    #                     i = r[1] + r[2]
    #                 x = x - r[1] + r[0]
    #                 break
    #     print(x)
    #     if x < min:
    #         min = x

part_2 = []
for seed_range in seeds_ranged:
    print(seed_range)
    R = [ seed_range ]
    for m in maps:
        R = pass_seed_range(m, R)
    
    print(R)
    part_2.append(min(ranges)[0])

print(f"Part 2: {min(part_2)}")
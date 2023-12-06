import sys
import threading

with open("input.txt") as file:
    content = file.read()

blocks = content.split("\n\n")

seeds = [
    int(seed) for seed in blocks[0][7:].split(" ")
]

seeds_ranged = []
for i in range(0, len(seeds), 2):
    seeds_ranged.append(range(seeds[i], seeds[i] + seeds[i+1]))

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

def pass_seed_range(seed_range, results, idx):
    m = sys.maxsize ** 100
    l = 0
    n = seed_range.stop - seed_range.start
    for seed in seed_range:
        if (seed - seed_range.start) / n > l + 0.05:
            l += 0.05
            print(f"{idx} thread is {round(l * 100)}% done")
        position = pass_seed(seed)
        if position < m:
            m = position
    
    results[idx] = m
    print(f"Thread {idx} finished")

part_2_threads = { }
part_2_results = { }
for idx, seed_range in enumerate(seeds_ranged):
    print(f"Started range: {seed_range} as idx {idx}")
    l = seed_range.stop - seed_range.start
    first_range = range(seed_range.start, seed_range.start + round(l / 2))
    first_thread = threading.Thread(target=pass_seed_range, args=(first_range, part_2_results, idx * 2))
    first_thread.start()
    part_2_threads[idx * 2] = first_thread
    
    second_range = range(seed_range.start + round(l / 2), seed_range.stop)
    second_thread = threading.Thread(target=pass_seed_range, args=(second_range, part_2_results, idx * 2 + 1))
    second_thread.start()
    part_2_threads[idx * 2 + 1] = second_thread

for idx, thread in part_2_threads.items():
    thread.join()

print(f"Part 2: {min(part_2_results.values())}")
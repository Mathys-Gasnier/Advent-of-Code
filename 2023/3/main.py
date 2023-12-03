

with open("input.txt") as file:
    content = file.read()

grid = content.split("\n")

def validate_cell(x, y):
    if y < 0 or y >= len(grid):
        return False
    if x < 0 or x >= len(grid[y]):
        return False
    return True

def check_around(x, y):
    neighbors_coordinate = [
        [ y, x+1],
        [ y, x-1],
        [ y+1, x],
        [ y-1, x],
        [ y+1, x+1],
        [ y-1, x+1],
        [ y+1, x-1],
        [ y-1, x-1]
    ]
    neighbors = [ [ union, grid[union[0]][union[1]] ] for union in neighbors_coordinate if validate_cell(union[1], union[0]) ]
    is_part = False
    adjacent = []
    for neighbor in neighbors:
        if not neighbor[1].isdigit() and neighbor[1] != '.':
            is_part = True
            adjacent.append(neighbor[0])
            break
    return (is_part, adjacent)

part_one_total = 0
part_two_gear = {}

for y in range(len(grid)):
    x = 0
    while x < len(grid[y]):
        char = grid[y][x]
        if not char.isdigit():
            x += 1
            continue
        number = ""
        is_part = False
        adjacent = []
        while validate_cell(x, y) and grid[y][x].isdigit():
            number += grid[y][x]
            if not is_part:
                around = check_around(x, y)
                is_part = around[0]
                adjacent.extend(around[1])
            x += 1
        
        if is_part:
            part_one_total += int(number)
        
        for a in adjacent:
            key = str(a[0]) + "," + str(a[1])
            if key in part_two_gear:
                part_two_gear[key].append(int(number))
            else:
                part_two_gear[key] = [int(number)]

print(f"Part 1: {part_one_total}")

part_two_total = 0
for part in part_two_gear:
    y, x = part.split(",")
    char = grid[int(y)][int(x)]
    if char == '*' and len(part_two_gear[part]) == 2:
        part_two_total += part_two_gear[part][0] * part_two_gear[part][1]

print(f"Part 2: {part_two_total}")

priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

with open("input.txt") as file:
    content = file.read()

lines = content.split("\n")

total = 0
for ruckstack_idx in range(len(lines) // 3):
    ruckstacks = lines[ruckstack_idx*3:ruckstack_idx*3+3]
    
    letter = [ char for char in ruckstacks[0] if char in ruckstacks[1] and char in ruckstacks[2] ]
    
    total += priority.index(letter[0]) + 1

print(total)
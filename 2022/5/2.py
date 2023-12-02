import re

with open("input.txt") as file:
    content = file.read()

start_stack, instructions = content.split("\n\n")

start_stacks = start_stack.split("\n")

stack_numbers = len(start_stacks[-1].split("   "))

stacks = [
    [] for _ in range(stack_numbers)
]

for crates in start_stacks[:-1]:
    for idx in range(stack_numbers):
        crate = crates[idx*4:idx*4+4]
        if crate.startswith("["):
            stacks[idx].append(crate[1:2])

for stack in stacks:
    stack.reverse()

def move(n, f, t):
    from_arr = stacks[f - 1][-n:]
    stacks[f - 1] = stacks[f - 1][:-n]
    stacks[t - 1].extend(from_arr)

regex = r"move (\d+) from (\d+) to (\d)"

for instruction in re.finditer(regex, instructions, re.MULTILINE):
    move(int(instruction[1]), int(instruction[2]), int(instruction[3]))

print("".join([ stack[-1] for stack in stacks ]))
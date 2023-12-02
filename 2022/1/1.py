
with open("input.txt") as file:
    content = file.read()

totals = []
for elf in content.split("\n\n"):
    total = 0
    for cal in elf.split("\n"):
        total += int(cal)
    totals.append(total)

totals.sort()
totals.reverse()

print("Part 1: " + str(totals[0]))
print("Part 2: " + str(totals[0] + totals[1] + totals[2]))
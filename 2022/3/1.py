
priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

with open("input.txt") as file:
    content = file.read()

total = 0
for ruckstack in content.split("\n"):
    firstpart, secondpart = ruckstack[:len(ruckstack)//2], ruckstack[len(ruckstack)//2:]
    
    letter = [ char for char in firstpart if char in secondpart ]
    
    total += priority.index(letter[0]) + 1

print(total)
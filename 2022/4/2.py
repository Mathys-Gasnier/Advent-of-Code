
with open("input.txt") as file:
    content = file.read()

def overlap(range1, range2):
    return range1.start in range2 or range1.stop in range2 or range2.start in range1 or range2.stop in range1 or (
        range1.start <= range2.start and range2.stop <= range1.stop or range2.start <= range1.start and range1.stop <= range2.stop
    )

total = 0
for pairs in content.split("\n"):
    pair_one, pair_two = pairs.split(',')
    
    pair_one_start, pair_one_end = pair_one.split("-")
    pair_one_range = range(int(pair_one_start), int(pair_one_end))
    pair_two_start, pair_two_end = pair_two.split("-")
    pair_two_range = range(int(pair_two_start), int(pair_two_end))
    
    if overlap(pair_one_range, pair_two_range):
        total += 1

print(total)

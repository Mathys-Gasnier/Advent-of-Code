
with open("input.txt") as file:
    content = file.read()

total = 0
for pairs in content.split("\n"):
    pair_one, pair_two = pairs.split(',')
    
    pair_one_start, pair_one_end = pair_one.split("-")
    pair_one_range = range(int(pair_one_start), int(pair_one_end))
    pair_two_start, pair_two_end = pair_two.split("-")
    pair_two_range = range(int(pair_two_start), int(pair_two_end))
    
    if pair_one_range.start <= pair_two_range.start and pair_two_range.stop <= pair_one_range.stop or pair_two_range.start <= pair_one_range.start and pair_one_range.stop <= pair_two_range.stop:
        total += 1

print(total)
    
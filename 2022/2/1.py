
with open("input.txt") as file:
    content = file.read()

win_map = {
    "A": {
        "X": 3,
        "Y": 6,
        "Z": 0
    },
    "B": {
        "X": 0,
        "Y": 3,
        "Z": 6
    },
    "C": {
        "X": 6,
        "Y": 0,
        "Z": 3
    }
}

play_value = {
    "X": 1,
    "Y": 2,
    "Z": 3
}

total = 0
for strategy in content.split("\n"):
    opponent = strategy.split(" ")[0]
    should = strategy.split(" ")[1]
    
    total += win_map[opponent][should] + play_value[should]

print(total)
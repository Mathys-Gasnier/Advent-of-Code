
with open("input.txt") as file:
    content = file.read()

win_map = {
    "A": {
        "X": "C",
        "Y": "A",
        "Z": "B"
    },
    "B": {
        "X": "A",
        "Y": "B",
        "Z": "C"
    },
    "C": {
        "X": "B",
        "Y": "C",
        "Z": "A"
    }
}

play_value = {
    "A": 1,
    "B": 2,
    "C": 3
}

outcome_value = {
    "X": 0,
    "Y": 3,
    "Z": 6
}

total = 0
for strategy in content.split("\n"):
    opponent = strategy.split(" ")[0]
    should = strategy.split(" ")[1]
    
    total += outcome_value[should] + play_value[win_map[opponent][should]]

print(total)
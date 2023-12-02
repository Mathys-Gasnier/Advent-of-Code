
with open("input.txt") as file:
    content = file.read()

total = 0
for game in content.split("\n"):
    game_id = game.split(":")[0].split(" ")[1]
    sets = game.split(": ")[1].split("; ")
    splited_set = [ set.split(", ") for set in sets ]
    numbers = [ [ splited.split(" ") for splited in set ] for set in splited_set ]
    
    max = {
        "red": 0,
        "green": 0,
        "blue": 0
    }
    for set in numbers:
        for union in set:
            if union[1] == "red" and int(union[0]) > max["red"]:
                max["red"] = int(union[0])
            elif union[1] == "green" and int(union[0]) > max["green"]:
                max["green"] = int(union[0])
            elif union[1] == "blue" and int(union[0]) > max["blue"]:
                max["blue"] = int(union[0])
    
    total += max["red"] * max["green"] * max["blue"]

print("total: " + str(total))
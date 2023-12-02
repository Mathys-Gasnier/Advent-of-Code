
with open("input.txt") as file:
    content = file.read()

total = 0
for game in content.split("\n"):
    game_id = game.split(":")[0].split(" ")[1]
    sets = game.split(": ")[1].split("; ")
    splited_set = [ set.split(", ") for set in sets ]
    numbers = [ [ splited.split(" ") for splited in set ] for set in splited_set ]
    
    not_possible = False
    for set in numbers:
        for union in set:
            if union[1] == "red" and int(union[0]) > 12:
                not_possible = True
            elif union[1] == "green" and int(union[0]) > 13:
                not_possible = True
            elif union[1] == "blue" and int(union[0]) > 14:
                not_possible = True
    
    if not not_possible:
        total += int(game_id)
    print(game_id + ": " + str(not_possible))

print("total: " + str(total))
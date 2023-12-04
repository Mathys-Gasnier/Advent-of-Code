
with open("input.txt") as file:
    content = file.read()

total = 0
for card_str in content.split("\n"):
    card = card_str[10:]
    winning_str, played_str = card.split(" | ")
    
    winning = [ int(win) for win in winning_str.split(" ") if win != "" ]
    played = [ int(win) for win in played_str.split(" ") if win != "" ]
    
    points = 0
    for play in played:
        if play in winning:
            if points == 0: points = 1
            else: points *= 2
    total += points

print(f"Part 1: {total}")

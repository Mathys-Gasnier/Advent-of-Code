
with open("input.txt") as file:
    content = file.read()

import re

regex = r"Card\s+(\d+)"

def parse_card(str):
    idx_str = re.search(regex, str)
    idx = int(idx_str.group(1))
    card = str[10:]
    winning_str, played_str = card.split(" | ")
    
    winning = [ int(win) for win in re.split(r"\s+", winning_str) if win != "" ]
    played = [ int(play) for play in re.split(r"\s+", played_str) if play != "" ]
    
    matching = []
    for play in played:
        if play in winning:
            matching.append(play)
    
    card = {
        "idx": idx,
        "winning": winning,
        "played": played,
        "matching": matching,
        "quantity": 1
    }
    
    return card

cards_str = content.split("\n")

cards = [ parse_card(card) for card in cards_str ]

for card in cards:
    for idx in range(card['idx'], card['idx'] + len(card['matching'])):
        if idx < len(cards):
            cards[idx]['quantity'] += card['quantity']    

total = 0
for card in cards:
    total += card['quantity']

print(f"Part 2: {total}")

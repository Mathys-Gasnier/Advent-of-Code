import re

digit_map = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
}

regex = r"^.*?(?P<first>\d|one|two|three|four|five|six|seven|eight|nine)(.*(?P<second>\d|one|two|three|four|five|six|seven|eight|nine).*$)?"

with open("input.txt") as file:
    content = file.read()
    
matches = re.finditer(regex, content, re.MULTILINE)

total = 0
for match in matches:
    total += int(digit_map[match.group("first")] + digit_map[(match.group("second") or match.group("first"))])
    
print(total)
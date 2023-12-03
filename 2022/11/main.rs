

#[derive(Debug, Clone)]
struct Monkey {
    idx: usize,
    items: Vec<usize>,
    operation: Operation,
    divisible_by: usize,
    if_true: usize,
    if_false: usize,
    activity: usize
}

impl Monkey {

    fn inspect(&self, worry_limiter: usize, modulo_product: usize, monkeys: &mut Vec<Monkey>) {
        for item in &self.items {
            let mut new_item = self.operation.exec(*item) / worry_limiter;
            
            if modulo_product != 0 {
                new_item = new_item % modulo_product;
            }

            if new_item % self.divisible_by == 0 {
                monkeys.get_mut(self.if_true).unwrap().items.push(new_item.clone());
            }else {
                monkeys.get_mut(self.if_false).unwrap().items.push(new_item.clone());
            }
        }
    }

}

#[derive(Debug, Clone)]
enum OperationValue {
    Constant(usize),
    Old
}

impl OperationValue {

    fn parse(str: String) -> Self {
        if str == "old" {
            OperationValue::Old
        }else {
            OperationValue::Constant(str.parse().unwrap())
        }
    }

    fn eval(&self, old: usize) -> usize {
        match self {
            &OperationValue::Constant(v) => v,
            &OperationValue::Old => old
        }
    }

}

#[derive(Debug, Clone)]
enum Operation {
    Multiply(OperationValue, OperationValue),
    Add(OperationValue, OperationValue)
}

impl Operation {

    fn parse(str: String) -> Self {
        let mut tokens = str.split(" ");
        let left = OperationValue::parse(tokens.next().unwrap().to_string());
        let operator = tokens.next().unwrap();
        let right = OperationValue::parse(tokens.next().unwrap().to_string());
        if operator == "*" {
            Operation::Multiply(left, right)
        }else {
            Operation::Add(left, right)
        }
    }

    fn exec(&self, old: usize) -> usize {
        match self {
            Operation::Multiply(left, right) => left.eval(old) * right.eval(old),
            Operation::Add(left, right) => left.eval(old) + right.eval(old)
        }
    }

}

fn main() {
    let input = include_str!("./input.txt");

    let monkeys_str = input.split("\r\n\r\n");

    let monkeys: Vec<Monkey> = monkeys_str.clone().map(|monkey_str| -> Monkey {

        let mut monkey_lines = monkey_str.lines();

        let idx_str = &monkey_lines.next().unwrap()[7..8];

        let items_str: &Vec<usize> = &monkey_lines
            .next()
            .unwrap()[18..]
            .split(", ")
            .map(|str| -> usize { str.parse().unwrap() })
            .collect();

        let operation_str = &monkey_lines
            .next()
            .unwrap()[19..];
        
        let operation = Operation::parse(operation_str.to_string());

        let divisible_by_str = &monkey_lines
            .next()
            .unwrap()[21..];
        
        let divisible_by: usize = divisible_by_str.parse().unwrap();

        let if_true_str = &monkey_lines
            .next()
            .unwrap()[29..];
        
        let if_true: usize = if_true_str.parse().unwrap();

        let if_false_str = &monkey_lines
            .next()
            .unwrap()[30..];
        
        let if_false: usize = if_false_str.parse().unwrap();

        Monkey {
            idx: idx_str.parse().unwrap(),
            items: items_str.clone(),
            operation, divisible_by,
            if_true, if_false,
            activity: 0
        }
    }).collect();

    let mut part_one_monkeys = monkeys.clone();

    for _ in 0..20 {
        for idx in 0..part_one_monkeys.len() {
            let monkey = part_one_monkeys[idx].clone();
            monkey.inspect(3, 0, &mut part_one_monkeys);
            part_one_monkeys[idx].activity += part_one_monkeys[idx].items.len();
            part_one_monkeys[idx].items = vec![];
        }
    }

    part_one_monkeys.sort_by(|a, b| b.activity.cmp(&a.activity));

    let best_two = &part_one_monkeys[0..2];

    println!("Part 1: {}", best_two[0].activity * best_two[1].activity);

    let mut part_two_monkeys = monkeys.clone();

    let modulo_product = part_two_monkeys.iter().map(|monkey| monkey.divisible_by).product::<usize>();

    for _ in 0..10000 {
        for idx in 0..part_two_monkeys.len() {
            let monkey = part_two_monkeys[idx].clone();
            monkey.inspect(1, modulo_product, &mut part_two_monkeys);
            part_two_monkeys[idx].activity += part_two_monkeys[idx].items.len();
            part_two_monkeys[idx].items = vec![];
        }
    }

    part_two_monkeys.sort_by(|a, b| b.activity.cmp(&a.activity));

    let best_two = &part_two_monkeys[0..2];

    println!("Part 2: {}", best_two[0].activity * best_two[1].activity);
       
}
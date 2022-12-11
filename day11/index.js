import { readFileSync } from 'fs';

//const input = readFileSync('day10/input.txt', 'utf8').split('\n')

class Monkey{
    inspections = 0
    items = []
    operation = null
    divisor = 0
    friend1 = null
    friend2 = null
    constructor(items, op, divisor, friend1,friend2){
        this.items=items
        this.op = op
        this.divisor = divisor
        this.friend1 = friend1
        this.friend2 = friend2
    }
    inspect(){
        this.inspections++
        return this.op(this.items.shift())
    }
    throw(item,monkeys){
        if(item%this.divisor==0){
            monkeys[this.friend1].items.push(item)
            // console.log('throw ',item, ' to monkey',this.friend1)
        }else{
            monkeys[this.friend2].items.push(item)
            // console.log('throw ',item, ' to monkey',this.friend2)
        }
    }
}

let m0 = new Monkey([93,98],function(old){return old*17},19,5,3)
let m1 = new Monkey([95,72,98,82,86],function(old){return old+5},13,7,6)
let m2 = new Monkey([85, 62, 82, 86, 70, 65, 83, 76],function(old){return old+8},5,3,0)
let m3 = new Monkey([86,70,71,56],function(old){return old+1},7,4,5)
let m4 = new Monkey([77, 71, 86, 52, 81, 67],function(old){return old+4},17,1,6)
let m5 = new Monkey([89, 87, 60, 78, 54, 77, 98],function(old){return old*7},2,1,4)
let m6 = new Monkey([69, 65, 63],function(old){return old+6},3 ,7,2)
let m7 = new Monkey([89],function(old){return old*old},11,0,2)

let monkeys1 = [m0,m1,m2,m3,m4,m5,m6,m7]
m0 = new Monkey([93,98],function(old){return old*17},19,5,3)
 m1 = new Monkey([95,72,98,82,86],function(old){return old+5},13,7,6)
 m2 = new Monkey([85, 62, 82, 86, 70, 65, 83, 76],function(old){return old+8},5,3,0)
 m3 = new Monkey([86,70,71,56],function(old){return old+1},7,4,5)
 m4 = new Monkey([77, 71, 86, 52, 81, 67],function(old){return old+4},17,1,6)
 m5 = new Monkey([89, 87, 60, 78, 54, 77, 98],function(old){return old*7},2,1,4)
 m6 = new Monkey([69, 65, 63],function(old){return old+6},3 ,7,2)
 m7 = new Monkey([89],function(old){return old*old},11,0,2)
let monkeys2 = [m0,m1,m2,m3,m4,m5,m6,m7]

console.log(solve1(monkeys1))
console.log(solve2(monkeys2))

function solve1(monkeys){
    for (let round = 0; round < 20; round++) {
        monkeys.forEach(monkey => {
            while(monkey.items.length>0){
                let item =  monkey.inspect()
                // console.log('inspect',item)
                item = Math.floor(item/3)
                // console.log('bored',item)
                monkey.throw(item,monkeys)
            }
        });   
    }
    monkeys.sort((a,b)=> b.inspections-a.inspections)
    return monkeys[0].inspections*monkeys[1].inspections
}

function solve2(monkeys){
    let divisors = monkeys.map(m=>m.divisor)
    let prod = divisors.reduce((acc,curr)=>acc*curr)
    for (let round = 0; round < 10000; round++) {
        monkeys.forEach(monkey => {
            while(monkey.items.length>0){
                let item =  monkey.inspect()
                // console.log('inspect',item)
                item = item % prod
                // console.log('bored',item)
                monkey.throw(item,monkeys)
            }
        });   
    }
    monkeys.sort((a,b)=> b.inspections-a.inspections)
    return monkeys[0].inspections*monkeys[1].inspections
}



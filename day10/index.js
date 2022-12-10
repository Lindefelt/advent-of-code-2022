import { readFileSync } from 'fs';

const input = readFileSync('day10/input.txt', 'utf8').split('\n')
const addx = 'addx'
const noop = 'noop'
const signalTicks = [20,60,100,140,180,220]
const signalVals = []
let tick = 1
let x = 1
let pixels = []

console.log(solve1(input))

console.log(pixels.slice(0,39).join(''))
console.log(pixels.slice(40,79).join(''))
console.log(pixels.slice(80,119).join(''))
console.log(pixels.slice(120,159).join(''))
console.log(pixels.slice(160,199).join(''))
console.log(pixels.slice(200,239).join(''))
console.log(pixels.slice(240,280).join(''))

function solve1(input) {

    const instructions = input.map(row => parseInstruction(row))
    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        execute(instruction)
    }
    let ret = signalVals.reduce((acc,curr,index)=>acc+curr*signalTicks[index],0)

    return ret
}

function execute(instruction) {
    const ticks = instruction.op == addx ? 2 : 1;
    for (let j = 0; j < ticks; j++) {
        if(tick%40 == x || tick%40 == x+1 || tick%40 == x+2){
            pixels.push('#')
        }
        else{pixels.push('.')}
        if (instruction.op == addx) {
            tick++
            if (j > 0) {
                x += instruction.value
            }
        }
        if (instruction.op == noop) {
            tick++
        }
        if (signalTicks.includes(tick)){
            signalVals.push(x)
        } 
       
    }
    return x
}
function parseInstruction(input) {
    let inst = input.split(' ')
    return ({ op: inst[0], value: Number.parseInt(inst[1]) })
}

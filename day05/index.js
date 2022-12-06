import { readFileSync } from 'fs';

const input = readFileSync('day05/input.txt', 'utf8').split('\r\n')

const instructionPattern = /move (\d*) from (\d*) to (\d*)/

const res1 = solve1(input)
console.log(res1)

const res2 = solve2(input)
console.log(res2)


function parseStacks(input){
    let stacks = Array(9).fill().map(()=>Array())
    input.map((row,index) => {
        for (let i = 1; i < row.length; i+=4) {
            const element = row[i];
            stacks[index].push(element)
        }
    })
    //Transpose the matrix
    stacks = stacks[0].map((col,i)=>stacks.map(row => row [i]))
    //Reverse the stack order and remove empty/undefined cells
    return stacks.map(stack=>stack.reverse().filter(e => e!==' '&&e!==undefined))
}

function parseInstruction(instruction){
    const match = instruction.match(instructionPattern)
    return {count: match[1],
            from: match[2]-1,
            to: match[3]-1}
}

function solve1(input){
    const inputStacks = input.slice(0,8)
    const inputMoves = input.slice(10)
    let stacks = parseStacks(inputStacks)


    inputMoves.map(row => {
        let inst = parseInstruction(row)

        for (let index = 0; index <inst.count; index++) {
            let v = stacks[inst.from].pop()
            stacks[inst.to].push(v)
        }
        
    })

    return stacks.map(e => e[e.length-1]).join('')
   
}
function solve2(input){
    const inputStacks = input.slice(0,8)
    const inputMoves = input.slice(10)
    let stacks = parseStacks(inputStacks)

    inputMoves.map(row => {
        let inst = parseInstruction(row)

            let stackFrom = stacks[inst.from]
            let v =  stackFrom.splice(stackFrom.length-inst.count,inst.count)
            stacks[inst.to].push(...v)

    })

    return stacks.map(e => e[e.length-1]).join('')
}

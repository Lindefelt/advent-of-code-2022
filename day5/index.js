import { readFileSync } from 'fs';
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let data = readFileSync('day5/input.txt', 'utf8').split('\r\n')

const instructionPattern = /move (\d*) from (\d*) to (\d*)/

let res1 = solve1(data)
console.log(res1)

let res2 = solve2(data)
console.log(res2)

function parseInstruction(instruction){
    let match = instruction.match(instructionPattern)
    return {count: match[1],
            from: match[2]-1,
            to: match[3]-1}
}
function solve1(data){

    let stacks = Array(9).fill().map(()=>Array())
    stacks[0].push(...'DLJRVGF'.split(''))
    stacks[1].push(...'TPMBVHJS'.split(''))
    stacks[2].push(...'VHMFDGPC'.split(''))
    stacks[3].push(...'MDPNGQ'.split(''))
    stacks[4].push(...'JLHNF'.split(''))
    stacks[5].push(...'NFVQDGTZ'.split(''))
    stacks[6].push(...'FDBL'.split(''))
    stacks[7].push(...'MJBSVDN'.split(''))
    stacks[8].push(...'GLD'.split(''))

    data.map(row => {
        let inst = parseInstruction(row)

        for (let index = 0; index <inst.count; index++) {
            let v = stacks[inst.from].pop()
            stacks[inst.to].push(v)
            
        }
        
    })

    return stacks.map(e => e[e.length-1]).join('')
   
}
function solve2(data){
    
    let stacks = Array(9).fill().map(()=>Array())
    stacks[0].push(...'DLJRVGF'.split(''))
    stacks[1].push(...'TPMBVHJS'.split(''))
    stacks[2].push(...'VHMFDGPC'.split(''))
    stacks[3].push(...'MDPNGQ'.split(''))
    stacks[4].push(...'JLHNF'.split(''))
    stacks[5].push(...'NFVQDGTZ'.split(''))
    stacks[6].push(...'FDBL'.split(''))
    stacks[7].push(...'MJBSVDN'.split(''))
    stacks[8].push(...'GLD'.split(''))

    data.map(row => {
        let inst = parseInstruction(row)

            let stackFrom = stacks[inst.from]
            let v =  stackFrom.splice(stackFrom.length-inst.count,inst.count)
            stacks[inst.to].push(...v)

    })

    return stacks.map(e => e[e.length-1]).join('')
}

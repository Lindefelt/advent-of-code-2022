import { readFileSync } from 'fs';
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let data = readFileSync('day04/input.txt', 'utf8').split('\r\n')

console.log(data)
let res1 = solve1(data)
console.log(res1)

let res2 = solve2(data)
console.log(res2)


function range(start = 0,end) {
    return Array.from({length: end-start+1}, (_,i) => i+start)
}
function rangeOverlapsFully(r1,r2){
    return r1.every(e=>r2.includes(e))||r2.every(e=>r1.includes(e))
}
function rangeOverlaps(r1,r2){
    return r1.some(e=>r2.includes(e))
}

function solve1(data){
    let res = data.map(row => {
        let a = row.split(',')
        let ranges = a.map(e=> e.split('-').map(e=>Number.parseInt(e)))
        let range1 = range(ranges[0][0],ranges[0][1]) 
        let range2 = range(ranges[1][0],ranges[1][1]) 
        return rangeOverlapsFully(range1,range2)
        
    }).reduce((acc,curr)=>acc+curr)
    return res
}
function solve2(){
    let res = data.map(row => {
        let a = row.split(',')
        let ranges = a.map(e=> e.split('-').map(e=>Number.parseInt(e)))
        let range1 = range(ranges[0][0],ranges[0][1]) 
        let range2 = range(ranges[1][0],ranges[1][1]) 
        return rangeOverlaps(range1,range2)
        
    }).reduce((acc,curr)=>acc+curr)
    return res
}
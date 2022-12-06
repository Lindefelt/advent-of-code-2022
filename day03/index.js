import { readFileSync } from 'fs';
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
try {
    let data = readFileSync('day03/input.txt', 'utf8').split('\r\n')

    let res1 = solve1(data)
    console.log(res1)
    
    let res2 = solve2(data)
    console.log(res2)

} catch (error) {
    console.error(error);
}

function solve1(data) {
    let sums = data.map(row => {
        let array = row.split('')

        let comp1 = array.slice(0, array.length / 2)
        let comp2 = array.slice(array.length / 2, array.length)

        let matches = comp1.filter(val => comp2.includes(val))
        console.log(matches)

        let sum = alpha.indexOf(matches[0])+1
        return sum
    })

    let total = sums.reduce((acc,curr)=>acc+curr)

    return total
}

function solve2(data){
    let groups = []
    for (let index = 0; index < data.length; index+=3) {
        let ruck1 = data[index].split('')
        let ruck2 = data[index+1].split('')
        let ruck3 = data[index+2].split('')

        let matches = ruck1.filter(val=> ruck2.includes(val)).filter(val=>ruck3.includes(val))
        console.log(matches[0])
        groups.push(matches[0])
    }
    let res = groups.reduce((acc, curr) => acc + (alpha.indexOf(curr) + 1), 0)
    return res

}

import { readFileSync } from 'fs';

const input = readFileSync('day13/input.txt', 'utf8').split(/\r?\n/)


console.log(solve1(input))
solve2(input)


function solve1(input) {

    const indicesInOrder = []

    for (let index = 0; index < input.length; index += 3) {
        const left = eval(input[index]) //DANGER
        const righ = eval(input[index + 1]) //DANGER

        console.log('Pair ', (index / 3) + 1, ' ', left, 'vs', righ)
        let res = {}
        compare(left, righ, res);
        console.log('in order: ', res.order)

        if (res.order) {
            indicesInOrder.push((index / 3) + 1)
        }

    }

    console.log(indicesInOrder)
    return indicesInOrder.reduce((acc, curr) => acc + curr)
}

function compare(left, right, result) {

    if (typeof left === 'number' && typeof right === 'number') {
        if (left < right) {
            result.order = true;
            return
        }
        if (left > right) {
            result.order = false;
            return
        }
    } else if (typeof left !== 'number' && typeof right !== 'number') {
        let index = 0

        while (true) {
            if (index > left.length - 1 && index <= right.length - 1) {
                result.order = true
                return
            } else if (index <= left.length - 1 && index > right.length - 1) {
                result.order = false
                return
            } else if (index > left.length - 1 && index > right.length - 1) {
                return
            }

            compare(left[index], right[index], result)

            if (typeof result.order !== 'undefined') {
                return;
            }

            index++
        }
    }
    else {
        if (typeof left === 'number') {
            compare([left], right, result)
        }
        else {
            compare(left, [right], result)
        }
    }
};



function solve2(input) {

}
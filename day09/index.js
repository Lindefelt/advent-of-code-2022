import { readFileSync } from 'fs';

const input = readFileSync('day09/input.txt', 'utf8').split('\r\n')
const test1 = readFileSync('day09/test.txt', 'utf8').split('\r\n')
const test2 = readFileSync('day09/test2.txt', 'utf8').split('\r\n')

console.log(solve1(input))
console.log(solve2(input))

function solve1(input) {
    let head = { x: 0, y: 0 }
    let tail = { x: 0, y: 0 }

    let visited = new Set()
    input.forEach(element => {
        let move = parseMove(element)
        for (let i = 0; i < move.steps; i++) {
            switch (move.dir) {
                case 'R':
                    head.x++

                    break;

                case 'L':
                    head.x--

                    break;

                case 'U':
                    head.y++

                    break;
                case 'D':
                    head.y--

                    break;

            }
            moveRelativeTo(head, tail)
            visited.add(tail.x + ',' + tail.y)

        }

    });

    let res = visited.size
    return res
}

function solve2(input) {
    let head = { x: 0, y: 0 }
    let knots = Array(9).fill(null).map(e => ({ x: 0, y: 0 }))

    let visited = new Set()
    input.forEach(element => {
        let move = parseMove(element)
        for (let i = 0; i < move.steps; i++) {
            switch (move.dir) {
                case 'R':
                    head.x++

                    break;

                case 'L':
                    head.x--

                    break;

                case 'U':
                    head.y++

                    break;
                case 'D':
                    head.y--

                    break;

            }
            knots.reduce(moveRelativeTo, head)
            visited.add(knots[8].x + ',' + knots[8].y)

        }

    });

    let res = visited.size
    return res
}

function moveRelativeTo(h, t) {
    if (h.x - t.x > 1) {
        t.x++
        if (h.y > t.y) {
            t.y++
        }
        if (h.y < t.y) {
            t.y--
        }

    }
    if (t.x - h.x > 1) {
        t.x--
        if (h.y > t.y) {
            t.y++
        }
        if (h.y < t.y) {
            t.y--
        }
    }
    if (h.y - t.y > 1) {
        t.y++
        if (h.x > t.x) {
            t.x++
        }
        if (h.x < t.x) {
            t.x--
        }

    }
    if (t.y - h.y > 1) {
        t.y--
        if (h.x > t.x) {
            t.x++
        }
        if (h.x < t.x) {
            t.x--
        }
    }
    return t
}
function parseMove(input) {
    let move = input.split(' ')
    return ({ dir: move[0], steps: Number.parseInt(move[1]) })
}

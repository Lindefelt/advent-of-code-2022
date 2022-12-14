import { readFileSync } from 'fs';

const input = readFileSync('day12/input.txt', 'utf8').split(/\r?\n/)


class Point {
    x
    y
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    key() {
        return this.toString()
    }
    toString() {
        return `x${this.x},y${this.y}`
    }
    static from(key) {
        let parts = key.split(',')
        const x = Number.parseInt(parts[0].slice(1));
        const y = Number.parseInt(parts[1].slice(1))
        return new Point(x, y)
    }
}

solve1(input)
solve2(input)


function solve1(input) {
    let map = createInput(input)
    let d = dijkstra(map.grid, map.start, map.end)


    console.log(d[map.end.key()])
}

function solve2(input) {
    let map = createInput2(input)

    //let startingPoints = getStartingPoints(map.grid)
    //console.log('startingpoints: ',startingPoints)
    // let d = startingPoints.map((start,i) => {
    //     console.log('round: ',i)
    //     dijkstra(map.grid, start, map.end)
    // })
    
    let dist = dijkstra2(map.grid, map.start, map.end)

    // let dists = d.map(e => e.dist[map.end.key()])
    // let shortest = dists.reduce((acc,curr)=> acc < curr ? acc:curr)
    console.log(dist)
}


function dijkstra(grid, start, end) {
    let dist = {}
    let prev = {}
    let queue = []

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            let point = new Point(x, y)
            dist[point.key()] = Number.POSITIVE_INFINITY
            //prev
            queue.push(point.key())
        }
    }

    dist[start.key()] = 0

    while (queue.length) {

        let u = null

        for (const curr of queue) {
            if (u === null || dist[curr] < dist[u.key()]) {
                u = Point.from(curr)
            }
        }
        if (u.x == end.x && u.y == end.y) {
            break
        }
        queue.splice(queue.indexOf(u.key()), 1)

        const neighbors = getNeighbors(u, grid)

        for (const v of neighbors) {
            if (queue.includes(v.key())) {
                const alt = dist[u.key()] + 1
                if (alt < dist[v.key()]) {
                    dist[v.key()] = alt
                }
            }
        }
    }

    return dist
}

function dijkstra2(grid, start, end) {
    let dist = {}
    let prev = {}
    let queue = []

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            let point = new Point(x, y)
            dist[point.key()] = Number.POSITIVE_INFINITY
            queue.push(point.key())
        }
    }

    dist[start.key()] = 0

    while (queue.length) {

        let u = null

        for (const curr of queue) {
            if (u === null || dist[curr] < dist[u.key()]) {
                u = Point.from(curr)
            }
        }
        if (grid[u.y][u.x] == 25) {
            return(dist[u.key()])
        }
        queue.splice(queue.indexOf(u.key()), 1)

        const neighbors = getNeighbors(u, grid)

        for (const v of neighbors) {
            if (queue.includes(v.key())) {
                const alt = dist[u.key()] + 1
                if (alt < dist[v.key()]) {
                    dist[v.key()] = alt
                }
            }
        }
    }

    return dist
}

function getNeighbors(point, grid) {
    const x = point.x
    const y = point.y
    const ret = []
    if (x + 1 < grid[y].length && grid[y][x + 1] <= grid[y][x] + 1) {
        ret.push(new Point(point.x + 1, point.y))
    }
    if (x - 1 >= 0 && grid[y][x - 1] <= grid[y][x] + 1) {
        ret.push(new Point(point.x - 1, point.y))
    }
    if (y + 1 < grid.length && grid[y + 1][x] <= grid[y][x] + 1) {
        ret.push(new Point(point.x, point.y + 1))
    }
    if (y - 1 >= 0 && grid[y - 1][x] <= grid[y][x] + 1) {
        ret.push(new Point(point.x, point.y - 1))
    }

    return ret
}
// function getStartingPoints(grid) {
//     const result = []
//     for (let y = 0; y < grid.length; y++) {
//         for (let x = 0; x < grid[y].length; x++) {
//             if (grid[y][x] === 0) {
//                 result.push(new Point(x, y))
//             }
//         } 
//     }
//     return result
// }

function createInput(input) {
    const result = {
        start: {},
        end: {},
        grid: []
    }

    result.grid = input.map((row, y) => {
        return row.split('').map((c, x) => {
            if (c === 'S') {
                result.start = new Point(x, y)
                return (0)
            } else if (c === 'E') {
                result.end = new Point(x, y)
                return (25)
            }
            return c.charCodeAt(0) - 'a'.charCodeAt(0)
        })
    })
    return result
}

function createInput2(input) {
    const result = {
        start: {},
        end: {},
        grid: []
    }

    result.grid = input.map((row, y) => {
        return row.split('').map((c, x) => {
            if (c === 'S') {
                result.end = new Point(x, y)
                return (25)
            } else if (c === 'E') {
                result.start= new Point(x, y)
                return (0)
            }
            return 'z'.charCodeAt(0) - c.charCodeAt(0)
        })
    })
    return result
}
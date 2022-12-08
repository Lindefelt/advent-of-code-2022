import { readFileSync } from 'fs';

const input = readFileSync('day08/input.txt', 'utf8').split('\r\n')

let matrix = createMatrix(input)


console.log(solve1(matrix))
console.log(solve2(matrix))

function solve1(matrix){
    const rows = matrix.length
    const cols = matrix[0].length
    let visible = Array(rows).fill(null).map(() => Array(cols).fill(false))

    for (let r = 0; r < rows; r++) {
        let highestLeft = -1
        let highestTop = -1
        let highestRight = -1
        let highestBottom = -1
        for (let c = 0; c < cols; c++) {
            //Left to right
            if(highestLeft<matrix[r][c]){
                visible[r][c]=true
                highestLeft = matrix[r][c]
            }
            //right to left
            let cr = matrix.length-1-c
            if(highestRight<matrix[r][cr]){
                visible[r][cr]=true
                highestRight = matrix[r][cr]
            }
            //top to bottom
            if(highestTop<matrix[c][r]){
                visible[c][r]=true
                highestTop = matrix[c][r]
            }
            //bottom to top
            let rt = matrix.length-1-r
            if(highestBottom<matrix[cr][rt]){
                visible[cr][rt]=true
                highestBottom = matrix[cr][rt]
            }
            
        }
        
    }
    let res =  visible.flatMap(val => val).reduce((acc,curr) => acc+curr,0)
    return res
 }
 
 function solve2(matrix){
    const rows = matrix.length
    const cols = matrix[0].length
    let scores = Array(rows).fill(null).map(() => Array(cols).fill(0))

     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < cols; c++) {
            //to the right
            let tree = matrix[r][c]
            let treesToTheRight = matrix[r].length-1-c
            let treesBelow = matrix[r].length-1-r
            let vdRight = 0
            let vdDown = 0
            let vdLeft = 0
            let vdUp = 0
            // Right
            for (let v = c; v < c+treesToTheRight; v++) {
                if(tree > matrix[r][v+1]){
                    vdRight++
                }else if(tree <= matrix[r][v+1]){
                    vdRight++
                    break
                }
            }
            // Down
            for (let v = r; v < r+treesBelow; v++) {
                if(tree > matrix[v+1][c]){
                    vdDown++
                }else if(tree <= matrix[v+1][c]){
                    vdDown++
                    break
                }
            }
            // Left
            for (let v = c; v > 0; v--) {
                if(tree > matrix[r][v-1]){
                    vdLeft++
                }else if(tree <= matrix[r][v-1]){
                    vdLeft++
                    break
                }
            }
            // Up
            for (let v = r; v > 0; v--) {
                if(tree > matrix[v-1][c]){
                    vdUp++
                }else if(tree <= matrix[v-1][c]){
                    vdUp++
                    break
                }
            }
            scores [r][c] = vdRight*vdDown*vdLeft*vdUp
        }
       
        
    }
    let res = scores.flatMap(e=>e).reduce((acc,curr)=>{ return (curr > acc ? curr: acc)})
    return res
 }

function createMatrix(input){
    
   let matrix =  input.map((row)=>{
        return row.split('').map(val=>Number.parseInt(val))
    })

    return matrix
}
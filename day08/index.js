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
 
 function solve2(dirs){
    let res =  0
    return res
 }

function createMatrix(input){
    
   let matrix =  input.map((row)=>{
        return row.split('').map(val=>Number.parseInt(val))
    })

    return matrix
}
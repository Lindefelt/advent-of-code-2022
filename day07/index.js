import { readFileSync } from 'fs';

const input = readFileSync('day07/input.txt', 'utf8').split('\r\n')


let dirs = calculateDirSizes(input)
console.log(solve1(dirs))
console.log(solve2(dirs))

function solve1(dirs){
    let res =  dirs.filter((dir)=>dir.size < 100000).reduce((acc,dir) => acc+dir.size,0)
    return res
 }
 
 function solve2(dirs){

    const disk = 70000000
    const needed = 30000000
    const available = disk-dirs[0].size

    let del =  dirs.filter(dir => {
        return available + dir.size > needed 
    }).reduce((acc,curr)=> acc.size > curr.size ? curr : acc)
    
    return del.size
 }

function calculateDirSizes(input){
    let pwd = []
    let files = new Map()
    let dirNames = new Set('/')

    input.forEach(row => {
        if(row.startsWith('$ cd')){
            let dir  =  row.slice(4).trim()
            if(dir === '..'){
             pwd.pop()
            }else if(dir === '/'){
             pwd = [dir]
            }
            else{
             pwd.push(dir+'/')
            }
         }else if (row.startsWith('$ ls')){
            
         }
         else if(row.startsWith('dir')) {
             dirNames.add(pwd.join('')+row.slice(4))
         }
         else{
             let parts = row.split(' ')
             files.set(pwd.join('')+parts[1],Number.parseInt(parts[0]))
         }
        })

     let dirs = Array.from(dirNames).map(dir => { 
         let size = Array.from(files.keys())
         .filter(file => file.startsWith(dir))
         .reduce((acc,curr) => acc+files.get(curr),0)
         return {dir,size}
        })

    return dirs
}
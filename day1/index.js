import { readFileSync } from 'fs';

try{
    let data = readFileSync('day1/input.txt','utf8')
    let arr = data.split('\r\n\r\n')
    console.log(arr)

    let sums = arr.map(d  => {
       let arrNumbers =  d.split('\r\n').map(s=>Number.parseInt(s))
       res = arrNumbers.reduce((acc,curr)=>acc+curr)
        return res
    })

    sums.sort((a,b)=> b-a)

    console.log(sums[0])
    console.log(sums[0]+sums[1]+sums[2])
} catch (error){
    console.error(error);
}

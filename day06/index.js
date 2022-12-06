import { readFileSync } from 'fs';

const input = readFileSync('day06/input.txt', 'utf8')
// mjqjpqmgbljsphdztnvjfqwrcgsmlb : 7
// bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
// nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
// nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
// zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11

function solve1(input){
    for (let i = 0; i < input.length; i++) {
        const element = input[i];
        if(i>=3){
            let set =  new Set(input.slice(i-4,i))
            if (set.size===4){
                return i
            }

        }
        
        
    }
}

console.log(solve1(input))

function solve2(input){
    for (let i = 0; i < input.length; i++) {
        const element = input[i];
        if(i>=13){
            let set =  new Set(input.slice(i-14,i))
            if (set.size===14){
                return i
            }

        }
        
        
    }
}

console.log(solve2(input))
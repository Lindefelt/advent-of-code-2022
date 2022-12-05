import { readFileSync } from 'fs';

const loseScore = 0
const drawScore = 3
const winScore = 6
const r1 = 'A'
const p1 = 'B'
const s1 = 'C'
const r2 = 'X'
const p2 = 'Y'
const s2 = 'Z'
const pointMap = new Map()
pointMap.set(r1,1)
pointMap.set(r2,1)
pointMap.set(p1,2)
pointMap.set(p2,2)
pointMap.set(s1,3)
pointMap.set(s2,3)


function evalHand(npc,player){
    let score = 0
    if(pointMap.get(npc) == pointMap.get(player)){
        score += drawScore
    }else if(npc == r1 && player == p2){
        score += winScore
    }else if(npc == p1 && player == s2){
        score += winScore
    }else if(npc == s1 && player == r2){
        score += winScore
    }else{
        score+=loseScore
    }

    return score+pointMap.get(player);
}
function fixGame(npc,player){
    let hand = ''
    if(player=='Y')
        if(npc == r1){
            hand = r2
        }
        if(npc == p1){
            hand = p2
        }
        if(npc == s1){
            hand = s2
        }
    if(player=='X'){
        if(npc == r1){
            hand = s2
        }
        if(npc == p1){
            hand = r2
        }
        if(npc == s1){
            hand = p2
        }
    }
    if(player=='Z'){
        if(npc == r1){
            hand = p2
        }
        if(npc == p1){
            hand = s2
        }
        if(npc == s1){
            hand = r2
        }
    }
    return hand
}
try{
    let data = readFileSync('day2/input.txt','utf8')
    let arr = data.split('\r\n')
 


    let scores = arr.map(d  => {
        let np = d.split(' ')
        return evalHand(np[0],np[1])
    })

    let total = scores.reduce((acc, curr) => acc + curr)

    console.log(total)

    let scores2 = arr.map(d  => {
        let np = d.split(' ')
        let fixedHand = fixGame (np[0],np[1])
        return evalHand(np[0],fixedHand)
        
    })

    let total2 = scores2.reduce((acc, curr) => acc + curr)
    
    console.log(total2)
} catch (error){
    console.error(error);
}

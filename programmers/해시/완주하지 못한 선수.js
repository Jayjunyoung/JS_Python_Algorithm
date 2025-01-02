function solution(participant, completion) {
    let answer = '';
    let playerMap = new Map();
    
    for(let player of participant) {
        if(playerMap.get(player)) {
            playerMap.set(player, playerMap.get(player) + 1);
        } else {
            playerMap.set(player, 1);
        }
    }
    
    for(let completePlayer of completion) {
        if(playerMap.get(completePlayer)) {
            playerMap.set(completePlayer, playerMap.get(completePlayer) - 1);
        } 
    }
    
    for(let player of participant) {
        if(playerMap.get(player) && playerMap.get(player) >= 1) {
            answer = player//1보다 크면 완주하지 못한 인원이야
        } 
    }
    
    return answer;
}
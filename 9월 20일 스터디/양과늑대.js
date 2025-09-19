function solution(info, edges) {
    const infoLength = info.length;
    let answer = 0;
    const graph = Array.from({length: infoLength}, () => []);
   
    edges.forEach(([a, b]) => (
        graph[a].push(b)
    ))
    
    const dfs = (currentNode, sheep, wolf, possible) => {
        const newPossible = [...possible];
        //현재 노드를 자르기 위해 세팅
        let currentIndex = newPossible.indexOf(currentNode);
        
        if(info[currentNode]) {
            wolf++;
        } else {
            sheep++;
        }
        
        //양 최대 마리를 구하기떄문에 갱신해주기
        answer = Math.max(answer, sheep); 
        
        if(wolf === sheep) {
            return;
        }
        
        newPossible.push(...graph[currentNode]);
        newPossible.splice(currentIndex, 1);
        
        for(let nextNode of newPossible) {
            dfs(nextNode, sheep, wolf, newPossible)
        }
        
    }
    
    dfs(0, 0, 0, [0])

    return answer;
}
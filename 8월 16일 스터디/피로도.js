function solution(k, dungeons) {
    let answer = 0;
    const visited = Array.from({ length: dungeons.length }, () => false);
    
    const dfs = (currentPiro, count) => {
        answer = Math.max(answer, count);
        
        for(let i = 0; i < dungeons.length; i++) {
            const [minPiro, usePiro] = dungeons[i];
            
            if(!visited[i] && currentPiro >= minPiro) {
                visited[i] = true;
                dfs(currentPiro - usePiro, count + 1);
                visited[i] = false;
            }
            
        }
        
    }
   
    dfs(k, 0);
    return answer;
}
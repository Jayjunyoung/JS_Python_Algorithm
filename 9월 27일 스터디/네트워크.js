function solution(n, computers) {
    let networks = 0;
    
    const visited = Array(n).fill(false);
    
    const isVisited = (idx) => {
        
        visited[idx] = true;
        
        const computer = computers[idx];
        
        for(let i = 0; i < computer.length; i++) {
            const isConnect = computer[i] === 1 ? true : false;
            if(!visited[i] && isConnect) {
                isVisited(i)
            };
        }
    }
    
    for(let i = 0; i < n; i++) {
        if(!visited[i]) {
            networks++;
            isVisited(i)
        }
    }
    
    return networks;
}
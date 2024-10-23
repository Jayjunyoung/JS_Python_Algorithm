function solution(n, wires) {
    let minDifference = Infinity;
    
    // 각 노드에 연결된 간선을 초기화
    const tree = Array.from({ length: n + 1 }, () => []);
    
    for (const [v1, v2] of wires) {
        tree[v1].push(v2);
        tree[v2].push(v1);
    }
    
    // BFS 알고리즘으로 간선을 끊고
    // 간선에 의해 분리된 각 그룹에 속한 총 노드 수의 차를 구함
    for (const [v1, v2] of wires) {
        const count1 = bfs(v1, v2, tree);
        const count2 = n - count1; // 총 노드 수에서 count1을 빼면 다른 그룹의 노드 수
        minDifference = Math.min(minDifference, Math.abs(count1 - count2));
    }
    
    return minDifference;
}

function bfs(root, excludedNode, tree) {
    let count = 0;
    let visited = Array.from({length: tree.length}, () => false);

    const queue = [root];
    visited[root] = true;

    while(queue.length) {
        const current = queue.shift();
        for(let node of tree[current]) {
            if(node !== excludedNode && !visited[node]) {
                visited[node] = true;
                queue.push(node);
            }
        }
        count++
    }
        
    return count;
}
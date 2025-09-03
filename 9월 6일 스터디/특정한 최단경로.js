const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, e] = input[0].split(" ").map(Number);
const [v1, v2] = input.at(-1).split(" ").map(Number);
const graph = Array.from({length: n + 1}, () => []);

for(let i = 1; i <= e; i++) {

    const [start, end, cost] = input[i].split(" ").map(Number);

    // 양 방향 그래프 설정
    graph[start].push([end, cost]);
    graph[end].push([start, cost]);
}


const getMinNode = (distance, visited) => {
    let minNode = -1;
    let minDistance = Infinity;

    for(let i = 1; i <= n; i++) {
        if(!visited[i] && distance[i] < minDistance) {
            minDistance = distance[i];
            minNode = i;
        }
    }

    return minNode;
}

const dijkstra = (startNode) => {

    const distance = Array(n + 1).fill(Infinity);
    const visited = Array(n + 1).fill(false);

    distance[startNode] = 0;

    while(true) {
       const node = getMinNode(distance, visited);
        
       if(node === -1) break;
       visited[node] = true;

       for(let [nextNode, weight] of graph[node]) {
         if(distance[node] + weight < distance[nextNode]) {
            distance[nextNode] = distance[node] + weight;
         }

       }
    }

    return distance;
}

const start1 = dijkstra(1);
const startV1 = dijkstra(v1);
const startV2 = dijkstra(v2);

const path1 = start1[v1] + startV1[v2] + startV2[n];
const path2 = start1[v2] + startV2[v1] + startV1[n];

if (path1 === Infinity || path2 === Infinity) {
    console.log(-1);
} else {
    console.log(Math.min(path1, path2));
}
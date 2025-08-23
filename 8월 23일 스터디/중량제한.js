const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const graph = Array.from({length: n + 1}, () => []);
let max = 0;

for(let i = 1; i <=m; i++) {
    const [a, b, weight] = input[i].split(" ").map(Number);

    if(max < weight) {
        max = weight;
    }

    graph[a].push([b, weight]);
    graph[b].push([a, weight]);
}

const [start, end] = input[m + 1].split(" ").map(Number);

BinarySearch(n, graph, start, end, max);

// 이분탐색을 이용해 최대중량을 찾는다
function BinarySearch(n, graph, start, end, max) {
    let left = 1;
    let right = max;

    while(left <= right) { 
        const mid = Math.floor((left + right) / 2);

        if(BFS(n, graph, start, end, mid)) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    console.log(right);
}

function BFS(n, graph, start, end, mid) {
    const visited = Array.from({length: n + 1}, () => false);
    const queue = [start];
    visited[start] = true;

    while(queue.length > 0) {
        const current = queue.shift();

        if(current === end) {
            return true;
        }        

        for(let i = 0; i < graph[current].length; i++) {
            const [next, weight] = graph[current][i];

            if(!visited[next] && mid <= weight) {
                visited[next] = true;
                queue.push(next);
            }

        }
    }
}





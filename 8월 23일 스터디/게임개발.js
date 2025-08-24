//위상정렬 문제인데 이거는 공부를 하자.. 접근이 안된다
const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];

// 각 건물의 선행 건물들을 저장
const graph = Array.from({ length: n + 1 }, () => []);
// 각 건물의 진입 차수 (선행 건물 개수)
const inDegree = Array(n + 1).fill(0);
// 각 건물의 건설 시간
const buildTime = Array(n + 1).fill(0);
// 각 건물의 완성 시간
const completeTime = Array(n + 1).fill(0);

for(let i = 1; i <= n; i++) {

    const [time, ...preBuildings] = input[i].split(" ").map(Number);

    buildTime[i] = time;

    for(let j = 0; j < preBuildings.length; j++) {
        const prev = preBuildings[j];
        if(prev !== -1) {
            // i가 1일 때 graph[1].push(2)가 되겠군
            graph[prev].push(i);
            // 3 : [4]
            // 4번 입장에서는 진입차수가 오른거지
            inDegree[i]++;
        }
    }
}

function topologicalSort() {
    const queue = [];

    for(let i = 1; i <= n; i++) {
        // 진입차수가 0인 정점을 큐에 삽입
        if(inDegree[i] === 0) {
          queue.push(i);  
          // 초기 건설 시간 설정
          completeTime[i] = buildTime[i]
        }  
    }
    
    while(queue.length > 0) {
        const current = queue.shift();

        for(const next of graph[current]) {
            // 현재 건물 다음에 지을 수 있는 건물의 진입차수 감소
            inDegree[next]--
            
            // 다음 건물의 완성 시간 업데이트
            completeTime[next] = Math.max(completeTime[next], completeTime[current] + buildTime[next]);
             
            // 다음 건물의 진입차수가 0이 되면 해당 정점을 큐에 삽입
            if(inDegree[next] === 0) {
                queue.push(next);
            }
            
        }
    }
}

topologicalSort();

for(let i = 1; i <= n; i++) {
    console.log(completeTime[i]);
}

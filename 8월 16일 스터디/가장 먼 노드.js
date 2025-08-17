function solution(n, edge) {
  return bfs(1, edge, n)
}

const bfs = (start, arr, end) => {
  const visited = Array.from({length: end + 1}, () => false);
  const level = Array.from({length: end + 1}, () => 1)
  
  const queue = [start];
  visited[start] = true;
  
  while(queue.length > 0) {
      let head = queue.shift();
      let lev = level[head] + 1;
      
      for(const node of arr) {
          if(head === node[0] && !visited[node[1]]) {
              queue.push(node[1])
              visited[node[1]] = true;
              level[node[1]] = lev;
          } else if (node[1] === head && !visited[node[0]]) {
      queue.push(node[0]);
      visited[node[0]] = true;
      level[node[0]] = lev;
    }
      }
      
  }
  
  const maxLevel = Math.max.apply(null, level)
  
  return level.filter((v) => v === maxLevel).length;
}


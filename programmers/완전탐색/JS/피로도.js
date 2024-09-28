function solution(k, dungeons) {
  let answer = [];
  let dungeonsCount = dungeons.length;
  let visited = Array(dungeonsCount).fill(false);
  //3개의 false 담겨져있음

  const dfs = (count, k) => {
    answer.push(count);
    dungeons.forEach((dungeon, idx) => {
      let [minPiro, usePiro] = dungeon;
      if (k >= minPiro && !visited[idx]) {
        visited[idx] = true;
        dfs(count + 1, k - usePiro);
        //갈라치기 되는 시점 ex) 만약 최소로 요구하는 피로도보다 낮다면?
        visited[idx] = false;
      }
    });
  };
  //dfs 함수 로직에서 에러가 남
  dfs(0, k); // dfs(탐험가능 count, 80 : 피로도)
  return Math.max(...answer);
}

function solution(m, n, puddles) {
  let dp = Array.from({ length : n + 1 }, () => Array(m + 1).fill(1));
  const mod = 1000000007;
  
  dp[1][1] = 1;
  
  for(let row = 1; row <= n; row++) {
      for(let col = 1; col <= m; col++) {
          if(row === 1 && col === 1) continue;
          
          if(isPuddle(col, row, puddles)) {
              dp[row][col] = 0;
          } else {
              const fromTop = row > 1 ? dp[row-1][col] : 0
              const fromLeft = col > 1 ? dp[row][col-1] : 0;
              
              dp[row][col] = (fromTop + fromLeft) % mod       
          }
      }
  }
  
  return dp[n][m]
}

const isPuddle = (x, y, puddles) => {    
  for(const puddle of puddles) {
      if(x === puddle[0] && y === puddle[1]) {
          return true;
      }
  }
  return false;
}
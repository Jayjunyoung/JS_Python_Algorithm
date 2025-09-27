function solution(n, info) {
    let answer = Array(11).fill(0);
    let maxDiff = -Infinity;
    
    function isSmallerScoreArr(scoreArr) {
        for (let i = 10; i >= 0; i--) {
          if (scoreArr[i] === answer[i]) continue;
          else if (scoreArr[i] > answer[i]) return true; 
          else return false;
        }
    }
    
    const dfs = (L, idx, ryanInfo) => {
        if(idx === 10 && L < n) {
            ryanInfo[idx] = n - L;
            L = n;
        }
        
        // 화살 다 쐈으면 점수 계산
        if(L === n) {  
          let appeachScore = 0;
          let ryanScore = 0;

          for (let i = 0; i < ryanInfo.length; i++) {
            const aScore = info[i];
            const rScore = ryanInfo[i];
            const score = 10 - i;

            if (!rScore && !aScore) continue;

            if (aScore - rScore >= 0) appeachScore += score;
            else ryanScore += score;
          }
            
          const diff = ryanScore - appeachScore;
          if (maxDiff < diff) {
            // 차이가 더 크면 갱신
            maxDiff = diff;
            answer = ryanInfo;
          }  else if (maxDiff === diff) {
            // 같으면 가장 작은 점수를 많이 쓴 배열인 경우 정답 배열 갱신
                if (isSmallerScoreArr(ryanInfo)) answer = ryanInfo;
             }  
             return;
          }
        
        
        const appeachCnt = info[idx]; 
    
        if(n - L >= appeachCnt + 1) {
            ryanInfo[idx] = appeachCnt + 1;
            dfs(L + appeachCnt + 1, idx + 1, [...ryanInfo])
            ryanInfo[idx] = 0;
        }
        
         // 현재 점수 포기
        dfs(L, idx + 1, [...ryanInfo]);
    }
    
    
    dfs(0, 0, Array(11).fill(0))
    
    if(maxDiff <= 0) {
        return [-1];
    } else {
        return answer;
    }
    
}
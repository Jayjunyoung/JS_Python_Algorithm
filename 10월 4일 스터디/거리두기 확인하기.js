function solution(places) {
    const result = [];
    for (const place of places) {
      let isSafePlace = 1;
  
      // 대기실을 순회하며 응시자의 자리에 대해 거리두기를 확인
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (place[i][j] === "P") {
            // 거리두기를 지켰는지 유무 따지기
            if (!isSafe(place, i, j)) {
              isSafePlace = 0;
              break;
            }
          }
        }
  
        if (!isSafePlace) {
          break;
        }
      }
  
      result.push(isSafePlace);
    }
  
    return result;
  }
  
  function isSafe(place, x, y) {
      
      const dir = [
          [-1, 0],
          [1, 0],
          [0, 1],
          [0, -1]
      ]
      
      for(let [dx, dy] of dir) {
          
          const nx = dx + x;
          const ny = dy + y
          
           if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5) {
               // 한칸 이동했는데 응시자가 있다?
               // 맨해튼 커리 위배(거리가 2이하면 안됌)
               if (place[nx][ny] === "P") {
                  return false;
                  // 빈 자리 기점으로 다시 주변 인접 좌표 탐색
               } else if (place[nx][ny] === "O") {
                 for(let [dx, dy] of dir) {
                     const nx2 = dx + nx;
                     const ny2 = dy + ny;
                     
                     if (nx2 >= 0 && nx2 < 5 && ny2 >= 0 && ny2 < 5) {
              // 현재 응시자의 위치가 아닌 경우
              if (nx2 !== x || ny2 !== y) {
                // 맨해튼 거리가 2이고 파티션 없이 응시자가 있는 경우
                if (place[nx2][ny2] === "P") {
                  return false;
                }
              }
            }
                 } 
               }
           }
      }
      return true;
  }
  
function solution(n, info) {
  let max = 0;
  let answer = [-1];
  let lion = Array(11).fill(0);

  function DFS(level, count) {
    // 종료조건
    if (level == 10) {
      lion[level] = count;
      // 점수비교
      let sum = 0;
      for (let i = 0; i < 10; i++) {
        if (lion[i] > info[i]) {
          sum = sum + (10 - i);
        } else if (lion[i] === info[i]) {
          continue;
        } else {
          sum = sum - (10 - i);
        }
      }

      if (sum > max) {
        max = sum;
        answer = [...lion];
      } else if (sum == max) {
        // 낮은 개수를 더 맞추는 경우를 답으로 채용함
        for (let j = 10; j > 0; j--) {
          if (answer[j] == lion[j]) {
            continue;
          } else if (lion[j] > answer[j]) {
            answer = [...lion];
            break;
          } else {
            break;
          }
        }
      }
      // 계속진행
    } else {
      // 남은 화살개수가 없거나 + 어피차보다 많이 못맞출경우
      if (count == 0 || count < info[level] + 1) {
        DFS(level + 1, count);
      } else {
        // 어피치보다 많이 맞출경우
        // 어피치가 쓴거보다 1개 추가하고 갯수에서 빼주기
        lion[level] = info[level] + 1;
        count = count - lion[level];
        DFS(level + 1, count);

        // 다른 점수로 돌릴경우, 화살을 쏘지 않기로 결정
        lion[level] = 0;
        //라이언이 쏜 만큼 다시 더해주고 다시 재귀
        count = count + (info[level] + 1);
        DFS(level + 1, count);
      }
    }
  }
  DFS(0, n);

  return answer;
}

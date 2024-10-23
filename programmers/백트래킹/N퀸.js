//백트래킹 문제 -> 자바스크립트 코테 책 몸 풀기 문제(2)
function search(n, y, width, diagonal1, diagonal2) {
  let answer = 0;

  if (y === n) {
    answer++;
  } else {
    for (let i = 0; i < n; i++) {
      if (width[i] || diagonal1[i + y] || diagonal2[i - y + n]) continue;
      width[i] = diagonal1[i + y] = diagonal2[i - y + n] = true;
      answer += search(n, y + 1, width, diagonal1, diagonal2);
      width[i] = diagonal1[i + y] = diagonal2[i - y + n] = false;
    }
  }

  return answer;
}

function solution(n) {
  const answer = search(
    n,
    0,
    Array(n).fill(false),
    Array(2 * n).fill(false),
    Array(2 * n).fill(false)
  );
  return answer;
}

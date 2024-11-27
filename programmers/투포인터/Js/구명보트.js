function solution(people, limit) {
  people.sort((a, b) => a - b); // 무게 오름차순 정렬

  let l = 0;
  let r = people.length - 1;
  let count = 0;

  while (l <= r) {
    // 조건 변경: l === r도 포함
    if (people[l] + people[r] <= limit) {
      // 두 사람을 같은 보트에 태울 수 있는 경우
      l++;
    }
    // 무거운 사람은 항상 보트에 태움
    r--;
    count++;
  }

  return count;
}

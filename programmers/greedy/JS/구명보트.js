function solution(people, limit) {
  //limit : 100
  people.sort((a, b) => a - b);
  //lastPeople이라는 고정된 길이로 설정 후 people[0]과 더하면 에러발생
  let count = 0;

  //반복문 1개로만 사용해야해복문 1개로만 사용해야해
  while (people.length) {
    if (people[0] + people[people.length - 1] <= limit) {
      people.shift();
      people.pop();
      count++;
    } else {
      people.pop();
      count++;
    }
  }

  return count;
}

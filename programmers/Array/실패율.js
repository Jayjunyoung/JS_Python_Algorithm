function solution(N, stages) {
  let result = [];
  for (let i = 1; i <= N; i++) {
    const curr = stages.filter((item) => item === i).length;
    const reach = stages.filter((item) => item >= i).length;
    result.push([i, curr / reach]);
  }
  //정렬하기
  result.sort((a, b) => b[1] - a[1]);
  return result.map((num) => num[0]);
}

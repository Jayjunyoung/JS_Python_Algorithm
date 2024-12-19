const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const N = Number(input[0]);
  const [type, ...nums] = input[1].split(" ");

  console.log(solution(N, Number(type), nums));
});

const solution = (N, type, nums) => {
  //각 숫자의 팩토리얼 값을 미리 계산하여 저장
  const factorial = Array.from(Array(N + 1)).reduce((array, _, i) => {
    if (i === 0) array.push(1n);
    else array.push(array[i - 1] * BigInt(i));

    return array;
  }, []);
  //순열에서 숫자가 이미 사용되었는지를 기록
  const used = Array(N + 1).fill(false);

  if (type === 1) {
    //k번째 순열을 찾는다
    let k = BigInt(nums[0]);

    return Array.from(Array(N))
      .map((_, i) => {
        for (let j = 1; j <= N; j++) {
          if (used[j]) continue;
          const restCases = factorial[N - i - 1];
          if (k <= restCases) {
            used[j] = true;
            return j;
          }
          k -= restCases;
        }
      })
      .join(" ");
  }

  const seq = nums.map(Number);

  return Array.from(Array(N))
    .reduce((result, _, i) => {
      let sum = result;
      for (let j = 1; j < seq[i]; j++) {
        if (used[j]) continue;
        sum += factorial[N - i - 1];
      }
      used[seq[i]] = true;
      return sum;
    }, 1n)
    .toString();
};

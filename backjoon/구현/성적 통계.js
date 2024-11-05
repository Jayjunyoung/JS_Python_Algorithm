const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const k = +input.shift();
//k는 2임
let results = [];

for (let i = 0; i < k; i++) {
  const classArray = input[i].split(" ").map(Number).slice(1);
  const sortedArray = classArray.sort((a, b) => b - a);

  let maxScore = sortedArray[0]; // 최고점
  let minScore = sortedArray[sortedArray.length - 1]; // 최저점

  let largestGap = 0;
  for (let j = 0; j < sortedArray.length - 1; j++) {
    const gap = sortedArray[j] - sortedArray[j + 1];
    largestGap = Math.max(largestGap, gap);
  }
  //점수차이는 어떻게 구하는거지?
  results.push(`Class ${i + 1}`);
  results.push(`Max ${maxScore}, Min ${minScore}, Largest gap ${largestGap}`);
}

console.log(results.join("\n"));

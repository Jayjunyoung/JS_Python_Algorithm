const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

const array = input.map(Number);
const sortedArray = array.sort((a, b) => a - b);

const sum = sortedArray.reduce((a, b) => a + b, 0);
//산술평균 = 2
const averageValue = Math.round(sum / n);
//범위
const wide = array[n - 1] - array[0];
//중앙값 인덱스
const midValue = sortedArray[Math.floor(n / 2)];

//최빈값 - map 자료구조 활용
const map = new Map();
let maxCount = 1;

array.forEach((v) => {
  if (map.has(v)) {
    map.set(v, map.get(v) + 1);
    maxCount = Math.max(maxCount, map.get(v));
  } else {
    map.set(v, 1);
  }
});

const modeArray = [];
for (let [num, count] of map) {
  if (count === maxCount) modeArray.push(num);
}

modeArray.sort((a, b) => a - b);
const mode = modeArray.length === 1 ? modeArray[0] : modeArray[1];

let result = `${averageValue}\n${midValue}\n${mode}\n${wide}`;
console.log(result);

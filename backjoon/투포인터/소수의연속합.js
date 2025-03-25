const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();
const isPrime = Array(n + 1).fill(true);
isPrime[0] = isPrime[1] = false;

//에라스토테네스의 체
for (let i = 2; i <= Math.sqrt(n); i++) {
  for (let j = i * i; j <= n; j += i) {
    isPrime[j] = false;
  }
}

//값이 true인 것들만 남겨버리기
const primes = isPrime.reduce((acc, cur, i) => {
  if (cur === true) {
    acc.push(i);
  }
  return acc;
}, []);

let sum = 0;
let count = 0;
let i = 0;
let j = 0;

while (j < primes.length) {
  sum += primes[j];
  while (sum > n) {
    sum -= primes[i];
    i++;
  }

  if (sum === n) {
    count++;
  }

  j++;
}

console.log(count);

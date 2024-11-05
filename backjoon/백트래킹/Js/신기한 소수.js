const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

//소수 판별 함수
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const findPrime = (num, length) => {
  if (length === n) {
    console.log(num);
    return;
  }

  for (let i = 1; i <= 9; i++) {
    const newNum = num * 10 + i;
    if (isPrime(newNum)) {
      findPrime(newNum, length + 1);
    }
  }
};

[2, 3, 5, 7].forEach((prime) => findPrime(prime, 1));

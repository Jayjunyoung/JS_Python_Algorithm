const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let [t, ...arr] = input;

arr = arr.map((item) => item.split(" ").map(Number));
let answer = "";

for (let i = 0; i < arr.length; i += 2) {
  let count = 0;
  const priorities = arr[i + 1];
  let location = arr[i][1];

  while (true) {
    const max = Math.max(...priorities);

    const number = priorities.shift();

    if (number === max) {
      count++;
      if (location === 0) {
        answer += count + "\n";
        break;
      }
    } else {
      priorities.push(number);
    }

    if (location === 0) {
      location = priorities.length - 1;
    } else {
      location--;
    }
  }
}

//개행문자 "\n" 제거 용
console.log(answer.trim());

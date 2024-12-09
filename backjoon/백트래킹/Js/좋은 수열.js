const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

let temp = Array.from({ length: n }, () => 0);

//다시 풀어보자

const dfs = (L) => {
  if (L === n) {
    console.log(temp.join(""));
    process.exit(); //작은 값 나오자마자 종료시켜버리기
  } else {
    for (let i = 1; i <= 3; i++) {
      temp[L] = i;
      if (check(temp, L + 1)) {
        dfs(L + 1);
      }
    }
  }
};

dfs(0);

function check(temp, length) {
  for (let i = 1; i <= Math.floor(length / 2); i++) {
    const sub1 = temp.slice(length - i * 2, length - i).join("");
    const sub2 = temp.slice(length - i, length).join("");

    if (sub1 === sub2) return false;
  }

  return true;
}

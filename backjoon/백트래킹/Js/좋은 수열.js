const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.shift();

let temp = Array.from({ length: n }, () => 0);

const dfs = (L) => {
  if (L === n) {
    console.log(temp.join(""));
    process.exit();
  } else {
    for (let i = 1; i <= 3; i++) {
      temp[L] = i;
      if (check(temp, L + 1)) {
        //첨에 L+1은 1이므로 곧 바로 check 함수는 true 반환
        dfs(L + 1);
      }
    }
  }
};

dfs(0);

function check(temp, length) {
  for (let i = 1; i <= Math.floor(length / 2); i++) {
    const sub1 = temp.slice(length - i * 2, length - i).join(""); //sub1 = 1
    const sub2 = temp.slice(length - i, length).join(""); //sub2 = 1

    if (sub1 === sub2) {
      return false; //false이므로 temp[1] = 2(i는 이때 2)로 설정
    }
  }
  return true;
}

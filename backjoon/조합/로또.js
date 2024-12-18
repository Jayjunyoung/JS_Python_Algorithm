const input = require("fs")
  .readFileSync(process.platform === "linux" ? "./dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let result = "";

for (let i = 0; i < input.length - 1; i++) {
  // 스프레드 연산자를 활용해 k개의 수로 이루이진 배열 가져오기
  const [k, ...arr] = input[i].split(" ").map(Number);

  const combination = [];

  const dfs = (start) => {
    //집합 S만든 뒤 6개의 번호 선택했다면 result에 합산
    if (combination.length === 6) {
      result += combination.join(" ") + "\n";
      return;
    }

    for (let j = start; j < k; j++) {
      combination.push(arr[j]);
      dfs(j + 1);
      combination.pop();
    }
  };

  dfs(0);
  result += "\n";
}

console.log(result.trim());

const fs = require("fs");
let [cases, ...input] = fs
  .readFileSync(0, "utf-8")
  .toString()
  .trim()
  .split("\n");

let dress_info = [];
let answer = ""; //""로 해야 줄바꿈 문자열과 이어지므로 0으로 초기화 하면 안됌
let n = 0; //의상의 수
let index = 0; //input 배열을 순회하기 위한 index
let sum = 1;

for (let i = 0; i < Number(cases); i++) {
  sum = 1;
  n = Number(input[index++].trim());
  //n이 3이 나올 것
  let dress = new Map();

  for (let j = 0; j < n; j++) {
    //여기서 index는 1일것 왜냐? 위에서 0의 후위연산자로 1로 증가
    dress_info = input[index++].trim().split(" ");

    if (dress.has(dress_info[1])) {
      dress.set(dress_info[1], dress.get(dress_info[1]) + 1);
    } else {
      dress.set(dress_info[1], 1);
    }
  }

  if (dress.size === 1) {
    answer += n + "\n";
  } else {
    const dressMapArray = Array.from(dress);
    //dress를 키-값 쌍의 배열로 반환
    //ex dressMapArray[0] 을 출력하면 map 자료구조 였을때의 첫번째 key - value로 이루어진 배열 요소 출력
    dressMapArray.forEach(([type, count]) => {
      //의상을 선택하지 않는 경우도 포함
      sum *= Number(count) + 1;
    });
    //모든 종류의 의상을 입지않는 경우는 빼주기
    answer += sum - 1 + "\n";
  }
}

console.log(answer.trim());

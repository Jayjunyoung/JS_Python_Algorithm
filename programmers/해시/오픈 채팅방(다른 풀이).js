function solution(record) {
  let answer = [];
  let userObj = {};

  // 1. 모든 명령어를 순회하며 최신 닉네임 저장
  for (let line of record) {
    // for...of 사용
    let [command, userId, nickname] = line.split(" ");
    if (command !== "Leave") {
      userObj[userId] = nickname; // 명령어가 Enter, Command 일 때 userId에 해당하는 닉네임 갱신
    }
  }

  // 2. 최종 메시지 배열 생성
  for (let line of record) {
    // for...of 사용
    let [command, userId] = line.split(" ");

    if (command === "Enter") {
      answer.push(`${userObj[userId]}님이 들어왔습니다.`);
    } else if (command === "Leave") {
      answer.push(`${userObj[userId]}님이 나갔습니다.`);
    }
  }

  return answer;
}

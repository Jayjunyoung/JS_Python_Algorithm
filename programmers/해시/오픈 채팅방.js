function solution(record) {
  let answer = [];
  let userObj = {};

  for (let i = 0; i < record.length; i++) {
    let [command, userId, Nickname] = record[i].split(" ");

    if (command === "Enter") {
      //Prodo가 들어올 때 해당 아이디에 해당하는 닉네임 변경
      userObj[userId] = Nickname;
      answer.push([userId, "님이 들어왔습니다."]);
    } else if (command === "Leave") {
      answer.push([userId, "님이 나갔습니다."]);
    } else if (command === "Change") {
      userObj[userId] = Nickname;
    }
  }

  return answer.map(([userId, message]) => `${userObj[userId]}${message}`);
}

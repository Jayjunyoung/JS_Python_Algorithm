function solution(participant, completion) {
  let playerHash = {};

  participant.forEach((entry) => {
    playerHash[entry] = playerHash[entry] ? playerHash[entry] + 1 : 1;
  });

  completion.forEach((complete) => {
    //완료한 사람은 -1 해주기
    playerHash[complete] = playerHash[complete] - 1;
  });

  for (let key in playerHash) {
    if (playerHash[key] >= 1) return key;
  }
}

function solution(name, yearning, photo) {
  let answer = [];
  let scoreMap = new Map();
  let score = 0;

  for (let i = 0; i < name.length; i++) {
    scoreMap.set(name[i], yearning[i]);
  }

  for (let i = 0; i < photo.length; i++) {
    score = 0;
    const row = photo[i];
    for (let j = 0; j < row.length; j++) {
      if (scoreMap.has(row[j])) {
        score += scoreMap.get(row[j]);
      }
    }
    answer.push(score);
  }

  return answer;
}

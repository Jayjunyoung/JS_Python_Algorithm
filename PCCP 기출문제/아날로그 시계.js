function timeToSecond(h, m, s) {
  return s + m * 60 + h * 60 * 60;
}

const getDegree = (s) => {
  //시간을 가지고 각 침의 각도 계산

  const hour = parseInt(s / 3600);
  const minute = parseInt((s % 3600) / 60);
  const second = parseInt((s % 3600) % 60);

  const hourDegree = (hour % 12) * 30 + minute * 0.5 + second * (1 / 120);
  const minuteDegree = minute * 6 + second * 0.1;
  const secondDegree = second * 6;

  return [hourDegree, minuteDegree, secondDegree];
};

//시침이랑 초침을 따져
const hourMatch = (currentDegree, laterDegree) => {
  const curHour = currentDegree[0];
  const curSecond = currentDegree[2];

  const laterHour = laterDegree[0];
  const laterSecond = laterDegree[2];

  if (curHour > curSecond && laterHour <= laterSecond) return true;
  if (curSecond === 354 && curHour > 354) return true;

  return false;
};

const minuteMatch = (currentDegree, laterDegree) => {
  const curMinute = currentDegree[1];
  const curSecond = currentDegree[2];

  const laterMinute = laterDegree[1];
  const laterSecond = laterDegree[2];

  if (curMinute > curSecond && laterMinute <= laterSecond) return true;

  if (curSecond === 354 && curMinute > 354) return true;

  return false;
};

function solution(h1, m1, s1, h2, m2, s2) {
  let answer = 0;

  const start = timeToSecond(h1, m1, s1);
  const end = timeToSecond(h2, m2, s2);

  if (start === 0 || start === 43200) answer += 1;

  for (let i = start; i < end; i++) {
    const currentDegree = getDegree(i);

    const laterDegree = getDegree(i + 1);

    if (
      minuteMatch(currentDegree, laterDegree) &&
      hourMatch(currentDegree, laterDegree)
    ) {
      if (laterDegree[0] === laterDegree[1]) answer += 1;
      else answer += 2;
    } else if (
      minuteMatch(currentDegree, laterDegree) ||
      hourMatch(currentDegree, laterDegree)
    ) {
      answer += 1;
    }
  }

  return answer;
}

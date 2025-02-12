function solution(bandage, health, attacks) {
  let answer = 0;

  let attackMap = new Map(attacks);
  let lastAttackTime = Math.max(...attackMap.keys());

  const MAX = health;
  let hp = health; //현재 체력을 초반엔 최대로 설정
  let success = 0; //연속 성공 횟수 변수

  for (let i = 1; i <= lastAttackTime; i++) {
    if (hp <= 0) break;

    if (!attackMap.has(i)) {
      success++;
      if (success === bandage[0]) {
        hp += bandage[2];
        success = 0;
      }
      hp += bandage[1];
    } else {
      hp -= attackMap.get(i);
      success = 0;
    }

    if (hp > MAX) {
      hp = MAX;
    }
  }

  answer = hp <= 0 ? -1 : hp;

  return answer;
}

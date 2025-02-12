function solution(bandage, health, attacks) {
  const [time, recovery, bonusRecovery] = bandage;

  let curHealth = health;

  //가장 최근 공격 시간을 기록
  let curAttack = 0;

  for (let [attackTime, damage] of attacks) {
    const timeDiff = attackTime - curAttack - 1;

    const success = Math.floor(timeDiff / time);

    const totalRecovery = timeDiff * recovery + success * bonusRecovery;
    curHealth += totalRecovery;

    if (curHealth >= health) {
      curHealth = health;
    }

    curHealth -= damage;

    if (curHealth <= 0) {
      return -1;
    }

    curAttack = attackTime;
  }

  return curHealth;
}

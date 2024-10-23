function solution(name) {
  // 알파벳 변경 횟수(상하 이동)
  let spellMove = 0;

  // 커서 이동 횟수, 이름의 길이 - 1(좌우 이동)
  let cursorMove = name.length - 1;

  for (let i = 0; i < name.length; i++) {
    const spell = name[i];

    spellMove += Math.min(
      spell.charCodeAt(0) - "A".codePointAt(0),
      "Z".charCodeAt(0) - spell.charCodeAt(0) + 1
    );

    let next = i + 1;
    while (next < name.length && name[next] === "A") {
      next++;
    }

    cursorMove = Math.min(
      cursorMove,
      2 * i + (name.length - next),
      i + 2 * (name.length - next)
    );
  }

  return spellMove + cursorMove;
}

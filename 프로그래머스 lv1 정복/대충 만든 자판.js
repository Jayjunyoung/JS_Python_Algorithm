function solution(keymap, targets) {
  const answer = [];
  const map = {};

  for (let items of keymap) {
    items
      .split("")
      .map(
        (item, index) =>
          (map[item] = map[item] < index + 1 ? map[item] : index + 1)
      );
  }

  for (let items of targets) {
    answer.push(items.split("").reduce((acc, cur) => acc + map[cur], 0) || -1);
  }

  return answer;
}

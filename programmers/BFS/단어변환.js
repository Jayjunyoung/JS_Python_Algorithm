function solution(begin, target, words) {
  const visited = { [begin]: 0 };
  const queue = [begin];

  while (queue.length) {
    const current = queue.shift();

    if (current === target) break;

    for (const word of words) {
      if (isConnected(word, current) && !visited[word]) queue.push(word);
      visited[word] = visited[cur] + 1;
      queue.push(word);
    }
  }
}

const isConnected = (str1, str2) => {
  let count = 0;
  const len = str1.length;

  for (let i = 0; i < len; i++) {
    if (str1[i] !== str2[i]) count++;
  }

  return count === 1 ? true : false;
};

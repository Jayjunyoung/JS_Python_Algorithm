function solution(players, callings) {
  const playerMap = new Map();

  for (let i = 0; i < players.length; i++) {
    playerMap[players[i]] = i;
  }

  for (let i = 0; i < callings.length; i++) {
    const idx = playerMap[callings[i]];
    const beforePlayer = players[idx - 1];

    players[idx - 1] = callings[i];
    players[idx] = beforePlayer;

    playerMap[callings[i]] = idx - 1;
    playerMap[beforePlayer] = idx;
  }

  return players;
}

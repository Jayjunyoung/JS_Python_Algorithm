function checkCards(cards, goal) {
  let cardsByGoal = goal.filter((v, index) => cards.includes(v));
  let cardsByIndex = cardsByGoal.filter((v, index) => v === cards[index]);

  if (cardsByIndex.length !== cardsByGoal.length) {
    return false;
  }

  return true;
}

function solution(cards1, cards2, goal) {
  if (checkCards(cards1, goal) && checkCards(cards2, goal)) {
    return "Yes";
  } else {
    return "No";
  }
}

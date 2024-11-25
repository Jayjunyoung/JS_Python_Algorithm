function solution(message) {
  let answer = "";

  // 완전 이진 트리 형태로 배열에 저장
  const tree = Array(message.length).fill(null);
  for (let i = 0; i < message.length; i++) {
    tree[i] = message[i];
  }

  // 후위 순회 함수 정의
  function postOrder(index) {
    if (index >= tree.length || tree[index] === null) return;

    // 왼쪽 자식 순회
    postOrder(2 * index + 1);

    // 오른쪽 자식 순회
    postOrder(2 * index + 2);

    // 현재 노드 방문
    answer += tree[index];
  }

  // 루트 노드에서 시작하여 후위 순회 실행
  postOrder(0);

  return answer;
}

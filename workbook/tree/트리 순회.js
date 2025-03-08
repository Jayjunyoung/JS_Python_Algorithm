function preOrder(nodes, index) {
  if (index < nodes.length) {
    let ref = `${nodes[index]} `;
    ref += preOrder(nodes, index * 2 + 1);
    ref += preOrder(nodes, index * 2 + 2);

    return ref;
  }
  return "";
}

function inOrder(nodes, index) {
  if (index < nodes.length) {
    let ref = inOrder(nodes, index * 2 + 1);
    ref += `${nodes[index]} `;
    ref += inOrder(nodes, index * 2 + 2);

    return ref;
  }
  return "";
}

function postOrder(nodes, index) {
  if (index < nodes.length) {
    let ref = postOrder(nodes, index * 2 + 1);

    ref += postOrder(nodes, index * 2 + 2);

    ref += `${nodes[index]} `;

    return ref;
  }
  return "";
}

function solution(nodes) {
  return [
    preOrder(nodes, 0).slice(0, -1),
    inOrder(nodes, 0).slice(0, -1),
    postOrder(nodes, 0).slice(0, -1),
  ];
}

console.log(solution([1, 2, 3, 4, 5, 6, 7]));

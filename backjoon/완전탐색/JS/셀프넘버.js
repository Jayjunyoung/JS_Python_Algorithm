function solve() {
  const naturalSum = new Set([...Array(10000).keys()].map((x) => x + 1));
  const generatedSum = new Set();

  for (let i = 1; i <= 10000; i++) {
    let num = i;
    for (let j of String(i)) {
      //문자로 바꿔준걸 다시 숫자로 바꿔주어 더해주기
      num += parseInt(j);
    }
    generatedSum.add(num);
  }

  const selfNums = [...naturalSum]
    .filter((x) => !generatedSum.has(x))
    .sort((a, b) => a - b);

  selfNums.forEach((num) => {
    console.log(num);
  });
}

solve();

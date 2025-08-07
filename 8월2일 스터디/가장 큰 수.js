function solution(numbers) {
  let sortedNumber = numbers
    .map((value) => String(value))
    .sort((a, b) => b + a - (a + b))
    .join("");

  return sortedNumber[0] === "0" ? "0" : sortedNumber;
}

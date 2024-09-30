function solution(today, terms, privacies) {
  // 년, 월을 일자로 통일하여 구하는 방법
  let [year, month, day] = today.split(".").map(Number);
  const todayDate = year * 12 * 28 + month * 28 + day;
  let termsObj = {};

  terms.forEach((term, index) => {
    const [contract, month] = term.split(" ");
    termsObj[contract] = Number(month);
  });
  let ans = [];

  privacies.forEach((privacy, idx) => {
    let [date, contract] = privacy.split(" ");
    date = date.split(".").map(Number);

    const newDate =
      date[0] * 12 * 28 + date[1] * 28 + date[2] + termsObj[contract] * 28;

    if (newDate <= todayDate) {
      ans.push(idx + 1);
    }
  });
  return ans;
}

function solution(today, terms, privacies) {
  const todayDate = Number(today.split(".").join(""));
  let termsObj = {};
  terms.forEach((term, _index) => {
    const [contract, month] = term.split(" ");
    termsObj[contract] = Number(month);
  });
  let ans = [];
  privacies.forEach((privacy, index) => {
    let [date, contract] = privacy.split(" ");
    let [year, month, day] = date.split(".").map(Number);
    month += termsObj[contract];

    while (month > 12) {
      year += 1;
      month -= 12;
    }

    year = String(year);
    month = String(month).padStart(2, "0");
    day = String(day).padStart(2, "0");

    const caculatedTime = Number(year + month + day);
    if (caculatedTime <= todayDate) {
      ans.push(index + 1);
    }
  });
  return ans;
}

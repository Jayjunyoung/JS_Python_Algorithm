function solution(today, terms, privacies) {
  const todayDate = Number(today.split(".").join(""));
  let termsObj = {};
  let answer = [];

  terms.forEach((term, _index) => {
    const [termType, expiredDate] = term.split(" ");
    termsObj[termType] = Number(expiredDate);
  });

  privacies.forEach((privacy, index) => {
    const [date, termType] = privacy.split(" ");
    let [year, month, day] = date.split(".").map(Number);

    month += termsObj[termType];

    while (month > 12) {
      month -= 12;
      year += 1;
    }

    let calculateDate = Number(
      String(year) +
        String(month).padStart(2, "0") +
        String(day).padStart(2, "0")
    );

    if (calculateDate <= todayDate) {
      answer.push(index + 1);
    }
  });

  return answer;
}

function solution(expressions) {
  // 숫자 문자열이 주어진 진법에서 유효한지 (각 자리의 숫자가 base 미만인지) 검사하는 함수
  function isValidForBase(numStr, base) {
    for (let char of numStr) {
      const digit = char.charCodeAt(0) - "0".charCodeAt(0);
      if (digit >= base) return false;
    }
    return true;
  }

  // 주어진 숫자 문자열을 base진법으로 정수값으로 변환 (내장 parseInt 사용)
  function convertToInt(numStr, base) {
    return parseInt(numStr, base);
  }

  // 정수 num을 base진법의 문자열로 변환 (0일때 "0" 반환)
  function convertFromInt(num, base) {
    if (num === 0) return "0";

    let res = "";

    while (num > 0) {
      res = (num % base).toString() + res;
      num = Math.floor(num / base);
    }
    return res;
  }

  // 2~9진법 중, 주어진 수식들이 모두 성립하는 후보 진법을 찾기
  const candidateBases = [];
  for (let b = 2; b <= 9; b++) {
    let valid = true;
    for (const exp of expressions) {
      // 수식은 "A op B = C" 형태이므로 공백으로 split
      const tokens = exp.split(" ");
      const A = tokens[0],
        op = tokens[1],
        B = tokens[2],
        // tokens[3]는 '='
        C = tokens[4];

      // A와 B는 X와 관계없이 진법 b에서 유효해야 함
      if (!isValidForBase(A, b) || !isValidForBase(B, b)) {
        valid = false;
        break;
      }

      // 결과가 X가 아닌 경우에만 식이 올바른지 검사
      if (C !== "X") {
        if (!isValidForBase(C, b)) {
          valid = false;
          break;
        }
        const aVal = convertToInt(A, b);
        const bVal = convertToInt(B, b);
        const cVal = convertToInt(C, b);
        if (op === "+") {
          if (aVal + bVal !== cVal) {
            valid = false;
            break;
          }
        } else if (op === "-") {
          if (aVal - bVal !== cVal) {
            valid = false;
            break;
          }
        }
      }
    }
    if (valid) candidateBases.push(b);
  }

  // 결괏값이 X인 수식들에 대해 복원한 결과를 저장할 배열
  const answer = [];
  for (const exp of expressions) {
    const tokens = exp.split(" ");
    const A = tokens[0],
      op = tokens[1],
      B = tokens[2],
      // tokens[3]는 '='
      C = tokens[4];

    if (C === "X") {
      // 복원해야 할 식인 경우
      const resultSet = new Set();
      // 후보 진법 각각에 대해 결과 계산
      for (const base of candidateBases) {
        // A와 B가 base에서 유효한지 (후보진법 결정시 이미 검사했지만 혹시 모를 경우)
        if (!isValidForBase(A, base) || !isValidForBase(B, base)) continue;
        const aVal = convertToInt(A, base);
        const bVal = convertToInt(B, base);
        let computed;
        if (op === "+") computed = aVal + bVal;
        else computed = aVal - bVal;

        const resultStr = convertFromInt(computed, base);
        resultSet.add(resultStr);
      }
      // 모든 후보 진법에서 산출된 결과가 동일하면 확정, 아니면 "?" 처리
      const finalResult =
        resultSet.size === 1
          ? //values()로 모인 값에서 차례대로 접근
            resultSet.values().next().value
          : "?";

      answer.push(`${A} ${op} ${B} = ${finalResult}`);
    }
  }

  return answer;
}

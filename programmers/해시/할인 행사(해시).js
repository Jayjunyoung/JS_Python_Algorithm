function isShallowHash(object1, object2) {
  const object1Keys = Object.keys(object1);
  const object2Keys = Object.keys(object2);

  if (object1Keys.length !== object2Keys.length) return false;

  for (let key of object1Keys) {
    const value1 = object1[key];
    const value2 = object2[key];

    if (value1 !== value2) {
      return false;
    }
  }

  return true;
}

function solution(want, number, discount) {
  const wantObj = {};

  for (let i = 0; i < want.length; i++) {
    wantObj[want[i]] = number[i];
  }

  let answer = 0;

  for (let i = 0; i < discount.length - 9; i++) {
    const discount10d = {}

    for(let j = i; j < i + 10; j++) {

      if(wantObj[discount[j]]) {
        discount10d[discount[j]] = (discount10d[discount[j]] || 0) + 1;
      }
      
    }

    if (isShallowHash(discount10d, wantObj)) {
      answer++;
    }
  }

  return answer;
}

function solution(phone_book) {
  let hashTable = {};

  for (let number of phone_book) {
    hashTable[number] = true;
  }

  for (let number of phone_book) {
    for (let i = 1; i < number.length; i++) {
      let prefix = number.slice(0, i);
      if (hashTable[prefix]) return false;
    }
  }

  return true;
}

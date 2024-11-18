function solution(arr1, arr2) {
  const mergeArray = [];

  let i,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      mergeArray.push(arr1[i]);
      i += 1;
    } else {
      mergeArray.push(arr2[j]);
      j += 1;
    }
  }

  while (i < arr1.length) {
    mergeArray.push(arr1[i]);
    i += 1;
  }

  while (j < arr2.length) {
    mergeArray.push(arr2[j]);
    j += 1;
  }

  return mergeArray;
}

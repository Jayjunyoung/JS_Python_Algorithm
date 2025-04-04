function solution(genres, plays) {
  let answer = [];

  // 1번 과정
  let playCntByGenre = {};

  for (let i = 0; i < genres.length; i++) {
    playCntByGenre[genres[i]] = playCntByGenre[genres[i]]
      ? playCntByGenre[genres[i]] + plays[i]
      : plays[i];
  }

  // 여기서 playCntByGenre는 {classic:1450,pop:3100} 형태

  // 재생횟수로 내림차순 정렬하기 위해, [키,밸류]의 배열 형태로 만들어준다
  let keyValueArr = Object.entries(playCntByGenre);
  keyValueArr.sort((a, b) => b[1] - a[1]);
  // 정렬함수의 compareFunc 작성시, return 값이 양수면 앞뒤순서가 바뀐다는 점을 기억하면 쉽다!

  // 여기서 keyValueArr는 [ [ 'pop', 3100 ], [ 'classic', 1450 ] ] 형태

  // 2번 과정
  let allInfoObj = genres.map((g, i) => ({
    genre: g,
    index: i,
    playCnt: plays[i],
  }));

  // 3번 과정
  keyValueArr.forEach((val, i) => {
    let current = [];
    for (let j = 0; j < allInfoObj.length; j++) {
      if (val[0] === allInfoObj[j].genre) {
        //allInfoObj의 각 요소는 객체임
        current.push(allInfoObj[j]);
      }
    }

    current.sort((a, b) => b.playCnt - a.playCnt);
    current.forEach((a, i) => {
      if (i < 2) {
        answer.push(a.index);
      }
    });
  });

  return answer;
}

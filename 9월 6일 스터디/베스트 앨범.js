function solution(genres, plays) {
    var answer = [];
    
    let playCntByGenre = {};
    
    for(let i = 0; i < genres.length; i++) {
        playCntByGenre[genres[i]] = playCntByGenre[genres[i]] ? playCntByGenre[genres[i]] + plays[i] : plays[i];
    }
    
    // 키 - 값 형태로 생성
    // playCntByGenre는 {classic:1450,pop:3100} 형태
    // 많이 재생 된 장르를 세팅해주기 위해 구현하는 부분
    let keyValueArr = Object.entries(playCntByGenre);
    keyValueArr.sort((a, b) => b[1] - a[1]);
    
    // 모든 정보를 담기 위해 구현하는 부분
    let allInfoObj = genres.map((g, i) => ({
        genre: g,
        index: i,
        playCnt: plays[i]
    }))
    
    keyValueArr.forEach((v, _i) => {
        let current = [];
        for(let j = 0; j < allInfoObj.length; j++) {
            if(v[0] === allInfoObj[j].genre) {
                current.push(allInfoObj[j]);
            }
        }
        
        current.sort((a,b) => b.playCnt - a.playCnt);
        // 장르 별로 가장 많이 재생 된 2개를 출력해야하므로 if(i < 2) 조건 추가
        current.forEach((a, i) => {
            if(i < 2) {
                answer.push(a.index)
            }
        })
    })
    
    return answer;
}
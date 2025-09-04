function solution(genres, plays) {
    var answer = [];
    
    let playCntByGenre = {}
    
    for(let i = 0; i < genres.length; i++) {
        playCntByGenre[genres[i]] = playCntByGenre[genres[i]] ? playCntByGenre[genres[i]] + plays[i] : plays[i];
    }
    
    let keyValueArr = Object.entries(playCntByGenre);
    keyValueArr.sort((a, b) => b[1] - a[1]);
    
    let allInfoObj = genres.map((g,i) => ({
        genre: g,
        index: i,
        playCnt: plays[i]
    }))
                                
    keyValueArr.forEach((v, i) => {
        let current = [];
        
        for(let j = 0; j < allInfoObj.length; j++) {
            if(v[0] === allInfoObj[j].genre) {
                current.push(allInfoObj[j]);
            }
        }
        
        current.sort((a, b) => b.playCnt - a.playCnt);
        
        current.forEach((v, i) => {
            if(i < 2) {
              answer.push(v.index);   
            }
        })
    })               
    
    
    return answer;
}
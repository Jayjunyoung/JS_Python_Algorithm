const moveBlock = (block) => {
    const minX = Math.min(...block.map(v => v[0]));
    const minY = Math.min(...block.map(v => v[1]));
    
    return block.map(v => [v[0]-minX, v[1]-minY]).sort(); 
}

const rotate = (block) => {
    
    const max = Math.max(...block.map(v => Math.max(v[0], v[1])));
    const rotateBlock = block.map(v => [max-v[1], v[0]]); 
    
    return moveBlock(rotateBlock);
}

const bfs = (start, table, k) => {
    const dir = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1]
    ]
    let needVisit = start;
    let block = [];
    
    while(needVisit.length > 0) {
        let [cx, cy] = needVisit.shift();
        block.push([cx, cy]);
        for(let [dx, dy] of dir) {
            const [nx, ny] = [cx + dx, cy + dy];
            
            if(nx < 0 || ny < 0 || nx >= table.length || ny >= table.length) continue;
             else if(table[nx][ny]===k) continue;
             else {
                needVisit.push([nx,ny])
                table[nx][ny]=k
             }
        }
    }
    
    return moveBlock(block);
}

function solution(game_board, table) {
    
    let blanks = [];
    let blocks = [];
    
    for(let i = 0; i < game_board.length; i++) {
        for(let j = 0; j < game_board.length; j++) {
            if(game_board[i][j] === 0) {
                game_board[i][j] = 1;
                blanks.push(bfs([[i, j]], game_board, 1))
            }
        }
    }
    
    for(let i=0;i<table.length;i++){
         for(let j=0;j<table.length;j++){
            if(table[i][j] === 1){
                 table[i][j] = 0
                 blocks.push(bfs([[i,j]], table, 0))
            }
         }
     }
    
     let answer = 0;
     blocks.forEach((val) => {
         for(let i = 0; i < blanks.length; i++) {
             let match = false;
             for(let j = 0; j < 4; j++) {
                 val = rotate(val);
                 if(JSON.stringify(val) === JSON.stringify(blanks[i])) {
                     blanks.splice(i, 1);
                     answer += val.length;
                     match = true;
                     break;
                 }
             }
             if(match) break;
         }
     })
        
     return answer;
}
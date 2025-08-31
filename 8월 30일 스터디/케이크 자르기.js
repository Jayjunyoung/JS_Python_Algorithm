const fs = require('fs');
const input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

// 2, 5, 70
const [N, M, L] = input.shift().split(' ').map(Number);

let cake = new Array(M+1);

for(let i = 0; i< cake.length - 1; i++){
  let temp = Number(input.shift());
  cake[i] = temp;
}

cake[M] = L;

let testCase = new Array(N);

for(let i = 0; i < testCase.length; i++){
  testCase[i] = Number(input.shift());
}

function check(mid,q){
  let prev = 0;
  for(let i = 0; i < cake.length; i++){
    if(cake[i] - prev >= mid){
      q--;
      prev = cake[i];
    }
  }

  return q < 0 ? true : false;
}


function sol(q){
  let answer = 0;
  let start = 0;
  let end = L;  

  while(start <= end){
    let mid = parseInt((start + end)/2);

    if(check(mid,q)){
      answer = answer > mid ? answer : mid;
      start = mid+1;
    }
    else{
      end = mid-1;
    }
  }

  return answer;
}

for(let i = 0; i < testCase.length; i++){
  let q = testCase[i];
  //console.log(q);
  console.log(sol(q));
}
function lastFun(arr){
  var len  = arr.length;
  for(var i = len-1; i >= 0;i--){
    if(arr[i] !== 0){
      return i;
    }
    else {
      arr.pop();
    }
  }
  return -1;
}

function delFun(deliveries, cap) {
    let index = lastFun(deliveries)
    let currentIndex = index;
    
    while(index !== -1 && cap > 0) {
        if(cap <= deliveries[index]) {
            deliveries[index] -= cap
            cap = 0;
            break;
        }
        
        if(cap > deliveries[index]) {
            cap -= deliveries[index];
            deliveries[index] = 0;
            index--;
        }
        
    }
    
    return currentIndex;
}

function pickFun(deliveries, cap) {
    let index = lastFun(deliveries)
    let currentIndex = index;
    
    while(index !== -1 && cap > 0) {
        if(cap <= deliveries[index]) {
            deliveries[index] -= cap;
            cap = 0;
            break;
        }
        
        else if(cap > deliveries[index]) {
            cap -= deliveries[index];
            deliveries[index] = 0;
            index--
        }
        
    }
    
    return currentIndex;
}

function solution(cap, n, deliveries, pickups) {
    let answer = 0;
    //배열 마지막부터 0이 아닌곳 찾기 전부 0이면 -1을 리턴
    
    while(true) {
      let delLen = delFun(deliveries,cap) + 1;
      let pickLen = pickFun(pickups,cap) + 1;
      if(delLen === 0 && pickLen === 0){
        return answer;
      }
      else if(delLen > pickLen){
        answer += delLen * 2;
      }
      else{
        answer += pickLen *2;
      }

    }
    
    return answer;
}
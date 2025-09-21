function solution(bridge_length, weight, truck_weights) {
    let bridge = Array.from({length: bridge_length}, () => 0);
    let bridge_sum = 0;
    
    let answer = 0;
    answer++;
    bridge.shift();
    bridge_sum += truck_weights[0];
    bridge.push(truck_weights.shift());
    
    while(bridge_sum > 0) {
        answer++;
        
        // 다리에서 나갈 때 다리 무게에서 감소
        bridge_sum -= bridge.shift();
         
        // 다리에 올라올 트럭 갯수 있고 다리 무게 제한을 넘지않는지 판단
        if(truck_weights.length > 0 && bridge_sum + truck_weights[0] <= weight) {
            bridge_sum += truck_weights[0];
            bridge.push(truck_weights.shift())
        } else {
            bridge.push(0)
        }
        
    }
    
    return answer;
}
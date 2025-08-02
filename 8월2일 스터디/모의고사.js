function solution(answers) {
    // 수포자들이 찍는 방식
    let way1 = [1, 2, 3, 4, 5]
    let way2 = [2, 1, 2, 3, 2, 4, 2, 5]
    let way3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    
    let answer = [];
    
    //필터링이 핵심 로직
    let ans1 = answers.filter((a, i) => a === way1[i % way1.length]).length;
    let ans2 = answers.filter((a, i) => a === way2[i % way2.length]).length;
    let ans3 = answers.filter((a, i) => a === way3[i % way3.length]).length;
    
    let max = Math.max(ans1, ans2, ans3);
    
    if(ans1 === max) answer.push(1);
    if(ans2 === max) answer.push(2);
    if(ans3 === max) answer.push(3);
    
    return answer;
}
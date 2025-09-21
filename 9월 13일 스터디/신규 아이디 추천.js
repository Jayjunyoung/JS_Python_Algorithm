function solution(new_id) {
    const answer = new_id
    .toLowerCase()
    .replace(/[^\w-_.]/g, "")
    .replace(/\.+/g, ".")
    .replace(/^\.|\.$/g, "")
    .replace(/^$/g, "a")
    .slice(0, 15).replace(/\.$/g, "")

    const len = answer.length;
    
    // 마지막 문자를 3이 될 떄까지 반복
    return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);

}
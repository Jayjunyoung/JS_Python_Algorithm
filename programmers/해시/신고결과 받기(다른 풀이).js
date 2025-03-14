function solution(id_list, report, k) {
  let count = {}; //신고 한 사람이 2명 이상인 id_list에 있는 사람을 count 객체에 넣기
  let reportedUser = {}; //키: 신고 당한 사람, 값: 신고를 한 사람(얜 중복이 안돼)

  for (let re of report) {
    const [userId, reportedId] = re.split(" ");

    if (reportedUser[reportedId] === undefined) {
      reportedUser[reportedId] = new Set(); //신고를 한 사람은 중복 안되게
    }

    reportedUser[reportedId].add(userId);
  }

  //신고 당한 사람들의 key를 기준으로 for문 돌려
  for (const reportedId of Object.keys(reportedUser)) {
    if (reportedUser[reportedId].size >= k) {
      //신고 한 사람이 k명 이상이면
      for (let uid of reportedUser[reportedId]) {
        //신고 한 사람 데이터를 순회 해
        count[uid] = (count[uid] || 0) + 1;
      }
    }
  }

  const answer = [];
  for (let i = 0; i < id_list.length; i++) {
    answer.push(count[id_list[i]] || 0);
  }

  return answer;
}

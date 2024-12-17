function solution(id_list, report, k) {
  let count = {};
  let reportedUser = {}; //키: 신고 당한 사람, 값: 신고를 한 사람(얜 중복이 안돼)

  for (let re of report) {
    const [userId, reportedId] = re.split(" ");

    if (reportedUser[reportedId] === undefined) {
      reportedUser[reportedId] = new Set();
    }

    reportedUser[reportedId].add(userId);
  }

  for (const reportedId of Object.keys(reportedUser)) {
    if (reportedUser[reportedId].size >= k) {
      for (let uid of reportedUser[reportedId]) {
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

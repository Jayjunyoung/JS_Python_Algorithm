function solution(id_list, report, k) {
  //정지된 id를 담는 배열
  let answer = Array.from({ length: id_list.length }, () => 0);

  let report_map = new Map();
  id_list.forEach((id) => {
    report_map.set(id, []);
  });
  //frodo가 junyoung을 4번 신고하면 1번 신고한거로 간주
  let report_set = new Set(report);
  let report_count = new Map();

  report_set.forEach((re) => {
    const [reporter, reported] = re.split(" ");

    report_map.set(reporter, [...report_map.get(reporter), reported]);

    if (report_count.has(reported)) {
      report_count.set(reported, report_count.get(reported) + 1);
    } else {
      report_count.set(reported, 1);
    }
  });

  let report_list = Array.from(report_map.values());

  report_count.forEach((value, key) => {
    //map 자료구조에 forEach를 쓰면 삽입된 순서대로 함수가 실행
    //map에 forEach를 접근하면 인자가 value, key, map 순이다
    if (value >= k) {
      report_list.forEach((list, index) => {
        if (list.includes(key)) {
          answer[index] += 1;
        }
      });
    }
  });

  return answer;
}

function solution(video_len, pos, op_start, op_end, commands) {
  // 시간을 초 단위로 변환
  const timeToSeconds = (time) => {
    const [mm, ss] = time.split(":").map(Number);
    return mm * 60 + ss;
  };

  // 초를 "mm:ss" 형식으로 변환
  const secondsToTime = (seconds) => {
    //나누고 정수로 내림차순 해주기
    const mm = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const ss = (seconds % 60).toString().padStart(2, "0");

    return `${mm}:${ss}`;
  };

  // 10초 후로 이동하는 함수
  const next = (time, videoTime) => {
    time += 10;
    if (time > videoTime) return videoTime;
    return time;
  };

  // 10초 전으로 이동하는 함수
  const prev = (time) => {
    time -= 10;
    if (time < 0) return 0;
    return time;
  };

  // 오프닝 구간 체크 함수
  const opening = (time, op_start, op_end) => {
    if (time >= op_start && time <= op_end) return op_end; // 오프닝 구간은 끝으로 이동
    return time;
  };

  // 시간을 초로 변환하여 각각 변수에 할당
  const videoTime = timeToSeconds(video_len);
  let currentTime = timeToSeconds(pos);
  const startTime = timeToSeconds(op_start);
  const endTime = timeToSeconds(op_end);

  // 명령어 처리
  for (let command of commands) {
    currentTime = opening(currentTime, startTime, endTime);

    if (command === "next") {
      currentTime = next(currentTime, videoTime);
    } else if (command === "prev") {
      currentTime = prev(currentTime);
    }

    currentTime = opening(currentTime, startTime, endTime);
  }

  // 최종 결과 반환
  return secondsToTime(currentTime);
}

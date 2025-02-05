const fs = require("fs");

// 백준 스타일 입력 받기
const input = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
let rooms = input.slice(1, N + 1).sort(); // 사전순 정렬
let roomSchedule = {};
let result = [];

// 회의실별 초기화
rooms.forEach((room) => {
  roomSchedule[room] = [];
});

// 예약된 회의 입력받기
for (let i = N + 1; i < N + M + 1; i++) {
  let [room, start, end] = input[i].split(" ");

  start = parseInt(start);
  end = parseInt(end);

  roomSchedule[room].push([start, end]);
}

rooms.forEach((room, index) => {
  result.push(`Room ${room}:`);

  let schedule = roomSchedule[room].sort((a, b) => a[0] - b[0]);

  let availableTimes = [];
  let currentTime = 9;

  for (let [start, end] of schedule) {
    if (currentTime < start) {
      availableTimes.push([currentTime, start]);
    }
    currentTime = Math.max(currentTime, end);
  }

  if (currentTime < 18) {
    availableTimes.push([currentTime, 18]);
  }

  if (availableTimes.length > 0) {
    result.push(`${availableTimes.length} available:`);
    availableTimes.forEach(([start, end]) => {
      result.push(
        `${String(start).padStart(2, "0")}-${String(end).padStart(2, "0")}`
      );
    });
  } else {
    result.push("Not available");
  }

  if (index < rooms.length - 1) {
    result.push("-----");
  }
});

// 최종 출력
console.log(result.join("\n"));

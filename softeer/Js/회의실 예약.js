const fs = require("fs");
const inputFile = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");

let array = inputFile; // inputFile에서 읽어온 데이터로 초기화
let rooms = {}; // 회의실 현황

[total_rooms, reserved_cnt] = array[0].split(" ").map(Number);
let rooms_name = []; // 회의실 이름만 저장

for (let i = 1; i <= total_rooms; i++) {
  let room_name = array[i];
  rooms_name.push(room_name);
  rooms[room_name] = new Array(9).fill(0);
}

rooms_name.sort();

for (let i = total_rooms + 1; i < array.length; i++) {
  let [room_name, start_time, end_time] = array[i].split(" ");
  for (let j = parseInt(start_time); j < parseInt(end_time); j++) {
    rooms[room_name][j] += 1;
  }
}

for (let i = 0; i < total_rooms; i++) {
  let name = rooms_name[i];

  // 회의실 이름 출력
  console.log(`Room ${name}:`);

  // 예약 가능 시간 출력
  let reserved_check = rooms[name];
  let cnt = 0;
  let start = -1;
  let available_times = [];

  for (let i = 0; i < reserved_check.length; i++) {
    if (reserved_check[i] === 0 && (i === 0 || reserved_check[i - 1] === 1))
      start = i + 9;
    if (reserved_check[i] === 1 && start !== -1) {
      //현재 시간이 예약된 시간대인지
      //예약 가능 시간이 시작된 상태인지
      available_times.push(
        `${String(start).padStart(2, "0")}-${String(i + 9).padStart(2, "0")}`
      );
      start = -1; // 시작 시간 초기화
      cnt++; // 예약 가능한 시간대 수 증가
    }
  }

  if (start !== -1) {
    available_times.push(`${String(start).padStart(2, "0")}-18`);
    cnt++;
  }

  // 예약 가능한 시간이 없는 경우
  if (!cnt) console.log("Not available");
  // 예약 가능한 시간이 있는 경우
  else {
    console.log(`${cnt} available:`);
    available_times.forEach((e) => console.log(e));
  }

  if (i !== total_rooms - 1) console.log("-----");
}

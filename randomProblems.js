const axios = require("axios");

// 사용할 알고리즘 태그 목록
const tags = [
  "bfs",
  "two_pointer",
  "greedy",
  "backtracking",
  "dfs",
  "implementation",
  "dijkstra",
  "combinatorics",
];

// 한글이 포함된 문제인지 확인하는 함수
function isKoreanTitle(title) {
  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(title);
}

async function fetchProblems(tag) {
  const url = `https://solved.ac/api/v3/search/problem?query=tag:${tag} tier:0..12&sort=random&direction=asc`;
  try {
    const response = await axios.get(url);
    // 한국어 제목을 포함한 문제만 반환
    return response.data.items.filter(
      (p) => p.titleKo && isKoreanTitle(p.titleKo)
    );
  } catch (error) {
    console.error(`🔴 ${tag} 문제 가져오기 실패`, error);
    return [];
  }
}

async function getRandomProblems() {
  let allProblems = [];

  // 모든 태그에 대해 문제 가져오기
  for (const tag of tags) {
    const problems = await fetchProblems(tag);
    allProblems = allProblems.concat(problems);
  }

  // 문제 중복 제거 (문제 ID 기준) & 한국어 제목이 포함된 문제만 필터링
  let uniqueProblems = [
    ...new Map(allProblems.map((p) => [p.problemId, p])).values(),
  ].filter((p) => isKoreanTitle(p.titleKo)); // 한글 제목 필터링

  // 문제 개수가 3개 이상이면 랜덤으로 3개 선택
  if (uniqueProblems.length >= 3) {
    uniqueProblems.sort(() => Math.random() - 0.5);
    uniqueProblems = uniqueProblems.slice(0, 3);
  }

  console.log("🎯 랜덤으로 선택된 한국어 알고리즘 문제 (최대 골드2까지):");
  uniqueProblems.forEach((p, index) => {
    console.log(`${index + 1}. [${p.problemId}] ${p.titleKo}`);
    console.log(`   🔗 링크: https://www.acmicpc.net/problem/${p.problemId}`);
  });
}

// 실행
getRandomProblems();

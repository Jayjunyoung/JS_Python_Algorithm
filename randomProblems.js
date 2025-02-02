const axios = require("axios");

// 사용할 알고리즘 태그 목록
const tags = ["bfs", "two_pointer", "greedy", "backtracking"];

async function fetchProblems(tag) {
  const url = `https://solved.ac/api/v3/search/problem?query=tag:${tag} tier:0..12&sort=random&direction=asc`;
  try {
    const response = await axios.get(url);
    return response.data.items; // 태그별 모든 문제 반환
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

  // 문제 중복 제거 (문제 ID 기준)
  let uniqueProblems = [
    ...new Map(allProblems.map((p) => [p.problemId, p])).values(),
  ];

  // 문제 개수가 3개 이상이면 랜덤으로 3개 선택
  if (uniqueProblems.length >= 3) {
    uniqueProblems.sort(() => Math.random() - 0.5);
    uniqueProblems = uniqueProblems.slice(0, 3);
  }

  console.log("🎯 랜덤으로 선택된 알고리즘 문제 (최대 골드2까지):");
  uniqueProblems.forEach((p, index) => {
    console.log(`${index + 1}. [${p.problemId}] ${p.titleKo}`);
    console.log(`   🔗 링크: https://www.acmicpc.net/problem/${p.problemId}`);
  });
}

// 실행
getRandomProblems();

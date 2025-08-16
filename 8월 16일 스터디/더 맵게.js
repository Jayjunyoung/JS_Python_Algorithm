class MinHeap {
    // constructor는 클래스의 생성자 메서드로, 힙을 저장할 빈 배열 heap을 초기화
	constructor() {
		this.heap = [];
	}
    
	// getParentIndex 메서드는 주어진 인덱스의 부모 노드 인덱스를 계산하여 반환
	getParentIndex(index) {
		return Math.floor((index - 1) / 2);
        // 부모 노드의 인덱스는 (index - 1) / 2의 내림 값
	}
 
	// getLeftChildIndex 메서드는 주어진 인덱스의 왼쪽 자식 노드 인덱스를 계산하여 반환
	getLeftChildIndex(index) {
		return 2 * index + 1;
        // 왼쪽 자식 노드의 인덱스는 2 * index + 1
	}
 
	// getRightChildIndex 메서드는 주어진 인덱스의 오른쪽 자식 노드 인덱스를 계산하여 반환
	getRightChildIndex(index) {
		return 2 * index + 2;
        // 오른쪽 자식 노드의 인덱스는 2 * index + 2
	}
 
	// swap 메서드는 힙의 두 노드의 값을 교환
	swap(index1, index2) {
		const temp = this.heap[index1];
		this.heap[index1] = this.heap[index2];
		this.heap[index2] = temp;
        // 임시 변수 temp를 사용하여 index1의 값을 저장
        // 그리고 index1에 index2의 값을 할당한 후 index2에 temp의 값을 할당
	}
 
	// push 메서드는 새로운 요소를 힙에 삽입
	push(value) {
		this.heap.push(value);
        
		// currentIndex는 삽입된 요소의 인덱스이고, parentIndex는 부모 노드의 인덱스
		let currentIndex = this.heap.length - 1;
		let parentIndex = this.getParentIndex(currentIndex);
 
		// 삽입된 요소가 루트 노드가 아니고, 부모 노드의 값이 삽입된 요소의 값보다 크다면 교환
		// 교환 후에는 currentIndex를 parentIndex로 업데이트하고, 다시 parentIndex를 구함
		while (currentIndex > 0 && this.heap[parentIndex] > this.heap[currentIndex]) {
			this.swap(currentIndex, parentIndex);
			currentIndex = parentIndex;
			parentIndex = this.getParentIndex(currentIndex);
		}
		// 이 과정을 반복하여 힙의 속성을 유지
	}
 
	// pop 메서드는 힙에서 가장 작은 요소(루트 노드)를 꺼내고 제거
	pop() {
		// 힙이 비어있다면 null을 반환합니다.
		if (this.isEmpty()) return null;
        
        // 힙에 요소가 하나밖에 없다면 해당 요소를 제거하고 반환합니다.
		if (this.heap.length === 1) return this.heap.pop();
 
		// 루트 노드의 값을 root 변수에 저장하고, 힙의 마지막 요소를 루트 노드로 이동
		const root = this.heap[0];
        // this.heap.pop()은 힙의 마지막 요소를 제거하는 자바스크립트 pop 메서드
		this.heap[0] = this.heap.pop();
 
		// currentIndex는 현재 노드의 인덱스이고, leftChildIndex와 rightChildIndex는 각각 왼쪽과 오른쪽 자식 노드의 인덱스
		let currentIndex = 0;
		let leftChildIndex = this.getLeftChildIndex(currentIndex);
		let rightChildIndex = this.getRightChildIndex(currentIndex);
 
		// 현재 노드의 값이 왼쪽 자식이나 오른쪽 자식보다 크다면 교환이 필요
		while (
			(leftChildIndex < this.heap.length && this.heap[currentIndex] > this.heap[leftChildIndex]) ||
			(rightChildIndex < this.heap.length && this.heap[currentIndex] > this.heap[rightChildIndex])
		) {
			// 왼쪽 자식과 오른쪽 자식 중 더 작은 값을 가진 노드와 교환
			const smallerChildIndex =
				rightChildIndex >= this.heap.length || this.heap[leftChildIndex] < this.heap[rightChildIndex]
					? leftChildIndex
					: rightChildIndex;
			this.swap(currentIndex, smallerChildIndex);
            
            // 교환 후에는 currentIndex를 교환한 자식 노드의 인덱스로 업데이트하고, 다시 leftChildIndex와 rightChildIndex를 구함
			currentIndex = smallerChildIndex;
			leftChildIndex = this.getLeftChildIndex(currentIndex);
			rightChildIndex = this.getRightChildIndex(currentIndex);
            
            // 이 과정을 반복하여 힙의 속성을 유지
		}
 
		// 마지막으로 제거된 루트 노드의 값 root를 반환
		return root;
	}
 
	// isEmpty 메서드는 힙이 비어있는지 확인
	isEmpty() {
    	// 힙의 길이가 0이면 true를 반환하고, 그렇지 않으면 false를 반환
		return this.heap.length === 0;
	}
}
 
// 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 섞어야 하는 최소 횟수를 반환
function solution(scoville, K) {
	// 먼저 MinHeap 클래스의 인스턴스 minHeap을 생성
	const minHeap = new MinHeap();
	
    // for 반복문을 사용하여 scoville 배열의 모든 요소를 minHeap에 삽입
	for (let i = 0; i < scoville.length; i++) {
		minHeap.push(scoville[i]);
	}
 
	// count 변수를 초기화하여 섞은 횟수를 저장
	let count = 0;
 
	// while 반복문을 사용하여 minHeap의 루트 노드(가장 작은 스코빌 지수)가 K 미만인 동안 반복
	while (minHeap.heap[0] < K) {
    
    	// 만약 minHeap에 요소가 1개밖에 없다?
        // 그러면 합할 개수 부족으로 모든 음식을 K 이상으로 만들 수 없으므로 -1을 반환
		if (minHeap.heap.length === 1) return -1;
 
		// minHeap에서 가장 작은 스코빌 지수 first와 두 번째로 작은 스코빌 지수 second를 꺼낸다
		const first = minHeap.pop();
		const second = minHeap.pop();
        
		const mixed = first + second * 2;
 
		// mixed를 다시 minHeap에 삽입
		minHeap.push(mixed);
        
		count++;
	}
    
    // 최종적으로 섞은 횟수 count를 반환
	return count;
}

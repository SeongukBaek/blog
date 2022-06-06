---
title: "📂 Heap"
description: "개발 상식"
date: 2022-05-21
update: 2022-05-21
tags:
  - 개발상식
  - Java
  - 힙
series: "📂 Computer Science"
---

## 🧷 힙(Heap)
우선순위 큐를 위해 만들어진 자료구조이다.
- 삽입과 삭제 모두 $O(logN)$으로 해결할 수 있다.
- 완전 이진 트리의 일종이다.
  - 여러 값 중, 최댓값과 최솟값을 빠르게 찾아내도록 만들어진 자료구조
- 반 정렬 상태 (무조건 정렬되어 있을 필요가 없다.)
- 힙 트리는 중복된 값 허용 (이진 탐색 트리는 중복값을 허용하지 않음)

> **우선순위 큐?**
> : 우선순위의 개념을 큐에 도입한 자료구조로, 데이터들이 우선순위를 가지고 있고 이에 따라 우선순위가 높은 데이터가 먼저 나가게 되는 구조이다.
> - 우선순위 큐는 배열, 연결리스트, 힙으로 구현할 수 있는데, 그 중 힙이 가장 효율적이다.

> **완전 이진 트리?**
> : 노드를 삽입할 때, 왼쪽부터 차례대로 삽입하는 트리이다.

### 🪚 종류
**최대 힙(Max Heap)**
- 부모 노드의 키 값이 자식 노드의 키 값보다 크거나 같은 완전 이진 트리

**최소 힙(Min Heap)**
- 부모 노드의 키 값이 자식 노드의 키 값보다 작거나 같은 완전 이진 트리

### 🪚 구현
힙을 저장하는 표준적 자료구조는 `배열` 이다.
- 구현을 쉽게 하기 위해 배열의 첫 번째 인덱스인 0은 사용되지 않는다.
- 특정 위치의 노드 번호는 새로운 노드가 추가되어도 변하지 않는다.

**부모 노드와 자식 노드의 관계**
```java
왼쪽 자식 index = (부모 index) * 2
오른쪽 자식 index = (부모 index) * 2 + 1
부모 index = (자식 index) / 2
```

**삽입**
1. 힙에 새로운 요소가 들어오면, 일단 새로운 노드를 힙의 마지막 노드에 삽입
2. 새로운 노드를 부모 노드들과 교환

```java
// 최대 힙의 삽입 구현

void insertMaxHeap(int x) {
  // 힙 크기를 증가시키고, 마지막 노드에 삽입
  maxHeap[++heapSize] = x;

  for (int i = heapSize; i > 1; i/=2) {
    // 마지막 노드가 자신의 부모 노드보다 크면 swap
    if (maxHeap[i/2] < maxHeap[i]) swap(i/2, i);
    else break;
  }
}
```

**삭제**
1. 최대 힙에서 최댓값은 루트 노드이므로 루트 노드가 삭제됨
2. 삭제된 루트 노드에는 힙의 마지막 노드를 가져옴
3. 힙을 재구성(`heapify`)

```java
// 최대 힙 삭제 구현

int deleteMaxHeap() {
  if (heapSize == 0) return 0;

  // 루트 노드의 값을 저장하고, 마지막 노드 값을 루트로 이동한 후 힙 크기를 줄여 마지막 노드를 0으로 초기화
  int item = maxHeap[1];
  maxHeap[1] = maxHeap[heapSize];
  maxHeap[heapSize--] = 0;

  for (int i = 1; i*2 <= heapSize;) {
    // 마지막 노드가 왼쪽 노드와 오른쪽 노드보다 크면 최대 힙이므로 종료
    if (maxHeap[i] > maxHeap[i*2] && maxHeap[i] > maxHeap[i*2+1]) break;
    // 자식 노드가 더 큰 경우, 교환한 후, i를 변경
    else if (maxHeap[i*2] > maxHeap[i*2+1]) {
      swap(i, i*2);
      i *= 2;
    } else {
      swap(i, i*2+1);
      i = i*2+1;
    }
  }

  return item;
}
```

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog/computer-science/data-structure/Heap.html)
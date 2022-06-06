---
title: "📂 Array vs. ArrayList vs. LinkedList"
description: "개발 상식"
date: 2022-05-19
update: 2022-05-19
tags:
  - 개발상식
  - Java
  - 배열
  - ArrayList
  - 연결리스트
series: "📂 Computer Science"
---

## 🧷 세 자료 구조
- `Array` : index로 빠르게 값을 찾는 것이 가능
- `LinkedList` : 데이터의 삽입 및 삭제가 빠름
- `ArrayList` : 데이터를 찾는 것은 빠르지만, 삽입 및 삭제가 느림

### 🪚 더 자세한 비교
**Array**
- 선언할 때 **크기와 데이터 타입을 지정**해야 한다.
- 메모리 공간에 사용할 사이즈를 미리 할당해두고 사용하는 자료구조다.
  - 따라서 계속 데이터가 늘어날 경우, 최대 사이즈를 알 수 없을 때 사용하기는 부적합하다.
  - 또한 중간에 데이터를 삽입 및 삭제하는 것도 매우 비효율적이다. (접근하여 삭제한 뒤, 나머지 뒷 데이터들을 `shift` 해주는 비용으로 인해 최악의 경우 $O(N)$)
  - 대신, `index` 를 통해 검색을 $O(1)$에 수행할 수 있다는 장점이 있다.

**List**
- `Array` 처럼 크기를 지정하지 않아도 된다.
- 하지만 `Array` 에서 `index` 가 중요했던 것처럼, `List` 에서는 순서가 중요하다.
  - 크기가 정해져있지 않아 중간에 데이터의 삽입이나 삭제가 발생해도 `Array` 보다는 덜 비효율적이다.
  - 또한 `index` 를 가지고 있기에 검색 또한 빠르다.
  - 하지만 중간에 데이터의 삽입 및 삭제 시 시간이 오래 걸리는 단점이 있다. (삽입 및 삭제 시 줄줄이 당겨지거나, 밀려날 때 수행되는 연산이 추가되고, 메모리 또한 낭비된다.)

**LinkedList**
- 연결리스트에는 단일, 다중 등이 존재한다. 무슨 종류든, **한 노드에 연결될 노드의 포인터 위치를 가리키는 방식**이다.

> 단일은 뒷 노드만 가리키고, 다중은 앞뒤 노드를 모두 가리킨다.

- 데이터의 삽입 및 삭제를 하더라도, 전체를 돌지 않고 이전 값과 다음 값이 가르키고 있던 주소 값만 수정해 연결시킴으로써 빠른 수행이 가능하다.
- 하지만, `k` 번째 값을 찾는 문제에서는 비효율적이다.
  - 연결리스트에서는 `index` 가 없기 때문에, 순차 검색을 수행하므로 시간이 더 걸린다.
- 결과적으로, 검색과 삽입 및 삭제에 대해서 $O(N)$의 시간 복잡도를 가진다.
  - 하지만, `Tree` 구조의 근간이 되는 자료구조로, `Tree` 에서 사용되었을 때 유용하다.

> 상황에 맞게 자료구조를 잘 선택하는 능력이 중요하다.

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog/computer-science/data-structure/Array%20vs%20ArrayList%20vs%20LinkedList.html)
- [JaeYeopHan/Interview_Question_for_Beginner](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#array-vs-linked-list)
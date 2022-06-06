---
title: "📂 Stack & Queue"
description: "개발 상식"
date: 2022-05-20
update: 2022-05-20
tags:
  - 개발상식
  - Java
  - 스택
  - 큐
series: "📂 Computer Science"
---

## 🧷 스택
입력과 출력이 한 방향으로 제한되는 **LIFO**(Last in First out, 후입선출) 형태의 선형 자료구조이다.
- 나중에 들어간 원소가 가장 먼저 나오는 것이 가장 큰 특징이다.
- 시스템 해킹에서 BufferOverflow 취약점을 이용한 공격 시 스택 메모리의 영역에서 수행한다.

### 🪚 사용시기
- 함수의 Call Stack
- 문자열 역순 출력
- 연산자 후위표기법
- DFS
- 재귀 함수

---

## 🧷 큐
입력과 출력이 한 쪽 끝(front, rear)으로 제한되는 FIFO(First in First out, 선입선출) 형태의 선형 자료구조이다.
- 가장 먼저 들어온 원소가 가장 먼저 나오는 것이 가장 큰 특징이다.
- 큐의 가장 첫 원소를 `front`, 끝 원소를 `rear` 라고 한다.
  - 큐에 데이터가 들어올 때(삽입 연산)는 `rear` 로 들어오고,
  - 데이터가 나갈 때(삭제 연산)는 `front` 로 나간다.
- Java Collection에서 `Queue` 는 인터페이스이다. 이를 구현하고 있는 `PriorityQueue` 등을 사용할 수 있다.
  - 인터페이스이므로, 큐 타입의 객체를 생성할 수는 없다. 
  - `Queue<Obj> queue = new PriorityQueue<>();` 로 type-safe 큐를 생성할 수 있다.

<img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200903183026/Queue-Deque-PriorityQueue-In-Java.png" width="70%">

### 🪚 사용시기
- 버퍼
- BFS

### 🪚 개선
크기가 정해진 일반 큐는 큐에 빈 메모리가 있어도, 꽉 차있는 것으로 판단할 수 있다는 단점이 있다. (`rear` 가 끝에 도달했을 때, 이전에 `pop` 된 공간은 비어있지만 접근이 불가능하다.)
- 이를 "**원형 큐**"를 이용해 개선할 수 있다.
- 논리적으로 배열의 처음과 끝이 연결되어 있는 것으로 간주한다.

원형 큐는 초기 공백 상태일 때 `front` 와 `rear` 가 0이다. 공백, 포화 상태를 쉽게 구분하기 위해 **자리 하나를 항상 비워둔다.**

```java
(index + 1) % size로 순환시킨다.
```

**단점**
- 메모리 공간의 활용도는 올라가지만, 배열로 구현되어 있어 큐의 크기가 제한된다.

### 🪚 두번째 개선
연결리스트 큐를 사용해 이를 개선한다.
- 크기가 제한이 없고,
- 삽입 및 삭제 연산이 편리하다.

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog/computer-science/data-structure/Stack%20&%20Queue.html)
- [JaeYeopHan/Interview_Question_for_Beginner](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#stack-and-queue)
- [Queue Interface in Java](https://www.geeksforgeeks.org/queue-interface-java/)
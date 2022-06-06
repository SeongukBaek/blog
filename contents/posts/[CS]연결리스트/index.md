---
title: "📂 연결 리스트 (Linked List)"
description: "개발 상식"
date: 2022-05-18
update: 2022-05-18
tags:
  - 개발상식
  - Java
  - 연결리스트
series: "📂 Computer Science"
---

## 🧷 연결 리스트 (Linked List)
<img src="https://www.geeksforgeeks.org/wp-content/uploads/gq/2013/03/Linkedlist.png" width="80%">

연속적인 메모리 위치에 저장되지 않는 **선형 데이터 구조**로, 포인터를 사용해 연결된다. 각 노드는 **데이터 필드**와 **다음 노드에 대한 참조**를 포함하는 노드로 구성된다.

### 🪚 왜 사용하나?
배열은 비슷한 유형의 선형 데이터를 저장하는데 사용할 수 있지만 제한 사항이 있다.
- 배열의 크기는 고정적이기에 미리 저장될 요소의 수에 대한 정보가 필요하다.
- 새로운 요소를 삽입하는 것은 비용이 많이 발생한다. (공간을 할당하고, 기존 요소를 전부 이동)

### 🪚 장점
- 크기가 동적이다.
- 삽입, 삭제가 용이하다.

### 🪚 단점
- 임의로 액세스를 허용할 수 없다, 즉 첫 번째 노드부터 순차적으로 요소에 접근해야 한다. (이진 탐색 불가능)
- 포인터의 여분의 메로리 공간이 목록의 각 요소마다 필요하다.

### 🪚 Single Linked List
```java
import java.util.*;

class Node {
  int data;
  Node next;

  Node(int data) {
    this.data = data;
    next = null;
  }
}

class LinkedList {
  Node head;

  public void printList() {
    Node n = head;

    while (n != null) {
      System.out.println(n.data + " ");
      n = n.next;
    }
  }

  // 노드 추가
  public void push(Node n) {
    Node h = head;

    if (head == null) {
      head = n;
      return;
    }

    while (h.next != null) {
      h = h.next;
    }

    h.next = n;
  }

  // 특정 노드 뒤에 노드 추가
  public void push(Node n, int insertAt) {
    Node h = head;

    if (head == null) {
      head = n;
      return;
    }

    while (h.data != insertAt) {
      h = h.next;
    }

    Node tmp = null;
    h.next = tmp;
    h.next = n;
    n.next = tmp;
  }
}

class Main {
  public static void main(String[] args) {
    LinkedList ll = new LinkedList();

    for (int i = 1; i < 4; i++) {
      ll.push(new Node(i));
    }

    ll.printList();
  }
}
```

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog/computer-science/data-structure/Linked%20List.html)
- [JaeYeopHan/Interview_Question_for_Beginner](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#array-vs-linked-list)
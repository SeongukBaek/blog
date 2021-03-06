---
title: "π μ°κ²° λ¦¬μ€νΈ (Linked List)"
description: "κ°λ° μμ"
date: 2022-05-18
update: 2022-05-18
tags:
  - κ°λ°μμ
  - Java
  - μ°κ²°λ¦¬μ€νΈ
series: "π Computer Science"
---

## π§· μ°κ²° λ¦¬μ€νΈ (Linked List)
<img src="https://www.geeksforgeeks.org/wp-content/uploads/gq/2013/03/Linkedlist.png" width="80%">

μ°μμ μΈ λ©λͺ¨λ¦¬ μμΉμ μ μ₯λμ§ μλ **μ ν λ°μ΄ν° κ΅¬μ‘°**λ‘, ν¬μΈν°λ₯Ό μ¬μ©ν΄ μ°κ²°λλ€. κ° λΈλλ **λ°μ΄ν° νλ**μ **λ€μ λΈλμ λν μ°Έμ‘°**λ₯Ό ν¬ν¨νλ λΈλλ‘ κ΅¬μ±λλ€.

### πͺ μ μ¬μ©νλ?
λ°°μ΄μ λΉμ·ν μ νμ μ ν λ°μ΄ν°λ₯Ό μ μ₯νλλ° μ¬μ©ν  μ μμ§λ§ μ ν μ¬ν­μ΄ μλ€.
- λ°°μ΄μ ν¬κΈ°λ κ³ μ μ μ΄κΈ°μ λ―Έλ¦¬ μ μ₯λ  μμμ μμ λν μ λ³΄κ° νμνλ€.
- μλ‘μ΄ μμλ₯Ό μ½μνλ κ²μ λΉμ©μ΄ λ§μ΄ λ°μνλ€. (κ³΅κ°μ ν λΉνκ³ , κΈ°μ‘΄ μμλ₯Ό μ λΆ μ΄λ)

### πͺ μ₯μ 
- ν¬κΈ°κ° λμ μ΄λ€.
- μ½μ, μ­μ κ° μ©μ΄νλ€.

### πͺ λ¨μ 
- μμλ‘ μ‘μΈμ€λ₯Ό νμ©ν  μ μλ€, μ¦ μ²« λ²μ§Έ λΈλλΆν° μμ°¨μ μΌλ‘ μμμ μ κ·Όν΄μΌ νλ€. (μ΄μ§ νμ λΆκ°λ₯)
- ν¬μΈν°μ μ¬λΆμ λ©λ‘λ¦¬ κ³΅κ°μ΄ λͺ©λ‘μ κ° μμλ§λ€ νμνλ€.

### πͺ Single Linked List
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

  // λΈλ μΆκ°
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

  // νΉμ  λΈλ λ€μ λΈλ μΆκ°
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

## π μ°Έκ³ 
- [Tech Interview for developer](https://gyoogle.dev/blog/computer-science/data-structure/Linked%20List.html)
- [JaeYeopHan/Interview_Question_for_Beginner](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#array-vs-linked-list)
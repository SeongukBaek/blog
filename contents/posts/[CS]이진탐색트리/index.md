---
title: "📂 이진탐색트리(Binary Search Tree)"
description: "개발 상식"
date: 2022-05-28
update: 2022-05-28
tags:
  - 개발상식
  - Java
  - BST
series: "📂 Computer Science"
---

## 🧷 이진 탐색 트리
> 이진 탐색 + 연결 리스트

- **이진 탐색** : 탐색에 소요되는 시간복잡도는 $O(logN)$, 하지만 삽입, 삭제가 불가능
- **연결 리스트** : 삽입, 삭제의 시간복잡도는$O(1)$, 탐색하는 시간복잡도가 $O(N)$

이 두 가지를 합하여 장점을 모두 얻어 효율적인 탐색 능력과 자료의 삽입, 삭제도 가능하게 하는 **이진 탐색 트리**

### 🪚 특징
- 노드에 저장된 키는 유일 (중복이 없어야 함)
- 각 노드의 자식이 2개 이하
- 각 노드의 왼쪽 자식은 부모보다 작고, 오른쪽 자식은 부모보다 큼
- 왼쪽과 오른쪽 서브 트리도 이진 탐색 트리

> **중복이 없어야 하는 이유**
> 
> : 검색 목적 자료구조인데, 굳이 중복이 많은 경우에 트리를 사용하여 검색 속도를 느리게 할 필요가 없다.

이진 탐색 트리의 순회는 **"중위 순회(inorder)"** 방식으로, 정렬된 순서로 읽을 수 있다.

### 🪚 BST 핵심 연산
- 검색
- 삽입
- 삭제
- 트리 생성, 삭제

### 🪚 시간 복잡도
노드 개수가 N개일 때,
- 균등 트리: $O(logN)$
- 편향 트리: $O(N)$

> 삽입, 검색, 삭제 시간복잡도는 **트리의 Depth**에 비례

**삭제의 3가지 경우**
1. 자식이 없는 리프 노드일 때 -> 그냥 삭제!
2. 자식이 1개인 노드일 때 -> 자식 노드와 교환 후, 삭제
3. 자식이 2개인 노드일 때 -> 오른쪽 자식 노드에서 가장 작은 값 또는 왼쪽 자식 노드에서 가장 큰 값과 교환 후, 삭제

편향된 트리는 시간복잡도가 $O(N)$이므로 트리를 사용할 이유가 없다!
- 이를 바로 잡도록 `Rebalancing` 하는 개선방안이 **AVL Tree**, **RedBlack Tree**

```java
class BinarySearchTree {
  public class Node {
    int data;
    Node left;
    Node right;

    public Node(int data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }

  public Node root;
  public BinarySearchTree() {
    this.root = null;
  }

  public boolean find(int id) {
    Node cur = root;

    while(cur != null) {
      if (cur.data == id) return true;
      else if(cur.data > id) cur = cur.left;
      else cur = cur.right;
    }

    return false;
  }

  public boolean delete(int id) {
    Node parent = root;
    Node cur = root;
    boolean isLeftChild = false;

    while(cur.data != id) {
      parent = cur;
      if (cur.data > id) {
        isLeftChild = true;
        cur = cur.left;
      } else {
        isLeftChild = false;
        cur = cur.right;
      }
      if (cur == null) return false;
    }

    // case1. 자식 노드가 없는 경우 -> 그냥 삭제
    if (cur.left == null && cur.right == null) {
      if (cur == root) root = null;
      if (isLeftChild == true) parent.left = null;
      else parent.right = null;
    } 
    // case2. 자식 노드가 1개인 경우 -> 교환 후 삭제
    else if (cur.right == null) {
      if (cur == root) root = cur.left;
      else if (isLeftChild) parent.left = cur.left;
      else parent.right = cur.left;
    } else if (cur.left == null) {
      if (cur == root) root = cur.left;
      else if (isLeftChild) parent.left = cur.right;
      else parent.right = cur.right;
    }
    // case3. 자식 노드가 2개인 경우 -> 오른쪽 자식 노드 중 최솟값과 교환 후 삭제
    else if (cur.left != null && cur.right != null) {
      Node minNode = getMin(cur);
      if (cur == root) root = minNode;
      else if (isLeftChild) parent.left = minNode;
      else parent.right = minNode;
      minNode.left = cur.left;
    }

    return true;
  }

  // 오른쪽 서브 트리에서 최솟값을 반환
  public Node getMin(Node deleteNode) {
    Node minNode = null;
    Node minNodeParent = null;
    Node cur = deleleNode.right;

		while(cur != null) {
			minNodeParent = minNode;
			minNode = cur;
			cur = cur.left;
		}

		if (minNode != deleleNode.right) {
			minNodeParent.left = minNode.right;
			minNode.right = deleleNode.right;
		}

		return minNode;
  }

  public void insert(int id) {
    Node newNode = new Ndoe(id);
    if (root == null) {
      root = newNode;
      return;
    }

    Node cur = root;
    Node parent = null;

    while(true) {
      parent = cur;

      if (id < cur.date) {
        cur = cur.left;
        if (cur == null) {
          parent.left = newNode;
          return;
        }
      } else {
        cur = cur.right;
        if (cur == null) {
          parent.right = newNode;
          return;
        }
      }
    }
  }

  public void print(Node root) {
    if (root != null) {
      print(root.left);
      System.out.println(" " + root.date);
      print(root.right);
    }
  }
}
```

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog/computer-science/data-structure/Tree.html)
- [BST (Binary Search Tree)](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#bst-binary-search-tree)
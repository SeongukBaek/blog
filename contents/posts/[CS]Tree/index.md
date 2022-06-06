---
title: "📂 Tree(트리)"
description: "개발 상식"
date: 2022-05-27
update: 2022-05-27
tags:
  - 개발상식
  - Java
  - Tree
series: "📂 Computer Science"
---

## 🧷 트리
값을 가진 노드(Node)와 이 노드들을 이어주는 간선(Edge)로 이루어진 자료구조이다.

> **트리라는 이름이 나온 이유?**
> 
> : 실제 나무를 거꾸로 세워놓은 듯한 모양을 보이기 때문이다.

<img src="https://www.geeksforgeeks.org/wp-content/uploads/binary-tree-to-DLL.png" width="50%">

- 그림에서, 데이터 1을 가진 노드가 **루트 노드**이다.
- 모든 노드들은 0개 이상의 자식 노드를 가지고 있으며, "부모-자식 관계"로 불린다.

선형 자료구조에서 배열이나 리스트 등도 존재하지만, 트리가 나온 이유는 뭘까?
- 일반 배열에서 삽입이나 삭제를 하는데 $O(N)$의 시간이 걸린다. 
  - 배열의 첫번째 원소에 삽입하는 경우 나머지 모든 요소들을 한 칸씩 뒤로 미뤄야 하므로 최악의 경우, $O(N)$의 시간 복잡도가 나온다.
- 하지만 트리는 편향 트리가 아닌 이상, $O(logN)$ 정도의 시간으로 줄여진다.

### 🪚 특징
- Stack이나 Queue와 같은 선형 구조가 아닌 **비선형 자료구조**이다.
- 계층적 관계를 표현한다.
- 루트 노드를 제외한 모든 노드는 **단 하나의 부모 노드**만을 갖는다.
- **트리에는 사이클이 존재할 수 없다.** (만약 사이클이 만들어진다면, 그래프이다.)
- 모든 노드는 자료형으로 표현이 가능하다.
- 루트에서 한 노드로 가는 경로는 유일한 경로뿐이다.
- 노드의 개수가 **N**개면, 간선은 **N-1**개를 가진다.

### 🪚 트리 순회 방식
트리의 루트를 기준으로 총 4가지의 순회 방식이 있다. 트리는 위 그림을 사용한다.

1. **전위 순회(pre-order)**
   - 각 루트를 순차적으로 먼저 방문하는 방식이다. (Root -> 왼쪽 자식 -> 오른쪽 자식)
   - `1 -> 2 -> 4 -> 8 -> 9 -> 5 -> 10 -> 11 -> 3 -> 6 -> 13 -> 7 -> 14`

2. **중위 순회(in-order)**
   - 왼쪽 하위 트리를 방문한 후 루트를 방문하는 방식이다. (왼쪽 자식 -> Root -> 오른쪽 자식)
   - `8 -> 4 -> 9 -> 2 -> 10 -> 5 -> 11 -> 1 -> 6 -> 13 -> 3 -> 14 -> 7`

3. **후위 순회(post-order)**
   - 왼쪽 하위 트리부터 하위를 모두 방문한 후 루트를 방문하는 방식이다. (왼쪽 자식 -> 오른쪽 자식 -> Root)
   - `8 -> 9 -> 4 -> 10 -> 11 -> 5 -> 2 -> 13 -> 6 -> 14 -> 7 -> 3 -> 1`

4. **레벨 순회(level-order)**
   - 루트부터 계층별로 방문하는 방식이다.
   - `1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12 -> 13 -> 14`

### 🪚 구현
트리의 구현을 위해서는 아래의 정보들이 필요하다.
1. 데이터와 연결 상태를 저장할 클래스 공간(=노드) 생성
2. 각각의 노드들에 값 저장
3. 노드 간 연결 상태 정의

```java
class Node {
  Node left;
  Node right;
  String value;

  public Node(String value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}
```
- 각 노드들은 값과, 왼쪽, 오른쪽 자식 노드를 가진다.

```java
class Tree {
  Node root;
  int size = 0;
}
```
- 트리는 루트 노드와, 그 크기 정보를 가진다.

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog/computer-science/data-structure/Tree.html)
- [Tree](https://github.com/WooVictory/Ready-For-Tech-Interview/blob/master/Data%20Structure/%5BData%20Structure%5D%20Tree.md)
- [[자료구조, Java] 트리(Tree) 개념 정리 및 구현](https://readerr.tistory.com/35)
---
title: "👩‍💻 42892. 길 찾기 게임"
description: "알고리즘 문제 풀기"
date: 2022-05-31
update: 2022-05-31
tags:
  - 그래프
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 길 찾기 게임](https://programmers.co.kr/learn/courses/30/lessons/42892)

### 📍 **Logic**

```java
public void insert(Node input) {
    // root가 없다면 root 지정, root가 있다면, 자식 노드 탐색하여 저장
    if (root == null) root = input;
    else insert(input, root);
}

private void insert(Node input, Node root) {
    // 부모보다 x값이 작은 경우에는 left를 탐색, 그렇지 않으면 right 탐색
    if (input.data.x < root.data.x) {
        if (root.left == null) root.left = input;
        else insert(input, root.left);
    } else {
        if (root.right == null) root.right = input;
        else insert(input, root.right);
    }
}
```

- 트리를 생성하는 함수
- 노드의 `x` 좌표를 기준으로 왼쪽 또는 오른쪽 자식 여부가 결정된다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Loc {
        int x;
        int y;
        int value;

        public Loc(int x, int y, int value) {
            this.x = x;
            this.y = y;
            this.value = value;
        }
    }

    class Node {
        Loc data;
        Node left;
        Node right;

        public Node(Loc data) {
            this.data = data;
            this.left = null;
            this.right = null;
        }
    }

    class Tree {
        Node root;
        int[] list;
        int size;
        int idx;

        public Tree(int size) {
            this.root = null;
            this.size = size;
        }

        public void insert(Node input) {
            // root가 없다면 root 지정, root가 있다면, 자식 노드 탐색하여 저장
            if (root == null) root = input;
            else insert(input, root);
        }

        private void insert(Node input, Node root) {
            // 부모보다 x값이 작은 경우에는 left를 탐색, 그렇지 않으면 right 탐색
            if (input.data.x < root.data.x) {
                if (root.left == null) root.left = input;
                else insert(input, root.left);
            } else {
                if (root.right == null) root.right = input;
                else insert(input, root.right);
            }
        }

        public int[] preOrder() {
            list = new int[size];
            idx = 0;
            preOrderTraversal(root);

            return list;
        }

        private void preOrderTraversal(Node n) {
            if (n == null) return;

            list[idx++] = n.data.value;
            preOrderTraversal(n.left);
            preOrderTraversal(n.right);
        }

        public int[] postOrder() {
            list = new int[size];
            idx = 0;
            postOrderTraversal(root);

            return list;
        }

        private void postOrderTraversal(Node n) {
            if (n == null) return;

            postOrderTraversal(n.left);
            postOrderTraversal(n.right);
            list[idx++] = n.data.value;
        }
    }

    class Solution {
        public int[][] solution(int[][] nodeinfo) {
            ArrayList<Loc> locs = new ArrayList<>();
            int size = nodeinfo.length;

            for (int i = 0; i < size; i++)
                locs.add(new Loc(nodeinfo[i][0], nodeinfo[i][1], i + 1));

            // x값은 오름차순, y값은 내림차순으로 정렬하여 BFS 형식으로 변환
            locs.sort(((o1, o2) -> {
                if (o1.y == o2.y) return o1.x - o2.x;
                return o2.y - o1.y;
            }));

            Tree t = new Tree(size);

            for (Loc l : locs) 
                t.insert(new Node(l));
            
            return new int[][] {t.preOrder(), t.postOrder()};
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 고문해시간에 BFS 형식으로 입력받아 이를 preorder, postorder로 출력했던 과제가 생각나 아이디어는 쉽게 잡을 수 있었다.
- x값 좌표에 따른 왼쪽, 오른쪽 자식 여부에 대한 고려를 통해 트리를 생성해야 하는 생각이 키 포인트였지 않을까 ..
  - `insert()` 를 오버로딩하는 방식을 사용해보았다!
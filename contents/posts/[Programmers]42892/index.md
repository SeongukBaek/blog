---
title: "๐ฉโ๐ป 42892. ๊ธธ ์ฐพ๊ธฐ ๊ฒ์"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-05-31
update: 2022-05-31
tags:
  - ๊ทธ๋ํ
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๊ธธ ์ฐพ๊ธฐ ๊ฒ์](https://programmers.co.kr/learn/courses/30/lessons/42892)

### ๐ **Logic**

```java
public void insert(Node input) {
    // root๊ฐ ์๋ค๋ฉด root ์ง์ , root๊ฐ ์๋ค๋ฉด, ์์ ๋ธ๋ ํ์ํ์ฌ ์ ์ฅ
    if (root == null) root = input;
    else insert(input, root);
}

private void insert(Node input, Node root) {
    // ๋ถ๋ชจ๋ณด๋ค x๊ฐ์ด ์์ ๊ฒฝ์ฐ์๋ left๋ฅผ ํ์, ๊ทธ๋ ์ง ์์ผ๋ฉด right ํ์
    if (input.data.x < root.data.x) {
        if (root.left == null) root.left = input;
        else insert(input, root.left);
    } else {
        if (root.right == null) root.right = input;
        else insert(input, root.right);
    }
}
```

- ํธ๋ฆฌ๋ฅผ ์์ฑํ๋ ํจ์
- ๋ธ๋์ `x` ์ขํ๋ฅผ ๊ธฐ์ค์ผ๋ก ์ผ์ชฝ ๋๋ ์ค๋ฅธ์ชฝ ์์ ์ฌ๋ถ๊ฐ ๊ฒฐ์ ๋๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
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
            // root๊ฐ ์๋ค๋ฉด root ์ง์ , root๊ฐ ์๋ค๋ฉด, ์์ ๋ธ๋ ํ์ํ์ฌ ์ ์ฅ
            if (root == null) root = input;
            else insert(input, root);
        }

        private void insert(Node input, Node root) {
            // ๋ถ๋ชจ๋ณด๋ค x๊ฐ์ด ์์ ๊ฒฝ์ฐ์๋ left๋ฅผ ํ์, ๊ทธ๋ ์ง ์์ผ๋ฉด right ํ์
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

            // x๊ฐ์ ์ค๋ฆ์ฐจ์, y๊ฐ์ ๋ด๋ฆผ์ฐจ์์ผ๋ก ์ ๋ ฌํ์ฌ BFS ํ์์ผ๋ก ๋ณํ
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

### โ๏ธ **Review**
- ๊ณ ๋ฌธํด์๊ฐ์ BFS ํ์์ผ๋ก ์๋ ฅ๋ฐ์ ์ด๋ฅผ preorder, postorder๋ก ์ถ๋ ฅํ๋ ๊ณผ์ ๊ฐ ์๊ฐ๋ ์์ด๋์ด๋ ์ฝ๊ฒ ์ก์ ์ ์์๋ค.
- x๊ฐ ์ขํ์ ๋ฐ๋ฅธ ์ผ์ชฝ, ์ค๋ฅธ์ชฝ ์์ ์ฌ๋ถ์ ๋ํ ๊ณ ๋ ค๋ฅผ ํตํด ํธ๋ฆฌ๋ฅผ ์์ฑํด์ผ ํ๋ ์๊ฐ์ด ํค ํฌ์ธํธ์์ง ์์๊น ..
  - `insert()` ๋ฅผ ์ค๋ฒ๋ก๋ฉํ๋ ๋ฐฉ์์ ์ฌ์ฉํด๋ณด์๋ค!
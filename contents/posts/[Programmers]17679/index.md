---
title: "👩‍💻 17679. 프렌즈4블록"
description: "알고리즘 문제 풀기"
date: 2022-05-22
update: 2022-05-22
tags:
  - 구현
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 프렌즈4블록](https://programmers.co.kr/learn/courses/30/lessons/17679)

### 📍 **Logic**

```java
while (f.checkBlocks()) {
    answer += f.countBlocks();
    f.dropBlocks();
}
```

- 흐름은,
  - 보드에 4블록이 있는지 확인하고,
  - 있다면 없앨 수 있는 블록 수를 계산하고,
  - 보드를 최신화한다.

```java
public boolean checkBlocks() {
    check = new boolean[m][n];
    boolean has = false;

    for (int i = 0; i < m - 1; i++)
        for (int j = 0; j < n - 1; j++)
            if (blocks[i][j] != '-' && has4Blocks(i,j)) {
                check[i][j] = true;
                check[i][j + 1] = true;
                check[i + 1][j] = true;
                check[i + 1][j + 1] = true;
                has = true;
            }

    return has;
}
```
- 사라질 블록이 아니고, 4개의 블록쌍을 이룬다면, 해당 좌표들의 `check` 를 `true` 로 바꿔 후에 사라질 것임을 저장한다.



### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

    import java.util.*;

    class Friends {
        char[][] blocks;
        boolean[][] check;
        int m;
        int n;

        public Friends(int m, int n, String[] board) {
            this.m = m;
            this.n = n;
            blocks = new char[m][n];
            initBlocks(board);
        }

        private void initBlocks(String[] board) {
            for (int i = 0; i < m; i++)
                for (int j = 0; j < n; j++)
                    blocks[i][j] = board[i].charAt(j);
        }

        public boolean checkBlocks() {
            check = new boolean[m][n];
            boolean has = false;

            for (int i = 0; i < m - 1; i++)
                for (int j = 0; j < n - 1; j++)
                    if (blocks[i][j] != '-' && has4Blocks(i,j)) {
                        check[i][j] = true;
                        check[i][j + 1] = true;
                        check[i + 1][j] = true;
                        check[i + 1][j + 1] = true;
                        has = true;
                    }

            return has;
        }

        private boolean has4Blocks(int x, int y) {
            return blocks[x][y] == blocks[x][y + 1] && blocks[x][y] == blocks[x + 1][y] && blocks[x][y] == blocks[x + 1][y + 1];
        }

        public int countBlocks() {
            int count = 0;
            
            for (int i = 0; i < m; i++)
                for (int j = 0; j < n; j++) {
                    if (!check[i][j]) continue;
                    count++;
                    blocks[i][j] = '-';
                }
            
            return count;
        }

        public void dropBlocks() {
            for (int i = m - 1; i >= 0; i--)
                for (int j = 0; j < n; j++)
                    if (blocks[i][j] == '-') pullBlocks(i, j);
        }

        private void pullBlocks(int x, int y) {
            for (int k = x - 1; k >= 0; k--) {
                if (blocks[k][y] != '-') {
                    blocks[x][y] = blocks[k][y];
                    blocks[k][y] = '-';
                    break;
                }
            }
        }
    }

    class Solution {
        public int solution(int m, int n, String[] board) {
            Friends f = new Friends(m, n, board);

            int answer = 0;
            
            while (f.checkBlocks()) {
                answer += f.countBlocks();
                f.dropBlocks();
            }
            
            return answer;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 시키는 대로 하면 되는 문제였다.
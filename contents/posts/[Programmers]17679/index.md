---
title: "π©βπ» 17679. νλ μ¦4λΈλ‘"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-05-22
update: 2022-05-22
tags:
  - κ΅¬ν
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - νλ μ¦4λΈλ‘](https://programmers.co.kr/learn/courses/30/lessons/17679)

### π **Logic**

```java
while (f.checkBlocks()) {
    answer += f.countBlocks();
    f.dropBlocks();
}
```

- νλ¦μ,
  - λ³΄λμ 4λΈλ‘μ΄ μλμ§ νμΈνκ³ ,
  - μλ€λ©΄ μμ¨ μ μλ λΈλ‘ μλ₯Ό κ³μ°νκ³ ,
  - λ³΄λλ₯Ό μ΅μ ννλ€.

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
- μ¬λΌμ§ λΈλ‘μ΄ μλκ³ , 4κ°μ λΈλ‘μμ μ΄λ£¬λ€λ©΄, ν΄λΉ μ’νλ€μ `check` λ₯Ό `true` λ‘ λ°κΏ νμ μ¬λΌμ§ κ²μμ μ μ₯νλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
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

### βοΈ **Review**
- μν€λ λλ‘ νλ©΄ λλ λ¬Έμ μλ€.
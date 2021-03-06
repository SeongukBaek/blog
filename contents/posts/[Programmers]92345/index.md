---
title: "๐ฉโ๐ป 92345. ์ฌ๋ผ์ง๋ ๋ฐํ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-07-17
update: 2022-07-17
tags:
  - DFS
  - ์์  ํ์
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ์ฌ๋ผ์ง๋ ๋ฐํ](https://programmers.co.kr/learn/courses/30/lessons/92345)

### ๐ **Logic**

```java
private Result dfs(int aX, int aY, int bX, int bY, int moveA, int moveB) {
    boolean win = false;
    int minCount = 5 * 5;
    int maxCount = moveA + moveB;
    
    if (moveA == moveB && board[aX][aY] == 1) {
        // a๊ฐ ์์ง์ผ ์ฐจ๋ก
        for (int[] d : dir) {
            int naX = aX + d[0];
            int naY = aY + d[1];

            if (!checkBoundary(naX, naY)) continue;
            
            board[aX][aY] = 0;
            Result r = dfs(naX, naY, bX, bY, moveA + 1, moveB);
            win |= !r.win;
            if (!r.win) minCount = Math.min(minCount, r.count);
            else maxCount = Math.max(maxCount, r.count);

            board[aX][aY] = 1;
        }
    } else if (moveA > moveB && board[bX][bY] == 1) {
        // b๊ฐ ์์ง์ผ ์ฐจ๋ก
        for (int[] d : dir) {
            int nbX = bX + d[0];
            int nbY = bY + d[1];

            if (!checkBoundary(nbX, nbY)) continue;
            
            board[bX][bY] = 0;
            // dfs์ ๊ฒฐ๊ณผ๋ ๋ณธ์ธ์ด ์๋ ๋ค๋ฅธ ์ฌ๋์ ๊ฒฐ๊ณผ์ด๋ฏ๋ก, ์นํจ๊ฐ ๋ฐ๋์ด๋ค.
            // ๋ํ r.win = true์ธ ๊ฒฝ์ฐ๊ฐ ํ๋๋ผ๋ ์์ ๊ฒฝ์ฐ win์ true๊ฐ ๋์ด์ผ ํ๋ฏ๋ก or์ฐ์ฐ์ ์ํํ๋ค.
            Result r = dfs(aX, aY, nbX, nbY, moveA, moveB + 1);
            win |= !r.win;

            // ๋ณธ์ธ์ด ์ด๊ธฐ๋ ๊ฒฝ์ฐ๋ผ๋ฉด ์ต๋ํ ๋นจ๋ฆฌ ์ด๊ธธ ๋์ ์ด๋ํ์๋ฅผ ๊ฐฑ์ ํ๋ค.
            if (!r.win) minCount = Math.min(minCount, r.count);
            // ๋ณธ์ธ์ด ์ง๋ ๊ฒฝ์ฐ๋ผ๋ฉด ์ต๋ํ ์ค๋ ๋ฒํธ ๋์ ์ด๋ํ์๋ฅผ ๊ฐฑ์ ํ๋ค.
            else maxCount = Math.max(maxCount, r.count);

            board[bX][bY] = 1;
        }
    }
    
    return new Result(win, win ? minCount : maxCount);
}
```

- A๊ฐ ์์ง์ผ ์ฐจ๋ก์, B๊ฐ ์์ง์ผ ์ฐจ๋ก๋ฅผ ๋๋์ด ์๊ฐํ๋ค.
- DFS๋ฐฉ์์ผ๋ก ์์ง์ด๋ฉด์, ์ด๊ธฐ๋ ๊ฒฝ์ฐ์ ์ง๋ ๊ฒฝ์ฐ์ ์ด๋ํ์๋ฅผ ๊ฐฑ์ ํ๋ค.
 
### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class Result {
        boolean win;
        int count;
        
        public Result(boolean win, int count) {
            this.win = win;
            this.count = count;
        }
    }

    class Solution {
        static int[][] dir = {{ -1, 0 }, { 0, 1 }, { 1, 0 }, { 0, -1 }};
        static int[][] board;
        static int N;
        static int M;
        
        public int solution(int[][] board, int[] aloc, int[] bloc) {
            this.board = board;
            this.N = board.length;
            this.M = board[0].length;
            
            return dfs(aloc[0], aloc[1], bloc[0], bloc[1], 0, 0).count;
        }
        
        private Result dfs(int aX, int aY, int bX, int bY, int moveA, int moveB) {
            boolean win = false;
            int minCount = 5 * 5;
            int maxCount = moveA + moveB;
            
            if (moveA == moveB && board[aX][aY] == 1) {
                // a๊ฐ ์์ง์ผ ์ฐจ๋ก
                for (int[] d : dir) {
                    int naX = aX + d[0];
                    int naY = aY + d[1];

                    if (!checkBoundary(naX, naY)) continue;
                    
                    board[aX][aY] = 0;
                    Result r = dfs(naX, naY, bX, bY, moveA + 1, moveB);
                    win |= !r.win;
                    if (!r.win) minCount = Math.min(minCount, r.count);
                    else maxCount = Math.max(maxCount, r.count);

                    board[aX][aY] = 1;
                }
            } else if (moveA > moveB && board[bX][bY] == 1) {
                // b๊ฐ ์์ง์ผ ์ฐจ๋ก
                for (int[] d : dir) {
                    int nbX = bX + d[0];
                    int nbY = bY + d[1];

                    if (!checkBoundary(nbX, nbY)) continue;
                    
                    board[bX][bY] = 0;
                    // dfs์ ๊ฒฐ๊ณผ๋ ๋ณธ์ธ์ด ์๋ ๋ค๋ฅธ ์ฌ๋์ ๊ฒฐ๊ณผ์ด๋ฏ๋ก, ์นํจ๊ฐ ๋ฐ๋์ด๋ค.
                    // ๋ํ r.win = true์ธ ๊ฒฝ์ฐ๊ฐ ํ๋๋ผ๋ ์์ ๊ฒฝ์ฐ win์ true๊ฐ ๋์ด์ผ ํ๋ฏ๋ก or์ฐ์ฐ์ ์ํํ๋ค.
                    Result r = dfs(aX, aY, nbX, nbY, moveA, moveB + 1);
                    win |= !r.win;

                    // ๋ณธ์ธ์ด ์ด๊ธฐ๋ ๊ฒฝ์ฐ๋ผ๋ฉด ์ต๋ํ ๋นจ๋ฆฌ ์ด๊ธธ ๋์ ์ด๋ํ์๋ฅผ ๊ฐฑ์ ํ๋ค.
                    if (!r.win) minCount = Math.min(minCount, r.count);
                    // ๋ณธ์ธ์ด ์ง๋ ๊ฒฝ์ฐ๋ผ๋ฉด ์ต๋ํ ์ค๋ ๋ฒํธ ๋์ ์ด๋ํ์๋ฅผ ๊ฐฑ์ ํ๋ค.
                    else maxCount = Math.max(maxCount, r.count);

                    board[bX][bY] = 1;
                }
            }
            
            return new Result(win, win ? minCount : maxCount);
        }
        
        private boolean checkBoundary(int x, int y) {
            return (x >= 0 && x < N && y >= 0 && y < M && board[x][y] != 0) ;
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ์ด๊ธธ ์ ์๋ ํ๋ ์ด์ด๋ ์ต๋ํ ๋นจ๋ฆฌ ์น๋ฆฌํ๊ณ , ์ง ์๋ฐ์ ์๋ ํ๋ ์ด์ด๋ ์ต๋ํ ์ค๋ ๋ฒํด๋ค๋ผ๋ ์กฐ๊ฑด์ ์์ด ์กฐ๊ธ ๋ํนํ ๋ฌธ์ ๊ฐ ์๋์๋์ถ๋ค.
- ์ค๋ณต๋๋ ๋ก์ง์ ๋ผ๋ด์ด์ผ ํ  ๊ฒ ๊ฐ๋ค.
- ์ญ์ ๋ง์ง๋ง ๋ฌธ์ ๋ ์ด๋ ต๋ค ...
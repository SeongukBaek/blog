---
title: "๐ฉโ๐ป 42894. ๋ธ๋ก ๊ฒ์"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-06-05
update: 2022-06-05
tags:
  - ๊ตฌํ
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๋ธ๋ก ๊ฒ์](https://programmers.co.kr/learn/courses/30/lessons/42894)

### ๐ **Logic**

```java
public void findRemovableBlock() {
    int count;
    
    // ๋ ์ด์ ์ญ์  ๊ฐ๋ฅํ ๋ธ๋ก์ด ์์ ๋๊น์ง ์งํ
    do {
        count = 0;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                // ๊ฐ๋ก ๋๋ ์ธ๋ก ๋ฒ์์ ์ง์ฌ๊ฐํ ๋ธ๋ก ์ฌ๋ถ ํ์ธ
                if ((i <= N - 2 && j <= N - 3 && find(i, j, 2, 3)) || (i <= N - 3 && j <= N - 2 && find(i, j, 3, 2)))
                    count++;
            }
        }
        removableBlocks += count;
    } while(count != 0);
}
```

- ์ด์ค for๋ฌธ์ผ๋ก ๋ณด๋๋ฅผ ํ์ธํ๋ฉด์, 2x3 ๋ฒ์์ 3x2 ๋ฒ์๋ฅผ ํ์ธํ์ฌ ๊ฒ์  ๋ธ๋ก 2๊ฐ๋ก ์ญ์ ํ  ์ ์๋ ๋ธ๋ก์ ์๋ฅผ ์นด์ดํธํ๋ค.

```java
private boolean find(int x, int y, int h, int w) {
    // ๋น ๊ณต๊ฐ์ ์นด์ดํธ, ๋น ๊ณต๊ฐ์ 2๊ฐ๊น์ง๋ง ๊ฐ๋ฅํ๋ค. ๋ธ๋ก ๋ฒ์์ ํฌ๊ธฐ๋ 6์ด๊ณ  ๋ธ๋ก์ ํฌ๊ธฐ๋ 4์ด๊ธฐ ๋๋ฌธ
    int emptyCount = 0;
    // ๋น ๊ณต๊ฐ์ด ์๋ ๋ธ๋ก ๋ฒํธ๋ฅผ ์ ์ฅ, ๋น ๊ณต๊ฐ์ด ์๋ ๊ฒฝ์ฐ์๋ ์ด ๊ฐ๊ณผ ๋ชจ๋ ๋์ผํด์ผ ํจ
    int lastNum = -1;
    
    for (int i = x; i < x + h; i++) {
        for (int j = y; j < y + w; j++) {
            // ๋น ๊ณต๊ฐ์ธ ๊ฒฝ์ฐ
            if (board[i][j] == 0) {
                if (!canFill(i, j)) return false;
                if (++emptyCount > 2) return false;
            } else {
                // ๋น ๊ณต๊ฐ์ด ์๋ ๋ธ๋ก ๋ฒํธ๊ฐ ์๊ณ , ํ์ฌ ์์ญ๊ณผ ๋ค๋ฅธ ๋ฒํธ๋ผ๋ฉด ๊ฐ์ ๋ธ๋ก์ด ์๋๋ฏ๋ก ์ข๋ฃ
                if (lastNum != -1 && lastNum != board[i][j]) return false;
                lastNum = board[i][j];
            }
        }
    }
    
    removeBlock(x, y, h, w);
    
    return true;
}
```

- ํ์ฌ ์์น์ ๊ฐ๋ก, ์ธ๋ก ๋ฒ์๋ฅผ ๊ฐ์ง๊ณ  ํด๋น ๋ฒ์ ๋ด์ ๋น ๊ณต๊ฐ์ ๊ฐ์์ ๋น ๊ณต๊ฐ์ด ์๋ ๋ธ๋ก์ ๋ฒํธ๋ฅผ ์ ์ฅํ๋ค.
  - ๋น ๊ณต๊ฐ์ ๊ฐ์๊ฐ **3๊ฐ ์ด์**์ผ ๊ฒฝ์ฐ ์ข๋ฃํ๋ค.
  - ๋น ๊ณต๊ฐ์ด ์๋ ๋ธ๋ก ๋ฒํธ์ ๊ฐ์ง ์์ ๋ธ๋ก ๋ฒํธ๊ฐ ๋์จ ๊ฒฝ์ฐ, ๋์ผํ ๋ธ๋ก์ด ์๋๋ฏ๋ก ์ข๋ฃํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class Board {
        int N;
        int[][] board;
        // ์ง์ธ ์ ์๋ ๋ธ๋ก์ ์
        int removableBlocks = 0;
        
        public Board(int[][] board) {
            this.N = board.length;
            this.board = board;
        }
        
        public void findRemovableBlock() {
            int count;
            
            // ๋ ์ด์ ์ญ์  ๊ฐ๋ฅํ ๋ธ๋ก์ด ์์ ๋๊น์ง ์งํ
            do {
                count = 0;
                for (int i = 0; i < N; i++) {
                    for (int j = 0; j < N; j++) {
                        // ๊ฐ๋ก ๋๋ ์ธ๋ก ๋ฒ์์ ์ง์ฌ๊ฐํ ๋ธ๋ก ์ฌ๋ถ ํ์ธ
                        if ((i <= N - 2 && j <= N - 3 && find(i, j, 2, 3)) || (i <= N - 3 && j <= N - 2 && find(i, j, 3, 2)))
                            count++;
                    }
                }
                removableBlocks += count;
            } while(count != 0);
        }
        
        private boolean find(int x, int y, int h, int w) {
            // ๋น ๊ณต๊ฐ์ ์นด์ดํธ, ๋น ๊ณต๊ฐ์ 2๊ฐ๊น์ง๋ง ๊ฐ๋ฅํ๋ค. ๋ธ๋ก ๋ฒ์์ ํฌ๊ธฐ๋ 6์ด๊ณ  ๋ธ๋ก์ ํฌ๊ธฐ๋ 4์ด๊ธฐ ๋๋ฌธ
            int emptyCount = 0;
            // ๋น ๊ณต๊ฐ์ด ์๋ ๋ธ๋ก ๋ฒํธ๋ฅผ ์ ์ฅ, ๋น ๊ณต๊ฐ์ด ์๋ ๊ฒฝ์ฐ์๋ ์ด ๊ฐ๊ณผ ๋ชจ๋ ๋์ผํด์ผ ํจ
            int lastNum = -1;
            
            for (int i = x; i < x + h; i++) {
                for (int j = y; j < y + w; j++) {
                    // ๋น ๊ณต๊ฐ์ธ ๊ฒฝ์ฐ
                    if (board[i][j] == 0) {
                        if (!canFill(i, j)) return false;
                        if (++emptyCount > 2) return false;
                    } else {
                        // ๋น ๊ณต๊ฐ์ด ์๋ ๋ธ๋ก ๋ฒํธ๊ฐ ์๊ณ , ํ์ฌ ์์ญ๊ณผ ๋ค๋ฅธ ๋ฒํธ๋ผ๋ฉด ๊ฐ์ ๋ธ๋ก์ด ์๋๋ฏ๋ก ์ข๋ฃ
                        if (lastNum != -1 && lastNum != board[i][j]) return false;
                        lastNum = board[i][j];
                    }
                }
            }
            
            removeBlock(x, y, h, w);
            
            return true;
        }
        
        // ํด๋น ๊ณต๊ฐ์ ์ฑ์ธ ์ ์๋์ง ํ์ธํ๋ ํจ์, ํด๋น ํ์ ์ ํ๊น์ง๊ฐ ๋น์ด์๋์ง ํ์ธ
        private boolean canFill(int x, int y) {
            for (int i = 0; i < x; i++)
                if (board[i][y] != 0) return false;
            
            return true;
        }
        
        // ๋ธ๋ก ์ญ์ 
        private void removeBlock(int x, int y, int h, int w) {
            for (int i = x; i < x + h; i++)
                for (int j = y; j < y + w; j++)
                    board[i][j] = 0;
        }
        
        public int getCount() {
            return removableBlocks;
        }
    }

    class Solution {
        public int solution(int[][] board) {
            Board b = new Board(board);
            
            b.findRemovableBlock();
            
            return b.getCount();
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ๋ฌธ์  ์์ฒด ์ดํด๋ ์ด๋ ต์ง ์์์ง๋ง, ๊ตฌํ์ด ์ข ๋นก์๋ค.
- ์ญ์ ๊ฐ ๊ฐ๋ฅํ์ง ์๋์ง ํ์ธํ๋ ๋ก์ง์ด ์ค์ํ๋ค.
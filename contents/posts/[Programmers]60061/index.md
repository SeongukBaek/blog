---
title: "๐ฉโ๐ป 60061. ๊ธฐ๋ฅ๊ณผ ๋ณด ์ค์น"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-06-23
update: 2022-06-23
tags:
  - ๊ตฌํ
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๊ธฐ๋ฅ๊ณผ ๋ณด ์ค์น](https://programmers.co.kr/learn/courses/30/lessons/60061)

### ๐ **Logic**

```java
private static boolean checkPillar(int x, int y) {
  // ๋ฐ๋ฅ ์ค์น
  if (y == 0) return true;
  // ์๋์ ๊ธฐ๋ฅ์ด ์๋ ๊ฒฝ์ฐ
  else if (y > 0 && pillars[x][y - 1]) return true;
  // ํ์ชฝ์ ๋ณด๊ฐ ์๋ ๊ฒฝ์ฐ
  else return x > 0 && covers[x - 1][y] || covers[x][y];
}

private static boolean checkCover(int x, int y) {
  // ํ์ชฝ ๋์ ๊ธฐ๋ฅ์ด ์๋ ๊ฒฝ์ฐ
  if (y > 0 && pillars[x][y - 1] || pillars[x + 1][y - 1]) return true;
  // ์์ชฝ ๋์ด ๋ชจ๋ ๋ณด์ ์ฐ๊ฒฐ๋ ๊ฒฝ์ฐ
  else return x > 0 && covers[x - 1][y] && covers[x + 1][y];
}

private static boolean canDelete(int n) {
  for (int i = 0; i <= n; i++)
      for (int j = 0; j <= n; j++)
          // ๊ธฐ๋ฅ์ด ํด๋น ์์น์ ์์ ์ ์๊ฑฐ๋, ๋ณด๊ฐ ํด๋น ์์น์ ์์ ์ ์๋ ๊ฒฝ์ฐ false
          if ((pillars[i][j] && !checkPillar(i, j)) || (covers[i][j] && !checkCover(i, j))) return false;
  return true;
}
```
- `checkPillar` ์ `checkCover` ๋ ๊ฐ๊ฐ ๊ธฐ๋ฅ๊ณผ ๋ณด๊ฐ ์ค์น๊ฐ๋ฅํ์ง๋ฅผ ํ์ธํ๋ ํจ์์ด๋ค.
  - ์ฃผ์ด์ง ์กฐ๊ฑด์ ๋ฐ๋ผ ์ด๋ฅผ ํ์ธํ๋ค.
- `canDelete` ๋ ๊ธฐ๋ฅ๊ณผ ๋ณด๋ฅผ ์ฃผ์ด์ง ๋ช๋ น๋๋ก ์ญ์ ํ์ ๋, ์ฃผ์ด์ง ์กฐ๊ฑด์ ๋ถ๋ง์กฑํ๋ ์ขํ๊ฐ ์๋์ง ํ์ธํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

    import java.util.*;

    class Solution {
        static boolean[][] pillars;
        static boolean[][] covers;
        
        public int[][] solution(int n, int[][] build_frame) {
            pillars = new boolean[n + 1][n + 1];
            covers = new boolean[n + 1][n + 1];
            int count = 0;

            for (int[] bf : build_frame) {
                int x = bf[0];
                int y = bf[1];
                int struct = bf[2];
                int command = bf[3];

                // ๊ธฐ๋ฅ
                if (struct == 0) {
                    // ์ญ์ 
                    if (command == 0) {
                        pillars[x][y] = false;
                        if (!canDelete(n)) pillars[x][y] = true;
                        else count--;
                    }
                    // ์ค์น
                    else {
                        if (!checkPillar(x, y)) continue;
                        pillars[x][y] = true;
                        count++;
                    }
                }
                // ๋ณด
                else {
                    // ์ญ์ 
                    if (command == 0) {
                        covers[x][y] = false;
                        if (!canDelete(n)) covers[x][y] = true;
                        else count--;
                    }
                    // ์ค์น
                    else {
                        if (!checkCover(x, y)) continue;
                        covers[x][y] = true;
                        count++;
                    }
                }
            }

            int[][] answer = new int[count][3];
            int idx = 0;
            for (int i = 0; i <= n; i++) {
                for (int j = 0; j <= n; j++) {
                    if (pillars[i][j])
                        answer[idx++] = new int[]{i, j, 0};
                    if (covers[i][j])
                        answer[idx++] = new int[]{i, j, 1};
                }
            }
            
            return answer;
        }
        
        private static boolean checkPillar(int x, int y) {
            // ๋ฐ๋ฅ ์ค์น
            if (y == 0) return true;
            // ์๋์ ๊ธฐ๋ฅ์ด ์๋ ๊ฒฝ์ฐ
            else if (y > 0 && pillars[x][y - 1]) return true;
            // ํ์ชฝ์ ๋ณด๊ฐ ์๋ ๊ฒฝ์ฐ
            else return x > 0 && covers[x - 1][y] || covers[x][y];
        }
        
        private static boolean checkCover(int x, int y) {
            // ํ์ชฝ ๋์ ๊ธฐ๋ฅ์ด ์๋ ๊ฒฝ์ฐ
            if (y > 0 && pillars[x][y - 1] || pillars[x + 1][y - 1]) return true;
            // ์์ชฝ ๋์ด ๋ชจ๋ ๋ณด์ ์ฐ๊ฒฐ๋ ๊ฒฝ์ฐ
            else return x > 0 && covers[x - 1][y] && covers[x + 1][y];
        }

        private static boolean canDelete(int n) {
            for (int i = 0; i <= n; i++)
                for (int j = 0; j <= n; j++)
                    // ๊ธฐ๋ฅ์ด ํด๋น ์์น์ ์์ ์ ์๊ฑฐ๋, ๋ณด๊ฐ ํด๋น ์์น์ ์์ ์ ์๋ ๊ฒฝ์ฐ false
                    if ((pillars[i][j] && !checkPillar(i, j)) || (covers[i][j] && !checkCover(i, j))) return false;
            return true;
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ์ฒ์ ๊ตฌํ ์, ๊ธฐ๋ฅ๊ณผ ๋ณด์ ์ญ์  ์กฐ๊ฑด ํ์ธ๋๋ฌธ์ ์ ๋ฅผ ๋จน์๊ณ , `map` ํ๋์ ๊ธฐ๋ฅ ์ฌ๋ถ์ ๋ณด ์ฌ๋ถ๋ฅผ ํจ๊ป ์ ์ฅํ์๋๋ฐ, ์๊ฐํด๋ณด๋ ๊ธฐ๋ฅ๊ณผ ๋ณด๊ฐ ํ ์ขํ์ ํจ๊ป ์กด์ฌํ  ์ ์์๋ ๊ฒ์ ๊ฐ๊ณผํ์๋ค.
- ๋ํ, ์ค์น์ ์ญ์ ํ๋ ๊ตฌ์กฐ๋ฌผ์ ๋ํ `ArrayList` ๋ฅผ ๋ง๋ค์ด์ ๊ด๋ฆฌํ  ๊ตฌ์กฐ๋ฌผ์ ๋ฒ์๋ฅผ ์ค์ด๋ ค ํ๋๋ฐ ๊ตฌํ์์ ์กฐ๊ธ ๋งํ๋ค ...
  - ์ ๊ฐ์ฒด๋ฅผ ๋ง๋ค์ด์ ์ด๋ฏธ ์๋ `Map` ์์ ๊ฐ์ ์กฐํํ๋ คํ๋ ์์ ๋ค๋ฅธ ๊ฐ์ฒด๋ก ํ๋จ์ ํด์ ์กฐํ๊ฐ ๋ถ๊ฐ๋ฅํ๋ค.
---
title: "๐ฉโ๐ป 17779. ๊ฒ๋ฆฌ๋งจ๋๋ง 2"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-03-20
update: 2022-03-20
tags:
  - ๊ตฌํ
  - ๋ธ๋ฃจํธํฌ์ค
  - ์๋ฎฌ๋ ์ด์
series: "๐ฉโ๐ป BOJ"
---

## ๋ฌธ์ 
์ฌํ์์ ์์ฅ ๊ตฌ์ฌํ์ ์ง๋ ๋ช ๋๊ฐ ๊ฒ๋ฆฌ๋งจ๋๋ง์ ํตํด์ ์์ ์ ๋น์๊ฒ ์ ๋ฆฌํ๊ฒ ์ ๊ฑฐ๊ตฌ๋ฅผ ํ์ ํ๋ค. ๊ฒฌ์ ํ  ๊ถ๋ ฅ์ด ์์ด์ง ๊ตฌ์ฌํ์ ๊ถ๋ ฅ์ ๋งค์ฐ ๋ถ๋นํ๊ฒ ํ์ฌํ๊ณ , ์ฌ์ง์ด๋ ์์ ์ด๋ฆ๋ ์ฌํ์๋ก ๋ณ๊ฒฝํ๋ค. ์ด๋ฒ ์ ๊ฑฐ์์๋ ์ต๋ํ ๊ณตํํ๊ฒ ์ ๊ฑฐ๊ตฌ๋ฅผ ํ์ ํ๋ ค๊ณ  ํ๋ค.

์ฌํ์๋ ํฌ๊ธฐ๊ฐ NรN์ธ ๊ฒฉ์๋ก ๋ํ๋ผ ์ ์๋ค. ๊ฒฉ์์ ๊ฐ ์นธ์ ๊ตฌ์ญ์ ์๋ฏธํ๊ณ , rํ c์ด์ ์๋ ๊ตฌ์ญ์ (r, c)๋ก ๋ํ๋ผ ์ ์๋ค. ๊ตฌ์ญ์ ๋ค์ฏ ๊ฐ์ ์ ๊ฑฐ๊ตฌ๋ก ๋๋ ์ผ ํ๊ณ , ๊ฐ ๊ตฌ์ญ์ ๋ค์ฏ ์ ๊ฑฐ๊ตฌ ์ค ํ๋์ ํฌํจ๋์ด์ผ ํ๋ค. ์ ๊ฑฐ๊ตฌ๋ ๊ตฌ์ญ์ ์ ์ด๋ ํ๋ ํฌํจํด์ผ ํ๊ณ , ํ ์ ๊ฑฐ๊ตฌ์ ํฌํจ๋์ด ์๋ ๊ตฌ์ญ์ ๋ชจ๋ ์ฐ๊ฒฐ๋์ด ์์ด์ผ ํ๋ค. ๊ตฌ์ญ A์์ ์ธ์ ํ ๊ตฌ์ญ์ ํตํด์ ๊ตฌ์ญ B๋ก ๊ฐ ์ ์์ ๋, ๋ ๊ตฌ์ญ์ ์ฐ๊ฒฐ๋์ด ์๋ค๊ณ  ํ๋ค. ์ค๊ฐ์ ํตํ๋ ์ธ์ ํ ๊ตฌ์ญ์ 0๊ฐ ์ด์์ด์ด์ผ ํ๊ณ , ๋ชจ๋ ๊ฐ์ ์ ๊ฑฐ๊ตฌ์ ํฌํจ๋ ๊ตฌ์ญ์ด์ด์ผ ํ๋ค.

์ ๊ฑฐ๊ตฌ๋ฅผ ๋๋๋ ๋ฐฉ๋ฒ์ ๋ค์๊ณผ ๊ฐ๋ค.

1. ๊ธฐ์ค์  (x, y)์ ๊ฒฝ๊ณ์ ๊ธธ์ด d1, d2๋ฅผ ์ ํ๋ค. (d1, d2 โฅ 1, 1 โค x < x+d1+d2 โค N, 1 โค y-d1 < y < y+d2 โค N)
2. ๋ค์ ์นธ์ ๊ฒฝ๊ณ์ ์ด๋ค.
   1. (x, y), (x+1, y-1), ..., (x+d1, y-d1)
   2. (x, y), (x+1, y+1), ..., (x+d2, y+d2)
   3. (x+d1, y-d1), (x+d1+1, y-d1+1), ... (x+d1+d2, y-d1+d2)
   4. (x+d2, y+d2), (x+d2+1, y+d2-1), ..., (x+d2+d1, y+d2-d1)
3. ๊ฒฝ๊ณ์ ๊ณผ ๊ฒฝ๊ณ์ ์ ์์ ํฌํจ๋์ด์๋ ๊ณณ์ 5๋ฒ ์ ๊ฑฐ๊ตฌ์ด๋ค.
4. 5๋ฒ ์ ๊ฑฐ๊ตฌ์ ํฌํจ๋์ง ์์ ๊ตฌ์ญ (r, c)์ ์ ๊ฑฐ๊ตฌ ๋ฒํธ๋ ๋ค์ ๊ธฐ์ค์ ๋ฐ๋ฅธ๋ค.
   1. 1๋ฒ ์ ๊ฑฐ๊ตฌ: 1 โค r < x+d1, 1 โค c โค y
   2. 2๋ฒ ์ ๊ฑฐ๊ตฌ: 1 โค r โค x+d2, y < c โค N
   3. 3๋ฒ ์ ๊ฑฐ๊ตฌ: x+d1 โค r โค N, 1 โค c < y-d1+d2
   4. 4๋ฒ ์ ๊ฑฐ๊ตฌ: x+d2 < r โค N, y-d1+d2 โค c โค N

์๋๋ ํฌ๊ธฐ๊ฐ 7ร7์ธ ์ฌํ์๋ฅผ ๋ค์ฏ ๊ฐ์ ์ ๊ฑฐ๊ตฌ๋ก ๋๋ ๋ฐฉ๋ฒ์ ์์์ด๋ค.

<img src="https://upload.acmicpc.net/813c38e0-3197-4589-bc96-17d96eb9ed14/-/preview/" width="80%">

๊ตฌ์ญ (r, c)์ ์ธ๊ตฌ๋ A[r][c]์ด๊ณ , ์ ๊ฑฐ๊ตฌ์ ์ธ๊ตฌ๋ ์ ๊ฑฐ๊ตฌ์ ํฌํจ๋ ๊ตฌ์ญ์ ์ธ๊ตฌ๋ฅผ ๋ชจ๋ ํฉํ ๊ฐ์ด๋ค. ์ ๊ฑฐ๊ตฌ๋ฅผ ๋๋๋ ๋ฐฉ๋ฒ ์ค์์, ์ธ๊ตฌ๊ฐ ๊ฐ์ฅ ๋ง์ ์ ๊ฑฐ๊ตฌ์ ๊ฐ์ฅ ์ ์ ์ ๊ฑฐ๊ตฌ์ ์ธ๊ตฌ ์ฐจ์ด์ ์ต์๊ฐ์ ๊ตฌํด๋ณด์.

### ์๋ ฅ
- ์ฒซ์งธ ์ค์ ์ฌํ์์ ํฌ๊ธฐ N์ด ์ฃผ์ด์ง๋ค.
- ๋์งธ ์ค๋ถํฐ N๊ฐ์ ์ค์ N๊ฐ์ ์ ์๊ฐ ์ฃผ์ด์ง๋ค. rํ c์ด์ ์ ์๋ A[r][c]๋ฅผ ์๋ฏธํ๋ค.

### ์ถ๋ ฅ
- ์ฒซ์งธ ์ค์ ์ธ๊ตฌ๊ฐ ๊ฐ์ฅ ๋ง์ ์ ๊ฑฐ๊ตฌ์ ๊ฐ์ฅ ์ ์ ์ ๊ฑฐ๊ตฌ์ ์ธ๊ตฌ ์ฐจ์ด์ ์ต์๊ฐ์ ์ถ๋ ฅํ๋ค.

### ๐ **Logic**

```java
class Dosi {
    int N;
    int minDiff = Integer.MAX_VALUE;
    int[][] map;
    int[][] copyMap;
    int[] rangeX = { -1, 0, 1, 0 };
    int[] rangeY = { 0, 1, 0, -1 };
    ...

}
```

- ์ ๊ฑฐ๊ตฌ์ ์ ๋ณด๋ฅผ ๋ด๋นํ๋ ํด๋์ค์ด๋ค.

```java
public int vote() {...}
```

- ์ฃผ์ด์ง ๊ธฐ์ค์ ๋ฐ๋ผ ์ ๊ฑฐ๊ตฌ๋ฅผ ๋๋๊ณ , ์ธ๊ตฌ ์๋ฅผ ํฉ์ฐํ๋ ๋ก์ง์ ์คํํ๋ ๋ฉ์๋์ด๋ค.

```java
private void setLine(int x, int y, int d1, int d2) {...}
```

- 5๋ฒ ์ ๊ฑฐ๊ตฌ์ ๊ฐ์ฅ์๋ฆฌ๋ฅผ ๊ธ๊ณ , ๋ด๋ถ ์์ญ์ ํ์ํ๋ `isConnected` ๋ฅผ ์คํํ๋ ๋ฉ์๋์ด๋ค.

```java
private void isConnected(int x, int y) {...}
```

- ์ฌ๊ท์ ์ผ๋ก 5๋ฒ ์ ๊ฑฐ๊ตฌ์ ๋ด๋ถ๋ฅผ ํ์ํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.*;

    class Dosi {
        int N;
        int minDiff = Integer.MAX_VALUE;
        int[][] map;
        int[][] copyMap;
        int[] rangeX = { -1, 0, 1, 0 };
        int[] rangeY = { 0, 1, 0, -1 };

        public Dosi(int N) {
            this.N = N;
            map = new int[N + 1][N + 1];
        }

        public int vote() {
            for (int d1 = 1; d1 <= N; d1++) {
                for (int d2 = 1; d2 <= N; d2++) {
                    for (int x = 1; x <= N; x++) {
                        for (int y = 1; y <= N; y++) {
                            if (!(x + d1 + d2 <= N && y - d1 >= 1 && y + d2 <= N)) continue;
                            copyMap = new int[N + 1][N + 1];
                            popSum1(x, y, d1);
                            popSum2(x, y ,d2);
                            popSum3(x, y, d1, d2);
                            popSum4(x, y, d1, d2);
                            setLine(x, y, d1, d2);
                            sum();
                        }
                    }
                }
            }
            return minDiff;
        }

        private void sum() {
            int max = 0;
            int min = Integer.MAX_VALUE;
            int[] popSum = new int[6];
            for(int i=1; i<=N; i++) {
                for(int j=1; j<=N; j++) {
                    popSum[copyMap[i][j]]+=map[i][j];
                }
            }
            for(int i=1; i<=5; i++) {
                max = Math.max(max, popSum[i]);
                min = Math.min(min, popSum[i]);
            }
            minDiff = Math.min(minDiff, max-min);
        }

        private void setLine(int x, int y, int d1, int d2) {
            for(int i = 0; i <= d1; i++) {
                copyMap[x+i][y-i] = 5;
            }
            for(int i = 0; i <= d2; i++) {
                copyMap[x+i][y+i] = 5;
            }
            for(int i = 0; i <= d2; i++) {
                copyMap[x+d1+i][y-d1+i] = 5;
            }
            for(int i = 0; i <= d1; i++) {
                copyMap[x+d2+i][y+d2-i] = 5;
            }
            for(int alpha = 0; alpha < d1; alpha++) {
                isConnected(x+alpha+1, y-alpha);
            }
            for(int alpha = 0; alpha < d2; alpha++) {
                isConnected(x+alpha+1, y+alpha);
            }
        }

        private void isConnected(int x, int y) {
            copyMap[x][y] = 5;

            for(int i=0; i<4; i++) {
                int nx = x + rangeX[i];
                int ny = y + rangeY[i];
                if (nx < 1 || nx > N || ny < 1 || ny > N) continue;
                if (copyMap[nx][ny] != 5) isConnected(nx,ny);
            }
        }

        private void popSum1(int x, int y, int d1) {
            for (int i = 1; i < x + d1; i++) {
                for (int j = 1; j <= y; j++) {
                    copyMap[i][j] = 1;
                }
            }
        }

        private void popSum2(int x, int y, int d2) {
            for (int i = 1; i <= x + d2; i++) {
                for (int j = y + 1; j <= N; j++) {
                    copyMap[i][j] = 2;
                }
            }
        }

        private void popSum3(int x, int y, int d1, int d2) {
            for (int i = x + d1; i <= N; i++) {
                for (int j = 1; j < y - d1 + d2; j++) {
                    copyMap[i][j] = 3;
                }
            }
        }

        private void popSum4(int x, int y, int d1, int d2) {
            for (int i = x + d2 + 1; i <= N; i++) {
                for (int j = y - d1 + d2; j <= N; j++) {
                    copyMap[i][j] = 4;
                }
            }
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int N = Integer.parseInt(br.readLine());

            Dosi dosi = new Dosi(N);
            String[] line;

            for (int i = 1; i <= N; i++) {
                line = br.readLine().split(" ");
                for (int j = 1; j <= N; j++) {
                    dosi.map[i][j] = Integer.parseInt(line[j - 1]);
                }
            }

            System.out.println(dosi.vote());

            br.close();
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ์ฒ์์๋ ๊ฒ๋ฆฌ๋งจ๋๋ง์ด๋ ๋น์ทํ ์ค ์์๋๋ฐ ์กฐ๊ธ์ ๋ฌ๋ผ์ ์๊ฐํด๋ณด๋๋ฐ ์๊ฐ์ด ์ข ๊ฑธ๋ ธ๋ค. 
- ์ ๊ฑฐ๊ตฌ๋ฅผ ๋๋๋ ๋ก์ง์ ๊ตฌํํ๋๋ฐ ์๊ฐ์ด ๊ฑธ๋ ธ๊ณ , ๊ฒ์ํ์ ์ฐธ๊ณ ํด์ ๋๋ฆ๋๋ก ํ์ด๋ดค๋๋ฐ, ์ต์ข์ ์ผ๋ก ์ธ๊ตฌ์๋ฅผ ํฉ์ฐํด ์ฐจ์ด์ ์ต์๋ฅผ ๊ตฌํ๋ ๋ก์ง์ด ์๊พธ ํ๋ ธ๋ค.
  - ์ด์ฐจํผ ๋๋ ์ง ์ ๊ฑฐ๊ตฌ์ ์ธ๊ตฌ ์๋ฅผ ๋๋ ๋๋ง๋ค ํฉ์ฐํ๊ณ  ์ ๊ฑฐ๊ตฌ๋ฅผ ๋ค ๋๋ ๋ค (์ฆ, ์ธ๊ตฌ ์ ํฉ์ฐ๊น์ง ์๋ฃ๋ ์ํ) ์ฐจ์ด๋ฅผ ๊ตฌํ๊ณ  ์ด๋ฅผ ์๋ฐ์ดํธํ๋ ๋ฐฉ์์ ์ ํ๋ฆฌ๋์ง ๋ชจ๋ฅด๊ฒ ๋ค.

### ๐ ์ถ์ฒ
Baekjoon : https://www.acmicpc.net/problem/17779
---
title: "๐ฉโ๐ป 1012. ์ ๊ธฐ๋ ๋ฐฐ์ถ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2021-12-28
update: 2021-12-28
tags:
  - ๊ทธ๋ํ์ด๋ก 
  - ๊ทธ๋ํํ์
  - BFS
  - DFS
series: "๐ฉโ๐ป BOJ"
---

## ๋ฌธ์ 

์ฐจ์ธ๋ ์๋์ธ ํ๋๋ ๊ฐ์๋ ๊ณ ๋ญ์ง์์ ์ ๊ธฐ๋ ๋ฐฐ์ถ๋ฅผ ์ฌ๋ฐฐํ๊ธฐ๋ก ํ์๋ค. ๋์ฝ์ ์ฐ์ง ์๊ณ  ๋ฐฐ์ถ๋ฅผ ์ฌ๋ฐฐํ๋ ค๋ฉด ๋ฐฐ์ถ๋ฅผ ํด์ถฉ์ผ๋ก๋ถํฐ ๋ณดํธํ๋ ๊ฒ์ด ์ค์ํ๊ธฐ ๋๋ฌธ์, ํ๋๋ ํด์ถฉ ๋ฐฉ์ง์ ํจ๊ณผ์ ์ธ ๋ฐฐ์ถํฐ์ง๋ ์ด๋ฅผ ๊ตฌ์ํ๊ธฐ๋ก ๊ฒฐ์ฌํ๋ค. ์ด ์ง๋ ์ด๋ ๋ฐฐ์ถ๊ทผ์ฒ์ ์์ํ๋ฉฐ ํด์ถฉ์ ์ก์ ๋จน์์ผ๋ก์จ ๋ฐฐ์ถ๋ฅผ ๋ณดํธํ๋ค. ํนํ, ์ด๋ค ๋ฐฐ์ถ์ ๋ฐฐ์ถํฐ์ง๋ ์ด๊ฐ ํ ๋ง๋ฆฌ๋ผ๋ ์ด๊ณ  ์์ผ๋ฉด ์ด ์ง๋ ์ด๋ ์ธ์ ํ ๋ค๋ฅธ ๋ฐฐ์ถ๋ก ์ด๋ํ  ์ ์์ด, ๊ทธ ๋ฐฐ์ถ๋ค ์ญ์ ํด์ถฉ์ผ๋ก๋ถํฐ ๋ณดํธ๋ฐ์ ์ ์๋ค. ํ ๋ฐฐ์ถ์ ์ํ์ข์ฐ ๋ค ๋ฐฉํฅ์ ๋ค๋ฅธ ๋ฐฐ์ถ๊ฐ ์์นํ ๊ฒฝ์ฐ์ ์๋ก ์ธ์ ํด์๋ ๊ฒ์ด๋ค.

ํ๋๊ฐ ๋ฐฐ์ถ๋ฅผ ์ฌ๋ฐฐํ๋ ๋์ ๊ณ ๋ฅด์ง ๋ชปํด์ ๋ฐฐ์ถ๋ฅผ ๊ตฐ๋ฐ๊ตฐ๋ฐ ์ฌ์ด ๋์๋ค. ๋ฐฐ์ถ๋ค์ด ๋ชจ์ฌ์๋ ๊ณณ์๋ ๋ฐฐ์ถํฐ์ง๋ ์ด๊ฐ ํ ๋ง๋ฆฌ๋ง ์์ผ๋ฉด ๋๋ฏ๋ก ์๋ก ์ธ์ ํด์๋ ๋ฐฐ์ถ๋ค์ด ๋ช ๊ตฐ๋ฐ์ ํผ์ ธ์๋์ง ์กฐ์ฌํ๋ฉด ์ด ๋ช ๋ง๋ฆฌ์ ์ง๋ ์ด๊ฐ ํ์ํ์ง ์ ์ ์๋ค. ์๋ฅผ ๋ค์ด ๋ฐฐ์ถ๋ฐญ์ด ์๋์ ๊ฐ์ด ๊ตฌ์ฑ๋์ด ์์ผ๋ฉด ์ต์ 5๋ง๋ฆฌ์ ๋ฐฐ์ถํฐ์ง๋ ์ด๊ฐ ํ์ํ๋ค. 0์ ๋ฐฐ์ถ๊ฐ ์ฌ์ด์ ธ ์์ง ์์ ๋์ด๊ณ , 1์ ๋ฐฐ์ถ๊ฐ ์ฌ์ด์ ธ ์๋ ๋์ ๋ํ๋ธ๋ค.

|||||||||||
|-|-|-|-|-|-|-|-|-|-|-|
|1|1|0|0|0|0|0|0|0|0|
|0|1|0|0|0|0|0|0|0|0|
|0|0|0|0|1|0|0|0|0|0|
|0|0|0|0|1|0|0|0|0|0|
|0|0|1|1|0|0|0|1|1|1|
|0|0|0|0|1|0|0|1|1|1|

### ์๋ ฅ
- ์ฒซ ์ค์๋ ํ์คํธ ์ผ์ด์ค์ ๊ฐ์ T๊ฐ ์ฃผ์ด์ง๋ค. ๊ทธ ๋ค์ ์ค๋ถํฐ ๊ฐ๊ฐ์ ํ์คํธ ์ผ์ด์ค์ ๋ํด ์ฒซ์งธ ์ค์๋ ๋ฐฐ์ถ๋ฅผ ์ฌ์ ๋ฐฐ์ถ๋ฐญ์ ๊ฐ๋ก๊ธธ์ด M(1 โค M โค 50)๊ณผ ์ธ๋ก๊ธธ์ด N(1 โค N โค 50), ๊ทธ๋ฆฌ๊ณ  ๋ฐฐ์ถ๊ฐ ์ฌ์ด์ ธ ์๋ ์์น์ ๊ฐ์ K(1 โค K โค 2500)์ด ์ฃผ์ด์ง๋ค. ๊ทธ ๋ค์ K์ค์๋ ๋ฐฐ์ถ์ ์์น X(0 โค X โค M-1), Y(0 โค Y โค N-1)๊ฐ ์ฃผ์ด์ง๋ค. ๋ ๋ฐฐ์ถ์ ์์น๊ฐ ๊ฐ์ ๊ฒฝ์ฐ๋ ์๋ค.

### ์ถ๋ ฅ
- ๊ฐ ํ์คํธ ์ผ์ด์ค์ ๋ํด ํ์ํ ์ต์์ ๋ฐฐ์ถํฐ์ง๋ ์ด ๋ง๋ฆฌ ์๋ฅผ ์ถ๋ ฅํ๋ค.

### ๐ **Logic**

```java
class Pair {
    private int first;
    private int second;

    Pair(int x, int y) {
        this.first = x;
        this.second = y;
    }

    public int getF() {
        return first;
    }

    public int getS() {
        return second;
    }
}
```
- `Pair` ์ ๊ตฌํ์ ์ํด ์์ ๊ฐ์ **class** ๋ฅผ ์์ฑํ๋ค.

```java
for (int a = 0; a < worm.size(); a++) {
    int vF = worm.get(a).getF();
    int vS = worm.get(a).getS();
    if (visited[vF][vS] == 0) {
        Queue<Pair> q = new LinkedList<>();
        q.offer(worm.get(a));
        visited[vF][vS] = 1;
        while (!q.isEmpty()) {
            Pair cur = q.poll();
            for (int i = 0; i < 4; i++) {
                int nx = cur.getF() + x_ary[i], ny = cur.getS() + y_ary[i];
                if (nx >= 0 && ny >= 0 && nx < M && ny < N) {
                    if (visited[nx][ny] == 0 && map[nx][ny] == 1) {
                        visited[nx][ny] = 1;
                        q.offer(new Pair(nx, ny));
                    }
                }
            }
        }
        worms++;
    }
}
```
- ๋ฐฐ์ถ์ ์์น ๋ฐ ๋ฐฉ๋ฌธ ์ฌ๋ถ๋ฅผ ์ฌ์ฉํด ๋ฐฐ์ถํฐ์ง๋ ์ด๊ฐ ์ด๋ํ  ์ ์๋ ๋ฐฐ์ถ์ ์์น๋ฅผ `Queue` ์ `DFS` ๋ฐฉ์์ผ๋ก ์ถ๊ฐํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

        import java.util.*;

        public class Main {
            public static void main(String[] args) {
                Scanner sc = new Scanner(System.in);
                int T = sc.nextInt();
                int[] x_ary = {0, 0, -1, 1};
                int[] y_ary = {-1, 1, 0, 0};
                int[][] map = null;
                int[][] visited = null;
                visited = new int[50][50];

                while (T > 0) {
                    int M = sc.nextInt();
                    int N = sc.nextInt();
                    int K = sc.nextInt();
                    int worms = 0;

                    map = new int[M][N];
                    ArrayList<Pair> worm = new ArrayList<>();

                    for (int[] tmp : visited)
                        Arrays.fill(tmp, 0);

                    for (int i = 0; i < K; i++) {
                        int x = sc.nextInt();
                        int y = sc.nextInt();
                        map[x][y] = 1;
                        worm.add(new Pair(x, y));
                    }

                    for (int a = 0; a < worm.size(); a++) {
                        int vF = worm.get(a).getF();
                        int vS = worm.get(a).getS();
                        if (visited[vF][vS] == 0) {
                            Queue<Pair> q = new LinkedList<>();
                            q.offer(worm.get(a));
                            visited[vF][vS] = 1;
                            while (!q.isEmpty()) {
                                Pair cur = q.poll();
                                for (int i = 0; i < 4; i++) {
                                    int nx = cur.getF() + x_ary[i], ny = cur.getS() + y_ary[i];
                                    if (nx >= 0 && ny >= 0 && nx < M && ny < N) {
                                        if (visited[nx][ny] == 0 && map[nx][ny] == 1) {
                                            visited[nx][ny] = 1;
                                            q.offer(new Pair(nx, ny));
                                        }
                                    }
                                }
                            }
                            worms++;
                        }
                    }

                    System.out.println(worms);
                    T -= 1;
                }
                sc.close();
            }
        }
        class Pair {
            private int first;
            private int second;

            Pair(int x, int y) {
                this.first = x;
                this.second = y;
            }

            public int getF() {
                return first;
            }

            public int getS() {
                return second;
            }
        }
  </div>
</details>

### โ๏ธ **Review**

- `c++` ๋ก ํ์๋ ๋ฌธ์ ๋ฅผ `java` ๋ก ๋ณํํ์ฌ ๋ค์ ํ์ด๋ณธ ๋ฌธ์ 
- ๋ผ๋ฆฌ ์์ฒด๋ ๊ธฐ๋ณธ์ ์ธ DFS๋ฅผ ์ฌ์ฉํ ๋ฌธ์ ์ฌ์ `java` ๋ฌธ๋ฒ์ ์ค๋๋ง์ ๋ค์ ์จ๋ณธ ๋ฌธ์ ์๋ค.

### ๐ ์ถ์ฒ
https://www.acmicpc.net/problem/1012

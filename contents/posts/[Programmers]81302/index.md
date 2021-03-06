---
title: "๐ฉโ๐ป 81302. ๊ฑฐ๋ฆฌ๋๊ธฐ ํ์ธํ๊ธฐ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-05-03
update: 2022-05-03
tags:
  - BFS
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๊ฑฐ๋ฆฌ๋๊ธฐ ํ์ธํ๊ธฐ](https://programmers.co.kr/learn/courses/30/lessons/81302)

### ๐ **Logic**

```java
private int bfs(int x, int y) {
    Queue<Loc> queue = new LinkedList<>();
    boolean[][] visited = new boolean[5][5];
    int keep = 1;
    visited[x][y] = true;
    queue.add(new Loc(x, y, 0));

    while(!queue.isEmpty()) {
        Loc now = queue.poll();

        for (int i = 0; i < 4; i++) {
            int nx = now.x + rangeX[i];
            int ny = now.y + rangeY[i];
            if (!isIn(nx, ny)) continue;
            if (visited[nx][ny]) continue;
            
            int nDist = now.dist + 1;
            if (nDist > 2) continue;

            char nP = place[nx].charAt(ny);
            if (nP == 'P') return 0;
            if (nP == 'X') continue;

            visited[nx][ny] = true;
            queue.add(new Loc(nx, ny, nDist));
        }
    }

    return keep;
}
```

- ์์์์ ์์น๋ถํฐ BFS๋ฅผ ์์ํ๋ค.
  - ๋ค์ ๋ฐฉ๋ฌธํ  ์ง์ ์ด ์ด๋ฏธ ๋ฐฉ๋ฌธํ๊ฑฐ๋, ๋ฒ์๋ฅผ ๋ฒ์ด๋ ๊ฒฝ์ฐ๋ ๋ค์ ์ง์ ์ ํ์ํ๊ณ ,
  - ๊ฑฐ๋ฆฌ๊ฐ 2๋ณด๋ค ํฐ ๊ฒฝ์ฐ๋ ๋ ์ด์ ํ์ธํ์ง ์์๋ ๊ฑฐ๋ฆฌ๋๊ธฐ๊ฐ ์ง์ผ์ง ๊ฒฝ์ฐ์ด๋ฏ๋ก, ๋ค์ ์ง์ ์ ํ์ํ๊ณ ,
  - 2 ์ดํ์ ๊ฑฐ๋ฆฌ์ ๋ค๋ฅธ ์์์๊ฐ ์๋ค๋ฉด, ๊ฑฐ๋ฆฌ๋๊ธฐ๊ฐ ์ง์ผ์ง์ง ์์ ๊ฒ์ผ๋ก, ๋ฐ๋ก ๋ฐํํ๋ค.
  - ๋ํ ํํฐ์์ด ์กด์ฌํ๋ค๋ฉด, ๋ ์ด์ ํ์ธํ์ง ์์๋ ๊ฑฐ๋ฆฌ๋๊ธฐ๊ฐ ์ง์ผ์ง ๊ฒฝ์ฐ์ด๋ฏ๋ก, ๋ค์ ์ง์ ์ ํ์ํ๋ค.
  - ๊ทธ๋ ์ง ์์ ๊ฒฝ์ฐ์๋ง ํด๋น ์ง์ ์ ๋ฐฉ๋ฌธ ์ฌ๋ถ๋ฅผ updateํ๊ณ  ํ์ ๋ฃ๋๋ค. ์ด๋, ๊ฑฐ๋ฆฌ๋ฅผ 1์ฉ ์ฆ๊ฐํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class Loc {
        int x;
        int y;
        int dist;
        
        public Loc(int x, int y, int dist) {
            this.x = x;
            this.y = y;
            this.dist = dist;
        }
    }

    class WaitingRoom {
        String[] place;
        int[] rangeX = { 0, 1, 0, -1 };
        int[] rangeY = { 1, 0, -1, 0 };
        
        public WaitingRoom(String[] place) {
            this.place = place;
        }
        
        public int checkKeepingDistance() {
            for (int i = 0; i < 5; i++) {
                for (int j = 0; j < 5; j++) {
                    char p = place[i].charAt(j);
                    if (p == 'P') 
                        if (bfs(i, j) == 0) 
                            return 0;
                }
            }
            return 1;
        }
        
        private int bfs(int x, int y) {
            Queue<Loc> queue = new LinkedList<>();
            boolean[][] visited = new boolean[5][5];
            int keep = 1;
            visited[x][y] = true;
            queue.add(new Loc(x, y, 0));

            while(!queue.isEmpty()) {
                Loc now = queue.poll();

                for (int i = 0; i < 4; i++) {
                    int nx = now.x + rangeX[i];
                    int ny = now.y + rangeY[i];
                    if (!isIn(nx, ny)) continue;
                    if (visited[nx][ny]) continue;
                    
                    int nDist = now.dist + 1;
                    if (nDist > 2) continue;

                    char nP = place[nx].charAt(ny);
                    if (nP == 'P') return 0;
                    if (nP == 'X') continue;

                    visited[nx][ny] = true;
                    queue.add(new Loc(nx, ny, nDist));
                }
            }

            return keep;
        }
        
        private boolean isIn(int x, int y) {
            return (x < 5 && x >= 0 && y < 5 && y >= 0);
        }
    }

    class Solution {
        public int[] solution(String[][] places) {
            int[] answer = new int[5];
            int T = 0;
            
            while (T < 5) {
                WaitingRoom wr = new WaitingRoom(places[T]);
                answer[T++] = wr.checkKeepingDistance();
            }
            
            return answer;
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ์ฒ์์๋ DFS ๋ฐฉ์์ผ๋ก ๊ตฌํํ์ผ๋, ๋ช๋ช ํ์ผ์์ ํ๋ ธ๊ณ , ๋จ์ํ ํ์ ๋ฐฉ์์ ์ฐจ์ด๋๊น BFS๋ก ๊ตฌํํด๋ ๋์ผํ  ๊ฒ์ด๋ผ ์๊ฐํ๋ค.
  - ๊ทธ๋ํ ํ์ ๋ฐฉ์์ ๋ฌธ์ ๊ฐ ์๋, ๋ฐํ ๊ฐ์ ๋ฐํ ์กฐ๊ฑด์ ๋ํ ๋ฌธ์ ์๋ค.
- ๋ค์ ๋ฐฉ๋ฌธ ์ง์ ์ ๋ํด ๋งจํดํผ ๊ฑฐ๋ฆฌ๋ฅผ ๊ตฌํด๋ณด๊ณ , 2 ์ดํ์ธ์ง ํ์ธํ๋ ๋ฐฉ์์์ ํ์ฌ ์ง์ ์์ ๋ค์ ์ง์ ์ผ๋ก ์ด๋ํ  ๋๋ง๋ค `dist` ๋ฅผ 1์ฉ ์ฆ๊ฐ์ํค๊ณ  ๊ทธ ๊ฐ์ ํจ๊ป ์ ๋ฌํด์ฃผ๋ ๋ฐฉ์์ผ๋ก ๋ณ๊ฒฝํ์ฌ ์๊ฐ์ ์ค์ผ ์ ์์๋ค.

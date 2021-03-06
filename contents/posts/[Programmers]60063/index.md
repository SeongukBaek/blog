---
title: "๐ฉโ๐ป 60063. ๋ธ๋ก ์ด๋ํ๊ธฐ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-06-26
update: 2022-06-26
tags:
  - BFS
  - ๊ตฌํ
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๋ธ๋ก ์ด๋ํ๊ธฐ](https://programmers.co.kr/learn/courses/30/lessons/60063)

### ๐ **Logic**

```java
private void moveRobot() {
    ...
}
```
- BFS ๋ฐฉ์์ผ๋ก `board` ํ์ํ๋ ํจ์๋ก, ์ด 3๋ฒ์ `for` ๋ฌธ์ด ์กด์ฌํ๋ค.
  - ์ฒซ๋ฒ์งธ๋ ์ฃผ์ด์ง ์ขํ๋ก๋ถํฐ ์ด๋ ๊ฐ๋ฅํ ์ํ์ข์ฐ ์ขํ๋ฅผ queue์ ์ถ๊ฐ
  - ๋๋ฒ์งธ์ ์ธ๋ฒ์ฌ๋ ๋ก๋ด์ ์ขํ ์ค ํ๋๋ฅผ ๊ธฐ์ค์ผ๋ก 90๋ ํ์ ํ์ฌ ๊ฐ ์ ์๋ ์ขํ๋ฅผ queue์ ์ถ๊ฐ

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

    import java.util.*;

    class Robot {
        int x1;
        int y1;
        int dir;
        int cost;
        
        public Robot(int x1, int y1, int dir, int cost) {
            this.x1 = x1;
            this.y1 = y1;
            this.dir = dir;
            this.cost = cost;
        }
    }

    class Solution {
        static int[][] board;
        static int size;
        static int answer = 0;
        
        public int solution(int[][] board) {
            this.board = board;
            this.size = board.length;
            
            moveRobot();
                
            return answer;
        }
        
        private void moveRobot() {
            int[] xRange = {0, 1, 0, -1};
            int[] yRange = {1, 0, -1, 0};
            // ํ์  ์์ ์ฌ์ฉํ  ๋ฒ์ ๋ฐฐ์ด
            int[] rxRange = {-1, 1, 1, -1};
            int[] ryRange = {1, 1, -1, -1};
            boolean[][][] visited = new boolean[size][size][4];
            
            // Queue์๋ ์ผ์ชฝ ์ขํ๋ง ์ถ๊ฐ
            Queue<Robot> queue = new LinkedList<>();
        
            int x1, y1, x2, y2, dir, cost;
            int nx1, ny1, nx2, ny2, ndir;
            
            queue.add(new Robot(0, 0, 0, 0));
            visited[0][0][0] = true;
            
            while (!queue.isEmpty()) {
                Robot robot = queue.poll();
                x1 = robot.x1;
                y1 = robot.y1;
                dir = robot.dir;
                cost = robot.cost;
                x2 = x1 + xRange[dir];
                y2 = y1 + yRange[dir];
                
                // ์ข๋ฃ
                if (isFinish(x1, y1) || isFinish(x2, y2)) {
                    answer = cost;
                    return;
                }
                
                // ์ํ์ข์ฐ๋ก ๋ก๋ด ์ด๋
                for (int r = 0; r < 4; r++) {
                    nx1 = x1 + xRange[r];
                    ny1 = y1 + yRange[r];
                    nx2 = x2 + xRange[r];
                    ny2 = y2 + yRange[r];
                    
                    if (!checkBoundary(nx1, ny1) || !checkBoundary(nx2, ny2)) continue;
                    if (board[nx1][ny1] == 1 || board[nx2][ny2] == 1) continue;
                    if (visited[nx1][ny1][dir]) continue;
                    
                    visited[nx1][ny1][dir] = true;
                    
                    queue.add(new Robot(nx1, ny1, dir, cost + 1));
                }
                
                int rx, ry, tempDir;
                
                // x1, y1๋ฅผ ๊ธฐ์ค์ผ๋ก 90๋ ํ์ 
                // ndir์ 0(์ค๋ฅธ์ชฝ ๋๊ฐ์  ์), 1(์ค๋ฅธ์ชฝ ๋๊ฐ์  ์๋), 2(์ผ์ชฝ ๋๊ฐ์  ์๋), 3(์ผ์ชฝ ๋๊ฐ์  ์) ์ค ํ๋
                for (int i = 1; i < 4; i += 2) { 
                    ndir = computeDir(dir, i);
                    nx2 = x1 + xRange[ndir];
                    ny2 = y1 + yRange[ndir];

                    tempDir = (i == 1) ? ndir : dir;
                    rx = x1 + rxRange[tempDir];
                    ry = y1 + ryRange[tempDir];

                    if (!checkBoundary(nx2, ny2) || !checkBoundary(rx, ry)) continue;
                    if (board[nx2][ny2] == 1 || board[rx][ry] == 1) continue;
                    if (visited[x1][y1][ndir]) continue;

                    visited[x1][y1][ndir] = true;
                    
                    queue.add(new Robot(x1, y1, ndir, cost + 1));
                }
                
                // ๋ฐ๋ ๋ฐฉํฅ ์ฒ๋ฆฌ
                // x2, y2๋ฅผ ๊ธฐ์ค์ผ๋ก 90๋ ํ์ 
                dir = computeDir(dir, 2);
                for (int i = 1; i < 4; i += 2) { 
                    ndir = computeDir(dir, i);
                    nx1 = x2 + xRange[ndir];
                    ny1 = y2 + yRange[ndir];

                    tempDir = (i == 1) ? ndir : dir;
                    rx = x2 + rxRange[tempDir];
                    ry = y2 + ryRange[tempDir];

                    ndir = (ndir + 2) % 4;
                    if (!checkBoundary(nx1, ny1) || !checkBoundary(rx, ry)) continue;
                    if (board[nx1][ny1] == 1 || board[rx][ry] == 1) continue;
                    if (visited[nx1][ny1][ndir]) continue;

                    visited[nx1][ny1][ndir] = true;
                    
                    queue.add(new Robot(nx1, ny1, ndir, cost + 1));
                }
            }
        }
        
        private boolean checkBoundary(int x, int y) {
            return x >= 0 && x < size && y >= 0 && y < size;
        }
        
        private boolean isFinish(int x, int y) {
            return x == size - 1 && y == size - 1;
        }
        
        private int computeDir(int dir, int i) {
            return (dir + i) % 4;
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- BFS๋ฅผ ์ฌ์ฉํด ๋ชฉ์ ์ง๊น์ง ์ต์ ๋น์ฉ์ ๊ตฌํ๋ ๋ฌธ์ ๋ผ ํ๋จํ๋ค. ๊ทธ๋ํ ํ์ ์์๋ DFS, BFS๊ฐ ๊ฐ๋ฅํ๋ฐ, BFS๊ฐ ์ต์ ๊ฑฐ๋ฆฌ๋ฅผ ๊ตฌํ๋๋ฐ ๋ ํจ์จ์ ์ธ ์๊ณ ๋ฆฌ์ฆ์ด๋ผ๋ ๊ฒ์ ๋ฐฐ์ ๋ ๊ธฐ์ต์ด ๋ BFS๋ฅผ ์ฌ์ฉํ๋ค.
- ์์ด๋์ด ์์ฒด๋ ์ฝ๊ฒ ๋ ์ฌ๋ ธ๋ค๋ง, ๋ก๋ด์ ์ขํ๊ฐ 2๊ฐ์ธ ์ ๊ณผ ์ด์ ๋ํ ํ์  ๊ตฌํ์ ์์ด ์ด๋ ค์ ๋ค ..
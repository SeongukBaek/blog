---
title: "👩‍💻 60063. 블록 이동하기"
description: "알고리즘 문제 풀기"
date: 2022-06-26
update: 2022-06-26
tags:
  - BFS
  - 구현ㅎ
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 블록 이동하기](https://programmers.co.kr/learn/courses/30/lessons/60063)

### 📍 **Logic**

```java
private void moveRobot() {
    ...
}
```
- BFS 방식으로 `board` 탐색하는 함수로, 총 3번의 `for` 문이 존재한다.
  - 첫번째는 주어진 좌표로부터 이동 가능한 상하좌우 좌표를 queue에 추가
  - 두번째와 세번재는 로봇의 좌표 중 하나를 기준으로 90도 회전하여 갈 수 있는 좌표를 queue에 추가

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
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
            // 회전 시에 사용할 범위 배열
            int[] rxRange = {-1, 1, 1, -1};
            int[] ryRange = {1, 1, -1, -1};
            boolean[][][] visited = new boolean[size][size][4];
            
            // Queue에는 왼쪽 좌표만 추가
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
                
                // 종료
                if (isFinish(x1, y1) || isFinish(x2, y2)) {
                    answer = cost;
                    return;
                }
                
                // 상하좌우로 로봇 이동
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
                
                // x1, y1를 기준으로 90도 회전
                // ndir은 0(오른쪽 대각선 위), 1(오른쪽 대각선 아래), 2(왼쪽 대각선 아래), 3(왼쪽 대각선 위) 중 하나
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
                
                // 반대 방향 처리
                // x2, y2를 기준으로 90도 회전
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

### ✏️ **Review**
- BFS를 사용해 목적지까지 최소 비용을 구하는 문제라 판단했다. 그래프 탐색 시에는 DFS, BFS가 가능한데, BFS가 최소 거리를 구하는데 더 효율적인 알고리즘이라는 것을 배웠던 기억이 나 BFS를 사용했다.
- 아이디어 자체는 쉽게 떠올렸다만, 로봇의 좌표가 2개인 점과 이에 대한 회전 구현에 있어 어려웠다 ..
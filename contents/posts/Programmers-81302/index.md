---
title: "👩‍💻 81302. 거리두기 확인하기"
description: "알고리즘 문제 풀기"
date: 2022-05-03
update: 2022-05-03
tags:
  - BFS
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 거리두기 확인하기](https://programmers.co.kr/learn/courses/30/lessons/81302)

### 📍 **Logic**

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

- 응시자의 위치부터 BFS를 시작한다.
  - 다음 방문할 지점이 이미 방문했거나, 범위를 벗어난 경우는 다음 지점을 탐색하고,
  - 거리가 2보다 큰 경우는 더 이상 확인하지 않아도 거리두기가 지켜진 경우이므로, 다음 지점을 탐색하고,
  - 2 이하의 거리에 다른 응시자가 있다면, 거리두기가 지켜지지 않은 것으로, 바로 반환한다.
  - 또한 파티션이 존재한다면, 더 이상 확인하지 않아도 거리두기가 지켜진 경우이므로, 다음 지점을 탐색한다.
  - 그렇지 않은 경우에만 해당 지점의 방문 여부를 update하고 큐에 넣는다. 이때, 거리를 1씩 증가한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
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

### ✏️ **Review**
- 처음에는 DFS 방식으로 구현했으나, 몇몇 테케에서 틀렸고, 단순히 탐색 방식의 차이니까 BFS로 구현해도 동일할 것이라 생각했다.
  - 그래프 탐색 방식의 문제가 아닌, 반환 값의 반환 조건에 대한 문제였다.
- 다음 방문 지점에 대해 맨해튼 거리를 구해보고, 2 이하인지 확인하는 방식에서 현재 지점에서 다음 지점으로 이동할 때마다 `dist` 를 1씩 증가시키고 그 값을 함께 전달해주는 방식으로 변경하여 시간을 줄일 수 있었다.

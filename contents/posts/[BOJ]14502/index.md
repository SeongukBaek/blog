---
title: "👩‍💻 14502. 연구소"
description: "알고리즘 문제 풀기"
date: 2022-03-19
update: 2022-03-19
tags:
  - 그래프이론
  - 그래프탐색
  - BFS
  - 브루트포스
series: "👩‍💻 BOJ"
---

## 문제
인체에 치명적인 바이러스를 연구하던 연구소에서 바이러스가 유출되었다. 다행히 바이러스는 아직 퍼지지 않았고, 바이러스의 확산을 막기 위해서 연구소에 벽을 세우려고 한다.
연구소는 크기가 N×M인 직사각형으로 나타낼 수 있으며, 직사각형은 1×1 크기의 정사각형으로 나누어져 있다. 연구소는 빈 칸, 벽으로 이루어져 있으며, 벽은 칸 하나를 가득 차지한다. 
일부 칸은 바이러스가 존재하며, 이 바이러스는 상하좌우로 인접한 빈 칸으로 모두 퍼져나갈 수 있다. 새로 세울 수 있는 벽의 개수는 3개이며, 꼭 3개를 세워야 한다.
예를 들어, 아래와 같이 연구소가 생긴 경우를 살펴보자.

```
2 0 0 0 1 1 0
0 0 1 0 1 2 0
0 1 1 0 1 0 0
0 1 0 0 0 0 0
0 0 0 0 0 1 1
0 1 0 0 0 0 0
0 1 0 0 0 0 0
```

이때, 0은 빈 칸, 1은 벽, 2는 바이러스가 있는 곳이다. 아무런 벽을 세우지 않는다면, 바이러스는 모든 빈 칸으로 퍼져나갈 수 있다. 2행 1열, 1행 2열, 4행 6열에 벽을 세운다면 지도의 모양은 아래와 같아지게 된다.

```
2 1 0 0 1 1 0
1 0 1 0 1 2 0
0 1 1 0 1 0 0
0 1 0 0 0 1 0
0 0 0 0 0 1 1
0 1 0 0 0 0 0
0 1 0 0 0 0 0
```

바이러스가 퍼진 뒤의 모습은 아래와 같아진다.

```
2 1 0 0 1 1 2
1 0 1 0 1 2 2
0 1 1 0 1 2 2
0 1 0 0 0 1 2
0 0 0 0 0 1 1
0 1 0 0 0 0 0
0 1 0 0 0 0 0
```

벽을 3개 세운 뒤, 바이러스가 퍼질 수 없는 곳을 안전 영역이라고 한다. 위의 지도에서 안전 영역의 크기는 27이다. 연구소의 지도가 주어졌을 때 얻을 수 있는 안전 영역 크기의 최댓값을 구하는 프로그램을 작성하시오.

## 입, 출력

입력
- 첫째 줄에 지도의 세로 크기 N과 가로 크기 M이 주어진다. (3 ≤ N, M ≤ 8)
- 둘째 줄부터 N개의 줄에 지도의 모양이 주어진다. 0은 빈 칸, 1은 벽, 2는 바이러스가 있는 위치이다. 2의 개수는 2보다 크거나 같고, 10보다 작거나 같은 자연수이다.
- 빈 칸의 개수는 3개 이상이다.

출력
- 첫째 줄에 얻을 수 있는 안전 영역의 최대 크기를 출력한다.

### 📍 **Logic**

```java
class Lab {
    Queue<Loc> locQueue;
    int N, M;
    int safeArea = 0;
    int[][] map;
    int[][] copyMap;
    int[] rangeX = { -1, 0, 1, 0 };
    int[] rangeY = { 0, 1, 0, -1 };

    Loc[] orgSafe;
    int idx0 = 0;
    ...
        
}
```

- 연구소의 정보를 관리하는 클래스
- 원본 연구소 정보를 저장하는 `map` 과 바이러스를 실제로 퍼뜨릴 `copyMap` 을 사용한다.
- 또한 벽을 세울 공간들을 저장하는 `orgSafe` 배열을 사용한다.
- `setWall()` 재귀 호출로 벽을 세우고, 벽을 다 세운 다음, `spreadVirus()` 에서 BFS 방식으로 바이러스를 퍼뜨린다.
- 이후, `countAndReset()` 으로 바이러스가 퍼진 이후의 안전 영역을 카운트하고, `map` 을 이용해 `copyMap` 을 바이러스가 퍼지기 전 상태로 돌려놓는다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.Arrays;
    import java.util.LinkedList;
    import java.util.Queue;

    class Loc {
        int x, y;

        public Loc(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    class Lab {
        Queue<Loc> locQueue;
        int N, M;
        int safeArea = 0;
        int[][] map;
        int[][] copyMap;
        int[] rangeX = { -1, 0, 1, 0 };
        int[] rangeY = { 0, 1, 0, -1 };

        Loc[] orgSafe;
        int idx0 = 0;

        public Lab (int N, int M) {
            this.N = N;
            this.M = M;
            map = new int[N][M];
            copyMap = new int[N][M];
            orgSafe = new Loc[N*M];
            locQueue = new LinkedList<>();
        }

        public int findMaxSafeArea() {
            setWall(0,3);
            return safeArea;
        }

        private void setWall(int idx, int count) {
            if (count == 0) {
                spreadVirus();
                int result = countAndReset();
                if (safeArea < result) safeArea = result;
            } else {
                count--;
                for (int i = idx; i < idx0; i++) {
                    copyMap[orgSafe[i].x][orgSafe[i].y] = 1;
                    setWall(i + 1, count);
                    copyMap[orgSafe[i].x][orgSafe[i].y] = 0;
                }
            }
        }

        private void spreadVirus() {
            for (int i = 0; i < locQueue.size(); i++) {
                Loc tmpLoc = locQueue.poll();
                bfs(tmpLoc.x, tmpLoc.y);
                locQueue.add(tmpLoc);
            }
        }

        private void bfs(int x, int y) {
            Queue<Loc> queue = new LinkedList<>();
            queue.add(new Loc(x, y));

            while (!queue.isEmpty()){
                Loc tmp = queue.poll();
                for (int i = 0; i < 4; i++) {
                    int nx = tmp.x + rangeX[i], ny = tmp.y + rangeY[i];
                    if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
                    if (copyMap[nx][ny] == 0) {
                        queue.add(new Loc(nx, ny));
                        copyMap[nx][ny] = 2;
                    }
                }
            }
        }

        private int countAndReset() {
            int count = 0;
            for (int i = 0; i < N; i++) {
                for (int j = 0; j < M; j++) {
                    if (copyMap[i][j] == 0) count++;
                    if (copyMap[i][j] == 2) {
                        if (locQueue.contains(new Loc(i, j))) continue;
                        copyMap[i][j] = map[i][j];
                    }
                }
            }
            return count;
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

            String[] line = br.readLine().split(" ");
            int N = Integer.parseInt(line[0]);
            int M = Integer.parseInt(line[1]);

            Lab lab = new Lab(N, M);

            for (int i = 0; i < N; i++) {
                lab.map[i] = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
                for (int j = 0; j < M; j++) {
                    if (lab.map[i][j] == 2)
                        lab.locQueue.add(new Loc(i, j));
                    else if (lab.map[i][j] == 0)
                        lab.orgSafe[lab.idx0++] = new Loc(i, j);
                    lab.copyMap[i][j] = lab.map[i][j];
                }
            }

            br.close();

            System.out.println(lab.findMaxSafeArea());
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 원래의 연구소 정보를 간직하기 위해 `map` 과 `copyMap` 배열을 두고 진행했는데, 계속 두 배열이 동기화된 것마냥 값이 같이 변경되고 있었다. 아무래도 `lab.map[i] = lab.copyMap[i];` 이 코드 때문에 인스턴스의 주소 공유나 참조의 문제일거라 생각해 검색해보니 아니나 다를까 "얕은 복사와 깊은 복사" 문제였다. 한 번 정리해야겠다.
- 바이러스가 퍼진 이후 다시 원상복구할때, 세운 벽까지 없애버리는 초기화 과정떄문에 값이 계속 잘못 나왔다. 초기화 과정은 항상 잘 확인하자.

### 📕 출처
Baekjoon : https://www.acmicpc.net/problem/14502
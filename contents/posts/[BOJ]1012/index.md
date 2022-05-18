---
title: "👩‍💻 1012. 유기농 배추"
description: "알고리즘 문제 풀기"
date: 2021-12-28
update: 2021-12-28
tags:
  - 그래프이론
  - 그래프탐색
  - BFS
  - DFS
series: "👩‍💻 BOJ"
---

## 문제

차세대 영농인 한나는 강원도 고랭지에서 유기농 배추를 재배하기로 하였다. 농약을 쓰지 않고 배추를 재배하려면 배추를 해충으로부터 보호하는 것이 중요하기 때문에, 한나는 해충 방지에 효과적인 배추흰지렁이를 구입하기로 결심한다. 이 지렁이는 배추근처에 서식하며 해충을 잡아 먹음으로써 배추를 보호한다. 특히, 어떤 배추에 배추흰지렁이가 한 마리라도 살고 있으면 이 지렁이는 인접한 다른 배추로 이동할 수 있어, 그 배추들 역시 해충으로부터 보호받을 수 있다. 한 배추의 상하좌우 네 방향에 다른 배추가 위치한 경우에 서로 인접해있는 것이다.

한나가 배추를 재배하는 땅은 고르지 못해서 배추를 군데군데 심어 놓았다. 배추들이 모여있는 곳에는 배추흰지렁이가 한 마리만 있으면 되므로 서로 인접해있는 배추들이 몇 군데에 퍼져있는지 조사하면 총 몇 마리의 지렁이가 필요한지 알 수 있다. 예를 들어 배추밭이 아래와 같이 구성되어 있으면 최소 5마리의 배추흰지렁이가 필요하다. 0은 배추가 심어져 있지 않은 땅이고, 1은 배추가 심어져 있는 땅을 나타낸다.

|||||||||||
|-|-|-|-|-|-|-|-|-|-|-|
|1|1|0|0|0|0|0|0|0|0|
|0|1|0|0|0|0|0|0|0|0|
|0|0|0|0|1|0|0|0|0|0|
|0|0|0|0|1|0|0|0|0|0|
|0|0|1|1|0|0|0|1|1|1|
|0|0|0|0|1|0|0|1|1|1|

### 입력
- 첫 줄에는 테스트 케이스의 개수 T가 주어진다. 그 다음 줄부터 각각의 테스트 케이스에 대해 첫째 줄에는 배추를 심은 배추밭의 가로길이 M(1 ≤ M ≤ 50)과 세로길이 N(1 ≤ N ≤ 50), 그리고 배추가 심어져 있는 위치의 개수 K(1 ≤ K ≤ 2500)이 주어진다. 그 다음 K줄에는 배추의 위치 X(0 ≤ X ≤ M-1), Y(0 ≤ Y ≤ N-1)가 주어진다. 두 배추의 위치가 같은 경우는 없다.

### 출력
- 각 테스트 케이스에 대해 필요한 최소의 배추흰지렁이 마리 수를 출력한다.

### 📍 **Logic**

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
- `Pair` 의 구현을 위해 위와 같은 **class** 를 생성했다.

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
- 배추의 위치 및 방문 여부를 사용해 배추흰지렁이가 이동할 수 있는 배추의 위치를 `Queue` 에 `DFS` 방식으로 추가한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
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

### ✏️ **Review**

- `c++` 로 풀었던 문제를 `java` 로 변환하여 다시 풀어본 문제
- 논리 자체는 기본적인 DFS를 사용한 문제여서 `java` 문법을 오랜만에 다시 써본 문제였다.

### 📕 출처
https://www.acmicpc.net/problem/1012

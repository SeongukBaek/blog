---
title: "👩‍💻 2146. 다리 만들기"
description: "알고리즘 문제 풀기"
date: 2022-02-10
update: 2022-02-10
tags:
  - 그래프이론
  - 그래프탐색
  - BFS
series: "👩‍💻 BOJ"
---

## 문제

여러 섬으로 이루어진 나라가 있다. 이 나라의 대통령은 섬을 잇는 다리를 만들겠다는 공약으로 인기몰이를 해 당선될 수 있었다. 하지만 막상 대통령에 취임하자, 다리를 놓는다는 것이 아깝다는 생각을 하게 되었다. 그래서 그는, 생색내는 식으로 한 섬과 다른 섬을 잇는 다리 하나만을 만들기로 하였고, 그 또한 다리를 가장 짧게 하여 돈을 아끼려 하였다.

이 나라는 N×N크기의 이차원 평면상에 존재한다. 이 나라는 여러 섬으로 이루어져 있으며, 섬이란 동서남북으로 육지가 붙어있는 덩어리를 말한다.

<img src="https://www.acmicpc.net/JudgeOnline/upload/201008/bri.PNG" width="50%">

그림에서 색이 있는 부분이 육지이고, 색이 없는 부분이 바다이다. 이 바다에 가장 짧은 다리를 놓아 두 대륙을 연결하고자 한다. 가장 짧은 다리란, 다리가 격자에서 차지하는 칸의 수가 가장 작은 다리를 말한다. 다음 그림에서 두 대륙을 연결하는 다리를 볼 수 있다.

<img src="https://www.acmicpc.net/JudgeOnline/upload/201008/b2.PNG" width="50%">

물론 위의 방법 외에도 다리를 놓는 방법이 여러 가지 있으나, 위의 경우가 놓는 다리의 길이가 3으로 가장 짧다(물론 길이가 3인 다른 다리를 놓을 수 있는 방법도 몇 가지 있다). 지도가 주어질 때, 가장 짧은 다리 하나를 놓아 두 대륙을 연결하는 방법을 찾으시오.

### 입력
- 첫 줄에는 지도의 크기 N(100이하의 자연수)가 주어진다. 그 다음 N줄에는 N개의 숫자가 빈칸을 사이에 두고 주어지며, 0은 바다, 1은 육지를 나타낸다. 항상 두 개 이상의 섬이 있는 데이터만 입력으로 주어진다.

### 출력
- 첫째 줄에 가장 짧은 다리의 길이를 출력한다.

### 📍 **Logic**

```java
class Loc {
  int x;
  int y;
  int cnt;

  public Loc(int x, int y, int cnt) {
      this.x = x;
      this.y = y;
      this.cnt = cnt;
  }

  public int getX() {
      return x;
  }

  public int getY() {
      return y;
  }

  public int getCnt() {
      return cnt;
  }
}
```

- 각 정점별 좌표 및 현재 정점까지 오는데 필요한 다리 수를 저장하기 위해 사용하는 클래스

```java
class Graph {
  final int[][] graph;
  boolean[][] discovered;
  Queue<Loc> q = new LinkedList<>();
  int[] w_way = { 1, 0, -1, 0 };
  int[] y_way = { 0, 1, 0, -1 };
  int bridge = Integer.MAX_VALUE;
  int graph_size;
  ...
}
```

- 그래프의 정보를 저장하기 위해 사용하는 클래스

```java
private int buildBridge(int x, int y) {
  discovered = new boolean[graph_size][graph_size];
  q = new LinkedList<>();
  q.add(new Loc(x, y, 0));
  int cur_land = graph[x][y];
  discovered[x][y] = true;

  while(!q.isEmpty()) {
    Loc loc = q.poll();
    int cur_x = loc.getX();
    int cur_y = loc.getY();
    int cnt = loc.getCnt();

    if (graph[cur_x][cur_y] != 0 && graph[cur_x][cur_y] != cur_land) return cnt;

    for (int i = 0; i < 4; i++) {
      int nextX = cur_x + w_way[i], nextY = cur_y + y_way[i];

      if (nextX < 0 || nextX >= graph_size || nextY < 0 || nextY >= graph_size) continue;
      if (discovered[nextX][nextY] || graph[nextX][nextY] == cur_land) continue;

      discovered[nextX][nextY] = true;
      q.add(new Loc(nextX, nextY, cnt+1));
    }
  }
  return -1;
}
```

- 구분된 대륙 정보를 가지고, 서로 다른 대륙을 잇는 다리를 놓아보는 메소드
- `if (graph[cur_x][cur_y] != 0 && graph[cur_x][cur_y] != cur_land) return cnt;` 을 통해 서로 다른 대륙을 이은 경우 사용된 `다리 길이 + 1` 이 반환
- 방문하지 않은 `0` , 즉 바다의 경우에만 계속 `Queue` 에 추가 
  
### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

    
      import java.io.BufferedReader;
      import java.io.IOException;
      import java.io.InputStreamReader;
      import java.util.LinkedList;
      import java.util.Queue;

      class Loc {
          int x;
          int y;
          int cnt;

          public Loc(int x, int y, int cnt) {
              this.x = x;
              this.y = y;
              this.cnt = cnt;
          }

          public int getX() {
              return x;
          }

          public int getY() {
              return y;
          }

          public int getCnt() {
              return cnt;
          }
      }

      class Graph {
          final int[][] graph;
          boolean[][] discovered;
          Queue<Loc> q = new LinkedList<>();
          int[] w_way = { 1, 0, -1, 0 };
          int[] y_way = { 0, 1, 0, -1 };
          int bridge = Integer.MAX_VALUE;
          int graph_size;

          public Graph(int size) {
              graph_size = size;
              this.graph = new int[graph_size][graph_size];
              discovered = new boolean[graph_size][graph_size];
          }

          public void AddElement(String line, int idx) {
              String[] tmp = line.split(" ");
              for(int i = 0; i < graph_size; i++) {
                  graph[idx][i] = Integer.parseInt(tmp[i]);
              }
          }

          public void identifyLand() {
              int land = 2;
              for (int i = 0; i < graph_size; i++) {
                  for (int j = 0; j < graph_size; j++) {
                      if (!discovered[i][j] && graph[i][j] == 1) {
                          fillLand(i, j, land);
                          land++;
                      }
                  }
              }
          }

          private void fillLand(int x, int y, int land) {
              graph[x][y] = land;
              discovered[x][y] = true;
              q.add(new Loc(x, y, 0));

              while(!q.isEmpty()) {
                  Loc loc = q.poll();
                  int nowX = loc.getX();
                  int nowY = loc.getY();

                  for (int i = 0; i < 4; i++) {
                      int nextX = nowX + w_way[i], nextY = nowY + y_way[i];

                      if (nextX < 0 || nextX >= graph_size || nextY < 0 || nextY >= graph_size) continue;
                      if (discovered[nextX][nextY]) continue;

                      if (graph[nextX][nextY] == 1) {
                          graph[nextX][nextY] = land;
                          discovered[nextX][nextY] = true;
                          q.add(new Loc(nextX, nextY, 0));
                      }
                  }
              }
          }

          public void solution() {
              for (int i = 0; i < graph_size; i++) {
                  for (int j = 0; j < graph_size; j++) {
                      if (graph[i][j] > 0) {
                          int cnt = buildBridge(i, j);
                          if (cnt == -1) continue;
                          bridge = Math.min(bridge, cnt);
                      }
                  }
              }
              System.out.println(bridge - 1);
          }

          private int buildBridge(int x, int y) {
              discovered = new boolean[graph_size][graph_size];
              q = new LinkedList<>();
              q.add(new Loc(x, y, 0));
              int cur_land = graph[x][y];
              discovered[x][y] = true;

              while(!q.isEmpty()) {
                  Loc loc = q.poll();
                  int cur_x = loc.getX();
                  int cur_y = loc.getY();
                  int cnt = loc.getCnt();

                  if (graph[cur_x][cur_y] != 0 && graph[cur_x][cur_y] != cur_land) return cnt;

                  for (int i = 0; i < 4; i++) {
                      int nextX = cur_x + w_way[i], nextY = cur_y + y_way[i];

                      if (nextX < 0 || nextX >= graph_size || nextY < 0 || nextY >= graph_size) continue;
                      if (discovered[nextX][nextY] || graph[nextX][nextY] == cur_land) continue;

                      discovered[nextX][nextY] = true;
                      q.add(new Loc(nextX, nextY, cnt+1));
                  }
              }
              return -1;
          }
      }

      public class Main {
          public static void main(String[] args) throws IOException {
              BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
              int N = Integer.parseInt(br.readLine());

              Graph g = new Graph(N);

              String line="";
              for (int idx = 0; idx < N; idx++) {
                  line = br.readLine();
                  g.AddElement(line, idx);
              }

              g.identifyLand();

              g.solution();

              br.close();
          }
      }
	
  	</div>
</details>

### ✏️ **Review**
- `Queue` 에 데이터 추가, 삭제, 검색 시 사용하는 메소드들 중 유사한 기능을 하는 메소드들의 차이를 아래 참고 블로그에서 확인할 수 있었다.
- 섬을 구분하여 저장하고, 이후 다리를 건설할 때 섬의 가장자리부터 탐색을 시작하면 어떨까라는 생각을 했다.
  - 섬의 가장자리를 구분해 저장해놓고 탐색하려니, 섬의 가장자리를 구분하는 것이 문제였다.
- 섬의 가장자리를 구분하지 않고, `브루트 포스` 처럼 모든 섬의 좌표에서 탐색하는 방식으로 변경했고, **메모리 초과**가 발생했다.

```java
graph[nowX][nowY] = land;
discovered[nowX][nowY] = true;

for (int i = 0; i < 4; i++) {
  int nextX = nowX + w_way[i], nextY = nowY + y_way[i];
  if (nextX >= 0 && nextX < graph_size && nextY >= 0 && nextY < graph_size && graph[nextX][nextY] == 1 && !discovered[nextX][nextY]) {
      q.add(new Loc(nextX, nextY, 0));
  }
}

// 위 코드를 아래와 같이 변경, 메모리 초과가 발생하지 않음

if (nextX < 0 || nextX >= graph_size || nextY < 0 || nextY >= graph_size) continue;
if (discovered[nextX][nextY]) continue;

if (graph[nextX][nextY] == 1) {
  graph[nextX][nextY] = land;
  discovered[nextX][nextY] = true;
  q.add(new Loc(nextX, nextY, 0));
}
```

- 블로그를 참고하여 위의 코드 수정으로 메모리초과를 피할 수 있었는데, 논리적으로 이해가 가지 않는다...

### 📕 출처
https://www.acmicpc.net/problem/2146

### 참고
- https://goodteacher.tistory.com/112
- https://loosie.tistory.com/224
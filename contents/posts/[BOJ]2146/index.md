---
title: "π©βπ» 2146. λ€λ¦¬ λ§λ€κΈ°"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-02-10
update: 2022-02-10
tags:
  - κ·Έλνμ΄λ‘ 
  - κ·Έλννμ
  - BFS
series: "π©βπ» BOJ"
---

## λ¬Έμ 

μ¬λ¬ μ¬μΌλ‘ μ΄λ£¨μ΄μ§ λλΌκ° μλ€. μ΄ λλΌμ λν΅λ Ήμ μ¬μ μλ λ€λ¦¬λ₯Ό λ§λ€κ² λ€λ κ³΅μ½μΌλ‘ μΈκΈ°λͺ°μ΄λ₯Ό ν΄ λΉμ λ  μ μμλ€. νμ§λ§ λ§μ λν΅λ Ήμ μ·¨μνμ, λ€λ¦¬λ₯Ό λλλ€λ κ²μ΄ μκΉλ€λ μκ°μ νκ² λμλ€. κ·Έλμ κ·Έλ, μμλ΄λ μμΌλ‘ ν μ¬κ³Ό λ€λ₯Έ μ¬μ μλ λ€λ¦¬ νλλ§μ λ§λ€κΈ°λ‘ νμκ³ , κ·Έ λν λ€λ¦¬λ₯Ό κ°μ₯ μ§§κ² νμ¬ λμ μλΌλ € νμλ€.

μ΄ λλΌλ NΓNν¬κΈ°μ μ΄μ°¨μ νλ©΄μμ μ‘΄μ¬νλ€. μ΄ λλΌλ μ¬λ¬ μ¬μΌλ‘ μ΄λ£¨μ΄μ Έ μμΌλ©°, μ¬μ΄λ λμλ¨λΆμΌλ‘ μ‘μ§κ° λΆμ΄μλ λ©μ΄λ¦¬λ₯Ό λ§νλ€.

<img src="https://www.acmicpc.net/JudgeOnline/upload/201008/bri.PNG" width="50%">

κ·Έλ¦Όμμ μμ΄ μλ λΆλΆμ΄ μ‘μ§μ΄κ³ , μμ΄ μλ λΆλΆμ΄ λ°λ€μ΄λ€. μ΄ λ°λ€μ κ°μ₯ μ§§μ λ€λ¦¬λ₯Ό λμ λ λλ₯μ μ°κ²°νκ³ μ νλ€. κ°μ₯ μ§§μ λ€λ¦¬λ, λ€λ¦¬κ° κ²©μμμ μ°¨μ§νλ μΉΈμ μκ° κ°μ₯ μμ λ€λ¦¬λ₯Ό λ§νλ€. λ€μ κ·Έλ¦Όμμ λ λλ₯μ μ°κ²°νλ λ€λ¦¬λ₯Ό λ³Ό μ μλ€.

<img src="https://www.acmicpc.net/JudgeOnline/upload/201008/b2.PNG" width="50%">

λ¬Όλ‘  μμ λ°©λ² μΈμλ λ€λ¦¬λ₯Ό λλ λ°©λ²μ΄ μ¬λ¬ κ°μ§ μμΌλ, μμ κ²½μ°κ° λλ λ€λ¦¬μ κΈΈμ΄κ° 3μΌλ‘ κ°μ₯ μ§§λ€(λ¬Όλ‘  κΈΈμ΄κ° 3μΈ λ€λ₯Έ λ€λ¦¬λ₯Ό λμ μ μλ λ°©λ²λ λͺ κ°μ§ μλ€). μ§λκ° μ£Όμ΄μ§ λ, κ°μ₯ μ§§μ λ€λ¦¬ νλλ₯Ό λμ λ λλ₯μ μ°κ²°νλ λ°©λ²μ μ°ΎμΌμμ€.

### μλ ₯
- μ²« μ€μλ μ§λμ ν¬κΈ° N(100μ΄νμ μμ°μ)κ° μ£Όμ΄μ§λ€. κ·Έ λ€μ Nμ€μλ Nκ°μ μ«μκ° λΉμΉΈμ μ¬μ΄μ λκ³  μ£Όμ΄μ§λ©°, 0μ λ°λ€, 1μ μ‘μ§λ₯Ό λνλΈλ€. ν­μ λ κ° μ΄μμ μ¬μ΄ μλ λ°μ΄ν°λ§ μλ ₯μΌλ‘ μ£Όμ΄μ§λ€.

### μΆλ ₯
- μ²«μ§Έ μ€μ κ°μ₯ μ§§μ λ€λ¦¬μ κΈΈμ΄λ₯Ό μΆλ ₯νλ€.

### π **Logic**

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

- κ° μ μ λ³ μ’ν λ° νμ¬ μ μ κΉμ§ μ€λλ° νμν λ€λ¦¬ μλ₯Ό μ μ₯νκΈ° μν΄ μ¬μ©νλ ν΄λμ€

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

- κ·Έλνμ μ λ³΄λ₯Ό μ μ₯νκΈ° μν΄ μ¬μ©νλ ν΄λμ€

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

- κ΅¬λΆλ λλ₯ μ λ³΄λ₯Ό κ°μ§κ³ , μλ‘ λ€λ₯Έ λλ₯μ μλ λ€λ¦¬λ₯Ό λμλ³΄λ λ©μλ
- `if (graph[cur_x][cur_y] != 0 && graph[cur_x][cur_y] != cur_land) return cnt;` μ ν΅ν΄ μλ‘ λ€λ₯Έ λλ₯μ μ΄μ κ²½μ° μ¬μ©λ `λ€λ¦¬ κΈΈμ΄ + 1` μ΄ λ°ν
- λ°©λ¬Ένμ§ μμ `0` , μ¦ λ°λ€μ κ²½μ°μλ§ κ³μ `Queue` μ μΆκ° 
  
### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
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

### βοΈ **Review**
- `Queue` μ λ°μ΄ν° μΆκ°, μ­μ , κ²μ μ μ¬μ©νλ λ©μλλ€ μ€ μ μ¬ν κΈ°λ₯μ νλ λ©μλλ€μ μ°¨μ΄λ₯Ό μλ μ°Έκ³  λΈλ‘κ·Έμμ νμΈν  μ μμλ€.
- μ¬μ κ΅¬λΆνμ¬ μ μ₯νκ³ , μ΄ν λ€λ¦¬λ₯Ό κ±΄μ€ν  λ μ¬μ κ°μ₯μλ¦¬λΆν° νμμ μμνλ©΄ μ΄λ¨κΉλΌλ μκ°μ νλ€.
  - μ¬μ κ°μ₯μλ¦¬λ₯Ό κ΅¬λΆν΄ μ μ₯ν΄λκ³  νμνλ €λ, μ¬μ κ°μ₯μλ¦¬λ₯Ό κ΅¬λΆνλ κ²μ΄ λ¬Έμ μλ€.
- μ¬μ κ°μ₯μλ¦¬λ₯Ό κ΅¬λΆνμ§ μκ³ , `λΈλ£¨νΈ ν¬μ€` μ²λΌ λͺ¨λ  μ¬μ μ’νμμ νμνλ λ°©μμΌλ‘ λ³κ²½νκ³ , **λ©λͺ¨λ¦¬ μ΄κ³Ό**κ° λ°μνλ€.

```java
graph[nowX][nowY] = land;
discovered[nowX][nowY] = true;

for (int i = 0; i < 4; i++) {
  int nextX = nowX + w_way[i], nextY = nowY + y_way[i];
  if (nextX >= 0 && nextX < graph_size && nextY >= 0 && nextY < graph_size && graph[nextX][nextY] == 1 && !discovered[nextX][nextY]) {
      q.add(new Loc(nextX, nextY, 0));
  }
}

// μ μ½λλ₯Ό μλμ κ°μ΄ λ³κ²½, λ©λͺ¨λ¦¬ μ΄κ³Όκ° λ°μνμ§ μμ

if (nextX < 0 || nextX >= graph_size || nextY < 0 || nextY >= graph_size) continue;
if (discovered[nextX][nextY]) continue;

if (graph[nextX][nextY] == 1) {
  graph[nextX][nextY] = land;
  discovered[nextX][nextY] = true;
  q.add(new Loc(nextX, nextY, 0));
}
```

- λΈλ‘κ·Έλ₯Ό μ°Έκ³ νμ¬ μμ μ½λ μμ μΌλ‘ λ©λͺ¨λ¦¬μ΄κ³Όλ₯Ό νΌν  μ μμλλ°, λΌλ¦¬μ μΌλ‘ μ΄ν΄κ° κ°μ§ μλλ€...

### π μΆμ²
https://www.acmicpc.net/problem/2146

### μ°Έκ³ 
- https://goodteacher.tistory.com/112
- https://loosie.tistory.com/224
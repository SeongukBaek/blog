---
title: "👩‍💻 11559. Puyo Puyo"
description: "알고리즘 문제 풀기"
date: 2022-03-02
update: 2022-03-02
tags:
  - 구현
  - 그래프이론
  - 그래프탐색
  - 시뮬레이션
  - BFS
series: "👩‍💻 BOJ"
---

## 문제

뿌요뿌요의 룰은 다음과 같다.

> 필드에 여러 가지 색깔의 뿌요를 놓는다. 뿌요는 중력의 영향을 받아 아래에 바닥이나 다른 뿌요가 나올 때까지 아래로 떨어진다.
> 뿌요를 놓고 난 후, 같은 색 뿌요가 4개 이상 상하좌우로 연결되어 있으면 연결된 같은 색 뿌요들이 한꺼번에 없어진다. 이때 1연쇄가 시작된다.
> 뿌요들이 없어지고 나서 위에 다른 뿌요들이 있다면, 역시 중력의 영향을 받아 차례대로 아래로 떨어지게 된다.
> 아래로 떨어지고 나서 다시 같은 색의 뿌요들이 4개 이상 모이게 되면 또 터지게 되는데, 터진 후 뿌요들이 내려오고 다시 터짐을 반복할 때마다 1연쇄씩 늘어난다.
> 터질 수 있는 뿌요가 여러 그룹이 있다면 동시에 터져야 하고 여러 그룹이 터지더라도 한번의 연쇄가 추가된다.

남규는 최근 뿌요뿌요 게임에 푹 빠졌다. 이 게임은 1:1로 붙는 대전게임이라 잘 쌓는 것도 중요하지만, 상대방이 터뜨린다면 연쇄가 몇 번이 될지 바로 파악할 수 있는 능력도 필요하다. 하지만 아직 실력이 부족하여 남규는 자기 필드에만 신경 쓰기 바쁘다. 상대방의 필드가 주어졌을 때, 연쇄가 몇 번 연속으로 일어날지 계산하여 남규를 도와주자!

### 입력
- 총 12개의 줄에 필드의 정보가 주어지며, 각 줄에는 6개의 문자가 있다.
이때 .은 빈공간이고 .이 아닌것은 각각의 색깔의 뿌요를 나타낸다.
R은 빨강, G는 초록, B는 파랑, P는 보라, Y는 노랑이다.
입력으로 주어지는 필드는 뿌요들이 전부 아래로 떨어진 뒤의 상태이다. 즉, 뿌요 아래에 빈 칸이 있는 경우는 없다.

### 출력
- 현재 주어진 상황에서 몇연쇄가 되는지 출력한다. 하나도 터지지 않는다면 0을 출력한다.

### 📍 **Logic**

```java
class Puyo {
    char[][] field = new char[12][6];
    int[] x_ary = { -1, 0, 1, 0 };
    int[] y_ary = { 0, 1, 0, -1 };
    List<Pair> remove;
    Queue<Pair> queue;
    int[][] visited;

    ...

}
```
- 뿌요의 필드를 관리하기 위한 클래스를 생성한다.

```java
public boolean searchChains();
```

- BFS방식으로 필드에 발생가능한 연쇄가 있는지 탐색한다.
- 터질 수 있는 뿌요를 `List<Puyo> remove` 에 저장하여, 연쇄 발생 시 해당 뿌요들을 제거할 수 있게 한다.

```java
private void updateField();
```

- 연쇄 탐색 이후, 발생한 연쇄가 있는 경우에만 필드를 업데이트하기 위해 호출되는 메소드이다.
  
### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.LinkedList;
    import java.util.List;
    import java.util.Queue;

    class Pair {
        int x;
        int y;

        Pair(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    class Puyo {
        char[][] field = new char[12][6];
        int[] x_ary = { -1, 0, 1, 0 };
        int[] y_ary = { 0, 1, 0, -1 };
        List<Pair> remove;
        Queue<Pair> queue;
        int[][] visited;

        public boolean searchChains() {
            remove = new LinkedList<>();
            queue = new LinkedList<>();
            visited = new int[12][6];
            boolean pop = false;

            for (int i = 11; i >= 0; i--) {
                for (int j = 0; j < 6; j++) {
                    if (field[i][j] == '.') continue;
                    if (visited[i][j] != 0) continue;

                    char now = field[i][j];
                    int cnt = 1;
                    visited[i][j] = cnt++;
                    queue.add(new Pair(i, j));
                    remove.add(new Pair(i, j));

                    while(!queue.isEmpty()) {
                        Pair cur = queue.poll();
                        int curX = cur.x, curY = cur.y;

                        for (int t = 0; t < 4; t++) {
                            int ni = curX + x_ary[t], nj = curY + y_ary[t];

                            if (isBoundary(ni, nj)) continue;
                            if (visited[ni][nj] > 0) continue;

                            if (now == field[ni][nj]) {
                                visited[ni][nj] = cnt++;
                                queue.add(new Pair(ni, nj));
                                remove.add(new Pair(ni, nj));
                            }
                        }
                    }
                    if (cnt >= 5) {
                        pop = true;
                        for (Pair p : remove) {
                            field[p.x][p.y] = '.';
                        }
                    }
                    remove.clear();
                }
            }
            if (pop) {
                updateField();
            }
            return pop;
        }

        private void updateField() {
            for (int i = 0; i < 6; i++) {
                for (int j = 11; j > 0; j--) {
                    if (field[j][i] == '.') {
                        for (int k = j - 1; k >= 0; k--) {
                            if (field[k][i] != '.') {
                                field[j][i] = field[k][i];
                                field[k][i] = '.';
                                break;
                            }
                        }
                    }
                }
            }
        }

        private boolean isBoundary(int x, int y) {
            return x < 0 | x > 11 | y < 0 | y > 5;
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            String line;
            int chains = 0;
            Puyo puyo = new Puyo();

            for (int i = 0; i < 12; i++) {
                line = br.readLine();
                for (int j = 0; j < 6; j++) {
                    puyo.field[i][j] = line.charAt(j);
                }
            }

            while(puyo.searchChains()) {
                chains++;
            }

            System.out.println(chains);

            br.close();
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 주어진 상황에서, 먼저 연쇄가 일어날 수 있는지 파악한다. 여러 개의 연쇄가 가능하다면, 어느 우선순위로 연쇄를 발생시킬지를 고민했다.
  - 생각해보니 연쇄간의 우선순위는 중요하지 않았고, 연쇄 발생 이후 해당 뿌요들을 어떻게 제거하는가가 더 중요했다.
- 연쇄 발생 가능한 뿌요들을 탐색과 동시에 제거할 방법이 없기에 리스트에 저장하면서 연쇄가 발생하는 경우에만 이를 제거하는 방식을 참고하여 해결했다.

### 📕 출처
https://www.acmicpc.net/problem/11559
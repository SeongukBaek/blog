---
title: "👩‍💻 3190. 뱀"
description: "알고리즘 문제 풀기"
date: 2022-03-18
update: 2022-03-18
tags:
  - 구현
  - 시뮬레이션
  - 자료구조
  - 덱
  - 큐
series: "👩‍💻 BOJ"
---

## 문제
'Dummy' 라는 도스게임이 있다. 이 게임에는 뱀이 나와서 기어다니는데, 사과를 먹으면 뱀 길이가 늘어난다. 뱀이 이리저리 기어다니다가 벽 또는 자기자신의 몸과 부딪히면 게임이 끝난다.

게임은 NxN 정사각 보드위에서 진행되고, 몇몇 칸에는 사과가 놓여져 있다. 보드의 상하좌우 끝에 벽이 있다. 게임이 시작할때 뱀은 맨위 맨좌측에 위치하고 뱀의 길이는 1 이다. 뱀은 처음에 오른쪽을 향한다.

뱀은 매 초마다 이동을 하는데 다음과 같은 규칙을 따른다.

- 먼저 뱀은 몸길이를 늘려 머리를 다음칸에 위치시킨다.
- 만약 이동한 칸에 사과가 있다면, 그 칸에 있던 사과가 없어지고 꼬리는 움직이지 않는다.
- 만약 이동한 칸에 사과가 없다면, 몸길이를 줄여서 꼬리가 위치한 칸을 비워준다. 즉, 몸길이는 변하지 않는다.

사과의 위치와 뱀의 이동경로가 주어질 때 이 게임이 몇 초에 끝나는지 계산하라.

## 입, 출력

입력
- 첫째 줄에 보드의 크기 N이 주어진다. (2 ≤ N ≤ 100) 다음 줄에 사과의 개수 K가 주어진다. (0 ≤ K ≤ 100)
- 다음 K개의 줄에는 사과의 위치가 주어지는데, 첫 번째 정수는 행, 두 번째 정수는 열 위치를 의미한다. 사과의 위치는 모두 다르며, 맨 위 맨 좌측 (1행 1열) 에는 사과가 없다.
- 다음 줄에는 뱀의 방향 변환 횟수 L 이 주어진다. (1 ≤ L ≤ 100)
- 다음 L개의 줄에는 뱀의 방향 변환 정보가 주어지는데,  정수 X와 문자 C로 이루어져 있으며. 게임 시작 시간으로부터 X초가 끝난 뒤에 왼쪽(C가 'L') 또는 오른쪽(C가 'D')로 90도 방향을 회전시킨다는 뜻이다. X는 10,000 이하의 양의 정수이며, 방향 전환 정보는 X가 증가하는 순으로 주어진다.

출력
- 첫째 줄에 게임이 몇 초에 끝나는지 출력한다.

### 📍 **Logic**

```java
class Info {
    int second;
    char direction;

    public Info (int second, char direction) {
        this.second = second;
        this.direction = direction;
    }
}
```

- 뱀의 방향 전환 정보를 저장하는 클래스

```java
class Dummy {
    Info[] infos;
    Queue<Pair> queue = new LinkedList<>();
    int[][] map;
    int[] rangeX = { -1, 0, 1, 0 };
    int[] rangeY = { 0, 1, 0, -1 };
    int mapSize;
    int directionChanges;
    int count = 0;
    int infoIdx = 0;
    int snakeDir;
    ...

}
```

- Dummy 게임에 필요한 로직을 구현하는 클래스
- `map` 에서 1은 뱀의 위치, 2는 사과의 위치를 나타낸다.

```java
private void moveSnake(int x, int y) { ... }
```

- `Queue` 를 이용해서 뱀의 꼬리 정보를 저장하고, 필요에 따라 먼저 들어온 좌표를 out한다.
- 뱀의 방향 전환을 위해 `snakeDir` 변수로 뱀의 현재 방향을 저장한다. (0, 1, 2, 3 - 북, 동, 남, 서)
- 시간에 따라 `infos` 에서 방향 전환 정보를 확인한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.LinkedList;
    import java.util.Queue;

    class Pair {
        int x;
        int y;

        public Pair(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    class Info {
        int second;
        char direction;

        public Info (int second, char direction) {
            this.second = second;
            this.direction = direction;
        }
    }

    class Dummy {
        Info[] infos;
        Queue<Pair> queue = new LinkedList<>();
        int[][] map;
        int[] rangeX = { -1, 0, 1, 0 };
        int[] rangeY = { 0, 1, 0, -1 };
        int mapSize;
        int directionChanges;
        int count = 0;
        int infoIdx = 0;
        int snakeDir;

        public Dummy (int N) {
            mapSize = N;
            map = new int[N][N];
        }

        public int game(int directionChanges) {
            snakeDir = 1;
            this.directionChanges = directionChanges;
            moveSnake(0, 0);
            return count;
        }

        private void moveSnake(int x, int y) {
            queue.add(new Pair(x, y));
            map[x][y] = 1;

            if (infoIdx < directionChanges) accessInfo();

            x += rangeX[snakeDir];
            y += rangeY[snakeDir];
            count++;

            if (checkBoundary(x, y)) return;
            if (map[x][y] == 1) return;
            if (map[x][y] != 2) cutTail();

            moveSnake(x, y);
        }

        private void accessInfo() {
            if (infos[infoIdx].second == count) {
                updateDir();
                infoIdx++;
            }
        }

        private void updateDir() {
            if (infos[infoIdx].direction == 'L') {
                snakeDir = (snakeDir + 3) % 4;
            } else {
                snakeDir = (snakeDir + 1) % 4;
            }
        }

        private void cutTail() {
            if (!queue.isEmpty()) {
                Pair out = queue.poll();
                map[out.x][out.y] = 0;
            }
        }

        private boolean checkBoundary(int x, int y) {
            return (x < 0 || x >= mapSize || y < 0 || y >= mapSize);
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int N = Integer.parseInt(br.readLine());

            Dummy dummy = new Dummy(N);

            int appleCount = Integer.parseInt(br.readLine());

            String[] line;
            for (int i = 0; i < appleCount; i++) {
                line = br.readLine().split(" ");
                dummy.map[Integer.parseInt(line[0])-1][Integer.parseInt(line[1])-1] = 2;
            }

            int directionChanges = Integer.parseInt(br.readLine());
            dummy.infos = new Info[directionChanges];
            for (int i = 0; i < directionChanges; i++) {
                line = br.readLine().split(" ");
                dummy.infos[i] = new Info(Integer.parseInt(line[0]), line[1].charAt(0));
            }
            br.close();

            System.out.println(dummy.game(directionChanges));
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 웹 백엔드 기능을 구현하는 것처럼, 요구사항 하나하나에 해당하는 기능 덩어리를 만들어보자는 생각으로 접근했다. 시뮬레이션은 주어진 로직 그대로 구현만 하면 되는 것 같다.

### 📕 출처
Baekjoon : https://www.acmicpc.net/problem/3190
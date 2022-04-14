---
title: "👩‍💻 14503. 로봇 청소기"
description: "알고리즘 문제 풀기"
date: 2022-03-15
update: 2022-03-15
tags:
  - 구현
  - 시뮬레이션
series: "👩‍💻 BOJ"
---

## 문제
로봇 청소기가 주어졌을 때, 청소하는 영역의 개수를 구하는 프로그램을 작성하시오.

로봇 청소기가 있는 장소는 N×M 크기의 직사각형으로 나타낼 수 있으며, 1×1크기의 정사각형 칸으로 나누어져 있다. 각각의 칸은 벽 또는 빈 칸이다. 청소기는 바라보는 방향이 있으며, 이 방향은 동, 서, 남, 북중 하나이다. 지도의 각 칸은 (r, c)로 나타낼 수 있고, r은 북쪽으로부터 떨어진 칸의 개수, c는 서쪽으로 부터 떨어진 칸의 개수이다.

로봇 청소기는 다음과 같이 작동한다.

1. 현재 위치를 청소한다.
2. 현재 위치에서 현재 방향을 기준으로 왼쪽 방향부터 차례대로 인접한 칸을 탐색한다.
   a. 왼쪽 방향에 아직 청소하지 않은 공간이 존재한다면, 그 방향으로 회전한 다음 한 칸을 전진하고 1번부터 진행한다.
   b. 왼쪽 방향에 청소할 공간이 없다면, 그 방향으로 회전하고 2번으로 돌아간다.
   c. 네 방향 모두 청소가 이미 되어있거나 벽인 경우에는, 바라보는 방향을 유지한 채로 한 칸 후진을 하고 2번으로 돌아간다.
   d. 네 방향 모두 청소가 이미 되어있거나 벽이면서, 뒤쪽 방향이 벽이라 후진도 할 수 없는 경우에는 작동을 멈춘다.

로봇 청소기는 이미 청소되어있는 칸을 또 청소하지 않으며, 벽을 통과할 수 없다.

## 입, 출력

입력
- 첫째 줄에 세로 크기 N과 가로 크기 M이 주어진다. (3 ≤ N, M ≤ 50)
- 둘째 줄에 로봇 청소기가 있는 칸의 좌표 (r, c)와 바라보는 방향 d가 주어진다. d가 0인 경우에는 북쪽을, 1인 경우에는 동쪽을, 2인 경우에는 남쪽을, 3인 경우에는 서쪽을 바라보고 있는 것이다.
- 셋째 줄부터 N개의 줄에 장소의 상태가 북쪽부터 남쪽 순서대로, 각 줄은 서쪽부터 동쪽 순서대로 주어진다. 빈 칸은 0, 벽은 1로 주어진다. 지도의 첫 행, 마지막 행, 첫 열, 마지막 열에 있는 모든 칸은 벽이다.
- 로봇 청소기가 있는 칸의 상태는 항상 빈 칸이다.

출력
- 로봇 청소기가 청소하는 칸의 개수를 출력한다.

### 📍 **Logic**

```java
class Robot {
    int x;
    int y;
    int dir;

    public Robot(int x, int y, int dir) {
        this.x = x;
        this.y = y;
        this.dir = dir;
    }
}
```

- 로봇 청소기의 위치를 저장하는 클래스

```java
public int cleanRoom(int r, int c, int d) {
    int cleanCount = 0;
    queue.add(new Robot(r, c, d));

    while(!queue.isEmpty()) {
        Robot robot = queue.poll();

        if (map[robot.x][robot.y] == 0) {
            map[robot.x][robot.y] = 2;
            cleanCount++;
        }

        if (!checkWallMethod(robot)) {
            moveBack(robot);
        }
    }
    return cleanCount;
}
```

- 문제에서 주어진 작동 로직을 구현한 메소드
- Queue를 이용한 BFS방식으로 청소할 영역을 탐색한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.io.*;
    import java.util.*;

    class Robot {
        int x;
        int y;
        int dir;

        public Robot(int x, int y, int dir) {
            this.x = x;
            this.y = y;
            this.dir = dir;
        }
    }

    class Directions {
        int x;
        int y;

        public Directions(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    class Room {
        int[][] map;
        int N, M;
        Queue<Robot> queue = new LinkedList<>();
        Directions[] directions = {new Directions(-1, 0), new Directions(0, 1), new Directions(1, 0), new Directions(0, -1)};

        public Room (int n, int m) {
            N = n;
            M = m;
            map = new int[n][m];
        }

        public int cleanRoom(int r, int c, int d) {
            int cleanCount = 0;
            queue.add(new Robot(r, c, d));

            while(!queue.isEmpty()) {
                Robot robot = queue.poll();

                if (map[robot.x][robot.y] == 0) {
                    map[robot.x][robot.y] = 2;
                    cleanCount++;
                }

                if (!checkWallMethod(robot)) {
                    moveBack(robot);
                }
            }
            return cleanCount;
        }

        private void moveBack(Robot robot) {
            int backDir = turnBack(robot.dir);
            int backX = robot.x + directions[backDir].x;
            int backY = robot.y + directions[backDir].y;

            if (!checkBoundary(backX, backY)) {
                if (map[backX][backY] != 1) {
                    queue.add(new Robot(backX, backY, robot.dir));
                }
            }
        }

        private boolean checkWallMethod(Robot robot) {
            for (int i = 0; i < 4; i++) {
                int nextDir = turnLeft(robot.dir);
                int nextX = robot.x + directions[nextDir].x;
                int nextY = robot.y + directions[nextDir].y;

                robot.dir = nextDir;

                if (checkBoundary(nextX, nextY)) continue;

                if (map[nextX][nextY] == 0) {
                    queue.add(new Robot(nextX, nextY, nextDir));
                    return true;
                }
            }
            return false;
        }

        private boolean checkBoundary(int r, int c) {
            return r < 0 || r >= N || c < 0 || c >= M;
        }

        private int turnLeft(int d) {
            return (d + 3) % 4;
        }

        private int turnBack(int d) {
            return (d + 2) % 4;
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            String[] line = br.readLine().split(" ");
            int N = Integer.parseInt(line[0]);
            int M = Integer.parseInt(line[1]);

            Room room = new Room(N, M);

            line = br.readLine().split(" ");

            int r = Integer.parseInt(line[0]);
            int c = Integer.parseInt(line[1]);
            int d = Integer.parseInt(line[2]);

            for (int i = 0; i < N; i++) room.map[i] = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();

            System.out.println(room.cleanRoom(r, c, d));

            br.close();
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 시뮬레이션 문제는 주어진 조건에 따라 로직을 구현하는 방식으로 이해해, 로봇청소기의 작동원리마다의 메소드를 구현하려 했다.
- 최대한 객체 지향적으로 들여쓰기 횟수도 고려하면서 메소드 추출을 수행했다.

### 📕 출처
Baekjoon : https://www.acmicpc.net/problem/14503
---
title: "๐ฉโ๐ป 14503. ๋ก๋ด ์ฒญ์๊ธฐ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-03-15
update: 2022-03-15
tags:
  - ๊ตฌํ
  - ์๋ฎฌ๋ ์ด์
series: "๐ฉโ๐ป BOJ"
---

## ๋ฌธ์ 
๋ก๋ด ์ฒญ์๊ธฐ๊ฐ ์ฃผ์ด์ก์ ๋, ์ฒญ์ํ๋ ์์ญ์ ๊ฐ์๋ฅผ ๊ตฌํ๋ ํ๋ก๊ทธ๋จ์ ์์ฑํ์์ค.

๋ก๋ด ์ฒญ์๊ธฐ๊ฐ ์๋ ์ฅ์๋ NรM ํฌ๊ธฐ์ ์ง์ฌ๊ฐํ์ผ๋ก ๋ํ๋ผ ์ ์์ผ๋ฉฐ, 1ร1ํฌ๊ธฐ์ ์ ์ฌ๊ฐํ ์นธ์ผ๋ก ๋๋์ด์ ธ ์๋ค. ๊ฐ๊ฐ์ ์นธ์ ๋ฒฝ ๋๋ ๋น ์นธ์ด๋ค. ์ฒญ์๊ธฐ๋ ๋ฐ๋ผ๋ณด๋ ๋ฐฉํฅ์ด ์์ผ๋ฉฐ, ์ด ๋ฐฉํฅ์ ๋, ์, ๋จ, ๋ถ์ค ํ๋์ด๋ค. ์ง๋์ ๊ฐ ์นธ์ (r, c)๋ก ๋ํ๋ผ ์ ์๊ณ , r์ ๋ถ์ชฝ์ผ๋ก๋ถํฐ ๋จ์ด์ง ์นธ์ ๊ฐ์, c๋ ์์ชฝ์ผ๋ก ๋ถํฐ ๋จ์ด์ง ์นธ์ ๊ฐ์์ด๋ค.

๋ก๋ด ์ฒญ์๊ธฐ๋ ๋ค์๊ณผ ๊ฐ์ด ์๋ํ๋ค.

1. ํ์ฌ ์์น๋ฅผ ์ฒญ์ํ๋ค.
2. ํ์ฌ ์์น์์ ํ์ฌ ๋ฐฉํฅ์ ๊ธฐ์ค์ผ๋ก ์ผ์ชฝ ๋ฐฉํฅ๋ถํฐ ์ฐจ๋ก๋๋ก ์ธ์ ํ ์นธ์ ํ์ํ๋ค.
   a. ์ผ์ชฝ ๋ฐฉํฅ์ ์์ง ์ฒญ์ํ์ง ์์ ๊ณต๊ฐ์ด ์กด์ฌํ๋ค๋ฉด, ๊ทธ ๋ฐฉํฅ์ผ๋ก ํ์ ํ ๋ค์ ํ ์นธ์ ์ ์งํ๊ณ  1๋ฒ๋ถํฐ ์งํํ๋ค.
   b. ์ผ์ชฝ ๋ฐฉํฅ์ ์ฒญ์ํ  ๊ณต๊ฐ์ด ์๋ค๋ฉด, ๊ทธ ๋ฐฉํฅ์ผ๋ก ํ์ ํ๊ณ  2๋ฒ์ผ๋ก ๋์๊ฐ๋ค.
   c. ๋ค ๋ฐฉํฅ ๋ชจ๋ ์ฒญ์๊ฐ ์ด๋ฏธ ๋์ด์๊ฑฐ๋ ๋ฒฝ์ธ ๊ฒฝ์ฐ์๋, ๋ฐ๋ผ๋ณด๋ ๋ฐฉํฅ์ ์ ์งํ ์ฑ๋ก ํ ์นธ ํ์ง์ ํ๊ณ  2๋ฒ์ผ๋ก ๋์๊ฐ๋ค.
   d. ๋ค ๋ฐฉํฅ ๋ชจ๋ ์ฒญ์๊ฐ ์ด๋ฏธ ๋์ด์๊ฑฐ๋ ๋ฒฝ์ด๋ฉด์, ๋ค์ชฝ ๋ฐฉํฅ์ด ๋ฒฝ์ด๋ผ ํ์ง๋ ํ  ์ ์๋ ๊ฒฝ์ฐ์๋ ์๋์ ๋ฉ์ถ๋ค.

๋ก๋ด ์ฒญ์๊ธฐ๋ ์ด๋ฏธ ์ฒญ์๋์ด์๋ ์นธ์ ๋ ์ฒญ์ํ์ง ์์ผ๋ฉฐ, ๋ฒฝ์ ํต๊ณผํ  ์ ์๋ค.

## ์, ์ถ๋ ฅ

์๋ ฅ
- ์ฒซ์งธ ์ค์ ์ธ๋ก ํฌ๊ธฐ N๊ณผ ๊ฐ๋ก ํฌ๊ธฐ M์ด ์ฃผ์ด์ง๋ค. (3 โค N, M โค 50)
- ๋์งธ ์ค์ ๋ก๋ด ์ฒญ์๊ธฐ๊ฐ ์๋ ์นธ์ ์ขํ (r, c)์ ๋ฐ๋ผ๋ณด๋ ๋ฐฉํฅ d๊ฐ ์ฃผ์ด์ง๋ค. d๊ฐ 0์ธ ๊ฒฝ์ฐ์๋ ๋ถ์ชฝ์, 1์ธ ๊ฒฝ์ฐ์๋ ๋์ชฝ์, 2์ธ ๊ฒฝ์ฐ์๋ ๋จ์ชฝ์, 3์ธ ๊ฒฝ์ฐ์๋ ์์ชฝ์ ๋ฐ๋ผ๋ณด๊ณ  ์๋ ๊ฒ์ด๋ค.
- ์์งธ ์ค๋ถํฐ N๊ฐ์ ์ค์ ์ฅ์์ ์ํ๊ฐ ๋ถ์ชฝ๋ถํฐ ๋จ์ชฝ ์์๋๋ก, ๊ฐ ์ค์ ์์ชฝ๋ถํฐ ๋์ชฝ ์์๋๋ก ์ฃผ์ด์ง๋ค. ๋น ์นธ์ 0, ๋ฒฝ์ 1๋ก ์ฃผ์ด์ง๋ค. ์ง๋์ ์ฒซ ํ, ๋ง์ง๋ง ํ, ์ฒซ ์ด, ๋ง์ง๋ง ์ด์ ์๋ ๋ชจ๋  ์นธ์ ๋ฒฝ์ด๋ค.
- ๋ก๋ด ์ฒญ์๊ธฐ๊ฐ ์๋ ์นธ์ ์ํ๋ ํญ์ ๋น ์นธ์ด๋ค.

์ถ๋ ฅ
- ๋ก๋ด ์ฒญ์๊ธฐ๊ฐ ์ฒญ์ํ๋ ์นธ์ ๊ฐ์๋ฅผ ์ถ๋ ฅํ๋ค.

### ๐ **Logic**

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

- ๋ก๋ด ์ฒญ์๊ธฐ์ ์์น๋ฅผ ์ ์ฅํ๋ ํด๋์ค

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

- ๋ฌธ์ ์์ ์ฃผ์ด์ง ์๋ ๋ก์ง์ ๊ตฌํํ ๋ฉ์๋
- Queue๋ฅผ ์ด์ฉํ BFS๋ฐฉ์์ผ๋ก ์ฒญ์ํ  ์์ญ์ ํ์ํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
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

### โ๏ธ **Review**
- ์๋ฎฌ๋ ์ด์ ๋ฌธ์ ๋ ์ฃผ์ด์ง ์กฐ๊ฑด์ ๋ฐ๋ผ ๋ก์ง์ ๊ตฌํํ๋ ๋ฐฉ์์ผ๋ก ์ดํดํด, ๋ก๋ด์ฒญ์๊ธฐ์ ์๋์๋ฆฌ๋ง๋ค์ ๋ฉ์๋๋ฅผ ๊ตฌํํ๋ ค ํ๋ค.
- ์ต๋ํ ๊ฐ์ฒด ์งํฅ์ ์ผ๋ก ๋ค์ฌ์ฐ๊ธฐ ํ์๋ ๊ณ ๋ คํ๋ฉด์ ๋ฉ์๋ ์ถ์ถ์ ์ํํ๋ค.

### ๐ ์ถ์ฒ
Baekjoon : https://www.acmicpc.net/problem/14503
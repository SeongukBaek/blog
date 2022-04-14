---
title: "👩‍💻 14499. 주사위 굴리기"
description: "알고리즘 문제 풀기"
date: 2022-03-28
update: 2022-03-28
tags:
  - 구현
  - 시뮬레이션
series: "👩‍💻 BOJ"
---

## 문제
크기가 N×M인 지도가 존재한다. 지도의 오른쪽은 동쪽, 위쪽은 북쪽이다. 이 지도의 위에 주사위가 하나 놓여져 있으며, 주사위의 전개도는 아래와 같다. 지도의 좌표는 (r, c)로 나타내며, r는 북쪽으로부터 떨어진 칸의 개수, c는 서쪽으로부터 떨어진 칸의 개수이다. 

  2
4 1 3
  5
  6

주사위는 지도 위에 윗 면이 1이고, 동쪽을 바라보는 방향이 3인 상태로 놓여져 있으며, 놓여져 있는 곳의 좌표는 (x, y) 이다. 가장 처음에 주사위에는 모든 면에 0이 적혀져 있다.

지도의 각 칸에는 정수가 하나씩 쓰여져 있다. 주사위를 굴렸을 때, 이동한 칸에 쓰여 있는 수가 0이면, 주사위의 바닥면에 쓰여 있는 수가 칸에 복사된다. 0이 아닌 경우에는 칸에 쓰여 있는 수가 주사위의 바닥면으로 복사되며, 칸에 쓰여 있는 수는 0이 된다.

주사위를 놓은 곳의 좌표와 이동시키는 명령이 주어졌을 때, 주사위가 이동했을 때 마다 상단에 쓰여 있는 값을 구하는 프로그램을 작성하시오.

주사위는 지도의 바깥으로 이동시킬 수 없다. 만약 바깥으로 이동시키려고 하는 경우에는 해당 명령을 무시해야 하며, 출력도 하면 안 된다.

## 입, 출력

입력
- 첫째 줄에 지도의 세로 크기 N, 가로 크기 M (1 ≤ N, M ≤ 20), 주사위를 놓은 곳의 좌표 x, y(0 ≤ x ≤ N-1, 0 ≤ y ≤ M-1), 그리고 명령의 개수 K (1 ≤ K ≤ 1,000)가 주어진다.
- 둘째 줄부터 N개의 줄에 지도에 쓰여 있는 수가 북쪽부터 남쪽으로, 각 줄은 서쪽부터 동쪽 순서대로 주어진다. 주사위를 놓은 칸에 쓰여 있는 수는 항상 0이다. 지도의 각 칸에 쓰여 있는 수는 10 미만의 자연수 또는 0이다.
- 마지막 줄에는 이동하는 명령이 순서대로 주어진다. 동쪽은 1, 서쪽은 2, 북쪽은 3, 남쪽은 4로 주어진다.

출력
- 이동할 때마다 주사위의 윗 면에 쓰여 있는 수를 출력한다. 만약 바깥으로 이동시키려고 하는 경우에는 해당 명령을 무시해야 하며, 출력도 하면 안 된다.

### 📍 **Logic**

```java
class Dice {
    int[][] map;
    int[] commands;
    int[] numbers = new int[6];
    int[] rangeX = { 0, 0, -1, 1 };
    int[] rangeY = { 1, -1, 0, 0 };
    int N, M, K;
    int top = 0, front = 4, east = 2;
    ...

}
```

- 주사위와 지도의 정보를 저장하는 클래스
- top, front, east 정보를 계속 변경하는 방식으로 주사위의 숫자 정보를 추적한다.

```java
public void game(int x, int y) {
    for (int i = 0; i < K; i++) {
        int nx = x + rangeX[commands[i] - 1];
        int ny = y + rangeY[commands[i] - 1];

        if (isInTheMap(nx, ny)) continue;

        x = nx;
        y = ny;

        rollDice(commands[i] - 1);

        if (map[x][y] == 0) {
            map[x][y] = numbers[5 - top];
        } else {
            numbers[5 - top] = map[x][y];
            map[x][y] = 0;
        }

        System.out.println(numbers[top]);
    }
}
```

- 명령어에 따라 지도에서의 주사위 위치를 변경시킨다.
  - 지도 범위 안인 경우만 주사위 정보를 수정하고, 상단의 숫자를 출력한다.

```java
private void rollDice(int command) {
    int t, e, f;
    t = top;
    e = east;
    f = front;
    switch (command) {
        case 0:
            top = 5 - e;
            east = t;
            break;
        case 1:
            top = e;
            east = 5 - t;
            break;
        case 2:
            top = f;
            front = 5 - t;
            break;
        case 3:
            top = 5 - f;
            front = t;
    }
}
```

- 주사위의 top, front, east 정보를 업데이트하는 메소드

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.Arrays;

    class Dice {
        int[][] map;
        int[] commands;
        int[] numbers = new int[6];
        int[] rangeX = { 0, 0, -1, 1 };
        int[] rangeY = { 1, -1, 0, 0 };
        int N, M, K;
        int top = 0, front = 4, east = 2;

        public Dice(int N, int M, int K) {
            this.N = N;
            this.M = M;
            this.K = K;
            map = new int[N][M];
            commands = new int[K];
        }

        public void game(int x, int y) {
            for (int i = 0; i < K; i++) {
                int nx = x + rangeX[commands[i] - 1];
                int ny = y + rangeY[commands[i] - 1];

                if (isInTheMap(nx, ny)) continue;

                x = nx;
                y = ny;

                rollDice(commands[i] - 1);

                if (map[x][y] == 0) {
                    map[x][y] = numbers[5 - top];
                } else {
                    numbers[5 - top] = map[x][y];
                    map[x][y] = 0;
                }

                System.out.println(numbers[top]);
            }
        }

        private boolean isInTheMap(int x, int y) {
            return (x < 0 | x >= N | y < 0 | y >= M);
        }

        private void rollDice(int command) {
            int t, e, f;
            t = top;
            e = east;
            f = front;
            switch (command) {
                case 0:
                    top = 5 - e;
                    east = t;
                    break;
                case 1:
                    top = e;
                    east = 5 - t;
                    break;
                case 2:
                    top = f;
                    front = 5 - t;
                    break;
                case 3:
                    top = 5 - f;
                    front = t;
            }
        }
    }

    public class Main {

        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int[] line = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            int N = line[0], M = line[1], x = line[2], y = line[3], K = line[4];

            Dice dice = new Dice(N, M, K);

            for (int i = 0; i < N; i++) dice.map[i] = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();

            dice.commands = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();

            dice.game(x, y);

            br.close();
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 다른 구현은 모두 쉬웠는데, `rollDice()` 구현이 제일 어려웠다.
  - 원래는 명령어가 주어지면, 전역으로 가지고 있는 bottom의 정보를 업데이트하는 방식을 사용하려 했는데, 아무리 생각해도 안되는 경우가 많은 것 같아 게시판을 참고했다.

### 📕 출처
Baekjoon : https://www.acmicpc.net/problem/14499
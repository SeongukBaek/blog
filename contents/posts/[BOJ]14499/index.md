---
title: "๐ฉโ๐ป 14499. ์ฃผ์ฌ์ ๊ตด๋ฆฌ๊ธฐ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-03-28
update: 2022-03-28
tags:
  - ๊ตฌํ
  - ์๋ฎฌ๋ ์ด์
series: "๐ฉโ๐ป BOJ"
---

## ๋ฌธ์ 
ํฌ๊ธฐ๊ฐ NรM์ธ ์ง๋๊ฐ ์กด์ฌํ๋ค. ์ง๋์ ์ค๋ฅธ์ชฝ์ ๋์ชฝ, ์์ชฝ์ ๋ถ์ชฝ์ด๋ค. ์ด ์ง๋์ ์์ ์ฃผ์ฌ์๊ฐ ํ๋ ๋์ฌ์ ธ ์์ผ๋ฉฐ, ์ฃผ์ฌ์์ ์ ๊ฐ๋๋ ์๋์ ๊ฐ๋ค. ์ง๋์ ์ขํ๋ (r, c)๋ก ๋ํ๋ด๋ฉฐ, r๋ ๋ถ์ชฝ์ผ๋ก๋ถํฐ ๋จ์ด์ง ์นธ์ ๊ฐ์, c๋ ์์ชฝ์ผ๋ก๋ถํฐ ๋จ์ด์ง ์นธ์ ๊ฐ์์ด๋ค. 

  2
4 1 3
  5
  6

์ฃผ์ฌ์๋ ์ง๋ ์์ ์ ๋ฉด์ด 1์ด๊ณ , ๋์ชฝ์ ๋ฐ๋ผ๋ณด๋ ๋ฐฉํฅ์ด 3์ธ ์ํ๋ก ๋์ฌ์ ธ ์์ผ๋ฉฐ, ๋์ฌ์ ธ ์๋ ๊ณณ์ ์ขํ๋ (x, y) ์ด๋ค. ๊ฐ์ฅ ์ฒ์์ ์ฃผ์ฌ์์๋ ๋ชจ๋  ๋ฉด์ 0์ด ์ ํ์ ธ ์๋ค.

์ง๋์ ๊ฐ ์นธ์๋ ์ ์๊ฐ ํ๋์ฉ ์ฐ์ฌ์ ธ ์๋ค. ์ฃผ์ฌ์๋ฅผ ๊ตด๋ ธ์ ๋, ์ด๋ํ ์นธ์ ์ฐ์ฌ ์๋ ์๊ฐ 0์ด๋ฉด, ์ฃผ์ฌ์์ ๋ฐ๋ฅ๋ฉด์ ์ฐ์ฌ ์๋ ์๊ฐ ์นธ์ ๋ณต์ฌ๋๋ค. 0์ด ์๋ ๊ฒฝ์ฐ์๋ ์นธ์ ์ฐ์ฌ ์๋ ์๊ฐ ์ฃผ์ฌ์์ ๋ฐ๋ฅ๋ฉด์ผ๋ก ๋ณต์ฌ๋๋ฉฐ, ์นธ์ ์ฐ์ฌ ์๋ ์๋ 0์ด ๋๋ค.

์ฃผ์ฌ์๋ฅผ ๋์ ๊ณณ์ ์ขํ์ ์ด๋์ํค๋ ๋ช๋ น์ด ์ฃผ์ด์ก์ ๋, ์ฃผ์ฌ์๊ฐ ์ด๋ํ์ ๋ ๋ง๋ค ์๋จ์ ์ฐ์ฌ ์๋ ๊ฐ์ ๊ตฌํ๋ ํ๋ก๊ทธ๋จ์ ์์ฑํ์์ค.

์ฃผ์ฌ์๋ ์ง๋์ ๋ฐ๊นฅ์ผ๋ก ์ด๋์ํฌ ์ ์๋ค. ๋ง์ฝ ๋ฐ๊นฅ์ผ๋ก ์ด๋์ํค๋ ค๊ณ  ํ๋ ๊ฒฝ์ฐ์๋ ํด๋น ๋ช๋ น์ ๋ฌด์ํด์ผ ํ๋ฉฐ, ์ถ๋ ฅ๋ ํ๋ฉด ์ ๋๋ค.

## ์, ์ถ๋ ฅ

์๋ ฅ
- ์ฒซ์งธ ์ค์ ์ง๋์ ์ธ๋ก ํฌ๊ธฐ N, ๊ฐ๋ก ํฌ๊ธฐ M (1 โค N, M โค 20), ์ฃผ์ฌ์๋ฅผ ๋์ ๊ณณ์ ์ขํ x, y(0 โค x โค N-1, 0 โค y โค M-1), ๊ทธ๋ฆฌ๊ณ  ๋ช๋ น์ ๊ฐ์ K (1 โค K โค 1,000)๊ฐ ์ฃผ์ด์ง๋ค.
- ๋์งธ ์ค๋ถํฐ N๊ฐ์ ์ค์ ์ง๋์ ์ฐ์ฌ ์๋ ์๊ฐ ๋ถ์ชฝ๋ถํฐ ๋จ์ชฝ์ผ๋ก, ๊ฐ ์ค์ ์์ชฝ๋ถํฐ ๋์ชฝ ์์๋๋ก ์ฃผ์ด์ง๋ค. ์ฃผ์ฌ์๋ฅผ ๋์ ์นธ์ ์ฐ์ฌ ์๋ ์๋ ํญ์ 0์ด๋ค. ์ง๋์ ๊ฐ ์นธ์ ์ฐ์ฌ ์๋ ์๋ 10 ๋ฏธ๋ง์ ์์ฐ์ ๋๋ 0์ด๋ค.
- ๋ง์ง๋ง ์ค์๋ ์ด๋ํ๋ ๋ช๋ น์ด ์์๋๋ก ์ฃผ์ด์ง๋ค. ๋์ชฝ์ 1, ์์ชฝ์ 2, ๋ถ์ชฝ์ 3, ๋จ์ชฝ์ 4๋ก ์ฃผ์ด์ง๋ค.

์ถ๋ ฅ
- ์ด๋ํ  ๋๋ง๋ค ์ฃผ์ฌ์์ ์ ๋ฉด์ ์ฐ์ฌ ์๋ ์๋ฅผ ์ถ๋ ฅํ๋ค. ๋ง์ฝ ๋ฐ๊นฅ์ผ๋ก ์ด๋์ํค๋ ค๊ณ  ํ๋ ๊ฒฝ์ฐ์๋ ํด๋น ๋ช๋ น์ ๋ฌด์ํด์ผ ํ๋ฉฐ, ์ถ๋ ฅ๋ ํ๋ฉด ์ ๋๋ค.

### ๐ **Logic**

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

- ์ฃผ์ฌ์์ ์ง๋์ ์ ๋ณด๋ฅผ ์ ์ฅํ๋ ํด๋์ค
- top, front, east ์ ๋ณด๋ฅผ ๊ณ์ ๋ณ๊ฒฝํ๋ ๋ฐฉ์์ผ๋ก ์ฃผ์ฌ์์ ์ซ์ ์ ๋ณด๋ฅผ ์ถ์ ํ๋ค.

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

- ๋ช๋ น์ด์ ๋ฐ๋ผ ์ง๋์์์ ์ฃผ์ฌ์ ์์น๋ฅผ ๋ณ๊ฒฝ์ํจ๋ค.
  - ์ง๋ ๋ฒ์ ์์ธ ๊ฒฝ์ฐ๋ง ์ฃผ์ฌ์ ์ ๋ณด๋ฅผ ์์ ํ๊ณ , ์๋จ์ ์ซ์๋ฅผ ์ถ๋ ฅํ๋ค.

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

- ์ฃผ์ฌ์์ top, front, east ์ ๋ณด๋ฅผ ์๋ฐ์ดํธํ๋ ๋ฉ์๋

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
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

### โ๏ธ **Review**
- ๋ค๋ฅธ ๊ตฌํ์ ๋ชจ๋ ์ฌ์ ๋๋ฐ, `rollDice()` ๊ตฌํ์ด ์ ์ผ ์ด๋ ค์ ๋ค.
  - ์๋๋ ๋ช๋ น์ด๊ฐ ์ฃผ์ด์ง๋ฉด, ์ ์ญ์ผ๋ก ๊ฐ์ง๊ณ  ์๋ bottom์ ์ ๋ณด๋ฅผ ์๋ฐ์ดํธํ๋ ๋ฐฉ์์ ์ฌ์ฉํ๋ ค ํ๋๋ฐ, ์๋ฌด๋ฆฌ ์๊ฐํด๋ ์๋๋ ๊ฒฝ์ฐ๊ฐ ๋ง์ ๊ฒ ๊ฐ์ ๊ฒ์ํ์ ์ฐธ๊ณ ํ๋ค.

### ๐ ์ถ์ฒ
Baekjoon : https://www.acmicpc.net/problem/14499
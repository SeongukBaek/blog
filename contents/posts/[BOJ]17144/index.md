---
title: "๐ฉโ๐ป 17144. ๋ฏธ์ธ๋จผ์ง ์๋!"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-04-01
update: 2022-04-01
tags:
  - ๊ตฌํ
  - ์๋ฎฌ๋ ์ด์
series: "๐ฉโ๐ป BOJ"
---

## ๋ฌธ์ 
๋ฏธ์ธ๋จผ์ง๋ฅผ ์ ๊ฑฐํ๊ธฐ ์ํด ๊ตฌ์ฌ๊ณผ๋ ๊ณต๊ธฐ์ฒญ์ ๊ธฐ๋ฅผ ์ค์นํ๋ ค๊ณ  ํ๋ค. ๊ณต๊ธฐ์ฒญ์ ๊ธฐ์ ์ฑ๋ฅ์ ํ์คํธํ๊ธฐ ์ํด ๊ตฌ์ฌ๊ณผ๋ ์ง์ ํฌ๊ธฐ๊ฐ RรC์ธ ๊ฒฉ์ํ์ผ๋ก ๋ํ๋๊ณ , 1ร1 ํฌ๊ธฐ์ ์นธ์ผ๋ก ๋๋ด๋ค. ๊ตฌ์ฌ๊ณผ๋ ๋ฐ์ด๋ ์ฝ๋ฉ ์ค๋ ฅ์ ์ด์ฉํด ๊ฐ ์นธ (r, c)์ ์๋ ๋ฏธ์ธ๋จผ์ง์ ์์ ์ค์๊ฐ์ผ๋ก ๋ชจ๋ํฐ๋งํ๋ ์์คํ์ ๊ฐ๋ฐํ๋ค. (r, c)๋ rํ c์ด์ ์๋ฏธํ๋ค.

<img src="https://upload.acmicpc.net/75d322ad-5a89-4301-b3a7-403fce0ff966/-/preview/" width="50%">

๊ณต๊ธฐ์ฒญ์ ๊ธฐ๋ ํญ์ 1๋ฒ ์ด์ ์ค์น๋์ด ์๊ณ , ํฌ๊ธฐ๋ ๋ ํ์ ์ฐจ์งํ๋ค. ๊ณต๊ธฐ์ฒญ์ ๊ธฐ๊ฐ ์ค์น๋์ด ์์ง ์์ ์นธ์๋ ๋ฏธ์ธ๋จผ์ง๊ฐ ์๊ณ , (r, c)์ ์๋ ๋ฏธ์ธ๋จผ์ง์ ์์ Ar,c์ด๋ค.

1์ด ๋์ ์๋ ์ ํ ์ผ์ด ์์๋๋ก ์ผ์ด๋๋ค.

1. ๋ฏธ์ธ๋จผ์ง๊ฐ ํ์ฐ๋๋ค. ํ์ฐ์ ๋ฏธ์ธ๋จผ์ง๊ฐ ์๋ ๋ชจ๋  ์นธ์์ ๋์์ ์ผ์ด๋๋ค.
     - (r, c)์ ์๋ ๋ฏธ์ธ๋จผ์ง๋ ์ธ์ ํ ๋ค ๋ฐฉํฅ์ผ๋ก ํ์ฐ๋๋ค.
     - ์ธ์ ํ ๋ฐฉํฅ์ ๊ณต๊ธฐ์ฒญ์ ๊ธฐ๊ฐ ์๊ฑฐ๋, ์นธ์ด ์์ผ๋ฉด ๊ทธ ๋ฐฉํฅ์ผ๋ก๋ ํ์ฐ์ด ์ผ์ด๋์ง ์๋๋ค.
     - ํ์ฐ๋๋ ์์ Ar,c/5์ด๊ณ  ์์์ ์ ๋ฒ๋ฆฐ๋ค.
     - (r, c)์ ๋จ์ ๋ฏธ์ธ๋จผ์ง์ ์์ Ar,c - (Ar,c/5)ร(ํ์ฐ๋ ๋ฐฉํฅ์ ๊ฐ์) ์ด๋ค.
2. ๊ณต๊ธฐ์ฒญ์ ๊ธฐ๊ฐ ์๋ํ๋ค.
    - ๊ณต๊ธฐ์ฒญ์ ๊ธฐ์์๋ ๋ฐ๋์ด ๋์จ๋ค.
    - ์์ชฝ ๊ณต๊ธฐ์ฒญ์ ๊ธฐ์ ๋ฐ๋์ ๋ฐ์๊ณ๋ฐฉํฅ์ผ๋ก ์ํํ๊ณ , ์๋์ชฝ ๊ณต๊ธฐ์ฒญ์ ๊ธฐ์ ๋ฐ๋์ ์๊ณ๋ฐฉํฅ์ผ๋ก ์ํํ๋ค.
    - ๋ฐ๋์ด ๋ถ๋ฉด ๋ฏธ์ธ๋จผ์ง๊ฐ ๋ฐ๋์ ๋ฐฉํฅ๋๋ก ๋ชจ๋ ํ ์นธ์ฉ ์ด๋ํ๋ค.
    - ๊ณต๊ธฐ์ฒญ์ ๊ธฐ์์ ๋ถ๋ ๋ฐ๋์ ๋ฏธ์ธ๋จผ์ง๊ฐ ์๋ ๋ฐ๋์ด๊ณ , ๊ณต๊ธฐ์ฒญ์ ๊ธฐ๋ก ๋ค์ด๊ฐ ๋ฏธ์ธ๋จผ์ง๋ ๋ชจ๋ ์ ํ๋๋ค.
  
๋ค์์ ํ์ฐ์ ์์์ด๋ค.

<img src="https://upload.acmicpc.net/7b0d9d57-1296-44cd-8951-4135d27f9446/-/preview/" width="30%">

- ์ผ์ชฝ๊ณผ ์ค๋ฅธ์ชฝ์ ์นธ์ด ์๊ธฐ ๋๋ฌธ์, ๋ ๋ฐฉํฅ์ผ๋ก๋ง ํ์ฐ์ด ์ผ์ด๋ฌ๋ค.

<img src="https://upload.acmicpc.net/cebebfa9-0056-45f1-b705-75b035888085/-/preview/" width="30%">

- ์ธ์ ํ ๋ค ๋ฐฉํฅ์ผ๋ก ๋ชจ๋ ํ์ฐ์ด ์ผ์ด๋๋ค.

<img src="https://upload.acmicpc.net/1ed0d2e9-9767-4b94-bbde-0e1d6a2d52ff/-/preview/" width="30%">

- ๊ณต๊ธฐ์ฒญ์ ๊ธฐ๊ฐ ์๋ ์นธ์ผ๋ก๋ ํ์ฐ์ด ์ผ์ด๋์ง ์๋๋ค.

๊ณต๊ธฐ์ฒญ์ ๊ธฐ์ ๋ฐ๋์ ๋ค์๊ณผ ๊ฐ์ ๋ฐฉํฅ์ผ๋ก ์ํํ๋ค.

<img src="https://upload.acmicpc.net/94466937-96c7-4f25-9804-530ebd554a59/-/preview/" width="50%">

๋ฐฉ์ ์ ๋ณด๊ฐ ์ฃผ์ด์ก์ ๋, T์ด๊ฐ ์ง๋ ํ ๊ตฌ์ฌ๊ณผ์ ๋ฐฉ์ ๋จ์์๋ ๋ฏธ์ธ๋จผ์ง์ ์์ ๊ตฌํด๋ณด์.

## ์, ์ถ๋ ฅ

์๋ ฅ
- ์ฒซ์งธ ์ค์ R, C, T (6 โค R, C โค 50, 1 โค T โค 1,000) ๊ฐ ์ฃผ์ด์ง๋ค.
- ๋์งธ ์ค๋ถํฐ R๊ฐ์ ์ค์ Ar,c (-1 โค Ar,c โค 1,000)๊ฐ ์ฃผ์ด์ง๋ค. ๊ณต๊ธฐ์ฒญ์ ๊ธฐ๊ฐ ์ค์น๋ ๊ณณ์ Ar,c๊ฐ -1์ด๊ณ , ๋๋จธ์ง ๊ฐ์ ๋ฏธ์ธ๋จผ์ง์ ์์ด๋ค. -1์ 2๋ฒ ์์๋๋ก ๋ถ์ด์ ธ ์๊ณ , ๊ฐ์ฅ ์ ํ, ์๋ซ ํ๊ณผ ๋ ์นธ์ด์ ๋จ์ด์ ธ ์๋ค.

์ถ๋ ฅ
- ์ฒซ์งธ ์ค์ T์ด๊ฐ ์ง๋ ํ ๊ตฌ์ฌ๊ณผ ๋ฐฉ์ ๋จ์์๋ ๋ฏธ์ธ๋จผ์ง์ ์์ ์ถ๋ ฅํ๋ค.

### ๐ **Logic**

```java
class Room {
    Queue<Pair> dustQueue = new LinkedList<>();
    int[][] room;
    int[] rangeX = { -1, 0, 1, 0 };
    int[] rangeY = { 0, 1, 0, -1 };
    int R, C;
    int cleaner1X, cleaner2X;
    ...

}
```

- ๋ฏธ์ธ ๋จผ์ง์ ๊ณต๊ธฐ์ฒญ์ ๊ธฐ ์ ๋ณด๋ฅผ ์ ์ฅํ๋ ํด๋์ค

```java
public int goodByeFineDust(int time) {
    while(time > 0) {
        spreadDust();
        runCleaner();
        time--;
    }
    return countDust();
}
```

- ์ฝ๋๋ ๋จผ์ง๋ฅผ ํ์ฐ์ํค๊ณ , ๊ณต๊ธฐ์ฒญ์ ๊ธฐ๋ฅผ ๋์์ํจ๋ค. ์ ํด์ง ์๊ฐ์ด ๊ฒฝ๊ณผํ ํ, ์ ์ฒด ๋ฏธ์ธ ๋จผ์ง๋ฅผ ๋ฐํํ๋ค.

```java
private void spreadDust() {...}
```

- `Queue` ์ ์ ์ฅํ๊ณ  ์๋ ๋ฏธ์ธ ๋จผ์ง ์ขํ๋ฅผ ์ด์ฉํด ๋ฏธ์ธ ๋จผ์ง๋ฅผ ํ์ฐ์ํจ๋ค. 
- ์ด๋ ์๋ฐ์ดํธํ  ๋ฏธ์ธ ๋จผ์ง ์ ๋ณด๋ฅผ `int[][] tmp` ์ ์ ์ฅํ๊ณ , ํ์ฐ์ด ๋๋ ์ดํ `room` ์ ์๋ฐ์ดํธํ๋ค.

```java
private void runCleaner() {...}
```

- ๊ณต๊ธฐ ์ฒญ์ ๊ธฐ์ ๋ฐ๋ ๋ฐฉํฅ์ ๋ฐ๋ผ ์์ฐจ์ ์ผ๋ก ๋ฏธ์ธ ๋จผ์ง๋ฅผ ์ด๋์ํจ๋ค. 
- ๊ณต๊ธฐ ์ฒญ์ ๊ธฐ ๋ฐ๋ก ์ ์ขํ๋ ํญ์ `0` ์ผ๋ก ์๋ฐ์ดํธํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.Arrays;
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

    class Room {
        Queue<Pair> dustQueue = new LinkedList<>();
        int[][] room;
        int[] rangeX = { -1, 0, 1, 0 };
        int[] rangeY = { 0, 1, 0, -1 };
        int R, C;
        int cleaner1X, cleaner2X;

        public Room (int R, int C) {
            this.R = R;
            this.C = C;
            room = new int[R][C];
        }

        public int goodByeFineDust(int time) {
            while(time > 0) {
                spreadDust();
                runCleaner();
                time--;
            }
            return countDust();
        }

        private void spreadDust() {
            int[][] tmp = new int[R][C];

            while(!dustQueue.isEmpty()) {
                Pair dust = dustQueue.poll();
                int divDust = room[dust.x][dust.y] / 5;
                int checkSpread = 0;

                for (int i = 0; i < 4; i++) {
                    int nx = dust.x + rangeX[i];
                    int ny = dust.y + rangeY[i];

                    if (nx < 0 || nx > R - 1 || ny < 0 || ny > C - 1) continue;
                    if (room[nx][ny] == -1) continue;

                    tmp[nx][ny] += divDust;
                    checkSpread++;
                }
                tmp[dust.x][dust.y] = tmp[dust.x][dust.y] + room[dust.x][dust.y] - (divDust * checkSpread);
            }

            for (int i = 0; i < R; i++) {
                for (int j = 0; j < C; j++) {
                    if (room[i][j] == -1) continue;
                    room[i][j] = tmp[i][j];
                }
            }
        }

        private void runCleaner() {
            int i = 0;
            for (i = cleaner1X - 2; i >= 0; i--) {
                room[i + 1][0] = room[i][0];
            }
            for (i = 1; i < C; i++) {
                room[0][i - 1] = room[0][i];
            }
            for (i = 1; i <= cleaner1X; i++) {
                room[i - 1][C - 1] = room[i][C - 1];
            }
            for (i = C - 2; i > 0; i--) {
                room[cleaner1X][i + 1] = room[cleaner1X][i];
            }

            for (i = cleaner2X + 2; i < R; i++) {
                room[i - 1][0] = room[i][0];
            }
            for (i = 1; i < C; i++) {
                room[R - 1][i - 1] = room[R - 1][i];
            }
            for (i = R - 2; i >= cleaner2X; i--) {
                room[i + 1][C - 1] = room[i][C - 1];
            }
            for (i = C - 2; i > 0; i--) {
                room[cleaner2X][i + 1] = room[cleaner2X][i];
            }

            room[cleaner1X][1] = room[cleaner2X][1] = 0;

            for (i = 0; i < R; i++) {
                for (int j = 0; j < C; j++) {
                    if (room[i][j] > 0) dustQueue.add(new Pair(i, j));
                }
            }
        }

        private int countDust() {
            int count = 0;

            for (int i = 0; i < R; i++) {
                for (int j = 0; j < C; j++) {
                    if (room[i][j] > 0) count += room[i][j];
                }
            }
            return count;
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

            int[] line = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            int R = line[0], C = line[1], T = line[2];

            Room dirtyRoom = new Room(R, C);

            for (int i = 0; i < R; i++) {
                dirtyRoom.room[i] = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
                if (dirtyRoom.room[i][0] == -1 && dirtyRoom.cleaner1X == 0) {
                    dirtyRoom.cleaner1X = i;
                    dirtyRoom.cleaner2X = i+1;
                }
                for (int j = 0; j < C; j++) {
                    if (dirtyRoom.room[i][j] > 0) dirtyRoom.dustQueue.add(new Pair(i, j));
                }
            }
            br.close();

            System.out.println(dirtyRoom.goodByeFineDust(T));
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ๋ฏธ์ธ๋จผ์ง๋ฅผ ํ์ฐ์ํค๋ ๋ฐฉ๋ฒ์์ ์๊ฐ์ ๋ง์ด ๋บ๊ฒผ๋ค. ๊ฒฐ๋ก ์ ์ผ๋ก๋ ์ถ๊ฐ์ ์ธ ๋ฐฐ์ด์ ๋๊ณ , ๋ฏธ์ธ๋จผ์ง ํ์ฐ ์ ๋ณด๋ฅผ ์ ์ฅํด๋๊ณ , `room` ์ ์๋ฐ์ดํธํ๋ ๋ฐฉ์์ด ํ์ํ๋ค.
- ์๋ฎฌ๋ ์ด์์ ๋จ์ํ ๋ฏ ํ๋ฉด์ ๋ง์ ์ฝ๋๋์ ์๊ตฌํ๋ ๊ฒ ๊ฐ๋ค...

### ๐ ์ถ์ฒ
Baekjoon : https://www.acmicpc.net/problem/17144
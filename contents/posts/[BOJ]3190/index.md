---
title: "๐ฉโ๐ป 3190. ๋ฑ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-03-18
update: 2022-03-18
tags:
  - ๊ตฌํ
  - ์๋ฎฌ๋ ์ด์
  - ์๋ฃ๊ตฌ์กฐ
  - ๋ฑ
  - ํ
series: "๐ฉโ๐ป BOJ"
---

## ๋ฌธ์ 
'Dummy' ๋ผ๋ ๋์ค๊ฒ์์ด ์๋ค. ์ด ๊ฒ์์๋ ๋ฑ์ด ๋์์ ๊ธฐ์ด๋ค๋๋๋ฐ, ์ฌ๊ณผ๋ฅผ ๋จน์ผ๋ฉด ๋ฑ ๊ธธ์ด๊ฐ ๋์ด๋๋ค. ๋ฑ์ด ์ด๋ฆฌ์ ๋ฆฌ ๊ธฐ์ด๋ค๋๋ค๊ฐ ๋ฒฝ ๋๋ ์๊ธฐ์์ ์ ๋ชธ๊ณผ ๋ถ๋ชํ๋ฉด ๊ฒ์์ด ๋๋๋ค.

๊ฒ์์ NxN ์ ์ฌ๊ฐ ๋ณด๋์์์ ์งํ๋๊ณ , ๋ช๋ช ์นธ์๋ ์ฌ๊ณผ๊ฐ ๋์ฌ์ ธ ์๋ค. ๋ณด๋์ ์ํ์ข์ฐ ๋์ ๋ฒฝ์ด ์๋ค. ๊ฒ์์ด ์์ํ ๋ ๋ฑ์ ๋งจ์ ๋งจ์ข์ธก์ ์์นํ๊ณ  ๋ฑ์ ๊ธธ์ด๋ 1 ์ด๋ค. ๋ฑ์ ์ฒ์์ ์ค๋ฅธ์ชฝ์ ํฅํ๋ค.

๋ฑ์ ๋งค ์ด๋ง๋ค ์ด๋์ ํ๋๋ฐ ๋ค์๊ณผ ๊ฐ์ ๊ท์น์ ๋ฐ๋ฅธ๋ค.

- ๋จผ์  ๋ฑ์ ๋ชธ๊ธธ์ด๋ฅผ ๋๋ ค ๋จธ๋ฆฌ๋ฅผ ๋ค์์นธ์ ์์น์ํจ๋ค.
- ๋ง์ฝ ์ด๋ํ ์นธ์ ์ฌ๊ณผ๊ฐ ์๋ค๋ฉด, ๊ทธ ์นธ์ ์๋ ์ฌ๊ณผ๊ฐ ์์ด์ง๊ณ  ๊ผฌ๋ฆฌ๋ ์์ง์ด์ง ์๋๋ค.
- ๋ง์ฝ ์ด๋ํ ์นธ์ ์ฌ๊ณผ๊ฐ ์๋ค๋ฉด, ๋ชธ๊ธธ์ด๋ฅผ ์ค์ฌ์ ๊ผฌ๋ฆฌ๊ฐ ์์นํ ์นธ์ ๋น์์ค๋ค. ์ฆ, ๋ชธ๊ธธ์ด๋ ๋ณํ์ง ์๋๋ค.

์ฌ๊ณผ์ ์์น์ ๋ฑ์ ์ด๋๊ฒฝ๋ก๊ฐ ์ฃผ์ด์ง ๋ ์ด ๊ฒ์์ด ๋ช ์ด์ ๋๋๋์ง ๊ณ์ฐํ๋ผ.

## ์, ์ถ๋ ฅ

์๋ ฅ
- ์ฒซ์งธ ์ค์ ๋ณด๋์ ํฌ๊ธฐ N์ด ์ฃผ์ด์ง๋ค. (2 โค N โค 100) ๋ค์ ์ค์ ์ฌ๊ณผ์ ๊ฐ์ K๊ฐ ์ฃผ์ด์ง๋ค. (0 โค K โค 100)
- ๋ค์ K๊ฐ์ ์ค์๋ ์ฌ๊ณผ์ ์์น๊ฐ ์ฃผ์ด์ง๋๋ฐ, ์ฒซ ๋ฒ์งธ ์ ์๋ ํ, ๋ ๋ฒ์งธ ์ ์๋ ์ด ์์น๋ฅผ ์๋ฏธํ๋ค. ์ฌ๊ณผ์ ์์น๋ ๋ชจ๋ ๋ค๋ฅด๋ฉฐ, ๋งจ ์ ๋งจ ์ข์ธก (1ํ 1์ด) ์๋ ์ฌ๊ณผ๊ฐ ์๋ค.
- ๋ค์ ์ค์๋ ๋ฑ์ ๋ฐฉํฅ ๋ณํ ํ์ L ์ด ์ฃผ์ด์ง๋ค. (1 โค L โค 100)
- ๋ค์ L๊ฐ์ ์ค์๋ ๋ฑ์ ๋ฐฉํฅ ๋ณํ ์ ๋ณด๊ฐ ์ฃผ์ด์ง๋๋ฐ,  ์ ์ X์ ๋ฌธ์ C๋ก ์ด๋ฃจ์ด์ ธ ์์ผ๋ฉฐ. ๊ฒ์ ์์ ์๊ฐ์ผ๋ก๋ถํฐ X์ด๊ฐ ๋๋ ๋ค์ ์ผ์ชฝ(C๊ฐ 'L') ๋๋ ์ค๋ฅธ์ชฝ(C๊ฐ 'D')๋ก 90๋ ๋ฐฉํฅ์ ํ์ ์ํจ๋ค๋ ๋ป์ด๋ค. X๋ 10,000 ์ดํ์ ์์ ์ ์์ด๋ฉฐ, ๋ฐฉํฅ ์ ํ ์ ๋ณด๋ X๊ฐ ์ฆ๊ฐํ๋ ์์ผ๋ก ์ฃผ์ด์ง๋ค.

์ถ๋ ฅ
- ์ฒซ์งธ ์ค์ ๊ฒ์์ด ๋ช ์ด์ ๋๋๋์ง ์ถ๋ ฅํ๋ค.

### ๐ **Logic**

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

- ๋ฑ์ ๋ฐฉํฅ ์ ํ ์ ๋ณด๋ฅผ ์ ์ฅํ๋ ํด๋์ค

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

- Dummy ๊ฒ์์ ํ์ํ ๋ก์ง์ ๊ตฌํํ๋ ํด๋์ค
- `map` ์์ 1์ ๋ฑ์ ์์น, 2๋ ์ฌ๊ณผ์ ์์น๋ฅผ ๋ํ๋ธ๋ค.

```java
private void moveSnake(int x, int y) { ... }
```

- `Queue` ๋ฅผ ์ด์ฉํด์ ๋ฑ์ ๊ผฌ๋ฆฌ ์ ๋ณด๋ฅผ ์ ์ฅํ๊ณ , ํ์์ ๋ฐ๋ผ ๋จผ์  ๋ค์ด์จ ์ขํ๋ฅผ outํ๋ค.
- ๋ฑ์ ๋ฐฉํฅ ์ ํ์ ์ํด `snakeDir` ๋ณ์๋ก ๋ฑ์ ํ์ฌ ๋ฐฉํฅ์ ์ ์ฅํ๋ค. (0, 1, 2, 3 - ๋ถ, ๋, ๋จ, ์)
- ์๊ฐ์ ๋ฐ๋ผ `infos` ์์ ๋ฐฉํฅ ์ ํ ์ ๋ณด๋ฅผ ํ์ธํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
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

### โ๏ธ **Review**
- ์น ๋ฐฑ์๋ ๊ธฐ๋ฅ์ ๊ตฌํํ๋ ๊ฒ์ฒ๋ผ, ์๊ตฌ์ฌํญ ํ๋ํ๋์ ํด๋นํ๋ ๊ธฐ๋ฅ ๋ฉ์ด๋ฆฌ๋ฅผ ๋ง๋ค์ด๋ณด์๋ ์๊ฐ์ผ๋ก ์ ๊ทผํ๋ค. ์๋ฎฌ๋ ์ด์์ ์ฃผ์ด์ง ๋ก์ง ๊ทธ๋๋ก ๊ตฌํ๋ง ํ๋ฉด ๋๋ ๊ฒ ๊ฐ๋ค.

### ๐ ์ถ์ฒ
Baekjoon : https://www.acmicpc.net/problem/3190
---
title: "๐ฉโ๐ป 5014. ์คํํธ ๋งํฌ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-02-21
update: 2022-02-21
tags:
  - ๊ทธ๋ํ์ด๋ก 
  - ๊ทธ๋ํํ์
  - BFS
series: "๐ฉโ๐ป BOJ"
---

## ๋ฌธ์ 

๊ฐํธ๋ ์ฝ๋ฉ ๊ต์ก์ ํ๋ ์คํํธ์ ์คํํธ๋งํฌ์ ์ง์ํ๋ค. ์ค๋์ ๊ฐํธ์ ๋ฉด์ ๋ ์ด๋ค. ํ์ง๋ง, ๋ฆ์ ์ ์ ๊ฐํธ๋ ์คํํธ๋งํฌ๊ฐ ์๋ ๊ฑด๋ฌผ์ ๋ฆ๊ฒ ๋์ฐฉํ๊ณ  ๋ง์๋ค.

์คํํธ๋งํฌ๋ ์ด F์ธต์ผ๋ก ์ด๋ฃจ์ด์ง ๊ณ ์ธต ๊ฑด๋ฌผ์ ์ฌ๋ฌด์ค์ด ์๊ณ , ์คํํธ๋งํฌ๊ฐ ์๋ ๊ณณ์ ์์น๋ G์ธต์ด๋ค. ๊ฐํธ๊ฐ ์ง๊ธ ์๋ ๊ณณ์ S์ธต์ด๊ณ , ์ด์  ์๋ฆฌ๋ฒ ์ดํฐ๋ฅผ ํ๊ณ  G์ธต์ผ๋ก ์ด๋ํ๋ ค๊ณ  ํ๋ค.

๋ณดํต ์๋ฆฌ๋ฒ ์ดํฐ์๋ ์ด๋ค ์ธต์ผ๋ก ์ด๋ํ  ์ ์๋ ๋ฒํผ์ด ์์ง๋ง, ๊ฐํธ๊ฐ ํ ์๋ฆฌ๋ฒ ์ดํฐ๋ ๋ฒํผ์ด 2๊ฐ๋ฐ์ ์๋ค. U๋ฒํผ์ ์๋ก U์ธต์ ๊ฐ๋ ๋ฒํผ, D๋ฒํผ์ ์๋๋ก D์ธต์ ๊ฐ๋ ๋ฒํผ์ด๋ค. (๋ง์ฝ, U์ธต ์, ๋๋ D์ธต ์๋์ ํด๋นํ๋ ์ธต์ด ์์ ๋๋, ์๋ฆฌ๋ฒ ์ดํฐ๋ ์์ง์ด์ง ์๋๋ค)

๊ฐํธ๊ฐ G์ธต์ ๋์ฐฉํ๋ ค๋ฉด, ๋ฒํผ์ ์ ์ด๋ ๋ช ๋ฒ ๋๋ฌ์ผ ํ๋์ง ๊ตฌํ๋ ํ๋ก๊ทธ๋จ์ ์์ฑํ์์ค. ๋ง์ฝ, ์๋ฆฌ๋ฒ ์ดํฐ๋ฅผ ์ด์ฉํด์ G์ธต์ ๊ฐ ์ ์๋ค๋ฉด, "use the stairs"๋ฅผ ์ถ๋ ฅํ๋ค.

### ์๋ ฅ
- ์ฒซ์งธ ์ค์ F, S, G, U, D๊ฐ ์ฃผ์ด์ง๋ค. (1 โค S, G โค F โค 1000000, 0 โค U, D โค 1000000) ๊ฑด๋ฌผ์ 1์ธต๋ถํฐ ์์ํ๊ณ , ๊ฐ์ฅ ๋์ ์ธต์ F์ธต์ด๋ค.

### ์ถ๋ ฅ
- ์ฒซ์งธ ์ค์ ๊ฐํธ๊ฐ S์ธต์์ G์ธต์ผ๋ก ๊ฐ๊ธฐ ์ํด ๋๋ฌ์ผ ํ๋ ๋ฒํผ์ ์์ ์ต์๊ฐ์ ์ถ๋ ฅํ๋ค. ๋ง์ฝ, ์๋ฆฌ๋ฒ ์ดํฐ๋ก ์ด๋ํ  ์ ์์ ๋๋ "use the stairs"๋ฅผ ์ถ๋ ฅํ๋ค.

### ๐ **Logic**

```java
class Pair {
    int floor;
    int cnt;

    public Pair(int floor, int cnt) {
        this.floor = floor;
        this.cnt = cnt;
    }
}
```
- ์ธต ์ ๋ณด์ ๋ฒํผ ๋๋ฅธ ํ์๋ฅผ ์ ์ฅํ๊ธฐ ์ํด `Pair` **class**๋ฅผ ์์ฑํ๋ค.

```java
Queue<Pair> q = new LinkedList<>();
q.add(new Pair(S, 0));
visited[S] = true;

while(!q.isEmpty()) {
    Pair now = q.poll();
    int now_floor = now.floor;
    int now_cnt = now.cnt;

    if (now_floor == G) {
        System.out.println(now_cnt);
        return;
    }

    for (int go : upDown) {
        int nxFloor = now_floor + go;
        if (nxFloor <= 0 || nxFloor > F) continue;
        if (visited[nxFloor]) continue;

        q.add(new Pair(nxFloor, now_cnt + 1));
        visited[nxFloor] = true;
    }
}
```
- ํ์ฌ ์ธต์์ ๋ชฉํ ์ธต๊น์ง ๊ฐ๊ธฐ ์ํด **BFS**๋ก ์ด๋ ๊ฐ๋ฅํ ์ธต๊ณผ ๋ฒํผ ๋๋ฅธ ํ์๋ฅผ `Queue` ์ ์ ์ฅํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1" data-language="java">

        import java.io.BufferedReader;
        import java.io.IOException;
        import java.io.InputStreamReader;
        import java.util.LinkedList;
        import java.util.Queue;

        class Pair {
            int floor;
            int cnt;

            public Pair(int floor, int cnt) {
                this.floor = floor;
                this.cnt = cnt;
            }
        }

        public class Main {
            public static void main(String[] args) throws IOException {
                BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
                String[] line = br.readLine().split(" ");
                int F = Integer.parseInt(line[0]), S = Integer.parseInt(line[1]), G = Integer.parseInt(line[2]);
                int[] upDown = {Integer.parseInt(line[3]), -Integer.parseInt(line[4])};
                boolean[] visited = new boolean[F + 1];

                Queue<Pair> q = new LinkedList<>();
                q.add(new Pair(S, 0));
                visited[S] = true;

                while(!q.isEmpty()) {
                    Pair now = q.poll();
                    int now_floor = now.floor;
                    int now_cnt = now.cnt;

                    if (now_floor == G) {
                        System.out.println(now_cnt);
                        return;
                    }

                    for (int go : upDown) {
                        int nxFloor = now_floor + go;
                        if (nxFloor <= 0 || nxFloor > F) continue;
                        if (visited[nxFloor]) continue;

                        q.add(new Pair(nxFloor, now_cnt + 1));
                        visited[nxFloor] = true;
                    }
                }

                System.out.println("use the stairs");

                br.close();
            }
        }
  </div>
</details>

### โ๏ธ **Review**
- BFS ๋ฌธ์ ๋ผ๋ ๊ฒ์ ์๊ณ  ํ์ด์ ์์ด๋์ด๋ ๊ธ๋ฐฉ ์ก์๋ ๋ฌธ์ ์ด๋ค. ์๊ณ ๋ฆฌ์ฆ ๋ถ๋ฅ๋ฅผ ์ ๋ณด๊ณ  ์์ด๋์ด๋ฅผ ์๊ฐํด๋ด๋ ์ฐ์ต์ด ํ์ํ  ๊ฒ ๊ฐ๋ค.
- ์ ๋ฒ๊ณผ ๋์ผํ๊ฒ ๋ฐฉ๋ฌธ ์ฌ๋ถ๋ฅผ ์ ์ฅํ๋ ๋ถ๋ถ์์์ **๋ฉ๋ชจ๋ฆฌ ์ด๊ณผ**๋ฅผ ํผํ  ์ ์์๋ค. ์ข ๋ ์์ธํ๊ฒ ์๊ฐํด๋ณด๋ ์ฐ์ต์ด ํ์ํ  ๊ฒ ๊ฐ๋ค.

### ๐ ์ถ์ฒ
https://www.acmicpc.net/problem/5014
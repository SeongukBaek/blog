---
title: "๐ฉโ๐ป 15685. ๋๋๊ณค ์ปค๋ธ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-03-30
update: 2022-03-30
tags:
  - ๊ตฌํ
  - ์๋ฎฌ๋ ์ด์
series: "๐ฉโ๐ป BOJ"
---

## ๋ฌธ์ 
๋๋๊ณค ์ปค๋ธ๋ ๋ค์๊ณผ ๊ฐ์ ์ธ ๊ฐ์ง ์์ฑ์ผ๋ก ์ด๋ฃจ์ด์ ธ ์์ผ๋ฉฐ, ์ด์ฐจ์ ์ขํ ํ๋ฉด ์์์ ์ ์๋๋ค. ์ขํ ํ๋ฉด์ x์ถ์ โ ๋ฐฉํฅ, y์ถ์ โ ๋ฐฉํฅ์ด๋ค.
1. ์์ ์ 
2. ์์ ๋ฐฉํฅ
3. ์ธ๋

0์ธ๋ ๋๋๊ณค ์ปค๋ธ๋ ์๋ ๊ทธ๋ฆผ๊ณผ ๊ฐ์ ๊ธธ์ด๊ฐ 1์ธ ์ ๋ถ์ด๋ค. ์๋ ๊ทธ๋ฆผ์ (0, 0)์์ ์์ํ๊ณ , ์์ ๋ฐฉํฅ์ ์ค๋ฅธ์ชฝ์ธ 0์ธ๋ ๋๋๊ณค ์ปค๋ธ์ด๋ค.

<img src="http://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/15685/1.png" width="30%">

1์ธ๋ ๋๋๊ณค ์ปค๋ธ๋ 0์ธ๋ ๋๋๊ณค ์ปค๋ธ๋ฅผ ๋ ์ ์ ๊ธฐ์ค์ผ๋ก ์๊ณ ๋ฐฉํฅ์ผ๋ก 90๋ ํ์ ์ํจ ๋ค์ 0์ธ๋ ๋๋๊ณค ์ปค๋ธ์ ๋ ์ ์ ๋ถ์ธ ๊ฒ์ด๋ค. ๋ ์ ์ด๋ ์์ ์ ์์ ์ ๋ถ์ ํ๊ณ  ์ด๋ํ์ ๋, ๊ฐ์ฅ ๋จผ ๊ฑฐ๋ฆฌ์ ์๋ ์ ์ ์๋ฏธํ๋ค.

<img src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/15685/2.png" width="30%">

2์ธ๋ ๋๋๊ณค ์ปค๋ธ๋ 1์ธ๋๋ฅผ ๋ง๋  ๋ฐฉ๋ฒ์ ์ด์ฉํด์ ๋ง๋ค ์ ์๋ค. (ํ๋์ ์ ๋ถ์ ์๋ก ์ถ๊ฐ๋ ์ ๋ถ์ ๋ํ๋ธ๋ค)

<img src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/15685/3.png" width="30%">

3์ธ๋ ๋๋๊ณค ์ปค๋ธ๋ 2์ธ๋ ๋๋๊ณค ์ปค๋ธ๋ฅผ ์ด์ฉํด ๋ง๋ค ์ ์๋ค. ์๋ ๊ทธ๋ฆผ์ 3์ธ๋ ๋๋๊ณค ์ปค๋ธ์ด๋ค.

<img src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/15685/4.png" width="30%">

์ฆ, K(K > 1)์ธ๋ ๋๋๊ณค ์ปค๋ธ๋ K-1์ธ๋ ๋๋๊ณค ์ปค๋ธ๋ฅผ ๋ ์ ์ ๊ธฐ์ค์ผ๋ก 90๋ ์๊ณ ๋ฐฉํฅ ํ์  ์ํจ ๋ค์, ๊ทธ๊ฒ์ ๋ ์ ์ ๋ถ์ธ ๊ฒ์ด๋ค.

ํฌ๊ธฐ๊ฐ 100ร100์ธ ๊ฒฉ์ ์์ ๋๋๊ณค ์ปค๋ธ๊ฐ N๊ฐ ์๋ค. ์ด๋, ํฌ๊ธฐ๊ฐ 1ร1์ธ ์ ์ฌ๊ฐํ์ ๋ค ๊ผญ์ง์ ์ด ๋ชจ๋ ๋๋๊ณค ์ปค๋ธ์ ์ผ๋ถ์ธ ์ ์ฌ๊ฐํ์ ๊ฐ์๋ฅผ ๊ตฌํ๋ ํ๋ก๊ทธ๋จ์ ์์ฑํ์์ค. ๊ฒฉ์์ ์ขํ๋ (x, y)๋ก ๋ํ๋ด๋ฉฐ, 0 โค x โค 100, 0 โค y โค 100๋ง ์ ํจํ ์ขํ์ด๋ค.

## ์, ์ถ๋ ฅ

์๋ ฅ
- ์ฒซ์งธ ์ค์ ๋๋๊ณค ์ปค๋ธ์ ๊ฐ์ N(1 โค N โค 20)์ด ์ฃผ์ด์ง๋ค. ๋์งธ ์ค๋ถํฐ N๊ฐ์ ์ค์๋ ๋๋๊ณค ์ปค๋ธ์ ์ ๋ณด๊ฐ ์ฃผ์ด์ง๋ค. ๋๋๊ณค ์ปค๋ธ์ ์ ๋ณด๋ ๋ค ์ ์ x, y, d, g๋ก ์ด๋ฃจ์ด์ ธ ์๋ค. x์ y๋ ๋๋๊ณค ์ปค๋ธ์ ์์ ์ , d๋ ์์ ๋ฐฉํฅ, g๋ ์ธ๋์ด๋ค. (0 โค x, y โค 100, 0 โค d โค 3, 0 โค g โค 10)
- ์๋ ฅ์ผ๋ก ์ฃผ์ด์ง๋ ๋๋๊ณค ์ปค๋ธ๋ ๊ฒฉ์ ๋ฐ์ผ๋ก ๋ฒ์ด๋์ง ์๋๋ค. ๋๋๊ณค ์ปค๋ธ๋ ์๋ก ๊ฒน์น  ์ ์๋ค.
- ๋ฐฉํฅ์ 0, 1, 2, 3 ์ค ํ๋์ด๊ณ , ๋ค์์ ์๋ฏธํ๋ค.
  - 0: x์ขํ๊ฐ ์ฆ๊ฐํ๋ ๋ฐฉํฅ (โ)
  - 1: y์ขํ๊ฐ ๊ฐ์ํ๋ ๋ฐฉํฅ (โ)
  - 2: x์ขํ๊ฐ ๊ฐ์ํ๋ ๋ฐฉํฅ (โ)
  - 3: y์ขํ๊ฐ ์ฆ๊ฐํ๋ ๋ฐฉํฅ (โ)

์ถ๋ ฅ
- ์ฒซ์งธ ์ค์ ํฌ๊ธฐ๊ฐ 1ร1์ธ ์ ์ฌ๊ฐํ์ ๋ค ๊ผญ์ง์ ์ด ๋ชจ๋ ๋๋๊ณค ์ปค๋ธ์ ์ผ๋ถ์ธ ๊ฒ์ ๊ฐ์๋ฅผ ์ถ๋ ฅํ๋ค.

### ๐ **Logic**

```java
class DragonMap {
    int[][] map = new int[101][101];
    int[] rangeX = { 1, 0, -1, 0 };
    int[] rangeY = { 0, -1, 0, 1 };
    ...

}
```

- ๋๋๊ณค ์ปค๋ธ๋ฅผ ๊ทธ๋ฆฌ๊ธฐ ์ํ `map` ๊ณผ ๋ฐฉํฅ์ ๋ฐ๋ฅธ ์ด๋์ ์ํด ์ฌ์ฉํ๋ ๋ฒ์ ์ ๋ณด๋ฅผ ์ ์ฅํ๋ ํด๋์ค

```java
public void drawDragonCurves(int x, int y, int d, int g) {
    List<Integer> dirList = new ArrayList<>();
    dirList.add(d);

    for (int i = 0; i < g; i++) {
        for (int j = dirList.size() - 1; j >= 0; j--) {
            dirList.add(getCountClockDir(dirList.get(j)));
        }
    }

    map[x][y] = 1;
    for (Integer dir : dirList) {
        x += rangeX[dir];
        y += rangeY[dir];
        map[x][y] = 1;
    }
}
```

- ๋ฆฌ์คํธ์ ๋ฐฉํฅ ์ ๋ณด๋ฅผ ์ ์ฅํ๊ณ , ๋ง์ง๋ง์ ์ ์ฅํ ๋ฐฉํฅ ์ ๋ณด๋ถํฐ ์ฐจ๋ก๋ก ๋ฐ์๊ณ ๋ฐฉํฅ์ผ๋ก ๋๋ฆฐ ๋ฐฉํฅ ์ ๋ณด๋ฅผ ์ ์ฅํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.List;

    class DragonMap {
        int[][] map = new int[101][101];
        int[] rangeX = { 1, 0, -1, 0 };
        int[] rangeY = { 0, -1, 0, 1 };

        public void drawDragonCurves(int x, int y, int d, int g) {
            List<Integer> dirList = new ArrayList<>();
            dirList.add(d);

            for (int i = 0; i < g; i++) {
                for (int j = dirList.size() - 1; j >= 0; j--) {
                    dirList.add(getCountClockDir(dirList.get(j)));
                }
            }

            map[x][y] = 1;
            for (Integer dir : dirList) {
                x += rangeX[dir];
                y += rangeY[dir];
                map[x][y] = 1;
            }
        }

        public int countSquares() {
            int counts = 0;

            for (int i = 0; i < 100; i++) {
                for (int j = 0; j < 100; j++) {
                    if (map[i][j] == 1 && map[i][j + 1] == 1 && map[i + 1][j] == 1 && map[i + 1][j + 1] == 1) {
                        counts++;
                    }
                }
            }

            return counts;
        }

        private int getCountClockDir(int dir) {
            return (dir + 1) % 4;
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

            int N = Integer.parseInt(br.readLine());

            DragonMap dragons = new DragonMap();

            for (int i = 0; i < N; i++) {
                int[] info = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
                dragons.drawDragonCurves(info[0], info[1], info[2], info[3]);
            }
            br.close();

            System.out.println(dragons.countSquares());
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ๋งค ์ธ๋๋ง๋ค ๋ฐฉํฅ์ด ๋ฐ๋๋ ๊ฒ์ ๋ํด, ์ด๋ฅผ ๋ฆฌ์คํธ์ ์ ์ฅํ๊ณ  ๊ณ์ ์๋ฐ์ดํธํด์ฃผ๋ ๋ฐฉ์์ ์๊ฐํ์ง๋ง, ์์ธ์ง ๋ฆฌ์คํธ๋ ํ์ฒ๋ผ `push` , `pop` ์ ํด์ผ ํ๋๊น ๋นํจ์จ์ ์ด์ง ์๋ ... ํ๋ ์๊ฐ์ ์ฌ๋ก์กํ ํผ์ ๊ฝ ๋งํ๋ฒ๋ ธ๋ค.
- ๋ค๋ฅธ ๋ฐฉ๋ฒ์ ๋ญ๊ฐ ์๋ ์ถ์ด ํ ๋ธ๋ก๊ทธ๋ฅผ ๋ดค๋๋ฐ, ์๊ฐํ ๊ทธ๋๋ก๋ฅผ ๊ตฌํํ ๊ธ์ ๋ฐ๊ฒฌํด์ ๋์ ๋ฌด์งํจ์ ๊นจ๋ฌ์๋ค.

### ๐ ์ถ์ฒ
- Baekjoon : https://www.acmicpc.net/problem/15685
- [15685](https://velog.io/@hammii/%EB%B0%B1%EC%A4%80-15685-%EB%93%9C%EB%9E%98%EA%B3%A4-%EC%BB%A4%EB%B8%8C-java)
---
title: "๐ฉโ๐ป 14891. ํฑ๋๋ฐํด"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-03-06
update: 2022-03-06
tags:
  - ๊ตฌํ
  - ์๋ฎฌ๋ ์ด์
series: "๐ฉโ๐ป BOJ"
---

## ๋ฌธ์ 
์ด 8๊ฐ์ ํฑ๋๋ฅผ ๊ฐ์ง๊ณ  ์๋ ํฑ๋๋ฐํด 4๊ฐ๊ฐ ์๋ ๊ทธ๋ฆผ๊ณผ ๊ฐ์ด ์ผ๋ ฌ๋ก ๋์ฌ์ ธ ์๋ค. ๋, ํฑ๋๋ N๊ทน ๋๋ S๊ทน ์ค ํ๋๋ฅผ ๋ํ๋ด๊ณ  ์๋ค. ํฑ๋๋ฐํด์๋ ๋ฒํธ๊ฐ ๋งค๊ฒจ์ ธ ์๋๋ฐ, ๊ฐ์ฅ ์ผ์ชฝ ํฑ๋๋ฐํด๊ฐ 1๋ฒ, ๊ทธ ์ค๋ฅธ์ชฝ์ 2๋ฒ, ๊ทธ ์ค๋ฅธ์ชฝ์ 3๋ฒ, ๊ฐ์ฅ ์ค๋ฅธ์ชฝ ํฑ๋๋ฐํด๋ 4๋ฒ์ด๋ค.

์ด๋, ํฑ๋๋ฐํด๋ฅผ ์ด K๋ฒ ํ์ ์ํค๋ ค๊ณ  ํ๋ค. ํฑ๋๋ฐํด์ ํ์ ์ ํ ์นธ์ ๊ธฐ์ค์ผ๋ก ํ๋ค. ํ์ ์ ์๊ณ ๋ฐฉํฅ๊ณผ ๋ฐ์๊ณ ๋ฐฉํฅ์ด ์๋ค.

ํฑ๋๋ฐํด๋ฅผ ํ์ ์ํค๋ ค๋ฉด, ํ์ ์ํฌ ํฑ๋๋ฐํด์ ํ์ ์ํฌ ๋ฐฉํฅ์ ๊ฒฐ์ ํด์ผ ํ๋ค. ํฑ๋๋ฐํด๊ฐ ํ์ ํ  ๋, ์๋ก ๋ง๋ฟ์ ๊ทน์ ๋ฐ๋ผ์ ์์ ์๋ ํฑ๋๋ฐํด๋ฅผ ํ์ ์ํฌ ์๋ ์๊ณ , ํ์ ์ํค์ง ์์ ์๋ ์๋ค. ํฑ๋๋ฐํด A๋ฅผ ํ์ ํ  ๋, ๊ทธ ์์ ์๋ ํฑ๋๋ฐํด B์ ์๋ก ๋ง๋ฟ์ ํฑ๋์ ๊ทน์ด ๋ค๋ฅด๋ค๋ฉด, B๋ A๊ฐ ํ์ ํ ๋ฐฉํฅ๊ณผ ๋ฐ๋๋ฐฉํฅ์ผ๋ก ํ์ ํ๊ฒ ๋๋ค. ์๋ฅผ ๋ค์ด, ์๋์ ๊ฐ์ ๊ฒฝ์ฐ๋ฅผ ์ดํด๋ณด์.

<img src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/14891/4.png" width="80%">

๋ ํฑ๋๋ฐํด์ ๋ง๋ฟ์ ๋ถ๋ถ์ ์ด๋ก์ ์ ์ ์ผ๋ก ๋ฌถ์ฌ์๋ ๋ถ๋ถ์ด๋ค. ์ฌ๊ธฐ์, 3๋ฒ ํฑ๋๋ฐํด๋ฅผ ๋ฐ์๊ณ ๋ฐฉํฅ์ผ๋ก ํ์ ํ๋ค๋ฉด, 4๋ฒ ํฑ๋๋ฐํด๋ ์๊ณ ๋ฐฉํฅ์ผ๋ก ํ์ ํ๊ฒ ๋๋ค. 2๋ฒ ํฑ๋๋ฐํด๋ ๋ง๋ฟ์ ๋ถ๋ถ์ด S๊ทน์ผ๋ก ์๋ก ๊ฐ๊ธฐ ๋๋ฌธ์, ํ์ ํ์ง ์๊ฒ ๋๊ณ , 1๋ฒ ํฑ๋๋ฐํด๋ 2๋ฒ์ด ํ์ ํ์ง ์์๊ธฐ ๋๋ฌธ์, ํ์ ํ์ง ์๊ฒ ๋๋ค. ๋ฐ๋ผ์, ์๋ ๊ทธ๋ฆผ๊ณผ ๊ฐ์ ๋ชจ์์ ๋ง๋ค๊ฒ ๋๋ค.

<img src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/14891/5.png" width="80%">

1๋ฒ ํฑ๋๋ฐํด๋ฅผ ์๊ณ ๋ฐฉํฅ์ผ๋ก ํ์ ์ํค๋ฉด, 2๋ฒ ํฑ๋๋ฐํด๊ฐ ๋ฐ์๊ณ ๋ฐฉํฅ์ผ๋ก ํ์ ํ๊ฒ ๋๊ณ , 2๋ฒ์ด ํ์ ํ๊ธฐ ๋๋ฌธ์, 3๋ฒ๋ ๋์์ ์๊ณ ๋ฐฉํฅ์ผ๋ก ํ์ ํ๊ฒ ๋๋ค. 4๋ฒ์ 3๋ฒ์ด ํ์ ํ์ง๋ง, ๋ง๋ฟ์ ๊ทน์ด ๊ฐ๊ธฐ ๋๋ฌธ์ ํ์ ํ์ง ์๋๋ค. ๋ฐ๋ผ์, ์๋์ ๊ฐ์ ์ํ๊ฐ ๋๋ค.

<img src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/14891/6.png" width="80%">

ํฑ๋๋ฐํด์ ์ด๊ธฐ ์ํ์ ํฑ๋๋ฐํด๋ฅผ ํ์ ์ํจ ๋ฐฉ๋ฒ์ด ์ฃผ์ด์ก์ ๋, ์ต์ข ํฑ๋๋ฐํด์ ์ํ๋ฅผ ๊ตฌํ๋ ํ๋ก๊ทธ๋จ์ ์์ฑํ์์ค.

## ์, ์ถ๋ ฅ

์๋ ฅ
- ์ฒซ์งธ ์ค์ 1๋ฒ ํฑ๋๋ฐํด์ ์ํ, ๋์งธ ์ค์ 2๋ฒ ํฑ๋๋ฐํด์ ์ํ, ์์งธ ์ค์ 3๋ฒ ํฑ๋๋ฐํด์ ์ํ, ๋ท์งธ ์ค์ 4๋ฒ ํฑ๋๋ฐํด์ ์ํ๊ฐ ์ฃผ์ด์ง๋ค. ์ํ๋ 8๊ฐ์ ์ ์๋ก ์ด๋ฃจ์ด์ ธ ์๊ณ , 12์๋ฐฉํฅ๋ถํฐ ์๊ณ๋ฐฉํฅ ์์๋๋ก ์ฃผ์ด์ง๋ค. N๊ทน์ 0, S๊ทน์ 1๋ก ๋ํ๋์๋ค.
- ๋ค์ฏ์งธ ์ค์๋ ํ์  ํ์ K(1 โค K โค 100)๊ฐ ์ฃผ์ด์ง๋ค. ๋ค์ K๊ฐ ์ค์๋ ํ์ ์ํจ ๋ฐฉ๋ฒ์ด ์์๋๋ก ์ฃผ์ด์ง๋ค. ๊ฐ ๋ฐฉ๋ฒ์ ๋ ๊ฐ์ ์ ์๋ก ์ด๋ฃจ์ด์ ธ ์๊ณ , ์ฒซ ๋ฒ์งธ ์ ์๋ ํ์ ์ํจ ํฑ๋๋ฐํด์ ๋ฒํธ, ๋ ๋ฒ์งธ ์ ์๋ ๋ฐฉํฅ์ด๋ค. ๋ฐฉํฅ์ด 1์ธ ๊ฒฝ์ฐ๋ ์๊ณ ๋ฐฉํฅ์ด๊ณ , -1์ธ ๊ฒฝ์ฐ๋ ๋ฐ์๊ณ ๋ฐฉํฅ์ด๋ค.

์ถ๋ ฅ
- ์ด K๋ฒ ํ์ ์ํจ ์ดํ์ ๋ค ํฑ๋๋ฐํด์ ์ ์์ ํฉ์ ์ถ๋ ฅํ๋ค. ์ ์๋ ๋ค์๊ณผ ๊ฐ์ด ๊ณ์ฐํ๋ค.
  - 1๋ฒ ํฑ๋๋ฐํด์ 12์๋ฐฉํฅ์ด N๊ทน์ด๋ฉด 0์ , S๊ทน์ด๋ฉด 1์ 
  - 2๋ฒ ํฑ๋๋ฐํด์ 12์๋ฐฉํฅ์ด N๊ทน์ด๋ฉด 0์ , S๊ทน์ด๋ฉด 2์ 
  - 3๋ฒ ํฑ๋๋ฐํด์ 12์๋ฐฉํฅ์ด N๊ทน์ด๋ฉด 0์ , S๊ทน์ด๋ฉด 4์ 
  - 4๋ฒ ํฑ๋๋ฐํด์ 12์๋ฐฉํฅ์ด N๊ทน์ด๋ฉด 0์ , S๊ทน์ด๋ฉด 8์ 

### ๐ **Logic**

```java
class Gear {
    int[] tooth;
    boolean spinStatus;
    int spinDir;

    public Gear() {
        tooth = new int[8];
        spinStatus = false;
        spinDir = 0;
    }

    public void clockWise() {
        int tmp = tooth[7];
        System.arraycopy(tooth, 0, tooth, 1, 7);
        tooth[0] = tmp;
    }

    public void counterClockWise() {
        int tmp = tooth[0];
        System.arraycopy(tooth, 1, tooth, 0, 7);
        tooth[7] = tmp;
    }
}
```

- ํฑ๋๋ฐํด์ ์ ๋ณด๋ฅผ ์ ์ฅํ๋ ํด๋์ค์ด๋ค.
- `clockWise()` ๋ ํฑ๋๋ฅผ ์๊ณ๋ฐฉํฅ์ผ๋ก ๋๋ ธ์ ๋ ์ํ ์๋ฐ์ดํธ๋ฅผ ์ํํ๊ณ , `counterClockWise()` ๋ ๋ฐ์๊ณ๋ฐฉํฅ์ ๋ํ ์๋ฐ์ดํธ๋ฅผ ์ํํ๋ค.

```java
for (int i = 0; i < N; i++) {
    spins[i] = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    int centerG = spins[i][0] - 1;
    gears[centerG].spinStatus = true;
    gears[centerG].spinDir = spins[i][1];

    for (int j = centerG - 1; j >= 0; j--) {
        if (gears[j + 1].spinStatus) {
            if (gears[j].tooth[2] != gears[j + 1].tooth[6]) {
                gears[j].spinStatus = true;
                gears[j].spinDir = gears[j + 1].spinDir * -1;
            }
        }
    }

    for (int j = centerG + 1; j < 4; j++) {
        if (gears[j - 1].spinStatus) {
            if (gears[j].tooth[6] != gears[j - 1].tooth[2]) {
                gears[j].spinStatus = true;
                gears[j].spinDir = gears[j - 1].spinDir * -1;
            }
        }
    }

    for (int j = 0; j < 4; j++) {
        if (gears[j].spinDir == -1) gears[j].counterClockWise();
        else if (gears[j].spinDir == 1) gears[j].clockWise();
        gears[j].spinDir = 0;
        gears[j].spinStatus = false;
    }
}
```

- ์ค์ฌ ๊ตฌํ๋ถ๋ ํฌ๊ฒ 3๊ฐ๋ก ๋๋ ์ ์๋ค.
  - ํ์ ํ๋ ํฑ๋์ ์ผ์ชฝ ํฑ๋์ ๋ํด ํ์ ์ฌ๋ถ๋ฅผ ํ๋จํ๊ณ  ์ํํ๋ for๋ฌธ
  - ํ์ ํ๋ ํฑ๋์ ์ค๋ฅธ์ชฝ ํฑ๋์ ๋ํด ํ์ ์ฌ๋ถ๋ฅผ ํ๋จํ๊ณ  ์ํํ๋ for๋ฌธ
  - ์ฃผ์ด์ง 1ํ์ ์ด ๋๋ ํ ํฑ๋์ ์ ๋ณด๋ฅผ ์๋ฐ์ดํธํ๋ for๋ฌธ

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.*;

    class Gear {
        int[] tooth;
        boolean spinStatus;
        int spinDir;

        public Gear() {
            tooth = new int[8];
            spinStatus = false;
            spinDir = 0;
        }

        public void clockWise() {
            int tmp = tooth[7];
            System.arraycopy(tooth, 0, tooth, 1, 7);
            tooth[0] = tmp;
        }

        public void counterClockWise() {
            int tmp = tooth[0];
            System.arraycopy(tooth, 1, tooth, 0, 7);
            tooth[7] = tmp;
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            Gear[] gears = new Gear[4];

            for (int i = 0; i < 4; i++) {
                gears[i] = new Gear();
                gears[i].tooth = Arrays.stream(br.readLine().split("")).mapToInt(Integer::parseInt).toArray();
            }

            int N = Integer.parseInt(br.readLine());
            int[][] spins = new int[N][2];

            for (int i = 0; i < N; i++) {
                spins[i] = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
                int centerG = spins[i][0] - 1;
                gears[centerG].spinStatus = true;
                gears[centerG].spinDir = spins[i][1];

                for (int j = centerG - 1; j >= 0; j--) {
                    if (gears[j + 1].spinStatus) {
                        if (gears[j].tooth[2] != gears[j + 1].tooth[6]) {
                            gears[j].spinStatus = true;
                            gears[j].spinDir = gears[j + 1].spinDir * -1;
                        }
                    }
                }

                for (int j = centerG + 1; j < 4; j++) {
                    if (gears[j - 1].spinStatus) {
                        if (gears[j].tooth[6] != gears[j - 1].tooth[2]) {
                            gears[j].spinStatus = true;
                            gears[j].spinDir = gears[j - 1].spinDir * -1;
                        }
                    }
                }

                for (int j = 0; j < 4; j++) {
                    if (gears[j].spinDir == -1) gears[j].counterClockWise();
                    else if (gears[j].spinDir == 1) gears[j].clockWise();
                    gears[j].spinDir = 0;
                    gears[j].spinStatus = false;
                }
            }

            N = 0;
            for (int i = 0; i < 4; i++) N += gears[i].tooth[0] * Math.pow(2,i);

            System.out.println(N);

            br.close();
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ์ ๋ง ์ค๋๋ง์ 1ํธ๋ง์ ์ฑ๊ณตํ๋ค. ๋์ด๋ ๋์ ๋ฌธ์ ๋ ์๋์์ง๋ง ...
- ๋ฌธ์  ํ์ด๋ฅผ ๊ตฌ์ํ๋ฉด์, ์ด๋ค ๋ฉ์๋๋ฅผ ๊ตฌํํด์ผํ๋ฉฐ, ์ด๋ค ๋ฉ์๋๋ฅผ ๊ฐ์ฒด์ ๋ฌ์ผ ํ๋์ง์ ๋ํด ์ข ๋ ๊ณต๋ถํด๋ด์ผ๊ฒ ๋ค.

### ๐ ์ถ์ฒ
Baekjoon : https://www.acmicpc.net/problem/14891
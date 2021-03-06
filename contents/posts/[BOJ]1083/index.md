---
title: "๐ฉโ๐ป 1083. ์ํธ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-05-15
update: 2022-05-15
tags:
  - ๊ทธ๋ฆฌ๋
  - ์ ๋ ฌ
series: "๐ฉโ๐ป BOJ"
---

## ๋ฌธ์ 
[BOJ - ์ํธ](https://www.acmicpc.net/problem/1083)

### ๐ **Logic**

```java
for (int i = 0; i < N; i++) {
    if (S == 0) break;

    int maxIdx = findMax(i, i + S);

    for (int j = maxIdx; j > i; j--) {
        swap(j - 1, j);
        S--;
    }
}
```

- `S` ๊ฐ 0์ด ๋๋ฉด ์ข๋ฃ๋๋ ๋ฐ๋ณต๋ฌธ
- `S` ๋ ์ค์์ด ๊ฐ๋ฅํ ๋ฒ์๋ฅผ ์๋ฏธํ๊ณ , ์ด ๋ฒ์ ๋ด์ ์ต๋๊ฐ์ ์ฐพ๊ณ , ๊ทธ๊น์ง ์ค์์ ๋ฐ๋ณตํ๋ค.

```java
private static int findMax(int s, int e) {
    int maxIdx = 0;
    int max = 0;

    for (int i = s; i <= e && i < numbers.length; i++) {
        if (max < numbers[i]) {
            maxIdx = i;
            max = numbers[i];
        }
    }

    return maxIdx;
}
```

- ๋ฒ์ ๋ด์ ์ต๋๊ฐ์ ์ฐพ์ ๊ทธ ์์น๋ฅผ ๋ฐํํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.*;

    public class Main {
        static int[] numbers;
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int N = Integer.parseInt(br.readLine());
            numbers = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            int S = Integer.parseInt(br.readLine());

            for (int i = 0; i < N; i++) {
                if (S == 0) break;

                int maxIdx = findMax(i, i + S);

                for (int j = maxIdx; j > i; j--) {
                    swap(j - 1, j);
                    S--;
                }
            }

            for (int n : numbers)
                System.out.print(n + " ");
        }

        private static int findMax(int s, int e) {
            int maxIdx = 0;
            int max = 0;

            for (int i = s; i <= e && i < numbers.length; i++) {
                if (max < numbers[i]) {
                    maxIdx = i;
                    max = numbers[i];
                }
            }

            return maxIdx;
        }

        private static void swap(int i1, int i2) {
            int tmp = numbers[i1];
            numbers[i1] = numbers[i2];
            numbers[i2] = tmp;
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ๋ฌธ์  ์์ฒด๋ ์ฌ์ ์ผ๋, ๊ณ์ `ArrayIndexOutOfBounds` ๊ฐ ๋ ์ ํ๋ ธ๋ค.
- ์๋ ฅ ๋ฒ์๋ฅผ ํ์ธํด๋ณด๋ `N` ๋ณด๋ค `S` ๊ฐ ํด ์ ์์ด ๋น์ฐํ๊ฒ๋ ๋ฒ์๋ฅผ ๋์ด๊ฐ๋ ๊ฒฝ์ฐ๊ฐ ๋ฐ์ํ  ์ ์์๋ค.
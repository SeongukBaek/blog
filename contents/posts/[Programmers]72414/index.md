---
title: "๐ฉโ๐ป 72414. ๊ด๊ณ  ์ฝ์"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-07-03
update: 2022-07-03
tags:
  - ๊ตฌ๊ฐ ํฉ
  - ์ฌ๋ผ์ด๋ฉ ์๋์ฐ
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๊ด๊ณ  ์ฝ์](https://programmers.co.kr/learn/courses/30/lessons/72414)

### ๐ **Logic**

```java
// ์ด๊ธฐ๊ฐ ์ค์  !
// adT๋งํผ์ ๊ตฌ๊ฐ ํฉ์ ๊ตฌํ๊ณ  ์ด๋ณด๋ค ํฐ ๊ตฌ๊ฐ ํฉ์ ์ฐพ๊ธฐ ์ํด์
long sum = 0;
for (int i = 0; i < adT; i++)
    sum += viewerCount[i];
long maxSum = sum;

int startT = 0;
for (int i = adT; i < playT; i++) {
    // adT ๋งํผ์ ๊ตฌ๊ฐ์ ํ์ธํ๊ธฐ ์ํด ์ ์ผ ์ ๊ฐ์ ๋นผ๊ณ , ๋ํ๋ค.
    int front = i - adT;
    sum -= viewerCount[front];
    sum += viewerCount[i];

    // ๊ตฌ๊ฐ ํฉ์ด ๊ฐ์ฅ ํฐ ๊ฒฝ์ฐ, ๊ฐฑ์ 
    if (sum > maxSum) {
        maxSum = sum;
        // front๋ ํ์ฌ ํฌํจ๋์ง ์๋ ์๊ฐ์ด๋ฏ๋ก + 1 ํด์ผ ์์ ์๊ฐ
        startT = front + 1;
    }
}
```
- ๊ด๊ณ  ์๊ฐ๋งํผ ์์์๋ถํฐ ๊ตฌ๊ฐ ํฉ์ ๊ตฌํ๋ค.
- ์ด๋ฅผ ์ด๊ธฐ๊ฐ์ผ๋ก ์ค์ ํด, ์ดํ๋ถํฐ ์ฌ๋ผ์ด๋ฉ ์๋์ฐ ๋ฐฉ์์ผ๋ก ๊ด๊ณ  ์๊ฐ ํฌ๊ธฐ๋งํผ ๊ตฌ๊ฐ ํฉ์ ๊ฐฑ์ ํ๋ฉด์, ์ต๋๊ฐ ๋๋ ๊ฒฝ์ฐ์ ์์์๊ฐ์ ๊ตฌํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

    import java.util.*;

    class Solution {
        static int[] viewerCount;
        
        public String solution(String play_time, String adv_time, String[] logs) {
            int playT = stringToTime(play_time);
            int adT = stringToTime(adv_time);

            viewerCount = new int[playT];

            for (String log : logs) {
                String[] line = log.split("-");
                int startT = stringToTime(line[0]);
                int endT = stringToTime(line[1]);

                // ์ด์, ๋ฏธ๋ง!
                // ๊ฐ ๊ตฌ๊ฐ๋ณ ์ด ๋จ์ ๋ทฐ์ด๋ฅผ ์นด์ดํธ
                for (int i = startT; i < endT; i++) 
                    viewerCount[i]++;
            }

            // ์ด๊ธฐ๊ฐ ์ค์  !
            // adT๋งํผ์ ๊ตฌ๊ฐ ํฉ์ ๊ตฌํ๊ณ  ์ด๋ณด๋ค ํฐ ๊ตฌ๊ฐ ํฉ์ ์ฐพ๊ธฐ ์ํด์
            long sum = 0;
            for (int i = 0; i < adT; i++)
                sum += viewerCount[i];
            long maxSum = sum;

            int startT = 0;
            for (int i = adT; i < playT; i++) {
                // adT ๋งํผ์ ๊ตฌ๊ฐ์ ํ์ธํ๊ธฐ ์ํด ์ ์ผ ์ ๊ฐ์ ๋นผ๊ณ , ๋ํ๋ค.
                int front = i - adT;
                sum -= viewerCount[front];
                sum += viewerCount[i];

                // ๊ตฌ๊ฐ ํฉ์ด ๊ฐ์ฅ ํฐ ๊ฒฝ์ฐ, ๊ฐฑ์ 
                if (sum > maxSum) {
                    maxSum = sum;
                    startT = front + 1;
                }
            }
            
            return timeToString(startT);
        }
        
        private static int stringToTime(String string) {
            String[] line = string.split(":");
            int time = 0;

            time += Integer.parseInt(line[0]) * 3600;
            time += Integer.parseInt(line[1]) * 60;
            time += Integer.parseInt(line[2]);

            return time;
        }

        private static String timeToString(int time) {
            StringBuilder sb = new StringBuilder();

            int h = time / 3600;
            if (h < 10) sb.append("0");
            sb.append(h).append(":");
            time %= 3600;

            int m = time / 60;
            if (m < 10) sb.append("0");
            sb.append(m).append(":");
            time %= 60;

            if (time < 10) sb.append("0");
            return sb.append(time).toString();
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- `String` ์ `int` ํ์ผ๋ก ๋ณํํด ์ด ๋จ์๋ก ์ ์ฅํ๋ ๊ฒ์ ๋ฐ๋ก ์๊ฐํ๊ณ , ์ฒ์์๋ ์์์๊ฐ๊ณผ ์ข๋ฃ์๊ฐ, ๋ฌ๋ ํ์์ ๊ธฐ์ค์ผ๋ก ์ ๋ ฌํ๊ณ  ์ด๋ฅผ ๋ค์ ํ์ํ๋ฉด์ ๊ฐ ๊ตฌ๊ฐ๋ณ ๋ทฐ์ด๋ฅผ ๊ตฌํ๋ ค ํ๋ค.
- ๊ตฌํ์์ ๋งํ๊ณ , ์ข ๋ ํจ์จ์ ์ธ ๋ฐฉ๋ฒ์ด ์์๊นํด์ ๋ค๋ฅธ ํ์ด๋ฅผ ํ์ธํ๋๋ ๊ตฌ๊ฐ ํฉ๊ณผ ์ฌ๋ผ์ด๋ฉ ์๋์ฐ๋ฅผ ํ์ฉํ๋ ๋ฌธ์ ์๋ค๋ ๊ฒ์ ์์๋ค.
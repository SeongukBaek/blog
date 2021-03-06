---
title: "๐ฉโ๐ป 17676. ์ถ์ ํธ๋ํฝ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-05-18
update: 2022-05-18
tags:
  - ๋ฌธ์์ด
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ์ถ์ ํธ๋ํฝ](https://programmers.co.kr/learn/courses/30/lessons/17676)

### ๐ **Logic**

```java
private void getTime(String[] doneTime, int procTime) {
    int hour = Integer.parseInt(doneTime[0]);
    int min = Integer.parseInt(doneTime[1]);
    int sec = (int) (Double.parseDouble(doneTime[2]) * 1000);

    int endSec = hour * 1000 * 60 * 60 + min * 1000 * 60 + sec;
    int startSec = endSec - procTime + 1;

    times.add(new Time(startSec, endSec));
}
```
- ๋ฌธ์์ด์ ํ์ฑํ์ฌ ์, ๋ถ, ์ด ๋จ์๋ก ๋ณํ ํ ์ด๋ฅผ ์ ์๋ก ๋ณํ

```java
private int findMaxRequest(int startTime) {
    int count = 0;
    // start ~ end ์ฌ์ด์ ์๋ค๋ฉด count + 1;
    int endTime = startTime + 1000;

    for (Time time : times) {
        if (startTime <= time.startSec && time.startSec < endTime) {
            count++;
        } else if (startTime <= time.endSec && time.endSec < endTime) {
            count++;
        } else if (endTime <= time.endSec && time.startSec <= startTime) {
            count++;
        }
    }

    return count;
}
```
- ์ฃผ์ด์ง ์๊ฐ์ ๋ก๊ทธ์ ์์ ์๊ฐ ๋๋ ์ข๋ฃ ์๊ฐ
  - ํด๋น ์๊ฐ์ผ๋ก๋ถํฐ 1์ด ๋ด์ ๋ค๋ฅธ ๋ก๊ทธ๊ฐ ์กด์ฌํ๋ค๋ฉด `count` ๋ฅผ ์ฆ๊ฐ

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class Time {
        int startSec;
        int endSec;

        public Time(int startSec, int endSec) {
            this.startSec = startSec;
            this.endSec = endSec;
        }
    }

    class Solution {
        ArrayList<Time> times = new ArrayList<>();
        
        public int solution(String[] lines) {
            // ๋ก๊ทธ ๊ฐ์๊ฐ 1๊ฐ๋ฉด ๋ฌด์กฐ๊ฑด 1 ๋ฐํ
            if (lines.length == 1) return 1;
            
            for (String line : lines) {
                String[] times = line.substring(11).split(" ");
                String[] doneTime = times[0].split(":");
                int procTime = (int) (Double.parseDouble(times[1].replace("s", "")) * 1000);
                getTime(doneTime, procTime);
            }

            int max = 0;
            // ์์์ ์ด ๊ฑธ์ณ์๋ ๊ฒฝ์ฐ์ ๋์ ์ด ๊ฑธ์ณ์๋ ๊ฒฝ์ฐ, time์ start์ end๋ฅผ ๊ธฐ์ ์ผ๋ก 1์ด ์์ ๋ช๊ฐ์ ์์ฒญ์ด ์ฒ๋ฆฌ๋๋์ง ์นด์ดํธ
            for (Time time : times)
                max = Math.max(max, Math.max(findMaxRequest(time.startSec), findMaxRequest(time.endSec)));

            return max;
        }
        
        // ์์ ์๊ฐ๊ณผ ์ข๋ฃ ์๊ฐ์ ๊ตฌํด์ ArrayList์ ์ถ๊ฐ
        private void getTime(String[] doneTime, int procTime) {
            int hour = Integer.parseInt(doneTime[0]);
            int min = Integer.parseInt(doneTime[1]);
            int sec = (int) (Double.parseDouble(doneTime[2]) * 1000);

            int endSec = hour * 1000 * 60 * 60 + min * 1000 * 60 + sec;
            int startSec = endSec - procTime + 1;

            times.add(new Time(startSec, endSec));
        }

        private int findMaxRequest(int startTime) {
            int count = 0;
            // start ~ end ์ฌ์ด์ ์๋ค๋ฉด count + 1;
            int endTime = startTime + 1000;

            for (Time time : times) {
                if (startTime <= time.startSec && time.startSec < endTime) {
                    count++;
                } else if (startTime <= time.endSec && time.endSec < endTime) {
                    count++;
                } else if (endTime <= time.endSec && time.startSec <= startTime) {
                    count++;
                }
            }

            return count;
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ๋ฌธ์์ด ํ์ฑํ๋ ๊ณผ์ ๋ถํฐ ๋ง์์ ๋ค์ง ์์ ๋ฌธ์ ์๊ณ , ์ ๋งคํ ์ค๋ช๋๋ฌธ์ ์ดํด๊ฐ ๋ ๊ฐ์ง ์์๋ค.
- ์ฒ์์๋ ์ด ๋จ์์ ์ ๋ณด๋ง์ ๊ฐ์ง๊ณ  ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ๋ ค๋ค๊ฐ ์์ฐจ ์ถ์๋ค.
- ๋ฐ์ดํฐ ํ ๋ณํ ๋ํ ์ข ๋ ๊ผผ๊ผผํ ํ์ธํ๋ ์ต๊ด์ ๊ฐ์ ธ์ผ๊ฒ ๋ค.
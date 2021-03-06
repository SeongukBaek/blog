---
title: "๐ฉโ๐ป 17683. ๋ฐฉ๊ธ๊ทธ๊ณก"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-05-24
update: 2022-05-24
tags:
  - ๋ฌธ์์ด
  - Map
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๋ฐฉ๊ธ๊ทธ๊ณก](https://programmers.co.kr/learn/courses/30/lessons/17683)

### ๐ **Logic**

```java
// #์ด ๋ค์ด๊ฐ๋ ์ ์นํ
private String convert(String s) {
    return s.replace("C#", "c").replace("D#", "d").replace("F#", "f").replace("G#", "g").replace("A#", "a");
}
```
- `#` ์ด ๋ค์ด๊ฐ๋ ๊ฒฝ์ฐ `contains()` ๋ก ํฌํจ ์ฌ๋ถ ํ์ธ ์ ์ถ๊ฐ ์กฐ๊ฑด์ด ํ์ํด์ ์นํํ๋ ๋ฐฉ์์ ์ฌ์ฉํ๋ค.

```java
String answer = "";
for (Map.Entry<String, String> entry : music.entrySet()) {
    String score = entry.getValue();
    int playTime = score.length();
    
    // ๊ธฐ์ตํ ๋ฉ๋ก๋๋ฅผ ํฌํจํ๊ณ , ์ฌ์ ์๊ฐ์ด ์ ์ผ ๊ธด ์์์ธ ๊ฒฝ์ฐ answer์ ํด๋น ์ ๋ชฉ ์ ์ฅ
    if (score.contains(m) && playTime > maxPlayTime) {
        answer = entry.getKey();
        maxPlayTime = playTime;
    }
}
```
- `LinkedHashMap` ์ ๋ค์ด์๋ ์๋ณด๋ฅผ ๊ธฐ์ตํ๊ณ  ์๋ ๋ฉ๋ก๋์ ๋น๊ตํ๋ฉด์,
  - ํด๋น ๋ฉ๋ก๋๋ฅผ ํฌํจํ๊ณ ,
  - ์ฌ์ ์๊ฐ์ด ์ ์ผ ๊ธด ์์์ธ์ง๋ฅผ ํ๋จํ์ฌ ๋ธ๋ ์ ๋ชฉ์ ์ ์ฅํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class JustNowMusic {
        // Map์ ์์ ๋ณด์ฅ์ ์ํด LinkedHashMap ์ฌ์ฉ
        LinkedHashMap<String, String> music;

        public JustNowMusic(String[] musicinfos) {
            music = new LinkedHashMap<>();

            for (String mi : musicinfos) initMusic(mi);
        }

        private void initMusic(String mi) {
            String[] info = mi.split(",");

            int runTime = parsing(info[0], info[1]);

            StringBuilder score = new StringBuilder();

            info[3] = convert(info[3]);
            
            // ์ฌ์ ์๊ฐ๋งํผ ์๋ณด ๋ฐ๋ณต
            for (int i = 0, idx = 0; i < runTime; i++) {
                if (i % info[3].length() == 0) idx = 0;
                score.append(info[3].charAt(idx));
                idx++;
            }

            // ์ ๋ชฉ๊ณผ ์๋ณด๋ฅผ Map์ ์ ์ฅ
            music.put(info[2], score.toString());
        }
        
        // #์ด ๋ค์ด๊ฐ๋ ์ ์นํ
        private String convert(String s) {
            return s.replace("C#", "c").replace("D#", "d").replace("F#", "f").replace("G#", "g").replace("A#", "a");
        }

        private int parsing(String info1, String info2) {
            int startTime = getTime(info1);
            int endTime = getTime(info2);

            return endTime - startTime;
        }

        private int getTime(String info) {
            String[] time = info.split(":");
            int hour = Integer.parseInt(time[0]);
            int min = Integer.parseInt(time[1]);
            
            return hour * 60 + min;
        }

        public String findMusic(String m) {
            m = convert(m);
            int maxPlayTime = -1;
            
            String answer = "";
            for (Map.Entry<String, String> entry : music.entrySet()) {
                String score = entry.getValue();
                int playTime = score.length();
                
                // ๊ธฐ์ตํ ๋ฉ๋ก๋๋ฅผ ํฌํจํ๊ณ , ์ฌ์ ์๊ฐ์ด ์ ์ผ ๊ธด ์์์ธ ๊ฒฝ์ฐ answer์ ํด๋น ์ ๋ชฉ ์ ์ฅ
                if (score.contains(m) && playTime > maxPlayTime) {
                    answer = entry.getKey();
                    maxPlayTime = playTime;
                }
            }

            return maxPlayTime == -1? "(None)" : answer;
        }
    }

    class Solution {
        public String solution(String m, String[] musicinfos) {
            JustNowMusic jnm = new JustNowMusic(musicinfos);
            
            return jnm.findMusic(m);
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ์ฌ์ ์๊ฐ ์กฐ๊ฑด์ ๊ณ ๋ คํ์ด์ผ ํ๋ ๋ฌธ์ ์๊ณ , ๊ตฌํํด๋๊ฐ๋ ์ค ๊ณ์ ๋ฐ์ํ๋ ์คํจ๋๋ฌธ์ ์ง๋ฌธ ๊ฒ์ํ์ ํ์ธํ๋๋ฐ, `Map` ์ `for` ๋ฌธ์ผ๋ก ํ์ํ๊ฒ ๋๋ฉด ์์๊ฐ ๋ณด์ฅ๋์ง ์๋๋ค๋ ์ ์ ๊นจ๋ฌ์๋ค. `LinkedHashMap` ์ ์ ๋ฆฌํด๋๊ณ  ์ ์ฉํด๋ณด์ง ๋ชปํ ์ฌ๋ก์๋ค.
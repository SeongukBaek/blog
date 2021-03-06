---
title: "๐ฉโ๐ป 72412. ์์ ๊ฒ์"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-07-01
update: 2022-07-01
tags:
  - DFS
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ์์ ๊ฒ์](https://programmers.co.kr/learn/courses/30/lessons/72412)

### ๐ **Logic**

```java
// -๋ฅผ ๋ถ์ด๋ฉด์ ๊ฐ๋ฅํ ์กฐํฉ์ ์์ฑํ์ฌ map์ ์ถ๊ฐํ๋ค.
private static void makeComb(int length) {
    if (length == 4) {
        String key = String.join("", combStr);
        scoreMap.putIfAbsent(key, new ArrayList<>());
        scoreMap.get(key).add(infoScore);
    } else {
        // -๊ฐ ์๋ ๊ฒฝ์ฐ์ -์ธ ๊ฒฝ์ฐ๋ก ๋๋  ๊ฐ๋ฅํ ์กฐํฉ ์์ฑ
        combStr[length] = infoLine[length];
        makeComb(length + 1);
        combStr[length] = "-";
        makeComb(length + 1);
    }
}
```
- -๋ฅผ ๋ถ์ด๋ฉด์ ๊ฐ๋ฅํ ์ ๋ณด๋ฅผ ๋ง๋๋ ํจ์
- DFS ๋ฐฉ์์ผ๋ก ๊ธฐ์กด์ ์ ๋ณด๋ฅผ ์ฌ์ฉํ๊ฑฐ๋, -๋ฅผ ๋ถ์ด๊ฑฐ๋ ํ์ฌ ์์ฑํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        
        // ์ธ์ด, ์ง๊ตฐ, ๊ฒฝ๋ ฅ, ์์ธํธ๋๋ฅผ key๋ก ๊ฐ์ง๊ณ , ์ ์ ๋ฆฌ์คํธ๋ฅผ ๊ฐ์ผ๋ก ๊ฐ์ง๋ map ์ ์ธ
        static Map<String, ArrayList<Integer>> scoreMap = new HashMap<>();

        // ์กฐํฉ ์์ฑ์ ์ํด ์ฌ์ฉํ  ๋ฐฐ์ด, ์ฝํ ์ ์, ์ง์์์ ์ ๋ณด ๋ฐฐ์ด
        static String[] combStr;
        static int infoScore;
        static String[] infoLine;
        
        public int[] solution(String[] info, String[] query) {
            int[] answer = new int[query.length];

            // ์ฃผ์ด์ง info ๋ฐฐ์ด์ ๊ฐ์ง๊ณ  scoreMap ์ด๊ธฐํ
            // -๋ฅผ ํฌํจํ ๋ชจ๋  ์กฐํฉ์ ์์ฑํ์ฌ map์ key๋ก ์ถ๊ฐ
            initScoreMap(info);

            // ์ด์งํ์์ ์ํด ์ ์ ๋ฆฌ์คํธ๋ฅผ ์ค๋ฆ์ฐจ์์ผ๋ก ์ ๋ ฌ
            for (String key : scoreMap.keySet())
                Collections.sort(scoreMap.get(key));

            for (int i = 0; i < query.length; i++) {
                String[] line = query[i].split(" and | ");
                StringBuilder sb = new StringBuilder(line[0] + line[1] + line[2] + line[3]);
                String key = sb.toString();
                int score = Integer.parseInt(line[4]);

                if (scoreMap.containsKey(key)) {
                    ArrayList<Integer> list = scoreMap.get(key);
                    answer[i] = list.size() - findLower(list, score);
                }
            }
            
            return answer;
        }
        
        private static void initScoreMap(String[] info) {
            for (String i : info) {
                combStr = new String[4];
                infoLine = i.split(" ");
                infoScore = Integer.parseInt(infoLine[4]);
                makeComb(0);
            }
        }

        // -๋ฅผ ๋ถ์ด๋ฉด์ ๊ฐ๋ฅํ ์กฐํฉ์ ์์ฑํ์ฌ map์ ์ถ๊ฐํ๋ค.
        private static void makeComb(int length) {
            if (length == 4) {
                String key = String.join("", combStr);
                scoreMap.putIfAbsent(key, new ArrayList<>());
                scoreMap.get(key).add(infoScore);
            } else {
                // -๊ฐ ์๋ ๊ฒฝ์ฐ์ -์ธ ๊ฒฝ์ฐ๋ก ๋๋  ๊ฐ๋ฅํ ์กฐํฉ ์์ฑ
                combStr[length] = infoLine[length];
                makeComb(length + 1);
                combStr[length] = "-";
                makeComb(length + 1);
            }
        }

        private static int findLower(ArrayList<Integer> list, int value) {
            int left = 0;
            int right = list.size() - 1;

            while (left <= right) {
                int mid = (left + right) / 2;
                int v = list.get(mid);

                if (v < value) left = mid + 1;
                else right = mid - 1;
            }

            return left;
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- -๊ฐ ํฌํจ๋ ๊ฒฝ์ฐ๋ฅผ ์ํด ๊ฐ๋ฅํ ๋ชจ๋  ์ ๋ณด๋ฅผ ๋ง๋ค์ด๋๊ณ  ์ด๋ฅผ ์ฌ์ฉํ๋ ์์ด๋์ด๋ฅผ ์ฌ์ฉํ๋ค.
- ์ด์ง ํ์์ ์ฌ์ฉํด ๋น ๋ฅด๊ฒ ์ธ์์ ๊ตฌํ๋ ์์ด๋์ด๊ฐ ์ฃผ์ํ๋ ๊ฒ ๊ฐ๋ค.
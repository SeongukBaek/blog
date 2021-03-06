---
title: "๐ฉโ๐ป 72411. ๋ฉ๋ด ๋ฆฌ๋ด์ผ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-06-29
update: 2022-06-29
tags:
  - ์กฐํฉ
  - ์ ๋ ฌ
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๋ฉ๋ด ๋ฆฌ๋ด์ผ](https://programmers.co.kr/learn/courses/30/lessons/72411)

### ๐ **Logic**

```java
// map์ ํด๋น ์กฐํฉ์ด ์๋ค๋ฉด, count๋ ๊ทธ ์กฐํฉ์ ๋น๋ ์, ๊ทธ๋ ์ง ์๋ค๋ฉด 0
int count = 0;
if (menuComb.containsKey(str))
    count = menuComb.get(str);

// ํ์ฌ ํด๋น ์กฐํฉ์ ์ถ๊ฐํ  ๊ฒ์ด๋ฏ๋ก count๋ฅผ ์ฆ๊ฐ
count++;
// ํด๋น ์กฐํฉ์ด ์ด๋ฏธ ์์๊ณ , ํด๋น ์กฐํฉ(๋ฉ๋ด ๊ตฌ์ฑ)์ด ์ํ ์ฝ์ค ์ค ์ต๋ ๋น๋๋ณด๋ค ๋น๋๊ฐ ํฌ๋ค๋ฉด ์ต์ ํ
if (count != 1 && courseMaxCount.get(str.length()) < count)
    courseMaxCount.put(str.length(), count);

menuComb.put(str, count);
```
- ๋ฉ๋ด ๊ตฌ์ฑ ๊ธธ์ด๋ณ ์ต๋ ๋น๋์๋ฅผ ์ ์ฅํ๋ `map` ์ ์ต์ ํํ๋ ๊ณผ์ 

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        // ๋ชจ๋  ๋ฉ๋ด ์กฐํฉ์ ์ ์ฅ
        static Map<String, Integer> menuComb = new HashMap<>();
        // ๊ฐ course๋ณ ์ต๋ ๋ฉ๋ด ์๋ฅผ ์ ์ฅ
        static Map<Integer, Integer> courseMaxCount = new HashMap<>();
        // ์ต์ ์ฝ์ค ์๋ฆฌ ์ = course[0]
        static int minCombCount;
        
        public String[] solution(String[] orders, int[] course) {
            // ๊ฐ ์ฝ์ค๋ณ ์๋ฆฌ ์์ ๋ํ ์ต๋๊ฐ์ ์ ์ฅํ  map ์ด๊ธฐํ
            for (int c : course) courseMaxCount.put(c, 0);
            minCombCount = course[0];

            // ๊ฐ๋ฅํ ๋ชจ๋  ์กฐํฉ์ ์์ฑํด์ menuComb์ ์ถ๊ฐ
            for (String order : orders) {
                boolean[] visited = new boolean[order.length()];
                for (int c : course)
                    if (order.length() >= c)
                        makeComb(order, visited, 0, order.length(), c);
            }

            ArrayList<String> answer = new ArrayList<>();
            for (Map.Entry<Integer, Integer> entry : courseMaxCount.entrySet())
                // ์ต๋ ๋น๋๋ฅผ ๊ฐ์ง๋ ๋ฉ๋ด result์ ์ถ๊ฐ
                for (Map.Entry<String, Integer> menu : menuComb.entrySet())
                    if (entry.getKey() == menu.getKey().length() && entry.getValue() == menu.getValue())
                        answer.add(menu.getKey());
            
            Collections.sort(answer);
            
            return answer.toArray(String[]::new);
        }
        
        private static void makeComb(String order, boolean[] visited, int start, int n, int r) {
            // ์ฃผ์ด์ง ์๋ฆฌ ์๋งํผ์ ์กฐํฉ์ด ๋ง๋ค์ด์ง ๊ฒฝ์ฐ, map์ ์ถ๊ฐ
            if (r == 0) {
                put(order, visited, n);
                return;
            }

            for (int i = start; i < n; i++) {
                visited[i] = true;
                makeComb(order, visited, i + 1, n, r - 1);
                visited[i] = false;
            }
        }

        private static void put(String order, boolean[] visited, int n) {
            // Map์ ๋ฃ์ ๋ฉ๋ด ์กฐํฉ ์์ฑ
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < order.length(); i++)
                if (visited[i]) sb.append(order.charAt(i));

            // ์ต์ ์ฝ์ค ์๋ฆฌ ์๋ณด๋ค ์์ ๊ฒฝ์ฐ๋ ํจ์ค
            if (sb.length() < minCombCount) return;

            // ๋ฉ๋ด ์กฐํฉ ์ฌ์ ์ ์ ๋ ฌ, AB์ BA๋ ๊ฐ์ ๋ฉ๋ด ์กฐํฉ์ด๋ฏ๋ก
            char[] chars = sb.toString().toCharArray();
            Arrays.sort(chars);
            String str = new String(chars);

            // map์ ํด๋น ์กฐํฉ์ด ์๋ค๋ฉด, count๋ ๊ทธ ์กฐํฉ์ ๋น๋ ์, ๊ทธ๋ ์ง ์๋ค๋ฉด 0
            int count = 0;
            if (menuComb.containsKey(str))
                count = menuComb.get(str);

            // ํ์ฌ ํด๋น ์กฐํฉ์ ์ถ๊ฐํ  ๊ฒ์ด๋ฏ๋ก count๋ฅผ ์ฆ๊ฐ
            count++;
            // ํด๋น ์กฐํฉ์ด ์ด๋ฏธ ์์๊ณ , ํด๋น ์กฐํฉ(๋ฉ๋ด ๊ตฌ์ฑ)์ด ์ํ ์ฝ์ค ์ค ์ต๋ ๋น๋๋ณด๋ค ๋น๋๊ฐ ํฌ๋ค๋ฉด ์ต์ ํ
            if (count != 1 && courseMaxCount.get(str.length()) < count)
                courseMaxCount.put(str.length(), count);
            
            menuComb.put(str, count);
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ๊ฐ๋ฅํ ๋ชจ๋  ์กฐํฉ์ ๊ตฌํ๋ ๊ฒ์ด ๊ฐ์ฅ ๊ด๊ฑด์ด์๋ค. ์ดํ ๊ตฌํ์ ์ ๋ ฌ์ ์ ํ์ฉํ๋ฉด ๋๋ ๋ฌธ์ ์๋ค.
- ์ฒ์์๋ ์กฐํฉ์ ๋ง๋ค๊ณ , ๊ฐ ์ฝ์ค ์๋ฆฌ๋ณ ๋ฉ๋ด ์์ ์ต๋ ๋น๋๋ฅผ ๊ตฌํ๊ณ , ๊ทธ ๋น๋๋ฅผ ๊ฐ์ง๋ ๋ฉ๋ด ๊ตฌ์ฑ์ ์ถ๋ ฅํ๋๋ก ํ๋ค๊ฐ, ์กฐํฉ์ ๋ง๋ค๊ณ  `map` ์ ์ถ๊ฐํ  ๋, ๋ฉ๋ด ๊ตฌ์ฑ ๊ธธ์ด๋ณ ์ต๋ ๋น๋๋ฅผ ์ ์ฅํ๋ `map` ์ ๋์ด ์ด๋ฅผ ์ฌ์ฉํ๋๋ก ๋ณ๊ฒฝํด๋ณด์๋ค.
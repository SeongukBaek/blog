---
title: "๐ฉโ๐ป 92342. ์๊ถ๋ํ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-07-13
update: 2022-07-13
tags:
  - DFS
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ์๊ถ๋ํ](https://programmers.co.kr/learn/courses/30/lessons/92342)

### ๐ **Logic**

```java
private static void dfs(int cnt) {
    if (cnt == n + 1) {
        // ์ ์ ๊ณ์ฐ
        int ryanScore = 0;
        int apeachScore = 0;
        
        for (int i = 0; i <= 10; i++) {
            if (info[i] == 0 && ryan[i] == 0) continue;
            
            if (info[i] < ryan[i]) ryanScore += 10 - i;
            else apeachScore += 10 - i;
        }
        
        if (ryanScore > apeachScore && ryanScore - apeachScore >= max) {
            max = ryanScore - apeachScore;
            answer = ryan.clone();
        }
        
        return;
    }
    // ryan์ด ์ ํ์ด์ด info๋ณด๋ค ํฌ๋ฉด ์งํํ  ํ์ ์์
    for (int i = 0; i <= 10 && ryan[i] <= info[i]; i++) {
        ryan[i]++;
        dfs(cnt + 1);
        ryan[i]--;
    }
}
```

- DFS๋ก ๋ผ์ด์ธ์ด ์ดํผ์น๋ณด๋ค ํ์ด์ ๋ง์ด ์์ง ์์ ๊ฒฝ์ฐ์ ๋ํด ํ์ด์ ์๋ค.
- 1๋ถํฐ n+1๊น์ง ์งํํ๋ฉด์, ๋ผ์ด์ธ๊ณผ ์ดํผ์น์ ์ ์๋ฅผ ๊ณ์ฐํ๊ณ , ์ ์ ์ฐจ๊ฐ ํฐ ๊ฒฝ์ฐ๋ฅผ `max` ์ ๊ฐฑ์ ํ๋ฉด์ ๋ผ์ด์ธ์ ๊ณผ๋ ์ ์๋ฅผ ๊ฐฑ์ ํ๋ค.
  - ์ด๋ `max` ๋ ๊ฐ์ ๊ฒฝ์ฐ์ฌ๋ ๊ฐฑ์ ํ๋๋ก ํ์ฌ, ์ ์ ์ฐจ๊ฐ ๊ฐ์ ๊ฒฝ์ฐ ๊ฐ์ฅ ๋ฎ์ ์ ์๋ฅผ ๋ง์ด ์ ๊ฒฝ์ฐ๋ก ๊ณผ๋ ์ ์๋ฅผ ๊ฐฑ์ ํ  ์ ์๋๋ก ํ๋ค.
 
### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	class Solution {
        static int n;
        static int[] info;
        static int[] ryan;
        static int[] answer = new int[]{ -1 };
        static int max = 0;
        
        public int[] solution(int n, int[] info) {
            this.n = n;
            this.info = info;
            this.ryan = new int[11];
            
            dfs(1);
            
            return answer;
        }
        
        private static void dfs(int cnt) {
            if (cnt == n + 1) {
                // ์ ์ ๊ณ์ฐ
                int ryanScore = 0;
                int apeachScore = 0;
                
                for (int i = 0; i <= 10; i++) {
                    if (info[i] == 0 && ryan[i] == 0) continue;
                    
                    if (info[i] < ryan[i]) ryanScore += 10 - i;
                    else apeachScore += 10 - i;
                }
                
                if (ryanScore > apeachScore && ryanScore - apeachScore >= max) {
                    max = ryanScore - apeachScore;
                    answer = ryan.clone();
                }
                
                return;
            }
            // ryan์ด ์ ํ์ด์ด info๋ณด๋ค ํฌ๋ฉด ์งํํ  ํ์ ์์
            for (int i = 0; i <= 10 && ryan[i] <= info[i]; i++) {
                ryan[i]++;
                dfs(cnt + 1);
                ryan[i]--;
            }
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ์ฌ๊ท์ ์ธ ๋ฐฉ์์ผ๋ก ๋์ ์ ์๋ถํฐ ํ์ด์ ์ด๋ณด๋ฉด์ ์งํํด์ผ ํ๋ ๋ฌธ์ ์์ ์ฝ๊ฒ ์ ์ ์์๋ค.
- ์์ํ ๊ตฌํ์์ ๋งํ ํ์ด๋ฅผ ์ฐธ๊ณ ํ๋ค.
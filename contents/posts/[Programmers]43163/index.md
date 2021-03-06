---
title: "๐ฉโ๐ป 43163. ๋จ์ด ๋ณํ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-04-12
update: 2022-04-12
tags:
  - DFS
  - BFS
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
๋ ๊ฐ์ ๋จ์ด begin, target๊ณผ ๋จ์ด์ ์งํฉ words๊ฐ ์์ต๋๋ค. ์๋์ ๊ฐ์ ๊ท์น์ ์ด์ฉํ์ฌ begin์์ target์ผ๋ก ๋ณํํ๋ ๊ฐ์ฅ ์งง์ ๋ณํ ๊ณผ์ ์ ์ฐพ์ผ๋ ค๊ณ  ํฉ๋๋ค.

1. ํ ๋ฒ์ ํ ๊ฐ์ ์ํ๋ฒณ๋ง ๋ฐ๊ฟ ์ ์์ต๋๋ค.
2. words์ ์๋ ๋จ์ด๋ก๋ง ๋ณํํ  ์ ์์ต๋๋ค.

์๋ฅผ ๋ค์ด begin์ด "hit", target๊ฐ "cog", words๊ฐ ["hot","dot","dog","lot","log","cog"]๋ผ๋ฉด "hit" -> "hot" -> "dot" -> "dog" -> "cog"์ ๊ฐ์ด 4๋จ๊ณ๋ฅผ ๊ฑฐ์ณ ๋ณํํ  ์ ์์ต๋๋ค.

๋ ๊ฐ์ ๋จ์ด begin, target๊ณผ ๋จ์ด์ ์งํฉ words๊ฐ ๋งค๊ฐ๋ณ์๋ก ์ฃผ์ด์ง ๋, ์ต์ ๋ช ๋จ๊ณ์ ๊ณผ์ ์ ๊ฑฐ์ณ begin์ target์ผ๋ก ๋ณํํ  ์ ์๋์ง return ํ๋๋ก solution ํจ์๋ฅผ ์์ฑํด์ฃผ์ธ์.

### ์ ํ์ฌํญ
- ๊ฐ ๋จ์ด๋ ์ํ๋ฒณ ์๋ฌธ์๋ก๋ง ์ด๋ฃจ์ด์ ธ ์์ต๋๋ค.
- ๊ฐ ๋จ์ด์ ๊ธธ์ด๋ 3 ์ด์ 10 ์ดํ์ด๋ฉฐ ๋ชจ๋  ๋จ์ด์ ๊ธธ์ด๋ ๊ฐ์ต๋๋ค.
- words์๋ 3๊ฐ ์ด์ 50๊ฐ ์ดํ์ ๋จ์ด๊ฐ ์์ผ๋ฉฐ ์ค๋ณต๋๋ ๋จ์ด๋ ์์ต๋๋ค.
- begin๊ณผ target์ ๊ฐ์ง ์์ต๋๋ค.
- ๋ณํํ  ์ ์๋ ๊ฒฝ์ฐ์๋ 0๋ฅผ return ํฉ๋๋ค.

### ์์ถ๋ ฅ ์
|begin|target|words|return|
|:---:|:---:|:---:|:---:|
|"hit"|"cog"|["hot", "dot", "dog", "lot", "log", "cog"]|4|
|"hit"|"cog"|["hot", "dot", "dog", "lot", "log"]|0|

### ๐ **Logic**

```java
private int dfs(String begin, String target, String[] words, boolean[] visited, int count, int idx) {
    if (begin.equals(target) || visited[idx]) return count;
    
    visited[idx] = true;
    int ans = 0;
    
    for (int i = 0; i < words.length; i++) {
        if (idx != i && !visited[i] && isOneCharDiff(begin, words[i]))
            ans = dfs(words[i], target, words, visited, count + 1, i);
    }
    
    return ans;
}
```

- ์ฌ๊ท์ ์ธ DFS๋ฅผ ์ด์ฉํด ํ์ฌ ๋จ์ด์ ํ ๋ฌธ์๋ง ๋ค๋ฅธ ๋จ์ด๋ก ๋ณํ์ ์ํํ๋ค.
  - ์ด๋ ์ง๊ธ๊น์ง์ ๋ณํ๋ ์(`count`)๋ฅผ ํจ๊ป ์ ๋ฌํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        public int solution(String begin, String target, String[] words) {
            boolean[] visited;
            int answer = words.length + 1;
            
            for (int i = 0; i < words.length; i++) {
                visited = new boolean[words.length];
                if (isOneCharDiff(begin, words[i]))
                    answer = Math.min(answer, dfs(words[i], target, words, visited, 1, i));
            }
            
            if (answer == words.length + 1) return 0;
                
            return answer;
        }
        
        private int dfs(String begin, String target, String[] words, boolean[] visited, int count, int idx) {
            if (begin.equals(target) || visited[idx]) return count;
            
            visited[idx] = true;
            int ans = 0;
            
            for (int i = 0; i < words.length; i++) {
                if (idx != i && !visited[i] && isOneCharDiff(begin, words[i]))
                    ans = dfs(words[i], target, words, visited, count + 1, i);
            }
            
            return ans;
        }
        
        private boolean isOneCharDiff(String str1, String str2) {
            int count = 0;
            
            for (int i = 0; i < str1.length() && count < 2; i++)
                if (str1.charAt(i) != str2.charAt(i)) count++;
            
            return count == 1;
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ๋จ์ด๋ณ ๋ค๋ฅธ ๋ฌธ์ ์๋ฅผ ๊ทธ๋ํ ํํ๋ก ๋ณํํด ์ ์ฅํ๊ณ  ์ด๋ฅผ BFS ๋ฐฉ์์ผ๋ก ์ ๊ทผํ๋๋ก ๊ตฌํํ๋๋ฐ, ๋ฐฉ๋ฒ ์์ฒด๊ฐ ์๋ชป ๋ ๊ฒ ๊ฐ์๋ค.
- ํ ๋ฌธ์๋ง ๋ค๋ฅธ ๋จ์ด๋ก ๋ณํํ  ์ ์๊ธฐ์ ๊ตณ์ด ๋จ์ด๋ณ ๋ค๋ฅธ ๋ฌธ์ ์๋ฅผ ๊ตฌํ  ํ์๊ฐ ์์๊ณ  DFS๋ฅผ ์ด์ฉํ๋ ๋ฐฉ๋ฒ์ ์ฐธ๊ณ ํ๋ค.

### ๐ ์ถ์ฒ
Programmers : https://programmers.co.kr/learn/courses/30/lessons/43163
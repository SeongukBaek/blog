---
title: "๐ฉโ๐ป 67260. ๋๊ตด ํํ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-04-30
update: 2022-04-30
tags:
  - DFS
  - Stack
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๋๊ตด ํํ](https://programmers.co.kr/learn/courses/30/lessons/67260)

### ๐ **Logic**

```java
private void dfs() {
    Stack<Integer> stack = new Stack<>();
    stack.push(0);
    visited[0] = true;

    for (int next : adjList.get(0)) stack.push(next);
    
    while(!stack.empty()) {
        int now = stack.pop();
        if (visited[now]) continue;
        
        // before ์ ๋ณด๋ฅผ ์๋ฐ์ดํธํ์ง ์๋ ๋ฐฉ๋ค์ ๋ชจ๋ 0๋ฒ ๋ฐฉ์ด ์ฐ์  ๋ฐฉ๋ฌธ๋๋ ๊ฒฝ์ฐ
        if (!visited[before[now]]) {
            after[before[now]] = now;
            continue;
        }
        
        visited[now] = true;
        
        for (int next : adjList.get(now))
            if (!visited[next]) stack.push(next);

        stack.push(after[now]);
    }
}
```

- Stack์ ์ด์ฉํ DFS๋ฅผ ์ํํ๋ค.
- 0๋ฒ ๋ฐฉ์์ ๊ฐ ์ ์๋ ๋ฐฉ๋ค์ stack์ ๋ฃ๋๋ค.
- ๋ฐฉ๋ฌธํ์ง ์์ ๋ฐฉ์ ๋ํด, 
  - ์ฐ์  ๋ฐฉ๋ฌธํด์ผ ํ๋ ๋ฐฉ์ ๋ฐฉ๋ฌธํ์ง ์์ ๊ฒฝ์ฐ, ์ดํ ๋ฐฉ๋ฌธํด์ผ ํ๋ ๋ฐฉ๋ค์ ์ ์ฅํ๋ `after` ์ ํ์ฌ ๋ฐฉ์ ์ ์ฅํ๋ค.
  - ๋ฐฉ๋ฌธํ ๊ฒฝ์ฐ, ํ์ฌ ๋ฐฉ์ ๋ฐฉ๋ฌธ ์ฌ๋ถ๋ฅผ ์ต์ ํํ๊ณ , ํ์ฌ ๋ฐฉ์์ ๊ฐ ์ ์๋ ๋ฐฉ๋ค์ stack์ ๋ฃ๋๋ค.
- ์ดํ ํ์ฌ ๋ฐฉ ์ดํ์ ๋ฐฉ๋ฌธํด์ผ ํ๋ ๋ฐฉ(`after[now]`)์ stack์ ๋ฃ๊ณ , ๋ฐ๋ณตํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        boolean[] visited;
        int[] before;
        int[] after;
        ArrayList<ArrayList<Integer>> adjList = new ArrayList<>();
        
        public boolean solution(int n, int[][] path, int[][] order) {
            visited = new boolean[n];
            before = new int[n];
            after = new int[n];
            
            // ๋ฐฉ๋ฌธ ์ฐ์ ์์ ์ ์ฅ
            for (int[] or : order) before[or[1]] = or[0];
            
            for (int i = 0; i < n; i++) adjList.add(new ArrayList<>());
            
            // ์ธ์  ๋ฆฌ์คํธ ์์ฑ
            for (int[] p : path) {
                adjList.get(p[0]).add(p[1]);
                adjList.get(p[1]).add(p[0]);
            }
            
            // 0๋ณด๋ค ๋จผ์  ๋ฐฉ๋ฌธํด์ผ ํ๋ ๋ฐฉ์ด ์๋ค๋ฉด ๋ฐ๋ก false
            if (before[0] != 0) return false;
            
            dfs();
            
            // ๋ชจ๋  ๋ฐฉ๋ฌธ ํ, ๋ฐฉ๋ฌธํ์ง ์์ ๋ฐฉ์ด ์๋ค๋ฉด false
            for (int i = 0; i < n; i++)
                if (!visited[i]) return false;
            return true;
        }
        
        private void dfs() {
            Stack<Integer> stack = new Stack<>();
            stack.push(0);
            visited[0] = true;

            for (int next : adjList.get(0)) stack.push(next);
            
            while(!stack.empty()) {
                int now = stack.pop();
                if (visited[now]) continue;
                
                if (!visited[before[now]]) {
                    after[before[now]] = now;
                    continue;
                }
                
                visited[now] = true;
                
                for (int next : adjList.get(now))
                    if (!visited[next]) stack.push(next);

                stack.push(after[now]);
            }
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ์์ ์ ๋ ฌ ์๊ณ ๋ฆฌ์ฆ์ ๋ ์ฌ๋ ธ์๋๋ฐ, ๋ฐฉ๋ฌธํ๋ ๋ฐฉ๋ ๋ค์ ๋ฐฉ๋ฌธํด์ผํ๋ ๊ฒฝ์ฐ๊ฐ ์์ ์ ์์ด, ์๋ฏธ๊ฐ ์๋ค๊ณ  ํ๋จํ๋ค.
- ์ญ์๋ ๋ง์ง๋ง ๋ฌธ์ ๋ต๊ฒ, ๋์ด๋๊ฐ ๋์๋ค. ์ธํด ์ฝํ 5์์ ๊ทธ๋ฆผ์ ๋ก์ด๋ผ๋ ์๊ฐ์ด ๋ค์๋ค ..

---
title: "๐ฉโ๐ป 81305. ์ํ์ฅ ๋๋๊ธฐ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-05-06
update: 2022-05-06
tags:
  - ParametricSearch
  - DFS
  - ์ด๋ถํ์
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ์ํ์ฅ ๋๋๊ธฐ](https://programmers.co.kr/learn/courses/30/lessons/81305)

### ๐ **Logic**

```java
private int dfs(int cur, int limit) {
    // ์ผ์ชฝ๊ณผ ์ค๋ฅธ์ชฝ ์์ ํธ๋ฆฌ์์ ๋์ด์ค๋ ์ธ์ ์
    int leftValue = 0, rightValue = 0;
    if (left[cur] != -1) leftValue = dfs(left[cur], limit);
    if (right[cur] != -1) rightValue = dfs(right[cur], limit);
    
    // ๋ ์์ ํธ๋ฆฌ์์ ๋์ด์ค๋ ์ธ์์ ๋ชจ๋ ๊ฐ๋นํ  ์ ์๋ ๊ฒฝ์ฐ, ๊ทธ๋ฃน ์๋ ์ฆ๊ฐํ์ง ์์
    if (x[cur] + leftValue + rightValue <= limit) 
        return x[cur] + leftValue + rightValue;
    
    // ๋ ์์ ํธ๋ฆฌ ์ค ์์ ๊ฐ์ ํฉ์ณ์ผ ๊ฐ๋นํ  ์ ์๋ ๊ฒฝ์ฐ, ์ฆ ์์ ๋ธ๋ ํ๋๋ฅผ ๋๋ ๊ฒฝ์ฐ๋ก ๊ทธ๋ฃน์ด 1๊ฐ ์ถ๊ฐ
    if (x[cur] + Math.min(leftValue, rightValue) <= limit) {
        count++;
        return x[cur] + Math.min(leftValue, rightValue);
    }
    
    // ๋ ์์ ํธ๋ฆฌ ๋ชจ๋ ๊ฐ๋นํ  ์ ์์ด์ ๋ ๋ค ๋๋ ๊ฒฝ์ฐ, ๊ทธ๋ฃน์ด 2๊ฐ ์ถ๊ฐ
    count += 2;
    return x[cur];
}
```

- ์ฃผ์ด์ง ํธ๋ฆฌ์์ ๊ฐ ๊ทธ๋ฃน์ ์๋ฅผ x๋ช์ผ๋ก ์ ํํ  ๋ ํ์ํ ๊ทธ๋ฃน์ ์๋ฅผ ๊ณ์ฐํด์ผ ํ๋ค.
- ๊ฐ ๊ทธ๋ฃน์ ์๋ฅผ x๋ช์ผ๋ก ์ ํํ  ๋ ํ์ํ ๊ทธ๋ฃน์ ์๋ฅผ ๊ณ์ฐํ๊ธฐ ์ํด ๊ทธ๋ฆฌ๋๋ฅผ ์ฌ์ฉํ์ฌ ์ต๋ํ ๊ทธ๋ฃน ์์ฑ์ ๋ฏธ๋ฃจ๋ฉด์ ์๋ก ์ฌ๋ ค๋ณด๋ธ๋ค.
  - ๋ถ๋ชจ ๋ธ๋์์ ์์ ๋ธ๋๋ฅผ ๋ ์ด์ ๊ฐ๋นํ  ์ ์๋ ๊ฒฝ์ฐ, ๊ฐ์ด ๋ ์์ ๋ธ๋๋ฅผ ์ฑ๊ธฐ๊ณ  ๋ค๋ฅธ ๋ธ๋๋ฅผ ์๋ผ๋ธ๋ค.
- ๊ทธ๋ฃน์ผ๋ก ๋๋ ๋ ์๋ 3๊ฐ์ง ๊ฒฝ์ฐ๊ฐ ์กด์ฌํ๋ค.
  - ๋ถ๋ชจ ๋ธ๋๊ฐ ์์ ๋ธ๋ ๋ชจ๋ ์ฑ๊ธฐ๊ธฐ : ๊ทธ๋ฃน + 0, ์ธ ๋ธ๋์ ํฉ์ ๋ ๋ถ๋ชจ ๋ธ๋๋ก ์ ๋ฌ
  - ์์ ๋ธ๋ ์ค 1๊ฐ์ ๋ถ๋ชจ ๋ธ๋๋ฅผ ์ฑ๊ธฐ๊ธฐ : ๊ทธ๋ฃน + 1, ์์ ๋ธ๋ ์ค ์ต์๊ฐ + ๋ถ๋ชจ ๋ธ๋์ ๊ฐ์ ๋ ๋ถ๋ชจ ๋ธ๋๋ก ์ ๋ฌ
  - ์์ ๋ธ๋๋ฅผ ํ๋๋ ์ฑ๊ธฐ์ง ์๊ธฐ : ๊ทธ๋ฃน + 2, ๋ถ๋ชจ ๋ธ๋์ ๊ฐ๋ง ๋ ๋ถ๋ชจ ๋ธ๋๋ก ์ ๋ฌ
- DFS๋ฅผ ํตํด ๋ฆฌํ ๋ธ๋๋ถํฐ ๊ฐ์ ์๋ก ์ฌ๋ ค๋ณด๋ด๋ ์์์ ๋ฐ๋ณตํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class ExamRoom {
        int n;
        int root;
        int count = 0;
        int[] left;
        int[] right;
        int[] x; // ์ํ์ฅ์ ์์ ์ธ์
        int[] parent;
        
        public ExamRoom(int[] num, int[][] links) {
            this.n = num.length;
            parent = new int[n];
            left = new int[n];
            right = new int[n];
            x = new int[n];
            Arrays.fill(parent, -1);
            
            init(num, links);
            setRoot();
        }
        
        private void init(int[] num, int[][] links) {
            for (int i = 0; i < n; i++) {
                int l1 = links[i][0];
                int l2 = links[i][1];
                
                // ์์ ์ง์ 
                left[i] = l1;
                right[i] = l2;
                x[i] = num[i];
                
                // ๋ถ๋ชจ ์ง์ 
                if (l1 != -1) parent[left[i]] = i;
                if (l2 != -1) parent[right[i]] = i;
            }
        }
        
        // parent[i]๊ฐ -1์ด๋ผ๋ฉด root
        private void setRoot() {
            for (int i = 0; i < n; i++) {
                if (parent[i] == -1) {
                    root = i;
                    return;
                }
            }
        }
        
        public int getAnswer(int k) {
            // start๋ num์ ์ต๋๊ฐ
            int start = x[0];
            for (int i : x)
                start = Math.max(start, i);

            // end๋ num์ ์ต๋๊ฐ * num์ ๊ธธ์ด
            int end = start * n;
            while(start < end) {
                int mid = (start + end) / 2;
                if (solve(mid) <= k) end = mid;
                else start = mid + 1;
            }
            
            return start;
        }
        
        private int solve(int limit) {
            count = 0;
            dfs(root, limit);
            // ๋งจ ๋ง์ง๋ง์ ๋จ์ ์ธ์๋ค์ ๋ํ ๊ทธ๋ฃน ํ๋ ์ถ๊ฐ
            return count + 1;
        }
        
        private int dfs(int cur, int limit) {
            // ์ผ์ชฝ๊ณผ ์ค๋ฅธ์ชฝ ์์ ํธ๋ฆฌ์์ ๋์ด์ค๋ ์ธ์ ์
            int leftValue = 0, rightValue = 0;
            if (left[cur] != -1) leftValue = dfs(left[cur], limit);
            if (right[cur] != -1) rightValue = dfs(right[cur], limit);
            
            // ๋ ์์ ํธ๋ฆฌ์์ ๋์ด์ค๋ ์ธ์์ ๋ชจ๋ ๊ฐ๋นํ  ์ ์๋ ๊ฒฝ์ฐ, ๊ทธ๋ฃน ์๋ ์ฆ๊ฐํ์ง ์์
            if (x[cur] + leftValue + rightValue <= limit) 
                return x[cur] + leftValue + rightValue;
            
            // ๋ ์์ ํธ๋ฆฌ ์ค ์์ ๊ฐ์ ํฉ์ณ์ผ ๊ฐ๋นํ  ์ ์๋ ๊ฒฝ์ฐ, ์ฆ ์์ ๋ธ๋ ํ๋๋ฅผ ๋๋ ๊ฒฝ์ฐ๋ก ๊ทธ๋ฃน์ด 1๊ฐ ์ถ๊ฐ
            if (x[cur] + Math.min(leftValue, rightValue) <= limit) {
                count++;
                return x[cur] + Math.min(leftValue, rightValue);
            }
            
            // ๋ ์์ ํธ๋ฆฌ ๋ชจ๋ ๊ฐ๋นํ  ์ ์์ด์ ๋ ๋ค ๋๋ ๊ฒฝ์ฐ, ๊ทธ๋ฃน์ด 2๊ฐ ์ถ๊ฐ
            count += 2;
            return x[cur];
        }
    }

    class Solution {
        public int solution(int k, int[] num, int[][] links) {
            ExamRoom er = new ExamRoom(num, links);
            
            return er.getAnswer(k);
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ์ฒ์ ๋ณด๋ ์๊ณ ๋ฆฌ์ฆ์ ์ฌ์ฉํ๋ ๋ฌธ์ ์ฌ์ ์ฐธ๊ณ ๋ฅผ ์ฐฌ์ฐฌํ ์ฝ์ด๋ณด๋ฉด์ ์ดํดํ๋ ค๊ณ  ํ๋ค.
- ๊ฐ ๊ทธ๋ฃน์ ์๋ฅผ x๋ช์ผ๋ก ์ ํํ  ๋ ๊ทธ๋ฃน์ ์๊ฐ k๊ฐ ์ดํ์ธ์ง๋ฅผ ํ๋จํ๋ ๊ฒฐ์  ๋ฌธ์  ์ฆ, **Parametric Search**๋ฅผ ์ฌ์ฉํ๋ ๋ฌธ์ ๋ฅผ ์ฒ์ ์ ํ ๊ฒ ๊ฐ๋ค... ๋ฌธ์ ๋ฅผ ๋ค์ํ๊ฒ ํ์ด๋ณผ ์ ์์ด์ผ ๊ฒ ๋ค.

### ๐ **์ฐธ๊ณ **
[[ํ๋ก๊ทธ๋๋จธ์ค] ์ํ์ฅ ๋๋๊ธฐ / 2021 ์นด์นด์ค ์ฑ์ฉ์ฐ๊ณํ ์ธํด์ญ - JAVA](https://blog.encrypted.gg/1003)
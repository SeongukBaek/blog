---
title: "๐ฉโ๐ป 42890. ํ๋ณดํค"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-06-02
update: 2022-06-02
tags:
  - ์กฐํฉ
  - ์งํฉ
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ํ๋ณดํค](https://programmers.co.kr/learn/courses/30/lessons/42890)

### ๐ **Logic**

```java
private void combination(int idx, int start, int keySize, HashSet<Integer> keys, int n, String[][] relation) {
    if (idx == keySize) {
        // ์ด๋ฏธ ๋ฝ์ ํ๋ณดํค๋ผ๋ฉด ์ ์ธ(์ ์ผ์ฑ, ์ต์์ฑ ๊ฒ์ฌ), keys์ key๊ฐ ํฌํจ๋๋ค๋ฉด ์ต์์ฑ ๋ง์กฑ X
        for (HashSet<Integer> key : candidateKeys)
            if (keys.containsAll(key)) return;

        // ๋ฝ์ ํ๋ณดํค์ ์ธ๋ฑ์ค๋ฅผ ํ์ธํ์ฌ ์ ์ผ์ฑ์ ํ์ธํ  set
        HashSet<String> spareKeys = new HashSet<>();

        for (String[] rel : relation) {
            StringBuilder sb = new StringBuilder();

            // ์ ํ(keys์ ์ถ๊ฐ)ํ ์์ฑ ์ฒดํฌ
            for (int k : keys)
                sb.append(rel[k]);

            spareKeys.add(sb.toString());
        }

        // map์ ํฌ๊ธฐ์ relation์ ๊ธธ์ด๊ฐ ๊ฐ๋ค๋ฉด ๋ชจ๋  ํํ์ ๋ํด์ ์ค๋ณต๋ ๊ฐ์ด ์๋ค๋ ์๋ฏธ์ด๋ฏ๋ก ํ๋ณดํค๊ฐ ๋  ์ ์์
        if (spareKeys.size() == relation.length)
            candidateKeys.add(keys);
    } else {
        for (int i = start; i < n; i++) {
            HashSet<Integer> selectedKeys = new HashSet<>(keys);
            selectedKeys.add(i);
            combination(idx + 1, i + 1, keySize, selectedKeys, n, relation);
        }
    }
}
```

- ํ๋ณดํค๋ฅผ ์์ฑํ๋ ํจ์
- ์ ์ผ์ฑ๊ณผ ์ต์์ฑ์ ๋ง์กฑํ๋ ํ๋ณดํค๋ฅผ `candidateKeys` ์ ์ถ๊ฐํ๋ค.
  - ๋ง๋  ํ๋ณดํค์ ํด๋นํ๋ ์์ฑ๊ฐ์ผ๋ก `Map` ์ ๋ง๋ค์์๋, ์ค๋ณต์์ด `relation` ์๋งํผ ๋ง๋ค์ด์ง๋ค๋ฉด ์ด๋ฅผ ๋ง์กฑํ๋ ํ๋ณดํค์ด๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        // ํ๋ณดํค๋ค์ ์ ์ฅํ  ArrayList
        static ArrayList<HashSet<Integer>> candidateKeys = new ArrayList<>();
        
        public int solution(String[][] relation) {
            int n = relation[0].length;
            
            // 1๊ฐ๋ถํฐ n๊ฐ๊น์ง์ ํ๋ณดํค ์์ฑ ์๋
            for (int i = 0; i < n; i++)
                combination(0, 0, i + 1, new HashSet<>(), n, relation);
            
            return candidateKeys.size();
        }
        
        private void combination(int idx, int start, int keySize, HashSet<Integer> keys, int n, String[][] relation) {
            if (idx == keySize) {
                // ์ด๋ฏธ ๋ฝ์ ํ๋ณดํค๋ผ๋ฉด ์ ์ธ(์ ์ผ์ฑ, ์ต์์ฑ ๊ฒ์ฌ), keys์ key๊ฐ ํฌํจ๋๋ค๋ฉด ์ต์์ฑ ๋ง์กฑ X
                for (HashSet<Integer> key : candidateKeys)
                    if (keys.containsAll(key)) return;

                // ๋ฝ์ ํ๋ณดํค์ ์ธ๋ฑ์ค๋ฅผ ํ์ธํ์ฌ ์ ์ผ์ฑ์ ํ์ธํ  set
                HashSet<String> spareKeys = new HashSet<>();

                for (String[] rel : relation) {
                    StringBuilder sb = new StringBuilder();

                    // ์ ํ(keys์ ์ถ๊ฐ)ํ ์์ฑ ์ฒดํฌ
                    for (int k : keys)
                        sb.append(rel[k]);

                    spareKeys.add(sb.toString());
                }

                // map์ ํฌ๊ธฐ์ relation์ ๊ธธ์ด๊ฐ ๊ฐ๋ค๋ฉด ๋ชจ๋  ํํ์ ๋ํด์ ์ค๋ณต๋ ๊ฐ์ด ์๋ค๋ ์๋ฏธ์ด๋ฏ๋ก ํ๋ณดํค๊ฐ ๋  ์ ์์
                if (spareKeys.size() == relation.length)
                    candidateKeys.add(keys);
            } else {
                for (int i = start; i < n; i++) {
                    HashSet<Integer> selectedKeys = new HashSet<>(keys);
                    selectedKeys.add(i);
                    combination(idx + 1, i + 1, keySize, selectedKeys, n, relation);
                }
            }
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ์กฐํฉ๊ณผ ์งํฉ์ ๋ํ ๋ฌธ์ ์์ ๋ฐ๋ก ๋ ์ฌ๋ฆด ์ ์์์ง๋ง "์ ์ผ์ฑ" ๊ณผ "์ต์์ฑ" ์ ๋ง์กฑํ๋ ํ๋ณดํค๋ฅผ ๊ตฌํํ๋๋ฐ์์ ๋งํ๋ค ..
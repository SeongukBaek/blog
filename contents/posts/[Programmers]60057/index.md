---
title: "๐ฉโ๐ป 60057. ๋ฌธ์์ด ์์ถ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-06-11
update: 2022-06-11
tags:
  - ๋ฌธ์์ด
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๋ฌธ์์ด ์์ถ](https://programmers.co.kr/learn/courses/30/lessons/60057)

### ๐ **Logic**

```java
// ์ ์ฒด ๋ฐ๋ณต์ s ๊ธธ์ด์ ์ ๋ฐ๊น์ง๋ง
for (int len = 1; len <= inputLength / 2; len++) {
    int length = 0;
    int idx = 0;

    // ์๋ฅผ word๊ฐ s์ ๋ฒ์ ์์ ์๋ ๊ฒฝ์ฐ๊น์ง ๋ฐ๋ณต
    while(idx + len <= inputLength) {
        String word = getWord(idx, len);
        int count = 0;
        
        // ํ์ธํ  ๋ฌธ์์ด์ด s์ ๋ฒ์ ์์ ์๊ณ , ๊ทธ ๋ฌธ์์ด์ด word์ ๋์ผํ ๊ฒฝ์ฐ
        // ๊ทธ ๋ฌธ์์ด์ ๊ฐ์๋ฅผ ๊ตฌํ๋ค.
        while (idx + len <= inputLength && word.equals(getWord(idx, len))) {
            idx += len;
            count++;
        }
        // count๊ฐ 1์ด๋ฉด ๋ฌธ์์ด ๊ธธ์ด๋ง ๋ํ๊ณ , 1๋ณด๋ค ํฐ ๊ฒฝ์ฐ์๋ ๊ทธ ๊ธธ์ด๋ ํจ๊ป ๋ํ๋ค.
        length += word.length() + (count > 1 ? String.valueOf(count).length() : 0);
    }
    // ๋จ์ ๋ฌธ์์ด ๋ถ์ด๊ธฐ
    length += inputLength - idx;
    minLength = Math.min(minLength, length);
}
```

- ๋ฌธ์์ด์ **1๋ถํฐ ์ฃผ์ด์ง ๋ฌธ์์ด ๊ธธ์ด์ ์ ๋ฐ**๊น์ง๋งํผ ์๋ฅด๋ ๊ฒ์ ๋ฐ๋ณตํ๋ค.
- ์ ํ ๊ธธ์ด๋งํผ ๋ฌธ์์ด์ ๋น๊ตํ๊ณ  ๊ฐ์์ ์ ํ ๊ธธ์ด๋งํผ์ `length` ์ ๋ํด, ์ต์ข์ ์ผ๋ก `minLength` ๋ฅผ ์ต์ ํํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        static String inputString;
        
        public int solution(String s) {
            if (s.length() == 1) return 1;

            inputString = s;
            int inputLength = s.length();
            int minLength = Integer.MAX_VALUE;

            // ์ ์ฒด ๋ฐ๋ณต์ s ๊ธธ์ด์ ์ ๋ฐ๊น์ง๋ง
            for (int len = 1; len <= inputLength / 2; len++) {
                int length = 0;
                int idx = 0;

                // ์๋ฅผ word๊ฐ s์ ๋ฒ์ ์์ ์๋ ๊ฒฝ์ฐ๊น์ง ๋ฐ๋ณต
                while(idx + len <= inputLength) {
                    String word = getWord(idx, len);
                    int count = 0;
                    
                    // ํ์ธํ  ๋ฌธ์์ด์ด s์ ๋ฒ์ ์์ ์๊ณ , ๊ทธ ๋ฌธ์์ด์ด word์ ๋์ผํ ๊ฒฝ์ฐ
                    // ๊ทธ ๋ฌธ์์ด์ ๊ฐ์๋ฅผ ๊ตฌํ๋ค.
                    while (idx + len <= inputLength && word.equals(getWord(idx, len))) {
                        idx += len;
                        count++;
                    }
                    // count๊ฐ 1์ด๋ฉด ๋ฌธ์์ด ๊ธธ์ด๋ง ๋ํ๊ณ , 1๋ณด๋ค ํฐ ๊ฒฝ์ฐ์๋ ๊ทธ ๊ธธ์ด๋ ํจ๊ป ๋ํ๋ค.
                    length += word.length() + (count > 1 ? String.valueOf(count).length() : 0);
                }
                // ๋จ์ ๋ฌธ์์ด ๋ถ์ด๊ธฐ
                length += inputLength - idx;
                minLength = Math.min(minLength, length);
            }
            
            return minLength;
        }
        
        private String getWord(int start, int len) {
            return inputString.substring(start, start + len);
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ์ ์ผ ๋จผ์  ๊ทธ๋ฆฌ๋ํ ๋ฐฉ๋ฒ์ ๋ ์ฌ๋ฆฌ๊ธด ํ์ผ๋, ์๊ฐ ์ด๊ณผ๊ฐ ๋์ง ์์๊น ์๊ฐํ๋ค.
- ๋ฌธ์์ด์ ๊ธธ์ด๊ฐ ์ต๋ 1000์ด์๊ณ , ์ด์ฐจํผ ๋ฌธ์์ด ๋น๊ต๋ฅผ ์ํด ์ ๋ฐ ๊ธธ์ด๊น์ง๋ง ์๋ฅผ ๊ฒ์ด๋ฏ๋ก ๊ด์ฐฎ์ ๊ฒ ๊ฐ์๋ค.
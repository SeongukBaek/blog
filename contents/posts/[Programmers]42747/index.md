---
title: "๐ฉโ๐ป 42747. H-Index"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-04-15
update: 2022-04-15
tags:
  - ์ ๋ ฌ
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
H-Index๋ ๊ณผํ์์ ์์ฐ์ฑ๊ณผ ์ํฅ๋ ฅ์ ๋ํ๋ด๋ ์งํ์๋๋ค. ์ด๋ ๊ณผํ์์ H-Index๋ฅผ ๋ํ๋ด๋ ๊ฐ์ธ `h`๋ฅผ ๊ตฌํ๋ ค๊ณ  ํฉ๋๋ค. ์ํค๋ฐฑ๊ณผ์ ๋ฐ๋ฅด๋ฉด, H-Index๋ ๋ค์๊ณผ ๊ฐ์ด ๊ตฌํฉ๋๋ค.

์ด๋ค ๊ณผํ์๊ฐ ๋ฐํํ ๋ผ๋ฌธ `n`ํธ ์ค, `h`๋ฒ ์ด์ ์ธ์ฉ๋ ๋ผ๋ฌธ์ด `h`ํธ ์ด์์ด๊ณ  ๋๋จธ์ง ๋ผ๋ฌธ์ด `h`๋ฒ ์ดํ ์ธ์ฉ๋์๋ค๋ฉด `h`์ ์ต๋๊ฐ์ด ์ด ๊ณผํ์์ H-Index์๋๋ค.

์ด๋ค ๊ณผํ์๊ฐ ๋ฐํํ ๋ผ๋ฌธ์ ์ธ์ฉ ํ์๋ฅผ ๋ด์ ๋ฐฐ์ด citations๊ฐ ๋งค๊ฐ๋ณ์๋ก ์ฃผ์ด์ง ๋, ์ด ๊ณผํ์์ H-Index๋ฅผ return ํ๋๋ก solution ํจ์๋ฅผ ์์ฑํด์ฃผ์ธ์.

### ์ ํ์ฌํญ
- ๊ณผํ์๊ฐ ๋ฐํํ ๋ผ๋ฌธ์ ์๋ 1ํธ ์ด์ 1,000ํธ ์ดํ์๋๋ค.
- ๋ผ๋ฌธ๋ณ ์ธ์ฉ ํ์๋ 0ํ ์ด์ 10,000ํ ์ดํ์๋๋ค.

### ์์ถ๋ ฅ ์
|citations|return|
|:---:|:---:|
|[3, 0, 6, 1, 5]|3|

### ๐ **Logic**

```java
private boolean isHindex(int[] citations, int H) {
  int s = 0, l = 0;
  for (int i = 0; i < citations.length; i++) {
    if (citations[i] >= H) l++;
    if (citations[i] <= H) s++;
  }
  
  if (l >= H && s <= H) return true;
  return false;
}
```

- `H` ๊ฐ ์ฃผ์ด์ง H-index ์กฐ๊ฑด์ ๋ง์กฑํ๋์ง ํ์ธํ๋ ํจ์

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	  import java.util.*;

    class Solution {
        public int solution(int[] citations) {
            int n = citations.length;
            int answer = 0;
            
            Arrays.sort(citations);
            
            for (int i = citations[n - 1]; i >= 0; i--) {
                if (isHindex(citations, i)) {
                    answer = i;
                    break;
                }
            }
            
            return answer;
        }
        
        private boolean isHindex(int[] citations, int H) {
            int s = 0, l = 0;
            for (int i = 0; i < citations.length; i++) {
                if (citations[i] >= H) l++;
                if (citations[i] <= H) s++;
            }
            
            if (l >= H && s <= H) return true;
            return false;
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- H-index๊ฐ ์ฃผ์ด์ง `citations` ๋ฐฐ์ด์ ์์ ์๋ ์๋ค๋ ์๊ฐ์ ๋ชปํ๊ณ , ์ฃผ์ด์ง ๋ฐฐ์ด ๋ด์์๋ง H-index๋ฅผ ์ฐพ์ผ๋ ค๋ค๊ฐ ํ์ผ 1๊ฐ ๋นผ๊ณ  ๋ค ์คํจํ๋ค...
- ์ฃผ์ด์ง ๋ฐฐ์ด์ ์์ ์๋ ์๋ค๋ ๊ฐ์ ํ์ ๊ตฌํํ๋ ๋ฐ๋ก ํด๊ฒฐํ๋ค.

### ๐ ์ถ์ฒ
Programmers : https://programmers.co.kr/learn/courses/30/lessons/42747
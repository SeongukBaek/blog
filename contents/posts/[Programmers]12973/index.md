---
title: "๐ฉโ๐ป 12973. ์ง์ง์ด ์ ๊ฑฐํ๊ธฐ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-07-24
update: 2022-07-24
tags:
  - ์คํ
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ์ง์ง์ด ์ ๊ฑฐํ๊ธฐ](https://programmers.co.kr/learn/courses/30/lessons/12973)

### ๐ **Logic**

```java
for (int i = 0; i < len; i++) {
    char ch = s.charAt(i);
    char stackCh = ' ';
    
    if (!stack.isEmpty()) stackCh = stack.peek();
    
    if (ch == stackCh) stack.pop();
    else stack.push(ch);
}
```
- ๊ฐ์ ๋ฌธ์๋ฅผ ๋ง๋  ๋๊น์ง ์คํ์ ๋ฌธ์๋ฅผ ๋ฃ๋๋ค.
- ๊ฐ์ ๋ฌธ์๊ฐ ๋์ค๋ฉด popํ๊ณ  ๊ทธ๋ ์ง ์์ผ๋ฉด stack์ ๋จ๊ธฐ ๋๋ฌธ์, ์ต์ข์ ์ผ๋ก ์คํ์ด ๋น์ด์์ง ์๋ค๋ฉด ์ง์ง์ด ์ ๊ฑฐํ  ์ ์๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

    import java.util.*;

    class Solution {
        public int solution(String s) {
            Stack<Character> stack = new Stack<>();
            int len = s.length();
            
            for (int i = 0; i < len; i++) {
                char ch = s.charAt(i);
                char stackCh = ' ';
                
                if (!stack.isEmpty()) stackCh = stack.peek();
                
                if (ch == stackCh) stack.pop();
                else stack.push(ch);
            }
            
            return stack.isEmpty() ? 1 : 0;
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ์ฒ์์๋ ์ ๊ทํํ์์ผ๋ก ๊ฐ์ ๋ฌธ์๊ฐ 2๋ฒ ๋ฐ๋ณต๋  ๋, ์ด๋ฅผ ์ ๊ฑฐํ๋ค. ์ด๋ฅผ ๋ฐ๋ณตํ๋ค๊ฐ ์ต์ข์ ์ผ๋ก๋ ๋ฌธ์์ด์ ๊ธธ์ด๊ฐ 0์ด ๋๋์ง์ ๋ฐ๋ผ ๋ฐํํ๋ ๋ฐฉ์์ผ๋ก ๊ตฌํํ๋ค.
  - ํ์ง๋ง ๋ช๋ช ํ์ผ์์ ์๊ฐ์ด๊ณผ๊ฐ ๋ฐ์ํ๋ค.
- ๋ฌธ๋ ์ ์ ๋ฌธ์์ด ํญ๋ฐ์ด๋ผ๋ ๋ฌธ์ ๋ฅผ ํ๋ค๊ฐ ๋ชป ํ์๋ ๊ธฐ์ต์ด ๋ฌ๋๋ฐ ๊ทธ ๋ ์คํ์ ์ฌ์ฉํด์ผ ํ๋ค๋ ์ ์ด ๋ ์ฌ๋๋ค.
---
title: "๐ฉโ๐ป 16472. ๊ณ ๋ฅ์ด"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-05-14
update: 2022-05-14
tags:
  - ํฌ ํฌ์ธํฐ
series: "๐ฉโ๐ป BOJ"
---

## ๋ฌธ์ 
๊ณ ์์ด๋ ๋๋ฌด ๊ท์ฝ๋ค. ์ฌ๋๋ค์ ๊ณ ์์ด๋ฅผ ๋๋ฌด ๊ท์ฌ์ํ๊ณ , ๊ฒฐ๊ตญ ๊ณ ์์ด์ ๋์ฑ ๊ฐ๊น์์ง๊ณ  ์ถ์ด ๊ณ ์์ด์์ ์ํต์ ์ํ ๊ณ ์์ด ๋ง ๋ฒ์ญ๊ธฐ๋ฅผ ๋ฐ๋ชํ๊ธฐ๋ก ํ๋ค. ์ด ๋ฒ์ญ๊ธฐ๋ ์ฌ๋์ ์ธ์ด๋ฅผ ๊ณ ์์ด์ ์ธ์ด๋ก, ๊ณ ์์ด์ ์ธ์ด๋ฅผ ์ฌ๋์ ์ธ์ด๋ก ๋ฐ๊พธ์ด ์ฃผ๋ ํฌ๋์ ๋ฐ๋ชํ์ด ๋  ๊ฒ์ด๋ค.

ํ์ฌ ๊ณ ์์ด๋ง ๋ฒ์ญ๊ธฐ์ ๋ฒ ํ๋ฒ์ ์ด ๋์๋ค. ๊ทธ๋ฌ๋ ์ด ๋ฒ ํ๋ฒ์ ์ ์์  ์๋ง์ง์ฐฝ์ด๋ค. ๋ฒ ํ๋ฒ์ ์ ๋ฒ์ญ๊ธฐ๋ ๋ฌธ์์ด์ ์ฃผ๋ฉด ๊ทธ ์ค์์ ์ต๋ N๊ฐ์ ์ข๋ฅ์ ์ํ๋ฒณ์ ๊ฐ์ง ์ฐ์๋ ๋ฌธ์์ด๋ฐ์ ์ธ์ํ์ง ๋ชปํ๋ค. ๊ต์ฅํ ๋ณ๋ก์ง๋ง ๊ทธ๋๋ง ์ด๊ฒ ์ต์ ์ด๋ผ๊ณ  ์ฌ๋๋ค์ ์๊ฐํ๋ค. ๊ทธ๋ฆฌ๊ณ  ๋ฌธ์์ด์ด ์ฃผ์ด์ก์ ๋ ์ด ๋ฒ์ญ๊ธฐ๊ฐ ์ธ์ํ  ์ ์๋ ์ต๋ ๋ฌธ์์ด์ ๊ธธ์ด๋ ์ผ๋ง์ธ์ง๊ฐ ๊ถ๊ธํด์ก๋ค.

๊ณ ์์ด์ ์ํตํ  ์ ์๋๋ก ์ฐ๋ฆฌ๋ ํจ๊ป ๋ธ๋ ฅํด๋ณด์.

## ์, ์ถ๋ ฅ

์๋ ฅ
- ์ฒซ์งธ ์ค์๋ ์ธ์ํ  ์ ์๋ ์ํ๋ฒณ์ ์ข๋ฅ์ ์ต๋ ๊ฐ์ N์ด ์๋ ฅ๋๋ค. (1 < N โค 26)
- ๋์งธ ์ค์๋ ๋ฌธ์์ด์ด ์ฃผ์ด์ง๋ค. (1 โค ๋ฌธ์์ด์ ๊ธธ์ด โค 100,000) ๋จ, ๋ฌธ์์ด์๋ ์ํ๋ฒณ ์๋ฌธ์๋ง์ด ํฌํจ๋๋ค.

์ถ๋ ฅ
- ์ฒซ์งธ ์ค์ ๋ฒ์ญ๊ธฐ๊ฐ ์ธ์ํ  ์ ์๋ ๋ฌธ์์ด์ ์ต๋๊ธธ์ด๋ฅผ ์ถ๋ ฅํ๋ค.

### ๐ **Logic**

```java
while(left <= right) {
    // ๋ฒ์ ๋ฒ์ด๋๋ฉด ์ข๋ฃ, ๊ธฐ๋ณธ์ ์ผ๋ก right๊ฐ ๋จผ์  ์์ง์
    if (right >= str.length()) break;

    char rightCh = str.charAt(right);

    if ((left != right || right == 0) && prev == left)
        wordIndexMap.put(rightCh, wordIndexMap.getOrDefault(rightCh, 0) + 1);

    // ์์ง N๊ฐ ์ดํ์ธ ๊ฒฝ์ฐ, ๊ณ์ length๋ฅผ ๋๋ฆผ
    if (wordIndexMap.size() <= N) {
        maxLength = Math.max(maxLength, right - left + 1);
        right++;
        prev = left;
    } else {
        // N๊ฐ๊ฐ ์ฑ์์ ธ ๊ธฐ์กด์ ์ข๋ฅ๋ฅผ ํ๋ ์ ์ธํ๋ ๊ฒฝ์ฐ
        char leftCh = str.charAt(left);
        int num = wordIndexMap.get(leftCh) - 1;
        if(num == 0)
            wordIndexMap.remove(leftCh);
        else
            wordIndexMap.put(leftCh, num);
        left++;
    }
}
```

- `Map` ์ผ๋ก ์ํ๋ฒณ ์ข๋ฅ์ ๋น๋ ์๋ฅผ ์ ์ฅํ๋ค.
- `Map` ์ด `N` size๊ฐ ๋ ๊ฒฝ์ฐ์ ๊ทธ๋ ์ง ์์ ๊ฒฝ์ฐ๋ก ๋๋ , `right` ๋ฅผ ๋๋ฆฌ๋ฉด์ ๊ธธ์ด๋ฅผ ์ฆ๊ฐ์ํค๊ฑฐ๋ `Map` ์์ ๊ธฐ์กด ์ํ๋ฒณ ํ๋๋ฅผ ์ง์ด๋ค.
  - ์ด๋, `left` ์ ์์นํ ๋ฌธ์์ด์ ๋ํด `Map` ์์ ์กฐํํด๋ณด๊ณ , `left` ๋ฅผ ์ฆ๊ฐ์ํจ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.HashMap;
    import java.util.HashSet;
    import java.util.Map;
    import java.util.Set;

    class Cat {
        int maxLength = 0;
        public Cat() {}

        public void translate(int N, String str) {
            Map<Character, Integer> wordIndexMap = new HashMap<>();
            int left = 0;
            int right = 0;
            int prev = left;

            while(left <= right) {
                // ๋ฒ์ ๋ฒ์ด๋๋ฉด ์ข๋ฃ, ๊ธฐ๋ณธ์ ์ผ๋ก right๊ฐ ๋จผ์  ์์ง์
                if (right >= str.length()) break;

                char rightCh = str.charAt(right);

                if ((left != right || right == 0) && prev == left)
                    wordIndexMap.put(rightCh, wordIndexMap.getOrDefault(rightCh, 0) + 1);

                // ์์ง N๊ฐ ์ดํ์ธ ๊ฒฝ์ฐ, ๊ณ์ length๋ฅผ ๋๋ฆผ
                if (wordIndexMap.size() <= N) {
                    maxLength = Math.max(maxLength, right - left + 1);
                    right++;
                    prev = left;
                } else {
                    // N๊ฐ๊ฐ ์ฑ์์ ธ ๊ธฐ์กด์ ์ข๋ฅ๋ฅผ ํ๋ ์ ์ธํ๋ ๊ฒฝ์ฐ
                    char leftCh = str.charAt(left);
                    int num = wordIndexMap.get(leftCh) - 1;
                    if(num == 0)
                        wordIndexMap.remove(leftCh);
                    else
                        wordIndexMap.put(leftCh, num);
                    left++;
                }
            }
        }

        public int getMaxLength() {
            return maxLength;
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int N = Integer.parseInt(br.readLine());
            String str = br.readLine();

            Cat cat = new Cat();

            cat.translate(N, str);

            System.out.println(cat.getMaxLength());
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ํฌ ํฌ์ธํฐ ์๊ณ ๋ฆฌ์ฆ์ ์๊ฒ ๋์ด ์์ด๋์ด๋ ์ฝ๊ฒ ์ก์ ์ ์์์ผ๋ ๊ตฌํ์์ ์กฐ๊ธ ๋งํ๋ค.
- `right` ๋ฅผ ๋๋ฆฌ๋ฉด์ `prev` ๋ฅผ ํ์ธํด์ฃผ๋ ๊ณผ์ ์ด ํ์ํ๋ค.

### ๐ ์ถ์ฒ
- Baekjoon : https://www.acmicpc.net/problem/16472
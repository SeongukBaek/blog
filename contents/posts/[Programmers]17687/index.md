---
title: "👩‍💻 17687. n진수 게임"
description: "알고리즘 문제 풀기"
date: 2022-05-27
update: 2022-05-27
tags:
  - 문자열
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - n진수 게임](https://programmers.co.kr/learn/courses/30/lessons/17687)

### 📍 **Logic**

```java
while (idx != t) {
    String strNum = Integer.toString(num, n);

    for (int i = 0; i < strNum.length() && idx != t; i++) {
        if (order == p) answer[idx++] = String.valueOf(strNum.charAt(i)).toUpperCase();
        order++;
        if (order == m + 1) order = 1;
    }
    num++;
}
```
- `strNum` 은 0부터 1씩 증가하는 수를 주어진 `n` 진법에 따라 변환한 문자열이다.
- 해당 문자열의 각 단어를 탐색하는데, 이때 `order` 가 `p` 와 동일하다면, 즉 튜브의 순서가 되었다면 해당 단어를 `answer` 에 추가한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

    import java.util.*;

    class Solution {
        public String solution(int n, int t, int m, int p) {
            String[] answer = new String[t];
            int num = 0;
            int idx = 0;
            int order = 1;

            while (idx != t) {
                String strNum = Integer.toString(num, n);

                for (int i = 0; i < strNum.length() && idx != t; i++) {
                    if (order == p) answer[idx++] = String.valueOf(strNum.charAt(i)).toUpperCase();
                    order++;
                    if (order == m + 1) order = 1;
                }
                num++;
            }
            
            return String.join("", answer);
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 간단한 문제였다.
- 처음에는 n진수를 일일이 구하는 방법을 구현했는데, `Integer.toString(int n, int radix)` 메소드로 쉽게 n진수를 구할 수 있어 이를 적용했다.
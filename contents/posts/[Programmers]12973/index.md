---
title: "👩‍💻 12973. 짝지어 제거하기"
description: "알고리즘 문제 풀기"
date: 2022-07-24
update: 2022-07-24
tags:
  - 스택
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 짝지어 제거하기](https://programmers.co.kr/learn/courses/30/lessons/12973)

### 📍 **Logic**

```java
for (int i = 0; i < len; i++) {
    char ch = s.charAt(i);
    char stackCh = ' ';
    
    if (!stack.isEmpty()) stackCh = stack.peek();
    
    if (ch == stackCh) stack.pop();
    else stack.push(ch);
}
```
- 같은 문자를 만날 떄까지 스택에 문자를 넣는다.
- 같은 문자가 나오면 pop하고 그렇지 않으면 stack에 남기 때문에, 최종적으로 스택이 비어있지 않다면 짝지어 제거할 수 없다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
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

### ✏️ **Review**
- 처음에는 정규표현식으로 같은 문자가 2번 반복될 때, 이를 제거한다. 이를 반복하다가 최종적으로는 문자열의 길이가 0이 되는지에 따라 반환하는 방식으로 구현했다.
  - 하지만 몇몇 테케에서 시간초과가 발생했다.
- 문득 전에 문자열 폭발이라는 문제를 풀다가 못 풀었던 기억이 났는데 그 때 스택을 사용해야 했다는 점이 떠올랐다.
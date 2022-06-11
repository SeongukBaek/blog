---
title: "👩‍💻 60058. 괄호 변환"
description: "알고리즘 문제 풀기"
date: 2022-06-11
update: 2022-06-11
tags:
  - 문자열
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 괄호 변환](https://programmers.co.kr/learn/courses/30/lessons/60058)

### 📍 **Logic**

```java
private String recursive(String p) {
    // 빈 문자열인 경우 반환
    if (Objects.equals(p, "")) return p;
    
    // u와 v로 분리
    String[] uv = splitString(p);
    String u = uv[0];
    String v = uv[1];
    
    // u가 올바르다면, v에 대해 recurvie()한 결과를 붙여 반환
    if (isProper(u)) return u + recursive(v);
    
    // u가 올바르지 않은 경우
    StringBuilder sb = new StringBuilder("(");
    sb.append(recursive(v)).append(")").append(reverseBracket(u.substring(1, u.length() - 1)));
    return sb.toString();
}
```

- 주어진 "균형잡힌 괄호 문자열"을 "올바른 괄호 문자열"로 변환하는 함수

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        public String solution(String p) {
            // 이미 올바른 경우 반환
            if (isProper(p)) return p;
            
            // 올바르지 않은 경우
            return recursive(p);
        }
        
        private String recursive(String p) {
            // 빈 문자열인 경우 반환
            if (Objects.equals(p, "")) return p;
            
            // u와 v로 분리
            String[] uv = splitString(p);
            String u = uv[0];
            String v = uv[1];
            
            // u가 올바르다면, v에 대해 recurvie()한 결과를 붙여 반환
            if (isProper(u)) return u + recursive(v);
            
            // u가 올바르지 않은 경우
            StringBuilder sb = new StringBuilder("(");
            sb.append(recursive(v)).append(")").append(reverseBracket(u.substring(1, u.length() - 1)));
            return sb.toString();
        }
        
        // 올바른 괄호 문자열인지 확인하는 함수, Stack 사용
        private boolean isProper(String p) {
            Stack<Character> stack = new Stack<>();
            int idx = 0;
            
            while (idx < p.length()) {
                char ch = p.charAt(idx);
                if (ch == '(')
                    stack.push(ch);
                else
                    if (stack.size() > 0)
                        stack.pop(); 
                
                idx++;
            }
            
            return stack.isEmpty();
        }
        
        // 분리하는 함수, (의 개수와 )의 개수가 같은 경우까지가 u, 나머지는 v
        private String[] splitString(String p) {
            String u = "";
            String v = "";
            int lcount = 0;
            int rcount = 0;
            int idx = 0;
            
            while(idx < p.length()) {
                if (p.charAt(idx) == '(') lcount++;
                else rcount++;
                idx++;
                
                if (lcount == rcount) {
                    u = p.substring(0, idx);
                    v = p.substring(idx);
                    break;
                }
            }
            
            return new String[] {u, v};
        }
        
        // 주어진 문자열의 첫번째와 마지막 문자를 제거하고, 나머지 문자를 뒤집는 함수
        private String reverseBracket(String str) {
            StringBuilder sb = new StringBuilder();
            
            for (int i = 0; i < str.length(); i++)
                sb.append(str.charAt(i) == '(' ? ")" : "(");
            
            return sb.toString();
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 하라는 대로만 구현하면 쉽게 풀리는 문제!
- 어떤 함수를 필요로 하는지 나누어 생각하고 구현해보는 연습하기에 좋은 문제였다.
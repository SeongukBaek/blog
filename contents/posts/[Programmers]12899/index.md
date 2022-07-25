---
title: "👩‍💻 12899. 124 나라의 숫자"
description: "알고리즘 문제 풀기"
date: 2022-07-24
update: 2022-07-24
tags:
  - DP
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 124 나라의 숫자](https://programmers.co.kr/learn/courses/30/lessons/12899)

### 📍 **Logic**

```java
while (n > 0) {
    int remain = n % 3;
    
    if (remain == 0) remain = 4;
    sb.append(remain);
    
    n = (n - 1) / 3;
}
```
- n이 자연수인 경우만, 나머지 연산으로 맨 끝자리 숫자를 계산하여 124 나라의 숫자로 변환해나간다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	class Solution {
        public String solution(int n) {
            StringBuilder sb = new StringBuilder();
            
            while (n > 0) {
                int remain = n % 3;
                
                if (remain == 0) remain = 4;
                sb.append(remain);
                
                n = (n - 1) / 3;
            }
            
            return sb.reverse().toString();
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 아이디어는 쉽게 생각했으나, 처음에는 **Bottom Up** 방식으로 배열에 메모이제이션을 수행해서 진행했다. 
  - 효율성 테스트에서 터져 아이디어가 틀린 건가 싶어서 게시판을 보니 **Top Down** 방식으로 하면 바로 해결이었다.
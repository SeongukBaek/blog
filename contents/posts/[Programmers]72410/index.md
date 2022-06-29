---
title: "👩‍💻 72410. 신규 아이디 추천"
description: "알고리즘 문제 풀기"
date: 2022-06-29
update: 2022-06-29
tags:
  - 문자열
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 신규 아이디 추천](https://programmers.co.kr/learn/courses/30/lessons/72410)

### 📍 **Logic**

```java
private static String replaceStart(String newId, int idx) {
    if (newId.charAt(idx) == '.') return newId.substring(idx + 1);
    return newId;
}

private static String replaceEnd(String newId, int idx) {
    if (idx < 0) return newId;
    if (newId.charAt(idx) == '.') return newId.substring(0, idx);
    return newId;
}
```
- 메소드화하여 역할을 분리했다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	class Solution {
        public String solution(String new_id) {
            StringBuilder newId = new StringBuilder(new_id);

            // 1단계
            newId = new StringBuilder(newId.toString().toLowerCase());

            // newId
            newId = new StringBuilder(newId.toString().replaceAll("[^a-z0-9-_.]", ""));

            // 3단계
            newId = new StringBuilder(newId.toString().replaceAll("[.]+", "."));

            // 4단계
            newId = new StringBuilder(replaceStart(newId.toString(), 0));
            newId = new StringBuilder(replaceEnd(newId.toString(), newId.length() - 1));

            // 5단계
            if ("".equals(newId.toString())) newId = new StringBuilder("a");

            // 6단계
            if (newId.length() > 15) {
                newId = new StringBuilder(newId.substring(0, 15));
                newId = new StringBuilder(replaceEnd(newId.toString(), newId.length() - 1));
            }

            // 7단계
            String str = String.valueOf(newId.charAt(newId.length() - 1));
            while(newId.length() < 3)
                newId.append(str);
            
            return newId.toString();
        }
        
        private static String replaceStart(String newId, int idx) {
            if (newId.charAt(idx) == '.') return newId.substring(idx + 1);
            return newId;
        }

        private static String replaceEnd(String newId, int idx) {
            if (idx < 0) return newId;
            if (newId.charAt(idx) == '.') return newId.substring(0, idx);
            return newId;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 매우 쉬운 문제였다!

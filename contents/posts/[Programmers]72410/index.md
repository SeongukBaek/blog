---
title: "π©βπ» 72410. μ κ· μμ΄λ μΆμ²"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-06-29
update: 2022-06-29
tags:
  - λ¬Έμμ΄
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - μ κ· μμ΄λ μΆμ²](https://programmers.co.kr/learn/courses/30/lessons/72410)

### π **Logic**

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
- λ©μλννμ¬ μ­ν μ λΆλ¦¬νλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	class Solution {
        public String solution(String new_id) {
            StringBuilder newId = new StringBuilder(new_id);

            // 1λ¨κ³
            newId = new StringBuilder(newId.toString().toLowerCase());

            // newId
            newId = new StringBuilder(newId.toString().replaceAll("[^a-z0-9-_.]", ""));

            // 3λ¨κ³
            newId = new StringBuilder(newId.toString().replaceAll("[.]+", "."));

            // 4λ¨κ³
            newId = new StringBuilder(replaceStart(newId.toString(), 0));
            newId = new StringBuilder(replaceEnd(newId.toString(), newId.length() - 1));

            // 5λ¨κ³
            if ("".equals(newId.toString())) newId = new StringBuilder("a");

            // 6λ¨κ³
            if (newId.length() > 15) {
                newId = new StringBuilder(newId.substring(0, 15));
                newId = new StringBuilder(replaceEnd(newId.toString(), newId.length() - 1));
            }

            // 7λ¨κ³
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

### βοΈ **Review**
- λ§€μ° μ¬μ΄ λ¬Έμ μλ€!

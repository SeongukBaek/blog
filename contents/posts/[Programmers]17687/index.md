---
title: "π©βπ» 17687. nμ§μ κ²μ"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-05-27
update: 2022-05-27
tags:
  - λ¬Έμμ΄
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - nμ§μ κ²μ](https://programmers.co.kr/learn/courses/30/lessons/17687)

### π **Logic**

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
- `strNum` μ 0λΆν° 1μ© μ¦κ°νλ μλ₯Ό μ£Όμ΄μ§ `n` μ§λ²μ λ°λΌ λ³νν λ¬Έμμ΄μ΄λ€.
- ν΄λΉ λ¬Έμμ΄μ κ° λ¨μ΄λ₯Ό νμνλλ°, μ΄λ `order` κ° `p` μ λμΌνλ€λ©΄, μ¦ νλΈμ μμκ° λμλ€λ©΄ ν΄λΉ λ¨μ΄λ₯Ό `answer` μ μΆκ°νλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
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

### βοΈ **Review**
- κ°λ¨ν λ¬Έμ μλ€.
- μ²μμλ nμ§μλ₯Ό μΌμΌμ΄ κ΅¬νλ λ°©λ²μ κ΅¬ννλλ°, `Integer.toString(int n, int radix)` λ©μλλ‘ μ½κ² nμ§μλ₯Ό κ΅¬ν  μ μμ΄ μ΄λ₯Ό μ μ©νλ€.
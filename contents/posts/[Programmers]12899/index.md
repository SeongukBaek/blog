---
title: "π©βπ» 12899. 124 λλΌμ μ«μ"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-07-24
update: 2022-07-24
tags:
  - DP
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - 124 λλΌμ μ«μ](https://programmers.co.kr/learn/courses/30/lessons/12899)

### π **Logic**

```java
while (n > 0) {
    int remain = n % 3;
    
    if (remain == 0) remain = 4;
    sb.append(remain);
    
    n = (n - 1) / 3;
}
```
- nμ΄ μμ°μμΈ κ²½μ°λ§, λλ¨Έμ§ μ°μ°μΌλ‘ λ§¨ λμλ¦¬ μ«μλ₯Ό κ³μ°νμ¬ 124 λλΌμ μ«μλ‘ λ³νν΄λκ°λ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
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

### βοΈ **Review**
- μμ΄λμ΄λ μ½κ² μκ°νμΌλ, μ²μμλ **Bottom Up** λ°©μμΌλ‘ λ°°μ΄μ λ©λͺ¨μ΄μ μ΄μμ μνν΄μ μ§ννλ€. 
  - ν¨μ¨μ± νμ€νΈμμ ν°μ Έ μμ΄λμ΄κ° νλ¦° κ±΄κ° μΆμ΄μ κ²μνμ λ³΄λ **Top Down** λ°©μμΌλ‘ νλ©΄ λ°λ‘ ν΄κ²°μ΄μλ€.
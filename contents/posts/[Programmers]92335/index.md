---
title: "π©βπ» 92335. kμ§μμμ μμ κ°μ κ΅¬νκΈ°"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-07-07
update: 2022-07-07
tags:
  - μμ κ΅¬νκΈ°
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - kμ§μμμ μμ κ°μ κ΅¬νκΈ°](https://programmers.co.kr/learn/courses/30/lessons/92335)

### π **Logic**

```java
private static boolean isPrime(long n) {
    // μμλ 1κ³Ό μκΈ° μμ λ§μΌλ‘ λλμ΄μ§λ μ
    // λ°λΌμ 2λΆν° λ£¨νΈ nκΉμ§μ μλ‘ λλμ΄λ³΄κ³ , λλ μ§λ€λ©΄ μμκ° μλλ€.
    // (int) Math.sqrt(n) : μμμ  λ²λ¦Ό
    for (int i = 2; i <= (int) Math.sqrt(n); i++)
        if (n % i == 0)
            return false;

    return true;
}
```

- μμμΈμ§ μλμ§ νλ³νλ ν¨μ

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	class Solution {
        public int solution(int n, int k) {
            int answer = 0;
            
            String[] nums = convertToK(n, k).split("0");
            
            for (String num : nums) {
                if (num.equals("") || num.equals("1")) continue;
                if (isPrime(Long.parseLong(num))) answer++;
            }
            
            return answer;
        }
        
        private static String convertToK(int num, int k) {
            StringBuilder sb = new StringBuilder();

            while(num > 0) {
                sb.append(num % k);
                num /= k;
            }

            return sb.reverse().toString();
        }

        private static boolean isPrime(long n) {
            // μμλ 1κ³Ό μκΈ° μμ λ§μΌλ‘ λλμ΄μ§λ μ
            // λ°λΌμ 2λΆν° λ£¨νΈ nκΉμ§μ μλ‘ λλμ΄λ³΄κ³ , λλ μ§λ€λ©΄ μμκ° μλλ€.
            // (int) Math.sqrt(n) : μμμ  λ²λ¦Ό
            for (int i = 2; i <= (int) Math.sqrt(n); i++)
                if (n % i == 0)
                    return false;

            return true;
        }
    }
  	</div>
</details>

### βοΈ **Review**
- μμλ₯Ό κ΅¬νλ μκ³ λ¦¬μ¦μ΄ μ€μνλ€.
- λ­κ° 0μ λν΄μ λ§ μ‘°κ±΄ μ€λͺμ λμ΄λκΈΈλ .. μ 0μΌλ‘ `split` νλ©΄ λκ² κ΅¬λ μΆμλ€.
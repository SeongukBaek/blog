---
title: "π©βπ» 64062. μ§κ²λ€λ¦¬ κ±΄λκΈ°"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-05-12
update: 2022-05-12
tags:
  - μ΄λΆ νμ
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - μ§κ²λ€λ¦¬ κ±΄λκΈ°](https://programmers.co.kr/learn/courses/30/lessons/64062)

### π **Logic**

```java
public int crossBridge(int[] stones, int k) {
    int friends = 0;
    int min = Integer.MAX_VALUE;
    int max = 0;

    // minκ³Ό max μ¬μ΄μ κ±΄λ μ μλ μ΅λ μΈμ μκ° μμ
    for (int stone : stones) {
        if (stone < min) min = stone;
        if (stone > max) max = stone;
    }

    while (min <= max) {
        int mid = (min + max)/2;

        // κ±΄λ μ μλ€λ©΄, minμ 1 μ¦κ°μν€κ³  λ°λ³΅
        if (canCrossOver(stones, k, mid)) {
            min = mid + 1;
            friends = mid;
        } else {
            max = mid - 1;
        }
    }

    return friends;
}
```
- `stones` μμ μ΅μκ°, μ΅λκ°μ μ°Ύμ μ΄λΆνμ
- `canCrossOver()` λ‘ `mid` λͺμ΄ κ±΄λ μ μλμ§ νμΈ
    - κ±΄λ μ μλ€λ©΄ `min` μ update
    - κ±΄λ μ μλ€λ©΄ `max` λ₯Ό update

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	import java.util.*;

    class StoneBridge {
        public StoneBridge() {
        }

        public int crossBridge(int[] stones, int k) {
            int friends = 0;
            int min = Integer.MAX_VALUE;
            int max = 0;

            // minκ³Ό max μ¬μ΄μ κ±΄λ μ μλ μ΅λ μΈμ μκ° μμ
            for (int stone : stones) {
                if (stone < min) min = stone;
                if (stone > max) max = stone;
            }

            while (min <= max) {
                int mid = (min + max)/2;

                // κ±΄λ μ μλ€λ©΄, minμ 1 μ¦κ°μν€κ³  λ°λ³΅
                if (canCrossOver(stones, k, mid)) {
                    min = mid + 1;
                    friends = mid;
                } else {
                    max = mid - 1;
                }
            }

            return friends;
        }

        private boolean canCrossOver(int[] stones, int k, int n) {
            int cantOver = 0;

            for (int stone : stones) {
                // κ±΄λ μ μλ λ
                if (stone < n) {
                    cantOver++;
                } else cantOver = 0;

                // κ±΄λ μ μλ λλ€λ¦¬κ° kκ° μ°μμ΄λΌλ©΄ κ±΄λ μ μμ!
                if (cantOver == k) return false;
            }

            return true;
        }
    }

    class Solution {
        public int solution(int[] stones, int k) {
            StoneBridge sb = new StoneBridge();
            
            return sb.crossBridge(stones, k);
        }
    }
  	</div>
</details>

### βοΈ **Review**
- 0μ΄ `K` κ° μ°μμ΄λΌλ©΄, λ μ΄μ κ±΄λ μ μλ€λ ν° μ‘°κ±΄μ μ½κ² μ μ μμμΌλ, ν¨μ¨μ± νμ€νΈκ° μλ κ²μΌλ‘ λ³΄μμ λ, μ΄λ€ μκ³ λ¦¬μ¦μ μ¬μ©ν΄μΌ νλμ§ κ°μ΄ μ€μ§ μμλ€.
- κ²μνμμ μ΄λΆ νμμ μ¬μ©νλ€λ κ²μ λ³΄μκ³ , μ½λλ₯Ό λκ° μ°Έκ³ νμλ€. λ³΄κ³  λλ μ μ΄λΆ νμμ μ¬μ©ν΄μΌ νλμ§λ₯Ό μ΄ν΄ν  μ μμλ€.
---
title: "π©βπ» 42891. λ¬΄μ§μ λ¨Ήλ°© λΌμ΄λΈ"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-06-04
update: 2022-06-04
tags:
  - μ°μ μμ ν
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - λ¬΄μ§μ λ¨Ήλ°© λΌμ΄λΈ](https://programmers.co.kr/learn/courses/30/lessons/42891)

### π **Logic**

```java
while (totalTime + ((pq.peek().time - prevTime) * len) <= k) {
    int now = pq.poll().time;
    totalTime += (now - prevTime) * len;
    len -= 1;
    prevTime = now;
}
```

- νμ¬ μμμ λ¨Ήμ μ μλ€λ©΄, `Queue` μμ μ μΈνκ³  μ μ²΄ μμ λ¨Ήμ μκ°μ μ¦κ°μν¨λ€.
- νμ¬ μμμ λ¨Ήμ μ μλ κ²½μ°κΉμ§ μ΄λ₯Ό λ°λ³΅νκ³ , μ΄ν `totalTime` κ³Ό λ¨μ μμ κ°μ `len` μ μ΄μ©νμ¬ λ°©μ‘ μ€λ¨ μ΄ν λ¨Ήμ μμμ μ°Ύλλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	import java.util.*;

    class Food implements Comparable<Food> {
        int time;
        int idx;
        
        public Food(int time, int idx) {
            this.time = time;
            this.idx = idx;
        }
        
        @Override
        public int compareTo(Food f) {
            return this.time - f.time;
        }
    }

    class Solution {
        public int solution(int[] food_times, long k) {
            Queue<Food> pq = new PriorityQueue<>();
            // λͺ¨λ  μμμ λ¨Ήλλ° κ±Έλ¦¬λ μ΄ μκ°
            long foodSum = 0;
            int len = food_times.length;
            
            for (int i = 0; i < len; i++) {
                pq.add(new Food(food_times[i], i));
                foodSum += food_times[i];
            }
        
            // μμμ λ€ μ­μ·¨νλλ° μμ§ Kμ΄κ° λμ§ μμλ€λ©΄ -1 λ°ν
            if (foodSum <= k) return -1;
            
            // λ¨Ήλλ° μ¬μ©ν μκ°
            long totalTime = 0;
            // μ§μ μ λ€ λ¨Ήμ μμ μκ°
            long prevTime = 0;
            
            // νμ¬ μμμ λ¨Ήμ μ μλ κ²½μ°, totalTimeμ μ¦κ°
            while (totalTime + ((pq.peek().time - prevTime) * len) <= k) {
                int now = pq.poll().time;
                totalTime += (now - prevTime) * len;
                len -= 1;
                prevTime = now;
            }
            
            ArrayList<Food> remainFoods = new ArrayList<>();
            
            while (!pq.isEmpty()) remainFoods.add(pq.poll());
            
            // idxλ₯Ό κΈ°μ€μΌλ‘ μ€λ¦μ°¨μ μ λ ¬
            remainFoods.sort(Comparator.comparingInt(o -> o.idx));
            
            return remainFoods.get((int) ((k - totalTime) % len)).idx + 1;
        }
    }
  	</div>
</details>

### βοΈ **Review**
- μ²μμ `K` μ μμ κ°μλ₯Ό μ΄μ©ν΄ κ° μμμ΄ `K` μ΄ μ΄ν λ¨μμλ μμ κ³μ°νμ¬ λͺ λ²μ§Έ μμμ λ¨Ήμμ§ κ²°μ νλ λ°©μμ ννλλ°, μλͺ»λ μ κ·Όλ²μ΄μλ€.
- μ°Έκ³ λ₯Ό νλ "μμλμ΄ μ μ κ²μ λ€ λ¨Ήκ² λλ€λ©΄ μ΄μ°¨νΌ κ·Έ λ³΄λ€ μμλμ΄ ν° κ²λ€λ μ΄λ―Έ λ€ λ¨Ήμ μμλ§νΌ λ¨Ήκ² λλ μ "μ μ΄μ©ν μ κ·Όλ²μ μ¬μ©νμλ€. 
  - μ΄ λ§μ΄ μ μ΄ν΄λμ§ μμ μκ°μ΄ κ±Έλ Έλ€.
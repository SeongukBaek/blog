---
title: "π©βπ» 67256. ν€ν¨λ λλ₯΄κΈ°"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-04-24
update: 2022-04-24
tags:
  - μν
series: "π©βπ» Programmers"
---

## λ¬Έμ 
μ€λ§νΈν° μ ν ν€ν¨λμ κ° μΉΈμ μ«μλ€μ΄ μ ν μμ΅λλ€.

μ΄ μ ν ν€ν¨λμμ μΌμκ³Ό μ€λ₯Έμμ μμ§μκ°λ½λ§μ μ΄μ©ν΄μ μ«μλ§μ μλ ₯νλ €κ³  ν©λλ€.
λ§¨ μ²μ μΌμ μμ§μκ°λ½μ * ν€ν¨λμ μ€λ₯Έμ μμ§μκ°λ½μ # ν€ν¨λ μμΉμμ μμνλ©°, μμ§μκ°λ½μ μ¬μ©νλ κ·μΉμ λ€μκ³Ό κ°μ΅λλ€.

- μμ§μκ°λ½μ μνμ’μ° 4κ°μ§ λ°©ν₯μΌλ‘λ§ μ΄λν  μ μμΌλ©° ν€ν¨λ μ΄λ ν μΉΈμ κ±°λ¦¬λ‘ 1μ ν΄λΉν©λλ€.
- μΌμͺ½ μ΄μ 3κ°μ μ«μ 1, 4, 7μ μλ ₯ν  λλ μΌμ μμ§μκ°λ½μ μ¬μ©ν©λλ€.
- μ€λ₯Έμͺ½ μ΄μ 3κ°μ μ«μ 3, 6, 9λ₯Ό μλ ₯ν  λλ μ€λ₯Έμ μμ§μκ°λ½μ μ¬μ©ν©λλ€.
- κ°μ΄λ° μ΄μ 4κ°μ μ«μ 2, 5, 8, 0μ μλ ₯ν  λλ λ μμ§μκ°λ½μ νμ¬ ν€ν¨λμ μμΉμμ λ κ°κΉμ΄ μμ§μκ°λ½μ μ¬μ©ν©λλ€.
  - λ§μ½ λ μμ§μκ°λ½μ κ±°λ¦¬κ° κ°λ€λ©΄, μ€λ₯Έμμ‘μ΄λ μ€λ₯Έμ μμ§μκ°λ½, μΌμμ‘μ΄λ μΌμ μμ§μκ°λ½μ μ¬μ©ν©λλ€.

μμλλ‘ λλ₯Ό λ²νΈκ° λ΄κΈ΄ λ°°μ΄ numbers, μΌμμ‘μ΄μΈμ§ μ€λ₯Έμμ‘μ΄μΈμ§λ₯Ό λνλ΄λ λ¬Έμμ΄ handκ° λ§€κ°λ³μλ‘ μ£Όμ΄μ§ λ, κ° λ²νΈλ₯Ό λλ₯Έ μμ§μκ°λ½μ΄ μΌμμΈμ§ μ€λ₯ΈμμΈμ§λ₯Ό λνλ΄λ μ°μλ λ¬Έμμ΄ ννλ‘ return νλλ‘ solution ν¨μλ₯Ό μμ±ν΄μ£ΌμΈμ.

### μ νμ¬ν­
- numbers λ°°μ΄μ ν¬κΈ°λ 1 μ΄μ 1,000 μ΄νμλλ€.
- numbers λ°°μ΄ μμμ κ°μ 0 μ΄μ 9 μ΄νμΈ μ μμλλ€.
- handλ "left" λλ "right" μλλ€.
- "left"λ μΌμμ‘μ΄, "right"λ μ€λ₯Έμμ‘μ΄λ₯Ό μλ―Έν©λλ€.
- μΌμ μμ§μκ°λ½μ μ¬μ©ν κ²½μ°λ L, μ€λ₯Έμ μμ§μκ°λ½μ μ¬μ©ν κ²½μ°λ Rμ μμλλ‘ μ΄μ΄λΆμ¬ λ¬Έμμ΄ ννλ‘ return ν΄μ£ΌμΈμ.

### μμΆλ ₯ μ
|numbers|hand|return|
|:---:|:---:|:---:|
|[1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5]|"right"|"LRLLLRLLRRL"|
|[7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2]|"left"|"LRLLRRLLLRR"|
|[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]|"right"|"LLRLLRLLRL"|

### π **Logic**

```java
int leftDist = Math.abs(number.x - left.x) + Math.abs(number.y - left.y);
int rightDist = Math.abs(number.x - right.x) + Math.abs(number.y - right.y);
```

- κ° μμ§μκ°λ½κ³Ό λλ₯Ό λ²νΈμ κ±°λ¦¬λ₯Ό κ³μ°νλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	import java.util.*;

    class Pair {
        int x;
        int y;
        
        public Pair(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    class Solution {
        // κ° μμ§ μμΉ
        Pair left = new Pair(3, 0);
        Pair right = new Pair(3, 2);
        // λλ₯Ό λ²νΈ μμΉ
        Pair number = new Pair(0, 0);
        
        public String solution(int[] numbers, String hand) {
            StringBuilder answer = new StringBuilder();
            
            for (int n : numbers) {
                if (n == 1 || n == 4 || n == 7) {
                    answer.append("L");
                    left.x = n/3;
                    left.y = 0;
                }
                else if (n == 3 || n == 6 || n == 9) {
                    answer.append("R");
                    right.x = n/3 - 1;
                    right.y = 2;
                }
                else answer.append(thumb(hand, n));
            }
            
            return answer.toString();
        }
        
        // 2, 5, 8, 0μ λν΄μλ κ±°λ¦¬ κ³μ°κ³Ό μ‘μ΄ μ λ³΄κ° νμ
        private String thumb(String hand, int n) {
            if (n == 0) n = 11;
            
            // νμ¬ λλ¬μΌ νλ λ²νΈμ μμΉ
            number.x = (n - 1)/3;
            number.y = (n - 1)%3;

            // κ°κΉμ΄ μμ§λ₯Ό μ°ΎκΈ° μν΄ κ±°λ¦¬ κ³μ°
            int leftDist = Math.abs(number.x - left.x) + Math.abs(number.y - left.y);
            int rightDist = Math.abs(number.x - right.x) + Math.abs(number.y - right.y);
            
            // μ°¨μ΄κ° κ°μ κ²½μ°, μ‘μ΄ μ λ³΄μ λ°λΌ λ°ν
            if (leftDist == rightDist) {
                if (hand.equals("left")) {
                    updateThumb(left);
                    return "L";
                }
                updateThumb(right);
                return "R";
            } else {
                // μ°¨μ΄κ° λ€λ₯Έ κ²½μ°
                if (leftDist < rightDist) {
                    updateThumb(left);
                    return "L";
                }
                updateThumb(right);
                return "R";
            }
        }
        
        private void updateThumb(Pair thumb) {
            thumb.x = number.x;
            thumb.y = number.y;
        }
    }
  	</div>
</details>

### βοΈ **Review**
- μ²μμλ λ¬΄μμ μΌλ‘ κ΅¬ννμΌλ, λ²νΈ κ° κ±°λ¦¬λ₯Ό κ΅¬νλ κΉλν λ°©λ²μ΄ μμ κ² κ°μμ κ³ λ―Όνλ€κ° νΌνκ³ λΌμ€μμ μΈ μ  κ° κ±°λ¦¬ κ΅¬νλ― κ±°λ¦¬λ₯Ό κ΅¬νλ©΄ λ  κ² κ°μ κ΅¬νν΄λ³΄μλ€.
- μ²μμλ 2μ°¨μ λ°°μ΄μ κ° ν€ν¨λ λ²νΈλ€μ μ μ₯ν΄λκ³  μ’νλ₯Ό μ¬μ©ν κΉ νλλ°, μ£Όμ΄μ§ λ²νΈλ‘λΆν° μ’νλ₯Ό λ°λ‘ μ»μ΄λΌ μ μμ κ² κ°μ λ°°μ΄μ μ§μ λ€.

### π μΆμ²
Programmers : https://programmers.co.kr/learn/courses/30/lessons/67256
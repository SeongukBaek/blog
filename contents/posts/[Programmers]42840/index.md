---
title: "π©βπ» 42840. λͺ¨μκ³ μ¬"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-04-15
update: 2022-04-15
tags:
  - μμ  νμ
series: "π©βπ» Programmers"
---

## λ¬Έμ 
μν¬μλ μνμ ν¬κΈ°ν μ¬λμ μ€λ§μλλ€. μν¬μ μΌμΈλ°©μ λͺ¨μκ³ μ¬μ μν λ¬Έμ λ₯Ό μ λΆ μ°μΌλ € ν©λλ€. μν¬μλ 1λ² λ¬Έμ λΆν° λ§μ§λ§ λ¬Έμ κΉμ§ λ€μκ³Ό κ°μ΄ μ°μ΅λλ€.

1λ² μν¬μκ° μ°λ λ°©μ: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
2λ² μν¬μκ° μ°λ λ°©μ: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
3λ² μν¬μκ° μ°λ λ°©μ: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

1λ² λ¬Έμ λΆν° λ§μ§λ§ λ¬Έμ κΉμ§μ μ λ΅μ΄ μμλλ‘ λ€μ λ°°μ΄ answersκ° μ£Όμ΄μ‘μ λ, κ°μ₯ λ§μ λ¬Έμ λ₯Ό λ§ν μ¬λμ΄ λκ΅¬μΈμ§ λ°°μ΄μ λ΄μ return νλλ‘ solution ν¨μλ₯Ό μμ±ν΄μ£ΌμΈμ.

### μ νμ¬ν­
- μνμ μ΅λ 10,000 λ¬Έμ λ‘ κ΅¬μ±λμ΄μμ΅λλ€.
- λ¬Έμ μ μ λ΅μ 1, 2, 3, 4, 5μ€ νλμλλ€.
- κ°μ₯ λμ μ μλ₯Ό λ°μ μ¬λμ΄ μ¬λΏμΌ κ²½μ°, returnνλ κ°μ μ€λ¦μ°¨μ μ λ ¬ν΄μ£ΌμΈμ.

### μμΆλ ₯ μ
|answers|return|
|:---:|:---:|
|[1,2,3,4,5]|[1]|
|[1,3,2,4,2]|[1,2,3]|

### π **Logic**

```java
private int countScore(int[] answers, int[] std) {
    int score = 0;
    for (int i = 0, idx = 0; i < answers.length; i++) {
        if (idx >= std.length)
            idx = idx % std.length;
        if (std[idx++] == answers[i])
            score++;
    }
    return score;
}
```

- μ£Όμ΄μ§ νμμ μ λ΅ λ°°μ΄μ κ°μ§κ³  μ μλ₯Ό λ§€κΈ΄λ€.
- λ€λ§ μ£Όμ΄μ§ μ λ΅ λ°°μ΄μ λ²μλ₯Ό λ²μ΄λλ κ²½μ° (λ¬Έμ  μκ° λ λ§μ κ²½μ°) μ κ·Ό index κ°μ `%` μ μ¬μ©ν΄ λ³κ²½νλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        public int[] solution(int[] answers) {
            
            int[] std1 = {1,2,3,4,5};
            int[] std2 = {2,1,2,3,2,4,2,5};
            int[] std3 = {3,3,1,1,2,2,4,4,5,5};
            
            int[] scores = new int[3];
            
            scores[0] = countScore(answers, std1);
            scores[1] = countScore(answers, std2);
            scores[2] = countScore(answers, std3);
            
            int max = Arrays.stream(scores).max().getAsInt();
            
            ArrayList<Integer> answer = new ArrayList<>();
            
            for (int i = 0; i < 3; i++) {
                if (scores[i] == max)
                    answer.add(i + 1);
            }
            
            return answer.stream().mapToInt(i -> i).toArray();
        }
        
        private int countScore(int[] answers, int[] std) {
            int score = 0;
            for (int i = 0, idx = 0; i < answers.length; i++) {
                if (idx >= std.length) idx = idx % std.length;
                if (std[idx++] == answers[i])
                    score++;
            }
            return score;
        }
    }
  	</div>
</details>

### βοΈ **Review**
- μμ  νμ μκ³ λ¦¬μ¦λ΅κ² λ¨μν λ€ λλ €λ³΄λ©΄ λλ λ¬Έμ μλ€.

### π μΆμ²
Programmers : https://programmers.co.kr/learn/courses/30/lessons/42840
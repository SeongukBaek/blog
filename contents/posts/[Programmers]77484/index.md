---
title: "π©βπ» 77484. λ‘λμ μ΅κ³  μμμ μ΅μ  μμ"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-07-02
update: 2022-07-02
tags:
  - κ΅¬ν
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - λ‘λμ μ΅κ³  μμμ μ΅μ  μμ](https://programmers.co.kr/learn/courses/30/lessons/77484)

### π **Logic**

```java
for (int lotto : lottos) {
    if (lotto == 0) zeroCount++;
    else nums[lotto] = true;
}

for (int win : win_nums)
    if (nums[win]) correctCount++;
```

- μ«μμ λΉμ²¨ μ λ¬΄ νμΈ

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	class Solution {
        public int[] solution(int[] lottos, int[] win_nums) {
            boolean[] nums = new boolean[46];
            int correctCount = 0;
            int zeroCount = 0;
            
            for (int lotto : lottos) {
                if (lotto == 0) zeroCount++;
                else nums[lotto] = true;
            }
            
            for (int win : win_nums)
                if (nums[win]) correctCount++;
            
            int max = getRanking(correctCount + zeroCount);
            int min = getRanking(correctCount);
            
            return new int[]{max, min};
        }
        
        private int getRanking(int count) {
            if (count <= 1) return 6;
            return 7 - count;
        }
    }
  	</div>
</details>

### βοΈ **Review**
- μ¬μ΄ λ¬Έμ 
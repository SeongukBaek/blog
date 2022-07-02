---
title: "👩‍💻 77484. 로또의 최고 순위와 최저 순위"
description: "알고리즘 문제 풀기"
date: 2022-07-02
update: 2022-07-02
tags:
  - 구현
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 로또의 최고 순위와 최저 순위](https://programmers.co.kr/learn/courses/30/lessons/77484)

### 📍 **Logic**

```java
for (int lotto : lottos) {
    if (lotto == 0) zeroCount++;
    else nums[lotto] = true;
}

for (int win : win_nums)
    if (nums[win]) correctCount++;
```

- 숫자의 당첨 유무 확인

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
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

### ✏️ **Review**
- 쉬운 문제
---
title: "👩‍💻 42891. 무지의 먹방 라이브"
description: "알고리즘 문제 풀기"
date: 2022-06-04
update: 2022-06-04
tags:
  - 우선순위 큐
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 무지의 먹방 라이브](https://programmers.co.kr/learn/courses/30/lessons/42891)

### 📍 **Logic**

```java
while (totalTime + ((pq.peek().time - prevTime) * len) <= k) {
    int now = pq.poll().time;
    totalTime += (now - prevTime) * len;
    len -= 1;
    prevTime = now;
}
```

- 현재 음식을 먹을 수 있다면, `Queue` 에서 제외하고 전체 음식 먹은 시간을 증가시킨다.
- 현재 음식을 먹을 수 없는 경우까지 이를 반복하고, 이후 `totalTime` 과 남은 음식 개수 `len` 을 이용하여 방송 중단 이후 먹을 음식을 찾는다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
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
            // 모든 음식을 먹는데 걸리는 총 시간
            long foodSum = 0;
            int len = food_times.length;
            
            for (int i = 0; i < len; i++) {
                pq.add(new Food(food_times[i], i));
                foodSum += food_times[i];
            }
        
            // 음식을 다 섭취했는데 아직 K초가 되지 않았다면 -1 반환
            if (foodSum <= k) return -1;
            
            // 먹는데 사용한 시간
            long totalTime = 0;
            // 직전에 다 먹은 음식 시간
            long prevTime = 0;
            
            // 현재 음식을 먹을 수 있는 경우, totalTime을 증가
            while (totalTime + ((pq.peek().time - prevTime) * len) <= k) {
                int now = pq.poll().time;
                totalTime += (now - prevTime) * len;
                len -= 1;
                prevTime = now;
            }
            
            ArrayList<Food> remainFoods = new ArrayList<>();
            
            while (!pq.isEmpty()) remainFoods.add(pq.poll());
            
            // idx를 기준으로 오름차순 정렬
            remainFoods.sort(Comparator.comparingInt(o -> o.idx));
            
            return remainFoods.get((int) ((k - totalTime) % len)).idx + 1;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 처음엔 `K` 와 음식 개수를 이용해 각 음식이 `K` 초 이후 남아있는 양을 계산하여 몇 번째 음식을 먹을지 결정하는 방식을 택했는데, 잘못된 접근법이었다.
- 참고를 하니 "음식량이 적은 것을 다 먹게 된다면 어차피 그 보다 음식량이 큰 것들도 이미 다 먹은 음식만큼 먹게 되는 점"을 이용한 접근법을 사용했었다. 
  - 이 말이 잘 이해되지 않아 시간이 걸렸다.
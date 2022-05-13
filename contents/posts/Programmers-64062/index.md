---
title: "👩‍💻 64062. 징검다리 건너기"
description: "알고리즘 문제 풀기"
date: 2022-05-12
update: 2022-05-12
tags:
  - 이분 탐색
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 징검다리 건너기](https://programmers.co.kr/learn/courses/30/lessons/64062)

### 📍 **Logic**

```java
public int crossBridge(int[] stones, int k) {
    int friends = 0;
    int min = Integer.MAX_VALUE;
    int max = 0;

    // min과 max 사이에 건널 수 있는 최대 인원 수가 있음
    for (int stone : stones) {
        if (stone < min) min = stone;
        if (stone > max) max = stone;
    }

    while (min <= max) {
        int mid = (min + max)/2;

        // 건널 수 있다면, min을 1 증가시키고 반복
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
- `stones` 에서 최솟값, 최댓값을 찾아 이분탐색
- `canCrossOver()` 로 `mid` 명이 건널 수 있는지 확인
    - 건널 수 있다면 `min` 을 update
    - 건널 수 없다면 `max` 를 update

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class StoneBridge {
        public StoneBridge() {
        }

        public int crossBridge(int[] stones, int k) {
            int friends = 0;
            int min = Integer.MAX_VALUE;
            int max = 0;

            // min과 max 사이에 건널 수 있는 최대 인원 수가 있음
            for (int stone : stones) {
                if (stone < min) min = stone;
                if (stone > max) max = stone;
            }

            while (min <= max) {
                int mid = (min + max)/2;

                // 건널 수 있다면, min을 1 증가시키고 반복
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
                // 건널 수 없는 돌
                if (stone < n) {
                    cantOver++;
                } else cantOver = 0;

                // 건널 수 없는 돌다리가 k개 연속이라면 건널 수 없음!
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

### ✏️ **Review**
- 0이 `K` 개 연속이라면, 더 이상 건널 수 없다는 큰 조건을 쉽게 알 수 있었으나, 효율성 테스트가 있는 것으로 보았을 때, 어떤 알고리즘을 사용해야 하는지 감이 오지 않았다.
- 게시판에서 이분 탐색을 사용한다는 것을 보았고, 코드를 대강 참고하였다. 보고 나니 왜 이분 탐색을 사용해야 하는지를 이해할 수 있었다.
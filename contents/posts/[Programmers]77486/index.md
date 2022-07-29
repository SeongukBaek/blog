---
title: "👩‍💻 77486. 다단계 칫솔 판매"
description: "알고리즘 문제 풀기"
date: 2022-07-29
update: 2022-07-29
tags:
  - Disjoint set
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 다단계 칫솔 판매](https://programmers.co.kr/learn/courses/30/lessons/77486)

### 📍 **Logic**

```java
private void updateSellerMoney(String p, int money) {
    while(true) {
        if (p.equals("-") || money == 0) break;
        
        int dist = money / 10;
        sellerMoney.put(p, money - dist + sellerMoney.getOrDefault(p, 0));     
        p = parent.get(p);
        money = dist;
    }
}
```

- 자기 자신의 부모를 찾아 이익을 분배하는 함수
- 최종 보스를 만나거나, 더 이상 분배할 이익이 없을 때까지 수행한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        private Map<String, Integer> sellerMoney = new HashMap<>();
        private Map<String, String> parent = new HashMap<>();
        private int len;

        public int[] solution(String[] enroll, String[] referral, String[] seller, int[] amount) {
            len = enroll.length;
            initParent(enroll, referral);
            
            for (int i = 0; i < seller.length; i++)
                updateSellerMoney(seller[i], 100 * amount[i]);

            int[] answer = new int[len];
            for (int i = 0; i < len; i++)
                answer[i] = sellerMoney.getOrDefault(enroll[i], 0);
            
            return answer;
        }

        private void updateSellerMoney(String p, int money) {
            while(true) {
                if (p.equals("-") || money == 0) break;
                
                int dist = money / 10;
                sellerMoney.put(p, money - dist + sellerMoney.getOrDefault(p, 0));     
                p = parent.get(p);
                money = dist;
            }
        }

        private void initParent(String[] enroll, String[] referral) {
            for (int i = 0; i < len; i++)
                parent.put(enroll[i], referral[i]);
        }
    }

  	</div>
</details>

### ✏️ **Review**
- 고문해 시간에 이와 비슷한 개념을 배웠던 것 같아 아이디어 잡는데는 오래 걸리지 않았다.
- 다만 반복을 시작하는 순서를 고민하다가 시간을 많이 날렸다.
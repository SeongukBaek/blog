---
title: "๐ฉโ๐ป 77486. ๋ค๋จ๊ณ ์นซ์ ํ๋งค"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-07-29
update: 2022-07-29
tags:
  - Disjoint set
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๋ค๋จ๊ณ ์นซ์ ํ๋งค](https://programmers.co.kr/learn/courses/30/lessons/77486)

### ๐ **Logic**

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

- ์๊ธฐ ์์ ์ ๋ถ๋ชจ๋ฅผ ์ฐพ์ ์ด์ต์ ๋ถ๋ฐฐํ๋ ํจ์
- ์ต์ข ๋ณด์ค๋ฅผ ๋ง๋๊ฑฐ๋, ๋ ์ด์ ๋ถ๋ฐฐํ  ์ด์ต์ด ์์ ๋๊น์ง ์ํํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
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

### โ๏ธ **Review**
- ๊ณ ๋ฌธํด ์๊ฐ์ ์ด์ ๋น์ทํ ๊ฐ๋์ ๋ฐฐ์ ๋ ๊ฒ ๊ฐ์ ์์ด๋์ด ์ก๋๋ฐ๋ ์ค๋ ๊ฑธ๋ฆฌ์ง ์์๋ค.
- ๋ค๋ง ๋ฐ๋ณต์ ์์ํ๋ ์์๋ฅผ ๊ณ ๋ฏผํ๋ค๊ฐ ์๊ฐ์ ๋ง์ด ๋ ๋ ธ๋ค.
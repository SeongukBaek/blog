---
title: "๐ฉโ๐ป 92334. ์ ๊ณ  ๊ฒฐ๊ณผ ๋ฐ๊ธฐ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-07-04
update: 2022-07-04
tags:
  - Map
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ์ ๊ณ  ๊ฒฐ๊ณผ ๋ฐ๊ธฐ](https://programmers.co.kr/learn/courses/30/lessons/92334)

### ๐ **Logic**

```java
// ์ ์ ๋ณ ์ ๊ณ ๋นํ ํ์ ์ ์ฅ map
Map<String, Integer> reportMap = new HashMap<>();
// ์ ์ ๋ณ ์ ๊ณ ํ ์ ์  ์ ์ฅ map
Map<String, ArrayList<String>> userReportMap = new HashMap<>();
// ์ ์ ๋ณ ๋ฉ์ผ ๋ฐ์ ํ์ ์ ์ฅ map
Map<String, Integer> mailMap = new HashMap<>();
```

- ์ ์ ๋ณ๋ก, ์ ๊ณ ๋นํ ํ์์ ์ ๊ณ ํ ์ ์  ๋ฆฌ์คํธ, ๊ทธ๋ฆฌ๊ณ  ์ ์ง ๊ธฐ์ค์ ๋์ ์ ์ ๋ฅผ ์ ๊ณ ํ ํ์๋ฅผ ์ ์ฅํ๋ map์ ์ฌ์ฉํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        
        // ์ ์ ๋ณ ์ ๊ณ ๋นํ ํ์ ์ ์ฅ map
        Map<String, Integer> reportMap = new HashMap<>();
        // ์ ์ ๋ณ ์ ๊ณ ํ ์ ์  ์ ์ฅ map
        Map<String, ArrayList<String>> userReportMap = new HashMap<>();
        // ์ ์ ๋ณ ๋ฉ์ผ ๋ฐ์ ํ์ ์ ์ฅ map
        Map<String, Integer> mailMap = new HashMap<>();
        
        public int[] solution(String[] id_list, String[] report, int k) {
            for (String rep : report) {
                String[] line = rep.split(" ");
                String id = line[0];
                String bannedId = line[1];

                ArrayList<String> list = null;
                // ์ ์ ๋ณ ์ ๊ณ ํ ์ ์  ์ ์ฅ
                if (userReportMap.containsKey(id)) {
                    list = userReportMap.get(id);
                    if (!list.contains(bannedId)) {
                        list.add(bannedId);
                        reportMap.put(bannedId, reportMap.getOrDefault(bannedId, 0) + 1);
                    }
                } else {
                    list = new ArrayList<>();
                    list.add(bannedId); 
                    reportMap.put(bannedId, reportMap.getOrDefault(bannedId, 0) + 1);
                }
                userReportMap.put(id, list);
            }
            
            // ์ ์ ๋ณ ์ ๊ณ ํ ์ ์ ๊ฐ ์ ์ง ๊ธฐ์ค์ ๋์ ํ์๋ฅผ mailMap์ ์ ์ฅ
            for (Map.Entry<String, ArrayList<String>> entry : userReportMap.entrySet()) {
                ArrayList<String> list = entry.getValue();
                for (String id : list)
                    if (reportMap.get(id) >= k)
                        mailMap.put(entry.getKey(), mailMap.getOrDefault(entry.getKey(), 0) + 1);
            }
            
            int[] answer = new int[id_list.length];
            for (int i = 0; i < id_list.length; i++)
                answer[i] = mailMap.getOrDefault(id_list[i], 0);
            return answer;
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ๊ฐ๋จํ ๊ตฌํ ๋ฌธ์ ์์ผ๋, ๋นํจ์จ์ ์ผ๋ก ๊ตฌํํ ๊ฒ ๊ฐ๋ค.
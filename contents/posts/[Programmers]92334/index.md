---
title: "👩‍💻 92334. 신고 결과 받기"
description: "알고리즘 문제 풀기"
date: 2022-07-04
update: 2022-07-04
tags:
  - Map
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 신고 결과 받기](https://programmers.co.kr/learn/courses/30/lessons/92334)

### 📍 **Logic**

```java
// 유저별 신고당한 횟수 저장 map
Map<String, Integer> reportMap = new HashMap<>();
// 유저별 신고한 유저 저장 map
Map<String, ArrayList<String>> userReportMap = new HashMap<>();
// 유저별 메일 받을 횟수 저장 map
Map<String, Integer> mailMap = new HashMap<>();
```

- 유저별로, 신고당한 횟수와 신고한 유저 리스트, 그리고 정지 기준을 넘은 유저를 신고한 횟수를 저장하는 map을 사용한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        
        // 유저별 신고당한 횟수 저장 map
        Map<String, Integer> reportMap = new HashMap<>();
        // 유저별 신고한 유저 저장 map
        Map<String, ArrayList<String>> userReportMap = new HashMap<>();
        // 유저별 메일 받을 횟수 저장 map
        Map<String, Integer> mailMap = new HashMap<>();
        
        public int[] solution(String[] id_list, String[] report, int k) {
            for (String rep : report) {
                String[] line = rep.split(" ");
                String id = line[0];
                String bannedId = line[1];

                ArrayList<String> list = null;
                // 유저별 신고한 유저 저장
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
            
            // 유저별 신고한 유저가 정지 기준을 넘은 횟수를 mailMap에 저장
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

### ✏️ **Review**
- 간단한 구현 문제였으나, 비효율적으로 구현한 것 같다.
---
title: "👩‍💻 72411. 메뉴 리뉴얼"
description: "알고리즘 문제 풀기"
date: 2022-06-29
update: 2022-06-29
tags:
  - 조합
  - 정렬
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 메뉴 리뉴얼](https://programmers.co.kr/learn/courses/30/lessons/72411)

### 📍 **Logic**

```java
// map에 해당 조합이 있다면, count는 그 조합의 빈도 수, 그렇지 않다면 0
int count = 0;
if (menuComb.containsKey(str))
    count = menuComb.get(str);

// 현재 해당 조합을 추가할 것이므로 count를 증가
count++;
// 해당 조합이 이미 있었고, 해당 조합(메뉴 구성)이 속한 코스 중 최대 빈도보다 빈도가 크다면 최신화
if (count != 1 && courseMaxCount.get(str.length()) < count)
    courseMaxCount.put(str.length(), count);

menuComb.put(str, count);
```
- 메뉴 구성 길이별 최대 빈도수를 저장하는 `map` 을 최신화하는 과정

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        // 모든 메뉴 조합을 저장
        static Map<String, Integer> menuComb = new HashMap<>();
        // 각 course별 최대 메뉴 수를 저장
        static Map<Integer, Integer> courseMaxCount = new HashMap<>();
        // 최소 코스 요리 수 = course[0]
        static int minCombCount;
        
        public String[] solution(String[] orders, int[] course) {
            // 각 코스별 요리 수에 대한 최댓값을 저장할 map 초기화
            for (int c : course) courseMaxCount.put(c, 0);
            minCombCount = course[0];

            // 가능한 모든 조합을 생성해서 menuComb에 추가
            for (String order : orders) {
                boolean[] visited = new boolean[order.length()];
                for (int c : course)
                    if (order.length() >= c)
                        makeComb(order, visited, 0, order.length(), c);
            }

            ArrayList<String> answer = new ArrayList<>();
            for (Map.Entry<Integer, Integer> entry : courseMaxCount.entrySet())
                // 최대 빈도를 가지는 메뉴 result에 추가
                for (Map.Entry<String, Integer> menu : menuComb.entrySet())
                    if (entry.getKey() == menu.getKey().length() && entry.getValue() == menu.getValue())
                        answer.add(menu.getKey());
            
            Collections.sort(answer);
            
            return answer.toArray(String[]::new);
        }
        
        private static void makeComb(String order, boolean[] visited, int start, int n, int r) {
            // 주어진 요리 수만큼의 조합이 만들어진 경우, map에 추가
            if (r == 0) {
                put(order, visited, n);
                return;
            }

            for (int i = start; i < n; i++) {
                visited[i] = true;
                makeComb(order, visited, i + 1, n, r - 1);
                visited[i] = false;
            }
        }

        private static void put(String order, boolean[] visited, int n) {
            // Map에 넣을 메뉴 조합 생성
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < order.length(); i++)
                if (visited[i]) sb.append(order.charAt(i));

            // 최소 코스 요리 수보다 작은 경우는 패스
            if (sb.length() < minCombCount) return;

            // 메뉴 조합 사전순 정렬, AB와 BA는 같은 메뉴 조합이므로
            char[] chars = sb.toString().toCharArray();
            Arrays.sort(chars);
            String str = new String(chars);

            // map에 해당 조합이 있다면, count는 그 조합의 빈도 수, 그렇지 않다면 0
            int count = 0;
            if (menuComb.containsKey(str))
                count = menuComb.get(str);

            // 현재 해당 조합을 추가할 것이므로 count를 증가
            count++;
            // 해당 조합이 이미 있었고, 해당 조합(메뉴 구성)이 속한 코스 중 최대 빈도보다 빈도가 크다면 최신화
            if (count != 1 && courseMaxCount.get(str.length()) < count)
                courseMaxCount.put(str.length(), count);
            
            menuComb.put(str, count);
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 가능한 모든 조합을 구하는 것이 가장 관건이었다. 이후 구현은 정렬을 잘 활용하면 되는 문제였다.
- 처음에는 조합을 만들고, 각 코스 요리별 메뉴 수의 최대 빈도를 구하고, 그 빈도를 가지는 메뉴 구성을 출력하도록 했다가, 조합을 만들고 `map` 에 추가할 때, 메뉴 구성 길이별 최대 빈도를 저장하는 `map` 을 두어 이를 사용하도록 변경해보았다.
---
title: "👩‍💻 17680. 캐시"
description: "알고리즘 문제 풀기"
date: 2022-05-16
update: 2022-05-16
tags:
  - 큐
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 캐시](https://programmers.co.kr/learn/courses/30/lessons/17680)

### 📍 **Logic**

```java
for (String city : cities) {
    city = city.toLowerCase();
    // 이미 캐시에 있다면
    if (cache.contains(city)) {
        cache.remove(city);
        time++;
    } else {
        // 캐시에 없는데, 더 이상 캐시 공간도 없는 경우, 처음 들어온 값을 삭제
        if (cache.size() >= cacheSize) cache.poll();
        time += 5;
    }
    cache.add(city);
}
```
- `Queue` 를 사용해 들어온 도시순으로 캐싱한다.
- `Hit` 이 발생한다면, 해당 도시를 지우고 다시 맨 뒤에 추가한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        // 도시 이름이 들어온 순서를 저장하기 위한 큐
        Queue<String> cache = new LinkedList<>();

        public int solution(int cacheSize, String[] cities) {
            int time = 0;
            
            // cacheSize가 0이면 캐시 힛이 발생하지 않음
            if (cacheSize == 0) return cities.length * 5;
            
            for (String city : cities) {
                city = city.toLowerCase();
                // 이미 캐시에 있다면
                if (cache.contains(city)) {
                    cache.remove(city);
                    time++;
                } else {
                    // 캐시에 없는데, 더 이상 캐시 공간도 없는 경우, 처음 들어온 값을 삭제
                    if (cache.size() >= cacheSize) cache.poll();
                    time += 5;
                }
                cache.add(city);
            }
            
            return time;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 매우 쉬운 문제였지만, LRU 알고리즘을 대충 생각하고 풀었다가 시간 날려버렸다. 이런...
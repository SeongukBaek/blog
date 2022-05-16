---
title: "👩‍💻 17677. 뉴스 클러스터링"
description: "알고리즘 문제 풀기"
date: 2022-05-17
update: 2022-05-17
tags:
  - 문자열
  - Map
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 뉴스 클러스터링](https://programmers.co.kr/learn/courses/30/lessons/17677)

### 📍 **Logic**

```java
// 단어와 빈도 수 초기화
for (int i = 0; i < str1.length() - 1; i++) {
    String str = parsing(str1, i);
    if (str.length() != 2) continue;

    size1++;
    if (map1.containsKey(str)) map1.put(str, map1.get(str) + 1);
    else map1.put(str, 1);
}

for (int i = 0; i < str2.length() - 1; i++) {
    String str = parsing(str2, i);
    if (str.length() != 2) continue;

    size2++;
    if (map2.containsKey(str)) map2.put(str, map2.get(str) + 1);
    else map2.put(str, 1);
}
```
- `Map` 으로 단어와 그 빈도 수를 저장한다.

```java
// 교집합 구하기, 두 빈도 수 중 작은 값을 교집합의 크기로 지정
int inter = 0;
for (String key : map1.keySet())
    if (map2.containsKey(key))
        inter += map1.get(key) > map2.get(key) ? map2.get(key) : map1.get(key);
```
- 두 맵에 모두 존재하는 원소라면, 두 맵 중 **더 작은 빈도 수**를 교집합의 크기에 더한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        public int solution(String str1, String str2) {
            Map<String, Integer> map1 = new HashMap<>();
            Map<String, Integer> map2 = new HashMap<>();
            
            str1 = str1.toLowerCase();
            str2 = str2.toLowerCase();

            int size1 = 0;
            int size2 = 0;

            // 단어와 빈도 수 초기화
            for (int i = 0; i < str1.length() - 1; i++) {
                String str = parsing(str1, i);
                if (str.length() != 2) continue;

                size1++;
                if (map1.containsKey(str)) map1.put(str, map1.get(str) + 1);
                else map1.put(str, 1);
            }

            for (int i = 0; i < str2.length() - 1; i++) {
                String str = parsing(str2, i);
                if (str.length() != 2) continue;

                size2++;
                if (map2.containsKey(str)) map2.put(str, map2.get(str) + 1);
                else map2.put(str, 1);
            }

            // 교집합 구하기, 두 빈도 수 중 작은 값을 교집합의 크기로 지정
            int inter = 0;
            for (String key : map1.keySet())
                if (map2.containsKey(key))
                    inter += map1.get(key) > map2.get(key) ? map2.get(key) : map1.get(key);
            
            // 두 집합이 모두 공집합인 경우 J = 1
            if (map1.size() == 0 && map2.size() == 0) return 65536;
            
            float j = (float) inter / (float) (size1 + size2 - inter);

            int answer = (int) (j * 65536);

            return answer;
        }

        private String parsing(String str, int i) {
            return str.substring(i, i+2).replaceAll("[^a-zA-Z]","");
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 자카드 유사도를 이해하는데 너무 오래 걸렸다. 
  - "원소의 중복을 허용하는 다중집합" 이라는 조건에서 시간이 많이 뺏겼다.
- 항상 테케를 잘 확인해야겠다.
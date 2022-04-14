---
title: "👩‍💻 42576. 완주하지 못한 선수"
description: "알고리즘 문제 풀기"
date: 2022-04-13
update: 2022-04-13
tags:
  - 해시
series: "👩‍💻 Programmers"
---

## 문제
수많은 마라톤 선수들이 마라톤에 참여하였습니다. 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.

마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때, 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

### 제한사항
- 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
- completion의 길이는 participant의 길이보다 1 작습니다.
- 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
- 참가자 중에는 동명이인이 있을 수 있습니다.

### 입출력 예
|participant|completion|return|
|:---:|:---:|:---:|:---:|
|"leo", "kiki", "eden"|"eden", "kiki"|"leo"|
|"marina", "josipa", "nikola", "vinko", "filipa"|"josipa", "filipa", "marina", "nikola"|"vinko"|
|"mislav", "stanko", "mislav", "ana"|"stanko", "ana", "mislav"|"mislav"|

### 📍 **Logic**

```java
for (String p : participant)
    map.put(p, map.getOrDefault(p, 0) + 1);

for (String c : completion)
    map.put(c, map.get(c) - 1);

for (Map.Entry<String, Integer> entry : map.entrySet())
    if (entry.getValue() != 0) answer = entry.getKey();
```

- 먼저 `participant` 에 있는 이름을 `HashMap` 에 `put` 하는데, `getOrDefault()` 메소드로 해당 이름이 이미 있는지 확인하여 있다면, 그 이름에 해당하는 `value` 에 + 1 하여 저장한다.
- 이후 `completion` 에 있는 이름으로 다시 `HashMap` 을 수정하는데, 이미 있는 이름에 - 1 한 값으로 업데이트한다.
- 최종적으로 `value` 가 0이 아닌 이름이 완주하지 못한 선수가 된다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        public String solution(String[] participant, String[] completion) {
            HashMap<String, Integer> map = new HashMap<>();
            String answer = "";
            
            for (String p : participant)
                map.put(p, map.getOrDefault(p, 0) + 1);
            
            for (String c : completion)
                map.put(c, map.get(c) - 1);
            
            for (Map.Entry<String, Integer> entry : map.entrySet())
                if (entry.getValue() != 0) answer = entry.getKey();
    
            return answer;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- `HashMap` 을 사용하여 `completion` 에 없는 이름을 출력해야 한다는 것은 알았지만, 해시 알고리즘을 처음 풀어봐서 어떻게 해야 효율적으로 구현할 수 있을지가 헷갈렸다.
- 어떻게 했나 싶어서 블로그를 참고했는데 한 `HashMap` 에다가 넣으면서 value를 줄여주는 방법이 진짜 신기했다. 

### 📕 출처
- Programmers : https://programmers.co.kr/learn/courses/30/lessons/42576
- [참고 블로그](https://coding-grandpa.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%99%84%EC%A3%BC%ED%95%98%EC%A7%80-%EB%AA%BB%ED%95%9C-%EC%84%A0%EC%88%98-%ED%95%B4%EC%8B%9C-Lv-1)
---
title: "👩‍💻 42862. 체육복"
description: "알고리즘 문제 풀기"
date: 2022-04-20
update: 2022-04-20
tags:
  - 그리디
series: "👩‍💻 Programmers"
---

## 문제
점심시간에 도둑이 들어, 일부 학생이 체육복을 도난당했습니다. 다행히 여벌 체육복이 있는 학생이 이들에게 체육복을 빌려주려 합니다. 학생들의 번호는 체격 순으로 매겨져 있어, 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다. 예를 들어, 4번 학생은 3번 학생이나 5번 학생에게만 체육복을 빌려줄 수 있습니다. 체육복이 없으면 수업을 들을 수 없기 때문에 체육복을 적절히 빌려 최대한 많은 학생이 체육수업을 들어야 합니다.

전체 학생의 수 n, 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve가 매개변수로 주어질 때, 체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 solution 함수를 작성해주세요.

### 제한사항
- 전체 학생의 수는 2명 이상 30명 이하입니다.
- 체육복을 도난당한 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌의 체육복을 가져온 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌 체육복이 있는 학생만 다른 학생에게 체육복을 빌려줄 수 있습니다.
- 여벌 체육복을 가져온 학생이 체육복을 도난당했을 수 있습니다. 이때 이 학생은 체육복을 하나만 도난당했다고 가정하며, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없습니다.


### 입출력 예
|n|lost|reserve|return|
|:---:|:---:|:---:|:---:|
|5|[2, 4]|[1, 3, 5]|5|
|5|[2, 4]|[3]|4|
|3|[3]|[1]|2|

### 📍 **Logic**

```java
for (int l : lost) {
  if (map.containsKey(l)) map.computeIfPresent(l, (k, v) -> v - 1);
  else lostMap.put(l, 0);
}

for (int l : lostMap.keySet()) {
  if (map.containsKey(l - 1) && map.get(l - 1) > 0) {
    map.computeIfPresent(l - 1, (k, v) -> v - 1);
    map.put(l, 0);
  } else if (map.containsKey(l + 1) && map.get(l + 1) > 0) {
    map.computeIfPresent(l + 1, (k, v) -> v - 1);
    map.put(l, 0);
  } else map.put(l, -1);
}
```

- 학생과 체육복 개수 정보를 `Map` 으로 저장한다.
  - `reserve` 에 있는 학생들은 모두 체육복 수를 1개로 지정한다.
- 먼저 `lost` 와 `reserve` 둘 다에 있는 학생의 경우는 자기 체육복을 자기가 써야 하므로, 체육복을 도난당한 학생 목록인 `lostMap` 에 넣지 않고, 해당 학생의 체육복 수는 0으로 update한다.
- `lostMap` 에는 이제 체육복을 빌려야 하는 학생들만 존재한다.
  - 앞 번호의 학생들에게 빌릴 수 있는지 확인하고, 체육복 개수 정보를 수정한다.
- 최종적으로 체육복 개수가 0 이상인 학생들의 수를 센다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	  import java.util.*;

    class Solution {
        int[] possible;
        
        public int solution(int n, int[] lost, int[] reserve) {
            Arrays.sort(lost);
            Arrays.sort(reserve);
            
            Map<Integer, Integer> map = new HashMap<>();
            Map<Integer, Integer> lostMap = new HashMap<>();

            for (int r : reserve)
                map.put(r, 1);
            
            for (int l : lost) {
                if (map.containsKey(l)) map.computeIfPresent(l, (k, v) -> v - 1);
                else lostMap.put(l, 0);
            }
            
            for (int l : lostMap.keySet()) {
                if (map.containsKey(l - 1) && map.get(l - 1) > 0) {
                    map.computeIfPresent(l - 1, (k, v) -> v - 1);
                    map.put(l, 0);
                } else if (map.containsKey(l + 1) && map.get(l + 1) > 0) {
                    map.computeIfPresent(l + 1, (k, v) -> v - 1);
                    map.put(l, 0);
                } else map.put(l, -1);
            }
                
            int answer = 0;
            for (int i = 1; i <= n; i++) {
                if (map.containsKey(i) && map.get(i) < 0) continue;
                answer++;
            }
            
            
            return answer;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 그리디는 이해도 안되고, 코드도 안 이쁜 것 같다.
- 존재 여부를 확인하기 위한 `Map` 은 유용한 것 같다.

### 📕 출처
Programmers : https://programmers.co.kr/learn/courses/30/lessons/42862
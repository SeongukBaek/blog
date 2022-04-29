---
title: "👩‍💻 67258. 보석 쇼핑"
description: "알고리즘 문제 풀기"
date: 2022-04-29
update: 2022-04-29
tags:
  - 두 포인터
series: "👩‍💻 Programmers"
---

## 문제
개발자 출신으로 세계 최고의 갑부가 된 어피치는 스트레스를 받을 때면 이를 풀기 위해 오프라인 매장에 쇼핑을 하러 가곤 합니다.
어피치는 쇼핑을 할 때면 매장 진열대의 특정 범위의 물건들을 모두 싹쓸이 구매하는 습관이 있습니다.
어느 날 스트레스를 풀기 위해 보석 매장에 쇼핑을 하러 간 어피치는 이전처럼 진열대의 특정 범위의 보석을 모두 구매하되 특별히 아래 목적을 달성하고 싶었습니다.
진열된 모든 종류의 보석을 적어도 1개 이상 포함하는 가장 짧은 구간을 찾아서 구매

예를 들어 아래 진열대는 4종류의 보석(RUBY, DIA, EMERALD, SAPPHIRE) 8개가 진열된 예시입니다.

|진열대 번호|1|2|3|4|5|6|7|8|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|보석 이름|DIA|RUBY|RUBY|DIA|DIA|EMERALD|SAPPHIRE|DIA|

진열대의 3번부터 7번까지 5개의 보석을 구매하면 모든 종류의 보석을 적어도 하나 이상씩 포함하게 됩니다.

진열대의 3, 4, 6, 7번의 보석만 구매하는 것은 중간에 특정 구간(5번)이 빠지게 되므로 어피치의 쇼핑 습관에 맞지 않습니다.

진열대 번호 순서대로 보석들의 이름이 저장된 배열 gems가 매개변수로 주어집니다. 이때 모든 보석을 하나 이상 포함하는 가장 짧은 구간을 찾아서 return 하도록 solution 함수를 완성해주세요.
가장 짧은 구간의 시작 진열대 번호와 끝 진열대 번호를 차례대로 배열에 담아서 return 하도록 하며, 만약 가장 짧은 구간이 여러 개라면 시작 진열대 번호가 가장 작은 구간을 return 합니다.

### 제한사항
- gems 배열의 크기는 1 이상 100,000 이하입니다.
  - gems 배열의 각 원소는 진열대에 나열된 보석을 나타냅니다.
  - gems 배열에는 1번 진열대부터 진열대 번호 순서대로 보석이름이 차례대로 저장되어 있습니다.
  - gems 배열의 각 원소는 길이가 1 이상 10 이하인 알파벳 대문자로만 구성된 문자열입니다.

### 입출력 예
|gems|return|
|:---:|:---:|:---:|
|["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"]|[3, 7]|
|["AA", "AB", "AC", "AA", "AC"]|[1, 3]|
|["XYZ", "XYZ", "XYZ"]|[1, 1]|
|["ZZZ", "YYY", "NNNN", "YYY", "BBB"]|[1, 5]|



### 📍 **Logic**

```java
while (true) {
    // 아직 종류가 다 안 채워진 경우
    if (gemTypes != gemMap.size()) {
        if (right == gems.length) break;
        else {
            // 보석을 구매하는 경우로, Map에 개수를 증가시키면서 보석을 저장
            gemMap.put(gems[right], gemMap.getOrDefault(gems[right], 0) + 1);
            right++;
        }
    }

    // 종류가 다 채워진 경우
    if (gemTypes == gemMap.size()) {
        // 이전까지 구한 구간의 길이와 비교하여 작다면 update
        if (right - left < distance) {
            distance = right - left;
            start = left;
            end = right;
        }

        // 구간 줄이기 위해 제일 앞 보석 1개 삭제
        gemMap.put(gems[left], gemMap.get(gems[left]) - 1);

        // 보석 개수가 0개이면 map에서 삭제
        if (gemMap.get(gems[left]) == 0) gemMap.remove(gems[left]);

        left++;
    }
}
```

- `left` , `right` 라는 포인터를 사용하여 보석 진열대를 탐색한다.
- 보석 진열대에 놓인 모든 종류의 보석을 하나 이상 구매한 경우와, 그렇지 않은 경우로 나눈다.
  - 다 채워지지 않은 경우는 구매한 보석의 개수 정보를 업데이트하면서 `Map` 에 저장하고,
  - 다 채워진 경우는 최소 구간인지 확인하고 시작점부터 보석 개수를 하나씩 줄인다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        public int[] solution(String[] gems) {
            // 보석의 위치를 저장할 Map
            Map<String, Integer> gemMap = new HashMap<>();
            // 진열대에 있는 보석을 중복 없이 저장한 Set
            Set<String> gemSet = new HashSet<>(Arrays.asList(gems));

            // 보석의 종류를 구하기 위해 Set 사용
            int gemTypes = gemSet.size();

            int distance = Integer.MAX_VALUE;
            int start = 0, end = 0, left = 0, right = 0;

            while (true) {
                // 아직 종류가 다 안 채워진 경우
                if (gemTypes != gemMap.size()) {
                    if (right == gems.length) break;
                    else {
                        // 보석을 구매하는 경우로, Map에 개수를 증가시키면서 보석을 저장
                        gemMap.put(gems[right], gemMap.getOrDefault(gems[right], 0) + 1);
                        right++;
                    }
                }

                // 종류가 다 채워진 경우
                if (gemTypes == gemMap.size()) {
                    // 이전까지 구한 구간의 길이와 비교하여 작다면 update
                    if (right - left < distance) {
                        distance = right - left;
                        start = left;
                        end = right;
                    }

                    // 구간 줄이기 위해 제일 앞 보석 1개 삭제
                    gemMap.put(gems[left], gemMap.get(gems[left]) - 1);

                    // 보석 개수가 0개이면 map에서 삭제
                    if (gemMap.get(gems[left]) == 0) gemMap.remove(gems[left]);

                    left++;
                }
            }
            
            return new int[] {start + 1, end};
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 두 포인터를 사용해야 하는 문제임은 바로 알 수 있었지만, 두 포인터를 사용하지 않고 각 보석들의 위치를 저장하고 이 위치 정보만을 사용해서 풀 방법은 없을까를 고민해보았다.
- 두 포인터 알고리즘을 사용하는 가장 흔한 예가 부분 배열 합을 구하는 문제였는데, 이를 여기에 어떻게 접목시키는지 의문이었다.
- 두 포인터 알고리즘이 고냥이 문제에도 사용되던데, 한 번 혼자 풀어봐야겠다...

### 📕 출처
Programmers : https://programmers.co.kr/learn/courses/30/lessons/67258
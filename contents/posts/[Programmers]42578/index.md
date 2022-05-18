---
title: "👩‍💻 42578. 위장"
description: "알고리즘 문제 풀기"
date: 2022-04-13
update: 2022-04-13
tags:
  - 해시
series: "👩‍💻 Programmers"
---

## 문제
스파이들은 매일 다른 옷을 조합하여 입어 자신을 위장합니다.

예를 들어 스파이가 가진 옷이 아래와 같고 오늘 스파이가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면 다음날은 청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야 합니다.

종류	이름
얼굴	동그란 안경, 검정 선글라스
상의	파란색 티셔츠
하의	청바지
겉옷	긴 코트

스파이가 가진 의상들이 담긴 2차원 배열 `clothes` 가 주어질 때 서로 다른 옷의 조합의 수를 return 하도록 solution 함수를 작성해주세요.

### 제한사항
- `clothes` 의 각 행은 [의상의 이름, 의상의 종류]로 이루어져 있습니다.
- 스파이가 가진 의상의 수는 1개 이상 30개 이하입니다.
- 같은 이름을 가진 의상은 존재하지 않습니다.
- `clothes` 의 모든 원소는 문자열로 이루어져 있습니다.
- 모든 문자열의 길이는 1 이상 20 이하인 자연수이고 알파벳 소문자 또는 '_' 로만 이루어져 있습니다.
- 스파이는 하루에 최소 한 개의 의상은 입습니다.

### 입출력 예
|clothes|return|
|:---:|:---:|
|[["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]]|5|
|[["crowmask", "face"], ["bluesunglasses", "face"], ["smoky_makeup", "face"]]|3|

### 📍 **Logic**

```java
for (String[] cloth : clothes) {
    if (map.containsKey(cloth[1]))
        map.put(cloth[1], map.get(cloth[1]) + 1);
    else
        map.put(cloth[1], 1);
}
```

- 의상 종류를 `Key` 로, 해당 종류에 몇 가지의 의상이 존재하는지를 `value` 로 저장한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        public int solution(String[][] clothes) {
            HashMap<String, Integer> map = new HashMap<>();
            
            for (String[] cloth : clothes) {
                if (map.containsKey(cloth[1]))
                    map.put(cloth[1], map.get(cloth[1]) + 1);
                else
                    map.put(cloth[1], 1);
            }
            
            int answer = 1;
            for (Map.Entry<String, Integer> entry : map.entrySet())
                answer *= (entry.getValue() + 1);
            
            return answer - 1;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- `HashMap` 의 `Key` 와 `Value` 를 어떻게 활용할지는 떠올렸지만, 정답 도출을 위한 식을 모르겠어서 질문 게시판을 참고했다.
- 단순한 조합식이긴 한데... 기억이 안 났다;

### 📕 출처
Programmers : https://programmers.co.kr/learn/courses/30/lessons/42578
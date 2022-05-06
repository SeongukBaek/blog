---
title: "👩‍💻 42747. H-Index"
description: "알고리즘 문제 풀기"
date: 2022-04-15
update: 2022-04-15
tags:
  - 정렬
series: "👩‍💻 Programmers"
---

## 문제
H-Index는 과학자의 생산성과 영향력을 나타내는 지표입니다. 어느 과학자의 H-Index를 나타내는 값인 `h`를 구하려고 합니다. 위키백과에 따르면, H-Index는 다음과 같이 구합니다.

어떤 과학자가 발표한 논문 `n`편 중, `h`번 이상 인용된 논문이 `h`편 이상이고 나머지 논문이 `h`번 이하 인용되었다면 `h`의 최댓값이 이 과학자의 H-Index입니다.

어떤 과학자가 발표한 논문의 인용 횟수를 담은 배열 citations가 매개변수로 주어질 때, 이 과학자의 H-Index를 return 하도록 solution 함수를 작성해주세요.

### 제한사항
- 과학자가 발표한 논문의 수는 1편 이상 1,000편 이하입니다.
- 논문별 인용 횟수는 0회 이상 10,000회 이하입니다.

### 입출력 예
|citations|return|
|:---:|:---:|
|[3, 0, 6, 1, 5]|3|

### 📍 **Logic**

```java
private boolean isHindex(int[] citations, int H) {
  int s = 0, l = 0;
  for (int i = 0; i < citations.length; i++) {
    if (citations[i] >= H) l++;
    if (citations[i] <= H) s++;
  }
  
  if (l >= H && s <= H) return true;
  return false;
}
```

- `H` 가 주어진 H-index 조건을 만족하는지 확인하는 함수

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	  import java.util.*;

    class Solution {
        public int solution(int[] citations) {
            int n = citations.length;
            int answer = 0;
            
            Arrays.sort(citations);
            
            for (int i = citations[n - 1]; i >= 0; i--) {
                if (isHindex(citations, i)) {
                    answer = i;
                    break;
                }
            }
            
            return answer;
        }
        
        private boolean isHindex(int[] citations, int H) {
            int s = 0, l = 0;
            for (int i = 0; i < citations.length; i++) {
                if (citations[i] >= H) l++;
                if (citations[i] <= H) s++;
            }
            
            if (l >= H && s <= H) return true;
            return false;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- H-index가 주어진 `citations` 배열에 없을 수도 있다는 생각을 못하고, 주어진 배열 내에서만 H-index를 찾으려다가 테케 1개 빼고 다 실패했다...
- 주어진 배열에 없을 수도 있다는 가정하에 구현하니 바로 해결했다.

### 📕 출처
Programmers : https://programmers.co.kr/learn/courses/30/lessons/42747
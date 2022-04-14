---
title: "👩‍💻 42746. 가장 큰 수"
description: "알고리즘 문제 풀기"
date: 2022-04-14
update: 2022-04-14
tags:
  - 정렬
series: "👩‍💻 Programmers"
---

## 문제
0 또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수를 알아내 주세요.

예를 들어, 주어진 정수가 [6, 10, 2]라면 [6102, 6210, 1062, 1026, 2610, 2106]를 만들 수 있고, 이중 가장 큰 수는 6210입니다.

0 또는 양의 정수가 담긴 배열 numbers가 매개변수로 주어질 때, 순서를 재배치하여 만들 수 있는 가장 큰 수를 문자열로 바꾸어 return 하도록 solution 함수를 작성해주세요.

### 제한사항
- numbers의 길이는 1 이상 100,000 이하입니다.
- numbers의 원소는 0 이상 1,000 이하입니다.
- 정답이 너무 클 수 있으니 문자열로 바꾸어 return 합니다.

### 입출력 예
|numbers|return|
|:---:|:---:|
|[6, 10, 2]|"6210"|
|[3, 30, 34, 5, 9]|"9534330"|

### 📍 **Logic**

```java
Arrays.sort(strNumbers, new Comparator<String>() {
    public int compare(String obj1, String obj2) {
        return (obj2 + obj1).compareTo(obj1 + obj2);
    }
});
```

- 숫자를 저장할 `strNumbers` 배열에 `compareTo()` 를 이용해 작은 숫자를 앞으로 정렬시킨다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        public String solution(int[] numbers) {
            String[] strNumbers = new String[numbers.length];
            String answer = "";
            
            for (int i = 0; i < numbers.length; i++) {
                strNumbers[i] = Integer.toString(numbers[i]);
            }
            
            Arrays.sort(strNumbers, new Comparator<String>() {
                public int compare(String obj1, String obj2) {
                    return (obj2 + obj1).compareTo(obj1 + obj2);
                }
            });
            
            if (strNumbers[0].equals("0")) {
                answer = "0";
            } else {
                for (String strNumber : strNumbers) {
                    answer += strNumber;
                }
            }
            
            return answer;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 처음에는 주어진 수들 중 가장 큰 수를 찾아 그 자릿수만큼 다른 수들의 자릿수를 변환한 다음, 정렬하여 변환한 수의 경우는 다시 원래 수로 바꿔 `answer` 에 붙이고, 변환하지 않은 수는 그대로 `answer` 에 붙이는 방식으로 구현했다.
  - "0, 0, 0" 인 경우와, 여러 반례에 막혔다..
- 결국 참고 블로그를 통해 `compareTo()` 를 사용하는 방식을 사용했다.
  - 숫자를 비교하는 경우와, 문자를 비교하는 경우마다 반환하는 `int` 값이 달랐고, 이를 잘 활용한 풀이인 것 같다.
- `compareTo()`
  - 숫자의 경우
    - 기준값보다 비교대상이 큰 경우 : -1 반환
    - 기준값보다 비교대상이 작은 경우 : 1 반환
  - 문자의 경우
    - 기준값에 비교대상이 포함되어 있는 경우 : 서로의 문자열 길이의 차이값 반환
    - 기준값과 전혀 다른 문자열인 경우 : 비교가 불가능한 지점 문자의 아스키 코드 값 차이 반환
  - 둘 다 같은 경우는 0 반환

### 📕 출처
- Programmers : https://programmers.co.kr/learn/courses/30/lessons/42746
- [참고 블로그](https://hannamnote.tistory.com/82)
- [compareTo()](https://mine-it-record.tistory.com/133)
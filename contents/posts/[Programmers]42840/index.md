---
title: "👩‍💻 42840. 모의고사"
description: "알고리즘 문제 풀기"
date: 2022-04-15
update: 2022-04-15
tags:
  - 완전 탐색
series: "👩‍💻 Programmers"
---

## 문제
수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

### 제한사항
- 시험은 최대 10,000 문제로 구성되어있습니다.
- 문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
- 가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순 정렬해주세요.

### 입출력 예
|answers|return|
|:---:|:---:|
|[1,2,3,4,5]|[1]|
|[1,3,2,4,2]|[1,2,3]|

### 📍 **Logic**

```java
private int countScore(int[] answers, int[] std) {
    int score = 0;
    for (int i = 0, idx = 0; i < answers.length; i++) {
        if (idx >= std.length)
            idx = idx % std.length;
        if (std[idx++] == answers[i])
            score++;
    }
    return score;
}
```

- 주어진 학생의 정답 배열을 가지고 점수를 매긴다.
- 다만 주어진 정답 배열의 범위를 벗어나는 경우 (문제 수가 더 많은 경우) 접근 index 값을 `%` 을 사용해 변경한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        public int[] solution(int[] answers) {
            
            int[] std1 = {1,2,3,4,5};
            int[] std2 = {2,1,2,3,2,4,2,5};
            int[] std3 = {3,3,1,1,2,2,4,4,5,5};
            
            int[] scores = new int[3];
            
            scores[0] = countScore(answers, std1);
            scores[1] = countScore(answers, std2);
            scores[2] = countScore(answers, std3);
            
            int max = Arrays.stream(scores).max().getAsInt();
            
            ArrayList<Integer> answer = new ArrayList<>();
            
            for (int i = 0; i < 3; i++) {
                if (scores[i] == max)
                    answer.add(i + 1);
            }
            
            return answer.stream().mapToInt(i -> i).toArray();
        }
        
        private int countScore(int[] answers, int[] std) {
            int score = 0;
            for (int i = 0, idx = 0; i < answers.length; i++) {
                if (idx >= std.length) idx = idx % std.length;
                if (std[idx++] == answers[i])
                    score++;
            }
            return score;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 완전 탐색 알고리즘답게 단순히 다 돌려보면 되는 문제였다.

### 📕 출처
Programmers : https://programmers.co.kr/learn/courses/30/lessons/42840
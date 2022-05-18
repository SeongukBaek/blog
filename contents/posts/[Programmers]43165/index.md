---
title: "👩‍💻 43165. 타겟 넘버"
description: "알고리즘 문제 풀기"
date: 2022-04-11
update: 2022-04-11
tags:
  - DFS
  - BFS
series: "👩‍💻 Programmers"
---

## 문제
n개의 음이 아닌 정수들이 있습니다. 이 정수들을 순서를 바꾸지 않고 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다. 예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.

### 제한사항
- 주어지는 숫자의 개수는 2개 이상 20개 이하입니다.
- 각 숫자는 1 이상 50 이하인 자연수입니다.
- 타겟 넘버는 1 이상 1000 이하인 자연수입니다.

### 입출력 예
|numbers|target|return|
|:---:|:---:|:---:|
|[1, 1, 1, 1, 1]|3|5|
|[4, 1, 2, 1]|4|2|

### 📍 **Logic**

```java
private void dfs(int[] numbers, int idx, int target, int sum) {
    if (idx + 1 == numbers.length) {
        if (sum == target) answer++;
        return;
    }
    dfs(numbers, idx + 1, target, sum + numbers[idx + 1]);
    dfs(numbers, idx + 1, target, sum - numbers[idx + 1]);
}
```

- 재귀적인 DFS를 이용해 다음 number를 더하거나 빼면서 맨 마지막 값이 타겟 넘버와 같은 경우 answer를 증가한다.
- 첫 번째 숫자가 양수인 경우와 음수인 경우 두 가지에 대해 dfs를 호출한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        static int answer = 0;
        
        public int solution(int[] numbers, int target) {
            dfs(numbers, 0, target, numbers[0]);
            return answer;
        }
        
        private void dfs(int[] numbers, int idx, int target, int sum) {
            if (idx + 1 == numbers.length) {
                if (sum == target) answer++;
                return;
            }
            dfs(numbers, idx + 1, target, sum + numbers[idx + 1]);
            dfs(numbers, idx + 1, target, sum - numbers[idx + 1]);
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 처음에는 트리를 만들어서 맨 마지막 리프 노드가 타겟 넘버랑 같은 경우의 수를 체크해야하나 생각했다.
- 이전에 DFS 문제를 풀 때 뭔가 재귀 호출을 이용한 DFS로 비슷한 문제를 풀었던 것이 생각나 구현해보니 정답이었다.
- 쓸데없이 트리를 구현할 뻔 했다.

### 📕 출처
Programmers : https://programmers.co.kr/learn/courses/30/lessons/43165
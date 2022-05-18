---
title: "👩‍💻 43163. 단어 변환"
description: "알고리즘 문제 풀기"
date: 2022-04-12
update: 2022-04-12
tags:
  - DFS
  - BFS
series: "👩‍💻 Programmers"
---

## 문제
두 개의 단어 begin, target과 단어의 집합 words가 있습니다. 아래와 같은 규칙을 이용하여 begin에서 target으로 변환하는 가장 짧은 변환 과정을 찾으려고 합니다.

1. 한 번에 한 개의 알파벳만 바꿀 수 있습니다.
2. words에 있는 단어로만 변환할 수 있습니다.

예를 들어 begin이 "hit", target가 "cog", words가 ["hot","dot","dog","lot","log","cog"]라면 "hit" -> "hot" -> "dot" -> "dog" -> "cog"와 같이 4단계를 거쳐 변환할 수 있습니다.

두 개의 단어 begin, target과 단어의 집합 words가 매개변수로 주어질 때, 최소 몇 단계의 과정을 거쳐 begin을 target으로 변환할 수 있는지 return 하도록 solution 함수를 작성해주세요.

### 제한사항
- 각 단어는 알파벳 소문자로만 이루어져 있습니다.
- 각 단어의 길이는 3 이상 10 이하이며 모든 단어의 길이는 같습니다.
- words에는 3개 이상 50개 이하의 단어가 있으며 중복되는 단어는 없습니다.
- begin과 target은 같지 않습니다.
- 변환할 수 없는 경우에는 0를 return 합니다.

### 입출력 예
|begin|target|words|return|
|:---:|:---:|:---:|:---:|
|"hit"|"cog"|["hot", "dot", "dog", "lot", "log", "cog"]|4|
|"hit"|"cog"|["hot", "dot", "dog", "lot", "log"]|0|

### 📍 **Logic**

```java
private int dfs(String begin, String target, String[] words, boolean[] visited, int count, int idx) {
    if (begin.equals(target) || visited[idx]) return count;
    
    visited[idx] = true;
    int ans = 0;
    
    for (int i = 0; i < words.length; i++) {
        if (idx != i && !visited[i] && isOneCharDiff(begin, words[i]))
            ans = dfs(words[i], target, words, visited, count + 1, i);
    }
    
    return ans;
}
```

- 재귀적인 DFS를 이용해 현재 단어와 한 문자만 다른 단어로 변환을 수행한다.
  - 이때 지금까지의 변환된 수(`count`)를 함께 전달한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        public int solution(String begin, String target, String[] words) {
            boolean[] visited;
            int answer = words.length + 1;
            
            for (int i = 0; i < words.length; i++) {
                visited = new boolean[words.length];
                if (isOneCharDiff(begin, words[i]))
                    answer = Math.min(answer, dfs(words[i], target, words, visited, 1, i));
            }
            
            if (answer == words.length + 1) return 0;
                
            return answer;
        }
        
        private int dfs(String begin, String target, String[] words, boolean[] visited, int count, int idx) {
            if (begin.equals(target) || visited[idx]) return count;
            
            visited[idx] = true;
            int ans = 0;
            
            for (int i = 0; i < words.length; i++) {
                if (idx != i && !visited[i] && isOneCharDiff(begin, words[i]))
                    ans = dfs(words[i], target, words, visited, count + 1, i);
            }
            
            return ans;
        }
        
        private boolean isOneCharDiff(String str1, String str2) {
            int count = 0;
            
            for (int i = 0; i < str1.length() && count < 2; i++)
                if (str1.charAt(i) != str2.charAt(i)) count++;
            
            return count == 1;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 단어별 다른 문자 수를 그래프 형태로 변환해 저장하고 이를 BFS 방식으로 접근하도록 구현했는데, 방법 자체가 잘못 된 것 같았다.
- 한 문자만 다른 단어로 변환할 수 있기에 굳이 단어별 다른 문자 수를 구할 필요가 없었고 DFS를 이용하는 방법을 참고했다.

### 📕 출처
Programmers : https://programmers.co.kr/learn/courses/30/lessons/43163
---
title: "👩‍💻 67260. 동굴 탐험"
description: "알고리즘 문제 풀기"
date: 2022-04-30
update: 2022-04-30
tags:
  - DFS
  - Stack
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 동굴 탐험](https://programmers.co.kr/learn/courses/30/lessons/67260)

### 📍 **Logic**

```java
private void dfs() {
    Stack<Integer> stack = new Stack<>();
    stack.push(0);
    visited[0] = true;

    for (int next : adjList.get(0)) stack.push(next);
    
    while(!stack.empty()) {
        int now = stack.pop();
        if (visited[now]) continue;
        
        // before 정보를 업데이트하지 않는 방들은 모두 0번 방이 우선 방문되는 경우
        if (!visited[before[now]]) {
            after[before[now]] = now;
            continue;
        }
        
        visited[now] = true;
        
        for (int next : adjList.get(now))
            if (!visited[next]) stack.push(next);

        stack.push(after[now]);
    }
}
```

- Stack을 이용한 DFS를 수행한다.
- 0번 방에서 갈 수 있는 방들을 stack에 넣는다.
- 방문하지 않은 방에 대해, 
  - 우선 방문해야 하는 방을 방문하지 않은 경우, 이후 방문해야 하는 방들을 저장하는 `after` 에 현재 방을 저장한다.
  - 방문한 경우, 현재 방의 방문 여부를 최신화하고, 현재 방에서 갈 수 있는 방들을 stack에 넣는다.
- 이후 현재 방 이후에 방문해야 하는 방(`after[now]`)을 stack에 넣고, 반복한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        boolean[] visited;
        int[] before;
        int[] after;
        ArrayList<ArrayList<Integer>> adjList = new ArrayList<>();
        
        public boolean solution(int n, int[][] path, int[][] order) {
            visited = new boolean[n];
            before = new int[n];
            after = new int[n];
            
            // 방문 우선순위 저장
            for (int[] or : order) before[or[1]] = or[0];
            
            for (int i = 0; i < n; i++) adjList.add(new ArrayList<>());
            
            // 인접 리스트 생성
            for (int[] p : path) {
                adjList.get(p[0]).add(p[1]);
                adjList.get(p[1]).add(p[0]);
            }
            
            // 0보다 먼저 방문해야 하는 방이 있다면 바로 false
            if (before[0] != 0) return false;
            
            dfs();
            
            // 모든 방문 후, 방문하지 않은 방이 있다면 false
            for (int i = 0; i < n; i++)
                if (!visited[i]) return false;
            return true;
        }
        
        private void dfs() {
            Stack<Integer> stack = new Stack<>();
            stack.push(0);
            visited[0] = true;

            for (int next : adjList.get(0)) stack.push(next);
            
            while(!stack.empty()) {
                int now = stack.pop();
                if (visited[now]) continue;
                
                if (!visited[before[now]]) {
                    after[before[now]] = now;
                    continue;
                }
                
                visited[now] = true;
                
                for (int next : adjList.get(now))
                    if (!visited[next]) stack.push(next);

                stack.push(after[now]);
            }
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 위상 정렬 알고리즘을 떠올렸었는데, 방문했던 방도 다시 방문해야하는 경우가 있을 수 있어, 의미가 없다고 판단했다.
- 역시나 마지막 문제답게, 난이도가 높았다. 인턴 코테 5솔은 그림의 떡이라는 생각이 들었다 ..

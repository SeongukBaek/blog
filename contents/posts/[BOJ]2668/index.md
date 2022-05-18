---
title: "👩‍💻 2668. 숫자 고르기"
description: "알고리즘 문제 풀기"
date: 2022-01-13
update: 2022-01-13
tags:
  - 그래프이론
  - 그래프탐색
  - DFS
series: "👩‍💻 BOJ"
---

## 문제

세로 두 줄, 가로로 N개의 칸으로 이루어진 표가 있다. 첫째 줄의 각 칸에는 정수 1, 2, …, N이 차례대로 들어 있고 둘째 줄의 각 칸에는 1이상 N이하인 정수가 들어 있다. 첫째 줄에서 숫자를 적절히 뽑으면, 그 뽑힌 정수들이 이루는 집합과, 뽑힌 정수들의 바로 밑의 둘째 줄에 들어있는 정수들이 이루는 집합이 일치한다. 이러한 조건을 만족시키도록 정수들을 뽑되, 최대로 많이 뽑는 방법을 찾는 프로그램을 작성하시오. 예를 들어, N=7인 경우 아래와 같이 표가 주어졌다고 하자.

<img src="https://www.acmicpc.net/upload/images/u5JZnfExdtFXjmR.png" width="30%">

이 경우에는 첫째 줄에서 1, 3, 5를 뽑는 것이 답이다. 첫째 줄의 1, 3, 5밑에는 각각 3, 1, 5가 있으며 두 집합은 일치한다. 이때 집합의 크기는 3이다. 만약 첫째 줄에서 1과 3을 뽑으면, 이들 바로 밑에는 정수 3과 1이 있으므로 두 집합이 일치한다. 그러나, 이 경우에 뽑힌 정수의 개수는 최대가 아니므로 답이 될 수 없다.

### 입력
- 첫째 줄에는 N(1≤N≤100)을 나타내는 정수 하나가 주어진다. 그 다음 줄부터는 표의 둘째 줄에 들어가는 정수들이 순서대로 한 줄에 하나씩 입력된다.

### 출력
- 첫째 줄에 뽑힌 정수들의 개수를 출력하고, 그 다음 줄부터는 뽑힌 정수들을 작은 수부터 큰 수의 순서로 한 줄에 하나씩 출력한다.

### 📍 **Logic**

```java
class Graph {
    int[] graph;
    int[] visited;
    PriorityQueue<Integer> path = new PriorityQueue<>();
}
```

- 입력되는 숫자들을 저장하는 `graph` 배열, 각 정점의 방문여부를 저장하는 `visited` 배열, 사이클을 이루는 정점들을 저장하는 `path` 우선순위 큐

```java
public void solution() {
    for (int i=1; i<graph.length; i++) {
        if (dfs(i, i) == 1) {
            path.add(i);
        }
        visited = new int[graph.length];
    }
    printList();
}
```

- 각 정점을 시작으로 하여, `dfs` 의 리턴값으로 사이클의 존재여부 확인
- 존재하는 경우, `path` 우선순위 큐에 저장
- 방문 여부를 저장하는 `visited` 초기화

```java
public int dfs (int start, int end) {
    if (visited[end] == 0) {
        visited[end] = 1;
        return dfs(start, graph[end]);
    }
    else {
        return (start == end) ? 1 : 0;
    }
}
```

- 시작점, 시작점에서 이어지는 정점을 인자로 받아, 방문여부를 확인하고 방문 체크
- 이어지는 정점이 방문한 경우, 시작점과 동일한지 확인
  - 동일한 경우, **사이클이 존재** → 1 반환

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1" data-language="java">

        import java.util.*;

        class Graph {
            int[] graph;
            int[] visited;
            PriorityQueue<Integer> path = new PriorityQueue<>();

            public Graph(int size) {
                graph = new int[size+1];
                visited = new int[size+1];
            }

            public void AddElement(int idx, int item) {
                graph[idx] = item;
            }

            public void solution() {
                for (int i=1; i<graph.length; i++) {
                    if (dfs(i, i) == 1) {
                        path.add(i);
                    }
                    visited = new int[graph.length];
                }
                printList();
            }

            public int dfs (int start, int end) {
                if (visited[end] == 0) {
                    visited[end] = 1;
                    return dfs(start, graph[end]);
                }
                else {
                    return (start == end) ? 1 : 0;
                }
            }

            public void printList() {
                System.out.println(path.size());
                for (int t : path)
                    System.out.println(t);
            }
        }

        public class Main {
            public static void main(String[] args) {
                Scanner sc = new Scanner(System.in);
                int T = sc.nextInt();

                Graph g = new Graph(T);

                for (int i=1; i<=T; i++) {
                    g.AddElement(i, sc.nextInt());
                }

                g.solution();

                sc.close();
            }
        }
  </div>
</details>

### ✏️ **Review**
- 전에 <strong>C++</strong>로 푼 문제였는데, JAVA로 변환하면서 다시 한 번 아이디어를 생각해보았다.
- 그래프 문제이기 때문에, 유향이든 무향이든 어쨌든 그래프로의 표현이 가능하다는 의미라고 생각해 정점 간의 인접 정보를 표현하고 이를 그려 아이디어를 생각해보았다.
- 사이클이 존재하는 경우, 사이클을 형성하는 PATH가 정답이 된다고 생각했다.
  - 방문한 정점에 다시 방문하는 경우로 구현하려고 했으나, 방문 여부 변경과 확인 시점에서 막혔다.

### 📕 출처
https://www.acmicpc.net/problem/2668
---
title: "👩‍💻 72413. 합승 택시 요금"
description: "알고리즘 문제 풀기"
date: 2022-07-02
update: 2022-07-02
tags:
  - 
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 합승 택시 요금](https://programmers.co.kr/learn/courses/30/lessons/72413)

### 📍 **Logic**

```java
private static int[] dijkstra(int start) {
    int[] costs = new int[n + 1];
    Arrays.fill(costs, Integer.MAX_VALUE);

    Queue<Edge> queue = new PriorityQueue<>();
    queue.add(new Edge(start, 0));
    costs[start] = 0;

    while(!queue.isEmpty()) {
        Edge node = queue.poll();
        int now = node.dest;
        int weight = node.weight;

        // 현재 비용보다 더 큰 경우는 패스
        if (weight > costs[now]) continue;

        // 현재 정점에서 갈 수 있는 엣지 리스트
        ArrayList<Edge> edges = adjList[now];
        for (Edge e : edges) {
            // 현재(now) 정점까지의 비용과 다음으로 이동할 엣지의 비용의 합
            int cost = costs[now] + e.weight;

            // 이전 비용보다 새로운 비용이 더 작은 경우 갱신
            if (cost < costs[e.dest]) {
                costs[e.dest] = cost;
                queue.add(new Edge(e.dest, cost));
            }
        }
    }

    return costs;
}
```
- 다익스트라 알고리즘을 사용해 주어진 기점을 기준으로 각 지점까지의 최소 비용을 구하고, 이를 반환한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Edge implements Comparable<Edge> {
        int dest;
        int weight;

        public Edge(int dest, int weight) {
            this.dest = dest;
            this.weight = weight;
        }
        
        // 다익스트라 알고리즘 사용을 위해 비용 기준 오름차순 정렬
        @Override
        public int compareTo(Edge n) {
            return this.weight - n.weight;
        }
    }

    // 각 지점까지의 최소 거리를 구한다.
    // 이후 1 ~ N까지의 지점을 합승 지점으로 두고, 최소 비용을 구한다.
    class Solution {
        static ArrayList<Edge>[] adjList;
        static int n;
        
        public int solution(int n, int s, int a, int b, int[][] fares) {
            this.n = n;
            init(fares);

            // S를 기점으로 최소 비용 계산
            int[] startFromSrc = dijkstra(s);
            // A를 기점으로 최소 비용 계산
            int[] startFromA = dijkstra(a);
            // B를 기점으로 최소 비용 계산
            int[] startFromB = dijkstra(b);

            int answer = Integer.MAX_VALUE;

            for (int i = 1; i <= n; i++)
                // i는 합승 지점
                // src로부터 i까지의 최소 비용 + i로부터 a까지의 최소 비용 + i로부터 b까지의 최소 비용
                answer = Math.min(answer, startFromSrc[i] + startFromA[i] + startFromB[i]);
            return answer;
        }
        
        // 인접 리스트 생성 및 초기화
        private static void init(int[][] fares) {
            adjList = new ArrayList[n + 1];

            for (int i = 1; i < n + 1; i++)
                adjList[i] = new ArrayList<>();

            for (int[] fare : fares) {
                adjList[fare[0]].add(new Edge(fare[1], fare[2]));
                adjList[fare[1]].add(new Edge(fare[0], fare[2]));
            }
        }
        
        private static int[] dijkstra(int start) {
            int[] costs = new int[n + 1];
            Arrays.fill(costs, Integer.MAX_VALUE);

            Queue<Edge> queue = new PriorityQueue<>();
            queue.add(new Edge(start, 0));
            costs[start] = 0;

            while(!queue.isEmpty()) {
                Edge node = queue.poll();
                int now = node.dest;
                int weight = node.weight;

                // 현재 비용보다 더 큰 경우는 패스
                if (weight > costs[now]) continue;

                // 현재 정점에서 갈 수 있는 엣지 리스트
                ArrayList<Edge> edges = adjList[now];
                for (Edge e : edges) {
                    // 현재(now) 정점까지의 비용과 다음으로 이동할 엣지의 비용의 합
                    int cost = costs[now] + e.weight;

                    // 이전 비용보다 새로운 비용이 더 작은 경우 갱신
                    if (cost < costs[e.dest]) {
                        costs[e.dest] = cost;
                        queue.add(new Edge(e.dest, cost));
                    }
                }
            }

            return costs;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- source가 주어지고, 각 지점까지의 최소 비용을 구하는 **Single Source Shortest Path** 문제라는 것은 쉽게 알 수 있었고, 다익스트라 알고리즘을 사용했다.
- 다만, 합승 지점이라는 조건에 대해 막혔다. 
  - **`S -> X`, `X -> A`, `X -> B` 에서 X가 1 ~ N 지점이 가능**하다는 아이디어가 주요했다.
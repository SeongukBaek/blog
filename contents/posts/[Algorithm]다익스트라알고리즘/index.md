---
title: "💡 다익스트라(Dijkstra) 알고리즘"
description: "개발 상식"
date: 2022-05-13
update: 2022-05-13
tags:
  - 개발상식
  - Java
  - Dijkstra
series: "💡 Algorithm"
---

## 🧷 다익스트라(Dijkstra) 알고리즘
DP를 활용한 최단 경로 탐색 알고리즘으로, 시작 정점 `s` 에서부터 다른 정점들까지의 최단 거리를 계산한다.
- DP가 적용되는 이유는, 굳이 한 번 최단 거리를 구한 곳은 다시 구할 필요가 없기 때문이다.
- 그리고 이를 활용해 정점에서 정점까지 간선을 따라 이동할 때 최단 거리를 효율적으로 구할 수 있다.

> 간선의 값이 양수인 경우만 알고리즘을 사용할 수 있다.

> **음수 간선이 존재하면 안되는 이유?**
> <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc3lSDe%2Fbtrhn3zNgfu%2FctA1FRLMWNuzRvvssYPIkk%2Fimg.png" width="30%">
> - 위 경우, A에서 출발하여 `dist[B] = 10` , `dist[C] = 4` 로 업데이트한 후,
> - 가장 비용이 작은 C로 이동할 것이다. 그렇게 되면, 더 이상 C의 거리가 갱신될 일이 없어 -90이 아닌 4로 종료된다.
> 
> 하지만, 우선순위 큐를 사용해 방문한 정점에 대해서 재방문하여 최소 비용을 저장한다면 음수 가중치에 대한 계산이 가능하다. 이는 아래에서 구현한다.

<img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Dijkstra_Animation.gif" width="70%">

다익스트라 알고리즘의 구현을 위해 2가지를 저장해야 한다.
- 해당 정점까지의 최단 거리
- 정점 방문 여부

### 🪚 과정
1. 최단 거리 값은 무한대 값으로 초기화
2. 시작 정점의 최단 거리는 0이다. (방문 처리)
3. 시작 정점과 연결된 정점들의 최단 거리 값을 갱신
4. 방문하지 않은 정점 중 최단 거리가 최소인 정점을 탐색
5. 찾은 정점을 방문 체크하고, 해당 정점과 연결된 미방문 정점의 최단 거리 값을 갱신
6. 모든 정점을 방문할 때까지 4~5번 반복

### 🪚 시간 복잡도
- 인접 행렬 구현 시: $O(N^2)$
- 인접 리스트 구현 시: $O(NlogN)$

### 🪚 일종의 개선?
**우선순위 큐**를 사용해 거리가 가장 가까운 정점부터 방문할 수 있도록 한다.
- 우선순위 큐에 정점의 번호와 지금까지 찾아낸 해당 정점까지의 최단 거리를 쌍으로 저장한다.
- 아직 방문하지 않은 정점 중 시작점으로부터의 거리가 가장 가까운 점을 찾는 과정을 간단하게 해준다.

우선순위 큐를 사용한따는 점을 제외하면, BFS와 비슷한 구조의 알고리즘이다.
- 각 정점까지의 최단 거리를 저장하는 배열을 유지하며,
- 정점 방문마다 인접한 정점을 모두 검사한다.

```java
class Pair implements Comparable<Node> {
  int num;
  int weight;

  public Pair(int num, int weight) {
    this.num = num;
    this.weight = weight;
  }

  @Override
  public int compareTo(Node n) {
      return this.weight - n.weight;
  }
}

int V;
ArrayList<ArrayList<Pair>> adjList = new ArrayList<>();

int[] dijkstra(int src) {
  int[] dist = new int[V];
  Arrays.fill(dist, Integer.MAX_VALUE);
  dist[src] = 0;

  Queue<Pair> queue = new PriorityQueue<>();
  queue.add(new Pair(src, 0));

  while(!queue.isEmpty()) {
    Pair p = queue.poll();
    int here = p.num;
    int cost = p.weight;

    if (dist[here] < cost) continue;

    for (int i = 0; i < adjList.get(here).size(); i++) {
      int there = adjList.get(here).get(i).num;
      int nextDist = cost + adjList.get(here).get(i).weight;

      if (dist[there] > nextDist) {
        dist[there] = nextDist;
        queue.add(new Pair(there, nextDist));
      }
    }
  }
}
```

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog)
- [[Algorithm] 다익스트라 알고리즘 : 음수 간선이 있으면 안 되는 이유](https://kangworld.tistory.com/76)
- [**프로그래밍 대회에서 배우는 알고리즘 문제 해결 전략**] 구종만
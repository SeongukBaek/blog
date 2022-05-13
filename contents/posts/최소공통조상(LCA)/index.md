---
title: "💡 최소 공통 조상(LCA)"
description: "개발 상식"
date: 2022-05-13
update: 2022-05-13
tags:
  - 개발상식
  - Java
  - LCA
series: "💡 Algorithm"
---

## 🧷 최소 공통 조상
Lowest Common Ancestor 알고리즘으로, 트리에서 두 정점이 만나는 **최초 부모 정점**을 찾는 알고리즘이다.
- 트리 문제에서 공통 조상을 찾아야 하거나, 정점과 정점 사이의 이동거리 또는 방문경로를 저장해야 할 경우 사용할 수 있다.

<img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/lca.png" width="70%">

### 🪚 과정
해당 정점의 `depth` 와 `parent` 를 저장하는 방식이다. 위 그림에서의 `depth` 와 `parent` 는 아래와 같다.

```
[depth : 정점]
0 -> 1
1 -> 2, 3
2 -> 4, 5, 6, 7

int[] parent = {0, 1, 1, 2, 2, 3, 3};
```

```java
class Main {
  // 정점 번호가 0부터 시작한다고 가정
  // depth와 parent 초기화
  static int[] depth = {0,1,1,2,2,2,2};
  static int[] parent = {0,1,1,2,2,3,3};

  public static void main(String[] args) {
    int node1 = 3;
    int node2 = 4;
    int LCA = 0;

    while(true){
      if(depth[node1] == depth[node2]) {
        // depth가 같은 경우
        if(parent[node1] == parent[node2]) {
          // 부모가 같은 경우, LCA를 찾음
          LCA = parent[node1];
          break;
        } else {
          // 부모가 다르기에 상위 정점으로 이동
          node1 = parent[node1];
          node2 = parent[node2];
        }
      } else {
        // depth가 다른 경우. 더 작은 depth의 정점을 상위로 이동
        if (depth[node1] > depth[node2]) {
          node1 = parent[node1];
        } else {
          node2 = parent[node2];
        }
      }
    }

    System.out.println("LCA is: " + LCA);
  }
} 
```

하지만 위 방식은 1세대 부모만을 반복해서 찾아 올라가기 때문에 $O(N)$ 의 시간복잡도를 가지게 된다. 이를 개선하기 위해 "1, 2, 4, 8, ... 칸 떨어진 부모가 누군지도 기록"하여 사용한다. 이는 $O(logN)$ 의 시간복잡도를 가진다.

### 🪚 개선 과정
1차원 `parent` 배열을, $2^0, 2^1, 2^2, ...$ 부모의 정보도 저장하기 위해 2차원 `parent` 배열로 변경한다.
- `parent[n][k]` (n = Tree의 정점 수, k = log(n)의 올림)

먼저 주어진 tree와 root를 가지고, DFS를 수행하면서 각 정점과 연결된 **1세대 부모**와, **깊이 정보**를 구한다.

```java
int[][] parent = new int[n][k];
int[] depth = new int[n];
Arrays.fill(depth, -1);

void dfs(int cur) {
  for (int next : adj[cur]) {
    if (depth[next] == -1) {
      parent[next][0] = cur;
      depth[next] = depth[cur] + 1;
      dfs(next);
    }
  }
  return;
}
```

이제 구한 1세대 부모 정보를 이용해, $2^1, 2^2, ...$ 부모의 정보를 구해야 한다.
- 현재를 기준으로 2($2^1$)칸 떨어진 부모는 "현재의 1($2^0$)칸 떨어진 부모의 1($2^0$)칸 떨어진 부모"이다.
- 현재를 기준으로 4($2^2$)칸 떨어진 부모는 "현재의 2($2^1$)칸 떨어진 부모의 2($2^1$)칸 떨어진 부모"이다.
- 즉, **현재를 기준으로 $2^k$칸 떨어진 부모는 현재의 $2^{k-1}$칸 떨어진 부모의 $2^{k-1}$칸 떨어진 부모이다.**

```java
// max = logN의 올림
void connectParents() {
  for (int k = 1; k < max; k++) {
    for (int cur = 1; cur <= n; cur++) {
      parent[cur][k] = parent[parent[cur][k-1]][k-1];
    }
  }
}
```

완성된 정보를 이용하여, 아래의 과정으로 LCA를 찾는다.
- 두 정점의 `depth` 를 같도록 한다.
- 부모가 같은 정점에 도달할 때까지 위로 점프한다.

먼저 두 정점의 `depth` 가 같도록 하기 위해, 두 정점 간의 `depth` 차이를 구한다.
- `depth` 의 차가 `3` 이라고 가정하면, 점프를 2의 지수로 하기에, `3` 을 2진수로 변환한다.
  - `3` -> `11(2)` 으로 나타낼 수 있고, 이는 $2^0$칸짜리 1번, $2^1$칸짜리 1번 점프를 의미한다.
  - 만약 차가 `11` 이라면, `1011(2)` 로 나타낼 수 있고, 이는 $2^0$칸짜리 1번, $2^1$칸짜리 1번, $2^3$칸짜리 1번 점프를 의미한다.

```java
int getLCA(int u, int v) {
  // u를 더 깊은 정점으로!
  if (depth[u] < depth[v]) swap(u, v);

  int diffDist = depth[u] - depth[v];

  for (int i = 0; diffDist != 0; i++) {
    if (diffDist % 2 == 1) u = parent[u][i];
    diffDist /= 2;
  }
}
```

이제 `depth` 가 같아졌고, 부모가 같은 정점에 도달할 때까지 두 정점을 함께 점프할 것이다.
- $2^{log(트리의\ 정점\ 수\ n)의\ 올림}$ 만큼 부모를 가지기에, 트리의 정점 수보다 더 큰 범위의 부모 정보를 가질 수 있다. 이는 -1로 저장되도록 한다. (메모리의 낭비를 막기 위해 최적화가 가능할 것)
- 큰 범위의 부모부터 내림차순으로 (16, 8, 4, 2, 1) 부모 정보를 확인하면서 점프한다.
- 위에서 `diffDist` 만큼 이동했던 것과 비슷한 방식으로 수행하는데, **도착지는 LCA 바로 밑의 자식이라고 가정**한다.
  - 점프했는데, 두 정점의 부모가 동일하다면, 도착지를 넘어버린 경우이고,
  - 부모의 값이 -1이라면 트리의 범위를 벗어난 경우이다.

```java
int getLCA(int u, int v) {
  ...

  if (u != v) {
    // 점프 가능한 최대부터 시작
    for (int i = max - 1; i >= 0; i--) {
      // -1이라면 트리의 범위 밖, 두 부모가 같다면 LCA가 아님(도착지를 넘어버린 경우)
      // 그렇지 않은 경우에 대해 점프를 수행, LCA의 바로 밑 정점으로 점프
      if (parent[u][i] != -1 && parent[u][i] != parent[v][i]) {
        u = parent[u][i];
        v = parent[v][i];
      }
    }
    // LCA 바로 밑 정점으로 점프했기에, 1칸 위가 LCA
    u = parent[u][0];
  }
  return u;
}
```

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog)
- [최소 공통 조상(LCA, Lowest Common Ancestor)(C/C++)](https://kibbomi.tistory.com/201)
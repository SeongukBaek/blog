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

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog)
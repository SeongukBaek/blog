---
title: "👩‍💻 1707. 이분그래프"
description: "알고리즘 문제 풀기"
date: 2022-01-12
update: 2022-01-12
tags:
  - 그래프이론
  - 그래프탐색
  - BFS
  - DFS
series: "👩‍💻 BOJ"
---

## 문제

그래프의 정점의 집합을 둘로 분할하여, 각 집합에 속한 정점끼리는 서로 인접하지 않도록 분할할 수 있을 때, 그러한 그래프를 특별히 이분 그래프 (Bipartite Graph) 라 부른다.

그래프가 입력으로 주어졌을 때, 이 그래프가 이분 그래프인지 아닌지 판별하는 프로그램을 작성하시오.

### 입력
- 입력은 여러 개의 테스트 케이스로 구성되어 있는데, 첫째 줄에 테스트 케이스의 개수 K가 주어진다. 각 테스트 케이스의 첫째 줄에는 그래프의 정점의 개수 V와 간선의 개수 E가 빈 칸을 사이에 두고 순서대로 주어진다. 각 정점에는 1부터 V까지 차례로 번호가 붙어 있다. 이어서 둘째 줄부터 E개의 줄에 걸쳐 간선에 대한 정보가 주어지는데, 각 줄에 인접한 두 정점의 번호 u, v (u ≠ v)가 빈 칸을 사이에 두고 주어진다. 

### 출력
- K개의 줄에 걸쳐 입력으로 주어진 그래프가 이분 그래프이면 YES, 아니면 NO를 순서대로 출력한다.

### 📍 **Logic**

```java
class Graph {
    final List<Integer>[] graph;
    final int[] Binary = { -1, 1 };
    int[] discovered;
    boolean isBinaryGraph = true;
    int toggle = 0;

    public Graph(int size) {
        this.graph = new ArrayList[size+1];
        discovered = new int[size+1];

        for (int i = 0; i <= size; i++) {
            graph[i] = new ArrayList<>();
        }
    }
}
```

- 그래프의 정보를 저장하기 위한 클래스

```java
public boolean solution() {
    for (int i=1; i < graph.length; i++) {
        if (graph[i].size() > 0 & discovered[i] == 0) {
            isBinaryGraph = this.bfs(i);
            if (!isBinaryGraph)
                break;
        }
    }
    return this.isBinaryGraph;
}
```

- 인접 정점 정보가 있고, 아직 방문하지 않은 정점에 대해 *BFS* 를 수행
  - 정점의 방문 여부는 (0: 미방문), (-1: 1그룹), (1: 2그룹)
- 이분 그래프인지를 저장하는 `isBinaryGraph` 에 `false` 가 나오면 더 이상의 탐색을 종료하고 이를 반환
- `false` 가 계속 나오지 않으면 이분 그래프이므로 초기값인 `true` 가 반환
  
```java
public boolean bfs(int parent) {
    Queue<Integer> q = new LinkedList<>();
    q.add(parent);
    while (!q.isEmpty()) {
        int now = q.poll();
        if (discovered[now] == 0) { discovered[now] = Binary[toggle]; }
        toggle = (discovered[now] == -1 ? 1 : 0);
        for (int tmp : graph[now]) {
            if (discovered[tmp] == 0) {
                q.add(tmp);
                discovered[tmp] = Binary[toggle];
            } else if (discovered[tmp] == discovered[now])
                return false;
        }
    }
    return true;
}
```

- `Queue` 를 이용하여 **BFS** 수행
- 방문하지 않은 정점은 방문 여부 값을 가지고 있는 `Binary` 배열과 `toggle` 변수로 **setting**
- **BFS 단계별 서로 다른 방문 값 저장**
- 다음 방문할 정점이 **이미 방문**했고, 현재 방문 정점과 **같은 방문 값**을 가진다면 **이분 그래프 불가**
  
### 📄 **틀린 CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.ArrayList;
    import java.util.Scanner;

    class Graph {
        private final ArrayList<ArrayList<Integer>> graph;
        private int[] discovered;
        private boolean oddCycle = false;
        private int dis;

        public Graph(int size) {
            this.graph = new ArrayList<>();

            for (int i = 0; i <= size; i++) {
                graph.add(new ArrayList<>());
            }
        }

        public void DoubleAdd(int x, int y) {
            graph.get(x).add(y);
            graph.get(y).add(x);
        }

        public boolean isOddCycle(int s, int n) {
            discovered = new int[20001];
            dis = 1;
            this.dfs(s, n);
            return this.oddCycle;
        }

        public void dfs(int parent, int now) {
            discovered[now] = dis++;
            int size = graph.get(now).size();
            if (size == 0) return;
            for (int i = 0; i < size; i++) {
                int idx = graph.get(now).get(i);
                if (discovered[idx] == 0) {
                    this.dfs(now, idx);
                }
                else if (idx != parent && ((discovered[now] - discovered[idx])%2 == 0)) {
                    this.oddCycle = true;
                }
            }
        }
    }

    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int T = sc.nextInt();

            while (T > 0) {
                int v = sc.nextInt();
                int e = sc.nextInt();
                sc.nextLine();
                boolean isOdd = false;

                Graph g = new Graph(v);

                for (int i = 0; i < e; i++) {
                    String str = sc.nextLine();
                    int a = str.charAt(0) - '0';
                    int b = str.charAt(2) - '0';

                    g.DoubleAdd(a,b);
                }

                for (int i = 1; i <= v; i++) {
                    isOdd = g.isOddCycle(i, i);
                    // odd가 한 번이라도 true면 이분 그래프가 될 수 없다.
                    if (isOdd)
                        break;
                }

                if (!isOdd)
                    System.out.println("YES");
                else
                    System.out.println("NO");
                T-=1;
            }

            sc.close();
        }
    }
  	</div>
</details>

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Graph {
        final List<Integer>[] graph;
        final int[] Binary = { -1, 1 };
        int[] discovered;
        boolean isBinaryGraph = true;
        int toggle = 0;

        public Graph(int size) {
            this.graph = new ArrayList[size+1];
            discovered = new int[size+1];

            for (int i = 0; i <= size; i++) {
                graph[i] = new ArrayList<>();
            }
        }

        public void DoubleAdd(int x, int y) {
            graph[x].add(y);
            graph[y].add(x);
        }

        public boolean solution() {
            for (int i=1; i < graph.length; i++) {
                if (graph[i].size() > 0 & discovered[i] == 0) {
                    isBinaryGraph = this.bfs(i);
                    if (!isBinaryGraph)
                        break;
                }
            }
            return this.isBinaryGraph;
        }

        public boolean bfs(int parent) {
            Queue<Integer> q = new LinkedList<>();
            q.add(parent);
            while (!q.isEmpty()) {
                int now = q.poll();
                if (discovered[now] == 0) { discovered[now] = Binary[toggle]; }
                toggle = (discovered[now] == -1 ? 1 : 0);
                for (int tmp : graph[now]) {
                    if (discovered[tmp] == 0) {
                        q.add(tmp);
                        discovered[tmp] = Binary[toggle];
                    } else if (discovered[tmp] == discovered[now])
                        return false;
                }
            }
            return true;
        }
    }

    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int T = sc.nextInt();

            while (T > 0) {
                int v = sc.nextInt();
                int e = sc.nextInt();
                sc.nextLine();

                Graph g = new Graph(v);

                for (int i = 0; i < e; i++) {
                    int a = sc.nextInt();
                    int b = sc.nextInt();
                    g.DoubleAdd(a,b);
                }

                if (g.solution())
                    System.out.println("YES");
                else
                    System.out.println("NO");
                T-=1;
            }
            sc.close();
        }
    }
  	</div>
</details>

### ✏️ **Review**

- 논리는 "DFS를 이용해 **홀수개의 정점끼리 사이클**을 이루는 경우 **이분그래프가 될 수 없다**" 였고, 반례를 통해 확인했을때 얼추 맞는 것 같으나, 계속 `런타임 에러 (IndexOutOfBounds)` 가 떠서 진전이 없었다.
- 10번 이상의 에러로 정신이 나가버릴 것 같아 BFS를 이용하는 방법으로 바꿔보기로 했다.
  - BFS를 이용하는 경우, 방문 순서로는 해결할 수 없을 것 같아 다른 방법을 고안해야 했다.
- DFS, BFS를 확실하게 이해할 수 있었던 것 같다.

```java
String str = sc.nextLine();
int a = str.charAt(0) - '0';
int b = str.charAt(2) - '0';
```

- 위 방식으로 `1 2` 형식의 숫자를 입력받으니 `10 12` 와 같은 경우 당연히 틀릴 수 밖에 없었다 ...

### 📕 출처
https://www.acmicpc.net/problem/1707
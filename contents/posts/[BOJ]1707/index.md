---
title: "๐ฉโ๐ป 1707. ์ด๋ถ๊ทธ๋ํ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-01-12
update: 2022-01-12
tags:
  - ๊ทธ๋ํ์ด๋ก 
  - ๊ทธ๋ํํ์
  - BFS
  - DFS
series: "๐ฉโ๐ป BOJ"
---

## ๋ฌธ์ 

๊ทธ๋ํ์ ์ ์ ์ ์งํฉ์ ๋๋ก ๋ถํ ํ์ฌ, ๊ฐ ์งํฉ์ ์ํ ์ ์ ๋ผ๋ฆฌ๋ ์๋ก ์ธ์ ํ์ง ์๋๋ก ๋ถํ ํ  ์ ์์ ๋, ๊ทธ๋ฌํ ๊ทธ๋ํ๋ฅผ ํน๋ณํ ์ด๋ถ ๊ทธ๋ํ (Bipartite Graph) ๋ผ ๋ถ๋ฅธ๋ค.

๊ทธ๋ํ๊ฐ ์๋ ฅ์ผ๋ก ์ฃผ์ด์ก์ ๋, ์ด ๊ทธ๋ํ๊ฐ ์ด๋ถ ๊ทธ๋ํ์ธ์ง ์๋์ง ํ๋ณํ๋ ํ๋ก๊ทธ๋จ์ ์์ฑํ์์ค.

### ์๋ ฅ
- ์๋ ฅ์ ์ฌ๋ฌ ๊ฐ์ ํ์คํธ ์ผ์ด์ค๋ก ๊ตฌ์ฑ๋์ด ์๋๋ฐ, ์ฒซ์งธ ์ค์ ํ์คํธ ์ผ์ด์ค์ ๊ฐ์ K๊ฐ ์ฃผ์ด์ง๋ค. ๊ฐ ํ์คํธ ์ผ์ด์ค์ ์ฒซ์งธ ์ค์๋ ๊ทธ๋ํ์ ์ ์ ์ ๊ฐ์ V์ ๊ฐ์ ์ ๊ฐ์ E๊ฐ ๋น ์นธ์ ์ฌ์ด์ ๋๊ณ  ์์๋๋ก ์ฃผ์ด์ง๋ค. ๊ฐ ์ ์ ์๋ 1๋ถํฐ V๊น์ง ์ฐจ๋ก๋ก ๋ฒํธ๊ฐ ๋ถ์ด ์๋ค. ์ด์ด์ ๋์งธ ์ค๋ถํฐ E๊ฐ์ ์ค์ ๊ฑธ์ณ ๊ฐ์ ์ ๋ํ ์ ๋ณด๊ฐ ์ฃผ์ด์ง๋๋ฐ, ๊ฐ ์ค์ ์ธ์ ํ ๋ ์ ์ ์ ๋ฒํธ u, v (u โ  v)๊ฐ ๋น ์นธ์ ์ฌ์ด์ ๋๊ณ  ์ฃผ์ด์ง๋ค. 

### ์ถ๋ ฅ
- K๊ฐ์ ์ค์ ๊ฑธ์ณ ์๋ ฅ์ผ๋ก ์ฃผ์ด์ง ๊ทธ๋ํ๊ฐ ์ด๋ถ ๊ทธ๋ํ์ด๋ฉด YES, ์๋๋ฉด NO๋ฅผ ์์๋๋ก ์ถ๋ ฅํ๋ค.

### ๐ **Logic**

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

- ๊ทธ๋ํ์ ์ ๋ณด๋ฅผ ์ ์ฅํ๊ธฐ ์ํ ํด๋์ค

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

- ์ธ์  ์ ์  ์ ๋ณด๊ฐ ์๊ณ , ์์ง ๋ฐฉ๋ฌธํ์ง ์์ ์ ์ ์ ๋ํด *BFS* ๋ฅผ ์ํ
  - ์ ์ ์ ๋ฐฉ๋ฌธ ์ฌ๋ถ๋ (0: ๋ฏธ๋ฐฉ๋ฌธ), (-1: 1๊ทธ๋ฃน), (1: 2๊ทธ๋ฃน)
- ์ด๋ถ ๊ทธ๋ํ์ธ์ง๋ฅผ ์ ์ฅํ๋ `isBinaryGraph` ์ `false` ๊ฐ ๋์ค๋ฉด ๋ ์ด์์ ํ์์ ์ข๋ฃํ๊ณ  ์ด๋ฅผ ๋ฐํ
- `false` ๊ฐ ๊ณ์ ๋์ค์ง ์์ผ๋ฉด ์ด๋ถ ๊ทธ๋ํ์ด๋ฏ๋ก ์ด๊ธฐ๊ฐ์ธ `true` ๊ฐ ๋ฐํ
  
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

- `Queue` ๋ฅผ ์ด์ฉํ์ฌ **BFS** ์ํ
- ๋ฐฉ๋ฌธํ์ง ์์ ์ ์ ์ ๋ฐฉ๋ฌธ ์ฌ๋ถ ๊ฐ์ ๊ฐ์ง๊ณ  ์๋ `Binary` ๋ฐฐ์ด๊ณผ `toggle` ๋ณ์๋ก **setting**
- **BFS ๋จ๊ณ๋ณ ์๋ก ๋ค๋ฅธ ๋ฐฉ๋ฌธ ๊ฐ ์ ์ฅ**
- ๋ค์ ๋ฐฉ๋ฌธํ  ์ ์ ์ด **์ด๋ฏธ ๋ฐฉ๋ฌธ**ํ๊ณ , ํ์ฌ ๋ฐฉ๋ฌธ ์ ์ ๊ณผ **๊ฐ์ ๋ฐฉ๋ฌธ ๊ฐ**์ ๊ฐ์ง๋ค๋ฉด **์ด๋ถ ๊ทธ๋ํ ๋ถ๊ฐ**
  
### ๐ **ํ๋ฆฐ CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
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
                    // odd๊ฐ ํ ๋ฒ์ด๋ผ๋ true๋ฉด ์ด๋ถ ๊ทธ๋ํ๊ฐ ๋  ์ ์๋ค.
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

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
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

### โ๏ธ **Review**

- ๋ผ๋ฆฌ๋ "DFS๋ฅผ ์ด์ฉํด **ํ์๊ฐ์ ์ ์ ๋ผ๋ฆฌ ์ฌ์ดํด**์ ์ด๋ฃจ๋ ๊ฒฝ์ฐ **์ด๋ถ๊ทธ๋ํ๊ฐ ๋  ์ ์๋ค**" ์๊ณ , ๋ฐ๋ก๋ฅผ ํตํด ํ์ธํ์๋ ์ผ์ถ ๋ง๋ ๊ฒ ๊ฐ์ผ๋, ๊ณ์ `๋ฐํ์ ์๋ฌ (IndexOutOfBounds)` ๊ฐ ๋ ์ ์ง์ ์ด ์์๋ค.
- 10๋ฒ ์ด์์ ์๋ฌ๋ก ์ ์ ์ด ๋๊ฐ๋ฒ๋ฆด ๊ฒ ๊ฐ์ BFS๋ฅผ ์ด์ฉํ๋ ๋ฐฉ๋ฒ์ผ๋ก ๋ฐ๊ฟ๋ณด๊ธฐ๋ก ํ๋ค.
  - BFS๋ฅผ ์ด์ฉํ๋ ๊ฒฝ์ฐ, ๋ฐฉ๋ฌธ ์์๋ก๋ ํด๊ฒฐํ  ์ ์์ ๊ฒ ๊ฐ์ ๋ค๋ฅธ ๋ฐฉ๋ฒ์ ๊ณ ์ํด์ผ ํ๋ค.
- DFS, BFS๋ฅผ ํ์คํ๊ฒ ์ดํดํ  ์ ์์๋ ๊ฒ ๊ฐ๋ค.

```java
String str = sc.nextLine();
int a = str.charAt(0) - '0';
int b = str.charAt(2) - '0';
```

- ์ ๋ฐฉ์์ผ๋ก `1 2` ํ์์ ์ซ์๋ฅผ ์๋ ฅ๋ฐ์ผ๋ `10 12` ์ ๊ฐ์ ๊ฒฝ์ฐ ๋น์ฐํ ํ๋ฆด ์ ๋ฐ์ ์์๋ค ...

### ๐ ์ถ์ฒ
https://www.acmicpc.net/problem/1707
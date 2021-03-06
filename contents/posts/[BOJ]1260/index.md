---
title: "๐ฉโ๐ป 1260. DFS์ BFS"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2021-12-29
update: 2021-12-29
tags:
  - ๊ทธ๋ํ์ด๋ก 
  - ๊ทธ๋ํํ์
  - BFS
  - DFS
series: "๐ฉโ๐ป BOJ"
---

## ๋ฌธ์ 

๊ทธ๋ํ๋ฅผ DFS๋ก ํ์ํ ๊ฒฐ๊ณผ์ BFS๋ก ํ์ํ ๊ฒฐ๊ณผ๋ฅผ ์ถ๋ ฅํ๋ ํ๋ก๊ทธ๋จ์ ์์ฑํ์์ค. ๋จ, ๋ฐฉ๋ฌธํ  ์ ์๋ ์ ์ ์ด ์ฌ๋ฌ ๊ฐ์ธ ๊ฒฝ์ฐ์๋ ์ ์  ๋ฒํธ๊ฐ ์์ ๊ฒ์ ๋จผ์  ๋ฐฉ๋ฌธํ๊ณ , ๋ ์ด์ ๋ฐฉ๋ฌธํ  ์ ์๋ ์ ์ด ์๋ ๊ฒฝ์ฐ ์ข๋ฃํ๋ค. ์ ์  ๋ฒํธ๋ 1๋ฒ๋ถํฐ N๋ฒ๊น์ง์ด๋ค.

### ์๋ ฅ
- ์ฒซ์งธ ์ค์ ์ ์ ์ ๊ฐ์ N(1 โค N โค 1,000), ๊ฐ์ ์ ๊ฐ์ M(1 โค M โค 10,000), ํ์์ ์์ํ  ์ ์ ์ ๋ฒํธ V๊ฐ ์ฃผ์ด์ง๋ค. ๋ค์ M๊ฐ์ ์ค์๋ ๊ฐ์ ์ด ์ฐ๊ฒฐํ๋ ๋ ์ ์ ์ ๋ฒํธ๊ฐ ์ฃผ์ด์ง๋ค. ์ด๋ค ๋ ์ ์  ์ฌ์ด์ ์ฌ๋ฌ ๊ฐ์ ๊ฐ์ ์ด ์์ ์ ์๋ค. ์๋ ฅ์ผ๋ก ์ฃผ์ด์ง๋ ๊ฐ์ ์ ์๋ฐฉํฅ์ด๋ค.

### ์ถ๋ ฅ
- ์ฒซ์งธ ์ค์ DFS๋ฅผ ์ํํ ๊ฒฐ๊ณผ๋ฅผ, ๊ทธ ๋ค์ ์ค์๋ BFS๋ฅผ ์ํํ ๊ฒฐ๊ณผ๋ฅผ ์ถ๋ ฅํ๋ค. V๋ถํฐ ๋ฐฉ๋ฌธ๋ ์ ์ ์์๋๋ก ์ถ๋ ฅํ๋ฉด ๋๋ค.

### ๐ **Logic**

```java
class Graph {
	public ArrayList<ArrayList<Integer>> graph;
    public boolean[] visited = new boolean[1001];
    public StringBuilder path = new StringBuilder();
}
```

- graph๋ฅผ ์ ์ฅํ๊ธฐ ์ํ ๋์  2์ฐจ์ ๋ฐฐ์ด
- ์ ์ ์ ๋ํ ๋ฐฉ๋ฌธ ์ฌ๋ถ ์ ์ฅ์ ์ํ `boolean` ๋ฐฐ์ด
- `DFS` ์ `BFS` ์ ๋ฐฉ๋ฌธ ์์๋ฅผ ์ ์ฅํ๋ `stringBuilder`

```java
public void dfs(int start) {
	if (!visited[start]) {
		path.append(start);
		path.append(" ");
		visited[start] = true;
		for (int i = 0; i < graph.get(start).size(); i++) {
			if (!visited[graph.get(start).get(i)]) {
				this.dfs(graph.get(start).get(i));
			}
		}
	}
}
```

- ์ฌ๊ท ํธ์ถ์ ์ด์ฉํ DFS ๊ตฌํ

```java
public void bfs(int start) {
	Queue<Integer> q = new LinkedList<>();
	q.offer(start);
	visited[start] = true;
	path.append("\n");
	path.append(start);
	while (!q.isEmpty()) {
		int cur = q.poll();
		for (int i = 0; i < graph.get(cur).size(); i++) {
			if (!visited[graph.get(cur).get(i)]) {
				visited[graph.get(cur).get(i)] = true;
				path.append(" ");
				path.append(graph.get(cur).get(i));
				q.offer(graph.get(cur).get(i));
			}
		}
	}
}
```

- Queue๋ฅผ ์ด์ฉํ BFS ๊ตฌํ

```java
for (int i = 1; i <= n; i++) {
	Collections.sort(g.graph.get(i));
}
```

- ๋ฒํธ๊ฐ ๋ฎ์ ์ ์ ๋ถํฐ ๋ฐฉ๋ฌธํ๋ผ๋ ๋ฌธ์ ์ ์กฐ๊ฑด์ ์ํ ์ ๋ ฌ

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

	class Graph {
		public ArrayList<ArrayList<Integer>> graph;
		public boolean[] visited = new boolean[1001];
		public StringBuilder path = new StringBuilder();

		public Graph(int size) {
			this.graph = new ArrayList<ArrayList<Integer>>();

			for (int i = 0; i < size + 1; i++) {
				graph.add(new ArrayList<Integer>());
			}
		}

		public void DoubleAdd(int x, int y) {
			graph.get(x).add(y);
			graph.get(y).add(x);
		}

		public void dfs(int start) {
			if (!visited[start]) {
				path.append(start);
				path.append(" ");
				visited[start] = true;
				for (int i = 0; i < graph.get(start).size(); i++) {
					if (!visited[graph.get(start).get(i)]) {
						this.dfs(graph.get(start).get(i));
					}
				}
			}
		}

		public void bfs(int start) {
			Queue<Integer> q = new LinkedList<>();
			q.offer(start);
			visited[start] = true;
			path.append("\n");
			path.append(start);
			while (!q.isEmpty()) {
				int cur = q.poll();
				for (int i = 0; i < graph.get(cur).size(); i++) {
					if (!visited[graph.get(cur).get(i)]) {
						visited[graph.get(cur).get(i)] = true;
						path.append(" ");
						path.append(graph.get(cur).get(i));
						q.offer(graph.get(cur).get(i));
					}
				}
			}
		}

		public StringBuilder getPath() {
			return path;
		}
	}

	public class Main {
		public static void main(String[] args) {
			Scanner sc = new Scanner(System.in);
			int n = sc.nextInt();
			int m = sc.nextInt();
			int start = sc.nextInt();

			Graph g = new Graph(n);

			for (int i = 0; i < m; i++) {
				int a = sc.nextInt();
				int b = sc.nextInt();

				g.DoubleAdd(a,b);
			}

			for (int i = 1; i <= n; i++) {
				Collections.sort(g.graph.get(i));
			}

			Arrays.fill(g.visited,false);
			g.dfs(start);

			Arrays.fill(g.visited,false);
			g.bfs(start);

			System.out.print(g.getPath().toString());

			sc.close();
		}
	}
  	</div>
</details>

### โ๏ธ **Review**

- ์ฑ๊ณตํ์๋ค๊ฐ ์คํจ๋ก ์ฌ์ฑ์ ๋์ด ์ด๋ฒ ๊ธฐํ์ `JAVA` ๋ก ๋ณํํ๋ฉด์ ๋ค์ ํผ ๋ฌธ์ 
- `class Graph` ์ ๊ฐ์ด ํด๋์ค๋ฅผ ๋ง๋๋ ๋ฐฉ์์ ์ด์ฉํด Graph์ ๊ด๋ จ๋ ์ฒ๋ฆฌ๋ค์ ์ต๋ํ ํด๋์ค ๋ด๋ถ์์ ๊ตฌํํ๋๋ก ํ๋ค.
- ์ฒ์์๋ `int[] path` ๋ฅผ ๋ ๋ฒ ์ฌ์ฉํ์ฌ `DFS` ์ ๊ฒฐ๊ณผ๋ฅผ ์ถ๋ ฅํ๊ณ , `BFS` ์ ๊ฒฐ๊ณผ๋ฅผ ์ถ๋ ฅํ๋ ๋ฐฉ์์ผ๋ก ๊ตฌํํ์๋๋ฐ, ๋ค๋ฅธ ๋ฐฉ์์ ์ฐพ์๋ณด๋ค๊ฐ `StringBuilder` ํด๋์ค๋ผ๋ ๊ฒ์ ๋ฐ๊ฒฌํ์ฌ ์ด๋ฅผ ์ฌ์ฉํด๋ณด์๋ค.
  - `StringBuilder` : ์ฌ๋ฌ ๋ฌธ์์ด์ ๋ถ์ด๋ ์ฐ์ฐ์ ์ํํ๋ ๊ฒฝ์ฐ ํจ์จ์ ์ธ ํด๋์ค๋ก, ํด๋น ๋ฌธ์ ์์๋ ์ ์ ์ ๋ฐฉ๋ฌธ ์์๋ฅผ ์์ฐจ์ ์ผ๋ก ์ ์ฅํ๊ธฐ ์ํด ์ฌ์ฉํ๋ค.
- ๊ตฌํ ๋ฐฉ์์ ํ๋ฆฐ ๊ฒ์ด ์์ด๋ณด์๋๋ฐ ์๊พธ **ํ๋ ธ์ต๋๋ค** ๊ฐ ๋ ์ ํ๊ฐ ๋  ๋ ์ฆ์ ๋ฐ๊ฒฌํ ํ ๋ฐ๋ก๋ก ๋๋ฒ๊น์ ํด๋ณด๋, ์ ๋ ฌ ์ **๋ฐ๋ณต ํ์๊ฐ 1๋ฒ** ๋ชจ์๋ ๊ฒ์ด์๋ค. 
- ์ถ๊ฐ๋ก, `visited` ๋ฐฐ์ด์ `int` ๋ก ํ ๊ฒฝ์ฐ์ `boolean` ์ผ๋ก ํ ๊ฒฝ์ฐ ์๊ฐ๊ณผ ๋ฉ๋ชจ๋ฆฌ ์ฐจ์ด๊ฐ ์กด์ฌํ๋๋ฐ, `boolean` ์ ๋ฉ๋ชจ๋ฆฌ๊ฐ ๋ ์ ๊ณ  ์๊ฐ์ด ๊ฐ์ํ์๊ฑฐ๋ ์์๊ณผ๋ ๋ฌ๋ฆฌ, ๋ฉ๋ชจ๋ฆฌ๊ฐ ์ฆ๊ฐํ ๊ฒ์ ํ์ธํ๋ค. ์์ง ์ด์ ๋ ์ ๋ชจ๋ฅด๊ฒ ๋ค ..

### ๐ ์ถ์ฒ
https://www.acmicpc.net/problem/1260

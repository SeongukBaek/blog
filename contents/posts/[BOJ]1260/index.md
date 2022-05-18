---
title: "👩‍💻 1260. DFS와 BFS"
description: "알고리즘 문제 풀기"
date: 2021-12-29
update: 2021-12-29
tags:
  - 그래프이론
  - 그래프탐색
  - BFS
  - DFS
series: "👩‍💻 BOJ"
---

## 문제

그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다. 정점 번호는 1번부터 N번까지이다.

### 입력
- 첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V가 주어진다. 다음 M개의 줄에는 간선이 연결하는 두 정점의 번호가 주어진다. 어떤 두 정점 사이에 여러 개의 간선이 있을 수 있다. 입력으로 주어지는 간선은 양방향이다.

### 출력
- 첫째 줄에 DFS를 수행한 결과를, 그 다음 줄에는 BFS를 수행한 결과를 출력한다. V부터 방문된 점을 순서대로 출력하면 된다.

### 📍 **Logic**

```java
class Graph {
	public ArrayList<ArrayList<Integer>> graph;
    public boolean[] visited = new boolean[1001];
    public StringBuilder path = new StringBuilder();
}
```

- graph를 저장하기 위한 동적 2차원 배열
- 정점에 대한 방문 여부 저장을 위한 `boolean` 배열
- `DFS` 와 `BFS` 의 방문 순서를 저장하는 `stringBuilder`

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

- 재귀 호출을 이용한 DFS 구현

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

- Queue를 이용한 BFS 구현

```java
for (int i = 1; i <= n; i++) {
	Collections.sort(g.graph.get(i));
}
```

- 번호가 낮은 정점부터 방문하라는 문제의 조건을 위한 정렬

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
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

### ✏️ **Review**

- 성공했었다가 실패로 재채점되어 이번 기회에 `JAVA` 로 변환하면서 다시 푼 문제
- `class Graph` 와 같이 클래스를 만드는 방식을 이용해 Graph와 관련된 처리들을 최대한 클래스 내부에서 구현하도록 했다.
- 처음에는 `int[] path` 를 두 번 사용하여 `DFS` 의 결과를 출력하고, `BFS` 의 결과를 출력하는 방식으로 구현했었는데, 다른 방식을 찾아보다가 `StringBuilder` 클래스라는 것을 발견하여 이를 사용해보았다.
  - `StringBuilder` : 여러 문자열을 붙이는 연산을 수행하는 경우 효율적인 클래스로, 해당 문제에서는 정점의 방문 순서를 순차적으로 저장하기 위해 사용했다.
- 구현 방식은 틀린 것이 없어보였는데 자꾸 **틀렸습니다** 가 떠서 화가 날 때 즈음 발견한 한 반례로 디버깅을 해보니, 정렬 시 **반복 횟수가 1번** 모자란 것이었다. 
- 추가로, `visited` 배열을 `int` 로 한 경우와 `boolean` 으로 한 경우 시간과 메모리 차이가 존재했는데, `boolean` 의 메모리가 더 적고 시간이 감소했을거란 예상과는 달리, 메모리가 증가한 것을 확인했다. 아직 이유는 잘 모르겠다 ..

### 📕 출처
https://www.acmicpc.net/problem/1260

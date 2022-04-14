---
title: "👩‍💻 9466. 텀 프로젝트"
description: "알고리즘 문제 풀기"
date: 2022-01-22
update: 2022-01-22
tags:
  - 그래프이론
  - 그래프탐색
  - DFS
series: "👩‍💻 BOJ"
---

## 문제

이번 가을학기에 '문제 해결' 강의를 신청한 학생들은 텀 프로젝트를 수행해야 한다. 프로젝트 팀원 수에는 제한이 없다. 심지어 모든 학생들이 동일한 팀의 팀원인 경우와 같이 한 팀만 있을 수도 있다. 프로젝트 팀을 구성하기 위해, 모든 학생들은 프로젝트를 함께하고 싶은 학생을 선택해야 한다. (단, 단 한 명만 선택할 수 있다.) 혼자 하고 싶어하는 학생은 자기 자신을 선택하는 것도 가능하다.

학생들이(s1, s2, ..., sr)이라 할 때, r=1이고 s1이 s1을 선택하는 경우나, s1이 s2를 선택하고, s2가 s3를 선택하고,..., sr-1이 sr을 선택하고, sr이 s1을 선택하는 경우에만 한 팀이 될 수 있다.

어느 프로젝트 팀에도 속하지 않는 학생들의 수를 계산하는 프로그램을 작성하라.

### 입력
- 첫째 줄에 테스트 케이스의 개수 T가 주어진다. 각 테스트 케이스의 첫 줄에는 학생의 수가 정수 n (2 ≤ n ≤ 100,000)으로 주어진다. 각 테스트 케이스의 둘째 줄에는 선택된 학생들의 번호가 주어진다. (모든 학생들은 1부터 n까지 번호가 부여된다.)

### 출력
- 각 테스트 케이스마다 한 줄에 출력하고, 각 줄에는 프로젝트 팀에 속하지 못한 학생들의 수를 나타내면 된다.

## 📍 **Logic**

```java
class Graph {
    final int[] graph;
    int[] discovered;
    boolean[] fin;
    int answer = 0;
    int graph_size;

    public Graph(int size) {
        graph_size = size + 1;
        this.graph = new int[graph_size];
        discovered = new int[graph_size];
        fin = new boolean[graph_size];
    }
}
```

- 그래프의 정보를 저장하기 위한 클래스

```java
public void search(int node) {
    if (discovered[node] == 1) return;

    discovered[node] = 1;
    int next = graph[node];

    if (discovered[next] == 0) search(graph[node]);
    else {
        if (!fin[next]) {
            answer++;
            for (int i=next; i!=node; i=graph[i]) {
                answer++;
            }
        }
    }
    fin[node] = true;
}
```

- 다음 방문할 정점이 방문하지 않은 경우는 `search()` 로 **DFS** 수행
- 다음 정점을 이미 방문한 경우, `fin[next]` 로 이미 사이클이 형성된 정점인지 확인
  - 그렇지 않은 경우, 다시 해당 정점으로 돌아오기 전까지 해당 정점과 연결된 정점의 수를 카운트
  - 카운트의 합이 곧 팀을 이루는 학생들이므로, **전체 학생 - 누적 카운트가 정답**
  
### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Graph {
        final int[] graph;
        int[] discovered;
        boolean[] fin;
        int answer = 0;
        int graph_size;

        public Graph(int size) {
            graph_size = size + 1;
            this.graph = new int[graph_size];
            discovered = new int[graph_size];
            fin = new boolean[graph_size];
        }

        public void AddElement(int x, int y) {
            graph[x] = y;
        }

        public int solution() {
            for (int i=1; i < graph_size; i++) this.search(i);
            return graph_size - 1 - this.answer;
        }

        public void search(int node) {
            if (discovered[node] == 1) return;

            discovered[node] = 1;
            int next = graph[node];

            if (discovered[next] == 0) search(graph[node]);
            else {
                if (!fin[next]) {
                    // 다음 갈 정점이 방문은 했으나 아직 끝나지 않은, 즉 사이클이 생성되지 않은 상태
                    answer++;
                    for (int i=next; i!=node; i=graph[i]) {
                        answer++;
                    }
                }
            }
            fin[node] = true;
        }
    }

    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int T = sc.nextInt();

            while (T > 0) {
                int size = sc.nextInt();

                Graph g = new Graph(size);

                for (int i = 1; i <= size; i++) {
                    int tmp = sc.nextInt();
                    g.AddElement(i, tmp);
                }

                System.out.println(g.solution());
                T-=1;
            }
            sc.close();
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 결국은 "사이클을 찾아야 한다" 라는 논리는 맞았지만, 최적화를 해내지 못해 **시간 초과**를 피할 수 없었다.
- 이제부터는 하루에 1문제는 풀어야하기 때문에 너무 시간을 잡아 먹지 않으려고 풀이를 참고했다.

### 📕 출처
Baekjoon : https://www.acmicpc.net/problem/9466

### 참고
https://bcp0109.tistory.com/32
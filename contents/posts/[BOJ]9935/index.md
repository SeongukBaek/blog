---
title: "👩‍💻 9935. 문자열 폭발"
description: "알고리즘 문제 풀기"
date: 2022-04-20
update: 2022-04-20
tags:
  - 문자열
  - 자료구조
  - 스택
series: "👩‍💻 BOJ"
---

## 문제

상근이는 문자열에 폭발 문자열을 심어 놓았다. 폭발 문자열이 폭발하면 그 문자는 문자열에서 사라지며, 남은 문자열은 합쳐지게 된다.

폭발은 다음과 같은 과정으로 진행된다.

- 문자열이 폭발 문자열을 포함하고 있는 경우에, 모든 폭발 문자열이 폭발하게 된다. 남은 문자열을 순서대로 이어 붙여 새로운 문자열을 만든다.
- 새로 생긴 문자열에 폭발 문자열이 포함되어 있을 수도 있다.
- 폭발은 폭발 문자열이 문자열에 없을 때까지 계속된다.

상근이는 모든 폭발이 끝난 후에 어떤 문자열이 남는지 구해보려고 한다. 남아있는 문자가 없는 경우가 있다. 이때는 "FRULA"를 출력한다.

폭발 문자열은 같은 문자를 두 개 이상 포함하지 않는다.

### 입력
- 첫째 줄에 문자열이 주어진다. 문자열의 길이는 1보다 크거나 같고, 1,000,000보다 작거나 같다.
- 둘째 줄에 폭발 문자열이 주어진다. 길이는 1보다 크거나 같고, 36보다 작거나 같다.
- 두 문자열은 모두 알파벳 소문자와 대문자, 숫자 0, 1, ..., 9로만 이루어져 있다.

### 출력
- 첫째 줄에 모든 폭발이 끝난 후 남은 문자열을 출력한다.

## 📍 **Logic**

```java

```

- 
  
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
- 처음에는 `replaceAll()` 함수를 사용해서 매우 간단한 코드로 구현했으나, 47%에서 메모리 초과가 떴다.
  - 당연히 이렇게 쉬울 리는 없다고 생각했고, 게시판을 보니 `replace()` 함수가 메모리를 많이 사용하는 메소드라는 것을 알았다.
- 

### 📕 출처
Baekjoon : https://www.acmicpc.net/problem/9935
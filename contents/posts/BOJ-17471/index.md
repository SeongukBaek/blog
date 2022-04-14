---
title: "👩‍💻 17471. 게리맨더링"
description: "알고리즘 문제 풀기"
date: 2022-03-03
update: 2022-03-03
tags:
  - 그래프이론
  - 그래프탐색
  - 브루트포스
  - 비트마스킹
  - DFS
  - BFS
series: "👩‍💻 BOJ"
---

## 문제

백준시의 시장 최백준은 지난 몇 년간 게리맨더링을 통해서 자신의 당에게 유리하게 선거구를 획정했다. 견제할 권력이 없어진 최백준은 권력을 매우 부당하게 행사했고, 심지어는 시의 이름도 백준시로 변경했다. 이번 선거에서는 최대한 공평하게 선거구를 획정하려고 한다.

백준시는 N개의 구역으로 나누어져 있고, 구역은 1번부터 N번까지 번호가 매겨져 있다. 구역을 두 개의 선거구로 나눠야 하고, 각 구역은 두 선거구 중 하나에 포함되어야 한다. 선거구는 구역을 적어도 하나 포함해야 하고, 한 선거구에 포함되어 있는 구역은 모두 연결되어 있어야 한다. 구역 A에서 인접한 구역을 통해서 구역 B로 갈 수 있을 때, 두 구역은 연결되어 있다고 한다. 중간에 통하는 인접한 구역은 0개 이상이어야 하고, 모두 같은 선거구에 포함된 구역이어야 한다.

아래 그림은 6개의 구역이 있는 것이고, 인접한 구역은 선으로 연결되어 있다.

<img src="https://upload.acmicpc.net/08218f4c-2653-4861-a4c1-e7ce808f3a85/-/preview/" width="30%">

아래는 백준시를 두 선거구로 나눈 4가지 방법이며, 가능한 방법과 불가능한 방법에 대한 예시이다.

<img src="https://upload.acmicpc.net/b82fcf21-6f4c-4797-bda6-215e14099d19/-/preview/" width="20%">가능한 방법: [1, 3, 4]와 [2, 5, 6]으로 나누어져 있다.

<img src="https://upload.acmicpc.net/32947e26-4ec4-4b20-99f1-106d8386683d/-/preview/" width="20%">가능한 방법: [1, 2, 3, 4, 6]과 [5]로 나누어져 있다.

<img src="https://upload.acmicpc.net/f5dd6143-c013-46d3-ba4c-dadc48bdf5bc/-/preview/" width="20%">불가능한 방법: [1, 2, 3, 4]와 [5, 6]으로 나누어져 있는데, 5와 6이 연결되어 있지 않다.

<img src="https://upload.acmicpc.net/548b1153-84de-4b85-9697-2561b019a02b/-/preview/" width="20%">불가능한 방법: 각 선거구는 적어도 하나의 구역을 포함해야 한다.

공평하게 선거구를 나누기 위해 두 선거구에 포함된 인구의 차이를 최소로 하려고 한다. 백준시의 정보가 주어졌을 때, 인구 차이의 최솟값을 구해보자.

### 입력
- 첫째 줄에 구역의 개수 N이 주어진다. 둘째 줄에 구역의 인구가 1번 구역부터 N번 구역까지 순서대로 주어진다. 인구는 공백으로 구분되어져 있다.
- 셋째 줄부터 N개의 줄에 각 구역과 인접한 구역의 정보가 주어진다. 각 정보의 첫 번째 정수는 그 구역과 인접한 구역의 수이고, 이후 인접한 구역의 번호가 주어진다. 모든 값은 정수로 구분되어져 있다.
- 구역 A가 구역 B와 인접하면 구역 B도 구역 A와 인접하다. 인접한 구역이 없을 수도 있다.

### 출력
- 첫째 줄에 백준시를 두 선거구로 나누었을 때, 두 선거구의 인구 차이의 최솟값을 출력한다. 두 선거구로 나눌 수 없는 경우에는 -1을 출력한다.

### 📍 **Logic**

```java
class Dosi {
    ArrayList<Integer>[] dosi;
    int[] population;
    int[] area;
    boolean[] visited;
    int size;
    int answer = Integer.MAX_VALUE;
}
```

- 선거구의 정보를 담당하는 클래스이다.

```java
public int searchDivision();
```

- 선거구 분할 메소드를 호출하고, 최솟값을 비교해 최종적으로 출력해야 할 값을 반환하는 함수이다.

```java
private void dfs(int n);
```

- 재귀적으로 호출되면서, 모든 선거구 분할법을 DFS방식으로 완전 탐색하며 선거구가 2개로 분할 가능한 경우에만 인구수 차이를 계속 업데이트하는 메소드이다.

```java
private void bfs(int idx, int areaN);
```

- 선거구 분할 후, 방문여부를 업데이트하기 위해 BFS 방식으로 수행되는 메소드이다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.*;

    class Dosi {
        ArrayList<Integer>[] dosi;
        int[] population;
        int[] area;
        boolean[] visited;
        int size;
        int answer = Integer.MAX_VALUE;

        public Dosi(int N) {
            dosi = new ArrayList[N+1];
            for (int i = 1; i <= N; i++) {
                dosi[i] = new ArrayList<>();
            }
            area = new int[N + 1];
            size = N;
        }

        public int searchDivision() {
            dfs(1);
            if (answer == Integer.MAX_VALUE) return -1;
            return answer;
        }

        private void dfs(int n) {
            if (n == size + 1) {
                int pop1=0, pop2=0;
                for (int i = 1; i <= size; i++) {
                    if (area[i] == 1) pop1 += population[i-1];
                    else pop2 += population[i-1];
                }

                visited = new boolean[size + 1];
                int cnt = 0;
                for (int i = 1; i <= size; i++) {
                    if (!visited[i]) {
                        bfs(i, area[i]);
                        cnt++;
                    }
                }

                if (cnt == 2) answer = Math.min(answer, Math.abs(pop1 - pop2));
                return;
            }
            area[n] = 1;
            dfs(n + 1);
            area[n] = 2;
            dfs(n + 1);
        }

        private void bfs(int idx, int areaN) {
            Queue<Integer> q = new LinkedList<>();
            visited[idx] = true;
            q.add(idx);

            while (!q.isEmpty()) {
                int now = q.poll();

                for(int i = 0; i < dosi[now].size(); i++) {
                    int next = dosi[now].get(i);
                    if(area[next] == areaN && !visited[next]) {
                        q.add(next);
                        visited[next] = true;
                    }
                }
            }
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int N = Integer.parseInt(br.readLine());
            String[] line;

            Dosi d = new Dosi(N);
            d.population = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();

            for (int i = 0; i < N; i++) {
                line = br.readLine().split(" ");
                for (int j = 0; j < Integer.parseInt(line[0]); j++) {
                    d.dosi[i+1].add(Integer.parseInt(line[j+1]));
                }
            }

            System.out.println(d.searchDivision());

            br.close();
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 대략적으로 구상한 방법은,
  - 분할이 가능한 방법으로 선거구를 두 개로 분할
  - 분할한 경우 중, 인구 차이를 계속 업데이트하는 방식으로 가장 최소가 되는 분할법을 탐색
- 그런데 어떻게 선거구를 분할해야하는가가 고민이었다. 그래서 게시판에서 "0번 구역이 포함된 선거구 vs 0번 구역이 포함되지 않은 선거구" 라는 아이디어를 발견해 생각해보았다.
  - 역시나 구현에서 막혀 아래 블로그를 참고했다...
- 매번 문제를 시작할 때 어떻게 하면 깔끔하게 입력을 받아 저장할 수 있을까를 고민하는데, 이번에는 좀 새로운 문법을 사용해보았다. 
  - `String[] tokens` 에 `split(" ")` 한 결과를 매번 담았다가 정수로 파싱하여 다시 저장했는데, 이번엔 문자열 한 줄을 받아 공백 기준으로 나누면서 바로 정수형 배열에 저장하는 방식을 사용해보았다.

### 📕 출처
Baekjoon : https://www.acmicpc.net/problem/17471

### 참고
https://moonsbeen.tistory.com/254
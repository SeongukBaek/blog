---
title: "👩‍💻 5014. 스타트 링크"
description: "알고리즘 문제 풀기"
date: 2022-02-21
update: 2022-02-21
tags:
  - 그래프이론
  - 그래프탐색
  - BFS
series: "👩‍💻 BOJ"
---

## 문제

강호는 코딩 교육을 하는 스타트업 스타트링크에 지원했다. 오늘은 강호의 면접날이다. 하지만, 늦잠을 잔 강호는 스타트링크가 있는 건물에 늦게 도착하고 말았다.

스타트링크는 총 F층으로 이루어진 고층 건물에 사무실이 있고, 스타트링크가 있는 곳의 위치는 G층이다. 강호가 지금 있는 곳은 S층이고, 이제 엘리베이터를 타고 G층으로 이동하려고 한다.

보통 엘리베이터에는 어떤 층으로 이동할 수 있는 버튼이 있지만, 강호가 탄 엘리베이터는 버튼이 2개밖에 없다. U버튼은 위로 U층을 가는 버튼, D버튼은 아래로 D층을 가는 버튼이다. (만약, U층 위, 또는 D층 아래에 해당하는 층이 없을 때는, 엘리베이터는 움직이지 않는다)

강호가 G층에 도착하려면, 버튼을 적어도 몇 번 눌러야 하는지 구하는 프로그램을 작성하시오. 만약, 엘리베이터를 이용해서 G층에 갈 수 없다면, "use the stairs"를 출력한다.

### 입력
- 첫째 줄에 F, S, G, U, D가 주어진다. (1 ≤ S, G ≤ F ≤ 1000000, 0 ≤ U, D ≤ 1000000) 건물은 1층부터 시작하고, 가장 높은 층은 F층이다.

### 출력
- 첫째 줄에 강호가 S층에서 G층으로 가기 위해 눌러야 하는 버튼의 수의 최솟값을 출력한다. 만약, 엘리베이터로 이동할 수 없을 때는 "use the stairs"를 출력한다.

### 📍 **Logic**

```java
class Pair {
    int floor;
    int cnt;

    public Pair(int floor, int cnt) {
        this.floor = floor;
        this.cnt = cnt;
    }
}
```
- 층 정보와 버튼 누른 횟수를 저장하기 위해 `Pair` **class**를 생성했다.

```java
Queue<Pair> q = new LinkedList<>();
q.add(new Pair(S, 0));
visited[S] = true;

while(!q.isEmpty()) {
    Pair now = q.poll();
    int now_floor = now.floor;
    int now_cnt = now.cnt;

    if (now_floor == G) {
        System.out.println(now_cnt);
        return;
    }

    for (int go : upDown) {
        int nxFloor = now_floor + go;
        if (nxFloor <= 0 || nxFloor > F) continue;
        if (visited[nxFloor]) continue;

        q.add(new Pair(nxFloor, now_cnt + 1));
        visited[nxFloor] = true;
    }
}
```
- 현재 층에서 목표 층까지 가기 위해 **BFS**로 이동 가능한 층과 버튼 누른 횟수를 `Queue` 에 저장한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1" data-language="java">

        import java.io.BufferedReader;
        import java.io.IOException;
        import java.io.InputStreamReader;
        import java.util.LinkedList;
        import java.util.Queue;

        class Pair {
            int floor;
            int cnt;

            public Pair(int floor, int cnt) {
                this.floor = floor;
                this.cnt = cnt;
            }
        }

        public class Main {
            public static void main(String[] args) throws IOException {
                BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
                String[] line = br.readLine().split(" ");
                int F = Integer.parseInt(line[0]), S = Integer.parseInt(line[1]), G = Integer.parseInt(line[2]);
                int[] upDown = {Integer.parseInt(line[3]), -Integer.parseInt(line[4])};
                boolean[] visited = new boolean[F + 1];

                Queue<Pair> q = new LinkedList<>();
                q.add(new Pair(S, 0));
                visited[S] = true;

                while(!q.isEmpty()) {
                    Pair now = q.poll();
                    int now_floor = now.floor;
                    int now_cnt = now.cnt;

                    if (now_floor == G) {
                        System.out.println(now_cnt);
                        return;
                    }

                    for (int go : upDown) {
                        int nxFloor = now_floor + go;
                        if (nxFloor <= 0 || nxFloor > F) continue;
                        if (visited[nxFloor]) continue;

                        q.add(new Pair(nxFloor, now_cnt + 1));
                        visited[nxFloor] = true;
                    }
                }

                System.out.println("use the stairs");

                br.close();
            }
        }
  </div>
</details>

### ✏️ **Review**
- BFS 문제라는 것을 알고 풀어서 아이디어는 금방 잡았던 문제이다. 알고리즘 분류를 안 보고 아이디어를 생각해내는 연습이 필요할 것 같다.
- 저번과 동일하게 방문 여부를 저장하는 부분에서의 **메모리 초과**를 피할 수 없었다. 좀 더 자세하게 생각해보는 연습이 필요할 것 같다.

### 📕 출처
https://www.acmicpc.net/problem/5014
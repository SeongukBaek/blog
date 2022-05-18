---
title: "👩‍💻 2579. 계단 오르기"
description: "알고리즘 문제 풀기"
date: 2022-03-24
update: 2022-03-24
tags:
  - DP
series: "👩‍💻 BOJ"
---

## 문제

계단 오르기 게임은 계단 아래 시작점부터 계단 꼭대기에 위치한 도착점까지 가는 게임이다. 아래와 같이 각각의 계단에는 일정한 점수가 쓰여 있는데 계단을 밟으면 그 계단에 쓰여 있는 점수를 얻게 된다.

<img src="https://upload.acmicpc.net/7177ea45-aa8d-4724-b256-7b84832c9b97/-/preview/" width="50%">

예를 들어 아래와 같이 시작점에서부터 첫 번째, 두 번째, 네 번째, 여섯 번째 계단을 밟아 도착점에 도달하면 총 점수는 10 + 20 + 25 + 20 = 75점이 된다.

<img src="https://upload.acmicpc.net/f00b6121-1c25-492e-9bc0-d96377c586b0/-/preview/" width="50%">

계단 오르는 데는 다음과 같은 규칙이 있다.

1. 계단은 한 번에 한 계단씩 또는 두 계단씩 오를 수 있다. 즉, 한 계단을 밟으면서 이어서 다음 계단이나, 다음 다음 계단으로 오를 수 있다.
2. 연속된 세 개의 계단을 모두 밟아서는 안 된다. 단, 시작점은 계단에 포함되지 않는다.
3. 마지막 도착 계단은 반드시 밟아야 한다.

따라서 첫 번째 계단을 밟고 이어 두 번째 계단이나, 세 번째 계단으로 오를 수 있다. 하지만, 첫 번째 계단을 밟고 이어 네 번째 계단으로 올라가거나, 첫 번째, 두 번째, 세 번째 계단을 연속해서 모두 밟을 수는 없다.

각 계단에 쓰여 있는 점수가 주어질 때 이 게임에서 얻을 수 있는 총 점수의 최댓값을 구하는 프로그램을 작성하시오.

### 입력
- 입력의 첫째 줄에 계단의 개수가 주어진다.
- 둘째 줄부터 한 줄에 하나씩 제일 아래에 놓인 계단부터 순서대로 각 계단에 쓰여 있는 점수가 주어진다. 계단의 개수는 300이하의 자연수이고, 계단에 쓰여 있는 점수는 10,000이하의 자연수이다.

### 출력
- 첫째 줄에 계단 오르기 게임에서 얻을 수 있는 총 점수의 최댓값을 출력한다.

### 📍 **Logic**

```java
static int climbStairs() {...}
```

- `dp[x][0]` 은 x층 계단까지 가는데 연속된 계단이 1개인 경우의 최대 점수이고, `dp[x][1]` 은 연속된 계단이 2개인 경우의 최대 점수이다.
- BOTTOM UP방식으로 모든 계단에 대한 최대 점수를 구한 이후, 마지막 계단에서 두 경우 중 최댓값을 반환한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1" data-language="java">

      import java.io.BufferedReader;
      import java.io.IOException;
      import java.io.InputStreamReader;

      public class Main {
          static int[] costs;
          static int[][] dp;
          static int N;

          public static void main(String[] args) throws IOException {
              BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
              N = Integer.parseInt(br.readLine());
              costs = new int[N];
              dp = new int[N][2];

              for (int i = 0; i < N; i++) costs[i] = Integer.parseInt(br.readLine());

              System.out.println(climbStairs());

              br.close();
          }

          static int climbStairs() {
              if (N == 1) return costs[0];

              dp[0][0] = dp[0][1] = costs[0];
              dp[1][0] = costs[1];
              dp[1][1] = dp[0][0] + costs[1];

              for (int i = 2; i < N; i++) {
                  dp[i][0] = Math.max(dp[i - 2][0], dp[i - 2][1]) + costs[i];
                  dp[i][1] = Math.max(dp[i - 1][0], dp[i - 2][1]) + costs[i];
              }

              return Math.max(dp[N - 1][0], dp[N - 1][1]);
          }
      }
  </div>
</details>

### ✏️ **Review**

- 예전에 C++로 풀려다가 못 풀어서 포기했던 문제였다. 이번 학기 고문해 시간에 DP 과제에서 이 문제보다 조건이 더 적은 문제를 만나서, 과제를 해결한 이후 다시 풀어보았다.
- "연속된 세 개의 계단을 밟아선 안된다"는 조건 때문에 고민했고, `dp[][0]` , `dp[][1]` 을 이용해서 해당 계단까지 연속된 계단이 1개인 경우와 2개인 경우를 나누어 구현했다.
- DP는 실버인데도 꼬이면 머리가 너무 아프다.

### 📕 출처
https://www.acmicpc.net/problem/2579
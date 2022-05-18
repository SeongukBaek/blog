---
title: "👩‍💻 2225. 합분해"
description: "알고리즘 문제 풀기"
date: 2021-12-22
update: 2021-12-22
tags:
  - DP
  - 수학
series: "👩‍💻 BOJ"
---

## 문제

0부터 N까지의 정수 K개를 더해서 그 합이 N이 되는 경우의 수를 구하는 프로그램을 작성하시오.

덧셈의 순서가 바뀐 경우는 다른 경우로 센다(1+2와 2+1은 서로 다른 경우). 또한 한 개의 수를 여러 번 쓸 수도 있다.

### 입력
- 첫째 줄에 두 정수 N(1 ≤ N ≤ 200), K(1 ≤ K ≤ 200)가 주어진다.

### 출력
- 첫째 줄에 답을 1,000,000,000으로 나눈 나머지를 출력한다.

### 📍 **Logic**

```java
for (int i=0; i<201 ;i++) {
  dp[i][0] = 1;
  dp[1][i] = 1;
}

for (int i=0;i<=N;i++)
  dp[2][i] = i+1;
```

- dp 배열 초기화
- i개의 정수로 j를 만드는 경우의 수가 dp[i][j]에 저장

```java
for (int i=3;i<=K;i++) {
  for (int j=1;j<=N;j++) {
    for (int k=0;k<=j;k++) {
        dp[i][j] += dp[i-1][k]%1000000000;
    }
  }
}
```

- 점화식은 예를 들어, dp[3][1]을 구하는 경우, 즉 3개의 정수로 1을 만들어야 하는 경우의 수는 dp[2][0] + dp[2][1]로, 2개의 정수로 0을 만드는 경우의 수와 2개의 정수로 1을 만드는 경우의 수를 더하면 된다
- 따라서, dp[i][j] = dp[i-1][0] + ... + dp[i-1][j]가 된다

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1" data-language="java">

        import java.io.BufferedReader;
        import java.io.InputStreamReader;
        import java.util.StringTokenizer;

        public class Main {

            static long dp[][] = new long[201][201];

            public static void main(String[] args) throws Exception {
                BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
                String tc = br.readLine();
                StringTokenizer st = new StringTokenizer(tc, " ");
                int N = Integer.parseInt(st.nextToken());
                int K = Integer.parseInt(st.nextToken());

                for (int i=0; i<201 ;i++) {
                    dp[i][0] = 1;
                    dp[1][i] = 1;
                }
                for (int i=0;i<=N;i++)
                    dp[2][i] = i+1;

                for (int i=3;i<=K;i++) {
                    for (int j=1;j<=N;j++) {
                        for (int k=0;k<=j;k++) {
                            dp[i][j] += dp[i-1][k]%1000000000;
                        }
                    }
                }

                System.out.println(dp[K][N]%1000000000);
            }
        }
  </div>
</details>

### ✏️ **Review**

- 오랜만에 알고문제를 푸는 터라 아이디어를 잡는데 한참 걸렸던 것 같다
- 막상 점화식을 도출해내면 쉬운 문제였지만 점화식 도출이 어려웠고, 처음으로 java로 푼 문제여서 블로그를 참고했다

### 📕 출처
https://www.acmicpc.net/problem/2225
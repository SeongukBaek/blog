---
title: "π©βπ» 2225. ν©λΆν΄"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2021-12-22
update: 2021-12-22
tags:
  - DP
  - μν
series: "π©βπ» BOJ"
---

## λ¬Έμ 

0λΆν° NκΉμ§μ μ μ Kκ°λ₯Ό λν΄μ κ·Έ ν©μ΄ Nμ΄ λλ κ²½μ°μ μλ₯Ό κ΅¬νλ νλ‘κ·Έλ¨μ μμ±νμμ€.

λ§μμ μμκ° λ°λ κ²½μ°λ λ€λ₯Έ κ²½μ°λ‘ μΌλ€(1+2μ 2+1μ μλ‘ λ€λ₯Έ κ²½μ°). λν ν κ°μ μλ₯Ό μ¬λ¬ λ² μΈ μλ μλ€.

### μλ ₯
- μ²«μ§Έ μ€μ λ μ μ N(1 β€ N β€ 200), K(1 β€ K β€ 200)κ° μ£Όμ΄μ§λ€.

### μΆλ ₯
- μ²«μ§Έ μ€μ λ΅μ 1,000,000,000μΌλ‘ λλ λλ¨Έμ§λ₯Ό μΆλ ₯νλ€.

### π **Logic**

```java
for (int i=0; i<201 ;i++) {
  dp[i][0] = 1;
  dp[1][i] = 1;
}

for (int i=0;i<=N;i++)
  dp[2][i] = i+1;
```

- dp λ°°μ΄ μ΄κΈ°ν
- iκ°μ μ μλ‘ jλ₯Ό λ§λλ κ²½μ°μ μκ° dp[i][j]μ μ μ₯

```java
for (int i=3;i<=K;i++) {
  for (int j=1;j<=N;j++) {
    for (int k=0;k<=j;k++) {
        dp[i][j] += dp[i-1][k]%1000000000;
    }
  }
}
```

- μ νμμ μλ₯Ό λ€μ΄, dp[3][1]μ κ΅¬νλ κ²½μ°, μ¦ 3κ°μ μ μλ‘ 1μ λ§λ€μ΄μΌ νλ κ²½μ°μ μλ dp[2][0] + dp[2][1]λ‘, 2κ°μ μ μλ‘ 0μ λ§λλ κ²½μ°μ μμ 2κ°μ μ μλ‘ 1μ λ§λλ κ²½μ°μ μλ₯Ό λνλ©΄ λλ€
- λ°λΌμ, dp[i][j] = dp[i-1][0] + ... + dp[i-1][j]κ° λλ€

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
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

### βοΈ **Review**

- μ€λλ§μ μκ³ λ¬Έμ λ₯Ό νΈλ ν°λΌ μμ΄λμ΄λ₯Ό μ‘λλ° νμ°Έ κ±Έλ Έλ κ² κ°λ€
- λ§μ μ νμμ λμΆν΄λ΄λ©΄ μ¬μ΄ λ¬Έμ μμ§λ§ μ νμ λμΆμ΄ μ΄λ €μ κ³ , μ²μμΌλ‘ javaλ‘ νΌ λ¬Έμ μ¬μ λΈλ‘κ·Έλ₯Ό μ°Έκ³ νλ€

### π μΆμ²
https://www.acmicpc.net/problem/2225
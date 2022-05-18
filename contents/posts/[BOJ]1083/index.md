---
title: "👩‍💻 1083. 소트"
description: "알고리즘 문제 풀기"
date: 2022-05-15
update: 2022-05-15
tags:
  - 그리디
  - 정렬
series: "👩‍💻 BOJ"
---

## 문제
[BOJ - 소트](https://www.acmicpc.net/problem/1083)

### 📍 **Logic**

```java
for (int i = 0; i < N; i++) {
    if (S == 0) break;

    int maxIdx = findMax(i, i + S);

    for (int j = maxIdx; j > i; j--) {
        swap(j - 1, j);
        S--;
    }
}
```

- `S` 가 0이 되면 종료되는 반복문
- `S` 는 스왑이 가능한 범위를 의미하고, 이 범위 내의 최댓값을 찾고, 그까지 스왑을 반복한다.

```java
private static int findMax(int s, int e) {
    int maxIdx = 0;
    int max = 0;

    for (int i = s; i <= e && i < numbers.length; i++) {
        if (max < numbers[i]) {
            maxIdx = i;
            max = numbers[i];
        }
    }

    return maxIdx;
}
```

- 범위 내의 최댓값을 찾아 그 위치를 반환한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.*;

    public class Main {
        static int[] numbers;
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int N = Integer.parseInt(br.readLine());
            numbers = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            int S = Integer.parseInt(br.readLine());

            for (int i = 0; i < N; i++) {
                if (S == 0) break;

                int maxIdx = findMax(i, i + S);

                for (int j = maxIdx; j > i; j--) {
                    swap(j - 1, j);
                    S--;
                }
            }

            for (int n : numbers)
                System.out.print(n + " ");
        }

        private static int findMax(int s, int e) {
            int maxIdx = 0;
            int max = 0;

            for (int i = s; i <= e && i < numbers.length; i++) {
                if (max < numbers[i]) {
                    maxIdx = i;
                    max = numbers[i];
                }
            }

            return maxIdx;
        }

        private static void swap(int i1, int i2) {
            int tmp = numbers[i1];
            numbers[i1] = numbers[i2];
            numbers[i2] = tmp;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 문제 자체는 쉬웠으나, 계속 `ArrayIndexOutOfBounds` 가 떠서 틀렸다.
- 입력 범위를 확인해보니 `N` 보다 `S` 가 클 수 있어 당연하게도 범위를 넘어가는 경우가 발생할 수 있었다.
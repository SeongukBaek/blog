---
title: "👩‍💻 60059. 자물쇠와 열쇠"
description: "알고리즘 문제 풀기"
date: 2022-06-12
update: 2022-06-12
tags:
  - 구현
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 자물쇠와 열쇠](https://programmers.co.kr/learn/courses/30/lessons/60059)

### 📍 **Logic**

```java
for (int r = 0; r < M - 1 + N; r++) {
    for (int c = 0; c < M - 1 + N; c++) {
        for (int rotate = 0; rotate < 4; rotate++) {
            // 자물쇠를 중앙에 두고, 키를 돌려가면서 확인할 큰 배열 선언
            bigMap = new int[N + (M - 1) * 2][N + (M - 1) * 2];

            // 자물쇠를 중앙에 배치
            for (int i = 0; i < N; i++)
                System.arraycopy(lock[i], 0, bigMap[M - 1 + i], M - 1, N);

            // bigMap에 키를 더해 자물쇠에 맞는지 확인할 것
            match(key, r, c);
            if (canUnlock()) return true;
        }
    }
}
```

- 전체 흐름은, 
  - 자물쇠와 키를 둘 수 있는 큰 2차원 배열을 선언하고, 
  - 자물쇠를 중앙에 둔 채로, 키를 돌려가면서 맞춰보고, 잠금 해제가 가능한지 확인한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        static int M;
        static int N;
        static int[][] bigMap;
        
        public boolean solution(int[][] key, int[][] lock) {  
            M = key.length;
            N = lock.length;
            
            for (int r = 0; r < M - 1 + N; r++) {
                for (int c = 0; c < M - 1 + N; c++) {
                    for (int rotate = 0; rotate < 4; rotate++) {
                        // 자물쇠를 중앙에 두고, 키를 돌려가면서 확인할 큰 배열 선언
                        bigMap = new int[N + (M - 1) * 2][N + (M - 1) * 2];

                        // 자물쇠를 중앙에 배치
                        for (int i = 0; i < N; i++)
                            System.arraycopy(lock[i], 0, bigMap[M - 1 + i], M - 1, N);

                        // bigMap에 키를 더해 자물쇠에 맞는지 확인할 것
                        match(key, r, c);
                        if (canUnlock()) return true;
                    }
                }
            }
            
            return false;
        }
        
        // bigMap이 1로만 이루어지는지 확인
        static private boolean canUnlock() {
            for (int i = 0; i < N; i++)
                for (int j = 0; j < N; j++)
                    if (bigMap[M - 1 + i][M - 1 + j] != 1) return false;
            return true;
        }

        // 키와 자물쇠를 더하는 함수
        static private void match(int[][] key, int r, int c) {
            key = rotatingKey(key);

            for (int i = 0; i < M; i++)
                for (int j = 0; j < M; j++)
                    bigMap[i + r][j + c] += key[i][j];
        }
        
        // 키를 시계방향으로 90도 돌리는 함수
        static private int[][] rotatingKey(int[][] key) {
            for (int i = 0; i < M / 2; i++) {
                int[] tmp = Arrays.copyOf(key[M - i - 1], M);
                key[M - i - 1] = key[i];
                key[i] = tmp;
            }

            for (int i = 0; i < M; i++) {
                for (int j = i; j < M; j++) {
                    int temp = key[i][j];
                    key[i][j] = key[j][i];
                    key[j][i] = temp;
                }
            }

            return key;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 이번 주차 문제 중에서 제일 어려웠던 문제
- 구현이 깔끔하게 이뤄지지 않아 풀이 영상을 보니, 아래와 같은 신기한 풀이를 볼 수 있었다.
  - 키를 돌리지 않고 인덱스 접근으로 구현
  - 자물쇠를 중앙에 두고, 키를 여러 방면에서 더해볼 수 있는 큰 배열 선언
- 이런 구현 문제는 머리를 좀 잘 굴릴 줄 알아야 할 것 같다...
---
title: "👩‍💻 17779. 게리맨더링 2"
description: "알고리즘 문제 풀기"
date: 2022-03-20
update: 2022-03-20
tags:
  - 구현
  - 브루트포스
  - 시뮬레이션
series: "👩‍💻 BOJ"
---

## 문제
재현시의 시장 구재현은 지난 몇 년간 게리맨더링을 통해서 자신의 당에게 유리하게 선거구를 획정했다. 견제할 권력이 없어진 구재현은 권력을 매우 부당하게 행사했고, 심지어는 시의 이름도 재현시로 변경했다. 이번 선거에서는 최대한 공평하게 선거구를 획정하려고 한다.

재현시는 크기가 N×N인 격자로 나타낼 수 있다. 격자의 각 칸은 구역을 의미하고, r행 c열에 있는 구역은 (r, c)로 나타낼 수 있다. 구역을 다섯 개의 선거구로 나눠야 하고, 각 구역은 다섯 선거구 중 하나에 포함되어야 한다. 선거구는 구역을 적어도 하나 포함해야 하고, 한 선거구에 포함되어 있는 구역은 모두 연결되어 있어야 한다. 구역 A에서 인접한 구역을 통해서 구역 B로 갈 수 있을 때, 두 구역은 연결되어 있다고 한다. 중간에 통하는 인접한 구역은 0개 이상이어야 하고, 모두 같은 선거구에 포함된 구역이어야 한다.

선거구를 나누는 방법은 다음과 같다.

1. 기준점 (x, y)와 경계의 길이 d1, d2를 정한다. (d1, d2 ≥ 1, 1 ≤ x < x+d1+d2 ≤ N, 1 ≤ y-d1 < y < y+d2 ≤ N)
2. 다음 칸은 경계선이다.
   1. (x, y), (x+1, y-1), ..., (x+d1, y-d1)
   2. (x, y), (x+1, y+1), ..., (x+d2, y+d2)
   3. (x+d1, y-d1), (x+d1+1, y-d1+1), ... (x+d1+d2, y-d1+d2)
   4. (x+d2, y+d2), (x+d2+1, y+d2-1), ..., (x+d2+d1, y+d2-d1)
3. 경계선과 경계선의 안에 포함되어있는 곳은 5번 선거구이다.
4. 5번 선거구에 포함되지 않은 구역 (r, c)의 선거구 번호는 다음 기준을 따른다.
   1. 1번 선거구: 1 ≤ r < x+d1, 1 ≤ c ≤ y
   2. 2번 선거구: 1 ≤ r ≤ x+d2, y < c ≤ N
   3. 3번 선거구: x+d1 ≤ r ≤ N, 1 ≤ c < y-d1+d2
   4. 4번 선거구: x+d2 < r ≤ N, y-d1+d2 ≤ c ≤ N

아래는 크기가 7×7인 재현시를 다섯 개의 선거구로 나눈 방법의 예시이다.

<img src="https://upload.acmicpc.net/813c38e0-3197-4589-bc96-17d96eb9ed14/-/preview/" width="80%">

구역 (r, c)의 인구는 A[r][c]이고, 선거구의 인구는 선거구에 포함된 구역의 인구를 모두 합한 값이다. 선거구를 나누는 방법 중에서, 인구가 가장 많은 선거구와 가장 적은 선거구의 인구 차이의 최솟값을 구해보자.

### 입력
- 첫째 줄에 재현시의 크기 N이 주어진다.
- 둘째 줄부터 N개의 줄에 N개의 정수가 주어진다. r행 c열의 정수는 A[r][c]를 의미한다.

### 출력
- 첫째 줄에 인구가 가장 많은 선거구와 가장 적은 선거구의 인구 차이의 최솟값을 출력한다.

### 📍 **Logic**

```java
class Dosi {
    int N;
    int minDiff = Integer.MAX_VALUE;
    int[][] map;
    int[][] copyMap;
    int[] rangeX = { -1, 0, 1, 0 };
    int[] rangeY = { 0, 1, 0, -1 };
    ...

}
```

- 선거구의 정보를 담당하는 클래스이다.

```java
public int vote() {...}
```

- 주어진 기준에 따라 선거구를 나누고, 인구 수를 합산하는 로직을 실행하는 메소드이다.

```java
private void setLine(int x, int y, int d1, int d2) {...}
```

- 5번 선거구의 가장자리를 긋고, 내부 영역을 탐색하는 `isConnected` 를 실행하는 메소드이다.

```java
private void isConnected(int x, int y) {...}
```

- 재귀적으로 5번 선거구의 내부를 탐색한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.*;

    class Dosi {
        int N;
        int minDiff = Integer.MAX_VALUE;
        int[][] map;
        int[][] copyMap;
        int[] rangeX = { -1, 0, 1, 0 };
        int[] rangeY = { 0, 1, 0, -1 };

        public Dosi(int N) {
            this.N = N;
            map = new int[N + 1][N + 1];
        }

        public int vote() {
            for (int d1 = 1; d1 <= N; d1++) {
                for (int d2 = 1; d2 <= N; d2++) {
                    for (int x = 1; x <= N; x++) {
                        for (int y = 1; y <= N; y++) {
                            if (!(x + d1 + d2 <= N && y - d1 >= 1 && y + d2 <= N)) continue;
                            copyMap = new int[N + 1][N + 1];
                            popSum1(x, y, d1);
                            popSum2(x, y ,d2);
                            popSum3(x, y, d1, d2);
                            popSum4(x, y, d1, d2);
                            setLine(x, y, d1, d2);
                            sum();
                        }
                    }
                }
            }
            return minDiff;
        }

        private void sum() {
            int max = 0;
            int min = Integer.MAX_VALUE;
            int[] popSum = new int[6];
            for(int i=1; i<=N; i++) {
                for(int j=1; j<=N; j++) {
                    popSum[copyMap[i][j]]+=map[i][j];
                }
            }
            for(int i=1; i<=5; i++) {
                max = Math.max(max, popSum[i]);
                min = Math.min(min, popSum[i]);
            }
            minDiff = Math.min(minDiff, max-min);
        }

        private void setLine(int x, int y, int d1, int d2) {
            for(int i = 0; i <= d1; i++) {
                copyMap[x+i][y-i] = 5;
            }
            for(int i = 0; i <= d2; i++) {
                copyMap[x+i][y+i] = 5;
            }
            for(int i = 0; i <= d2; i++) {
                copyMap[x+d1+i][y-d1+i] = 5;
            }
            for(int i = 0; i <= d1; i++) {
                copyMap[x+d2+i][y+d2-i] = 5;
            }
            for(int alpha = 0; alpha < d1; alpha++) {
                isConnected(x+alpha+1, y-alpha);
            }
            for(int alpha = 0; alpha < d2; alpha++) {
                isConnected(x+alpha+1, y+alpha);
            }
        }

        private void isConnected(int x, int y) {
            copyMap[x][y] = 5;

            for(int i=0; i<4; i++) {
                int nx = x + rangeX[i];
                int ny = y + rangeY[i];
                if (nx < 1 || nx > N || ny < 1 || ny > N) continue;
                if (copyMap[nx][ny] != 5) isConnected(nx,ny);
            }
        }

        private void popSum1(int x, int y, int d1) {
            for (int i = 1; i < x + d1; i++) {
                for (int j = 1; j <= y; j++) {
                    copyMap[i][j] = 1;
                }
            }
        }

        private void popSum2(int x, int y, int d2) {
            for (int i = 1; i <= x + d2; i++) {
                for (int j = y + 1; j <= N; j++) {
                    copyMap[i][j] = 2;
                }
            }
        }

        private void popSum3(int x, int y, int d1, int d2) {
            for (int i = x + d1; i <= N; i++) {
                for (int j = 1; j < y - d1 + d2; j++) {
                    copyMap[i][j] = 3;
                }
            }
        }

        private void popSum4(int x, int y, int d1, int d2) {
            for (int i = x + d2 + 1; i <= N; i++) {
                for (int j = y - d1 + d2; j <= N; j++) {
                    copyMap[i][j] = 4;
                }
            }
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int N = Integer.parseInt(br.readLine());

            Dosi dosi = new Dosi(N);
            String[] line;

            for (int i = 1; i <= N; i++) {
                line = br.readLine().split(" ");
                for (int j = 1; j <= N; j++) {
                    dosi.map[i][j] = Integer.parseInt(line[j - 1]);
                }
            }

            System.out.println(dosi.vote());

            br.close();
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 처음에는 게리맨더링이랑 비슷한 줄 알았는데 조금은 달라서 생각해보는데 시간이 좀 걸렸다. 
- 선거구를 나누는 로직을 구현하는데 시간이 걸렸고, 게시판을 참고해서 나름대로 풀어봤는데, 최종적으로 인구수를 합산해 차이의 최소를 구하는 로직이 자꾸 틀렸다.
  - 어차피 나눠진 선거구의 인구 수를 나눌 때마다 합산하고 선거구를 다 나눈 뒤 (즉, 인구 수 합산까지 완료된 상태) 차이를 구하고 이를 업데이트하는 방식은 왜 틀리는지 모르겠다.

### 📕 출처
Baekjoon : https://www.acmicpc.net/problem/17779
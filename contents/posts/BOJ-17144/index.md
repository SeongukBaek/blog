---
title: "👩‍💻 17144. 미세먼지 안녕!"
description: "알고리즘 문제 풀기"
date: 2022-04-01
update: 2022-04-01
tags:
  - 구현
  - 시뮬레이션
series: "👩‍💻 BOJ"
---

## 문제
미세먼지를 제거하기 위해 구사과는 공기청정기를 설치하려고 한다. 공기청정기의 성능을 테스트하기 위해 구사과는 집을 크기가 R×C인 격자판으로 나타냈고, 1×1 크기의 칸으로 나눴다. 구사과는 뛰어난 코딩 실력을 이용해 각 칸 (r, c)에 있는 미세먼지의 양을 실시간으로 모니터링하는 시스템을 개발했다. (r, c)는 r행 c열을 의미한다.

<img src="https://upload.acmicpc.net/75d322ad-5a89-4301-b3a7-403fce0ff966/-/preview/" width="50%">

공기청정기는 항상 1번 열에 설치되어 있고, 크기는 두 행을 차지한다. 공기청정기가 설치되어 있지 않은 칸에는 미세먼지가 있고, (r, c)에 있는 미세먼지의 양은 Ar,c이다.

1초 동안 아래 적힌 일이 순서대로 일어난다.

1. 미세먼지가 확산된다. 확산은 미세먼지가 있는 모든 칸에서 동시에 일어난다.
     - (r, c)에 있는 미세먼지는 인접한 네 방향으로 확산된다.
     - 인접한 방향에 공기청정기가 있거나, 칸이 없으면 그 방향으로는 확산이 일어나지 않는다.
     - 확산되는 양은 Ar,c/5이고 소수점은 버린다.
     - (r, c)에 남은 미세먼지의 양은 Ar,c - (Ar,c/5)×(확산된 방향의 개수) 이다.
2. 공기청정기가 작동한다.
    - 공기청정기에서는 바람이 나온다.
    - 위쪽 공기청정기의 바람은 반시계방향으로 순환하고, 아래쪽 공기청정기의 바람은 시계방향으로 순환한다.
    - 바람이 불면 미세먼지가 바람의 방향대로 모두 한 칸씩 이동한다.
    - 공기청정기에서 부는 바람은 미세먼지가 없는 바람이고, 공기청정기로 들어간 미세먼지는 모두 정화된다.
  
다음은 확산의 예시이다.

<img src="https://upload.acmicpc.net/7b0d9d57-1296-44cd-8951-4135d27f9446/-/preview/" width="30%">

- 왼쪽과 오른쪽에 칸이 없기 때문에, 두 방향으로만 확산이 일어났다.

<img src="https://upload.acmicpc.net/cebebfa9-0056-45f1-b705-75b035888085/-/preview/" width="30%">

- 인접한 네 방향으로 모두 확산이 일어난다.

<img src="https://upload.acmicpc.net/1ed0d2e9-9767-4b94-bbde-0e1d6a2d52ff/-/preview/" width="30%">

- 공기청정기가 있는 칸으로는 확산이 일어나지 않는다.

공기청정기의 바람은 다음과 같은 방향으로 순환한다.

<img src="https://upload.acmicpc.net/94466937-96c7-4f25-9804-530ebd554a59/-/preview/" width="50%">

방의 정보가 주어졌을 때, T초가 지난 후 구사과의 방에 남아있는 미세먼지의 양을 구해보자.

## 입, 출력

입력
- 첫째 줄에 R, C, T (6 ≤ R, C ≤ 50, 1 ≤ T ≤ 1,000) 가 주어진다.
- 둘째 줄부터 R개의 줄에 Ar,c (-1 ≤ Ar,c ≤ 1,000)가 주어진다. 공기청정기가 설치된 곳은 Ar,c가 -1이고, 나머지 값은 미세먼지의 양이다. -1은 2번 위아래로 붙어져 있고, 가장 윗 행, 아랫 행과 두 칸이상 떨어져 있다.

출력
- 첫째 줄에 T초가 지난 후 구사과 방에 남아있는 미세먼지의 양을 출력한다.

### 📍 **Logic**

```java
class Room {
    Queue<Pair> dustQueue = new LinkedList<>();
    int[][] room;
    int[] rangeX = { -1, 0, 1, 0 };
    int[] rangeY = { 0, 1, 0, -1 };
    int R, C;
    int cleaner1X, cleaner2X;
    ...

}
```

- 미세 먼지와 공기청정기 정보를 저장하는 클래스

```java
public int goodByeFineDust(int time) {
    while(time > 0) {
        spreadDust();
        runCleaner();
        time--;
    }
    return countDust();
}
```

- 코드는 먼지를 확산시키고, 공기청정기를 동작시킨다. 정해진 시간이 경과한 후, 전체 미세 먼지를 반환한다.

```java
private void spreadDust() {...}
```

- `Queue` 에 저장하고 있는 미세 먼지 좌표를 이용해 미세 먼지를 확산시킨다. 
- 이때 업데이트할 미세 먼지 정보를 `int[][] tmp` 에 저장하고, 확산이 끝난 이후 `room` 을 업데이트한다.

```java
private void runCleaner() {...}
```

- 공기 청정기의 바람 방향을 따라 순차적으로 미세 먼지를 이동시킨다. 
- 공기 청정기 바로 앞 좌표는 항상 `0` 으로 업데이트한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.Arrays;
    import java.util.LinkedList;
    import java.util.Queue;

    class Pair {
        int x;
        int y;

        public Pair(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    class Room {
        Queue<Pair> dustQueue = new LinkedList<>();
        int[][] room;
        int[] rangeX = { -1, 0, 1, 0 };
        int[] rangeY = { 0, 1, 0, -1 };
        int R, C;
        int cleaner1X, cleaner2X;

        public Room (int R, int C) {
            this.R = R;
            this.C = C;
            room = new int[R][C];
        }

        public int goodByeFineDust(int time) {
            while(time > 0) {
                spreadDust();
                runCleaner();
                time--;
            }
            return countDust();
        }

        private void spreadDust() {
            int[][] tmp = new int[R][C];

            while(!dustQueue.isEmpty()) {
                Pair dust = dustQueue.poll();
                int divDust = room[dust.x][dust.y] / 5;
                int checkSpread = 0;

                for (int i = 0; i < 4; i++) {
                    int nx = dust.x + rangeX[i];
                    int ny = dust.y + rangeY[i];

                    if (nx < 0 || nx > R - 1 || ny < 0 || ny > C - 1) continue;
                    if (room[nx][ny] == -1) continue;

                    tmp[nx][ny] += divDust;
                    checkSpread++;
                }
                tmp[dust.x][dust.y] = tmp[dust.x][dust.y] + room[dust.x][dust.y] - (divDust * checkSpread);
            }

            for (int i = 0; i < R; i++) {
                for (int j = 0; j < C; j++) {
                    if (room[i][j] == -1) continue;
                    room[i][j] = tmp[i][j];
                }
            }
        }

        private void runCleaner() {
            int i = 0;
            for (i = cleaner1X - 2; i >= 0; i--) {
                room[i + 1][0] = room[i][0];
            }
            for (i = 1; i < C; i++) {
                room[0][i - 1] = room[0][i];
            }
            for (i = 1; i <= cleaner1X; i++) {
                room[i - 1][C - 1] = room[i][C - 1];
            }
            for (i = C - 2; i > 0; i--) {
                room[cleaner1X][i + 1] = room[cleaner1X][i];
            }

            for (i = cleaner2X + 2; i < R; i++) {
                room[i - 1][0] = room[i][0];
            }
            for (i = 1; i < C; i++) {
                room[R - 1][i - 1] = room[R - 1][i];
            }
            for (i = R - 2; i >= cleaner2X; i--) {
                room[i + 1][C - 1] = room[i][C - 1];
            }
            for (i = C - 2; i > 0; i--) {
                room[cleaner2X][i + 1] = room[cleaner2X][i];
            }

            room[cleaner1X][1] = room[cleaner2X][1] = 0;

            for (i = 0; i < R; i++) {
                for (int j = 0; j < C; j++) {
                    if (room[i][j] > 0) dustQueue.add(new Pair(i, j));
                }
            }
        }

        private int countDust() {
            int count = 0;

            for (int i = 0; i < R; i++) {
                for (int j = 0; j < C; j++) {
                    if (room[i][j] > 0) count += room[i][j];
                }
            }
            return count;
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

            int[] line = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            int R = line[0], C = line[1], T = line[2];

            Room dirtyRoom = new Room(R, C);

            for (int i = 0; i < R; i++) {
                dirtyRoom.room[i] = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
                if (dirtyRoom.room[i][0] == -1 && dirtyRoom.cleaner1X == 0) {
                    dirtyRoom.cleaner1X = i;
                    dirtyRoom.cleaner2X = i+1;
                }
                for (int j = 0; j < C; j++) {
                    if (dirtyRoom.room[i][j] > 0) dirtyRoom.dustQueue.add(new Pair(i, j));
                }
            }
            br.close();

            System.out.println(dirtyRoom.goodByeFineDust(T));
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 미세먼지를 확산시키는 방법에서 시간을 많이 뺏겼다. 결론적으로는 추가적인 배열을 두고, 미세먼지 확산 정보를 저장해두고, `room` 에 업데이트하는 방식이 필요했다.
- 시뮬레이션은 단순한 듯 하면서 많은 코드량을 요구하는 것 같다...

### 📕 출처
Baekjoon : https://www.acmicpc.net/problem/17144
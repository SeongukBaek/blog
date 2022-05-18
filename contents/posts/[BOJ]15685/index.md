---
title: "👩‍💻 15685. 드래곤 커브"
description: "알고리즘 문제 풀기"
date: 2022-03-30
update: 2022-03-30
tags:
  - 구현
  - 시뮬레이션
series: "👩‍💻 BOJ"
---

## 문제
드래곤 커브는 다음과 같은 세 가지 속성으로 이루어져 있으며, 이차원 좌표 평면 위에서 정의된다. 좌표 평면의 x축은 → 방향, y축은 ↓ 방향이다.
1. 시작 점
2. 시작 방향
3. 세대

0세대 드래곤 커브는 아래 그림과 같은 길이가 1인 선분이다. 아래 그림은 (0, 0)에서 시작하고, 시작 방향은 오른쪽인 0세대 드래곤 커브이다.

<img src="http://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/15685/1.png" width="30%">

1세대 드래곤 커브는 0세대 드래곤 커브를 끝 점을 기준으로 시계 방향으로 90도 회전시킨 다음 0세대 드래곤 커브의 끝 점에 붙인 것이다. 끝 점이란 시작 점에서 선분을 타고 이동했을 때, 가장 먼 거리에 있는 점을 의미한다.

<img src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/15685/2.png" width="30%">

2세대 드래곤 커브도 1세대를 만든 방법을 이용해서 만들 수 있다. (파란색 선분은 새로 추가된 선분을 나타낸다)

<img src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/15685/3.png" width="30%">

3세대 드래곤 커브도 2세대 드래곤 커브를 이용해 만들 수 있다. 아래 그림은 3세대 드래곤 커브이다.

<img src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/15685/4.png" width="30%">

즉, K(K > 1)세대 드래곤 커브는 K-1세대 드래곤 커브를 끝 점을 기준으로 90도 시계 방향 회전 시킨 다음, 그것을 끝 점에 붙인 것이다.

크기가 100×100인 격자 위에 드래곤 커브가 N개 있다. 이때, 크기가 1×1인 정사각형의 네 꼭짓점이 모두 드래곤 커브의 일부인 정사각형의 개수를 구하는 프로그램을 작성하시오. 격자의 좌표는 (x, y)로 나타내며, 0 ≤ x ≤ 100, 0 ≤ y ≤ 100만 유효한 좌표이다.

## 입, 출력

입력
- 첫째 줄에 드래곤 커브의 개수 N(1 ≤ N ≤ 20)이 주어진다. 둘째 줄부터 N개의 줄에는 드래곤 커브의 정보가 주어진다. 드래곤 커브의 정보는 네 정수 x, y, d, g로 이루어져 있다. x와 y는 드래곤 커브의 시작 점, d는 시작 방향, g는 세대이다. (0 ≤ x, y ≤ 100, 0 ≤ d ≤ 3, 0 ≤ g ≤ 10)
- 입력으로 주어지는 드래곤 커브는 격자 밖으로 벗어나지 않는다. 드래곤 커브는 서로 겹칠 수 있다.
- 방향은 0, 1, 2, 3 중 하나이고, 다음을 의미한다.
  - 0: x좌표가 증가하는 방향 (→)
  - 1: y좌표가 감소하는 방향 (↑)
  - 2: x좌표가 감소하는 방향 (←)
  - 3: y좌표가 증가하는 방향 (↓)

출력
- 첫째 줄에 크기가 1×1인 정사각형의 네 꼭짓점이 모두 드래곤 커브의 일부인 것의 개수를 출력한다.

### 📍 **Logic**

```java
class DragonMap {
    int[][] map = new int[101][101];
    int[] rangeX = { 1, 0, -1, 0 };
    int[] rangeY = { 0, -1, 0, 1 };
    ...

}
```

- 드래곤 커브를 그리기 위한 `map` 과 방향에 따른 이동을 위해 사용하는 범위 정보를 저장하는 클래스

```java
public void drawDragonCurves(int x, int y, int d, int g) {
    List<Integer> dirList = new ArrayList<>();
    dirList.add(d);

    for (int i = 0; i < g; i++) {
        for (int j = dirList.size() - 1; j >= 0; j--) {
            dirList.add(getCountClockDir(dirList.get(j)));
        }
    }

    map[x][y] = 1;
    for (Integer dir : dirList) {
        x += rangeX[dir];
        y += rangeY[dir];
        map[x][y] = 1;
    }
}
```

- 리스트에 방향 정보를 저장하고, 마지막에 저장한 방향 정보부터 차례로 반시계 방향으로 돌린 방향 정보를 저장한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.ArrayList;
    import java.util.Arrays;
    import java.util.List;

    class DragonMap {
        int[][] map = new int[101][101];
        int[] rangeX = { 1, 0, -1, 0 };
        int[] rangeY = { 0, -1, 0, 1 };

        public void drawDragonCurves(int x, int y, int d, int g) {
            List<Integer> dirList = new ArrayList<>();
            dirList.add(d);

            for (int i = 0; i < g; i++) {
                for (int j = dirList.size() - 1; j >= 0; j--) {
                    dirList.add(getCountClockDir(dirList.get(j)));
                }
            }

            map[x][y] = 1;
            for (Integer dir : dirList) {
                x += rangeX[dir];
                y += rangeY[dir];
                map[x][y] = 1;
            }
        }

        public int countSquares() {
            int counts = 0;

            for (int i = 0; i < 100; i++) {
                for (int j = 0; j < 100; j++) {
                    if (map[i][j] == 1 && map[i][j + 1] == 1 && map[i + 1][j] == 1 && map[i + 1][j + 1] == 1) {
                        counts++;
                    }
                }
            }

            return counts;
        }

        private int getCountClockDir(int dir) {
            return (dir + 1) % 4;
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

            int N = Integer.parseInt(br.readLine());

            DragonMap dragons = new DragonMap();

            for (int i = 0; i < N; i++) {
                int[] info = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
                dragons.drawDragonCurves(info[0], info[1], info[2], info[3]);
            }
            br.close();

            System.out.println(dragons.countSquares());
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 매 세대마다 방향이 바뀌는 것에 대해, 이를 리스트에 저장하고 계속 업데이트해주는 방식은 생각했지만, 왜인지 리스트도 큐처럼 `push` , `pop` 을 해야 하니까 비효율적이지 않나 ... 하는 생각에 사로잡혀 혼자 꽉 막혀버렸다.
- 다른 방법은 뭐가 있나 싶어 한 블로그를 봤는데, 생각한 그대로를 구현한 글을 발견해서 나의 무지함을 깨달았다.

### 📕 출처
- Baekjoon : https://www.acmicpc.net/problem/15685
- [15685](https://velog.io/@hammii/%EB%B0%B1%EC%A4%80-15685-%EB%93%9C%EB%9E%98%EA%B3%A4-%EC%BB%A4%EB%B8%8C-java)
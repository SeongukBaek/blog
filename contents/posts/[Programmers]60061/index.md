---
title: "👩‍💻 60061. 기둥과 보 설치"
description: "알고리즘 문제 풀기"
date: 2022-06-23
update: 2022-06-23
tags:
  - 구현
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 기둥과 보 설치](https://programmers.co.kr/learn/courses/30/lessons/60061)

### 📍 **Logic**

```java
private static boolean checkPillar(int x, int y) {
  // 바닥 설치
  if (y == 0) return true;
  // 아래에 기둥이 있는 경우
  else if (y > 0 && pillars[x][y - 1]) return true;
  // 한쪽에 보가 있는 경우
  else return x > 0 && covers[x - 1][y] || covers[x][y];
}

private static boolean checkCover(int x, int y) {
  // 한쪽 끝에 기둥이 있는 경우
  if (y > 0 && pillars[x][y - 1] || pillars[x + 1][y - 1]) return true;
  // 양쪽 끝이 모두 보와 연결된 경우
  else return x > 0 && covers[x - 1][y] && covers[x + 1][y];
}

private static boolean canDelete(int n) {
  for (int i = 0; i <= n; i++)
      for (int j = 0; j <= n; j++)
          // 기둥이 해당 위치에 있을 수 없거나, 보가 해당 위치에 있을 수 없는 경우 false
          if ((pillars[i][j] && !checkPillar(i, j)) || (covers[i][j] && !checkCover(i, j))) return false;
  return true;
}
```
- `checkPillar` 와 `checkCover` 는 각각 기둥과 보가 설치가능한지를 확인하는 함수이다.
  - 주어진 조건에 따라 이를 확인한다.
- `canDelete` 는 기둥과 보를 주어진 명령대로 삭제했을 때, 주어진 조건을 불만족하는 좌표가 없는지 확인한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

    import java.util.*;

    class Solution {
        static boolean[][] pillars;
        static boolean[][] covers;
        
        public int[][] solution(int n, int[][] build_frame) {
            pillars = new boolean[n + 1][n + 1];
            covers = new boolean[n + 1][n + 1];
            int count = 0;

            for (int[] bf : build_frame) {
                int x = bf[0];
                int y = bf[1];
                int struct = bf[2];
                int command = bf[3];

                // 기둥
                if (struct == 0) {
                    // 삭제
                    if (command == 0) {
                        pillars[x][y] = false;
                        if (!canDelete(n)) pillars[x][y] = true;
                        else count--;
                    }
                    // 설치
                    else {
                        if (!checkPillar(x, y)) continue;
                        pillars[x][y] = true;
                        count++;
                    }
                }
                // 보
                else {
                    // 삭제
                    if (command == 0) {
                        covers[x][y] = false;
                        if (!canDelete(n)) covers[x][y] = true;
                        else count--;
                    }
                    // 설치
                    else {
                        if (!checkCover(x, y)) continue;
                        covers[x][y] = true;
                        count++;
                    }
                }
            }

            int[][] answer = new int[count][3];
            int idx = 0;
            for (int i = 0; i <= n; i++) {
                for (int j = 0; j <= n; j++) {
                    if (pillars[i][j])
                        answer[idx++] = new int[]{i, j, 0};
                    if (covers[i][j])
                        answer[idx++] = new int[]{i, j, 1};
                }
            }
            
            return answer;
        }
        
        private static boolean checkPillar(int x, int y) {
            // 바닥 설치
            if (y == 0) return true;
            // 아래에 기둥이 있는 경우
            else if (y > 0 && pillars[x][y - 1]) return true;
            // 한쪽에 보가 있는 경우
            else return x > 0 && covers[x - 1][y] || covers[x][y];
        }
        
        private static boolean checkCover(int x, int y) {
            // 한쪽 끝에 기둥이 있는 경우
            if (y > 0 && pillars[x][y - 1] || pillars[x + 1][y - 1]) return true;
            // 양쪽 끝이 모두 보와 연결된 경우
            else return x > 0 && covers[x - 1][y] && covers[x + 1][y];
        }

        private static boolean canDelete(int n) {
            for (int i = 0; i <= n; i++)
                for (int j = 0; j <= n; j++)
                    // 기둥이 해당 위치에 있을 수 없거나, 보가 해당 위치에 있을 수 없는 경우 false
                    if ((pillars[i][j] && !checkPillar(i, j)) || (covers[i][j] && !checkCover(i, j))) return false;
            return true;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 처음 구현 시, 기둥과 보의 삭제 조건 확인때문에 애를 먹었고, `map` 하나에 기둥 여부와 보 여부를 함께 저장했었는데, 생각해보니 기둥과 보가 한 좌표에 함께 존재할 수 있었던 것을 간과했었다.
- 또한, 설치와 삭제하는 구조물에 대한 `ArrayList` 를 만들어서 관리할 구조물의 범위를 줄이려 했는데 구현에서 조금 막혔다 ...
  - 새 객체를 만들어서 이미 있는 `Map` 에서 값을 조회하려하니 아예 다른 객체로 판단을 해서 조회가 불가능했다.
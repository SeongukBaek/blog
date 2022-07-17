---
title: "👩‍💻 92344. 파괴되지 않은 건물"
description: "알고리즘 문제 풀기"
date: 2022-07-17
update: 2022-07-17
tags:
  - 누적합
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 파괴되지 않은 건물](https://programmers.co.kr/learn/courses/30/lessons/92344)

### 📍 **Logic**

```java
private void fill(int r1, int c1, int r2, int c2, int deg) {
    attackOrHeal[r1][c1] += deg;
    if (c2 + 1 < cSize) attackOrHeal[r1][c2 + 1] += -deg;
    if (r2 + 1 < rSize) attackOrHeal[r2 + 1][c1] += -deg;
    if (r2 + 1 < rSize && c2 + 1 < cSize) attackOrHeal[r2 + 1][c2 + 1] += deg;
}
```

- 주어진 범위의 누적합 계산을 위해 범위 내의 배열 값을 누적합하는 함수
 
### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	class Solution {
        static int[][] attackOrHeal;
        static int[][] board;
        static int rSize;
        static int cSize;
        
        public int solution(int[][] board, int[][] skill) {
            this.board = board;
            this.rSize = board.length;
            this.cSize = board[0].length;
            attackOrHeal = new int[rSize][cSize];
            
            for (int[] sk : skill) {
                boolean attack = sk[0] == 1;
                int r1 = sk[1];
                int c1 = sk[2];
                int r2 = sk[3];
                int c2 = sk[4];
                int deg = sk[5];

                if (attack) fill(r1, c1, r2, c2, -deg);
                else fill(r1, c1, r2, c2, deg);
            }
            
            accumulate();
            
            return countUndestroyedBuildings();
        }
        
        // 각 열별 오른쪽 누적합, 각 행별 아래쪽 누적합 계산
        private void accumulate() {
            for (int i = 0; i < rSize; i++)
                for (int j = 1; j < cSize; j++)
                    attackOrHeal[i][j] += attackOrHeal[i][j - 1];
            
            for (int i = 1; i < rSize; i++)
                for (int j = 0; j < cSize; j++)
                    attackOrHeal[i][j] += attackOrHeal[i - 1][j];
        }
        
        // 누적합 배열과 board를 계산하여 내구도가 0보다 큰 건물 카운트
        private int countUndestroyedBuildings() {
            int count = 0;
            
            for (int i = 0; i < rSize; i++) 
                for (int j = 0; j < cSize; j++) 
                    if (board[i][j] + attackOrHeal[i][j] > 0) count++;
            
            return count;
        }
        
        // 시간 복잡도를 줄이기 위해 누적합을 사용하는데, 이를 위해 필요한 배열 범위의 값 채우기
        private void fill(int r1, int c1, int r2, int c2, int deg) {
            attackOrHeal[r1][c1] += deg;
            if (c2 + 1 < cSize) attackOrHeal[r1][c2 + 1] += -deg;
            if (r2 + 1 < rSize) attackOrHeal[r2 + 1][c1] += -deg;
            if (r2 + 1 < rSize && c2 + 1 < cSize) attackOrHeal[r2 + 1][c2 + 1] += deg;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 처음에는 `skill` 값을 다 읽고 최종적으로 `board` 에 증감할 값을 만들어두고 0보다 큰 경우의 개수를 세는 방식으로 구현했는데 당연히도 시간 초과가 났다.
- 여기서 더 이상 시간을 줄일 방법을 모르겠어서 카카오 풀이를 참고했다. 뭔가 비슷한 느낌이긴 한데, 누적합 배열을 사용해 시간복잡도를 줄일 수 있었다..
  - 그치만 이런 풀이는 누적합 문제를 가지고 놀 정도가 되어야 떠오를 것 같다....
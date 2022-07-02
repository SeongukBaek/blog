---
title: "👩‍💻 77485. 행렬 테두리 회전하기"
description: "알고리즘 문제 풀기"
date: 2022-07-02
update: 2022-07-02
tags:
  - 구현
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 행렬 테두리 회전하기](https://programmers.co.kr/learn/courses/30/lessons/77485)

### 📍 **Logic**

```java
private int rotation(int x1, int y1, int x2, int y2) {...}
```

- 주어진 두 좌표를 기준으로, 왼쪽 줄, 아랫 줄, 오른쪽 줄, 윗 줄 순으로 행렬을 회전시키면서, 최솟값을 찾는 함수

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	class Solution {
    
        static int[][] map;
        
        public int[] solution(int rows, int columns, int[][] queries) {
            int[] answer = new int[queries.length];
            int idx = 0;
            
            init(rows, columns);
            
            for (int[] query : queries)
                answer[idx++] = rotation(query[0] - 1, query[1] - 1, query[2] - 1, query[3] - 1);
            
            return answer;
        }
        
        private void init(int rows, int columns) {
            map = new int[rows][columns];
            int num = 1;
            
            for (int i = 0; i < rows; i++)
                for (int j = 0; j < columns; j++)
                    map[i][j] = num++;
        }
        
        private int rotation(int x1, int y1, int x2, int y2) {
            int w = y2 - y1;
            int h = x2 - x1;
            int value = map[x1][y1];
            int min = value;
            
            // 왼쪽 줄 이동
            for (int i = x1 + 1; i <= x1 + h; i++) {
                int moveN = map[i][y1];
                if (min > moveN) min = moveN;
                map[i - 1][y1] = moveN;
            }
            
            // 아랫 줄 이동
            for (int j = y1 + 1; j <= y1 + w; j++) {
                int moveN = map[x2][j];
                if (min > moveN) min = moveN;
                map[x2][j - 1] = moveN;
            }
            
            // 오른쪽 줄 이동
            for (int i = x2 - 1; i >= x1; i--) {
                int moveN = map[i][y2];
                if (min > moveN) min = moveN;
                map[i + 1][y2] = moveN;
            }
            
            // 윗 줄 이동
            for (int j = y2 - 1; j > y1; j--) {
                int moveN = map[x1][j];
                if (min > moveN) min = moveN;
                map[x1][j + 1] = moveN;
            }
            
            map[x1][y1 + 1] = value;
            
            return min;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 문제 자체는 쉬우나, 인덱스 보다가 눈알 빠져버리는 문제
---
title: "π©βπ» 77485. νλ ¬ νλλ¦¬ νμ νκΈ°"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-07-02
update: 2022-07-02
tags:
  - κ΅¬ν
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - νλ ¬ νλλ¦¬ νμ νκΈ°](https://programmers.co.kr/learn/courses/30/lessons/77485)

### π **Logic**

```java
private int rotation(int x1, int y1, int x2, int y2) {...}
```

- μ£Όμ΄μ§ λ μ’νλ₯Ό κΈ°μ€μΌλ‘, μΌμͺ½ μ€, μλ« μ€, μ€λ₯Έμͺ½ μ€, μ μ€ μμΌλ‘ νλ ¬μ νμ μν€λ©΄μ, μ΅μκ°μ μ°Ύλ ν¨μ

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
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
            
            // μΌμͺ½ μ€ μ΄λ
            for (int i = x1 + 1; i <= x1 + h; i++) {
                int moveN = map[i][y1];
                if (min > moveN) min = moveN;
                map[i - 1][y1] = moveN;
            }
            
            // μλ« μ€ μ΄λ
            for (int j = y1 + 1; j <= y1 + w; j++) {
                int moveN = map[x2][j];
                if (min > moveN) min = moveN;
                map[x2][j - 1] = moveN;
            }
            
            // μ€λ₯Έμͺ½ μ€ μ΄λ
            for (int i = x2 - 1; i >= x1; i--) {
                int moveN = map[i][y2];
                if (min > moveN) min = moveN;
                map[i + 1][y2] = moveN;
            }
            
            // μ μ€ μ΄λ
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

### βοΈ **Review**
- λ¬Έμ  μμ²΄λ μ¬μ°λ, μΈλ±μ€ λ³΄λ€κ° λμ λΉ μ Έλ²λ¦¬λ λ¬Έμ 
---
title: "π©βπ» 92344. νκ΄΄λμ§ μμ κ±΄λ¬Ό"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-07-17
update: 2022-07-17
tags:
  - λμ ν©
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - νκ΄΄λμ§ μμ κ±΄λ¬Ό](https://programmers.co.kr/learn/courses/30/lessons/92344)

### π **Logic**

```java
private void fill(int r1, int c1, int r2, int c2, int deg) {
    attackOrHeal[r1][c1] += deg;
    if (c2 + 1 < cSize) attackOrHeal[r1][c2 + 1] += -deg;
    if (r2 + 1 < rSize) attackOrHeal[r2 + 1][c1] += -deg;
    if (r2 + 1 < rSize && c2 + 1 < cSize) attackOrHeal[r2 + 1][c2 + 1] += deg;
}
```

- μ£Όμ΄μ§ λ²μμ λμ ν© κ³μ°μ μν΄ λ²μ λ΄μ λ°°μ΄ κ°μ λμ ν©νλ ν¨μ
 
### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
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
        
        // κ° μ΄λ³ μ€λ₯Έμͺ½ λμ ν©, κ° νλ³ μλμͺ½ λμ ν© κ³μ°
        private void accumulate() {
            for (int i = 0; i < rSize; i++)
                for (int j = 1; j < cSize; j++)
                    attackOrHeal[i][j] += attackOrHeal[i][j - 1];
            
            for (int i = 1; i < rSize; i++)
                for (int j = 0; j < cSize; j++)
                    attackOrHeal[i][j] += attackOrHeal[i - 1][j];
        }
        
        // λμ ν© λ°°μ΄κ³Ό boardλ₯Ό κ³μ°νμ¬ λ΄κ΅¬λκ° 0λ³΄λ€ ν° κ±΄λ¬Ό μΉ΄μ΄νΈ
        private int countUndestroyedBuildings() {
            int count = 0;
            
            for (int i = 0; i < rSize; i++) 
                for (int j = 0; j < cSize; j++) 
                    if (board[i][j] + attackOrHeal[i][j] > 0) count++;
            
            return count;
        }
        
        // μκ° λ³΅μ‘λλ₯Ό μ€μ΄κΈ° μν΄ λμ ν©μ μ¬μ©νλλ°, μ΄λ₯Ό μν΄ νμν λ°°μ΄ λ²μμ κ° μ±μ°κΈ°
        private void fill(int r1, int c1, int r2, int c2, int deg) {
            attackOrHeal[r1][c1] += deg;
            if (c2 + 1 < cSize) attackOrHeal[r1][c2 + 1] += -deg;
            if (r2 + 1 < rSize) attackOrHeal[r2 + 1][c1] += -deg;
            if (r2 + 1 < rSize && c2 + 1 < cSize) attackOrHeal[r2 + 1][c2 + 1] += deg;
        }
    }
  	</div>
</details>

### βοΈ **Review**
- μ²μμλ `skill` κ°μ λ€ μ½κ³  μ΅μ’μ μΌλ‘ `board` μ μ¦κ°ν  κ°μ λ§λ€μ΄λκ³  0λ³΄λ€ ν° κ²½μ°μ κ°μλ₯Ό μΈλ λ°©μμΌλ‘ κ΅¬ννλλ° λΉμ°νλ μκ° μ΄κ³Όκ° λ¬λ€.
- μ¬κΈ°μ λ μ΄μ μκ°μ μ€μΌ λ°©λ²μ λͺ¨λ₯΄κ² μ΄μ μΉ΄μΉ΄μ€ νμ΄λ₯Ό μ°Έκ³ νλ€. λ­κ° λΉμ·ν λλμ΄κΈ΄ νλ°, λμ ν© λ°°μ΄μ μ¬μ©ν΄ μκ°λ³΅μ‘λλ₯Ό μ€μΌ μ μμλ€..
  - κ·ΈμΉλ§ μ΄λ° νμ΄λ λμ ν© λ¬Έμ λ₯Ό κ°μ§κ³  λ μ λκ° λμ΄μΌ λ μ€λ₯Ό κ² κ°λ€....
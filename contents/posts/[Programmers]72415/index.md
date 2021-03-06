---
title: "π©βπ» 72415. μΉ΄λ μ§ λ§μΆκΈ°"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-07-07
update: 2022-07-07
tags:
  - BFS
  - μμ  νμ
  - μμ΄
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - μΉ΄λ μ§ λ§μΆκΈ°](https://programmers.co.kr/learn/courses/30/lessons/72415)

### π **Logic**

```java
private static int permutate(Card src) {
    int ret = Integer.MAX_VALUE;
    
    // 1λΆν° 6κΉμ§μ μΉ΄λκ° μ‘΄μ¬ν  μ μλ€.
    for (int n = 1; n <= 6; n++) {
        // nμ ν΄λΉνλ μΉ΄λλ₯Ό μ μ₯νλ λ¦¬μ€νΈ
        ArrayList<Card> cards = findNCard(n);
        
        // μ νν μΉ΄λλ€μ΄ μλ κ²½μ°, ν¨μ€
        if (cards.isEmpty()) continue;
        
        // νμ¬ μμΉλΆν° μ νν μΉ΄λκΉμ§ κ°κΈ° μν κ±°λ¦¬λ₯Ό κ³μ°
        int one = bfs(src, cards.get(0)) + bfs(cards.get(0), cards.get(1)) + 2;
        // oneμ μ­μμΌλ‘ μ§ν
        int two = bfs(src, cards.get(1)) + bfs(cards.get(1), cards.get(0)) + 2;
        
        // λ€μ§μ μΉ΄λλ₯Ό λ³΄λμμ μ κ±°
        removeCards(cards);
        
        // μ¬κ· νΈμΆ μν
        // oneμΌλ‘ μνν μΉ΄λ λ€μ§κΈ° μ΄ν, μ»€μκ° card.get(1)μ μμ λ λ¨μ μΉ΄λλ€μ λν λ€μ§κΈ° μν
        ret = Math.min(ret, one + permutate(cards.get(1)));
        // twoλ‘ μνν μΉ΄λ λ€μ§κΈ° μ΄ν, μ»€μκ° card.get(0)μ μμ λ λ¨μ μΉ΄λλ€μ λν λ€μ§κΈ° μν 
        ret = Math.min(ret, two + permutate(cards.get(0)));
        
        // 1λ² μΉ΄λμ λν λ€μ§κΈ° μν ν, 2λ² μΉ΄λμ λν λ€μ§κΈ° μ§ν μμλ 1λ² μΉ΄λ λ€μ§κΈ°μ λν λ³΅μμ΄ νμνλ€.
        restoreCards(cards, n);
    }
    
    if (ret == Integer.MAX_VALUE) return 0;
    
    return ret;
}
```
- μ¬κ·λ₯Ό μννλ©΄μ, λͺ¨λ  μΉ΄λ λ€μ§κΈ° μμλ₯Ό μ§ννλ©΄μ μ΅μ λΉμ©μ κ³μ°νλ€.
- μΉ΄λμ μΉ΄λ κ° μ΄λ μ μ΅μ μ‘°μ νμλ₯Ό κ΅¬νκΈ° μν΄ BFSλ₯Ό μννλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

    import java.util.*;

    class Card {
        // ν, μ΄, μ΄λνκΈ° μν΄ νμν μ‘°μ νμ
        int r;
        int c;
        int count;
        
        public Card(int r, int c, int count) {
            this.r = r;
            this.c = c;
            this.count = count;
        }
    }

    class Solution {
        static int[][] board;
        static int[][] range = {{ -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 }};
        
        public int solution(int[][] board, int r, int c) {
            this.board = board;
            
            return permutate(new Card(r, c, 0));
        }
        
        private static int permutate(Card src) {
            int ret = Integer.MAX_VALUE;
            
            // 1λΆν° 6κΉμ§μ μΉ΄λκ° μ‘΄μ¬ν  μ μλ€.
            for (int n = 1; n <= 6; n++) {
                // nμ ν΄λΉνλ μΉ΄λλ₯Ό μ μ₯νλ λ¦¬μ€νΈ
                ArrayList<Card> cards = findNCard(n);
                
                // μ νν μΉ΄λλ€μ΄ μλ κ²½μ°, ν¨μ€
                if (cards.isEmpty()) continue;
                
                // νμ¬ μμΉλΆν° μ νν μΉ΄λκΉμ§ κ°κΈ° μν κ±°λ¦¬λ₯Ό κ³μ°
                int one = bfs(src, cards.get(0)) + bfs(cards.get(0), cards.get(1)) + 2;
                // oneμ μ­μμΌλ‘ μ§ν
                int two = bfs(src, cards.get(1)) + bfs(cards.get(1), cards.get(0)) + 2;
                
                // λ€μ§μ μΉ΄λλ₯Ό λ³΄λμμ μ κ±°
                removeCards(cards);
                
                // μ¬κ· νΈμΆ μν
                // oneμΌλ‘ μνν μΉ΄λ λ€μ§κΈ° μ΄ν, μ»€μκ° card.get(1)μ μμ λ λ¨μ μΉ΄λλ€μ λν λ€μ§κΈ° μν
                ret = Math.min(ret, one + permutate(cards.get(1)));
                // twoλ‘ μνν μΉ΄λ λ€μ§κΈ° μ΄ν, μ»€μκ° card.get(0)μ μμ λ λ¨μ μΉ΄λλ€μ λν λ€μ§κΈ° μν 
                ret = Math.min(ret, two + permutate(cards.get(0)));
                
                // 1λ² μΉ΄λμ λν λ€μ§κΈ° μν ν, 2λ² μΉ΄λμ λν λ€μ§κΈ° μ§ν μμλ 1λ² μΉ΄λ λ€μ§κΈ°μ λν λ³΅μμ΄ νμνλ€.
                restoreCards(cards, n);
            }
            
            if (ret == Integer.MAX_VALUE) return 0;
            
            return ret;
        }
        
        private static int bfs(Card src, Card dest) {
            boolean[][] visited = new boolean[4][4];
            Queue<Card> queue = new LinkedList<>();
            queue.add(src);
            
            while(!queue.isEmpty()) {
                Card now = queue.poll();
                
                // λͺ©μ μ§μ λμ°©ν κ²½μ°, μ‘°μ νμλ₯Ό λ°ν
                if (now.r == dest.r && now.c == dest.c) return now.count;
                
                for (int i = 0; i < 4; i++) {
                    int nr = now.r + range[i][0], nc = now.c + range[i][1];
                    
                    if (!isInBoundary(nr, nc)) continue;
                    
                    // λ°©λ¬Ένμ§ μμ κ²½μ° μ‘°μ νμ κ°±μ 
                    if (!visited[nr][nc]) {
                        visited[nr][nc] = true;
                        queue.add(new Card(nr, nc, now.count + 1));
                    }
                    
                    // ctrlμ μ΄μ©ν΄ μ‘°μ κ°λ₯ν κ²½μ°
                    for (int j = 0; j < 2; j++) {
                        // λ€μ§μ΄μ§ μΉ΄λκ° μλ κ²½μ° μ’λ£
                        if (board[nr][nc] != 0) break;
                        // ν λ² λ ν΄λΉ λ°©ν₯μΌλ‘ μ§ννμ λ κ²½κ³λ₯Ό λ²μ΄λλ κ²½μ°λ μ’λ£
                        if (!isInBoundary(nr + range[i][0], nc + range[i][1])) break;
                        
                        nr += range[i][0];
                        nc += range[i][1];
                    }
                    
                    // nr, ncλ μ΄μ  ν λ²μ μ΄λν  μ μλ μμΉ
                    if (visited[nr][nc]) continue;
                    visited[nr][nc] = true;
                    queue.add(new Card(nr, nc, now.count + 1));
                }
            }
            
            return Integer.MAX_VALUE;
        }
        
        private static boolean isInBoundary(int r, int c) {
            return r >= 0 && r < 4 && c >= 0 && c < 4;
        }
        
        private static ArrayList<Card> findNCard(int num) {
            ArrayList<Card> cards = new ArrayList<>();
            
            for (int i = 0; i < 4; i++)
                for (int j = 0; j < 4; j++)
                    if (board[i][j] == num)
                        cards.add(new Card(i, j, 0));
            
            return cards;
        }
        
        private static void removeCards(ArrayList<Card> cards) {
            for (Card card : cards)
                board[card.r][card.c] = 0;
        }
        
        private static void restoreCards(ArrayList<Card> cards, int num) {
            for (Card card : cards)
                board[card.r][card.c] = num;
        }
    }
  	</div>
</details>

### βοΈ **Review**
- μ²μμ κ΅¬ννλ €ν μμ΄λμ΄λ, `map` μ μΉ΄λ λ²νΈλ³λ‘ μΉ΄λ μμΉλ₯Ό μ μ₯νκ³ , νμ¬ μ»€μμμ κ°μ₯ κ°κΉμ΄ μλ μΉ΄λλ₯Ό λ€μ§κ³ , ν΄λΉ μΉ΄λ μ§μ μ°Ύμ μ»€μλ₯Ό μ΄λν ν λ€μ§κ³ λ₯Ό λ°λ³΅νλ λ°©μμ΄μλ€.
  - μκ°ν΄λ³΄λ μΉ΄λ μμκ° μ€μν  μ μκ² λ€λΌλ κ±Έ κΉ¨λ¬μκ³ , κ΅¬νμ μ΄λ»κ² ν΄μΌ ν  μ§ λͺ¨λ₯΄κ² μ΄μ ... νμ΄ μμμ μ°Έκ³ νλ€.
---
title: "👩‍💻 72415. 카드 짝 맞추기"
description: "알고리즘 문제 풀기"
date: 2022-07-07
update: 2022-07-07
tags:
  - BFS
  - 완전 탐색
  - 순열
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 카드 짝 맞추기](https://programmers.co.kr/learn/courses/30/lessons/72415)

### 📍 **Logic**

```java
private static int permutate(Card src) {
    int ret = Integer.MAX_VALUE;
    
    // 1부터 6까지의 카드가 존재할 수 있다.
    for (int n = 1; n <= 6; n++) {
        // n에 해당하는 카드를 저장하는 리스트
        ArrayList<Card> cards = findNCard(n);
        
        // 선택한 카드들이 없는 경우, 패스
        if (cards.isEmpty()) continue;
        
        // 현재 위치부터 선택한 카드까지 가기 위한 거리를 계산
        int one = bfs(src, cards.get(0)) + bfs(cards.get(0), cards.get(1)) + 2;
        // one의 역순으로 진행
        int two = bfs(src, cards.get(1)) + bfs(cards.get(1), cards.get(0)) + 2;
        
        // 뒤집은 카드를 보드에서 제거
        removeCards(cards);
        
        // 재귀 호출 수행
        // one으로 수행한 카드 뒤집기 이후, 커서가 card.get(1)에 있을 때 남은 카드들에 대한 뒤집기 수행
        ret = Math.min(ret, one + permutate(cards.get(1)));
        // two로 수행한 카드 뒤집기 이후, 커서가 card.get(0)에 있을 때 남은 카드들에 대한 뒤집기 수행 
        ret = Math.min(ret, two + permutate(cards.get(0)));
        
        // 1번 카드에 대한 뒤집기 수행 후, 2번 카드에 대한 뒤집기 진행 시에는 1번 카드 뒤집기에 대한 복원이 필요하다.
        restoreCards(cards, n);
    }
    
    if (ret == Integer.MAX_VALUE) return 0;
    
    return ret;
}
```
- 재귀를 수행하면서, 모든 카드 뒤집기 순서를 진행하면서 최소 비용을 계산한다.
- 카드와 카드 간 이동 시 최소 조작 횟수를 구하기 위해 BFS를 수행한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

    import java.util.*;

    class Card {
        // 행, 열, 이동하기 위해 필요한 조작 횟수
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
            
            // 1부터 6까지의 카드가 존재할 수 있다.
            for (int n = 1; n <= 6; n++) {
                // n에 해당하는 카드를 저장하는 리스트
                ArrayList<Card> cards = findNCard(n);
                
                // 선택한 카드들이 없는 경우, 패스
                if (cards.isEmpty()) continue;
                
                // 현재 위치부터 선택한 카드까지 가기 위한 거리를 계산
                int one = bfs(src, cards.get(0)) + bfs(cards.get(0), cards.get(1)) + 2;
                // one의 역순으로 진행
                int two = bfs(src, cards.get(1)) + bfs(cards.get(1), cards.get(0)) + 2;
                
                // 뒤집은 카드를 보드에서 제거
                removeCards(cards);
                
                // 재귀 호출 수행
                // one으로 수행한 카드 뒤집기 이후, 커서가 card.get(1)에 있을 때 남은 카드들에 대한 뒤집기 수행
                ret = Math.min(ret, one + permutate(cards.get(1)));
                // two로 수행한 카드 뒤집기 이후, 커서가 card.get(0)에 있을 때 남은 카드들에 대한 뒤집기 수행 
                ret = Math.min(ret, two + permutate(cards.get(0)));
                
                // 1번 카드에 대한 뒤집기 수행 후, 2번 카드에 대한 뒤집기 진행 시에는 1번 카드 뒤집기에 대한 복원이 필요하다.
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
                
                // 목적지에 도착한 경우, 조작 횟수를 반환
                if (now.r == dest.r && now.c == dest.c) return now.count;
                
                for (int i = 0; i < 4; i++) {
                    int nr = now.r + range[i][0], nc = now.c + range[i][1];
                    
                    if (!isInBoundary(nr, nc)) continue;
                    
                    // 방문하지 않은 경우 조작 횟수 갱신
                    if (!visited[nr][nc]) {
                        visited[nr][nc] = true;
                        queue.add(new Card(nr, nc, now.count + 1));
                    }
                    
                    // ctrl을 이용해 조작 가능한 경우
                    for (int j = 0; j < 2; j++) {
                        // 뒤집어진 카드가 아닌 경우 종료
                        if (board[nr][nc] != 0) break;
                        // 한 번 더 해당 방향으로 진행했을 때 경계를 벗어나는 경우도 종료
                        if (!isInBoundary(nr + range[i][0], nc + range[i][1])) break;
                        
                        nr += range[i][0];
                        nc += range[i][1];
                    }
                    
                    // nr, nc는 이제 한 번에 이동할 수 있는 위치
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

### ✏️ **Review**
- 처음에 구현하려한 아이디어는, `map` 에 카드 번호별로 카드 위치를 저장하고, 현재 커서에서 가장 가까이 있는 카드를 뒤집고, 해당 카드 짝을 찾아 커서를 이동한 후 뒤집고를 반복하는 방식이었다.
  - 생각해보니 카드 순서가 중요할 수 있겠다라는 걸 깨달았고, 구현을 어떻게 해야 할 지 모르겠어서 ... 풀이 영상을 참고했다.
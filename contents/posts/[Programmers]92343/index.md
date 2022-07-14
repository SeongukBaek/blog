---
title: "👩‍💻 92343. 양과 늑대"
description: "알고리즘 문제 풀기"
date: 2022-07-14
update: 2022-07-14
tags:
  - BFS
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 양과 늑대](https://programmers.co.kr/learn/courses/30/lessons/92343)

### 📍 **Logic**

```java
private ArrayList<Integer> makeList(ArrayList<Integer> nowNodeList, int nowN, int nextNode) {
    // 이동할 수 있는 노드를 저장할 리스트
    ArrayList<Integer> nextList = new ArrayList<>();

    // 다음 노드에서 갈 수 있는 노드를 저장, 연결된 자식 노드에 대해서만!
    for (int fromNextNode : infoList.get(nextNode)) nextList.add(fromNextNode);

    // 현 노드까지 오는데 방문했던 노드들 중 현 노드와 직전에 방문한 노드를 제외하고 저장, DFS로 따지면 백트래킹하는 느낌..
    for (int checkNode : nowNodeList) 
        if (checkNode != nowN && checkNode != nextNode)
            nextList.add(checkNode);
    
    return nextList;
}
```

- 현 노드에서 갈 수 있는 노드 리스트를 생성하는 함수
- 연결된 자식 노드로만 이동할 수 있는 게 아니라, 지나왔던 노드 또한 재방문 가능하기에 두 번째 반복문에서 이를 처리한다.
 
### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Node {
        int num;
        int sheepCount;
        int wolfCount;
        // 갈 수 있는 노드를 저장하는 리스트!
        ArrayList<Integer> list;
        
        public Node(int num, int sheepCount, int wolfCount, ArrayList<Integer> list) {
            this.num = num;
            this.sheepCount = sheepCount;
            this.wolfCount = wolfCount;
            this.list = list;
        }
    }

    class Solution {
        static ArrayList<ArrayList<Integer>> infoList;
        static int[] info;
        
        public int solution(int[] info, int[][] edges) {
            init(info.length, edges);
            this.info = info;
            
            return bfs();
        }
        
        private void init(int length, int[][] edges) {
            infoList = new ArrayList<>();
            
            for (int i = 0; i < length; i++)
                infoList.add(new ArrayList<>());
            
            for (int[] edge : edges) {
                int n1 = edge[0];
                int n2 = edge[1];
                
                infoList.get(n1).add(n2);
            }
        }
        
        private int bfs() {
            Queue<Node> queue = new LinkedList<>();
            queue.add(new Node(0, 1, 0, infoList.get(0)));
            int max = 0;
            
            while(!queue.isEmpty()) {
                Node now = queue.poll();
                int nowN = now.num;
                int sheepCount = now.sheepCount;
                int wolfCount = now.wolfCount;
                ArrayList<Integer> nowNodeList = now.list;
                
                if (max < sheepCount)
                    max = sheepCount;
                
                // 현 노드에서 갈 수 있는 노드에 대해 확인
                // nowN = 0, nextNode = {1, 8}, fromNextNode = {{2, 4}, {7, 9}}
                for (int nextNode : nowNodeList) {
                    // 양이거나, 늑대의 수가 양의 수보다 적은 경우
                    if (info[nextNode] == 0)
                        queue.add(new Node(nextNode, sheepCount + 1, wolfCount, makeList(nowNodeList, nowN, nextNode)));
                    else
                        if (wolfCount + 1 < sheepCount)
                            queue.add(new Node(nextNode, sheepCount, wolfCount + 1, makeList(nowNodeList, nowN, nextNode)));
                }
            }
            
            return max;
        }
        
        private ArrayList<Integer> makeList(ArrayList<Integer> nowNodeList, int nowN, int nextNode) {
            // 이동할 수 있는 노드를 저장할 리스트
            ArrayList<Integer> nextList = new ArrayList<>();

            // 다음 노드에서 갈 수 있는 노드를 저장, 연결된 자식 노드에 대해서만!
            for (int fromNextNode : infoList.get(nextNode)) nextList.add(fromNextNode);

            // 현 노드까지 오는데 방문했던 노드들 중 현 노드와 직전에 방문한 노드를 제외하고 저장, DFS로 따지면 백트래킹하는 느낌..
            for (int checkNode : nowNodeList) 
                if (checkNode != nowN && checkNode != nextNode)
                    nextList.add(checkNode);
            
            return nextList;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 처음에는 DFS로 해결해야 하나 생각해보다가, 뭔가 BFS로 풀어보고 싶었고, 양의 수와 늑대의 수에 따라 원래는 못 갔던 노드라도 다시 갈 수 있는 경우가 발생하기에 일종의 백트래킹 구현이 필요했다.
  - 아이디어는 잡을 수 있었으나, 다시 방문해야 하는 경우에 대한 구현에 있어서는 참고가 필요했다...
  - 참고를 보고 나서, 이런 응용 문제를 시간 안에 풀어야 박살낼 수 있지 않을까 .. 하는 생각 ...
---
title: "π©βπ» 92343. μκ³Ό λλ"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-07-14
update: 2022-07-14
tags:
  - BFS
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - μκ³Ό λλ](https://programmers.co.kr/learn/courses/30/lessons/92343)

### π **Logic**

```java
private ArrayList<Integer> makeList(ArrayList<Integer> nowNodeList, int nowN, int nextNode) {
    // μ΄λν  μ μλ λΈλλ₯Ό μ μ₯ν  λ¦¬μ€νΈ
    ArrayList<Integer> nextList = new ArrayList<>();

    // λ€μ λΈλμμ κ° μ μλ λΈλλ₯Ό μ μ₯, μ°κ²°λ μμ λΈλμ λν΄μλ§!
    for (int fromNextNode : infoList.get(nextNode)) nextList.add(fromNextNode);

    // ν λΈλκΉμ§ μ€λλ° λ°©λ¬Ένλ λΈλλ€ μ€ ν λΈλμ μ§μ μ λ°©λ¬Έν λΈλλ₯Ό μ μΈνκ³  μ μ₯, DFSλ‘ λ°μ§λ©΄ λ°±νΈλνΉνλ λλ..
    for (int checkNode : nowNodeList) 
        if (checkNode != nowN && checkNode != nextNode)
            nextList.add(checkNode);
    
    return nextList;
}
```

- ν λΈλμμ κ° μ μλ λΈλ λ¦¬μ€νΈλ₯Ό μμ±νλ ν¨μ
- μ°κ²°λ μμ λΈλλ‘λ§ μ΄λν  μ μλ κ² μλλΌ, μ§λμλ λΈλ λν μ¬λ°©λ¬Έ κ°λ₯νκΈ°μ λ λ²μ§Έ λ°λ³΅λ¬Έμμ μ΄λ₯Ό μ²λ¦¬νλ€.
 
### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	import java.util.*;

    class Node {
        int num;
        int sheepCount;
        int wolfCount;
        // κ° μ μλ λΈλλ₯Ό μ μ₯νλ λ¦¬μ€νΈ!
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
                
                // ν λΈλμμ κ° μ μλ λΈλμ λν΄ νμΈ
                // nowN = 0, nextNode = {1, 8}, fromNextNode = {{2, 4}, {7, 9}}
                for (int nextNode : nowNodeList) {
                    // μμ΄κ±°λ, λλμ μκ° μμ μλ³΄λ€ μ μ κ²½μ°
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
            // μ΄λν  μ μλ λΈλλ₯Ό μ μ₯ν  λ¦¬μ€νΈ
            ArrayList<Integer> nextList = new ArrayList<>();

            // λ€μ λΈλμμ κ° μ μλ λΈλλ₯Ό μ μ₯, μ°κ²°λ μμ λΈλμ λν΄μλ§!
            for (int fromNextNode : infoList.get(nextNode)) nextList.add(fromNextNode);

            // ν λΈλκΉμ§ μ€λλ° λ°©λ¬Ένλ λΈλλ€ μ€ ν λΈλμ μ§μ μ λ°©λ¬Έν λΈλλ₯Ό μ μΈνκ³  μ μ₯, DFSλ‘ λ°μ§λ©΄ λ°±νΈλνΉνλ λλ..
            for (int checkNode : nowNodeList) 
                if (checkNode != nowN && checkNode != nextNode)
                    nextList.add(checkNode);
            
            return nextList;
        }
    }
  	</div>
</details>

### βοΈ **Review**
- μ²μμλ DFSλ‘ ν΄κ²°ν΄μΌ νλ μκ°ν΄λ³΄λ€κ°, λ­κ° BFSλ‘ νμ΄λ³΄κ³  μΆμκ³ , μμ μμ λλμ μμ λ°λΌ μλλ λͺ» κ°λ λΈλλΌλ λ€μ κ° μ μλ κ²½μ°κ° λ°μνκΈ°μ μΌμ’μ λ°±νΈλνΉ κ΅¬νμ΄ νμνλ€.
  - μμ΄λμ΄λ μ‘μ μ μμμΌλ, λ€μ λ°©λ¬Έν΄μΌ νλ κ²½μ°μ λν κ΅¬νμ μμ΄μλ μ°Έκ³ κ° νμνλ€...
  - μ°Έκ³ λ₯Ό λ³΄κ³  λμ, μ΄λ° μμ© λ¬Έμ λ₯Ό μκ° μμ νμ΄μΌ λ°μ΄λΌ μ μμ§ μμκΉ .. νλ μκ° ...
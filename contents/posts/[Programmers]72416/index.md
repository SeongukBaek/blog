---
title: "π©βπ» 72416. λ§€μΆ νλ½ μ΅μν"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-07-10
update: 2022-07-10
tags:
  - DFS
  - DP
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - λ§€μΆ νλ½ μ΅μν](https://programmers.co.kr/learn/courses/30/lessons/72416)

### π **Logic**

```java
private static void traversal(int node) {
    // ν΄λΉ μ§μμ΄ μν¬μμ μ°Έμ¬νμ§ μλ κ²½μ°
    costs[node][0] = 0;
    // ν΄λΉ μ§μμ΄ μν¬μμ μ°Έμ¬ν κ²½μ° -> ν΄λΉ μ§μ λ§€μΆμ μ μ₯
    costs[node][1] = sales[node];
    
    // λ¦¬ν λΈλλΌλ©΄, μμλ‘ μ΅μ λΉμ©μ μ λ¬ν΄μΌ ν¨
    if (adjList.get(node).isEmpty()) return;
    
    int extraCost = 10001;
    for (int child : adjList.get(node)) {
        traversal(child);
        
        // μ΅μ λΉμ©μ λΆλͺ¨ λΈλ(νμ₯)μ λμ 
        if (costs[child][0] < costs[child][1]) {
            costs[node][0] += costs[child][0];
            costs[node][1] += costs[child][0];
            // νμ₯κ³Ό νμ λͺ¨λ μ°Έμ¬νμ§ μμΌλ©΄ μλκΈ°μ νμν μΆκ° λΉμ© κ³μ°
            extraCost = Math.min(extraCost, costs[child][1] - costs[child][0]);
        } else {
            costs[node][0] += costs[child][1];
            costs[node][1] += costs[child][1];    
            // λ μ€ ν λͺμ΄λΌλ μ°Έμ¬νλ€λ©΄ μΆκ° λΉμ©μ νμ μμ
            extraCost = 0;
        }
    }
    
    costs[node][0] += extraCost;
}
```
- ν΄λΉ μ§μμ΄ μν¬μμ μ°Έμ¬ν κ²½μ°μ νμ§ μμ κ²½μ°μ λν λΉμ©μ κ³μ°νλ€.
- λΆλͺ¨ λΈλμμλ μμ λΈλμ λΉμ© μ λ³΄λ₯Ό μ΄μ©ν΄ κ²½μ°μ λ°λ₯Έ λΉμ©μ κ³μ°νλ€.
  - μ΄λ, νμ₯κ³Ό νμ λͺ¨λ μ°Έμ¬νμ§ μλ κ²½μ°μ λν μΆκ° λΉμ©μ κ³μ°νλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

    import java.util.*;

    class Solution {
        // μ§μλ³ μν¬μμ μ°Έμ¬νμ λμ λ§€μΆκ³Ό μ°Έμ¬νμ§ μμμ λμ λ§€μΆ, 0: μ°Έμ¬ X, 1: μ°Έμ¬ O
        static int[][] costs;
        static ArrayList<ArrayList<Integer>> adjList = new ArrayList<>();
        static int[] sales;
        
        public int solution(int[] sales, int[][] links) {
            this.sales = sales;
            init();
            
            makeAdjList(links);
            
            traversal(0);
            
            return Math.min(costs[0][0], costs[0][1]);
        }
        
        private static void init() {
            costs = new int[sales.length][2];
            
            for (int i = 0; i < sales.length; i++) 
                adjList.add(new ArrayList<>());
        }
        
        private static void makeAdjList(int[][] links) {
            for (int[] link : links)
                adjList.get(link[0] - 1).add(link[1] - 1);
        }
        
        private static void traversal(int node) {
            // ν΄λΉ μ§μμ΄ μν¬μμ μ°Έμ¬νμ§ μλ κ²½μ°
            costs[node][0] = 0;
            // ν΄λΉ μ§μμ΄ μν¬μμ μ°Έμ¬ν κ²½μ° -> ν΄λΉ μ§μ λ§€μΆμ μ μ₯
            costs[node][1] = sales[node];
            
            // λ¦¬ν λΈλλΌλ©΄, μμλ‘ μ΅μ λΉμ©μ μ λ¬ν΄μΌ ν¨
            if (adjList.get(node).isEmpty()) return;
            
            int extraCost = 10001;
            for (int child : adjList.get(node)) {
                traversal(child);
                
                // μ΅μ λΉμ©μ λΆλͺ¨ λΈλ(νμ₯)μ λμ 
                if (costs[child][0] < costs[child][1]) {
                    costs[node][0] += costs[child][0];
                    costs[node][1] += costs[child][0];
                    // νμ₯κ³Ό νμ λͺ¨λ μ°Έμ¬νμ§ μμΌλ©΄ μλκΈ°μ νμν μΆκ° λΉμ© κ³μ°
                    extraCost = Math.min(extraCost, costs[child][1] - costs[child][0]);
                } else {
                    costs[node][0] += costs[child][1];
                    costs[node][1] += costs[child][1];    
                    // λ μ€ ν λͺμ΄λΌλ μ°Έμ¬νλ€λ©΄ μΆκ° λΉμ©μ νμ μμ
                    extraCost = 0;
                }
            }
            
            costs[node][0] += extraCost;
        }
    }
  	</div>
</details>

### βοΈ **Review**
- μ κ·Όλ²μ λͺ°λΌ ν€λ§€λ€κ°, νμ΄ μμμ μ°Έκ³ νλ€. νμ΄ μμμ λ³΄λ μ΄μ μλ λΉμ·ν λ¬Έμ λ₯Ό νμλ κ² κ°λ€. (μμ λΈλμ μ λ³΄λ₯Ό μμλ‘ λκ²¨μ£Όλ©΄μ μ΅μ λΉμ©μ κ΅¬νλ ...?)
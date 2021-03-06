---
title: "π©βπ» 9466. ν νλ‘μ νΈ"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-01-22
update: 2022-01-22
tags:
  - κ·Έλνμ΄λ‘ 
  - κ·Έλννμ
  - DFS
series: "π©βπ» BOJ"
---

## λ¬Έμ 

μ΄λ² κ°μνκΈ°μ 'λ¬Έμ  ν΄κ²°' κ°μλ₯Ό μ μ²­ν νμλ€μ ν νλ‘μ νΈλ₯Ό μνν΄μΌ νλ€. νλ‘μ νΈ νμ μμλ μ νμ΄ μλ€. μ¬μ§μ΄ λͺ¨λ  νμλ€μ΄ λμΌν νμ νμμΈ κ²½μ°μ κ°μ΄ ν νλ§ μμ μλ μλ€. νλ‘μ νΈ νμ κ΅¬μ±νκΈ° μν΄, λͺ¨λ  νμλ€μ νλ‘μ νΈλ₯Ό ν¨κ»νκ³  μΆμ νμμ μ νν΄μΌ νλ€. (λ¨, λ¨ ν λͺλ§ μ νν  μ μλ€.) νΌμ νκ³  μΆμ΄νλ νμμ μκΈ° μμ μ μ ννλ κ²λ κ°λ₯νλ€.

νμλ€μ΄(s1, s2, ..., sr)μ΄λΌ ν  λ, r=1μ΄κ³  s1μ΄ s1μ μ ννλ κ²½μ°λ, s1μ΄ s2λ₯Ό μ ννκ³ , s2κ° s3λ₯Ό μ ννκ³ ,..., sr-1μ΄ srμ μ ννκ³ , srμ΄ s1μ μ ννλ κ²½μ°μλ§ ν νμ΄ λ  μ μλ€.

μ΄λ νλ‘μ νΈ νμλ μνμ§ μλ νμλ€μ μλ₯Ό κ³μ°νλ νλ‘κ·Έλ¨μ μμ±νλΌ.

### μλ ₯
- μ²«μ§Έ μ€μ νμ€νΈ μΌμ΄μ€μ κ°μ Tκ° μ£Όμ΄μ§λ€. κ° νμ€νΈ μΌμ΄μ€μ μ²« μ€μλ νμμ μκ° μ μ n (2 β€ n β€ 100,000)μΌλ‘ μ£Όμ΄μ§λ€. κ° νμ€νΈ μΌμ΄μ€μ λμ§Έ μ€μλ μ νλ νμλ€μ λ²νΈκ° μ£Όμ΄μ§λ€. (λͺ¨λ  νμλ€μ 1λΆν° nκΉμ§ λ²νΈκ° λΆμ¬λλ€.)

### μΆλ ₯
- κ° νμ€νΈ μΌμ΄μ€λ§λ€ ν μ€μ μΆλ ₯νκ³ , κ° μ€μλ νλ‘μ νΈ νμ μνμ§ λͺ»ν νμλ€μ μλ₯Ό λνλ΄λ©΄ λλ€.

## π **Logic**

```java
class Graph {
    final int[] graph;
    int[] discovered;
    boolean[] fin;
    int answer = 0;
    int graph_size;

    public Graph(int size) {
        graph_size = size + 1;
        this.graph = new int[graph_size];
        discovered = new int[graph_size];
        fin = new boolean[graph_size];
    }
}
```

- κ·Έλνμ μ λ³΄λ₯Ό μ μ₯νκΈ° μν ν΄λμ€

```java
public void search(int node) {
    if (discovered[node] == 1) return;

    discovered[node] = 1;
    int next = graph[node];

    if (discovered[next] == 0) search(graph[node]);
    else {
        if (!fin[next]) {
            answer++;
            for (int i=next; i!=node; i=graph[i]) {
                answer++;
            }
        }
    }
    fin[node] = true;
}
```

- λ€μ λ°©λ¬Έν  μ μ μ΄ λ°©λ¬Ένμ§ μμ κ²½μ°λ `search()` λ‘ **DFS** μν
- λ€μ μ μ μ μ΄λ―Έ λ°©λ¬Έν κ²½μ°, `fin[next]` λ‘ μ΄λ―Έ μ¬μ΄ν΄μ΄ νμ±λ μ μ μΈμ§ νμΈ
  - κ·Έλ μ§ μμ κ²½μ°, λ€μ ν΄λΉ μ μ μΌλ‘ λμμ€κΈ° μ κΉμ§ ν΄λΉ μ μ κ³Ό μ°κ²°λ μ μ μ μλ₯Ό μΉ΄μ΄νΈ
  - μΉ΄μ΄νΈμ ν©μ΄ κ³§ νμ μ΄λ£¨λ νμλ€μ΄λ―λ‘, **μ μ²΄ νμ - λμ  μΉ΄μ΄νΈκ° μ λ΅**
  
### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	import java.util.*;

    class Graph {
        final int[] graph;
        int[] discovered;
        boolean[] fin;
        int answer = 0;
        int graph_size;

        public Graph(int size) {
            graph_size = size + 1;
            this.graph = new int[graph_size];
            discovered = new int[graph_size];
            fin = new boolean[graph_size];
        }

        public void AddElement(int x, int y) {
            graph[x] = y;
        }

        public int solution() {
            for (int i=1; i < graph_size; i++) this.search(i);
            return graph_size - 1 - this.answer;
        }

        public void search(int node) {
            if (discovered[node] == 1) return;

            discovered[node] = 1;
            int next = graph[node];

            if (discovered[next] == 0) search(graph[node]);
            else {
                if (!fin[next]) {
                    // λ€μ κ° μ μ μ΄ λ°©λ¬Έμ νμΌλ μμ§ λλμ§ μμ, μ¦ μ¬μ΄ν΄μ΄ μμ±λμ§ μμ μν
                    answer++;
                    for (int i=next; i!=node; i=graph[i]) {
                        answer++;
                    }
                }
            }
            fin[node] = true;
        }
    }

    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int T = sc.nextInt();

            while (T > 0) {
                int size = sc.nextInt();

                Graph g = new Graph(size);

                for (int i = 1; i <= size; i++) {
                    int tmp = sc.nextInt();
                    g.AddElement(i, tmp);
                }

                System.out.println(g.solution());
                T-=1;
            }
            sc.close();
        }
    }
  	</div>
</details>

### βοΈ **Review**
- κ²°κ΅­μ "μ¬μ΄ν΄μ μ°ΎμμΌ νλ€" λΌλ λΌλ¦¬λ λ§μμ§λ§, μ΅μ νλ₯Ό ν΄λ΄μ§ λͺ»ν΄ **μκ° μ΄κ³Ό**λ₯Ό νΌν  μ μμλ€.
- μ΄μ λΆν°λ νλ£¨μ 1λ¬Έμ λ νμ΄μΌνκΈ° λλ¬Έμ λλ¬΄ μκ°μ μ‘μ λ¨Ήμ§ μμΌλ €κ³  νμ΄λ₯Ό μ°Έκ³ νλ€.

### π μΆμ²
Baekjoon : https://www.acmicpc.net/problem/9466

### μ°Έκ³ 
https://bcp0109.tistory.com/32
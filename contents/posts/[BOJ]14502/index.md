---
title: "π©βπ» 14502. μ°κ΅¬μ"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-03-19
update: 2022-03-19
tags:
  - κ·Έλνμ΄λ‘ 
  - κ·Έλννμ
  - BFS
  - λΈλ£¨νΈν¬μ€
series: "π©βπ» BOJ"
---

## λ¬Έμ 
μΈμ²΄μ μΉλͺμ μΈ λ°μ΄λ¬μ€λ₯Ό μ°κ΅¬νλ μ°κ΅¬μμμ λ°μ΄λ¬μ€κ° μ μΆλμλ€. λ€νν λ°μ΄λ¬μ€λ μμ§ νΌμ§μ§ μμκ³ , λ°μ΄λ¬μ€μ νμ°μ λ§κΈ° μν΄μ μ°κ΅¬μμ λ²½μ μΈμ°λ €κ³  νλ€.
μ°κ΅¬μλ ν¬κΈ°κ° NΓMμΈ μ§μ¬κ°νμΌλ‘ λνλΌ μ μμΌλ©°, μ§μ¬κ°νμ 1Γ1 ν¬κΈ°μ μ μ¬κ°νμΌλ‘ λλμ΄μ Έ μλ€. μ°κ΅¬μλ λΉ μΉΈ, λ²½μΌλ‘ μ΄λ£¨μ΄μ Έ μμΌλ©°, λ²½μ μΉΈ νλλ₯Ό κ°λ μ°¨μ§νλ€. 
μΌλΆ μΉΈμ λ°μ΄λ¬μ€κ° μ‘΄μ¬νλ©°, μ΄ λ°μ΄λ¬μ€λ μνμ’μ°λ‘ μΈμ ν λΉ μΉΈμΌλ‘ λͺ¨λ νΌμ Έλκ° μ μλ€. μλ‘ μΈμΈ μ μλ λ²½μ κ°μλ 3κ°μ΄λ©°, κΌ­ 3κ°λ₯Ό μΈμμΌ νλ€.
μλ₯Ό λ€μ΄, μλμ κ°μ΄ μ°κ΅¬μκ° μκΈ΄ κ²½μ°λ₯Ό μ΄ν΄λ³΄μ.

```
2 0 0 0 1 1 0
0 0 1 0 1 2 0
0 1 1 0 1 0 0
0 1 0 0 0 0 0
0 0 0 0 0 1 1
0 1 0 0 0 0 0
0 1 0 0 0 0 0
```

μ΄λ, 0μ λΉ μΉΈ, 1μ λ²½, 2λ λ°μ΄λ¬μ€κ° μλ κ³³μ΄λ€. μλ¬΄λ° λ²½μ μΈμ°μ§ μλλ€λ©΄, λ°μ΄λ¬μ€λ λͺ¨λ  λΉ μΉΈμΌλ‘ νΌμ Έλκ° μ μλ€. 2ν 1μ΄, 1ν 2μ΄, 4ν 6μ΄μ λ²½μ μΈμ΄λ€λ©΄ μ§λμ λͺ¨μμ μλμ κ°μμ§κ² λλ€.

```
2 1 0 0 1 1 0
1 0 1 0 1 2 0
0 1 1 0 1 0 0
0 1 0 0 0 1 0
0 0 0 0 0 1 1
0 1 0 0 0 0 0
0 1 0 0 0 0 0
```

λ°μ΄λ¬μ€κ° νΌμ§ λ€μ λͺ¨μ΅μ μλμ κ°μμ§λ€.

```
2 1 0 0 1 1 2
1 0 1 0 1 2 2
0 1 1 0 1 2 2
0 1 0 0 0 1 2
0 0 0 0 0 1 1
0 1 0 0 0 0 0
0 1 0 0 0 0 0
```

λ²½μ 3κ° μΈμ΄ λ€, λ°μ΄λ¬μ€κ° νΌμ§ μ μλ κ³³μ μμ  μμ­μ΄λΌκ³  νλ€. μμ μ§λμμ μμ  μμ­μ ν¬κΈ°λ 27μ΄λ€. μ°κ΅¬μμ μ§λκ° μ£Όμ΄μ‘μ λ μ»μ μ μλ μμ  μμ­ ν¬κΈ°μ μ΅λκ°μ κ΅¬νλ νλ‘κ·Έλ¨μ μμ±νμμ€.

## μ, μΆλ ₯

μλ ₯
- μ²«μ§Έ μ€μ μ§λμ μΈλ‘ ν¬κΈ° Nκ³Ό κ°λ‘ ν¬κΈ° Mμ΄ μ£Όμ΄μ§λ€. (3 β€ N, M β€ 8)
- λμ§Έ μ€λΆν° Nκ°μ μ€μ μ§λμ λͺ¨μμ΄ μ£Όμ΄μ§λ€. 0μ λΉ μΉΈ, 1μ λ²½, 2λ λ°μ΄λ¬μ€κ° μλ μμΉμ΄λ€. 2μ κ°μλ 2λ³΄λ€ ν¬κ±°λ κ°κ³ , 10λ³΄λ€ μκ±°λ κ°μ μμ°μμ΄λ€.
- λΉ μΉΈμ κ°μλ 3κ° μ΄μμ΄λ€.

μΆλ ₯
- μ²«μ§Έ μ€μ μ»μ μ μλ μμ  μμ­μ μ΅λ ν¬κΈ°λ₯Ό μΆλ ₯νλ€.

### π **Logic**

```java
class Lab {
    Queue<Loc> locQueue;
    int N, M;
    int safeArea = 0;
    int[][] map;
    int[][] copyMap;
    int[] rangeX = { -1, 0, 1, 0 };
    int[] rangeY = { 0, 1, 0, -1 };

    Loc[] orgSafe;
    int idx0 = 0;
    ...
        
}
```

- μ°κ΅¬μμ μ λ³΄λ₯Ό κ΄λ¦¬νλ ν΄λμ€
- μλ³Έ μ°κ΅¬μ μ λ³΄λ₯Ό μ μ₯νλ `map` κ³Ό λ°μ΄λ¬μ€λ₯Ό μ€μ λ‘ νΌλ¨λ¦΄ `copyMap` μ μ¬μ©νλ€.
- λν λ²½μ μΈμΈ κ³΅κ°λ€μ μ μ₯νλ `orgSafe` λ°°μ΄μ μ¬μ©νλ€.
- `setWall()` μ¬κ· νΈμΆλ‘ λ²½μ μΈμ°κ³ , λ²½μ λ€ μΈμ΄ λ€μ, `spreadVirus()` μμ BFS λ°©μμΌλ‘ λ°μ΄λ¬μ€λ₯Ό νΌλ¨λ¦°λ€.
- μ΄ν, `countAndReset()` μΌλ‘ λ°μ΄λ¬μ€κ° νΌμ§ μ΄νμ μμ  μμ­μ μΉ΄μ΄νΈνκ³ , `map` μ μ΄μ©ν΄ `copyMap` μ λ°μ΄λ¬μ€κ° νΌμ§κΈ° μ  μνλ‘ λλ €λλλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.Arrays;
    import java.util.LinkedList;
    import java.util.Queue;

    class Loc {
        int x, y;

        public Loc(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    class Lab {
        Queue<Loc> locQueue;
        int N, M;
        int safeArea = 0;
        int[][] map;
        int[][] copyMap;
        int[] rangeX = { -1, 0, 1, 0 };
        int[] rangeY = { 0, 1, 0, -1 };

        Loc[] orgSafe;
        int idx0 = 0;

        public Lab (int N, int M) {
            this.N = N;
            this.M = M;
            map = new int[N][M];
            copyMap = new int[N][M];
            orgSafe = new Loc[N*M];
            locQueue = new LinkedList<>();
        }

        public int findMaxSafeArea() {
            setWall(0,3);
            return safeArea;
        }

        private void setWall(int idx, int count) {
            if (count == 0) {
                spreadVirus();
                int result = countAndReset();
                if (safeArea < result) safeArea = result;
            } else {
                count--;
                for (int i = idx; i < idx0; i++) {
                    copyMap[orgSafe[i].x][orgSafe[i].y] = 1;
                    setWall(i + 1, count);
                    copyMap[orgSafe[i].x][orgSafe[i].y] = 0;
                }
            }
        }

        private void spreadVirus() {
            for (int i = 0; i < locQueue.size(); i++) {
                Loc tmpLoc = locQueue.poll();
                bfs(tmpLoc.x, tmpLoc.y);
                locQueue.add(tmpLoc);
            }
        }

        private void bfs(int x, int y) {
            Queue<Loc> queue = new LinkedList<>();
            queue.add(new Loc(x, y));

            while (!queue.isEmpty()){
                Loc tmp = queue.poll();
                for (int i = 0; i < 4; i++) {
                    int nx = tmp.x + rangeX[i], ny = tmp.y + rangeY[i];
                    if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
                    if (copyMap[nx][ny] == 0) {
                        queue.add(new Loc(nx, ny));
                        copyMap[nx][ny] = 2;
                    }
                }
            }
        }

        private int countAndReset() {
            int count = 0;
            for (int i = 0; i < N; i++) {
                for (int j = 0; j < M; j++) {
                    if (copyMap[i][j] == 0) count++;
                    if (copyMap[i][j] == 2) {
                        if (locQueue.contains(new Loc(i, j))) continue;
                        copyMap[i][j] = map[i][j];
                    }
                }
            }
            return count;
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

            String[] line = br.readLine().split(" ");
            int N = Integer.parseInt(line[0]);
            int M = Integer.parseInt(line[1]);

            Lab lab = new Lab(N, M);

            for (int i = 0; i < N; i++) {
                lab.map[i] = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
                for (int j = 0; j < M; j++) {
                    if (lab.map[i][j] == 2)
                        lab.locQueue.add(new Loc(i, j));
                    else if (lab.map[i][j] == 0)
                        lab.orgSafe[lab.idx0++] = new Loc(i, j);
                    lab.copyMap[i][j] = lab.map[i][j];
                }
            }

            br.close();

            System.out.println(lab.findMaxSafeArea());
        }
    }
  	</div>
</details>

### βοΈ **Review**
- μλμ μ°κ΅¬μ μ λ³΄λ₯Ό κ°μ§νκΈ° μν΄ `map` κ³Ό `copyMap` λ°°μ΄μ λκ³  μ§ννλλ°, κ³μ λ λ°°μ΄μ΄ λκΈ°νλ κ²λ§λ₯ κ°μ΄ κ°μ΄ λ³κ²½λκ³  μμλ€. μλ¬΄λλ `lab.map[i] = lab.copyMap[i];` μ΄ μ½λ λλ¬Έμ μΈμ€ν΄μ€μ μ£Όμ κ³΅μ λ μ°Έμ‘°μ λ¬Έμ μΌκ±°λΌ μκ°ν΄ κ²μν΄λ³΄λ μλλ λ€λ₯ΌκΉ "μμ λ³΅μ¬μ κΉμ λ³΅μ¬" λ¬Έμ μλ€. ν λ² μ λ¦¬ν΄μΌκ² λ€.
- λ°μ΄λ¬μ€κ° νΌμ§ μ΄ν λ€μ μμλ³΅κ΅¬ν λ, μΈμ΄ λ²½κΉμ§ μμ λ²λ¦¬λ μ΄κΈ°ν κ³Όμ λλ¬Έμ κ°μ΄ κ³μ μλͺ» λμλ€. μ΄κΈ°ν κ³Όμ μ ν­μ μ νμΈνμ.

### π μΆμ²
Baekjoon : https://www.acmicpc.net/problem/14502
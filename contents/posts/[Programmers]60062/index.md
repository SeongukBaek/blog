---
title: "π©βπ» 60062. μΈλ²½ μ κ²"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-06-25
update: 2022-06-25
tags:
  - μμ  νμ
  - μμ΄
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - μΈλ²½ μ κ²](https://programmers.co.kr/learn/courses/30/lessons/60062)

### π **Logic**

```java
private void canCheck(int[] friends) {
    for (int i = 0; i < weak.length; i++) {
        int start = i;
        boolean canCheck = true;

        for (int idx = 0; idx < friends.length; idx++) {
            for (int j = i; j < i + weak.length; j++) {
                // λ μ§μ  κ° κ±°λ¦¬κ° friendsλ‘ λ½ν μΉκ΅¬κ° μ κ² κ°λ₯ν κ±°λ¦¬λ³΄λ€ ν° κ²½μ°λ μ κ² λΆκ°λ₯
                // λ°λΌμ νμ¬ μ§μ μ μμμ μΌλ‘ μ§μ 
                if (unrolledWeak[j] - unrolledWeak[start] > friends[idx]) {
                    start = j;
                    idx++;

                    // νμ¬ μ§μ μ μ κ²ν  μ μλλ°, λ μ κ²ν  μΉκ΅¬κ° μλ€λ©΄, μ’λ£
                    if (idx == friends.length) {
                        canCheck = false;
                        break;
                    }
                }
            }

            // μ κ² μλ£λΌλ©΄, λ μ΄μ μ κ²ν  νμκ° μλ€. λ°λΌμ flagλ₯Ό true μ§μ 
            if (canCheck) {
                answer = idx + 1;
                isFinish = true;
                return;
            }
        }
    }
}
```
- λ§λ€μ΄μ§ μ κ² μΈμμ μ΄μ©ν΄ μ κ²μ΄ κ°λ₯νμ§ νμΈνλ€.
- μ·¨μ½ μ§μ  κ° κ±°λ¦¬λ₯Ό νμνλ©΄μ, λͺ¨λ μ κ²μ΄ κ°λ₯νλ€λ©΄ `answer` λ `idx + 1` λ‘ μλ°μ΄νΈλκ³ , μ’λ£λ₯Ό μν΄ `isFinish` λ₯Ό μλ°μ΄νΈν΄ μμ΄ λ§λλ κ²μ μ’λ£νλ€.
- μ κ² μΈμμ λͺ¨λ λμν΄λ μ κ²μ΄ λΆκ°λ₯νλ€λ©΄, λμ΄μ νμμ μ’λ£νκ³ , λ€μ μ κ² μΈμ μμ΄μ λ§λ λ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

    class Solution {
        static int[] unrolledWeak;
        static boolean isFinish;
        static int[] weak;
        static int[] dist;
        static int answer = Integer.MAX_VALUE;
        
        public int solution(int n, int[] weak, int[] dist) {
            this.weak = weak;
            this.dist = dist;
            this.isFinish = false;
            int distLen = dist.length;

            unrollWeak(n, weak);

            // iκ°μ μμ΄ λ§λ€κΈ°
            for (int i = 1; i <= distLen; i++)
                makeDistPerm(0, i, new boolean[distLen], new int[i]);
            
            return answer == Integer.MAX_VALUE ? -1 : answer;
        }
        
        private void makeDistPerm(int depth, int count, boolean[] visited, int[] friends) {
            if (isFinish) return;

            if (depth == count) {
                canCheck(friends);
                return;
            }

            for (int i = 0; i < dist.length; i++) {
                if (!visited[i]) {
                    friends[depth] = dist[i];
                    visited[i] = true;
                    makeDistPerm(depth + 1, count, visited, friends);
                    visited[i] = false;
                }
            }
        }

        private void canCheck(int[] friends) {
            for (int i = 0; i < weak.length; i++) {
                int start = i;
                boolean canCheck = true;

                for (int idx = 0; idx < friends.length; idx++) {
                    for (int j = i; j < i + weak.length; j++) {
                        // λ μ§μ  κ° κ±°λ¦¬κ° friendsλ‘ λ½ν μΉκ΅¬κ° μ κ² κ°λ₯ν κ±°λ¦¬λ³΄λ€ ν° κ²½μ°λ μ κ² λΆκ°λ₯
                        // λ°λΌμ νμ¬ μ§μ μ μμμ μΌλ‘ μ§μ 
                        if (unrolledWeak[j] - unrolledWeak[start] > friends[idx]) {
                            start = j;
                            idx++;

                            // νμ¬ μ§μ μ μ κ²ν  μ μλλ°, λ μ κ²ν  μΉκ΅¬κ° μλ€λ©΄, μ’λ£
                            if (idx == friends.length) {
                                canCheck = false;
                                break;
                            }
                        }
                    }

                    // μ κ² μλ£λΌλ©΄, λ μ΄μ μ κ²ν  νμκ° μλ€. λ°λΌμ flagλ₯Ό true μ§μ 
                    if (canCheck) {
                        answer = idx + 1;
                        isFinish = true;
                        return;
                    }
                }
            }
        }

        // weakλ₯Ό 1μ°¨μμΌλ‘ νΌμΉ¨
        private void unrollWeak(int n, int[] weak) {
            int len = weak.length;
            unrolledWeak = new int[len * 2 - 1];

            System.arraycopy(weak, 0, unrolledWeak, 0, len);

            for (int i = 0; i < len - 1; i++)
                unrolledWeak[i + len] = weak[i] + n;
        }
    }
  	</div>
</details>

### βοΈ **Review**
- μμ΄μ μ¬μ©ν΄μ 1, 2, ... nλͺμΌλ‘ κ°λ₯νμ§ νμΈν΄λ³΄λ λ°©μμΈ κ²μ μ½κ² μμλ€!
  - νμ§λ§ μ£Όμ΄μ§ μΈμμΌλ‘ μΈλ²½ μ κ²μ΄ κ°λ₯νμ§ νμΈνλ λ‘μ§ κ΅¬νμμ μ’ λ§νλ€...
- κ΅¬ν μ°μ΅μ λ§μ΄ ν΄μΌκ² λ€.
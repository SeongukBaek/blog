---
title: "π©βπ» 20922. κ²ΉμΉλ κ±΄ μ«μ΄"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-05-28
update: 2022-05-28
tags:
  - ν¬ ν¬μΈν°
series: "π©βπ» BOJ"
---

## λ¬Έμ 
[BOJ - κ²ΉμΉλ κ±΄ μ«μ΄](https://www.acmicpc.net/problem/20922)

### π **Logic**

```java
while(s <= e) {
    if (e == numbers.length) {
        max = Math.max(max, e - s);
        break;
    }
    int n = numbers[e];

    if (numMap.containsKey(n)) {
        if (numMap.get(n) == K) {
            max = Math.max(max, e - s);
            int count = numMap.get(numbers[s]) - 1;
            if (count == 0) numMap.remove(numbers[s]);
            else numMap.put(numbers[s], count);
            s++;
        } else {
            numMap.put(n, numMap.getOrDefault(n, 0) + 1);
            e++;
        }
    } else {
        numMap.put(n, 1);
        e++;
    }
}
```
- `Map` μ μ΄μ©ν΄ ν΄λΉ μ«μκ° λ¬Έμμ΄μ λνλ νμλ₯Ό μ μ₯νλ€.
- μ΄λ―Έ `K` κ°κ° λ¬Έμμ΄μ λ€μ΄μλ€λ©΄, `s` μ§μ μ μλ μ«μλΆν° 1κ°μ© μ€μ¬λκ°λ€.
  - `Map` μμ -1νκ³ , `s` λ₯Ό 1μ© μ¦κ°μν¨λ€.
- μμ§ `K` κ°κ° λ¬Έμμ΄μ λ€μ΄μμ§ μλ€λ©΄, λνλ νμλ₯Ό 1μ© μ¦κ°μν¨λ€.
- μμ§ λ¬Έμμ΄μ λ€μ΄μμ§ μμ κ²½μ°μ `K` κ°κ° λ¬Έμμ΄μ λ€μ΄μμ§ μμ κ²½μ°λ§ `e` λ₯Ό μ¦κ°μμΌ λ€μ μ«μλ₯Ό νμΈν  μ μλλ‘ νλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.lang.reflect.Array;
    import java.util.*;
    import java.util.regex.Matcher;
    import java.util.regex.Pattern;


    class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int[] info = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            int N = info[0];
            int K = info[1];
            int s = 0;
            int e = 0;
            int max = 0;
            Map<Integer, Integer> numMap = new HashMap<>();

            int[] numbers = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();

            while(s <= e) {
                if (e == numbers.length) {
                    max = Math.max(max, e - s);
                    break;
                }
                int n = numbers[e];

                if (numMap.containsKey(n)) {
                    if (numMap.get(n) == K) {
                        max = Math.max(max, e - s);
                        int count = numMap.get(numbers[s]) - 1;
                        if (count == 0) numMap.remove(numbers[s]);
                        else numMap.put(numbers[s], count);
                        s++;
                    } else {
                        numMap.put(n, numMap.getOrDefault(n, 0) + 1);
                        e++;
                    }
                } else {
                    numMap.put(n, 1);
                    e++;
                }
            }

            System.out.println(max);
        }
    }
  	</div>
</details>

### βοΈ **Review**
- ν¬ ν¬μΈν°λ₯Ό μ¬μ©νλ λ¬Έμ  μ€ κ·Έλλ§ μ¬μλ³΄μ¬μ νΌ λ¬Έμ 
- `s` μ `e` μ λν μ°©κ°μΌλ‘ μκ°μ΄ μ’ κ±Έλ Έλ€...

### π μΆμ²
Baekjoon : https://www.acmicpc.net/problem/17779
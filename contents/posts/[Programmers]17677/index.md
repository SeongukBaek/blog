---
title: "π©βπ» 17677. λ΄μ€ ν΄λ¬μ€ν°λ§"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-05-17
update: 2022-05-17
tags:
  - λ¬Έμμ΄
  - Map
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - λ΄μ€ ν΄λ¬μ€ν°λ§](https://programmers.co.kr/learn/courses/30/lessons/17677)

### π **Logic**

```java
// λ¨μ΄μ λΉλ μ μ΄κΈ°ν
for (int i = 0; i < str1.length() - 1; i++) {
    String str = parsing(str1, i);
    if (str.length() != 2) continue;

    size1++;
    if (map1.containsKey(str)) map1.put(str, map1.get(str) + 1);
    else map1.put(str, 1);
}

for (int i = 0; i < str2.length() - 1; i++) {
    String str = parsing(str2, i);
    if (str.length() != 2) continue;

    size2++;
    if (map2.containsKey(str)) map2.put(str, map2.get(str) + 1);
    else map2.put(str, 1);
}
```
- `Map` μΌλ‘ λ¨μ΄μ κ·Έ λΉλ μλ₯Ό μ μ₯νλ€.

```java
// κ΅μ§ν© κ΅¬νκΈ°, λ λΉλ μ μ€ μμ κ°μ κ΅μ§ν©μ ν¬κΈ°λ‘ μ§μ 
int inter = 0;
for (String key : map1.keySet())
    if (map2.containsKey(key))
        inter += map1.get(key) > map2.get(key) ? map2.get(key) : map1.get(key);
```
- λ λ§΅μ λͺ¨λ μ‘΄μ¬νλ μμλΌλ©΄, λ λ§΅ μ€ **λ μμ λΉλ μ**λ₯Ό κ΅μ§ν©μ ν¬κΈ°μ λνλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        public int solution(String str1, String str2) {
            Map<String, Integer> map1 = new HashMap<>();
            Map<String, Integer> map2 = new HashMap<>();
            
            str1 = str1.toLowerCase();
            str2 = str2.toLowerCase();

            int size1 = 0;
            int size2 = 0;

            // λ¨μ΄μ λΉλ μ μ΄κΈ°ν
            for (int i = 0; i < str1.length() - 1; i++) {
                String str = parsing(str1, i);
                if (str.length() != 2) continue;

                size1++;
                if (map1.containsKey(str)) map1.put(str, map1.get(str) + 1);
                else map1.put(str, 1);
            }

            for (int i = 0; i < str2.length() - 1; i++) {
                String str = parsing(str2, i);
                if (str.length() != 2) continue;

                size2++;
                if (map2.containsKey(str)) map2.put(str, map2.get(str) + 1);
                else map2.put(str, 1);
            }

            // κ΅μ§ν© κ΅¬νκΈ°, λ λΉλ μ μ€ μμ κ°μ κ΅μ§ν©μ ν¬κΈ°λ‘ μ§μ 
            int inter = 0;
            for (String key : map1.keySet())
                if (map2.containsKey(key))
                    inter += map1.get(key) > map2.get(key) ? map2.get(key) : map1.get(key);
            
            // λ μ§ν©μ΄ λͺ¨λ κ³΅μ§ν©μΈ κ²½μ° J = 1
            if (map1.size() == 0 && map2.size() == 0) return 65536;
            
            float j = (float) inter / (float) (size1 + size2 - inter);

            int answer = (int) (j * 65536);

            return answer;
        }

        private String parsing(String str, int i) {
            return str.substring(i, i+2).replaceAll("[^a-zA-Z]","");
        }
    }
  	</div>
</details>

### βοΈ **Review**
- μμΉ΄λ μ μ¬λλ₯Ό μ΄ν΄νλλ° λλ¬΄ μ€λ κ±Έλ Έλ€. 
  - "μμμ μ€λ³΅μ νμ©νλ λ€μ€μ§ν©" μ΄λΌλ μ‘°κ±΄μμ μκ°μ΄ λ§μ΄ λΊκ²Όλ€.
- ν­μ νμΌλ₯Ό μ νμΈν΄μΌκ² λ€.
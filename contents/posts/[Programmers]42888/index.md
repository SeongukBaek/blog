---
title: "π©βπ» 42888. μ€νμ±νλ°©"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-06-10
update: 2022-06-10
tags:
  - Map
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - μ€νμ±νλ°©](https://programmers.co.kr/learn/courses/30/lessons/42888

### π **Logic**

```java
Map<String, String> user = new LinkedHashMap<>();
ArrayList<Pair> inOut = new ArrayList<>();

for (String rec : record) {
    String[] info = rec.split(" ");
    char word = rec.charAt(0);
    
    if (word == 'E') {
        user.put(info[1], info[2]);
        inOut.add(new Pair(word, info[1]));
    } else if (word == 'L') {
        inOut.add(new Pair(word, info[1]));
    } else {
        user.put(info[1], info[2]);
    }
}
```

- `Map` μλ μ μ μμ΄λ, λλ€μ μμ μ μ₯νλ€.
- `ArrayList<Pair>` μλ μ¬μ©μμ μ, ν΄μ₯ μ¬λΆμ ν΄λΉνλ μ μ μμ΄λλ₯Ό μ μ₯νλ€.
- μ, ν΄μ₯μ΄ λͺ¨λ λλ ν, μμμ μ μ μμ΄λμ λ°λΌ λλ€μμ μΆλ ₯νλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

    import java.util.*;

    class Pair {
        char command;
        String name;
        
        public Pair(char command, String name) {
            this.command = command;
            this.name = name;
        }
    }

    class Solution {
        static String in = "λμ΄ λ€μ΄μμ΅λλ€.";
        static String out = "λμ΄ λκ°μ΅λλ€.";
        
        public String[] solution(String[] record) {
            // userλ μ μ μμ΄λμ ν΄λΉνλ λλ€μμ μ μ₯
            // inOutμ μ¬μ©μμ μμ₯, ν΄μ₯ μ¬λΆμ ν΄λΉνλ μ μ μμ΄λλ₯Ό μ μ₯
            Map<String, String> user = new LinkedHashMap<>();
            ArrayList<Pair> inOut = new ArrayList<>();
            
            for (String rec : record) {
                String[] info = rec.split(" ");
                char word = rec.charAt(0);
                
                if (word == 'E') {
                    user.put(info[1], info[2]);
                    inOut.add(new Pair(word, info[1]));
                } else if (word == 'L') {
                    inOut.add(new Pair(word, info[1]));
                } else {
                    user.put(info[1], info[2]);
                }
            }
            
            String[] answer = new String[inOut.size()];
            int idx = 0;
            for (Pair p : inOut) {
                StringBuilder sb = new StringBuilder(user.get(p.name));
                
                sb.append(p.command == 'E' ? in : out);
                
                answer[idx] = sb.toString();
                idx++;
            }
            
            return answer;
        }
    }
  	</div>
</details>

### βοΈ **Review**
- μ¬μ΄ λ¬Έμ μλ€!
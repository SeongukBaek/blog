---
title: "👩‍💻 42888. 오픈채팅방"
description: "알고리즘 문제 풀기"
date: 2022-06-10
update: 2022-06-10
tags:
  - Map
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 오픈채팅방](https://programmers.co.kr/learn/courses/30/lessons/42888

### 📍 **Logic**

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

- `Map` 에는 유저아이디, 닉네임 쌍을 저장한다.
- `ArrayList<Pair>` 에는 사용자의 입, 퇴장 여부와 해당하는 유저아이디를 저장한다.
- 입, 퇴장이 모두 끝난 후, 순서와 유저아이디에 따라 닉네임을 출력한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
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
        static String in = "님이 들어왔습니다.";
        static String out = "님이 나갔습니다.";
        
        public String[] solution(String[] record) {
            // user는 유저아이디와 해당하는 닉네임을 저장
            // inOut은 사용자의 입장, 퇴장 여부와 해당하는 유저아이디를 저장
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

### ✏️ **Review**
- 쉬운 문제였다!
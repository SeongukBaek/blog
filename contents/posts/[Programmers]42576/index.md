---
title: "π©βπ» 42576. μμ£Όνμ§ λͺ»ν μ μ"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-04-13
update: 2022-04-13
tags:
  - ν΄μ
series: "π©βπ» Programmers"
---

## λ¬Έμ 
μλ§μ λ§λΌν€ μ μλ€μ΄ λ§λΌν€μ μ°Έμ¬νμμ΅λλ€. λ¨ ν λͺμ μ μλ₯Ό μ μΈνκ³ λ λͺ¨λ  μ μκ° λ§λΌν€μ μμ£Όνμμ΅λλ€.

λ§λΌν€μ μ°Έμ¬ν μ μλ€μ μ΄λ¦μ΄ λ΄κΈ΄ λ°°μ΄ participantμ μμ£Όν μ μλ€μ μ΄λ¦μ΄ λ΄κΈ΄ λ°°μ΄ completionμ΄ μ£Όμ΄μ§ λ, μμ£Όνμ§ λͺ»ν μ μμ μ΄λ¦μ return νλλ‘ solution ν¨μλ₯Ό μμ±ν΄μ£ΌμΈμ.

### μ νμ¬ν­
- λ§λΌν€ κ²½κΈ°μ μ°Έμ¬ν μ μμ μλ 1λͺ μ΄μ 100,000λͺ μ΄νμλλ€.
- completionμ κΈΈμ΄λ participantμ κΈΈμ΄λ³΄λ€ 1 μμ΅λλ€.
- μ°Έκ°μμ μ΄λ¦μ 1κ° μ΄μ 20κ° μ΄νμ μνλ²³ μλ¬Έμλ‘ μ΄λ£¨μ΄μ Έ μμ΅λλ€.
- μ°Έκ°μ μ€μλ λλͺμ΄μΈμ΄ μμ μ μμ΅λλ€.

### μμΆλ ₯ μ
|participant|completion|return|
|:---:|:---:|:---:|:---:|
|"leo", "kiki", "eden"|"eden", "kiki"|"leo"|
|"marina", "josipa", "nikola", "vinko", "filipa"|"josipa", "filipa", "marina", "nikola"|"vinko"|
|"mislav", "stanko", "mislav", "ana"|"stanko", "ana", "mislav"|"mislav"|

### π **Logic**

```java
for (String p : participant)
    map.put(p, map.getOrDefault(p, 0) + 1);

for (String c : completion)
    map.put(c, map.get(c) - 1);

for (Map.Entry<String, Integer> entry : map.entrySet())
    if (entry.getValue() != 0) answer = entry.getKey();
```

- λ¨Όμ  `participant` μ μλ μ΄λ¦μ `HashMap` μ `put` νλλ°, `getOrDefault()` λ©μλλ‘ ν΄λΉ μ΄λ¦μ΄ μ΄λ―Έ μλμ§ νμΈνμ¬ μλ€λ©΄, κ·Έ μ΄λ¦μ ν΄λΉνλ `value` μ + 1 νμ¬ μ μ₯νλ€.
- μ΄ν `completion` μ μλ μ΄λ¦μΌλ‘ λ€μ `HashMap` μ μμ νλλ°, μ΄λ―Έ μλ μ΄λ¦μ - 1 ν κ°μΌλ‘ μλ°μ΄νΈνλ€.
- μ΅μ’μ μΌλ‘ `value` κ° 0μ΄ μλ μ΄λ¦μ΄ μμ£Όνμ§ λͺ»ν μ μκ° λλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        public String solution(String[] participant, String[] completion) {
            HashMap<String, Integer> map = new HashMap<>();
            String answer = "";
            
            for (String p : participant)
                map.put(p, map.getOrDefault(p, 0) + 1);
            
            for (String c : completion)
                map.put(c, map.get(c) - 1);
            
            for (Map.Entry<String, Integer> entry : map.entrySet())
                if (entry.getValue() != 0) answer = entry.getKey();
    
            return answer;
        }
    }
  	</div>
</details>

### βοΈ **Review**
- `HashMap` μ μ¬μ©νμ¬ `completion` μ μλ μ΄λ¦μ μΆλ ₯ν΄μΌ νλ€λ κ²μ μμμ§λ§, ν΄μ μκ³ λ¦¬μ¦μ μ²μ νμ΄λ΄μ μ΄λ»κ² ν΄μΌ ν¨μ¨μ μΌλ‘ κ΅¬νν  μ μμμ§κ° ν·κ°λ Έλ€.
- μ΄λ»κ² νλ μΆμ΄μ λΈλ‘κ·Έλ₯Ό μ°Έκ³ νλλ° ν `HashMap` μλ€κ° λ£μΌλ©΄μ valueλ₯Ό μ€μ¬μ£Όλ λ°©λ²μ΄ μ§μ§ μ κΈ°νλ€. 

### π μΆμ²
- Programmers : https://programmers.co.kr/learn/courses/30/lessons/42576
- [μ°Έκ³  λΈλ‘κ·Έ](https://coding-grandpa.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%99%84%EC%A3%BC%ED%95%98%EC%A7%80-%EB%AA%BB%ED%95%9C-%EC%84%A0%EC%88%98-%ED%95%B4%EC%8B%9C-Lv-1)
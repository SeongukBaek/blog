---
title: "π©βπ» 17680. μΊμ"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-05-16
update: 2022-05-16
tags:
  - ν
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - μΊμ](https://programmers.co.kr/learn/courses/30/lessons/17680)

### π **Logic**

```java
for (String city : cities) {
    city = city.toLowerCase();
    // μ΄λ―Έ μΊμμ μλ€λ©΄
    if (cache.contains(city)) {
        cache.remove(city);
        time++;
    } else {
        // μΊμμ μλλ°, λ μ΄μ μΊμ κ³΅κ°λ μλ κ²½μ°, μ²μ λ€μ΄μ¨ κ°μ μ­μ 
        if (cache.size() >= cacheSize) cache.poll();
        time += 5;
    }
    cache.add(city);
}
```
- `Queue` λ₯Ό μ¬μ©ν΄ λ€μ΄μ¨ λμμμΌλ‘ μΊμ±νλ€.
- `Hit` μ΄ λ°μνλ€λ©΄, ν΄λΉ λμλ₯Ό μ§μ°κ³  λ€μ λ§¨ λ€μ μΆκ°νλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        // λμ μ΄λ¦μ΄ λ€μ΄μ¨ μμλ₯Ό μ μ₯νκΈ° μν ν
        Queue<String> cache = new LinkedList<>();

        public int solution(int cacheSize, String[] cities) {
            int time = 0;
            
            // cacheSizeκ° 0μ΄λ©΄ μΊμ νμ΄ λ°μνμ§ μμ
            if (cacheSize == 0) return cities.length * 5;
            
            for (String city : cities) {
                city = city.toLowerCase();
                // μ΄λ―Έ μΊμμ μλ€λ©΄
                if (cache.contains(city)) {
                    cache.remove(city);
                    time++;
                } else {
                    // μΊμμ μλλ°, λ μ΄μ μΊμ κ³΅κ°λ μλ κ²½μ°, μ²μ λ€μ΄μ¨ κ°μ μ­μ 
                    if (cache.size() >= cacheSize) cache.poll();
                    time += 5;
                }
                cache.add(city);
            }
            
            return time;
        }
    }
  	</div>
</details>

### βοΈ **Review**
- λ§€μ° μ¬μ΄ λ¬Έμ μμ§λ§, LRU μκ³ λ¦¬μ¦μ λμΆ© μκ°νκ³  νμλ€κ° μκ° λ λ €λ²λ Έλ€. μ΄λ°...
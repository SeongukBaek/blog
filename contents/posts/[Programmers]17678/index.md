---
title: "π©βπ» 17678. μνλ²μ€"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-05-20
update: 2022-05-20
tags:
  - λ¬Έμμ΄
  - μ°μ μμν
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - μνλ²μ€](https://programmers.co.kr/learn/courses/30/lessons/17678)

### π **Logic**

```java
public int rideBus() {
    int departBus = 540;

    for (int i = 0; i < n; i++) {
        while(!crueTimes.isEmpty()) {
            int crue = crueTimes.peek();

            if (departBus >= crue && busTimes.get(i).size() < m) {
                crueTimes.poll();
                busTimes.get(i).add(crue);
                lastCrue = crue - 1;
            } else break;
        }
        departBus += t;
    }
    
    if (busTimes.get(n - 1).size() < m) 
        lastCrue = departBus - t;
    
    return lastCrue;
}
```
- `departBus` λ‘ λ²μ€ μΆλ° μκ°μ μΈννκ³ , μ°μ μμ νμ μ μ₯λ ν¬λ£¨λ€μ λκΈ°μ΄ λμ°© μκ°μ νλμ© λΉκ΅νλ©° νμΉν  μ μλ κ²½μ° νμμ μ μΈνλ€.
- μ΄λ λ§μ§λ§μΌλ‘ νμΉν μΈμμ λκΈ°μ΄ λμ°© μκ°μ μμμΌ νκΈ°μ `lastCrue` μ μ μ₯νλ€. (μ΄λ -1ν κ°μ μ μ₯)
- μ½μ λ§μ§λ§ λ²μ€μλ§ νλ©΄ λλ―λ‘, λ§μ§λ§ λ²μ€κ° λ§μμΈμ§ νμΈνμ¬
  - λ§μμΈ κ²½μ°, `lastCrue` λ₯Ό λ°ννκ³ ,
  - λ§μμ΄ μλ κ²½μ°, ν΄λΉ λ²μ€μ μΆλ° μκ°μ λ°ννλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
    <div markdown="1">

	import java.util.*;

    class Shuttle {
        Queue<Integer> crueTimes;
        ArrayList<ArrayList<Integer>> busTimes;
        int n;
        int t;
        int m;
        int lastCrue;

        public Shuttle(int n, int t, int m) {
            this.n = n;
            this.t = t;
            this.m = m;
            busTimes = new ArrayList<>();
            crueTimes = new PriorityQueue<>();
            initBusTimes();
        }

        private void initBusTimes() {
            for (int i = 0; i < n; i++)
                busTimes.add(new ArrayList<>());
        }

        public void fillCrue(String[] timetable) {
            for (String tt : timetable) {
                String[] tmp = tt.split(":");
                crueTimes.add(Integer.parseInt(tmp[0]) * 60 + Integer.parseInt(tmp[1]));
            }
        }

        public int rideBus() {
            int departBus = 540;

            for (int i = 0; i < n; i++) {
                while(!crueTimes.isEmpty()) {
                    int crue = crueTimes.peek();

                    if (departBus >= crue && busTimes.get(i).size() < m) {
                        crueTimes.poll();
                        busTimes.get(i).add(crue);
                        lastCrue = crue - 1;
                    } else break;
                }
                departBus += t;
            }
            
            if (busTimes.get(n - 1).size() < m) 
                lastCrue = departBus - t;
            
            return lastCrue;
        } 
    }

    class Solution {
        public String solution(int n, int t, int m, String[] timetable) {
            Shuttle st = new Shuttle(n, t, m);

            st.fillCrue(timetable);

            StringBuilder answer = new StringBuilder();
            int time = st.rideBus();
            
            int hour = time/60;
            int min = time%60;
            
            if (hour < 10) answer.append("0");
            answer.append(hour).append(":");
            if (min < 10) answer.append("0");
            answer.append(min);
            
            return answer.toString();
        }
    }
  	</div>
</details>

### βοΈ **Review**
- λ²μ€λ§λ€ ν μ μλ μΈμμ λͺ¨λ μ±μλκ³ , λ§¨ λ§μ§λ§ λ²μ€μ λν΄μλ§ νμΈνμ¬ μ μΌ λ¦μ μκ°μ κ΅¬νλ €κ³  νλλ°, νμΌ 14 ~ 16λ²μ΄ μ£½μ΄λ μ€ν¨μλ€.
- μκ°λλ νμΌλ λ€ λ§λ€μ΄μ ν΄λ΄λ λμ ν λ­κ° μ λ§λ κ±΄μ§ λͺ¨λ₯΄κ² μ΄μ λ€λ₯Έ νμ΄λ₯Ό λ΄€λ€.
- λκ° μ’ μμμνκ² μλ €μ€¬μΌλ©΄ μ’κ² λ€ ...
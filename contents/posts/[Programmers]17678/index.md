---
title: "👩‍💻 17678. 셔틀버스"
description: "알고리즘 문제 풀기"
date: 2022-05-20
update: 2022-05-20
tags:
  - 문자열
  - 우선순위큐
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 셔틀버스](https://programmers.co.kr/learn/courses/30/lessons/17678)

### 📍 **Logic**

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
- `departBus` 로 버스 출발 시각을 세팅하고, 우선순위 큐에 저장된 크루들의 대기열 도착 시간을 하나씩 비교하며 탑승할 수 있는 경우 큐에서 제외한다.
- 이때 마지막으로 탑승한 인원의 대기열 도착 시간을 알아야 하기에 `lastCrue` 에 저장한다. (이때 -1한 값을 저장)
- 콘은 마지막 버스에만 타면 되므로, 마지막 버스가 만석인지 확인하여
  - 만석인 경우, `lastCrue` 를 반환하고,
  - 만석이 아닌 경우, 해당 버스의 출발 시각을 반환한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
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

### ✏️ **Review**
- 버스마다 탈 수 있는 인원을 모두 채워놓고, 맨 마지막 버스에 대해서만 확인하여 제일 늦은 시각을 구하려고 했는데, 테케 14 ~ 16번이 죽어도 실패였다.
- 생각나는 테케는 다 만들어서 해봐도 도저히 뭐가 안 맞는 건지 모르겠어서 다른 풀이를 봤다.
- 누가 좀 속시원하게 알려줬으면 좋겠다 ...
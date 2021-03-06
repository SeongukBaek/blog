---
title: "ð©âð» 92341. ì£¼ì°¨ ìê¸ ê³ì°"
description: "ìê³ ë¦¬ì¦ ë¬¸ì  íê¸°"
date: 2022-07-06
update: 2022-07-06
tags:
  - Map
  - êµ¬í
series: "ð©âð» Programmers"
---

## ë¬¸ì 
[Programmers - ì£¼ì°¨ ìê¸ ê³ì°](https://programmers.co.kr/learn/courses/30/lessons/92341)

### ð **Logic**

```java
// ì°¨ ë²í¸ë³ ìì°¨ ìê°ì ì ì¥íë map
static Map<String, Integer> carTimeMap = new HashMap<>();
// ì°¨ ë²í¸ë³ ëì  ì£¼ì°¨ ìê°ì ì ì¥íë map
static Map<String, Integer> accumCarMap = new HashMap<>();
```

- ì°¨ ë²í¸ë³ ìì°¨ ìê°ì ì ì¥íë mapì ì¬ì©í´, ìì°¨ ììë mapì ì¶ê°íê³ , ì¶ì°¨ ììë ìì°¨ ìê°ê³¼ ë¹êµíì¬ ì£¼ì°¨ ìê°ì êµ¬íë¤.
- ì°¨ ë²í¸ë³ ëì  ì£¼ì°¨ ìê°ì ì ì¥íë mapì ì¬ì©í´ ì°¨ ë²í¸ë³ ì£¼ì°¨ ìê°ì ëì í©íë¤.

```java
readRecords(records);

processRemainingCars();

calculateFees();
```

- `readRecords()` ë ì£¼ì°¨ ê¸°ë¡ì ì½ì¼ë©´ì ì°¨ ë²í¸ë³ ì£¼ì°¨ ìê°ì ê³ì°íë¤.
- `processRemainingCars()` ììë ì¶ì°¨ ê¸°ë¡ì´ ìë ì°¨ì ëí ì²ë¦¬ë¥¼ ìííë¤.
- `calculateFees()` ììë ì°¨ ë²í¸ë³ ì£¼ì°¨ ìê¸ì ê³ì°íê³  ë°íí  ë°°ì´ì ë´ëë¤.
 
### ð **CODE**

<details>
  <summary>ì½ë ë³´ê¸°/ì ê¸°ð«</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        
        static int basicTime;
        static int basicFee;
        static int unitTime;
        static int unitFee;
        
        // ì°¨ ë²í¸ë³ ìì°¨ ìê°ì ì ì¥íë map
        static Map<String, Integer> carTimeMap = new HashMap<>();
        // ì°¨ ë²í¸ë³ ëì  ì£¼ì°¨ ìê°ì ì ì¥íë map
        static Map<String, Integer> accumCarMap = new HashMap<>();
        
        public int[] solution(int[] fees, String[] records) {
            init(fees);

            readRecords(records);

            processRemainingCars();

            return calculateFees();
        }

        private static void init(int[] fees) {
            basicTime = fees[0];
            basicFee = fees[1];
            unitTime = fees[2];
            unitFee = fees[3];
        }

        private static void readRecords(String[] records) {
            for (String record : records) {
                String[] info = record.split(" ");
                int time = timeToInt(info[0]);
                String carN = info[1];
                boolean in = Objects.equals(info[2], "IN");

                // ìì°¨í ê²½ì°
                if (in) carTimeMap.put(carN, time);
                // ì¶ì°¨í ê²½ì°
                else {
                    // ìì°¨ ìê° ê°ì ¸ì´
                    int inTime = carTimeMap.get(carN);
                    // ì£¼ì°¨ ìê° ê³ì°
                    time -= inTime;
                    
                    accumCarMap.put(carN, accumCarMap.getOrDefault(carN, 0) + time);
                    carTimeMap.remove(carN);
                }
            }
        }

        private static int timeToInt(String info) {
            String[] line = info.split(":");
            int hour = Integer.parseInt(line[0]) * 60;
            int min = Integer.parseInt(line[1]);

            return hour + min;
        }

        // ì¶ì°¨ ê¸°ë¡ì´ ìë ì°¨ ì²ë¦¬
        private static void processRemainingCars() {
            for (Map.Entry<String, Integer> entry : carTimeMap.entrySet()) {
                String carN = entry.getKey();
                int time = 1439 - entry.getValue();
                
                accumCarMap.put(carN, accumCarMap.getOrDefault(carN, 0) + time);
            }
        }

        // ì°¨ ë²í¸ë³ ëì  ì£¼ì°¨ ìê°ì ì´ì©í´ ì£¼ì°¨ ìê¸ ê³ì°
        private static int[] calculateFees() {
            // ì°¨ ë²í¸ ì¤ë¦ì°¨ìì¼ë¡ ì ë ¬
            Object[] keys = accumCarMap.keySet().toArray();

            Arrays.sort(keys);
            
            int[] answer = new int[accumCarMap.size()];
            int idx = 0;
            
            // ì ë ¬ë ì°¨ ë²í¸ ìì¼ë¡ ëì  ìê¸ ê³ì°
            for (Object key : keys) {
                int time = accumCarMap.get(key.toString());
                int fee = basicFee;
                
                if (time > basicTime) {
                    time = (int) Math.ceil((double) (time - basicTime) / unitTime);
                    fee += (time * unitFee);
                }
                
                answer[idx] = fee;
                idx++;
            }
            
            return answer;
        }
    }
  	</div>
</details>

### âï¸ **Review**
- íë¼ë ëë¡ íë©´ ëë ë¬¸ì ìì¼ë, ìê¾¸ 37.5ì ì´ ëì¤ê¸¸ë `map` ì ì ê·¼íë ì½ëë¤ì ë¤ ë¯ì´ë³´ë¤ê° ì´ì´ìë ì¤ìë¥¼ í ê²ì íì¸íë¤.

```java
// ì¶ì°¨ ê¸°ë¡ì´ ìë ì°¨ ì²ë¦¬
private static void processRemainingCars() {
    int time = 1439;

    for (Map.Entry<String, Integer> entry : carTimeMap.entrySet()) {
        String carN = entry.getKey();
        time = time - entry.getValue();
        
        accumCarMap.put(carN, accumCarMap.getOrDefault(carN, 0) + time);
    }
}


// ì¶ì°¨ ê¸°ë¡ì´ ìë ì°¨ ì²ë¦¬
private static void processRemainingCars() {
    for (Map.Entry<String, Integer> entry : carTimeMap.entrySet()) {
        String carN = entry.getKey();
        int time = 1439 - entry.getValue();
        
        accumCarMap.put(carN, accumCarMap.getOrDefault(carN, 0) + time);
    }
}
```

- `time` ê°ì 1439ë¡ ê³ ì ëì´ ìì´ì¼ íëë°, ë°ë³µë¬¸ì ëë©´ì ìê¾¸ ê°ìíëë¡ êµ¬íí´ëìì íë ¸ë ê²ì´ë¤...
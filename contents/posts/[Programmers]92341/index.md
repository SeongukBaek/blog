---
title: "👩‍💻 92341. 주차 요금 계산"
description: "알고리즘 문제 풀기"
date: 2022-07-06
update: 2022-07-06
tags:
  - Map
  - 구현
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 주차 요금 계산](https://programmers.co.kr/learn/courses/30/lessons/92341)

### 📍 **Logic**

```java
// 차 번호별 입차 시간을 저장하는 map
static Map<String, Integer> carTimeMap = new HashMap<>();
// 차 번호별 누적 주차 시간을 저장하는 map
static Map<String, Integer> accumCarMap = new HashMap<>();
```

- 차 번호별 입차 시간을 저장하는 map을 사용해, 입차 시에는 map에 추가하고, 출차 시에는 입차 시간과 비교하여 주차 시간을 구한다.
- 차 번호별 누적 주차 시간을 저장하는 map을 사용해 차 번호별 주차 시간을 누적합한다.

```java
readRecords(records);

processRemainingCars();

calculateFees();
```

- `readRecords()` 는 주차 기록을 읽으면서 차 번호별 주차 시간을 계산한다.
- `processRemainingCars()` 에서는 출차 기록이 없는 차에 대한 처리를 수행한다.
- `calculateFees()` 에서는 차 번호별 주차 요금을 계산하고 반환할 배열에 담는다.
 
### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        
        static int basicTime;
        static int basicFee;
        static int unitTime;
        static int unitFee;
        
        // 차 번호별 입차 시간을 저장하는 map
        static Map<String, Integer> carTimeMap = new HashMap<>();
        // 차 번호별 누적 주차 시간을 저장하는 map
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

                // 입차한 경우
                if (in) carTimeMap.put(carN, time);
                // 출차한 경우
                else {
                    // 입차 시간 가져옴
                    int inTime = carTimeMap.get(carN);
                    // 주차 시간 계산
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

        // 출차 기록이 없는 차 처리
        private static void processRemainingCars() {
            for (Map.Entry<String, Integer> entry : carTimeMap.entrySet()) {
                String carN = entry.getKey();
                int time = 1439 - entry.getValue();
                
                accumCarMap.put(carN, accumCarMap.getOrDefault(carN, 0) + time);
            }
        }

        // 차 번호별 누적 주차 시간을 이용해 주차 요금 계산
        private static int[] calculateFees() {
            // 차 번호 오름차순으로 정렬
            Object[] keys = accumCarMap.keySet().toArray();

            Arrays.sort(keys);
            
            int[] answer = new int[accumCarMap.size()];
            int idx = 0;
            
            // 정렬된 차 번호 순으로 누적 요금 계산
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

### ✏️ **Review**
- 하라는 대로 하면 되는 문제였으나, 자꾸 37.5점이 나오길래 `map` 에 접근하는 코드들을 다 뜯어보다가 어이없는 실수를 한 것을 확인했다.

```java
// 출차 기록이 없는 차 처리
private static void processRemainingCars() {
    int time = 1439;

    for (Map.Entry<String, Integer> entry : carTimeMap.entrySet()) {
        String carN = entry.getKey();
        time = time - entry.getValue();
        
        accumCarMap.put(carN, accumCarMap.getOrDefault(carN, 0) + time);
    }
}


// 출차 기록이 없는 차 처리
private static void processRemainingCars() {
    for (Map.Entry<String, Integer> entry : carTimeMap.entrySet()) {
        String carN = entry.getKey();
        int time = 1439 - entry.getValue();
        
        accumCarMap.put(carN, accumCarMap.getOrDefault(carN, 0) + time);
    }
}
```

- `time` 값은 1439로 고정되어 있어야 했는데, 반복문을 돌면서 자꾸 감소하도록 구현해놓아서 틀렸던 것이다...
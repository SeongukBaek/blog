---
title: "👩‍💻 17676. 추석 트래픽"
description: "알고리즘 문제 풀기"
date: 2022-05-18
update: 2022-05-18
tags:
  - 문자열
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 추석 트래픽](https://programmers.co.kr/learn/courses/30/lessons/17676)

### 📍 **Logic**

```java
private void getTime(String[] doneTime, int procTime) {
    int hour = Integer.parseInt(doneTime[0]);
    int min = Integer.parseInt(doneTime[1]);
    int sec = (int) (Double.parseDouble(doneTime[2]) * 1000);

    int endSec = hour * 1000 * 60 * 60 + min * 1000 * 60 + sec;
    int startSec = endSec - procTime + 1;

    times.add(new Time(startSec, endSec));
}
```
- 문자열을 파싱하여 시, 분, 초 단위로 변환 후 이를 정수로 변환

```java
private int findMaxRequest(int startTime) {
    int count = 0;
    // start ~ end 사이에 있다면 count + 1;
    int endTime = startTime + 1000;

    for (Time time : times) {
        if (startTime <= time.startSec && time.startSec < endTime) {
            count++;
        } else if (startTime <= time.endSec && time.endSec < endTime) {
            count++;
        } else if (endTime <= time.endSec && time.startSec <= startTime) {
            count++;
        }
    }

    return count;
}
```
- 주어진 시간은 로그의 시작 시간 또는 종료 시간
  - 해당 시간으로부터 1초 내에 다른 로그가 존재한다면 `count` 를 증가

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Time {
        int startSec;
        int endSec;

        public Time(int startSec, int endSec) {
            this.startSec = startSec;
            this.endSec = endSec;
        }
    }

    class Solution {
        ArrayList<Time> times = new ArrayList<>();
        
        public int solution(String[] lines) {
            // 로그 개수가 1개면 무조건 1 반환
            if (lines.length == 1) return 1;
            
            for (String line : lines) {
                String[] times = line.substring(11).split(" ");
                String[] doneTime = times[0].split(":");
                int procTime = (int) (Double.parseDouble(times[1].replace("s", "")) * 1000);
                getTime(doneTime, procTime);
            }

            int max = 0;
            // 시작점이 걸쳐있는 경우와 끝점이 걸쳐있는 경우, time의 start와 end를 기점으로 1초 안에 몇개의 요청이 처리되는지 카운트
            for (Time time : times)
                max = Math.max(max, Math.max(findMaxRequest(time.startSec), findMaxRequest(time.endSec)));

            return max;
        }
        
        // 시작 시간과 종료 시간을 구해서 ArrayList에 추가
        private void getTime(String[] doneTime, int procTime) {
            int hour = Integer.parseInt(doneTime[0]);
            int min = Integer.parseInt(doneTime[1]);
            int sec = (int) (Double.parseDouble(doneTime[2]) * 1000);

            int endSec = hour * 1000 * 60 * 60 + min * 1000 * 60 + sec;
            int startSec = endSec - procTime + 1;

            times.add(new Time(startSec, endSec));
        }

        private int findMaxRequest(int startTime) {
            int count = 0;
            // start ~ end 사이에 있다면 count + 1;
            int endTime = startTime + 1000;

            for (Time time : times) {
                if (startTime <= time.startSec && time.startSec < endTime) {
                    count++;
                } else if (startTime <= time.endSec && time.endSec < endTime) {
                    count++;
                } else if (endTime <= time.endSec && time.startSec <= startTime) {
                    count++;
                }
            }

            return count;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 문자열 파싱하는 과정부터 마음에 들지 않은 문제였고, 애매한 설명때문에 이해가 더 가지 않았다.
- 처음에는 초 단위의 정보만을 가지고 문제를 해결하려다가 아차 싶었다.
- 데이터 형 변환 또한 좀 더 꼼꼼히 확인하는 습관을 가져야겠다.
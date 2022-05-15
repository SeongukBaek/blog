---
title: "👩‍💻 64063. 호텔 방 배정"
description: "알고리즘 문제 풀기"
date: 2022-05-15
update: 2022-05-15
tags:
  - Union & Find
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 호텔 방 배정](https://programmers.co.kr/learn/courses/30/lessons/64063)

### 📍 **Logic**

```java
private long getRoom(long room) {
    // 해당 방이 아직 배정 받지 않은 경우
    if (!roomMap.containsKey(room)) {
        roomMap.put(room, room + 1);
        return room;
    }

    // 해당 방이 이미 배정된 경우, 재귀 호출을 통해 빈 방을 찾는다.
    long emptyRoom = getRoom(roomMap.get(room));
    roomMap.put(room, emptyRoom);
    
    return emptyRoom;
}
```
- 재귀 호출을 통해 빈 방을 찾아 `roomMap` 에 갱신해준다.
- 이를 통해 한 번에 빈 방을 배정해줄 수 있다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        Map<Long, Long> roomMap = new HashMap<>();
        
        public long[] solution(long k, long[] room_number) {
            long[] answer = new long[room_number.length];

            for (int i = 0; i < room_number.length; i++)
                answer[i] = getRoom(room_number[i]);
            
            return answer;
        }
        
        private long getRoom(long room) {
            // 해당 방이 아직 배정 받지 않은 경우
            if (!roomMap.containsKey(room)) {
                roomMap.put(room, room + 1);
                return room;
            }

            // 해당 방이 이미 배정된 경우, 재귀 호출을 통해 빈 방을 찾는다.
            long emptyRoom = getRoom(roomMap.get(room));
            roomMap.put(room, emptyRoom);
            
            return emptyRoom;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- `Map` 을 사용해 방 번호와 배정 가능한 방 번호를 저장하여 두 값이 같아질 때까지 탐색하면서 배정 가능한 방을 배정해주는 방식으로 구현하였지만, 시간초과가 발생했다.
- 단축을 위해서는 `1 -> 2 -> 3 -> 4 -> 5` 가 아니라 `1 -> 5` 로 방 배정을 바로 받을 수 있도록 해주어야 했다.
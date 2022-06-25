---
title: "👩‍💻 60062. 외벽 점검"
description: "알고리즘 문제 풀기"
date: 2022-06-25
update: 2022-06-25
tags:
  - 완전 탐색
  - 순열
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 외벽 점검](https://programmers.co.kr/learn/courses/30/lessons/60062)

### 📍 **Logic**

```java
private void canCheck(int[] friends) {
    for (int i = 0; i < weak.length; i++) {
        int start = i;
        boolean canCheck = true;

        for (int idx = 0; idx < friends.length; idx++) {
            for (int j = i; j < i + weak.length; j++) {
                // 두 지점 간 거리가 friends로 뽑힌 친구가 점검 가능한 거리보다 큰 경우는 점검 불가능
                // 따라서 현재 지점을 시작점으로 지정
                if (unrolledWeak[j] - unrolledWeak[start] > friends[idx]) {
                    start = j;
                    idx++;

                    // 현재 지점을 점검할 수 없는데, 더 점검할 친구가 없다면, 종료
                    if (idx == friends.length) {
                        canCheck = false;
                        break;
                    }
                }
            }

            // 점검 완료라면, 더 이상 점검할 필요가 없다. 따라서 flag를 true 지정
            if (canCheck) {
                answer = idx + 1;
                isFinish = true;
                return;
            }
        }
    }
}
```
- 만들어진 점검 인원을 이용해 점검이 가능한지 확인한다.
- 취약 지점 간 거리를 탐색하면서, 모두 점검이 가능하다면 `answer` 는 `idx + 1` 로 업데이트되고, 종료를 위해 `isFinish` 를 업데이트해 순열 만드는 것을 종료한다.
- 점검 인원을 모두 동원해도 점검이 불가능하다면, 더이상 탐색을 종료하고, 다음 점검 인원 순열을 만든다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

    class Solution {
        static int[] unrolledWeak;
        static boolean isFinish;
        static int[] weak;
        static int[] dist;
        static int answer = Integer.MAX_VALUE;
        
        public int solution(int n, int[] weak, int[] dist) {
            this.weak = weak;
            this.dist = dist;
            this.isFinish = false;
            int distLen = dist.length;

            unrollWeak(n, weak);

            // i개의 순열 만들기
            for (int i = 1; i <= distLen; i++)
                makeDistPerm(0, i, new boolean[distLen], new int[i]);
            
            return answer == Integer.MAX_VALUE ? -1 : answer;
        }
        
        private void makeDistPerm(int depth, int count, boolean[] visited, int[] friends) {
            if (isFinish) return;

            if (depth == count) {
                canCheck(friends);
                return;
            }

            for (int i = 0; i < dist.length; i++) {
                if (!visited[i]) {
                    friends[depth] = dist[i];
                    visited[i] = true;
                    makeDistPerm(depth + 1, count, visited, friends);
                    visited[i] = false;
                }
            }
        }

        private void canCheck(int[] friends) {
            for (int i = 0; i < weak.length; i++) {
                int start = i;
                boolean canCheck = true;

                for (int idx = 0; idx < friends.length; idx++) {
                    for (int j = i; j < i + weak.length; j++) {
                        // 두 지점 간 거리가 friends로 뽑힌 친구가 점검 가능한 거리보다 큰 경우는 점검 불가능
                        // 따라서 현재 지점을 시작점으로 지정
                        if (unrolledWeak[j] - unrolledWeak[start] > friends[idx]) {
                            start = j;
                            idx++;

                            // 현재 지점을 점검할 수 없는데, 더 점검할 친구가 없다면, 종료
                            if (idx == friends.length) {
                                canCheck = false;
                                break;
                            }
                        }
                    }

                    // 점검 완료라면, 더 이상 점검할 필요가 없다. 따라서 flag를 true 지정
                    if (canCheck) {
                        answer = idx + 1;
                        isFinish = true;
                        return;
                    }
                }
            }
        }

        // weak를 1차원으로 펼침
        private void unrollWeak(int n, int[] weak) {
            int len = weak.length;
            unrolledWeak = new int[len * 2 - 1];

            System.arraycopy(weak, 0, unrolledWeak, 0, len);

            for (int i = 0; i < len - 1; i++)
                unrolledWeak[i + len] = weak[i] + n;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 순열을 사용해서 1, 2, ... n명으로 가능한지 확인해보는 방식인 것은 쉽게 알았다!
  - 하지만 주어진 인원으로 외벽 점검이 가능한지 확인하는 로직 구현에서 좀 막혔다...
- 구현 연습을 많이 해야겠다.
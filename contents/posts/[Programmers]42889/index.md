---
title: "👩‍💻 42889. 실패율"
description: "알고리즘 문제 풀기"
date: 2022-06-07
update: 2022-06-07
tags:
  - 정렬
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 실패율](https://programmers.co.kr/learn/courses/30/lessons/42889)

### 📍 **Logic**

```java
for (int i = 0; i < N; i++)
    userStage.add(new Stage(i + 1));

for (int s : stages) {
    if (s > N) continue;
    userStage.get(s - 1).incFail();
}

for (Stage s : userStage) {
    if (users == 0) break;
    double tmp = s.fail / users;
    users -= s.fail;
    s.setFail(tmp);
}
```

- `ArrayList<Stage>` 를 사용해 도달한 인원 수와 실패율을 저장
- 난이도별 도달 인원 수를 0으로 초기화한 후, 실패율 계산을 위한 도달했지만 클리어하지 못한 인원 수를 계산
- 앞 난이도부터, **클리어하지 못한 인원 수 / 전체 인원**로 실패율을 계산한다.
  - 이후 전체 인원은 해당 난이도에 도달했지만 클리어하지 못한 인원 수만큼 차감한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Stage implements Comparable<Stage> {
        int user;
        double fail;

        public Stage(int user) {
            this.user = user;
            this.fail = 0;
        }

        public void incFail() {
            this.fail += 1;
        }

        public void setFail(double fail) {
            this.fail = fail;
        }

        @Override
        public int compareTo(Stage o) {
            if (o.fail == this.fail) return this.user - o.user;
            if (o.fail > this.fail) return 1;
            return -1;
        }
    }

    class Solution {
        public int[] solution(int N, int[] stages) {
            double users = stages.length;
            ArrayList<Stage> userStage = new ArrayList<>();

            for (int i = 0; i < N; i++)
                userStage.add(new Stage(i + 1));

            for (int s : stages) {
                if (s > N) continue;
                userStage.get(s - 1).incFail();
            }

            for (Stage s : userStage) {
                if (users == 0) break;
                double tmp = s.fail / users;
                users -= s.fail;
                s.setFail(tmp);
            }

            Collections.sort(userStage);

            int[] answer = new int[N];
            for (int i = 0; i < N; i++)
                answer[i] = userStage.get(i).user;
            
            return answer;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 쉬운 문제였으나 좀 더 효율적인 자료구조를 빠른 시간 내에 떠올리지 못한 게 문제였다.
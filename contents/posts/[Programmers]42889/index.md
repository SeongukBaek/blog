---
title: "π©βπ» 42889. μ€ν¨μ¨"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-06-07
update: 2022-06-07
tags:
  - μ λ ¬
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - μ€ν¨μ¨](https://programmers.co.kr/learn/courses/30/lessons/42889)

### π **Logic**

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

- `ArrayList<Stage>` λ₯Ό μ¬μ©ν΄ λλ¬ν μΈμ μμ μ€ν¨μ¨μ μ μ₯
- λμ΄λλ³ λλ¬ μΈμ μλ₯Ό 0μΌλ‘ μ΄κΈ°νν ν, μ€ν¨μ¨ κ³μ°μ μν λλ¬νμ§λ§ ν΄λ¦¬μ΄νμ§ λͺ»ν μΈμ μλ₯Ό κ³μ°
- μ λμ΄λλΆν°, **ν΄λ¦¬μ΄νμ§ λͺ»ν μΈμ μ / μ μ²΄ μΈμ**λ‘ μ€ν¨μ¨μ κ³μ°νλ€.
  - μ΄ν μ μ²΄ μΈμμ ν΄λΉ λμ΄λμ λλ¬νμ§λ§ ν΄λ¦¬μ΄νμ§ λͺ»ν μΈμ μλ§νΌ μ°¨κ°νλ€.

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
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

### βοΈ **Review**
- μ¬μ΄ λ¬Έμ μμΌλ μ’ λ ν¨μ¨μ μΈ μλ£κ΅¬μ‘°λ₯Ό λΉ λ₯Έ μκ° λ΄μ λ μ¬λ¦¬μ§ λͺ»ν κ² λ¬Έμ μλ€.
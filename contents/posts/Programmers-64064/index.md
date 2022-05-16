---
title: "👩‍💻 64064. 불량 사용자"
description: "알고리즘 문제 풀기"
date: 2022-05-12
update: 2022-05-12
tags:
  - 문자열
  - DFS
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 불량 사용자](https://programmers.co.kr/learn/courses/30/lessons/64064)

### 📍 **Logic**

```java
public void findBadUser(HashSet<String> set, int size) {
    if (size == bannedIdList.size()) {
        banSet.add(new HashSet<>(set));
        return;
    }

    // list번째 제재 아이디를 set에 추가
    for (String id : bannedIdList.get(size)) {
        if (set.contains(id)) continue;
        set.add(id);
        findBadUser(set, size + 1);
        set.remove(id);
    }
}
```
- DFS 방식으로 제재 아이디 `set` 을 생성하고, 이를 중복이 없도록 하기 위해 `HashSet` 에 저장한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;
    import java.util.regex.Pattern;

    class Ban {
        HashSet<HashSet<String>> banSet;
        ArrayList<ArrayList<String>> bannedIdList;

        public Ban() {
            banSet = new HashSet<>();
            bannedIdList = new ArrayList<>();
        }

        public void makeSet(String banned_id, String[] user_id) {
            // 정규표현식 사용을 위해 변환
            String regex = banned_id.replace('*', '.');
            ArrayList<String> tmpList = new ArrayList<>();

            for (String user : user_id) {
                boolean isMatch = Pattern.matches(regex, user);
                if (isMatch) tmpList.add(user);
            }
            bannedIdList.add(tmpList);
        }

        public void findBadUser(HashSet<String> set, int size) {
            if (size == bannedIdList.size()) {
                banSet.add(new HashSet<>(set));
                return;
            }

            // list번째 제재 아이디를 set에 추가
            for (String id : bannedIdList.get(size)) {
                if (set.contains(id)) continue;
                set.add(id);
                findBadUser(set, size + 1);
                set.remove(id);
            }
        }

        public int getCount() {
            return banSet.size();
        }
    }

    class Solution {
        public int solution(String[] user_id, String[] banned_id) {
            Ban b = new Ban();

            for (String ban : banned_id)
                b.makeSet(ban, user_id);

            b.findBadUser(new HashSet<>(), 0);

            return b.getCount();
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 정규 표현식만으로 해결하려고 했지만, DFS 방식으로 중복을 확인하는 과정이 필요했다.
- 이런 유형의 DFS, BFS 방식의 문제도 있을 수 있다는 것을 알게 되었다.
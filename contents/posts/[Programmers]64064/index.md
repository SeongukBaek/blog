---
title: "๐ฉโ๐ป 64064. ๋ถ๋ ์ฌ์ฉ์"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-05-12
update: 2022-05-12
tags:
  - ๋ฌธ์์ด
  - DFS
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๋ถ๋ ์ฌ์ฉ์](https://programmers.co.kr/learn/courses/30/lessons/64064)

### ๐ **Logic**

```java
public void findBadUser(HashSet<String> set, int size) {
    if (size == bannedIdList.size()) {
        banSet.add(new HashSet<>(set));
        return;
    }

    // list๋ฒ์งธ ์ ์ฌ ์์ด๋๋ฅผ set์ ์ถ๊ฐ
    for (String id : bannedIdList.get(size)) {
        if (set.contains(id)) continue;
        set.add(id);
        findBadUser(set, size + 1);
        set.remove(id);
    }
}
```
- DFS ๋ฐฉ์์ผ๋ก ์ ์ฌ ์์ด๋ `set` ์ ์์ฑํ๊ณ , ์ด๋ฅผ ์ค๋ณต์ด ์๋๋ก ํ๊ธฐ ์ํด `HashSet` ์ ์ ์ฅํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
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
            // ์ ๊ทํํ์ ์ฌ์ฉ์ ์ํด ๋ณํ
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

            // list๋ฒ์งธ ์ ์ฌ ์์ด๋๋ฅผ set์ ์ถ๊ฐ
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

### โ๏ธ **Review**
- ์ ๊ท ํํ์๋ง์ผ๋ก ํด๊ฒฐํ๋ ค๊ณ  ํ์ง๋ง, DFS ๋ฐฉ์์ผ๋ก ์ค๋ณต์ ํ์ธํ๋ ๊ณผ์ ์ด ํ์ํ๋ค.
- ์ด๋ฐ ์ ํ์ DFS, BFS ๋ฐฉ์์ ๋ฌธ์ ๋ ์์ ์ ์๋ค๋ ๊ฒ์ ์๊ฒ ๋์๋ค.
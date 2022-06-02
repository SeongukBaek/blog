---
title: "👩‍💻 42890. 후보키"
description: "알고리즘 문제 풀기"
date: 2022-06-02
update: 2022-06-02
tags:
  - 조합
  - 집합
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 후보키](https://programmers.co.kr/learn/courses/30/lessons/42890)

### 📍 **Logic**

```java
private void combination(int idx, int start, int keySize, HashSet<Integer> keys, int n, String[][] relation) {
    if (idx == keySize) {
        // 이미 뽑은 후보키라면 제외(유일성, 최소성 검사), keys에 key가 포함된다면 최소성 만족 X
        for (HashSet<Integer> key : candidateKeys)
            if (keys.containsAll(key)) return;

        // 뽑은 후보키의 인덱스를 확인하여 유일성을 확인할 set
        HashSet<String> spareKeys = new HashSet<>();

        for (String[] rel : relation) {
            StringBuilder sb = new StringBuilder();

            // 선택(keys에 추가)한 속성 체크
            for (int k : keys)
                sb.append(rel[k]);

            spareKeys.add(sb.toString());
        }

        // map의 크기와 relation의 길이가 같다면 모든 튜플에 대해서 중복된 값이 없다는 의미이므로 후보키가 될 수 있음
        if (spareKeys.size() == relation.length)
            candidateKeys.add(keys);
    } else {
        for (int i = start; i < n; i++) {
            HashSet<Integer> selectedKeys = new HashSet<>(keys);
            selectedKeys.add(i);
            combination(idx + 1, i + 1, keySize, selectedKeys, n, relation);
        }
    }
}
```

- 후보키를 생성하는 함수
- 유일성과 최소성을 만족하는 후보키를 `candidateKeys` 에 추가한다.
  - 만든 후보키에 해당하는 속성값으로 `Map` 을 만들었을때, 중복없이 `relation` 수만큼 만들어진다면 이를 만족하는 후보키이다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        // 후보키들을 저장할 ArrayList
        static ArrayList<HashSet<Integer>> candidateKeys = new ArrayList<>();
        
        public int solution(String[][] relation) {
            int n = relation[0].length;
            
            // 1개부터 n개까지의 후보키 생성 시도
            for (int i = 0; i < n; i++)
                combination(0, 0, i + 1, new HashSet<>(), n, relation);
            
            return candidateKeys.size();
        }
        
        private void combination(int idx, int start, int keySize, HashSet<Integer> keys, int n, String[][] relation) {
            if (idx == keySize) {
                // 이미 뽑은 후보키라면 제외(유일성, 최소성 검사), keys에 key가 포함된다면 최소성 만족 X
                for (HashSet<Integer> key : candidateKeys)
                    if (keys.containsAll(key)) return;

                // 뽑은 후보키의 인덱스를 확인하여 유일성을 확인할 set
                HashSet<String> spareKeys = new HashSet<>();

                for (String[] rel : relation) {
                    StringBuilder sb = new StringBuilder();

                    // 선택(keys에 추가)한 속성 체크
                    for (int k : keys)
                        sb.append(rel[k]);

                    spareKeys.add(sb.toString());
                }

                // map의 크기와 relation의 길이가 같다면 모든 튜플에 대해서 중복된 값이 없다는 의미이므로 후보키가 될 수 있음
                if (spareKeys.size() == relation.length)
                    candidateKeys.add(keys);
            } else {
                for (int i = start; i < n; i++) {
                    HashSet<Integer> selectedKeys = new HashSet<>(keys);
                    selectedKeys.add(i);
                    combination(idx + 1, i + 1, keySize, selectedKeys, n, relation);
                }
            }
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 조합과 집합에 대한 문제임은 바로 떠올릴 수 있었지만 "유일성" 과 "최소성" 을 만족하는 후보키를 구현하는데에서 막혔다 ..
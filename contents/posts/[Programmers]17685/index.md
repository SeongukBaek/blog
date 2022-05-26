---
title: "👩‍💻 17685. 자동완성"
description: "알고리즘 문제 풀기"
date: 2022-05-27
update: 2022-05-27
tags:
  - 트라이
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 자동완성](https://programmers.co.kr/learn/courses/30/lessons/17685)

### 📍 **Logic**

```java
public void insert(String word) {
    TrieNode thisNode = this.rootNode;

    for (int i = 0; i < word.length(); i++) {
        thisNode = thisNode.getChildNodes().computeIfAbsent(word.charAt(i), c -> new TrieNode());
        thisNode.size++;
    }
}
```
- 단어를 한 글자씩 `Trie` 에 추가한다.
  - 이때 람다식을 이용하여 추가하도록 한다.
- 추가할 때마다, 해당 단어가 사용되는 횟수를 증가시킨다. (`go, gone, guild` 의 경우, `g` 의 `size` 는 3이다.)

```java
public int findCount(String word) {
    TrieNode thisNode = this.rootNode;
    int count = 0;

    for (int i = 0; i < word.length(); i++) {
        char c = word.charAt(i);
        TrieNode node = thisNode.getChildNodes().get(c);
        count++;

        if (node.size == 1) break;

        thisNode = node;
    }

    return count;
}
```
- 주어진 단어의 `Trie` 를 탐색하면서, `size` 가 1인 경우까지 `count` 를 증가시킨다.
  - `size` 가 1이라는 것은 결국 해당 문자를 사용하는 단어가 1개인 경우이고, 해당 문자까지 입력한다면 그 단어를 **자동완성**시킬 수 있다!

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

    import java.util.*;

    class TrieNode {
        private Map<Character, TrieNode> childNodes = new HashMap<>();
        int size;

        public Map<Character, TrieNode> getChildNodes() {
            return this.childNodes;
        }
    }

    class Trie {
        private TrieNode rootNode;

        public Trie() {
            rootNode = new TrieNode();
        }

        public void insert(String word) {
            TrieNode thisNode = this.rootNode;

            for (int i = 0; i < word.length(); i++) {
                thisNode = thisNode.getChildNodes().computeIfAbsent(word.charAt(i), c -> new TrieNode());
                thisNode.size++;
            }
        }

        public int findCount(String word) {
            TrieNode thisNode = this.rootNode;
            int count = 0;

            for (int i = 0; i < word.length(); i++) {
                char c = word.charAt(i);
                TrieNode node = thisNode.getChildNodes().get(c);
                count++;

                if (node.size == 1) break;

                thisNode = node;
            }

            return count;
        }
    }

    class Solution {
        public int solution(String[] words) {
            Trie t = new Trie();
            
            for (String word : words)
                t.insert(word);
            
            int answer = 0;
            for (String word : words) 
                answer += t.findCount(word);
            
            return answer;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 처음 보는 `Trie` 문제여서, 이 자료 구조를 이해하는 데 집중했다. 마침 이번 주 CS 스터디 내용 중 `Trie` 가 있어서 먼저 정리한 후 구현해보았다.
- 생각보다 많이 어려운 내용은 아니었던 것 같지만, 응용해서 문제를 푸는 데는 좀 걸렸다.
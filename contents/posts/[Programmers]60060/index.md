---
title: "๐ฉโ๐ป 60060. ๊ฐ์ฌ ๊ฒ์"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-06-24
update: 2022-06-24
tags:
  - Trie
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๊ฐ์ฌ ๊ฒ์](https://programmers.co.kr/learn/courses/30/lessons/60060)

### ๐ **Logic**

```java
class Trie {
    private TrieNode forward;
    private TrieNode backward;

    ...
}
```

- ํธ๋ผ์ด๋ฅผ ์ ๋ฐฉํฅ, ๋ท๋ฐฉํฅ์ผ๋ก 2๊ฐ ์์ฑํ๋ค.
  - ์ ๋์ฌ๊ฐ ?์ธ ๊ฒฝ์ฐ๋ ํ์ํด์ผ ํ๋ ๊ฒฝ์ฐ๊ฐ ๋ง๊ณ  ์ด๋๋ฌธ์ ์๊ฐ ์ด๊ณผ ๋ฐ์ํ๊ธฐ ๋๋ฌธ์ ์ด์ ๊ฐ์ด ๋๋์ด ์์ฑํ๋ค.
- ํธ๋ผ์ด ๊ตฌ์กฐ๋ฅผ ๋๋์ด ์ ์ฅํ๊ธฐ์, ์ ๋์ฌ์ ๋ฐ๋ผ ํ์ํ๋ ํธ๋ผ์ด ๊ตฌ์กฐ๋ฅผ ๋ฐ๊ฟ๊ฐ๋ฉฐ count๋ฅผ ๊ณ์ฐํ๋ค.

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

	import java.util.*;

    class TrieNode {
        private Map<Character, TrieNode> childNodes = new HashMap<>();
        int count;

        // ์์ ๋ธ๋ ๋งต Getter
        public Map<Character, TrieNode> getChildNodes() {
            return this.childNodes;
        }
    }

    class Trie {
        // ํธ๋ผ์ด๋ฅผ ์ ๋ฐฉํฅ, ๋ท๋ฐฉํฅ์ผ๋ก 2๊ฐ ์์ฑ
        // ์ ๋์ฌ๊ฐ ?์ธ ๊ฒฝ์ฐ๋ ํ์ํด์ผ ํ๋ ๊ฒฝ์ฐ๊ฐ ๋ง๊ณ  ์ด๋๋ฌธ์ ์๊ฐ ์ด๊ณผ ๋ฐ์...
        private TrieNode forward;
        private TrieNode backward;

        public Trie() {
            forward = new TrieNode();
            backward = new TrieNode();
        }

        public void insert(String word) {
            insertBackward(word);
            insertForward(word);
        }

        // ์ฃผ์ด์ง ๋ฌธ์์ ๋ท๋ถ๋ถ๋ถํฐ Trie ๊ตฌ์กฐ ์์ฑ, count ๊ณ์ฐ
        private void insertBackward(String word) {
            TrieNode node = backward;

            for (int i = word.length() - 1; i >= 0; i--) {
                node.count++;
                char ch = word.charAt(i);
                Map<Character, TrieNode> childNodes = node.getChildNodes();
                childNodes.putIfAbsent(ch, new TrieNode());
                node = childNodes.get(ch);
            }
        }

        // ์ฃผ์ด์ง ๋ฌธ์์ ์๋ถ๋ถ๋ถํฐ Trie ๊ตฌ์กฐ ์์ฑ, count ๊ณ์ฐ
        private void insertForward(String word) {
            TrieNode node = forward;

            for (int i = 0; i < word.length(); i++) {
                node.count++;
                char ch = word.charAt(i);
                Map<Character, TrieNode> childNodes = node.getChildNodes();
                childNodes.putIfAbsent(ch, new TrieNode());
                node = childNodes.get(ch);
            }
        }

        // ์ ๋์ฌ๊ฐ ?๋ผ๋ฉด ๋ท๋ฐฉํฅ Trie๋ก๋ถํฐ count
        // ๊ทธ๋ ์ง ์๋ค๋ฉด ์ ๋ฐฉํฅ Trie๋ก๋ถํฐ count
        public int getCount(String query) {
            return query.charAt(0) == '?' ? getCountBackward(query) : getCountFarward(query);
        }

        private int getCountBackward(String query) {
            TrieNode node = backward;

            for (int i = query.length() - 1; i >= 0; i--) {
                char ch = query.charAt(i);
                if (ch == '?') return node.count;
                Map<Character, TrieNode> childNodes = node.getChildNodes();
                if (!childNodes.containsKey(ch)) return 0;
                node = childNodes.get(ch);
            }

            return node.count;
        }

        private int getCountFarward(String query) {
            TrieNode node = forward;

            for (int i = 0; i < query.length(); i++) {
                char ch = query.charAt(i);
                if (ch == '?') return node.count;
                Map<Character, TrieNode> childNodes = node.getChildNodes();
                if (!childNodes.containsKey(ch)) return 0;
                node = childNodes.get(ch);
            }

            return node.count;
        }
    }

    class Solution {
        public int[] solution(String[] words, String[] queries) {
            // ๋ฌธ์์ด ๊ธธ์ด๋ฅผ ์ธ๋ฑ์ค๋ก ํ๋ Trie ๋ฐฐ์ด ์ ์ธ
            Trie[] trie = new Trie[100001];
            int[] answer = new int[queries.length];
            
            // ๋ฌธ์์ด ๊ธธ์ด๋ฅผ ๊ธฐ์ค์ผ๋ก ๋ฐฐ์ด ์ด๊ธฐํ ํ, trie ์์ฑ
            for (String word : words) {
                int len = word.length();
                if (trie[len] == null) trie[len] = new Trie();
                trie[len].insert(word);
            }

            // query ๊ธธ์ด์ ํด๋นํ๋ trie ๋ฐฐ์ด ๊ฐ์ด ์๋ค๋ฉด ํด๋นํ๋ ๋ฌธ์๊ฐ ์๋ค๋ ์๋ฏธ,
            // ์๋ค๋ฉด ๊ฐ์ count
            for (int i = 0; i < queries.length; i++) {
                int len = queries[i].length();
                if (trie[len] == null) answer[i] = 0;
                else answer[i] = trie[len].getCount(queries[i]);
            }
            
            return answer;
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- ์ฒ์์๋ ์ ๊ท์์ ์ด์ฉํด์ผํ๋ ํ์ง๋ง, ํจ์จ์ฑ ํ์คํธ๊ฐ ์๋ ๊ฒ์ผ๋ก ๋ณด์ ์ด ๋ฐฉ์์ ์๋ ๋ฏ ํ๊ณ , ๊ณง๋ฐ๋ก `Trie` ๋ฅผ ์ฌ์ฉํด์ผ๊ฒ ๋ค๋ ์๊ฐ์ด ๋ค์๋ค.
- ๋ชจ๋  ๋ฌธ์๊ฐ ?์ธ ๊ฒฝ์ฐ์ ๋ํ ์๊ฐ ์ด๊ณผ๋ฅผ ํด๊ฒฐํ์ง ๋ชปํด ํ์ด๋ฅผ ์ฐธ๊ณ ํ๋ค...
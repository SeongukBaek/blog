---
title: "π©βπ» 17685. μλμμ±"
description: "μκ³ λ¦¬μ¦ λ¬Έμ  νκΈ°"
date: 2022-05-27
update: 2022-05-27
tags:
  - νΈλΌμ΄
series: "π©βπ» Programmers"
---

## λ¬Έμ 
[Programmers - μλμμ±](https://programmers.co.kr/learn/courses/30/lessons/17685)

### π **Logic**

```java
public void insert(String word) {
    TrieNode thisNode = this.rootNode;

    for (int i = 0; i < word.length(); i++) {
        thisNode = thisNode.getChildNodes().computeIfAbsent(word.charAt(i), c -> new TrieNode());
        thisNode.size++;
    }
}
```
- λ¨μ΄λ₯Ό ν κΈμμ© `Trie` μ μΆκ°νλ€.
  - μ΄λ λλ€μμ μ΄μ©νμ¬ μΆκ°νλλ‘ νλ€.
- μΆκ°ν  λλ§λ€, ν΄λΉ λ¨μ΄κ° μ¬μ©λλ νμλ₯Ό μ¦κ°μν¨λ€. (`go, gone, guild` μ κ²½μ°, `g` μ `size` λ 3μ΄λ€.)

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
- μ£Όμ΄μ§ λ¨μ΄μ `Trie` λ₯Ό νμνλ©΄μ, `size` κ° 1μΈ κ²½μ°κΉμ§ `count` λ₯Ό μ¦κ°μν¨λ€.
  - `size` κ° 1μ΄λΌλ κ²μ κ²°κ΅­ ν΄λΉ λ¬Έμλ₯Ό μ¬μ©νλ λ¨μ΄κ° 1κ°μΈ κ²½μ°μ΄κ³ , ν΄λΉ λ¬ΈμκΉμ§ μλ ₯νλ€λ©΄ κ·Έ λ¨μ΄λ₯Ό **μλμμ±**μν¬ μ μλ€!

### π **CODE**

<details>
  <summary>μ½λ λ³΄κΈ°/μ κΈ°π«</summary>
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

### βοΈ **Review**
- μ²μ λ³΄λ `Trie` λ¬Έμ μ¬μ, μ΄ μλ£ κ΅¬μ‘°λ₯Ό μ΄ν΄νλ λ° μ§μ€νλ€. λ§μΉ¨ μ΄λ² μ£Ό CS μ€ν°λ λ΄μ© μ€ `Trie` κ° μμ΄μ λ¨Όμ  μ λ¦¬ν ν κ΅¬νν΄λ³΄μλ€.
- μκ°λ³΄λ€ λ§μ΄ μ΄λ €μ΄ λ΄μ©μ μλμλ κ² κ°μ§λ§, μμ©ν΄μ λ¬Έμ λ₯Ό νΈλ λ°λ μ’ κ±Έλ Έλ€.
---
title: "๐ Trie(ํธ๋ผ์ด)"
description: "๊ฐ๋ฐ ์์"
date: 2022-05-25
update: 2022-05-25
tags:
  - ๊ฐ๋ฐ์์
  - Java
  - Trie
series: "๐ Computer Science"
---

## ๐งท ํธ๋ผ์ด
ํจ์จ์ ์ธ ๋ฌธ์์ด ์ ์ฅ ๋ฐ ํ์์ด ๊ฐ๋ฅํ ์๋ฃ๊ตฌ์กฐ์ด๋ค.

> ์๋๋ `Tri` ๋ก ๋ถ๋ ธ์๋ค. ํ์ง๋ง ๋ง๋ก ํ  ๋ `Tree` ์ ๊ตฌ๋ถ๋์ง ์๋ ๊ฒฝํฅ์ด ์์ด `Trie(ํธ๋ผ์ด)` ๋ก ๋ถ๋ฆฌ๊ธฐ ์์ํ๋ค.

์ ๋ง์ ๋ฌธ์์ด์ ์ ์ฅํ์๋๋ฐ ์๋ ฅ์ผ๋ก ์ด๋ค ๋ฌธ์์ด์ด ์ฃผ์ด์ก์ ๋, ๋ด๊ฐ ์ ์ฅํ ๋ฌธ์์ด์ ํฌํจ๋ ๋ฌธ์์ด์ธ์ง ์ ์ ์๋ ๋ฐฉ๋ฒ์ ์๋์ ๊ฐ์ ๋ฐฉ์๋ค์ด ์์ ๊ฒ์ด๋ค.

1. **๋จ์ ๋น๊ต**
   - ๋จ์ํ๊ฒ ์ ์ฒด ๋ฌธ์์ด์ ์ฒ์๋ถํฐ ๋๊น์ง ๊ฐ๋ณ ๋ฌธ์๋ฅผ ๋น๊ตํ๋ ๋ฐฉ์
   - ์ต๋ ๋ฌธ์์ด ๊ธธ์ด `m`, ์ ์ฒด ๋ฌธ์ ๊ฐ์ `n` ๊ฐ์ผ ๊ฒฝ์ฐ, ์๊ฐ๋ณต์ก๋: $O(nm)$

2. **์ด์ง ํ์ ๊ธฐ๋ฒ**
   - ์ ์ฒด ๋ฌธ์์ด์ ์ฌ์  ์์ผ๋ก ๋ฐฐ์ด ์ ์ฅ ํ, ์ค๊ฐ ๊ฐ๊ณผ ๋น๊ตํด ์ฌ์ ์ ์ผ๋ก ์ด์ ์ด๋ฉด ์ข์ธก์ ๋ฐ / ์ดํ๋ฉด ์ฐ์ธก์ ๋ฐ์ผ๋ก ๋น๊ต ๋ฐ๋ณต ๋ฐฉ์
   - ์ต๋ ๋ฌธ์์ด ๊ธธ์ด `m`, ์ ์ฒด ๋ฌธ์ ๊ฐ์ `n` ๊ฐ์ผ ๊ฒฝ์ฐ, ์๊ฐ๋ณต์ก๋: ์ ๋ ฌ: $O(nmlogn)$ / ํ์: $O(mlogn)$ ์ฆ, $O(nmlogn)$

3. **ํธ๋ผ์ด(`Trie`)**
   - K-์ง ํธ๋ฆฌ ๊ตฌ์กฐ๋ฅผ ํตํด ๋ฌธ์์ด์ ์ ์ฅํ๋ ๋ฐฉ์
   - `game` ์ด๋ผ๋ ๋จ์ด๋ฅผ ์ฐพ๋๋ค๋ฉด, `g` ๋ฅผ ์ฐพ๊ณ  ์์๋๋ก `a`, `m`, `e` ๋ฅผ ์ฐพ๋๋ฐ, ์ด๋ฅผ ํธ๋ฆฌํ์์ผ๋ก ๊ตฌํํ ๊ฒ
   - ๋งจ ์์ ์ ๋์ด(prefix)๋ถํฐ ์์ํ์ฌ ๋จ์ด ์ ์ฒด๋ฅผ ์ฐพ์๊ฐ๋ ๊ณผ์ ์ด๋ฏ๋ก ์ ๋์ฌ ํธ๋ฆฌ(Prefix-Tree)๋ผ๊ณ ๋ ํ๋ค.
   - ๋ฌธ์์ด ์ ์ฅ์ ์ํ ๊ณต๊ฐ์ ๋ง์ด ์ฐ์ง๋ง ํ์์ ๋งค์ฐ ํจ์จ์ ์ด๋ผ๋ ํน์ฑ์ ๊ฐ๋๋ค.
   - ์ต๋ ๋ฌธ์์ด ๊ธธ์ด `m` ์ผ ๋ ๋ฌธ์์ ๊ฐ์์ ๋ฌด๊ดํ๊ฒ ์๊ฐ๋ณต์ก๋: $O(m)$
       - ๋ฌธ์์ด ๊ธธ์ด๊ฐ ๋๋ฌด ์ปค์ `Map` ๋ฑ์ ์ด์ฉํด ๋์  ํ ๋น์ ํด์ผ ํ๋ ๊ฒฝ์ฐ $O(mlogn)$๋งํผ ์์ํ  ์ ์๋ค.

```java
{"bar", "bag", "bark", "dog", "do", "door"}
```

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FHUT56%2FbtqLElE8hac%2FJkLnmHIMelPA74KhdBS5D1%2Fimg.png" width="50%">

### ๐ช ์ฅ๋จ์ 
ํธ๋ผ์ด๋ ํด์ ํ์ด๋ธ์ ๋์ฒดํ๋ ๋ฐ ์ฌ์ฉ๋  ์ ์๋ค.

**์ฅ์ **
- ๋ถ์์ ํ ํด์ ํจ์๋ฅผ ์ฌ์ฉํ๋ ํด์ํ์ด๋ธ๊ณผ ๋น๊ตํ  ๋, ์๋ฃ์ ์ ๊ทผํ  ๋ ์ต์์ ๊ฒฝ์ฐ ๋ ์ ๋ฆฌํ ์๊ฐ๋ณต์ก๋๋ฅผ ๊ฐ๋๋ค. 
  - m์ด ํ์ํ  ๋ฌธ์์ด์ ๊ธธ์ด์ผ ๋ ์๊ฐ๋ณต์ก๋๋ $O(m)$์ด๋ค. 
  - ๋ณดํต ํด์ํ์ด๋ธ์ ํ์ ์๊ฐ์ด $O(1)$์ด๊ณ  ํด์ ํจ์ ํ๊ฐ ์๊ฐ์ด $O(m)$์ด์ง๋ง, ๋ถ์์ ํ ํด์ ํ์ด๋ธ์ ํค ์ถฉ๋์ด ์ผ์ด๋  ์ ์์ผ๋ฏ๋ก, $O(N)$์ด ๋  ์ ์๋ค.
- ํธ๋ผ์ด์์๋ ํค ์ถฉ๋์ด ์ผ์ด๋์ง ์๋๋ค.
- ์ฌ๋ฌ ๊ฐ์ด ํ๋์ ํค์ ์ฐ๊ด๋์ด ์์ง ์๋ ํ ๋ฒํท์ด ํ์ ์๋ค.
- ํด์ ํจ์๊ฐ ์์ด๋ ๋๋ค. ํค๊ฐ ๋์ด๋  ๋ ํด์ ํจ์๋ฅผ ๋ณ๊ฒฝํ  ํ์๋ ์๋ค.
- ๋ชจ๋  ํญ๋ชฉ์ด ํค์ ๋ฐ๋ผ ์ฌ์ ์์ผ๋ก ์ ๋ ฌ๋์ด ์๋ค.

**๋จ์ **
- ์กฐํ๋ ํด์ ํ์ด๋ธ๋ณด๋ค ๋๋ฆด ์ ์๋ค. 
  - ํนํ ์ฃผ ๋ฉ๋ชจ๋ฆฌ์ ๋นํด ์์ ์ ๊ทผ ๋น์ฉ์ด ํฐ ํ๋ ๋์คํฌ ๋๋ผ์ด๋ธ์ ๊ฐ์ ๋ณด์กฐ ๊ธฐ์ต์ฅ์น์์ ์ง์  ์ฝ๋๋ค๋ฉด ๋์ฑ ๊ทธ๋ ๋ค.
- ๋ถ๋์์์ ๊ณผ ๊ฐ์ด ๋ฌธ์์ด๋ก ์ฅํฉํ๊ฒ ํ์๋๋ ์๋ฃ์ ๊ฒฝ์ฐ ๋ฌด์๋ฏธํ๊ฒ ๊ธธ๊ฒ ๋์ด์ง ์ ๋์ฌ์ ๋ธ๋๋ฅผ ๊ฐ์ง ์ ์๋ค. 
- ํธ๋ผ์ด๊ฐ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ๋ ์๋นํ  ์ ์๋ค. 
  - ๋๋ถ๋ถ์ ํด์ ํ์ด๋ธ์์๋ ์ ์ฒด ํญ๋ชฉ์ ํ๋์ ๋ฉ๋ชจ๋ฆฌ ์ฒญํฌ์ ์ฌ๋ฆฌ๊ณค ํ์ง๋ง, ํธ๋ผ์ด์์๋ ๊ฒ์ ๋ฌธ์์ด์ ๊ฐ ๋ฌธ์๋ง๋ค ๋ฉ๋ชจ๋ฆฌ๊ฐ ํ ๋น๋  ์ ์๋ค.

### ๐ช ๊ตฌํ
> ํธ๋ฆฌ ๊ตฌ์กฐ์ ๊ฐ ๋ธ๋์๋ **๊ฐ ๋ฌธ์์ด์ ์ผ๋ถ๋ฅผ ํฌํจ**ํ๋ฉฐ, **์์ ๊ณผ ์ฐ๊ฒฐ๋๋ ๋ฌธ์์ด์ ์ผ๋ถ**๋ฅผ ๊ฐ์ง๊ณ  ์์ด์ผ ํ๋ค๋ ์ ์ ๋ช์ฌ!

**์์ฑ์/ํด๋์ค ์ ์**
- ๋ฃจํธ ๋ธ๋๋ ์๋ฌด๋ฐ ๋ฌธ์์ด๋ ํฌํจํ์ง ์๊ณ  ๋ชจ๋  ๋ฌธ์์ด์ ์ ๋์ฌ๋ค์ ์์ ๋ฐฐ์ด๋ก ๊ฐ๊ณ  ์์ด์ผ ํ๋ค.
- `Node` ํด๋์ค๋ ๊ฐ `Node` ์ ์ ๋ณด๋ฅผ ์ ์ํ ํด๋์ค๋ก, ์์ ์ ๋ฌธ์, ์ฐ๊ฒฐ๋๋ ๋ฌธ์๋ค์ ์ ๋ณด๋ฅผ ๊ฐ๊ณ  ์๊ณ  ๋ฌธ์์ด์ด ์์ฑ๋๋๊ฐ ์ฌ๋ถ ๋ํ ์ ์ฅํ๊ณ  ์๋ค.

```java
class Trie {
  Node root;
  static final int ALPHABET_SIZE = 26; // ์ํ๋ฒณ ๊ฐ์: 26

  public Trie() {
    this.root = new Node();
    this.root.val = ' ';
  }

  public static class Node {
    Node[] child = new Node[ALPHABET_SIZE]; // ๋ค๋ก ์ฐ๊ฒฐ๋๋ ๋ฌธ์์ด์ indexํํ์ฌ ์ ์ฅํ๋ ๋ฐฐ์ด
    boolean isTerminal = false; // ํ์ฌ ๋ธ๋๊ฐ ๋ฌธ์์ด์ ๋ง์ง๋ง์ธ์ง ์ฌ๋ถ
    int childNum = 0; // ํ์ฌ ๋ธ๋์ ์ฐ๊ฒฐ๋ ๋ฌธ์์ด ๊ฐ์
    char val; // ํ์ฌ ๋ธ๋์ ๊ฐ
  }
}
```

**๋ฌธ์์ด ์ฝ์(insert, charToInt)**
- `charToInt()` ๋ฉ์๋๋ ๊ฐ ๋ฌธ์์ด์ 1๊ฐ ๋จ์ด๋ฅผ `int` ํ ์ซ์๋ก ๋ณํํด์ฃผ๋ ๋ฉ์๋๋ค.
- `insert()` ๋ฉ์๋๋ ์ ์ฒด ๋ฌธ์์ด์ ์ชผ๊ฐ์ ๊ฐ ๋ธ๋(`Node`)์ ์ ์ฅํ๋ ๋ฉ์๋๋ค.

```java
private int charToInt(char c) {
  return c - 'a'; // ์๋ฌธ์๋ง ์ทจ๊ธํ๋ค๋ ๊ฐ์ ํ์ `a`๋ฅผ ๋บ๋ค.
}

public void insert(String str) {
  int len = str.length();
  Node cur = this.root; 

  for (int i = 0; i < len; i++) {
    char c = str.charAt(i);
    int num = this.charToInt(c);

    if (cur.child[num] == null) { // ๊ธฐ์กด์ null์ด๋ฉด ์ฐ๊ฒฐ ๋ฌธ์์ด๋ก ์ฒ์ ์ถ๊ฐ๋๋ ๊ฒ
      cur.child[num] = new Node();
      cur.child[num].val = c;
      cur.childNum++;
    }

    cur = cur.child[num];
  }
  cur.isTerminal = true;
}
```

**์ฐพ๊ธฐ(find)**
- ๋จ์ด๋ฅผ ์ ์ฅํ์ผ๋ฉด ์ ์ฅ๋์ด ์๋์ง ํ์ธํ  ์ ์์ด์ผ ํ๋ค. 

```java
public boolean find(String str) {
  int len = str.length();
  Node cur = this.root;

  for (int i = 0; i < len; i++) {
    char c = str.charAt(i);
    int num = this.charToInt(c);

    if (cur.child[num] == null) return false;
    cur = cur.child[num];
  }

  return cur != null && cur.isTerminal;
}
```

**์ ์ฒด ์ ์ฅ๋ ๋ฌธ์์ด ๋ด์ญ ์ถ๋ ฅ**
- ๋ชจ๋  ์ ์ฅ๋ ๋จ์ด์ ๋ด์ญ์ ์๊ธฐ ์ฝ๊ฒ ์ถ๋ ฅํ  ์ ์๋๋ก ํ๋ ๋ฉ์๋๋ฅผ ๊ตฌํํด๋ณผ ์ ์๋ค.

```java
private char intToChar(int i) {
  return (char) (i + (int) 'a');
}

// ์ฌ์ฉ์๊ฐ ๊ฐํธํ ํธ์ถ๋ง ํ๋ฉด ๋๋ ํจ์
public void printTrie() {
  this.printTrie(this.root, 0, new StringBuilder());
}

// ๋ด๋ถ์์ ์ฌ๊ท์ ์ผ๋ก ์ํํ์ฌ ๋ธ๋์ ์ ์ฅ๋ ๊ฐ๋ค ์ถ์ถํด ์ถ๋ ฅ
private void printTrie(Node node, int idx, StringBuilder sb) {
  Node cur = node;
  Node[] child = cur.child;
  StringBuilder builder = new StringBuilder(sb);

  // ๋ฃจํธ ๋ธ๋์๋ ์ ์ฅ๋ ๊ฒ์ด ์์ผ๋ฏ๋ก ๊ทธ ์ธ์ ๊ฒฝ์ฐ์๋ง append
  if (!cur.equals(this.root)) builder.append(intToChar(idx));

  // ์์ฑ ๋ธ๋๋ผ๋ฉด ์ถ๋ ฅ
  if (cur.isTerminal) System.out.println(builder);

  // ์ฐ๊ฒฐ๋ ๋ธ๋๋ค์ ์ํํ๊ธฐ ์ํด ๋ฐ๋ณต๋ฌธ ์ฌ์ฉ
  for (int i = 0; i < ALPHABET_SIZE; i++) {
    // null์ด๋ผ๋ฉด ์ ์ฅ๋ ๊ฒ์ด ์์ผ๋ฏ๋ก ํจ์ค
    if (cur.child[i] == null) continue;

    printTrie(child[i], i, builder);
  }
}
```

**์ญ์ **
- ์ญ์ ๋ ์ฌ๊ท์ ์ผ๋ก **bottom-up** ๋ฐฉ์์ผ๋ก ์งํ๋๊ณ , 3๊ฐ์ง ๊ฒฝ์ฐ๊ฐ ์๋ค.

1. ์ญ์ ํ  ๋ฌธ์๊ฐ ๋ค๋ฅธ ๋ฌธ์์ ์ ๋์ฌ์ธ ๊ฒฝ์ฐ - `isTerminal` ์ `false` ๋ณ๊ฒฝ
   1. `Do` ๋ `Door` ์ ์ ๋์ฌ๊ฐ ๋๋ค. ๋ฐ๋ผ์, `Do` ๋ฅผ ์ญ์ ํ๋ค๋ฉด `D` , `o` ์์ `o` ์ `isTerminal` ๋ง `false` ๋ก ๋ณ๊ฒฝํ๋ค.
   2. ๋จ์ํ ์ญ์ ํ๋ฉด `Door` ๋ํ ์ฌ๋ผ์ง๊ฒ ๋๋ค.
2. ์ญ์ ํ  ๋ฌธ์๊ฐ ๊ณ ์ ํ์ฌ ๋ค๋ฅธ ๋ฌธ์์ ์ฐ๊ด์ด ์๋ ๊ฒฝ์ฐ - ๊ด๋ จ ๋ชจ๋  ๋ธ๋ ์ญ์ 
3. ์ญ์ ํ  ๋ฌธ์์ ์ผ๋ถ๊ฐ ์ ์ฒด ์ญ์  ๋ฌธ์์ ์ ๋์ฌ์ธ ๊ฒฝ์ฐ - ๋ค๋ฅธ ๋ฌธ์์ ์ํญ๊ฐ์ง ์๋ ๊ณณ๊น์ง๋ง ์ญ์ 
   1. `Door` ๋ฅผ ์ญ์ ํ๋ ค๊ณ  ํ๋ค๋ฉด `Do` ๊ฐ ์๊ธฐ์, ์ ์ฒด ์ญ์ ๋ฅผ ํ  ์ ์๊ณ  `Door` ์์ ๋ค์ `o` , `r` ๋ง ์ญ์ ํ๋ค.

```java
public void delete(String str) {
  delete(this.root, str, 0);
}

private void delete(Node cur, String str, int idx) {
  int len = str.length();

  if ((cur.childNum == 0 && idx != len) || (idx == len && !cur.isTerminal)) {
    throw new NoSuchElementException("Value" + str + " does not exist in Trie!");
  }

  if (idx == len) {
    cur.isTerminal = false;

    if (cur.childNum == 0) cur = null;
    else {
      char c = str.charAt(idx);
      int num = charToInt(c);

      delete(cur.child[num], str, idx + 1);

      if (cur.child[num] == null) cur.childNum--;

      if (cur.childNum == 0 && !cur.isTerminal) cur = null;
    }
  }
}
```

> ์ค์ ๋ก๋ `HashMap` ์ ์ฌ์ฉํด ๊ตฌํํ๋ ๊ฒ์ด ๋ ํจ์จ์ ์ด๋ค. ์๋๋ ์ด๋ฅผ ์ฌ์ฉํ ๊ตฌํ์ด๋ค.

**ํด๋์ค ์์ฑ**
- `TrieNode` ๋ย ์์๋ธ๋ ๋งต๊ณผย `isLastChar` ๋ฅผ ๊ฐ์ง๊ณ  ์๋ค.
- `isLastChar` ๋ 'DEV'๋ผ๋ ๋จ์ด์์ [D], [E]๋ ๋ง์ง๋ง ๊ธ์๊ฐ ์๋์ง๋ง [V]๋ ๋ง์ง๋ง ๊ธ์๋ก, ํ ๋จ์ด๊ฐ ์์ฑ๋๋ ์์ ์์ ์ ์ ์๋๋ก ํ๋ ๊ฐ์ด๋ค.

```java
public class TrieNode {
	private Map<Character, TrieNode> childNodes = new HashMap<>();
	// ๋ง์ง๋ง ๊ธ์ ์ฌ๋ถ
	private boolean isLastChar;

	// ์์ ๋ธ๋ ๋งต Getter
	Map<Character, TrieNode> getChildNodes() {
		return this.childNodes;
	}

	// ๋ง์ง๋ง ๊ธ์์ธ์ง ์ฌ๋ถ Getter
	boolean isLastChar() {
		return this.isLastChar;
	}

	// ๋ง์ง๋ง ๊ธ์์ธ์ง ์ฌ๋ถ Setter
	void setIsLastChar(boolean isLastChar) {
		this.isLastChar = isLastChar;
	}
}
```

- Trie๋ ๊ธฐ๋ณธ์ ์ผ๋กย **๋น ๋ฌธ์์ด์ ๊ฐ์ง๋ ๋ฃจํธ ๋ธ๋**๋ง ๊ฐ์ง๊ณ  ์๋ค.
- ์ด ํ์ ๋์ฌ `insert()` ๋ฅผ ํตํด ๋จ์ด๋ฅผ ๋ฃ์ด ๊ทธ์ ๋ง๊ฒ ์์ ๋ธ๋๊ฐ ์์ฑ๋๋ค.

```java
public class Trie {
	private TrieNode rootNode;

	public Trie() {
		rootNode = new TrieNode();
	}
}
```

**insert**
- ์๋ ฅ๋ฐ์ ๋จ์ด์ ๊ฐ ์ํ๋ฒณ์ ๊ณ์ธต๊ตฌ์กฐ์ ์์ ๋ธ๋๋ก ๋ง๋ค์ด ๋ฃ๋๋ค.
  - ์ด๋ฏธ ๊ฐ์ ์ํ๋ฒณ์ด ์กด์ฌํ๋ฉด ๊ณตํต ์ ๋์ด๊น์ง๋ ์์ฑํ์ง ์๋๋ค.
- ์ฆ, ํด๋น ๊ณ์ธต ๋ฌธ์์ ์์ ๋ธ๋๊ฐ ์กด์ฌํ์ง ์์ ๋๋ง ์์ ๋ธ๋๋ฅผ ์์ฑํด์ค๋ค.
- ์ดํ ๋ง์ง๋ง ๊ธ์์๋ "์ฌ๊ธฐ๊น์ง๋ฅผ ๋์ผ๋ก ํ๋ ๋จ์ด๊ฐ ์กด์ฌํ๋ค"๋ ํ์๋ฅผ ์ํด `isLastChar` ๋ฅผ `true` ๋ก ํด์ค๋ค.

```java
void insert(String word) {
	TrieNode thisNode = this.rootNode;

	for (int i = 0; i < word.length(); i++) {
		thisNode = thisNode.getChildNodes().computeIfAbsent(word.charAt(i), c -> new TrieNode());
	}
	thisNode.setIsLastChar(true);
}
```

**contains**
- ํน์  ๋จ์ด๊ฐ Trie์ ์กด์ฌํ๋์ง๋ฅผ ํ์ธํ๊ธฐ ์ํด์๋ ์๋ 2๊ฐ์ง ์กฐ๊ฑด์ ๋ง์กฑํด์ผ ํ๋ค.
  - ๋ฃจํธ ๋ธ๋๋ถํฐ ์์๋๋ก ์ํ๋ฒณ์ด ์ผ์นํ๋ ์์ ๋ธ๋๋ค์ด ์กด์ฌํ  ๊ฒ
  - ํด๋น ๋จ์ด์ ๋ง์ง๋ง ๊ธ์์ ํด๋นํ๋ ๋ธ๋์ `isLastChar` ๊ฐ `true` ์ผ ๊ฒ

```java
boolean contains(String word) {
	TrieNode thisNode = this.rootNode;

	for (int i = 0; i < word.length(); i++) {
		char character = word.charAt(i);
		TrieNode node = thisNode.getChildNodes().get(character);

		if (node == null) return false;

		thisNode = node;
	}

	return thisNode.isLastChar();
}
```

**delete**
- Trie์ ๋ฃ์๋ ๋จ์ด๋ฅผ ์ญ์ ํ๋ ๊ณผ์ ์ด๋ค.
- `contains()` ์ฒ๋ผ ์ฃผ์ด์ง ๋จ์ด๋ฅผ ์ฐพ์ ํ์ ๋ธ๋๋ก ๋จ์ด ๊ธธ์ด๋งํผ ๋ด๋ ค๊ฐ๋ค.
- ๋จ, ๋ธ๋๋ค์ด ๋ถ๋ชจ ๋ธ๋์ ์ ๋ณด๋ฅผ ๊ฐ์ง๊ณ  ์์ง ์๊ธฐ์, ํ์ ๋ธ๋๋ก ๋ด๋ ค๊ฐ๋ฉฐ ์ญ์  ๋์ ๋จ์ด๋ฅผ ํ์ํ๊ณ  ๋ค์ ์ฌ๋ผ์ค๋ฉด์ ์ญ์ ํ๋ ๊ณผ์ ์ด **์ฝ๋ฐฑ**ํ์์ผ๋ก ๊ตฌํ๋์ด์ผ ํ๋ค๋ ๊ฒ์ด๋ค.

๊ทธ๋ฆฌ๊ณ  ์๋์ ์ญ์  ์กฐ๊ฑด๋ค์ ํ์ธํด์ผ ํ๋ค.
1. ์์ ๋ธ๋๋ฅผ ๊ฐ์ง๊ณ  ์์ง ์์์ผ ํ๋ค.
2. ์ญ์ ๋ฅผ ์์ํ๋ ์ฒซ ๋ธ๋๋ `isLastChar == true` ์ฌ์ผ ํ๋ค.
3. ์ญ์ ๋ฅผ ์งํํ๋ ์ค์๋ `isLastChar == false` ์ฌ์ผ ํ๋ค.

```java
void delete(String word) {
	delete(this.rootNode, word, 0);
}
	
private void delete(TrieNode thisNode, String word, int index) {
    char character = word.charAt(index);
    
    // Trie์ ์๋ ๋จ์ด์ธ ๊ฒฝ์ฐ ์๋ฌ ์ถ๋ ฅ
    if(!thisNode.getChildNodes().containsKey(character))
        throw new Error("There is no [" + word + "] in this Trie.");
              
    TrieNode childNode = thisNode.getChildNodes().get(character);
    index++;
      
    // ๋จ์ด์ ๊ธธ์ด๋งํผ ํ์ ๋ธ๋๋ก ์ฌ๊ท
    if(index == word.length()) {
      // ์ญ์ ์กฐ๊ฑด 2๋ฒ ํญ๋ชฉ
      // PO์ ๊ฐ์ด ๋ธ๋๋ ์กด์ฌํ์ง๋ง insertํ ๋จ์ด๊ฐ ์๋ ๊ฒฝ์ฐ ์๋ฌ ์ถ๋ ฅ
      if (!childNode.isLastChar()) 
          throw new Error("There is no [" + word + "] in this Trie.");
        
      childNode.setIsLastChar(false);
      // ์ญ์ ์กฐ๊ฑด 1๋ฒ ํญ๋ชฉ
      // ์ญ์  ๋์ ๋จ์ด์ ์ ์ผ ๋์ผ๋ก์จ ์์ ๋ธ๋๊ฐ ์์ผ๋ฉด(์ด ๋จ์ด๋ฅผ ํฌํจํ๋ ๋ ๊ธด ๋จ์ด๊ฐ ์์ผ๋ฉด) ์ญ์  ์์
      if (childNode.getChildNodes().isEmpty())
          thisNode.getChildNodes().remove(character);
    } else {
      delete(childNode, word, index); // ์ฝ๋ฐฑํจ์๋ถ๋ถ
      // ์ญ์ ์กฐ๊ฑด 1,3๋ฒ ํญ๋ชฉ
      // ์ญ์  ์ค, ์์ ๋ธ๋๊ฐ ์๊ณ  ํ์ฌ ๋ธ๋๋ก ๋๋๋ ๋ค๋ฅธ ๋จ์ด๊ฐ ์๋ ๊ฒฝ์ฐ ์ด ๋ธ๋ ์ญ์ 
      if(!childNode.isLastChar() && childNode.getChildNodes().isEmpty())
          thisNode.getChildNodes().remove(character);
    }
}
```

---

## ๐ ์ฐธ๊ณ 
- [Tech Interview for developer](https://gyoogle.dev/blog/computer-science/data-structure/Trie.html)
- [์๋ฃ๊ตฌ์กฐ-ํธ๋ผ์ด(Trie)](https://hongjw1938.tistory.com/24)
- [ํธ๋ผ์ด](https://ko.wikipedia.org/wiki/%ED%8A%B8%EB%9D%BC%EC%9D%B4_(%EC%BB%B4%ED%93%A8%ED%8C%85)#%EC%97%AD%EC%82%AC%EC%99%80_%EC%96%B4%EC%9B%90)
- [[์๋ฃ๊ตฌ์กฐ] Trie(ํธ๋ผ์ด)-2 : ์๋ฐ๋ก ๊ตฌํํ๊ธฐ](https://the-dev.tistory.com/3)
---
title: "📂 Trie(트라이)"
description: "개발 상식"
date: 2022-05-25
update: 2022-05-25
tags:
  - 개발상식
  - Java
  - Trie
series: "📂 Computer Science"
---

## 🧷 트라이
효율적인 문자열 저장 및 탐색이 가능한 자료구조이다.

> 원래는 `Tri` 로 불렸었다. 하지만 말로 할 때 `Tree` 와 구분되지 않는 경향이 있어 `Trie(트라이)` 로 불리기 시작했다.

수 많은 문자열을 저장하였는데 입력으로 어떤 문자열이 주어졌을 때, 내가 저장한 문자열에 포함된 문자열인지 알 수 있는 방법은 아래와 같은 방식들이 있을 것이다.

1. **단순 비교**
   - 단순하게 전체 문자열의 처음부터 끝까지 개별 문자를 비교하는 방식
   - 최대 문자열 길이 `m`, 전체 문자 개수 `n` 개일 경우, 시간복잡도: $O(nm)$

2. **이진 탐색 기법**
   - 전체 문자열을 사전 순으로 배열 저장 후, 중간 값과 비교해 사전적으로 이전이면 좌측의 반 / 이후면 우측의 반으로 비교 반복 방식
   - 최대 문자열 길이 `m`, 전체 문자 개수 `n` 개일 경우, 시간복잡도: 정렬: $O(nmlogn)$ / 탐색: $O(mlogn)$ 즉, $O(nmlogn)$

3. **트라이(`Trie`)**
   - K-진 트리 구조를 통해 문자열을 저장하는 방식
   - `game` 이라는 단어를 찾는다면, `g` 를 찾고 순서대로 `a`, `m`, `e` 를 찾는데, 이를 트리형식으로 구현한 것
   - 맨 앞의 접두어(prefix)부터 시작하여 단어 전체를 찾아가는 과정이므로 접두사 트리(Prefix-Tree)라고도 한다.
   - 문자열 저장을 위한 공간을 많이 쓰지만 탐색에 매우 효율적이라는 특성을 갖는다.
   - 최대 문자열 길이 `m` 일 때 문자의 개수와 무관하게 시간복잡도: $O(m)$
       - 문자열 길이가 너무 커서 `Map` 등을 이용해 동적 할당을 해야 하는 경우 $O(mlogn)$만큼 소요할 수 있다.

```java
{"bar", "bag", "bark", "dog", "do", "door"}
```

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FHUT56%2FbtqLElE8hac%2FJkLnmHIMelPA74KhdBS5D1%2Fimg.png" width="50%">

### 🪚 장단점
트라이는 해시 테이블을 대체하는 데 사용될 수 있다.

**장점**
- 불완전한 해시 함수를 사용하는 해시테이블과 비교할 때, 자료에 접근할 때 최악의 경우 더 유리한 시간복잡도를 갖는다. 
  - m이 탐색할 문자열의 길이일 때 시간복잡도는 $O(m)$이다. 
  - 보통 해시테이블은 탐색 시간이 $O(1)$이고 해시 함수 평가 시간이 $O(m)$이지만, 불완전한 해시 테이블은 키 충돌이 일어날 수 있으므로, $O(N)$이 될 수 있다.
- 트라이에서는 키 충돌이 일어나지 않는다.
- 여러 값이 하나의 키와 연관되어 있지 않는 한 버킷이 필요 없다.
- 해시 함수가 없어도 된다. 키가 늘어날 때 해시 함수를 변경할 필요도 없다.
- 모든 항목이 키에 따라 사전순으로 정렬되어 있다.

**단점**
- 조회는 해시 테이블보다 느릴 수 있다. 
  - 특히 주 메모리에 비해 임의 접근 비용이 큰 하드 디스크 드라이브와 같은 보조 기억장치에서 직접 읽는다면 더욱 그렇다.
- 부동소수점과 같이 문자열로 장황하게 표시되는 자료의 경우 무의미하게 길게 늘어진 접두사와 노드를 가질 수 있다. 
- 트라이가 메모리를 더 소비할 수 있다. 
  - 대부분의 해시 테이블에서는 전체 항목을 하나의 메모리 청크에 올리곤 하지만, 트라이에서는 검색 문자열의 각 문자마다 메모리가 할당될 수 있다.

### 🪚 구현
> 트리 구조의 각 노드에는 **각 문자열의 일부를 포함**하며, **자신과 연결되는 문자열의 일부**를 가지고 있어야 한다는 점을 명심!

**생성자/클래스 정의**
- 루트 노드는 아무런 문자열도 포함하지 않고 모든 문자열의 접두사들을 자식 배열로 갖고 있어야 한다.
- `Node` 클래스는 각 `Node` 의 정보를 정의한 클래스로, 자신의 문자, 연결되는 문자들의 정보를 갖고 있고 문자열이 완성되는가 여부 또한 저장하고 있다.

```java
class Trie {
  Node root;
  static final int ALPHABET_SIZE = 26; // 알파벳 개수: 26

  public Trie() {
    this.root = new Node();
    this.root.val = ' ';
  }

  public static class Node {
    Node[] child = new Node[ALPHABET_SIZE]; // 뒤로 연결되는 문자열을 index화하여 저장하는 배열
    boolean isTerminal = false; // 현재 노드가 문자열의 마지막인지 여부
    int childNum = 0; // 현재 노드에 연결된 문자열 개수
    char val; // 현재 노드의 값
  }
}
```

**문자열 삽입(insert, charToInt)**
- `charToInt()` 메소드는 각 문자열의 1개 단어를 `int` 형 숫자로 변환해주는 메소드다.
- `insert()` 메소드는 전체 문자열을 쪼개서 각 노드(`Node`)에 저장하는 메소드다.

```java
private int charToInt(char c) {
  return c - 'a'; // 소문자만 취급한다는 가정하에 `a`를 뺀다.
}

public void insert(String str) {
  int len = str.length();
  Node cur = this.root; 

  for (int i = 0; i < len; i++) {
    char c = str.charAt(i);
    int num = this.charToInt(c);

    if (cur.child[num] == null) { // 기존에 null이면 연결 문자열로 처음 추가되는 것
      cur.child[num] = new Node();
      cur.child[num].val = c;
      cur.childNum++;
    }

    cur = cur.child[num];
  }
  cur.isTerminal = true;
}
```

**찾기(find)**
- 단어를 저장했으면 저장되어 있는지 확인할 수 있어야 한다. 

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

**전체 저장된 문자열 내역 출력**
- 모든 저장된 단어의 내역을 알기 쉽게 출력할 수 있도록 하는 메소드를 구현해볼 수 있다.

```java
private char intToChar(int i) {
  return (char) (i + (int) 'a');
}

// 사용자가 간편히 호출만 하면 되는 함수
public void printTrie() {
  this.printTrie(this.root, 0, new StringBuilder());
}

// 내부에서 재귀적으로 순환하여 노드에 저장된 값들 추출해 출력
private void printTrie(Node node, int idx, StringBuilder sb) {
  Node cur = node;
  Node[] child = cur.child;
  StringBuilder builder = new StringBuilder(sb);

  // 루트 노드에는 저장된 것이 없으므로 그 외의 경우에만 append
  if (!cur.equals(this.root)) builder.append(intToChar(idx));

  // 완성 노드라면 출력
  if (cur.isTerminal) System.out.println(builder);

  // 연결된 노드들을 순환하기 위해 반복문 사용
  for (int i = 0; i < ALPHABET_SIZE; i++) {
    // null이라면 저장된 것이 없으므로 패스
    if (cur.child[i] == null) continue;

    printTrie(child[i], i, builder);
  }
}
```

**삭제**
- 삭제는 재귀적으로 **bottom-up** 방식으로 진행되고, 3가지 경우가 있다.

1. 삭제할 문자가 다른 문자의 접두사인 경우 - `isTerminal` 을 `false` 변경
   1. `Do` 는 `Door` 의 접두사가 된다. 따라서, `Do` 를 삭제한다면 `D` , `o` 에서 `o` 에 `isTerminal` 만 `false` 로 변경한다.
   2. 단순히 삭제하면 `Door` 또한 사라지게 된다.
2. 삭제할 문자가 고유하여 다른 문자와 연관이 없는 경우 - 관련 모든 노드 삭제
3. 삭제할 문자의 일부가 전체 삭제 문자의 접두사인 경우 - 다른 문자에 영항가지 않는 곳까지만 삭제
   1. `Door` 를 삭제하려고 한다면 `Do` 가 있기에, 전체 삭제를 할 수 없고 `Door` 에서 뒤의 `o` , `r` 만 삭제한다.

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

> 실제로는 `HashMap` 을 사용해 구현하는 것이 더 효율적이다. 아래는 이를 사용한 구현이다.

**클래스 생성**
- `TrieNode` 는 자식노드 맵과 `isLastChar` 를 가지고 있다.
- `isLastChar` 는 'DEV'라는 단어에서 [D], [E]는 마지막 글자가 아니지만 [V]는 마지막 글자로, 한 단어가 완성되는 시점임을 알 수 있도록 하는 값이다.

```java
public class TrieNode {
	private Map<Character, TrieNode> childNodes = new HashMap<>();
	// 마지막 글자 여부
	private boolean isLastChar;

	// 자식 노드 맵 Getter
	Map<Character, TrieNode> getChildNodes() {
		return this.childNodes;
	}

	// 마지막 글자인지 여부 Getter
	boolean isLastChar() {
		return this.isLastChar;
	}

	// 마지막 글자인지 여부 Setter
	void setIsLastChar(boolean isLastChar) {
		this.isLastChar = isLastChar;
	}
}
```

- Trie는 기본적으로 **빈 문자열을 가지는 루트 노드**만 가지고 있다.
- 이 후에 나올 `insert()` 를 통해 단어를 넣어 그에 맞게 자식 노드가 생성된다.

```java
public class Trie {
	private TrieNode rootNode;

	public Trie() {
		rootNode = new TrieNode();
	}
}
```

**insert**
- 입력받은 단어의 각 알파벳을 계층구조의 자식 노드로 만들어 넣는다.
  - 이미 같은 알파벳이 존재하면 공통 접두어까지는 생성하지 않는다.
- 즉, 해당 계층 문자의 자식 노드가 존재하지 않을 때만 자식 노드를 생성해준다.
- 이후 마지막 글자에는 "여기까지를 끝으로 하는 단어가 존재한다"는 표시를 위해 `isLastChar` 를 `true` 로 해준다.

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
- 특정 단어가 Trie에 존재하는지를 확인하기 위해서는 아래 2가지 조건을 만족해야 한다.
  - 루트 노드부터 순서대로 알파벳이 일치하는 자식 노드들이 존재할 것
  - 해당 단어의 마지막 글자에 해당하는 노드의 `isLastChar` 가 `true` 일 것

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
- Trie에 넣었던 단어를 삭제하는 과정이다.
- `contains()` 처럼 주어진 단어를 찾아 하위 노드로 단어 길이만큼 내려간다.
- 단, 노드들이 부모 노드의 정보를 가지고 있지 않기에, 하위 노드로 내려가며 삭제 대상 단어를 탐색하고 다시 올라오면서 삭제하는 과정이 **콜백**형식으로 구현되어야 한다는 것이다.

그리고 아래의 삭제 조건들을 확인해야 한다.
1. 자식 노드를 가지고 있지 않아야 한다.
2. 삭제를 시작하는 첫 노드는 `isLastChar == true` 여야 한다.
3. 삭제를 진행하는 중에는 `isLastChar == false` 여야 한다.

```java
void delete(String word) {
	delete(this.rootNode, word, 0);
}
	
private void delete(TrieNode thisNode, String word, int index) {
    char character = word.charAt(index);
    
    // Trie에 없는 단어인 경우 에러 출력
    if(!thisNode.getChildNodes().containsKey(character))
        throw new Error("There is no [" + word + "] in this Trie.");
              
    TrieNode childNode = thisNode.getChildNodes().get(character);
    index++;
      
    // 단어의 길이만큼 하위 노드로 재귀
    if(index == word.length()) {
      // 삭제조건 2번 항목
      // PO와 같이 노드는 존재하지만 insert한 단어가 아닌 경우 에러 출력
      if (!childNode.isLastChar()) 
          throw new Error("There is no [" + word + "] in this Trie.");
        
      childNode.setIsLastChar(false);
      // 삭제조건 1번 항목
      // 삭제 대상 단어의 제일 끝으로써 자식 노드가 없으면(이 단어를 포함하는 더 긴 단어가 없으면) 삭제 시작
      if (childNode.getChildNodes().isEmpty())
          thisNode.getChildNodes().remove(character);
    } else {
      delete(childNode, word, index); // 콜백함수부분
      // 삭제조건 1,3번 항목
      // 삭제 중, 자식 노드가 없고 현재 노드로 끝나는 다른 단어가 없는 경우 이 노드 삭제
      if(!childNode.isLastChar() && childNode.getChildNodes().isEmpty())
          thisNode.getChildNodes().remove(character);
    }
}
```

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog/computer-science/data-structure/Trie.html)
- [자료구조-트라이(Trie)](https://hongjw1938.tistory.com/24)
- [트라이](https://ko.wikipedia.org/wiki/%ED%8A%B8%EB%9D%BC%EC%9D%B4_(%EC%BB%B4%ED%93%A8%ED%8C%85)#%EC%97%AD%EC%82%AC%EC%99%80_%EC%96%B4%EC%9B%90)
- [[자료구조] Trie(트라이)-2 : 자바로 구현하기](https://the-dev.tistory.com/3)
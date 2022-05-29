---
title: "💡 해시 테이블 (Hash Table)"
description: "개발 상식"
date: 2022-05-06
update: 2022-05-06
tags:
  - 개발상식
  - Java
  - Hash
series: "💡 Algorithm"
---

## 🧷 해시 테이블
> 완전 탐색으로는 시간초과에 빠지게 되는 문제에서는 해시를 적용시켜 탐색 시간을 줄일 수 있다.

`Hash` 는 내부적으로 **배열**을 사용하여 데이터를 저장하여 작은 메모리로도 프로세스 관리가 가능해지고, 빠른 검색 속도를 갖는다. 고유의 `index` 로 접근하여 특정 값을 탐색하기에 평균적으로 $O(1)$이 된다.
- **충돌 현상**으로 인해 "평균적"으로 $O(1)$이다.
- 문제는 이 `index` 로 저장되는 `key` 값이 **불규칙**하다는 점이다.

> **충돌 현상**
> : 서로 다른 두 개의 `Key` 가 같은 `index` 로 해싱되어 같은 곳에 저장하려는 현상

그래서 "특별한 알고리즘"을 사용하여 **저장할 데이터와 연관된 고유한 숫자**를 만들어 이를 `index` 로 사용한다.
- `index` 는 그 데이터만의 고유한 위치이므로, 삽입이나 삭제 연산 시 추가적인 비용이 발생하지 않는다.
- 여기서 특별한 알고리즘은 `Hash Method` or `Hash Function` 이라고 하고, 이 함수에 의해 반환된 데이터의 고유 숫자 값을 `Hash Code` 라고 한다.
- 하지만, 잘못된 `Hash Function` 을 통해 충돌 현상이 발생하게 될 수 있다.
  - 충돌 현상이 많아질수록, 탐색에 필요한 시간 복잡도는 $O(N)$에 가까워지게 된다.

좋은 `Hash Function` 은 일반적으로, `Key` 의 일부분을 참조하여 해시 값을 만들지 않고, `Key` 전체를 참조하여 해시 값을 만든다.
- 하지만 이는 `Key` 의 특성에 따라 달라지게 된다.

`Hash Function` 을 무조건 1:1 매칭으로 만드는 것보다, **충돌 현상을 최소화하는 방향으로 이를 어떻게 대응할 것인가**가 더 중요하다.
- 1:1 대응이 되도록 만드는 것은 거의 불가능하고, 가능하다해도 이는 곧 배열과 같기에 메모리 사용이 많아진다.

### 🪚 충돌 현상 해결 방법
아래 2가지 방법이 있고, 두 방법 모두 최악의 경우 $O(M)$의 시간 복잡도를 가진다.

1. **Open Address 방식 (개방 주소법)**
: 충돌 현상이 발생하면, (즉, 이미 해당 해시 버킷이 사용 중인 경우) **다른 해시 버킷에 삽입하려는 데이터를 삽입**하는 방식이다.
- 이때, 데이터를 저장하기 위해 비어 있는 다른 해시 버킷을 찾아 헤맨다. 
- 최악의 경우, 비어 있는 해시 버킷을 찾지 못해 다시 탐색을 시작한 위치로 돌아올 수 있다. 이때 탐색하는 데도 아래 3가지 방법이 있다.
  - **Linear Probing**: 순차적으로 탐색하는 방식
    - Primary Clustering에 취약하다.
  - **Quadratic Probing**: 2차 함수를 이용해 탐색할 위치를 찾는다. ($1^2$, $2^2$, $3^2$, ... 으로 탐색위치 증가)
    - Secondary Clustering에 취약하다.
  - **Double Hashing Probing**: 하나의 해시 함수에서 충돌이 발생하면 2차 해시 함수를 사용해 탐사 이동폭을 얻어 다른 버킷을 탐색한다.
    - 두 취약점을 해결하지만, 가장 많은 연산을 요구한다.

> **해시 버킷**?
> : 데이터를 저장하기 위한 공간

2. **Separate Chaining 방식 (분리 연결법)**
: 일반적으로 Open Address방식은 Separate Chaining보다 느리다. Open Address의 경우 해시 버킷을 채운 밀도가 높아질수록 최악의 경우가 발생할 빈도가 높아지기 때문이다. 반면, Separate Chaining 방식은 보조 해시 함수를 사용해 잘 조정한다면 최악의 경우에 가까워지는 빈도를 줄일 수 있다. Separate Chaining 방식은 2가지 구현 방식이 있다.

> **Java 7에서는 Separate Chaining 방식을 사용해 `HashMap` 을 구현한다.**

- 연결 리스트를 사용하는 방식 (`Linked List`)
  - 각각의 버킷을 연결 리스트로 만들어 충돌이 발생하면 해당 버킷의 list에 추가하는 방식이다.
  - 연결 리스트의 장, 단점을 그대로 이어 받아, 삭제 또는 삽입이 간단하지만, 작은 데이터들을 저장할 때 연결 리스트 자체의 오버헤드가 발생한다.
  - 버킷을 계속해서 사용하는 Open Address 방식에 비해 테이블의 확장을 늦출 수 있다는 특징이 있다.
- Tree를 사용하는 방식 (`Red-Black Tree`)
  - 연결 리스트 대신 트리를 사용하는 방식으로, 연결 리스트를 사용할지, 트리를 사용할지 결정하는 기준은 하나의 해시 버킷에 할당된 `key-value` 쌍의 개수이다. 
  - 트리의 기본적인 메모리 사용량이 많기 때문에, 데이터의 개수가 적다면 연결 리스트를 사용하는 것이 효율적이다.
    - 데이터의 개수가 적을 때, 성능상의 차이는 거의 없기에 메모리적으로 효율적인 연결 리스트를 사용하는 것이 좋다.

> **데이터가 적다는 것의 의미**
> : 기준은 위에서 언급했듯 하나의 해시 버킷에 할당된 `key-value` 쌍의 개수이다. 연결 리스트의 기준과 트리의 기준은 6개와 8개로 나뉜다.
> - 7이 없는 이유는, **자료구조를 변경하는 데 소모되는 비용을 줄이기 위함**이다.

해시 버킷에 6개의 `key-value` 쌍이 있다고 가정해보자. 이때 하나의 값이 추가되어 총 쌍의 개수가 7개가 되었다. 만약, 기준이 6, 7이었다면, 값이 추가되면서 자료구조를 트리로 변경해야 한다. 그리고 다시 하나의 값이 삭제된다면, 다시 트리에서 연결 리스트로 자료구조를 변경해야 한다. 
- 즉, 기준이 1 차이가 난다면, 자료구조를 변경하는 `Switching` 비용이 너무 많이 필요하게 된다. 
- 따라서, 기준을 2만큼의 차이를 두었다.
- 결과적으로, 쌍의 개수가 6개 -> 7개로 변경된다면 연결 리스트 구조를 유지할 것이고, 8개 -> 7개로 변경된다면 트리 구조를 유지할 것이다.

> **보조 해시 함수**
> : `key` 의 해시 값을 변형하여 해시 충돌 가능성을 줄이기 위해 사용한다. Separate Chaining 방식 사용 시, 함께 사용되며 최악의 경우에 가까워지지 않도록 한다.

### 🪚 해시 버킷 동적 확장 (Resize)
해시 버킷의 개수가 적다면 메모리 사용을 아낄 수 있지만 해시 충돌로 인해 성능 상 손실이 발생한다.
- 그래서 `HashMap` 은 `key-value` 쌍의 개수가 일정 이상이 되면, 해시 버킷의 개수를 두 배로 늘린다. 개수를 늘림으로써, 충돌로 인한 성능 손실 문제를 어느 정도 해결할 수 있다.
  - 여기서 일정 이상의 의미는 현재 데이터의 개수가 해시 버킷의 개수의 **75%** 가 될 때이다. 
  - `0.75` 라는 숫자는 **load factor**로 불린다.

### 🪚 예제 문제
[문제 링크](https://codeforces.com/contest/4/problem/C?f0a28=1)

N(1 ~ 100000)의 값만큼 문자열이 입력된다. 처음 입력되는 문자열은 "OK", 들어온 적이 있던 문자열은 "문자열 + index"로 출력한다.

```java
// input
5
abcd
bac
abcd
abcd
ab

// output
OK
OK
abcd1
abcd2
OK
```

- N값은 최대 10만이므로, 이를 완전 탐색으로 해결한다면 $O(N^2)$의 시간복잡도를 가져, 100억번의 연산이 필요하다. 이는 곧바로 시간초과로 이어질 것이다.
- 따라서 **해시 테이블**을 이용해 해결해야 한다. 
  - 입력된 문자열 값을 해시 키로 변환시켜 저장하면서 진행한다.

```java
public class Solution {
  static final int HASH_SIZE = 1000;
  static final int HASH_LEN = 400;
  static final int HASH_VAL = 17; // 소수로 할 것, 주로 17, 19, 23
  static String str;
  static int N;
	
  static int[][] data = new int[HASH_SIZE][HASH_LEN];
  static int[] length = new int[HASH_SIZE];
  static String[][] s_data = new String[HASH_SIZE][HASH_LEN];

  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    StringBuilder sb = new StringBuilder();
		
    N = Integer.parseInt(br.readLine()); // 입력 수 (1 ~ 100000)
		
    for (int i = 0; i < N; i++) {
      str = br.readLine();
			
      // 입력 문자열로부터 키 값을 생성
      int key = getHashKey(str);

      // 해당 키 값이 이미 존재하는지 확인
      int cnt = checking(key);

      // 이미 들어왔던 문자열
      if(cnt != -1)	sb.append(str).append(cnt).append("\n");
      else sb.append("OK").append("\n");
      }
		
    System.out.println(sb.toString());
  }
  
  public static int getHashKey(String str) {		
    int key = 0;
		
    // 키 값 생성 (HASH_VAL 사용)
    for (int i = 0; i < str.length(); i++)
      key = (key * HASH_VAL) + str.charAt(i) + HASH_VAL;

    // 키 값 양수로 변환
    if(key < 0) key = -key; 
		
    return key % HASH_SIZE;	
  }

  public static int checking(int key) {	
    // 현재 키에 담긴 수
    int len = length[key]; 

    // 이미 들어온 적 있음
    if(len != 0) {
      // 이미 들어온 문자열이 해당 키 배열에 있는지 확인
      for (int i = 0; i < len; i++) { 
        if(str.equals(s_data[key][i])) {
          // 있다면 들어온 수를 반환
          data[key][i]++;
          return data[key][i];
        }
      }
    }
    
    // 들어온 적이 없었으면 해당 키 배열에 문자열을 저장하고 길이 1 늘리기
    s_data[key][length[key]++] = str;
    
    // 들어온 적 없었다면 -1 반환
    return -1;
  }
}
```

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog/algorithm/Bubble%20Sort.html)
- [JaeYeopHan/Interview_Question_for_Beginner](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#hash-table)
- [해싱, 해시함수, 해시테이블](https://ratsgo.github.io/data%20structure&algorithm/2017/10/25/hash/)
---
title: "📃 HashMap과 LinkedHashMap"
description: "java 지식"
date: 2022-03-20
update: 2022-03-20
tags:
  - Java
series: "📃 Java 지식"
---

프로젝트를 진행하면서, Key와 Value를 쌍으로 저장하는 클래스인 `Map` 를 자주 사용하고 있다. 검색에 있어서 많은 이점이 있기 때문인데, 오늘 이 포스트를 작성하게 된 이유는 `Map` 종류 중 하나인 `HashMap` 을 사용해 값을 저장하고 정렬하던 중, 정렬된 값들이 순서대로 저장되지 않는 문제를 발견했기 때문이다. 

이를 해결하기 위해 `LinkedHashMap` 클래스를 사용한다는 것을 확인했고, 둘의 차이점에 대해 정리하고자 한다.

## 📍 `HashMap` 이란
정의 형태는 아래와 같다.

```java
public class HashMap<K,V>
extends AbstractMap<K,V>
implements Map<K,V>, Cloneable, Serializable
```

`Map` 인터페이스 구현에 기반한 해시 테이블이다.
- K : map에서 각각을 식별하기 위한 key의 타입
- V : 매핑된 값의 타입
- 모든 map 연산을 제공하고, `null` values와 keys를 허용한다. 
- map의 순서를 보장하지 않는다. 
- `get` 과 `put` 에 대해 일정한 시간 성능을 보여준다. (hash function 사용)
- 하위 클래스로는 `LinkedHashMap` , `PrinterStateReasons` 가 있다.

> rough하게 보면 `HashTable` 와 동일하지만, `HashMap` 은 unsynchronized하고, `null` 을 허용한다는 특징이 있다.

## 📍 `LinkedHashMap` 이란
정의 형태는 아래와 같다.
```java
public class LinkedHashMap<K,V>
extends HashMap<K,V>
implements Map<K,V>
```

`Map` 인터페이스 구현에 기반한 해시 테이블이자 링크드 리스트이다.
- K : map에서 각각을 식별하기 위한 key의 타입
- V : 매핑된 값의 타입
- 이중 링크드 리스트를 모든 entries에 대해 유지하여 각각의 삽입 순서를 보장한다.
  - 동일한 key에 대해 `map.put()` 이 호출되어도 삽입 순서에는 영향을 미치지 않고, 이미 있던 value가 대체된다.

## 📍 공통점과 차이점
### 📝 공통점
둘 다 기본적으로 `Map` 인터페이스를 기반에 둔다. (`Map` -> `HashMap` -> `LinkedHashMap`) 따라서, 기본적으로 사용하는 메소드들도 동일하다.
- `get()` : 매핑한 key의 value값을 가져온다.
- `isEmpty()` : map안의 데이터의 존재 여부를 반환한다. 비어있다면 `true` 를 반환한다.
- `containsKey()` : map안에 인자로 전달된 key가 존재하는지를 반환한다.
- `size()` : map의 크기를 반환한다.

### 📝 차이점
가장 큰 차이라고 함은 내가 사용했던 이유이기도 한, **Key & Value 삽입 순서의 보장**이다.

**`HashMap`**은 삽입 순서대로 저장되지 않지만, **`LinkedHashMap`**은 삽입 순서대로 저장된다.

나는 `HashMap` 에 Key & Value로 저장된 데이터들을 특정 기준으로 정렬하고 이를 정렬된 순서대로 저장되는 것을 원했기에 `LinkedHashMap` 을 사용했다. 그렇다면 `HashMap` 은 왜 삽입 순서대로 저장되지 않는 걸까 ?

### 📝 `HashMap` 의 순서
`HashMap` 의 API를 보면, 아래와 같다.

```java
public V put(K key, V value) {
  return putVal(hash(key), key, value, false, true);
}

static final int hash(Object key) {
  int h;
  return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}


```
- `put` 을 할 때, `hash()` 메소드를 사용해 `hash` 된 key을 이용해 저장하고 있다.
- `hash()` 메소드에서 사용하는 `key.hashCode()` 가 어떤 값을 리턴할 지 알 수 없기에 `HashMap` 은 순서를 보장해주지 못한다.

## 📕 참고
- [Class HashMap](https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html)
- [JAVA HashMap VS LinkedHashMap (차이점, 성능차이, 사용방법)](https://web-inf.tistory.com/44)
- [JAVA) HashMap에서의 순서](https://surhommejk.tistory.com/223)
---
title: "📃 HashMap 동작방식"
description: "java 지식"
date: 2022-05-29
update: 2022-05-29
tags:
  - Java
  - HashMap
series: "📃 Java 지식"
---

<em>포스트와 관련된 모든 코드들은 참고 URL에서 확인할 수 있습니다.</em>

## 🧷 HashMap
**Java Collections Framework**에 속한 구현체 클래스이다.

### 🪚 HashMap과 HashTable
이 둘은 Java의 API 이름이다. `HashTable` 또한 `Map` 인터페이스를 구현하고 있어 `HashMap` 과 제공하는 기능은 같다.
- 하지만 `HashMap` 은 보조 해시 함수(2차 해시 함수)를 사용하여 보조 해시 함수를 사용하지 않는 `HashTable` 에 비해 해시 충돌이 덜 발생할 수 있어 상대적인 성능상 이점이 있다.
- 또한, `HashTable` 구현은 거의 변화가 없지만, `HashMap` 은 지속적으로 개선되고 있다.

> HashTable은 JDK 1.0부터 있던 API이고, HashMap은 Java 2에서 처음 선보인 Java Collections Framework에 속한 API다.

이 둘을 **정의**한다면, "키에 대한 해시 값을 사용하여 값을 저장하고 조회하며, 키-값 쌍의 개수에 따라 동적으로 크기가 증가하는 associate array"라고 할 수 있다.
- `map` 은 원래 대응 관계를 지칭하는 용어로, `HashMap` 은 키 집합인 정의역과 값 집합인 공역의 대응에 해시 함수를 이용한다.

> associate array를 지칭하는 다른 용어로는 `Map` , `Dictionary` , `Symbol Table` 등이 있다.

이 둘의 **선언부**를 보면, associate array를 지칭하기 위해 `HashTable` 은 `Dictionary` 라는 이름을 사용하고, `HashMap` 은 이름 그대로 `Map` 이라는 용어를 사용한다.

```java
public class 8ccce55530bc3477c678dd9921b60f3e.gifHashtable<K,V> extends Dictionary<K,V> implements Map<K,V>, Cloneable, java.io.Serializable { ... }

public class 928b3cc3fe40d69cd06cbe7f5f3767f8.gifHashMap<K,V> extends AbstractMap<K,V> implements Map<K,V>, Cloneable, Serializable { ... }
```

### 🪚 해시 분포와 해시 충돌
동일하지 않은 어떤 객체 X와 Y가 있을 때, `X.equals(Y)` 가 거짓일 때 `X.hashCode() != Y.hashCode()` 가 같지 않다면, 이때 사용하는 해시 함수는 **완전한 해시 함수**라고 한다.

`Boolean` 같이 서로 구별되는 객체의 종류가 적거나, `Integer` , `Long` , `Double` 같은 `Number` 객체는 객체가 나타내려는 값 자체를 해시 값으로 사용할 수 있기 때문에 완전한 해시 함수 대상으로 삼을 수 있다.
- 하지만 `String` 이나 `POJO(Plain Old Java Object)` 에 대하여 완전한 해시 함수를 제작하는 것은 사실상 불가능하다.

<details>
  <summary><strong>POJO(Plain Old Java Object) 💫</strong></summary>
    <div markdown="1">

  말 그대로 오래된 방식의 간단한 자바 객체라는 말로, 중량 프레임워크들을 사용하게 되면서 해당 프레임워크에 종속된 "무거운" 객체를 만들게 된 것에 반발해서 사용하게 된 용어이다.
  - 해당 용어는 이후 특정 자바 모델이나 기능, 프레임워크 등을 따르지 않은 자바 객체를 지칭하는 말로 사용되었고, 대표적으로 **스프링 프레임워크**가 POJO 방식의 프레임워크다.
  - 이상적으로는 자바 언어 사양 외에 어떠한 제한에도 묶이지 않은 자바 객체이므로, **미리 정의된 클래스의 확장**, **미리 정의된 인터페이스의 구현**, **미리 정의된 어노테이션을 포함**하는 행동을 해서는 안된다.
  - 하지만, 대부분 실제 정상 동작을 위해 미리 정의된 어노테이션의 사용을 요구한다.
    </div>
</details>

적은 연산만으로 빠르게 동작할 수 있는 완전한 해시 함수가 있더라도, 이를 `HashMap` 에서 사용할 수 있는 것은 아니다.
- `HashMap` 은 기본적으로 각 객체의 `hashCode()` 가 반환하는 값을 사용하고, 결과의 자료형은 `int` 다. 그리고 **32비트 정수 자료형으로는 완전 자료 해시 함수를 만들 수 없다.**
  - 논리적으로, 생성 가능한 객체의 수가 $2^{32}$보다 많을 수 있고
  - 모든 `HashMap` 객체에서 $O(1)$을 보장하기 위해 임의 접근이 가능하게 하려면 원소가 $2^{32}$인 배열을 모든 `HashMap` 이 가지고 있어야 하기 때문이다.

**따라서** `HashMap` 을 비롯한 많은 해시 함수를 이용하는 associate array 구현체에서는 메모리를 절약하기 위해 실제 해시 함수의 표현 정수 범위 $|N|$보다 작은 M개의 원소가 있는 배열만을 사용한다.
- 그리고 객체에 대한 해시 코드의 나머지 값을 해시 버킷 인덱스 값으로 사용한다.

```java
int index = X.hashCode() % M;
```

이러한 방식은, 서로 다른 해시 코드를 가지는 **서로 다른 객체**가 1/M의 확률로 **같은 해시 버킷을 사용**하게 된다.
- 이는 또 다른 종류의 해시 충돌이고, 이를 해결하기 위해 키-값 쌍 데이터를 잘 저장하고 조회할 수 있게 하는 방식은 아래 2가지가 있다. 아래 두 방식에 대한 설명은 [POST](https://subbblog.netlify.app/[Algorithm]HashTable/)에서 확인할 수 있다.
  - Open Addressing
  - Separate Chaining

### 🪚 Java 8 HashMap에서의 Separate Chaining
Java `HashMap` 에서 사용하는 방식은 Separate Chaining이다. 그리고 위에서 언급했듯, `HashMap` 은 지속적으로 개선되고 있다.
- Java 2 ~ 7까지는 코드는 달라도 구현 알고리즘 자체는 같았고, 해시 함수의 값이 균등 분포 상태이라는 가정 하에, `get()` 의 호출 기댓값은 $E(\frac{N}{M})$ 이다.
- 하지만 Java 8에서는 이전까지 사용했던 **연결 리스트 방식에서 트리 방식으로 변경**하여, 호출 기댓값이 $E(log\frac{N}{M})$ 을 보장하여 성능상의 이점이 있다.

> 연결 리스트를 사용할 것인가, 트리를 사용할 것인가를 결정하는 요인은 하나의 해시 버킷에 할당된 키-값 쌍의 개수이고, 이 또한 [POST](https://subbblog.netlify.app/[Algorithm]HashTable/)에서 다루었다.

Java 8 `HashMap` 은 `Entry` 클래스 대신 `Node` 클래스를 사용한다. 이 클래스에는 Java 7 `HashMap` 과 달리 트리를 사용할 수 있도록 하위 클래스에 `TreeNode` 를 포함하고 있다.
- 이때 `Red-Black Tree` 를 사용하고, 트리 순회 시 사용하는 대소 판단 기준은 **해시 함수 값**이다.

### 🪚 해시 버킷 동적 확장
해시 버킷의 개수가 적다면, 메모리 사용을 아낄 수 있지만 해시 충돌로 인해 성능상 손실이 발생한다.
- 따라서 `HashMap` 은 일정 개수 이상의 데이터가 있다면, 해시 버킷의 개수를 **2배로 늘린다.**
- 해시 버킷의 개수를 늘림으로써, 값도 작아져 해시 충돌로 인한 성능 손실 문제를 어느 정도 해결할 수 있다.

해시 버킷의 개수의 기본값은 `16` 이고, 임계점에 이를 때마다 두 배씩 증가시킨다.
- 버킷의 최대 개수는 $2^{30}$개다.
- 임계점은 **현재의 데이터 개수가 "load factor * 현재의 해시 버킷 개수"에 이를 때**이다. (`load factor` 는 0.75, 즉 3/4이다.)

하지만 두 배로 증가할 때마다, 모든 키-값 쌍을 읽어 새로운 Separate Chaining을 구성해야 하는 문제가 발생한다.
- `HashMap` 생성자의 인자로 초기 해시 버킷 개수를 지정할 수 있으므로, 해당 `HashMap` 객체에 저장될 데이터의 개수가 어느 정도인지 예측 가능한 경우에는 이를 생성자의 인자로 지정하면 불필요한 Separate Chaining의 재구성을 피할 수 있다.

또다른 문제로, 해시 버킷의 개수 m이 $2^a$ 형태가 되기에, `index = X.hashCode() % M` 계산 시 `X.hashCode()` 의 하위 a개의 비트만 사용하게 된다.
- 즉 해시 함수가 32비트 영역을 고르게 사용하도록 만들었더라도 해시 값을 2의 승수로 나누면 해시 충돌이 쉽게 발생할 수 있다. 

> 따라서 **보조 해시 함수**가 필요하다.

### 🪚 보조 해시 함수
`index = X.hashCode() % M` 계산 시에는 M이 소수일 때 `index` 값의 분포가 가장 균등할 수 있다.
- 하지만 소수가 아니기 때문에 별도의 보조 해시 함수를 사용하여 균등 분포를 돕는다.

보조 해시 함수의 목적은 **'키'의 해시 값을 변형하여, 해시 충돌 가능성을 줄이는 것**이다.
- Java 5 ~ 7까지는 동일한 방식의 보조 해시 함수를 사용했는데, **Java 8부터는 좀 더 단순한 형태로 변경**되었다.
- 단순하게 상위 16비트 값을 XOR 연산하는 방식으로 변경되었는데, 아래 2가지 이유가 있다.
  - Java 8에서는 해시 충돌이 많이 발생하면 연결 리스트 대신 트리를 사용함으로써 성능 문제를 많이 완화했기 때문이다.
  - 최근의 해시 함수는 균등 분포를 잘 만드는 경향이 있어 보조 해시 함수의 효과가 크지 않기 때문이다.

### 🪚 String 객체에 대한 해시 함수
String 객체에 대한 해시 함수 수행 시간은 문자열 길이에 비례한다. 
- JDK 1.1에서는 더 빠른 해시 함수 수행을 위해 **일정 간격의 문자에 대한 해시를 누적한 값**을 String에 대한 해시 함수로 사용했다.

하지만 이러한 방식은 다음과 같은 문제를 야기했다.
- 웹상의 URL은 길이가 수십 글자에 이르면서 앞 부분은 동일하게 구성되는 경우가 많다.
- 이 경우 서로 다른 URL의 해시 값이 같아지는 빈도가 매우 높아질 수 있다.

> 따라서 Horner's method를 구현한 방식을 사용하고 있다.

String 객체 해시 함수에서 31을 사용하는데, 
- 31은 소수이며, 어떤 수에 31을 곱하는 것은 빠르게 계산할 수 있다.
  - `31N = 32N - N = (N << 5) - N`
- 즉, 성능 향상을 도모한다!

## 📕 참고
- [Java HashMap은 어떻게 동작하는가?](https://d2.naver.com/helloworld/831311)
- [Plain Old Java Object](https://ko.wikipedia.org/wiki/Plain_Old_Java_Object)
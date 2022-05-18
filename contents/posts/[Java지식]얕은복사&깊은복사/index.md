---
title: "📃 얕은 복사와 깊은 복사"
description: "java 지식"
date: 2022-03-19
update: 2022-03-19
tags:
  - Java
series: "📃 Java 지식"
---

이전에 [BOJ_연구소](https://subbblog.netlify.app/BOJ-14502/)를 풀다가, 배열 두 개를 사용하여 값을 변경하고 초기화하는 작업을 하던 중 의도와 다르게 두 배열의 값이 동기화된 것처럼 같이 변경되는 문제를 확인했다. 

그래서 **"얕은 복사와 깊은 복사"**에 대해 정리하려 한다. 내가 맞닥뜨린 문제이므로 정리하고 이해하고 넘어가고자 한다.

## 📍 자바의 객체 복사
자바에서는 객체를 복사하는 유형으로 **얕은 복사**와 **깊은 복사**가 있다.

### 📝 얕은 복사 (Shallow Copy)
단순히 객체의 주소 값만을 복사하는 방식이다.
- **여러 객체가 같은 주소를 참조**해 하나의 값을 변경하면 다른 대상의 값 또한 바뀐다.
  - 즉, 객체는 여러 개이지만,그 객체 각각이 가리키는 값은 동일한 주소 값이다. 그렇기에 대개 복사가 아닌 **같이 사용한다-**정도의 개념이 알맞다.
- 메모리 측면에서는 한 객체로 가능하다면 이 방식을 사용하는 것이 효율적이다.

### 📝 깊은 복사 (Deep Copy)
객체의 실제값을 새로운 객체로 복사하는 방식이다.
- 실제로 대상이 여러 개가 생기므로, **각 값이 모두 개별적**이다.
- 하지만 쓸데없이 여러 객체를 생성한다면 메모리 측면에서는 효율적이지 못하다.

> 우선 내가 원한 로직은 `copyMap` 의 값을 변경하고 이를 다시 되돌리기 위해 `map` 을 이용하려 했다. 얕은 복사와 깊은 복사를 내가 풀었던 코드에 대입하여 표현하면 아래와 같다.

```java
class Lab {
	int[][] map;
	int[][] copyMap;

	public Lab (int N, int M) {
		map = new int[N][M];
		copyMap = new int[N][M];
	}
}
```
- `Lab` 클래스를 생성하고, 두 배열(`map` , `copyMap`)을 생성한다. 

```java
public class Main {
	public static void main(String[] args) {
		// N, M이 입력되었다고 가정
		int N, M;

		// 생성자로 map, copyMap을 생성
		Lab lab = new Lab(N, M);

		// lab.map에 먼저 값을 대입하고, 이를 copyMap에 동일하게 대입
		for (int i = 0; i < N; i++) {
			lab.map[i] = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
			// 얕은 복사
			lab.copyMap[i] = lab.map[i];
		}
	}
}
```
- 이후 배열을 초기화하는데, `=` 연산자를 사용해서 `copyMap` 을 초기화했다.

여기서 `=` 연산자는 **주소를 이어준다**는 의미를 가진다. 즉, `lab.copyMap[i]` 와 `lab.map[i]` 의 주소를 이어, 깊은 복사가 아닌 얕은 복사가 수행되고 두 배열의 값이 함께 수정되어버린다.

> 이를 깊은 복사로 변경한다. 깊은 복사는 여러 가지 방법이 있다. 나는 우선 간단한 for문으로 깊은 복사를 수행했다.

```java
public class Main {
	public static void main(String[] args) {
		// N, M이 입력되었다고 가정
		int N, M;

		// 생성자로 map, copyMap을 생성
		Lab lab = new Lab(N, M);

		// lab.map에 먼저 값을 대입하고, 이를 copyMap에 동일하게 대입
		for (int i = 0; i < N; i++) {
			lab.map[i] = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
			// 깊은 복사
			for (int j = 0; j < M; j++) {
				lab.copyMap[i][j] = lab.map[i][j];
			}
		}
	}
}
```
- 간단한 반복문으로 배열의 원소를 하나하나 대입하였다.

### 📝 깊은 복사 메소드
아래는 모두 1차원 배열에 대해 가능한 깊은 복사 메소드이다. 2차원 배열에 대해서는 이와 같이 불가능한데, 다음과 같은 이유에서이다.
- 2차원 배열의 구조(`map[x][y]`)에서 배열을 복사하는 메소드를 사용하면, `y` 좌표를 가리키는 주소값만 있는 `map[x]` 부분만 깊은 복사가 되고, 값이 있는 `map[x][y]` 는 깊은 복사가 수행되지 않는다.
- 따라서, 이중 for문을 활용하거나, 가장 마지막에 있는 `System.arraycopy` 를 활용해야 한다.

**`Object.clone()`**
```java
public class Main {
	public static void main(String[] args) {
		int[] map = { 0, 1, 2, 3 };
		int[] copyMap = map.clone(); 
	}
}
```
- 가장 보편적인 깊은 복사 방법이다.

**`Arrays.copyOf()`**
```java
import java.util.Arrays;

public class Main {
	public static void main(String[] args) {
		int[] map = { 0, 1, 2, 3 };
		int[] copyMap = Arrays.copyOf(map, map.length);
	}
}
```
- `Arrays` 클래스는 배열을 다루는 메소드를 가진 클래스이다. 이 클래스의 `copyOf()` 를 사용하면 배열의 시작점부터 원하는 `length` 까지 깊은 복사를 수행할 수 있다.

**`Arrays.copyOfRange()`**
```java
import java.util.Arrays;

public class Main {
	public static void main(String[] args) {
		int[] map = { 0, 1, 2, 3 };
		int[] copyMap = Arrays.copyOfRange(map, 1, 3);
	}
}
```
- `Arrays.copyOf()` 는 배열의 시작점부터 원하는 `length` 까지 복사하는 메소드였다면, `copyOfRange()` 는 복사할 시작점 또한 지정 가능하다. (0행부터 시작)

**`System.arraycopy()`**
```java
public class Main {
	public static void main(String[] args) {
		int[] map = { 0, 1, 2, 3 };
		int[] copyMap = new int[map.length];
		System.arraycopy(map, 0, copyMap, 0, map.length);
	}
}
```
- 1차원 배열에 대해 지정한 배열을 대상 배열의 지정한 위치에 `length` 만큼 복사한다.

```java
public class Main {
	public static void main(String[] args) {
		// N, M이 입력되었다고 가정
		int N, M;

		// 생성자로 map, copyMap을 생성
		Lab lab = new Lab(N, M);

		// lab.map에 먼저 값을 대입하고, 이를 copyMap에 동일하게 대입
		for (int i = 0; i < N; i++) {
			lab.map[i] = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
			System.arraycopy(lab.map[i], 0, lab.copyMap[i], 0, lab.map[i].length);
		}
	}
}
```
- 2차원 배열에 대해 복사한다.

## 📕 참고
- [[Java] 자바 배열을 복사하는 다양한 방법 (깊은복사, 얕은복사)](https://coding-factory.tistory.com/548)
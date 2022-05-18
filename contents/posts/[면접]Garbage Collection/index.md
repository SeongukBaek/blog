---
title: "💬 Garbage Collection"
description: "개발 상식"
date: 2022-04-25
update: 2022-04-25
tags:
  - 개발상식
  - Java
  - GC
series: "💬 면접"
---

## 🧷 들어가며
C/C++ 프로그래밍 시에는 메모리 누수(Memory Leak)발생를 위해 사용하지 않는 객체의 메모리를 개발자가 직접 해제해야 했다. 하지만 Java에서는 JVM이 구성된 JRE를 제공하고, 그 구성 요소 중 하나인 **GC(Garbage Collection)이 자동으로 사용하지 않는 객체를 파괴**한다.

GC에 대해 알아보기 전에, **`stop-the-world`** 라는 용어를 먼저 알아야 한다. 이는 GC의 동작을 위해 **JVM이 애플리케이션 실행을 멈추는 것**이다. 어떤 GC 알고리즘을 사용하더라도 `stop-the-world` 는 발생하고, 대개 이 시간을 줄이는 방향으로 GC 튜닝이 이루어진다.

또한 GC를 해도 더 이상 사용 가능한 메모리 영역이 없는 경우가 있다. 이때 메모리 할당을 요구하면, **`OutOfMemoryError`** 가 발생하여 WAS(Web Application Server)가 다운될 수 있다. 이를 행(Hang) 즉, **서버가 요청을 처리 못하고 있는 상태**라고 한다.

---

## 🧷 Garbage Collection
Java는 개발자가 직접 메모리 해제를 명시적으로 하지 않아도 된다. 이는 Java의 장점 중 하나라고 할 수 있다. 
- 사용하지 않는 객체를 메모리에서 제거하는 작업을 GC(Garbage Collection)라고 하며, 이는 JVM(Java Virtual Machine)에서 수행한다.

기본적으로 JVM의 메모리는 **5개의 영역**으로 나누어지고, **GC는 Heap 메모리 영역만을 다룬다.**
- Class
- Stack
- Heap
- Native method
- PC

그리고 사용하지 않는 객체의 조건은 다음과 같다. 즉, 아래의 조건을 충족한다면 GC의 대상이 된다.
- 객체가 `NULL` 인 경우 (ex. `String str = null`)
- 블럭 실행 종료 후, 블럭 안에서 생성된 객체
- 부모 객체가 `NULL` 인 경우, 포함하는 자식 객체

---

## 🧷 GC의 메모리 해제 과정

### 1. Marking
<img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-001.png" width="50%">

- 프로세스는 마킹을 호출한다. 이는 메모리가 사용되는지 아닌지를 찾아낸다. 참조되는 객체는 파란색으로, 참조되지 않는 객체(Garbage)는 주황색으로 보여진다. 
- 모든 객체는 마킹 단계에서 참조 여부 확인을 위해 스캔된다. 따라서 매우 많은 시간이 소모된다.

### 2. Normal Deletion
<img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-002.png" width="50%">

- 참조되지 않는 객체를 제거하고, 메모리를 반환한다. **Memory Allocator**는 반환되어 비어진 블록의 참조 위치를 저장해두었다가, 새로운 객체가 선언되면 그 위치에 할당한다.

### 3. Compacting
<img src="https://github.com/GimunLee/tech-refrigerator/raw/master/Language/JAVA/resources/java-gc-003.png" width="50%">

- 성능 향상을 위해, 참조되지 않는 객체를 제거하고 또한 남은 참조되어지는 객체들을 묶는다. 이들을 묶어 생기는 공간에 새로운 객체를 할당함으로써 더 쉽고 빠른 진행이 가능하다.

---

## 🧷 Generational GC 배경
위와 같이 모든 객체를 `Marking & Compacting` 하는 것은 너무 비효율적이다. 시간이 갈수록, 적은 객체만이 남는다.

가장 간단한 형태의 GC 알고리즘은 접근 가능한 모든 객체를 순회하는 것이다. 순회가 끝난 후 남아있는 객체를 쓰레기 객체로 판단해 메모리를 해제한다.
- 하지만 이 방식은 살아있는 객체의 수에 순회 시간이 비례하므로, 수많은 라이브 데이터를 관리하는 대규모 애플리케이션에서는 절대 사용해선 안되는 방식이다.
- GC는 쓰레기 객체를 처리하는 데 필요한 작업량을 최소화하기 위해 **약한 세대 가설**을 사용한다. 이는 객체 대부분이 아주 짧은 시간동안만 살아남는다는 가설이다.

> GC는 **Weak Generation Hypothesis**(약한 세대 가설)에 기반한다.

### 🗝 Weak Generation Hypothesis
```
                      <---- Tenured(Old) ---->
+----------+----+----+-----------+------------+---------------------+
|   Eden   | S0 | S1 |           |   Virtual  |      Permanent      |
+----------+----+----+-----------+------------+---------------------+
<------ Young ------>                          <---- Permanent ---->

S: Survivor
```

JVM의 메모리는 아래와 같은 Generation 구조를 가진다. 각 세대가 모두 채워질 때 GC가 발생한다.
- 대부분의 객체는 `Young generation` 에서 할당되고, 죽게 된다.
- 해당 Generation이 가득 차면 `Young generation` 만을 대상으로 하는 **Minor Collection**이 발생한다. 이때, 다른 세대의 Garbage는 처리되지 않는다.
  - 즉, "**Minor Collection**은 **약한 세대 가설**을 전제로 최적화"된 것이다.
  - 컬렉션의 비용은 수집되는 살아있는 객체의 수에 비례하므로, 죽은 객체들로만 가득찬 `Young generation` 은 매우 빠르게 수집되기 때문이다.
- `Young generation` 에서 살아남은 객체들 중 일부는 각각의 **Minor Collection** 동안 점점 오른쪽으로 이동하여 `Tenured generation` 으로 옮겨진다.
- `Tenured generation` 도 가득 차게 되면, 컬렉션의 대상이 되어 Heap 전체를 수집하는 **Major Collection**이 발생한다.
  - **Major Collection**은 **Minor Collection**보다 더 많은 객체가 관련되어 있어 오래 걸린다.
  - 시간이 오래 걸리고, 실행 중인 프로세스가 정지된다. 이를 `stop-the-world` 라고 한다.
  - GC를 실행하는 스레드를 제외한 나머지 모든 스레드는 작업을 멈추고 대기했다가, GC 작업이 완료된 이후 작업을 재개한다.
- `Permanent` 영역은 **Method Area**라고도 한다. 
  - JVM이 클래스들과 메소드들을 설명하기 위해 필요한 메타데이터들을 포함하고 있다.

### 🗝 GC가 소멸시킬 객체를 선정하는 방식
알고리즘에 따라 동작 방식이 다양하지만 아래와 같은 공통적인 원리가 있다.
- 객체가 Garbage인지 아닌지 판단하기 위해 **reachability**라는 개념을 사용한다.
  - 어떤 힙 영역에 할당된 객체가 유효한 참조가 있으면 **reachability**, 없다면 **unreachability**로 판단한다. (여기서 유효한 참조란, 바로 밑에서 설명할 `Root Set` 과의 참조 관계를 가지는 참조이다.)
- 하나의 객체는 다른 객체를 참조하고, 이것이 반복되어 **참조 사슬**이 형성될 수 있다.
  - 이 참조 사슬 중 최초에 참조한 것을 `Root Set` 이라 한다.
  - 힙 영역에 있는 객체들은 아래 4가지 경우에 대한 참조를 하게 된다.

1. 힙 내의 다른 객체에 의한 참조
2. Java 스택, 즉 Java 메소드 실행 시 사용하는 지역변수와 파라미터들에 의한 참조
3. 네이티브 스택(Java Native Interface)에 의해 생성된 객체에 대한 참조
4. 메소드 영역의 정적 변수에 의한 참조

여기서 2,3,4는 **Root Set**이다. 즉, 참조 사슬 중 최초에 참조한 객체이다.
- 1의 경우는 힙 내에서 자기들끼리 서로 참조하고 있어 Unreachable Objects, 즉 **Garbage**이다.

### 🗝 Generational GC 과정
1. 어떤 새로운 객체가 들어오면 `Eden Space` 에 할당한다.
2. `Eden Space` 가 가득 차면, **Minor GC**가 시작된다.
3. 참조되는 객체들은 첫 번째 `Survivor` 인 `S0` 로 이동하고, 참조되지 않는 객체들은 `Eden Space` 가 **Clear**될 때 반환된다.
4. 다음 **Minor GC** 때도 동일한 작업이 반복되는데, 이때는 참조되는 객체들은 두 번째 `Survivor` 인 `S1` 로 이동한다. 또한, 최근 **Minor GC**에서 `S0` 로 이동한 객체들도 **age**가 증가하고, `S1` 로 이동한다.
   1. 모든 살아남은 객체들이 `S1` 로 이동하게 되면, `S0` 과 `Eden Space` 는 **Clear** 된다.
   2. 이제 다른 **aged 객체들**은 `S1` 공간에 존재하게 된다.
5. 다음 **Minor GC** 때 같은 과정이 반복된다. 그러나 이번 반복에서는 `Survivor` 들이 **switch**된다.
   1. 참조되는 객체들은 결과적으로 `S0` 로 이동하고, `Eden Space` 와 `S1` 는 **clear**된다.
6. **Minor GC** 이후, 객체들이 일정한 **age threshold**를 넘게 되면, `Young generation` 에서 `Old generation` 으로 **Promotion**한다.
7. `Old generation` 또한, 점점 채워져 가득차게 되면, **Major GC**가 시행되어 `Old generation` 은 **Clear**되고, 공간이 **Compact**된다.

---

## 📕 참고
- [Garbage Collection](https://gyoogle.dev/blog/computer-language/Java/Garbage%20Collection.html)
- [JVM 메모리 구조와 GC](https://johngrib.github.io/wiki/jvm-memory/#generation-%EA%B5%AC%EC%A1%B0-%EC%9A%94%EC%95%BD)
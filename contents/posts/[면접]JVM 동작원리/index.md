---
title: "💬 JVM 동작원리"
description: "개발 상식"
date: 2022-03-30
update: 2022-03-30
tags:
  - 개발상식
  - Java
  - JVM
series: "💬 면접"
---

## 🧷 자바 코드의 실행과정
먼저, 아래의 그림으로 자바 코드가 JVM에 전달되는 과정을 살펴볼 수 있다.
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99A840415B739DF119" width="80%">
1. 작성한 자바 코드 파일(`.java`)을 자바 컴파일러(`javac`)가 자바 바이트 코드(`.class`)로 컴파일한다.
2. 컴파일된 코드를 JVM의 클래스 로더(Class Loader)에 전달한다.
3. 클래스 로더는 동적 로딩을 통해 필요한 클래스들을 로딩 및 링크하여 런타임 데이터 영역 즉, JVM의 메모리에 올린다.
4. 실행 엔진(Execution Engine)은 JVM 메모리에 올라온 바이트 코드들을 명령어 단위로 실행한다.

## 🧷 JVM이란
Java Virtual Machine의 약자인 JVM은 자바 가상 머신이다.
- 다르게 말하면, 컴파일된 코드(바이트 코드)를 실행하는 가상의 컴퓨터라고 할 수 있다.
- 자바와 운영체제 사이에서 중개자 역할을 수행하여 운영체제에 구애받지 않고 프로그램을 실행할 수 있도록 돕는다. 
  - **플랫폼 독립성**을 보장한다.
  - > **플랫폼 독립성**이란?
    > - 자바의 실행 파일(`.class`)는 특정 플랫폼만 이해할 수 있는 기계어의 집합이다.
    > - 각 플랫폼마다의 JVM을 설치하여, 하나의 프로그램이 모든 플랫폼에서 동작할 수 있게 한다.
- 가비지 컬렉터를 사용한 메모리 관리를 수행한다.
- 레지스터 기반이 아닌 스택 기반으로 동작한다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F990BF73B5B73A02817" width="80%">
- JRE : Java Runtime Environment의 약자로, 자바를 이용해 프로그램을 개발하는데 필요한 도구를 모아 둔 집합인 JDK(Java Development Kit)를 사용해 완성된 자바 프로그램을 실행시키는데 필요한 환경이다. 

### 🗝 클래스 로더
자바 클래스들은 메모리에 한 번에 로드되지 않고, 필요할 때에 애플리케이션에 의해 로드된다. 이때, JRE의 일부인 클래스 로더는 자바 클래스들을 동적으로 JVM의 메모리에 로드한다.

**📌 클래스 로더의 타입**
모든 자바 클래스들이 하나의 클래스 로더에 의해 로드되는 것은 아니다. **클래스 로더의 타입에 따라 특정 자바 클래스들을 로드**한다.<br/>
또한, 모든 자바 클래스들은 그들의 클래스명에 의해 로드되고, 없는 경우에는 `NoClassDefFoundError` 또는 `ClassNotFoundException` 를 반환한다.

> 클래스를 로드하는 클래스 로더를 확인하기 위해서는 `getClassLoader()` 메소드를 사용할 수 있다.

자바 클래스 로더의 타입은 아래 3가지가 있다.
1. Bootstrap Class Loader
      - JVM 시작 시 최초로 실행되는 클래스 로더다. 
      - 자바 클래스를 로드하는 것이 아닌 자바 클래스들을 로드할 수 있는 자바 자체의 클래스 로더와 최소한의 자바 클래스(자바 런타임 코어 클래스)만을 로드한다.
      - 상위 클래스 로더가 없기에, Primodial ClassLoader라고도 한다.
2. Extension Class Loader
      - Bootstrap Class Loader의 자식 클래스 로더로서, 확장 자바 클래스들을 로드한다. 
      - `jre/lib/ext` 디렉토리나, `java.ext.dirs` 환경변수에 설정된 디렉토리로부터 클래스들을 로드한다.
3. System Class Loader
      - Application Class Loader라고도 한다.
      - 자바 프로그램 실행 시 지정한 CLASSPATH에 있는 클래스 파일 또는 Jar에 속한 클래스들을 로드한다.
      - Extension Class Loader의 자식 클래스이다.

**📌 클래스 로더의 원칙**<br/>
아래는 자바 클래스 로더들의 동작 구조를 보여준다. 클래스 로더는 지켜야 할 **3가지 원칙**이 있다.
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99B467465B73D15111" width="80%">

**📌 Delegation Principle (위임 법칙)**
- JVM과 자바 클래스 로더들은 **Delegation Hierarchy Algorithm**라는 알고리즘을 사용해서 자바 클래스를 자바 파일에 로드한다.
- 위임 법칙은 **클래스 로딩이 필요한 경우 부모 클래스로더 방향으로 클래스 로딩을 위임**하는 것이다.
  - 새로운 클래스를 로드해야할 때, 다음 방식으로 수행한다.
  1. JVM의 Method area에 클래스가 로드되어 있는지 확인하고, 로드되어 있다면 해당 클래스를 사용한다. 그렇지 않다면 Application Class Loader에 클래스 로드를 요청한다.
  2. Application Class Loader는 Extension Class Loader에 클래스 로드를 요청한다.
  3. Extension Class Loader는 Bootstrap Class Loader에 클래스 로드를 요청한다.
  4. Bootstrap Class Loader는 Bootstrap CLASSPATH(JDK, JRE, LIB)에 해당 클래스가 있는지 확인한다. 클래스가 존재하지 않는 경우, Extension Class Loader가 요청을 수행하도록 한다.
  5. Extension Class Loader 또한 Extension CLASSPATH(JDK, JRE, LIB, EXT)를 확인하고, 존재하지 않는 경우, Application Class Loader가 요청을 수행하도록 한다.
  6. Application Class Loader 또한 Application CLASSPATH를 확인하고 존재하지 않는 경우, `ClassNotFoundException` 을 발생시킨다.
  <img src="https://media.geeksforgeeks.org/wp-content/uploads/20190417144207/java_classloader-1024x311.png" width="80%">

  > 중요한 것은 Bootstrap Class Loader까지 요청하는 와중에 해당 클래스를 발견하더라도, Bootstrap Class Loader까지 이동한 후에 Bootstrap Class Loader에 해당 클래스가 있다면 Bootstrap Class Loader에 있는 클래스를 로드한다는 점이다.

**📌 Visibility Principle (가시범위 원칙)**
- 하위 클래스 로더는 상위 클래스 로더가 로드한 클래스를 확인할 수 있지만, 반대로는 불가능하다는 원칙이다.
- `java.lang.Object` 클래스 등 상위 클래스 로더에서 로드한 클래스도 하위 클래스 로더에서 사용할 수 있는 것이다. 

**📌 Uniqueness Property (유일성 원칙)**<br/>
- 하위 클래스 로더가 상위 클래스 로더에서 로드한 클래스를 다시 로드하지 않아야 한다는 원칙이다.
- JVM에 동일한 클래스가 2개 이상 로드되는 상황을 방지하기 위해 필요하다.

**📌 언로드 불가**<br/>
- 클래스 로더는 클래스를 로드하는 것은 가능하지만, 언로드하는 것은 불가능하다.

**📌 Name space (이름 공간)**<br/>
- 각 클래스 로더들이 가지고 있는 공간으로, 로드된 클래스를 보관하는 공간이다.
- 클래스를 로드할 때 위임 법칙을 통해 상위 클래스 로더를 확인하는데, 그때 확인하는 공간이다.
- Name space가 다르면, 서로 다른 클래스로 간주한다.

### 🗝 런타임 데이터 영역
JVM이 OS 위에서 실행되면서 할당받는 메모리 영역이다. 크게 5가지, 세분화하면 6가지로 나눌 수 있다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99B467465B73D15111" width="60%">

**📌 PC Register**<br/>
현재 수행 중인 명령의 주소를 가지며 스레드가 시작될 때 생성되며 각 스레드마다 하나씩 존재한다.

**📌 JVM Stack**<br/>
스택 프레임이라는 구조체를 저장하는 스택이다. 
- 예외 발생 시 `printStackTrace()` 메소드로 출력하는 Stack Trace의 각 라인 하나가 스택 프레임을 표현한다. 
- 스레드가 시작될 때 생성되며 각 스레드마다 하나씩 존재한다.

**📌 Native Method Stack**<br/>
JAVA 외의 언어로 작성된 Native 코드를 위한 스택이다. 
- JNI(Java Native Interface)를 통해 호출하는 코드를 수행하기 위한 스택으로, 언어에 맞게 스택이 생성된다.
- 스레드가 시작될 때 생성되며 각 스레드마다 하나씩 존재한다.

**📌 Heap**<br/>
인스턴스 또는 객체를 저장하는 공간으로, Garbage Collection의 대상이다.
- 모든 스레드가 공유하는 공간이다.

**📌 Method Area**<br/>
JVM이 시작될 때 생성되는 공간으로, JVM이 읽어들인 각각의 클래스와 인터페이스에 대한 Runtime Constant Pool, 필드와 메소드에 대한 정보, Static 변수, 메소드의 바이트 코드 등을 보관한다.
- 모든 스레드가 공유하는 공간이다.

**📌 Runtime Constant Pool**<br/>
JVM 동작에서 가장 핵심적인 역할을 수행하는 공간으로, 각 클래스와 인터페이스의 상수 뿐만 아니라 메소드와 필드에 대한 모든 레퍼런스까지 담고 있는 테이블이다.
- 어떤 필드나 메소드를 참조할 때, JVM은 이를 참고하여 참조한다.

### 🗝 실행 엔진
클래스 로더를 통해 런타임 데이터 영역에 배치된 바이트 코드를 명령어 단위로 읽어서 실행한다. 

> 바이트 코드의 각 명령어는 1바이트 크기의 Operation Code와 추가 피연산자로 이뤄져 있다. 

실행 엔진은 하나의 Operation Code를 가져와 피연산자와 작업을 수행한 다음, 그 다음 Operation Code를 수행하는 방식으로 동작한다. 이 수행 과정에서 실행 엔진은 바이트 코드를 기계가 실행할 수 있는 형태로 변환하는데, 다음 두 가지 방식으로 변경한다.
- **인터프리터** : 바이트 코드 명령어를 하나씩 읽어서 해석하고 실행한다. 하나하나의 실행은 빠르지만 전체적인 실행 속도는 느리다. 기본 동작 방식이다.
- **JIT(Just-In-Time) 컴파일러** : 인터프리터의 단점을 보완하기 위해 바이트 코드 전체를 컴파일하여 네이티브 코드로 변경하고 이후에는 해당 메소드를 더 이상 인터프리팅하지 않고 네이티브 코드로 직접 실행하는 방식이다. 따라서 전체적인 실행 속도는 인터프리터보다 빠르다.

## 🧷 JVM 메모리 구조

## 🧷 JVM 동작 원리

## 📕 참고
- [[JAVA] JVM 동작원리 및 기본개념](https://steady-snail.tistory.com/67)
- [JVM 메모리 구조란? (JAVA)](https://steady-coding.tistory.com/305)
- [자바의 클래스로더 알아보기](https://leeyh0216.github.io/posts/java_class_loader/)
- [클래스 로더](https://www.geeksforgeeks.org/classloader-in-java/)
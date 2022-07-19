---
title: "📟 5. 싱글톤 컨테이너"
description: "스프링 핵심 원리 - 기본편 강의 정리"
date: 2022-07-18
update: 2022-07-18
tags:
  - Java
  - SpringBoot
series: "📟 스프링 핵심 원리 - 기본편"
---

<em><strong>[스프링 핵심 원리 - 기본편](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)을 들으며 정리하는 POST입니다.</strong></em>

## 🎯 웹 애플리케이션과 싱글톤
대부분의 스프링 애플리케이션은 웹 애플리케이션이다. (물론 웹이 아닌 애플리케이션 개발도 얼마든지 개발 가능하다.)
- 웹 애플리케이션은 보통 여러 고객이 동시에 요청을 한다.

<img src="../../images/스프링핵심원리-기본편/클라이언트와DI컨테이너.png" width="80%">

- 새로운 클라이언트가 요청할 때마다 인스턴스를 새로 생성하여 반환한다. 
- 따라서, 매 요청마다 새로운 인스턴스를 생성하여 요청 수만큼 생성된다.

**스프링 없는 순수한 DI 컨테이너 테스트**
```java
package hello.core.singleton;

import hello.core.AppConfig;
import hello.core.member.MemberService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

public class SingletonTest {

    @Test
    @DisplayName("스프링 없는 순수한 DI 컨테이너")
    void pureContainer() {
        AppConfig appConfig = new AppConfig();

        // 1. 조회: 호출할 때마다 객체를 생성
        MemberService memberService1 = appConfig.memberService();

        // 2. 조회: 호출할 때마다 객체를 생성
        MemberService memberService2 = appConfig.memberService();

        // 참조값이 다른지 확인
        System.out.println("memberService1 = " + memberService1);
        System.out.println("memberService2 = " + memberService2);

        assertThat(memberService1).isNotSameAs(memberService2);
    }
} 
```

- 이전에 만든 스프링 없는 순수한 DI 컨테이너인 `AppConfig` 는 요청마다 객체를 새로 생성한다.
- 고객 트래픽이 초당 100이라고 가정하면, 초당 100개의 객체를 생성하고 소멸한다. 이는 심각한 메모리 낭비를 초래한다.

> 이에 대한 해결방안으로 **해당 객체가 딱 1개만 생성되고, 이를 공유하도록 설계한다. -> 싱글톤 패턴**

---

## 🎯 싱글톤 패턴
**클래스의 인스턴스가 딱 1개만 생성되는 것을 보장하는 디자인 패턴**이다.
- 객체 인스턴스를 2개 이상 생성하지 못하도록 막아야 한다!
  - `private` 생성자를 이용해 외부에서 임의로 `new` 키워드를 사용하지 못하도록 막아야 한다.

```java
package hello.core.singleton;

public class SingletonService {

    // 자기 자신을 내부에 private으로 가짐
    // 이때 static으로 가지기에 클래스 레벨에 딱 1개만 생성된다.
    private static final SingletonService instance = new SingletonService();

    public static SingletonService getInstance() {
        // 내부적으로 new SingletonService를 실행해 참조값을 넣어놓은 instance를 반환
        return instance;
    }
}
```
- 위와 같이 `getInstance()` 를 통해 생성해놓은 `SingletonService` 를 반환받을 수 있도록 구현한다.
- 하지만 외부에서 임의로 `new SingletonService()` 를 호출한다면, 여러 개의 인스턴스를 생성하게 된다.

```java
package hello.core.singleton;

public class SingletonService {

    // 자기 자신을 내부에 private으로 가짐
    // 이때 static으로 가지기에 클래스 레벨에 딱 1개만 생성된다.
    private static final SingletonService instance = new SingletonService();

    public static SingletonService getInstance() {
        // 내부적으로 new SingletonService를 실행해 참조값을 넣어놓은 instance를 반환
        return instance;
    }

    private SingletonService() {

    }

    public void logic() {
        System.out.println("싱글톤 객체 로직 호출");
    }
}
```

1. `static` 영역에 객체 `instance` 를 미리 하나 생성해 올려둔다.
2. 이 객체 인스턴스가 필요하면 오직 `getInstance()` 메소드를 통해서만 조회할 수 있다. 이 메소드는 항상 같은 인스턴스를 반환한다.
3. 딱 1개의 객체 인스턴스만 존재해야 하므로, 생성자를 `private` 으로 막아 혹시라도 외부에서 `new` 키워드로 객체 인스턴스가 생성되는 것을 막는다.

**싱글톤 패턴을 사용하는 테스트 코드**
```java
@Test
@DisplayName("싱글톤 패턴을 적용한 객체 사용")
void singletonServiceTest() {
    SingletonService singletonService1 = SingletonService.getInstance();
    SingletonService singletonService2 = SingletonService.getInstance();

    System.out.println("singletonService1 = " + singletonService1);
    System.out.println("singletonService2 = " + singletonService2);

    assertThat(singletonService1).isSameAs(singletonService2);
    // same ==
    // equal 
}
```

- `private` 으로 `new` 키워드를 막아두었다.
- **호출마다 같은 객체 인스턴스를 반환**하는 것을 확인할 수 있다.

> 싱글톤 패턴을 구현하는 방법은 매우 많다. 여기서는 객체를 미리 생성해두는 가장 단순하고 안전한 방법을 구현했다.

이미 만들어진 객체를 공유해서 효율적으로 사용할 수 있지만, **싱글톤 패턴은 다음과 같은 문제점들**을 가지고 있다.
- 싱글톤 패턴을 구현하는 코드 자체가 많이 들어간다.
- 의존관계상 클라이언트가 구체 클래스에 의존한다. -> DIP 위반!!!
- 클라이언트가 구체 클래스에 의존해서 OCP 원칙을 위반할 가능성이 높다.
- 테스트가 어렵다.
- 내부 속성을 변경하거나 초기화하기 어렵다.
- `private` 생성자로 인해 자식 클래스를 만들기 어렵다.
- 결론적으로 유연성이 떨어진다. (DI의 적용을 어렵게 함)
- 안티 패턴으로 불리기도 한다.

---

## 🎯 싱글톤 컨테이너

---

## 🎯 싱글톤 방식의 주의점

---

## 🎯 @Configuration과 싱글톤=

---

## 🎯 @Configuration과 바이트코드 조작의 마법


## 📌 중요한 개념
싱글톤 패턴,

## 📕 참고
- [스프링 핵심 원리 - 기본편](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)
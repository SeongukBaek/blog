---
title: "📟 7. 의존관계 자동 주입"
description: "스프링 핵심 원리 - 기본편 강의 정리"
date: 2022-07-24
update: 2022-07-24
tags:
  - Java
  - SpringBoot
series: "📟 스프링 핵심 원리 - 기본편"
---

<em><strong>[스프링 핵심 원리 - 기본편](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)을 들으며 정리하는 POST입니다.</strong></em>

## 🎯 다양한 의존관계 주입 방법
의존관계 주입은 크게 4가지 방법이 있다.
- 생성자 주입
- 수정자 주입 (setter 주입)
- 필드 주입
- 일반 메소드 주입

### 🪔 생성자 주입
이름 그대로 생성자를 통해 의존 관계를 주입 받는 방법이다. (지금까지 했던 방법!)

**특징**
- 생성자 호출 시점에 딱 1번만 호출되는 것이 보장된다.
- **불변, 필수 의존관계**에 사용한다.

```java
@Component
public class OrderServiceImpl implements OrderService {

    private final MemberRepository memberRepository;
    private final DiscountPolicy discountPolicy;

    @Autowired
    public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }
}
```

- `@Component` 어노테이션으로 인해 컴포넌트 스캔되어 스프링 빈에 등록이 될 때, 생성자를 호출한다.
- 이때, `@Autowired` 어노테이션으로 인해 `MemberRepository` 와 `DiscountPolicy` 빈을 컨테이너에서 꺼내 의존관계를 주입해준다.

> **생성자가 딱 1개**만 있으면, `@Autowired` 를 생략해도 자동 주입된다. (스프링 빈에만 해당)

### 🪔 수정자 주입(setter 주입) 
setter라 불리는 필드의 값을 변경하는 수정자 메소드를 통해서 의존관계를 주입하는 방법이다.

**특징**
- **선택, 변경 가능성이 있는 의존관계**에 사용한다.
- 자바 빈 프로퍼티 규약의 수정자 메소드 방식을 사용하는 방법이다.

```java
@Component
public class OrderServiceImpl implements OrderService {
    private MemberRepository memberRepository;
    private DiscountPolicy discountPolicy;

    @Autowired
    public void setMemberRepository(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
    @Autowired
    public void setDiscountPolicy(DiscountPolicy discountPolicy) {
        this.discountPolicy = discountPolicy;
    }
}
```

- setter에 `@Autowired` 를 붙여 호출하게 한다.

> `@Autowired` 의 기본 동작은 주입할 대상이 없으면 오류가 발생한다. 주입할 대상이 없어도 동작하게 하려면 `@Autowired(required = false)` 로 지정하면 된다.

> **자바 빈 프로퍼티**
> - 자바에서는 과거부터 필드의 값을 직접 변경하지 않고, setter & getter 메소드를 통해 값을 읽거나 수정하는 규칙을 만들었다. 이것이 **자바 빈 프로퍼티 규약**이다.

### 🪔 필드 주입
이름 그대로 필드에 바로 주입하는 방법이다.

**특징**
- 코드가 간결해서 많은 개발자들을 유혹하지만 외부에서 변경이 불가능해서 테스트 하기 힘들다는 치명적인 단점이 있다.
  - 순수한 테스트 코드를 작성해 실행하면, 필드에 객체를 넣어줄 방법이 없어 테스트가 불가능하다. (결국 setter 메소드를 생성해 호출해야 한다.)
- DI 프레임워크가 없으면 아무것도 할 수 없다.
- **사용하지 말자!**
  - 애플리케이션의 실제 코드와 관계 없는 테스트 코드에서는 사용할 수 있다. (`@SpringBootTest` 어노테이션을 사용한 경우)
  - 스프링 설정을 목적으로 하는 @Configuration 같은 곳에서만 특별한 용도로 사용

```java
@Component
public class OrderServiceImpl implements OrderService {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private DiscountPolicy discountPolicy;
}
```

> 순수한 자바 테스트 코드에는 당연히 `@Autowired` 가 동작하지 않는다. 스프링 컨테이너에서 관리하는 빈에 대해 사용 가능하다.

> 다음 코드와 같이 `@Bean` 에서 파라미터에 의존관계는 자동 주입된다. 수동 등록 시 자동 등록된 빈의 의존관계가 필요할 때 문제를 해결할 수 있다.

```java
@Bean
OrderService orderService(MemberRepository memberRepoisitory, DiscountPolicy discountPolicy) {
    new OrderServiceImpl(memberRepository, discountPolicy)
}
```

### 🪔 일반 메소드 주입
일반 메소드를 통해 주입받을 수 있다.

**특징**
- 한 번에 여러 필드를 주입 받을 수 있다.
- 일반적으로 잘 사용하지 않는다.

```java
@Component
public class OrderServiceImpl implements OrderService {
    private MemberRepository memberRepository;
    private DiscountPolicy discountPolicy;

    @Autowired
    public void init(MemberRepository memberRepository, DiscountPolicy
discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }
}
```

> 당연하게도, 의존관계 자동 주입은 스프링 컨테이너가 관리하는 스프링 빈이어야 동작한다. 스프링 빈이 아닌 `Member` 같은 클래스에서 `@Autowired` 어노테이션을 적용해도 아무 것도 동작하지 않는다.

---

## 🎯 옵션 처리
주입할 스프링 빈이 없어도 동작해야 할 때가 있다. 하지만 `@Autowired` 만 사용하면 `required` 옵션의 기본 값이 `true` 여서 자동 주입 대상이 없으면 오류가 발생한다.

자동 주입 대상을 옵션으로 처리하는 방법은 다음과 같다.
- `@Autowired(required = false)` : 자동 주입할 대상이 없으면 수정자 메소드 자체가 호출되지 않음
- `org.springframework.lang.@Nullable` : 자동 주입할 대상이 없으면 null이 입력된다.
- `Optional<>` : 자동 주입할 대상이 없으면 `Optional.empty` 가 입력된다.

```java
package hello.core.autowired;

import hello.core.member.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.lang.Nullable;

import java.util.Optional;

public class AutowiredTest {

    @Test
    void autowiredOption() {
        ApplicationContext ac = new AnnotationConfigApplicationContext(TestBean.class);

    }

    static class TestBean {

        @Autowired(required = false)
        public void setNoBean1(Member member) {
            System.out.println("member = " + member);
        }

        @Autowired
        public void setNoBean2(@Nullable Member member) {
            System.out.println("member = " + member);
        }
        
        @Autowired
        public void setNoBean3(Optional<Member> member) {
            System.out.println("member = " + member);
        }
    }

}

// 출력 결과
(호출 안됨)
member = null
member = Optional.empty
```

- **`Member` 는 스프링 빈이 아니다.**

> `@Nullable` , `Optional` 은 스프링 전반에 결쳐 지원된다. 생성자 자동 주입에서 특정 필드에만 사용해도 된다.

---

## 🎯 생성자 주입을 선택해라!
과거에는 수정자 주입과 필드 주입을 많이 했다. 하지만 최근에는 스프링 뿐 아니라 다른 DI 프레임워크 또한 생성자 주입을 권장한다. 그 이유는 다음과 같다.

### 🪔 불변
- 대부분의 의존관계 주입은 한 번 일어나면, 애플리케이션 종료시점까지 변경할 일이 없다. 오히려 변경되어선 안된다.
- 수정자 주입을 사용하면, setter 메소드를 `public` 으로 열어둬야 한다.
  - 이는 누군가 실수로 변경할 우려도 있고, 변경하면 안되는 메소드를 열어두는 것은 좋은 설계 방법이 아니다.
- 생성자 주입은 객체를 생성할 때 딱 1번만 호출되기에 불변하게 설계할 수 있다!

### 🪔 누락
- 프레임워크 없이 순수한 자바 코드를 단위 테스트하는 경우, 다음과 같인 수정자 의존관계인 경우가 있다고 가정한다.

```java
public class OrderServiceImpl implements OrderService {

    private MemberRepository memberRepository;
    private DiscountPolicy discountPolicy;

    @Autowired
    public void setMemberRepository(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Autowired
    public void setDiscountPolicy(DiscountPolicy discountPolicy) {
        this.discountPolicy = discountPolicy;
    }

}
```

```java
@Test
void createOrder() {
    OrderServiceImpl orderService = new OrderServiceImpl();
    orderService.createOrder(1L, "itemA", 10000);
}
```

- 실행하면, `NullPointerException` 이 발생한다.
  - 이유는 `memberRepository` 와 `discountPolicy` 에 대한 의존관계 주입이 누락되었기 때문이다. (프레임워크 없이 테스트하게 되면 의존관계 자동 주입이 수행되지 않음!)

생성자 주입을 사용하면 주입 데이터를 누락했을 때 **컴파일 오류**가 발생한다. 

### 🪔 final 키워드

> `final` : 초기화 후 값이 변하지 않는다.

생성자 주입을 사용하면 필드에 `final` 키워드를 사용할 수 있다. 그래서 생성자에서 혹시라도 값이 설정되지 않는 오류를 컴파일 시점에 막아준다.

```java
@Component
public class OrderServiceImpl implements OrderService {

    private final MemberRepository memberRepository;
    private final DiscountPolicy discountPolicy;
@Autowired
    public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy
discountPolicy) {
        this.memberRepository = memberRepository;
    }

    //...
}
```

- 필수 필드인 `discountPolicy` 에 값을 설정해야 하는데, 이 부분이 누락되었다. 자바는 컴파일 시점에 `final` 키워드가 붙어있는 `discountPolicy` 에 대해 다음 오류를 발생시킨다.
  - `java: variable discountPolicy might not have been initialized`

> 수정자 주입을 포함한 나머지 주입 방식은 모두 생성자 이후에 호출되기에, 필드에 `final` 키워드를 사용할 수 없다. 오직 생성자 주입 방식만 `final` 키워드를 사용할 수 있다.

---

## 🎯 롬복과 최신 트렌드

### 🪔 

--- 

## 🎯 조회 빈이 2개 이상 - 문제

--- 

## 🎯 @Autowired 필드 명, @Qualifier, @Primary

--- 

## 🎯 어노테이션 직접 만들기

--- 

## 🎯 조회한 빈이 모두 필요할 때, List, Map

--- 

## 🎯 자동, 수동의 올바른 실무 운영 기준

## 📌 중요한 개념
의존관계 주입, 주입 방법 4가지

## 📕 참고
- [스프링 핵심 원리 - 기본편](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)
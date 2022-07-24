---
title: "📟 7. 의존관계 자동 주입"
description: "스프링 핵심 원리 - 기본편 강의 정리"
date: 2022-07-23
update: 2022-07-23
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
### 🪔 

---

## 🎯 생성자 주입을 선택해라!

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


## 📕 참고
- [스프링 핵심 원리 - 기본편](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)
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
실제 개발을 해보면, 대부분이 다 불변이고, 그래서 다음과 같이 생성자에 `final` 키워드를 사용하게 된다. 그런데 생성자도 만들고 주입 받은 값을 대입하는 코드도 만들고, 조금 과정이 귀찮은 듯하다.
- 필드 주입처럼 좀 편리하게 사용하는 방법은 없을까?

**기본 코드**
```java
@Component
    public class OrderServiceImpl implements OrderService {
        private final MemberRepository memberRepository;
        private final DiscountPolicy discountPolicy;
        
        @Autowired
        public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy
    discountPolicy) {
            this.memberRepository = memberRepository;
            this.discountPolicy = discountPolicy;
        }
}
```

- 생성자가 1개라면, `@Autowired` 를 생략할 수 있다.
- 이후 **롬복**이라는 라이브러리를 적용해보자!

```java
plugins {
	id 'org.springframework.boot' version '2.7.1'
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id 'java'
}

group = 'hello'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

//lombok 설정 추가 시작
configurations {
	compileOnly {
		extendsFrom annotationProcessor
	}
}
//lombok 설정 추가 끝

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	//lombok 라이브러리 추가 시작
	compileOnly 'org.projectlombok:lombok'
	annotationProcessor 'org.projectlombok:lombok'
	testCompileOnly 'org.projectlombok:lombok'
	testAnnotationProcessor 'org.projectlombok:lombok'
	//lombok 라이브러리 추가 끝

}

tasks.named('test') {
	useJUnitPlatform()
}
```

- 롬복 라이브러리를 사용하기 위해 의존성을 추가해준다.
- 롬복의 대표적인 기능은 어노테이션을 통해 getter & setter 자동 생성, 생성자 관련 지원 기능이 있다.

이제 롬복을 적용하여, `@RequiredArgsConstructor` 어노테이션을 사용해 `final` 키워드가 붙은 필드에 대한 생성자를 만들어주도록 한다.

```java
package hello.core.order;

import hello.core.discount.DiscountPolicy;
import hello.core.member.Member;
import hello.core.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class OrderServiceImpl implements OrderService {

    // 회원을 찾기 위해 필요
    private final MemberRepository memberRepository;
    // 할인 정책 사용을 위해 필요
    private final DiscountPolicy discountPolicy;

    @Override
    public Order createOrder(Long memberId, String itemName, int itemPrice) {
        Member member = memberRepository.findById(memberId);
        // 할인에 대해서는 createOrder는 아예 알지 못함, 단일 책임 원칙을 잘 지킨 예
        int discountPrice = discountPolicy.discount(member, itemPrice);

        return new Order(memberId, itemName, itemPrice, discountPrice);
    }
}
```

- 이전의 코드와 최종 코드는 완전히 동일하다. 롬복이 자바의 **Annotation processor**r라는 기능을 이용해 **컴파일 시점**에 생성자 코드를 자동으로 생성해준다.

--- 

## 🎯 조회 빈이 2개 이상 - 문제
`@Autowired` 는 타입으로 조회한다.
- 따라서 다음 코드와 유사하게 동작한다. (실제로는 더 많은 기능을 제공!)
  - `ac.getBean(DiscountPolicy.class)`

스프링 빈 조회에서 배웠듯, 타입으로 조회 시 선택된 빈이 2개 이상이면 문제가 발생한다.
- `NoUniqueBeanDefinitionException` 예외 발생
- 이를 해결하기 위해, 하위 타입으로 지정하여 특정 빈만을 조회할 수는 있지만 이는 DIP를 위배하고 유연성을 떨어뜨리는 행위다.
- 또한 이름만 다르고, 완전히 동일한 타입의 스프링 빈이 2개 있을 때 해결되지 않는다.

> 스프링 빈을 수동 등록하여 문제를 해결할 수도 있지만, 의존관계 자동 주입에서 해결하는 여러 방법도 있다. 이는 아래에서 다룬다.

--- 

## 🎯 @Autowired 필드 명, @Qualifier, @Primary
조회 대상 빈이 2개 이상 일 떄 해결방법을 하나씩 알아본다. 
- `@Autowired` 필드 명 매칭
- `@Qualifier` -> `@Qualifier` 끼리 매칭 -> 빈 이름 매칭
- `@Primary` 사용

### 🪔 @Autowired 필드 명 매칭
`@Autowired` 는 타입 매칭을 시도하고, 이때 여러 빈이 있으면 필드 이름(파라미터 이름)으로 빈 이름을 추가 매칭한다.

**기존 코드(필드 주입)**
```java
@Autowired
private final DiscountPolicy discountPolicy;
```

**필드 명을 빈 이름으로 변경**
```java
@Autowired
private final DiscountPolicy rateDiscountPolicy;
```

- 필드 명이 `rateDiscountPolicy` 이므로 정상 주입된다.

> 필드 명 매칭은 먼저 타입 매칭을 시도하고, 그 결과에 여러 빈이 있을 때 추가로 동작하는 기능이다.

### 🪔 @Qualifier 사용
`@Qualifier` 는 추가 구분자를 붙여주는 방법이다. 주입 시 추가적인 방법을 제공하는 것이지, 빈 이름을 변경하는 것은 아니다.

**빈 등록시 @Qualifierㄹ르 붙여준다.**
```java
@Component
@Qualifier("mainDiscountPolicy")
public class RateDiscountPolicy implements DiscountPolicy {
    ...
}
```

```java
@Component
@Qualifier("fixDiscountPolicy")
public class FixDiscountPolicy implements DiscountPolicy {
    ...
}
```

**이후 주입 시에 @Qualifier를 붙여주고 등록한 이름을 적는다.**
```java
@Autowired
public OrderServiceImpl(MemberRepository memberRepository,
                        @Qualifier("mainDiscountPolicy") DiscountPolicy
discountPolicy) {
    this.memberRepository = memberRepository;
    this.discountPolicy = discountPolicy;
}
```

`@Qualifier` 로 주입할 때, `@Qualifier("mainDiscountPolicy")` 를 못 찾으면 어떻게 될까?
- 그러면 `mainDiscountPolicy` 라는 이름의 스프링 빈을 추가로 찾는다.
  - 하지만 이는 경험상 좋은 사용은 아니다.

또한 직접 빈 등록 시에도 `@Qualifier` 를 동일하게 사용할 수 있다.
```java
@Bean
@Qualifier("mainDiscountPolicy")
public DiscountPolicy discountPolicy() {
    ...
}
```

### 🪔 @Primary 사용
이는 우선순위를 정하는 방법이다. 여러 빈이 매칭되면 `@Primary` 가 우선권을 가진다.

**rateDiscountPolicy가 우선권**
```java
@Component
@Primary
public class RateDiscountPolicy implements DiscountPolicy {}

@Component 
public class FixDiscountPolicy implements DiscountPolicy {}
```

`@Qualifier` 의 단점은 주입 받을 때 모든 코드에 `@Qualifier` 를 붙여줘야 한다는 점이다. 반면에 `@Primary` 를 사용하면 우선순위를 가질 클래스에만 이를 붙여주면 된다.

**@Primary와 @Qualifier의 우선순위**
- `@Primary` 는 기본값처럼 동작하고, `@Qualifier` 는 매우 상세하게 동작한다.
- 스프링은 자동보다는 수동이, 넓은 범위의 선택권보다는 좁은 범위의 선택권이 우선 순위가 높다.
  - 즉, `@Qualifier` 의 우선순위가 더 높다.

--- 

## 🎯 어노테이션 직접 만들기
`@Qualifier("mainDiscountPolicy")` 이렇게 **문자를 적으면 컴파일시 타입 체크가 안된다.**
- 이는 어노테이션을 만들어 해결할 수 있다.

```java
package hello.core.annotation;

import org.springframework.beans.factory.annotation.Qualifier;

import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.TYPE, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@Qualifier("mainDiscountPolicy")
public @interface MainDiscountPolicy {
}
```

```java
package hello.core.discount;

import hello.core.annotation.MainDiscountPolicy;
import hello.core.member.Grade;
import hello.core.member.Member;
import org.springframework.stereotype.Component;

@Component
@MainDiscountPolicy
public class RateDiscountPolicy implements DiscountPolicy {

    private int discountPercent = 10;
    @Override
    public int discount(Member member, int price) {
        if (member.getGrade() == Grade.VIP)
            return price * discountPercent / 100;
        return 0;
    }
}
```

이후 사용할 때도 해당 어노테이션을 명시한다.

```java
package hello.core.order;

@Component
public class OrderServiceImpl implements OrderService {

    // 회원을 찾기 위해 필요
    private final MemberRepository memberRepository;
    // 할인 정책 사용을 위해 필요
    private final DiscountPolicy discountPolicy;

    @Autowired
    public OrderServiceImpl(MemberRepository memberRepository, @MainDiscountPolicy DiscountPolicy discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }

    ...
}
```

**어노테이션에는 상속이라는 개념이 없다.** 이렇게 어노테이션을 모아서 사용하는 기능은 스프링이 지원해주는 기능이다.

--- 

## 🎯 조회한 빈이 모두 필요할 때, List, Map
의도적으로 해당 타입의 모든 스프링 빈이 필요한 경우가 있다. 
- 할인 서비스를 제공하는데, 클라이언트가 할인의 종류(fix, rate)를 선택할 수 있는 경우가 있을 수 있다.

```java
package hello.core.autowired;

import hello.core.discount.DiscountPolicy;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;
import java.util.Map;

public class AllBeanTest {

    @Test
    void findAllBean() {
        ApplicationContext ac = new AnnotationConfigApplicationContext(DiscountService.class);
    }

    static class DiscountService {
        private final Map<String, DiscountPolicy> policyMap;
        private final List<DiscountPolicy> policies;

        @Autowired
        public DiscountService(Map<String, DiscountPolicy> policyMap, List<DiscountPolicy> policies) {
            this.policyMap = policyMap;
            this.policies = policies;

            System.out.println("policyMap = " + policyMap);
            System.out.println("policies = " + policies);
        }
    }
}
```

- 테스트를 실행하면 맵과 리스트에 아무 값도 들어가있지 않은 것을 확인할 수 있다.
  - `DiscountService` 만 빈으로 등록했기 때문이다!

`ApplicationContext ac = new AnnotationConfigApplicationContext(AutoAppConfig.class, DiscountService.class);` 와 같이 설정 정보도 함께 등록한다.
- 이제 의존관계 자동 주입 시, `@Autowired` 에 의해 컴포넌트 스캔을 수행하고, `Fix~` 와 `Rate~` 에 대한 주입이 수행된다.

```java
package hello.core.autowired;

public class AllBeanTest {

    @Test
    void findAllBean() {
        ApplicationContext ac = new AnnotationConfigApplicationContext(AutoAppConfig.class, DiscountService.class);

        DiscountService discountService = ac.getBean(DiscountService.class);
        Member member = new Member(1L, "memberA", Grade.VIP);
        int discountPrice = discountService.discount(member, 10000, "fixDiscountPolicy");

        assertThat(discountService).isInstanceOf(DiscountService.class);
        assertThat(discountPrice).isEqualTo(1000);

        int rateDiscountPrice = discountService.discount(member, 20000, "rateDiscountPolicy");

        assertThat(rateDiscountPrice).isEqualTo(2000);
    }

    static class DiscountService {
        private final Map<String, DiscountPolicy> policyMap;
        private final List<DiscountPolicy> policies;

        @Autowired
        public DiscountService(Map<String, DiscountPolicy> policyMap, List<DiscountPolicy> policies) {
            this.policyMap = policyMap;
            this.policies = policies;

            System.out.println("policyMap = " + policyMap);
            System.out.println("policies = " + policies);
        }

        public int discount(Member member, int price, String discountCode) {
            DiscountPolicy discountPolicy = policyMap.get(discountCode);

            return discountPolicy.discount(member, price);
        }
    }
}
```

**로직 분석**
- `DiscountService` 는 Map으로 만든 `DiscountPolicy` 를 주입 받는다. 이때 `fixDiscountPolicy` , `rateDiscountPolicy` 가 주입된다.
- `discount()` 메소드는 `discountCode` 로 `"fixDiscountPolicy"` 가 넘어오면 map에서 `fixDiscountPolicy` 빈을 찾아 실행한다.

**주입 분석**
- `Map<String, DiscountPolicy>` : map의 키에 스프링 빈의 이름을 넣어주고, 그 값으로 `DiscountPolicy` 타입으로 조회한 모든 스프링 빈을 담는다.
- `List<DiscountPolicy>` : `DiscountPolicy` 타입으로 조회한 모든 스프링 빈을 담아준다.
- 만약 해당하는 타입의 빈이 없다면, 빈 컬렉션이나 Map을 주입한다.
 
--- 

## 🎯 자동, 수동의 올바른 실무 운영 기준
**편리란 자동 기능을 기본으로 사용하자!**
- 어떤 경우에 컴포넌트 스캔과 자동 주입을 사용하고, 어떤 경우에 설정 정볼르 통해 수동으로 빈을 등록하고 의존관계도 수동으로 주입해야 할까?

결론부터 이야기하면, 스프링이 나오고 시간이 갈 수록 점점 자동을 선호하는 추세다. 스프링은 `@Component` 뿐만 아니라 `@Controller` , `@Service` , `@Repository` 처럼 계층에 맞추어 일반적인 애플리케이션 로직을 자동으로 스캔할 수 있도록 지원한다. 거기에 더해서 최근 스프링 부트는 컴포넌트 스캔을 기본으로 사용하고, 스프링 부트의 다양한 스프링 빈들도 조건이 맞으면 자동으로 등록하도록 설계했다.

설정 정보를 기반으로 애플리케이션을 구성하는 부분과 실제 동작하는 부분을 명확하게 나누는 것이 이상적이지만, 개발자 입장에서 스프링 빈을 하나 등록할 때 `@Component` 만 넣어주면 끝나는 일을 `@Configuration` 설정 정보에 가서 `@Bean` 을 적고, 객체를 생성하고, 주입할 대상을 일일이 적어주는 과정은 상당히 번거롭다.

또 관리할 빈이 많아서 설정 정보가 커지면 설정 정보를 관리하는 것 자체가 부담이 된다. 그리고 결정적으로 자동 빈 등록을 사용해도 OCP, DIP를 지킬 수 있다.

**그러면 수동 빈 등록은 언제 사용하면 좋을까?**
애플리케이션은 크게 업무 로직과 기술 지원 로직으로 나눌 수 있다.
- **업무 로직 빈**: 웹을 지원하는 컨트롤러, 핵심 비즈니스 로직이 있는 서비스, 데이터 계층의 로직을 처리하는 리포지토리등이 모두 업무 로직이다. 보통 비즈니스 요구사항을 개발할 때 추가되거나 변경된다.
- **기술 지원 빈**: 기술적인 문제나 공통 관심사(AOP)를 처리할 때 주로 사용된다. 데이터베이스 연결이나, 공통 로그 처리 처럼 업무 로직을 지원하기 위한 하부 기술이나 공통 기술들이다.

업무 로직은 숫자도 매우 많고, 한번 개발해야 하면 컨트롤러, 서비스, 리포지토리 처럼 어느정도 유사한 패턴이 있다. 이런 경우 자동 기능을 적극 사용하는 것이 좋다. 보통 문제가 발생해도 어떤 곳에서 문제가 발생했는지 명확하게 파악하기 쉽다.

기술 지원 로직은 업무 로직과 비교해서 그 수가 매우 적고, 보통 애플리케이션 전반에 걸쳐서 광범위하게 영향을 미친다. 그리고 업무 로직은 문제가 발생했을 때 어디가 문제인지 명확하게 잘 드러나지만, 기술 지원 로직은 적용이 잘 되고 있는지 아닌지 조차 파악하기 어려운 경우가 많다. 그래서 이런 기술 지원 로직들은 가급적 수동 빈 등록을 사용해서 명확하게 드러내는 것이 좋다.

> 애플리케이션에 광범위하게 영향을 미치는 기술 지원 객체는 수동 빈으로 등록해서 딱! 설정 정보에 바로 나타나게 하는 것이 유지보수 하기 좋다.

**비즈니스 로직 중에서 다형성을 적극 활용할 때**
의존관계 자동 주입 - 조회한 빈이 모두 필요할 때, List, Map을 다시 보자.
- `DiscountService` 가 의존관계 자동 주입으로 `Map<String, DiscountPolicy>` 에 주입을 받는 상황을 생각해보자. 여기에 어떤 빈들이 주입될 지, 각 빈들의 이름은 무엇일지 코드만 보고 한번에 쉽게 파악할 수 있을까? 내가 개발했으니 크게 관계가 없지만, 만약 이 코드를 다른 개발자가 개발해서 나에게 준 것이라면 어떨까?
- 자동 등록을 사용하고 있기 때문에 파악하려면 여러 코드를 찾아봐야 한다.
- 이런 경우 수동 빈으로 등록하거나 또는 자동으로하면 특정 패키지에 같이 묶어두는게 좋다! 핵심은 딱 보고 이해가 되어야 한다!

이 부분을 별도의 설정 정보로 만들고 수동으로 등록하면 다음과 같다.
```java
@Configuration
public class DiscountPolicyConfig {
    @Bean
    public DiscountPolicy rateDiscountPolicy() {
        return new RateDiscountPolicy();
    }
    @Bean
    public DiscountPolicy fixDiscountPolicy() {
        return new FixDiscountPolicy();
    }
}
```

이 설정 정보만 봐도 한눈에 빈의 이름은 물론이고, 어떤 빈들이 주입될지 파악할 수 있다. 그래도 빈 자동 등록을 사용하고 싶으면 파악하기 좋게 `DiscountPolicy` 의 구현 빈들만 따로 모아서 특정 패키지에 모아두자.

참고로 스프링과 스프링 부트가 자동으로 등록하는 수 많은 빈들은 예외다. 이런 부분들은 스프링 자체를 잘 이해하고 스프링의 의도대로 잘 사용하는게 중요하다. 스프링 부트의 경우 `DataSource` 같은 데이터베이스 연결에 사용하는 기술 지원 로직까지 내부에서 자동으로 등록하는데, 이런 부분은 메뉴얼을 잘 참고해서 스프링 부트가 의도한 대로 편리하게 사용하면 된다. 반면에 스프링 부트가 아니라 내가 직접 기술 지원 객체를 스프링 빈으로 등록한다면 수동으로 등록해서 명확하게 드러내는 것이 좋다.

## 📌 중요한 개념
의존관계 주입, 주입 방법 4가지

## 📕 참고
- [스프링 핵심 원리 - 기본편](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)
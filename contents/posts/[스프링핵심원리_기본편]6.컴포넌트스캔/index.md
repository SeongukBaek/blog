---
title: "📟 6. 컴포넌트 스캔"
description: "스프링 핵심 원리 - 기본편 강의 정리"
date: 2022-07-23
update: 2022-07-23
tags:
  - Java
  - SpringBoot
series: "📟 스프링 핵심 원리 - 기본편"
---

<em><strong>[스프링 핵심 원리 - 기본편](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)을 들으며 정리하는 POST입니다.</strong></em>

## 🎯 컴포넌트 스캔과 의존관계 자동 주입 시작하기
지금까지는 스프링 빈 등록 시, 자바 코드의 `@Bean` 이나 XML의 `<bean></bean>` 을 통해 설정 정보에 직접 등록할 스프링 빈을 명시했다.
- 하지만 등록해야 할 스프링 빈의 수가 많아지게 되면, 이러한 과정은 매우 비효율적이다.

스프링은 **설정 정보가 없어도 자동으로 스프링 빈을 등록**하는 **컴포넌트 스캔**이라는 기능을 제공한다!
- 또한 의존관계도 자동으로 주입하는 **`@Autowired`** 라는 기능도 제공한다.

먼저 코드로 알아보기 위해, 새로운 `AutoAppConfig.java` 를 생성한다.
```java
package hello.core;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;

@Configuration
@ComponentScan(
        excludeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Configuration.class)
)
public class AutoAppConfig {

}
```

- `@ComponentScan` 이 추가되었다. 이는 스프링 빈을 다 읽어 자동으로 등록하기 위해 필요한 어노테이션이다.
  - 이는 `@Component` 어노테이션이 붙은 클래스를 찾아 자동으로 스프링 빈으로 등록해준다.
  - `excludeFilters` 는 이때 제외할 클래스를 의미한다.
  - 현재 예제에서는 이전에 생성했던 `AppConfig` 에 `@Configuration` 어노테이션이 붙어있고, 이를 삭제하지 않기에 이를 제외한다.
- 기존의 `AppConfig` 와 다르게 `@Bean` 으로 등록한 클래스가 하나도 없다!

이제 각 클래스가 컴포넌트 스캔의 대상이 되도록 `@Component` 어노테이션을 붙여준다.

**MemoryMemberRepository @Component 추가**, **RateDiscountPolicy @Component 추가**

**MemberServiceImpl @Component, @Autowired 추가**
```java
package hello.core.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public void join(Member member) {
        memberRepository.save(member);
    }

    @Override
    public Member findMember(Long memberId) {
        return memberRepository.findById(memberId);
    }
}
```

- 이전 `AppConfig` 에서는 `@Bean` 으로 직접 설정 정보를 작성했고, 의존관계도 직접 명시했다.
- 하지만 이제는 컴포넌트 스캔으로 자동 등록하기에 의존관계 주입 또한 해당 클래스 내에서 처리해야 한다.
  - 이때 사용하는 것이 `@Autowired` 어노테이션이다. 이는 의존관계를 자동으로 주입해준다.

**OrderServiceImpl @Component, @Autowired 추가**
```java
package hello.core.order;

import hello.core.discount.DiscountPolicy;
import hello.core.discount.FixDiscountPolicy;
import hello.core.discount.RateDiscountPolicy;
import hello.core.member.Member;
import hello.core.member.MemberRepository;
import hello.core.member.MemoryMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderServiceImpl implements OrderService {

    // 회원을 찾기 위해 필요
    private final MemberRepository memberRepository;
    // 할인 정책 사용을 위해 필요
//    private final DiscountPolicy discountPolicy = new FixDiscountPolicy();
    private final DiscountPolicy discountPolicy;

    @Autowired
    public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }

    @Override
    public Order createOrder(Long memberId, String itemName, int itemPrice) {
        Member member = memberRepository.findById(memberId);
        // 할인에 대해서는 createOrder는 아예 알지 못함, 단일 책임 원칙을 잘 지킨 예
        int discountPrice = discountPolicy.discount(member, itemPrice);

        return new Order(memberId, itemName, itemPrice, discountPrice);
    }
}
```

- `@Autowired` 를 사용하면 생성자에서 여러 의존관계도 한 번에 주입받을 수 있다.

이제 생성한 설정 정보로 스프링 빈 등록이 정상 수행되는지 확인하는 테스트 코드를 작성한다.

**AutoAppConfigTest.java**
```java
package hello.core.scan;

import hello.core.AutoAppConfig;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static org.assertj.core.api.Assertions.*;

public class AutoAppConfigTest {

    @Test
    void basicScan() {
        ApplicationContext ac = new AnnotationConfigApplicationContext(AutoAppConfig.class);
        MemberService memberService = ac.getBean(MemberService.class);
        assertThat(memberService).isInstanceOf(MemberService.class);
    }
}
```

- 설정 정보로 방금 생성한 `AutoAppConfig` 를 넘겨준다.

### 🪔 컴포넌트 스캔과 자동 의존관계 주입 동작 과정
1. `@ComponentScan`
<img src="../../images/스프링핵심원리-기본편/컴포스캔.png" width="80%">

- `@ComponentScan` 은 `@Component` 가 붙은 모든 클래스를 스프링 빈으로 등록한다. (스프링 컨테이너가 모든 클래스를 확인!, 싱글톤으로 등록)
- 이때 스프링 빈의 기본 이름은 클래스명을 사용하되, 맨 앞글자만 소문자를 사용한다.
  - 만약 빈 이름을 지정하고 싶으면 `@Component("memberService2")` 와 같이 부여하면 된다.

2. `@Autowired` 의존관계 자동 주입
<img src="../../images/스프링핵심원리-기본편/오토.png" width="80%">

- 생성자에 `@Autowired` 를 지정하면, 스프링 컨테이너가 자동으로 해당 스프링 빈을 찾아서 주입한다.
- 이때 기본 조회 전략은 **타입이 같은 빈**을 찾아 주입한다.
  - `getBean(MemberRepository.class)` 와 동일하다고 이해하면 쉽다.
  - 타입이 같은 빈이 여러 개인 경우는 뒤에서 ...

<img src="../../images/스프링핵심원리-기본편/의존관계자동주입.png" width="80%">

- 생성자에 파라미터가 많아도, 다 찾아서 자동으로 주입한다.

---

## 🎯 탐색 위치와 기본 스캔 대상
### 🪔 탐색할 패키지의 시작 위치 지정
컴포넌트 스캔 시, 모든 자바 클래스를 확인하면 시간이 오래 걸린다. 그래서 필요한 위치부터 탐색하도록 시작 위치를 지정할 수 있다.

```java
package hello.core;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;

@Configuration
@ComponentScan(
        excludeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Configuration.class),
        basePackages = "hello.core"
)
public class AutoAppConfig {

}
```

- `basePackages` : 탐색할 패키지의 시작 위치를 지정한다. 이 패키지를 포함한 하위 패키지를 모두 탐색한다. 여러 시작 위치도 지정 가능하다.
- `basePackageClasses` : 지정한 클래스의 패키지를 탐색 시작 위치로 지정한다.
- 지정하지 않는다면, `@ComponentScan` 이 붙은 설정 정보 클래스의 패키지가 시작 위치가 된다.

**권장하는 방법**
- 패키지 위치를 지정하지 않고, 설정 정보 클래스의 위치를 프로젝트 최상단에 두는 것이다.
- 최근 스프링 부트도 이 방법을 기본으로 제공한다.
  - 스프링 부트를 사용하면 스프링 부트의 대표 시작 정보인 `@SpringBootApplication` 어노테이션을 프로젝트 시작 루트 위치에 두는 것이 관례이고, 이 설정 안에 `@ComponentScan` 어노테이션이 들어있다.

### 🪔 컴포넌트 스캔 기본 대상
컴포넌트 스캔은 다음과 같은 어노테이션도 추가로 대상에 포함한다.
- `@Component` : 컴포넌트 스캔에서 사용
- `@Controller` : 스프링 MVC 컨트롤러에서 사용
- `@Service` : 스프링 비즈니스 로직에서 사용
- `@Repository` : 스프링 데이터 접근 계층에서 사용
- `@Configuration` : 스프링 설정 정보에서 사용

> 위 클래스의 소스 코드를 보면 모두 `@Component` 를 포함하고 있는 것을 확인할 수 있다.

> 사실 어노테이션은 상속 관계라는 것이 없다. 그래서 어노테이션이 특정 어노테이션을 들고 있는 것을 인식하는 것은 자바 제공 기능이 아닌, 스프링 제공 기능이다.

컴포넌트 스캔의 용도 뿐 아니라 다음 어노테이션이 있다면 스프링은 부가 기능을 수행한다.
- `@Controller` : 스프링 MVC 컨트롤러로 인식
- `@Repository` : 스프링 데이터 접근 계층으로 인식하고, 데이터 계층의 예외를 스프링 예외로 변환해준다.
  - DB가 변경되었을 때, 예외도 변경되어 다른 계층의 코드 또한 변경되어야 하는 문제를 방지한다.
- `@Configuration` : 스프링 설정 정보로 인식하고, 스프링 빈이 싱글톤을 유지하도록 추가 처리를 한다.
- `@Service` : 특별한 처리를 하지 않는다. 비즈니스 계층을 개발자들이 인식하는데 도움을 준다.

> `useDefaultFilters` 옵션은 기본으로 켜져있다. 이 옵션을 끄면 기본 스캔 대상들이 제외된다.

---

## 🎯 필터
- `includeFilters` : 컴포넌트 스캔 대상을 추가로 지정한다.
- `excludeFilters` : 컴포넌트 스캔에서 제외할 대상을 지정한다.

**컴포넌트 스캔 대상에 추가할 어노테이션**
```java
package hello.core.scan.filter;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface MyIncludeComponent {
    
}

//

package hello.core.scan.filter;

@MyIncludeComponent
public class BeanA {
}
```

- `TYPE` : 클래스 레벨에 붙는 어노테이션
- `MyIncludeComponent` 어노테이션이 붙은 클래스(위에서는 `BeanA`)는 컴포넌트 스캔에 추가할 것이다!!!

**컴포넌트 스캔 대상에서 제외할 어노테이션**
```java
package hello.core.scan.filter;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface MyExcludeComponent {

}

//

package hello.core.scan.filter;

@MyExcludeComponent
public class BeanB {
}
```

- `MyExcludeComponent` 어노테이션이 붙은 클래스(위에서는 `BeanB`)는 컴포넌트 스캔에서 제외할 것이다!!!

**설정 정보와 테스트 코드**
```java
package hello.core.scan.filter;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.context.annotation.ComponentScan.*;

public class ComponentFilterAppConfigTest {

    @Test
    void filterScan() {
        ApplicationContext ac = new AnnotationConfigApplicationContext(ComponentFilterAppConfig.class);
        BeanA beanA = ac.getBean("beanA", BeanA.class);
        assertThat(beanA).isNotNull();

        Assertions.assertThrows(
                NoSuchBeanDefinitionException.class,
                () -> ac.getBean("beanB", BeanB.class)
        );
    }

    @Configuration
    @ComponentScan(
            includeFilters = @Filter(type = FilterType.ANNOTATION, classes = MyIncludeComponent.class),
            excludeFilters = @Filter(type = FilterType.ANNOTATION, classes = MyExcludeComponent.class)
    )
    static class ComponentFilterAppConfig {
    }
}
```

- `ComponentFilterAppConfig` 설정 정보는 컴포넌트 스캔을 수행하는데, `MyIncludeComponent` 어노테이션이 붙은 클래스는 컴포넌트 스캔 대상에 포함하고, `MyExcludeComponent` 어노테이션이 붙은 클래스는 포함하지 않는다.

### 🪔 FilterType 옵션
5가지 옵션이 있다.

- `ANNOTATION` : 기본값, 어노테이션을 인식해서 동작한다. (생략 가능)
  - ex. `org.example.SomeAnnotation`
- `ASSIGNABLE_TYPE` : 지정한 타입과 자식 타입을 인식해서 동작한다.
  - ex. `org.example.SomeClass`
- `ASPECTJ` : AspectJ 패턴 사용
  - ex. `org.example..*Service+`
- `REGEX` : 정규 표현식
  - ex. `org\.example\.Default.*`
- `CUSTOM` : `TypeFilter` 라는 인터페이스를 구현해서 처리
  - ex. `org.example.MyTypeFilter`

예를 들어 `BeanA` 클래스도 컴포넌트 스캔에서 제외하고 싶다면,

```java
@Configuration
@ComponentScan(
        includeFilters = @Filter(type = FilterType.ANNOTATION, classes = MyIncludeComponent.class),
        excludeFilters = {
            @Filter(type = FilterType.ANNOTATION, classes = MyExcludeComponent.class)
            @Filter(type = FilterType.ASSIGNABLE_TYPE, classes = BeanA.class)
        }
)
```

> `includeFilters` 를 거의 사용할 일은 없다! `@Component` 면 충분하다...

---

## 🎯 중복 등록과 충돌
컴포넌트 스캔에서 같은 빈 이름을 등록하면 어떻게 될까? 다음과 같은 두 가지 상황이 있다.
- 자동 빈 등록 vs. 자동 빈 등록
- 수동 빈 등록 vs. 자동 빈 등록

### 🪔 자동 빈 등록 vs. 자동 빈 등록
컴포넌트 스캔에 의해 자동으로 스프링 빈이 등록되는데, 그 이름이 같은 경우 스프링은 오류를 발생시킨다.
- `ConflictingBeanDefinitionException` 예외 발생!

### 🪔 수동 빈 등록 vs. 자동 빈 등록

```java
@Component
public class MemoryMemberRepository implements MemberRepository {}
```

- 자동 빈 등록

```java
@Configuration
@ComponentScan(
        excludeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Configuration.class),
        basePackages = "hello.core"
)
public class AutoAppConfig {
    
    // 빈 등록 시, 맨 앞 글자는 소문자로!
    @Bean(name = "memoryMemberRepository")
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }
}
```

- 수동 빈 등록
- 그리고 이렇게 수동 빈 등록과 자동 빈 등록이 충돌되는 경우, **수동 빈 등록이 우선권**을 가져 수동 빈이 자동 빈을 오버라이딩해버린다.

**수동 빈 등록 시 남는 로그**
```shell
Overriding bean definition for bean 'memoryMemberRepository' with a different definition: replacing
```

- 최근 스프링 부트에서는 수동 빈 등록과 자동 빈 등록이 충돌나면, 오류가 발생하도록 기본 값을 바꿨다. (스프링 부트인 `CoreApplication` 을 실행해보면 오류를 확인할 수 있다.)

>> 항상 잡기 어려운 버그는 애매한 버그다!

## 📌 중요한 개념
컴포넌트 스캔, 어노테이션

## 📕 참고
- [스프링 핵심 원리 - 기본편](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)
---
title: "π 6. μ»΄ν¬λνΈ μ€μΊ"
description: "μ€νλ§ ν΅μ¬ μλ¦¬ - κΈ°λ³ΈνΈ κ°μ μ λ¦¬"
date: 2022-07-23
update: 2022-07-23
tags:
  - Java
  - SpringBoot
series: "π μ€νλ§ ν΅μ¬ μλ¦¬ - κΈ°λ³ΈνΈ"
---

<em><strong>[μ€νλ§ ν΅μ¬ μλ¦¬ - κΈ°λ³ΈνΈ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)μ λ€μΌλ©° μ λ¦¬νλ POSTμλλ€.</strong></em>

## π― μ»΄ν¬λνΈ μ€μΊκ³Ό μμ‘΄κ΄κ³ μλ μ£Όμ μμνκΈ°
μ§κΈκΉμ§λ μ€νλ§ λΉ λ±λ‘ μ, μλ° μ½λμ `@Bean` μ΄λ XMLμ `<bean></bean>` μ ν΅ν΄ μ€μ  μ λ³΄μ μ§μ  λ±λ‘ν  μ€νλ§ λΉμ λͺμνλ€.
- νμ§λ§ λ±λ‘ν΄μΌ ν  μ€νλ§ λΉμ μκ° λ§μμ§κ² λλ©΄, μ΄λ¬ν κ³Όμ μ λ§€μ° λΉν¨μ¨μ μ΄λ€.

μ€νλ§μ **μ€μ  μ λ³΄κ° μμ΄λ μλμΌλ‘ μ€νλ§ λΉμ λ±λ‘**νλ **μ»΄ν¬λνΈ μ€μΊ**μ΄λΌλ κΈ°λ₯μ μ κ³΅νλ€!
- λν μμ‘΄κ΄κ³λ μλμΌλ‘ μ£Όμνλ **`@Autowired`** λΌλ κΈ°λ₯λ μ κ³΅νλ€.

λ¨Όμ  μ½λλ‘ μμλ³΄κΈ° μν΄, μλ‘μ΄ `AutoAppConfig.java` λ₯Ό μμ±νλ€.
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

- `@ComponentScan` μ΄ μΆκ°λμλ€. μ΄λ μ€νλ§ λΉμ λ€ μ½μ΄ μλμΌλ‘ λ±λ‘νκΈ° μν΄ νμν μ΄λΈνμ΄μμ΄λ€.
  - μ΄λ `@Component` μ΄λΈνμ΄μμ΄ λΆμ ν΄λμ€λ₯Ό μ°Ύμ μλμΌλ‘ μ€νλ§ λΉμΌλ‘ λ±λ‘ν΄μ€λ€.
  - `excludeFilters` λ μ΄λ μ μΈν  ν΄λμ€λ₯Ό μλ―Ένλ€.
  - νμ¬ μμ μμλ μ΄μ μ μμ±νλ `AppConfig` μ `@Configuration` μ΄λΈνμ΄μμ΄ λΆμ΄μκ³ , μ΄λ₯Ό μ­μ νμ§ μκΈ°μ μ΄λ₯Ό μ μΈνλ€.
- κΈ°μ‘΄μ `AppConfig` μ λ€λ₯΄κ² `@Bean` μΌλ‘ λ±λ‘ν ν΄λμ€κ° νλλ μλ€!

μ΄μ  κ° ν΄λμ€κ° μ»΄ν¬λνΈ μ€μΊμ λμμ΄ λλλ‘ `@Component` μ΄λΈνμ΄μμ λΆμ¬μ€λ€.

**MemoryMemberRepository @Component μΆκ°**, **RateDiscountPolicy @Component μΆκ°**

**MemberServiceImpl @Component, @Autowired μΆκ°**
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

- μ΄μ  `AppConfig` μμλ `@Bean` μΌλ‘ μ§μ  μ€μ  μ λ³΄λ₯Ό μμ±νκ³ , μμ‘΄κ΄κ³λ μ§μ  λͺμνλ€.
- νμ§λ§ μ΄μ λ μ»΄ν¬λνΈ μ€μΊμΌλ‘ μλ λ±λ‘νκΈ°μ μμ‘΄κ΄κ³ μ£Όμ λν ν΄λΉ ν΄λμ€ λ΄μμ μ²λ¦¬ν΄μΌ νλ€.
  - μ΄λ μ¬μ©νλ κ²μ΄ `@Autowired` μ΄λΈνμ΄μμ΄λ€. μ΄λ μμ‘΄κ΄κ³λ₯Ό μλμΌλ‘ μ£Όμν΄μ€λ€.

**OrderServiceImpl @Component, @Autowired μΆκ°**
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

    // νμμ μ°ΎκΈ° μν΄ νμ
    private final MemberRepository memberRepository;
    // ν μΈ μ μ± μ¬μ©μ μν΄ νμ
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
        // ν μΈμ λν΄μλ createOrderλ μμ μμ§ λͺ»ν¨, λ¨μΌ μ±μ μμΉμ μ μ§ν¨ μ
        int discountPrice = discountPolicy.discount(member, itemPrice);

        return new Order(memberId, itemName, itemPrice, discountPrice);
    }
}
```

- `@Autowired` λ₯Ό μ¬μ©νλ©΄ μμ±μμμ μ¬λ¬ μμ‘΄κ΄κ³λ ν λ²μ μ£Όμλ°μ μ μλ€.

μ΄μ  μμ±ν μ€μ  μ λ³΄λ‘ μ€νλ§ λΉ λ±λ‘μ΄ μ μ μνλλμ§ νμΈνλ νμ€νΈ μ½λλ₯Ό μμ±νλ€.

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

- μ€μ  μ λ³΄λ‘ λ°©κΈ μμ±ν `AutoAppConfig` λ₯Ό λκ²¨μ€λ€.

### πͺ μ»΄ν¬λνΈ μ€μΊκ³Ό μλ μμ‘΄κ΄κ³ μ£Όμ λμ κ³Όμ 
1. `@ComponentScan`
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/μ»΄ν¬μ€μΊ.png" width="80%">

- `@ComponentScan` μ `@Component` κ° λΆμ λͺ¨λ  ν΄λμ€λ₯Ό μ€νλ§ λΉμΌλ‘ λ±λ‘νλ€. (μ€νλ§ μ»¨νμ΄λκ° λͺ¨λ  ν΄λμ€λ₯Ό νμΈ!, μ±κΈν€μΌλ‘ λ±λ‘)
- μ΄λ μ€νλ§ λΉμ κΈ°λ³Έ μ΄λ¦μ ν΄λμ€λͺμ μ¬μ©νλ, λ§¨ μκΈμλ§ μλ¬Έμλ₯Ό μ¬μ©νλ€.
  - λ§μ½ λΉ μ΄λ¦μ μ§μ νκ³  μΆμΌλ©΄ `@Component("memberService2")` μ κ°μ΄ λΆμ¬νλ©΄ λλ€.

2. `@Autowired` μμ‘΄κ΄κ³ μλ μ£Όμ
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/μ€ν .png" width="80%">

- μμ±μμ `@Autowired` λ₯Ό μ§μ νλ©΄, μ€νλ§ μ»¨νμ΄λκ° μλμΌλ‘ ν΄λΉ μ€νλ§ λΉμ μ°Ύμμ μ£Όμνλ€.
- μ΄λ κΈ°λ³Έ μ‘°ν μ λ΅μ **νμμ΄ κ°μ λΉ**μ μ°Ύμ μ£Όμνλ€.
  - `getBean(MemberRepository.class)` μ λμΌνλ€κ³  μ΄ν΄νλ©΄ μ½λ€.
  - νμμ΄ κ°μ λΉμ΄ μ¬λ¬ κ°μΈ κ²½μ°λ λ€μμ ...

<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/μμ‘΄κ΄κ³μλμ£Όμ.png" width="80%">

- μμ±μμ νλΌλ―Έν°κ° λ§μλ, λ€ μ°Ύμμ μλμΌλ‘ μ£Όμνλ€.

---

## π― νμ μμΉμ κΈ°λ³Έ μ€μΊ λμ
### πͺ νμν  ν¨ν€μ§μ μμ μμΉ μ§μ 
μ»΄ν¬λνΈ μ€μΊ μ, λͺ¨λ  μλ° ν΄λμ€λ₯Ό νμΈνλ©΄ μκ°μ΄ μ€λ κ±Έλ¦°λ€. κ·Έλμ νμν μμΉλΆν° νμνλλ‘ μμ μμΉλ₯Ό μ§μ ν  μ μλ€.

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

- `basePackages` : νμν  ν¨ν€μ§μ μμ μμΉλ₯Ό μ§μ νλ€. μ΄ ν¨ν€μ§λ₯Ό ν¬ν¨ν νμ ν¨ν€μ§λ₯Ό λͺ¨λ νμνλ€. μ¬λ¬ μμ μμΉλ μ§μ  κ°λ₯νλ€.
- `basePackageClasses` : μ§μ ν ν΄λμ€μ ν¨ν€μ§λ₯Ό νμ μμ μμΉλ‘ μ§μ νλ€.
- μ§μ νμ§ μλλ€λ©΄, `@ComponentScan` μ΄ λΆμ μ€μ  μ λ³΄ ν΄λμ€μ ν¨ν€μ§κ° μμ μμΉκ° λλ€.

**κΆμ₯νλ λ°©λ²**
- ν¨ν€μ§ μμΉλ₯Ό μ§μ νμ§ μκ³ , μ€μ  μ λ³΄ ν΄λμ€μ μμΉλ₯Ό νλ‘μ νΈ μ΅μλ¨μ λλ κ²μ΄λ€.
- μ΅κ·Ό μ€νλ§ λΆνΈλ μ΄ λ°©λ²μ κΈ°λ³ΈμΌλ‘ μ κ³΅νλ€.
  - μ€νλ§ λΆνΈλ₯Ό μ¬μ©νλ©΄ μ€νλ§ λΆνΈμ λν μμ μ λ³΄μΈ `@SpringBootApplication` μ΄λΈνμ΄μμ νλ‘μ νΈ μμ λ£¨νΈ μμΉμ λλ κ²μ΄ κ΄λ‘μ΄κ³ , μ΄ μ€μ  μμ `@ComponentScan` μ΄λΈνμ΄μμ΄ λ€μ΄μλ€.

### πͺ μ»΄ν¬λνΈ μ€μΊ κΈ°λ³Έ λμ
μ»΄ν¬λνΈ μ€μΊμ λ€μκ³Ό κ°μ μ΄λΈνμ΄μλ μΆκ°λ‘ λμμ ν¬ν¨νλ€.
- `@Component` : μ»΄ν¬λνΈ μ€μΊμμ μ¬μ©
- `@Controller` : μ€νλ§ MVC μ»¨νΈλ‘€λ¬μμ μ¬μ©
- `@Service` : μ€νλ§ λΉμ¦λμ€ λ‘μ§μμ μ¬μ©
- `@Repository` : μ€νλ§ λ°μ΄ν° μ κ·Ό κ³μΈ΅μμ μ¬μ©
- `@Configuration` : μ€νλ§ μ€μ  μ λ³΄μμ μ¬μ©

> μ ν΄λμ€μ μμ€ μ½λλ₯Ό λ³΄λ©΄ λͺ¨λ `@Component` λ₯Ό ν¬ν¨νκ³  μλ κ²μ νμΈν  μ μλ€.

> μ¬μ€ μ΄λΈνμ΄μμ μμ κ΄κ³λΌλ κ²μ΄ μλ€. κ·Έλμ μ΄λΈνμ΄μμ΄ νΉμ  μ΄λΈνμ΄μμ λ€κ³  μλ κ²μ μΈμνλ κ²μ μλ° μ κ³΅ κΈ°λ₯μ΄ μλ, μ€νλ§ μ κ³΅ κΈ°λ₯μ΄λ€.

μ»΄ν¬λνΈ μ€μΊμ μ©λ λΏ μλλΌ λ€μ μ΄λΈνμ΄μμ΄ μλ€λ©΄ μ€νλ§μ λΆκ° κΈ°λ₯μ μννλ€.
- `@Controller` : μ€νλ§ MVC μ»¨νΈλ‘€λ¬λ‘ μΈμ
- `@Repository` : μ€νλ§ λ°μ΄ν° μ κ·Ό κ³μΈ΅μΌλ‘ μΈμνκ³ , λ°μ΄ν° κ³μΈ΅μ μμΈλ₯Ό μ€νλ§ μμΈλ‘ λ³νν΄μ€λ€.
  - DBκ° λ³κ²½λμμ λ, μμΈλ λ³κ²½λμ΄ λ€λ₯Έ κ³μΈ΅μ μ½λ λν λ³κ²½λμ΄μΌ νλ λ¬Έμ λ₯Ό λ°©μ§νλ€.
- `@Configuration` : μ€νλ§ μ€μ  μ λ³΄λ‘ μΈμνκ³ , μ€νλ§ λΉμ΄ μ±κΈν€μ μ μ§νλλ‘ μΆκ° μ²λ¦¬λ₯Ό νλ€.
- `@Service` : νΉλ³ν μ²λ¦¬λ₯Ό νμ§ μλλ€. λΉμ¦λμ€ κ³μΈ΅μ κ°λ°μλ€μ΄ μΈμνλλ° λμμ μ€λ€.

> `useDefaultFilters` μ΅μμ κΈ°λ³ΈμΌλ‘ μΌμ Έμλ€. μ΄ μ΅μμ λλ©΄ κΈ°λ³Έ μ€μΊ λμλ€μ΄ μ μΈλλ€.

---

## π― νν°
- `includeFilters` : μ»΄ν¬λνΈ μ€μΊ λμμ μΆκ°λ‘ μ§μ νλ€.
- `excludeFilters` : μ»΄ν¬λνΈ μ€μΊμμ μ μΈν  λμμ μ§μ νλ€.

**μ»΄ν¬λνΈ μ€μΊ λμμ μΆκ°ν  μ΄λΈνμ΄μ**
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

- `TYPE` : ν΄λμ€ λ λ²¨μ λΆλ μ΄λΈνμ΄μ
- `MyIncludeComponent` μ΄λΈνμ΄μμ΄ λΆμ ν΄λμ€(μμμλ `BeanA`)λ μ»΄ν¬λνΈ μ€μΊμ μΆκ°ν  κ²μ΄λ€!!!

**μ»΄ν¬λνΈ μ€μΊ λμμμ μ μΈν  μ΄λΈνμ΄μ**
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

- `MyExcludeComponent` μ΄λΈνμ΄μμ΄ λΆμ ν΄λμ€(μμμλ `BeanB`)λ μ»΄ν¬λνΈ μ€μΊμμ μ μΈν  κ²μ΄λ€!!!

**μ€μ  μ λ³΄μ νμ€νΈ μ½λ**
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

- `ComponentFilterAppConfig` μ€μ  μ λ³΄λ μ»΄ν¬λνΈ μ€μΊμ μννλλ°, `MyIncludeComponent` μ΄λΈνμ΄μμ΄ λΆμ ν΄λμ€λ μ»΄ν¬λνΈ μ€μΊ λμμ ν¬ν¨νκ³ , `MyExcludeComponent` μ΄λΈνμ΄μμ΄ λΆμ ν΄λμ€λ ν¬ν¨νμ§ μλλ€.

### πͺ FilterType μ΅μ
5κ°μ§ μ΅μμ΄ μλ€.

- `ANNOTATION` : κΈ°λ³Έκ°, μ΄λΈνμ΄μμ μΈμν΄μ λμνλ€. (μλ΅ κ°λ₯)
  - ex. `org.example.SomeAnnotation`
- `ASSIGNABLE_TYPE` : μ§μ ν νμκ³Ό μμ νμμ μΈμν΄μ λμνλ€.
  - ex. `org.example.SomeClass`
- `ASPECTJ` : AspectJ ν¨ν΄ μ¬μ©
  - ex. `org.example..*Service+`
- `REGEX` : μ κ· ννμ
  - ex. `org\.example\.Default.*`
- `CUSTOM` : `TypeFilter` λΌλ μΈν°νμ΄μ€λ₯Ό κ΅¬νν΄μ μ²λ¦¬
  - ex. `org.example.MyTypeFilter`

μλ₯Ό λ€μ΄ `BeanA` ν΄λμ€λ μ»΄ν¬λνΈ μ€μΊμμ μ μΈνκ³  μΆλ€λ©΄,

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

> `includeFilters` λ₯Ό κ±°μ μ¬μ©ν  μΌμ μλ€! `@Component` λ©΄ μΆ©λΆνλ€...

---

## π― μ€λ³΅ λ±λ‘κ³Ό μΆ©λ
μ»΄ν¬λνΈ μ€μΊμμ κ°μ λΉ μ΄λ¦μ λ±λ‘νλ©΄ μ΄λ»κ² λ κΉ? λ€μκ³Ό κ°μ λ κ°μ§ μν©μ΄ μλ€.
- μλ λΉ λ±λ‘ vs. μλ λΉ λ±λ‘
- μλ λΉ λ±λ‘ vs. μλ λΉ λ±λ‘

### πͺ μλ λΉ λ±λ‘ vs. μλ λΉ λ±λ‘
μ»΄ν¬λνΈ μ€μΊμ μν΄ μλμΌλ‘ μ€νλ§ λΉμ΄ λ±λ‘λλλ°, κ·Έ μ΄λ¦μ΄ κ°μ κ²½μ° μ€νλ§μ μ€λ₯λ₯Ό λ°μμν¨λ€.
- `ConflictingBeanDefinitionException` μμΈ λ°μ!

### πͺ μλ λΉ λ±λ‘ vs. μλ λΉ λ±λ‘

```java
@Component
public class MemoryMemberRepository implements MemberRepository {}
```

- μλ λΉ λ±λ‘

```java
@Configuration
@ComponentScan(
        excludeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Configuration.class),
        basePackages = "hello.core"
)
public class AutoAppConfig {
    
    // λΉ λ±λ‘ μ, λ§¨ μ κΈμλ μλ¬Έμλ‘!
    @Bean(name = "memoryMemberRepository")
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }
}
```

- μλ λΉ λ±λ‘
- κ·Έλ¦¬κ³  μ΄λ κ² μλ λΉ λ±λ‘κ³Ό μλ λΉ λ±λ‘μ΄ μΆ©λλλ κ²½μ°, **μλ λΉ λ±λ‘μ΄ μ°μ κΆ**μ κ°μ Έ μλ λΉμ΄ μλ λΉμ μ€λ²λΌμ΄λ©ν΄λ²λ¦°λ€.

**μλ λΉ λ±λ‘ μ λ¨λ λ‘κ·Έ**
```shell
Overriding bean definition for bean 'memoryMemberRepository' with a different definition: replacing
```

- μ΅κ·Ό μ€νλ§ λΆνΈμμλ μλ λΉ λ±λ‘κ³Ό μλ λΉ λ±λ‘μ΄ μΆ©λλλ©΄, μ€λ₯κ° λ°μνλλ‘ κΈ°λ³Έ κ°μ λ°κΏ¨λ€. (μ€νλ§ λΆνΈμΈ `CoreApplication` μ μ€νν΄λ³΄λ©΄ μ€λ₯λ₯Ό νμΈν  μ μλ€.)

>> ν­μ μ‘κΈ° μ΄λ €μ΄ λ²κ·Έλ μ λ§€ν λ²κ·Έλ€!

## π μ€μν κ°λ
μ»΄ν¬λνΈ μ€μΊ, μ΄λΈνμ΄μ

## π μ°Έκ³ 
- [μ€νλ§ ν΅μ¬ μλ¦¬ - κΈ°λ³ΈνΈ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)
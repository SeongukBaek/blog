---
title: "π 4. μ€νλ§ μ»¨νμ΄λμ μ€νλ§ λΉ"
description: "μ€νλ§ ν΅μ¬ μλ¦¬ - κΈ°λ³ΈνΈ κ°μ μ λ¦¬"
date: 2022-07-11
update: 2022-07-11
tags:
  - Java
  - SpringBoot
series: "π μ€νλ§ ν΅μ¬ μλ¦¬ - κΈ°λ³ΈνΈ"
---

<em><strong>[μ€νλ§ ν΅μ¬ μλ¦¬ - κΈ°λ³ΈνΈ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)μ λ€μΌλ©° μ λ¦¬νλ POSTμλλ€.</strong></em>

## π― μ€νλ§ μ»¨νμ΄λ μμ±
μ€νλ§ μ»¨νμ΄λκ° μμ±λλ κ³Όμ μ μμλ³Έλ€.

```java
ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
```

- `ApplicationContext` λ₯Ό μ€νλ§ μ»¨νμ΄λλΌ νλ€. κ·Έλ¦¬κ³  μ΄λ μΈν°νμ΄μ€μ΄λ€. (`AnnotationConfigApplicationContext` λ κ΅¬μ²΄ ν΄λμ€)
- μ€νλ§ μ»¨νμ΄λλ XMLμ κΈ°λ°μΌλ‘ λ§λ€ μ μκ³ , μ΄λΈνμ΄μ κΈ°λ°μ μλ° μ€μ  ν΄λμ€λ‘ λ§λ€ μ μλ€. (μ΄μ μ λ€λ£¬ `AppConfig` λ₯Ό μ¬μ©ν λ°©μμ΄ μ΄λΈνμ΄μ κΈ°λ°μ μλ° μ€μ  ν΄λμ€λ‘ λ§λ  μ)

### πͺ 1. μ€νλ§ μ»¨νμ΄λ μμ±
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/μ€νλ§μ»¨νμ΄λλ±λ‘.png" width="80%">

- `new AnnotationConfigApplicationContext(AppConfig.class)` λ₯Ό ν΅ν΄ μ€νλ§ μ»¨νμ΄λκ° μμ±λλ€. μ΄λ κ΅¬μ± μ λ³΄λ₯Ό λκ²¨μ€μΌ νκΈ°μ `AppConfig.class` λ₯Ό μ§μ νλ€.
- μ€νλ§ μ»¨νμ΄λ λ΄λΆμλ μ΄λ¦ - κ°μ²΄ μμΌλ‘ μ΄λ€μ§ λΉ μ λ³΄λ₯Ό μ μ₯νκΈ° μν μ€νλ§ λΉ μ μ₯μκ° μλ€.

### πͺ 2. μ€νλ§ λΉ λ±λ‘
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/μ€νλ§λΉλ±λ‘.png" width="80%">

- μ€νλ§ μ»¨νμ΄λλ νλΌλ―Έν°λ‘ λμ΄μ¨ μ€μ  ν΄λμ€ μ λ³΄λ₯Ό μ¬μ©ν΄ μ€νλ§ λΉμ λ±λ‘νλ€. (`@Bean` μ΄ λΆμ λ©μλλ₯Ό λͺ¨λ νΈμΆ)

**λΉ μ΄λ¦**
- λ©μλ μ΄λ¦μ μ¬μ©νλ€.
- μ§μ  λΆμ¬ν  μλ μλ€. (`@Bean(name="???")`)

> λΉ μ΄λ¦μ ν­μ κ³ μ ν΄μΌ νλ€. λ€λ₯Έ λΉμ΄ λ¬΄μλκ±°λ κΈ°μ‘΄ λΉμ λ?μ΄λ²λ¦¬λ μ€λ₯κ° λ°μν  μ μλ€.

### πͺ 3. μ€νλ§ λΉ μμ‘΄κ΄κ³ μ€μ  - μ€λΉ
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/μμ‘΄κ΄κ³μ€μ μ€λΉ.png" width="80%">

### πͺ 4. μ€νλ§ λΉ μμ‘΄κ΄κ³ μ€μ  - μλ£
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/μμ‘΄κ΄κ³μ€μ μλ£.png" width="80%">

- μ€νλ§ μ»¨νμ΄λλ μ€μ  μ λ³΄λ₯Ό μ°Έκ³ ν΄ μμ‘΄κ΄κ³λ₯Ό μ£Όμ(DI)νλ€.
- λ¨μν μλ° μ½λλ₯Ό νΈμΆνλ κ²κ³Όλ μ°¨μ΄κ° μλ€. μ΄λ μ±κΈν€ μ»¨νμ΄λμμ μ€λͺνλ€.

> μ€νλ§μ λΉμ μμ±νλ λ¨κ³μ μμ‘΄κ΄κ³λ₯Ό μ£Όμνλ λ¨κ³κ° λλ μ Έ μλ€. κ·Έλ°λ° μλ° μ½λλ‘ μ€νλ§ λΉμ λ±λ‘νλ©΄, μμ±μλ₯Ό νΈμΆνλ©΄μ μμ‘΄κ΄κ³ μ£Όμλ ν λ²μ μ²λ¦¬λλ€.

---

## π― μ»¨νμ΄λμ λ±λ‘λ λͺ¨λ  λΉ μ‘°ν
μ€νλ§ μ»¨νμ΄λμ μ€μ  μ€νλ§ λΉλ€μ΄ μ λ±λ‘λμλμ§ νμΈνλ€.

```java
package hello.core.beanFind;

import hello.core.AppConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class ApplicationContextInfoTest {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    @DisplayName("λͺ¨λ  λΉ μΆλ ₯νκΈ°")
    void findAllBean() {
        String[] beanDefinitionNames = ac.getBeanDefinitionNames();

        for (String beanDefinitionName : beanDefinitionNames) {
            Object bean = ac.getBean(beanDefinitionName);
            System.out.println("name = " + beanDefinitionName + " object = " + bean);
        }
    }
}
```

- μμ κ°μ νμ€νΈ μ½λλ‘ νμ¬ μ€νλ§ μ»¨νμ΄λμ λ±λ‘λ λͺ¨λ  λΉλ€μ νμΈν  μ μλ€.
  - `getBeanDefinitionNames()` λ‘ μ€νλ§μ λ±λ‘λ λͺ¨λ  λΉ μ΄λ¦μ μ‘°νν  μ μκ³ , `getBean()` λ©μλμ λΉ μ΄λ¦μ μ λ¬ν¨μΌλ‘μ¨ λΉ κ°μ²΄(μΈμ€ν΄μ€)λ₯Ό μ‘°νν  μ μλ€.
- νμ§λ§ μ΄μ κ°μ΄ νμΈνκ² λλ©΄, λ΄κ° λ§λ€μ§ μκ³  μλμΌλ‘ λ±λ‘λ λΉλ€ λν μΆλ ₯λκΈ°μ, μ­ν μ λ°λΌ λΉλ€μ μΆλ ₯ν΄λ³΄μ.

```java
package hello.core.beanFind;

import hello.core.AppConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class ApplicationContextInfoTest {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    ...

    @Test
    @DisplayName("μ νλ¦¬μΌμ΄μ λΉ μΆλ ₯νκΈ°")
    void findApplicationBean() {
        String[] beanDefinitionNames = ac.getBeanDefinitionNames();

        for (String beanDefinitionName : beanDefinitionNames) {
            BeanDefinition beanDefinition = ac.getBeanDefinition(beanDefinitionName);

            if (beanDefinition.getRole() == BeanDefinition.ROLE_APPLICATION) {
                Object bean = ac.getBean(beanDefinitionName);
                System.out.println("name = " + beanDefinitionName + " object = " + bean);
            }
        }
    }
}
```

- `getBeanDefinition` μ ν΅ν΄ ν΄λΉ λΉμ λν μ λ³΄λ₯Ό μ»μ μ μλ€. 
  - ν΄λΉ λΉμ μ­ν μ΄ μ§μ  λ±λ‘ν μ νλ¦¬μΌμ΄μ λΉ(`ROLE_APPLICATION`) λλ μ€νλ§μ΄ λ΄λΆμμ μ¬μ©νλ λΉ(`ROLE_INFRASTRUCTURE`)μ΄λμ λ°λΌ λλ μ μλ€.

---

## π― μ€νλ§ λΉ μ‘°ν - κΈ°λ³Έ
μ€νλ§ μ»¨νμ΄λμμ μ€νλ§ λΉμ μ°Ύλ κ°μ₯ κΈ°λ³Έμ μΈ μ‘°ν λ°©λ²
- `getBean(λΉ μ΄λ¦, νμ)` , `getBean(νμ)`
- μ‘°ν λμ μ€νλ§ λΉμ΄ μμΌλ©΄ μμΈκ° λ°μνλ€.
  - `NoSuchBeanDefinitionException: No bean named 'xxxxx' available`

```java
package hello.core.beanFind;

import hello.core.AppConfig;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static org.assertj.core.api.Assertions.*;

class ApplicationContextBasicFindTest {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    @DisplayName("λΉ μ΄λ¦μΌλ‘ μ‘°ν")
    void ifnBeanByName() {
        MemberService memberService = ac.getBean("memberService", MemberService.class);

        assertThat(memberService).isInstanceOf(MemberServiceImpl.class);
    }
}
```

- λΉ μ΄λ¦μΌλ‘ λ±λ‘λ λΉμ μ‘°ννκ³ , μ‘°νν λΉμ΄ `MemberServiceImpl` μ μΈμ€ν΄μ€μΈμ§ νμΈνλ νμ€νΈ μ½λλ₯Ό μμ±νλ€.

```java
package hello.core.beanFind;

import hello.core.AppConfig;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static org.assertj.core.api.Assertions.*;

class ApplicationContextBasicFindTest {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    ...

    @Test
    @DisplayName("μ΄λ¦ μμ΄ νμμΌλ‘λ§ μ‘°ν")
    void findBeanByType() {
        MemberService memberService = ac.getBean(MemberService.class);

        assertThat(memberService).isInstanceOf(MemberServiceImpl.class);
    }
}
```

- νμμΌλ‘λ§ μ‘°νλ κ°λ₯νλ€. νμ§λ§ κ°μ νμμ κ°μ§λ λΉμ΄ μ¬λ¬ κ°μΈ κ²½μ°λ κ³ λ €ν΄μΌ νλ€.

> νμ¬ λ μ‘°ν λͺ¨λ **μΈν°νμ΄μ€**λ‘ μ‘°ννκ³  μλ€. μ΄λ₯Ό κ΅¬μ²΄ ν΄λμ€λ‘ μ‘°νν΄λ κ°λ₯μ νμ§λ§, μ΄λ μ­ν μ΄ μλ κ΅¬νμ μμ‘΄νλ μ½λμ΄κ³ , λ³κ²½ μ μ μ°μ±μ΄ λ¨μ΄μ§λ λ¨μ μ΄ μλ€.

μ΄μ  μ€ν¨ν κ²½μ°μ νμ€νΈ μ½λ λν μμ±ν΄μΌ νλ€.

```java
package hello.core.beanFind;

import hello.core.AppConfig;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class ApplicationContextBasicFindTest {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    ...

    @Test
    @DisplayName("λΉ μ΄λ¦μΌλ‘ μ‘°ν X")
    void findBeanByNameX() {
        
        assertThrows(NoSuchBeanDefinitionException.class, 
                () -> ac.getBean("xxxxx", MemberService.class));   
    }
}
```

- `assertThrows` λ `() -> ` λ€μ λ‘μ§μ μ€ννμ λ, μμ λͺμν μμΈκ° λ°μν΄μΌ νμ€νΈκ° μ±κ³΅ν¨μ assertνλ€.

---

## π― μ€νλ§ λΉ μ‘°ν - λμΌν νμμ΄ λ μ΄μ
νμμΌλ‘ μ‘°ν μ κ°μ νμμ μ€νλ§ λΉμ΄ λ μ΄μμ΄λ©΄ μ€λ₯κ° λ°μνλ€. μ΄λλ λΉ μ΄λ¦μ μ§μ νλ€.
- `getBeanOfType()` μ μ¬μ©νλ©΄ ν΄λΉ νμμ λͺ¨λ  λΉμ μ‘°νν  μ μλ€.

```java
package hello.core.beanFind;

import hello.core.AppConfig;
import hello.core.discount.DiscountPolicy;
import hello.core.member.MemberRepository;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import hello.core.member.MemoryMemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class ApplicationContextSameBeanFindTest {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(SameBeanConfig.class);

    @Test
    @DisplayName("νμμΌλ‘ μ‘°ν μ κ°μ νμμ΄ λ μ΄μ μμΌλ©΄, μ€λ³΅ μ€λ₯κ° λ°μνλ€.")
    void findBeanByTypeDuplicate() {
        MemberRepository memberRepository = ac.getBean(MemberRepository.class);
    }

    // λμΌ νμμ λΉμ μμ±νκΈ° μν΄ λ΄λΆμμ μμ±ν ν΄λμ€
    @Configuration
    static class SameBeanConfig {

        @Bean
        public MemberRepository memberRepository1() {
            return new MemoryMemberRepository();
        }

        @Bean
        public MemberRepository memberRepository2() {
            return new MemoryMemberRepository();
        }
    }
}
```

- κΈ°μ‘΄μ `AppConfig` λ₯Ό μμ νμ§ μκ³  λμΌν νμμ λΉμ μμ±νκΈ° μν΄ `SameBeanConfig` ν΄λμ€λ₯Ό λ΄λΆμμ μμ±νκ³ , μ΄λ₯Ό μ΄μ©ν΄ `ApplicationContext` λ₯Ό μμ±νλλ‘ νλ€.
  - λ°λΌμ, μ€νλ§ μ»¨νμ΄λλ `MemberRepository` νμμ λΉμ 2κ° μμ±νλ€.
- κ·Έλ¦¬κ³  νμμΌλ‘ λΉμ μ‘°ννκ² λλ©΄, `NoUniqueBeanDefinitionException` μμΈκ° λ°μνλ€.

```java
@Test
  @DisplayName("νμμΌλ‘ μ‘°ν μ κ°μ νμμ΄ λ μ΄μ μμΌλ©΄, μ€λ³΅ μ€λ₯κ° λ°μνλ€.")
  void findBeanByTypeDuplicate() {
      assertThrows(NoUniqueBeanDefinitionException.class,
              () -> ac.getBean(MemberRepository.class));
  }
```

- μμ κ°μ΄ μμΈκ° λ°μν¨μ assertνλ€.

```java
@Test
@DisplayName("νμμΌλ‘ μ‘°ν μ κ°μ νμμ΄ λ μ΄μ μμΌλ©΄, λΉ μ΄λ¦μ μ§μ νλ©΄ λλ€.")
void findBeanByName() {
    MemberRepository memberRepository = ac.getBean("memberRepository1", MemberRepository.class);
    assertThat(memberRepository).isInstanceOf(MemberRepository.class);
}
```

- μ΄μ μ ν κ²κ³Ό κ°μ΄, λΉ μ΄λ¦μ μ§μ νμ¬ νΉμ  λΉλ§ μ‘°νν  μ μλ€.

```java
@Test
@DisplayName("νΉμ  νμμ λͺ¨λ μ‘°ννκΈ°")
void findAllBeanByType() {
    Map<String, MemberRepository> beansOfType = ac.getBeansOfType(MemberRepository.class);
    for (String key : beansOfType.keySet()) {
        System.out.println("key = " + key + " value = " + beansOfType.get(key));
    }

    assertThat(beansOfType.size()).isEqualTo(2);
}
```

- λλ νΉμ  νμμ λΉμ λͺ¨λ μ‘°ννλ λ°©λ²λ μλ€.
  - μ΄λ `getBeansOfType()` μ λ°ννμ `Map` μ΄λ€.

---

## π― μ€νλ§ λΉ μ‘°ν - μμ κ΄κ³
"λΆλͺ¨ νμμΌλ‘ μ‘°ννλ©΄, μμ νμλ ν¨κ» μ‘°ννλ€."
- κ·Έλμ λͺ¨λ  μλ° κ°μ²΄μ μ΅κ³  λΆλͺ¨μΈ `Object` νμμΌλ‘ μ‘°ννλ©΄, λͺ¨λ  μ€νλ§ λΉμ μ‘°ννλ€. 

```java
package hello.core.beanFind;

import hello.core.discount.DiscountPolicy;
import hello.core.discount.FixDiscountPolicy;
import hello.core.discount.RateDiscountPolicy;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.NoUniqueBeanDefinitionException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ApplicationContextExtendsFindTest {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(TestConfig.class);

    @Test
    @DisplayName("λΆλͺ¨ νμμΌλ‘ μ‘°ν μ, μμμ΄ λ μ΄μ μμΌλ©΄ μ€λ³΅ μ€λ₯κ° λ°μνλ€.")
    void findBeanByParentTypeDuplicate() {

        assertThrows(NoUniqueBeanDefinitionException.class,
                () -> ac.getBean(DiscountPolicy.class));
    }

    @Test
    @DisplayName("λΆλͺ¨ νμμΌλ‘ μ‘°ν μ, μμμ΄ λ μ΄μ μμΌλ©΄ λΉ μ΄λ¦μ μ§μ νλ©΄ λλ€.")
    void findBeanByParentTypeBeanName() {
        DiscountPolicy rateDiscountPolicy = ac.getBean("rateDiscountPolicy", DiscountPolicy.class);

        assertThat(rateDiscountPolicy).isInstanceOf(RateDiscountPolicy.class);
    }

    @Configuration
    static class TestConfig {
        @Bean
        public DiscountPolicy rateDiscountPolicy() {
            return new RateDiscountPolicy();
        }

        @Bean
        public DiscountPolicy fixDiscountPolicy() {
            return new FixDiscountPolicy();
        }
    }
}
```

- λΆλͺ¨ νμμΌλ‘ μ‘°ν μ, λͺ¨λ  μμ νμλ μ‘°νλλ€. μ΄λ μμμ΄ λ μ΄μ μμΌλ©΄ μ€λ³΅ μ€λ₯κ° λ°μν  κ²μ΄κ³ , λΉ μ΄λ¦μ μ§μ ν¨μΌλ‘μ¨ μ΄λ₯Ό ν΄κ²°ν  μ μλ€.

```java
@Test
@DisplayName("λΆλͺ¨ νμμΌλ‘ λͺ¨λ μ‘°ννκΈ°")
void findAllBeanByParentType() {
    Map<String, DiscountPolicy> beansOfType = ac.getBeansOfType(DiscountPolicy.class);
    for (String key : beansOfType.keySet()) {
        System.out.println("key = " + key + " value=" + beansOfType.get(key));
    }
    assertThat(beansOfType.size()).isEqualTo(2);
}

@Test
@DisplayName("λΆλͺ¨ νμμΌλ‘ λͺ¨λ μ‘°ννκΈ° - Object")
void findAllBeanByObjectType() {
    Map<String, Object> beansOfType = ac.getBeansOfType(Object.class);
    for (String key : beansOfType.keySet()) {
        System.out.println("key = " + key + " value=" +
                beansOfType.get(key));
    } 
}
```

- μ΅κ³  λΆλͺ¨ νμμΈ `Object` λ‘ μ‘°ννλ©΄, λ±λ‘λ λͺ¨λ  λΉλ€μ μ‘°νν  μ μλ€.
  - μλ°μ κ°μ²΄λ λͺ¨λ `Object` μ΄κΈ° λλ¬Έμ΄λ€.

---

## π― BeanFactoryμ ApplicationContext
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/BF&AC.png" width="80%">

**BeanFactory**
- μ€νλ§ μ»¨νμ΄λμ μ΅μμ μΈν°νμ΄μ€
- μ€νλ§ λΉμ κ΄λ¦¬νκ³  μ‘°ννλ μ­ν μ λ΄λΉνλ€.
  - `getBean()` μ κ³΅
- μ§κΈκΉμ§ μ¬μ©νλ λλΆλΆμ κΈ°λ₯μ μ κ³΅νλ€. νμ§λ§ `BeanFactory` λ₯Ό μ§μ  μ¬μ©ν  μΌμ κ±°μ μκ³ , μλμ `ApplicationContext` λ₯Ό μ¬μ©νλ€.

**ApplicationContext**
- `BeanFactory` λ₯Ό μμλ°κΈ°μ, ν΄λΉ κΈ°λ₯μ λΆκ° κΈ°λ₯μ μΆκ°νκ³  μλ€.
- λΉμ κ΄λ¦¬νκ³  κ²μνλ κΈ°λ₯μ `BeanFactory` κ° μ κ³΅νκ³  μλλ°, μ΄λ€ μ°¨μ΄κ° μμκΉ?
- μ νλ¦¬μΌμ΄μ κ°λ° μ λΉμ κ΄λ¦¬νκ³  μ‘°ννλ κΈ°λ₯ λΏ μλλΌ μλ§μ λΆκ° κΈ°λ₯μ΄ νμνλ€. μλλ `ApplicationContext` κ° μ κ³΅νλ λΆκ° κΈ°λ₯μ΄λ€.

**ApplicationContextκ° μ κ³΅νλ λΆκ° κΈ°λ₯**
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/ACλΆκ°κΈ°λ₯.png" width="80%">

- `MessageSource` λ₯Ό νμ©ν κ΅­μ ν κΈ°λ₯
  - νκ΅­μμ λ€μ΄μ€λ©΄ νκ΅­μ΄λ‘, μμ΄κΆμμ λ€μ΄μ€λ©΄ μμ΄λ‘ μΆλ ₯
- `EnvironmentCapable` νκ²½ λ³μ
  - λ‘μ»¬, κ°λ°, μ΄μ λ±μ κ΅¬λΆν΄μ μ²λ¦¬
- `ApplicationEventPublisher`
  - μ΄λ²€νΈλ₯Ό λ°ννκ³  κ΅¬λνλ λͺ¨λΈμ νΈλ¦¬νκ² μ§μ
- `ResourceLoader` νΈλ¦¬ν λ¦¬μμ€ μ‘°ν
  - νμΌ, ν΄λμ€ν¨μ€, μΈλΆ λ±μμ λ¦¬μμ€λ₯Ό νΈλ¦¬νκ² μ‘°ν

> `BeanFactory` λ `ApplicationContext` λ₯Ό **μ€νλ§ μ»¨νμ΄λ**λΌ νλ€.

---

## π― λ€μν μ€μ  νμ μ§μ - μλ° μ½λ, XML
μ€νλ§ μ»¨νμ΄λλ λ€μν νμμ μ€μ  μ λ³΄λ₯Ό μ§μνλλ‘ μ€κ³λμ΄ μλ€.
- μλ° μ½λ, XML, Groovy λ±

<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/λ€μνμ€μ .png" width="80%">

**μ΄λΈνμ΄μ κΈ°λ° μλ° μ½λ μ€μ  μ¬μ©**
- `new AnnotationConfigApplicationContext(AppConfig.class)`
- `AnnotationConfigApplicationContext` ν΄λμ€λ₯Ό μ¬μ©νλ©΄μ μλ° μ½λλ‘ λ μ€μ  μ λ³΄λ₯Ό λκ²¨ μ¬μ©νλ€.

**XML μ€μ  μ¬μ©**
- μ΅κ·Όμλ λ§μ΄ μ¬μ©νμ§ μμ§λ§, μμ§ λ§μ νλ‘μ νΈλ€μ΄ XMLλ‘ λμ΄ μλ€.
- μ΄λ₯Ό μ¬μ©νλ©΄ μ»΄νμΌ μμ΄ λΉ μ€μ  μ λ³΄λ₯Ό λ³κ²½ν  μ μλ μ₯μ μ΄ μλ€.
- `GenericXmlApplicationContext` λ₯Ό μ¬μ©νλ©΄μ `xml` μ€μ  νμΌμ λκ²¨ μ¬μ©νλ€.

**`XmlAppConfig` μ¬μ© μλ° μ½λ**
```java
package hello.core.xml;

import hello.core.member.MemberService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;

public class XmlAppContext {

    @Test
    void xmlAppContext() {
        ApplicationContext ac = new GenericXmlApplicationContext("appConfig.xml");
        MemberService memberService = ac.getBean("memberService", MemberService.class);

        assertThat(memberService).isInstanceOf(MemberService.class);
    }
}
```

**xml κΈ°λ°μ μ€νλ§ λΉ μ€μ  μ λ³΄**
```xml
<!-- src/main/resources/appConfig.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="memberService" class="hello.core.member.MemberServiceImpl">
        <constructor-arg name="memberRepository" ref="memberRepository" />
    </bean>
    
    <bean id="memberRepository" class="hello.core.member.MemoryMemberRepository" />

    <bean id="orderService" class="hello.core.order.OrderServiceImpl">
          <constructor-arg name="memberRepository" ref="memberRepository" />
          <constructor-arg name="discountPolicy" ref="discountPolicy" />
    </bean>
    <bean id="discountPolicy" class="hello.core.discount.RateDiscountPolicy" />
</beans>
```

- xml κΈ°λ°μ μ€νλ§ μ€μ  μ λ³΄μ μλ° μ½λλ‘ λ μ€μ  μ λ³΄λ₯Ό λΉκ΅νλ©΄ κ±°μ λΉμ·νλ€.

---

## π― μ€νλ§ λΉ μ€μ  λ©ν μ λ³΄ - BeanDefinition
μ€νλ§μ΄ λ€μν μ€μ  νμμ μ§μν  μ μλ μ€μ¬μ `BeanDefinition` μ΄λΌλ μΆμνκ° μλ€.
- **μ­ν κ³Ό κ΅¬νμ κ°λμ μΌλ‘ λλμλ€.**
  - XMLμ μ½μ΄ `BeanDefinition` μ λ§λ λ€.
  - μλ° μ½λλ₯Ό μ½μ΄ `BeanDefinition` μ λ§λ λ€.
  - **μ€νλ§ μ»¨νμ΄λλ μ€μ§ λ§λ€μ΄μ§ `BeanDefinition` λ§ νμ**λ‘ νλ€.
- `BeanDefinition` μ **λΉ μ€μ  λ©ν μ λ³΄**λΌ νλ€.
  - `@Bean` , `<bean></bean>` λΉ κ°κ° νλμ©μ λ©ν μ λ³΄κ° μμ±λλ€.
- κ·Έλ¦¬κ³  μ€νλ§ μ»¨νμ΄λλ μ΄ λ©ν μ λ³΄λ₯Ό κΈ°λ°μΌλ‘ μ€νλ§ λΉμ μμ±νλ€.

<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/beandefinition.png" width="80%">

**μ½λ λ λ²¨**
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/μ½λλ λ²¨.png" width="80%">

- `AnnotationConfigApplicationContext` λ `AnnotatedBeanDefinitionReader` λ₯Ό μ¬μ©ν΄μ `AppConfig.class` λ₯Ό μ½κ³  `BeanDefinition` μ μμ±νλ€.
- `GenericXmlApplicationContext` λ `XmlBeanDefinitionReader` λ₯Ό μ¬μ©ν΄μ `appConfig.xml` μ€μ  μ λ³΄λ₯Ό μ½κ³  `BeanDefinition` μ μμ±νλ€.
- μλ‘μ΄ νμμ μ€μ  μ λ³΄κ° μΆκ°λλ©΄, `XxxBeanDefinitionReaderλ₯Ό` λ§λ€μ΄μ `BeanDefinition` μ μμ±νλ©΄ λλ€.

### πͺ BeanDefinition μ΄ν΄λ³΄κΈ°
**BeanDefinition** μ λ³΄
- `BeanClassName`: μμ±ν  λΉμ ν΄λμ€ λͺ(μλ° μ€μ  μ²λΌ ν©ν λ¦¬ μ­ν μ λΉμ μ¬μ©νλ©΄ μμ) 
- `factoryBeanName`: ν©ν λ¦¬ μ­ν μ λΉμ μ¬μ©ν  κ²½μ° μ΄λ¦, μ) appConfig 
- `factoryMethodName`: λΉμ μμ±ν  ν©ν λ¦¬ λ©μλ μ§μ , μ) memberService
- `Scope`: μ±κΈν€(κΈ°λ³Έκ°)
- `lazyInit`: μ€νλ§ μ»¨νμ΄λλ₯Ό μμ±ν  λ λΉμ μμ±νλ κ²μ΄ μλλΌ, μ€μ  λΉμ μ¬μ©ν  λ κΉμ§ μ΅λν μμ±μ μ§μ°μ²λ¦¬ νλμ§ μ¬λΆ
- `InitMethodName`: λΉμ μμ±νκ³ , μμ‘΄κ΄κ³λ₯Ό μ μ©ν λ€μ νΈμΆλλ μ΄κΈ°ν λ©μλ λͺ 
- `DestroyMethodName`: λΉμ μλͺμ£ΌκΈ°κ° λλμ μ κ±°νκΈ° μ§μ μ νΈμΆλλ λ©μλ λͺ 
- `Constructor arguments`, `Properties`: μμ‘΄κ΄κ³ μ£Όμμμ μ¬μ©νλ€. (μλ° μ€μ  μ²λΌ ν©ν λ¦¬ μ­ν μ
λΉμ μ¬μ©νλ©΄ μμ)

## π μ€μν κ°λ
μ€νλ§ μ»¨νμ΄λ, λΉ

## π μ°Έκ³ 
- [μ€νλ§ ν΅μ¬ μλ¦¬ - κΈ°λ³ΈνΈ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)
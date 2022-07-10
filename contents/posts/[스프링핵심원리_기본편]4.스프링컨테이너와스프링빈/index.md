---
title: "📟 4. 스프링 컨테이너와 스프링 빈"
description: "스프링 핵심 원리 - 기본편 강의 정리"
date: 2022-07-11
update: 2022-07-11
tags:
  - Java
  - SpringBoot
series: "📟 스프링 핵심 원리 - 기본편"
---

<em><strong>[스프링 핵심 원리 - 기본편](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)을 들으며 정리하는 POST입니다.</strong></em>

## 🎯 스프링 컨테이너 생성
스프링 컨테이너가 생성되는 과정을 알아본다.

```java
ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
```

- `ApplicationContext` 를 스프링 컨테이너라 한다. 그리고 이는 인터페이스이다. (`AnnotationConfigApplicationContext` 는 구체 클래스)
- 스프링 컨테이너는 XML을 기반으로 만들 수 있고, 어노테이션 기반의 자바 설정 클래스로 만들 수 있다. (이전에 다룬 `AppConfig` 를 사용한 방식이 어노테이션 기반의 자바 설정 클래스로 만든 예)

### 🪔 1. 스프링 컨테이너 생성
<img src="../../images/스프링핵심원리-기본편/스프링컨테이너등록.png" width="80%">

- `new AnnotationConfigApplicationContext(AppConfig.class)` 를 통해 스프링 컨테이너가 생성된다. 이때 구성 정보를 넘겨줘야 하기에 `AppConfig.class` 를 지정했다.
- 스프링 컨테이너 내부에는 이름 - 객체 쌍으로 이뤄진 빈 정보를 저장하기 위한 스프링 빈 저장소가 있다.

### 🪔 2. 스프링 빈 등록
<img src="../../images/스프링핵심원리-기본편/스프링빈등록.png" width="80%">

- 스프링 컨테이너는 파라미터로 넘어온 설정 클래스 정보를 사용해 스프링 빈을 등록한다. (`@Bean` 이 붙은 메소드를 모두 호출)

**빈 이름**
- 메소드 이름을 사용한다.
- 직접 부여할 수도 있다. (`@Bean(name="???")`)

> 빈 이름은 항상 고유해야 한다. 다른 빈이 무시되거나 기존 빈을 덮어버리는 오류가 발생할 수 있다.

### 🪔 3. 스프링 빈 의존관계 설정 - 준비
<img src="../../images/스프링핵심원리-기본편/의존관계설정준비.png" width="80%">

### 🪔 4. 스프링 빈 의존관계 설정 - 완료
<img src="../../images/스프링핵심원리-기본편/의존관계설정완료.png" width="80%">

- 스프링 컨테이너는 설정 정보를 참고해 의존관계를 주입(DI)한다.
- 단순히 자바 코드를 호출하는 것과는 차이가 있다. 이는 싱글톤 컨테이너에서 설명한다.

> 스프링은 빈을 생성하는 단계와 의존관계를 주입하는 단계가 나눠져 있다. 그런데 자바 코드로 스프링 빈을 등록하면, 생성자를 호출하면서 의존관계 주입도 한 번에 처리된다.

---

## 🎯 컨테이너에 등록된 모든 빈 조회
스프링 컨테이너에 실제 스프링 빈들이 잘 등록되었는지 확인한다.

```java
package hello.core.beanFind;

import hello.core.AppConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class ApplicationContextInfoTest {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    @DisplayName("모든 빈 출력하기")
    void findAllBean() {
        String[] beanDefinitionNames = ac.getBeanDefinitionNames();

        for (String beanDefinitionName : beanDefinitionNames) {
            Object bean = ac.getBean(beanDefinitionName);
            System.out.println("name = " + beanDefinitionName + " object = " + bean);
        }
    }
}
```

- 위와 같은 테스트 코드로 현재 스프링 컨테이너에 등록된 모든 빈들을 확인할 수 있다.
  - `getBeanDefinitionNames()` 로 스프링에 등록된 모든 빈 이름을 조회할 수 있고, `getBean()` 메소드에 빈 이름을 전달함으로써 빈 객체(인스턴스)를 조회할 수 있다.
- 하지만 이와 같이 확인하게 되면, 내가 만들지 않고 자동으로 등록된 빈들 또한 출력되기에, 역할에 따라 빈들을 출력해보자.

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
    @DisplayName("애플리케이션 빈 출력하기")
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

- `getBeanDefinition` 을 통해 해당 빈에 대한 정보를 얻을 수 있다. 
  - 해당 빈의 역할이 직접 등록한 애플리케이션 빈(`ROLE_APPLICATION`) 또는 스프링이 내부에서 사용하는 빈(`ROLE_INFRASTRUCTURE`)이냐에 따라 나눌 수 있다.

---

## 🎯 스프링 빈 조회 - 기본

---

## 🎯 스프링 빈 조회 - 동일한 타입이 둘 이상

---

## 🎯 BeanFactory와 ApplicationContext

---

## 🎯 다양한 설정 형식 지원 - 자바 코드, XML

---

## 🎯 스프링 빈 설정 메타 정보 - BeanDefinition


## 📌 중요한 개념


## 📕 참고
- [스프링 핵심 원리 - 기본편](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)
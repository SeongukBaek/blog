---
title: "💬 AOP"
description: "개발 상식"
date: 2022-03-25
update: 2022-03-25
tags:
  - 개발상식
  - Java
  - AOP
series: "💬 면접"
---

## 🧷 Spring AOP란 
**Aspect Oriented Programming**의 약자인 AOP는 **관점 지향 프로그래밍**이라고 한다. 관점 지향이란, 어떤 로직을 기준으로 핵심적인 관점과 부가적인 관점으로 나누어서 보고, 그 관점을 기준으로 각각을 모듈화하는 것이다.
- 예를 들면 핵심적인 관점은 우리가 적용하고자 하는 핵심 비즈니스 로직이고, 부가적인 관점은 해심 로직을 실행하기 위해 행해지는 DB 연결, 로깅, 파일 입출력 등이 있다.

코드를 부분적으로 나눠서 모듈화하게 되면, 소스 코드 상에서 다른 부분에 계속 반복적으로 쓰이는 코드들을 발견할 수 있는데, 이를 **흩어진 관심사**(Crosscutting Concerns)라 한다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F994AA3335C1B8C9D28" width="60%">

- 위 그림에서 AspectX, Y, Z는 서로 다른 객체에서 반복적으로 사용되고 있는 것을 확인할 수 있다.
- 이렇게 **흩어진 관심사를 Aspect로 모듈화하고 핵심적인 비즈니스 로직에서 분리하여 재사용**하겠다는 것이 AOP의 목표이다.

### 🗝 AOP 주요 개념
**Aspect**
- 흩어진 관심사를 모듈화한 것으로, 주로 부가 기능을 모듈화한다.

**Target**
- Aspect를 적용하는 곳이다.(클래스, 메소드, ...)

**Advice**
- 실질적으로 어떤 일을 해야할 지에 대한 것으로, 실질적인 부가 기능을 담은 구현체라고 할 수 있다.

**JoinPoint**
- Advice가 적용될 위치로, 메소드 진입 시점, 생성자 호출 시점, 필드에서 값을 꺼내올 때 등 다양한 시점에 적용 가능하다.

**PointCut**
- JoinPoint의 상세한 스펙을 정의한 것으로, 'A란 메소드의 진입 시점에 호출할 것'과 같이 더 구체적으로 Advice가 실행될 지점을 정할 수 있다.

### 🗝 Spring AOP 특징
- 프록시 패턴 기반의 AOP 구현체, 프록시 객체(대리 객체, 가짜 객체)를 쓰는 이유는 접근 제어 및 부가 기능의 추가를 위해서이다. 
- 스프링 빈에만 AOP를 적용 가능하다.
- 모든 AOP 기능을 제공하는 것이 아닌 스프링 IoC(Inversion Of Control)와 연동하여 엔터프라이즈 애플리케이션에서 가장 흔한 문제(중복 코드, 프록시 클래스 작성의 번거로움, 객체들 간 관계 복잡도 증가, ...)에 대한 해결책을 지원하는 것이 목적이다.

> **스프링 IoC(Inversion Of Control)**
> - 제어의 역전이라는 의미로, 메소드나 객체의 호출 작업을 개발자가 결정하는 것이 아닌 외부에서 결정되는 것을 의미한다.
>> 추후에 DI와 함께 정리해야겠다.

### 🗝 @AOP
`@AOP` 를 사용하기 위해서는 아래 의존성의 추가가 필요하다,
```xml
implementation 'org.springframework.boot:spring-boot-starter-aop'
```

## 📕 참고
- [스프링 AOP ( Aspect Oriented Programming )](https://engkimbs.tistory.com/746)
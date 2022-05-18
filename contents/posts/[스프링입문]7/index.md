---
title: "📺 7. AOP"
description: "스프링 입문 강의 정리"
date: 2022-01-13
update: 2022-01-13
tags:
  - Java
  - SpringBoot
series: "📺 스프링 입문"
---

<em><strong>[스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)을 들으며 정리하는 POST입니다.</strong></em>

> **전체적인 흐름**
> - Spring Project 생성
> - Spring boot로 웹 서버 실행
> - 회원 도메인 개발
> - 웹 MVC 개발
> - DB 연동 - JDBC, JPA, Spring data JPA
> - 테스트 케이스 작성

## 🔍 AOP가 필요한 상황
- 모든 method의 호출 시간을 측정하고 싶다면?
- 공통 관심 사항(cross-cutting concern) vs. 핵심 관심 사항(core concern)
- 회원 가입 시간, 회원 조회 시간을 측정하고 싶다면?

`service/MemberService.java`

```java
public Long join(Member member) {

    long start = System.currentTimeMillis();
    try {
        ValidateDuplicateMember(member); // 이름 중복 회원 검증
        memberRepository.save(member);
        return member.getId();
    } finally {
        long finish = System.currentTimeMillis();
        long timeMs = finish - start;
        System.out.println("join = " + timeMs + "ms");
    }
}
```

- method가 시작하는 시간과 끝날 때의 시간의 차이를 보여준다.
- `try - finally` 문을 이용하여 예외가 발생해도 호출 시간을 측정할 수 있도록 한다.
- 회원가입 Test code를 실행해보면, 호출 시간에 대한 결과가 출력이 되는 것을 확인할 수 있다.

```java
// 전체 회원 조회
public List<Member> findMembers() {
    long start = System.currentTimeMillis();

    try {
        return memberRepository.findAll();
    } finally {
        long finish = System.currentTimeMillis();
        long timeMs = finish - start;
        System.out.println("findMembers = " + timeMs + "ms");
    }
}
```

- 회원 목록 기능 시 사용되는 `findMembers` method의 시간 확인을 위해 스프링을 동작시켜 회원 목록을 확인하고자 하면, 아래와 같은 결과를 볼 수 있다.<img src="https://images.velog.io/images/bsu1209/post/f924b40d-0f8b-4cea-9a4a-7481a73db05a/image.png" width="100%">
- 처음 실행했을 때는 Loading으로 인해 시간이 오래 걸리지만, 몇 번 더 수행해보면 시간이 줄어든다.

<img src="https://images.velog.io/images/bsu1209/post/00a7f7b8-23d0-4f04-b1e2-6f2fa6320dbd/springboot-Page-5.drawio.png" width="80%">

<span id="prob"></span>**문제**
- 위에서 확인한 회원가입, 조회의 시간 측정 기능은 핵심 관심 사항이 아니다.
- 시간을 측정하는 로직은 공통 관심 사항이다.
- 시간을 측정하는 로직과 핵심 비즈니스의 로직(=핵심 관심 사항)이 섞여 유지보수가 어렵다.
- 시간을 측정하는 로직을 별도의 공통 로직으로 만들기 매우 어렵다.
- 시간을 측정하는 로직을 변경할 때 모든 로직을 찾아가면서 변경해야 한다.

---

## 🔍 AOP 적용
**Aspect Oriented Programming**
- 공통 관심 사항(cross-cutting concern)과 핵심 관심 사항(core concern)을 분리
- 시간 측정 로직을 한 군데에 모아두고, 적용하고자 하는 class를 지정한다.

<img src="https://images.velog.io/images/bsu1209/post/c5a09499-3a12-4c8e-ade2-24cbac174c4e/springboot-Page-5.drawio%20(1).png" width="80%">

`aop/TimeTraceAop.java`

```java
package hello.hellospring.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class TimeTraceAop {

    @Around("execution(* hello.hellospring..*(..))")
    public Object execute(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        System.out.println("START: " + joinPoint.toString());
        try {
            return joinPoint.proceed();
        } finally {
            long finish = System.currentTimeMillis();
            long timeMs = finish - start;
            System.out.println("END: " + joinPoint.toString() + " " + timeMs + "ms");
        }
    }
}

```

- Spring에서 AOP를 사용하기 위해서는 `@Aspect` annotation이 필요하다.
- AOP가 호출될 때마다 `joinPoint` 라는 중간 intercept 지점에 정보가 담긴다. 
- `@Around` annotation으로, 작성한 공통 관심 사항인 `TimeTraceAop` 를 어디 적용시킬 것인지 명시한다.
	
    - `@Around("execution(* hello.hellospring..*(..))")` 는 `hello.hellospring` package 하위에 있는 모든 class에 적용한다는 의미
- 스프링 컨테이너에 등록해야 하는데, `@Component` annotation을 사용하여 컴포넌트 스캔을 할 수도 있지만, AOP는 특별한 기능이기 때문에 `SpringConfig` 에서 아래와 같이 따로 작성할 수도 있다.

`SpringConfig`
```java
@Bean
public TimeTraceAop timeTraceAop() {
    return new TimeTraceAop();
}
```

이제 서버를 동작시켜 회원 목록 기능을 작동시키면,
```bash
START: execution(String hello.hellospring.controller.MemberController.list(Model))
START: execution(List hello.hellospring.service.MemberService.findMembers())
START: execution(List org.springframework.data.jpa.repository.JpaRepository.findAll())

END: execution(List org.springframework.data.jpa.repository.JpaRepository.findAll()) 64ms
END: execution(List hello.hellospring.service.MemberService.findMembers()) 78ms
END: execution(String hello.hellospring.controller.MemberController.list(Model)) 89ms
```

- 동작하는 class들의 method들을 확인할 수 있고, 각각의 동작 시간을 확인할 수 있다.
- 이를 통해 어느 부분에서 **병목 현상**이 발생하는지 확인할 수 있다.

**<a href="#prob">문제</a> 해결**
- 회원가입, 회원 조회 등 핵심 관심 사항과 시간을 측정하는 공통 관심 사항을 분리한다. 
- 시간을 측정하는 로직을 별도의 공통 로직으로 만들었다.
- 핵심 관심 사항을 깔끔하게 유지할 수 있다. (ex. `MemberService.java`)
- 변경이 필요하면 이 로직만 변경하면 된다.
- 원하는 적용 대상을 선택할 수 있다.

### ⛏ 스프링의 AOP 동작 방식 설명
**Dependency Injection이 기반으로 작용하기에 AOP의 동작이 가능하다.**

**AOP 적용 전 의존 관계**<br/>
<img src="https://images.velog.io/images/bsu1209/post/a80949d6-6e05-49da-9e67-1f43589f4b2a/springboot-Page-6.drawio.png" width="80%">

**AOP 적용 후 의존 관계**<br/>
<img src="https://images.velog.io/images/bsu1209/post/a9da9510-203f-4508-9c54-549861dde64e/springboot-Page-6.drawio%20(1).png" width="80%">

- AOP가 있으면, 가짜 `memberService` = 프록시 `memberService` 을 생성한다.
- 가짜 스프링 빈의 AOP가 다 실행되면, `joinPoint.proceed()` 를 통해 실제 `memberService` 를 호출한다.
- `helloController` 는 실제 `memberService` 가 아닌 프록시 기술로 생성된 가짜 `memberService` 를 호출한다.

**AOP 적용 전 전체 그림**<br/>
<img src="https://images.velog.io/images/bsu1209/post/bffdfb77-ba3a-40f0-b60b-47976f193198/springboot-Page-5.drawio.png" width="80%">

**AOP 적용 후 전체 그림**<br/>
<img src="https://images.velog.io/images/bsu1209/post/65f216e4-536a-4339-920c-436da5a6a0e7/springboot-Page-5.drawio%20(1).png" width="80%">

---

## 📌 중요한 개념
AOP, 프록시 기술

## 📕 참고
- [스프링 입문-코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)
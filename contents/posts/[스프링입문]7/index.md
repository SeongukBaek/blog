---
title: "๐บ 7. AOP"
description: "์คํ๋ง ์๋ฌธ ๊ฐ์ ์ ๋ฆฌ"
date: 2022-01-13
update: 2022-01-13
tags:
  - Java
  - SpringBoot
series: "๐บ ์คํ๋ง ์๋ฌธ"
---

<em><strong>[์คํ๋ง ์๋ฌธ - ์ฝ๋๋ก ๋ฐฐ์ฐ๋ ์คํ๋ง ๋ถํธ, ์น MVC, DB ์ ๊ทผ ๊ธฐ์ ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)์ ๋ค์ผ๋ฉฐ ์ ๋ฆฌํ๋ POST์๋๋ค.</strong></em>

> **์ ์ฒด์ ์ธ ํ๋ฆ**
> - Spring Project ์์ฑ
> - Spring boot๋ก ์น ์๋ฒ ์คํ
> - ํ์ ๋๋ฉ์ธ ๊ฐ๋ฐ
> - ์น MVC ๊ฐ๋ฐ
> - DB ์ฐ๋ - JDBC, JPA, Spring data JPA
> - ํ์คํธ ์ผ์ด์ค ์์ฑ

## ๐ AOP๊ฐ ํ์ํ ์ํฉ
- ๋ชจ๋  method์ ํธ์ถ ์๊ฐ์ ์ธก์ ํ๊ณ  ์ถ๋ค๋ฉด?
- ๊ณตํต ๊ด์ฌ ์ฌํญ(cross-cutting concern) vs. ํต์ฌ ๊ด์ฌ ์ฌํญ(core concern)
- ํ์ ๊ฐ์ ์๊ฐ, ํ์ ์กฐํ ์๊ฐ์ ์ธก์ ํ๊ณ  ์ถ๋ค๋ฉด?

`service/MemberService.java`

```java
public Long join(Member member) {

    long start = System.currentTimeMillis();
    try {
        ValidateDuplicateMember(member); // ์ด๋ฆ ์ค๋ณต ํ์ ๊ฒ์ฆ
        memberRepository.save(member);
        return member.getId();
    } finally {
        long finish = System.currentTimeMillis();
        long timeMs = finish - start;
        System.out.println("join = " + timeMs + "ms");
    }
}
```

- method๊ฐ ์์ํ๋ ์๊ฐ๊ณผ ๋๋  ๋์ ์๊ฐ์ ์ฐจ์ด๋ฅผ ๋ณด์ฌ์ค๋ค.
- `try - finally` ๋ฌธ์ ์ด์ฉํ์ฌ ์์ธ๊ฐ ๋ฐ์ํด๋ ํธ์ถ ์๊ฐ์ ์ธก์ ํ  ์ ์๋๋ก ํ๋ค.
- ํ์๊ฐ์ Test code๋ฅผ ์คํํด๋ณด๋ฉด, ํธ์ถ ์๊ฐ์ ๋ํ ๊ฒฐ๊ณผ๊ฐ ์ถ๋ ฅ์ด ๋๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

```java
// ์ ์ฒด ํ์ ์กฐํ
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

- ํ์ ๋ชฉ๋ก ๊ธฐ๋ฅ ์ ์ฌ์ฉ๋๋ `findMembers` method์ ์๊ฐ ํ์ธ์ ์ํด ์คํ๋ง์ ๋์์์ผ ํ์ ๋ชฉ๋ก์ ํ์ธํ๊ณ ์ ํ๋ฉด, ์๋์ ๊ฐ์ ๊ฒฐ๊ณผ๋ฅผ ๋ณผ ์ ์๋ค.<img src="https://images.velog.io/images/bsu1209/post/f924b40d-0f8b-4cea-9a4a-7481a73db05a/image.png" width="100%">
- ์ฒ์ ์คํํ์ ๋๋ Loading์ผ๋ก ์ธํด ์๊ฐ์ด ์ค๋ ๊ฑธ๋ฆฌ์ง๋ง, ๋ช ๋ฒ ๋ ์ํํด๋ณด๋ฉด ์๊ฐ์ด ์ค์ด๋ ๋ค.

<img src="https://images.velog.io/images/bsu1209/post/00a7f7b8-23d0-4f04-b1e2-6f2fa6320dbd/springboot-Page-5.drawio.png" width="80%">

<span id="prob"></span>**๋ฌธ์ **
- ์์์ ํ์ธํ ํ์๊ฐ์, ์กฐํ์ ์๊ฐ ์ธก์  ๊ธฐ๋ฅ์ ํต์ฌ ๊ด์ฌ ์ฌํญ์ด ์๋๋ค.
- ์๊ฐ์ ์ธก์ ํ๋ ๋ก์ง์ ๊ณตํต ๊ด์ฌ ์ฌํญ์ด๋ค.
- ์๊ฐ์ ์ธก์ ํ๋ ๋ก์ง๊ณผ ํต์ฌ ๋น์ฆ๋์ค์ ๋ก์ง(=ํต์ฌ ๊ด์ฌ ์ฌํญ)์ด ์์ฌ ์ ์ง๋ณด์๊ฐ ์ด๋ ต๋ค.
- ์๊ฐ์ ์ธก์ ํ๋ ๋ก์ง์ ๋ณ๋์ ๊ณตํต ๋ก์ง์ผ๋ก ๋ง๋ค๊ธฐ ๋งค์ฐ ์ด๋ ต๋ค.
- ์๊ฐ์ ์ธก์ ํ๋ ๋ก์ง์ ๋ณ๊ฒฝํ  ๋ ๋ชจ๋  ๋ก์ง์ ์ฐพ์๊ฐ๋ฉด์ ๋ณ๊ฒฝํด์ผ ํ๋ค.

---

## ๐ AOP ์ ์ฉ
**Aspect Oriented Programming**
- ๊ณตํต ๊ด์ฌ ์ฌํญ(cross-cutting concern)๊ณผ ํต์ฌ ๊ด์ฌ ์ฌํญ(core concern)์ ๋ถ๋ฆฌ
- ์๊ฐ ์ธก์  ๋ก์ง์ ํ ๊ตฐ๋ฐ์ ๋ชจ์๋๊ณ , ์ ์ฉํ๊ณ ์ ํ๋ class๋ฅผ ์ง์ ํ๋ค.

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

- Spring์์ AOP๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด์๋ `@Aspect` annotation์ด ํ์ํ๋ค.
- AOP๊ฐ ํธ์ถ๋  ๋๋ง๋ค `joinPoint` ๋ผ๋ ์ค๊ฐ intercept ์ง์ ์ ์ ๋ณด๊ฐ ๋ด๊ธด๋ค. 
- `@Around` annotation์ผ๋ก, ์์ฑํ ๊ณตํต ๊ด์ฌ ์ฌํญ์ธ `TimeTraceAop` ๋ฅผ ์ด๋ ์ ์ฉ์ํฌ ๊ฒ์ธ์ง ๋ช์ํ๋ค.
	
    - `@Around("execution(* hello.hellospring..*(..))")` ๋ `hello.hellospring` package ํ์์ ์๋ ๋ชจ๋  class์ ์ ์ฉํ๋ค๋ ์๋ฏธ
- ์คํ๋ง ์ปจํ์ด๋์ ๋ฑ๋กํด์ผ ํ๋๋ฐ, `@Component` annotation์ ์ฌ์ฉํ์ฌ ์ปดํฌ๋ํธ ์ค์บ์ ํ  ์๋ ์์ง๋ง, AOP๋ ํน๋ณํ ๊ธฐ๋ฅ์ด๊ธฐ ๋๋ฌธ์ `SpringConfig` ์์ ์๋์ ๊ฐ์ด ๋ฐ๋ก ์์ฑํ  ์๋ ์๋ค.

`SpringConfig`
```java
@Bean
public TimeTraceAop timeTraceAop() {
    return new TimeTraceAop();
}
```

์ด์  ์๋ฒ๋ฅผ ๋์์์ผ ํ์ ๋ชฉ๋ก ๊ธฐ๋ฅ์ ์๋์ํค๋ฉด,
```bash
START: execution(String hello.hellospring.controller.MemberController.list(Model))
START: execution(List hello.hellospring.service.MemberService.findMembers())
START: execution(List org.springframework.data.jpa.repository.JpaRepository.findAll())

END: execution(List org.springframework.data.jpa.repository.JpaRepository.findAll()) 64ms
END: execution(List hello.hellospring.service.MemberService.findMembers()) 78ms
END: execution(String hello.hellospring.controller.MemberController.list(Model)) 89ms
```

- ๋์ํ๋ class๋ค์ method๋ค์ ํ์ธํ  ์ ์๊ณ , ๊ฐ๊ฐ์ ๋์ ์๊ฐ์ ํ์ธํ  ์ ์๋ค.
- ์ด๋ฅผ ํตํด ์ด๋ ๋ถ๋ถ์์ **๋ณ๋ชฉ ํ์**์ด ๋ฐ์ํ๋์ง ํ์ธํ  ์ ์๋ค.

**<a href="#prob">๋ฌธ์ </a> ํด๊ฒฐ**
- ํ์๊ฐ์, ํ์ ์กฐํ ๋ฑ ํต์ฌ ๊ด์ฌ ์ฌํญ๊ณผ ์๊ฐ์ ์ธก์ ํ๋ ๊ณตํต ๊ด์ฌ ์ฌํญ์ ๋ถ๋ฆฌํ๋ค. 
- ์๊ฐ์ ์ธก์ ํ๋ ๋ก์ง์ ๋ณ๋์ ๊ณตํต ๋ก์ง์ผ๋ก ๋ง๋ค์๋ค.
- ํต์ฌ ๊ด์ฌ ์ฌํญ์ ๊น๋ํ๊ฒ ์ ์งํ  ์ ์๋ค. (ex. `MemberService.java`)
- ๋ณ๊ฒฝ์ด ํ์ํ๋ฉด ์ด ๋ก์ง๋ง ๋ณ๊ฒฝํ๋ฉด ๋๋ค.
- ์ํ๋ ์ ์ฉ ๋์์ ์ ํํ  ์ ์๋ค.

### โ ์คํ๋ง์ AOP ๋์ ๋ฐฉ์ ์ค๋ช
**Dependency Injection์ด ๊ธฐ๋ฐ์ผ๋ก ์์ฉํ๊ธฐ์ AOP์ ๋์์ด ๊ฐ๋ฅํ๋ค.**

**AOP ์ ์ฉ ์  ์์กด ๊ด๊ณ**<br/>
<img src="https://images.velog.io/images/bsu1209/post/a80949d6-6e05-49da-9e67-1f43589f4b2a/springboot-Page-6.drawio.png" width="80%">

**AOP ์ ์ฉ ํ ์์กด ๊ด๊ณ**<br/>
<img src="https://images.velog.io/images/bsu1209/post/a9da9510-203f-4508-9c54-549861dde64e/springboot-Page-6.drawio%20(1).png" width="80%">

- AOP๊ฐ ์์ผ๋ฉด, ๊ฐ์ง `memberService` = ํ๋ก์ `memberService` ์ ์์ฑํ๋ค.
- ๊ฐ์ง ์คํ๋ง ๋น์ AOP๊ฐ ๋ค ์คํ๋๋ฉด, `joinPoint.proceed()` ๋ฅผ ํตํด ์ค์  `memberService` ๋ฅผ ํธ์ถํ๋ค.
- `helloController` ๋ ์ค์  `memberService` ๊ฐ ์๋ ํ๋ก์ ๊ธฐ์ ๋ก ์์ฑ๋ ๊ฐ์ง `memberService` ๋ฅผ ํธ์ถํ๋ค.

**AOP ์ ์ฉ ์  ์ ์ฒด ๊ทธ๋ฆผ**<br/>
<img src="https://images.velog.io/images/bsu1209/post/bffdfb77-ba3a-40f0-b60b-47976f193198/springboot-Page-5.drawio.png" width="80%">

**AOP ์ ์ฉ ํ ์ ์ฒด ๊ทธ๋ฆผ**<br/>
<img src="https://images.velog.io/images/bsu1209/post/65f216e4-536a-4339-920c-436da5a6a0e7/springboot-Page-5.drawio%20(1).png" width="80%">

---

## ๐ ์ค์ํ ๊ฐ๋
AOP, ํ๋ก์ ๊ธฐ์ 

## ๐ ์ฐธ๊ณ 
- [์คํ๋ง ์๋ฌธ-์ฝ๋๋ก ๋ฐฐ์ฐ๋ ์คํ๋ง ๋ถํธ, ์น MVC, DB ์ ๊ทผ ๊ธฐ์ ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)
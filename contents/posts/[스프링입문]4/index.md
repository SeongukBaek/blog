---
title: "๐บ 4. ์คํ๋ง ๋น๊ณผ ์์กด๊ด๊ณ"
description: "์คํ๋ง ์๋ฌธ ๊ฐ์ ์ ๋ฆฌ"
date: 2022-01-05
update: 2022-01-05
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

> **์คํ๋ง ๋น์ ๋ฑ๋กํ๋ ๋ฐฉ๋ฒ**
> 1. ์ปดํฌ๋ํธ ์ค์บ๊ณผ ์๋ ์์กด๊ด๊ณ ์ค์ 
> 2. ์๋ฐ ์ฝ๋๋ฅผ ์ด์ฉํ ์ง์  ๋ฑ๋ก

## ๐ ์ปดํฌ๋ํธ ์ค์บ๊ณผ ์๋ ์์กด๊ด๊ณ ์ค์ 
์ด์  ์๊ฐ๊น์ง ์์ฑํ Member๊ฐ ์๋น์ค๋ฅผ ์ด์ฉํ๊ธฐ ์ํด์๋ Service, Controller ๊ฐ **์์กด์ฑ์ด ํ์**ํ๋ค.

### โ `MemberController` ์์ฑ
`controller/MemberController`

```java
import org.springframework.stereotype.Controller;

@Controller
public class MemberController {
    
}
```

- ์ด๋ ๊ฒ `@Controller` ๋ฅผ ์ฌ์ฉํด ์๋ฌด ์ฝ๋๊ฐ ์๋ controller๋ฅผ ์์ฑํ๊ฒ ๋๋ฉด, ์คํ๋ง ์ปจํ์ด๋์ `MemberController` ๋ผ๋ ๊ฐ์ฒด๊ฐ ์์ฑ๋์ด ๊ด๋ฆฌ๋๋ค.

**= Spring Bean์ด ๊ด๋ฆฌ๋๋ค๊ณ  ํํ**, [์ด๊ณณ](https://velog.io/@bsu1209/Spring-%EB%91%90%EB%B2%88%EC%A7%B8.-%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9B%B9-%EA%B0%9C%EB%B0%9C-%EA%B8%B0%EC%B4%88#%ED%85%9C%ED%94%8C%EB%A6%BF-%EC%97%94%EC%A7%84%EC%9D%B4%EB%9E%80)์์ ์คํ๋ง ์ปจํ์ด๋์ ๊ตฌ์กฐ๋ฅผ ํ์ธํ  ์ ์๋ค.

```java
private final MemberService memberService = new MemberService();
```
- Controller์์, `new` ๋ฅผ ์ด์ฉํ์ฌ ๊ฐ์ฒด๋ฅผ ์์ฑํด ์ฌ์ฉํ  ์๋ ์์ง๋ง, ์คํ๋ง์ด ๊ด๋ฆฌํ๊ธฐ ๋๋ฌธ์ ์ปจํ์ด๋์ ๋ฑ๋กํ๊ณ  ์ด๋ก๋ถํฐ ๋ฐ์์ ์ฌ์ฉํ๋๋ก ๋ฐ๊ฟ์ผ ํ๋ค.
    - **๋ค๋ฅธ code์์๋ ๋์ผ ์๋น์ค ๊ฐ์ฒด๋ฅผ ์ฌ๋ฌ ๋ฒ ์์ฑํ์ฌ ์ฌ์ฉํ๋ ๊ฒ์ ๋ถํ์**ํ๊ธฐ ๋๋ฌธ์ด๋ค.

```java
@Autowired
public MemberController(MemberService memberService) {
    this.memberService = memberService;
}
```

- ์์ฑ์๋ฅผ ์ด์ฉํ์ฌ ์คํ๋ง ์ปจํ์ด๋์ ์ฐ๊ฒฐํ๋ค.

์ด๋, `@Autowired` ๋ฅผ ์ด์ฉํ๋๋ฐ, ์ด๋ ํธ์ถ๋ ์์ฑ์์ ํ๋ผ๋ฏธํฐ์ ์คํ๋ง ์ปจํ์ด๋๋ฅผ ์ฐ๊ฒฐ์์ผ์ค๋ค. ์์ ์์ ์์๋ ์คํ๋ง ์ปจํ์ด๋์ ์๋ `MemberService` ์ ์ฐ๊ฒฐ์ ์ํํ๋ค.

์คํ์ ํ๊ฒ ๋๋ฉด
```shell
Parameter 0 of constructor in hello.hellospring.controller.MemberController required a bean of type 'hello.hellospring.service.MemberService' that could not be found.
```

์์ ๊ฐ์ด **`MemberService` ๋ฅผ ์ฐพ์ ์ ์๋ค๋ ์๋ฌ**๊ฐ ๋ฐ์ํ๋ค.

์ด๋ฌํ ์ด์ ๋, ์ด์ ์ ์์ฑํ **`MemberService` ๋ ์์ํ Java ์ฝ๋์ด๋ฏ๋ก, ์คํ๋ง์ด ์ด๋ฅผ ์ธ์ํ  ๋ฐฉ๋ฒ์ด ์๋ค.**

```java
@Service
public class MemberService
```

๋ฐ๋ผ์ ์คํ๋ง ์ปจํ์ด๋๊ฐ ํด๋น Service๋ฅผ ์ธ์ํ๊ณ  ๋ฑ๋กํ  ์ ์๋๋ก **`@Service` annotation**์ ์ฌ์ฉํ๋ค.

๋ํ ์ ์ฒด์ ์ผ๋ก ๋ณด์์๋, 
Controller class - ์ธ๋ถ ์์ฒญ์ ๋ฐ์ - `@Controller`, 
Test class - `@SpringBootTest`, 
Repository class - Data ์ ์ฅ - `@Repository`, 
Service class - ๋น์ฆ๋์ค ๋ก์ง ์์ฑ - `@Service` 

๋ค์๊ณผ ๊ฐ์ด ๊ฐ annotation์ ์ฌ์ฉํ์ฌ ์คํ๋ง์ด ๋์ํ  ๋, ์ปจํ์ด๋์ ๋ฑ๋กํ๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

> **์ ํํ๋ ํจํด!**

**์์กด ๊ด๊ณ ์ฃผ์ (Dependency Injection)**
: Controller ์์ฑ์์ `@Autowired` ๋ฅผ ์ฌ์ฉํด ์ฐ๊ฒฐ์ ์ํ
- controller๊ฐ ์์ฑ๋  ๋, ์คํ๋ง ๋น์ ์๋ ๊ฐ์ฒด๋ฅผ ๊ฐ์ ธ๋ค ์ฐ๊ฒฐ์ ์ฌ์ฉ
  = **Dependency Injection(์์กด์ฑ ์ฃผ์)**

`MemberService.java`

```java
@Autowired
public MemberService(MemberRepository memberRepository) {
    this.memberRepository = memberRepository;
}
```

- `MemberService` ๋ํ `MemberRepository` ๋ฅผ ์ฌ์ฉํ๋ `@Service` ์ด๋ฏ๋ก, `@Autowired` annotation์ ์ด์ฉํ๋ค.
- ์ด๋ฅผ ํตํด ์คํ๋ง ์ปจํ์ด๋๋ก๋ถํฐ `MemberRepository` ๋ฅผ ์ฃผ์๋ฐ๋๋ค.

**์ปดํฌ๋ํธ ์ค์บ์ธ ์ด์ **<br/>
`@Component` ๋ฅผ ์ด์ฉํ์ฌ ์์กด ๊ด๊ณ๋ฅผ ๋ช์ํ๊ณ  ๋ฑ๋กํ๋ ๋ฐฉ์์ด๋ค.
ํ์ง๋ง ์ฐ๋ฆฌ๊ฐ ์์ฑํ class๋ค์ Annotation์ ๋ณด๋ฉด, class์ ๋ํด `@Service` , `@Controller` , `@Repository` ๋ฑ์ ์ฌ์ฉํ๋ค.

๊ทธ๋ผ ์ `@Service` ์ ๊ฐ์ด `@Component` ๋ผ๊ณ  ๋ช์ํ์ง ์์๋ ์ฌ์ฉ์ด ๊ฐ๋ฅํ ๊น ?
- `@Service` ์ `command + click` ํด๋ณด๋ฉด, ์๋์ ๊ฐ์ด `@Component` ๊ฐ ๋ช์๋์ด ์๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Service {
    /**
    * The value may indicate a suggestion for a logical component name,
    * to be turned into a Spring bean in case of an autodetected component.
    * @return the suggested component name, if any (or empty String otherwise)
    */
    @AliasFor(annotation = Component.class)
    String value() default "";
    
}
```

์๋๋ ์์์ ์ค๋ชํ **Controller**, **Service**, **Repository** ๋ฅผ ํฌํจํ๋ ์คํ๋ง ์ปจํ์ด๋์ ๊ตฌ์กฐ๋ฅผ ๊ฐ๋ตํ๊ฒ ํํํ๋ค.

<img src="https://images.velog.io/images/bsu1209/post/3301dcf1-f60e-4e23-96e7-df3c0776d454/springboot-Page-2.drawio%20(2).png" width="80%">

์ด๋ ๊ฒ `@Component` annotation์ด ์ฌ์ฉ๋ ๊ฒฝ์ฐ, ์คํ๋ง์ด ๋์ํ  ๋ ์ด๋ค์ ๋ชจ๋ **๊ฐ์ฒด** ๋ก ์์ฑํ์ฌ **์คํ๋ง ์ปจํ์ด๋์ ์๋ ๋ฑ๋ก**๋๋ค. (=์คํ๋ง ๋น์ผ๋ก ์๋ ๋ฑ๋ก)
- ์ ์์์์๋ `helloController` , `memberService` , `memberRepository` ๊ฐ ๊ฐ์ฒด๋ก ์์ฑ๋์ด ๋ฑ๋ก๋๋ค.
- ๊ทธ๋ฆฌ๊ณ , `@Autowired` annotation์ **๋ฑ๋ก๋ ๊ฐ์ฒด๊ฐ์ ์ฐ๊ด๊ด๊ณ**๋ฅผ ์๋ฏธํ๋ค.

> **๊ทธ๋ผ ์๋ฌด class์์ Annotation์ ๋ช์ํ๋ฉด ์คํ๋ง ์ปจํ์ด๋์ ์๋ ๋ฑ๋ก๋ ๊น ?**
> ์ ๋ต์ ๊ธฐ๋ณธ์ ์ผ๋ก๋ ์ฐ๋ฆฌ๊ฐ ์คํํ๋ `HelloSpringApplication` ์ `package` ์ ์์น์ ๋ฐ๋ผ ๊ฒฐ์ ๋๋ค.
> - ํด๋น package์ ๋์ผํ๊ฑฐ๋ ํ์ package์ ํฌํจ๋์ด ์๋ ๊ฒฝ์ฐ, ์คํ๋ง์ด ๋ชจ๋ ์ฐพ์ ์คํ๋ง ๋น์ผ๋ก ์ปดํฌ๋ํธ ์ค์บ์ ์ํํ๋ค.

> **์ฐธ๊ณ **
> ์คํ๋ง์ ์คํ๋ง ์ปจํ์ด๋์ ์คํ๋ง ๋น์ ๋ฑ๋กํ  ๋, **์ฑ๊ธํค์ผ๋ก ๋ฑ๋ก**ํ๋ค. (default)
> - ์ฑ๊ธํค: ์ ์ผํ๊ฒ ํ๋๋ง ๋ฑ๋กํ์ฌ ์ด๋ฅผ ๊ณต์ ํ๋ค. ์ด๋ ๊ฒ ๋๋ฉด, ๊ฐ์ ์คํ๋ง ๋น์ธ ๊ฒฝ์ฐ ๋ชจ๋ ๊ฐ์ instance๋ฅผ ์ฌ์ฉํ๋ ๊ฒ์ด๋ฏ๋ก, ๋ฉ๋ชจ๋ฆฌ๋ฅผ ์ ์ฝํ  ์ ์๋ค.

---

## ๐ ์๋ฐ ์ฝ๋๋ก ์ง์  ์คํ๋ง ๋น ๋ฑ๋กํ๊ธฐ
๋จผ์ , ์ง์  ์ฝ๋๋ก ๋ฑ๋กํ๊ธฐ ์ํด ์์์ ์ฌ์ฉํ๋ ์ปดํฌ๋ํธ ์ค์บ ์ฝ๋๋ฅผ ์ญ์ ํ๋ค. 
(์ด๋ `Controller` ๋ ์ญ์ ํ์ง ์๊ณ  ๊ทธ๋๋ก ๋๋ค.)
> `Controller` ๋ ์ด์ฐจํผ ์คํ๋ง์ด ๊ด๋ฆฌํ๊ธฐ ๋๋ฌธ์ ๊ทธ๋ฅ ์ปดํฌ๋ํธ ์ค์บ ๋ฐฉ์์ ๊ทธ๋๋ก ์ฌ์ฉํ๋ค.

์ดํ ์คํ์ ํ๊ฒ ๋๋ฉด, ์คํ๋ง ๋น์ ๋ฑ๋ก๋ ๊ฐ์ฒด๊ฐ ์์ผ๋ฏ๋ก, ์๋ฌ๊ฐ ๋ฐ์ํ๋ค.

์ด์  ์ง์  ๋ฑ๋ก์ ์ํด `HelloSpringApplication` ๊ณผ ๊ฐ์ ์์น์ `SpringConfig` class๋ฅผ ์์ฑํ๋ค.
<img src="https://images.velog.io/images/bsu1209/post/a1f4a1f6-2067-4563-8c61-2ed6e3753912/image.png" width="50%">

```java
@Configuration
public class SpringConfig {
    
    @Bean
    public MemberService memberService() {
        return new MemberService();
    }
}
```
- `@Bean` annotation์ ์คํ๋ง ๋น์ ๋ฑ๋กํ๋ค๋ ๊ฒ์ ๋ช์ํ๋ค.
- ์คํ๋ง์ด ๋์ํ  ๋, `@Configuration` ์ ์ฝ์ผ๋ฉด
    - `@Bean` ์ ์ฐพ์ ํด๋น ๋ก์ง์ ํธ์ถํ์ฌ ์ด๋ฅผ ์คํ๋ง ๋น์ผ๋ก ๋ฑ๋กํ๋ค.
- ์์ ์ฝ๋๋ ์๋ฌ๊ฐ ๋จ๋๋ฐ, ํด๊ฒฐํ๊ธฐ ์ํด์ **์์ฑ์์์์ ์ถ๊ฐ**๊ฐ ํ์ํ๋ค.

```java
@Bean
public MemberService memberService() {
    return new MemberService(memberRepository());
}

@Bean
public MemberRepository memberRepository() {
    return new MemoryMemberRepository();
} 
```
- `MemberService` ๋ `MemberRepository` ๊ฐ ํ์ํ๋ค.
- ๋จผ์ , `MemberService` ๋ฅผ ์คํ๋ง ๋น์ ๋ฑ๋กํ ๊ฒ๊ณผ ๋์ผํ๊ฒ `MemberRepository` ๋ํ ๋ฑ๋กํ๋ค.
- ๊ทธ๋ฆฌ๊ณ  ๋ฑ๋ก๋ `MemberRepository` ๋ฅผ `MemberService` ์ ์ ๋ฌํ๋ค.

์คํํ์ ๋ ๋ฌธ์  ์์ด ์ ๋์ํ๋ค.

> **DI(Dependency Injection)** ์๋ 3๊ฐ์ง ๋ฐฉ๋ฒ์ด ์๋ค.

- **Field Injection** : ๊ณ ์ ์ ์ธ ๋ฐฉ๋ฒ, ์์ ์ด ๋ถ๊ฐ๋ฅ

```java
@Autowired private MemberService memberService;
```
- **Setter Injection** : Setter๋ฅผ ํตํด ์ฃผ์, ์์ฑ ๋ฐ๋ก ์ฃผ์ ๋ฐ๋ก, setter๊ฐ publicํ๊ฒ ๋ธ์ถ๋์ด ์ํํ  ์ ์๋ค.

```java
private MemberService memberService; // final ์ ๊ฑฐ
@Autowired
public void setMemberService(MemberService memberService) {
    this.memberService = memberService;
}
```
- **Constructor Injection** : ๊ฐ์ฅ ๊ถ์ฅ, ์์กด๊ด๊ณ๊ฐ ์คํ ์ค์ ๋์ ์ผ๋ก ๋ณ๊ฒฝ๋๋ ๊ฒฝ์ฐ๋ ๊ฑฐ์ ์๊ธฐ ๋๋ฌธ์ด๋ค.

```java
public MemberController(MemberService memberService) {
    this.memberService = memberService;
}
```

โข **ํด๋น ์์ ์์๋ ๋ฐ์ดํฐ ์ ์ฅ์๊ฐ ์ ์ ๋์ง ์์ `MemoryMemberRepository` ๋ฅผ ์ฌ์ฉํ๊ธฐ ๋๋ฌธ์, ์ค์ (`SpringConfig`)์ ํตํด ์คํ๋ง ๋น์ผ๋ก ๋ฑ๋กํด์ผ ํ๋ค.**

---

## ๐ ์ค์ํ ๊ฐ๋
์์กด์ฑ ์ฃผ์

## ๐ ์ฐธ๊ณ 
- [์คํ๋ง ์๋ฌธ-์ฝ๋๋ก ๋ฐฐ์ฐ๋ ์คํ๋ง ๋ถํธ, ์น MVC, DB ์ ๊ทผ ๊ธฐ์ ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)
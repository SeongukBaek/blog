---
title: "📺 4. 스프링 빈과 의존관계"
description: "스프링 입문 강의 정리"
date: 2022-01-05
update: 2022-01-05
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

## 🔍 컴포넌트 스캔과 자동 의존관계 설정
이전 시간까지 생성한 Member가 서비스를 이용하기 위해서는 Service, Controller 간 **의존성이 필요**하다.

### ⛏ `MemberController` 생성
`controller/MemberController`

```java
import org.springframework.stereotype.Controller;

@Controller
public class MemberController {
    
}
```

- 이렇게 `@Controller` 를 사용해 아무 코드가 없는 controller를 생성하게 되면, 스프링 컨테이너에 `MemberController` 라는 객체가 생성되어 관리된다.
**= Spring Bean이 관리된다고 표현**, [이곳](https://velog.io/@bsu1209/Spring-%EB%91%90%EB%B2%88%EC%A7%B8.-%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9B%B9-%EA%B0%9C%EB%B0%9C-%EA%B8%B0%EC%B4%88#%ED%85%9C%ED%94%8C%EB%A6%BF-%EC%97%94%EC%A7%84%EC%9D%B4%EB%9E%80)에서 스프링 컨테이너의 구조를 확인할 수 있다.

```java
private final MemberService memberService = new MemberService();
```
- Controller에서, `new` 를 이용하여 객체를 생성해 사용할 수도 있지만, 스프링이 관리하기 때문에 컨테이너에 등록하고 이로부터 받아서 사용하도록 바꿔야 한다.
	
    - 다른 code에서도 동일 서비스 객체를 여러 번 생성하여 사용하는 것은 불필요하기 때문이다.

```java
@Autowired
public MemberController(MemberService memberService) {
    this.memberService = memberService;
}
```

- 생성자를 이용하여 스프링 컨테이너에 연결한다.
이때, `@Autowired` 를 이용하는데, 이는 호출된 생성자의 파라미터와 스프링 컨테이너를 연결시켜준다. 위의 예제에서는 스프링 컨테이너에 있는 `MemberService` 와 연결을 수행한다.

실행을 하게 되면
```shell
Parameter 0 of constructor in hello.hellospring.controller.MemberController required a bean of type 'hello.hellospring.service.MemberService' that could not be found.
```

위와 같이 **`MemberService` 를 찾을 수 없다는 에러**가 발생한다.

이러한 이유는, 
이전에 작성한 **`MemberService` 는 순수한 Java 코드이므로, 스프링이 이를 인식할 방법이 없다.**

```java
@Service
public class MemberService
```

따라서 스프링 컨테이너가 해당 Service를 인식하고 등록할 수 있도록 `@Service` annotation을 사용한다. 또한, 

전체적으로 보았을때, 
Controller class - 외부 요청을 받음 - `@Controller`, 
Test class - `@SpringBootTest`, 
Repository class - Data 저장 - `@Repository`, 
Service class - 비즈니스 로직 생성 - `@Service` annotation이 사용하여 스프링이 동작할 때, 컨테이너에 등록하는 것을 확인할 수 있다.

**의존 관계 주입 (Dependency Injection)**<br/>
Controller 생성자에 `@Autowired` 를 사용해 연결을 수행
- controller가 생성될 때, 스프링 빈에 있는 객체를 가져다 연결에 사용
= **Dependency Injection(의존성 주입)**

`MemberService.java`

```java
@Autowired
public MemberService(MemberRepository memberRepository) {
    this.memberRepository = memberRepository;
}
```

- `MemberService` 또한 `MemberRepository` 를 사용하는 `@Service` 이므로, `@Autowired` annotation을 이용한다.
- 이를 통해 스프링 컨테이너로부터 `MemberRepository` 를 주입받는다.

**컴포넌트 스캔인 이유**<br/>
`@Component` 를 이용하여 의존 관계를 명시하고 등록하는 방식이다.
하지만 우리가 작성한 class들의 Annotation을 보면, class에 대해 `@Service` , `@Controller` , `@Repository` 등을 사용한다.

그럼 왜 `@Service` 와 같이 `@Component` 라고 명시하지 않아도 사용이 가능할까 ?
- `@Service` 에 `command + click` 해보면, 아래와 같이 `@Component` 가 명시되어 있는 것을 확인할 수 있다.

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

아래는 위에서 설명한 **Controller**, **Service**, **Repository** 를 포함하는 스프링 컨테이너의 구조를 간략하게 표현했다.
<img src="https://images.velog.io/images/bsu1209/post/3301dcf1-f60e-4e23-96e7-df3c0776d454/springboot-Page-2.drawio%20(2).png" width="80%">

이렇게 `@Component` annotation이 사용된 경우, 스프링이 동작할 때
이들을 모두 **객체** 로 생성하여 **스프링 컨테이너에 자동 등록**된다. (=스프링 빈으로 자동 등록)
- 위 예시에서는 `helloController` , `memberService` , `memberRepository` 가 객체로 생성되어 등록된다.
- 그리고, `@Autowired` annotation은 **등록된 객체간의 연관관계**를 의미한다.

> **그럼 아무 class에서 Annotation을 명시하면 스프링 컨테이너에 자동 등록될까 ?**
> 정답은 우리가 실행하는 `HelloSpringApplication` 의 `package` 의 위치에 따라 결정된다.
> - 해당 package와 동일하거나 하위 package에 포함되어 있는 경우, 스프링이 모두 찾아 스프링 빈으로 컴포넌트 스캔을 수행한다.

> **참고**
> 스프링은 스프링 컨테이너에 스프링 빈을 등록할 때, **싱글톤으로 등록**한다. (default)
> - 싱글톤: 유일하게 하나만 등록하여 이를 공유한다. 이렇게 되면, 같은 스프링 빈인 경우 모두 같은 instance를 사용하는 것이므로, 메모리를 절약할 수 있다.

---

## 🔍 자바 코드로 직접 스프링 빈 등록하기
먼저, 직접 코드로 등록하기 위해 위에서 사용했던 컴포넌트 스캔 코드를 삭제한다. 
(이때 `Controller` 는 삭제하지 않고 그대로 둔다.)
> `Controller` 는 어차피 스프링이 관리하기 때문에 그냥 컴포넌트 스캔 방식을 그대로 사용한다.

이후 실행을 하게 되면, 스프링 빈에 등록된 객체가 없으므로, 에러가 발생한다.

이제 직접 등록을 위해 `HelloSpringApplication` 과 같은 위치에 `SpringConfig` class를 생성한다.
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
- `@Bean` annotation은 스프링 빈을 등록한다는 것을 명시한다.
- 스프링이 동작할 때, `@Configuration` 을 읽으면
	
    - `@Bean` 을 찾아 해당 로직을 호출하여 이를 스프링 빈으로 등록한다.
- 위의 코드는 에러가 뜨는데, 해결하기 위해서 **생성자에서의 추가**가 필요하다.

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
- `MemberService` 는 `MemberRepository` 가 필요하다.
- 먼저, `MemberService` 를 스프링 빈에 등록한 것과 동일하게 `MemberRepository` 또한 등록한다.
- 그리고 등록된 `MemberRepository` 를 `MemberService` 에 전달한다.

실행했을 때 문제 없이 잘 동작한다.

> <strong>DI(Dependency Injection)</strong>에는 3가지 방법이 있다.
- Field Injection : 고정적인 방법, 수정이 불가능
```java
@Autowired private MemberService memberService;
```
- Setter Injection : Setter를 통해 주입, 생성 따로 주입 따로, setter가 public하게 노출되어 위험할 수 있다.
```java
private MemberService memberService; // final 제거
@Autowired
public void setMemberService(MemberService memberService) {
    this.memberService = memberService;
}
```
- **Constructor Injection** : 가장 권장, 의존관계가 실행 중에 동적으로 변경되는 경우는 거의 없기 때문이다.
```java
public MemberController(MemberService memberService) {
    this.memberService = memberService;
}
```

⇢ **해당 예제에서는 데이터 저장소가 선정되지 않아 `MemoryMemberRepository` 를 사용하기 때문에, 설정(`SpringConfig`)을 통해 스프링 빈으로 등록해야 한다.**

---

## 📌 중요한 개념
의존성 주입

## 📕 참고
- [스프링 입문-코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)
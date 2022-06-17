---
title: "📺 2. 스프링 웹 개발 기초"
description: "스프링 입문 강의 정리"
date: 2022-01-03
update: 2022-01-03
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

## 🔍 정적 컨텐츠
### ⛏ 정적 컨텐츠란?
- 서버에 저장되어 있고 **변화 없이** 브라우저로 뿌려지는 컨텐츠(파일)
- 요청에 따라 응답만을 수행

**Spring Boot는 정적 컨텐츠 기능 자동 제공**<br/>
→ https://docs.spring.io/spring-boot/docs/2.3.1.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-mvc-static-content
- `/static` 폴더에서 정적 컨텐츠를 찾아서 제공한다.

**`/static` 에 `hello-static.html` 을 생성 및 작성해보자.**

<img src="https://images.velog.io/images/bsu1209/post/730e0fbd-5aee-4bbc-aeff-2726a8d49a37/image.png" width="25%"><img src="https://images.velog.io/images/bsu1209/post/60f18df8-7d2f-4280-b638-f4d4dd7520f5/image.png" width="50%">

- 파일 작성 후 서버를 동작시키면, **http://localhost:8080/hello-static.html** 에서 작성한 정적 컨텐츠인 `html` 파일을 확인할 수 있다.
<img src="https://images.velog.io/images/bsu1209/post/3634c932-506e-4040-9f55-33baab3968bb/%E1%84%86%E1%85%AE%E1%84%8C%E1%85%A6.drawio.png" width="80%">

---

## 🔍 MVC와 템플릿 엔진
### ⛏ 템플릿 엔진이란?
- 서버에서 **동적으로** 파일을 바꿔서 브라우저로 뿌려주는 엔진
- jsp, php 등이 있다.
- 이를 위해 필요한 **Model, View, Controller**를 합쳐 **MVC**라고 한다.
- 예전에는 View만으로 개발을 진행했다면, 이제는 **View는 화면을 그리는 데에만 집중**하고, **Model & Controller는 Business logic과 관련있거나, 내부적인 것들을 처리하는데 집중**하기 위해 이를 분리하였다.
    - **!면접 질문!**
    	- 유지보수성
    	- 애플리케이션의 확장성
    	- 유연성 증가(클라이언트의 새로운 요구사항에 대해 최소한의 비용으로 보다 유연하게 대처)
    	- 중복코딩의 문제점 감소
    - 그렇지 않으면 유지, 보수에 엄청난 시간이 필요할 것이다 ...

> **정적 컨텐츠와 다른 점**
> 서버에서 뿌려질 컨텐츠에 동적으로 변화를 줄 수 있다.

이번에는 **MVC를 이용하여 Parameter를 받는 Controller**를 생성해보자.

**`controller/HelloController.java`**<br/>

```java
@GetMapping("hello-mvc")
public String helloMvc(@RequestParam ("name") String name, Model model) {
    model.addAttribute("name", name);
    return "hello-template";
}
```
- `@RequestParam` annotation은 HTTP request parameter를 method의 parameter로 전달받을 때 사용한다. `form` 에서의 `input` 의 `name` 과 매칭되어 해당 값을 받아올 수 있다.
- `String name` 에 해당 값을 담고, `Model model` 을 이용하여 `View` 에서 rendering 시 사용
- `model.addAttribute` method로 **`key`** 가 **"name"**이고, **`변수이름`** 이 **`name`** 인 값을 가져와서 `View` 로 전달한다.

**`resources/templates/hello-templates.html`**<br/>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<body>
    <p th:text="'hello' + ${name}">hello! empty</p>
</body>
</html>
```
- `xmlns:th="~"` 로 `thymeleaf` 템플릿을 사용함을 명시
	
    - thymeleaf의 장점은, 위와 같이 저장한 파일 자체를 서버없이 열어도 해당 파일의 소스코드를 그대로 확인 가능하다.
    - 서버가 동작하게 되면, `th:text` 에 있는 값으로 `hello! empty` 가 치환된다.

서버를 동작시켜 http://localhost:8080/hello-mvc 로 접속
<img src="https://images.velog.io/images/bsu1209/post/eb52fa9d-b790-481a-9d82-66e07f3766c3/image.png" width="80%">
```bash
WARN 51004 --- [nio-8080-exec-1] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MissingServletRequestParameterException: Required request parameter 'name' for method parameter type String is not present]
```
- 위와 같은 log와 함께 Error page가 나오는 것을 확인할 수 있다. 쉽게 말해 `name` parameter에 아무것도 넘겨주지 않아서 뜨는 에러라고 할 수 있다.

```java
@GetMapping("hello-mvc")
public String helloMvc(@RequestParam (name = "name") String name, Model model) {
    model.addAttribute("name", name);
    return "hello-template";
}
```
- 위와 같이, parameter의 이름을 명시하고, `required` option은 기본값이 `true` 이므로 그대로 둔다.

이제 http://localhost:8080/hello-mvc?name=spring 으로 접속해보자.
<img src="https://images.velog.io/images/bsu1209/post/c32434b5-6b7a-4244-99b8-672dcb8f382c/image.png" width="80%">

- 동작방식은, 
    1. url에서 받아온 name에 대한 "spring" 이라는 값이 `public Stirng helloMvc` 의 `String name` 에 담기고,
    2. `model.addAttribute` 를 통해 `name` 이 `model` 에 담겨, `hello-template` 으로 return
    3. `${name}` 으로, `model` 에서 key값이 `name` 인 값을 가져와서 치환!

<img src="https://images.velog.io/images/bsu1209/post/218ce6be-9030-4514-82fb-b13bd9f5cb1b/springboot.drawio.png" width="80%">

---

## 🔍 API
- `JSON` 이라는 데이터 포맷으로 서버에서 클라이언트로 **데이터를 전송하는 방식**

```java
@GetMapping("hello-string")
@ResponseBody
public String helloString(@RequestParam("name") String name) {
    return "hello" + name;
}
```

- `@ResponseBody` 는, http에서의 body에 해당 내용을 직접 넣겠다는 의미!
- **Template engine과 다른 점**은 "view" 개념 없이 data가 그대로 보여진다.
	
    - 확인하기 위해, http://localhost:8080/hello-string?name=spring 으로 접속하면, 아래와 같은 화면이 보이고, `페이지 소스 보기` 하면, html code 없이 Data만 존재하는 것을 확인할 수 있다.
  
  <img src="https://images.velog.io/images/bsu1209/post/b865d7e2-4a4e-4894-8629-0b1dfedd010c/image.png" width="40%" style="float: left;"><img src="https://images.velog.io/images/bsu1209/post/f52aee18-4120-4abf-a60f-be8423a6a835/image.png" width="40%">
    
다음 예제는 `Hello` 객체와 `getName` & `setName`, 그리고 객체를 `return` 하는 Api 방식이다.

```java
@GetMapping("hello-api")
@ResponseBody
public Hello helloApi(@RequestParam("name") String name) {
    Hello hello = new Hello();
    hello.setName(name);
    return hello;
}

static class Hello {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```
- http://localhost:8080/hello-api?name=spring 으로 접속하면 아래 사진에서 보이는 바와 같이 **`Key` & `Value`** 로 이루어진 **JSON** 구조를 확인할 수 있다.<img src="https://images.velog.io/images/bsu1209/post/d466fad7-fe76-47f4-9394-f520b4a787e9/image.png" width="40%">
> mac 기준 `⌘ + n` 으로 Getter와 Setter를 생성할 수 있다.
`Hello` Class 안에 있는 `String name` 은 `private` 이므로, 해당 변수에 대한 접근은 오직 `public` 한 `getName` or `setName` 으로만 가능하게 한다.
→ **JavaBeans** 표준 방식

<img src="https://images.velog.io/images/bsu1209/post/bd1edf66-e5fb-4123-895d-2ef97cdfa424/springboot.drawio%20(1).png" width="80%">

- 이와 같이 `@ResponseBody` 를 사용한 동작방식은,
1. localhost:8080/hello-api로 이동하여 controller가 이를 확인
2. template engine의 경우, 해당하는 view를 보여주기 위해 viewResolver에게 전달했지만 `@ResponseBody` 를 발견하면 `http` 응답에 해당 Data를 그대로 전달하기 위한 처리를 수행
3. 이때, 전달하려는 Data가 문자열이 아닌 **객체**이므로 이에 대한 처리가 필요하다.
	- Spring의 기본 정책은 객체가 오는 경우, 이를 JSON 방식으로 Http 응답에 반환하는 것
4. `HttpMessageConverter` 가 동작하여 
String인 경우는 `StringConverter`, 객체인 경우는 `JsonConverter` 를 동작시킴
   - 대표적인 JsonConverter library로는 `MappingJacksonHttpMessageConveter` 와 `GsonHttpMessageConveter` 가 있다.
   - HttpMessageConverter는 클라이언트가 원하는 response 형태를 header에 명시한 경우, 이에 맞춰 선택된다. 그렇지 않은 경우는 spring이 알아서 선택!
   - MessageConverter에 대한 자세한 정보는 참고에 있는 **HttpMessageConverter** 를 확인
5. Converter를 이용해 변환된 결과를 요청측으로 전달

> 예전에는 JSON이 아닌 XML 방식을 사용했었는데, (ex. html code) 
이는 열고 닫는 이중의 code가 필요하고, 무겁다는 단점때문에 
최근에는 Simple한 JSON 형태를 많이 사용한다.

---

## 📌 중요한 개념
Template engine, API, Annotation, HttpMessageConverter, JavaBeans

## 📕 참고
- [스프링 입문-코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)
- [장인개발자를 꿈꾸는 :: 기록하는 공간](https://devbox.tistory.com/entry/Spring-컨트롤러-메서드의-파라미터-타입)
- [HttpMessageConverter](https://jaimemin.tistory.com/1823)
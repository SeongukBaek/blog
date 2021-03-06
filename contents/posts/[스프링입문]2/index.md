---
title: "πΊ 2. μ€νλ§ μΉ κ°λ° κΈ°μ΄"
description: "μ€νλ§ μλ¬Έ κ°μ μ λ¦¬"
date: 2022-01-03
update: 2022-01-03
tags:
  - Java
  - SpringBoot
series: "πΊ μ€νλ§ μλ¬Έ"
---

<em><strong>[μ€νλ§ μλ¬Έ - μ½λλ‘ λ°°μ°λ μ€νλ§ λΆνΈ, μΉ MVC, DB μ κ·Ό κΈ°μ ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)μ λ€μΌλ©° μ λ¦¬νλ POSTμλλ€.</strong></em>

> **μ μ²΄μ μΈ νλ¦**
> - Spring Project μμ±
> - Spring bootλ‘ μΉ μλ² μ€ν
> - νμ λλ©μΈ κ°λ°
> - μΉ MVC κ°λ°
> - DB μ°λ - JDBC, JPA, Spring data JPA
> - νμ€νΈ μΌμ΄μ€ μμ±

## π μ μ  μ»¨νμΈ 
### β μ μ  μ»¨νμΈ λ?
- μλ²μ μ μ₯λμ΄ μκ³  **λ³ν μμ΄** λΈλΌμ°μ λ‘ λΏλ €μ§λ μ»¨νμΈ (νμΌ)
- μμ²­μ λ°λΌ μλ΅λ§μ μν

**Spring Bootλ μ μ  μ»¨νμΈ  κΈ°λ₯ μλ μ κ³΅**<br/>
β https://docs.spring.io/spring-boot/docs/2.3.1.RELEASE/reference/html/spring-boot-features.html#boot-features-spring-mvc-static-content
- `/static` ν΄λμμ μ μ  μ»¨νμΈ λ₯Ό μ°Ύμμ μ κ³΅νλ€.

**`/static` μ `hello-static.html` μ μμ± λ° μμ±ν΄λ³΄μ.**

<img src="https://images.velog.io/images/bsu1209/post/730e0fbd-5aee-4bbc-aeff-2726a8d49a37/image.png" width="25%"><img src="https://images.velog.io/images/bsu1209/post/60f18df8-7d2f-4280-b638-f4d4dd7520f5/image.png" width="50%">

- νμΌ μμ± ν μλ²λ₯Ό λμμν€λ©΄, **http://localhost:8080/hello-static.html** μμ μμ±ν μ μ  μ»¨νμΈ μΈ `html` νμΌμ νμΈν  μ μλ€.
<img src="https://images.velog.io/images/bsu1209/post/3634c932-506e-4040-9f55-33baab3968bb/%E1%84%86%E1%85%AE%E1%84%8C%E1%85%A6.drawio.png" width="80%">

---

## π MVCμ ννλ¦Ώ μμ§
### β ννλ¦Ώ μμ§μ΄λ?
- μλ²μμ **λμ μΌλ‘** νμΌμ λ°κΏμ λΈλΌμ°μ λ‘ λΏλ €μ£Όλ μμ§
- jsp, php λ±μ΄ μλ€.
- μ΄λ₯Ό μν΄ νμν **Model, View, Controller**λ₯Ό ν©μ³ **MVC**λΌκ³  νλ€.
- μμ μλ Viewλ§μΌλ‘ κ°λ°μ μ§ννλ€λ©΄, μ΄μ λ **Viewλ νλ©΄μ κ·Έλ¦¬λ λ°μλ§ μ§μ€**νκ³ , **Model & Controllerλ Business logicκ³Ό κ΄λ ¨μκ±°λ, λ΄λΆμ μΈ κ²λ€μ μ²λ¦¬νλλ° μ§μ€**νκΈ° μν΄ μ΄λ₯Ό λΆλ¦¬νμλ€.
    - **!λ©΄μ  μ§λ¬Έ!**
    	- μ μ§λ³΄μμ±
    	- μ νλ¦¬μΌμ΄μμ νμ₯μ±
    	- μ μ°μ± μ¦κ°(ν΄λΌμ΄μΈνΈμ μλ‘μ΄ μκ΅¬μ¬ν­μ λν΄ μ΅μνμ λΉμ©μΌλ‘ λ³΄λ€ μ μ°νκ² λμ²)
    	- μ€λ³΅μ½λ©μ λ¬Έμ μ  κ°μ
    - κ·Έλ μ§ μμΌλ©΄ μ μ§, λ³΄μμ μμ²­λ μκ°μ΄ νμν  κ²μ΄λ€ ...

> **μ μ  μ»¨νμΈ μ λ€λ₯Έ μ **
> μλ²μμ λΏλ €μ§ μ»¨νμΈ μ λμ μΌλ‘ λ³νλ₯Ό μ€ μ μλ€.

μ΄λ²μλ **MVCλ₯Ό μ΄μ©νμ¬ Parameterλ₯Ό λ°λ Controller**λ₯Ό μμ±ν΄λ³΄μ.

**`controller/HelloController.java`**<br/>

```java
@GetMapping("hello-mvc")
public String helloMvc(@RequestParam ("name") String name, Model model) {
    model.addAttribute("name", name);
    return "hello-template";
}
```
- `@RequestParam` annotationμ HTTP request parameterλ₯Ό methodμ parameterλ‘ μ λ¬λ°μ λ μ¬μ©νλ€. `form` μμμ `input` μ `name` κ³Ό λ§€μΉ­λμ΄ ν΄λΉ κ°μ λ°μμ¬ μ μλ€.
- `String name` μ ν΄λΉ κ°μ λ΄κ³ , `Model model` μ μ΄μ©νμ¬ `View` μμ rendering μ μ¬μ©
- `model.addAttribute` methodλ‘ **`key`** κ° **"name"** μ΄κ³ , **`λ³μμ΄λ¦`** μ΄ **`name`** μΈ κ°μ κ°μ Έμμ `View` λ‘ μ λ¬νλ€.

**`resources/templates/hello-templates.html`**<br/>

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<body>
    <p th:text="'hello' + ${name}">hello! empty</p>
</body>
</html>
```
- `xmlns:th="~"` λ‘ `thymeleaf` ννλ¦Ώμ μ¬μ©ν¨μ λͺμ
	
    - thymeleafμ μ₯μ μ, μμ κ°μ΄ μ μ₯ν νμΌ μμ²΄λ₯Ό μλ²μμ΄ μ΄μ΄λ ν΄λΉ νμΌμ μμ€μ½λλ₯Ό κ·Έλλ‘ νμΈ κ°λ₯νλ€.
    - μλ²κ° λμνκ² λλ©΄, `th:text` μ μλ κ°μΌλ‘ `hello! empty` κ° μΉνλλ€.

μλ²λ₯Ό λμμμΌ http://localhost:8080/hello-mvc λ‘ μ μ
<img src="https://images.velog.io/images/bsu1209/post/eb52fa9d-b790-481a-9d82-66e07f3766c3/image.png" width="80%">
```bash
WARN 51004 --- [nio-8080-exec-1] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MissingServletRequestParameterException: Required request parameter 'name' for method parameter type String is not present]
```
- μμ κ°μ logμ ν¨κ» Error pageκ° λμ€λ κ²μ νμΈν  μ μλ€. μ½κ² λ§ν΄ `name` parameterμ μλ¬΄κ²λ λκ²¨μ£Όμ§ μμμ λ¨λ μλ¬λΌκ³  ν  μ μλ€.

```java
@GetMapping("hello-mvc")
public String helloMvc(@RequestParam (name = "name") String name, Model model) {
    model.addAttribute("name", name);
    return "hello-template";
}
```
- μμ κ°μ΄, parameterμ μ΄λ¦μ λͺμνκ³ , `required` optionμ κΈ°λ³Έκ°μ΄ `true` μ΄λ―λ‘ κ·Έλλ‘ λλ€.

μ΄μ  http://localhost:8080/hello-mvc?name=spring μΌλ‘ μ μν΄λ³΄μ.
<img src="https://images.velog.io/images/bsu1209/post/c32434b5-6b7a-4244-99b8-672dcb8f382c/image.png" width="80%">

- λμλ°©μμ, 
    1. urlμμ λ°μμ¨ nameμ λν "spring" μ΄λΌλ κ°μ΄ `public Stirng helloMvc` μ `String name` μ λ΄κΈ°κ³ ,
    2. `model.addAttribute` λ₯Ό ν΅ν΄ `name` μ΄ `model` μ λ΄κ²¨, `hello-template` μΌλ‘ return
    3. `${name}` μΌλ‘, `model` μμ keyκ°μ΄ `name` μΈ κ°μ κ°μ Έμμ μΉν!

<img src="https://images.velog.io/images/bsu1209/post/218ce6be-9030-4514-82fb-b13bd9f5cb1b/springboot.drawio.png" width="80%">

---

## π API
- `JSON` μ΄λΌλ λ°μ΄ν° ν¬λ§·μΌλ‘ μλ²μμ ν΄λΌμ΄μΈνΈλ‘ **λ°μ΄ν°λ₯Ό μ μ‘νλ λ°©μ**

```java
@GetMapping("hello-string")
@ResponseBody
public String helloString(@RequestParam("name") String name) {
    return "hello" + name;
}
```

- `@ResponseBody` λ, httpμμμ bodyμ ν΄λΉ λ΄μ©μ μ§μ  λ£κ² λ€λ μλ―Έ!
- **Template engineκ³Ό λ€λ₯Έ μ **μ "view" κ°λ μμ΄ dataκ° κ·Έλλ‘ λ³΄μ¬μ§λ€.
	
    - νμΈνκΈ° μν΄, http://localhost:8080/hello-string?name=spring μΌλ‘ μ μνλ©΄, μλμ κ°μ νλ©΄μ΄ λ³΄μ΄κ³ , `νμ΄μ§ μμ€ λ³΄κΈ°` νλ©΄, html code μμ΄ Dataλ§ μ‘΄μ¬νλ κ²μ νμΈν  μ μλ€.
  
  <img src="https://images.velog.io/images/bsu1209/post/b865d7e2-4a4e-4894-8629-0b1dfedd010c/image.png" width="40%" style="float: left;"><img src="https://images.velog.io/images/bsu1209/post/f52aee18-4120-4abf-a60f-be8423a6a835/image.png" width="40%">
    
λ€μ μμ λ `Hello` κ°μ²΄μ `getName` & `setName`, κ·Έλ¦¬κ³  κ°μ²΄λ₯Ό `return` νλ Api λ°©μμ΄λ€.

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
- http://localhost:8080/hello-api?name=spring μΌλ‘ μ μνλ©΄ μλ μ¬μ§μμ λ³΄μ΄λ λ°μ κ°μ΄ **`Key` & `Value`** λ‘ μ΄λ£¨μ΄μ§ **JSON** κ΅¬μ‘°λ₯Ό νμΈν  μ μλ€.

<img src="https://images.velog.io/images/bsu1209/post/d466fad7-fe76-47f4-9394-f520b4a787e9/image.png" width="40%">

> mac κΈ°μ€ `β + n` μΌλ‘ Getterμ Setterλ₯Ό μμ±ν  μ μλ€.
`Hello` Class μμ μλ `String name` μ `private` μ΄λ―λ‘, ν΄λΉ λ³μμ λν μ κ·Όμ μ€μ§ `public` ν `getName` or `setName` μΌλ‘λ§ κ°λ₯νκ² νλ€.
β **JavaBeans** νμ€ λ°©μ

<img src="https://images.velog.io/images/bsu1209/post/bd1edf66-e5fb-4123-895d-2ef97cdfa424/springboot.drawio%20(1).png" width="80%">

- μ΄μ κ°μ΄ `@ResponseBody` λ₯Ό μ¬μ©ν λμλ°©μμ,
1. localhost:8080/hello-apiλ‘ μ΄λνμ¬ controllerκ° μ΄λ₯Ό νμΈ
2. template engineμ κ²½μ°, ν΄λΉνλ viewλ₯Ό λ³΄μ¬μ£ΌκΈ° μν΄ viewResolverμκ² μ λ¬νμ§λ§ `@ResponseBody` λ₯Ό λ°κ²¬νλ©΄ `http` μλ΅μ ν΄λΉ Dataλ₯Ό κ·Έλλ‘ μ λ¬νκΈ° μν μ²λ¦¬λ₯Ό μν
3. μ΄λ, μ λ¬νλ €λ Dataκ° λ¬Έμμ΄μ΄ μλ **κ°μ²΄**μ΄λ―λ‘ μ΄μ λν μ²λ¦¬κ° νμνλ€.
	- Springμ κΈ°λ³Έ μ μ±μ κ°μ²΄κ° μ€λ κ²½μ°, μ΄λ₯Ό JSON λ°©μμΌλ‘ Http μλ΅μ λ°ννλ κ²
4. `ViewResolver` λμ  `HttpMessageConverter` κ° λμνμ¬ **StringμΈ κ²½μ°λ `StringConverter`**, **κ°μ²΄μΈ κ²½μ°λ `JsonConverter`** λ₯Ό λμμν΄
   - λνμ μΈ JsonConverter libraryλ‘λ `MappingJacksonHttpMessageConveter` μ `GsonHttpMessageConveter` κ° μλ€.
   - HttpMessageConverterλ ν΄λΌμ΄μΈνΈκ° μνλ response ννλ₯Ό headerμ λͺμν κ²½μ°, μ΄μ λ§μΆ° μ νλλ€. κ·Έλ μ§ μμ κ²½μ°λ springμ΄ μμμ μ ν!
   - MessageConverterμ λν μμΈν μ λ³΄λ μ°Έκ³ μ μλ **HttpMessageConverter** λ₯Ό νμΈ
5. Converterλ₯Ό μ΄μ©ν΄ λ³νλ κ²°κ³Όλ₯Ό μμ²­μΈ‘μΌλ‘ μ λ¬

> μμ μλ JSONμ΄ μλ XML λ°©μμ μ¬μ©νμλλ°, (ex. html code) μ΄λ μ΄κ³  λ«λ μ΄μ€μ codeκ° νμνκ³ , λ¬΄κ²λ€λ λ¨μ λλ¬Έμ μ΅κ·Όμλ Simpleν JSON ννλ₯Ό λ§μ΄ μ¬μ©νλ€.

---

## π μ€μν κ°λ
Template engine, API, Annotation, HttpMessageConverter, JavaBeans

## π μ°Έκ³ 
- [μ€νλ§ μλ¬Έ-μ½λλ‘ λ°°μ°λ μ€νλ§ λΆνΈ, μΉ MVC, DB μ κ·Ό κΈ°μ ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)
- [μ₯μΈκ°λ°μλ₯Ό κΏκΎΈλ :: κΈ°λ‘νλ κ³΅κ°](https://devbox.tistory.com/entry/Spring-μ»¨νΈλ‘€λ¬-λ©μλμ-νλΌλ―Έν°-νμ)
- [HttpMessageConverter](https://jaimemin.tistory.com/1823)
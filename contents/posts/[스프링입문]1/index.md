---
title: "๐บ 1. ํ๋ก์ ํธ ํ๊ฒฝ์ค์ "
description: "์คํ๋ง ์๋ฌธ ๊ฐ์ ์ ๋ฆฌ"
date: 2022-01-02
update: 2022-01-02
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

## ๐ ํ๋ก์ ํธ ์์ฑ
### โ ์ฌ์  ์ค๋น
- JAVA 11
- IDE: IntelliJ or Eclipse

**Springboot Starter๋ฅผ ์ฌ์ฉํ์ฌ ํ๋ก์ ํธ ์์ฑ**
โ https://start.spring.io
- **Project: ์ด๋ค ๋น๋ ๊ด๋ฆฌ ๋๊ตฌ๋ฅผ ์ฌ์ฉํ  ๊ฒ์ธ๊ฐ ?**
	
    - Maven: ํ์ํ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ๋ก๊ฒจ์ค๊ณ  ๋น๋ํ๋ lifecycle๊น์ง ๊ด๋ฆฌํ๋ ๋น๋ ๊ด๋ฆฌ ๋๊ตฌ
    	- ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์๊ฐ ๋ง์์ง๋ฉด, ๋น๋ ์๊ฐ์ด ์ค๋ ๊ฑธ๋ฆด ์ ๋ฐ์ ์๋ค.
    - Gradle: Maven๊ณผ ๋ค๋ฅด๊ฒ, ํ์ํ ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ ๋ํ ์ค์  ํ์ผ(xmlํ์ผ)์ ์ฝ๋๊ฐ ๋งค์ฐ ๊ฐ๊ฒฐํ ๋น๋ ๊ด๋ฆฌ ๋๊ตฌ
      - ์ต๊ทผ ๋ง์ด ์ฌ์ฉ
      - ์ด๋ฏธ ์๋ฐ์ดํธ๊ฐ ๋ฐ์๋ ๋ถ๋ถ์ ๋ค์ ๋น๋ํ์ง ์๊ธฐ์ ๋น๋ ์๊ฐ์ด maven์ ๋นํด ์ ์ด์ง๊ฒ ๋๋ค.
    > **๋น๋ ๊ด๋ฆฌ ๋๊ตฌ๋ ?**
    ํ๋ก์ ํธ์์ ์์ฑํ ํ์ผ๋ค์ JVM์ด๋ WAS์์ ์ธ์ํ  ์ ์๋๋ก ํจํค์งํด์ฃผ๋ ๋๊ตฌ
- **Project Spring Boot**: 2.5.6
- **Language**: Java 
- Group: ๋ณดํต ๊ธฐ์ ๋๋ฉ์ธ๋ช
- Artifact: ๋น๋๋์ด ๋์ค๋ ๊ฒฐ๊ณผ๋ฌผ, ํ๋ก์ ํธ๋ช
- **<span id="packaging">Packaging</span>: ์ด๋ค ํจํค์ง ๋ฐฉ์์ ์ฌ์ฉํ  ๊ฒ์ธ๊ฐ ?**
	
    - Jar(Java Archieve): Java application์ด ๋์ํ  ์ ์๋๋ก ํจํค์งํ๋ ๋ฐฉ์
    	- JRE๋ง ์์ด๋ ์คํ์ด ๊ฐ๋ฅํ๋ค.
    - War(Web Application Archieve): Web application ์ ์ฒด๋ฅผ ํจํค์งํ๋ ๋ฐฉ์
    	- ๋ณ๋์ Web Server ๋๋ WAS๊ฐ ํ์ํ๋ค.
- Java: 11
- **Dependencies: ์ด๋ค ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ฌ์ฉํ  ๊ฒ์ธ๊ฐ ?**
	
    - Spring Web(Embedded Tomcat ์ถ๊ฐ๋ฅผ ์ํจ, Web ํ๋ก์ ํธ ์์ฑ ์ ํ์)
    - Thymeleaf(Controller๊ฐ ์ ๋ฌํ๋ Data๋ฅผ ์ด์ฉํ์ฌ HTML์ ๊พธ๋ฐ ์ ์๋๋ก ํ๋ Template Engine)
    - ์ถ๊ฐ์ ์ผ๋ก, lombok(Annotation์ ์ด์ฉํด Compile ์์ ์ Getter, Setter, ์์ฑ์, toString, Builder ๋ฑ์ ์๋์ผ๋ก ๋ง๋ค์ด์ฃผ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ)
    
![](https://images.velog.io/images/bsu1209/post/03dcea8e-00c1-4214-b9e0-6ad2806ec2ca/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-11-05%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.07.23.png)
์ดํ ```GENERATE```๋ก .zip ํ์ผ์ ๋ค์ด๋ก๋ํ ํ, unzip ํ ํ์ผ์ ```IntelliJ``` ๋ก **OPEN**

> Project open์, ์ธ๋ถ์ library๋ฅผ ๋ก๋ฉํ๋ ๊ณผ์ ์ด ํ์ํ๊ธฐ ๋๋ฌธ์, ์๊ฐ์ด ์ข ๊ฑธ๋ฆด ์ ์๋ค.

### โ ํ๋ก์ ํธ ๊ตฌ์กฐ
<p align="center"><img src="https://images.velog.io/images/bsu1209/post/dfba1b83-83d3-41f0-a194-f2f761440ae4/image.png" width="50%" height="30%"></p>

**```src```**
- ```main```, ```test``` ๋ก ๋๋๋ค.
	
    - ```main/java``` ์ ์ค์  ํจํค์ง๋ค๊ณผ ์์ค ํ์ผ์ด ์กด์ฌ
    - ```main/resources``` ์๋ ์ค์  ํ์ผ๋ค์ด ์กด์ฌ, java ํ์ผ์ ์ ์ธํ ๋ชจ๋  ํ์ผ
    - ```test/java``` ์ test ๊ด๋ จ ์ฝ๋๋ค์ด ์กด์ฌ
    	- ์ด๋ ๊ณง **TEST๋ผ๋ ๊ฒ์ด ๋งค์ฐ ์ค์ํ ์กด์ฌ**์์ ์๋ ค์ค๋ค.

**```build.gradle```**
```java
plugins {
	id 'org.springframework.boot' version '2.5.6' // starter์์ ์ ํํ ๋ฒ์ 
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id 'java' // ์ ํํ ์ธ์ด
}

// Metadata
group = 'hello'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11' // java version

// ์๋์ ์ ํํ library๋ฅผ ๋ค์ด๋ก๋๋ฐ๋ ๊ณณ, ํ์ํ๋ฉด ํน์  ์ฌ์ดํธ url ์ง์  ๊ฐ๋ฅ
repositories {
	mavenCentral() // 
}

// ์ ํํ library๋ค
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-thymeleaf:2.5.6'
	implementation 'org.springframework.boot:spring-boot-starter-web:2.5.6'
	testImplementation 'org.springframework.boot:spring-boot-starter-test:2.5.6'
}

test {
	useJUnitPlatform()
}
```

์ด์  ```src/main/java/hello.hellospring``` ์์ ์๋ ๋ฉ์ธ ์ฝ๋๋ฅผ ์คํ์์ผ๋ณด์.
<img src="https://images.velog.io/images/bsu1209/post/51434c13-238d-455c-8c8a-8f06c1f87018/image.png">

์คํํ ํ, http://localhost:8080 ์ผ๋ก ์ ์ํด๋ณด์.
<img src="https://images.velog.io/images/bsu1209/post/6c5ab164-d198-480e-bec1-e89b630b3e2d/image.png">

์์ง์ ์๋ฌด๋ฐ View๋ฅผ ๊ตฌ์ฑํ์ง ์์๊ธฐ์, ์์ ๊ฐ์ ํ๋ฉด์ด ๋จ๊ฒ ๋๋ค.

---

## ๐ ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ดํด๋ณด๊ธฐ
ํ๋ก์ ํธ์์ ```build.gradle``` ์ ๋ณด๋ฉด, ์๋์ ๊ฐ์ด ์คํํฐ๋ก ํ๋ก์ ํธ ์์ฑํ  ๋ ์ถ๊ฐํ๋ 3๊ฐ์ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ค์ ํ์ธํ  ์ ์๋ค.
```java
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-thymeleaf:2.5.6'
    implementation 'org.springframework.boot:spring-boot-starter-web:2.5.6'
    testImplementation 'org.springframework.boot:spring-boot-starter-test:2.5.6'
}
```
๊ทธ๋ฆฌ๊ณ , ```External Libraries``` ์์๋ ํ๋ก์ ํธ ์์ฑ ์ ๋ก๊ฒจ์จ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ค์ ํ์ธํ  ์ ์๋๋ฐ, ์ฒ์์ ์ถ๊ฐํ๋ **3๊ฐ์ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ณด๋ค ํจ์ฌ ๋ ๋ง์ ์์ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๊ฐ ๋ก๊ฒจ์์ง ๊ฒ์ ํ์ธ**ํ  ์ ์๋ค. 

์ด๋ฌํ ์ด์ ๋ ์ฐ๋ฆฌ๊ฐ ์ฌ์ฉํ๊ธฐ ์ํด ์ถ๊ฐํ 3๊ฐ์ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ ๋์ํ๊ธฐ ์ํด์๋ ํ์ํ ๋ค๋ฅธ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ค์ด ์กด์ฌํ๋ค. **Gradle**์ ์ด๋ฌํ **์ถ๊ฐ์ ์ธ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์๋์ผ๋ก ```External Libraries``` ์ ์ถ๊ฐ**ํด์ฃผ๊ธฐ ๋๋ฌธ์ ๋ง์ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ค์ด ์ถ๊ฐ๋์ด ์๋ ๊ฒ์ด๋ค.

<img src="https://images.velog.io/images/bsu1209/post/998b6f57-ec6d-4fd8-9c4b-cb0e7e6144d0/image.png" width="70%">

์ ํ๋ฉด์์ ๋ณด์ด๋ฏ, **Gradle > hello-spring > Dependencies**์์ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๊ฐ์ ์์กด๊ด๊ณ๋ฅผ ํ์ธํ  ์ ์๋ค.

์ฌ๊ธฐ์ ์ค์ํ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ก๋ ๋จผ์  ```spring-boot-starter-tomcat``` ๋ผ์ด๋ธ๋ฌ๋ฆฌ๊ฐ ์๋๋ฐ, ์ด๋ Spring boot๊ฐ ํฐ์บฃ ์น์๋ฒ๋ฅผ ๋ด์ฅ๋์ด ์๊ธฐ ๋๋ฌธ์ ์กด์ฌํ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ด๋ค.
๋ํ, ```spring-boot-starter-logging``` ์ด๋ผ๋ ๊ฒ์ด ์๋๋ฐ, ์ด๋ ์๋ฒ ๊ฐ๋ฐ์๋ค์ด ์ด๋ ํ ์๋ฌ๋ค์ ์ถ๋ ฅํ๊ณ  ํ ๋์ ๋ชจ์์ ๋ณด๊ธฐ ์ํด ์ฌ์ฉํ๋ ๊ฒ์ด๋ค. ๋ด๋ถ์๋ ```logback```, ```slf4j``` ๋ผ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๊ฐ ๋ด์ฅ๋์ด ์๋ค.

---

## ๐ View ํ๊ฒฝ์ค์ 
ํ์ฌ ์๋ฒ๋ฅผ ์คํํ๊ณ  http://localhost:8080 ์ผ๋ก ์ ์ํ๋ฉด, ์๊น ์์์ ๋ณธ <a href="#firstP">ํ๋ฉด</a>์ด ๋ฌ๋ค.

์ด์  ํ๋ฉด ๊ตฌ์ฑ์ ํ ๋ฒ ํด๋ณด๋๋ก ํ์.

### โ Welcome Page
**resources/static/index.html**<br/>
์ ์์ฑํ๊ฒ ๋๋ฉด, ์ด๋ฅผ ์๋์ผ๋ก **welcome page**๋ก ์ค์ ํด์ค๋ค. ์ด๋ **์ ์  ํ์ด์ง**๋ก์, ์์ฑํ ์ฝ๋๋ฅผ ๊ทธ๋๋ก ๋ธ๋ผ์ฐ์ ์ ๋์ ธ์ฃผ๋ ๊ฒ์ด๋ค.

```html
<!-- index.html -->
<!DOCTYPE HTML>
<html>
<head>
    <title>Hello</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
    Hello
    <a href="/hello">hello</a>
</body>
</html>
```
์ฝ๋๋ฅผ ์์ฑํ๊ณ  ์๋ฒ๋ฅผ ์ฌ์์ํ๋ฉด, ์๋์ ํ๋ฉด์ ๋ณผ ์ ์์ ๊ฒ์ด๋ค.

<img src="https://images.velog.io/images/bsu1209/post/85ba87cc-a09b-4643-83cf-052ec6f022f7/image.png" width="80%">

> Spring์ ๊ทธ ์ํ๊ณ๊ฐ ์ด๋ง์ด๋งํ๊ฒ ํฌ๊ธฐ ๋๋ฌธ์, ๋จธ๋ฆฟ์์ ๋ชจ๋  ๊ฒ์ ๋ค ๋ฃ์ ์๋ ์๋ค.
๋ฐ๋ผ์, ์ํ๋ ๊ฒ์ ์ ์ฐพ๋ ๋ฅ๋ ฅ์ด ํ์ํ๋ค.
https://docs.spring.io/spring-boot/docs/current/reference/html/
์ ํํ์ด์ง์์ ๊ด๋ จ ๋ฌธ์๋ฅผ ์ฐพ์๋ณด๋๋ก ํ์.

์ ํํ์ด์ง์์, [**Welcome page**์ ๋ํ ์ค๋ช](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.developing-web-applications.spring-mvc.welcome-page)์ ์ฐพ์๋ณด์๋ค.
์ค๋ช์ ๊ฐ์ ธ์ค์๋ฉด, ์คํ๋ง ๋ถํธ๋ static & templated welcome page ๋ชจ๋ ์ง์ํ๋ค. ๋จผ์  ```static/index.html``` ์ ์ฐพ๊ณ , ์๋ค๋ฉด ```template/index.html``` ์ ์ฐพ์ **Welcome Page**๋ก์ ์ฌ์ฉํ๋ค.

**resources/templates**<br/>
```static``` ๊ณผ ๋ค๋ฅธ ๋์  ํ์ด์ง๋ฅผ ๊ตฌ์ฑํ๋๋ฐ ์ฌ์ฉํ๋ค. ์ฌ๊ธฐ์ ์ฐ๋ฆฌ๋ ์ฒ์์ ์ถ๊ฐํ๋ **thymeleaf** ๋ผ๋ ํํ๋ฆฟ ์์ง์ ์ฌ์ฉํ  ๊ฒ์ด๋ค.
์ด์ ๊ด๋ จ๋ ๋ฌธ์๋ก๋ [์ฌ๊ธฐ](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.developing-web-applications.spring-mvc.template-engines)๋ฅผ ์ฐธ๊ณ ํ๋ฉด ๋๋ค.
์คํ๋ง ๋ถํธ๋ **FreeMarker, Groovy, Thymeleaf, Mustache**์ ์ด 4๊ฐ์ ํํ๋ฆฟ ์์ง์ ๋ํ auto-configuration ์ง์์ ํ๋ค.

> auto-configuration์ด๋?

์ด์ , ์ค์ ๋ก ๋์ํ๊ณ , ํ๋ก๊ทธ๋๋ฐ์ด ๋๋ ํ๋ฉด์ ๊ตฌํํด๋ณด๋๋ก ํ์.

<img src="https://images.velog.io/images/bsu1209/post/cb9d6ff7-d0fd-41ec-b791-8b94c0fb17f9/image.png" width="50%">

๋จผ์ , ```src/main/java/hello.hellospring``` ์ ```controller``` ๋ผ๋ **Package**๋ฅผ ์์ฑํ๋ค. ์ดํ ```HelloController``` ๋ผ๋ **Class**๋ฅผ ์์ฑํ๋ค.

```java
// HelloController
package hello.hellospring.controller;

import org.springframework.stereotype.Controller;

@Controller
public class HelloController {
    
}
```
์ด๋, ```@Controller``` ๋ผ๋ **Annotation**์ด ํ์ํ๋ฐ, ์ด๋ ์ผ์ข์ ๋ฉํ๋ฐ์ดํฐ๋ก์, ์ปดํ์ผ๋ฌ๊ฐ ํน์  ์ค๋ฅ๋ฅผ ์ต์ ํ๋๋ก ์ง์ํ๋ ๊ฒ๊ณผ ๊ฐ์ด ํ๋ก๊ทธ๋จ ์ฝ๋์ ์ผ๋ถ๊ฐ ์๋ ํ๋ก๊ทธ๋จ์ ๊ดํ ๋ฐ์ดํฐ๋ฅผ ์ ๊ณต, ์ฝ๋์ ์ ๋ณด๋ฅผ ์ถ๊ฐํ๋๋ฐ ์ฌ์ฉ๋๋ค. [์ฐธ๊ณ ](https://palyoung.tistory.com/72)

```java
@Controller
public class HelloController {

    @GetMapping("hello")
    public String Hello(Model model) {

    }
}
```

ํด๋์ค ์์ ```@GetMapping("hello")``` ๋ Web application์์ "/hello"๊ฐ ๋ค์ด์ค๋ฉด, ```Hello(Model model)``` ์ ์คํํ๋๋ก ํ๋ค. ์ฌ๊ธฐ์ model์ Model, View, Controller์ model์ด๊ณ , Get์ Get or Post method๋ฅผ ์๋ฏธํ๋ค.

```java
@GetMapping("hello")
public String Hello(Model model) {
    model.addAttribute("data", "hello!!!");
    return "hello";
}
```

```html
<!-- resources/templates/hello.html -->
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Hello</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
    <p th:text="'์๋ํ์ธ์. ' + ${data}" >์๋ํ์ธ์. ์๋</p>
</body>
</html>
```
๋ฅผ ์์ฑํ๋๋ก ํ๋ค. ์ผ๋จ์ ๋ฐ๋ผ์ ์ณ๋ณด๋๋ก ํ์.
์ ์ฝ๋์์ ```th``` ๋ผ๋ ๊ฒ์ ๋ณผ ์ ์๋๋ฐ, ์ด๋ ์ ์ผ ์ ์ฝ๋์์ ์ ์ธํ ```xmlns:th="http://www.thymeleaf.org"``` ๋ฅผ ์๋ฏธํ๊ณ , ์ด ์ ์ธ์ผ๋ก thymeleaf ๋ฌธ๋ฒ์ ์ฌ์ฉํ  ์ ์๊ฒ ๋ ๊ฒ์ด๋ค.

๊ทธ๋ฆฌ๊ณ  ```<p th:text="'์๋ํ์ธ์. ' + ${data}">์๋ํ์ธ์. ์๋</p>``` ์์ **data**๋ ์๊น ์์ ```HelloController``` ์์ ์์ฑํ ```model.addAttribute("data", "hello!!!");``` ์ **data**๋ฅผ ์๋ฏธํ๋ค. ์ด ๋ฉ์๋์์ **"data"๋ attributeName**์ด๊ณ , **"hello!!!"๋ attributeValue**๊ฐ ๋๋ค. ์ดํ ์ผ๋จ ์๋ฒ๋ฅผ ์ฌ์์ํด๋ณด์.

<img src="https://images.velog.io/images/bsu1209/post/4a0e589d-b2e8-461a-840a-922330166e60/image.png" width="70%">
์์ ๊ฐ์ด /hello๋ก ์ ์ํ๊ฒ ๋๋ฉด, ${data}๊ฐ "hello!!!"๋ก ์นํ๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

<img src="https://images.velog.io/images/bsu1209/post/1a2948e3-36c9-4b08-9223-b3b00f218255/%E1%84%86%E1%85%AE%E1%84%8C%E1%85%A6.drawio%20(1).png" width="80%">

- `localhost:8080/hello` ์ `GET` ๋ฐฉ์์ผ๋ก ์ ๊ทผํ๊ฒ ๋๋ฉด, ์์ฑํ `HelloController` ์์ statement๋ค์ ์คํํ๊ฒ ๋๋ค.
	
    - ์ด๋, `return hello;` ์์ hello๋ `templates/hello.html` ์ hello๋ก ๋งค์นญ๋์ด ํด๋น html ํ์ผ์ ๋ ๋๋งํ๋ผ๋ ์๋ฏธ์ด๋ค. **(ViewName = hello)**
    - SpringBoot๋ ๊ธฐ๋ณธ์ ์ผ๋ก `resources:templates/ + {ViewName} + .html` ํ์ผ์ ์ฐพ๋๋ค.

---

## ๐ ๋น๋ํ๊ณ  ์คํํ๊ธฐ
**๊ผญ ์๋ฒ๋ฅผ ์ข๋ฃํ ํ,**

1. `./gradlew build` โ "ํ์ํ lib๋ค์ ๋ค์ด๋ฐ๊ณ  ๋น๋๊ฐ ์ํ"<img src="https://images.velog.io/images/bsu1209/post/48e1f4b1-df00-4c2c-989f-1517a906d4a3/image.png" width="50%"> ์ด์ ๊ฐ์ด ๋จ๋ฉด ๋น๋๊ฐ ์ฑ๊ณต๋ ๊ฒ์ด๋ค.
2. `cd build/libs` โ "ํด๋น ํด๋์ ๋น๋๋ `jar` ํ์ผ์ด ์์ฑ๋จ"
์ด๋ ์คํํฐ๋ก ์ค์ ํ <a href="#packaging">Packaging</a> ๋ฐฉ์์ผ๋ก ์ธํด `jar` ํ์ผ์ด ์์ฑ๋๋ค.<img src="https://images.velog.io/images/bsu1209/post/08360dc5-5146-499b-9910-af1ff9188b35/image.png" width="70%"> ์์ ๊ฐ์ด `hello-spring-0.0.1-SNAPSHOT-plain.jar` ์ด๋ผ๋ ํ์ผ๋ ๊ฐ์ด ์์ฑ๋๋๋ฐ, ์ด๋ Spring-boot 2.5.0 ์ด์๋ถํฐ ์์ฑ๋๋ ๋ฏํ๋ค. 
์ด๋ฅผ ์์ ๋ ค๋ฉด, `build.gradle` ํ์ผ ์์ `jar { enabled = false }` ์ฝ๋๋ฅผ ์ถ๊ฐํด์ฃผ๊ณ  build๋ฅผ ์ํํ๋ฉด ๋๋ค.
3. `java -jar hello-spring-0.0.1-SNAPSHOT.jar`
<img src="https://images.velog.io/images/bsu1209/post/58a7fe61-93dc-4b38-baa6-e44fe17ca62f/image.png"> ์๋ฒ๊ฐ ๊ฐ๋๋๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

์ด์  ๋น๋๋ ๊ฒฐ๊ณผ๋ฌผ์ธ `hello-spring-0.0.1-SNAPSHOT.jar` ๋ง ํ์ผ๋ง ์คํ์ํค๋ฉด ์๋ฒ๊ฐ ๋์ํ  ์ ์๊ฒ ๋์๋ค.

> `./gradlew clean`
> : `build` ํด๋๊ฐ ์ญ์ ๋๋ค.
> `./gradlew clean build`
> : `build` ํด๋๋ฅผ ์ญ์ ํ๊ณ  ์๋ก build ์ํ

---

## ๐ ์ฐธ๊ณ 
[์คํ๋ง ์๋ฌธ-์ฝ๋๋ก ๋ฐฐ์ฐ๋ ์คํ๋ง ๋ถํธ, ์น MVC, DB ์ ๊ทผ ๊ธฐ์ ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)

**Spring Boot DevTools**<br/>
:ํ์ผ ์์  ์ดํ ๋ณ๋๋ก ์๋ฒ๋ฅผ ์ฌ์์ํ  ํ์ ์์ด ๋ณ๊ฒฝ ์ฌํญ์ด ์ ์ฉ๋๋๋ก ํด์ฃผ๋ ๋๊ตฌ
<img src="https://images.velog.io/images/bsu1209/post/6307ef88-1a2d-45ae-8359-c090b337f5c2/image.png" width="80%">

```java
// application.properties
spring:
    devtools:
        restart:
            enabled: true
    thymeleaf:
        cache: false
        prefix: file:src/main/resources/templates/
```

`Preferences` โ `Build, Execution, Deployment` โ `Compiler` โ `Build project automatically` check!
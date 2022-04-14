---
title: "📺 1. 프로젝트 환경설정"
description: "스프링 입문 강의 정리"
date: 2022-01-02
update: 2022-01-02
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

## 🔍 프로젝트 생성
### ⛏ 사전 준비
- JAVA 11 (자바에 익숙하고 잘 다룰 줄 안다면 버전은 상관없지만, 막힘없는 진행을 위해 11로 설치한다.)
- IDE: Intellij or Eclipse (나는 Intellij를 사용한다. ~~요즘 실무에서 Eclipse를 이용하는 서버 개발자는 거의 없다고 한다...~~)

**Springboot Starter를 사용하여 프로젝트 생성**
→ https://start.spring.io
- **Project: 어떤 빌드 관리 도구를 사용할 것인가 ?**
	
    - Maven: 필요한 라이브러리를 땡겨오고 빌드하는 lifecycle까지 관리하는 빌드 관리 도구
    	- 라이브러리 수가 많아지면, 빌드 시간이 오래 걸릴 수 밖에 없다.
    - Gradle: Maven과 다르게, 필요한 라이브러리에 대한 설정 파일(xml파일)의 코드가 매우 간결한 빌드 관리 도구
      - 최근 많이 사용
      - 이미 업데이트가 반영된 부분은 다시 빌드하지 않기에 빌드 시간이 maven에 비해 적어지게 된다.
    > **빌드 관리 도구란 ?**
    프로젝트에서 작성한 파일들을 JVM이나 WAS에서 인식할 수 있도록 패키징해주는 도구
- **Project Spring Boot**: 2.5.6
- **Language**: Java 
- Group: hello
- Artifact: hello-spring
- **<span id="packaging">Packaging</span>: 어떤 패키징 방식을 사용할 것인가 ?**
	
    - Jar(Java Archieve): Java application이 동작할 수 있도록 패키징하는 방식
    	- JRE만 있어도 실행이 가능하다.
    - War(Web Application Archieve): Web application 전체를 패키징하는 방식
    	- 별도의 Web Server 또는 WAS가 필요하다.
- Java: 11
- **Dependencies: 어떤 라이브러리를 사용할 것인가 ?**
	
    - Spring Web(Embedded Tomcat 추가를 위함, Web 프로젝트 생성 시 필수)
    - Thymeleaf(Controller가 전달하는 Data를 이용하여 HTML을 꾸밀 수 있도록 하는 Template Engine)
    - 추가적으로, lombok(Annotation을 이용해 Compile 시점에 Getter, Setter, 생성자, toString, Builder 등을 자동으로 만들어주는 라이브러리)
    
![](https://images.velog.io/images/bsu1209/post/03dcea8e-00c1-4214-b9e0-6ad2806ec2ca/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-11-05%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.07.23.png)
이후 ```GENERATE```로 .zip 파일을 다운로드한 후, unzip 한 파일을 ```Intellij``` 로 **OPEN**

> Project open시, 외부의 library를 로딩하는 과정이 필요하기 때문에, 시간이 좀 걸릴 수 있다.

### ⛏ 프로젝트 구조
<p align="center"><img src="https://images.velog.io/images/bsu1209/post/dfba1b83-83d3-41f0-a194-f2f761440ae4/image.png" width="50%" height="30%"></p>

**```src```**
- ```main```, ```test``` 로 나뉜다.
	
    - ```main/java``` 에 실제 패키지들과 소스 파일이 존재
    - ```main/resources``` 에는 설정 파일들이 존재, java 파일을 제외한 모든 파일
    - ```test/java``` 에 test 관련 코드들이 존재
    	- 이는 곧 **TEST라는 것이 매우 중요한 존재**임을 알려준다.

**```build.gradle```**
```java
plugins {
	id 'org.springframework.boot' version '2.5.6' // starter에서 선택한 버전
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id 'java' // 선택한 언어
}

// Metadata
group = 'hello'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11' // java version

// 아래에 선택한 library를 다운로드받는 곳, 필요하면 특정 사이트 url 지정 가능
repositories {
	mavenCentral() // 
}

// 선택한 library들
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-thymeleaf:2.5.6'
	implementation 'org.springframework.boot:spring-boot-starter-web:2.5.6'
	testImplementation 'org.springframework.boot:spring-boot-starter-test:2.5.6'
}

test {
	useJUnitPlatform()
}
```

이제 ```src/main/java/hello.hellospring``` 안에 있는 메인 코드를 실행시켜보자.
<p align="center"><img src="https://images.velog.io/images/bsu1209/post/51434c13-238d-455c-8c8a-8f06c1f87018/image.png" width="100%" height="30%"></p>

실행한 후, http://localhost:8080 으로 접속해보자.
<p align="center" id="firstP"><img src="https://images.velog.io/images/bsu1209/post/6c5ab164-d198-480e-bec1-e89b630b3e2d/image.png" width="60%" height="30%"></p>
아직은 아무런 View를 구성하지 않았기에, 위와 같은 화면이 뜨게 된다.

---

## 🔍 라이브러리 살펴보기
프로젝트안의 ```build.gradle``` 을 보면, 아래와 같이 스타터로 프로젝트 생성할 때 추가했던 3개의 라이브러리들을 확인할 수 있다.
```java
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-thymeleaf:2.5.6'
    implementation 'org.springframework.boot:spring-boot-starter-web:2.5.6'
    testImplementation 'org.springframework.boot:spring-boot-starter-test:2.5.6'
}
```
그리고, ```External Libraries``` 에서는 프로젝트 생성 시 땡겨온 라이브러리들을 확인할 수 있는데, 처음에 추가했던 **3개의 라이브러리보다 훨씬 더 많은 수의 라이브러리가 땡겨와진 것을 확인**할 수 있다. 

이러한 이유는 우리가 사용하기 위해 추가한 3개의 라이브러리도 동작하기 위해서는 필요한 다른 라이브러리들이 존재한다. **Gradle**은 이러한 **추가적인 라이브러리를 자동으로 ```External Libraries``` 에 추가**해주기 때문에 많은 라이브러리들이 추가되어 있는 것이다.

<p align="center"><img src="https://images.velog.io/images/bsu1209/post/998b6f57-ec6d-4fd8-9c4b-cb0e7e6144d0/image.png" width="70%" height="30%"></p>

위 화면에서 보이듯, **Gradle > hello-spring > Dependencies**에서 라이브러리간의 의존관계를 확인할 수 있다.

여기서 중요한 라이브러리로는 먼저 ```spring-boot-starter-tomcat``` 라이브러리가 있는데, 이는 Spring boot가 톰캣 웹서버를 내장되어 있기 때문에 존재하는 라이브러리이다.
또한, ```spring-boot-starter-logging``` 이라는 것이 있는데, 이는 서버 개발자들이 어떠한 에러들을 출력하고 한 눈에 모아서 보기 위해 사용하는 것이다. 내부에는 ```logback```, ```slf4j``` 라는 라이브러리가 내장되어 있다.

---

## 🔍 View 환경설정
현재 서버를 실행하고 http://localhost:8080 으로 접속하면, 아까 위에서 본 <a href="#firstP">화면</a>이 뜬다.

이제 화면 구성을 한 번 해보도록 하자.

### ⛏ Welcome Page
**resources/static/index.html**<br/>
을 생성하게 되면, 이를 자동으로 **welcome page**로 설정해준다. 이는 **정적 페이지**로서, 작성한 코드를 그대로 브라우저에 던져주는 것이다.

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
코드를 작성하고 서버를 재시작하면, 아래의 화면을 볼 수 있을 것이다.

<p align="center"><img src="https://images.velog.io/images/bsu1209/post/85ba87cc-a09b-4643-83cf-052ec6f022f7/image.png" width="80%" height="30%"></p>

> Spring은 그 생태계가 어마어마하게 크기 때문에, 머릿속에 모든 것을 다 넣을 수는 없다.
따라서, 원하는 것을 잘 찾는 능력이 필요하다.
https://docs.spring.io/spring-boot/docs/current/reference/html/
위 홈페이지에서 관련 문서를 찾아보도록 하자.

위 홈페이지에서, [**Welcome page**에 대한 설명](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.developing-web-applications.spring-mvc.welcome-page)을 찾아보았다.
설명을 가져오자면, 스프링 부트는 static & templated welcome page 모두 지원한다. 먼저 ```static/index.html``` 을 찾고, 없다면 ```template/index.html``` 을 찾아 **Welcome Page**로서 사용한다.

**resources/templates**<br/>
```static``` 과 다른 동적 페이지를 구성하는데 사용한다. 여기서 우리는 처음에 추가했던 **thymeleaf** 라는 템플릿 엔진을 사용할 것이다.
이와 관련된 문서로는 [여기](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.developing-web-applications.spring-mvc.template-engines)를 참고하면 된다.
스프링 부트는 **FreeMarker, Groovy, Thymeleaf, Mustache**의 총 4개의 템플릿 엔진에 대한 auto-configuration 지원을 한다.

> auto-configuration이란?

이제, 실제로 동작하고, 프로그래밍이 되는 화면을 구현해보도록 하자.

<p align="center"><img src="https://images.velog.io/images/bsu1209/post/cb9d6ff7-d0fd-41ec-b791-8b94c0fb17f9/image.png" width="50%" height="30%"></p>

먼저, ```src/main/java/hello.hellospring``` 에 ```controller``` 라는 **Package**를 생성한다. 이후 ```HelloController``` 라는 **Class**를 생성한다.

```java
// HelloController
package hello.hellospring.controller;

import org.springframework.stereotype.Controller;

@Controller
public class HelloController {
    
}
```
이때, ```@Controller``` 라는 **Annotation**이 필요한데, 이는 일종의 메타데이터로서, 컴파일러가 특정 오류를 억제하도록 지시하는 것과 같이 프로그램 코드의 일부가 아닌 프로그램에 관한 데이터를 제공, 코드에 정보를 추가하는데 사용된다. [참고](https://palyoung.tistory.com/72)

```java
@Controller
public class HelloController {

    @GetMapping("hello")
    public String Hello(Model model) {

    }
}
```

클래스 안에 ```@GetMapping("hello")``` 는 Web application에서 "/hello"가 들어오면, ```Hello(Model model)``` 을 실행하도록 한다. 여기서 model은 Model, View, Controller의 model이고, Get은 Get or Post method를 의미한다.

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
    <p th:text="'안녕하세요. ' + ${data}" >안녕하세요. 손님</p>
</body>
</html>
```
를 작성하도록 한다. 일단은 따라서 쳐보도록 하자.
위 코드에서 ```th``` 라는 것을 볼 수 있는데, 이는 제일 윗 코드에서 선언한 ```xmlns:th="http://www.thymeleaf.org"``` 를 의미하고, 이 선언으로 thymeleaf 문법을 사용할 수 있게 된 것이다.

그리고 ```<p th:text="'안녕하세요. ' + ${data}">안녕하세요. 손님</p>``` 에서 **data**는 아까 위의 ```HelloController``` 에서 작성한 ```model.addAttribute("data", "hello!!!");``` 의 **data**를 의미한다. 이 메소드에서 **"data"는 attributeName**이고, **"hello!!!"는 attributeValue**가 된다. 이후 일단 서버를 재시작해보자.

<p align="center"><img src="https://images.velog.io/images/bsu1209/post/4a0e589d-b2e8-461a-840a-922330166e60/image.png" width="70%" height="30%"></p>
위와 같이 /hello로 접속하게 되면, ${data}가 "hello!!!"로 치환된 것을 확인할 수 있다.

<p align="center"><img src="https://images.velog.io/images/bsu1209/post/1a2948e3-36c9-4b08-9223-b3b00f218255/%E1%84%86%E1%85%AE%E1%84%8C%E1%85%A6.drawio%20(1).png" width="80%" height="30%"></p>

- `localhost:8080/hello` 에 `GET` 방식으로 접근하게 되면, 생성한 `HelloController` 안의 statement들을 실행하게 된다.
	
    - 이때, `return hello;` 에서 hello는 `templates/hello.html` 의 hello로 매칭되어 해당 html 파일을 렌더링하라는 의미이다. **(ViewName = hello)**
    - SpringBoot는 기본적으로 `resources:templates/ + {ViewName} + .html` 파일을 찾는다.

---

## 🔍 빌드하고 실행하기
**꼭 서버를 종료한 후,**

1. `./gradlew build` → "필요한 lib들을 다운받고 빌드가 수행"<img src="https://images.velog.io/images/bsu1209/post/48e1f4b1-df00-4c2c-989f-1517a906d4a3/image.png" width="50%" height="30%">이와 같이 뜨면 빌드가 성공된 것이다.
2. `cd build/libs` → "해당 폴더에 빌드된 `jar` 파일이 생성됨"
이는 스타터로 설정한 <a href="#packaging">Packaging</a> 방식으로 인해 `jar` 파일이 생성된다.<img src="https://images.velog.io/images/bsu1209/post/08360dc5-5146-499b-9910-af1ff9188b35/image.png" width="70%" height="30%">위와 같이 `hello-spring-0.0.1-SNAPSHOT-plain.jar` 이라는 파일도 같이 생성되는데, 이는 Spring-boot 2.5.0 이상부터 생성되는 듯하다. 
이를 없애려면, `build.gradle` 파일 안에 `jar { enabled = false }` 코드를 추가해주고 build를 수행하면 된다.
3. `java -jar hello-spring-0.0.1-SNAPSHOT.jar`
<img src="https://images.velog.io/images/bsu1209/post/58a7fe61-93dc-4b38-baa6-e44fe17ca62f/image.png" width="100%" height="30%">서버가 가동되는 것을 확인할 수 있다.

이제 빌드된 결과물인 `hello-spring-0.0.1-SNAPSHOT.jar` 만 파일만 실행시키면 서버가 동작할 수 있게 되었다.

> `./gradlew clean`
: `build` 폴더가 삭제된다.
`./gradlew clean build`
: `build` 폴더를 삭제하고 새로 build 수행

---

## 📕 참고
[스프링 입문-코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)

**Spring Boot DevTools**<br/>
:파일 수정 이후 별도로 서버를 재시작할 필요 없이 변경 사항이 적용되도록 해주는 도구
<p align="center"><img src="https://images.velog.io/images/bsu1209/post/6307ef88-1a2d-45ae-8359-c090b337f5c2/image.png" width="80%" height="30%"></p>

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

`Preferences` → `Build, Execution, Deployment` → `Compiler` → `Build project automatically` check!
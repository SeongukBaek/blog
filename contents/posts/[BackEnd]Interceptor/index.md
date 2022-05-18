---
title: "💻 Interceptor"
description: "백엔드 지식"
date: 2022-03-15
update: 2022-03-17
tags:
  - Java
  - SpringBoot
  - interceptor
  - filter
series: "💻 BackEnd"
---

<em>GongDon 프로젝트를 진행하면서 알게 된 Interceptor의 개념에 대해 정리하는 POST다.</em>

## 🔦 Interceptor란
컨트롤러에 들어오는 **요청**(HttpRequest)와 컨트롤러가 응답하는 **HttpResponse**를 가로채는 역할을 수행한다. 인증 작업이나 필요한 로직을 수행한 후 컨트롤러로 보내주는 모듈이다. 

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile10.uf.tistory.com%2Fimage%2F992590395ABF406F180F86" width="80%">

위 그림을 보면, interceptor는 `DispatcherServlet` 의 앞, 뒤에서 요청과 응답을 가로챈다. 언뜻 보면 filter와 비슷해보이는데, 분명한 차이점이 있다.

1. 호출 시점
   - 그림만 보더라도, 확연히 호출 시점이 다른 것을 알 수 있다.
   - filter의 경우, `DispatcherServlet` 이 실행되기 전에 호출된다.
   - interceptor의 경우, `DispatcherServlet` 이 실행된 이후에 호출된다.

2. 설정 위치
   - filter는 `web.xml` 에 설정하지만, interceptor는 `spring-boot-starter-web` dependency 설정과 interceptor 등록을 위한 config가 필요하다.

3. 구현 방식
   - filter는 설정 이후, 바로 구현이 가능하다.
   - interceptor는 등록과 등록한 빈을 사용하는 메소드 구현이 필요하다.

Interceptor에 대해 더 자세하게 보면, 아래 그림과 같다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdnFaBP%2Fbtq3hasvPj5%2F7QAPXDlu5nGShwf2aEOQSK%2Fimg.png" width="80%">

- 위 그림처럼 Interceptor는 Controller(Handler)로 가기전에 요청을 가로채는 `preHandle` , Controller 처리 후 `postHandle` , 전체 요청이 끝난 후 처리되는 `afterCompletion` 으로 이루어져있다.
- Handler 역할을 하는 Controller로 가기전에 가로채기 때문에 정식 명칭은 `HandlerInterceptor` 이다.

---

## 🔦 Interceptor 설정
Interceptor 사용을 위해서는,
- `spring-boot-starter-web` dependency 설정
- Interceptor 생성
- Interceptor 등록을 위한 Config

가 필요하다.

### 🔧 Interceptor 생성

먼저 Interceptor의 생성을 위해서는, 아래 두 가지 방법이 있다.
- Spring Web에서 제공하는 `HandlerInterceptor` Interface를 구현하는 방법 (`preHandle` , `postHandle` , `afterCompletion` 오버라이딩 필요)
- 추상 클래스인 `HandlerInterceptorAdapter` 를 상속하는 방법

후자를 택하게 되면, `@Deprecated` annotation에 대한 고민이 필요하다. 여기서는 전자에 대해서 다룬다.

> `@Deprecated` 
> - 클래스나 메소드 등을 더 이상 사용 권장하지 않는 경우에 사용하는 annotation
> - 사용이 불가능한 것은 아니지만, 차후에 없어질 수도 있다는 것을 의미한다.

`MyInterceptor.java`
```java
@Log4j2
@Component
public class PostInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object obj) throws Exception {
        log.info("url : {}", request.getRequestURI());
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object obj, ModelAndView mav) throws Exception {
        log.info("response status: {}", response.getStatus());
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object obj, Exception e) throws Exception {
    }
}
```

- `preHandle` : 실제 Controller(Handler)가 실행되기 전에 실행되며, `boolean` 타입의 값을 반환한다.
  - true : 요청한 handler를 처리
  - false : 처리하지 않음
- `postHandle` : handler가 실행된 후 실행
- `afterCompletion` : 전체 요청이 끝나고 난 후 마지막에 실행

> 필요한 기능에 따라 각 메소드에 구현하면 된다.

### 🔧 Interceptor 등록
위에서 생성한 Interceptor는 아직 정상적으로 등록되지 않았기 때문에, 해당 코드는 실행되지 않는다. Spring MVC에 등록 요청을 수행하는 Config가 필요하다.

`WebConfig.java`
```java
@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final PostInterceptor postInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(postInterceptor)
                .addPathPatterns("/api/post/**");
    }
}
```

- Interceptor 등록을 위한 설정 파일이다. 
- `@Component` annotation으로 Bean으로 등록된 Interceptor를 가져와 registry에 등록한다.
  - `addPathPatterns` : interceptor를 적용할 patterns를 명시
  - `excludePathPatterns` : 제외할 patterns를 명시
    - 각 Controller의 메소드에 대해 annotation을 이용해 권한을 확인하는 방식으로 모든 patterns에 대해 개방해둘 수 있다.
    - 나는 여기서 `PostController` 에 대한 Interceptor를 생성하기 위해 `/api/post/**` 로 명시했다.

annotation 방식을 활용하여 Interceptor에서 수행할 권한 확인을 처리할 수 있다. 아래는 
`MyAnnotation.java`
```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface MyAnnotation {
  // 권한을 확인할 로직, 예를 들면 관리자인지 아닌지를 확인
  UserType userType() default UserType.STUDENT;
}
```

- handlerMethod에 annotation을 활용한 권한 확인을 위해 추가한 annotation이다.

> Spring Security에 비슷한 기능을 하는 `@Secured` annotation이 있다.

최종적으로 Controller의 Methods에 `MyAnnotation` annotation을 추가해 적절히 수행되는지 확인한다.

## 🔦 AOP 사용
AOP에 대해서는 다음 포스트에서 정리하도록 한다. 여기서는 위에서 생성한 annotation에 대한 실행 시간 측정을 위해서 사용해보도록 한다.

먼저 AOP 사용을 위해 의존성을 추가한다.
```xml
implementation 'org.springframework.boot:spring-boot-starter-aop'
```

```java
@Component
@Aspect // Aspect 를 꼭 명시!
@Log4j2
class LogAspect {

    @Around("@annotation(MyAnnotation)") // 해당 어노테이션에 대해서 
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        Object proceed = joinPoint.proceed();

        stopWatch.stop();
        log.info(stopWatch.prettyPrint());
        return proceed;
    }
}
```

- `MyAnnotation` 이 붙게 되면, 실행 시간을 측정하고 이를 로그에 남기도록 한다.
  - `Aspect` 로, 이 클래스가 Aspect를 나타내는 클래스라는 것을 명시한다.
  - `joinPoint` 를 가져와서, 해당 Point에서 동작되는 시간을 측정한다.

실행 시간을 측정할 Controller method에 `MyAnnotation` 을 붙여 결과를 확인한다.

## 📕 참고
- [[Spring] Interceptor (1) - 개념 및 예제](https://victorydntmd.tistory.com/176)
- [[SpringMVC] 인터셉터(interceptor) 적용 - session](https://hyeonic.tistory.com/201)
- [@Deprecated](https://araikuma.tistory.com/659)
- [Spring Boot 에서 log를 남기는 방법 - Spring log 남기기](https://huisam.tistory.com/entry/springlogging)
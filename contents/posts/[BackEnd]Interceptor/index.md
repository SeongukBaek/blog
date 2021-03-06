---
title: "๐ป Interceptor"
description: "๋ฐฑ์๋ ์ง์"
date: 2022-03-15
update: 2022-03-17
tags:
  - Java
  - SpringBoot
  - interceptor
  - filter
series: "๐ป BackEnd"
---

<em>GongDon ํ๋ก์ ํธ๋ฅผ ์งํํ๋ฉด์ ์๊ฒ ๋ Interceptor์ ๊ฐ๋์ ๋ํด ์ ๋ฆฌํ๋ POST๋ค.</em>

## ๐ฆ Interceptor๋
์ปจํธ๋กค๋ฌ์ ๋ค์ด์ค๋ **์์ฒญ**(HttpRequest)์ ์ปจํธ๋กค๋ฌ๊ฐ ์๋ตํ๋ **HttpResponse**๋ฅผ ๊ฐ๋ก์ฑ๋ ์ญํ ์ ์ํํ๋ค. ์ธ์ฆ ์์์ด๋ ํ์ํ ๋ก์ง์ ์ํํ ํ ์ปจํธ๋กค๋ฌ๋ก ๋ณด๋ด์ฃผ๋ ๋ชจ๋์ด๋ค. 

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile10.uf.tistory.com%2Fimage%2F992590395ABF406F180F86" width="80%">

์ ๊ทธ๋ฆผ์ ๋ณด๋ฉด, interceptor๋ `DispatcherServlet` ์ ์, ๋ค์์ ์์ฒญ๊ณผ ์๋ต์ ๊ฐ๋ก์ฑ๋ค. ์ธ๋ป ๋ณด๋ฉด filter์ ๋น์ทํด๋ณด์ด๋๋ฐ, ๋ถ๋ชํ ์ฐจ์ด์ ์ด ์๋ค.

1. ํธ์ถ ์์ 
   - ๊ทธ๋ฆผ๋ง ๋ณด๋๋ผ๋, ํ์ฐํ ํธ์ถ ์์ ์ด ๋ค๋ฅธ ๊ฒ์ ์ ์ ์๋ค.
   - filter์ ๊ฒฝ์ฐ, `DispatcherServlet` ์ด ์คํ๋๊ธฐ ์ ์ ํธ์ถ๋๋ค.
   - interceptor์ ๊ฒฝ์ฐ, `DispatcherServlet` ์ด ์คํ๋ ์ดํ์ ํธ์ถ๋๋ค.

2. ์ค์  ์์น
   - filter๋ `web.xml` ์ ์ค์ ํ์ง๋ง, interceptor๋ `spring-boot-starter-web` dependency ์ค์ ๊ณผ interceptor ๋ฑ๋ก์ ์ํ config๊ฐ ํ์ํ๋ค.

3. ๊ตฌํ ๋ฐฉ์
   - filter๋ ์ค์  ์ดํ, ๋ฐ๋ก ๊ตฌํ์ด ๊ฐ๋ฅํ๋ค.
   - interceptor๋ ๋ฑ๋ก๊ณผ ๋ฑ๋กํ ๋น์ ์ฌ์ฉํ๋ ๋ฉ์๋ ๊ตฌํ์ด ํ์ํ๋ค.

Interceptor์ ๋ํด ๋ ์์ธํ๊ฒ ๋ณด๋ฉด, ์๋ ๊ทธ๋ฆผ๊ณผ ๊ฐ๋ค.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdnFaBP%2Fbtq3hasvPj5%2F7QAPXDlu5nGShwf2aEOQSK%2Fimg.png" width="80%">

- ์ ๊ทธ๋ฆผ์ฒ๋ผ Interceptor๋ Controller(Handler)๋ก ๊ฐ๊ธฐ์ ์ ์์ฒญ์ ๊ฐ๋ก์ฑ๋ `preHandle` , Controller ์ฒ๋ฆฌ ํ `postHandle` , ์ ์ฒด ์์ฒญ์ด ๋๋ ํ ์ฒ๋ฆฌ๋๋ `afterCompletion` ์ผ๋ก ์ด๋ฃจ์ด์ ธ์๋ค.
- Handler ์ญํ ์ ํ๋ Controller๋ก ๊ฐ๊ธฐ์ ์ ๊ฐ๋ก์ฑ๊ธฐ ๋๋ฌธ์ ์ ์ ๋ช์นญ์ `HandlerInterceptor` ์ด๋ค.

---

## ๐ฆ Interceptor ์ค์ 
Interceptor ์ฌ์ฉ์ ์ํด์๋,
- `spring-boot-starter-web` dependency ์ค์ 
- Interceptor ์์ฑ
- Interceptor ๋ฑ๋ก์ ์ํ Config

๊ฐ ํ์ํ๋ค.

### ๐ง Interceptor ์์ฑ

๋จผ์  Interceptor์ ์์ฑ์ ์ํด์๋, ์๋ ๋ ๊ฐ์ง ๋ฐฉ๋ฒ์ด ์๋ค.
- Spring Web์์ ์ ๊ณตํ๋ `HandlerInterceptor` Interface๋ฅผ ๊ตฌํํ๋ ๋ฐฉ๋ฒ (`preHandle` , `postHandle` , `afterCompletion` ์ค๋ฒ๋ผ์ด๋ฉ ํ์)
- ์ถ์ ํด๋์ค์ธ `HandlerInterceptorAdapter` ๋ฅผ ์์ํ๋ ๋ฐฉ๋ฒ

ํ์๋ฅผ ํํ๊ฒ ๋๋ฉด, `@Deprecated` annotation์ ๋ํ ๊ณ ๋ฏผ์ด ํ์ํ๋ค. ์ฌ๊ธฐ์๋ ์ ์์ ๋ํด์ ๋ค๋ฃฌ๋ค.

> `@Deprecated` 
> - ํด๋์ค๋ ๋ฉ์๋ ๋ฑ์ ๋ ์ด์ ์ฌ์ฉ ๊ถ์ฅํ์ง ์๋ ๊ฒฝ์ฐ์ ์ฌ์ฉํ๋ annotation
> - ์ฌ์ฉ์ด ๋ถ๊ฐ๋ฅํ ๊ฒ์ ์๋์ง๋ง, ์ฐจํ์ ์์ด์ง ์๋ ์๋ค๋ ๊ฒ์ ์๋ฏธํ๋ค.

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

- `preHandle` : ์ค์  Controller(Handler)๊ฐ ์คํ๋๊ธฐ ์ ์ ์คํ๋๋ฉฐ, `boolean` ํ์์ ๊ฐ์ ๋ฐํํ๋ค.
  - true : ์์ฒญํ handler๋ฅผ ์ฒ๋ฆฌ
  - false : ์ฒ๋ฆฌํ์ง ์์
- `postHandle` : handler๊ฐ ์คํ๋ ํ ์คํ
- `afterCompletion` : ์ ์ฒด ์์ฒญ์ด ๋๋๊ณ  ๋ ํ ๋ง์ง๋ง์ ์คํ

> ํ์ํ ๊ธฐ๋ฅ์ ๋ฐ๋ผ ๊ฐ ๋ฉ์๋์ ๊ตฌํํ๋ฉด ๋๋ค.

### ๐ง Interceptor ๋ฑ๋ก
์์์ ์์ฑํ Interceptor๋ ์์ง ์ ์์ ์ผ๋ก ๋ฑ๋ก๋์ง ์์๊ธฐ ๋๋ฌธ์, ํด๋น ์ฝ๋๋ ์คํ๋์ง ์๋๋ค. Spring MVC์ ๋ฑ๋ก ์์ฒญ์ ์ํํ๋ Config๊ฐ ํ์ํ๋ค.

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

- Interceptor ๋ฑ๋ก์ ์ํ ์ค์  ํ์ผ์ด๋ค. 
- `@Component` annotation์ผ๋ก Bean์ผ๋ก ๋ฑ๋ก๋ Interceptor๋ฅผ ๊ฐ์ ธ์ registry์ ๋ฑ๋กํ๋ค.
  - `addPathPatterns` : interceptor๋ฅผ ์ ์ฉํ  patterns๋ฅผ ๋ช์
  - `excludePathPatterns` : ์ ์ธํ  patterns๋ฅผ ๋ช์
    - ๊ฐ Controller์ ๋ฉ์๋์ ๋ํด annotation์ ์ด์ฉํด ๊ถํ์ ํ์ธํ๋ ๋ฐฉ์์ผ๋ก ๋ชจ๋  patterns์ ๋ํด ๊ฐ๋ฐฉํด๋ ์ ์๋ค.
    - ๋๋ ์ฌ๊ธฐ์ `PostController` ์ ๋ํ Interceptor๋ฅผ ์์ฑํ๊ธฐ ์ํด `/api/post/**` ๋ก ๋ช์ํ๋ค.

annotation ๋ฐฉ์์ ํ์ฉํ์ฌ Interceptor์์ ์ํํ  ๊ถํ ํ์ธ์ ์ฒ๋ฆฌํ  ์ ์๋ค. ์๋๋ 
`MyAnnotation.java`
```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface MyAnnotation {
  // ๊ถํ์ ํ์ธํ  ๋ก์ง, ์๋ฅผ ๋ค๋ฉด ๊ด๋ฆฌ์์ธ์ง ์๋์ง๋ฅผ ํ์ธ
  UserType userType() default UserType.STUDENT;
}
```

- handlerMethod์ annotation์ ํ์ฉํ ๊ถํ ํ์ธ์ ์ํด ์ถ๊ฐํ annotation์ด๋ค.

> Spring Security์ ๋น์ทํ ๊ธฐ๋ฅ์ ํ๋ `@Secured` annotation์ด ์๋ค.

์ต์ข์ ์ผ๋ก Controller์ Methods์ `MyAnnotation` annotation์ ์ถ๊ฐํด ์ ์ ํ ์ํ๋๋์ง ํ์ธํ๋ค.

## ๐ฆ AOP ์ฌ์ฉ
AOP์ ๋ํด์๋ ๋ค์ ํฌ์คํธ์์ ์ ๋ฆฌํ๋๋ก ํ๋ค. ์ฌ๊ธฐ์๋ ์์์ ์์ฑํ annotation์ ๋ํ ์คํ ์๊ฐ ์ธก์ ์ ์ํด์ ์ฌ์ฉํด๋ณด๋๋ก ํ๋ค.

๋จผ์  AOP ์ฌ์ฉ์ ์ํด ์์กด์ฑ์ ์ถ๊ฐํ๋ค.
```xml
implementation 'org.springframework.boot:spring-boot-starter-aop'
```

```java
@Component
@Aspect // Aspect ๋ฅผ ๊ผญ ๋ช์!
@Log4j2
class LogAspect {

    @Around("@annotation(MyAnnotation)") // ํด๋น ์ด๋ธํ์ด์์ ๋ํด์ 
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

- `MyAnnotation` ์ด ๋ถ๊ฒ ๋๋ฉด, ์คํ ์๊ฐ์ ์ธก์ ํ๊ณ  ์ด๋ฅผ ๋ก๊ทธ์ ๋จ๊ธฐ๋๋ก ํ๋ค.
  - `Aspect` ๋ก, ์ด ํด๋์ค๊ฐ Aspect๋ฅผ ๋ํ๋ด๋ ํด๋์ค๋ผ๋ ๊ฒ์ ๋ช์ํ๋ค.
  - `joinPoint` ๋ฅผ ๊ฐ์ ธ์์, ํด๋น Point์์ ๋์๋๋ ์๊ฐ์ ์ธก์ ํ๋ค.

์คํ ์๊ฐ์ ์ธก์ ํ  Controller method์ `MyAnnotation` ์ ๋ถ์ฌ ๊ฒฐ๊ณผ๋ฅผ ํ์ธํ๋ค.

## ๐ ์ฐธ๊ณ 
- [[Spring] Interceptor (1) - ๊ฐ๋ ๋ฐ ์์ ](https://victorydntmd.tistory.com/176)
- [[SpringMVC] ์ธํฐ์ํฐ(interceptor) ์ ์ฉ - session](https://hyeonic.tistory.com/201)
- [@Deprecated](https://araikuma.tistory.com/659)
- [Spring Boot ์์ log๋ฅผ ๋จ๊ธฐ๋ ๋ฐฉ๋ฒ - Spring log ๋จ๊ธฐ๊ธฐ](https://huisam.tistory.com/entry/springlogging)
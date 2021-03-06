---
title: "๐ 5. ์ฑ๊ธํค ์ปจํ์ด๋"
description: "์คํ๋ง ํต์ฌ ์๋ฆฌ - ๊ธฐ๋ณธํธ ๊ฐ์ ์ ๋ฆฌ"
date: 2022-07-19
update: 2022-07-19
tags:
  - Java
  - SpringBoot
series: "๐ ์คํ๋ง ํต์ฌ ์๋ฆฌ - ๊ธฐ๋ณธํธ"
---

<em><strong>[์คํ๋ง ํต์ฌ ์๋ฆฌ - ๊ธฐ๋ณธํธ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)์ ๋ค์ผ๋ฉฐ ์ ๋ฆฌํ๋ POST์๋๋ค.</strong></em>

## ๐ฏ ์น ์ ํ๋ฆฌ์ผ์ด์๊ณผ ์ฑ๊ธํค
๋๋ถ๋ถ์ ์คํ๋ง ์ ํ๋ฆฌ์ผ์ด์์ ์น ์ ํ๋ฆฌ์ผ์ด์์ด๋ค. (๋ฌผ๋ก  ์น์ด ์๋ ์ ํ๋ฆฌ์ผ์ด์ ๊ฐ๋ฐ๋ ์ผ๋ง๋ ์ง ๊ฐ๋ฐ ๊ฐ๋ฅํ๋ค.)
- ์น ์ ํ๋ฆฌ์ผ์ด์์ ๋ณดํต ์ฌ๋ฌ ๊ณ ๊ฐ์ด ๋์์ ์์ฒญ์ ํ๋ค.

<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/ํด๋ผ์ด์ธํธ์DI์ปจํ์ด๋.png" width="80%">

- ์๋ก์ด ํด๋ผ์ด์ธํธ๊ฐ ์์ฒญํ  ๋๋ง๋ค ์ธ์คํด์ค๋ฅผ ์๋ก ์์ฑํ์ฌ ๋ฐํํ๋ค. 
- ๋ฐ๋ผ์, ๋งค ์์ฒญ๋ง๋ค ์๋ก์ด ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ์์ฒญ ์๋งํผ ์์ฑ๋๋ค.
  - ์ด์ ์ ์ํํ๋ `AppConfig` ๋ฅผ ์ด์ฉํ ๋ฐฉ์์ด ์ด์ ๊ฐ๋ค.

**์คํ๋ง ์๋ ์์ํ DI ์ปจํ์ด๋ ํ์คํธ**
```java
package hello.core.singleton;

import hello.core.AppConfig;
import hello.core.member.MemberService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

public class SingletonTest {

    @Test
    @DisplayName("์คํ๋ง ์๋ ์์ํ DI ์ปจํ์ด๋")
    void pureContainer() {
        AppConfig appConfig = new AppConfig();

        // 1. ์กฐํ: ํธ์ถํ  ๋๋ง๋ค ๊ฐ์ฒด๋ฅผ ์์ฑ
        MemberService memberService1 = appConfig.memberService();

        // 2. ์กฐํ: ํธ์ถํ  ๋๋ง๋ค ๊ฐ์ฒด๋ฅผ ์์ฑ
        MemberService memberService2 = appConfig.memberService();

        // ์ฐธ์กฐ๊ฐ์ด ๋ค๋ฅธ์ง ํ์ธ
        System.out.println("memberService1 = " + memberService1);
        System.out.println("memberService2 = " + memberService2);

        assertThat(memberService1).isNotSameAs(memberService2);
    }
} 
```

- ์ด์ ์ ๋ง๋  ์คํ๋ง ์๋ ์์ํ DI ์ปจํ์ด๋์ธ `AppConfig` ๋ ์์ฒญ๋ง๋ค ๊ฐ์ฒด๋ฅผ ์๋ก ์์ฑํ๋ค.
- ๊ณ ๊ฐ ํธ๋ํฝ์ด ์ด๋น 100์ด๋ผ๊ณ  ๊ฐ์ ํ๋ฉด, ์ด๋น 100๊ฐ์ ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ  ์๋ฉธํ๋ค. ์ด๋ ์ฌ๊ฐํ ๋ฉ๋ชจ๋ฆฌ ๋ญ๋น๋ฅผ ์ด๋ํ๋ค.

> ์ด์ ๋ํ ํด๊ฒฐ๋ฐฉ์์ผ๋ก **ํด๋น ๊ฐ์ฒด๊ฐ ๋ฑ 1๊ฐ๋ง ์์ฑ๋๊ณ , ์ด๋ฅผ ๊ณต์ ํ๋๋ก ์ค๊ณํ๋ค. -> ์ฑ๊ธํค ํจํด**

---

## ๐ฏ ์ฑ๊ธํค ํจํด
**ํด๋์ค์ ์ธ์คํด์ค๊ฐ ๋ฑ 1๊ฐ๋ง ์์ฑ๋๋ ๊ฒ์ ๋ณด์ฅํ๋ ๋์์ธ ํจํด**์ด๋ค.
- ๊ฐ์ฒด ์ธ์คํด์ค๋ฅผ 2๊ฐ ์ด์ ์์ฑํ์ง ๋ชปํ๋๋ก ๋ง์์ผ ํ๋ค!
  - `private` ์์ฑ์๋ฅผ ์ด์ฉํด ์ธ๋ถ์์ ์์๋ก `new` ํค์๋๋ฅผ ์ฌ์ฉํ์ง ๋ชปํ๋๋ก ๋ง์์ผ ํ๋ค.

```java
package hello.core.singleton;

public class SingletonService {

    // ์๊ธฐ ์์ ์ ๋ด๋ถ์ private์ผ๋ก ๊ฐ์ง
    // ์ด๋ static์ผ๋ก ๊ฐ์ง๊ธฐ์ ํด๋์ค ๋ ๋ฒจ์ ๋ฑ 1๊ฐ๋ง ์์ฑ๋๋ค.
    private static final SingletonService instance = new SingletonService();

    public static SingletonService getInstance() {
        // ๋ด๋ถ์ ์ผ๋ก new SingletonService๋ฅผ ์คํํด ์ฐธ์กฐ๊ฐ์ ๋ฃ์ด๋์ instance๋ฅผ ๋ฐํ
        return instance;
    }
}
```
- ์์ ๊ฐ์ด `getInstance()` ๋ฅผ ํตํด ์์ฑํด๋์ `SingletonService` ๋ฅผ ๋ฐํ๋ฐ์ ์ ์๋๋ก ๊ตฌํํ๋ค.
- ํ์ง๋ง ์ธ๋ถ์์ ์์๋ก `new SingletonService()` ๋ฅผ ํธ์ถํ๋ค๋ฉด, ์ฌ๋ฌ ๊ฐ์ ์ธ์คํด์ค๋ฅผ ์์ฑํ๊ฒ ๋๋ค.

```java
package hello.core.singleton;

public class SingletonService {

    // ์๊ธฐ ์์ ์ ๋ด๋ถ์ private์ผ๋ก ๊ฐ์ง
    // ์ด๋ static์ผ๋ก ๊ฐ์ง๊ธฐ์ ํด๋์ค ๋ ๋ฒจ์ ๋ฑ 1๊ฐ๋ง ์์ฑ๋๋ค.
    private static final SingletonService instance = new SingletonService();

    public static SingletonService getInstance() {
        // ๋ด๋ถ์ ์ผ๋ก new SingletonService๋ฅผ ์คํํด ์ฐธ์กฐ๊ฐ์ ๋ฃ์ด๋์ instance๋ฅผ ๋ฐํ
        return instance;
    }

    private SingletonService() {

    }

    public void logic() {
        System.out.println("์ฑ๊ธํค ๊ฐ์ฒด ๋ก์ง ํธ์ถ");
    }
}
```

1. `static` ์์ญ์ ๊ฐ์ฒด `instance` ๋ฅผ ๋ฏธ๋ฆฌ ํ๋ ์์ฑํด ์ฌ๋ ค๋๋ค.
2. ์ด ๊ฐ์ฒด ์ธ์คํด์ค๊ฐ ํ์ํ๋ฉด ์ค์ง `getInstance()` ๋ฉ์๋๋ฅผ ํตํด์๋ง ์กฐํํ  ์ ์๋ค. ์ด ๋ฉ์๋๋ ํญ์ ๊ฐ์ ์ธ์คํด์ค๋ฅผ ๋ฐํํ๋ค.
3. ๋ฑ 1๊ฐ์ ๊ฐ์ฒด ์ธ์คํด์ค๋ง ์กด์ฌํด์ผ ํ๋ฏ๋ก, ์์ฑ์๋ฅผ `private` ์ผ๋ก ๋ง์ ํน์๋ผ๋ ์ธ๋ถ์์ `new` ํค์๋๋ก ๊ฐ์ฒด ์ธ์คํด์ค๊ฐ ์์ฑ๋๋ ๊ฒ์ ๋ง๋๋ค.

**์ฑ๊ธํค ํจํด์ ์ฌ์ฉํ๋ ํ์คํธ ์ฝ๋**
```java
@Test
@DisplayName("์ฑ๊ธํค ํจํด์ ์ ์ฉํ ๊ฐ์ฒด ์ฌ์ฉ")
void singletonServiceTest() {
    SingletonService singletonService1 = SingletonService.getInstance();
    SingletonService singletonService2 = SingletonService.getInstance();

    System.out.println("singletonService1 = " + singletonService1);
    System.out.println("singletonService2 = " + singletonService2);

    assertThat(singletonService1).isSameAs(singletonService2);
    // same ==
    // equal 
}
```

- `private` ์ผ๋ก `new` ํค์๋๋ฅผ ๋ง์๋์๋ค.
- **ํธ์ถ๋ง๋ค ๊ฐ์ ๊ฐ์ฒด ์ธ์คํด์ค๋ฅผ ๋ฐํ**ํ๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

> ์ฑ๊ธํค ํจํด์ ๊ตฌํํ๋ ๋ฐฉ๋ฒ์ ๋งค์ฐ ๋ง๋ค. ์ฌ๊ธฐ์๋ ๊ฐ์ฒด๋ฅผ ๋ฏธ๋ฆฌ ์์ฑํด๋๋ ๊ฐ์ฅ ๋จ์ํ๊ณ  ์์ ํ ๋ฐฉ๋ฒ์ ๊ตฌํํ๋ค.

์ด๋ฏธ ๋ง๋ค์ด์ง ๊ฐ์ฒด๋ฅผ ๊ณต์ ํด์ ํจ์จ์ ์ผ๋ก ์ฌ์ฉํ  ์ ์์ง๋ง, **์ฑ๊ธํค ํจํด์ ๋ค์๊ณผ ๊ฐ์ ๋ฌธ์ ์ ๋ค**์ ๊ฐ์ง๊ณ  ์๋ค.
- ์ฑ๊ธํค ํจํด์ ๊ตฌํํ๋ ์ฝ๋ ์์ฒด๊ฐ ๋ง์ด ๋ค์ด๊ฐ๋ค.
- ์์กด๊ด๊ณ์ ํด๋ผ์ด์ธํธ๊ฐ ๊ตฌ์ฒด ํด๋์ค์ ์์กดํ๋ค. -> DIP ์๋ฐ!!!
- ํด๋ผ์ด์ธํธ๊ฐ ๊ตฌ์ฒด ํด๋์ค์ ์์กดํด์ OCP ์์น์ ์๋ฐํ  ๊ฐ๋ฅ์ฑ์ด ๋๋ค.
- ํ์คํธ๊ฐ ์ด๋ ต๋ค.
- ๋ด๋ถ ์์ฑ์ ๋ณ๊ฒฝํ๊ฑฐ๋ ์ด๊ธฐํํ๊ธฐ ์ด๋ ต๋ค.
- `private` ์์ฑ์๋ก ์ธํด ์์ ํด๋์ค๋ฅผ ๋ง๋ค๊ธฐ ์ด๋ ต๋ค.
- ๊ฒฐ๋ก ์ ์ผ๋ก ์ ์ฐ์ฑ์ด ๋จ์ด์ง๋ค. (DI์ ์ ์ฉ์ ์ด๋ ต๊ฒ ํจ)
- ์ํฐ ํจํด์ผ๋ก ๋ถ๋ฆฌ๊ธฐ๋ ํ๋ค.

---

## ๐ฏ ์ฑ๊ธํค ์ปจํ์ด๋
์คํ๋ง ์ปจํ์ด๋๋ **์ฑ๊ธํค ํจํด์ ๋ฌธ์ ์ ์ ํด๊ฒฐ**ํ๋ฉด์, **๊ฐ์ฒด ์ธ์คํด์ค๋ฅผ ์ฑ๊ธํค(1๊ฐ๋ง ์์ฑ)์ผ๋ก ๊ด๋ฆฌ**ํ๋ค.
- ์ง๊ธ๊น์ง ๋ฐฐ์ด ์คํ๋ง ๋น์ด ๋ฐ๋ก ์ฑ๊ธํค์ผ๋ก ๊ด๋ฆฌ๋๋ ๋น์ด๋ค!

### ๐ช ์ฑ๊ธํค ์ปจํ์ด๋
- ์คํ๋ง ์ปจํ์ด๋๋ ์ฑ๊ธํค ํจํด์ ์ ์ฉํ์ง ์์๋, ๊ฐ์ฒด ์ธ์คํด์ค๋ฅผ ์ฑ๊ธํค์ผ๋ก ๊ด๋ฆฌํ๋ค.
  - ์ด์ ์ ๋ค๋ฃฌ ์ปจํ์ด๋ ์์ฑ ๊ณผ์ ์ ์์ธํ ๋ณด๋ฉด, **์ปจํ์ด๋๋ ๊ฐ์ฒด๋ฅผ ํ๋๋ง ์์ฑํด์ ๊ด๋ฆฌ**ํ๋ค.
- ์คํ๋ง ์ปจํ์ด๋๋ ์ฑ๊ธํค ์ปจํ์ด๋ ์ญํ ์ ํ๋ค. ์ด๋ ๊ฒ ์ฑ๊ธํค ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ  ๊ด๋ฆฌํ๋ ๊ธฐ๋ฅ์ ์ฑ๊ธํค ๋ ์ง์คํธ๋ฆฌ๋ผ ํ๋ค.
- ์คํ๋ง ์ปจํ์ด๋์ ์ด๋ฐ ๊ธฐ๋ฅ๋์ ์ฑ๊ธํค ํจํด์ ๋ชจ๋  ๋จ์ ์ ํด๊ฒฐํ๋ฉด์ ๊ฐ์ฒด๋ฅผ ์ฑ๊ธํค์ผ๋ก ์ ์งํ  ์ ์๋ค.
  - ์ง์ ๋ถํ ์ฝ๋๊ฐ ๋ค์ด๊ฐ์ง ์์๋ ๋๋ค.
  - DIP, OCP, ํ์คํธ, `private` ์์ฑ์๋ก๋ถํฐ ์์ ๋กญ๊ฒ ์ฑ๊ธํค์ ์ฌ์ฉํ  ์ ์๋ค.

**์คํ๋ง ์ปจํ์ด๋๋ฅผ ์ฌ์ฉํ๋ ํ์คํธ ์ฝ๋**
```java
@Test
@DisplayName("์คํ๋ง ์ปจํ์ด๋์ ์ฑ๊ธํค")
void springContainer() {
//        AppConfig appConfig = new AppConfig();
    ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    // 1. ์กฐํ: ํธ์ถํ  ๋๋ง๋ค ๊ฐ์ฒด๋ฅผ ์์ฑ
//        MemberService memberService1 = appConfig.memberService();
    MemberService memberService1 = ac.getBean("memberService", MemberService.class);

    // 2. ์กฐํ: ํธ์ถํ  ๋๋ง๋ค ๊ฐ์ฒด๋ฅผ ์์ฑ
    MemberService memberService2 = ac.getBean("memberService", MemberService.class);
//        MemberService memberService2 = appConfig.memberService();

    // ์ฐธ์กฐ๊ฐ์ด ๊ฐ์์ง ํ์ธ
    System.out.println("memberService1 = " + memberService1);
    System.out.println("memberService2 = " + memberService2);

    assertThat(memberService1).isSameAs(memberService2);
}
```

- ์คํ๋ง ์ปจํ์ด๋์ ๋ฑ๋กํ ๋น์ด ๊ณ์ ์กฐํ๋์ด ๊ฐ์ ์ฐธ์กฐ๊ฐ์ ๊ฐ์ง๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.
  - ๊ทธ๋ฆฌ๊ณ  `MemberService` ์ฝ๋๋ฅผ ํ์ธํด๋ณด์๋, **์ฑ๊ธํค๊ณผ ๊ด๋ จ๋ ์ฝ๋๋ ํ๋๋ ์๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.**

**์ฑ๊ธํค ์ปจํ์ด๋ ์ ์ฉ ํ**
<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/์ฑ๊ธํค์ปจํ์ด๋์ ์ฉํ.png" width="80%">

- ์คํ๋ง ์ปจํ์ด๋ ๋๋ถ์ ๊ณ ๊ฐ์ ์์ฒญ๋ง๋ค ๊ฐ์ฒด๋ฅผ ์์ฑํ๋ ๊ฒ์ด ์๋ **์ด๋ฏธ ๋ง๋ค์ด์ง ๊ฐ์ฒด๋ฅผ ๊ณต์ ํด์ ํจ์จ์ ์ธ ์ฌ์ฌ์ฉ์ด ๊ฐ๋ฅ**ํด์ก๋ค.

> ์คํ๋ง์ ๊ธฐ๋ณธ ๋น ๋ฑ๋ก ๋ฐฉ์์ ์ฑ๊ธํค์ด์ง๋ง, ์ฑ๊ธํค ๋ฐฉ์๋ง ์ง์ํ๋ ๊ฒ์ ์๋๋ค. 
> - ์์ฒญ๋ง๋ค ์๋ก์ด ๊ฐ์ฒด๋ฅผ ์์ฑํด์ ๋ฐํํ๋ ๊ธฐ๋ฅ๋ ์ ๊ณตํ๊ธด ํ๋ค!

---

## ๐ฏ ์ฑ๊ธํค ๋ฐฉ์์ ์ฃผ์์ 
์ฑ๊ธํค ํจํด์ด๋ , ์คํ๋ง๊ณผ ๊ฐ์ ์ฑ๊ธํค ์ปจํ์ด๋๋ฅผ ์ฌ์ฉํ๋ , ๊ฐ์ฒด ์ธ์คํด์ค๋ฅผ ํ๋๋ง ์์ฑํด์ ๊ณต์ ํ๋ ์ฑ๊ธํค ๋ฐฉ์์ ์ฌ๋ฌ ํด๋ผ์ด์ธํธ๊ฐ ํ๋์ ๊ฐ์ ๊ฐ์ฒด ์ธ์คํด์ค๋ฅผ ๊ณต์ ํ๊ธฐ์, **์ฑ๊ธํค ๊ฐ์ฒด๋ ์ํ๋ฅผ ์ ์งํ๊ฒ ์ค๊ณํ๋ฉด ์๋๋ค!**
- ์ฆ, **๋ฌด์ํ(stateless)๋ก ์ค๊ณ**ํด์ผ ํ๋ค!
  - ํน์  ํด๋ผ์ด์ธํธ์ ์์กด์ ์ธ ํ๋๊ฐ ์์ผ๋ฉด ์๋๋ค! (ํน์  ํด๋ผ์ด์ธํธ๊ฐ ๊ฐ์ ๋ฐ๊พธ๊ฒ ๋๋ฉด ์๋๋ค!)
  - ํน์  ํด๋ผ์ด์ธํธ๊ฐ ๊ฐ์ ๋ณ๊ฒฝํ  ์ ์๋ ํ๋๊ฐ ์์ผ๋ฉด ์๋๋ค!
  - ๊ฐ๊ธ์  ์ฝ๊ธฐ๋ง ๊ฐ๋ฅํด์ผ ํ๋ค. (๊ฐ์ ์์ ์ด ์๋๋ก ํด์ผ ํ๋ค.)
  - ํ๋ ๋์ ์ ์๋ฐ์์ ๊ณต์ ๋์ง ์๋, ์ง์ญ๋ณ์, ํ๋ผ๋ฏธํฐ, ThreadLocal ๋ฑ์ ์ฌ์ฉํด์ผ ํ๋ค.
- ์คํ๋ง ๋น์ ํ๋์ ๊ณต์  ๊ฐ์ ์ค์ ํ๋ฉด ์ ๋ง ํฐ ์ฅ์ ๊ฐ ๋ฐ์ํ  ์ ์๋ค..!

**์ํ๋ฅผ ์ ์งํ  ๊ฒฝ์ฐ ๋ฐ์ํ๋ ๋ฌธ์ ์  ์์**
```java
package hello.core.singleton;

public class StatefulService {
    // ์ํ๋ฅผ ์ ์งํ๋ ํ๋
    private int price;
    
    public void order(String name, int price) {
        System.out.println("name = " + name + " price = " + price);
        
        // ์ฌ๊ธฐ๊ฐ ๋ฌธ์ !!!
        this.price = price;
    }
    
    public int getPrice() {
        return price;
    }
}

//

package hello.core.singleton;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import static org.assertj.core.api.Assertions.*;

class StatefulServiceTest {

    @Test
    void statefulServiceSingleton() {
        // TestConfig๋ก ac ์์ฑ
        ApplicationContext ac = new AnnotationConfigApplicationContext(TestConfig.class);
        StatefulService statefulService1 = ac.getBean(StatefulService.class);
        StatefulService statefulService2 = ac.getBean(StatefulService.class);

        // ThreadA: A ์ฌ์ฉ์๊ฐ 10000์ ์ฃผ๋ฌธ
        statefulService1.order("userA", 10000);
        // ThreadB: B ์ฌ์ฉ์๊ฐ 20000์ ์ฃผ๋ฌธ
        statefulService2.order("userB", 20000);

        // ThreadA: A ์ฌ์ฉ์๊ฐ ์ฃผ๋ฌธ ๊ธ์ก ์กฐํ -> ๊ณผ์ฐ ์ผ๋ง๊ฐ ๋์ฌ๊น?
        int price = statefulService1.getPrice();

        System.out.println("price = " + price);

        assertThat(statefulService1.getPrice()).isEqualTo(20000);
    }

    static class TestConfig {

        @Bean
        public StatefulService statefulService() {
            return new StatefulService();
        }
    }
}
```

- `StatefulServiceTest` ์ ์ถ๋ ฅ๋ฌธ์์ ๊ธฐ๋ํ ๊ฐ์ 10000์์ด๋ค.
  - ์ฌ์ฉ์ A๊ฐ ์ฃผ๋ฌธํ ๊ธ์ก์ด 10000์์ด๊ณ , ์ด๋ฅผ ๋ค์ ์กฐํํ ๊ฒ์ด๋ฏ๋ก 10000์์ ๊ธฐ๋ํ๋ค.
  - ํ์ง๋ง, ์ค๊ฐ์ ์ฌ์ฉ์ B์ ์ฃผ๋ฌธ์ด ๋ผ์ด๋ค์ด ๊ธฐ๋์ ๋ค๋ฅธ ๊ฐ์ด ์ถ๋ ฅ๋์๋ค. (์ฌ์ฉ์ B์ ์ฃผ๋ฌธ์ด `StatefulService` ์ `price` ํ๋๋ฅผ 20000์ผ๋ก ๋ณ๊ฒฝ!!!)
  - ๊ทธ๋ฆฌ๊ณ , `statefulService1` ๊ณผ `statefulService2` ๋ก ๋ค๋ฅธ ์ธ์คํด์ค๋ฅผ ์ฌ์ฉํ๋คํด๋, ์ฌ์ค ๋์ ๊ฐ์ ์ฐธ์กฐ๊ฐ์ ๊ฐ๋ ์ธ์คํด์ค์ด๊ธฐ์ ๋์ผํ๋ค.
- ์ด๋ฅผ ํด๊ฒฐํ๊ธฐ ์ํด `order` ๋ฅผ `int` ํ์ผ๋ก ๋ณํํ๊ณ , `price` ํ๋ ์ ๊ฑฐ, `price` ๋ฅผ ๋ฐํํ๋ ํํ๋ก ๋ฐ๊ฟ ์ ์๋ค.

---

## ๐ฏ @Configuration๊ณผ ์ฑ๊ธํค
> `@Configuration` ์ ์ฑ๊ธํค์ ์ํด ์กด์ฌํ๋ค.

`AppConfig` ๋ฅผ ๋ณด๋ฉด ์ด์ํ ์ ์ด ์๋ค.

```java
package hello.core;

import hello.core.discount.DiscountPolicy;
import hello.core.discount.FixDiscountPolicy;
import hello.core.discount.RateDiscountPolicy;
import hello.core.member.MemberRepository;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import hello.core.member.MemoryMemberRepository;
import hello.core.order.OrderService;
import hello.core.order.OrderServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    
    // @Bean memberService -> new MemoryMemberRepository()
    
    // @Bean orderService -> new MemoryMemberRepository()

    @Bean
    public MemberService memberService() {
        return new MemberServiceImpl(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }

    @Bean
    public OrderService orderService() {
        return new OrderServiceImpl(
                memberRepository(),
                discountPolicy()
        );
    }
    
    ...
}
```

- `memberService` ๋น์ ๋ง๋๋ ์ฝ๋๋ฅผ ๋ณด๋ฉด, `memberRepository()` ๋ฅผ ํธ์ถํ๋ค.
  - ์ด๋ `new MemoryMemberRepository()` ๋ฅผ ํธ์ถํ๋ค.
- `orderService` ๋น์ ๋ง๋๋ ์ฝ๋๋ฅผ ๋ณด๋ฉด, ๋์ผํ๊ฒ `memberRepository()` ๋ฅผ ํธ์ถํ๋ค.
  - ์ด๋ `new MemoryMemberRepository()` ๋ฅผ ํธ์ถํ๋ค.

๊ฒฐ๊ณผ์ ์ผ๋ก ๊ฐ๊ฐ ๋ค๋ฅธ 2๊ฐ์ `MemoryMemberRepository` ๊ฐ ์์ฑ๋๋ฉด์ ์ฑ๊ธํค์ด ๊นจ์ง๋ ๊ฒ์ฒ๋ผ ๋ณด์ธ๋ค!!!
- ์คํ๋ง ์ปจํ์ด๋๋ ์ด๋ฅผ ์ด๋ป๊ฒ ํด๊ฒฐํ ๊น?

**๊ฒ์ฆ ์ฉ๋์ ํ์คํธ ์ฝ๋ ์ถ๊ฐ**
- `memberService` ์ `orderService` ์์ ์์ฑํ๋ `memberRepository` ์ ๊ตฌ์ฒด ํด๋์ค๊ฐ ๊ฐ์ ๊ฒ์ฒ๋ผ ๋ณด์ธ๋ค.
- ๋ฐ๋ผ์ ๋ ๊ตฌํ ํด๋์ค์์ ํ์คํธ ์ฉ์ผ๋ก `MemberRepository` ๋ฅผ ์กฐํํ  ์ ์๋ ๋ฉ์๋๋ฅผ ์ถ๊ฐํ๋ค.

```java
package hello.core.member;

public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    // ํ์คํธ ์ฉ๋
    public MemberRepository getMemberRepository() {
        return memberRepository;
    }
}

//

package hello.core.order;

public class OrderServiceImpl implements OrderService {

    // ํ์์ ์ฐพ๊ธฐ ์ํด ํ์
    private final MemberRepository memberRepository;
    
    // ํ์คํธ ์ฉ๋
    public MemberRepository getMemberRepository() {
        return memberRepository;
    }
}
```

**ํ์คํธ ์ฝ๋**
```java
package hello.core.singleton;

import hello.core.AppConfig;
import hello.core.member.MemberRepository;
import hello.core.member.MemberServiceImpl;
import hello.core.order.OrderServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class ConfigurationSingletonTest {

    @Test
    void configurationTest() {
        ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

        MemberServiceImpl memberService = ac.getBean(MemberServiceImpl.class);
        OrderServiceImpl orderService = ac.getBean(OrderServiceImpl.class);
        MemberRepository memberRepository = ac.getBean("memberRepository", MemberRepository.class);

        MemberRepository memberRepository1 = memberService.getMemberRepository();
        MemberRepository memberRepository2 = orderService.getMemberRepository();
        
        // ๋ชจ๋ ๊ฐ์ ์ธ์คํด์ค๋ฅผ ์ฐธ์กฐํ๊ณ  ์๋ค.
        System.out.println("memberService -> memberRepository = " + memberRepository1);
        System.out.println("orderService -> memberRepository = " + memberRepository2);
        System.out.println("memberRepository = " + memberRepository);
    }
}
```
- ๋ชจ๋ ๊ฐ์ ์ธ์คํด์ค๋ฅผ ์ฐธ์กฐํ๊ณ  ์๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.
- ๊ฐ๊ฐ ์๋ก `new MemoryMemberRepository()` ๋ฅผ ํธ์ถํ๋๋ฐ ์ด๋ป๊ฒ ๊ฐ๋ฅํ ๊ฒ์ผ๊น..?
  - `memberService()` , `@Bean` ์ผ๋ก ์ธํ ๋น ๋ฑ๋ก ์ ํธ์ถ, `orderService()` ๋ก ์ด 3๋ฒ์ ํธ์ถ์ด ๋ ํ๋ฐ .. ?!
  - `AppConfig` ์์ ํธ์ถ๋ง๋ค ์ถ๋ ฅ๋ฌธ์ ์์ฑํด ์คํํ๋ฉด ์ถ๋ ฅ ๊ฒฐ๊ณผ๋ ๋ชจ๋ 1๋ฒ๋ง ํธ์ถ๋์ด ์ด 3๊ฐ์ ์ถ๋ ฅ๋ฌธ์ ํ์ธํ  ์ ์๋ค.
  - `memberService() -> memberRepository()`
  - `memberRepository()`
  - `orderService() -> memberRepository()`
  - ์ด ์ถ๋ ฅ๋ฌธ์ด 5๊ฐ๊ฐ ๋์์ผ ํ๋๋ฐ ..?

> ์คํ๋ง ์ปจํ์ด๋๋ ์ด๋ป๊ฒ๋  ์ฑ๊ธํค ๋ฐฉ์์ ๋ณด์ฅํ๋๊ตฌ๋..!

---

## ๐ฏ @Configuration๊ณผ ๋ฐ์ดํธ์ฝ๋ ์กฐ์์ ๋ง๋ฒ
์คํ๋ง ์ปจํ์ด๋๋ **์ฑ๊ธํค ๋ ์ง์คํธ๋ฆฌ**๋ค. ๋ฐ๋ผ์ ์คํ๋ง ๋น์ด ์ฑ๊ธํค์ด ๋๋๋ก ๋ณด์ฅํด์ผ ํ๋ค!
- ํ์ง๋ง ์คํ๋ง์ด ์๋ฐ ์ฝ๋๊น์ง ์ด๋ป๊ฒ ํ  ์๋ ์๋ค. 
  - ์์์ ์  ์๋ฐ ์ฝ๋๋ง ๋ดค์๋, ๋ถ๋ช `memberRepository()` ๋ 3๋ฒ ํธ์ถ๋์ด์ผ ํ๋ ๊ฒ์ด ๋ง๋ค.
- ๊ทธ๋์ ์คํ๋ง์ ํด๋์ค์ ๋ฐ์ดํธ์ฝ๋๋ฅผ ์กฐ์ํ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ฌ์ฉํ๋ค.
- `@Configuration` ์ ์ ์ฉํ `AppConfig` ๋ฅผ ํ์ธํ๋ค.

```java
@Test
void configurationDeep() {
    // AppConfig ๋ํ ๋น์ผ๋ก ๋ฑ๋ก๋จ!!!
    ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    AppConfig bean = ac.getBean(AppConfig.class);

    System.out.println("bean = " + bean.getClass());
    // ์ถ๋ ฅ: bean = class hello.core.AppConfig$$EnhancerBySpringCGLIB$$79b7202a
}
```

- ๋น์ผ๋ก ๋ฑ๋ก๋ `AppConfig` ์ ํด๋์ค ํ์์ ์ถ๋ ฅํ๋ฉด, `EnhancerBySpringCGLIB` ์ด๋ผ๋ ์ ๋ณด๊ฐ ์ถ๋ ฅ๋๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.
  - ์์ํ ํด๋์ค๋ผ๋ฉด, `class hello.core.AppConfig` ๊ฐ ์ถ๋ ฅ๋์ด์ผ ํ๋ค.
- ์ด๋ ๋ด๊ฐ ๋ง๋  ํด๋์ค๊ฐ ์๋๋ผ, ์คํ๋ง์ด `CGLIB` ๋ผ๋ ๋ฐ์ดํธ์ฝ๋ ์กฐ์ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ฌ์ฉํด `AppConfig` ํด๋์ค๋ฅผ ์์๋ฐ์ ์์์ ๋ค๋ฅธ ํด๋์ค๋ฅผ ๋ง๋ค๊ณ , ์ด๋ฅผ ์คํ๋ง ๋น์ผ๋ก ๋ฑ๋กํ ๊ฒ์ด๋ค!!!

<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/CGLIB.png" width="80%">

- ๊ทธ๋ฆฌ๊ณ  ์ด ์์์ ํด๋์ค๊ฐ ์ฑ๊ธํค์ด ๋ณด์ฅ๋๋๋ก ํ๋ค.
- ๊ทธ๋ฆฌ๊ณ  ์ด ๊ณผ์ ์ `@Configuration` ์ด๋ธํ์ด์์ ํตํด ์ํ๋๋ค.

**AppConfig@CGLIB ์์ ์ฝ๋**
```java
@Bean
public MemberRepository memberRepository() {
    
    if (memoryMemberRepository๊ฐ ์ด๋ฏธ ์คํ๋ง ์ปจํ์ด๋์ ๋ฑ๋ก๋์ด ์์ผ๋ฉด?) { 
        return ์คํ๋ง ์ปจํ์ด๋์์ ์ฐพ์์ ๋ฐํ;
    } else { //์คํ๋ง ์ปจํ์ด๋์ ์์ผ๋ฉด
        ๊ธฐ์กด ๋ก์ง์ ํธ์ถํด์ MemoryMemberRepository๋ฅผ ์์ฑํ๊ณ  ์คํ๋ง ์ปจํ์ด๋์ ๋ฑ๋ก 
        return ๋ฐํ
    } 
}
```

- `@Bean` ์ด ๋ถ์ ๋ฉ์๋๋ง๋ค ์ด๋ฏธ ์คํ๋ง ๋น์ด ์กด์ฌํ๋ฉด, ์กด์ฌํ๋ ๋น์ ๋ฐํํ๊ณ , ์๋ค๋ฉด ์์ฑํด์ ์คํ๋ง ๋น์ผ๋ก ๋ฑ๋กํ๊ณ  ๋ฐํํ๋ ์ฝ๋๊ฐ ๋์ ์ผ๋ก ๋ง๋ค์ด์ง๋ค.
  - ์ด ๋๋ถ์ ์ฑ๊ธํค์ด ๋ณด์ฅ๋๋ค.

> `AppConfig@CGLIB` ๋ `AppConfig` ์ ์์ ํ์์ด๋ค. ๋ฐ๋ผ์ ๋ถ๋ชจ ํ์์ธ `AppConfig` ํ์์ผ๋ก ์กฐํ๊ฐ ๊ฐ๋ฅํ๋ ๊ฒ์ด๋ค.

### ๐ช @Configuration ์์ด @Bean๋ง ์ ์ฉํ๋ฉด ์ด๋ป๊ฒ ๋ ๊น?
`@Configuration` ์ ๋ถ์ฌ ๋ฐ์ดํธ์ฝ๋๋ฅผ ์กฐ์ํ๋ CGLIB ๊ธฐ์ ์ ์ฌ์ฉํด์ ์ฑ๊ธํค์ ๋ณด์ฅํ์ง๋ง, `@Bean` ๋ง ์ ์ฉํ๋ฉด ์ด๋ป๊ฒ ๋ ๊น?
- `@Configuration` ์ญ์  ํ, ๋ค์ ์ถ๋ ฅ์ ๋ณด๋ฉด `bean = class hello.core.AppConfig` ์ ๊ฐ์ด ์์ํ `AppConfig` ๋ก ์คํ๋ง ๋น์ ๋ฑ๋ก๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

ํ์ง๋ง! ์ฑ๊ธํค์ด ๋ณด์ฅ๋์ง ์์, ๋น ๋ฑ๋ก ์ ํธ์ถ๋๋ ์ถ๋ ฅ๋ฌธ์ด ์ด 5๋ฒ ์ถ๋ ฅ๋๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค. (`MemberRepository` ๊ฐ ์ด 3๋ฒ ๋ชจ๋ ํธ์ถ๋จ)
- **๋น์ฐํ ๋ชจ๋ ๋ค๋ฅธ ์ธ์คํด์ค๋ก ์์ฑ**๋  ๊ฒ์ด๋ค!!!

> ์คํ๋ง ์ค์  ์ ๋ณด๋ ํญ์ `@Configuration` ์ ๋ช์ํ์ฌ ์ฑ๊ธํค์ ๋ณด์ฅํ๋๋ก ํ์.

## ๐ ์ค์ํ ๊ฐ๋
์ฑ๊ธํค ํจํด, ๋ฌด์ํ ์ค๊ณ, `@Configuration`

## ๐ ์ฐธ๊ณ 
- [์คํ๋ง ํต์ฌ ์๋ฆฌ - ๊ธฐ๋ณธํธ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)
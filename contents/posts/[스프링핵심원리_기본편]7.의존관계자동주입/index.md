---
title: "๐ 7. ์์กด๊ด๊ณ ์๋ ์ฃผ์"
description: "์คํ๋ง ํต์ฌ ์๋ฆฌ - ๊ธฐ๋ณธํธ ๊ฐ์ ์ ๋ฆฌ"
date: 2022-07-24
update: 2022-07-24
tags:
  - Java
  - SpringBoot
series: "๐ ์คํ๋ง ํต์ฌ ์๋ฆฌ - ๊ธฐ๋ณธํธ"
---

<em><strong>[์คํ๋ง ํต์ฌ ์๋ฆฌ - ๊ธฐ๋ณธํธ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)์ ๋ค์ผ๋ฉฐ ์ ๋ฆฌํ๋ POST์๋๋ค.</strong></em>

## ๐ฏ ๋ค์ํ ์์กด๊ด๊ณ ์ฃผ์ ๋ฐฉ๋ฒ
์์กด๊ด๊ณ ์ฃผ์์ ํฌ๊ฒ 4๊ฐ์ง ๋ฐฉ๋ฒ์ด ์๋ค.
- ์์ฑ์ ์ฃผ์
- ์์ ์ ์ฃผ์ (setter ์ฃผ์)
- ํ๋ ์ฃผ์
- ์ผ๋ฐ ๋ฉ์๋ ์ฃผ์

### ๐ช ์์ฑ์ ์ฃผ์
์ด๋ฆ ๊ทธ๋๋ก ์์ฑ์๋ฅผ ํตํด ์์กด ๊ด๊ณ๋ฅผ ์ฃผ์ ๋ฐ๋ ๋ฐฉ๋ฒ์ด๋ค. (์ง๊ธ๊น์ง ํ๋ ๋ฐฉ๋ฒ!)

**ํน์ง**
- ์์ฑ์ ํธ์ถ ์์ ์ ๋ฑ 1๋ฒ๋ง ํธ์ถ๋๋ ๊ฒ์ด ๋ณด์ฅ๋๋ค.
- **๋ถ๋ณ, ํ์ ์์กด๊ด๊ณ**์ ์ฌ์ฉํ๋ค.

```java
@Component
public class OrderServiceImpl implements OrderService {

    private final MemberRepository memberRepository;
    private final DiscountPolicy discountPolicy;

    @Autowired
    public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }
}
```

- `@Component` ์ด๋ธํ์ด์์ผ๋ก ์ธํด ์ปดํฌ๋ํธ ์ค์บ๋์ด ์คํ๋ง ๋น์ ๋ฑ๋ก์ด ๋  ๋, ์์ฑ์๋ฅผ ํธ์ถํ๋ค.
- ์ด๋, `@Autowired` ์ด๋ธํ์ด์์ผ๋ก ์ธํด `MemberRepository` ์ `DiscountPolicy` ๋น์ ์ปจํ์ด๋์์ ๊บผ๋ด ์์กด๊ด๊ณ๋ฅผ ์ฃผ์ํด์ค๋ค.

> **์์ฑ์๊ฐ ๋ฑ 1๊ฐ**๋ง ์์ผ๋ฉด, `@Autowired` ๋ฅผ ์๋ตํด๋ ์๋ ์ฃผ์๋๋ค. (์คํ๋ง ๋น์๋ง ํด๋น)

### ๐ช ์์ ์ ์ฃผ์(setter ์ฃผ์) 
setter๋ผ ๋ถ๋ฆฌ๋ ํ๋์ ๊ฐ์ ๋ณ๊ฒฝํ๋ ์์ ์ ๋ฉ์๋๋ฅผ ํตํด์ ์์กด๊ด๊ณ๋ฅผ ์ฃผ์ํ๋ ๋ฐฉ๋ฒ์ด๋ค.

**ํน์ง**
- **์ ํ, ๋ณ๊ฒฝ ๊ฐ๋ฅ์ฑ์ด ์๋ ์์กด๊ด๊ณ**์ ์ฌ์ฉํ๋ค.
- ์๋ฐ ๋น ํ๋กํผํฐ ๊ท์ฝ์ ์์ ์ ๋ฉ์๋ ๋ฐฉ์์ ์ฌ์ฉํ๋ ๋ฐฉ๋ฒ์ด๋ค.

```java
@Component
public class OrderServiceImpl implements OrderService {
    private MemberRepository memberRepository;
    private DiscountPolicy discountPolicy;

    @Autowired
    public void setMemberRepository(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
    @Autowired
    public void setDiscountPolicy(DiscountPolicy discountPolicy) {
        this.discountPolicy = discountPolicy;
    }
}
```

- setter์ `@Autowired` ๋ฅผ ๋ถ์ฌ ํธ์ถํ๊ฒ ํ๋ค.

> `@Autowired` ์ ๊ธฐ๋ณธ ๋์์ ์ฃผ์ํ  ๋์์ด ์์ผ๋ฉด ์ค๋ฅ๊ฐ ๋ฐ์ํ๋ค. ์ฃผ์ํ  ๋์์ด ์์ด๋ ๋์ํ๊ฒ ํ๋ ค๋ฉด `@Autowired(required = false)` ๋ก ์ง์ ํ๋ฉด ๋๋ค.

> **์๋ฐ ๋น ํ๋กํผํฐ**
> - ์๋ฐ์์๋ ๊ณผ๊ฑฐ๋ถํฐ ํ๋์ ๊ฐ์ ์ง์  ๋ณ๊ฒฝํ์ง ์๊ณ , setter & getter ๋ฉ์๋๋ฅผ ํตํด ๊ฐ์ ์ฝ๊ฑฐ๋ ์์ ํ๋ ๊ท์น์ ๋ง๋ค์๋ค. ์ด๊ฒ์ด **์๋ฐ ๋น ํ๋กํผํฐ ๊ท์ฝ**์ด๋ค.

### ๐ช ํ๋ ์ฃผ์
์ด๋ฆ ๊ทธ๋๋ก ํ๋์ ๋ฐ๋ก ์ฃผ์ํ๋ ๋ฐฉ๋ฒ์ด๋ค.

**ํน์ง**
- ์ฝ๋๊ฐ ๊ฐ๊ฒฐํด์ ๋ง์ ๊ฐ๋ฐ์๋ค์ ์ ํนํ์ง๋ง ์ธ๋ถ์์ ๋ณ๊ฒฝ์ด ๋ถ๊ฐ๋ฅํด์ ํ์คํธ ํ๊ธฐ ํ๋ค๋ค๋ ์น๋ช์ ์ธ ๋จ์ ์ด ์๋ค.
  - ์์ํ ํ์คํธ ์ฝ๋๋ฅผ ์์ฑํด ์คํํ๋ฉด, ํ๋์ ๊ฐ์ฒด๋ฅผ ๋ฃ์ด์ค ๋ฐฉ๋ฒ์ด ์์ด ํ์คํธ๊ฐ ๋ถ๊ฐ๋ฅํ๋ค. (๊ฒฐ๊ตญ setter ๋ฉ์๋๋ฅผ ์์ฑํด ํธ์ถํด์ผ ํ๋ค.)
- DI ํ๋ ์์ํฌ๊ฐ ์์ผ๋ฉด ์๋ฌด๊ฒ๋ ํ  ์ ์๋ค.
- **์ฌ์ฉํ์ง ๋ง์!**
  - ์ ํ๋ฆฌ์ผ์ด์์ ์ค์  ์ฝ๋์ ๊ด๊ณ ์๋ ํ์คํธ ์ฝ๋์์๋ ์ฌ์ฉํ  ์ ์๋ค. (`@SpringBootTest` ์ด๋ธํ์ด์์ ์ฌ์ฉํ ๊ฒฝ์ฐ)
  - ์คํ๋ง ์ค์ ์ ๋ชฉ์ ์ผ๋ก ํ๋ @Configuration ๊ฐ์ ๊ณณ์์๋ง ํน๋ณํ ์ฉ๋๋ก ์ฌ์ฉ

```java
@Component
public class OrderServiceImpl implements OrderService {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private DiscountPolicy discountPolicy;
}
```

> ์์ํ ์๋ฐ ํ์คํธ ์ฝ๋์๋ ๋น์ฐํ `@Autowired` ๊ฐ ๋์ํ์ง ์๋๋ค. ์คํ๋ง ์ปจํ์ด๋์์ ๊ด๋ฆฌํ๋ ๋น์ ๋ํด ์ฌ์ฉ ๊ฐ๋ฅํ๋ค.

> ๋ค์ ์ฝ๋์ ๊ฐ์ด `@Bean` ์์ ํ๋ผ๋ฏธํฐ์ ์์กด๊ด๊ณ๋ ์๋ ์ฃผ์๋๋ค. ์๋ ๋ฑ๋ก ์ ์๋ ๋ฑ๋ก๋ ๋น์ ์์กด๊ด๊ณ๊ฐ ํ์ํ  ๋ ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ  ์ ์๋ค.

```java
@Bean
OrderService orderService(MemberRepository memberRepoisitory, DiscountPolicy discountPolicy) {
    new OrderServiceImpl(memberRepository, discountPolicy)
}
```

### ๐ช ์ผ๋ฐ ๋ฉ์๋ ์ฃผ์
์ผ๋ฐ ๋ฉ์๋๋ฅผ ํตํด ์ฃผ์๋ฐ์ ์ ์๋ค.

**ํน์ง**
- ํ ๋ฒ์ ์ฌ๋ฌ ํ๋๋ฅผ ์ฃผ์ ๋ฐ์ ์ ์๋ค.
- ์ผ๋ฐ์ ์ผ๋ก ์ ์ฌ์ฉํ์ง ์๋๋ค.

```java
@Component
public class OrderServiceImpl implements OrderService {
    private MemberRepository memberRepository;
    private DiscountPolicy discountPolicy;

    @Autowired
    public void init(MemberRepository memberRepository, DiscountPolicy
discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }
}
```

> ๋น์ฐํ๊ฒ๋, ์์กด๊ด๊ณ ์๋ ์ฃผ์์ ์คํ๋ง ์ปจํ์ด๋๊ฐ ๊ด๋ฆฌํ๋ ์คํ๋ง ๋น์ด์ด์ผ ๋์ํ๋ค. ์คํ๋ง ๋น์ด ์๋ `Member` ๊ฐ์ ํด๋์ค์์ `@Autowired` ์ด๋ธํ์ด์์ ์ ์ฉํด๋ ์๋ฌด ๊ฒ๋ ๋์ํ์ง ์๋๋ค.

---

## ๐ฏ ์ต์ ์ฒ๋ฆฌ
์ฃผ์ํ  ์คํ๋ง ๋น์ด ์์ด๋ ๋์ํด์ผ ํ  ๋๊ฐ ์๋ค. ํ์ง๋ง `@Autowired` ๋ง ์ฌ์ฉํ๋ฉด `required` ์ต์์ ๊ธฐ๋ณธ ๊ฐ์ด `true` ์ฌ์ ์๋ ์ฃผ์ ๋์์ด ์์ผ๋ฉด ์ค๋ฅ๊ฐ ๋ฐ์ํ๋ค.

์๋ ์ฃผ์ ๋์์ ์ต์์ผ๋ก ์ฒ๋ฆฌํ๋ ๋ฐฉ๋ฒ์ ๋ค์๊ณผ ๊ฐ๋ค.
- `@Autowired(required = false)` : ์๋ ์ฃผ์ํ  ๋์์ด ์์ผ๋ฉด ์์ ์ ๋ฉ์๋ ์์ฒด๊ฐ ํธ์ถ๋์ง ์์
- `org.springframework.lang.@Nullable` : ์๋ ์ฃผ์ํ  ๋์์ด ์์ผ๋ฉด null์ด ์๋ ฅ๋๋ค.
- `Optional<>` : ์๋ ์ฃผ์ํ  ๋์์ด ์์ผ๋ฉด `Optional.empty` ๊ฐ ์๋ ฅ๋๋ค.

```java
package hello.core.autowired;

import hello.core.member.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.lang.Nullable;

import java.util.Optional;

public class AutowiredTest {

    @Test
    void autowiredOption() {
        ApplicationContext ac = new AnnotationConfigApplicationContext(TestBean.class);

    }

    static class TestBean {

        @Autowired(required = false)
        public void setNoBean1(Member member) {
            System.out.println("member = " + member);
        }

        @Autowired
        public void setNoBean2(@Nullable Member member) {
            System.out.println("member = " + member);
        }
        
        @Autowired
        public void setNoBean3(Optional<Member> member) {
            System.out.println("member = " + member);
        }
    }

}

// ์ถ๋ ฅ ๊ฒฐ๊ณผ
(ํธ์ถ ์๋จ)
member = null
member = Optional.empty
```

- **`Member` ๋ ์คํ๋ง ๋น์ด ์๋๋ค.**

> `@Nullable` , `Optional` ์ ์คํ๋ง ์ ๋ฐ์ ๊ฒฐ์ณ ์ง์๋๋ค. ์์ฑ์ ์๋ ์ฃผ์์์ ํน์  ํ๋์๋ง ์ฌ์ฉํด๋ ๋๋ค.

---

## ๐ฏ ์์ฑ์ ์ฃผ์์ ์ ํํด๋ผ!
๊ณผ๊ฑฐ์๋ ์์ ์ ์ฃผ์๊ณผ ํ๋ ์ฃผ์์ ๋ง์ด ํ๋ค. ํ์ง๋ง ์ต๊ทผ์๋ ์คํ๋ง ๋ฟ ์๋๋ผ ๋ค๋ฅธ DI ํ๋ ์์ํฌ ๋ํ ์์ฑ์ ์ฃผ์์ ๊ถ์ฅํ๋ค. ๊ทธ ์ด์ ๋ ๋ค์๊ณผ ๊ฐ๋ค.

### ๐ช ๋ถ๋ณ
- ๋๋ถ๋ถ์ ์์กด๊ด๊ณ ์ฃผ์์ ํ ๋ฒ ์ผ์ด๋๋ฉด, ์ ํ๋ฆฌ์ผ์ด์ ์ข๋ฃ์์ ๊น์ง ๋ณ๊ฒฝํ  ์ผ์ด ์๋ค. ์คํ๋ ค ๋ณ๊ฒฝ๋์ด์  ์๋๋ค.
- ์์ ์ ์ฃผ์์ ์ฌ์ฉํ๋ฉด, setter ๋ฉ์๋๋ฅผ `public` ์ผ๋ก ์ด์ด๋ฌ์ผ ํ๋ค.
  - ์ด๋ ๋๊ตฐ๊ฐ ์ค์๋ก ๋ณ๊ฒฝํ  ์ฐ๋ ค๋ ์๊ณ , ๋ณ๊ฒฝํ๋ฉด ์๋๋ ๋ฉ์๋๋ฅผ ์ด์ด๋๋ ๊ฒ์ ์ข์ ์ค๊ณ ๋ฐฉ๋ฒ์ด ์๋๋ค.
- ์์ฑ์ ์ฃผ์์ ๊ฐ์ฒด๋ฅผ ์์ฑํ  ๋ ๋ฑ 1๋ฒ๋ง ํธ์ถ๋๊ธฐ์ ๋ถ๋ณํ๊ฒ ์ค๊ณํ  ์ ์๋ค!

### ๐ช ๋๋ฝ
- ํ๋ ์์ํฌ ์์ด ์์ํ ์๋ฐ ์ฝ๋๋ฅผ ๋จ์ ํ์คํธํ๋ ๊ฒฝ์ฐ, ๋ค์๊ณผ ๊ฐ์ธ ์์ ์ ์์กด๊ด๊ณ์ธ ๊ฒฝ์ฐ๊ฐ ์๋ค๊ณ  ๊ฐ์ ํ๋ค.

```java
public class OrderServiceImpl implements OrderService {

    private MemberRepository memberRepository;
    private DiscountPolicy discountPolicy;

    @Autowired
    public void setMemberRepository(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Autowired
    public void setDiscountPolicy(DiscountPolicy discountPolicy) {
        this.discountPolicy = discountPolicy;
    }

}
```

```java
@Test
void createOrder() {
    OrderServiceImpl orderService = new OrderServiceImpl();
    orderService.createOrder(1L, "itemA", 10000);
}
```

- ์คํํ๋ฉด, `NullPointerException` ์ด ๋ฐ์ํ๋ค.
  - ์ด์ ๋ `memberRepository` ์ `discountPolicy` ์ ๋ํ ์์กด๊ด๊ณ ์ฃผ์์ด ๋๋ฝ๋์๊ธฐ ๋๋ฌธ์ด๋ค. (ํ๋ ์์ํฌ ์์ด ํ์คํธํ๊ฒ ๋๋ฉด ์์กด๊ด๊ณ ์๋ ์ฃผ์์ด ์ํ๋์ง ์์!)

์์ฑ์ ์ฃผ์์ ์ฌ์ฉํ๋ฉด ์ฃผ์ ๋ฐ์ดํฐ๋ฅผ ๋๋ฝํ์ ๋ **์ปดํ์ผ ์ค๋ฅ**๊ฐ ๋ฐ์ํ๋ค. 

### ๐ช final ํค์๋

> `final` : ์ด๊ธฐํ ํ ๊ฐ์ด ๋ณํ์ง ์๋๋ค.

์์ฑ์ ์ฃผ์์ ์ฌ์ฉํ๋ฉด ํ๋์ `final` ํค์๋๋ฅผ ์ฌ์ฉํ  ์ ์๋ค. ๊ทธ๋์ ์์ฑ์์์ ํน์๋ผ๋ ๊ฐ์ด ์ค์ ๋์ง ์๋ ์ค๋ฅ๋ฅผ ์ปดํ์ผ ์์ ์ ๋ง์์ค๋ค.

```java
@Component
public class OrderServiceImpl implements OrderService {

    private final MemberRepository memberRepository;
    private final DiscountPolicy discountPolicy;
@Autowired
    public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy
discountPolicy) {
        this.memberRepository = memberRepository;
    }

    //...
}
```

- ํ์ ํ๋์ธ `discountPolicy` ์ ๊ฐ์ ์ค์ ํด์ผ ํ๋๋ฐ, ์ด ๋ถ๋ถ์ด ๋๋ฝ๋์๋ค. ์๋ฐ๋ ์ปดํ์ผ ์์ ์ `final` ํค์๋๊ฐ ๋ถ์ด์๋ `discountPolicy` ์ ๋ํด ๋ค์ ์ค๋ฅ๋ฅผ ๋ฐ์์ํจ๋ค.
  - `java: variable discountPolicy might not have been initialized`

> ์์ ์ ์ฃผ์์ ํฌํจํ ๋๋จธ์ง ์ฃผ์ ๋ฐฉ์์ ๋ชจ๋ ์์ฑ์ ์ดํ์ ํธ์ถ๋๊ธฐ์, ํ๋์ `final` ํค์๋๋ฅผ ์ฌ์ฉํ  ์ ์๋ค. ์ค์ง ์์ฑ์ ์ฃผ์ ๋ฐฉ์๋ง `final` ํค์๋๋ฅผ ์ฌ์ฉํ  ์ ์๋ค.

---

## ๐ฏ ๋กฌ๋ณต๊ณผ ์ต์  ํธ๋ ๋
์ค์  ๊ฐ๋ฐ์ ํด๋ณด๋ฉด, ๋๋ถ๋ถ์ด ๋ค ๋ถ๋ณ์ด๊ณ , ๊ทธ๋์ ๋ค์๊ณผ ๊ฐ์ด ์์ฑ์์ `final` ํค์๋๋ฅผ ์ฌ์ฉํ๊ฒ ๋๋ค. ๊ทธ๋ฐ๋ฐ ์์ฑ์๋ ๋ง๋ค๊ณ  ์ฃผ์ ๋ฐ์ ๊ฐ์ ๋์ํ๋ ์ฝ๋๋ ๋ง๋ค๊ณ , ์กฐ๊ธ ๊ณผ์ ์ด ๊ท์ฐฎ์ ๋ฏํ๋ค.
- ํ๋ ์ฃผ์์ฒ๋ผ ์ข ํธ๋ฆฌํ๊ฒ ์ฌ์ฉํ๋ ๋ฐฉ๋ฒ์ ์์๊น?

**๊ธฐ๋ณธ ์ฝ๋**
```java
@Component
    public class OrderServiceImpl implements OrderService {
        private final MemberRepository memberRepository;
        private final DiscountPolicy discountPolicy;
        
        @Autowired
        public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy
    discountPolicy) {
            this.memberRepository = memberRepository;
            this.discountPolicy = discountPolicy;
        }
}
```

- ์์ฑ์๊ฐ 1๊ฐ๋ผ๋ฉด, `@Autowired` ๋ฅผ ์๋ตํ  ์ ์๋ค.
- ์ดํ **๋กฌ๋ณต**์ด๋ผ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ ์ฉํด๋ณด์!

```java
plugins {
	id 'org.springframework.boot' version '2.7.1'
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id 'java'
}

group = 'hello'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

//lombok ์ค์  ์ถ๊ฐ ์์
configurations {
	compileOnly {
		extendsFrom annotationProcessor
	}
}
//lombok ์ค์  ์ถ๊ฐ ๋

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	//lombok ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ถ๊ฐ ์์
	compileOnly 'org.projectlombok:lombok'
	annotationProcessor 'org.projectlombok:lombok'
	testCompileOnly 'org.projectlombok:lombok'
	testAnnotationProcessor 'org.projectlombok:lombok'
	//lombok ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ถ๊ฐ ๋

}

tasks.named('test') {
	useJUnitPlatform()
}
```

- ๋กฌ๋ณต ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด ์์กด์ฑ์ ์ถ๊ฐํด์ค๋ค.
- ๋กฌ๋ณต์ ๋ํ์ ์ธ ๊ธฐ๋ฅ์ ์ด๋ธํ์ด์์ ํตํด getter & setter ์๋ ์์ฑ, ์์ฑ์ ๊ด๋ จ ์ง์ ๊ธฐ๋ฅ์ด ์๋ค.

์ด์  ๋กฌ๋ณต์ ์ ์ฉํ์ฌ, `@RequiredArgsConstructor` ์ด๋ธํ์ด์์ ์ฌ์ฉํด `final` ํค์๋๊ฐ ๋ถ์ ํ๋์ ๋ํ ์์ฑ์๋ฅผ ๋ง๋ค์ด์ฃผ๋๋ก ํ๋ค.

```java
package hello.core.order;

import hello.core.discount.DiscountPolicy;
import hello.core.member.Member;
import hello.core.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class OrderServiceImpl implements OrderService {

    // ํ์์ ์ฐพ๊ธฐ ์ํด ํ์
    private final MemberRepository memberRepository;
    // ํ ์ธ ์ ์ฑ ์ฌ์ฉ์ ์ํด ํ์
    private final DiscountPolicy discountPolicy;

    @Override
    public Order createOrder(Long memberId, String itemName, int itemPrice) {
        Member member = memberRepository.findById(memberId);
        // ํ ์ธ์ ๋ํด์๋ createOrder๋ ์์ ์์ง ๋ชปํจ, ๋จ์ผ ์ฑ์ ์์น์ ์ ์งํจ ์
        int discountPrice = discountPolicy.discount(member, itemPrice);

        return new Order(memberId, itemName, itemPrice, discountPrice);
    }
}
```

- ์ด์ ์ ์ฝ๋์ ์ต์ข ์ฝ๋๋ ์์ ํ ๋์ผํ๋ค. ๋กฌ๋ณต์ด ์๋ฐ์ **Annotation processor**r๋ผ๋ ๊ธฐ๋ฅ์ ์ด์ฉํด **์ปดํ์ผ ์์ **์ ์์ฑ์ ์ฝ๋๋ฅผ ์๋์ผ๋ก ์์ฑํด์ค๋ค.

--- 

## ๐ฏ ์กฐํ ๋น์ด 2๊ฐ ์ด์ - ๋ฌธ์ 
`@Autowired` ๋ ํ์์ผ๋ก ์กฐํํ๋ค.
- ๋ฐ๋ผ์ ๋ค์ ์ฝ๋์ ์ ์ฌํ๊ฒ ๋์ํ๋ค. (์ค์ ๋ก๋ ๋ ๋ง์ ๊ธฐ๋ฅ์ ์ ๊ณต!)
  - `ac.getBean(DiscountPolicy.class)`

์คํ๋ง ๋น ์กฐํ์์ ๋ฐฐ์ ๋ฏ, ํ์์ผ๋ก ์กฐํ ์ ์ ํ๋ ๋น์ด 2๊ฐ ์ด์์ด๋ฉด ๋ฌธ์ ๊ฐ ๋ฐ์ํ๋ค.
- `NoUniqueBeanDefinitionException` ์์ธ ๋ฐ์
- ์ด๋ฅผ ํด๊ฒฐํ๊ธฐ ์ํด, ํ์ ํ์์ผ๋ก ์ง์ ํ์ฌ ํน์  ๋น๋ง์ ์กฐํํ  ์๋ ์์ง๋ง ์ด๋ DIP๋ฅผ ์๋ฐฐํ๊ณ  ์ ์ฐ์ฑ์ ๋จ์ด๋จ๋ฆฌ๋ ํ์๋ค.
- ๋ํ ์ด๋ฆ๋ง ๋ค๋ฅด๊ณ , ์์ ํ ๋์ผํ ํ์์ ์คํ๋ง ๋น์ด 2๊ฐ ์์ ๋ ํด๊ฒฐ๋์ง ์๋๋ค.

> ์คํ๋ง ๋น์ ์๋ ๋ฑ๋กํ์ฌ ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ  ์๋ ์์ง๋ง, ์์กด๊ด๊ณ ์๋ ์ฃผ์์์ ํด๊ฒฐํ๋ ์ฌ๋ฌ ๋ฐฉ๋ฒ๋ ์๋ค. ์ด๋ ์๋์์ ๋ค๋ฃฌ๋ค.

--- 

## ๐ฏ @Autowired ํ๋ ๋ช, @Qualifier, @Primary
์กฐํ ๋์ ๋น์ด 2๊ฐ ์ด์ ์ผ ๋ ํด๊ฒฐ๋ฐฉ๋ฒ์ ํ๋์ฉ ์์๋ณธ๋ค. 
- `@Autowired` ํ๋ ๋ช ๋งค์นญ
- `@Qualifier` -> `@Qualifier` ๋ผ๋ฆฌ ๋งค์นญ -> ๋น ์ด๋ฆ ๋งค์นญ
- `@Primary` ์ฌ์ฉ

### ๐ช @Autowired ํ๋ ๋ช ๋งค์นญ
`@Autowired` ๋ ํ์ ๋งค์นญ์ ์๋ํ๊ณ , ์ด๋ ์ฌ๋ฌ ๋น์ด ์์ผ๋ฉด ํ๋ ์ด๋ฆ(ํ๋ผ๋ฏธํฐ ์ด๋ฆ)์ผ๋ก ๋น ์ด๋ฆ์ ์ถ๊ฐ ๋งค์นญํ๋ค.

**๊ธฐ์กด ์ฝ๋(ํ๋ ์ฃผ์)**
```java
@Autowired
private final DiscountPolicy discountPolicy;
```

**ํ๋ ๋ช์ ๋น ์ด๋ฆ์ผ๋ก ๋ณ๊ฒฝ**
```java
@Autowired
private final DiscountPolicy rateDiscountPolicy;
```

- ํ๋ ๋ช์ด `rateDiscountPolicy` ์ด๋ฏ๋ก ์ ์ ์ฃผ์๋๋ค.

> ํ๋ ๋ช ๋งค์นญ์ ๋จผ์  ํ์ ๋งค์นญ์ ์๋ํ๊ณ , ๊ทธ ๊ฒฐ๊ณผ์ ์ฌ๋ฌ ๋น์ด ์์ ๋ ์ถ๊ฐ๋ก ๋์ํ๋ ๊ธฐ๋ฅ์ด๋ค.

### ๐ช @Qualifier ์ฌ์ฉ
`@Qualifier` ๋ ์ถ๊ฐ ๊ตฌ๋ถ์๋ฅผ ๋ถ์ฌ์ฃผ๋ ๋ฐฉ๋ฒ์ด๋ค. ์ฃผ์ ์ ์ถ๊ฐ์ ์ธ ๋ฐฉ๋ฒ์ ์ ๊ณตํ๋ ๊ฒ์ด์ง, ๋น ์ด๋ฆ์ ๋ณ๊ฒฝํ๋ ๊ฒ์ ์๋๋ค.

**๋น ๋ฑ๋ก์ @Qualifierใน๋ฅด ๋ถ์ฌ์ค๋ค.**
```java
@Component
@Qualifier("mainDiscountPolicy")
public class RateDiscountPolicy implements DiscountPolicy {
    ...
}
```

```java
@Component
@Qualifier("fixDiscountPolicy")
public class FixDiscountPolicy implements DiscountPolicy {
    ...
}
```

**์ดํ ์ฃผ์ ์์ @Qualifier๋ฅผ ๋ถ์ฌ์ฃผ๊ณ  ๋ฑ๋กํ ์ด๋ฆ์ ์ ๋๋ค.**
```java
@Autowired
public OrderServiceImpl(MemberRepository memberRepository,
                        @Qualifier("mainDiscountPolicy") DiscountPolicy
discountPolicy) {
    this.memberRepository = memberRepository;
    this.discountPolicy = discountPolicy;
}
```

`@Qualifier` ๋ก ์ฃผ์ํ  ๋, `@Qualifier("mainDiscountPolicy")` ๋ฅผ ๋ชป ์ฐพ์ผ๋ฉด ์ด๋ป๊ฒ ๋ ๊น?
- ๊ทธ๋ฌ๋ฉด `mainDiscountPolicy` ๋ผ๋ ์ด๋ฆ์ ์คํ๋ง ๋น์ ์ถ๊ฐ๋ก ์ฐพ๋๋ค.
  - ํ์ง๋ง ์ด๋ ๊ฒฝํ์ ์ข์ ์ฌ์ฉ์ ์๋๋ค.

๋ํ ์ง์  ๋น ๋ฑ๋ก ์์๋ `@Qualifier` ๋ฅผ ๋์ผํ๊ฒ ์ฌ์ฉํ  ์ ์๋ค.
```java
@Bean
@Qualifier("mainDiscountPolicy")
public DiscountPolicy discountPolicy() {
    ...
}
```

### ๐ช @Primary ์ฌ์ฉ
์ด๋ ์ฐ์ ์์๋ฅผ ์ ํ๋ ๋ฐฉ๋ฒ์ด๋ค. ์ฌ๋ฌ ๋น์ด ๋งค์นญ๋๋ฉด `@Primary` ๊ฐ ์ฐ์ ๊ถ์ ๊ฐ์ง๋ค.

**rateDiscountPolicy๊ฐ ์ฐ์ ๊ถ**
```java
@Component
@Primary
public class RateDiscountPolicy implements DiscountPolicy {}

@Component 
public class FixDiscountPolicy implements DiscountPolicy {}
```

`@Qualifier` ์ ๋จ์ ์ ์ฃผ์ ๋ฐ์ ๋ ๋ชจ๋  ์ฝ๋์ `@Qualifier` ๋ฅผ ๋ถ์ฌ์ค์ผ ํ๋ค๋ ์ ์ด๋ค. ๋ฐ๋ฉด์ `@Primary` ๋ฅผ ์ฌ์ฉํ๋ฉด ์ฐ์ ์์๋ฅผ ๊ฐ์ง ํด๋์ค์๋ง ์ด๋ฅผ ๋ถ์ฌ์ฃผ๋ฉด ๋๋ค.

**@Primary์ @Qualifier์ ์ฐ์ ์์**
- `@Primary` ๋ ๊ธฐ๋ณธ๊ฐ์ฒ๋ผ ๋์ํ๊ณ , `@Qualifier` ๋ ๋งค์ฐ ์์ธํ๊ฒ ๋์ํ๋ค.
- ์คํ๋ง์ ์๋๋ณด๋ค๋ ์๋์ด, ๋์ ๋ฒ์์ ์ ํ๊ถ๋ณด๋ค๋ ์ข์ ๋ฒ์์ ์ ํ๊ถ์ด ์ฐ์  ์์๊ฐ ๋๋ค.
  - ์ฆ, `@Qualifier` ์ ์ฐ์ ์์๊ฐ ๋ ๋๋ค.

--- 

## ๐ฏ ์ด๋ธํ์ด์ ์ง์  ๋ง๋ค๊ธฐ
`@Qualifier("mainDiscountPolicy")` ์ด๋ ๊ฒ **๋ฌธ์๋ฅผ ์ ์ผ๋ฉด ์ปดํ์ผ์ ํ์ ์ฒดํฌ๊ฐ ์๋๋ค.**
- ์ด๋ ์ด๋ธํ์ด์์ ๋ง๋ค์ด ํด๊ฒฐํ  ์ ์๋ค.

```java
package hello.core.annotation;

import org.springframework.beans.factory.annotation.Qualifier;

import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.TYPE, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@Qualifier("mainDiscountPolicy")
public @interface MainDiscountPolicy {
}
```

```java
package hello.core.discount;

import hello.core.annotation.MainDiscountPolicy;
import hello.core.member.Grade;
import hello.core.member.Member;
import org.springframework.stereotype.Component;

@Component
@MainDiscountPolicy
public class RateDiscountPolicy implements DiscountPolicy {

    private int discountPercent = 10;
    @Override
    public int discount(Member member, int price) {
        if (member.getGrade() == Grade.VIP)
            return price * discountPercent / 100;
        return 0;
    }
}
```

์ดํ ์ฌ์ฉํ  ๋๋ ํด๋น ์ด๋ธํ์ด์์ ๋ช์ํ๋ค.

```java
package hello.core.order;

@Component
public class OrderServiceImpl implements OrderService {

    // ํ์์ ์ฐพ๊ธฐ ์ํด ํ์
    private final MemberRepository memberRepository;
    // ํ ์ธ ์ ์ฑ ์ฌ์ฉ์ ์ํด ํ์
    private final DiscountPolicy discountPolicy;

    @Autowired
    public OrderServiceImpl(MemberRepository memberRepository, @MainDiscountPolicy DiscountPolicy discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }

    ...
}
```

**์ด๋ธํ์ด์์๋ ์์์ด๋ผ๋ ๊ฐ๋์ด ์๋ค.** ์ด๋ ๊ฒ ์ด๋ธํ์ด์์ ๋ชจ์์ ์ฌ์ฉํ๋ ๊ธฐ๋ฅ์ ์คํ๋ง์ด ์ง์ํด์ฃผ๋ ๊ธฐ๋ฅ์ด๋ค.

--- 

## ๐ฏ ์กฐํํ ๋น์ด ๋ชจ๋ ํ์ํ  ๋, List, Map
์๋์ ์ผ๋ก ํด๋น ํ์์ ๋ชจ๋  ์คํ๋ง ๋น์ด ํ์ํ ๊ฒฝ์ฐ๊ฐ ์๋ค. 
- ํ ์ธ ์๋น์ค๋ฅผ ์ ๊ณตํ๋๋ฐ, ํด๋ผ์ด์ธํธ๊ฐ ํ ์ธ์ ์ข๋ฅ(fix, rate)๋ฅผ ์ ํํ  ์ ์๋ ๊ฒฝ์ฐ๊ฐ ์์ ์ ์๋ค.

```java
package hello.core.autowired;

import hello.core.discount.DiscountPolicy;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;
import java.util.Map;

public class AllBeanTest {

    @Test
    void findAllBean() {
        ApplicationContext ac = new AnnotationConfigApplicationContext(DiscountService.class);
    }

    static class DiscountService {
        private final Map<String, DiscountPolicy> policyMap;
        private final List<DiscountPolicy> policies;

        @Autowired
        public DiscountService(Map<String, DiscountPolicy> policyMap, List<DiscountPolicy> policies) {
            this.policyMap = policyMap;
            this.policies = policies;

            System.out.println("policyMap = " + policyMap);
            System.out.println("policies = " + policies);
        }
    }
}
```

- ํ์คํธ๋ฅผ ์คํํ๋ฉด ๋งต๊ณผ ๋ฆฌ์คํธ์ ์๋ฌด ๊ฐ๋ ๋ค์ด๊ฐ์์ง ์์ ๊ฒ์ ํ์ธํ  ์ ์๋ค.
  - `DiscountService` ๋ง ๋น์ผ๋ก ๋ฑ๋กํ๊ธฐ ๋๋ฌธ์ด๋ค!

`ApplicationContext ac = new AnnotationConfigApplicationContext(AutoAppConfig.class, DiscountService.class);` ์ ๊ฐ์ด ์ค์  ์ ๋ณด๋ ํจ๊ป ๋ฑ๋กํ๋ค.
- ์ด์  ์์กด๊ด๊ณ ์๋ ์ฃผ์ ์, `@Autowired` ์ ์ํด ์ปดํฌ๋ํธ ์ค์บ์ ์ํํ๊ณ , `Fix~` ์ `Rate~` ์ ๋ํ ์ฃผ์์ด ์ํ๋๋ค.

```java
package hello.core.autowired;

public class AllBeanTest {

    @Test
    void findAllBean() {
        ApplicationContext ac = new AnnotationConfigApplicationContext(AutoAppConfig.class, DiscountService.class);

        DiscountService discountService = ac.getBean(DiscountService.class);
        Member member = new Member(1L, "memberA", Grade.VIP);
        int discountPrice = discountService.discount(member, 10000, "fixDiscountPolicy");

        assertThat(discountService).isInstanceOf(DiscountService.class);
        assertThat(discountPrice).isEqualTo(1000);

        int rateDiscountPrice = discountService.discount(member, 20000, "rateDiscountPolicy");

        assertThat(rateDiscountPrice).isEqualTo(2000);
    }

    static class DiscountService {
        private final Map<String, DiscountPolicy> policyMap;
        private final List<DiscountPolicy> policies;

        @Autowired
        public DiscountService(Map<String, DiscountPolicy> policyMap, List<DiscountPolicy> policies) {
            this.policyMap = policyMap;
            this.policies = policies;

            System.out.println("policyMap = " + policyMap);
            System.out.println("policies = " + policies);
        }

        public int discount(Member member, int price, String discountCode) {
            DiscountPolicy discountPolicy = policyMap.get(discountCode);

            return discountPolicy.discount(member, price);
        }
    }
}
```

**๋ก์ง ๋ถ์**
- `DiscountService` ๋ Map์ผ๋ก ๋ง๋  `DiscountPolicy` ๋ฅผ ์ฃผ์ ๋ฐ๋๋ค. ์ด๋ `fixDiscountPolicy` , `rateDiscountPolicy` ๊ฐ ์ฃผ์๋๋ค.
- `discount()` ๋ฉ์๋๋ `discountCode` ๋ก `"fixDiscountPolicy"` ๊ฐ ๋์ด์ค๋ฉด map์์ `fixDiscountPolicy` ๋น์ ์ฐพ์ ์คํํ๋ค.

**์ฃผ์ ๋ถ์**
- `Map<String, DiscountPolicy>` : map์ ํค์ ์คํ๋ง ๋น์ ์ด๋ฆ์ ๋ฃ์ด์ฃผ๊ณ , ๊ทธ ๊ฐ์ผ๋ก `DiscountPolicy` ํ์์ผ๋ก ์กฐํํ ๋ชจ๋  ์คํ๋ง ๋น์ ๋ด๋๋ค.
- `List<DiscountPolicy>` : `DiscountPolicy` ํ์์ผ๋ก ์กฐํํ ๋ชจ๋  ์คํ๋ง ๋น์ ๋ด์์ค๋ค.
- ๋ง์ฝ ํด๋นํ๋ ํ์์ ๋น์ด ์๋ค๋ฉด, ๋น ์ปฌ๋ ์์ด๋ Map์ ์ฃผ์ํ๋ค.
 
--- 

## ๐ฏ ์๋, ์๋์ ์ฌ๋ฐ๋ฅธ ์ค๋ฌด ์ด์ ๊ธฐ์ค
**ํธ๋ฆฌ๋ ์๋ ๊ธฐ๋ฅ์ ๊ธฐ๋ณธ์ผ๋ก ์ฌ์ฉํ์!**
- ์ด๋ค ๊ฒฝ์ฐ์ ์ปดํฌ๋ํธ ์ค์บ๊ณผ ์๋ ์ฃผ์์ ์ฌ์ฉํ๊ณ , ์ด๋ค ๊ฒฝ์ฐ์ ์ค์  ์ ๋ณผ๋ฅด ํตํด ์๋์ผ๋ก ๋น์ ๋ฑ๋กํ๊ณ  ์์กด๊ด๊ณ๋ ์๋์ผ๋ก ์ฃผ์ํด์ผ ํ ๊น?

๊ฒฐ๋ก ๋ถํฐ ์ด์ผ๊ธฐํ๋ฉด, ์คํ๋ง์ด ๋์ค๊ณ  ์๊ฐ์ด ๊ฐ ์๋ก ์ ์  ์๋์ ์ ํธํ๋ ์ถ์ธ๋ค. ์คํ๋ง์ `@Component` ๋ฟ๋ง ์๋๋ผ `@Controller` , `@Service` , `@Repository` ์ฒ๋ผ ๊ณ์ธต์ ๋ง์ถ์ด ์ผ๋ฐ์ ์ธ ์ ํ๋ฆฌ์ผ์ด์ ๋ก์ง์ ์๋์ผ๋ก ์ค์บํ  ์ ์๋๋ก ์ง์ํ๋ค. ๊ฑฐ๊ธฐ์ ๋ํด์ ์ต๊ทผ ์คํ๋ง ๋ถํธ๋ ์ปดํฌ๋ํธ ์ค์บ์ ๊ธฐ๋ณธ์ผ๋ก ์ฌ์ฉํ๊ณ , ์คํ๋ง ๋ถํธ์ ๋ค์ํ ์คํ๋ง ๋น๋ค๋ ์กฐ๊ฑด์ด ๋ง์ผ๋ฉด ์๋์ผ๋ก ๋ฑ๋กํ๋๋ก ์ค๊ณํ๋ค.

์ค์  ์ ๋ณด๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ์ ํ๋ฆฌ์ผ์ด์์ ๊ตฌ์ฑํ๋ ๋ถ๋ถ๊ณผ ์ค์  ๋์ํ๋ ๋ถ๋ถ์ ๋ชํํ๊ฒ ๋๋๋ ๊ฒ์ด ์ด์์ ์ด์ง๋ง, ๊ฐ๋ฐ์ ์์ฅ์์ ์คํ๋ง ๋น์ ํ๋ ๋ฑ๋กํ  ๋ `@Component` ๋ง ๋ฃ์ด์ฃผ๋ฉด ๋๋๋ ์ผ์ `@Configuration` ์ค์  ์ ๋ณด์ ๊ฐ์ `@Bean` ์ ์ ๊ณ , ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ , ์ฃผ์ํ  ๋์์ ์ผ์ผ์ด ์ ์ด์ฃผ๋ ๊ณผ์ ์ ์๋นํ ๋ฒ๊ฑฐ๋กญ๋ค.

๋ ๊ด๋ฆฌํ  ๋น์ด ๋ง์์ ์ค์  ์ ๋ณด๊ฐ ์ปค์ง๋ฉด ์ค์  ์ ๋ณด๋ฅผ ๊ด๋ฆฌํ๋ ๊ฒ ์์ฒด๊ฐ ๋ถ๋ด์ด ๋๋ค. ๊ทธ๋ฆฌ๊ณ  ๊ฒฐ์ ์ ์ผ๋ก ์๋ ๋น ๋ฑ๋ก์ ์ฌ์ฉํด๋ OCP, DIP๋ฅผ ์งํฌ ์ ์๋ค.

**๊ทธ๋ฌ๋ฉด ์๋ ๋น ๋ฑ๋ก์ ์ธ์  ์ฌ์ฉํ๋ฉด ์ข์๊น?**
์ ํ๋ฆฌ์ผ์ด์์ ํฌ๊ฒ ์๋ฌด ๋ก์ง๊ณผ ๊ธฐ์  ์ง์ ๋ก์ง์ผ๋ก ๋๋ ์ ์๋ค.
- **์๋ฌด ๋ก์ง ๋น**: ์น์ ์ง์ํ๋ ์ปจํธ๋กค๋ฌ, ํต์ฌ ๋น์ฆ๋์ค ๋ก์ง์ด ์๋ ์๋น์ค, ๋ฐ์ดํฐ ๊ณ์ธต์ ๋ก์ง์ ์ฒ๋ฆฌํ๋ ๋ฆฌํฌ์งํ ๋ฆฌ๋ฑ์ด ๋ชจ๋ ์๋ฌด ๋ก์ง์ด๋ค. ๋ณดํต ๋น์ฆ๋์ค ์๊ตฌ์ฌํญ์ ๊ฐ๋ฐํ  ๋ ์ถ๊ฐ๋๊ฑฐ๋ ๋ณ๊ฒฝ๋๋ค.
- **๊ธฐ์  ์ง์ ๋น**: ๊ธฐ์ ์ ์ธ ๋ฌธ์ ๋ ๊ณตํต ๊ด์ฌ์ฌ(AOP)๋ฅผ ์ฒ๋ฆฌํ  ๋ ์ฃผ๋ก ์ฌ์ฉ๋๋ค. ๋ฐ์ดํฐ๋ฒ ์ด์ค ์ฐ๊ฒฐ์ด๋, ๊ณตํต ๋ก๊ทธ ์ฒ๋ฆฌ ์ฒ๋ผ ์๋ฌด ๋ก์ง์ ์ง์ํ๊ธฐ ์ํ ํ๋ถ ๊ธฐ์ ์ด๋ ๊ณตํต ๊ธฐ์ ๋ค์ด๋ค.

์๋ฌด ๋ก์ง์ ์ซ์๋ ๋งค์ฐ ๋ง๊ณ , ํ๋ฒ ๊ฐ๋ฐํด์ผ ํ๋ฉด ์ปจํธ๋กค๋ฌ, ์๋น์ค, ๋ฆฌํฌ์งํ ๋ฆฌ ์ฒ๋ผ ์ด๋์ ๋ ์ ์ฌํ ํจํด์ด ์๋ค. ์ด๋ฐ ๊ฒฝ์ฐ ์๋ ๊ธฐ๋ฅ์ ์ ๊ทน ์ฌ์ฉํ๋ ๊ฒ์ด ์ข๋ค. ๋ณดํต ๋ฌธ์ ๊ฐ ๋ฐ์ํด๋ ์ด๋ค ๊ณณ์์ ๋ฌธ์ ๊ฐ ๋ฐ์ํ๋์ง ๋ชํํ๊ฒ ํ์ํ๊ธฐ ์ฝ๋ค.

๊ธฐ์  ์ง์ ๋ก์ง์ ์๋ฌด ๋ก์ง๊ณผ ๋น๊ตํด์ ๊ทธ ์๊ฐ ๋งค์ฐ ์ ๊ณ , ๋ณดํต ์ ํ๋ฆฌ์ผ์ด์ ์ ๋ฐ์ ๊ฑธ์ณ์ ๊ด๋ฒ์ํ๊ฒ ์ํฅ์ ๋ฏธ์น๋ค. ๊ทธ๋ฆฌ๊ณ  ์๋ฌด ๋ก์ง์ ๋ฌธ์ ๊ฐ ๋ฐ์ํ์ ๋ ์ด๋๊ฐ ๋ฌธ์ ์ธ์ง ๋ชํํ๊ฒ ์ ๋๋ฌ๋์ง๋ง, ๊ธฐ์  ์ง์ ๋ก์ง์ ์ ์ฉ์ด ์ ๋๊ณ  ์๋์ง ์๋์ง ์กฐ์ฐจ ํ์ํ๊ธฐ ์ด๋ ค์ด ๊ฒฝ์ฐ๊ฐ ๋ง๋ค. ๊ทธ๋์ ์ด๋ฐ ๊ธฐ์  ์ง์ ๋ก์ง๋ค์ ๊ฐ๊ธ์  ์๋ ๋น ๋ฑ๋ก์ ์ฌ์ฉํด์ ๋ชํํ๊ฒ ๋๋ฌ๋ด๋ ๊ฒ์ด ์ข๋ค.

> ์ ํ๋ฆฌ์ผ์ด์์ ๊ด๋ฒ์ํ๊ฒ ์ํฅ์ ๋ฏธ์น๋ ๊ธฐ์  ์ง์ ๊ฐ์ฒด๋ ์๋ ๋น์ผ๋ก ๋ฑ๋กํด์ ๋ฑ! ์ค์  ์ ๋ณด์ ๋ฐ๋ก ๋ํ๋๊ฒ ํ๋ ๊ฒ์ด ์ ์ง๋ณด์ ํ๊ธฐ ์ข๋ค.

**๋น์ฆ๋์ค ๋ก์ง ์ค์์ ๋คํ์ฑ์ ์ ๊ทน ํ์ฉํ  ๋**
์์กด๊ด๊ณ ์๋ ์ฃผ์ - ์กฐํํ ๋น์ด ๋ชจ๋ ํ์ํ  ๋, List, Map์ ๋ค์ ๋ณด์.
- `DiscountService` ๊ฐ ์์กด๊ด๊ณ ์๋ ์ฃผ์์ผ๋ก `Map<String, DiscountPolicy>` ์ ์ฃผ์์ ๋ฐ๋ ์ํฉ์ ์๊ฐํด๋ณด์. ์ฌ๊ธฐ์ ์ด๋ค ๋น๋ค์ด ์ฃผ์๋  ์ง, ๊ฐ ๋น๋ค์ ์ด๋ฆ์ ๋ฌด์์ผ์ง ์ฝ๋๋ง ๋ณด๊ณ  ํ๋ฒ์ ์ฝ๊ฒ ํ์ํ  ์ ์์๊น? ๋ด๊ฐ ๊ฐ๋ฐํ์ผ๋ ํฌ๊ฒ ๊ด๊ณ๊ฐ ์์ง๋ง, ๋ง์ฝ ์ด ์ฝ๋๋ฅผ ๋ค๋ฅธ ๊ฐ๋ฐ์๊ฐ ๊ฐ๋ฐํด์ ๋์๊ฒ ์ค ๊ฒ์ด๋ผ๋ฉด ์ด๋จ๊น?
- ์๋ ๋ฑ๋ก์ ์ฌ์ฉํ๊ณ  ์๊ธฐ ๋๋ฌธ์ ํ์ํ๋ ค๋ฉด ์ฌ๋ฌ ์ฝ๋๋ฅผ ์ฐพ์๋ด์ผ ํ๋ค.
- ์ด๋ฐ ๊ฒฝ์ฐ ์๋ ๋น์ผ๋ก ๋ฑ๋กํ๊ฑฐ๋ ๋๋ ์๋์ผ๋กํ๋ฉด ํน์  ํจํค์ง์ ๊ฐ์ด ๋ฌถ์ด๋๋๊ฒ ์ข๋ค! ํต์ฌ์ ๋ฑ ๋ณด๊ณ  ์ดํด๊ฐ ๋์ด์ผ ํ๋ค!

์ด ๋ถ๋ถ์ ๋ณ๋์ ์ค์  ์ ๋ณด๋ก ๋ง๋ค๊ณ  ์๋์ผ๋ก ๋ฑ๋กํ๋ฉด ๋ค์๊ณผ ๊ฐ๋ค.
```java
@Configuration
public class DiscountPolicyConfig {
    @Bean
    public DiscountPolicy rateDiscountPolicy() {
        return new RateDiscountPolicy();
    }
    @Bean
    public DiscountPolicy fixDiscountPolicy() {
        return new FixDiscountPolicy();
    }
}
```

์ด ์ค์  ์ ๋ณด๋ง ๋ด๋ ํ๋์ ๋น์ ์ด๋ฆ์ ๋ฌผ๋ก ์ด๊ณ , ์ด๋ค ๋น๋ค์ด ์ฃผ์๋ ์ง ํ์ํ  ์ ์๋ค. ๊ทธ๋๋ ๋น ์๋ ๋ฑ๋ก์ ์ฌ์ฉํ๊ณ  ์ถ์ผ๋ฉด ํ์ํ๊ธฐ ์ข๊ฒ `DiscountPolicy` ์ ๊ตฌํ ๋น๋ค๋ง ๋ฐ๋ก ๋ชจ์์ ํน์  ํจํค์ง์ ๋ชจ์๋์.

์ฐธ๊ณ ๋ก ์คํ๋ง๊ณผ ์คํ๋ง ๋ถํธ๊ฐ ์๋์ผ๋ก ๋ฑ๋กํ๋ ์ ๋ง์ ๋น๋ค์ ์์ธ๋ค. ์ด๋ฐ ๋ถ๋ถ๋ค์ ์คํ๋ง ์์ฒด๋ฅผ ์ ์ดํดํ๊ณ  ์คํ๋ง์ ์๋๋๋ก ์ ์ฌ์ฉํ๋๊ฒ ์ค์ํ๋ค. ์คํ๋ง ๋ถํธ์ ๊ฒฝ์ฐ `DataSource` ๊ฐ์ ๋ฐ์ดํฐ๋ฒ ์ด์ค ์ฐ๊ฒฐ์ ์ฌ์ฉํ๋ ๊ธฐ์  ์ง์ ๋ก์ง๊น์ง ๋ด๋ถ์์ ์๋์ผ๋ก ๋ฑ๋กํ๋๋ฐ, ์ด๋ฐ ๋ถ๋ถ์ ๋ฉ๋ด์ผ์ ์ ์ฐธ๊ณ ํด์ ์คํ๋ง ๋ถํธ๊ฐ ์๋ํ ๋๋ก ํธ๋ฆฌํ๊ฒ ์ฌ์ฉํ๋ฉด ๋๋ค. ๋ฐ๋ฉด์ ์คํ๋ง ๋ถํธ๊ฐ ์๋๋ผ ๋ด๊ฐ ์ง์  ๊ธฐ์  ์ง์ ๊ฐ์ฒด๋ฅผ ์คํ๋ง ๋น์ผ๋ก ๋ฑ๋กํ๋ค๋ฉด ์๋์ผ๋ก ๋ฑ๋กํด์ ๋ชํํ๊ฒ ๋๋ฌ๋ด๋ ๊ฒ์ด ์ข๋ค.

## ๐ ์ค์ํ ๊ฐ๋
์์กด๊ด๊ณ ์ฃผ์, ์ฃผ์ ๋ฐฉ๋ฒ 4๊ฐ์ง

## ๐ ์ฐธ๊ณ 
- [์คํ๋ง ํต์ฌ ์๋ฆฌ - ๊ธฐ๋ณธํธ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)
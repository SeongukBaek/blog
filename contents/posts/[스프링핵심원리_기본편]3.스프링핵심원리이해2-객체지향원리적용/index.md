---
title: "๐ 3. ์คํ๋ง ํต์ฌ ์๋ฆฌ ์ดํด 2 - ๊ฐ์ฒด ์งํฅ ์๋ฆฌ ์ ์ฉ"
description: "์คํ๋ง ํต์ฌ ์๋ฆฌ - ๊ธฐ๋ณธํธ ๊ฐ์ ์ ๋ฆฌ"
date: 2022-06-29
update: 2022-06-29
tags:
  - Java
  - SpringBoot
series: "๐ ์คํ๋ง ํต์ฌ ์๋ฆฌ - ๊ธฐ๋ณธํธ"
---

<em><strong>[์คํ๋ง ํต์ฌ ์๋ฆฌ - ๊ธฐ๋ณธํธ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)์ ๋ค์ผ๋ฉฐ ์ ๋ฆฌํ๋ POST์๋๋ค.</strong></em>

์๋ก์ด ํ ์ธ ์ ์ฑ์ ๊ฐ๋ฐํ๋ ๊ฒ์ ์๊ตฌ๋ฐ์๋ค. ํ์ง๋ง ์ด๋ฅผ ๊ฐ๋ฐํ๊ฒ ๋๋ฉด์ DIP, OCP ์์น์ ๊นจํธ๋ฆฌ๊ฒ ๋๋ค.
- ์ด ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ๋ฉด์ ์คํ๋ง์ผ๋ก์ ์ ํ์ด ์ด๋ฃจ์ด์ง๊ฒ ๋  ๊ฒ์ด๋ค!

## ๐ฏ ์๋ก์ด ํ ์ธ ์ ์ฑ ๊ฐ๋ฐ
**์๋ ๊ธฐํ์**: ์๋น์ค ์คํ ์ง์ ์ ํ ์ธ ์ ์ฑ์ ์ง๊ธ์ฒ๋ผ ๊ณ ์  ๊ธ์ก ํ ์ธ์ด ์๋๋ผ ์ข ๋ ํฉ๋ฆฌ์ ์ธ ์ฃผ๋ฌธ ๊ธ์ก๋น ํ ์ธํ๋ ์ ๋ฅ % ํ ์ธ์ผ๋ก ๋ณ๊ฒฝํ๊ณ  ์ถ์ด์. ์๋ฅผ ๋ค์ด์ ๊ธฐ์กด ์ ์ฑ์ VIP๊ฐ 10000์์ ์ฃผ๋ฌธํ๋  20000์์ ์ฃผ๋ฌธํ๋  ํญ์ 1000์์ ํ ์ธํ๋๋ฐ, ์ด๋ฒ์ ์๋ก ๋์จ ์ ์ฑ์ 10%๋ก ์ง์ ํด๋๋ฉด ๊ณ ๊ฐ์ด 10000์ ์ฃผ๋ฌธ์ 1000์์ ํ ์ธํด์ฃผ๊ณ , 20000์ ์ฃผ๋ฌธ์์ 2000์์ ํ ์ธํด์ฃผ๋ ๊ฑฐ์์!

**์์ง ๊ฐ๋ฐ์**: ์ ๊ฐ ์ฒ์๋ถํฐ ๊ณ ์  ๊ธ์ก ํ ์ธ์ ์๋๋ผ๊ณ  ํ์์์.

**์๋ ๊ธฐํ์**: ์ ์์ผ ์ํํธ์จ์ด ๊ฐ๋ฐ ์ ์ธ ๋ชฐ๋ผ์? โ๊ณํ์ ๋ฐ๋ฅด๊ธฐ๋ณด๋ค ๋ณํ์ ๋์ํ๊ธฐ๋ฅผโ

**์์ง ๊ฐ๋ฐ์**: ... 

์๋ก์ด ์ ๋ฅ  ํ ์ธ ์ ์ฑ์ ์ถ๊ฐํ์!

### ๐ช RateDiscountPolicy ์ถ๊ฐ
<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/ratediscountpolicy.png" width="80%">

- ์๋ก์ด ์ ๋ฅ  ํ ์ธ ์ ์ฑ ์ถ๊ฐ๋ฅผ ์ํด์, `DiscountPolicy` ์ธํฐํ์ด์ค๋ฅผ ๊ตฌํํ  `RateDiscountPolicy` ํด๋์ค๋ฅผ ์ถ๊ฐ๋ก ๊ฐ๋ฐํ๋ฉด ๋๋ค!

```java
package hello.core.discount;

import hello.core.member.Grade;
import hello.core.member.Member;

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

- `FixDiscountPolicy` ์ฒ๋ผ ๋ง๋ค์๋ค. VIP์ธ ๊ฒฝ์ฐ์ ๋ฐํํ๋ ๋ก์ง์ ์ฝ๊ธด ํ์ง๋ง, ํ์คํ ๊ฐ๋ฐ์ ์ํด์๋ ํ์คํธ๊ฐ ํ์ํ  ๊ฒ ๊ฐ๋ค.
- ๋ฐ๋ผ์ `command + shift + T` ๋ก ๋ฐ๋ก ํ์คํธ ์ฝ๋๋ฅผ ์์ฑํ๋ค.

```java
package hello.core.discount;

import hello.core.member.Grade;
import hello.core.member.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RateDiscountPolicyTest {
    RateDiscountPolicy rateDiscountPolicy = new RateDiscountPolicy();

    @Test
    @DisplayName("VIP๋ 10% ํ ์ธ์ด ์ ์ฉ๋์ด์ผ ํ๋ค.")
    void vipO() {
        // given
        Member member = new Member(1L, "memberVIP", Grade.VIP);

        // when
        int discount = rateDiscountPolicy.discount(member, 10000);

        // then
        Assertions.assertThat(discount).isEqualTo(1000);
    }
}
```

- ์ ํ์คํธ ์ฝ๋๋ก VIP์ธ ๊ฒฝ์ฐ 10000์์ ๋ํ ํ ์ธ ๊ธ์ก์ด 1000์์ด ์ ๋๋ก ๋ฐํ๋๋์ง ํ์ธํ๋ค.

์ด์  ์คํจ ์์์ ๋ํ ์ฝ๋ ๋ํ ํ์ํ๋ค.

```java
...
@Test
@DisplayName("VIP๊ฐ ์๋๋ฉด ํ ์ธ์ด ์ ์ฉ๋์ง ์์์ผ ํ๋ค.")
void vipX() {
    // given
    Member member = new Member(2L, "memberVIP", Grade.BASIC);

    // when
    int discount = rateDiscountPolicy.discount(member, 10000);

    // then
    Assertions.assertThat(discount).isEqualTo(0);
}
```

- ์ผ๋ฐ๋ฑ๊ธ์ธ ๊ฒฝ์ฐ, ํ ์ธ ๊ธ์ก์ด 0์์ธ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

---

## ๐ฏ ์๋ก์ด ํ ์ธ ์ ์ฑ ์ ์ฉ๊ณผ ๋ฌธ์ ์ 
์๋ก์ด ํ ์ธ ์ ์ฑ(์ ๋ฅ  ํ ์ธ)์ ์ ์ฉํด๋ณด์.

### ๐ช ํ ์ธ ์ ์ฑ ์ ์ฉ
ํ ์ธ ์ ์ฑ์ ๋ณ๊ฒฝ์ ์ํด ํด๋ผ์ด์ธํธ์ธ `OrderServiceImpl` ์ฝ๋๋ฅผ ๋ณ๊ฒฝํด์ผ ํ๋ค.

```java
public class OrderServiceImpl implements OrderService {

    ...

    // private final DiscountPolicy discountPolicy = new FixDiscountPolicy();
    private final DiscountPolicy discountPolicy = new RateDiscountPolicy();

    ...
}
```

### ๐ช ๋ฌธ์ ์ 
- [x] ์ญํ ๊ณผ ๊ตฌํ์ ์ถฉ์คํ๊ฒ ๋ถ๋ฆฌํ๋ค!
- [x] ๋คํ์ฑ๋ ํ์ฉํ๊ณ  ์ธํฐํ์ด์ค์ ๊ตฌํ ๊ฐ์ฒด๋ฅผ ๋ถ๋ฆฌํ๋ค!
- [ ] OCP, DIP์ ๊ฐ์ ๊ฐ์ฒด ์งํฅ ์ค๊ณ ์์น์ ์ค์ํ๋ค...?

์ฌ์ค์ ์ค์ํ์ง ๋ชปํ๊ณ  ์๋ค!
- **DIP**: ์ฃผ๋ฌธ ์๋น์ค ํด๋ผ์ด์ธํธ(`OrderServiceImpl`) ๋ `DiscountPolicy` ์ธํฐํ์ด์ค์ ์์กดํ๋ฉด์ DIP๋ฅผ ์งํจ ๊ฒ ๊ฐ์ ๋ณด์ด์ง๋ง, ์ฌ์ค์ **๊ตฌํ ํด๋์ค์๋ ์์กด**ํ๊ณ  ์๋ค.
  - ์์์ **์ ์ฑ์ ๋ณ๊ฒฝ์ ์ํด ๊ตฌํ์ฒด ๋ณ๊ฒฝ ์ฝ๋๊ฐ ํ์**ํ์ผ๋...!
- **OCP**: ๋ณ๊ฒฝํ์ง ์๊ณ  ํ์ฅํ  ์ ์์ด์ผ ํ๋ค.
  - ์ง๊ธ ์ฝ๋๋ ๊ธฐ๋ฅ์ ํ์ฅํด์ ๋ณ๊ฒฝํ๋ฉด, ํด๋ผ์ด์ธํธ ์ฝ๋(`OrderServiceImpl`)์ ์ํฅ์ ์ฃผ๊ณ  ์๋ค. 
  - ๋ฐ๋ผ์ OCP ๋ํ ์๋ฐํ๊ณ  ์๋ค.

### ๐ช ํด๋์ค ๋ค์ด์ด๊ทธ๋จ์ผ๋ก ํ์ธ
**๊ธฐ๋ํ๋ ์์กด๊ด๊ณ**
<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/ratediscountpolicy.png" width="80%">

- ๊ทธ๋ฆผ๊ณผ ๊ฐ์ด `DiscountPolicy` ์ธํฐํ์ด์ค์๋ง ์์กดํ๊ณ  ์๋ค๊ณ  ์๊ฐํ๊ณ  ๊ตฌํํ๋ค.

**์ค์  ์์กด๊ด๊ณ**
<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/์ค์ ์์กด๊ด๊ณ.png" width="80%">

- ํ์ง๋ง ์ค์ ๋ก๋ ์ธํฐํ์ด์ค ๋ฟ ์๋๋ผ ๊ตฌํ ํด๋์ค์๋ ์์กดํ๊ณ  ์๋ค.
- ๋ฐ๋ผ์ **DIP๋ฅผ ์๋ฐ**ํ๊ฒ ๋๋ค.

**์ ์ฑ ๋ณ๊ฒฝ**
<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/์ ์ฑ๋ณ๊ฒฝ.png" width="80%">

- ๊ตฌํ ํด๋์ค๋ฅผ ๋ณ๊ฒฝํ๊ฒ ๋๋ฉด, `OrderServiceImpl` ์ ์์ค ์ฝ๋๋ ํจ๊ป ๋ณ๊ฒฝํด์ผ ํ๋ค.
- ๋ฐ๋ผ์ **OCP๋ฅผ ์๋ฐ**ํ๊ฒ ๋๋ค.

**๋ฌธ์  ํด๊ฒฐ**
- ํด๋ผ์ด์ธํธ ์ฝ๋์ธ `OrderServiceImpl` ๊ฐ ์ธํฐํ์ด์ค๋ฟ๋ง ์๋๋ผ ๊ตฌ์ฒด ํด๋์ค๋ ์์กดํด์ ์๊ธฐ๋ ๋ฌธ์ ์ด๋ฏ๋ก, ํด๋ผ์ด์ธํธ ์ฝ๋๊ฐ ์ธํฐํ์ด์ค์๋ง ์์กดํ๋๋ก ์ค๊ณ๋ฅผ ๋ณ๊ฒฝํ๋ค!

<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/ํ ์ธ์ ์ฑ์ ์ฉ๋ฌธ์ ํด๊ฒฐ.png" width="80%">

์ธํฐํ์ด์ค์๋ง ์์กดํ๋๋ก ์ฝ๋๋ฅผ ๋ค์๊ณผ ๊ฐ์ด ๋ณ๊ฒฝํ๋ค.

```java
public class OrderServiceImpl implements OrderService {
    //private final DiscountPolicy discountPolicy = new RateDiscountPolicy();
    private DiscountPolicy discountPolicy;
}
```

- ํ์ง๋ง ๊ตฌํ์ฒด๊ฐ ์๋๋ฐ ์ด๋ป๊ฒ ์ฝ๋๋ฅผ ์คํํ  ์ ์์๊น?
  - ์คํ์ ํด๋ณด๋ฉด, `NullPointerException` ์ด ๋ฐ์ํ๋ค.

์ด๋ฅผ ํด๊ฒฐํ๊ธฐ ์ํด์๋ **๋๊ตฐ๊ฐ๊ฐ ํด๋ผ์ด์ธํธ์ธ `OrderServiceImpl` ์ `DiscountPolicy` ์ ๊ตฌํ ๊ฐ์ฒด๋ฅผ ๋์  ์์ฑํ๊ณ  ์ฃผ์**ํด์ค์ผ ํ๋ค!!!
 
---

## ๐ฏ ๊ด์ฌ์ฌ์ ๋ถ๋ฆฌ
- ์ ํ๋ฆฌ์ผ์ด์์ ํ๋์ ๊ณต์ฐ์ด๋ผ ์๊ฐํด๋ณด์. ๊ฐ๊ฐ์ ์ธํฐํ์ด์ค๋ฅผ ๋ฐฐ์ญ(๋ฐฐ์ฐ ์ญํ )์ด๋ผ ์๊ฐํ์. ๊ทธ๋ฐ๋ฐ! ์ค์  ๋ฐฐ์ญ ๋ง๋ ๋ฐฐ์ฐ๋ฅผ ์ ํํ๋ ๊ฒ์ **๋๊ฐ ํ๋๊ฐ?**
- ๋ก๋ฏธ์ค์ ์ค๋ฆฌ์ฃ ๊ณต์ฐ์ ํ๋ฉด ๋ก๋ฏธ์ค ์ญํ ์ ๋๊ฐ ํ ์ง ์ค๋ฆฌ์ฃ ์ญํ ์ ๋๊ฐ ํ ์ง๋ ๋ฐฐ์ฐ๋ค์ด ์ ํ๋๊ฒ ์๋๋ค. ์ด์  ์ฝ๋๋ ๋ง์น ๋ก๋ฏธ์ค ์ญํ (์ธํฐํ์ด์ค)์ ํ๋ ๋ ์ค๋๋ฅด๋ ๋์นดํ๋ฆฌ์ค(๊ตฌํ์ฒด, ๋ฐฐ์ฐ)๊ฐ ์ค๋ฆฌ์ฃ ์ญํ (์ธํฐํ์ด์ค)์ ํ๋ ์ฌ์ ์ฃผ์ธ๊ณต(๊ตฌํ์ฒด, ๋ฐฐ์ฐ)์ ์ง์  ์ด๋นํ๋ ๊ฒ๊ณผ ๊ฐ๋ค. ๋์นดํ๋ฆฌ์ค๋ ๊ณต์ฐ๋ ํด์ผํ๊ณ  ๋์์ ์ฌ์ ์ฃผ์ธ๊ณต๋ ๊ณต์ฐ์ ์ง์  ์ด๋นํด์ผ ํ๋ ๋ค์ํ ์ฑ์์ ๊ฐ์ง๊ณ  ์๋ค.
  - `OrderServiceImpl` ์ `OrderService` ์ ๊ด๋ จ๋ ๋ก์ง๋ง์ ์ํํด์ผ ํ๋๋ฐ, `DiscountPolicy` ์ ๋ํ ๊ฐ์ฒด ์์ฑ๊ณผ ์ ํ๊น์ง ์ํํ๊ณ  ์๋ ๊ฒ์ด๋ค.

> ๊ฐ์ ํ  ์ญํ ์ด ์ ํด์ ธ ์๋ค !!!

**๊ด์ฌ์ฌ๋ฅผ ๋ถ๋ฆฌํ์**
- ๋ฐฐ์ฐ๋ ๋ณธ์ธ์ ์ญํ ์ธ ๋ฐฐ์ญ์ ์ํํ๋ ๊ฒ์๋ง ์ง์คํด์ผ ํ๋ค.
- ๋์นดํ๋ฆฌ์ค๋ ์ด๋ค ์ฌ์ ์ฃผ์ธ๊ณต์ด ์ ํ๋๋๋ผ๋ ๋๊ฐ์ด ๊ณต์ฐ์ ํ  ์ ์์ด์ผ ํ๋ค.
- ๊ณต์ฐ์ ๊ตฌ์ฑํ๊ณ , ๋ด๋น ๋ฐฐ์ฐ๋ฅผ ์ญ์ธํ๊ณ , ์ญํ ์ ๋ง๋ ๋ฐฐ์ฐ๋ฅผ ์ง์ ํ๋ ์ฑ์์ ๋ด๋นํ๋ ๋ณ๋์ **๊ณต์ฐ ๊ธฐํ์๊ฐ ๋์ฌ ์์ **์ด๋ค.
- ๊ณต์ฐ ๊ธฐํ์๋ฅผ ๋ง๋ค๊ณ , ๋ฐฐ์ฐ์ ๊ณต์ฐ ๊ธฐํ์์ ์ฑ์์ ํ์คํ ๋ถ๋ฆฌํ์.

### ๐ช AppConfig ๋ฑ์ฅ
์ ํ๋ฆฌ์ผ์ด์์ ์ ์ฒด ๋์ ๋ฐฉ์์ ๊ตฌ์ฑ(Config)ํ๊ธฐ ์ํด, **๊ตฌํ ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ  ์ฐ๊ฒฐํ๋ ์ฑ์**์ ๊ฐ์ง๋ **๋ณ๋์ ์ค์  ํด๋์ค**๋ฅผ ๋ง๋ ๋ค.

```java
package hello.core;

import hello.core.discount.FixDiscountPolicy;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import hello.core.member.MemoryMemberRepository;
import hello.core.order.OrderService;
import hello.core.order.OrderServiceImpl;

public class AppConfig {

    public MemberService memberService() {
        return new MemberServiceImpl(new MemoryMemberRepository());
    }

    public OrderService orderService() {
        return new OrderServiceImpl(new MemoryMemberRepository(), new FixDiscountPolicy());
    }
}

package hello.core.order;

import hello.core.discount.DiscountPolicy;
import hello.core.discount.FixDiscountPolicy;
import hello.core.discount.RateDiscountPolicy;
import hello.core.member.Member;
import hello.core.member.MemberRepository;
import hello.core.member.MemoryMemberRepository;

public class OrderServiceImpl implements OrderService {

    // ํ์์ ์ฐพ๊ธฐ ์ํด ํ์
    private final MemberRepository memberRepository;
    // ํ ์ธ ์ ์ฑ ์ฌ์ฉ์ ์ํด ํ์
    // private final DiscountPolicy discountPolicy = new FixDiscountPolicy();
    private final DiscountPolicy discountPolicy;

    public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }

    @Override
    public Order createOrder(Long memberId, String itemName, int itemPrice) {
        Member member = memberRepository.findById(memberId);
        // ํ ์ธ์ ๋ํด์๋ createOrder๋ ์์ ์์ง ๋ชปํจ, ๋จ์ผ ์ฑ์ ์์น์ ์ ์งํจ ์
        int discountPrice = discountPolicy.discount(member, itemPrice);

        return new Order(memberId, itemName, itemPrice, discountPrice);
    }
}
```

- ์ด์ ์๋ ์ด๋ค ์ธํฐํ์ด์ค์ ์ด๋ค ๊ตฌํ์ฒด๋ฅผ ์ฌ์ฉํ  ์ง๋ฅผ `MemberService` ๋ด์์ ์ง์  ์ ์ธํ์๋ค. (๋ฐฐ์ฐ๊ฐ ์ง์  ์๋ ๋ฐฐ์ญ์ ์ง์ ํ๋ ๊ฒ๊ณผ ๋์ผ)
- `MemberServiceImpl` ๋ `MemoryMemberRepository` ๋ฅผ ์ฌ์ฉํ๊ณ  ์์ผ๋ฏ๋ก, ์ด ๊ตฌํ์ฒด ์ ์ธ๋ถ๋ฅผ ์ง์ฐ๊ณ , **์์ฑ์๋ฅผ ๋ง๋ ๋ค.**
- ์ด๋ ๊ฒ ๋๋ฉด, `MemberRepository` ์ธํฐํ์ด์ค์ ์ด๋ค ๊ตฌ์ฒด ํด๋์ค๋ฅผ ์ฌ์ฉํ ์ง๊ฐ ์์ฑ์๋ฅผ ํตํด์ ์ง์ ๋๋ค.
  - ๊ทธ๋ฆฌ๊ณ , `MemberServiceImpl` ์์ `MemoryMemberRepository` ๋ผ๋ ๊ตฌ์ฒด ํด๋์ค์ ๋ํ ์ฝ๋๋ ์์ด์ง๋ค.
- `OrderServiceImpl` ์ ์ฌ์ฉํ๋ field๊ฐ 2๊ฐ์ด๋ฏ๋ก, ์์ฑ์ ์ฃผ์์ ์ํด 2๊ฐ์ ๊ตฌ์ฒด ํด๋์ค๋ฅผ ์ธ์๋ก ๋๊ฒจ์ค๋ค.

์ด๋์ ๊ฐ `AppConfig` ์ ๋ฉ์๋๋ฅผ ํธ์ถํ๋ฉด, `MemberServiceImpl` ๊ณผ `OrderServiceImpl` ์ด ์์ฑ๋๊ณ , ์์ฑํ ๊ฐ์ฒด ์ธ์คํด์ค์ ์ฐธ์กฐ๋ฅผ ์์ฑ์๋ฅผ ํตํด ์ฃผ์ํด์ค๋ค.
- `MemberServiceImpl` -> `MemoryMemberRepository`
- `OrderServiceImpl` -> `MemoryMemberRepository` , `FixDiscountPolicy`

์ด๋ก์จ, **์ธํฐํ์ด์ค์๋ง ์์กด**ํ๊ฒ ๋์ด DIP๋ฅผ ์๋ฐํ์ง ์๊ฒ ๋์๋ค.
- `MemberServiceImpl` ์์ฅ์์, ์์ฑ์๋ฅผ ํตํด ์ด๋ค ๊ตฌํ ๊ฐ์ฒด๊ฐ ๋ค์ด์ฌ ์ง(์ฃผ์๋  ์ง)๋ ์ ํ ์ ์ ์๋ค.
  - ์ด๋ ํด๋์ค ๋ด๋ถ๊ฐ ์๋๋ผ, ์ธ๋ถ(`AppConfig`)์์ ๊ฒฐ์ ๋๋ค.
- **์์กด๊ด๊ณ์ ๋ํ ๊ณ ๋ฏผ์ ์ธ๋ถ๋ก ๋๊ธฐ๊ณ , ์คํ์๋ง ์ง์ค**ํ๋๋ก ํ๋ค!

**ํด๋์ค ๋ค์ด์ด๊ทธ๋จ**
<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/appconfigํด๋์ค๋ค์ด์ด๊ทธ๋จ.png" width="80%">

- ๊ฐ์ฒด์ ์์ฑ๊ณผ ์ฐ๊ฒฐ์ `AppConfig` ๊ฐ ๋ด๋นํ๋ค.
- **DIP ์์ฑ** : `MemberServiceImpl` ์ `MemberRepository` ์ธ ์ถ์ ์ธํฐํ์ด์ค์๋ง ์์กดํ๋ฉด ๋๋ค. ๊ตฌ์ฒด ํด๋์ค๋ ๋ชฐ๋ผ๋ ๋๋ค!
- **๊ด์ฌ์ฌ์ ๋ถ๋ฆฌ** : ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ  ์ฐ๊ฒฐํ๋ ์ญํ ๊ณผ(`AppConfig`), ์คํํ๋ ์ญํ ์ด(`MemberServiceImpl` , `OrderServiceImpl`) ๋ชํํ ๋ถ๋ฆฌ๋์๋ค.

**ํ์ ๊ฐ์ฒด ์ธ์คํด์ค ๋ค์ด์ด๊ทธ๋จ**
<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/appconfigํ์๊ฐ์ฒด์ธ์คํด์ค๋ค์ด์ด๊ทธ๋จ.png" width="80%">

- `appConfig` ๊ฐ์ฒด๋ `memoryMemberRepository` ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ , ๊ทธ ์ฐธ์กฐ๊ฐ์ `memberServiceImpl` ์ ์์ฑํ๋ฉด์ ์์ฑ์๋ก ์ ๋ฌํ๋ค.
- ํด๋ผ์ด์ธํธ(`memberServiceImpl`) ์์ฅ์์๋ ์์กด๊ด๊ณ๋ฅผ ๋ง์น ์ธ๋ถ์์ ์ฃผ์ํด์ฃผ๋ ๊ฒ๊ณผ ๊ฐ์ **DI(Dependency Injection), ์์กด๊ด๊ณ ์ฃผ์, ์์กด์ฑ ์ฃผ์**์ด๋ผ ํ๋ค.

### ๐ช AppConfig ์คํ
**์ฌ์ฉ ํด๋์ค - `MemberApp`**
```java
package hello.core;

import hello.core.member.Grade;
import hello.core.member.Member;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;

public class MemberApp {
    public static void main(String[] args) {
        AppConfig appConfig = new AppConfig();
        MemberService memberService = appConfig.memberService();

        Member member = new Member(1L, "memberA", Grade.VIP);
        memberService.join(member);

        Member findMember = memberService.findMember(1L);
        System.out.println("new Member = " + member.getName());
        System.out.println("findMember = " + findMember.getName());
    }
}
```

**์ฌ์ฉ ํด๋์ค - `OrderApp`**
```java
package hello.core;

import hello.core.member.Grade;
import hello.core.member.Member;
import hello.core.member.MemberService;

public class MemberApp {
    public static void main(String[] args) {
        AppConfig appConfig = new AppConfig();
        MemberService memberService = appConfig.memberService();

        Member member = new Member(1L, "memberA", Grade.VIP);
        memberService.join(member);

        Member findMember = memberService.findMember(1L);
        System.out.println("new Member = " + member.getName());
        System.out.println("findMember = " + findMember.getName());
    }
}
```

**ํ์คํธ ์ฝ๋ ์์ **

```java
MemberService memberService;
OrderService orderService;

@BeforeEach
public void beforeEach() {
    AppConfig appConfig = new AppConfig();
    memberService = appConfig.memberService();
    orderService = appConfig.orderService();
}
```
- `@BeforeEach` ๋ฅผ ์ฌ์ฉํด ๊ฐ ํ์คํธ๋ฅผ ์คํํ๊ธฐ ์ ์ ํธ์ถ๋๋๋ก ์์ ํ๋ค.

---

## ๐ฏ AppConfig ๋ฆฌํฉํ ๋ง
ํ์ฌ์ `AppConfig` ์ ์ค๋ณต์ด ์๊ณ , ์ญํ ์ ๋ฐ๋ฅธ ๊ตฌํ์ด ์ ๋ณด์ด์ง ์์ ๋ฆฌํฉํ ๋ง์ ์ํํ๋ค.

**๊ธฐ๋ํ๋ ๊ทธ๋ฆผ**
<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/appconfig๋ฆฌํฉํ ๋ง.png" width="80%">

```java
package hello.core;

import hello.core.discount.DiscountPolicy;
import hello.core.discount.FixDiscountPolicy;
import hello.core.member.MemberRepository;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import hello.core.member.MemoryMemberRepository;
import hello.core.order.OrderService;
import hello.core.order.OrderServiceImpl;

public class AppConfig {

    public MemberService memberService() {
        return new MemberServiceImpl(memberRepository());
    }

    private MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }

    public OrderService orderService() {
        return new OrderServiceImpl(
                memberRepository(),
                discountPolicy()
        );
    }

    public DiscountPolicy discountPolicy() {
        return new FixDiscountPolicy();
    }
}
```

- ์ญํ ๊ณผ ๊ตฌํ ํด๋์ค๊ฐ ํ๋์ ๋ณด๊ธฐ ์ฝ๋ค. ์ ํ๋ฆฌ์ผ์ด์ ์ ์ฒด ๊ตฌ์ฑ์ด ์ด๋ป๊ฒ ๋์ด ์๋์ง ๋น ๋ฅธ ํ์์ด ๊ฐ๋ฅํด์ก๋ค.
- ๊ตฌํ์ฒด์ ๋ณ๊ฒฝ ์์๋ ์ธ๋ถ ๋ฉ์๋์ ํ ๋ถ๋ถ๋ง ๋ณ๊ฒฝํ๋ฉด ๋๋ค.

---

## ๐ฏ ์๋ก์ด ๊ตฌ์กฐ์ ํ ์ธ ์ ์ฑ ์ ์ฉ
- ์ ์ก ํ ์ธ ์ ์ฑ์ ์ ๋ฅ  ํ ์ธ ์ ์ฑ์ผ๋ก ๋ณ๊ฒฝํ๋ค.
  - ์ด์  AppConfig๋ง ์์ ํ๋ฉด ๋๋ค.

"AppConfig์ ๋ฑ์ฅ์ผ๋ก ์ ํ๋ฆฌ์ผ์ด์์ด ํฌ๊ฒ ์ฌ์ฉ ์์ญ๊ณผ ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ  ๊ตฌ์ฑํ๋ ์์ญ์ผ๋ก ๋ถ๋ฆฌ๋์๋ค!"

**์ฌ์ฉ, ๊ตฌ์ฑ์ ๋ถ๋ฆฌ**
<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/์ฌ์ฉ๊ตฌ์ฑ์๋ถ๋ฆฌ.png" width="80%">

**ํ ์ธ ์ ์ฑ์ ๋ณ๊ฒฝ**
<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/ํ ์ธ์ ์ฑ์๋ณ๊ฒฝ.png" width="80%">

- ๊ตฌ์ฑ ์์ญ์๋ง ์ํฅ์ ๋ฐ๊ณ , ์ฌ์ฉ ์์ญ์ ์ ํ ๊ตฌ์ ๋ฐ์ง ์๋๋ค.

**ํ ์ธ ์ ์ฑ ๋ณ๊ฒฝ ๊ตฌ์ฑ ์ฝ๋**
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

public class AppConfig {

    ...

    public DiscountPolicy discountPolicy() {
//        return new FixDiscountPolicy();
        return new RateDiscountPolicy();
    }
}
```

- ํ ์ธ ์ ์ฑ ์ญํ ์ ๋ด๋นํ๋ ๊ตฌํ์ `RateDiscountPolicy` ๊ฐ์ฒด๋ก ๋ณ๊ฒฝํ๋ค.

---

## ๐ฏ ์ข์ ๊ฐ์ฒด ์งํฅ ์ค๊ณ์ 5๊ฐ์ง ์์น์ ์ ์ฉ
ํฌ๊ฒ 3๊ฐ์ง SRP, DIP, OCP ์์น์ด ์ ์ฉ๋์๋ค.

### ๐ช SRP ๋จ์ผ ์ฑ์ ์์น
**ํ ํด๋์ค๋ ํ๋์ ์ฑ์๋ง ๊ฐ์ ธ์ผ ํ๋ค.**
- ๊ด์ฌ์ฌ์ ๋ถ๋ฆฌ๋ฅผ ํตํด, 
  - ๊ตฌํ ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ  ์ฐ๊ฒฐํ๋ ์ฑ์์ `AppConfig` ๊ฐ ๋ด๋น
  - ์คํํ๋ ์ฑ์์ ํด๋ผ์ด์ธํธ ๊ฐ์ฒด๊ฐ ๋ด๋น

### ๐ช DIP ์์กด๊ด๊ณ ์ญ์  ์์น
**์ถ์ํ์ ์์กดํด์ผ์ง, ๊ตฌ์ฒดํ์ ์์กดํ๋ฉด ์๋๋ค.**
- ์๋ก์ด ํ ์ธ ์ ์ฑ ๊ฐ๋ฐ ํ ์ ์ฉํ๋ ค ํ  ๋ ํด๋ผ์ด์ธํธ ์ฝ๋์ ๋ณ๊ฒฝ์ ์๊ตฌํ๋ค.
  - ์ด๋ ๊ตฌ์ฒด ํด๋์ค์ ํจ๊ป ์์กดํ๊ณ  ์์๊ธฐ ๋๋ฌธ์ด์๋ค.
- ๋ฐ๋ผ์ ์ถ์ํ ์ธํฐํ์ด์ค์๋ง ์์กดํ๋๋ก ์ฝ๋๋ฅผ ๋ณ๊ฒฝํ๋ค.
  - ํด๋ผ์ด์ธํธ ์ฝ๋๋ ์ธํฐํ์ด์ค๋ง์ผ๋ก ์๋ฌด๊ฒ๋ ์คํํ  ์ ์๊ธฐ์, `AppConfig` ๋ฅผ ํตํด ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ , ์์กด๊ด๊ณ๋ฅผ ์ฃผ์ํ๋ค.

### ๐ช OCP ๊ฐ๋ฐฉ ํ์ ์์น
**์ํํธ์จ์ด ์์๋ ํ์ฅ์๋ ์ด๋ ค ์์ผ๋ ๋ณ๊ฒฝ์๋ ๋ซํ ์์ด์ผ ํ๋ค.**
- ๋คํ์ฑ์ ์ฌ์ฉํ๊ณ  ํด๋ผ์ด์ธํธ๊ฐ DIP๋ฅผ ์งํค๊ฒ ๋๋ฉด, OCP ์์น์ด ์ ์ฉ๋  ๊ฐ๋ฅ์ฑ์ด ์ด๋ฆฐ๋ค.
- ์ ํ๋ฆฌ์ผ์ด์์ ์ฌ์ฉ ์์ญ๊ณผ ๊ตฌ์ฑ ์์ญ์ผ๋ก ๋๋๋ค.
- ๋ณ๊ฒฝ์ด ์ผ์ด๋๋, ํด๋ผ์ด์ธํธ ์ฝ๋๋ฅผ ๋ณ๊ฒฝํ  ํ์๊ฐ ์๊ฒ ๋์์ผ๋ฏ๋ก, ์ฌ์ฉ ์์ญ์ ๋ํ ๋ณ๊ฒฝ์ ์์ ํ ๋ซํ ์๊ฒ ๋์๋ค.

---

## ๐ฏ IoC, DI, ๊ทธ๋ฆฌ๊ณ  ์ปจํ์ด๋
### ๐ช ์ ์ด์ ์ญ์  (Inversion of Control)
๊ธฐ์กด ํ๋ก๊ทธ๋จ์ ํด๋ผ์ด์ธํธ ๊ตฌํ ๊ฐ์ฒด๊ฐ ์ค์ค๋ก ํ์ํ ์๋ฒ ๊ตฌํ ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ , ์ฐ๊ฒฐํ๊ณ , ์คํํ๋ค. ํ๋ง๋๋ก "๊ตฌํ ๊ฐ์ฒด๊ฐ ํ๋ก๊ทธ๋จ์ ์ ์ด ํ๋ฆ์ ์ค์ค๋ก ์กฐ์ข"ํ๋ค. ๊ฐ๋ฐ์ ์์ฅ์์๋ ์์ฐ์ค๋ฌ์ด ํ๋ฆ์ด๋ค.

๋ฐ๋ฉด์ `AppConfig` ๊ฐ ๋ฑ์ฅํ ์ดํ์ **๊ตฌํ ๊ฐ์ฒด๋ ์์ ์ ๋ก์ง์ ์คํํ๋ ์ญํ ๋ง ๋ด๋น**ํ๋ค. ํ๋ก๊ทธ๋จ์ ์ ์ด ํ๋ฆ์ ์ด์  `AppConfig` ๊ฐ ๊ฐ์ ธ๊ฐ๋ค. ์๋ฅผ ๋ค์ด์ `OrderServiceImpl` ์ ํ์ํ ์ธํฐํ์ด์ค๋ค์ ํธ์ถํ์ง๋ง ์ด๋ค ๊ตฌํ ๊ฐ์ฒด๋ค์ด ์คํ๋ ์ง ๋ชจ๋ฅธ๋ค.

ํ๋ก๊ทธ๋จ์ ๋ํ ์ ์ด ํ๋ฆ์ ๋ํ ๊ถํ์ ๋ชจ๋ `AppConfig` ๊ฐ ๊ฐ์ง๊ณ  ์๋ค. ์ฌ์ง์ด `OrderServiceImpl` ๋ AppConfig๊ฐ ์์ฑํ๋ค. ๊ทธ๋ฆฌ๊ณ  `AppConfig` ๋ `OrderServiceImpl` ์ด ์๋ `OrderService` ์ธํฐํ์ด์ค์ ๋ค๋ฅธ ๊ตฌํ ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ  ์คํํ  ์ ๋ ์๋ค. ๊ทธ๋ฐ ์ฌ์ค๋ ๋ชจ๋ฅธ์ฒด `OrderServiceImpl` ์ ๋ฌต๋ฌตํ ์์ ์ ๋ก์ง์ ์คํํ  ๋ฟ์ด๋ค.

์ด๋ ๋ฏ **ํ๋ก๊ทธ๋จ์ ์ ์ด ํ๋ฆ์ ์ง์  ์ ์ดํ๋ ๊ฒ์ด ์๋๋ผ ์ธ๋ถ์์ ๊ด๋ฆฌํ๋ ๊ฒ์ ์ ์ด์ ์ญ์ (IoC)**์ด๋ผ ํ๋ค.

> **ํ๋ ์์ํฌ vs. ๋ผ์ด๋ธ๋ฌ๋ฆฌ**
> - ํ๋ ์์ํฌ๊ฐ ๋ด๊ฐ ์์ฑํ ์ฝ๋๋ฅผ ์ ์ดํ๊ณ , ๋์  ์คํํ๋ฉด ๊ทธ๊ฒ์ ํ๋ ์์ํฌ๊ฐ ๋ง๋ค. (JUnit)
> - ๋ฐ๋ฉด์ ๋ด๊ฐ ์์ฑํ ์ฝ๋๊ฐ ์ง์  ์ ์ด์ ํ๋ฆ์ ๋ด๋นํ๋ค๋ฉด ๊ทธ๊ฒ์ ํ๋ ์์ํฌ๊ฐ ์๋๋ผ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ค.

### ๐ช ์์กด๊ด๊ณ ์ฃผ์(Dependency Injection)
`OrderServiceImpl` ์ `DiscountPolicy` ์ธํฐํ์ด์ค์ ์์กดํ๋ค. ์ค์  ์ด๋ค ๊ตฌํ ๊ฐ์ฒด๊ฐ ์ฌ์ฉ๋ ์ง๋ ๋ชจ๋ฅธ๋ค.

์์กด๊ด๊ณ๋ **์ ์ ์ธ ํด๋์ค ์์กด ๊ด๊ณ**์, **์คํ ์์ ์ ๊ฒฐ์ ๋๋ ๋์ ์ธ ๊ฐ์ฒด(์ธ์คํด์ค) ์์กด ๊ด๊ณ** ๋์ ๋ถ๋ฆฌํด์ ์๊ฐํด์ผ ํ๋ค.

**์ ์ ์ธ ํด๋์ค ์์กด๊ด๊ณ**
- **ํด๋์ค๊ฐ ์ฌ์ฉํ๋ `import` ์ฝ๋๋ง ๋ณด๊ณ  ์์กด๊ด๊ณ๋ฅผ ์ฝ๊ฒ ํ๋จ**ํ  ์ ์๋ค. ์ ์ ์ธ ์์กด๊ด๊ณ๋ ์ ํ๋ฆฌ์ผ์ด์์ ์คํํ์ง ์์๋ ๋ถ์ํ  ์ ์๋ค. ํด๋์ค ๋ค์ด์ด๊ทธ๋จ์ ๋ณด์
- `OrderServiceImpl` ์ `MemberRepository` , `DiscountPolicy` ์ ์์กดํ๋ค๋ ๊ฒ์ ์ ์ ์๋ค.
- ๊ทธ๋ฐ๋ฐ ์ด๋ฌํ ํด๋์ค ์์กด๊ด๊ณ ๋ง์ผ๋ก๋ ์ค์  ์ด๋ค ๊ฐ์ฒด๊ฐ `OrderServiceImpl` ์ ์ฃผ์ ๋ ์ง ์ ์ ์๋ค.

<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/DIํด๋์ค๋ค์ด์ด๊ทธ๋จ.png" width="80%">

**๋์ ์ธ ๊ฐ์ฒด ์ธ์คํด์ค ์์กด ๊ด๊ณ**
- ์ ํ๋ฆฌ์ผ์ด์ ์คํ ์์ ์ ์ค์  ์์ฑ๋ ๊ฐ์ฒด ์ธ์คํด์ค์ ์ฐธ์กฐ๊ฐ ์ฐ๊ฒฐ๋ ์์กด ๊ด๊ณ๋ค.

**๊ฐ์ฒด ๋ค์ด์ด๊ทธ๋จ**
<img src="../../images/์คํ๋งํต์ฌ์๋ฆฌ-๊ธฐ๋ณธํธ/DI๊ฐ์ฒด๋ค์ด์ด๊ทธ๋จ.png" width="80%">

- ์ ํ๋ฆฌ์ผ์ด์ **์คํ ์์ (๋ฐํ์)**์ ์ธ๋ถ์์ ์ค์  ๊ตฌํ ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ  ํด๋ผ์ด์ธํธ์ ์ ๋ฌํด์ ํด๋ผ์ด์ธํธ์ ์๋ฒ์ ์ค์  ์์กด๊ด๊ณ๊ฐ ์ฐ๊ฒฐ๋๋ ๊ฒ์ **์์กด๊ด๊ณ ์ฃผ์**์ด๋ผ ํ๋ค.
- ๊ฐ์ฒด ์ธ์คํด์ค๋ฅผ ์์ฑํ๊ณ , ๊ทธ ์ฐธ์กฐ๊ฐ์ ์ ๋ฌํด์ ์ฐ๊ฒฐ๋๋ค.
- ์์กด๊ด๊ณ ์ฃผ์์ ์ฌ์ฉํ๋ฉด ํด๋ผ์ด์ธํธ ์ฝ๋๋ฅผ ๋ณ๊ฒฝํ์ง ์๊ณ , ํด๋ผ์ด์ธํธ๊ฐ ํธ์ถํ๋ ๋์์ ํ์ ์ธ์คํด์ค๋ฅผ ๋ณ๊ฒฝํ  ์ ์๋ค.
- ์์กด๊ด๊ณ ์ฃผ์์ ์ฌ์ฉํ๋ฉด ์ ์ ์ธ ํด๋์ค ์์กด๊ด๊ณ๋ฅผ ๋ณ๊ฒฝํ์ง ์๊ณ , ๋์ ์ธ ๊ฐ์ฒด ์ธ์คํด์ค ์์กด๊ด๊ณ๋ฅผ ์ฝ๊ฒ ๋ณ๊ฒฝํ  ์ ์๋ค.

### ๐ช IoC ์ปจํ์ด๋, DI ์ปจํ์ด๋
`AppConfig` ์ฒ๋ผ ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ  ๊ด๋ฆฌํ๋ฉด์ ์์กด๊ด๊ณ๋ฅผ ์ฐ๊ฒฐํด ์ฃผ๋ ๊ฒ์ IoC ์ปจํ์ด๋ ๋๋ DI ์ปจํ์ด๋๋ผ ํ๋ค.

์์กด๊ด๊ณ ์ฃผ์์ ์ด์ ์ ๋ง์ถ์ด ์ต๊ทผ์๋ ์ฃผ๋ก DI ์ปจํ์ด๋๋ผ ํ๋ค. ๋๋ ์ด์๋ธ๋ฌ, ์ค๋ธ์ ํธ ํฉํ ๋ฆฌ ๋ฑ์ผ๋ก ๋ถ๋ฆฌ๊ธฐ๋ ํ๋ค.

---

## ๐ฏ ์คํ๋ง์ผ๋ก ์ ํํ๊ธฐ
์ด์  ์คํ๋ง์ ์ฌ์ฉํ ์ฝ๋๋ก ๋ณ๊ฒฝํ๋ค.

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

    @Bean
    public DiscountPolicy discountPolicy() {
//        return new FixDiscountPolicy();
        return new RateDiscountPolicy();
    }
}
```

- `@Configuration` : ์ ํ๋ฆฌ์ผ์ด์์ ๊ตฌ์ฑ ์ ๋ณด๋ฅผ ๋ด๋นํ๋ ํด๋์ค์ ์ฌ์ฉํ๋ค.
- `@Bean` : ์คํ๋ง ์ปจํ์ด๋์ ๋ฑ๋กํ๊ธฐ ์ํด ์ฌ์ฉํ๋ค.

```java
package hello.core;

import hello.core.member.Grade;
import hello.core.member.Member;
import hello.core.member.MemberService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class MemberApp {
    public static void main(String[] args) {
//        AppConfig appConfig = new AppConfig();
//        MemberService memberService = appConfig.memberService();

        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
        MemberService memberService = applicationContext.getBean("memberService", MemberService.class);

        Member member = new Member(1L, "memberA", Grade.VIP);
        memberService.join(member);

        Member findMember = memberService.findMember(1L);
        System.out.println("new Member = " + member.getName());
        System.out.println("findMember = " + findMember.getName());
    }
}
```

- `ApplicationContext` : ์คํ๋ง ์ปจํ์ด๋๋ฅผ ์๋ฏธํ๋ค๊ณ  ๋ด๋ ๋๋ค. ๋ฑ๋ก๋ ๊ฐ์ฒด๋ค์ ๊ด๋ฆฌํ๋ค.
- `AnnotationConfigApplicationContext` : annotation ๊ธฐ๋ฐ์ผ๋ก configuration์ ํ ๊ตฌ์ฑ ์ ๋ณด๋ฅผ ๊ฐ์ง๊ณ  ๋ง๋  ์ ํ๋ฆฌ์ผ์ด์์ context๋ฅผ ๊ฐ์ ธ์จ๋ค.
- `getBean(String name = "", Class<T> requiredType)` : ์ปจํ์ด๋์ ๋ฑ๋ก๋ ๋น ์ค `name` ์ ํด๋น๋๋ ๊ฐ์ฒด๋ฅผ ๊ฐ์ ธ์จ๋ค.

**์คํ๋ง ์ปจํ์ด๋**
- `ApplicationContext` ๋ฅผ ์คํ๋ง ์ปจํ์ด๋๋ผ ํ๋ค.
- ๊ธฐ์กด์๋ ๊ฐ๋ฐ์๊ฐ `AppConfig` ๋ฅผ ์ฌ์ฉํด์ ์ง์  ๊ฐ์ฒด๋ฅผ ์์ฑํ๊ณ  DI๋ฅผ ํ์ง๋ง, ์ด์ ๋ถํฐ๋ ์คํ๋ง ์ปจํ์ด๋๋ฅผ ํตํด์ ์ฌ์ฉํ๋ค.
- ์คํ๋ง ์ปจํ์ด๋๋ `@Configuration` ์ด ๋ถ์ `AppConfig` ๋ฅผ ์ค์ (๊ตฌ์ฑ) ์ ๋ณด๋ก ์ฌ์ฉํ๋ค. ์ฌ๊ธฐ์ `@Bean` ์ด๋ผ ์ ํ ๋ฉ์๋๋ฅผ ๋ชจ๋ ํธ์ถํด์ ๋ฐํ๋ ๊ฐ์ฒด๋ฅผ ์คํ๋ง ์ปจํ์ด๋์ ๋ฑ๋กํ๋ค. ์ด๋ ๊ฒ ์คํ๋ง ์ปจํ์ด๋์ ๋ฑ๋ก๋ ๊ฐ์ฒด๋ฅผ ์คํ๋ง ๋น์ด๋ผ ํ๋ค.
- ์คํ๋ง ๋น์ `@Bean` ์ด ๋ถ์ ๋ฉ์๋์ ๋ช์ ์คํ๋ง ๋น์ ์ด๋ฆ์ผ๋ก ์ฌ์ฉํ๋ค. ( `memberService` , `orderService` )
- ์ด์ ์๋ ๊ฐ๋ฐ์๊ฐ ํ์ํ ๊ฐ์ฒด๋ฅผ `AppConfig` ๋ฅผ ์ฌ์ฉํด์ ์ง์  ์กฐํํ์ง๋ง, ์ด์ ๋ถํฐ๋ ์คํ๋ง ์ปจํ์ด๋๋ฅผ ํตํด์ ํ์ํ ์คํ๋ง ๋น(๊ฐ์ฒด)๋ฅผ ์ฐพ์์ผ ํ๋ค. ์คํ๋ง ๋น์ `applicationContext.getBean()` ๋ฉ์๋๋ฅผ ์ฌ์ฉํด์ ์ฐพ์ ์ ์๋ค.
- ๊ธฐ์กด์๋ ๊ฐ๋ฐ์๊ฐ ์ง์  ์๋ฐ์ฝ๋๋ก ๋ชจ๋  ๊ฒ์ ํ๋ค๋ฉด ์ด์ ๋ถํฐ๋ ์คํ๋ง ์ปจํ์ด๋์ ๊ฐ์ฒด๋ฅผ ์คํ๋ง ๋น์ผ๋ก ๋ฑ๋กํ๊ณ , ์คํ๋ง ์ปจํ์ด๋์์ ์คํ๋ง ๋น์ ์ฐพ์์ ์ฌ์ฉํ๋๋ก ๋ณ๊ฒฝ๋์๋ค.

## ๐ ์ค์ํ ๊ฐ๋
DIP, OCP, IoC, DI, ์คํ๋ง ์ปจํ์ด๋์ ๋น

## ๐ ์ฐธ๊ณ 
- [์คํ๋ง ํต์ฌ ์๋ฆฌ - ๊ธฐ๋ณธํธ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)
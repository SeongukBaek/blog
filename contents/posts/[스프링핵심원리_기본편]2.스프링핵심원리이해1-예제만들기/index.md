---
title: "π 2. μ€νλ§ ν΅μ¬ μλ¦¬ μ΄ν΄ 1 - μμ  λ§λ€κΈ°"
description: "μ€νλ§ ν΅μ¬ μλ¦¬ - κΈ°λ³ΈνΈ κ°μ μ λ¦¬"
date: 2022-06-29
update: 2022-06-29
tags:
  - Java
  - SpringBoot
series: "π μ€νλ§ ν΅μ¬ μλ¦¬ - κΈ°λ³ΈνΈ"
---

<em><strong>[μ€νλ§ ν΅μ¬ μλ¦¬ - κΈ°λ³ΈνΈ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)μ λ€μΌλ©° μ λ¦¬νλ POSTμλλ€.</strong></em>

## π― νλ‘μ νΈ μμ±
[start.io](https://start.spring.io/) μ¬μ©

<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/springSetting.png">

---

## π― λΉμ¦λμ€ μκ΅¬μ¬ν­κ³Ό μ€κ³
### πͺ νμ
- νμμ κ°μνκ³  μ‘°νν  μ μλ€.
- νμμ μΌλ°κ³Ό VIP λ κ°μ§ λ±κΈμ΄ μλ€.
- νμ λ°μ΄ν°λ μμ²΄ DBλ₯Ό κ΅¬μΆν  μ μκ³ , μΈλΆ μμ€νκ³Ό μ°λν  μ μλ€. (λ―Ένμ )

### πͺ μ£Όλ¬Έκ³Ό ν μΈ μ μ±
- νμμ μνμ μ£Όλ¬Έν  μ μλ€.
- νμ λ±κΈμ λ°λΌ ν μΈ μ μ±μ μ μ©ν  μ μλ€.
- ν μΈ μ μ±μ λͺ¨λ  VIPλ 1000μμ ν μΈν΄μ£Όλ κ³ μ  κΈμ‘ ν μΈμ μ μ©ν΄λ¬λΌ. (λμ€μ λ³κ²½ λ  μ μλ€.)
- ν μΈ μ μ±μ λ³κ²½ κ°λ₯μ±μ΄ λλ€. νμ¬μ κΈ°λ³Έ ν μΈ μ μ±μ μμ§ μ νμ§ λͺ»νκ³ , μ€ν μ§μ κΉμ§ κ³ λ―Όμ λ―Έλ£¨κ³  μΆλ€. μ΅μμ κ²½μ° ν μΈμ μ μ©νμ§ μμ μ λ μλ€. (λ―Ένμ )

> νμ¬λ μ€νλ§ μμ΄ μμ μλ°λ‘λ§ κ°λ°μ μ§ννλ€. νλ‘μ νΈ νκ²½μ€μ μ μν΄ start.ioλ₯Ό μ¬μ©νλ€.

---

## π― νμ λλ©μΈ μ€κ³
### πͺ νμ λλ©μΈ νλ ₯ κ΄κ³
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/νμλλ©μΈνλ ₯κ΄κ³.png" width="80%">

- νμ μλΉμ€μμλ νμ κ°μκ³Ό νμ μ‘°ν κΈ°λ₯μ΄ μλ€.
- νμ λ°μ΄ν°μ μ κ·Όνλ κ³μΈ΅μ λ°λ‘ μμ±νλ€.
  - νμ μ μ₯μλΌλ μΈν°νμ΄μ€λ₯Ό μμ±ν΄ λ―Ένμ λ κ΅¬νμ²΄μ λν΄ λ§μΆ μ μλ€.

### πͺ νμ ν΄λμ€ λ€μ΄μ΄κ·Έλ¨ (μ μ )
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/νμν΄λμ€λ€μ΄μ΄κ·Έλ¨.png" width="80%">

- `MemberService` λΌλ μΈν°νμ΄μ€λ₯Ό λ§λ€κ³  μ΄μ λν κ΅¬νμ²΄μΈ `MemberServiceImpl` ν΄λμ€λ₯Ό μμ±νλ€.
  - μ΄ μ­ν μ `MemberRepository` μ μ κ·Όνλ λ‘μ§μ μννλ€.

### πͺ νμ κ°μ²΄ λ€μ΄μ΄κ·Έλ¨ (λμ )
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/νμκ°μ²΄λ€μ΄μ΄κ·Έλ¨.png" width="80%">

- κ°μ²΄κ° μ°Έμ‘° κ΄κ³λ₯Ό νννκ³  μλ€.
- ν΄λμ€κ° μ€μ  μ¬μ©νλ μΈμ€ν΄μ€λΌλ¦¬μ μ°Έμ‘° κ΄κ³μ΄λ€.

---

## π― νμ λλ©μΈ κ°λ°
### πͺ νμ μν°ν°
νμ μν°ν° κ°λ°μ μν΄ `member` λΌλ ν¨ν€μ§λ₯Ό μμ±νλ€.

**νμ λ±κΈ**
νμ λ±κΈ μ λ³΄λ₯Ό κ΄λ¦¬ν  `Grade` ν΄λμ€λ₯Ό λ§λλλ°, μ΄λ `Enum` ν΄λμ€λ‘ μμ±νλ€.

```java
package hello.core.member;

public enum Grade {
    BASIC,
    VIP
}
```

- νμ λ±κΈμ μΌλ°κ³Ό, VIPκ° μλ€.

**νμ μν°ν°**
νμ μν°ν° ν΄λμ€λ₯Ό μμ±νλ€.

```java
package hello.core.member;

public class Member {
    private long id;
    private String name;
    private Grade grade;

    public Member(long id, String name, Grade grade) {
        this.id = id;
        this.name = name;
        this.grade = grade;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Grade getGrade() {
        return grade;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }
}
```

- μμ±μμ Getter & Setterλ₯Ό μμ±νλ€.

### πͺ νμ μ μ₯μ
νμ μ μ₯μλ₯Ό λ΄λΉν  μΈν°νμ΄μ€μ κ΅¬ν ν΄λμ€λ₯Ό μμ±νλ€.
- μμ§ λ°μ΄ν°λ² μ΄μ€κ° νμ λμ§ μμ μ°μ  λ©λͺ¨λ¦¬ νμ μ μ₯μλ₯Ό μ¬μ©νλ€.

**νμ μ μ₯μ μΈν°νμ΄μ€**

```java
package hello.core.member;

public interface MemberRepository {

    void save(Member member);

    Member findById(Long memberId);
}
```

**λ©λͺ¨λ¦¬ νμ μ μ₯μ κ΅¬νμ²΄**

```java
package hello.core.member;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class MemoryMemberRepository implements MemberRepository {

    private static Map<Long, Member> store = new ConcurrentHashMap<>();

    @Override
    public void save(Member member) {
        store.put(member.getId(), member);
    }

    @Override
    public Member findById(Long memberId) {
        return store.get(memberId);
    }
}
```

- `HashMap` μ λμμ± μ΄μκ° λ°μν  μ μμ΄, `ConcurrentHashMap` μ μ¬μ©ν΄μΌ νλ€.

### πͺ νμ μλΉμ€
μ΄μ  νμ κ°μκ³Ό νμ μ‘°ν κΈ°λ₯μ κ΅¬νν  νμ μλΉμ€λ₯Ό μμ±νλ€.
- νμ μλΉμ€ μΈν°νμ΄μ€μ μ΄λ₯Ό κ΅¬νν  νμ μλΉμ€ κ΅¬νμ²΄λ₯Ό μμ±νλ€.

**νμ μλΉμ€ μΈν°νμ΄μ€**

```java
package hello.core.member;

public interface MemberService {
    
    void join(Member member);
    
    Member findMember(Long memberId);
}
```

**νμ μλΉμ€ κ΅¬νμ²΄**

```java
package hello.core.member;

public class MemberServiceImpl implements MemberService {
    
    private final MemberRepository memberRepository = new MemoryMemberRepository();
    
    @Override
    public void join(Member member) {
        memberRepository.save(member);
    }

    @Override
    public Member findMember(Long memberId) {
        return memberRepository.findById(memberId);
    }
}
```

- μμμ μμ±ν λ©λͺ¨λ¦¬ νμ μ μ₯μμ μ κ·Όν΄ νμ κ°μ λ° μ‘°νκ° κ°λ₯νκΈ°μ `MemberRepository` μΈν°νμ΄μ€κ° νμνλ€.
- κ·Έλ¦¬κ³  μ΄μ λν κ΅¬νμ²΄λ `MemoryMemberRepository` κ° λ΄λΉνκ³  μλ€.

---

## π― νμ λλ©μΈ μ€νκ³Ό νμ€νΈ
### πͺ νμ λλ©μΈ - νμ κ°μ main
νμ κ°μ κΈ°λ₯μ νμΈμ μν΄ `MemberApp` ν΄λμ€λ₯Ό μμ±νλ€.

```java
package hello.core;

import hello.core.member.Grade;
import hello.core.member.Member;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;

public class MemberApp {
    public static void main(String[] args) {
        MemberService memberService = new MemberServiceImpl();

        Member member = new Member(1L, "memberA", Grade.VIP);
        memberService.join(member);

        Member findMember = memberService.findMember(1L);
        System.out.println("new Member = " + member.getName());
        System.out.println("findMember = " + findMember.getName());
    }
}
```

- μ€ν κ²°κ³Όλ λμΌν `Member` μ μ΄λ¦μ΄ λμ¬ κ²μ΄λ€.

### πͺ νμ λλ©μΈ - νμ κ°μ test
κΈ°λ₯μ λν νμ€νΈλ₯Ό μμ κ°μ λ°©μμΌλ‘ νλ κ²μ λΉν¨μ¨μ μ΄κ³ , μ΄λ₯Ό μν΄ **JUnit**μ΄λΌλ νμ€νΈ νλ μμν¬λ₯Ό μ¬μ©νλ€.

```java
package hello.core.member;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

public class MemberServiceTest {

    MemberService memberService = new MemberServiceImpl();

    @Test
    void join() {
        // given
        Member member = new Member(1L, "memberA", Grade.VIP);

        // when
        memberService.join(member);
        Member findMember = memberService.findMember(1L);

        // then
        Assertions.assertThat(member).isEqualTo(findMember);
    }
}
```

### πͺ νμ λλ©μΈ μ€κ³μ λ¬Έμ μ 
- λ€λ₯Έ μ μ₯μλ‘ λ³κ²½ μ OCP μμΉμ μ μ€μνλκ°?
- DIPλ₯Ό μ μ§ν€κ³  μλκ°?
- μμ‘΄κ΄κ³κ° μΈν°νμ΄μ€ λΏλ§ μλλΌ κ΅¬νκΉμ§ λͺ¨λ μμ‘΄νλ λ¬Έμ μ μ΄ μλ€.
  - `MemberServiceImpl.class` μμ `private final MemberRepository memberRepository = new MemoryMemberRepository();`
  - μ£Όλ¬ΈκΉμ§ λ§λ€κ³ λμ λ¬Έμ μ κ³Ό ν΄κ²° λ°©μμ μ€λͺ

---

## π― μ£Όλ¬Έκ³Ό ν μΈ λλ©μΈ μ€κ³
### πͺ μ£Όλ¬Έκ³Ό ν μΈ μ μ±
- νμμ μνμ μ£Όλ¬Έν  μ μλ€.
- νμ λ±κΈμ λ°λΌ ν μΈ μ μ±μ μ μ©ν  μ μλ€.
- ν μΈ μ μ±μ λͺ¨λ  VIPλ 1000μμ ν μΈν΄μ£Όλ κ³ μ  κΈμ‘ ν μΈμ μ μ©ν΄λ¬λΌ. (λμ€μ λ³κ²½ λ  μ μλ€.)
- ν μΈ μ μ±μ λ³κ²½ κ°λ₯μ±μ΄ λλ€. νμ¬μ κΈ°λ³Έ ν μΈ μ μ±μ μμ§ μ νμ§ λͺ»νκ³ , μ€ν μ§μ κΉμ§ κ³ λ―Όμ λ―Έλ£¨κ³  μΆλ€. μ΅μμ κ²½μ° ν μΈμ μ μ©νμ§ μμ μ λ μλ€. (λ―Ένμ )

**μ£Όλ¬Έ λλ©μΈ νλ ₯, μ­ν , μ±μ**
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/μ£Όλ¬Έλλ©μΈνλ ₯μ­ν μ±μ.png" width="80%">

1. **μ£Όλ¬Έ μμ±**: ν΄λΌμ΄μΈνΈλ μ£Όλ¬Έ μλΉμ€μ μ£Όλ¬Έ μμ±μ μμ²­νλ€.
2. **νμ μ‘°ν**: ν μΈμ μν΄μλ νμ λ±κΈμ΄ νμνλ€. κ·Έλμ μ£Όλ¬Έ μλΉμ€λ νμ μ μ₯μμμ νμμ μ‘°ννλ€.
3. **ν μΈ μ μ©**: μ£Όλ¬Έ μλΉμ€λ νμ λ±κΈμ λ°λ₯Έ ν μΈ μ¬λΆλ₯Ό ν μΈ μ μ±μ μμνλ€.
4. **μ£Όλ¬Έ κ²°κ³Ό λ°ν**: μ£Όλ¬Έ μλΉμ€λ ν μΈ κ²°κ³Όλ₯Ό ν¬ν¨ν μ£Όλ¬Έ κ²°κ³Όλ₯Ό λ°ννλ€.

**μ£Όλ¬Έ λλ©μΈ μ μ²΄**
<img src="../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/μ£Όλ¬Έλλ©μΈμ μ²΄.png" width="80%">

- **μ­ν κ³Ό κ΅¬νμ λΆλ¦¬**νμ¬ κ΅¬ν κ°μ²΄λ₯Ό μμ λ‘­κ² μ‘°λ¦½ν  μ μλλ‘ νλ€.
  - νμ μ μ₯μμ ν μΈ μ μ±μ μ μ°ν λ³κ²½μ΄ κ°λ₯νλ€.

**μ£Όλ¬Έ λλ©μΈ ν΄λμ€ λ€μ΄μ΄κ·Έλ¨**
<img src="../images/../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/μ£Όλ¬Έλλ©μΈν΄λμ€λ€μ΄μ΄κ·Έλ¨.png" width="80%">

**μ£Όλ¬Έ λλ©μΈ κ°μ²΄ λ€μ΄μ΄κ·Έλ¨ 1**
<img src="../images/../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/μ£Όλ¬Έλλ©μΈκ°μ²΄λ€μ΄μ΄κ·Έλ¨1.png" width="80%">

- νμμ **λ©λͺ¨λ¦¬μμ μ‘°ν**νκ³ , **μ μ‘ ν μΈ μ μ±(κ³ μ  κΈμ‘)**μ μ§μν΄λ μ£Όλ¬Έ μλΉμ€λ₯Ό λ³κ²½νμ§ μμλ λλ€. 
- **μ­ν λ€μ νλ ₯ κ΄κ³λ₯Ό κ·Έλλ‘ μ¬μ¬μ©**ν  μ μλ€.

**μ£Όλ¬Έ λλ©μΈ κ°μ²΄ λ€μ΄μ΄κ·Έλ¨ 2**
<img src="../images/../../images/μ€νλ§ν΅μ¬μλ¦¬-κΈ°λ³ΈνΈ/μ£Όλ¬Έλλ©μΈκ°μ²΄λ€μ΄μ΄κ·Έλ¨2.png" width="80%">

- νμμ λ©λͺ¨λ¦¬κ° μλ **μ€μ  DBμμ μ‘°ν**νκ³ , **μ λ₯  ν μΈ μ μ±(μ£Όλ¬Έ κΈμ‘μ λ°λΌ % ν μΈ)**μ μ§μν΄λ μ£Όλ¬Έ μλΉμ€λ₯Ό λ³κ²½νμ§ μμλ λλ€.
- **νλ ₯ κ΄κ³λ₯Ό κ·Έλλ‘ μ¬μ¬μ©**ν  μ μλ€.

---

## π― μ£Όλ¬Έκ³Ό ν μΈ λλ©μΈ κ°λ°
### πͺ ν μΈ μ μ± μΈν°νμ΄μ€
```java
package hello.core.discount;

import hello.core.member.Member;

public interface DiscountPolicy {

    // @return ν μΈ λμ κΈμ‘
    int discount(Member member, int price);
}
```

- μ΄μ  μ΄λ₯Ό κ΅¬νν  μ μ‘ ν μΈ μ μ±κ³Ό μ λ₯  ν μΈ μ μ± ν΄λμ€λ₯Ό μμ±ν΄μΌ νλ€.

### πͺ μ μ‘ ν μΈ μ μ± κ΅¬νμ²΄
```java
package hello.core.discount;

import hello.core.member.Grade;
import hello.core.member.Member;

public class FixDiscountPolicy implements DiscountPolicy {
    
    // 1000μ ν μΈ
    private int discountFixAmount = 1000;
    
    @Override
    public int discount(Member member, int price) {
        if (member.getGrade() == Grade.VIP) return discountFixAmount;
        return 0;
    }
}
```

### πͺ μ£Όλ¬Έ μν°ν°

```java
package hello.core.order;

public class Order {

    private Long memberId;
    private String itemName;
    private int itemPrice;
    private int discountPrice;

    public Order(Long memberId, String itemName, int itemPrice, int discountPrice) {
        this.memberId = memberId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.discountPrice = discountPrice;
    }

    public int calculatePrice() {
        return itemPrice - discountPrice;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public int getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(int itemPrice) {
        this.itemPrice = itemPrice;
    }

    public int getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(int discountPrice) {
        this.discountPrice = discountPrice;
    }

    @Override
    public String toString() {
        return "Order{" +
                "memberId=" + memberId +
                ", itemName='" + itemName + '\'' +
                ", itemPrice=" + itemPrice +
                ", discountPrice=" + discountPrice +
                '}';
    }
}
```

- `System.out.println("Order : " + order)` λ‘ `Order` κ°μ²΄λ₯Ό μΆλ ₯ν΄λ³΄λ©΄, μ¬μ€μ `Order` κ°μ²΄μ `toString()` μ΄ νΈμΆλλ€!

### πͺ μ£Όλ¬Έ μλΉμ€ μΈν°νμ΄μ€
```java
package hello.core.order;

public interface OrderService {
    Order createOrder(Long memberId, String itemName, int itemPrice);
}
```

### πͺ μ£Όλ¬Έ μλΉμ€ κ΅¬νμ²΄
```java
package hello.core.order;

import hello.core.discount.DiscountPolicy;
import hello.core.discount.FixDiscountPolicy;
import hello.core.member.Member;
import hello.core.member.MemberRepository;
import hello.core.member.MemoryMemberRepository;

public class OrderServiceImpl implements OrderService {

    // νμμ μ°ΎκΈ° μν΄ νμ
    private final MemberRepository memberRepository = new MemoryMemberRepository();

    // ν μΈ μ μ± μ¬μ©μ μν΄ νμ
    private final DiscountPolicy discountPolicy = new FixDiscountPolicy();

    @Override
    public Order createOrder(Long memberId, String itemName, int itemPrice) {
        Member member = memberRepository.findById(memberId);
        // ν μΈμ λν΄μλ createOrderλ μμ μμ§ λͺ»ν¨, λ¨μΌ μ±μ μμΉμ μ μ§ν¨ μ
        int discountPrice = discountPolicy.discount(member, itemPrice);
        
        return new Order(memberId, itemName, itemPrice, discountPrice);
    }
}
```

- μ£Όλ¬Έ μμ±μ μν΄, νμμ μ°ΎμμΌ νκ³ , ν μΈ μ μ±μ μ¬μ©ν΄μΌ νλ€.
  - λ°λΌμ `MemberRepository` μ `DiscountPolicy` κ° νμνλ€.
- `createOrder` λ©μλμμ, 
  - νμ μ λ³΄λ₯Ό μ‘°ννκ³ ,
  - ν μΈ μ μ±μ μ μ©ν λ€μ,
  - μ£Όλ¬Έ κ°μ²΄λ₯Ό μμ±ν΄ λ°ννλ€.
- μ΄λ ν μΈμ λν΄μλ `createOrder` λ μμ§ λͺ»νκ³ , `discountPolicy` μμ μ΄λ₯Ό μ±μμ§λ€. 
  - μ΄λ **λ¨μΌ μ±μ μμΉ (Single Responsibility Principle)** μ΄ μ μ§μΌμ§ μλ€.

---

## π― μ£Όλ¬Έκ³Ό ν μΈ λλ©μΈ μ€νκ³Ό νμ€νΈ
### πͺ μ£Όλ¬Έκ³Ό ν μΈ μ μ± μ€ν
```java
package hello.core;

import hello.core.member.Grade;
import hello.core.member.Member;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import hello.core.order.Order;
import hello.core.order.OrderService;
import hello.core.order.OrderServiceImpl;

public class OrderApp {

    public static void main(String[] args) {
        MemberService memberService = new MemberServiceImpl();
        OrderService orderService = new OrderServiceImpl();

        Long memberId = 1L;
        Member member = new Member(memberId, "memberA", Grade.VIP);
        memberService.join(member);

        Order order = orderService.createOrder(memberId, "itmeA", 10000);

        System.out.println("Order = " + order);
    }
}
```

```java
// κ²°κ³Όλ λ€μκ³Ό κ°λ€.
Order = Order{memberId=1, itemName='itmeA', itemPrice=10000, discountPrice=1000}
```

### πͺ μ£Όλ¬Έκ³Ό ν μΈ μ μ± νμ€νΈ
JUnit νλ μμν¬λ₯Ό μ¬μ©ν΄ νμ€νΈνλ€.

```java
package hello.core.order;

import hello.core.member.Grade;
import hello.core.member.Member;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

public class OrderServiceTest {

    MemberService memberService = new MemberServiceImpl();
    OrderService orderService = new OrderServiceImpl();

    @Test
    void createOrder() {
        Long memberId = 1L;
        Member member = new Member(memberId, "memberA", Grade.VIP);
        memberService.join(member);

        Order order = orderService.createOrder(memberId, "itmeA", 10000);

        Assertions.assertThat(order.getDiscountPrice()).isEqualTo(1000);
    }
}
```

## π μ€μν κ°λ
μ€κ³, κ°μ²΄ μ§ν₯μ μν μμΉ μ€μ, νμ€νΈ

## π μ°Έκ³ 
- [μ€νλ§ ν΅μ¬ μλ¦¬ - κΈ°λ³ΈνΈ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8/dashboard)
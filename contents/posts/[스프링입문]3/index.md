---
title: "๐บ 3. ํ์ ๊ด๋ฆฌ ์์ "
description: "์คํ๋ง ์๋ฌธ ๊ฐ์ ์ ๋ฆฌ"
date: 2022-01-04
update: 2022-01-04
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

## ๐ ๋น์ฆ๋์ค ์๊ตฌ์ฌํญ ์ ๋ฆฌ
- Data: ํ์ID, ์ด๋ฆ, ๋น๋ฐ๋ฒํธ, ์ ํ๋ฒํธ
- ๊ธฐ๋ฅ: ํ์ ๋ฑ๋ก, ์กฐํ

### โ ์ผ๋ฐ์ ์ธ ์น ์ดํ๋ฆฌ์ผ์ด์ ๊ณ์ธต ๊ตฌ์กฐ
<img src="https://images.velog.io/images/bsu1209/post/94fde566-c06f-429c-a30a-f32a22cb71c8/springboot-Page-2.drawio.png" width="80%">

- ์ปจํธ๋กค๋ฌ: ์น MVC์ ์ปจํธ๋กค๋ฌ
- ์๋น์ค: ํต์ฌ ๋น์ฆ๋์ค logic ๊ตฌํ (ex. ํ์์ ์ค๋ณต ๊ฐ์์ด ๋ถ๊ฐ, ...)
- ๋ฆฌํฌ์งํ ๋ฆฌ: DB์ ์ ๊ทผ, ๋๋ฉ์ธ ๊ฐ์ฒด๋ฅผ DB์ ์ ์ฅํ๊ณ  ๊ด๋ฆฌ
- ๋๋ฉ์ธ: ๋น์ฆ๋์ค ๋๋ฉ์ธ ๊ฐ์ฒด (ex. ํ์, ์ฃผ๋ฌธ ๋ฑ ์ฃผ๋ก DB์ ์ ์ฅ๋๊ณ  ๊ด๋ฆฌ๋จ)

**ํด๋์ค ์์กด ๊ด๊ณ**<br/>
<img src="https://images.velog.io/images/bsu1209/post/82163da4-621f-4b46-97d7-ce795b7713b0/springboot-Page-2.drawio%20(1).png" width="80%">

- ์์ง DB storage๊ฐ ์ ์ ๋์ง ์์๋ค๋ ๊ฐ์ ์ด๊ธฐ์, `interface` ๋ก ๊ตฌํ ํด๋์ค๋ฅผ ๋ณ๊ฒฝํ  ์ ์๋๋ก ์ค๊ณ
- Memory ๊ธฐ๋ฐ์ ๋ฐ์ดํฐ ์ ์ฅ์๋ฅผ ์ฌ์ฉํ์ฌ ๋งค์ฐ ๋จ์ํ ๊ตฌํ (๋์คํฌ๊ฐ ์๋ Main memory์ ๋ชจ๋  ๋ฐ์ดํฐ๋ฅผ ์ ์ฅํ๋ ๋ฐฉ์)

---

## ๐ ํ์ domain๊ณผ repository ๋ง๋ค๊ธฐ
### โ ํ์ domain ์์ฑ
`src/main/java/hello.hellospring/domain` ๋ผ๋ ์๋ก์ด Package ์์,
`Member` ๋ผ๋ ์๋ก์ด Class๋ฅผ ์์ฑํ๋ค.

`Member` class์ ์๊ตฌ์ฌํญ์์ ๋ช์ํ๋ ํ์๊ณผ ๊ด๋ จ๋ **Data**๋ฅผ ์ฒ๋ฆฌํ๊ธฐ ์ํด 
์๋์ ๊ฐ์ด ๋ณ์๋ค์ ์ ์ธํ๋ค. ๊ทธ๋ฆฌ๊ณ  ๊ฐ ๋ณ์์ ๋ํ **Getter & Setter** ๋ ์์ฑํ๋ค.

> Getter & Setter์ ํ์์ฑ: https://ecsimsw.tistory.com/387

```java
public class Member {
    private Long id;
    private String name;
    private int pwd;
    private String phone;
}
```

๊ทธ๋ฆฌ๊ณ , `src/main/java/hello.hellospring/repository` ๋ผ๋ Package๋ก ํ์ ๊ฐ์ฒด (= Member Class)๋ฅผ ์ ์ฅํ๊ณ  ์ด ์์ `MemberRepository` ๋ผ๋ **Interface** ๋ฅผ ์์ฑํ์ฌ ํ์๊ณผ ๊ด๋ จ๋ **๊ธฐ๋ฅ**๋ค์ ์ ์ธํ๋ค.

```java
package hello.hellospring.repository;
import hello.hellospring.domain.Member;
import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member save(Member member);
    Optional<Member> findById(Long id);
    Optional<Member> findByName(String name);
    Optional<Member> findByPhone(String phone);
    Optional<Member> findByPwd(int pwd);
    List<Member> findAll();
    Member drop();
}

```

> <strong>`Optional<>`</strong> ์ ๋ค์ ๋ช์๋ API๊ฐ ๊ฐ์ ธ์จ ๊ฐ์ฒด๊ฐ null์ผ ์๋, ์๋ ์๋ ์๋๋ฐ null์ธ ๊ฒฝ์ฐ๋ฅผ ๋๋นํด ์ด๋ฅผ ๊ฐ์ธ์ฃผ๋ Wrapper ์ญํ ์ ์ํํ๋ค. (JAVA 8์ ๋ด์ฅ๋ ๊ธฐ๋ฅ)
> - ๊ทธ๋์ `get()` method ์ฌ์ฉ ์, `isPresent()` ๋ฅผ ์ฌ์ฉํ์ฌ null ์ฌ๋ถ๋ฅผ ํ๋จํ๋ค.

- `save` ๋ก ์ ์ฅ์์ ํ์ ์ ๋ณด๊ฐ ์ ์ฅ
- ์ดํ ์๋ 4๊ฐ์ ๊ธฐ๋ฅ๋ค๋ก ์ ์ฅ๋ ํ์์ ๋ณด๋ฅผ ์กฐํํ๊ณ , `findAll` ์ ๋ชจ๋  ํ์์ ๋ณด๋ฅผ ๊ฐ์ ธ์ค๋ ๊ธฐ๋ฅ
- `drop` ์ ํ์ ์ ๋ณด ์ญ์ ์ฉ์ผ๋ก ๋ง๋ค์๋๋ฐ, ๋ฐ๋ผํ๋ฉด์ ๋ง๋ค์ด๋ณด๋ ค๋ ๊ธฐ๋ฅ

์ด์  ๊ตฌํ์ฒด๋ฅผ ๋ง๋ค๊ธฐ ์ํด, `repository` ์์ `MemoryMemberRepository` ๋ผ๋ Class๋ฅผ ์์ฑํ๋ค.

`public class MemoryMemberRepository implements MemberRepository` ํ ํ, `option + enter(return)` ํ์ฌ `implements method -> Ok` ํ๋ค.
๊ทธ๋ผ ์์ฑํ interface์ method๋ค์ **Override** ํ  ์ ์๋ค.

```java
import java.util.Map;

private static Map<Long, Member> store = new HashMap<>();
private static long sequence = 0L;
```

- `id` ๋ฅผ Key๋ก์ ์ฌ์ฉํ๊ธฐ ์ํด `Long` ์ผ๋ก ์ง์ ํด์ฃผ๊ณ , '0,1,2'์ ๊ฐ์ด Key ๊ฐ์ ์์ฑํด์ฃผ๋ `sequence` ๋ฅผ ์ ์ธํ๋ค.

**Map collection class**๋ Key์ value๋ฅผ ํ๋์ ์์ผ๋ก ์ ์ฅํ๋ ๋ฐฉ์์ ์ฌ์ฉํ๋ค. ์ด๋ Key๋ ์ค์ง์ ์ธ value๋ฅผ ์ฐพ๊ธฐ ์ํ ์ญํ ์ ํ๋ค. 
- entry์ ์ ์ฅ ์์๋ฅผ ๊ณ ๋ คํ์ง ์๊ณ ,
- Key๋ ์ค๋ณต์ด ํ์ฉ๋์ง ์๋๋ค.

`HashMap` ์ Key์ value๋ฅผ ๋ฌถ์ด ํ๋์ entry๋ก ์ ์ฅํ๋ค. ์ด๋ฆ ๊ทธ๋๋ก `Hash` ์๊ณ ๋ฆฌ์ฆ์ ์ฌ์ฉํ๊ธฐ์ ๋ฐ์ดํฐ์ ๊ฒ์ ์๋๊ฐ ๋น ๋ฅด๋ค.
- ์ญ์๋ Key๋ ์ค๋ณต์ด ๋ถ๊ฐ๋ฅํ๊ณ ,
- value๋ null์ด ๊ฐ๋ฅํ๋ค.

> ์ค๋ฌด์์๋ ์์ ๊ฐ์ **๊ณต์ ๋๋ ๋ณ์์ ๋ํ ๋์์ฑ ๋ฌธ์ **๋๋ฌธ์ `ConcurrentHashMap` & `AtomicLong` ๋ฑ์ ์ฌ์ฉํด์ผ ํ๋ค. ๋์์ฑ ์ ์ด์ ๊ด๋ จ๋ ์ฐธ๊ณ : https://devlog-wjdrbs96.tistory.com/269

**ํ์ ์ ๋ณด ์ ์ฅ (save)**<br/>
```java
public Member save(Member member) {
    member.setId(++sequence);
    store.put(member.getId(), member);
    return member;
}
```
- ๋จผ์  ํด๋น `Member` ๊ฐ์ฒด์ `id` ์ `sequence + 1` ํ ๊ฐ์ setting
	
    - 0, 1, 2, ... ์์ผ๋ก ์ ์ฅ
    - `id` ๋ ์ค๋ณต์ด ํ์ฉ๋์ง ์๋ ๊ณ ์ ํ ๊ฐ์ด์ด์ผ ํ๋ฏ๋ก ์์ ๊ฐ์ด ์ง์ ํ๋ค.
- `store` ์ ํด๋น `member` ์ `id` & `member` ๋ฅผ **Key & value** ์์ผ๋ก ์ ์ฅ

**ํ์ ์ ๋ณด ์กฐํ (Id)**<br/>
```java
public Optional<Member> findById(Long id) {
    return Optional.ofNullable(store.get(id));
}
```
- `store.get(id)` ๋ก ์ง์ ํ `id` ๋ฅผ ๊ฐ์ง๋ `member` ๊ฐ์ฒด๋ฅผ ๊ฐ์ ธ์ฌ ์ ์๋ค.
	
    - ํ์ง๋ง ์ง์ ํ `id` ๋ฅผ ๊ฐ์ง๋ `member` ๊ฐ ์๋ ๊ฒฝ์ฐ, ์ฆ `Null` ์ด ๋ฐํ๋  ์ ์๋๋ฐ, ์ด ๋ํ ํด๋ผ์ด์ธํธ์์ ์ฒ๋ฆฌํ  ์ ์๋๋ก ํ๊ธฐ ์ํ ์์์ด ํ์ํ๋ค.
    - ๋ฐ๋ผ์, **`Optional.ofNullable()`** ๋ฅผ ์ฌ์ฉํ์ฌ ๋ฐํ๋๋ ๊ฐ์ฒด๋ฅผ ๊ฐ์ธ์ค๋ค.
    
**ํ์ ์ ๋ณด ์กฐํ (Name)**<br/>
```java
public Optional<Member> findByName(String name) {
    return store.values().stream()
            .filter(member -> member.getName().equals(name))
            .findAny();
}
```
- `store` ์์ ํ๋ผ๋ฏธํฐ๋ก ์ ๋ฌ๋ฐ์ `name` ๊ณผ ๋์ผํ `name` ์ ๊ฐ์ง๋ `member` ๊ฐ์ฒด๋ฅผ ํ๋๋ผ๋ ์ฐพ์ผ๋ฉด (= `findAny()`) return ํ๋๋ก ํ๋ค.

**ํ์ ์ ๋ณด ์กฐํ (All)**<br/>
```java
public List<Member> findAll() {
    return new ArrayList<>(store.values());
}
```
- ์ ์ฒด ์ ๋ณด๋ฅผ ์กฐํํ๊ธฐ ์ํด์ `store` ์ ์๋ ๋ชจ๋  ๊ฐ๋ค์ ๊ฐ์ ธ์์ผ ํ๋ค.
- ์ด๋, `store.values()` ๋ก `store` ์ ์๋ ๋ชจ๋  `Member` ๋ค์ ๊ฐ์ ธ์จ๋ค.
- ๊ทผ๋ฐ, return ํ์ด `List` ์ด๋ฏ๋ก `store` ์ ์๋ ๊ฐ๋ค์ `ArrayList` ์ ๋ด์ ๋ฐํํ๋ค.

## ๐ ํ์ repository ํ์คํธ ์ผ์ด์ค ์์ฑ
์์์ ์์ฑํ ํ์ ์ ๋ณด API์ ๊ธฐ๋ฅ์ ํ์คํธํ๊ธฐ ์ํ Test case๋ฅผ ์์ฑ

- ๊ฐ๋ฐํ ๊ธฐ๋ฅ์ ํ์คํธํ  ๋ main method๋ฅผ ํตํด์ ์คํํ๊ฑฐ๋, ์น ์ ํ๋ฆฌ์ผ์ด์์ Controller๋ฅผ ํตํด ํด๋น ๊ธฐ๋ฅ์ ์คํํ๋ค. ์ด๋ฌํ ๋ฐฉ๋ฒ์ **์ค๋นํ๊ณ  ์คํํ๋๋ฐ ์ค๋ ๊ฑธ๋ฆฌ๊ณ , ๋ฐ๋ณต ์คํํ๊ธฐ ์ด๋ ต๊ณ  ์ฌ๋ฌ ํ์คํธ๋ฅผ ํ๋ฒ์ ์คํํ๊ธฐ ์ด๋ ต๋ค**๋ ๋จ์ ์ด ์๋ค. 
- ๋ฐ๋ผ์ ์ด๋ฌํ ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ๊ธฐ ์ํด, Java๋ **JUnit**์ด๋ผ๋ framework๋ก ํ์คํธ๋ฅผ ์คํํ๋ค.

`src/test/java/hello.hellospring/repository/MemoryMemberRepositoryTest` ๋ผ๋ ์๋ก์ด class๋ฅผ ์์ฑํ๋ค.

**save() Test**

```java
package hello.hellospring.repository;
import hello.hellospring.domain.Member;
import org.junit.jupiter.api.Test;

class MemoryMemberRepositoryTest {

    MemberRepository repository = new MemoryMemberRepository();

    @Test
    public void save() {
        Member member = new Member();
        member.setName("spring");

        repository.save(member);

        Member result = repository.findById(member.getId()).get();

        System.out.println("result = " + (result == member));
    }
}
```
- `@Test` ๋ฅผ ํตํด TEST ์ฝ๋์์ ๋ช์ํ๊ณ , ์๋ก์ด `Member` ๊ฐ์ฒด๋ฅผ ๋ง๋ ๋ค.
- ํด๋น ๊ฐ์ฒด์ Name์ setํ๊ณ , `save()` ๋ฅผ ์ํํ๋ค.
- ์ดํ ๊ธ๋ฐฉ `save` ํ `member` ์ `id` ์ ๋ณด๋ฅผ `findById` ๋ก ์ฐพ์๋ด์ด `result` ๋ผ๋ `Member` ๊ฐ์ฒด์ ์ ์ฅํ๋ค.
- ๋ ๊ฐ์ฒด๊ฐ ๊ฐ๋ค๋ฉด, ๊ทธ๋์ ๋ง์ง๋ง ์ถ๋ ฅ๋ฌธ์ `result = true` ๊ฐ ์ถ๋ ฅ๋๋ค๋ฉด, **`save` ๊ธฐ๋ฅ์ ํ์คํธ๋ ์ ์์ ์ผ๋ก ์๋ฃ๋ ๊ฒ์ด๋ค.**

ํ์ง๋ง, ๋งค๋ฒ ๋ ๊ฒฐ๊ณผ๊ฐ ๊ฐ์ ๋น๊ตํ๋ ๊ตฌ๋ฌธ์ผ๋ก๋ ๋ถํธํจ์ ๋๋ ์ ์๋ค.

```java
Assertions.assertEquals(member, result);
```
- `org.junit.jupiter.api` ์์ ์ ๊ณตํ๋ `Assertions` ๋ก expected, ์ฆ ๊ธฐ๋ํ๋ `result` ๊ฐ์ด, actual, `member` ์ ๋์ผํ์ง๋ฅผ ํ์ธํ๋ ์ฝ๋๋ก ํ์คํธ์ ๊ฒฐ๊ณผ๋ฅผ ํ์ธํ  ์ ์๋ค.
	
    - ํ์คํธํ๋ ๊ธฐ๋ฅ์ด ์ ์์ ์ผ๋ก ๋์ํ๋ค๋ฉด, ์๋ฌด๋ฐ ์ถ๋ ฅ๋ฌธ ์์ด ์ด๋ก์ ์ฒดํฌ๊ฐ ๋จ๊ณ ,
    - ๊ทธ๋ ์ง ์์ ๊ฒฝ์ฐ, ๊ธฐ๋๊ฐ๊ณผ ์ค์ ๊ฐ์ ๋ํ Error log๊ฐ ์ถ๋ ฅ๋๋ค.

๋ ๋ค๋ฅธ ๋ฐฉ๋ฒ์ผ๋ก๋,
```java
Assertions.assertThat(member).isEqualTo(result);
```
- `org.assertj.core.api` ์์ ์ ๊ณตํ๋ `Assertions` ๋ฅผ ์ฌ์ฉํ์ฌ ์์ ๊ฐ์ด ๊ฒฐ๊ณผ๋ฅผ ํ์ธํ๋ ๋ฐฉ๋ฒ์ด ์๋ค.
	
    - ์ด ์ญ์, ์์ ๋์ผํ ๊ฒฐ๊ณผ๋ฅผ ๋ณด์ธ๋ค.
    - ์ถ๊ฐ์ ์ผ๋ก, `Assertions` ์์ `option + enter(return)` โ `static import` ํ์ฌ ์ดํ์๋ `Assertions` ๋ฅผ ๋ช์ํ์ง ์๊ณ  ๋ฐ๋ก `assertThat` ๋ฅผ ์ฌ์ฉํ  ์ ์๋ค.

**findByName() Test**<br/>

```java
@Test
public void findByName() {
    Member member1 = new Member();
    member1.setName("spring1");
    repository.save(member1);

    Member member2 = new Member();
    member2.setName("spring2");
    repository.save(member2);

    Member result = repository.findByName("spring1").get();

    assertThat(result).isEqualTo(member1);
}
```
- `save()` ์ ๋ํ Test์ ๋์ผํ๊ฒ ์ํํ๋ค.

> **Test Class** ์์ฒด์ ๋ํ ์คํ์ผ๋ก ์ ์ฒด `@Test` method๋ค์ ํ ๋ฒ์ ์คํํ  ์ ์๋ค.

**findAll() Test**<br/>

```java
@Test
public void findAll() {
    Member member1 = new Member();
    member1.setName("spring1");
    repository.save(member1);

    Member member2 = new Member();
    member2.setName("spring2");
    repository.save(member2);

    Member member3 = new Member();
    member3.setName("spring3");
    repository.save(member3);

    List<Member> result = repository.findAll();

    assertThat(result.size()).isEqualTo(3);
}
```
- ๋์ผํ ๋ฐฉ๋ฒ์ผ๋ก Test๋ฅผ ์ํํ๋, `findAll` ์ด๋ฏ๋ก ๋ฐํํ์ด `List` ์ด๊ธฐ ๋๋ฌธ์ `result` ์ `size()` ์ ๋ํด ๋น๊ต๋ฅผ ์ํํ๋ค.

์ด์  **Class** ์ ์ฒด Test๋ฅผ ์คํํ๋ฉด ์๋ฌ๊ฐ ๋ฐ์ํ๊ณ  ์๋์ ๊ฐ์ด ๋ช์ํ ๊ฒ๊ณผ ์คํ ์์๊ฐ ๋ฌ๋ผ์ง ๊ฒ์ ํ์ธํ  ์ ์๋ค.

<img src="https://images.velog.io/images/bsu1209/post/2f2d4c44-a2dd-4a80-b640-66144e6e3a08/image.png" width="40%">

- ์คํ ์์๋ ๋ณด์ฅ๋์ง ์๊ธฐ ๋๋ฌธ์ `findAll` ์์ ์ด๋ฏธ `member1` & `member2` ๊ฐ์ฒด๋ฅผ ์์ฑํ์ฌ `findByName` ์์ ์๋ฌ๊ฐ ๋ฐ์ํ๋ ๊ฒ์ด๋ค.
- ๋ฐ๋ผ์, **๊ฐ `@Test` ๊ฐ ๋๋  ๋๋ง๋ค `repository` ๋ฅผ ๋น์์ค์ผ ํ๋ค.**

> **Test๋ ์๋ก ์์กด๊ด๊ณ ์์ด ์ค๊ณ๋์ด์ผ ํ๋ค!**

`MemoryMemberRepository` ์ store๋ฅผ ๋น์์ฃผ๋ method๋ฅผ ์ ์ธํ๋ค.

```java
@Override
public void clearStore() {
    store.clear();
}
```
์ดํ, Test์์ ๊ฐ `@Test` ๊ฐ ๋๋ ์ดํ ์ method๋ฅผ ์ํํ๊ธฐ ์ํด `@AfterEach` annotation์ ์ด์ฉํ๋ method๋ฅผ ์ ์ธํ๋ค.

```java
@AfterEach
public void afterEach() {
    repository.clearStore();
}
```
- ์ดํ Class ์ ์ฒด๋ฅผ ์คํํ๋ฉด ์๋ฌ ์์ด ์ ์ํ๋๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

> **ํ์คํธ ์ฃผ๋ ๊ฐ๋ฐ = TDD**
์์ ๊ฐ์ ํ์คํ ์ฝ๋๋ค์ ๋จผ์  ์ ์ธํ ํ, ๊ฐ๋ฐ์ ์งํํ๋ ๋ฐฉ์

---

## ๐ ํ์ ์๋น์ค ๊ฐ๋ฐ
์ค์  ๋น์ฆ๋์ค ๋ก์ง์ ์์ฑํ๋ ๋ถ๋ถ, 
์๋น์ค ๋ถ๋ถ์์๋ **๋น์ฆ๋์ค์ ์ธ ์ฉ์ด**๋ค๋ก Method๋ฅผ ๊ตฌํํด์ผ ๊ธฐ๋ฅ ์ ์ง ๋ณด์ ์, ์๋ฏธ์ ๋งค์นญ์ด ์ ๋๋ค. (์๋น์ค๋ ๋น์ฆ๋์ค๋ฅผ ์ฒ๋ฆฌํ๋ ์ญํ !)

`src/main/java/hello.hellospring/service/MemberService`

### โ ํ์ ๊ฐ์ ๊ธฐ๋ฅ
```java
private final MemberRepository memberRepository = new MemoryMemberRepository();

    // ํ์ ๊ฐ์
    public Long join(Member member) {
        // ๊ฐ์ ์ด๋ฆ์ธ ์ค๋ณตํ์์ ๋ถ๊ฐ๋ฅํด์ผ ํจ
        Optional<Member> result = memberRepository.findByName(member.getName());
        result.ifPresent(m -> {
            throw new IllegalStateException("์ด๋ฏธ ์กด์ฌํ๋ ํ์์๋๋ค.");
        });

        memberRepository.save(member);
        return member.getId();
    }
```
- ๋น์ฆ๋์ค ๋ก์ง์์, ์ค๋ณต๋ ์ด๋ฆ์ด ์กด์ฌํ๋ ๊ฒฝ์ฐ ํ์๊ฐ์์ด ๋ถ๊ฐ๋ฅํด์ผ ํ๊ธฐ์, ์ด๋ฏธ ์์ฑํ `findByName` method๋ก ์ด๋ฆ์ ์ฌ๋ถ๋ฅผ ํ์ธํ๋ค.
- ์ด๋ฆ์ด ์๋ ๊ฒฝ์ฐ์๋ง `save` method๋ก ํ์๊ฐ์์ด ๊ฐ๋ฅํ๊ฒ ํ๊ณ , ํด๋น ํ์์ `id` ๋ฅผ ๋ฐํํ๋ค.

์์ ์ฝ๋๋ฅผ `Control + T` ๋จ์ถํค๋ฅผ ์ด์ฉํด ๋ฆฌํฉํ ๋ง๊ณผ ๊ด๋ จ๋ ๊ธฐ๋ฅ์ ์ฌ์ฉํ  ์ ์๊ณ , `Extract Method` ํ์ฌ ์๋์ ๊ฐ์ ํํ๋ก ๋ณํํ  ์ ์๋ค.

```java
public Long join(Member member) {
    // ๊ฐ์ ์ด๋ฆ์ธ ์ค๋ณตํ์์ ๋ถ๊ฐ๋ฅํด์ผ ํจ
    ValidateDuplicateMember(member); // ์ด๋ฆ ์ค๋ณต ํ์ ๊ฒ์ฆ

    memberRepository.save(member);
    return member.getId();
}

private void ValidateDuplicateMember(Member member) {
    memberRepository.findByName(member.getName())
        .ifPresent(m -> {
            throw new IllegalStateException("์ด๋ฏธ ์กด์ฌํ๋ ํ์์๋๋ค.");
        });
}
```

### โ ํ์ ์กฐํ ๊ธฐ๋ฅ
```java
// ์ ์ฒด ํ์ ์กฐํ
public List<Member> findMembers() {
     return memberRepository.findAll();
}
    
// ํน์  ํ์ ์กฐํ
public Optional<Member> findOne(Long memberId) {
    return memberRepository.findById(memberId);
}
```

---

## ๐ ํ์ ์๋น์ค ํ์คํธ
์์์ ๊ตฌํํ ํ์ ์๋น์ค์ ๋ํ ํ์คํธ๋ฅผ ์ํ, `command + shift + T` ๋จ์ถํค๋ฅผ ์ด์ฉํด ์์ฝ๊ฒ Test๋ฅผ ์์ฑํ  ์ ์๋ค.

<img src="https://images.velog.io/images/bsu1209/post/a746a9db-6f7a-4409-849d-b7399999460c/image.png" width="70%">

```java
@Test
void ํ์๊ฐ์() {
    // given
    // when
    // then
}
```
- Test ์ฝ๋๋ ๊ณผ๊ฐํ๊ฒ ํ๊ธ๋ก ๋ฐ๊ฟ๋ ์๊ด์ด ์๋ค. ์ค์  build ๋  ๋, ํ์คํธ ์ฝ๋๋ ํฌํจ๋์ง ์๊ธฐ ๋๋ฌธ์ด๋ค.
- ๊ทธ๋ฆฌ๊ณ  Test๋ **given, when, then** ์ด๋ผ๋ ํฐ ํ๋ก ์ค๊ณํ  ์ ์๋ค.
    - given: ์ฃผ์ด์ง๋ data
    - when: ์ด๋ฅผ ์คํํ์ ๋
    - then: ๋์์ผ ํ๋ ๊ฒฐ๊ณผ

```java
@Test
void ํ์๊ฐ์() {
    // given
    Member member = new Member();
    member.setName("hello");

    // when
    Long saveId = memberService.join(member);

    // then
    Member findMember = memberService.findOne(saveId).get();
    assertThat(member.getName()).isEqualTo(findMember.getName());
}
```
- `then` part ์์, ์์์ `join` ํ๊ณ  ๋ฐํ๋ `id` ๋ฅผ ๊ฐ์ง๊ณ  `findOne` method๋ฅผ ์คํ
- ํ์๊ฐ์์ด ์ ์ ๋์ํ๋ค๋ฉด, `member` ๊ฐ์ฒด์ `Name` ๊ณผ `findOne` ์ ๋ฐํ ๊ฐ์ฒด์ธ `findMember` ์ `Name` ์ด ๋์ผํ  ๊ฒ์ด๋ค.

์์ Test code๋ ์ฌ์ค์ **๋ฐ์ชฝ์ง๋ฆฌ Test code** ์ด๋ค.
- ์๋ํ๋ฉด, **Test๋ ์์ธ์ ๋ํด์๋ ์ํ๋์ด์ผ ํ๊ธฐ ๋๋ฌธ**์ด๋ค. (๊ทธ๋ฆฌ๊ณ  `service` ์ ์ค๋ณตํ์์ฒดํฌ method๋ ์๊ธฐ ๋๋ฌธ์ ํด๋น Test๋ ํ์ํ๋ค.)

```java
@Test
public void ์ค๋ณต_ํ์_์์ธ() {
    // given
    Member member1 = new Member();
    member1.setName("spring");

    Member member2 = new Member();
    member2.setName("spring");

    // when
    memberService.join(member1);
    try {
        memberService.join(member2);
        fail();
    } catch (IllegalStateException e) {
        assertThat(e.getMessage()).isEqualTo("์ด๋ฏธ ์กด์ฌํ๋ ํ์์๋๋ค.");
    }

    // then
}
```
- ๊ฐ์ ์ด๋ฆ์ ๊ฐ์ง ๋ ํ์์ ์์ฑํ๊ณ  ๊ฐ๊ฐ `join` ์ ์ํํ๋ ค ํ๋ค.
- `try - catch` ๊ตฌ๋ฌธ์ผ๋ก, ๋ฐ์ํ Exception์ message๋ฅผ ๋น๊ตํ์ฌ Test๋ฅผ ์ํํ๋ค.

ํ์ง๋ง, ๋ค๋ฅธ ๋ฌธ๋ฒ์ผ๋ก ๋ ๊น๋ํ๊ฒ Test๋ฅผ ์ํํ  ์ ์๋ค.

```java
assertThrows(IllegalStateException.class, () -> memberService.join(member2));
```

- **`assertThrows`** ๋ฅผ ์ด์ฉํด `() -> memberService.join(member2)` ๊ฐ ์ํ๋  ๋, `IllegalStateException` ์์ธ๊ฐ ๋ฐ์ํด์ผ ํจ์ ๋ช์ํ๋ค.

```java
IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(member2));
assertThat(e.getMessage()).isEqualTo("์ด๋ฏธ ์กด์ฌํ๋ ํ์์๋๋ค.");
```

- `asserThrows` ๋ ๋ฐํ์ด ๊ฐ๋ฅ(`command + option + V` ๋ก ๋ฐํ๋ฐ์ ๊ฐ์ฒด ์ ์ธ)ํ๊ธฐ์, Exception message์ ๋ํ ๊ฒ์ฆ๋ ๊ฐ๋ฅํ๋ค.

์ด์ ์ Test์ ๋์ผํ๊ฒ, ์คํ ์์๊ฐ ๋ณด์ฅ๋์ง ์์ ์๋ฌ๊ฐ ๋ฐ์ํ  ์ ์๋ค.
์ด๋ฅผ ์ํด ์ด์ ์๋ `@AfterEach` ๋ก `MemoryMemberRepository` ์์ ์์ฑํ `clearStore` method๋ฅผ ์ฌ์ฉํ์๋ค.

```java
MemberService memberService = new MemberService();
MemoryMemberRepository memberRepository = new MemoryMemberRepository();
    
@AfterEach
public void afterEach() {
    memberRepository.clearStore();
}
```

**`MemberService` ์์๋ `MemoryMemberRepository` ๊ฐ์ฒด๋ฅผ ์ ์ธํ์ฌ ์ฌ์ฉํ๋๋ฐ, ์ ์ฝ๋์์๋ ํ ๋ฒ ๋ ํด๋น ๊ฐ์ฒด๋ฅผ ์์ฑํ์ฌ ์ฌ์ฉํ๊ณ  ์๋ค.**

์ฆ, `MemberService` ์์ ์ฌ์ฉํ๋ `MemoryMemberRepository` ์ `MemberServiceTest` ์์ ์ฌ์ฉํ๋ `MemoryMemberRepository` ๋ ์๋ก ๋ค๋ฅธ ๊ฐ์ฒด๋ฅผ ์์ฑํ์ฌ ์ฌ์ฉํ๊ธฐ์, `MemoryMemberRepository` ์์ `Map<> store` ๊ฐ Class์ ์ข์์ ์ธ `static` ์ด ์๋๋ผ๋ฉด ๊ฐ์ฒด ์์ฑ๋ง๋ค ๋ค๋ฅธ DB๊ฐ ๋์ด๋ฒ๋ ค ์ํ๋ ๊ฒฐ๊ณผ๋ฅผ ์ป์ ์ ์๊ฒ ๋๋ค.

`MemberService.java`
```java
private final MemberRepository memberRepository = new MemoryMemberRepository();

โ

private final MemberRepository memberRepository;

public MemberService(MemberRepository memberRepository) {
    this.memberRepository = memberRepository;
}
```

- Contructor๋ฅผ ์์ฑํ์ฌ ์ง์  `new` ๋ก ์์ฑํ์ง ์๊ณ , **์ธ๋ถ์์ ์ ๋ฌํด์ฃผ๋๋ก ๋ณ๊ฒฝ**

`MemberServiceTest.java`
```java
MemberService memberService;
MemoryMemberRepository memberRepository;

@BeforeEach
public void beforeEach() {
    memberRepository = new MemoryMemberRepository();
    memberService = new MemberService(memberRepository);
}
```

- `BeforeEach` annotation์ผ๋ก, ๊ฐ Test Method๊ฐ ์ํ๋๊ธฐ ์ ์ `MemoryMemberRepsotiory` ๋ฅผ ์์ฑํ๊ณ  ์ด๋ฅผ `MemberService` ์ ์ ๋ฌํ์ฌ ์ฌ์ฉํจ์ผ๋ก์จ, ๊ฐ์ Repository๋ฅผ ์ฌ์ฉํ  ์ ์๊ฒ ํ๋ค.

์ด๋ฅผ **Dependency Injection (์์กด์ฑ ์ฃผ์)** ์ด๋ผ๊ณ  ํ๋ค.

---

## ๐ ์ค์ํ ๊ฐ๋
Optional, Test, Dependency Injection

## ๐ ์ฐธ๊ณ 
- [์คํ๋ง ์๋ฌธ-์ฝ๋๋ก ๋ฐฐ์ฐ๋ ์คํ๋ง ๋ถํธ, ์น MVC, DB ์ ๊ทผ ๊ธฐ์ ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)
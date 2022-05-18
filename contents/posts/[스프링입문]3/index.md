---
title: "📺 3. 회원 관리 예제"
description: "스프링 입문 강의 정리"
date: 2022-01-04
update: 2022-01-04
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

## 🔍 비즈니스 요구사항 정리
- Data: 회원ID, 이름, 비밀번호, 전화번호
- 기능: 회원 등록, 조회

### ⛏ 일반적인 웹 어플리케이션 계층 구조
<img src="https://images.velog.io/images/bsu1209/post/94fde566-c06f-429c-a30a-f32a22cb71c8/springboot-Page-2.drawio.png" width="80%">

- 컨트롤러: 웹 MVC의 컨트롤러
- 서비스: 핵심 비즈니스 logic 구현 (ex. 회원은 중복 가입이 불가, ...)
- 리포지토리: DB에 접근, 도메인 객체를 DB에 저장하고 관리
- 도메인: 비즈니스 도메인 객체 (ex. 회원, 주문 등 주로 DB에 저장되고 관리됨)

**클래스 의존 관계**<br/>
<img src="https://images.velog.io/images/bsu1209/post/82163da4-621f-4b46-97d7-ce795b7713b0/springboot-Page-2.drawio%20(1).png" width="80%">

- 아직 DB storage가 선정되지 않았다는 가정이기에, `interface` 로 구현 클래스를 변경할 수 있도록 설계
- Memory 기반의 데이터 저장소를 사용하여 매우 단순한 구현 (디스크가 아닌 Main memory에 모든 데이터를 저장하는 방식)

---

## 🔍 회원 domain과 repository 만들기
### ⛏ 회원 domain 생성
`src/main/java/hello.hellospring/domain` 라는 새로운 Package 안에,
`Member` 라는 새로운 Class를 생성한다.

`Member` class에 요구사항에서 명시했던 회원과 관련된 **Data**를 처리하기 위해 
아래와 같이 변수들을 선언한다. 그리고 각 변수에 대한 **Getter & Setter** 도 생성한다.

> Getter & Setter의 필요성: https://ecsimsw.tistory.com/387

```java
public class Member {
    private Long id;
    private String name;
    private int pwd;
    private String phone;
}
```

그리고, `src/main/java/hello.hellospring/repository` 라는 Package로 회원 객체 (= Member Class)를 저장하고 이 안에 `MemberRepository` 라는 **Interface** 를 생성하여 회원과 관련된 **기능**들을 선언한다.

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

> <strong>`Optional<>`</strong> 은 뒤에 명시된 API가 가져온 객체가 null일 수도, 아닐 수도 있는데 null인 경우를 대비해 이를 감싸주는 Wrapper 역할을 수행한다. (JAVA 8에 내장된 기능)
그래서 `get()` method 사용 시, `isPresent()` 를 사용하여 null 여부를 판단한다.

- `save` 로 저장소에 회원 정보가 저장
- 이후 아래 4개의 기능들로 저장된 회원정보를 조회하고, `findAll` 은 모든 회원정보를 가져오는 기능
- `drop` 은 회원 정보 삭제용으로 만들었는데, 따라하면서 만들어보려는 기능

이제 구현체를 만들기 위해, `repository` 안에 `MemoryMemberRepository` 라는 Class를 생성한다.

`public class MemoryMemberRepository implements MemberRepository` 한 후, `option + enter(return)` 하여 `implements method -> Ok` 한다.
그럼 생성한 interface의 method들을 **Override** 할 수 있다.

```java
import java.util.Map;

private static Map<Long, Member> store = new HashMap<>();
private static long sequence = 0L;
```

- `id` 를 Key로서 사용하기 위해 `Long` 으로 지정해주고, '0,1,2'와 같이 Key 값을 생성해주는 `sequence` 를 선언한다.

> **Map collection class**는 Key와 value를 하나의 쌍으로 저장하는 방식을 사용한다. 이때 Key는 실질적인 value를 찾기 위한 역할을 한다. 
- entry의 저장 순서를 고려하지 않고,
- Key는 중복이 허용되지 않는다.
>
`HashMap` 은 Key와 value를 묶어 하나의 entry로 저장한다. 이름 그대로 `Hash` 알고리즘을 사용하기에 데이터의 검색 속도가 빠르다.
- 역시나 Key는 중복이 불가능하고,
- value는 null이 가능하다.
>
실무에서는 위와 같은 공유되는 변수에 대한 동시성 문제때문에 `ConcurrentHashMap` & `AtomicLong` 등을 사용해야 한다. 동시성 제어와 관련된 참고: https://devlog-wjdrbs96.tistory.com/269

**회원 정보 저장 (save)**<br/>
```java
public Member save(Member member) {
    member.setId(++sequence);
    store.put(member.getId(), member);
    return member;
}
```
- 먼저 해당 `Member` 객체의 `id` 에 `sequence + 1` 한 값을 setting
	
    - 0, 1, 2, ... 순으로 저장
    - `id` 는 중복이 허용되지 않는 고유한 값이어야 하므로 위와 같이 지정한다.
- `store` 에 해당 `member` 의 `id` & `member` 를 **Key & value** 쌍으로 저장

**회원 정보 조회 (Id)**<br/>
```java
public Optional<Member> findById(Long id) {
    return Optional.ofNullable(store.get(id));
}
```
- `store.get(id)` 로 지정한 `id` 를 가지는 `member` 객체를 가져올 수 있다.
	
    - 하지만 지정한 `id` 를 가지는 `member` 가 없는 경우, 즉 `Null` 이 반환될 수 있는데, 이 또한 클라이언트에서 처리할 수 있도록 하기 위한 작업이 필요하다.
    - 따라서, **`Optional.ofNullable()`** 를 사용하여 반환되는 객체를 감싸준다.
    
**회원 정보 조회 (Name)**<br/>
```java
public Optional<Member> findByName(String name) {
    return store.values().stream()
            .filter(member -> member.getName().equals(name))
            .findAny();
}
```
- `store` 에서 파라미터로 전달받은 `name` 과 동일한 `name` 을 가지는 `member` 객체를 하나라도 찾으면 (= `findAny()`) return 하도록 한다.

**회원 정보 조회 (All)**<br/>
```java
public List<Member> findAll() {
    return new ArrayList<>(store.values());
}
```
- 전체 정보를 조회하기 위해서 `store` 에 있는 모든 값들을 가져와야 한다.
- 이때, `store.values()` 로 `store` 에 있는 모든 `Member` 들을 가져온다.
- 근데, return 형이 `List` 이므로 `store` 에 있는 값들을 `ArrayList` 에 담아 반환한다.

## 🔍 회원 repository 테스트 케이스 작성
위에서 생성한 회원 정보 API의 기능을 테스트하기 위한 Test case를 작성

- 개발한 기능을 테스트할 때 main method를 통해서 실행하거나, 웹 애플리케이션의 Controller를 통해 해당 기능을 실행한다. 이러한 방법은 **준비하고 실행하는데 오래 걸리고, 반복 실행하기 어렵고 여러 테스트를 한번에 실행하기 어렵다**는 단점이 있다. 
- 따라서 이러한 문제를 해결하기 위해, Java는 **JUnit**이라는 framework로 테스트를 실행한다.

`src/test/java/hello.hellospring/repository/MemoryMemberRepositoryTest` 라는 새로운 class를 생성한다.

**save() Test**<br/>

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
- `@Test` 를 통해 TEST 코드임을 명시하고, 새로운 `Member` 객체를 만든다.
- 해당 객체의 Name을 set하고, `save()` 를 수행한다.
- 이후 금방 `save` 한 `member` 의 `id` 정보를 `findById` 로 찾아내어 `result` 라는 `Member` 객체에 저장한다.
- 두 객체가 같다면, 그래서 마지막 출력문에 `result = true` 가 출력된다면, **`save` 기능의 테스트는 정상적으로 완료된 것이다.**

하지만, 매번 두 결과가 같은 비교하는 구문으로는 불편함을 느낄 수 있다.

```java
Assertions.assertEquals(member, result);
```
- `org.junit.jupiter.api` 에서 제공하는 `Assertions` 로 expected, 즉 기대하는 `result` 값이, actual, `member` 와 동일한지를 확인하는 코드로 테스트의 결과를 확인할 수 있다.
	
    - 테스트하는 기능이 정상적으로 동작한다면, 아무런 출력문 없이 초록색 체크가 뜨고,
    - 그렇지 않은 경우, 기댓값과 실제값에 대한 Error log가 출력된다.

또 다른 방법으로는,
```java
Assertions.assertThat(member).isEqualTo(result);
```
- `org.assertj.core.api` 에서 제공하는 `Assertions` 를 사용하여 위와 같이 결과를 확인하는 방법이 있다.
	
    - 이 역시, 위와 동일한 결과를 보인다.
    - 추가적으로, `Assertions` 에서 `option + enter(return)` → `static import` 하여 이후에는 `Assertions` 를 명시하지 않고 바로 `assertThat` 를 사용할 수 있다.

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
- `save()` 에 대한 Test와 동일하게 수행한다.

> **Test Class** 자체에 대한 실행으로 전체 `@Test` method들을 한 번에 실행할 수 있다.

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
- 동일한 방법으로 Test를 수행하되, `findAll` 이므로 반환형이 `List` 이기 때문에 `result` 의 `size()` 에 대해 비교를 수행한다.

이제 **Class** 전체 Test를 실행하면 에러가 발생하고 아래와 같이 명시한 것과 실행 순서가 달라진 것을 확인할 수 있다.
<img src="https://images.velog.io/images/bsu1209/post/2f2d4c44-a2dd-4a80-b640-66144e6e3a08/image.png" width="40%">

- 실행 순서는 보장되지 않기 때문에 `findAll` 에서 이미 `member1` & `member2` 객체를 생성하여 `findByName` 에서 에러가 발생하는 것이다.
- 따라서, **각 `@Test` 가 끝날 때마다 `repository` 를 비워줘야 한다.**

> **Test는 서로 의존관계 없이 설계되어야 한다!**

`MemoryMemberRepository` 에 store를 비워주는 method를 선언한다.

```java
@Override
public void clearStore() {
    store.clear();
}
```
이후, Test에서 각 `@Test` 가 끝난 이후 위 method를 수행하기 위해 `@AfterEach` annotation을 이용하는 method를 선언한다.

```java
@AfterEach
public void afterEach() {
    repository.clearStore();
}
```
- 이후 Class 전체를 실행하면 에러 없이 잘 수행되는 것을 확인할 수 있다.

> **테스트 주도 개발 = TDD**
위와 같은 테스팅 코드들을 먼저 선언한 후, 개발을 진행하는 방식

---

## 🔍 회원 서비스 개발
실제 비즈니스 로직을 작성하는 부분, 
서비스 부분에서는 **비즈니스적인 용어**들로 Method를 구현해야 기능 유지 보수 시, 의미와 매칭이 잘 된다. (서비스는 비즈니스를 처리하는 역할!)

`src/main/java/hello.hellospring/service/MemberService`

### ⛏ 회원 가입 기능
```java
private final MemberRepository memberRepository = new MemoryMemberRepository();

    // 회원 가입
    public Long join(Member member) {
        // 같은 이름인 중복회원을 불가능해야 함
        Optional<Member> result = memberRepository.findByName(member.getName());
        result.ifPresent(m -> {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        });

        memberRepository.save(member);
        return member.getId();
    }
```
- 비즈니스 로직에서, 중복된 이름이 존재하는 경우 회원가입이 불가능해야 하기에, 이미 생성한 `findByName` method로 이름의 여부를 확인한다.
- 이름이 없는 경우에만 `save` method로 회원가입이 가능하게 하고, 해당 회원의 `id` 를 반환한다.

위의 코드를 `Control + T` 단축키를 이용해 `Extract Method` 하여 아래와 같은 형태로 변환할 수 있다.

```java
public Long join(Member member) {
    // 같은 이름인 중복회원을 불가능해야 함
    ValidateDuplicateMember(member); // 이름 중복 회원 검증

    memberRepository.save(member);
    return member.getId();
}

private void ValidateDuplicateMember(Member member) {
    memberRepository.findByName(member.getName())
        .ifPresent(m -> {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        });
}
```

### ⛏ 회원 조회 기능
```java
// 전체 회원 조회
public List<Member> findMembers() {
     return memberRepository.findAll();
}
    
// 특정 회원 조회
public Optional<Member> findOne(Long memberId) {
    return memberRepository.findById(memberId);
}
```

---

## 🔍 회원 서비스 테스트
위에서 구현한 회원 서비스에 대한 테스트를 수행
`command + shift + T` 단축키를 이용해 손쉽게 Test를 작성할 수 있다.
<img src="https://images.velog.io/images/bsu1209/post/a746a9db-6f7a-4409-849d-b7399999460c/image.png" width="70%"><img src="https://images.velog.io/images/bsu1209/post/79061a99-b540-44d9-9fc9-6924ef2e3df0/image.png" width="40%">
- 위와 같이 **Test Package** 가 생성된 것을 확인할 수 있다.

```java
@Test
void 회원가입() {
    // given
    // when
    // then
}
```
- Test 코드는 과감하게 한글로 바꿔도 상관이 없다. 실제 build 될 때, 테스트 코드는 포함되지 않기 때문이다.
- 그리고 Test는 **given, when, then** 이라는 큰 틀로 설계할 수 있다.
	
    - given: 주어지는 data
    - when: 이를 실행했을 때
    - then: 나와야 하는 결과

```java
@Test
void 회원가입() {
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
- `then` part 에서, 위에서 `join` 하고 반환된 `id` 를 가지고 `findOne` method를 실행
- 회원가입이 정상 동작했다면, `member` 객체의 `Name` 과 `findOne` 의 반환 객체인 `findMember` 의 `Name` 이 동일할 것이다.

위의 Test code는 사실상 **반쪽짜리 Test code** 이다.
왜냐하면, Test는 예외에 대해서도 수행되어야 하기 때문이다. (그리고 `service` 에 중복회원체크 method도 있기 때문에 해당 Test도 필요하다.)

```java
@Test
public void 중복_회원_예외() {
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
    } catch(IllegalStateException e) {
        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
    }

    // then
}
```
- 같은 이름을 가진 두 회원을 생성하고 각각 `join` 을 수행하려 한다.
- `try - catch` 구문으로, 발생한 Exception의 message를 비교하여 Test를 수행한다.

하지만, 다른 문법으로 더 깔끔하게 Test를 수행할 수 있다.

```java
assertThrows(IllegalStateException.class, () -> memberService.join(member2));
```

- **`assertThrows`** 를 이용해 `() -> memberService.join(member2)` 가 수행될 때, `IllegalStateException` 예외가 발생해야 함을 명시한다.

```java
IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(member2));
assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
```

- `asserThrows` 는 반환이 가능(`command + option + V` 로 반환받을 객체 선언)하기에, Exception message에 대한 검증도 가능하다.

이전의 Test와 동일하게, 실행 순서가 보장되지 않아 에러가 발생할 수 있다.
이를 위해 이전에는 `@AfterEach` 로 `MemoryMemberRepository` 에서 생성한 `clearStore` method를 사용했었다.

```java
MemberService memberService = new MemberService();
MemoryMemberRepository memberRepository = new MemoryMemberRepository();
    
@AfterEach
public void afterEach() {
    memberRepository.clearStore();
}
```

**`MemberService` 에서도 `MemoryMemberRepository` 객체를 선언하여 사용하는데, 위 코드에서는 한 번 더 해당 객체를 생성하여 사용하고 있다.**

즉, `MemberService` 에서 사용하는 `MemoryMemberRepository` 와 `MemberServiceTest` 에서 사용하는 `MemoryMemberRepository` 는 서로 다른 객체를 생성하여 사용하기에, `MemoryMemberRepository` 에서 `Map<> store` 가 Class에 종속적인 `static` 이 아니라면 객체 생성마다 다른 DB가 되어버려 원하는 결과를 얻을 수 없게 된다.

`MemberService.java`
```java
private final MemberRepository memberRepository = new MemoryMemberRepository();

↓

private final MemberRepository memberRepository;

public MemberService(MemberRepository memberRepository) {
    this.memberRepository = memberRepository;
}
```

- Contructor를 생성하여 직접 `new` 로 생성하지 않고, **외부에서 전달해주도록 변경**

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

- `BeforeEach` annotation으로, 각 Test Method가 수행되기 전에 `MemoryMemberRepsotiory` 를 생성하고 이를 `MemberService` 에 전달하여 사용함으로써, 같은 Repository를 사용할 수 있게 한다.

이를 **Dependency Injection (의존성 주입)** 이라고 한다.

---

## 📌 중요한 개념
Optional, Test, Dependency Injection

## 📕 참고
- [스프링 입문-코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)
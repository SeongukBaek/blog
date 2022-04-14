---
title: "📚 3. 영속성 관리"
description: "JPA 책 정리"
date: 2022-03-06
update: 2022-03-08
tags:
  - Java
  - JPA
  - SpringBoot
series: "📚 ORM 표준 JPA"
---

<em>[자바 ORM 표준 JPA 프로그래밍 - 김영한]을 읽고 인용하고 정리하는 POST입니다.</em>

> JPA가 제공하는 기능은 크게 "엔티티와 테이블을 매핑하는 설계"와 "매핑한 엔티티를 실제 사용하는 부분"으로 나눌 수 있다.
> 이 장에서는 매핑한 엔티티를 엔티티 매니저를 통해 어떻게 사용하는지 알아본다.

엔티티 매니저는 **엔티티를 저장**하고, **수정**하고, **삭제**하고, **조회**하는 등 엔티티와 관련된 모든 일을 처리한다. 이전 장에서도 언급했듯, 개발자는 이를 **가상의 데이터베이스**라고 생각해도 무방하다.

## 💫 엔티티 매니저 팩토리와 엔티티 매니저
이전 장에서 언급했듯, 데이터베이스를 하나만 사용하는 애플리케이션은 일반적으로 `EntityManagerFactory` 를 하나만 생성하고, 이 작업은 비용이 많이 들기에 생성한 팩토리를 재사용(또는 공유)하는 방식으로 사용된다.

그리고 생성한 팩토리를 이용해 필요할 때마다 엔티티에 관련된 작업을 처리할 엔티티 매니저를 생성한다. 이 작업에 대한 비용은 거의 들지 않는다. 엔티티 매니저 팩토리와 엔티티 매니저를 비교하면 다음과 같다.

**엔티티 매니저 팩토리**
- 여러 스레드가 동시에 접근해도 안전하므로 서로 다른 스레드 간 공유가 가능

**엔티티 매니저**
- 여러 스레드가 동시에 접근하면 동시성 문제가 발생해 공유가 불가능

하나의 `EntityManagerFactory` 에서 다수의 엔티티 매니저를 생성한다. 엔티티 매니저는 **데이터베이스 연결이 꼭 필요한 시점까지 데이터베이스 커넥션을 얻지 않는다.** 
- 예를 들어, 트랜잭션을 시작할 때 커넥션을 획득해 데이터베이스와 연결해 작업을 처리한다.

Hibernate를 포함한 JPA 구현체들은 `EntityManagerFactory` 생성 시 커넥션 풀도 만드는데(`persistence.xml` 을 보면 데이터베이스 접속 정보가 있다.), 이는 J2SE 환경에서 사용하는 방법이다.
- JPA를 J2EE 환경(스프링 프레임워크 포함)에서 사용하면 해당 컨테이너가 제공하는 데이터소스를 사용한다.

## 💫 영속성 컨텍스트란?
Persistence Context, JPA를 이해하는데 가장 중요한 용어이다. 해석하자면, **"엔티티를 영구 저장하는 환경"**이라는 뜻이다. 엔티티 매니저로 엔티티를 저장하거나 조회하면 엔티티 매니저는 **영속성 컨텍스트에 엔티티를 보관하고 관리**한다.

```java
em.persist(member);
```
- 지금까지는 위 코드를 **단순히 회원 엔티티를 저장**한다고 표현했다.
- 정확히는 위 메소드는 **엔티티 매니저를 사용해서 회원 엔티티를 영속성 컨텍스트에 저장**한다.

영속성 컨텍스트는 논리적인 개념에 가깝고 눈에 보이지도 않아 직접 본 적은 없을 것이다. 
- 이는 엔티티 매니저를 생성할 때 하나 만들어지고, **매니저를 통해 접근하거나 관리**할 수 있다.

> 여러 엔티티 매니저가 동일한 영속성 컨텍스트에 접근할 수도 있다.

---

## 💫 엔티티의 생명주기
엔티티에는 4가지 상태가 존재한다.
- 비영속(new/transient) : 영속성 컨텍스트와 전혀 관계가 없는 상태
- 영속(managed) : 영속성 컨텍스트에 저장된 상태
- 준영속(detached) : 영속성 컨텍스트에 저장되었다가 분리된 상태
- 삭제(removed) : 삭제된 상태

<img src="https://ultrakain.gitbooks.io/jpa/content/chapter3/images/JPA_3_2.png" width="80%">

**비영속**<br/>
엔티티 객체를 생성했다. 순수한 객체 상태이며 아직 저장하지는 않아서 영속성 컨텍스트나 데이터베이스와는 전혀 관련이 없다. 이를 **비영속 상태**라 한다.

```java
Member member = new Member();
member.setId("member1");
memeber.setUsername("회원1");
```

**영속**<br/>
엔티티 매니저를 통해 영속성 컨텍스트에 저장했다. 이렇게 **영속성 컨텍스트가 관리하는 엔티티를 영속 상태**라 한다. 이제 엔티티의 상태가 비영속 → 영속 상태로 변경되었다. 

> 즉, 영속 상태라는 것은 **영속성 컨텍스트에 의해 관리된다는 뜻**이다.

그리고 `em.find()` 나 JPQL을 사용해서 조회한 엔티티도 영속성 컨텍스트가 관리하는 영속 상태이다.

```java
em.persist(member);
```

**준영속**<br/>
영속성 컨텍스트가 관리하던 **영속 상태의 엔티티를 영속성 컨텍스트가 관리하지 않으면 준영속 상태**가 된다. `em.detach()` 를 호출하여 준영속 상태로 만들 수 있다. `em.close()` 를 호출해서 영속성 컨텍스트를 닫거나, `em.clear()` 를 호출해 영속성 컨텍스트를 초기화해도 준영속 상태가 된다.

**삭제**<br/>
엔티티를 영속성 컨텍스트와 데이터베이스에서 삭제한다.

```java
em.remove(member);
```

---

## 💫 영속성 컨텍스트의 특징
**영속성 컨텍스트와 식별자 값**<br/>
영속성 컨텍스트는 엔티티를 식별자 값(`@Id` 로 테이블의 기본 키와 매핑한 값)으로 구분한다. 따라서, **영속 상태는 식별자 값이 반드시 있어야 한다.** 식별자 값이 없다면 **예외**가 발생한다.

**영속성 컨텍스트와 데이터베이스 저장**<br/>
영속성 컨텍스트에 엔티티를 저장하면 이 엔티티는 언제 데이터베이스에 저장될까? JPA는 보통 **트랜잭션을 커밋하는 순간** 영속성 컨텍스트에 새로 저장된 엔티티를 데이터베이스에 반영한다. 이를 **플러시(flush)**라고 한다.

**영속성 컨텍스트가 엔티티를 관리하면 다음과 같은 장점이 있다.**<br/>
- 1차 캐시
- 동일성 보장
- 트랜잭션을 지원하는 쓰기 지연
- 변경 감지
- 지연 로딩

### ➰ 엔티티 조회
영속성 컨텍스트는 내부에 캐시를 가지고 있는데 이것을 **1차 캐시**라 한다. 영속 상태의 엔티티는 모두 이곳에 저장된다. 

> 쉽게 말해, 영속성 컨텍스트 내부에 **`Map`** 이 하나 있는데 키는 **`@Id` 로 매핑한 식별자**고 값은 **엔티티 인스턴스**다.

```java
// 엔티티를 생성한 상태(비영속)
Member member = new Member();
member.setId("member1");
member.setUsername("회원1");

// 엔티티 영속
em.persist(member);
```
- 위 코드를 실행하면 1차 캐시에 회원 엔티티를 저장한다. 이는 아직 데이터베이스에는 저장되지 않은 상태이다.

1차 캐시의 키는 **식별자 값**이다. 그리고 이는 **데이터베이스 기본 키와 매핑**되어 있다. 따라서 영속성 컨텍스트에 데이터를 저장하고 조회하는 모든 기준은 데이터베이스 기본 값이다. 

이를 바탕으로, 엔티티를 조회해본다.

```java
Member member = em.find(Member.class, "member1");
```
- `find()` 메소드를 보면, 첫 번째 파라미터는 엔티티 클래스의 타입이고, 두 번째는 조회할 엔티티의 식별자 값이다.

```java
//EntityManager.find() 메소드의 정의
public <T> T find(Class<T> entityClass, Object primaryKey);
```
- `em.find()` 를 호출하면 먼저 1차 캐시에서 엔티티를 찾고 만약 없다면 데이터베이스에서 조회한다.

**1차 캐시에서 조회**<br/>
`em.find()` 를 호출하면 우선 1차 캐시에서 식별자 값으로 엔티티를 찾는다. 만약 있다면, 메모리에 있는 1차 캐시에서 엔티티를 조회한다.

다음은 1차 캐시에 있는 엔티티를 조회하는 코드이다.
```java
Member member = new Member();
member.setId("member1");
member.setUsername("회원1");

// 1차 캐시에 저장됨
em.persist(member);

// 1차 캐시에서 조회
Member findMember = em.find(Member.class, "member1");
```

**데이터베이스에서 조회**<br/>
`em.find()` 를 호출했는데 엔티티가 1차 캐시에 없으면 **엔티티 매니저는 데이터베이스를 조회해서 엔티티를 생성**한다. 그리고 **1차 캐시에 저장한 후 영속 상태의 엔티티를 반환**한다.

```java
Member findMember2 = em.find(Member.class, "member2");
```

1. `em.find(Member.class, "member2")` 를 실행한다.
2. `member2` 가 1차 캐시에 없으므로 데이터베이스에서 조회한다.
3. 조회한 데이터로 `member2` 엔티티를 생성해서 1차 캐시에 저장한다.(영속 상태)
4. 조회한 엔티티를 반환한다.

`member1` , `member2` 엔티티 인스턴스는 1차 캐시에 있다. 따라서 이 엔티티들을 조회하면 메모리에 있는 1차 캐시에서 바로 불러온다. 이렇게 캐시를 통한 성능상의 이점을 얻을 수 있다.

**영속 엔티티의 동일성 보장**<br/>
아래는 식별자가 같은 엔티티 인스턴스를 조회하여 비교하는 코드이다.

```java
Member a = em.find(Member.class, "member1");
Member b = em.find(Member.class, "member1");

System.out.println(a == b); // 동일성 비교
```
- `em.find(Member.class, "member1")` 를 반복해 호출해도 영속성 컨텍스트는 **1차 캐시에 있는 같은 엔티티 인스턴스를 반환**한다. 따라서 둘은 같은 인스턴스이므로 동일하다. 따라서 **영속성 컨텍스트는 성능상 이점과 엔티티의 동일성을 보장한다.**

> **동일성과 동등성**
> - 동일성(identity) : 실제 인스턴스가 같다. 따라서 참조 값을 비교하는 == 비교의 값이 같다.
> - 동등성(equality) : 실제 인스턴스는 다를 수 있지만 인스턴스가 가지고 있는 값이 같다. 자바에서 동등성 비교는 `equals()` 메소드를 구현해야 한다.

### ➰ 엔티티 등록
엔티티 매니저를 사용해 엔티티를 영속성 컨텍스트에 등록한다.

```java
EntityManager em = emf.createEntityManager();
EntityTransaction transaction = em.getTransaction();
// 엔티티 매니저는 데이터 변경 시 트랜잭션을 시작해야 한다.
transaction.begin();

em.persist(memberA);
em.persist(memberB);
// 1차 캐시에 엔티티 저장
// 여기까지 INSERT SQL을 데이터베이스에 보내지 않는다.

// 커밋하는 순간 데이터베이스에 INSERT SQL을 보낸다.
transaction.commit();
```
- 엔티티 매니저는 트랜잭션 커밋 직전까지 엔티티를 저장하지 않고, 내부 쿼리 저장소에 INSERT SQL들을 모아둔다. 그리고 커밋 시에 모아둔 쿼리를 데이터베이스로 보낸다.
  - 이를 **트랜잭션을 지원하는 쓰기 지연(Transactional write-behind)**이라 한다.
- 순서를 보면, 먼저 `memberA` 를 영속화했다. 영속성 컨텍스트는 **1차 캐시에 회원 엔티티를 저장**하면서 동시에 **회원 엔티티 정보로 등록 쿼리를 생성**한다.
- 그리고 만들어진 **등록 쿼리를 쓰기 지연 SQL 저장소에 보관**한다.
- 다음으로 `memberB` 를 영속화하면서, **쓰기 지연 SQL 저장소에는 등록 쿼리가 2건 저장**되었다.
- 마지막으로 **트랜잭션을 커밋**했다. 
  - 먼저 엔티티 매니저는 영속성 컨텍스트를 플러시한다.
  - 이는 영속성 컨텍스트의 변경 내용을 데이터베이스에 동기화하는 작업으로 이때, 엔티티들의 변경 사항을 데이터베이스에 반영한다.
  - 다른 말로는 쓰기 지연 SQL 저장소에 모인 쿼리들을 데이터베이스로 전달한다.
  - 플러시(동기화)를 마친 이후 실제 데이터베이스 트랜잭션을 커밋한다.

**트랜잭션을 지원하는 쓰기 지연이 가능한 이유**<br/>
로직을 2가지 경우로 생각해본다.

```java
begin(); // 트랜잭션 시작

save(A);
svae(B);
save(C);

commit(); // 트랜잭션 커밋
```
1. 데이터를 저장하는 즉시 등록 쿼리를 데이터베이스에 보낸다. `save()` 메소드를 호출할 때마다 즉시 데이터베이스에 등록 쿼리를 보내고 마지막에 트랜잭션을 커밋한다.
2. 데이터를 저장하면 등록 쿼리를 즉시 보내지 않고, 메모리에 모아둔다. 이후 트랜잭션 커밋 시에 모아둔 쿼리들을 데이터베이스에 보낸 후 커밋한다.

트랜잭션 범위 안에서 실행되기에 두 로직의 결과는 같다. 어떻게든 커밋 직전에만 데이터베이스에 SQL을 전달하면 되기에 트랜잭션을 지원하는 쓰기 지연이 가능한 이유이다.

### ➰ 엔티티 수정
**SQL 수정 쿼리의 문제점**<br/>
SQL을 사용하면 수정 쿼리를 직접 작성해야 한다. 프로젝트에 대한 요구사항이 늘어나게 되면, 수정 쿼리도 점점 추가된다. 아래는 회원의 이름과 나이를 변경하는 쿼리이다.

```sql
UPDATE MEMBER SET NAME=?, AGE=? WHERE id=?
```
- 회원의 이름과 나이를 변경하는 기능을 개발했는데 회원의 등급을 변경하는 기능이 추가되면 회원의 등급을 변경하는 다음 수정 쿼리를 추가로 작성한다.

```sql
UPDATE MEMBER SET GRADE=? WHERE id=?
```
- 이렇게 하거나, 둘을 합쳐 하나의 수정 쿼리만 사용해도 된다.
- 하지만 합친 쿼리를 사용해서 정보 변경 시 이름과 나이를 변경하는데 등급 정보를 미입력하거나, 등급을 변경하는데 실수로 이름과 나이를 미입력할 수도 있다. 결국 이런 상황을 피하기 위해 수정 쿼리를 상황에 따라 계속해서 추가한다.

> 이런 개발 방식의 문제점은 **수정 쿼리가 많아지는 것**은 물론이고 **비즈니스 로직을 분석하기 위해 SQL을 계속 확인**해야 한다. 결국 직접적이든 간접적이든 **비즈니스 로직이 SQL에 의존**하게 된다.

**변경 감지**<br/>
JPA는 엔티티를 어떻게 수정하는지 확인해본다.

```java
EntityManager em = emf.createEntityManager();
EntityTransactiont transaction = em.getTransaction();
transaction.begin();

Member memberA = em.find(Member.class, "memberA");

memberA.setUsername("hi");
memberA.setAge(10);

// em.update(member) 이런 코드가 없다!!!

transaction.commit();
```
- JPA로 엔티티를 수정할 때는 단순히 **엔티티를 조회해서 데이터만 변경**하면 된다.
  - 데이터만 변경했는데 어떻게 데이터베이스에 반영이 되는 걸까?
  - 이렇게 "엔티티의 변경사항을 데이터베이스에 자동으로 반영"하는 기능을 **변경 감지(dirty checking)**라 한다.

JPA는 엔티티를 영속성 컨텍스트에 보관할 때, 최초 상태를 복사해서 저장해두는데 이를 **스냅샷**이라 한다. 그리고 플러시 시점에 스냅샷과 엔티티를 비교해 변경된 엔티티를 찾는다. 이를 순서대로 분석해보면,

1. 트랜잭션을 커밋하면 엔티티 매니저 내부에서 먼저 플러시(`flush()`)가 호출된다.
2. 엔티티와 스냅샷을 비교해 변경된 엔티티를 찾는다.
3. 변경된 엔티티가 있으면 수정 쿼리를 생성해 쓰기 지연 SQL 저장소에 보낸다.
4. 쓰기 지연 저장소의 SQL을 데이터베이스에 보낸다.
5. 데이터베이스 트랜잭션을 커밋한다.

> 변경 감지는 **영속성 컨텍스트가 관리하는 영속 상태의 엔티티에만 적용**된다. 비영속, 준영속 엔티티는 값을 변경한다한들 반영되지 않는다.

이번에는 변경 감지로 인해 실행된 UPDATE SQL을 자세히 알아본다. 위 예제처럼 회원의 이름과 나이만 수정하면 변경된 부분만 사용해 동적으로 수정 쿼리가 생성될 것으로 예상할 수 있다.

```sql
UPDATE MEMBER SET NAME=?, AGE=? WHERE id=?
```

하지만 **"JPA의 기본 전략은 엔티티의 모든 필드를 업데이트"**한다.

```sql
UPDATE MEMBER SET NAME=?, AGE=?, GRADE=?, ... WHERE id=?
```
- 데이터베이스에 보내는 데이터 전송량이 증가하는 단점이 있지만, 다음과 같은 장점이 있어 모든 필드를 업데이트하는 방식을 따른다.
  - 모든 필드를 사용하면 **수정 쿼리가 항상 같다.** (물론 바인딩되는 데이터는 다르다.) 따라서 애플리케이션 로딩 시점에 수정 쿼리를 미리 생성해두고 **재사용**할 수 있다.
  - 데이터베이스에 동일한 쿼리를 보내면 데이터베이스는 **이전에 한 번 파싱된 쿼리를 재사용**할 수 있다.
- 필드가 많거나 저장되는 내용이 너무 크면 수정된 데이터만 사용해 동적으로 UPDATE SQL을 생성하는 전략을 선택하면 된다. 단 이때는 Hibernate 확장 기능을 사용해야 한다.
  - `@org.hibernate.annotations.DynamicUpdate` annotation을 사용하면 수정된 데이터만 사용해 동적으로 UPDATE SQL을 생성한다.
  - 참고로 데이터를 저장할 때 데이터가 존재하는(`null`이 아닌) 필드만으로 INSERT SQL을 동적으로 생성하는 `@DynamicInsert` 도 있다.

> 상황에 따라 다르지만 컬럼이 대략 30개 이상이 되면 기본 방법보다 `@DynamicUpdate` 를 사용한 동적 수정 쿼리가 빠르다고 한다. 그치만 한 테이블에 컬럼이 30개 이상 된다는 것은 테이블 설계상 책임이 적절히 분리되지 않았을 가능성이 높다.

### ➰ 엔티티 삭제
엔티티를 삭제하려면 먼저 삭제 대상 엔티티를 조회해야 한다.
```java
Member memeberA = em.find(Member.class, "memberA");
em.remove(memberA);
```
- `em.remove()` 에 삭제 대상 엔티티를 넘겨주기만 하면 된다.
  - 물론 엔티티를 즉시 삭제하는 것이 아닌 등록과 비슷하게 **삭제 쿼리를 쓰기 지연 SQL 저장소에 등록**한다.
  - 이후 트랜잭션 커밋해 플러시 호출 시 데이터베이스에 삭제 쿼리를 전달한다.

> 참고로, `em.remove(memberA)` 를 호출하는 순간 영속성 컨텍스트에서는 바로 제거된다. 이렇게 삭제된 엔티티는 재사용하지 말고 자연스럽게 가비지 컬렉션의 대상이 되도록 두는 것이 좋다.
 
---

## 💫 플러시
**플러시(`flush()`)는 영속성 컨텍스트의 변경 내용을 데이터베이스에 반영**한다. 구체적으로는 다음과 같은 흐름이다.
1. 변경 감지가 동작해 영속성 컨텍스트에 있는 모든 엔티티를 스냅샷과 비교해서 수정된 엔티티를 찾는다. 수정된 엔티티는 수정 쿼리를 만들어 쓰기 지연 SQL 저장소에 등록한다.
2. 쓰기 지연 SQL 저장소의 쿼리를 데이터베이스에 전달한다.(등록, 수정, 삭제 쿼리)

영속성 컨텍스트를 플러시하는 방법은 3가지다.
1. `em.flush()` 를 직접 호출한다.
2. 트랜잭션 커밋 시 플러시가 자동 호출된다.
3. JPQL 쿼리 실행 시 플러시가 자동 호출된다.

**직접 호출**<br/>
엔티티 매니저의 `flush()` 메소드를 직접 호출하여 강제로 플러시한다. 테스트나 다른 프레임워크와 JPA를 함께 사용할 때를 제외하고 거의 사용하지 않는다.

**트랜잭션 커밋 시 플러시 자동 호출**<br/>
데이터베이스에 변경 내용을 SQL로 전달하지 않고 트랜잭션만 커밋하면 어떤 데이터도 데이터베이스에 반영되지 않는다. 따라서 트랜잭션 커밋 전 플러시 호출은 필수적이다. 
- JPA는 이런 문제를 예방하고자 트랜잭션 커밋 시 자동으로 플러시를 호출한다.

**JPQL 쿼리 실행 시 플러시 자동 호출**<br/>
JPQL이나 Criteria 같은 객체지향 쿼리를 호출할 때도 플러시가 실행된다. 다음 예제로 이해해보도록 한다.

```java
em.persist(memberA);
em.persist(memberB);
em.persist(memberC);

// JPQL 실행
query = em.createQuery("select m from Member m", Member.class);
List<Member> members = query.getResultList();
```
- 먼저 `em.persist()` 를 호출해 엔티티들을 영속 상태로 만들었다. 아직 데이터베이스에는 저장되지 않은 상태이다. 
- 이때 JPQL을 실행하면 JPQL이 SQL로 변환되어 데이터베이스에서 엔티티를 조회한다. 
  - 당연히 영속 상태가 된 엔티티들은 데이터베이스에 저장되지 않았기에 조회되지도 않는다. 
  - 따라서 쿼리를 실행하기 직전에 영속성 컨텍스트를 플러시하여 변경 내용을 반영하도록 한다.

### ➰ 플러시 모드 옵션
엔티티 매니저에 플러시 모드를 직접 지정하려면 `javax.persistence.FlushModeType` 을 사용하면 된다.
- `AUTO` : 커밋이나 쿼리를 실행할 때 플러시(default)
- `COMMIT` : 커밋할 때만 플러시

```java
em.setFlushMode(FlushModeType.COMMIT) // 플러시 모드 직접 설정
```

> **플러시라는 이름으로 인해 영속성 컨텍스트에 보관된 엔티티를 지운다고 생각하면 안된다.** 영속성 컨텍스트의 변경 내용을 데이터베이스에 동기화하는 작업인 것이지, 지우는 작업은 아니다.

---

## 💫 준영속
이번에는 영속 → 준영속의 상태 변화를 알아보도록 한다.

준영속 상태는 영속성 컨텍스트가 관리하는 영속 상태의 엔티티가 영속성 컨텍스트에서 **분리된(detached)** 것을 가리킨다. 따라서 **영속성 컨텍스트가 제공하는 기능을 사용할 수 없는 상태**이다. 준영속 상태로 만드는 방법은 3가지가 있다.
1. `em.detach(entity)` : 특정 엔티티만 준영속 상태로 전환한다.
2. `em.clear()` : 영속성 컨텍스트를 완전히 초기화한다.
3. `em.close()` : 영속성 컨텍스트를 종료한다.

### ➰ 엔티티를 준영속 상태로 전환: `detach()`
`em.detach()` 메소드는 특정 엔티티를 준영속 상태로 만든다.

```java
public void detach(Object entity);
```

```java
public void testDetached() {
  ...
  // 회원 엔티티 생성, 비영속 상태
  Member member = new Member();
  member.setId("memberA");
  member.setUsername("회원A");

  // 회원 엔티티 영속 상태
  em.persist(member);

  // 회원 엔티티를 영속성 컨텍스트에서 분리, 준영속 상태
  em.detach(member);

  transaction.commit();
}
```
- 회원 엔티티를 생성하고 영속화한 다음 `em.detach(member)` 를 호출했다.
  - 이는 영속성 컨텍스트에게 더는 해당 엔티티를 관리하지 말라는 의미이다.
  - 호출하는 순간 1차 캐시부터 쓰기 지연 SQL 저장소까지 해당 엔티티를 관리하기 위한 모든 정보가 제거된다.
    - 따라서 데이터베이스에 저장되지도 않는다.

영속 상태가 **영속성 컨텍스트로부터 관리되는 상태**라면, 준영속 상태는 **영속성 컨텍스트로부터 분리된 상태**다.

### ➰ 영속성 컨텍스트 초기화: `clear()`
`em.clear()` 는 영속성 컨텍스트를 초기화하여 해당 영속성 컨텍스트의 모든 엔티티를 준영속 상태로 만든다.

```java
// 엔티티 조회, 영속 상태
Member member = em.find(Member.class, "memberA");

// 영속성 컨텍스트 초기화
em.clear();

// 준영속 상태
member.setUsername("changeName");
```
- 영속성 컨텍스트 초기화는 **영속성 컨텍스트를 제거하고 새로 만든 것**과 같다. 따라서 해당 컨텍스트의 모든 엔티티들은 준영속 상태가 되어 변경 감지는 동작하지 않게 된다.
  - 위 예제의 `member.setUsername("changeName")` 는 데이터베이스에 반영되지 않는다.

### ➰ 영속성 컨텍스트 종료: `close()`
영속성 컨텍스트를 종료하면 해당 영속성 컨텍스트가 관리하던 영속 상태의 엔티티가 모두 준영속 상태가 된다.

```java
public void closeEntityManager() {
  EntityManagerFactory emf = Persistence.createEntityManagerFactory("jpabook");

  EntityManager em = emf.createEntityManager();
  EntityTransaction transaction = em.getTransaction();
  
  transcation.begin();

  Member memberA = em.find(Member.class, "memberA");
  Member memberB = em.find(Member.class, "memberB");

  transaction.commit();

  em.close(); // 영속성 컨텍스트 닫기(종료)
}
```
- 영속성 컨텍스트가 종료되어 더는 `memberA` , `memberB` 가 관리되지 않는다.

> 영속 상태의 엔티티는 주로 영속성 컨텍스트가 종료되면서 준영속 상태가 된다. 개발자가 직접 준영속 상태로 만드는 일은 드물다.

### ➰ 준영속 상태의 특징
그럼 준영속 상태인 회원 엔티티는 어떻게 될까?
- **거의 비영속 상태에 가깝다.**
  - 영속성 컨텍스트가 관리하지 않아, 영속성 컨텍스트가 제공하는 어떠한 기능도 동작하지 않는다.
- **식별자 값을 가지고 있다.**
  - 비영속 상태는 식별자 값이 없을 수도 있지만, 준영속 상태는 이미 한 번 영속 상태였기에 식별자 값을 가지고 있다.
- **지연 로딩을 할 수 없다.**
  - 지연 로딩(Lazy Loading)은 실제 객체 대신 프록시 객체를 로딩해두고 해당 객체를 실제 사용할 때 영속성 컨텍스트를 통해 데이터를 불러오는 방법이다.
  - 준영속 상태는 영속성 컨텍스트의 관리를 받지 않으므로 지연 로딩 시 문제가 발생한다.

### ➰ 병합: `merge()`
준영속 상태의 엔티티를 다시 영속 상태로 변경하는 메소드이다. **준영속 상태의 엔티티를 받아 그 정보를 바탕으로 새로운 영속 상태의 엔티티를 반환**한다.

```java
public <T> T merge(T entity);

Member mergeMember = em.merge(member);
```

**준영속 병합**<br/>
준영속 상태의 엔티티를 영속 상태로 변경하는 코드이다.

```java
public class ExamMergeMain {
  static EntityManagerFactory emf = Persistence.createEntityManagerFactory("jpabook");

  public static void main(String args[]) {
    Member member = createMember("memberA", "회원1");

    member.setUsername("회원명 변경");

    mergeMember(member);
  }

  static Member createMember(String id, String username) {
    EntityManager em1 = emf.createEntityManager();
    EntityTransaction tx1 = em1.getTransaction();

    tx1.begin();
    Member member = new Member();
    member.setId(id);
    member.setUsername(username);

    em1.persist(member);
    tx1.commit();

    em1.close(); // 영속성 컨텍스트 1 종료, member 엔티티는 준영속 상태

    return member;
  }

  static void mergeMember(Member member) {
    EntityManager em2 = emf.createEntityManager();
    EntityTransaction tx2 = em2.getTransaction();

    tx2.begin();
    Member mergeMember = em2.merge(member);
    tx2.commit();

    // 준영속 상태
    System.out.println("member = " + member.getUsername());

    // 영속 상태
    System.out.println("mergeMember = " + mergeMember.getUsername());

    System.out.println("em2 contains member = " + em2.contains(member));
    System.out.println("em2 contains mergeMember = " + em2.contains(mergeMember));

    em2.close(); // 영속성 컨텍스트 2 종료, mergeMember 엔티티는 준영속 상태
  }
}
```
- `createMember()` 메소드는 준영속 상태의 `member` 엔티티를 반환한다.
- `main()` 메소드에서 `member.setUsername()` 를 호출해 회원 이름을 변경했지만 준영속 상태인 `member` 엔티티를 관리하는 영속성 컨텍스트가 없으므로, 수정 사항은 데이터베이스에 반영되지 않는다.
- 준영속 상태의 엔티티를 수정하기 위해 `mergeMember()` 메소드에서 병합을 사용한다. 
  - 새로운 영속성 컨텍스트를 생성하여 `member` 엔티티를 영속성 컨텍스트2가 관리하는 영속 상태로 변경했다.
  - 이제 영속 상태가 되었으므로, 트랜잭션 커밋 시 변경 감지 기능이 동작해 이전에 수정했던 회원 이름이 데이터베이스에 반영된다. (정확하게는 `mergeMember` 라는 새로운 영속 상태의 엔티티가 반환된다.)

**`merge()` 의 동작방식**
1. `merge()` 를 실행한다.
2. 파라미터로 넘어온 준영속 엔티티의 식별자 값으로 1차 캐시에서 엔티티를 조회한다.
   1. 없다면 데이터베이스에서 엔티티를 조회하고 1차 캐시에 저장한다.
3. 조회한 영속 엔티티에 `member` 엔티티의 값을 채워 넣는다. (`member` 엔티티의 모든 값이 채워지고, `mergeMember` 의 이름이 "회원명 변경"으로 변경된다.)
4. `mergeMember` 를 반환한다.

코드의 출력부를 보면 `em.contains(entity)` 를 사용하고 있다. 이는 **영속성 컨텍스트가 파라미터로 전달된 엔티티를 관리하는지 확인**하는 메소드이다.
- 준영속 상태인 `member` 엔티티와 영속 상태인 `mergeMember` 엔티티는 서로 다른 인스턴스이고, 준영속 상태인 `member` 는 이제 사용할 필요가 없어, 다음과 같이 준영속 엔티티를 참조하던 변수를 영속 엔티티를 참조하도록 변경하는 것이 안전하다.

```java
// Member mergeMember = em2.merge(member);
member = em2.merge(member);
```

**비영속 병합**<br/>
병합은 비영속 엔티티도 영속 상태로 만들 수 있다.
```java
Member member = new Member();
Member newMember = em.merge(member); // 비영속 병합
tx.commit();
```
- 병합은 파라미터로 전달된 엔티티의 식별자 값으로 영속성 컨텍스트를 조회하고 찾는 엔티티가 없으면 데이터베이스에서 조회한다.
  - 만약 데이터베이스에도 없다면 **새로운 엔티티를 생성해서 병합**한다.

> 병합은 준영속, 비영속을 신경쓰지 않는다. 엔티티를 조회할 수 있으면 불러서 병합하고, 그렇지 않으면 생성해서 병합한다. 따라서 병합은 `save or update` 기능을 수행한다.

## 📕 출처
- **자바 ORM 표준 JPA 프로그래밍** - 김영한
- [엔티티의 생명주기](https://ultrakain.gitbooks.io/jpa/content/chapter3/chapter3.3.html)
---
title: "📚 16. 트랜잭션과 락, 2차 캐시"
description: "JPA 책 정리"
date: 2022-04-12
update: 2022-04-12
tags:
  - Java
  - JPA
  - SpringBoot
series: "📚 ORM 표준 JPA"
---

<em>[자바 ORM 표준 JPA 프로그래밍 - 김영한]을 읽고 인용하고 정리하는 POST입니다.</em>

## 💫 트랜잭션과 락
### ➰ 트랜잭션과 격리 수준
트랜잭션은 ACID라 하는 원자성, 일관성, 격리성, 지속성을 보장해야 한다.
- **원자성**(Atomicity): 트랜잭션 내에서 실행한 작업들은 하나의 작업인 것처럼 모두 성공하든가 실패해야 한다.
- **일관성**(Consistency): 모든 트랜잭션은 일관성있는 데이터베이스 상태를 유지해야 한다.
- **격리성**(Isolation): 동시에 실행되는 트랜잭션들이 서로에게 영향을 미치지 않도록 격리한다. 격리성은 동시성과 관련된 성능 이슈로 인해 격리 수준을 선택할 수 있다.
- **지속성**(Durability): 트랜잭션을 성공적으로 끝내면 그 결과가 항상 기록되어야 한다. 시스템에 문제가 발생해도 데이터베이스 로그 등을 사용해 성공한 트랜잭션 내용을 복구해야 한다.

트랜잭션 간 격리성의 완벽 보장을 위해서는, 트랜잭션을 거의 차례대로 실행해야 한다.
- 하지만 이렇게 하면 동시성 처리 성능이 매우 나빠진다. 따라서 트랜잭션 표준을 4단계로 나눠 정의한다.

**📌 트랜잭션 격리 수준**<br/>
- READ UNCOMMITED(커밋되지 않은 읽기)
- READ COMMITTED(커밋된 읽기)
- REPEATABLE READ(반복 가능한 읽기)
- SERIALIZABLE(직렬화 가능)

순서대로 격리 수준이 높아진다. 낮을 수록 동시성은 증가하지만, 아래와 같은 문제점이 있다.

|격리 수준|DIRTY READ|NON-REPEATABLE READ|PHANTOM READ|
|:---:|:---:|:---:|:---:|
|READ UNCOMMITED|O|O|O|
|READ COMMITTED||O|O|
|REPEATABLE READ|||O|
|SERIALIZABLE||||

**READ UNCOMMITED**
- 커밋하지 않은 데이터를 읽을 수 있다. ex. 트랜잭션1이 데이터를 수정하고 있을 때, 커밋하지 않아도 트랜잭션2가 수정 중인 데이터를 조회할 수 있다.
  - 이를 **DIRTY READ**라 한다.
- 트랜잭션2가 DIRTY READ한 데이터를 사용하는데 트랜잭션1을 롤백하면 데이터 정합성에 심각한 문제가 발생할 수 있다.

> DIRTY READ를 허용하는 격리 수준

**READ COMMITTED**
- 커밋한 데이터만 읽을 수 있다. 따라서 DIRTY READ는 발생하지 않는다.
  - 하지만 NON-REPEATABLE READ는 발생할 수 있다. ex. 트랜잭션1이 회원 A를 조회 중인데, 갑자기 트랜잭션2가 회원 A를 수정하고 커밋하면 트랜잭션1이 다시 회원 A를 조회했을 때 수정된 데이터가 조회된다.
  - 이처럼 반복해서 같은 데이터를 읽을 수 없는 상태를 **NON-REPEATABLE READ**라 한다.

> DIRTY READ는 허용하지 않지만, NON-REPEATABLE READ는 허용하는 격리 수준

**REPEATABLE READ**
- 한 번 조회한 데이터를 반복해서 조회해도 같은 데이터가 조회된다. 
  - 하지만 PHANTOM READ는 발생할 수 있다. ex. 트랜잭션1이 10살 이하의 회원을 조회했는데 트랜잭션2가 5살 회원을 추가하고 커밋하면 트랜잭션1이 다시 10살 이하의 회원을 조회했을 때 회원 하나가 추가된 상태로 조회된다.
  - 이처럼 반복 조회 시 결과 집합이 달라지는 것을 **PHANTOM READ**라 한다. (의도치 않게 예상한 결과와 다른 결과를 도출시킴)

> NON-REPEATABLE READ는 허용하지 않지만, PHANTOM READ는 허용하는 격리 수준

**SERIALIZABLE**
- 가장 엄격한 트랜잭션 격리 수준이다. 
- PHANTOM READ는 발생하지 않지만, 동시성 처리 성능이 급격히 떨어질 수 있다.

대부분의 애플리케이션들은 동시성 처리를 중요시하므로, 보통 **READ COMMITTED 격리 수준을 기본으로 사용**한다.

### ➰ 낙관적 락과 비관적 락 기초
JPA의 영속성 컨텍스트(1차 캐시)를 적절히 활용하여 데이터베이스 트랜잭션이 READ COMMITTED 격리 수준이어도 REPEATABLE READ가 가능하다.
- 물론 엔티티가 아닌 스칼라 값을 직접 조회하면 영속성 컨텍스트의 관리를 받지 못하므로 불가능하다.

JPA는 격리 수준을 READ COMMITTED로 가정한다. 더 높은 격리 수준이 필요한 경우 낙관적 락과 비관적 락 중 하나를 사용한다.

**낙관적 락**
- 트랜잭션 대부분은 충돌이 발생하지 않는다고 가정하는 방법이다.
- 데이터베이스가 제공하는 락 기능을 사용하는 것이 아니라 JPA가 제공하는 버전 관리 기능을 사용한다.

> 애플리케이션이 제공하는 락, 트랜잭션을 커밋하기 전까지는 트랜잭션의 충돌을 알 수 없다.

**비관적 락**
- 트랜잭션의 충돌이 발생한다고 가정하고 우선 락을 걸고 보는 방법이다.

> 데이터베이스가 제공하는 락, `select for update` 가 대표적

추가로 데이터베이스 트랜잭션 범위를 넘어서는 문제도 있다. 
- ex. 사용자 두 명이 동시에 제목이 같은 공지사항을 수정한다고 가정한다. 첫 번째 사용자가 먼저 수정완료 버튼을 누르고 두 번째 사용자가 수정완료 버튼을 누르면, 결과적으로 두 번째 수정사항만이 남게 된다.
  - 이를 **두 번의 갱신 분실 문제**(second lost updates problem)라 한다.
  - 이는 데이터베이스 트랜잭션의 범위를 넘어서므로, 트랜잭션만으로는 해결할 수 없어 아래 3가지 방법 중 선택해야 한다.

1. **마지막 커밋만 인정하기**: 첫 번째 사용자의 내용은 무시하고, 마지막에 커밋한 사용자의 내용만을 인정한다.
2. **최초 커밋만 인정하기**: 첫 번째 사용자가 이미 수정완료했으므로, 두 번째 사용자가 수정완료할 때 오류가 발생한다.
3. **충돌하는 갱신 내용 병합하기**: 두 사용자의 수정사항을 병합한다.

기본은 "마지막 커밋만 인정하기"이다.
- JPA가 제공하는 버전 관리 기능을 사용하면 손쉽게 최초 커밋만 인정하기를 구현할 수 있다.

### ➰ @Version
JPA가 제공하는 낙관적 락을 사용하기 위해 `@Version` annotation을 사용해 버전 관리 기능을 추가해야 한다. `@Version` 적용 가능 타입은 아래와 같다.
- `Long (long)`
- `Integer (int)`
- `Short (short)`
- `Timestamp`

엔티티에 버전 관리용 필드를 추가하고 해당 annotation을 붙여, 엔티티를 수정할 때마다 버전이 하나씩 자동으로 증가하게 된다.
- 엔티티를 수정할 때, 조회 시점의 버전과 수정 시점의 버전이 다르면 예외가 발생한다.

> 버전 정보를 사용하면 **최초 커밋만 인정하기**가 적용된다.

**📌 버전 정보 비교 방법**<br/>
엔티티를 수정하고 트랜잭션을 커밋하면 영속성 컨텍스트를 플러시하면서 UPDATE 쿼리를 실행한다.
- 이때 버전을 사용하는 엔티티면 검색 조건에 엔티티의 버전 정보를 추가한다.
- 데이터베이스 버전과 엔티티 버전이 같으면, 데이터를 수정하면서 동시에 버전도 하나 증가시킨다.
  - 버전이 다르다면, 예외 발생!
- **버전은 엔티티의 값을 변경하면 증가한다.**
  - 그리고 값 타입인 임베디드 타입과 값 타입 컬렉션은 개념상 엔티티의 값이므로 이 또한 버전이 증가한다.
  - 단 연관관계 필드는 외래 키를 관리하는 **연관관계의 주인 필드를 수정할 때만 버전이 증가**한다.

> 벌크 연산은 버전을 무시한다. 버전 증가를 위해서는 버전 필드를 강제로 증가시켜야 한다.

### ➰ JPA 락 사용
> JPA 추천 전략은 READ COMMITTED 격리 수준 + 낙관적 버전 관리(두 번의 갱신 내역 분실 문제 예방)

락은 다음 위치에 적용할 수 있다.
- `EntityManager.lock()` , `EntityManager.find()` , `EntityManager.refresh()`
- `Query.setLockMode()` (`TypedQuery`)
- `@NamedQuery`
- 조회하면서 즉시 락을 걸 수도 있고, 필요할 때 락을 걸 수 있다.

> JPA가 제공하는 락 옵션은 `javax.persistence.LockModeType` 에 정의되어 있다.

### ➰ JPA 낙관적 락
JPA가 제공하는 낙관적 락은 버전(`@Version`)을 사용한다.
- 낙관적 락은 트랜잭션을 커밋하는 시점에 충돌을 알 수 있다는 특징이 있다.
- 발생하는 예외는 다음과 같다.
  - `javax.persistence.OptimisticLockException` (JPA 예외)
  - `org.hibernate.StaleObjectStateException` (Hibernate 예외)
  - `org.springframework.orm.ObjectOptimisticLockingFailureException` (스프링 예외 추상화)

> 락 옵션 없이 `@Version` 만 있어도 낙관적 락이 적용된다.

**📌 NONE**<br/>
락 옵션을 적용하지 않아도 엔티티에 `@Version` 이 적용된 필드만 있으면 낙관적 락이 적용된다.
- 용도: 조회한 엔티티를 수정할 때 다른 트랜잭션에 의해 변경(삭제)되지 않아야 한다. 조회 시점부터 수정 시점까지를 보장한다.
- 동작: 엔티티를 수정할 때 버전을 체크하면서 버전을 증가한다. 이때 버전이 다르면 예외가 발생한다.
- 이점: 두 번의 갱신 분실 문제를 예방한다.

**📌 OPTIMISTIC**<br/>
`@Version` 만 적용하면 엔티티를 수정해야 버전을 체크하지만, 이 옵션을 추가하면 엔티티를 조회만 해도 버전을 체크한다.
- 한 번 조회한 엔티티는 트랜잭션을 종료할 때까지 다른 트랜잭션에서 변경하지 않음을 보장한다.
- 용도: 조회한 엔티티는 트랜잭션이 끝날 때까지 다른 트랜잭션에 의해 변경되지 않아야 한다. 조회 시점부터 트랜잭션 종료 시점까지 엔티티가 변경되지 않음을 보장한다.
- 동작: 트랜잭션을 커밋할 때 버전 정보를 조회해서 현재 엔티티의 버전과 같은지 검증한다. 버전이 다르면 예외가 발생한다.
- 이점: 해당 옵션은 DIRTY READ와 NON-REPEATABLE READ를 방지한다.

**📌 OPTIMISTIC_FORCE_INCREMENT**<br/>
낙관적 락을 사용하면서 버전 정보를 강제로 증가한다.
- 용도: 논리적인 단위의 엔티티 묶음을 관리할 수 있다. 연관관계로 묶인 엔티티들에 대한 버전의 강제 증가를 수행한다.
- 동작: 엔티티를 수정하지 않아도 트랜잭션을 커밋할 때 UPDATE 쿼리를 사용해서 버전 정보를 강제로 증가시킨다. 이때 버전이 다르면 예외가 발생한다.
  - 추가로, 엔티티를 수정하면 버전 UPDATE가 발생하여, 총 2번의 버전 증가가 나타날 수 있다.
- 이점: 논리적인 단위의 엔티티 묶음을 관리할 수 있다.

### ➰ JPA 비관적 락
데이터베이스 트랜잭션 락 메커니즘에 의존하는 방법이다.
- 주로 SQL 쿼리에 `select for update` 구문을 사용하면서 시작하고, 버전 정보는 사용하지 않는다.
- 주로 `PESSIMISTIC_WRITE` 모드를 사용한다.
- 엔티티가 아닌 스칼라 타입 조회 시에도 사용할 수 있고, 데이터를 수정하는 즉시 트랜잭션 충돌을 감지할 수 있다.
- 발생하는 예외는 다음과 같다.
  - `javax.persistence.PessimisticLockException` (JPA 예외)
  - `org.springframework.dao.PessimisticLockingFailureException` (스프링 예외 추상화)

**📌 PESSIMISTIC_WRITE**<br/>
일반적인 옵션으로 데이터베이스에 쓰기 락을 걸 때 사용한다.
- 용도: 데이터베이스에 쓰기 락을 건다.
- 동작: `select for update` 를 사용해서 락을 건다.
- 이점: NON-REPEATABLE READ를 방지한다. 락이 걸린 로우는 다른 트랜잭션이 수정할 수 없다.

**📌 PESSIMISTIC_READ**<br/>
데이터를 반복 읽기만 하고 수정하는 않는 용도로 락을 걸 때 사용한다. 
- 데이터베이스 대부분은 방언에 의해 `PESSIMISTIC_WRITE` 로 동작한다.
- MySQL: `lock in share mode`
- PostgreSQL: `for share`

**📌 PESSIMISTIC_FORCE_INCREMENT**<br/>
유일하게 버전 정보를 사용한다. 버전 정보를 강제로 증가시킨다.
- Hibernate는 `nowait` 를 지원하는 데이터베이스에 대해서 `for update nowait` 옵션을 적용한다.
- `nowait` 를 지원하지 않으면 `for update` 가 사용된다.

### ➰ 비관적 락과 타임아웃
비관적 락을 사용하면 락을 획득할 때까지 트랜잭션이 대기한다.
- 무한정 기다리지 않기 위해 타임아웃 시간을 줄 수 있다.
- 타임아웃 시간동안 응답이 없으면 `javax.persistence.LockTimeoutException` 예외가 발생한다.

---

## 💫 2차 캐시
### ➰ 1차 캐시와 2차 캐시
조회한 데이터를 메모리에 캐시해서 데이터베이스 접근 횟수를 줄여 애플리케이션 성능을 획기적으로 개선할 수 있다. 영속성 컨텍스트 내부에는 **1차 캐시**가 있다. 많은 이점이 있지만, 일반적인 웹 애플리케이션 환경은 트랜잭션을 시작하고 종료할 때까지만 1차 캐시가 유효하다.
- OSIV를 사용해도 클라이언트의 요청이 들어올 때부터 끝날 때까지만 유효하다.
- 즉, 애플리케이션 전체로 봤을 때, 획기적이지 못하다.

Hibernate를 포함한 대부분의 JPA 구현체들은 애플리케이션 범위의 캐시를 지원하는데, 이를 **공유 캐시 또는 2차 캐시**라 한다.
- 1차 캐시와 2차 캐시를 함께 사용한다.
- 1차 캐시에 없으면 2차 캐시, 2차 캐시에 없으면 데이터베이스 조회하는 순이다.

**📌 1차 캐시**<br/>
영속성 컨텍스트 내부에 존재하는 캐시로, 엔티티 매니저로 조회하거나 변경하는 모든 엔티티는 1차 캐시에 저장된다. 트랜잭션을 커밋하거나 플러시를 호출하면 1차 캐시에 있는 엔티티의 변경 내역을 데이터베이스에 동기화한다.

> 영속성 컨텍스트 자체가 사실상 1차 캐시다!

다음은 1차 캐시의 동작 방식이다.
1. 최초 조회할 때는 1차 캐시에 엔티티가 없으므로
2. 데이터베이스에 엔티티를 조회해서
3. 1차 캐시에 보관하고
4. 1차 캐시에 보관한 결과를 반환한다.
5. 이후 같은 엔티티를 조회하면 1차 캐시에 있는 엔티티를 그대로 반환한다.

**1차 캐시의 특징**
- 같은 엔티티가 있으면 해당 엔티티를 그대로 반환한다. 즉, 객체 동일성(`a==b`)을 보장한다.
- 영속성 컨텍스트 범위의 캐시다.

**📌 2차 캐시**<br/>
애플리케이션 범위의 캐시다. 따라서 애플리케이션을 종료할 때까지 캐시가 유지된다.

다음은 2차 캐시의 동작 방식이다.
1. 영속성 컨텍스트는 엔티티가 필요하면 2차 캐시를 조회한다.
2. 2차 캐시에 엔티티가 없으면 데이터베이스를 조회해서
3. 결과를 2차 캐시에 보관한다.
4. 2차 캐시는 자신이 보관하고 있는 엔티티를 복사해서 반환한다.
5. 2차 캐시에 저장되어 있는 엔티티를 조회하면 복사본을 만들어 반환한다.

2차 캐시는 동시성을 극대화하려고 캐시한 객체를 직접 반환하지 않고 복사본을 만들어 반환한다.
- 캐시한 객체를 그대로 반환하면 여러 곳에서 같은 객체를 동시에 수정하는 문제가 발생할 수 있다. (이를 위해 락을 걸면 동시성 저하)

**2차 캐시의 특징**
- 영속성 유닛 범위의 캐시
- 조회한 객체를 그대로 반환하지 않고 복사본을 반환
- 데이터베이스 기본 키를 기준으로 캐시하지만 영속성 컨텍스트가 다르면 객체 동일성(`a==b`)을 보장하지 않는다.

### ➰ JPA 2차 캐시 기능
**📌 캐시 모드 설정**<br/>
2차 캐시를 사용하려면 엔티티에 `javax.persistence.Cacheable` annotation을 사용한다. 이후, `persistence.xml` 에 `shared-cache-mode` 를 설정해 애플리케이션 전체에 캐시를 어떻게 적용할지 옵션을 설정해야 한다.

```xml
<bean id="entityManagerFactory" class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">
  <property name="sharedCacheMode" value="ENABLE_SELECTIVE" />
  ...

```

**`SharedCacheMode` 캐시 모드 설정**
|캐시 모드|설명|
|:---:|:---:|
|ALL|모든 엔티티를 캐시한다.|
|NONE|캐시를 사용하지 않는다.|
|**ENABLE_SELECTIVE**|**Cacheable(true)로 설정된 엔티티만 캐시를 적용한다.**|
|DISABLE_SELECTIVE|모든 엔티티를 캐시하는데 Cacheable(false)로 명시된 엔티티는 캐시하지 않는다.|
|UNSPECIFIED|JPA 구현체가 정의한 설정을 따른다.|

**📌 캐시 조회, 저장 방식 설정**<br/>
캐시를 무시하고 데이터베이스를 직접 조회하거나 캐시를 갱신하려면 캐시 조회 모드와 캐시 보관 모드를 사용하면 된다.

```java
em.setProperty("javax.persistence.cache.retrieveMode", CacheRetrieveMode.BYPASS);
```

캐시 조회 모드나 보관 모드에 따라 사용할 프로퍼티와 옵션이 다르다.
- `javax.persistence.cache.retrieveMode` : 캐시 조회 모드 프로퍼티 이름
- `javax.persistence.cache.storeMode` : 캐시 보관 모드 프로퍼티 이름
- `javax.persistence.cache.CacheRetrieveMode` : 캐시 조회 모드 설정 옵션 (USE, BYPASS)
- `javax.persistence.cache.CacheStoreMode` : 캐시 보관 모드 설정 옵션 (USE, BYPASS, REFRESH)

**캐시 조회 모드 옵션**
- USE : 캐시에서 조회, 기본 값
- BYPASS : 캐시를 무시하고 데이터베이스에 직접 접근

**캐시 보관 모드 옵션**
- USE : 조회한 데이터를 캐시에 저장, 이미 존재한다면 갱신하지 않는다. 트랜잭션을 커밋하면 등록 수정한 엔티티도 캐시에 저장, 기본 값
- BYPASS : 캐시에 저장하지 않는다.
- REFRESH : USE 전략에 추가로 데이터베이스에서 조회한 엔티티를 최신 상태로 다시 캐시

**📌 JPA 캐시 관리 API**<br/>
JPA는 캐시를 관리하기 위한 `Cache` interface를 제공한다.

```java
Cache cache = emf.getCache();
boolean contains = cache.contains(TestEntity.class, testEntity.getId());
System.out.println("contains = " + contains);
```

### ➰ Hibernate와 EHCACHE 적용
Hibernate가 지원하는 캐시는 크게 3가지가 있다.

1. **엔티티 캐시** : 엔티티 단위로 캐시한다. 식별자로 엔티티를 조회하거나 컬렉션이 아닌 연관된 엔티티를 로딩할 때 사용한다.
2. **컬렉션 캐시** : 엔티티와 연관된 컬렉션을 캐시한다. **컬렉션이 엔티티를 담고 있으면 식별자 값만 캐시한다.**
3. **쿼리 캐시** : 쿼리와 파라미터 정보를 키로 사용해서 캐시한다. **결과가 엔티티면 식별자 값만 캐시한다.**

**📌 환경 설정**<br/>
Hibernate에서 EHCACHE를 사용하려면 `pom.xml` 에 `hibernate-ehcache` 라이브러리를 추가한다.
- 이를 추가하면 `net.sf.ehcache-core` 라이브러리도 추가된다.
- EHCACHE는 `ehcache.xml` 을 설정 파일로 사용한다.
- 이후 Hibernate에 캐시 사용정보를 설정하기 위해 `persistence.xml` 에 캐시 정보를 추가한다.

**📌 엔티티 캐시와 컬렉션 캐시**<br/>
- `javax.persistence.Cacheable` : 엔티티를 캐시하려면 해당 annotation을 적용한다.
- `org.hibernate.annotations.Cache` : 해당 annotation은 Hibernate 전용이다. `usage` 속성을 이용해 캐시와 관련된 더 세밀한 설정을 할 때 사용한다.

**📌 @Cache**<br/>
세밀한 캐시 설정을 위해 사용한다.
- usage : CacheConcurrencyStrategy를 사용해 캐시 동시성 전략을 설정한다.
- region : 캐시 지역 설정
- include : 연관 객체를 캐시에 포함할지 선택한다. all, non-lazy 옵션을 선택할 수 있다. (기본 값 all)

가장 중요한 것은 캐시 동시성 전략을 설정하는 `usage` 속성이다.
- NONE
- READ_ONLY
- NONSTRICT_READ_WRITE
- READ_WRITE
- TRANSACTIONAL

**📌 캐시 영역**<br/>
캐시를 적용한 코드는 아래 캐시 영역에 저장된다.
- 엔티티 캐시 영역
- 컬렉션 캐시 영역

엔티티 캐시 영역은 기본값으로 [패키지 명 + 클래스 명]을 사용하고, 컬렉션 캐시 영역은 엔티티 캐시 영역 이름에 캐시한 컬렉션의 필드 명이 추가된다.
- 영역별 세부 설정이 가능하다. `ehcache.xml` 에서 설정할 수 있다.

**📌 쿼리 캐시**<br/>
쿼리 캐시는 쿼리와 파라미터 정보를 키로 사용해 쿼리 결과를 캐시하는 방법이다.
- 적용하기 위해 영속성 유닛을 설정에 `hibernate.cache.use_query_cache` 옵션을 꼭 `true` 로 설정해야 한다.
- 이후 쿼리 캐시를 적용할 쿼리에 `org.hibernate.cacheable` 을 `true` 로 설정하는 힌트를 준다.

**📌 쿼리 캐시 영역**<br/>
쿼리 캐시를 활성화하면 다음 두 캐시 영역이 추가된다.
- `org.hibernate.cache.internal.StandardQueryCache` : 쿼리 캐시를 저장하는 영역이다. 쿼리, 쿼리 결과 집합, 쿼리를 실행한 시점의 타임스탬프를 보관한다.
- `org.hibernate.cache.spi.UpdateTimestampsCache` : 쿼리 캐시가 유효한지 확인하기 위해 쿼리 대상 테이블의 가장 최근 변경 시간을 저장하는 영역이다. 테이블 명과 해당 테이블의 최근 변경된 타임스탬프를 보관한다.

쿼리 캐시를 적용하고 난 후 쿼리 캐시가 사용하는 테이블에 조금이라도 변경이 있으면 데이터베이스에서 데이터를 읽어와 쿼리 결과를 다시 캐시한다. 이를 잘 활용하면 극적인 성능 향상이 있지만, 빈번히 변경이 발생하는 테이블에는 적절하지 않다.

**📌 쿼리 캐시와 컬렉션 캐시의 주의점**<br/>
쿼리 캐시와 컬렉션 캐시는 집합의 식별자 값만을 캐시한다.
- 쿼리 캐시나 컬렉션 캐시만 사용하고 대상 엔티티에 엔티티 캐시를 적용하지 않으면 성능상 문제가 발생할 수 있다.

1. `select m from Member m` 쿼리를 실행했는데 쿼리 캐시가 적용되어 있다. 결과 집합은 100건이다.
2. 결과 집합에는 식별자만 있으므로 한 건씩 엔티티 캐시 영역에서 조회한다.
3. `Member` 엔티티는 엔티티 캐시를 사용하지 않으므로 한 건씩 데이터베이스에서 조회한다.
4. 결국 100건의 SQL이 실행된다.

결과적으로 최악의 경우 결과 집합 수만큼의 SQL을 실행하게 된다.

> **쿼리 캐시나 컬렉션 캐시를 사용하면 결과 대상 엔티티에는 꼭 엔티티 캐시를 적용해야 한다.**

## 📕 출처
**자바 ORM 표준 JPA 프로그래밍** - 김영한
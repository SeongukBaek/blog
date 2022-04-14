---
title: "📚 10. 객체지향 쿼리 언어"
description: "JPA 책 정리"
date: 2022-03-29
update: 2022-03-29
tags:
  - Java
  - JPA
  - SpringBoot
series: "📚 ORM 표준 JPA"
---

<em>[자바 ORM 표준 JPA 프로그래밍 - 김영한]을 읽고 인용하고 정리하는 POST입니다.</em>

> JPQL은 가장 중요한 객체지향 쿼리 언어이다.

## 💫 객체지향 쿼리 소개
`em.find()` 메소드를 사용해 식별자로 엔티티 하나를 조회할 수 있다. 이렇게 조회한 엔티티에 객체 그래프 탐색을 사용하면 연관된 엔티티들을 찾을 수 있고, 아래는 가장 단순한 검색 방법이다.
- 식별자로 조회 - `em.find()`
- 객체 그래프 탐색 - `a.getB().getC()`

ORM을 사용하면 데이터베이스 테이블이 아닌 엔티티 객체를 대상으로 개발하므로 검색도 테이블이 아닌 엔티티 객체를 대상으로 하는 방법이 필요하다. JPQL은 이런 문제를 해결하기 위해 만들어져서 아래의 특징이 있다.
- 테이블이 아닌 객체를 대상으로 검색하는 객체지향 쿼리다.
- SQL을 추상화해서 특정 데이터베이스 SQL에 의존하지 않는다.

> SQL이 "데이터베이스 테이블을 대상으로 하는 데이터 중심의 쿼리"라면, JPQL은 "엔티티 객체를 대상으로 하는 객체지향 쿼리"다. JPQL을 사용하면 JPA는 이 JPQL을 분석한 다음 적절한 SQL을 만들어 데이터베이스를 조회하고, 조회한 결과로 엔티티 객체를 생성해서 반환한다. 

JPA는 JPQL뿐만 아니라 다양한 검색 방법을 제공하고, 아래는 JPA가 공식 지원하는 기능이다.
- JPQL(Java Persistence Query Language)
- Criteria 쿼리: JPQL을 편하게 작성하도록 도와주는 API, 빌더 클래스 모음이다.
- 네이티브 SQL: JPA에서 JPQL 대신 직접 SQL을 사용할 수 있다.

### ➰ JPQL 소개
JPQL은 **엔티티 객체를 조회하는 객체지향 쿼리**다. SQL을 추상화해서 특정 데이터베이스에 의존하지 않는다. 
- 문법은 SQL과 비슷하고 ANSI 표준 SQL이 제공하는 기능을 유사하게 지원한다.
- 데이터베이스 방언만 변경하면 JPQL을 수정하지 않아도 자연스럽게 데이터베이스를 변경할 수 있다. 
- SQL보다 간결하다. 엔티티 직접 조회, 묵시적 조인, 다형성 지원으로 코드가 간결하다.

```java
//쿼리 생성
String jpql = "select m from Member as m where m.username = 'kim'";
List<Member> resultList = em.createQuery(jpql, Member.class).getResultList();
```

### ➰ Criteria 쿼리 소개
JPQL을 생성하는 빌더 클래스다. 
- 문자가 아닌 `query.select(m).where(...)` 처럼 프로그래밍 코드로 JPQL을 작성할 수 있다는 장점이 있다.
- 오타가 있어도 컴파일은 성공하고 서버에 배포할 수 있지만, 해당 쿼리가 실행되는 런타임 시점에 오류가 발생한다.
- 컴파일 시점에 오류를 발견할 수 있다.
- IDE를 사용하면 코드 자동완성을 지원한다.
- 동적 쿼리를 작성하기 편하다.
- 하지만 복잡하고 장황하다. 따라서 사용하기 불편할뿐더러, 가독성 또한 좋지 않다.

```java
//Criteria 사용준비
CriteriaBuilder cb = em.getCriteriaBuilder();
CriteriaQuery<Member> query = cb.createQuery(Member.class);

//루트 클래스 (조회를 시작할 클래스)
Root<Member> m = query.from(Member.class);

//쿼리 생성
CriteriaQuery<Member> cq =  query.select(m).where(cb.equal(m.get("usernamen", "kim"));

List<Member> resultList = em.createQuery(cq).getResultList();
```
- 필드명을 문자로 작성하지 않고 코드로 작성하고 싶다면 **메타 모델**을 사용하면 된다. 

### ➰ QueryDSL 소개
JPQL 빌더 역할을 한다.
- 코드 기반이면서 단순하고 사용하기 쉽다.
- 작성한 코드도 JPQL과 비슷해서 가독성이 좋다.

> JPA 표준은 아니고, 오픈소스 프로젝트이다.

```java
//준비
JPAQuery query = new JPAQuery(em);
QMember member = QMember.member;

//쿼리, 결과조회
List<Member> members = 
    query.from(member)
    .where(member.username.eq("kim"))
    .list(member);
```
- annotation 프로세서를 사용해 쿼리 전용 클래스를 만들어야 한다. 
  - `QMember` 는 `Member` 엔티티 클래스를 기반으로 생성한 QueryDSL 쿼리 전용 클래스이다.

### ➰ 네이티브 SQL 소개
SQL을 직접 사용할 수 있는 기능이다. 아래의 경우에 대해 네이티브 SQL을 사용할 수 있다.
- JPQL을 사용해도 특정 데이터베이스에 의존하는 기능을 사용해야 할 때가 있다. (오라클 데이터베이스의 `CONNECT BY`, 특정 데이터베이스에서만 동작하는 SQL 힌트)
- 또한 SQL은 지원하지만 JPQL이 지원하지 않는 기능을 사용해야 할 때도 있다.

단점으로는 **특정 데이터베이스에 의존하는 SQL을 작성**해야 한다는 것이다.
- 데이터베이스의 변경은 네이티브 SQL의 수정을 요구한다.

```java
String sql = "SELECT ID, AGE, TEAM_ID, NAME FROM MEMBER WHERE NAME = 'kim'";
List<Member> resultList =  em.createNativeQuery(sql, Member.class).getResultList();
```

### ➰ JDBC 직접 사용, Mybatis 같은 SQL 매퍼 프레임워크 사용
JDBC 커넥션에 직접 접근하고 싶으면 JPA는 JDBC 커넥션을 획득하는 API를 제공하지 않으므로 JPA 구현체가 제공하는 방법을 사용해야 한다.

```java
Session session = entityManager.unwrap(Session.class);
session.doWork(new Work() {

  @Override
  public void execute(Connection connection) throws SQLException {
    // work...
  }
});
```
- 먼저 Hibernate `Session` 을 구하고, `Session` 의 `doWork()` 메소드를 호출하면 된다.
- JDBC나 마이바티스를 JPA와 함께 사용하면 영속성 컨텍스트를 적절한 시점에 **강제로 플러시**해야 한다.
  - JDBC를 직접 사용하든, SQL 매퍼와 사용하든 모두 JPA를 우회해서 데이터베이스에 접근하는데, 문제는 JPA를 우회하는 SQL에 대해서는 JPA가 전혀 인식하지 못한다는 것이다. 
  - 최악의 경우, 영속성 컨텍스트와 데이터베이스를 불일치 상태로 만들어 **데이터 무결성을 훼손**할 수도 있다.

JPA를 우회해서 SQL을 실행하기 직전에 영속성 컨텍스트를 수동으로 플러시해서 데이터베이스와 영속성 컨텍스트를 동기화하면 이러한 이슈를 해결할 수 있다.

---

## 💫 JPQL
JPQL의 특징이다.
- JPQL은 객체지향 쿼리 언어이다. 따라서 테이블을 대상으로 쿼리하는 것이 아니라 엔티티 객체를 대상으로 쿼리한다.
- JPQL은 SQL을 추상화해서 특정 데이터베이스 SQL에 의존하지 않는다.
- JPQL은 결국 SQL로 변환된다.

### ➰ 기본 문법과 쿼리 API
JPQL도 SQL과 비슷하게 SELECT, UPDATE, DELETE 문을 사용할 수 있다. (엔티티를 저장할 때는 `em.persist()`를 사용하면 되므로 INSERT문은 없다.)
- 전체 구조는 SQL과 비슷하다.

**SELECT 문**
```sql
SELECT m FROM Member AS m where m.username = 'Hello'
```
- **대소문자 구분** : 엔티티와 속성은 대소문자를 구분한다. 하지만 JPQL 키워드는 대소문자를 구분하지 않는다.
- **엔티티 이름** : JPQL에서 사용하는 객체는 클래스 명이 아니라 엔티티 명이고 `@Entity(name=”XXX”)` 로 지정할 수 있다. 지정하지 않으면 클래스 명을 기본값으로 사용한다.
- **별칭은 필수** : JPQL은 별칭을 필수로 사용해야 한다. 별칭 없이 작성하면 잘못된 문법이라는 오류가 발생한다.

**TypeQuery, Query**<br/>
작성한 JPQL을 실행하려면 쿼리 객체를 만들어야 한다. 쿼리 객체에는 `TypeQuery` 와 `Query` 가 있고 반환 타입 지정에 따라 나뉜다.
- 반환할 타입을 명확하게 지정할 수 있으면 `TypeQuery` 객체를 사용한다.
- 반환 타입을 명확하게 지정할 수 없으면 `Query` 객체를 사용한다.

```java
TypedQuery<Member> query = em.createQuery("SELECT m FROM Member m", Member.class);

List<Member> resultList = query.getResultList();
for (Member member : resultList) {
  System.out.println("member = " + member);
}
```
- `em.createQuery()` 의 두 번째 파라미터에 반환할 타입을 지정하면 `TypeQuery` 를 반환하고 지정하지 않으면 `Query` 를 반환한다. 
- 이때는 조회 대상이 `Member` 엔티티이므로 조회 대상 타입이 명확해 `TypeQuery` 를 사용할 수 있다. 명확하지 않다면 `Query` 로 변경하면 된다.

`Query` 객체는 SELECT 절의 조회 대상이 둘 이상이면 `Object[]` 를 반환하고, 조회 대상이 하나면 `Object` 를 반환한다. 타입을 변환할 필요가 없는 `TypeQuery` 를 사용하는 것이 더 편리하다.

**결과 조회**<br/>
다음 메소드들을 호출하면 실제 쿼리를 실행해서 데이터베이스를 조회한다.
- `query.getResultList()` : 결과를 예제로 반환한다. 결과가 없으면 빈 컬렉션을 반환한다.
- `query.getSingleResult()` : 결과가 **정확히 하나**일 때 사용한다.
  - 결과가 없으면 `NoResultException` 발생한다.
  - 1개보다 많으면 `NonUniqueResultException` 발생한다.

### ➰ 파라미터 바인딩
JDBC는 위치 기준 파라미터 바인딩만 지원하지만 JPQL은 이름 기준 파라미터 바인딩도 지원한다.

**이름 기준 파라미터**<br/>
파라미터를 이름으로 구분하는 방법으로, 앞에 `:` 를 사용
```java
String usernameParam = "User1";

TypedQuery<Member> query = em.createQuery("SELECT m FROM Member m where m.username = :username", Member.class);

query.setParameter("username", usernameParam);
List<Member> resultList = query.getResultList();
```

> 참고로 JPQL API는 대부분 메소드 체인 방식으로 설계되어 연속하여 작성이 가능하다.

**위치 기준 파라미터**<br/>
`?` 다음에 위치 값을 주어 사용한다. 

```java
String usernameParam = "User1";

query.setParameter("username", usernameParam);
List<Member> resultList = 
    em.createQuery("SELECT m FROM Member m where m.username = ?1", Member.class)
      .setParameter(1, usernameParam)
      .getResultList();
```
- 위치 기준 파라미터 방식보다는 **이름 기준 파라미터 바인딩 방식**을 사용하는 것이 더 명확하다.

> 파라미터 바인딩 방식은 선택이 아닌 필수이다.

### ➰ 프로젝션
SELECT 절에 조회할 대상을 지정하는 것이다. 프로젝션 대상에는 **엔티티**, **임베디드 타입**, **스칼라 타입**(숫자, 문자 등 기본 데이터 타입)이 있다.

**엔티티 프로젝션**<br/>
```sql
SELECT m FROM Member m      // 회원
SELECT m.team FROM Member m // 팀
```
- 쉽게 생각하면, 원하는 객체를 바로 조회한 것이다.
- 컬럼을 하나하나 나열해서 조회해야하는 SQL과는 차이가 있다.
- **조회한 엔티티는 영속성 컨텍스트에서 관리**된다.

**임베디드 타입 프로젝션**<br/>
- JPQL에서 임베디드 타입은 엔티티와 거의 비슷하게 사용된다. 임베디드 타입은 조회의 시작점이 될 수 없다는 제약이 있다.

> **임베디드 타입은 엔티티 타입이 아닌 값 타입이기 때문에 직접 조회한 임베디드 타입은 영속성 컨텍스트에서 관리되지 않는다.**

**스칼라 타입 프로젝션**<br/>
숫자, 문자, 날짜와 같은 기본 데이터 타입들을 스칼라 타입이라 한다. 
- 통계 쿼리도 주로 스칼라 타입으로 조회한다.

**여러 값 조회**<br/>
엔티티를 대상으로 조회하면 편리하겠지만, 꼭 필요한 데이터들만 선택해서 조회해야 할 때도 있다. 
- 이때는 프로젝션에 `Query` 를 사용한다.
- 역시나 조회한 엔티티는 영속성 컨텍스트에서 관리된다.

**NEW 명령어**<br/>
- 실제 애플리케이션 개발시에는 `Object[]` 를 직접 사용하지 않고 의미있는 객체로 변환해서 사용한다.
- SELECT 다음에 `NEW` 명령어를 사용해 반환받을 클래스를 지정할 수 있다. 클래스의 생성자에 JPQL 조회 결과를 넘겨줄 수 있다.

`NEW` 명령어 사용 시 다음과 같은 주의사항이 있다.
- 패키지 명을 포함한 전체 클래스명을 입력해야 한다.
- 순서와 타입이 일치하는 생성자가 필요하다.

### ➰ 페이징 API
페이징 처리용 SQL을 작성하는 일은 지루하고 반복적이다. 더 큰 문제는 데이터베이스마다 페이징을 처리하는 SQL 문법이 다르다는 것이다.

JPA는 페이징을 다음 두 API로 추상화했다.
- `setFirstResult(int startPosition)` : 조회 시작 위치(0부터 시작한다)
- `setMaxResults(int maxResult)` : 조회할 데이터 수

```java
TypedQuery<Member> query =
    em.createQuery("SELECT m FROM Member m ORDER BY m.username DESC", Member.class);

query.setFirstResult(10);
query.setMaxResults(20);
query.getResultList();
```
- `setFirstResult(10)` 으로, 11번째부터 시작해서 총 20건(`setMaxResults(20)`)의 데이터를 조회한다.

데이터베이스마다 다른 페이징 처리를 같은 API로 처리할 수 있는 것은 이전에 다룬 **데이터베이스 방언** 덕분이다.

### ➰ 집합과 정렬
집합은 집합 함수와 함께 통계 정보를 구할 때 사용한다.

**집합 함수**<br/>
|함수|설명|
|:---:|:---:|
|COUNT|결과 수를 구한다. 반환 타입: `Long`|
|MAX, MIN|최대, 최소 값을 구한다. 문자, 숫자, 날짜 등에 사용한다.|
|AVG|평균값을 구한다. 숫자타입만 사용할 수 있다. 반환 타입: `Double`|
|SUM|합을 구한다. 숫자타입만 사용할 수 있다. 반환 타입: 정수합 `Long`, 소수합: `Double`, `BigInteger` 합: `BigInteger`, `BigDecimal` 합: `BigDecimal`|

**참고사항**
- `NULL` 값은 무시하므로 통계에 잡히지 않는다.
- 만약 값이 없는데 집합 함수를 사용하면 `NULL` 값이 된다. 단 `COUNT` 는 0이 된다.
- `DISTINCT` 를 집합 함수 안에 사용해서 중복된 값을 제거하고 나서 집합을 구할 수 있다.
- `DISTINCT` 를 `COUNT` 에서 사용할 때 임베디드 타입은 지원하지 않는다.

**GROUP BY, HAVING**
- `GROUP BY` 는 통계 데이터를 구할 때 특정 그룹끼리 묶어준다.
- `HAVING` 은 그룹화한 통계 데이터를 기준으로 필터링한다.

### ➰ JPQL 조인
SQL 조인과 기능은 같고 문법만 약간 다르다.

**내부 조인**<br/>
`INNER JOIN` 을 사용한다. 여기서 `INNER` 는 생략 가능하다.

```java
SELECT m FROM Member m INNER JOIN m.team t WHERE t.name = :teamName
```

JPQL 내부 조인 구문을 보면, SQL의 조인과 약간 다르다. JPQL의 가장 큰 특징은 **연관 필드를 사용**한다는 것이다. 이는 다른 엔티티와 연관관계를 가지기 위해 사용하는 필드이다.
- `FROM Member m` : 회원을 선택하고 `m` 이라는 별칭을 주었다.
- `Member m JOIN m.team t` : 회원이 가지고 있는 연관 필드로 팀과 조인한다.

**외부 조인**<br/>
```java
SELECT m FROM Member m LEFT [OUTER] JOIN m.team t
```
- 기능상 SQL의 외부 조인과 같다. `OUTER` 는 생략 가능해서 보통 `LEFT JOIN` 으로 많이 사용한다.

**컬렉션 조인**<br/>
일대다 관계나 다대다 관계처럼 컬렉션을 사용하는 곳에 조인하는 것이다.
- [회원 -> 팀] 으로의 조인은 다대일 조인이면서 단일 값 연관 필드(`m.team`)를 사용한다.
- [팀 -> 회원] 으로의 조인은 반대로 일대다 조인이면서 컬렉션 값 연관 필드(`m.members`)를 사용한다.

**세타 조인**<br/>
`WHERE` 절을 사용해서 세타 조인을 사용할 수 있다. 이는 **내부 조인만 지원**하는 조인이다.
- 전혀 관계없는 엔티티도 조인할 수 있다.

**JOIN ON 절**<br/>
`ON` 절을 사용하면 조인 대상을 필터링하고 조인할 수 있다. 
- 내부 조인의 `ON` 절은 `WHERE` 절을 사용하는 것과 결과가 같아, 보통 `ON` 절은 외부 조인에서만 사용한다.

### ➰ 페치 조인
SQL에서 다루는 조인의 종류는 아니지만 JPQL에서 성능 최적화를 위해 제공하는 기능이다. 
- 연관된 엔티티나 컬렉션을 한 번에 같이 조회하는 기능으로, `join fetch` 명령어로 사용할 수 있다.

```java
페치 조인 ::= [ LEFT [OUTER] | INNER ] JOIN FETCH 조인경로
```

**엔티티 페치 조인**<br/>
연관된 엔티티나 컬렉션을 함께 조회한다.
- 별칭을 사용할 수 없다.

> Hibernate는 별칭을 허용한다.

```java
String jpql = "select m from Member m join fetch m.team";
List<Member> members = em.createQuery(jpql, Member.class).getResultList();
for (Member member : members) {
  //페치 조인으로 회원과 팀을 함께 조회해서 지연 로딩 발생 안 함
  Systern.out.printin("username = " + member.getUsername () + ", " +
    "teamname = " + member.getTeam().name());
}
```
- 회원과 팀을 지연 로딩으로 설정했다고 가정하면,
  - 회원 조회 시 페치 조인을 사용해 팀도 함께 조회했으므로 연관된 팀 엔티티는 프록시가 아닌 실제 엔티티다.
  - 즉, **지연 로딩이 발생하지 않는다.**

**컬렉션 페치 조인**<br/>
일대다 관계인 컬렉션을 페치 조인한다. 
- 팀(일)을 조회하면서 페치 조인을 사용해 연관된 회원 컬렉션(다)도 함께 조회한다.

> 일대다 조인은 결과가 증가할 수 있지만 일대일, 다대일 조인의 결과는 증가하지 않는다.

```java
String jpql = "select t from Team t join fetch t.members where t.name = '팀A'";
List<Member> teams = em.createQuery(jpql, Team.class).getResultList();

for (Team team : teams) {

  System.out.println("teamname = " + team.getName() + ", team = " + team);

  for (Member member : team.getMembers()) {
    //페치 조인으로 팀과 회원을 함께 조회해서 지연 로딩 발생 안 함
    Systern.out.printin("->username = " + member.getUsername () + ", member = " + member);
  }
}
```

**페치 조인과 DISTINCT**<br/>
- SQL의 `DISTINCT` 는 중복된 결과를 제거하는 명령어이다.
- JPQL의 `DISTINCT` 명령어는 SQL에 `DISTINCT` 를 추가하는 것은 물론이고 애플리케이션에서 한 번 더 중복을 제거한다.

**페치 조인과 일반 조인의 차이**<br/>
```java
// 내부 조인 JPQL
select t
from Team t join t.members m
where t.name = '팀A'
```

```sql
-- 실행된 SQL
SELECT  T.*
FROM TEAM TINNER JOIN MEMBER M 
ON T.ID=M.TEAM_ID
WHERE T.NAME = '팀A*'
```

**JPQL은 결과를 반환할 때 연관관계까지 고려하지 않는다.** 단지 SELECT 절에 지정한 엔티티만 조회할 뿐이다.
- 따라서, 팀과 회원 컬렉션을 일반 조인하면 팀 엔티티만 조회하고 연관된 회원 컬렉션은 조회하지 않는다.
- 반면 페치 조인을 사용하면 연관된 엔티티도 함께 조회한다.

**페치 조인의 특징**<br/>
페치 조인을 사용하면 SQL 한 번으로 연관된 엔티티들을 함께 조회할 수 있어서 SQL 호출 횟수를 줄여 성능을 최적화할 수 있다.

다음처럼 엔티티에 직접 적용하는 로딩 전략은 애플리케이션 전체에 영향을 미치므로 **글로벌 로딩 전략**이라고 한다. 
- `@OneToMany(fetch = FetchType.LAZY)`
- 페치 조인은 글로벌 로딩 전략보다 우선한다. 즉, 지연 로딩을 글로벌로 설정해도 JPQL에서 페치 조인을 사용하면 페치 조인을 적용한다.
- **글로벌 로딩 전략은 지연 로딩을 사용하고 최적화가 필요하면 페치 조인을 적용**하는 것이 성능면에서 효과적이다.

또한, 페치 조인을 사용하면 연관된 엔티티를 쿼리 시점에 조회하므로 지연 로딩이 발생하지 않는다.
- 즉, **준영속 상태에서도 객체 그래프를 탐색**할 수 있다.

**페치 조인의 한계**<br/>
- 페치 조인 대상에는 별칭을 줄 수 없다.
  - 별칭을 잘못 사용하면 연관된 데이터 수가 달라져서 데이터 무결성이 깨질 수 있으므로 조심해서 사용해야 한다.
  - 특히 2차 캐시와 함께 사용할 때 조심해야 하는데, 연관된 데이터 수가 달라진 상태에서 2차 캐시에 저장되면 다른 곳에서 조회할 때도 연관된 데이터 수가 달라지는 문제가 발생할 수 있다.
- 둘 이상의 컬렉션을 페치할 수 없다.
  - 구현체에 따라 되기도 하는데 컬렉션 * 컬렉션 카테시안 곱이 만들어 지므로 주의해야 한다.
- 컬렉션을 페치 조인하면 페이징 API(`setFirstResult`, `setMaxResults`)를 사용할 수 없다.
  - 하이버네이트에서 컬렉션을 페치 조인하고 페이징 API를 사용하면 경고 로그를 남기면서 메모리에서 페이징 처리를 하는데, 데이터가 적으면 상관없겠지만 데이터가 많으면 성능 이슈와 메모리 초과 예외가 발생할 수 있어서 위험하다.

> 페치 조인은 객체 그래프를 유지할 때 사용하면 효과적이다. 반면에 여러 테이블을 조인해서 엔티티가 가진 모양이 아닌 전혀 다른 결과를 내야 한다면 억지로 페치 조인을 사용하기 보다는 여러 테이블에서 필요한 필드들만 조회해서 **DTO**로 반환하는 것이 더 효과적일 수 있다.

### ➰ 경로 표현식
.(점)을 찍어 객체 그래프를 탐색하는 것이다.

```sql
select m.username -- 경로 표현식
from Member m
    join m.team t -- 경로 표현식
    join m.orders o -- 경로 표현식
where t.name = '팀A' -- 경로 표현식
```

**용어 정리**
- 상태 필드(state field) : 단순히 값을 저장하기 위한 필드(필드 또는 프로퍼티)
- 연관 필드(association field) : 연관관계를 위한 필드, 임베디드 타입 포함(필드 또는 프로퍼티)
  - 단일 값 연관 필드 : `@ManyToOne` , `@OneToOne` , 대상이 엔티티
  - 컬렉션 값 연관 필드 : `@OneToMany` , `@ManyToMany` , 대상이 컬렉션

```java
@Entity
public class Member {

    @Id @GeneratedValue
    private Long id;
		
    @Column(name="name")
    private String username; // 상태 필드
    private Integer age; // 상태 필드
	
    @ManyToOne(..)
    private Team team; // 연관 필드(단일 값 연관 필드)

    @OneToMany(..)
    private List<Order> orders; // 연관 필드(컬렉션 값 연관 필드)
    ...

}
```
- 상태 필드 : `t.username`, `t.age`
- 단일 값 연관 필드 : `m.team`
- 컬렉션 값 연관 필드 : `m.orders`

**경로 표현식과 특징**<br/>
경로 표현식을 사용해 경로 탐색을 위해서는 다음 3가지 경로에 따라 어떤 특징이 있는지 알아야 한다.
- 상태 필드 경로 : 경로 탐색의 끝이다. 더는 탐색 불가능하다.
- 단일 값 연관 경로 : **묵시적으로 내부 조인**이 일어난다. 단일 값 연관 경로는 계속 탐색할 수 있다.
- 컬렉션 값 연관 경로 : **묵시적으로 내부 조인**이 일어난다. 더는 탐색할 수 없다. 단 FROM 절에서 조인을 통해 별칭을 얻으면 별칭으로 탐색할 수 있다.

> 명시적 조인은 `JOIN` 을 직접 명시하는 것이고, 묵시적 조인은 경로 표현식에 의해 묵시적으로 조인이 일어나는 것으로, 내부 조인(`INNER JOIN`)만 할 수 있다.

**컬렉션 값 연관 경로 탐색**<br/>
JPQL을 다루면서 많이 하는 실수 중 하나는 컬렉션 값에서 경로 탐색을 시도하는 것이다.

```sql
select t.members from Team t -- 성공
select t.members.username from Team t -- 실패
```
- 컬렉션까지는 경로 탐색이 가능하다. 
- 하지만 컬렉션에서 경로 탐색을 시작하는 두 번째 예는 허락되지 않는다. 이를 위해서는 조인을 사용해 새로운 별칭을 획득해야 한다.

**경로 탐색을 사용한 묵시적 조인 시 주의사항**<br/>
경로 탐색을 사용하면 묵시적 조인이 발생해 SQL에서 내부 조인이 일어날 수 있다. 이때 주의사항은 다음과 같다.
- **항상 내부 조인**이다.
- **컬렉션은 경로 탐색의 끝**이다. 컬렉션에서 경로 탐색을 하려면 명시적으로 조인해서 별칭을 얻어야 한다.
- 경로 탐색은 주로 SELECT, WHERE 절(다른 곳에서도 사용됨)에서 사용하지만 묵시적 조인으로 인해 SQL의 FROM 절에 영향을 준다.

> 성능이 주용하면 분석하기 쉽도록 묵시적 조인보다는 **명시적 조인을 사용**하자.

### ➰ 서브 쿼리
JPQL도 SQL처럼 서브 쿼리를 지원한다. 다음과 같은 제약사항이 존재한다.
- 서브 쿼리를 WHERE, HAVING 절에서만 사용할 수 있고,
- SELECT, FROM 절에서는 사용할 수 없다.

> Hibernate의 HQL은 SELECT 절의 서브 쿼리도 허용한다.

```sql
select m from Member m where m.age > (select avg(m2.age) from Member m2)
```
- 평균보다 나이가 많은 회원을 찾는다.

**서브 쿼리 함수**<br/>
- [NOT] EXISTS (subquery)
- { ALL | ANY | SOME } (subquery)
- [NOT] IN (subquery)

**EXISTS**
- 서브 쿼리에 결과가 존재하면 참이다. NOT은 반대

**{ ALL | ANY | SOME }**
- 비교 연산자와 같이 사용한다.
- ALL: 조건을 모두 만족하면 참이다.
- ANY 혹은 SOME: 둘은 같은 의미이다. 조건을 하나라도 만족하면 참이다.

**IN**
- 서브 쿼리의 결과 중 하나라도 같은 것이 있으면 참이다. 서브 쿼리가 아닌 곳에서도 사용한다.

### ➰ 조건식
**타입 표현**
JPQL에서 사용하는 타입은 아래와 같이 표시하고, 대소문자는 구분하지 않는다.

|종류|설명|예제|
|:---:|:---:|:---:|
|문자|작은 따옴표 사이에 표현|'HELLO', 'She''s'|
|숫자|L(Long), D(Double), F(Float)|10L, 10D, 10F|
|날짜|Date{d 'yyyy-dd-dd'}<br/>TIME{t 'hh-mm-ss'}<br/>DATETIME{ts 'yyyy-dd-dd hh:mm:ss.f'}|{d '2012-03-24'}|
|Boolean|TRUE, FALSE||
|Enum|패키지명을 포함한 전체 이름을 사용해야 한다.|jpabook.MemberType.Admin|
|엔티티 타입|엔티티의 타입을 표현한다. 주로 상속과 관련해서 사용한다.|TYPE(m) = Member|

**연산자 우선 순위**
1. 경로 탐색 연산(.)
2. 수학 연산
3. 비교 연산
4. 논리 연산

**컬렉션 식**<br/>
컬렉션에만 사용하는 특별한 기능이다. 컬렉션은 컬렉션 식 이외에 다른 식은 사용할 수 없다.
- 빈 컬렉션 비교 식
  - { 컬렉션 값 연관 경로 } IS [NOT] EMPTY
  - 컬렉션에 값이 비었으면 참
- 컬렉션의 멤버 식
  - { 엔티티나 값 } [NOT] MEMBER [OF] { 컬렉션 값 연관 경로 }
  - 엔티티나 값이 컬렉션에 포함되어 있으면 참

**스칼라 식**<br/>
숫자, 문자, 날짜, case, 엔티티 타입 같은 가장 기본적인 타입들을 스칼라라고 한다.
- 수학 식
  - 단항 연산자, 사칙연산
- 문자함수
  - CONCAT, SUBSTRING, TRIM, LOWER, UPPER, LENGTH, LOCATE
- 수학 함수
  - ABS, SQRT, MOD, SIZE, INDEX
- 날짜 함수
  - 데이터베이스의 현재 시간을 조회한다.
  - CURRENT_DATE, CURRENT_TIME, CURRENT_TIMESTAMP

**CASE 식**<br/>
특정 조건에 따라 분기할 때 CASE 식을 사용한다.
- 기본 CASE
  - ```sql
    CASE {WHEN <조건식> THEN <스칼라식>} + 
      ELSE <스칼라식>
    END
    ```
- 심플 CASE
  - 조건식을 사용할 수 없지만, 문법이 단순하다.
  - ```sql
    CASE <조건대상> + {WHEN <스칼라식1> THEN <스칼라식2>} +
      ELSE <스칼라식>
    END
    ```
- COALESCE
  - 스칼라식을 차례대로 조회해서 `null` 이 아니면 반환한다.
  - `COALESCE(<스칼라식> {,<스칼라식>}+)`
- NULLIF
  - 두 값이 같으면 `null` 을 반환하고 다르면 첫 번째 값을 반환한다.
  - 집합 함수는 `null` 을 포함하지 않아 보통 집합 함수와 함께 사용한다.
  - `NULLIF(<스칼라식>, <스칼라식>)`

### ➰ 다형성 쿼리
JPQL로 부모 엔티티를 조회하면 그 자식 엔티티도 함께 조회한다.
- `Item` 의 자식 엔티티로 `Book` , `Album` , `Movie` 가 있다고 가정한다.
- `Item` 을 조회하면 그 자식도 함께 조회한다.

**TYPE**<br/>
엔티티의 상속 구조에서 조회 대상을 특정 자식 타입으로 한정할 때 사용한다.

```java
// Item 중 Book, Movie를 조회하라.

// JPQL
select i from Item i
where type(i) IN (Book, Movie)

// SQL
SELECT i FROM Item i
WHERE i.DTYPE in ('B', 'M')
```

**TREAT**<br/>
JPA 2.1에 추가된 기능으로, 자바의 타입 캐스팅과 비슷하다. 상속 구조에서 부모 타입을 특정 자식 타입으로 다룰 때 사용한다.
```java
// JPQL 
select i from Item i where treat(i as Book).author = 'kim'
```
- 부모 타입인 `Item` 을 자식 타입인 `Book` 으로 다뤄 `author` 필드에 접근할 수 있다.

### ➰ 사용자 정의 함수 호출(JPA 2.1)
`function_invocation::= FUNCTION(function_name {, function_arg})`
- Hibernate 구현체를 사용하면 **방언 클래스를 상속**해서 구현하고 사용할 데이터베이스 함수를 미리 등록해야 한다.
- 그리고 `hibernate.dialect` 에 해당 방언을 등록해야 한다.

### ➰ 기타 정리
- `enum` 은 = 비교 연산만 지원한다.
- 임베디드 타입은 비교를 지원하지 않는다.

**EMPTY STRING**<br/>
JPA 표준은 ''을 길이 0인 Empty String으로 정했지만, 데이터베이스에 따라 `NULL` 로 사용하는 데이터베이스도 있어 확인이 필요하다.

**NULL 정의**
- 조건을 만족하는 데이터가 하나도 없는 경우
- `NULL` 은 알 수 없는 값이다. `NULL` 과의 모든 수학적 계산 결과는 `NULL` 이다.
- `Null == Null` 은 알 수 없는 값이다.
- `Null is Null` 은 참이다.

### ➰ 엔티티 직접 사용
**기본 키 값**<br/>
객체 인스턴스는 참조 값으로 식별하고, 테이블 로우는 기본 키 값으로 식별한다.
- 따라서 **JPQL에서 엔티티 객체를 직접 사용**하면 **SQL에서는 해당 엔티티의 기본 키 값을 사용**한다.

**외래 키 값**<br/>
특정 팀에 소속된 회원을 찾는 예제로 확인한다.
```java
Team team = em.find(Team.class, 1L);

String qlString = "select m from Member m where m.team = :team";
List resultList = em.createQuery(qlString)
    .setParameter("team", team);
    .getResultList();
```
- 기본 키 값이 1L인 팀 엔티티를 파라미터로 사용하고 있다.
- `m.team` 은 현재 `team_id` 라는 외래 키와 매핑되어 있다.

```sql
select m.* from Member m where m.team_id = ?
```

엔티티 대신 식별자 값을 직접 사용할 수 있다.
```java
String qlString = "select m from Member m where m.team.id = :teamId";
List resultList = em.createQuery(qlString)
    .setParameter("teamId", 1L);
    .getResultList();
```
- `m.team.id` 를 보면 `Member` 와 `Team` 간 묵시적 조인이 발생할 것 같지만, `MEMBER` 테이블이 외래 키를 가지고 있어 발생하지 않는다.

> `m.team` 을 사용하든, `m.team.id` 를 사용하든 생성되는 SQL은 같다.

### ➰ Named 쿼리: 정적 쿼리
JPQL은 크게 동적 쿼리와 정적 쿼리로 나눌 수 있다.
- **동적 쿼리**
  - JPQL을 문자로 완성해서 직접 넘기는 것
  - 런타임에 특정 조건에 따라 동적으로 구성할 수 있다.
- **정적 쿼리**
  - 미리 정의한 쿼리에 이름을 부여해 필요할 때 사용하는 것, Named 쿼리라 한다.
  - 한 번 정의하면 변경할 수 없다.

Named 쿼리는 애플리케이션 로딩 시점에 JPQL 문법 체크 후 미리 파싱해둔다.
- 오류를 빨리 확인할 수 있고, 사용하는 시점에는 파싱된 결과를 재사용하여 성능상 이점도 있다.
- 정적 SQL을 생성하므로, 데이터베이스의 조회 성능 최적화에도 도움이 된다.

**Named 쿼리를 어노테이션에 정의**<br/>
`@NamedQuery` annotation을 사용한다.
```java
@Entity
@NamedQuery (
  name = "Member.findByUsername",
  query = "select m from Member m where m.username = :username")
public class Member {
  ...

}
```
- `name` 에 이름을 부여하고, `query` 에 사용할 쿼리를 입력한다.
- 사용 시에는 `em.createNamedQuery()` 메소드에 Named 쿼리 이름을 입력하여 사용한다.
- 여러 개의 쿼리를 사용하기 위해서는 `@NamedQueries` annotation을 사용할 수 있다.

> 엔티티 이름을 쿼리 이름 앞에 붙여 영속성 유닛 단위로 관리되는 Named 쿼리의 충돌을 방지한다.

`@NamedQuery` annotation
- `lockMode` : 쿼리 실행 시 락을 건다. (default: NONE)
- `hints` : SQL 힌트가 아니라 JPA 구현체에게 제공하는 힌트다. 

**Named 쿼리를 XML에 정의**<br/>
JPA에서 annotation으로 작성할 수 있는 것은 XML로도 작성할 수 있다. 
- 자바에서 멀티라인 문자를 다루는 것은 상당히 귀찮은데, XML을 사용하는 것이 현실적인 대안이 될 수 있다.

```xml
<!-- META-INF/ormMember.xml -->
<named-query name="Member.findByUsername">
  <query><CDATA[
    select m
    from Member m
    where m.username = :username
  ]></query>
</named-query>

<named-query name="Member.count">
  <query>select count(m) from Member m</query>
</named-query>
```

작성한 xml을 인식하도록 코드를 추가한다.

```xml
<!-- META-INF/persistence.xml -->
<persistence-unit name="jpabook">
  <mapping-file>META-INF/ormMember.xml</mapping-file>
  ...

```

> `META-INF/orm.xml` 은 기본 매핑 파일로 인식한다.

**환경에 따른 설정**<br/>
XML과 annotation에 같은 설정이 있다면 **XML이 우선권**을 가진다.

---

## 💫 Criteria
JPQL을 자바 코드로 작성하도록 도와주는 빌더 클래스 API이다.
- 문자가 아닌 코드로 JPQL을 작성해 문법 오류를 컴파일 단계에서 확인할 수 있다.
- 문자 기반의 JPQL보다 동적 쿼리를 안전하게 생성할 수 있다.
- 코드가 복잡하고 장황해서 직관적인 이해가 어렵다는 단점이 있다.

### ➰ Criteria 기초
Criteria API는 `javax.persistence.criteria` 패키지에 있다.

```java
CriteriaBuilder cb = em.getCriteriaBuilder();

CriteriaQuery<Member> cq = cb.createQuery(Member.class); // 반환타입 지정

Root<Member> m = cq.from(Member.class); // FROM 절
cq.select(m);

TypedQuery<Member> query = em.createQuery(cq);
List<Member> members = query.getResultList();
```
- Criteria 쿼리 생성을 위해서는 Criteria 빌더를 얻어야 한다. EntityManager나 EntityManagerFactory에서 얻을 수 있다.
- Criteria 쿼리 빌더에서 Criteria 쿼리를 생성한다. 이때 반환 타입을 지정할 수 있다.
- FROM 절을 생성한다. 반환된 값은 별칭이고, 이를 조회의 시작점으로 잡는다.

검색 조건과 정렬 조건을 추가한다.
```java
CriteriaBuilder cb = em.getCriteriaBuilder();

CriteriaQuery<Member> cq = cb.createQuery(Member.class); 

Root<Member> m = cq.from(Member.class); 

Predicate usernameEqual = cb.equal(m.get("username"), "회원1");

javax.persistence.criteria.Order ageDesc = cb.desc(m.get("age"));

cq.select(m)
    .where(usernameEqual)
    .orderBy(ageDesc);

List<Member> resultList = em.createQuery(cq).getResultList();
```

**쿼리 루트와 별칭**
- 쿼리 루트는 조회의 시작점이다.
- 별칭은 엔티티에만 부여할 수 있다.

`m.get("age")` 메소드는 `age` 의 타입 정보를 모르기 때문에 `m.<Integer>get("age")` 와 같이 제네릭으로 반환 타입 정보를 명시해야 한다.(`String` 같은 문자 타입은 지정하지 않아도 된다.)

### ➰ Criteria 쿼리 생성
`CriteriaBuilder.createQuery()` 메소드로 Criteria 쿼리를 생성해 사용한다.
- `CriteriaBuilder` interface를 보면, 쿼리 생성 시 파라미터로 쿼리 결과에 대한 반홭 타입을 지정할 수 있다.
  - 반환 타입을 지정했다면, `em.createQuery()` 에서 반환 타입을 지정하지 않아도 된다.
- 반환 타입을 지정할 수 없거나, 반환 타입이 둘 이상이면 타입 명시 없이 `Object` 로 반환받는다.
  - 물론 반환 타입이 둘 이상미녀 `Object[]` 를 사용하는 것이 편리하다.

### ➰ 조회
`CriteriaQuery` interface 의 `select` , `multiselect` 메소드

**조회 대상을 한 건, 여러 건 지정**
- `select` 에 조회 대상을 하나만 지정하려면 `cq.select(m)` 과 같이 작성한다.
- 조회 대상을 여러 건 지정하려면 `cq.multiselect(m.get("username"), m.get("age"));` 과 같이 작성한다.
  - 여러 건 지정은 `cb.array` 사용도 가능하다.

**DISTINCT**<br/>
`select` , `multiselect` 다음에 `distinct(true)` 로 사용한다.

**NEW, construct()**<br/>
JPQL에서 `select new 생성자()` 구문을 Criteria에서는 `cb.construct(클래스 타입, ...)` 로 사용한다.

**튜플**<br/>
Criteria는 `Map` 과 비슷한 **튜플**이라는 특별한 반환 객체를 제공한다.

```java
CriteriaQuery<Tuple> cq = cb.createTupleQuery();

cq.multiselect (
  m.get("username").alias("username"), // 튜플에서 사용할 별칭 지정
  m.get("age").alias("age")
);

TypedQuery<Tuple> query = em.createQuery(cq);
List<Tuple> resultList = query.getResultList();
for (Tuple tuple : resultList) {
  // 튜플 별칭으로 조회
  String username = tuple.get("username", String.class);
  Integer age = tuple.age("age", Integer.class);
}
```
- 튜플을 사용하려면 `cb.createTupleQuery` 또는 `cb.createQuery(Tuple.class)` 로 Criteria를 생성한다.
- 튜플은 튜플의 검색 키로 사용할 **튜플 전용 별칭을 필수로 할당**해야 한다.
- 선언해둔 튜플 별칭으로 데이터를 조회한다.
- 튜플은 이름 기반으로, 순서 기반의 `Object[]` 보다 안전하다. 
- `tuple.getElements()` 같은 메소드로 현재 튜플의 별칭과 자바 타입도 조회할 수 있다. 

### ➰ 집합
**GROUP BY**
```java
cq.groupBy(m.get("team").get("name"))
```
- JPQL의 `group by m.team.name` 과 같다.

**HAVING**
```java
cq.multiselect(m.get("team").get("name"), maxAge, minAge)
    .groupBy(m.get("team").get("name"))
    .having(cb.gt(minAge, 10));
```
- JPQL의 `having min(m.age) > 10` 과 같다.

### ➰ 정렬
`cb.desc()...` 또는 `cb.asc(...)` 로 생성할 수 있다.

### ➰ 조인
`join()` 메소드와 `JoinType` 클래스를 사용한다.

```java
public enum JoinType {

  INNER, (default)
  LEFT,
  RIGHT

}
```
```java
Root<Member> m = cq.from(Member.class);
Join<Member, Team> t = m.join("team", JoinType.INNER); // 내부 조인 설정

cq.multiselect(m, t);
  .where(cb.equal(t.get("name"), "팀A"));
```

FETCH JOIN은 다음과 같이 설정한다.
```java
Root<Member> m = cq.from(Member.class);
m.fetch("team", JoinType.LEFT);

cq.select(m);
```

### ➰ 서브 쿼리
**간단한 서브 쿼리**<br/>
메인 쿼리와 서브 쿼리 간 관련이 없는 서브 쿼리를 말한다.

```java
CriteriaQuery<Member> mainQuery = cb.createQuery(Member.class);

Subquery<Double> subQuery = mainQuery.subquery(Double.class);
Root<Member> m2 = subQuery.from(Member.class);
subQuery.select(cb.avg(m2.<Integer>get("age")));

Root<Member> m = mainQuery.from(Member.class);
mainQuery.select(m)
  .where(cb.ge(m.<Integer>get("age"), subQuery));
```
1. 서브 쿼리는 `mainQuery.subquery()` 로 생성한다.
2. 메인 쿼리는 `where(..., subQuery)` 에서 생성한 서브 쿼리를 사용한다.

**상호 관련 서브 쿼리**<br/>
메인 쿼리와 서브 쿼리 간 관련이 있는 경우이다.
- 서브 쿼리에서 메인 쿼리의 정보를 사용하려면 메인 쿼리에서 사용한 별칭을 얻어야 한다.
  - 메인 쿼리의 `Root` 나 `Join` 을 통해 생성된 별칭을 받아 사용한다. 이때 `Root<Member> subM = subQuery.correlate(m);` 을 사용해 메인 쿼리의 별칭을 가져올 수 있다.

### ➰ IN 식
Criteria 빌더에서 `in(...)` 메소드를 사용한다.

### ➰ CASE 식
`selectCase()` 메소드와 `when()` , `otherwise()` 메소드를 사용한다.

### ➰ 파라미터 정의
JPQL에서 `:PARAM1` 처럼 파라미터를 정의했듯 정의할 수 있다.

```java
cq.select(m)
    .where(cb.equal(m.get("username"), cb.parameter(String.class, "usernameParam"))); // 파라미터 정의

List<Member> resultList = em.createQuery(cq)
    .setParameter("usernameParam", "회원1") // 바인딩
    .getResultList();
```

### ➰ 네이티브 함수 호출
네이티브 SQL 함수 호출을 위해서는 `cb.function(...)` 메소드를 사용하면 된다.

### ➰ 동적 쿼리
다양한 검색 조건에 따라 실행 시점에 쿼리를 생성하는 것을 동적 쿼리라 한다.
- 코드 기반인 Criteria로 작성하는 것이 편리하다.
- 공백이나 `where` , `and` 의 위치로 인한 에러가 발생하지는 않는다.
- 하지만 장황하고 복잡하다는 단점이 크다.

### ➰ 함수 정리
Criteria는 JPQL 빌더 역할을 해 JPQL 함수를 코드로 지원한다.
- Expression의 메소드(`isNull()` , `isNotNull()` , `in()`)
- 조건 함수
- 스칼라와 기타 함수
- 집합 함수
- 분기 함수

### ➰ Criteria 메타 모델 API
코드 기반의 Criteria는 컴파일 시점에 오류를 발견할 수 있다.
- 하지만 `m.get("age")` 에서 `age` 는 문자다. 이를 `aggeadf` 라고 적어도 컴파일 시점에 에러를 발견하지 못한다.
  - 따라서 완전한 코드 기반이라 할 수 없다.
- 이런 부분까지 코드로 작성하기 위해서는 메타 모델 API를 사용하면 된다. 먼저 메타 모델 클래스를 생성한다.

**메타 모델 API 적용 전**
```java
cq.select(m)
    .where(cb.gt(m.<Integer>get("username"), 20))
    .orderBy(cb.desc(m.get("age")));
```
**메타 모델 API 적용 후**
```java
cq.select(m)
    .where(cb.gt(m.get(Member_.age),20))
    .orderBy(cb.desc(m.get(Member_.age)));
```
- 문자 기반에서 정적인 코드 기반으로 변경되었다. 
  - 이를 위해서는 `Member_` 클래스가 필요한데, 이를 **메타 모델 클래스**라 한다.
- 메타 모델 클래스는 해당 엔티티를 기반이고, 코드 자동 생성기가 `엔티티명_.java` 모양의 메타 모델 클래스를 생성해준다.
  - Hibernate 구현체는 `org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor` 를 사용한다.

**코드 생성기 설정**<br/>
보통 메이븐이나 엔트, 그래들 같은 빌드 도구를 사용해 코드 생성기를 실행한다.
- 메이븐을 기준으로, `hibernate-jpamodelgen` 과 `maven-compiler-plugin` 설정을 추가한다.
- `mvn compile` 명령어를 사용해 메타 모델 클래스를 생성한다.

--- 

## 💫 QueryDSL
JPQ Criteria는 문자가 아닌 코드로 JPQL를 작성하여 문법 오류를 컴파일 단계에서 잡을 수 있고, IDE 자동완성 기능의 도움을 받을 수 있는 등 여러 장점이 있지만, 복잡하고 장황하다는 큰 단점이 존재한다. 

쿼리를 문자가 아닌 코드로 작성해도, 쉽고 간결하며 그 모양도 쿼리와 비슷하게 개발할 수 있는 프로젝트가 바로 QueryDSL이다.
- JPQL 빌더 역할을 하는데, JPA Criteria를 대체할 수 있다.
- 쿼리 즉 데이터를 조회하는데 기능이 특화되어 있다.

### ➰ QueryDSL 설정
gradle 기준!

**📌 필요 라이브러리**<br/>
```xml
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
implementation 'com.querydsl:querydsl-jpa'
implementation 'com.querydsl:querydsl-apt'
```
- `querydsl-jpa` : QueryDSL JPA 라이브러리
- `querydsl-apt` : 쿼리 타입(Q)을 생성할 때 필요한 라이브러리

**📌 환경설정**<br/>
QueryDSL을 사용하기 위해서는 Criteria의 메타 모델처럼 엔티티를 기반으로 쿼리 타입이라는 쿼리용 클래스를 생성해야 한다. (Q클래스라고도 한다.)
- `build.gradle` 에 쿼리 타입을 생성할 위치를 지정하고, `Gradle` -> `build` 하면 쿼리 타입이 해당 경로에 생성된다.

```java
// queryDSL이 생성하는 QClass 경로 설정
def querydslDir = "$buildDir/generated/querydsl"

querydsl {
	library = "com.querydsl:querydsl-apt"
	jpa = true
	querydslSourcesDir = querydslDir
}

sourceSets {
	main.java.srcDir querydslDir
}

configurations {
	querydsl.extendsFrom compileClasspath
}

compileQuerydsl {
	options.annotationProcessorPath = configurations.querydsl
}
```

```java
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Configuration
public class QuerydslConfig {

    @PersistenceContext
    private EntityManager em;

    @Bean
    public JPAQueryFactory jpaQueryFactory() {
        return new JPAQueryFactory(em);
    }
}
```
- 그리고 엔티티 매니저를 주입한 JPAQueryFactory를 Bean으로 등록하여 프로젝트 전역에서 QueryDSL을 작성할 수 있게 한다.

### ➰ 시작
```java
public void queryDSL() {

  ...
  
  EntityManager em = emf.createEntityManager();

  JPAQuery query = new JPAQuery(em);
  QMember qMember = new QMember("m");
  List<Member> members = 
      query.from(qMember)
           .where(qMember.name.eq("회원1"))
           .orderBy(qMember.name.desc())
           .list(qMember);
}
```
- QueryDSL을 사용하기 위해서는 `JPAQuery` 객체를 생성해야 하는데, 이때 엔티티 매니저를 생성자에 넘겨준다.
- 그리고 사용할 쿼리 타입을 생성하는데, 생성자에는 별칭을 넘겨준다.
  - 이 별칭을 JPQL에서 별칭으로 사용한다.

**📌 기본 Q 생성**<br/>
쿼리 타입은 사용하기 편리하도록 기본 인스턴스를 보관하고 있다.
- 하지만 같은 엔티티를 조인하거나 같은 엔티티를 서브 쿼리에 사용하면 같은 별칭이 사용되므로, 이때는 별칭을 직접 지정해서 사용해야 한다.

```java
public class QMember extends EntityPathBase<Member> {

  public static final QMember member = new QMember("member1");
  ...

}
```

```java
QMember qMember = new QMember("m"); // 직접 지정
QMember qMember = QMember.member;   // 기본 인스턴스 사용
```
- 쿼리 타입은 위와 같이 사용할 수 있다.
- 기본 인스턴스를 사용하면 `import static` 을 사용해 더 간결한 코드를 작성할 수 있다.

### ➰ 검색 조건 쿼리
```java
JPAQuery query = new JPAQuery(em);
QItem item = QItem.item;
List<Item> list = query.from(item)
    .where(item.name.eq("좋은 상품").and(item.price.gt(20000)))
    .list(item);
```
- QueryDSL의 `where` 절에는 `and` 나 `or` 을 사용할 수 있다. 또한 여러 검색 조건을 사용할 수 있다.

### ➰ 결과 조회
쿼리 작성이 끝나고 결과 조회 메소드를 호출하면 실제 데이터베이스를 조회한다. 
- 보통 `uniqueResult()` 나 `list()` 를 사용하고 파라미터로 프로젝션 대상을 넘겨준다.
- 결과 조회 API는 `com.mysema.query.Projectable` 에 정의되어 있다.

**`uniqueResult()`**
- 조회 결과가 한 건일 때 사용한다. 
- 조회 결과가 없으면 `null` 을 반환하고 결과가 하나 이상이면 `NonUniqueResultException` 예외가 발생한다.

**`singleResult()`**
- `uniqueResult()` 와 같지만 결과가 하나 이상이면 처음 데이터를 반환한다.

**`list()`** 
- 결과가 하나 이상일 때 사용한다.
- 결과가 없으면 빈 컬렉션을 반환한다.

### ➰ 페이징과 정렬
```java
QItem item = QItem.item;

query.from(item)
    .where(item.price.gt(20000))
    .orderBy(item.price.desc(), item.stockQuantity.asc())
    .offset(10).limit(20)
    .list(item);
```
- 정렬은 `orderBy()` ,`asc()` , `desc()` 을 사용한다.
- 페이징은 `offset` , `limit` 를 사용한다.
  - `restrict()` 메소드에 `new QueryModifiers(20L, 10L)` 를 파라미터로 사용해도 된다. 
  - 파라미터의 `20L` 과 `10L` 은 각각 **limit**, **offset**을 의미한다.

실제 페이징 처리를 위해서는 **검색된 전체 데이터 수**를 알아야 한다.
- 이땐 `list()` 대신 `listResult()` 를 사용한다.
  - 전체 데이터 조회를 위한 `count` 쿼리를 한 번 더 실행한다.
  - 그리고 `SearchResults` 를 반환하는데, 이 객체에서 전체 데이터 수(`getTotal()`)를 조회할 수 있다.

### ➰ 그룹
`groupBy` 를 사용하고 그룹화된 결과를 제한하려면 `having` 을 사용한다.

### ➰ 조인
`innerJoin(join)` , `leftJoin` , `rightJoin` , `fullJoin` 을 사용할 수 있고, 추가로 JPQL의 `on` 과 성능 최적화를 위한 `fetch` 조인도 사용할 수 있다.
- 기본 문법은 첫 번째 파라미터에 조인 대상을 지정하고, 두 번째 파라미터에 별칭으로 사용할 쿼리 타입을 지정한다.

```java
// 가장 기본적인 조인 방법

QOrder order = QOrder.order;
QMember member = QMember.member;
QOrderItem orderItem = QOrderItem.orderItem;

query.from(order)
    .join(order.member, member)
    .leftJoin(order.orderItems, orderItem)
    .list(order);
```

```java
// 조인에 on을 사용한 예

...

query.from(order)
    .leftJoin(order.orderItems, orderItem)
    .on(orderItem.count.gt(2))
    .list(order);
```

```java
// 페치 조인을 사용한 예

...

query.from(order)
    .innerJoin(order.member, member).fetch()
    .leftJoin(order.orderItems, orderItem).fetch()
    .list(order);
```

```java
// 세타 조인을 사용한 예

QOrder order = QOrder.order;
QMember member = QMember.member;

query.from(order, member)
    .where(order.member.eq(member))
    .list(order);
```

### ➰ 서브 쿼리
서브 쿼리는 `JPASubQuery` 를 생성해 사용한다.
- 결과가 하나면 `unique()` , 여러 건이면 `list()` 를 사용한다.

```java
// 서브 쿼리 - 한 건
QItem item = QItem.item;
QItem itemSub = new QItem("itemSub");

query.from(item)
    .where(item.price.eq(
      new JPASubQuery().from(itemSub).unique(itemSub.price.max())
    ))
    .list(item);
```

### ➰ 프로젝션과 결과 반환
**📌 프로젝션 대상이 하나**
- 프로젝션 대상이 하나면 해당 타입으로 반환한다.

**📌 여러 컬럼 반환과 튜플**
- 프로젝션 대상으로 여러 필드를 선택하면, QueryDSL은 기본으로 **Tuple**을 사용한다. 
  - `List<Tuple>` 로 반환받는다.
  - 조회 결과는 `tuple.get()` 메소드에 조회한 쿼리 타입을 지정하면 된다.

**📌 빈 생성**
- 쿼리 결과를 엔티티가 아닌 특정 객체로 받고 싶다면, **빈 생성(Bean population) 기능**을 사용한다.
  - 프로퍼티 접근
  - 필드 직접 접근
  - 생성자 사용
- 원하는 방법 지정을 위해서는 `com.mysema.query.types.Projections` 를 사용하면 된다.

먼저 **프로퍼티 접근(`Setter`) 방식**이다.
```java
QItem item = QItem.item;
List<ItemDTO> result = query.from(item).list(
  Projections.bean(ItemDTO.class, item.name.as("username"), item.price));
```
- `Projections.bean()` 은 수정자(`Setter`)를 사용해 값을 채운다.
- 쿼리 결과와 매핑할 프로퍼티 이름이 다르다면 `as` 를 사용해서 별칭을 사용하면 된다.

먼저 **필드 직접 접근 방식**이다.
```java
QItem item = QItem.item;
List<ItemDTO> result = query.from(item).list(
  Projections.fields(ItemDTO.class, item.name.as("username"), item.price));
```
- `Projections.fields()` 를 사용해 필드에 직접 접근해 값을 채운다.
- 필드를 `private` 로 설정해도 동작한다.

먼저 **생성자 방식**이다.
```java
QItem item = QItem.item;
List<ItemDTO> result = query.from(item).list(
  Projections.constructor(ItemDTO.class, item.name, item.price));
```
- `Projections.constructor()` 는 생성자를 사용한다. 
- 지정한 프로젝션과 파라미터 순서가 같은 생성자가 필수적이다.

### ➰ 수정, 삭제 배치 쿼리
JPQL 배치 쿼리와 같이 **영속성 컨텍스트를 무시하고 데이터베이스를 직접 쿼리**한다는 점을 유의해야 한다.
- 수정 배치 쿼리는 `com.mysema.query.jpa.impl.JPAUpdateClause` 를 사용하고,
- 삭제 배치 쿼리는 `com.mysema.query.jpa.impl.JPADeleteClause`

### ➰ 동적 쿼리
`com.mysema.query.BooleanBuilder` 를 사용하면 특정 조건에 따른 동적 쿼리를 편리하게 생성할 수 있다.
- `BooleanBuilder.and()` 메소드로 쿼리를 붙여 작성할 수 있다.

### ➰ 메소드 위임
메소드 위임(Delegate methods) 기능으로 쿼리 타입에 검색 조건을 직접 정의할 수 있다.

```java
public class ItemExpression {

  @QueryDelegate(Item.class)
  public static BooleanExpression isExpensive(QItem item, Integer price) {
    return item.price.gt(price);
  }
}
```
- 먼저 정적(`static`) 메소드를 만들고,
- `@QueryDelegate` annotation에 속성으로 이 기능을 적용할 엔티티를 지정한다.

---

## 💫 네이티브 SQL
JPQL은 표준 SQL이 지원하는 대부분의 문법과 SQL 함수들을 지원하지만, 특정 데이터베이스에 종속적인 기능은 지원하지 않는다.
- 특정 데이터베이스만 지원하는 함수, 문법, SQL 쿼리 힌트
- 인라인 뷰(FROM 절에서 사용하는 서브 쿼리), UNION, INTERSECT
- Stored procedure

하지만 때로는 특정 데이터베이스에 종속적인 기능이 필요하므로, 아래와 같이 JPA 구현체들은 다양한 방법을 지원한다.(JPA보다 더 다양한 방법 지원)
- 특정 데이터베이스만 사용하는 함수
  - JPQL에서 네이티브 SQL 함수를 호출할 수 있다.
  - Hibernate는 데이터베이스 방언에 각 데이터베이스에 종속적인 함수들을 정의했다. 또한 직접 정의할 수도 있다.
- 특정 데이터베이스만 지원하는 SQL 쿼리 힌트
  - Hibernate를 포함한 몇몇 JPA 구현체들이 지원한다.
- 인라인 뷰(FROM절에서 사용하는 서브 쿼리), UNION, INTERSECT
  - 일부 JPA 구현체들이 지원한다.
- Stored procedure
  - JPQL에서 호출할 수 있다.
- 특정 데이터베이스만 지원하는 문법
  - 너무 종속적인 SQL 문법은 지원하지 않아 네이티브 SQL을 사용해야 한다.

JPQL을 사용할 수 없을 때 JPA는 SQL을 직접 사용할 수 있는 기능을 제공하는데 이를 네이티브 SQL이라 한다.
- JPQL을 사용하면 JPA가 SQL을 생성한다.

**📌 JPA가 지원하는 네이티브 SQL과 JDBC API를 직접 사용하는 것의 차이**
- 네이티브 SQL을 사용하면 엔티티를 조회할 수 있고,
- JPA가 지원하는 영속성 컨텍스트의 기능을 그대로 사용할 수 있다.

### ➰ 네이티브 SQL 사용
네이티브 쿼리 API는 다음 3가지가 있다.

```java
// 결과 타입 정의
public Query createNativeQuery(String sqlString, Class resultClass);

// 결과 타입을 정의할 수 없는 경우
public Query createNativeQuery(String sqlString);

// 결과 매핑 사용
public Query createNativeQuery(String sqlString, String resultSetMapping);
```

**📌 엔티티 조회**<br/>
네이티브 SQL은 `em.createNativeQuery()` 를 사용한다. 
- 첫 번째 파라미터는 네이티브 SQL을 입력하고,
- 두 번째 파라미터는 조회할 엔티티 클래스의 타입을 입력한다.

> JPQL과 흡사하지만 실제 데이터베이스 SQL을 사용한다는 것과, 위치기반 파라미터만 지원한다는 차이가 있다.

**"가장 중요한 점은 네이티브 SQL로 SQL만 직접 사용할 뿐이지 나머지는 JPQL을 사용할 떄와 같다. 조회한 엔티티도 영속성 컨텍스트에서 관리된다."**

**📌 값 조회**<br/>
값으로만 조회하는 경우 `em.createNativeQuery()` 의 두 번째 파라미터를 사용하지 않으면 된다.
- 조회한 값들은 `Object[]` 에 담아서 반환된다.
- 스칼라 값들을 조회했으므로 영속성 컨텍스트에서 관리되지 않는다.

**📌 결과 매핑 사용**<br/>
엔티티와 스칼라 값을 함께 조회하는 경우처럼 **매핑이 복잡**해지면, `@SqlResultSetMapping` 을 정의해서 결과 매핑을 사용해야 한다.
- `em.createNativeQuery()` 의 두 번째 파라미터에 정의한 결과 매핑 정보의 이름을 사용한다.

```java
// 결과 매핑 정의
@Entity
@SqlResultSetMapping(name = "memberWithOrderCount",
    entities = {@EntityResult(entityClass = Member.class)},
    columns = {@ColumnResult(name = "ORDER_COUNT")}
)
public class Member {...}
```
- 회원 엔티티와 `ORDER_COUNT` 컬럼을 매핑했다.
- 여러 엔티티와 컬럼들을 매핑할 수 있다.

**📌 결과 매핑 annotation**<br/>
- `@SqlResultSetMapping` 속성
  - name : 결과 매핑 이름
  - entities : `@EntityResult` 를 사용해서 엔티티를 결과로 매핑한다.
  - columns : `@ColumnResult` 를 사용해서 컬럼을 결과로 매핑한다.
- `@EntityResult` 속성
  - entityClass : 결과로 사용할 엔티티 클래스를 지정한다.
  - fields : `@FieldResult` 를 사용해서 결과 컬럼을 필드와 매핑한다.
  - discriminatorColumn : 엔티티의 인스턴스 타입을 구분하는 필드(상속에서 사용)
- `@FieldResult` 속성
  - name : 결과를 받을 필드명
  - column : 결과 컬럼명
- `@ColumnResult` 속성
  - name : 결과 컬럼명

### ➰ Named 네이티브 SQL
JPQL처럼 Named 네이티브 SQL을 사용해서 정적 SQL을 작성할 수 있다.
- 이때 `@NamedNativeQuery` annotation으로 Named 네이티브 SQL을 등록한다.

```java
TypedQuery<Member> nativeQuery = 
    em.createNamedQuery("Member.memberSQL", Member.class)
        .setParameter(1, 20);
```
- JPQL Named 쿼리와 같은 `createNamedQuery` 메소드를 사용한다. 따라서 `TypeQuery` 를 사용할 수 있다.
- 이후 Named 네이티브 쿼리에서 `resultSetMapping` 속성을 사용해서 조회 결과를 매핑할 대상을 지정할 수 있다.

**📌 @NamedNativeQuery**<br/>
- name : Named 쿼리 이름 (필수)
- query : SQL 쿼리 (필수)
- hints : 벤더 종속적인 힌트
- resultClass : 결과 클래스
- resultSetMapping : 결과 매핑 사용

### ➰ 네이티브 SQL XML에 정의
XML에 정의 시, 
1. `<named-native-query>` 를 먼저 정의하고,
2. `<sql-result-set-mapping>` 을 정의해야 한다.

### ➰ 네이티브 SQL 정리
네이티브 SQL도 JPQL을 사용할 때와 마찬가지로 `Query` , `TypeQuery`(Named 네이티브 쿼리의 경우만!)를 반환한다.
- 따라서 **JPQL API를 그대로 사용**할 수 있다.

네이티브 SQL은 JPQL이 자동 생성하는 SQL을 수동으로 직접 정의하는 것이다.
- 따라서 **JPA가 제공하는 기능 대부분을 그대로 사용**할 수 있다.

### ➰ 스토어드 프로시저
JPQ 2.1부터 지원한다.

**📌 스토어드 프로시저 사용**<br/>
입력 값을 두 배로 증가시켜 주는 스토어드 프로시저가 있다.
- 첫 번째 파라미터로 값을 입력받고, 두 번째 파라미터로 결과를 반환한다.

```sql
DELIMITER //

CREATE PROCEDURE proc_multiply (INOUT inParam INT, INOUT outParam INT)
BEGIN
  SET outParam = inParam * 2;
END //
```

JPA로 이 스토어드 프로시저를 호출하기 위해서는,
- `em.createStoredProcedureQuery()` 메소드에 사용할 프로시저의 이름을 명시한다.
- 그리고 `registerStoredProcedureParameter()` 메소드를 사용해 프로시저에서 사용할 파라미터를 순서, 타입, 파라미터 모드 순으로 정의한다.
  - 순서 대신에 이름을 사용할 수도 있다.

**📌 Named 스토어드 프로시저 사용**<br/>
스토어드 프로시저 쿼리에 이름을 부여해서 사용하는 것을 말한다.
- `@NamedStoredProcedureQuery` 로 정의하고, `name` 속성으로 이름을 부여하면 된다.
- `procedureName` 에 실제 호출할 프로시저의 이름을 명시하고,
- `@StoredProcedureParameter` 를 사용해 파라미터 정보를 정의하면 된다.

---

## 💫 객체지향 쿼리 심화
한 번에 여러 데이터를 수정할 수 있는 "벌크 연산"과 JPQL과 영속성 컨텍스트에 대해 다룬다. 그리고 JPQL과 플러시 모드를 다룬다.

### ➰ 벌크 연산
엔티티를 수정하려면 영속성 컨텍스트의 변경 감지 기능이나 병합을 사용하고, 삭제하려면 `em.remove()` 메소드를 사용한다.
- 하지만 엄청나게 많은 엔티티를 처리하기에는 많은 시간 비용이 든다.
- 이럴 때 사용하는 것이 **벌크 연산**이다.

```java
// UPDATE 벌크 연산
String qlString = 
    "update Product p " + 
    "set p.price = p.price * 1.1 " +
    "where p.stockAmount > :stockAmount";

int resultCount = em.createQuery(qlString)
                    .setParameter("stockAmount", 10)
                    .executeUpdate();
```
- 벌크 연산은 `executeUpdate()` 메소드를 사용한다.
  - 벌크 연산으로 영향 받은 엔티티의 건수를 반환한다.
- 삭제 또한 같은 메소드를 사용한다.

> JPA 표준은 아니지만 Hibernate는 INSERT 벌크 연산도 지원한다.

**📌 벌크 연산의 주의점**<br/>
벌크 연산이 **영속성 컨텍스트를 무시**하고 **데이터베이스에 직접 쿼리**한다는 점에 주의해야 한다.
- 따라서 **영속성 컨텍스트에 있는 값과 데이터베이스에 있는 값이 다를 수 있다.**
- 아래는 그 해결방법들이다.

**`em.refresh()` 사용**
- 벌크 연산을 수행한 직후, 정확한 엔티티를 사용해야 한다면, `em.refresh()` 를 사용해 데이터베이스에서 해당 엔티티를 다시 조회하면 된다.

**벌크 연산 먼저 실행**
- 가장 실용적인 해결책이다. 
- 벌크 연산을 실행하고 난 뒤, 엔티티를 조회하여 두 값이 같도록 해준다.

**벌크 연산 수행 후 영속성 컨텍스트 초기화**
- 벌크 연산 수행 직후 영속성 컨텍스트를 초기화해서 남아 있는 엔티티를 제거하는 것도 좋은 방법이다.
- 초기화한 후 엔티티를 조회하게 되면, 벌크 연산이 적용된 데이터베이스에서 엔티티를 조회할 것이다.

### ➰ 영속성 컨텍스트와 JPQL
**📌 퀴리 후 영속 상태인 것과 아닌 것**<br/>
JPQL로 엔티티를 조회하면 영속성 컨텍스트에서 관리되지만 그렇지 않은 경우는 관리되지 않는다.

> **조회한 엔티티만 영속성 컨텍스트가 관리하고, 변경 감지가 발생한다.**

**📌 JPQL로 조회한 엔티티와 영속성 컨텍스트**<br/>
영속성 컨텍스트에 이미 특정 엔티티가 있는 경우에 동일한 엔티티를 JPQL로 조회한다면?
- 이미 영속성 컨텍스트에 동일한 엔티티가 있는 경우, **JPQL로 데이터베이스에서 조회한 결과를 버리고, 영속성 컨텍스트에 있던 엔티티를 반환**한다.
  - 이때 **식별자 값을 사용해서 비교**한다.

JPQL로 조회한 새로운 엔티티를 영속성 컨텍스트에 하나 더 추가하거나, 기존 엔티티를 새로 검색한 엔티티로 대체하면 어떤 문제가 발생하는 것일까?
- 영속성 컨텍스트는 기본 키 값을 기준으로 엔티티를 관리한다.
  - 따라서 **같은 기본 키 값을 가진 엔티티는 등록이 불가**하다. → "새로운 엔티티 더 추가 불가능"
- **영속성 컨텍스트는 엔티티의 동일성을 보장**한다. 
  - 영속성 컨텍스트에 수정 중인 데이터가 사라질 위험이 존재하는 행위는 불가하다. → "새로운 엔티티로 대체 불가능"

> 이러한 이유로 기존 엔티티는 그대로 두고 새로 검색한 엔티티를 버리는 정책을 따른다.

**📌 find() vs. JPQL**<br/>
`em.find()` 메소드는 엔티티를 **영속성 컨텍스트에서 먼저 찾고, 없다면 데이터베이스에서 조회**한다.
- 따라서 영속성 컨텍스트에 찾으려는 엔티티가 있다면, 메모리에서 바로 찾으므로 성능상 이점이 있다. (1차 캐시)

하지만 **JPQL은 항상 데이터베이스에 SQL을 실행해서 결과를 조회**한다.
- 동일한 엔티티를 조회할 때마다 데이터베이스에서 조회하지만, 첫 조회 이후 해당 엔티티가 영속성 컨텍스트에 등록되어 있기 때문에, 위에서 언급한 정책에 따라 데이터베이스에서 조회한 엔티티를 버리고, 기존 엔티티를 반환한다.

### ➰ JPQL과 플러시 모드
> **플러시**
> - 영속성 컨텍스트의 변경 내역을 데이터베이스에 동기화하는 것이다.
> - JPA는 플러시가 일어날 때 영속성 컨텍스트에 등록, 수정, 삭제한 엔티티를 찾아 SQL을 만들고 데이터베이스에 반영한다.
> - 플러시 호출 메소드가 있지만, 보통 플러시 모드에 따라 커밋 직전이나 쿼리 실행 직전에 자동으로 호출된다.

플러시 모드는 `FlushModeType.AUTO` 가 기본값이다. 
- 따라서 트랜잭션 커밋 직전이나 쿼리 실행 직전에 자동으로 플러시를 호출한다.
- 다른 옵션으로는 `FlushModeType.COMMIT` 이 있는데, 이는 커밋 시에만 플러시를 호출하고 쿼리 실행 시에는 플러시를 호출하지 않는다.
  - 이 옵션은 성능 최적화를 위해 꼭 필요할 때만 사용하도록 한다.

**📌 쿼리와 플러시 모드**<br/>
JPQL은 영속성 컨텍스트에 있는 데이터를 고려하지 않고 데이터베이스에서 조회한다.
- 따라서 **JPQL을 실행하기 전 영속성 컨텍스트의 내용을 데이터베이스에 반영해야 한다.**
- 그렇지 않으면(`FlushModeType.COMMIT` 인 경우) 영속성 컨텍스트에는 수정된 엔티티의 내용이 데이터베이스에는 반영되지 않아 원치 않는 결과를 만나게 된다.
  - `setFlushMode()` 메소드로 플러시 모드를 설정해줄 수 있다.

**📌 플러시 모드와 최적화**<br/>
그렇다면 `COMMIT` 모드는 왜 사용하는 것일까?
- 잘못하면 데이터 무결성에 심각한 피해를 줄 수 있는 위험이 있는 모드라 생각된다.
- 하지만, **플러시를 너무 자주 일으키는 상황**에 이 모드를 사용하면, 쿼리 시 발생하는 **플러시 횟수를 줄여 성능 최적화에 도움**이 될 수 있다.

또한, JPA를 사용하지 않고, JDBC를 직접 사용해서 SQL을 실행할 때도 플러시 모드를 고민해야 한다.
- JPA를 통하지 않고 직접 쿼리를 실행하면 JPA는 JDBC가 실행한 쿼리를 인식할 방법이 없다.
  - 따라서 별도의 JDBC 호출은 플러시 모드를 `AUTO` 설정해도 플러시가 발생하지 않는다.
- 이때, 쿼리 실행 직전에 `em.flush()` 를 호출해 내용을 동기화하는 것이 안전하다.

## 📕 출처
**자바 ORM 표준 JPA 프로그래밍** - 김영한
---
title: "📚 4. 엔티티 매핑"
description: "JPA 책 정리"
date: 2022-03-11
update: 2022-03-11
tags:
  - Java
  - JPA
  - SpringBoot
series: "📚 ORM 표준 JPA"
---

<em>[자바 ORM 표준 JPA 프로그래밍 - 김영한]을 읽고 인용하고 정리하는 POST입니다.</em>

> JPA를 사용하는 데 가장 중요한 일은 **"엔티티와 테이블을 정확히 매핑하는 것"**이다. 이를 위해서는 매핑 annotation을 숙지하고 사용해야 한다. 아래는 대표 annotation들이다.
> - 객체와 테이블 매핑 : `@Entity` , `@Table`
> - 기본 키 매핑 : `@Id`
> - 필드와 컬럼 매핑 : `@Column`
> - 연관관계 매핑 : `@ManyToOne` , `@JoinColumn`

## 💫 @Entity
JPA를 사용해 테이블과 매핑할 클래스는 해당 annotation을 필수로 붙여야 한다. 이 annotation이 붙은 클래스는 JPA가 관리하는 것으로, 엔티티라 부른다. 

> **속성 정리**
> - **name**
>   - JPA에서 사용할 엔티티 이름을 지정한다. 보통 기본값인 클래스 이름을 사용한다. 

`@Entity` 적용 시 아래와 같은 주의사항이 있다.
- 기본 생성자는 필수다(파라미터가 없는 `public` 또는 `protected` 생성자)
  - JPA가 엔티티 객체를 생성할 때 기본 생성자를 사용하기 때문이다.
- `final` 클래스, `enum`, `interface`, `inner` 클래스에는 사용할 수 없다.
- 저장할 필드에 `final` 을 사용하면 안된다.

자바는 생성자가 하나도 없으면 기본 생성자를 자동으로 생성한다. 문제는 생성자를 하나 이상 만들 경우 자바는 기본 생성자를 자동으로 생성하지 않는다. 따라서 기본 생성자를 직접 만들어야 한다.

```java
public Member() {} // 기본 생성자

public Member(String name) { // 임의의 생성자
  this.name = name;
}
```

## 💫 @Table
엔티티와 매핑할 테이블을 지정하는 annotation으로 생략하는 경우 매핑한 엔티티 이름을 테이블 이름으로 사용한다.

> **속성 정리**
> - **name**
>   - 매핑할 테이블 이름으로, 기본값은 엔티티 이름이다.
> - **catalog**
>   - catalog 기능이 있는 데이터베이스에서 catalog를 매핑한다.
>   - catalog: 데이터베이스의 개체들에 대한 정의를 담고 있는 일종의 메타데이터들로 구성된 인스턴스
> - **schema**
>   - schema 기능이 있는 데이터베이스에서 schema를 매핑한다.
> - **uniqueConstraints(DDL)**
>   - DDL 생성 시 유니크 제약 조건을 만든다. 2개 이상의 복합 유니크 제약조건도 가능하다.
>   - 스키마 자동 생성 기능을 사용해서 DDL을 만들 때만 사용된다.

---

## 💫 다양한 매핑 사용
이전 장에서 개발하던 회원 관리 프로그램에 다음 요구사항이 추가되었다.
1. 회원은 일반 회원과 관리자로 구분해야 한다.
2. 회원 가입일과 수정일이 있어야 한다.
3. 회원을 설명할 수 있는 필드가 있어야 한다. 이 필드는 길이 제한이 없다.

기능 구현을 위해 회원 엔티티 코드를 추가한다.

```java
@Entity
@Table(name="MEMBER")
public class Member {
  ...

  @Enumerated(EnumType.STRING)
  private RoleType roleType;

  @Temporal(TemporalType.TIMESTAMP)
  private Date createdDate;

  @Temporal(TemporalType.TIMESTAMP)
  private Date lastModifiedDate;

  @Lob
  private String description;

  ...

}
```

위 코드를 분석해보면,
- `roleType` : 자바의 `enum` 을 사용해 회원의 타입을 구분했다. 
  - 이처럼 `enum` 을 사용하려면 `@Enumerated` annotation으로 매핑해야 한다. 
- `createdDate` , `lastModifiedDate` : 자바의 날짜 타입은 `@Temporal` 을 사용해서 매핑한다.
- `description` : 회원을 설명하는 필드로서 길이 제한이 없어야 한다. 따라서 데이터베이스의 `VARCHAR` 타입 대신 `CLOB` 타입으로 저장해야 한다.

---

## 💫 데이터베이스 스키마 자동 생성
JPA는 **데이터베이스 스키마를 자동으로 생성하는 기능**이 있다. 클래스의 매핑 정보를 보고 어떤 테이블에 어떤 컬럼을 사용하는지 알 수 있어 이를 통해 데이터베이스 스키마를 생성한다.

먼저 `persistence.xml` 에 속성을 추가하여 애플리케이션 실행 시점에 데이터베이스 테이블을 자동으로 생성하도록 한다.

```xml
<property name="hibernate.hbm2ddl.auto" value="create" />
```

`show_sql` 속성으로 실행 결과를 보면, 기존 테이블을 삭제하고 새로 생성하는 것을 확인할 수 있고, 아래와 같이 매핑되어 생성되는 것을 확인할 수 있다.
- `roleType` → `VARCHAR` , `createdDate` , `lastModifiedDate` → `TIMESTAMP` , `description` → `CLOB` 타입

> 자동 생성되는 DDL은 지정한 데이터베이스 방언에 따라 달라진다.

이 기능을 사용해 개발자가 테이블을 직접 생성하는 수고를 덜었다. 하지만 이 DDL이 완벽한 것은 아니기에 참고하는 정도로만 사용하는 것이 좋다.

> **`hibernate.hbm2ddl.auto` 속성 정리**
> - create : 기존 테이블 삭제 + 새로 생성 (DROP + CREATE)
> - create-drop : create 속성에 추가로 애플리케이션 종료 시 생성한 DDL을 제거 (DROP + CREATE + DROP)
> - update : 데이터베이스 테이블과 엔티티 매핑 정보를 비교해 변경 사항만 수정 (JPA 2.1부터는 지원 X)
> - validate : 데이터베이스 테이블과 엔티티 매핑 정보를 비교해 차이가 있으면 경고를 남기고 실행하지 않음 (DDL을 수정하지 않는 설정, JPA 2.1부터는 지원 X)
> - none : 자동 생성 기능을 사용하지 않음

---

## 💫 DDL 생성 기능
회원 이름은 필수 입력 값이고, 10자를 초과하면 안된다는 제약조건이 추가되었다. 스키마 자동 생성을 통해 만들어지는 DDL에 이 제약조건을 추가한다.

```java
@Column(name = "NAME", nullable = false, length = 10)
private String username;
```

- `@Column` 의 `nullable` 속성 값으로 자동 생성되는 DDL에 `not null` 제약조건을 추가할 수 있다.
- 또한, `length` 속성 값으로 문자의 크기도 지정할 수 있다.

이번에는 유니크 제약조건을 만들어 주는 `@Table` 의 `uniqueConstraints` 속성을 사용해본다.

```java
@Entity
@Table(name="MEMBER", uniqueConstraints = {@UniqueConstraint(
        name = "NAME_AGE_UNIQUE",
        columnNames = {"NAME", "AGE"})})
public class Member {
  ...

}
```

위의 속성들은 단지 **DDL 자동 생성 시에만 사용되고 JPA의 실행 로직에는 영향을 주지 않는다.**

---

## 💫 기본 키 매핑
지금까지는 `@Id` annotation만 사용해 회원의 기본 키를 애플리케이션에서 직접 할당했다. 
- 기본 키를 애플리케이션에서 직접 할당하는 방식이 아닌 데이터베이스가 생성해주는 값으로 사용하려면 어떻게 매핑해야 할까?
  - MySQL의 `AUTO_INCREMENT` 같은 기능
- 데이터베이스마다 기본 키를 생성하는 방식이 달라 해결하기는 쉽지 않다.

JPA는 데이터베이스 기본 키 생성 전략이 다음과 같다.
- **직접 할당** : 기본 키를 애플리케이션에서 직접 할당한다.
- **자동 생성** : 대리 키 사용 방식
  - IDENTITY : 기본 키 생성을 데이터베이스에 위임한다.
  - SEQUENCE : 데이터베이스 시퀸스를 사용해 기본 키를 할당한다.
  - TABLE : 키 생성 테이블을 사용한다.

자동 생성 전략이 다양한 이유는 데이터베이스마다 지원 방식이 서로 다르기 때문이다. SEQUENCE나 IDENTITY 방식은 사용하는 데이터베이스에 의존하고, TABLE 방식은 테이블을 활용하기에 모든 데이터베이스에서 사용할 수 있다.

자동 생성 전략을 사용하기 위해서는 `@Id` 에 `@GeneratedValue` 를 추가하고 원하는 생성 전략을 선택하면 된다.

> 키 생성 전략 사용 시 `hibernate.id.new_generator_mappings=true` 속성이 필수적이다.

### ➰ 기본 키 직접 할당 전략
`@Id` 로 매핑하면 되고, 적용 가능한 자바 타입은 다음과 같다.
- 자바 기본형
- 자바 Wrapper형
- `String`
- `java.util.Date`
- `java.sql.Date`
- `java.math.BigDecimal`
- `java.math.BigInteger`

이 전략은 `em.persist()` 로 엔티티를 저장하기 전에 애플리케이션에서 기본 키를 직접 할당하는 방법이다.

```java
Board board = new Board();
board.setId("id1");
em.persist(board);
```

> 이 전략에서 식별자 값 없이 저장하면 예외가 발생한다. 
> JPA 표준에 정의되어 있진 않지만 hibernate를 구현체로 사용하면 JPA 최상위 예외인 `javax.persistence.PersistenceException` 이 발생하고 이는 내부에 hibernate 예외인 `org.hibernate.id.IdentifierGenerationException` 을 포함하고 있다.

### ➰ IDENTITY 전략
기본 키 생성을 데이터베이스에 위임하는 전략이다. 주로 MySQL, PostgreSQL, SQL Server, DB2에서 사용된다. 예를 들어 MySQL의 `AUTO_INCREMENT` 기능을 수행하는 예제를 보면,

```sql
CREATE TABLE BOARD (
  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  DATA VARCHAR(255)
);

INSERT INTO BOARD(DATA) VALUES('A');
INSERT INTO BOARD(DATA) VALUES('B');
```

- 테이블 생성 시 기본 키 컬럼에 `AUTO_INCREMENT` 를 추가해 데이터베이스에 값을 저장할 때 `ID` 컬럼을 비워두면 자동으로 순서대로 값을 채워준다.

IDENTITY 전략은 이처럼 "데이터베이스에 값을 저장하고 나서야 기본 키 값을 구할 수 있을 때" 사용한다.

개발자가 엔티티에 직접 식별자를 할당하면 `@Id` annotation만 있으면 되지만 지금처럼 생성되는 경우에는 `@GeneratedValue` annotation을 사용해 식별자 생성 전략을 선택해야 한다. 
-  이때 JPA는 기본 키 값을 얻어오기 위해 데이터베이스를 추가로 조회한다.

```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "ID")
private Long id;
```

> 해당 전략은 데이터베이스에 INSERT한 후에 기본 키 값을 조회할 수 있다. 따라서 엔티티에 식별자 값을 할당하기 위해서는 추가적인 조회가 필요했다. JDBC3에 추가된 `Statement.getGeneratedKeys()` 를 사용하면 데이터 저장과 동시에 생성된 기본 키 값도 얻어올 수 있다. hibernate는 이 메소드를 사용해 데이터베이스와 **한 번만 통신**한다.

> 엔티티가 영속 상태가 되려면 식별자가 반드시 필요하다. 하지만 이 전략은 데이터베이스에 엔티티를 저장해야 식별자를 구할 수 있어 트랜잭션을 지원하는 쓰기 지연이 동작하지 않는다.

### ➰ SEQUENCE 전략
데이터베이스 시퀸스는 유일한 값을 순서대로 생성하는 특별한 데이터베이스 오브젝트다. **SEQUENCE 전략은 시퀸스를 사용해 기본 키를 생성**한다. 당연히 시퀸스를 지원하는 오라클, PostgreSQL, DB2, H2 데이터베이스에서만 사용할 수 있다.

```sql
CREATE TABLE BOARD (
  ID BIGINT NOT NULL PRIMARY KEY,
  DATA VARCHAR(255)
)

-- 시퀸스 생성
CREATE SEQUENCE BOARD_SEQ START WITH 1 INCREMENT BY 1;
```

- 시퀸스의 사용을 위해서는 **시퀸스를 생성**해야 한다.

```java
@Entity
@SequenceGenerator(
  name="BOARD_SEQ_GENERATOR", 
  sequenceName = "BOARD_SEQ", // 매핑할 데이터베이스 시퀸스 이름
  initialValue = 1, allocationSize = 1)
public class Member {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE,
                  generator = "BOARD_SEQ_GENERATOR")
  private Long id;
  ...

}
```

- 이후 사용할 **데이터베이스 시퀸스를 매핑**해야 한다. 위 예제에서는 `@SequenceGenerator` 를 사용해 `BOARD_SEQ_GENERATOR` 라는 시퀸스 생성기를 등록했다.
- `sequenceName` 속성의 이름으로 `BOARD_SEQ` 를 지정하여 JPA가 이 시퀸스 생성기를 실제 데이터베이스의 `BOARD_SEQ` 시퀸스와 매핑하도록 한다.
- 키 생성 전략을 설정하고 생성기를 등록한 시퀸스 생성기로 선택하여 `id` 식별자 값은 `BOARD_SEQ_GENERATOR` 시퀸스 생성기가 할당한다. 

시퀸스 사용코드는 IDENTITY 전략과 같지만 내부 동작 방식은 다르다. 
- 이 전략은 `em.persist()` 호출 시 먼저 데이터베이스 시퀸스를 사용해서 **식별자를 조회**한다. 그리고 조회한 식별자를 엔티티에 할당한 후에 엔티티를 영속성 컨텍스트에 저장한다.
- 이후 트랜잭션을 커밋해서 플러시가 일어나면 엔티티를 데이터베이스에 저장한다.

> IDENTITY 전략과는 조금 반대의 느낌

> **@SequenceGenerator 속성 정리**<br/>
> - **name**
>   - 식별자 생성기 이름 (필수 값)
> - **sequenceName**
>   - 데이터베이스에 등록되어 있는 시퀸스 이름
> - **initialValue**
>   - DDL 생성 시에만 사용됨. 시퀸스 DDL을 생성할 때 처음 시작하는 수를 지정
> - **allocationSize**
>   - 시퀸스 한 번 호출에 증가하는 수 (성능 최적화를 위해 기본 값이 50)
> - **catalog, schema**
>   - 데이터베이스 catalog, schema 이름

> **SEQUENCE 전략과 최적화**<br/>
> 해당 전략은 데이터베이스 시퀸스를 통해 식별자를 조회하는 추가 작업이 필요해 **데이터베이스와 2번 통신**한다.
> <br/>
> 1. 식별자를 구하려고 데이터베이스 시퀸스를 조회한다.
> 2. 조회한 시퀸스를 기본 키 값으로 사용해 데이터베이스에 저장한다.
> 
> JPA는 시퀸스에 접근하는 횟수를 줄이기 위해 `allocationSize` 속성을 사용한다. 설정한 값만큼 한 번에 시퀸스 값을 증가시키고 그만큼 메모리에 시퀸스 값을 할당한다. 
> 
> 이러한 방법으로 시퀸스 값을 선점해 여러 JVM이 동시에 동작해도 기본 키 값이 충돌하지 않는다는 장점이 있다. 

### ➰ TABLE 전략
**키 생성 전용 테이블을 하나 만들고** 여기에 이름과 값으로 사용할 컬럼을 만들어 데이터베이스 시퀸스를 흉내내는 전략이다. 모든 데이터베이스에 적용할 수 있는 전략이다.

```sql
create table MY_SEQUENCES (
  sequence_name varchar(255) not null,
  next_val bigint,
  primary key (sequence_name)
)
```
- 먼저 키 생성용 테이블을 생성한다.

```java
@Entity
@TableGenerator(
  name="BOARD_SEQ_GENERATOR", 
  table = "MY_SEQUENCES", // 매핑할 데이터베이스 시퀸스 이름
  pkColumnValue = "BOARD_SEQ", allocationSize = 1)
public class Member {

  @Id
  @GeneratedValue(strategy = GenerationType.TABLE,
                  generator = "BOARD_SEQ_GENERATOR")
  private Long id;
  ...

}
```

- `@TableGenerator` 로 테이블 키 생성기를 등록하고, 생성한 `MY_SEQUENCES` 테이블을 키 생성용 테이블로 매핑한다.
- TABLE 전략을 선택하고, 방금 등록한 테이블 키 생성기를 지정한다.
- 시퀸스 대신 테이블을 사용한다는 것만 제외하면 SEQUENCE 전략과 내부 동작방식이 동일하다.

> **@TableGenerator 속성 정리**<br/>
> - **name**
>   - 식별자 생성기 이름 (필수 값)
> - **table**
>   - 키 생성 테이블명
> - **pkColumnName**
>   - 시퀀스 컬럼명
> - **valueColumnName**
>   - 시퀀스 값 컬럼명
> - **pkColumnValue**
>   - 키로 사용할 값 이름
> - **initialValue**
>   - 초기값, 마지막으로 생성된 값이 기준이고, 기본값은 0
> - **allocationSize**
>   - 시퀸스 한 번 호출에 증가하는 수 (성능 최적화를 위해 기본 값이 50)
> - **catalog, schema**
>   - 데이터베이스 catalog, schema 이름
> - **uniqueConstraints**
>   - 유니크 제약 조건 지정

> **TABLE 전략과 최적화**<br/>
> 값을 조회하면서 SELECT 쿼리를 사용하고, 다음 값으로 증가시키기 위해 UPDATE 쿼리를 사용하여 **SEQUENCE 전략에 비해 1번 더 데이터베이스와 통신**한다.
> 
> 이또한 SEQUENCE 전략과 동일하게 `allocationSize` 을 사용해 최적화할 수 있다.

### ➰ AUTO 전략
해당 전략은 선택한 데이터베이스 방언에 따라 위에서 다룬 **전략들 중 하나를 자동으로 선택**한다. (Oracle - SEQUENCE, MySQL - IDENTITY)

```java
@Entity
public class Member {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  ...

}
```

- `@GeneratedValue.strategy` 의 기본값은 AUTO다. 따라서 굳이 명시하지 않은 것과 동일하다.
- 장점은 데이터베이스를 변경해도 코드는 수정하지 않아도 된다는 점이다. 개발 초기 단계나 프로토타입 개발 시 편리하게 사용할 수 있다.
- SEQUENCE나 TABLE 전략이 선택되면 이를 위한 시퀸스나 테이블이 생성되어 있어야 하는데, 스키마 자동 생성 기능을 사용한다면 Hibernate가 알아서 생성해줄 것이다.

### ➰ 기본 키 매핑 정리
영속성 컨텍스트는 엔티티를 식별자 값으로 구분하기에 엔티티를 영속 상태로 만들려면 식별자 값이 반드시 필요하다. `em.persist()` 호출 직후 식별자 할당 전략별 발생하는 일을 정리하면 아래와 같다.

- 직접 할당 : 애플리케이션에서 직접 식별자 값을 미리 할당해야 한다.
- SEQUENCE : 데이터베이스 시퀸스에서 식별자 값을 획득한 후 영속성 컨텍스트에 저장한다.
- TABLE : 데이터베이스 시퀸스 생성용 테이블에서 식별자 값을 획득한 후 영속성 컨텍스트에 저장한다.
- IDENTITY : 데이터베이스에 엔티티를 저장해서 식별자 값을 획득한 후 영속성 컨텍스트에 저장한다.

---

## 💫 필드와 컬럼 매핑 분류
JPA가 제공하는 필드와 컬럼 매핑용 annotation들을 간단히 정리했다.

|분류|매핑 annotation|설명|
|---|---|---|
|필드와 컬럼 매핑|`@Column`|컬럼 매핑|
||`@Enumerated`|자바의 enum 타입 매핑|
||`@Temporal`|날짜 타입 매핑|
||`@Lob`|BLOB, CLOB 타입 매핑|
||`@Transient`|특정 필드를 데이터베이스에 매핑하지 않음|
|기타|`@Access`|JPA가 엔티티에 접근하는 방식 지정|

## 📕 출처
- **자바 ORM 표준 JPA 프로그래밍** - 김영한
- [엔티티의 생명주기](https://ultrakain.gitbooks.io/jpa/content/chapter3/chapter3.3.html)
- [데이터베이스 catalog](https://ko.wikipedia.org/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4_%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8)
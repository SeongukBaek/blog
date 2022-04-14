---
title: "📚 14. 컬렉션과 부가 기능"
description: "JPA 책 정리"
date: 2022-04-05
update: 2022-04-05
tags:
  - Java
  - JPA
  - SpringBoot
series: "📚 ORM 표준 JPA"
---

<em>[자바 ORM 표준 JPA 프로그래밍 - 김영한]을 읽고 인용하고 정리하는 POST입니다.</em>

> **컬렉션**: 다양한 컬렉션과 특징을 설명한다.
> **컨버터**: 엔티티의 데이터를 변환해서 데이터베이스에 저장한다.
> **리스너**: 엔티티에서 발생한 이벤트를 처리한다.
> **엔티티** 그래프: 엔티티를 조회할 때 연관된 엔티티들을 선택해서 함께 조회한다.

## 💫 컬렉션
JPA는 자바에서 기본으로 제공하는 `Collection` , `List` , `Set` , `Map` 컬렉션을 지원한다. 그리고 다음 경우에 사용할 수 있다.
- `@OneToMany` , `@ManyToMany` 를 사용해서 일대다나 다대다 엔티티 관계 매핑 시
- `@ElementCollection` 을 사용해 값 타입을 하나 이상 보관할 때

자바 컬렉션 인터페이스의 특징
- `Colleciton` : 자바가 제공하는 최상위 컬렉션, Hibernate는 중복을 허용하고 순서를 보장하지 않는다고 가정한다.
- `Set` : 중복을 허용하지 않는 컬렉션, 순서를 보장하지 않는다.
- `List` : 순서가 있는 컬렉션, 순서를 보장하고 중복을 허용한다.
- `Map` : `Key` & `Value` 구조로 되어 있는 특수한 컬렉션

### ➰ JPA와 컬렉션
Hibernate는 엔티티를 영속 상태로 만들 때 컬렉션 필드를 **준비한 컬렉션으로 감싸서 허용**한다.

```java
@Entity
public class Team {

  @Id
  private String id;

  @OneToMany
  @JoinColumn
  private Collection<Member> members = new ArrayList<>();
  ...

}
```

`members` 컬렉션을 필드로 가지고 있는 엔티티를 영속 상태로 만들어 본다 (`em.persist`). `persist` 전과 후의 클래스 정보를 출력해보면,
- 원래 **`ArrayList` 타입**이었던 컬렉션이 Hibernate가 제공하는 **`PersistentBag` 타입**으로 변경되는 것을 확인할 수 있다.
  - 이는 Hibernate가 컬렉션의 효율적인 관리를 위해 원본 컬렉션을 감싸는 내장 컬렉션(또는 Wrapper 컬렉션)을 생성해 이 내장 컬렉션을 사용하도록 참조를 변경하는 것이다.
- 이러한 특징때문에 위 예제처럼 컬렉션 사용 시에는 즉시 초기화하여 사용하는 것을 권장한다.

**📌 컬렉션 인터페이스에 따른 Hibernate 내장 컬렉션과 특징**
|**컬렉션 인터페이스**|**내장 컬렉션**|**중복 허용**|**순서 보관**|
|:---:|:---:|:---:|:---:|
|Collection, List|PersistentBag|O|X|
|Set|PersistentSet|X|X|
|List + @OrderColumn|PersistentList|O|O|

### ➰ Collection, List
중복을 허용하므로, 객체를 추가하는 `add()` 메소드는 내부에서 어떤 비교도 하지 않고 항상 `true` 를 반환한다.
- 같은 엔티티가 있는지 찾거나 삭제할 때는 `equals()` 메소드를 사용한다.

> 엔티티를 추가할 때 중복된 엔티티가 있는지 비교하지 않고 단순히 저장만 수행한다. 따라서 엔티티를 추가해도 지연 로딩된 컬렉션을 초기화하지 않는다.

### ➰ Set
`HashSet` 으로 초기화한다. 중복을 허용하지 않아 `add()` 메소드로 객체를 추가할 때마다 `equals()` 메소드로 같은 객체가 있는지 비교한다.
- 같은 객체가 없으면 객체를 추가하고 `true` 를 반환하고, 
- 같은 객체가 이미 있어 추가에 실패하면 `false` 를 반환한다.
- 참고로 `HashSet` 은 **해시 알고리즘**을 사용해 `hashcode()` 도 함께 사용해서 비교한다.

> 엔티티를 추가할 때 중복된 엔티티에 대한 비교를 수행한다. 따라서 엔티티를 추가할 때 지연 로딩된 컬렉션을 초기화한다.

### ➰ List + @OrderColumn
`List` 인터페이스에 `@OrderColumn` 을 추가하면 순서가 있는 특수한 컬렉션으로 인식한다.
- 순서가 있다는 의미는 "**데이터베이스에 순서 값을 저장해서 조회할 때 사용한다**"는 의미이다.
- `@OrderColumn` 의 `name` 속성으로 `List` 의 위치 값을 보관할 컬럼을 지정할 수 있다.
  - 일대다 관계의 특성상 위치 값은 다쪽에 저장된다.

> 실무에서 사용하기에는 단점이 많다. `@OrderBy` 나 직접 위치 값 관리하는 것을 추천

**📌 @OrderColumn의 단점**
- 매핑하는 엔티티와 실제 저장되는 엔티티의 위치가 달라 추가적인 UPDATE SQL이 필요하다.
- `List` 를 변경하면 연관된 많은 위치 값을 변경해야 한다. 중간에 있는 위치 값을 삭제하면, 그 이후에 있는 모든 값들에 대한 UPDATE SQL이 실행되어야 한다.
  - 만약 UPDATE SQL을 수행하지 않아, 중간에 위치 값이 없으면 조회한 `List` 에는 `null` 이 보관된다. (위치 값이 삭제된 `List`)
  - 컬렉션 순회 시 `NullPointerException` 발생

### ➰ @OrderBy
`@OrderColumn` 이 데이터베이스에 순서용 컬럼을 매핑해 관리했다면, `@OrderBy` 는 데이터베이스의 `ORDER BY` 절을 사용해서 컬렉션을 정렬한다.
- 즉, 순서용 컬럼을 매핑할 필요가 없다.
- 모든 컬렉션에 사용할 수 있다. 
- 엔티티의 필드를 대상으로 하고, `@OrderBy("username desc, id asc")` 와 같이 사용한다.

---

## 💫 @Converter
엔티티의 데이터를 변환해서 데이터베이스에 저장할 때 사용한다.
- 회원의 VIP 여부를 자바의 `boolean` 타입을 사용하고 싶다는 가정이 있다. 
  - JPA를 사용하면 자바의 `boolean` 타입은 방언에 따라 다르지만 데이터베이스에 저장될 때 0 또는 1인 숫자로 저장된다.
  - 그런데 데이터베이스에 이 숫자 대신 문자 Y 또는 N으로 저장하고 싶다면 컨버터를 사용한다.

```java
@Entity
public class Member {

  ...

  @Convert(converter = BooleanToYNConverter.class)
  private boolean vip;
  ..

}
```
- `@Convert` 를 적용해 데이터베이스에 저장되기 직전에 `BooleanToYNConverter` 컨버터가 동작하도록 작성했다.

```java
@Converter
public class BooleanToYNConverter implements AttributeConverter<Boolean, String> {

  @Override
  public String converToDatabaseColumn(Boolean attribute) {
    return (attribute != null && attribute) ? "Y" : "N";
  }

  @Override
  public Boolean convertToEntityAttribute(String dbData) {
    return "Y".equals(dbData);
  }
}
```
- 컨버터 클래스는 `@Converter` annotation을 사용하고, `AttributeConverter` 인터페이스를 구현해야 한다.
- 또한 제네릭에 현재 타입과 변환할 타입을 지정한다.

**구현해야 할 메소드**
- `converToDatabaseColumn()` : 엔티티의 데이터를 데이터베이스 컬럼에 저장할 데이터로 변환한다. 
- `convertToEntityAttribute()` : 데이터베이스에서 조회한 컬럼 데이터를 엔티티의 데이터로 변환한다.

또한 클래스 레벨에도 설정할 수 있다. 이때는 `attributeName` 속성으로 컨버터를 적용할 필드를 명시해야 한다.

### ➰ 글로벌 설정
모든 `Boolean` 타입에 컨버터를 적용하기 위해 컨버터 클래스에 `@Converter(autoApply = true)` 옵션을 적용하면 된다. 이제 `@Convert` 를 적용하지 않아도 자동으로 적용된다.

|**속성**|**기능**|**기본 값**|
|:---:|:---:|:---:|
|converter|사용할 컨버터를 지정한다.||
|attributeName|컨버터를 적용할 필드를 지정한다.||
|disableConversion|글로벌 컨버터나 상속 받은 컨버터를 사용하지 않는다.|`false`|

---

## 💫 리스너
JPA 리스너 기능을 사용해 엔티티의 생명주기에 따른 이벤트를 처리할 수 있다.

### ➰ 이벤트 종류
아래는 이벤트의 종류와 발생 시점이다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fdn1cwM%2FbtriRZvMBaA%2FgkP85jPClmov7R6wGXmNa0%2Fimg.png" width="70%">

1. **PostLoad** : 엔티티가 영속성 컨텍스트에 조회된 직후 또는 `refresh` 를 호출한 후 (2차 캐시에 저장되어 있어도 호출)
2. **PrePersist** : `persist()` 메소드를 호출해서 엔티티를 영속성 컨텍스트에 관리하기 직전에 호출된다. 식별자 생성 전략을 사용한 경우 엔티티에 식별자는 아직 존재하기 전이다. 새로운 인스턴스를 `merge` 할 때도 수행
3. **PreUpdate** : `flush` 나 `commit` 을 호출해서 엔티티를 데이터베이스에 수정하기 직전에 호출
4. **PreRemove** : `remove()` 메소드를 호출해서 엔티티를 영속성 컨텍스트에서 삭제하기 직전에 호출된다. 또한 삭제 명령어로 영속성 전이가 일어날 때도 호출 (`orphanRemoval` 에 대해서는 `flush` 나 `commit` 시 호출)
5. **PostPersist** : `flush` 나 `commit` 을 호출해서 엔티티를 데이터베이스에 저장한 직후 호출된다. (식별자가 항상 존재) 
6. **PostUpdate** : `flush` 나 `commit` 을 호출해서 엔티티를 수정한 직후 호출
7. **PostRemove** : `flush` 나 `commit` 을 호출해서 엔티티를 삭제한 직후 호출

### ➰ 이벤트 적용 위치
이벤트는 엔티티에서 직접 받거나 별도의 리스너를 등록해서 받을 수 있다.

**📌 엔티티에 직접 적용**<br/>
엔티티에 이벤트가 발생할 때마다 annotation으로 지정한 메소드가 실행되도록 한다. 
- 엔티티 클래스에 이벤트들에 대한 메소드를 구현하는 형태다.

**📌 별도의 리스너 등록**<br/>
리스너는 대상 엔티티를 파라미터로 받을 수 있다. 반환 타입은 `void` 로 설정해야 한다.
- 엔티티 클래스에 `@EntityListeners(별도의 리스너.class)`

**📌 기본 리스너 사용**<br/>
모든 엔티티의 이벤트를 처리하려면 `META-INF/orm.xml` 에 기본 리스너로 등록하면 된다.

여러 리스너를 등록했을 때 이벤트 호출 순서는 다음과 같다.
1. 기본 리스너
2. 부모 클래스 리스너
3. 리스너
4. 엔티티

**📌 더 세밀한 설정**<br/>
더 세밀한 설정을 위해서는 아래 annotation을 사용할 수 있다.
- `javax.persistence.ExcludeDefaultListeners` : 기본 리스너 무시
- `javax.persistence.ExcludeSuperclassListeners` 상위 클래스 이벤트 리스너 무시

---

## 💫 엔티티 그래프
글로벌 `fetch` 옵션은 애플리케이션 전체에 영향을 주고, 변경할 수 없다는 단점이 있다. 그래서 일반적으로 **글로벌 `fetch` 옵션은 `FetchType.LAZY`** 를 사용하고, 엔티티 조회 시 연관된 엔티티를 함께 조회해야 한다면 **JPQL 페치 조인을 사용**한다.
- 그런데 페치 조인을 사용하면, 같은 JPQL을 중복해서 작성하는 경우가 많다.
- 이는 JPQL이 데이터를 조회하는 기능뿐 아니라 연관된 엔티티를 함께 조회하는 기능도 제공하기 때문에 발생하는 문제이다.

JPA 2.1에 추가된 **엔티티 그래프 기능**을 사용해 엔티티를 조회하는 시점에 **함께 조회할 연관된 엔티티를 선택**할 수 있다.
- 따라서 JPQL은 데이터를 조회하는 기능만을 수행하여 위 문제는 발생하지 않는다.
- 엔티티 그래프는 정적으로 정의하는 Named 엔티티 그래프와 동적으로 정의하는 엔티티 그래프가 있다.

### ➰ Named 엔티티 그래프
`@NamedEntityGraph` 로 정의한다. 
- `name` : 엔티티 그래프의 이름을 정의
- `attributeNodes` : 함께 조회할 속성을 선택

### ➰ em.find()에서 엔티티 그래프 사용
Named 엔티티 그래프를 사용하려면 정의한 엔티티 그래프를 `em.getEntityGraph("정의한 엔티티 그래프 이름")` 을 통해서 찾아오면 된다.

### ➰ subgraph
`subgraph` 를 사용해 관리하지 않는 연관된 엔티티의 필드까지 조회할 수 있다.
- 관리할 수 있는 객체 그래프가 아니더라도 `subgraphs` 속성을 정의하여 `@NamedSubgraph` 를 사용해 서브 그래프를 정의할 수 있다.

### ➰ JPQL에서 엔티티 그래프 사용
`em.find()` 와 동일하게 힌트만 추가하여 사용할 수 있다.

> `em.find()` 에서 엔티티 그래프를 사용하면 Hibernate는 필수 관계를 고려해 SQL 내부 조인을 사용하지만, JPQL에서 엔티티 그래프를 사용할 때는 항상 SQL 외부 조인을 사용한다.
> - 내부 조인을 사용하려면 이를 명시해야 한다.

### ➰ 동적 엔티티 그래프
`em.createEntityGraph()` 메소드를 사용해 동적으로 엔티티 그래프를 생성할 수 있다.

```java
public <T> EntityGraph<T> createEntityGraph(Class<T> rootType);
```
- `addAttributeNodes("필드")` 를 사용해 엔티티의 필드 속성을 엔티티 그래프에 포함할 수 있다.
- 또한 `addSubgraph()` 메소드로 서브 그래프를 추가할 수 있다.

## 📕 출처
- **자바 ORM 표준 JPA 프로그래밍** - 김영한
- [[자바 ORM 표준 JPA 프로그래밍] 14.3 리스너](https://milenote.tistory.com/150)
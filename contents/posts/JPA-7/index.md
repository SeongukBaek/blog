---
title: "📚 7. 고급 매핑"
description: "JPA 책 정리"
date: 2022-03-17
update: 2022-03-18
tags:
  - Java
  - JPA
  - SpringBoot
series: "📚 ORM 표준 JPA"
---

<em>[자바 ORM 표준 JPA 프로그래밍 - 김영한]을 읽고 인용하고 정리하는 POST입니다.</em>

> 상속 관계 매핑: 객체의 상속 관계를 데이터베이스에 어떻게 매핑하는가?
> `@MappedSuperclass`: 등록일, 수정일 같이 여러 엔티티에서 공통으로 사용하는 매핑 정보만 상속받고 싶으면 이 기능을 사용
> 복합 키와 식별 관계 매핑: 데이터베이스의 식별자가 하나 이상일 때 매핑하는 방법
> 조인 테이블: 테이블은 외래 키 하나로 연관관계가 가능하지만 연관관계를 관리하는 연결 테이블을 두는 방법도 존재
> 엔티티 하나에 여러 테이블 매핑: 엔티티 하나에 테이블 하나를 매핑하지 않고 엔티티 하나에 여러 테이블을 매핑

## 💫 상속 관계 매핑
관계형 데이터베이스에는 객체지향 언어에서 다루는 상속이라는 개념이 없다. 그 대신 슈퍼타입 관계(Super-Type Sub-Type Relationship)라는 모델링 기법이 유사한 기능을 한다. **ORM에서 다루는 상속 관계 매핑**은 **객체의 상속 구조와 데이터베이스의 슈퍼타입 서브타입 관계를 매핑**하는 것이다.

슈퍼타입 서브타입 논리 모델을 실제 물리 모델인 테이블로 구현하는 방법
- 각각의 테이블로 변환
  - 각각을 모두 테이블로 만들고 조회할 때 조인을 사용 = 조인 전략
- 통합 테이블로 변환
  - 테이블을 하나만 사용해 통합 = 단일 테이블 전략
- 서브타입 테이블로 변환
  - 서브 타입마다 하나의 테이블을 생성 = 구현 클래스마다 테이블 전략

### ➰ 조인 전략
엔티티 **각각을 모두 테이블**로 만들고 자식 테이블이 부모 테이블의 기본 키를 받아 **기본 키 + 외래 키**로 사용하는 전략
- 조회 시 조인을 사용
- 객체는 **타입 구분이 가능**하지만, 테이블은 타입 개념이 없어 **타입을 구분하는 컬럼의 추가가 필요**

```java
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "DTYPE")
public abstract class Item {

  @Id @GeneratedValue
  @Column(name = "ITEM_ID")
  private Long id;

  private String name;
  private int price;
  ...

}

@Entity
@DiscriminatorValue("A")
public class Album extends Item {
  
  private String artist;
  ...

}

@Entity
@DiscriminatorValue("M")
public class Movie extends Item {

  private String director;
  private String actor;
  ...

}
```
- `@Inheritance(strategy = InheritanceType.JOINED)`
  - 상속 매핑은 부모 클래스에 이 annotation을 사용해야 한다.
  - 그리고 매핑 전략은 조인 전략을 사용한다는 것을 명시한다.
- `@DiscriminatorColumn(name = "DTYPE")`
  - 부모 클래스에 구분 컬럼을 지정한다.
  - 이 컬럼으로 저장된 자식 테이블을 구분한다.
- `@DiscriminatorValue("A")`
  - 엔티티를 저장할 떄 구분 컬럼에 입력할 값을 지정한다.

**장점**
- 테이블이 정규화된다.
- 외래 키 참조 무결성 제약조건을 활용할 수 있다.
- 저장공간을 효율적으로 사용한다.

**단점**
- 조인을 많이 사용하여 조회 쿼리가 복잡하고, 성능이 저하될 수 있다.
- 데이터를 등록할 INSERT SQL을 두 번 실행한다.

**특징**
- JPA 표준 명세는 구분 컬럼을 사용하도록 하지만, 몇몇 구현체는 생략해도 동작한다.

### ➰ 단일 테이블 전략
테이블을 하나만 사용한다. 그리고 구분 컬럼으로 어떤 자식 데이터가 저장되었는지 확인하고, 단일 테이블이므로 조인을 사용하지 않아 일반적으로 가장 빠르다.

**주의점**
- 자식 엔티티가 매핑한 컬럼은 모두 `null` 을 허용해야 한다. (`NOT NULL` X)
- 특정 자식 엔티티를 저장할 때, 다른 자식 엔티티와 매핑된 컬럼들은 사용하지 않아 `null` 이 입력되기 때문이다.

```java
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "DTYPE")
public abstract class Item {

  @Id @GeneratedValue
  @Column(name = "ITEM_ID")
  private Long id;

  private String name;
  private int price;
  ...

}

@Entity
@DiscriminatorValue("A")
public class Album extends Item {...}

@Entity
@DiscriminatorValue("M")
public class Movie extends Item {...}

@Entity
@DiscriminatorValue("B")
public class Book extends Item {...}
```
- 단일 테이블 전략임을 명시한다.
- 테이블 하나에 모든 것을 통합하기에 **구분 컬럼이 필수적**이다.

**장점**
- 조인이 필요없어 일반적으로 조회 성능이 빠르다.
- 조회 쿼리가 단순하다.

**단점**
- 자식 엔티티가 매핑한 컬럼은 모두 `null` 을 허용해야 한다.
- 단일 테이블에 모든 것을 저장해 오히려 테이블이 커질 수 있다. 즉, 조회 성능이 느려질 수 있다.

**특징**
- 구분 컬럼이 필수다. (`@DiscriminatorColumn`)
- `@DiscriminatorValue` 를 지정하지 않으면 기본으로 엔티티 이름을 사용한다.

### ➰ 구현 클래스마다 테이블 전략
자식 엔티티마다 테이블을 생성한다. 그리고 자식 테이블 각각에 필요한 컬럼이 모두 있다.

```java
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Item {

  @Id @GeneratedValue
  @Column(name = "ITEM_ID")
  private Long id;

  private String name;
  private int price;
  ...

}

@Entity
public class Album extends Item {...}

@Entity
public class Movie extends Item {...}

@Entity
public class Book extends Item {...}
```
- 구현 클래스마다 테이블 전략을 사용함을 명시한다.
- 자식 엔티티마다 테이블을 생성한다.

**장점**
- 서브 타입을 구분해 처리 시 효과적이다.
- `NOT NULL` 제약조건을 사용할 수 있다.

**단점**
- 여러 자식 테이블을 함께 조회할 때 성능이 느리다. (UNION 사용)
- 자식 테이블을 통합해서 쿼리하기 어렵다.

**특징**
- 구분 컬럼을 사용하지 않는다.

> 추천하지 않는 전략이다. 조인이나 단일 테이블 전략을 사용하자.

---

## 💫 @MappedSuperclass
부모 클래스는 테이블과 매핑하지 않고 부모 클래스를 상속받는 자식 클래스에게 매핑 정보만 제공하고 싶다면 `@MappedSuperclass` 를 사용하면 된다.
- 이는 추상 클래스와 비슷한데, `@Entity` 는 실제 테이블과 매핑되지만, 이는 실제 테이블과는 매핑되지 않는다.
- 단순히 **매핑 정보를 상속할 목적으로만 사용**된다.

**서로 관계가 없는 테이블**(`Member` & `Seller`)이지만, **공통 속성**을 가지는 두 객체 모델을 부모 클래스로 모으고 **객체 상속 관계**로 만들어보자.

```java
@MappedSuperclass
public abstract class BaseEntity {

  @Id @GeneratedValue
  private Long id;
  private String name;
  ...

}

@Entity
public class Member extends BaseEntity {

  // ID 상속
  // NAME 상속
  private String email;
  ...

}

@Entity
public class Seller extends BaseEntity {
  
  // ID 상속
  // NAME 상속
  private String shopName;
  ...

}
```
- `BaseEntity` 에는 객체들이 주로 사용하는 공통 매핑 정보를 정의했다. 자식 엔티티들은 이를 상속해 사용한다.
- 여기서 `BaseEntity` 는 테이블과 매핑할 필요가 없고 자식 엔티티들에게 공통으로 사용되는 매핑 정보만 제공하고 있다.
- 상속받은 매핑 정보(여기서는 `id` , `name`)를 재정의하기 위해서는 `@AttributeOverrides` 나 `@AttributeOverride` 를 사용하고, 연관관계를 재정의하기 위해서는 `@AssociationOverrides` 나 `@AssociationOverride` 를 사용한다.

**특징**
- 테이블과 매핑되지 않고, 자식 클래스에 엔티티의 매핑 정보를 상속하기 위해 사용한다.
- `@MappedSuperclass` 로 지정한 클래스는 엔티티가 아니므로 `em.find()` 나 JPQL에서 사용할 수 없다.
- 이 클래스를 직접 생성해 사용할 일은 거의 없어 추상 클래스로 만드는 것을 권장한다.

> 엔티티(`@Entity`)는 엔티티(`@Entity`)이거나 `@MappedSuperclass` 로 지정한 클래스만 상속받을 수 있다.

---

## 💫 복합 키와 식별 관계 매핑
복합 키를 매핑하는 방법과 식별 관계, 비식별 관계를 매핑하는 방법에 대해 다룬다.

### ➰ 식별 관계 vs 비식별 관계
이를 구분하는 것은 **외래 키가 기본 키에 포함되는지** 여부이다.

**식별관계**<br/>
부모 테이블의 기본 키를 내려받아서 자식 테이블의 기본 키 + 외래 키로 사용하는 관계

**비식별 관계**<br/>
부모 테이블의 기본 키를 받아 자식 테이블의 외래 키로만 사용하는 관계

비식별 관계는 외래 키에 `NULL` 을 허용하는지에 따라 필수적 비식별 관계와 선택적 비식별 관계로 나뉜다.
- 필수적 비식별 관계(Mandatory) : 외래 키에 `NULL` 을 허용하지 않는다. 연관관계를 필수적으로 맺어야 한다.
- 선택적 비식별 관계(Optional) : 외래 키에 `NULL` 을 허용한다. 선택적으로 연관관계를 맺는다.

> 최근에는 비식별 관계를 주로 사용하고, 꼭 필요한 곳에만 식별 관계를 사용하는 추세이다. JPA는 두 관계를 모두 지원한다.

### ➰ 복합 키: 비식별 관계 매핑
기본 키를 구성하는 컬럼이 하나면 단순하게 `@Id` 를 사용해 매핑한다.

```java
@Entity
public class Hello {
  @Id
  private String id;
}
```

둘 이상의 컬럼으로 구성된 복합 기본 키는 `@Id` 를 각 컬럼에 사용하는 것이 아니라 **별도의 식별자 클래스**가 필요하다.

JPA는 영속성 컨텍스트에 엔티티를 보관할 때 엔티티의 식별자를 키로 사용한다. 그리고 식별자를 구분하기 위해 `equals` 와 `hashCode` 를 사용해 동등성 비교를 한다.
- 식별자 필드가 하나일 때는 보통 자바의 기본 타입을 사용해 문제가 없다.
- 2개 이상인 경우 별도의 식별자 클래스를 만들고, `equals` 와 `hashCode` 를 구현해야 한다.
- JPA는 복합 키 지원을 위해 `@IdClass` 와 `@EmbeddedId` 2가지 방법을 제공한다.
  - 전자는 관계형 데이터베이스에 가까운 방법이고,
  - 후자는 객체지향에 좀 더 가까운 방법이다.

**`@IdClass`**<br/>
비식별 관계의 복합 키 테이블이 있고, `PARENT` 테이블은 복합 기본 키를 사용한다. 
- 기본 키를 `PARENT_ID1` , `PARENT_ID2` 로 묶은 복합 키로 구성했다.
- 따라서 별도의 식별자 클래스를 사용해 매핑해야 한다.

```java
@Entity
@IdClass(ParentId.class)
public class Parent {

  @Id
  @Column(name = "PARENT_ID1")
  private String id1;

  @Id
  @Column(name = "PARENT_ID2")
  private String id2;

  private String name;
  ...

}
```
- 각각의 기본 키 컬럼을 `@Id` 로 매핑했다. 그리고 `@IdClass` 를 사용해 `ParentId` 클래스를 식별자 클래스로 지정했다.

```java
public class ParentId implements Serializable {

  private String id1;
  private String id2;

  public ParentId() {
  }

  public ParentId(String id1, String id2) {
    this.id1 = id1;
    this.id2 = id2;
  }

  @Override 
  public boolean equals(Object o) {...}

  @Override
  public int hashCode() {...}
}
```

`@IdClass` 를 사용할 때 식별자 클래스가 만족해야 하는 조건이 있다.
- 식별자 클래스의 속성명과 엔티티에서 사용하는 식별자의 속성명이 같아야 한다.
- `Serializable` 인터페이스를 구현해야 한다.
- `equals` , `hashCode` 를 구현해야 한다.
- 기본 생성자가 있어야 한다.
- 식별자 클래스는 `public` 이어야 한다.

실사용 예시이다. 복합 키를 사용하는 엔티티를 저장한다.

```java
Parent parent = new Parent();
parent.setId1("myId1");
parent.setId2("myId2");
parent.setName("parentName");
em.persist(parent);
```
- 식별자 클래스인 `ParentId` 가 보이지 않는다. 
  - `em.persist()` 를 호출하면 영속성 컨텍스트에 엔티티를 등록하기 전 내부에서 `Parent.id1` , `Parent.id2` 값을 사용해 `ParentId` 를 생성하고 영속성 컨텍스트의 키로 사용한다.

복합 키로 조회하는 예시이다.

```java
ParentId parentId = new ParentId("myId1", "myId2");
Parent parent = em.find(Parent.class, parentId);
```
- 식별자 클래스를 사용해 엔티티를 조회한다.

이제 자식 클래스를 추가한다.

```java
@Entity
public class Child {

  @Id
  private String id;

  @ManyToOne
  @JoinColumns({
          @JoinColumn(name = "PARENT_ID1",
              referencedColumnName = "PARENT_ID1"),
          @JoinColumn(name = "PARENT_ID2",
              referencedColumnName = "PARENT_ID2")
  })
  private Parent parent;
}
```
- "부모 테이블의 기본 키 컬럼이 복합 키"이므로 "자식 테이블의 외래 키도 복합 키"다.
- 따라서 외래 키 매핑 시 여러 컬럼을 매핑해야 하므로 `@JoinColumns` 를 사용하고 각각의 외래 키 컬럼을 `@JoinColumn` 으로 매핑했다.

> `@JoinColumn` 의 `name` 속성과 `referencedColumnName` 속성의 값이 같다면 `referencedColumnName` 은 생략 가능하다.

**`@EmbeddedId`**<br/>
좀 더 객체지향적인 방법이다.

```java
@Entity
public class Parent {

  @EmbeddedId
  private ParentId id;

  private String name;
  ...

}
```
- `Parent` 엔티티에서 식별자 클래스를 직접 사용하고, `@EmbeddedId` 을 사용한다.

```java
@Embeddable
public class ParentId implements Serializable {

  @Column(name = "PARENT_ID1")
  private String id1;
  @Column(name = "PARENT_ID2")
  private String id2;

  // equals, hashCode 구현
  ...

}
```
- **식별자 클래스에 기본 키를 직접 매핑**한다.

`@EmbeddedId` 를 사용할 때 식별자 클래스가 만족해야 하는 조건이 있다.
- `@Embeddable` annotation을 붙여야 한다.
- `Serializable` 인터페이스를 구현해야 한다.
- `equals` , `hashCode` 를 구현해야 한다.
- 기본 생성자가 있어야 한다.
- 식별자 클래스는 `public` 이어야 한다.

`@EmbeddedId` 를 사용해 엔티티를 저장한다.

```java
Parent parent = new Parent();
ParentId parentId = new ParentId("myId1", "myId2");
parent.setId(parentId);
parent.setName("parentName");
em.persist(parent);
```

- 식별자 클래스를 직접 생성해 사용한다.

엔티티를 조회하는 예시이다. 조회 역시 식별자 클래스를 직접 사용한다.

```java
ParentId parentId = new ParentId("myId1", "myId2");
Parent parent = em.find(Parent.class, parentId);
```

**복합 키와 `equals()` , `hashCode()`**<br/>
복합 키는 해당 메소드들을 필수로 구현해야 한다.

```java
ParentId id1 = new ParentId();
id1.setId1("myId1");
id1.setId2("myId2");

ParentId id2 = new ParentId();
id2.setId1("myId1");
id2.setId2("myId2");

id1.equals(id2) -> ???
```
- 생성한 두 인스턴스 모두 같은 값을 가지고 있지만, 인스턴스 자체는 다르다.
- 따라서 `equals()` 를 적절히 오버라이딩하지 않았다면 결과는 거짓이다.
  - 자바의 모든 클래스는 기본으로 `Object` 클래스를 상속받는데, 이 클래스가 제공하는 **기본 `equals()` 는 인스턴스 참조 값 비교인 == 비교(동일성 비교)를 하기 때문**이다.
- 영속성 컨텍스트는 엔티티의 식별자를 키로 사용해 엔티티를 관리한다. 그리고 식별자 비교에 `equals()` 와 `hashCode()` 를 사용한다.
  - 따라서 식별자 객체의 동등성이 지켜지지 않으면 엔티티 관리에 문제가 발생하고, 이것이 위 메소드들의 필수적인 구현이 필요한 이유이다.

**`@IdClass` vs `@EmbeddedId`**<br/>
둘 다 장단점이 있어 취향껏 사용하면 된다.

> 복합 키를 구성하는 여러 컬럼 중 어느 하나에도 `@GeneratedValue` 를 사용할 수 없다.

### ➰ 복합 키: 식별 관계 매핑
부모, 자식, 손자까지 계속 기본 키를 전달하는 식별 관계가 있을 시, 식별 관계에서 자식 테이블은 부모 테이블의 기본 키를 포함해 복합 키를 구성해야 해서 `@IdClass` , `@EmbeddedId` 중 하나를 사용해 식별자를 매핑해야 한다.

**`@IdClass` 와 식별 관계**<br/>
```java
@Entity
public class Parent {

  @Id @Column(name = "PARENT_ID")
  private String id;
  private String name;
  ...

}

@Entity
@IdClass(ChildId.class)
public class Child {

  @Id
  @ManyToOne
  @JoinColumn(name = "PARENT_ID")
  public Parent parent;

  @Id @Column(name = "CHILD_ID")
  private String childId;

  private String name;
  ...

}

// 자식 ID
public class ChildId implements Serializable {

  private String parent;
  private String childId;

  // equals, hashCode
  ...

}

@Entity
@IdClass(GrandChildId.class)
public class GrandChild {

  @Id
  @ManyToOne
  @JoinColumns({
          @JoinColumn(name = "PARENT_ID"),
          @JoinColumn(name = "CHILD_ID")
  })
  private Child child;

  @Id @Column(name = "GRANDCHILD_ID")
  private String id;

  private String name;
  ...

}

// 손자 ID
public class GrandChildId implements Serializable {

  private ChildId child;
  private String id;

  // equals, hashCode
  ... 

}
```
- 식별 관계는 기본 키와 외래 키를 같이 매핑해야 한다. 따라서 식별자 매핑인 `@Id` 와 연관관계 매핑인 `@ManyToOne` 을 같이 사용한다.
- `Child` 엔티티의 `parent` 필드에서 이를 구현하고 있다.

**`@EmbeddedId` 와 식별 관계**<br/>
`@MapsId` 를 사용해야 한다.

```java
@Entity
public class Parent {

  @Id @Column(name = "PARENT_ID")
  private String id;

  private String name;
  ...

}

@Entity
public class Child {

  @EmbeddedId
  private String childId;

  @MapsId("parentId")
  @ManyToOne
  @JoinColumn(name = "PARENT_ID")
  public Parent parent;

  private String name;
  ...

}

// 자식 ID
@Embeddable
public class ChildId implements Serializable {

  private String parentId;

  @Column(name = "CHILD_ID")
  private String id;

  // equals, hashCode
  ...

}

@Entity
public class GrandChild {

  @EmbeddedId
  private GrandChildId id;

  @MapsId("childId")
  @ManyToOne
  @JoinColumns({
          @JoinColumn(name = "PARENT_ID"),
          @JoinColumn(name = "CHILD_ID")
  })
  private Child child;

  private String name;
  ...

}

// 손자 ID
@Embeddable
public class GrandChildId implements Serializable {

  private ChildId childId;

  @Column(name = "GRANDCHILD_ID")
  private String id;

  // equals, hashCode
  ... 

}
```
- `@EmbeddedId` 는 식별 관계로 사용할 연관관계의 속성에 `@MapsId` 를 사용하면 된다. `Child` 엔티티의 `parent` 필드에서 이를 구현하고 있다.

> `@IdClass` 와 다른 점은 `@Id` 대신 `@MapsId` 를 사용했다는 것이다. 이는 외래 키와 매핑한 연관관계를 기본 키에도 매핑하겠다는 뜻이다. 해당 annotation의 속성 값은 `@EmbeddedId` 를 사용한 식별자 클래스의 기본 키 필드를 지정하면 된다.

### ➰ 비식별 관계로 구현
위에서 예로 들었던 식별 관계 테이블을 비식별 관계로 변경해보자.

```java
@Entity
public class Parent {

  @Id @GeneratedValue 
  @Column(name = "PARENT_ID")
  private Long id;
  private String name;
  ...

}

@Entity
public class Child {

  @Id @GeneratedValue
  @Column(name = "CHILD_ID")
  private Long id;
  private String name;

  @ManyToOne
  @JoinColumn(name = "PARENT_ID")
  private Parent parent;
  ...

}

@Entity
public class GrandChild {

  @Id @GeneratedValue
  @Column(name = "GRANDCHILD_ID")
  private Long id;
  private String name;

  @ManyToOne
  @JoinColumn(name = "CHILD_ID")
  private Child child;
  ...

}
```
- 식별 관계보다 매핑도 쉽고 단순하다. 그리고 복합 키가 없어 복합 키 클래스를 만들지 않아도 된다.

### ➰ 일대일 식별 관계
이는 자식 테이블의 기본 키 값으로 **부모 테이블의 기본 키 값만 사용**한다. 
- 부모 테이블의 기본 키가 복합 키가 아니라면, 자식 테이블의 기본 키는 복합 키로 구성하지 않아도 된다.

```java
// 부모
@Entity
public class Board {

  @Id @GeneratedValue
  @Column(name = "BOARD_ID")
  private Long id;

  private String title;

  @OneToOne(mappedBy = "board")
  private BoardDetail boardDetail;
  ...

}

// 자식
@Entity
public class BoardDetail {

  @Id
  private Long boardId;

  @MapsId
  @OneToOne
  @JoinColumn(name = "BOARD_ID")
  private Board board;

  private String content;
  ...

}
```
- 위 자식 엔티티처럼 식별자가 단순히 컬럼 하나면, `@MapsId` 를 사용하고 속성 값은 비워두면 된다.
  - 이때 `@MapsId` 는 `@Id` 를 사용해 식별자로 지정한 `BoardDetail.boardId` 와 매핑된다.

### ➰ 식별, 비식별 관계의 장단점
아래와 같은 이유로 데이터베이스 설계 관점에서 식별 관계보다는 비식별 관계를 선호한다.

- 식별 관계는 부모 테이블의 기본 키를 자식 테이블로 전파하면서 자식 테이블의 기본 키 컬럼이 점점 늘어나게 한다.
  - 이는 결국 조인 시의 SQL을 복잡하게 만들고, 기본 키 인덱스가 불필요하게 커질 수 있도록 한다.
- 식별 관계는 2개 이상의 컬럼을 합해 복합 기본 키를 만들어야 하는 경우가 많다.
- 식별 관계를 사용할 때, 기본 키로 비즈니스 의미가 있는 자연 키 컬럼을 조합하는 경우가 많다. 반면 비식별 관계의 기본 키는 비즈니스와 전혀 관계없는 대리 키를 주로 사용한다.
  - 비즈니스 요구사항은 시간이 지남에 따라 언젠가는 변하기에 식별 관계의 자연 키 컬럼들이 많이 전파될수록 변경이 어렵다.
- 식별관계는 부모 테이블의 기본 키를 자식 테이블의 기본 키로 사용해 테이블 구조가 유연하지 못하다.

객체 관계 매핑 관점에서는 다음 이유로 비식별 관계를 선호한다.
- 일대일 관계를 제외하고 식별 관계는 2개 이상의 컬럼을 묶은 복합 기본 키를 사용한다. JPA에서 복합 키는 별도의 복합 키 클래스를 만들어 사용해야 한다.
  - 따라서 컬럼이 하나인 기본 키를 매핑하는 것보다 많은 노력이 필요하다.
- 비식별 관계의 기본 키는 주로 대리 키를 사용하는데, JPA는 `@GeneratedValue` 와 같은 편리한 방법을 제공한다.

물론 식별 관계의 장점도 있다.
- 기본 키 인덱스의 활용성이 좋고,
- 상위 테이블들의 기본 키 컬럼을 자식, 손자 테이블들이 가지고 있어 특정 상황에 조인 없이 하위 테이블만으로 검색을 완료할 수 있다.

> ORM 신규 프로젝트 진행 시 추천하는 방법은 가능한 **비식별 관계를 사용하고 기본 키는 `Long` 타입의 대리 키를 사용하는 것**이다.

---

## 💫 조인 테이블
데이터베이스 테이블의 연관관계를 설계하는 방법은 크게 2가지다.
- 조인 컬럼 사용(외래 키)
- 조인 테이블 사용(테이블 사용)

**조인 컬럼 사용**<br/>
테이블 간에 관계는 주로 조인 컬럼이라 부르는 외래 키 컬럼을 사용해서 관리한다. 

예를 들어 회원과 사물함이 있다. 
- 회원이 원할 때 사물함을 선택할 수 있다는 가정이 있다면, 회원이 사물함을 사용하기 전까진 둘 사이에 관계가 없어 `MEMBER` 테이블의 `LOCKER_ID` 외래 키에는 `null` 값을 입력해야 한다.
  - 이렇게 외래 키에 `null` 을 허용하는 관계를 이전에 **선택적 비식별 관계**라 했다.

선택적 비식별 관계는 이러한 특성으로 조인 시 **외부 조인(OUTER JOIN)**을 사용해야 한다.

**조인 테이블 사용**<br/>
별도의 테이블을 사용해서 연관관계를 관리하는 방법이다.

조인 컬럼을 사용하는 방법은 단순히 외래 키 컬럼만 추가해 연관관계를 맺지만, 조인 테이블을 사용하는 방법은 연관관계를 관리하는 조인 테이블을 추가하고, 여기서 두 테이블의 외래 키를 가지고 연관관계를 관리한다.
- 따라서, **두 테이블에는 연관관계 관리를 위한 외래 키 컬럼이 없다.**

추가적인 테이블을 생성해야 한다는 것이 가장 큰 단점이다.
- 관리해야 할 테이블이 늘어나고, 두 테이블의 조인을 위해 총 3개의 테이블이 조인되어야 한다. 

> 객체와 테이블을 매핑할 때 조인 컬럼 -> `@JoinColumn` , 조인 테이블 -> `@JoinTable` 로 매핑한다.

### ➰ 일대일 조인 테이블
(두 테이블의) 일대일 관계를 관리하기 위해서는 조인 테이블의 외래 키 컬럼 각각에 총 2개의 유니크 제약조건을 걸어야 한다. (`PARENT` - `PARENT_CHILD` , `CHILD`)

```java
@Entity
public class Parent {

  @Id @GeneratedValue
  @Column(name = "PARENT_ID")
  private Long id;
  private String name;

  @OneToOne
  @JoinTable(name = "PARENT_CHILD",
          joinColumns = @JoinColumn(name = "PARENT_ID"),
          inverserJoinColumns = @JoinColumn(name = "CHILD_ID")
  )
  private Child child;
  ...

}

@Entity
public class Child {

  @Id @GeneratedValue
  @Column(name = "CHLID_ID")
  private Long id;
  private String name;
  ...

}
```
- 부모 엔티티는 `@JoinTable` 을 사용하고 있다.
  - `name` : 매핑할 조인 테이블 이름
  - `joinColumns` : 현재 엔티티를 참조하는 외래 키
  - `inverseJoinColumns` : 반대방향 엔티티를 참조하는 외래 키

> 양방향 매핑을 위해서는 자식 엔티티에 `parent` 필드를 생성하고, `@OneToOne` annotation을 사용하면 된다.

### ➰ 일대다 조인 테이블
일대다 관계를 만들려면 조인 테이블의 컬럼 중 **다(N)와 관련된 컬럼에 유니크 제약조건**을 걸어야 한다.

```java
@Entity
public class Parent {

  @Id @GeneratedValue
  @Column(name = "PARENT_ID")
  private Long id;
  private String name;

  @OneToMany
  @JoinTable(name = "PARENT_CHILD",
          joinColumns = @JoinColumn(name = "PARENT_ID"),
          inverserJoinColumns = @JoinColumn(name = "CHILD_ID")
  )
  private List<Child> child = new ArrayList<>();
  ...

}

@Entity
public class Child {

  @Id @GeneratedValue
  @Column(name = "CHLID_ID")
  private Long id;
  private String name;
  ...

}
```

### ➰ 다대일 조인 테이블
일대다에서 방향만 반대이다!

```java
@Entity
public class Parent {

  @Id @GeneratedValue
  @Column(name = "PARENT_ID")
  private Long id;
  private String name;

  @OneToMany(mappedBy = "parent")
  private List<Child> child = new ArrayList<>();
  ...

}

@Entity
public class Child {

  @Id @GeneratedValue
  @Column(name = "CHLID_ID")
  private Long id;
  private String name;

  @ManyToOne(optional = false)
  @JoinTable(name = "PARENT_CHILD",
          joinColumns = @JoinColumn(name = "CHILD_ID"),
          inverserJoinColumns = @JoinColumn(name = "PARENT_ID")
  )
  private Parent parent;
  ...

}
```

### ➰ 다대다 조인 테이블
다대다 관계를 만들기 위해서는 조인 테이블의 두 컬럼을 합해 하나의 복합 유니크 제약조건을 걸어야 한다.

```java
@Entity
public class Parent {

  @Id @GeneratedValue
  @Column(name = "PARENT_ID")
  private Long id;
  private String name;

  @ManyToMany
  @JoinTable(name = "PARENT_CHILD",
          joinColumns = @JoinColumn(name = "PARENT_ID"),
          inverserJoinColumns = @JoinColumn(name = "CHILD_ID")
  )
  private List<Child> child = new ArrayList<>();
  ...

}

@Entity
public class Child {

  @Id @GeneratedValue
  @Column(name = "CHLID_ID")
  private Long id;
  private String name;
  ...

}
```

> 조인 테이블에 컬럼을 추가하면 `@JoinTable` 전략을 사용할 수 없다. 대신 새로운 엔티티를 만들어 조인 테이블과 매핑해야 한다.

---

## 💫 엔티티 하나에 여러 테이블 매핑
잘 사용하지는 않지만 `@SecondaryTable` 을 사용하면 한 엔티티에 여러 테이블을 매핑할 수 있다.

```java
@Entity
@Table(name = "BOARD")
@SecondaryTable(name = "BOARD_DETAIL",
    pkJoinColumns = @PrimaryKeyJoinColumn(name = "BOARD_DETAIL_ID"))
public class Board {

  @Id @GeneratedValue
  @Column(name = "BOARD_ID")
  private Long id;

  private String title;

  @Column(table = "BOARD_DETAIL")
  private String content;
  ...

}
```
- `Board` 엔티티는 `@Table` 로 `BOARD` 테이블과 매핑했고, 추가로 `@SecondaryTable` 를 사용해 `BOARD_DETAIL` 테이블과 매핑했다.
  - `@SecondaryTable.name` : 매핑할 다른 테이블의 이름
  - `@SecondaryTable. pkJoinColumns` : 매핑할 다른 테이블의 기본 키 컬럼 속성
- `@SecondaryTables` 에 `@SecondaryTable` 를 여러 개 사용하여 추가로 테이블들과 매핑할 수도 있다.

> 하나의 엔티티에 여러 테이블을 매핑하는 것은 항상 두 테이블을 조회하기에 최적화가 어렵다. 따라서 테이블당 엔티티를 생성해 일대일 매핑하는 것을 권장한다.

## 📕 출처
**자바 ORM 표준 JPA 프로그래밍** - 김영한
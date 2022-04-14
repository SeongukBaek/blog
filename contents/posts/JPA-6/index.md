---
title: "📚 6. 다양한 연관관계 매핑"
description: "JPA 책 정리"
date: 2022-03-16
update: 2022-03-16
tags:
  - Java
  - JPA
  - SpringBoot
series: "📚 ORM 표준 JPA"
---

<em>[자바 ORM 표준 JPA 프로그래밍 - 김영한]을 읽고 인용하고 정리하는 POST입니다.</em>

> 다중성과 단방향, 양방향을 고려한 가능한 모든 연관관계를 하나씩 알아본다.
> - 다대일 : 단방향, 양방향
> - 일대다 : 단방향, 양방향
> - 일대일 : 주 테이블 단방향, 양방향
> - 일대일 : 대상 테이블 단방향, 양방향
> - 다대다 : 단방향, 양방향

## 💫 다대일
다대일 관계의 반대 방향 = 일대다 관계, 역 또한 성립한다. 데이터베이스 테이블의 일(1), 다(N) 관계에서 외래 키는 항상 **다쪽에** 있다. 따라서 객체 양방향 관계에서 연관관계의 주인은 항상 다쪽이다.

### ➰ 다대일 단방향[N:1]

```java
@Entity
public class Member {
  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;

  private String username;

  @ManyToOne
  @JoinColumn(name = "TEAM_ID")
  private Team team; 
  ...

}
```

```java
@Entity
public class Team {

  @Id @GeneratedValue
  @Column(name = "TEAM_ID")
  private Long id;

  private String name;
  ...

}
```

회원은 `Member.team` 으로 팀 엔티티를 참조할 수 있지만 팀에는 회원을 참조하는 필드가 없다 (**회원과 팀은 다대일 단방향 연관관계**)

### ➰ 다대일 양방향[N:1, 1:N]
아래 예시 연관관계의 주인은 `Member.team` 이고 `Team.members` 는 주인이 아니다.

```java
@Entity
public class Member {
  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;

  private String username;

  @ManyToOne
  @JoinColumn(name = "TEAM_ID")
  private Team team; 
  
  public void setTeam(Team team) {
    this.team = team;

    if (!team.getMembers().contains(this)) {
      team.getMembers().add(this);
    }
  }
}
```

```java
@Entity
public class Team {

  @Id @GeneratedValue
  @Column(name = "TEAM_ID")
  private Long id;

  private String name;
  
  @OneToMany(mappedBy = "team")
  private List<Member> members = new ArrayList<Member>();

  public void addMember(Member member) {
    this.members.add(member);
    if (member.getTeam() != this) {
      member.setTeam(this);
    }
  }
  ...

}
```

**양방향은 외래 키가 있는 쪽이 연관관계의 주인이다.**<br/>
일대다와 다대일 연관관계는 항상 다쪽에 외래 키가 있다. 따라서 다쪽이 연관관계의 주인이다. JPA는 외래 키를 관리할 때 연관관계의 주인만 사용하고, 주인이 아닌 필드는 조회를 위한 JPQL이나 객체 그래프 탐색 시에 사용한다.

**양방향 연관관계는 항상 서로를 참조해야 한다.**<br/>
어느 한 쪽만 참조하면 양방향 연관관계가 성립하지 않는다. 항상 서로를 참조하기 위해서는 연관관계 편의 메소드를 작성하는 것이 좋다. (이전 장 확인) 양쪽에 모두 작성하더라도 무한 루프에 빠지지 않도록 주의해야 한다.

---

## 💫 일대다
다대일 관계의 반대 방향이다. 이 관계는 엔티티를 하나 이상 참조할 수 있으므로 자바 컬렉션 중 하나를 사용해야 한다.

### ➰ 일대다 단방향 [1:N]
"하나의 팀이 여러 회원을 참조한다." 와 같은 관계를 일대다 관계라 한다. 그리고 팀은 회원들을 참조하지만 회원은 팀을 참조하지 않으면 단방향 관계이다. 

일대다 단방향 관계는 자신이 매핑한 테이블의 외래 키를 관리하지 않고, 반대쪽 테이블에 있는 외래 키를 관리한다. 
- 일대다 관계에서 외래 키는 항상 다쪽 테이블에 있다. 
- 하지만 다쪽 엔티티에는 외래 키를 매핑할 수 있는 참조 필드가 없다. 대신 반대쪽 엔티티에만 참조 필드가 있다.

```java
@Entity
public class Team {

  @Id @GeneratedValue
  @Column(name = "TEAM_ID")
  private Long id;

  private String name;
  
  @OneToMany
  @JoinColumn(name = "TEAM_ID") // MEMBER 테이블의 TEAM_ID (FK)
  private List<Member> members = new ArrayList<>();
  ...

}
```

```java
@Entity
public class Member {
  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;

  private String username;
  ...

}
```

일대다 단방향 관계 매핑 시에는 `@JoinColumn` 을 명시해야 한다. 그렇지 않은 경우 JPA는 연결 테이블을 중간에 두고 연관관계를 관리하는 조인 테이블 전략을 기본으로 사용해 매핑한다.

**일대다 단방향 매핑의 단점**<br/>
매핑한 객체가 관리하는 외래 키가 다른 테이블에 존재한다는 것이다. 
- 본인 테이블에 있는 경우 INSERT SQL 한 번으로 끝낼 엔티티의 저장과 연관관계 처리가, 추가적인 UPDATE SQL이 필요해졌다.

```java
public void testSave() {
  Member member1 = new Member("member1");
  Member member2 = new Member("member2");

  Team team1 = new Team("team1");
  team1.getMembers().add(member1);
  team1.getMembers().add(member2);

  em.persist(member1);
  em.persist(member2);
  em.persist(team1);

  transaction.commit();
}
```

- `Member` 엔티티는 `Team` 엔티티를 모른다. 그리고 연관관계에 대한 정보는 `Team` 엔티티의 `members` 가 관리한다. 
- 따라서 `Member` 엔티티를 저장할 땐 `MEMBER` 테이블의 `TEAM_ID` 외래 키에 아무 값도 저장되지 않는다. 
- 대신 `Team` 엔티티 저장 시 참조 값을 확인해 `MEMBER` 테이블을 업데이트하게 된다.

**일대다 단방향 매핑보다는 다대일 양방향 매핑을 사용하자**<br/>
위 단점에 따라 성능 문제도 있지만 관리도 부담스럽다. 문제 해결을 위해 다대일 양방향 매핑을 대신 사용한다.
- 다대일 양방향 매핑은 관리해야 하는 외래 키가 본인 테이블에 있다.
- 두 매핑의 테이블 모양은 완전히 동일하므로 약간의 엔티티 수정으로 구현가능하다.

### ➰ 일대다 양방향 [1:N, N:1]
일대다 양방향 매핑은 존재하지 않는다. 대신 다대일 양방향 매핑을 사용해야 한다. (여기서는 왼쪽을 연관관계의 주인으로 가정)
- 더 정확히는 양방향 매핑에서 `@OneToMany` 는 연관관계의 주인이 될 수 없다. 
  - 왜냐면 관계형 데이터베이스의 특성상 일대다, 다대일 관계는 항상 다쪽에 외래 키가 있다.
  - 따라서, 둘 중 연관관계의 주인은 항상 다쪽인 `@ManyToOne` 을 사용한 곳이다. 
  - 이러한 이유로 `@ManyToOne` 에는 `mappedBy` 속성이 없다.

하지만 일대다 단방향 매핑 반대편에 같은 외래 키를 사용하는 다대일 단방향 매핑을 읽기 전용으로 추가해 일대다 양방향 매핑이 가능하다.

```java
@Entity
public class Team {

  @Id @GeneratedValue
  @Column(name = "TEAM_ID")
  private Long id;

  private String name;
  
  @OneToMany
  @JoinColumn(name = "TEAM_ID")
  private List<Member> members = new ArrayList<>();
  ...

}
```

```java
@Entity
public class Member {

  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;

  private String username;

  @ManyToOne
  @JoinColumn(name = "TEAM_ID", insertable = false, updatable = false)
  private Team team;
  ...

}
```

반대쪽 엔티티에 같은 외래 키를 사용하는 다대일 단방향 매핑을 추가했다. 그리고 `insertable` , `updatable` 속성을 `false` 로 설정해 읽기만 가능하게 했다.
- 일대다 양방향 매핑이라기보단 일대다 단방향 매핑 반대편에 다대일 단방향 매핑을 읽기 전용으로 추가해 일대다 양방향처럼 보이게 한 것이다.
- 따라서 일대다 단방향 매핑이 가지는 단점을 그대로 가진다.

---

## 💫 일대일[1:1]
양쪽이 서로 하나의 관계만 가진다.
- 일대일 관계는 그 반대도 일대일 관계다.
- 테이블 관계에서 일대다, 다대일은 항상 다쪽이 외래 키를 가지는데, 일대일 관계는 주 테이블이나 대상 테이블 둘 중 어느 곳이나 외래 키를 가질 수 있다.
  - 양쪽으로 조회가 가능하다.

**주 테이블에 외래 키**<br/>
주 객체가 대상 객체를 참조하는 것처럼 대상 테이블을 참조한다. 외래 키를 객체 참조와 비슷하게 사용할 수 있고, 주 테이블만 확인해도 대상 테이블과 연관관계가 있는지 알 수 있다.

**대상 테이블에 외래 키**<br/>
테이블 관계를 일대일에서 일대다로 변경할 떄 테이블 구조를 그대로 유지할 수 있다는 장점이 있다.

### ➰ 주 테이블에 외래 키
JPA도 주 테이블에 외래 키가 있으면 좀 더 편리하게 매핑할 수 있다. (객체지향 개발자들은 이를 선호)

**단방향**
- `MEMBER` 가 주 테이블, `LOCKER` 가 대상 테이블

```java
@Entity
public class Member {

  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;

  private String username;

  @OneToOne
  @JoinColumn(name = "LOCKER_ID")
  private Locker locker;
  ...

}

@Entity
public class Locker {

  @Id @GeneratedValue
  @Column(name = "LOCKER_ID")
  private Long id;

  private String name;
  ...

}
```

**양방향**<br/>
단방향에 반대 방향을 추가해 구현 가능하다.

```java
@Entity
public class Member {

  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;

  private String username;

  @OneToOne
  @JoinColumn(name = "LOCKER_ID")
  private Locker locker;
  ...

}

@Entity
public class Locker {

  @Id @GeneratedValue
  @Column(name = "LOCKER_ID")
  private Long id;

  private String name;
  
  @OneToOne(mappedBy = "locker")
  private Member member;
  ...

}
```
- 양방향이므로 연관관계의 주인을 정할 필요가 있다. 외래 키를 가지고 있는 `Member` 엔티티의 `locker` 가 연관관계의 주인이다.
  - 따라서 `mappedBy` 속성 설정!

### ➰ 대상 테이블에 외래 키
**단뱡항**<br/>
일대일 관계 중 대상 테이블에 외래 키가 있는 단방향 관계는 JPA에서 지원하지 않는다. 그리고 매핑할 방법도 없다. 
- 단방향 관계의 방향을 수정하거나, 양방향 관계로 만들고 연관관계의 주인을 수정해야 한다.

**양방향**<br/>
```java
@Entity
public class Member {

  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private Long id;

  private String username;

  @OneToOne
  @JoinColumn(name = "member")
  private Locker locker;
  ...

}

@Entity
public class Locker {

  @Id @GeneratedValue
  @Column(name = "LOCKER_ID")
  private Long id;

  private String name;
  
  @OneToOne(mappedBy = "MEMBER_ID")
  private Member member;
  ...

}
```

일대일 매핑에서 대상 테이블에 외래 키를 두고 싶다면 위와 같이 양방향 매핑해야 한다. 
- 대상 엔티티인 `Locker` 를 연관관계의 주인으로 만들고,
- `LOCKER` 테이블의 외래 키를 관리하도록 했다.

---

## 💫 다대다
관계형 데이터베이스는 정규화된 테이블 2개로 다대다 관계를 표현할 수 없다. 
- 그래서 보통 다대다 관계를 일대다, 다대일 관계로 풀어내는 **연결 테이블을 사용**한다.

하지만 객체는 테이블과 달리 객체 2개로 다대다 관계 표현이 가능하다. 
- 컬렉션을 사용해 상대 엔티티를 참조할 수 있다.
- `@ManyToMany` 사용

### ➰ 다대다: 단방향
다대다 단방향 관계인 회원과 상품 엔티티 예제

```java
@Entity
public class Member {

  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private String id;

  private String username;

  @ManyToMany
  @JoinTable(name = "MEMBER_PRODUCT", joinColumns = @JoinColumn(name = "MEMBER_ID"), inverseJoinColumns = @JoinColumn(name = "PRODUCT_ID"))
  private List<Product> products = new ArrayList<>();
  ...

}
```

```java
@Entity
public class Product {

  @Id @GeneratedValue
  @Column(name = "PRODUCT_ID")
  private String id;

  private String name;
}
```

두 엔티티를 `@ManyToMany` 로 매핑했다. 중요한 점은 **`@ManyToMany` 와 `@JoinTable` 을 사용해 연결 테이블을 바로 매핑**한 것이다.
- `@JoinTable.name` : 연결 테이블 지정
- `@JoinTable.joinColumns` : 현재 방향인 회원과 매핑할 조인 컬럼 정보를 지정
- `@JoinTable.inverseJoinColumns` : 반대 방향인 상품과 매핑할 조인 컬럼 정보 지정

다음은 다대다 관계를 저장하는 예제이다.

```java
public void save() {

  Product productA = new Product();
  productA.setId("productA");
  productA.setName("상품A");
  em.persist(productA);

  Member member1 = new Member();
  member1.setId("member1");
  member1.setUsername("회원1");
  member1.getProducts().add(productA); // 연관관계 설정
  em.persist(member1);
}
```

두 엔티티 간 연관관계를 지정했으므로, `회원1`을 저장할 때 연결 테이블에도 값이 저장된다. 
- 따라서 `PRODUCT` , `MEMBER` , `MEMBER_PRODUCT` 테이블 모두에 대한 INSERT SQL이 전달된다.

`member.getProducts()` 를 호출해 상품 이름 조회 시, 연결 테이블인 `MEMBER_PRODUCT` 와 상품 테이블을 조인해 객체 그래프 탐색을 수행한다.

**연관관계의 주인만이 데이터베이스 연관관계와 매핑되고, 외래 키를 관리(등록, 수정, 삭제)할 수 있다. 반면에 주인이 아닌 쪽은 읽기만 가능하다.**

### ➰ 다대다: 양방향
양방향을 만들기 위해 다대다 매핑이므로 역방향도 `@ManyToMany` 를 사용한다. 그리고 원하는 곳에 `mappedBy` 로 연관관계의 주인을 지정한다. (`mappedBy` 가 없는 곳이 주인!)

```java
@Entity
public class Product {

  @Id
  private String id;

  @ManyToMany(mappedBy = "products")
  private List<Member> members;
  ...

}
```

다대다의 양방향 연관관계는 다음처럼 설정한다.

```java
member.getProducts().add(product);
product.getMembers().add(member);
```

> 그리고 양방향 연관관계는 **연관관계 편의 메소드를 추가**해 관리하는 것이 편리하다.

양방향 연관관계를 만들었으므로, `product.getMembers()` 를 사용해 역방향으로 객체 그래프 탐색이 가능해졌다.

### ➰ 다대다: 매핑의 한계와 극복, 연결 엔티티 사용
다대다 annotation을 통해 자동 연결 테이블을 처리해 도메인 모델이 단순해지고 여러 가지로 편리해졌다. 
- 하지만 실사용에는 한계가 있다. 
  - 회원이 상품을 주문하면 연결 테이블에 단순히 주문한 회원 아이디와 상품 아이디만 담고 끝나지 않는다. 보통은 연결 테이블에 주문 수량 컬럼이나 주문한 날짜 같은 컬럼이 더 필요하다.
  - 그렇다고 해서, 연결 테이블에 컬럼들을 추가하게 되면, 더는 `@ManyToMany` 를 사용할 수 없다.
  - > 주문 엔티티나 상품 엔티티에는 추가한 컬럼들을 매핑할 수 없기 때문이다!
- 따라서 연결 테이블을 매핑하는 연결 엔티티를 만들고 이곳에 추가한 컬럼들을 매핑해야 한다. 
- 또한 엔티티 간의 관계도 테이블 관계처럼 다대다에서 일대다, 다대일로 풀어야 한다. 

```java
@Entity
public class Member {

  @Id @GeneratedValue
  @Column(name = "MEMBER_ID")
  private String id;

  private String username;

  @OneToMany (mappedBy = "member")
  private List<MemberProduct> memberProducts;
  ...

}
```

회원과 회원상품을 양방향 관계로 만들었다. 
- 회원상품 엔티티쪽이 외래 키를 가지므로 연관관계의 주인이다. (따라서 `mappedBy` 사용)

```java
@Entity
public class Product {

  @Id @Column(name = "PRODUCT_ID")
  private String id;

  private String name;
  ...

}
```

상품 엔티티에서 회원상품 엔티티로 객체 그래프 탐색 기능이 필요하지 않아 연관관계 미생성

```java
@Entity
@IdClass(MemberProductId.class)
public class MemberProduct {

  @Id 
  @ManyToOne
  @JoinColumn(name = "MEMBER_ID")
  private Member member;

  @Id 
  @ManyToOne
  @JoinColumn(name = "PRODUCT_ID")
  private Product product;

  private int orderAmount;
  ...

}
```

```java
public class MemberProductId implements Serializable {
  private String member;
  private String product;

  @Override
  public boolean equals(Object o) {...}

  @Override
  public int hashCode() {...}
}
```

회원상품 엔티티를 보면, 기본 키를 매핑하는 `@Id` 와 외래 키를 매핑하는 `@JoinColumn` 을 동시에 사용해 기본 키 + 외래 키를 한번에 매핑했다. 그리고 `@IdClass` 를 사용해 복합 기본 키를 매핑했다.

**복합 기본 키**<br/>
회원상품 엔티티는 기본 키가 `MEMBER_ID` , `PRODUCT_ID` 로 이루어진 복합 기본 키이다. JPA에서 이를 사용하려면 **별도의 식별자 클래스가 필요**하다. 그리고 엔티티에 `@IdClass` 를 사용해 식별자 클래스를 지정하면 된다. (예제에서는 `MemberProductId` 클래스)

복합 기본 키를 위한 식별자 클래스의 특징
- 복합 키는 별도의 식별자 클래스로 만들어야 한다.
- `Serializable` 을 구현해야 한다.
- `equals` , `hashCode` 메소드를 구현해야 한다.
- 기본 생성자가 있어야 한다.
- 식별자 클래스는 `public` 이어야 한다.
- `@IdClass` 를 사용하는 방법 외에 `@EmbeddedId` 를 사용하는 방법도 있다.

**식별 관계**<br/>
회원상품은 회원과 상품의 기본 키를 받아 자신의 기본 키로 사용한다. 이렇게 "부모 테이블의 기본 키를 받아 자신의 기본 키 + 외래 키로 사용"하는 것을 식별 관계(Identifying Relationship)이라 한다.

> 회원상품은 **회원의 기본 키**를 받아 **자신의 기본 키**로 사용함과 동시에 **회원과의 관계를 위한 외래 키**로 사용한다. (상품의 기본 키도 동일하게 사용)
> 또한 식별자 클래스로 두 기본 키를 묶어 **복합 기본 키로 사용**한다.

저장 시에는, 
- 연결 엔티티를 만들면서 연관된 엔티티를 설정한다.
- 연결 엔티티는 데이터베이스에 저장될 때 연관된 엔티티의 식별자를 가져와서 자신의 기본 키 값으로 사용한다.

조회 시에는,
- 생성한 식별자 클래스로 엔티티를 조회한다.

> 복합 기본 키를 사용하는 방법은 복잡하다. 식별자 클래스 생성, `@IdClass` 또는 `@EmbeddedId` 사용, 식별자 클래스 메소드 구현과 같은 과정이 필요하다. 다음은 복합 기본 키를 사용하지 않고 간단히 다대다 관계를 구성하는 방법에 대해 알아본다.

### ➰ 다대다: 새로운 기본 키 사용
**데이터베이스에서 자동으로 생성해주는 대리 키를 `Long` 값으로 사용하는 것**이다. 
- 간편하고,
- 거의 영구히 쓸 수 있으며,
- 비즈니스에 의존하지 않는다.
- ORM 매핑 시 복합 기본 키를 만들지 않아도 된다.

`MemberProduct` 를 `ORDER` 로 수정하고, `ORDER_ID` 라는 새 기본 키를 만들고, `MEMBER_ID` & `PRODUCT_ID` 컬럼은 외래 키로만 사용한다.

```java
@Entity
public class Order {

  @Id @GeneratedValue
  @Column(name = "ORDER_ID")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "MEMBER_ID")
  private Member member;

  @ManyToOne
  @JoinColumn(name = "PRODUCT_ID")
  private Product product;

  private int orderAmount;
  ...

}
```

대리 키를 사용함으로써 이전에 보았던 식별 관계에 복합 기본 키를 사용하는 것보다 매핑이 단순하고 직관적이다. 

저장 시에는,
- 회원과 상품 엔티티를 생성해 저장하고, 
- 주문 엔티티에서 연관된 엔티티와 연관관계 설정(`set연관된엔티티`)하고 저장한다.

조회 시에는,
- 주문 엔티티로 조회하고, 연관된 엔티티들을 `get연관된엔티티` 하여 조회한다.

### ➰ 다대다 연관관계 정리
다대다 관계를 일대다 + 다대일 관계로 풀어내기 위해 연결 테이블을 만들 때 식별자를 어떻게 구성할지 선택해야 한다.

- **식별 관계** : 받아온 식별자를 기본 키 + 외래 키로 사용한다.
- **비식별 관계** : 받아온 식별자는 외래 키로만 사용하고 새로운 식별자를 추가한다.

객체 입장에서는, **비식별 관계를 사용**하는 것이 복합 기본 키를 위한 식별자 클래스를 생성하지 않아도 되어 더 단순하고 편리한 ORM 매핑을 가능케 한다.

## 📕 출처
**자바 ORM 표준 JPA 프로그래밍** - 김영한
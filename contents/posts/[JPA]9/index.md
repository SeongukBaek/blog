---
title: "📚 9. 값 타입"
description: "JPA 책 정리"
date: 2022-03-23
update: 2022-03-23
tags:
  - Java
  - JPA
  - SpringBoot
series: "📚 ORM 표준 JPA"
---

<em>[자바 ORM 표준 JPA 프로그래밍 - 김영한]을 읽고 인용하고 정리하는 POST입니다.</em>

> **JPA의 데이터 타입 분류** - **엔티티 타입 & 값 타입**
> - **엔티티 타입** : `@Entity` 로 정의하는 객체
>   - 식별자를 통해서 지속 추적이 가능
> - **값 타입** : `int` , `Integer` , `String` 처럼 단순히 값으로 사용하는 자바 기본 타입이나 객체
>   - 식별자가 없고 숫자나 문자 같은 속성만 존재해 추적이 불가능
>   - 기본값 타입, 임베디드 타입, 컬렉션 값 타입 존재

## 💫 기본값 타입
`String` , `int` 처럼 자바가 제공하는 기본 데이터 타입이다. 

```java
@Entity
public class Member {

  @Id @GeneratedValue
  private Long id;

  private String name;
  private int age;
  ...

}
```
- `Member` 에서 `String` , `int` 가 값 타입이다. 해당 엔티티는 `id` 라는 식별자 값도 가지고 생명주기도 있지만, 값 타입인 `name` , `age` 속성은 식별자 값도 없고 생명주기도 회원 엔티티에 의존한다.
  - 따라서 회원 엔티티 인스턴스를 제거하면 해당 속성들도 제거된다.
- 값 타입은 공유하면 안된다. 다른 회원의 이름을 변경한다고 해서 나의 이름까지 변경되는 예시를 생각해보면 이해가 빠를 것이다.

---

## 💫 임베디드 타입(복합 값 타입)
JPA에서 사용자가 직접 정의한 값 타입이다. 중요한 것은 이 타입 또한 `int` , `String` 처럼 값 타입이라는 것이다. 

```java
@Entity
public class Member {

  @Id @GeneratedValue
  private Long id;
  private String name;

  // 근무 기간
  @Temporal (TemporalType.DATE) java.util.Date startDate;
  @Temporal (TemporalType.DATE) java.util.Date endDate;

  // 집 주소 표현
  private String city;
  private String street;
  private String zipcode;
  ...

}
```
- "회원 엔티티는 이름, 근무 시작일, 근무 종료일, 주소 도시, 주소 번지, 주소 우편번호를 가진다." 라고 이 엔티티를 설명할 수 있다.
- 이는 단순히 정보를 풀어둔 것이고, 좀 더 명확하게 설명하자면, "회원 엔티티는 이름, 근무 기간, 집 주소를 가진다." 라고 할 수 있다.
- 회원이 상세한 데이터를 그대로 가지고 있는 것은 **객체지향적이지 않으며, 응집력만 떨어뜨린다.**
  - 대신, **근무 기간, 주소 같은 타입**이 있다면 더 명확한 코드를 작성할 수 있을 것이다.

```java
@Entity
public class Member {

  @Id @GeneratedValue
  private Long id;
  private String name;

  // 근무 기간
  @Embedded Period workPeriod;

  // 집 주소 표현
  @Embedded Address homeAddress;
  ...

}
```

```java
@Embeddable
public class Period {

  @Temporal (TemporalType.DATE) java.util.Date startDate;
  @Temporal (TemporalType.DATE) java.util.Date endDate;

  public boolean isWork(Date date) {
    // ... 값 타입을 위한 메소드 정의
  }
}
```

```java
@Embeddable
public class Address {

  @Column(name = "city")
  private String city;
  private String street;
  private String zipcode;
  ...

}
```
- `startDate` , `endDate` 를 합해 `Period`(기간) 클래스를 생성한다.
- `city` , `street` , `zipcode` 를 합해 `Address`(주소) 클래스를 생성한다.
- 이렇게 새로 정의한 값 타입들은 **재사용**할 수 있고, **응집도도 아주 높다.** 또한 `Period.isWork()` 처럼 해당 값 타입만 사용하는 의미 있는 메소드도 만들 수 있다.

임베디드 타입의 사용을 위해서는 아래 2가지 annotation가 필요한데, 둘 중 하나는 생략 가능하다.
- `@Embeddable` : 값 타입을 정의하는 곳에 표시
- `@Embedded` : 값 타입을 사용하는 곳에 표시

**임베디드 타입은 기본 생성자가 필수**적이다.

> 임베디드 타입을 포함한 모든 값 타입은 **엔티티의 생명주기에 의존**하므로 엔티티와 임베디드 타입의 관계를 UML로 표현하면 **컴포지션 관계**가 된다. (UML에서 임베디드 값 타입은 기본 타입처럼 단순하게 표현)
  
### ➰ 임베디드 타입과 테이블 매핑
임베디드 타입은 엔티티의 값일 뿐이다. 따라서 **값이 속한 엔티티의 테이블에 매핑**한다.

임베디드 타입 덕분에 객체와 테이블을 아주 세밀하게(fine-grained) 매핑하는 것이 가능하다. 잘 설계한 ORM 애플리케이션은 매핑한 테이블의 수보다 클래스의 수가 더 많다. 

### ➰ 임베디드 타입과 연관관계
임베디드 타입은 값 타입을 포함하거나 엔티티를 참조할 수 있다. 아래 예제로 포함 및 참조 관계를 확인할 수 있다.

> 엔티티는 공유될 수 있으므로 참조한다고 표현하고, 값 타입은 특정 주인에 소속되고 논리적인 개념상 공유되지 않으므로 포함한다고 표현한다.

```java
@Entity
public class Member {

  @Embedded Address address; // 임베디드 타입 포함
  @Embedded PhoneNumber phoneNumber; // 임베디드 타입 포함
  ...

}

@Embeddable
public class Address {
  String street;
  String city;
  String state; 
  @Embedded Zipcode zipcode; // 임베디드 타입 포함
}

@Embeddable
public class Zipcode {
  String zip;
  String plusFour;
}

@Embeddable
public class PhoneNumber {
  String areaCode;
  String localNumber;
  @ManyToOne PhoneServiceProvider provider; // 엔티티 참조
  ...

}

@Entity
public class PhoneServiceProvider {
  @Id String name;
  ...

}
```

### ➰ `@AttributeOverride`: 속성 재정의
임베디드 타입에 정의한 매핑정보를 재정의하려면 엔티티에 `@AttributeOverride` 를 사용하면 된다. 예를 들어 회원에게 주소가 하나 더 필요한 경우는 어떻게 해야 할까?

```java
@Entity
public class Member {

  @Id @GeneratedValue
  private Long id;
  private String name;

  @Embedded Address homeAddress;
  @Embedded Address companyAddress;

}
```
- 집 주소에 회사 주소를 하나 더 추가했다. 이렇게 되면, 테이블에 매핑하는 컬럼명이 중복되는 문제가 발생한다. (`city` , `street` , `zipcode` 가 2개씩 생성)
- 이때 매핑정보 재정의가 필요하다.

```java
@Entity
public class Member {

  @Id @GeneratedValue
  private Long id;
  private String name;

  @Embedded Address homeAddress;

  @Embedded 
  @AttributeOverrides({
    @AttributeOverride(name = "city", column = @Column(name = "COMPANY_CITY")),
    @AttrubuteOverride(name = "street", column = @Column(name = "COMPANY_STREET")),
    @AttrubuteOverride(name = "zipcode", column = @Column(name = "COMPANY_ZIPCODE"))
  })
  Address companyAddress;

}
```
- 테이블 매핑 시 `@Column` 의 `name` 속성에 지정한 값으로 매핑된다.

### ➰ 임베디드 타입과 `null`
임베디드 타입이 `null` 이면 매핑한 컬럼 값은 모두 `null` 이 된다.

```java
member.setAddress(null);
em.persist(member);
```
- 회원 테이블의 주소와 관련된 `CITY` , `STREET` , `ZIPCODE` 컬럼 값은 모두 `null` 이 된다.

---

## 💫 값 타입과 불변 객체
값 타입은 단순하고 안전하게 다룰 수 있어야 한다.

### ➰ 값 타입 공유 참조
임베디드 타입 같은 값 타입을 여러 엔티티에서 공유하면 위험하다. 어떤 문제가 있는지 살펴본다.

```java
member1.setHomeAddress(new Address("OldCity"));
Address address = member1.getHomeAddress();

address.setCity("NewCity"); // 회원1의 address 값을 공유해서 사용
member2.setHomeAddress(address);
```
- 회원2에 새로운 주소를 할당하려고 회원1의 주소를 그대로 참조해서 사용한다.
  - 실행하면, 회원2의 주소만 "NewCity"로 변경되지 않고, 회원1의 주소도 함께 변경된다.
  - 이는 **같은 `address` 인스턴스를 참조하기 때문**이다.
  - 영속성 컨텍스트는 회원1, 2 모두 `city` 속성이 변경된 것으로 판단해 각각에 대한 UPDATE SQL을 실행한다.
- 이러한 부작용(side effect)을 막기 위해서는 **값을 복사해서 사용하는 방식**을 취해야 한다.

### ➰ 값 타입 복사
값 타입의 실제 인스턴스인 값을 공유하는 것은 위험하다. 대신 값(인스턴스)을 복사해서 사용해야 한다.

```java
member1.setHomeAddress(new Address("OldCity"));
Address address = member1.getHomeAddress();

// 회원1의 address 값을 복사해서 새로운 newAddress 값을 생성
Address newAddress = address.clone();

newAddress.setCity("NewCity");
member2.setHomeAddress(newAddress);
```
- 회원2에 새로운 주소 할당을 위해 회원1의 `address` 값을 복사한다. 이때 `clone()` 메소드를 사용한다.
  - 이 메소드는 자신을 복사해서 반환하도록 구현했다.
  - 영속성 컨텍스트는 회원2의 주소만 변경된 것으로 판단해 회원2에 대한 UPDATE SQL을 실행한다.

항상 값을 복사해서 사용하면 공유 참조로 인한 부작용을 피할 수 있다. 
- 문제는 임베디드 타입처럼 직접 정의한 값 타입은 **자바의 기본 타입이 아니라 객체 타입이라는 것**이다.
- 자바는 기본 타입에 값을 대입하면 **값을 복사해서 전달**한다.

```java
Address a = new Address("Old");
Address b = a; // 객체 타입은 항상 참조 값을 전달!
b.setCity("New");
```
- `Address b = a` 에서 **`a` 가 참조하는 인스턴스의 참조 값을 `b` 에 넘겨준다**. 따라서 같은 인스턴스를 공유 참조하게 된다.
- 따라서 `b.city` 만 변경하려는 코드가 공유 참조의 부작용으로 인해 `a.city` 값도 변경시킨다.

물론 객체 대입마다 인스턴스를 복사, 대입하는 방법을 취하면 공유 참조를 피할 수는 있지만 문제는 **복사하지 않고 원본의 참조 값을 직접 넘기는 것을 막을 방법이 없다**는 것이다.
- 자바 기본 타입이면 값을 복사해서 넘기고, 객체면 참조를 넘긴다.

**객체의 공유 참조는 피할 수 없다.**
- 근본적이고 가장 단순한 방법은 객체의 값을 수정하지 못하게 막으면 된다.
- 예를 들어 **`setter` 를 모두 제거**한다.

### ➰ 불변 객체
값 타입은 부작용 걱정 없이 사용할 수 있어야 한다. 객체를 불변하게 만들면, **값을 절대 수정할 수 없어 부작용을 원천 차단**할 수 있다.
- 따라서 **값 타입은 가능한 한 불변 객체(immutable Obejct)로 설계**해야 한다.

불변 객체의 값은 조회할 수는 있지만 수정할 수는 없다. 불변 객체도 결국은 객체이기에, **인스턴스의 참조 값 공유를 피할 수 없다.**
- 하지만 참조 값을 공유한다한들, 수정이 불가능하므로 부작용은 발생하지 않는다.

불변 객체를 구현하는 가장 간단한 방법은 생성자로만 값을 설정하고, 수정자(`setter`)를 만들지 않으면 된다.
- 따라서 값을 수정해야 하는 경우는 **새로운 객체를 생성해서 사용**해야 한다.

> **불변이라는 작은 제약으로 부작용이라는 큰 재앙을 막을 수 있다.**

--- 

## 💫 값 타입의 비교
자바가 제공하는 객체 비교는 2가지다.
- **동일성(identity) 비교**: 인스턴스의 참조 값을 비교, == 사용
- **동등성(equivalence) 비교**: 인스턴스의 값을 비교, `equals()` 사용

```java
int a = 10;
int b = 10;

Address a = new Address("서울시", "종로구", "1번지");
Address b = new Address("서울시", "종로구", "1번지");
```

`Address` 값 타입을 **동일성 비교**
- 둘은 서로 다른 인스턴스이므로 결과는 거짓
- 하지만 값 타입은 비록 인스턴스가 달라도 그 안에 값이 같으면 같은 것으로 봐야 한다.
- 따라서 값 타입 비교 시에는 `a.equals(b)` 로 **동등성 비교**를 해야 한다.
  - 물론 `Address` 의 `equals()` 메소드를 재정의해야 한다. 보통 모든 필드의 값을 비교하도록 구현한다.

> 자바에서 `equals()` 를 재정의하면 `hashCode()` 도 함께 재정의하는 것이 안전하다. 그렇지 않으면 해시를 사용하는 컬렉션이 정상 동작하지 않는다.

---

## 💫 값 타입 컬렉션
하나 이상의 값 타입을 저장할 때 사용하는 타입이다.

```java
@Entity
public class Member {

  @Id @GeneratedValue
  private Long id;

  @Embedded
  private Address homeAddress;

  @ElementCollection
  @CollectionTable(name = "FAVORITE_FOODS",
      joinColumns = @JoinColumn(name = "MEMBER_ID"))
  @Column(name = "FOOD_NAME")
  private Set<String> favoriteFoods = new HashSet<>();

  @ElementCollection
  @CollectionTable(name = "ADDRESS",
      joinColumns = @JoinColumn(name = "MEMBER_ID"))
  @Column(name = "FOOD_NAME")
  private List<Address> addressHistory = new ArrayList<>();
  ...

}

@Embeddable
public class Address {

  @Column
  private String city;
  private String street;
  private String zipcode;
  ...

}
```
- 값 타입 컬렉션을 사용하는 `favoriteFoods` , `addressHistory` 에 `@ElementCollection` 을 지정했다. 
- `favoriteFoods` 는 기본값 타입인 `String` 을 컬렉션으로 가진다.
  - 이를 데이터베이스 테이블로 매핑해야 하는데, **관계형 데이터베이스의 테이블은 컬럼 안에 컬렉션을 포함할 수 없다.**
  - 따라서 별도의 테이블을 추가하고, `@CollectionTable` 을 사용해 추가한 테이블을 매핑해야 한다.
  - 그리고 `favoriteFoods` 처럼 값으로 사용되는 컬럼이 하나면 `@Column` 을 사용해 컬럼명을 지정할 수 있다.
- `addressHistory` 는 임베디드 타입인 `Address` 를 컬렉션으로 가진다. 
  - 마찬가지로 별도의 테이블을 사용하고, 테이블 매핑정보는 `@AttributeOverride` 를 사용해서 재정의 가능하다.

> `@CollectionTable` 을 생략하면, 기본값을 사용해서 매핑한다. <br/>
> 기본값 : {엔티티이름}_{컬렉션 속성 이름}

### ➰ 값 타입 컬렉션 사용
```java
Member member = new Member();

// 임베디드 값 타입
member.setHomeAddress(new Address("통영", "몽돌해수욕장", "660-123"));

// 기본값 타입 컬렉션
member.getFavoriteFoods().add("짬뽕");
member.getFavoriteFoods().add("짜장");
member.getFavoriteFoods().add("탕수육");

// 임베디드 값 타입 컬렉션
member.getAddressHistory().add(new Address("서울", "강남", "123-123"));
member.getAddressHistory().add(new Address("서울", "강북", "000-000"));

em.persist(member);
```
- 마지막에 `member` 엔티티만 영속화했다.
  - JPA는 이때 **`member` 엔티티의 값 타입도 함께 저장**한다. 실제 실행되는 INSERT SQL은 총 6번이다.
    - `member` 1번, `mebmer.homeAddress` (회원 테이블을 저장하는 SQL에 포함) , `member.favoriteFoods` 3번, `member.addressHistory` 2번

> 값 타입 컬렉션은 영속성 전이(CASCADE) + 고아 객체 제거(ORPHAN REMOVE) 기능을 필수로 가진다.

값 타입 컬렉션도 조회할 때 페치 전략을 선택할 수 있는데, `LAZY` 가 기본이다. (이전 장에서 언급, 너무 많은 데이터 로딩)
- 지연 로딩으로 모두 설정했다는 가정 하에 아래 코드의 실행 결과를 확인한다.

값 타입 컬렉션의 조회 과정이다.
```java
Member member = em.find(Member.class, 1L);

Address homeAddress = member.getHomeAddress();

Set<String> favoriteFoods = member.getFavoriteFoods();

for (String favoriteFood : favoriteFoods) {
  System.out.println("favoriteFood = " + favoriteFood);
}

List<Address> addressHistory = member.getAddressHistory();

addressHistory.get(0);
```
1. `member` : 회원만 조회한다. 이때 임베디드 값 타입인 `homeAddress` 도 함께 조회한다. SELECT SQL을 1번 호출한다.
2. `member.homeAddress` : 1번에서 이미 조회되었다.
3. `member.favoriteFoods` : `LAZY` 로 설정해서 실제 컬렉션 사용 시에 SELECT SQL을 1번 호출한다.
4. `member.addressHistory` : `LAZY` 로 설정해서 실제 컬렉션 사용 시에 SELECT SQL을 1번 호출한다.

값 타입 컬렉션의 수정과정이다.
```java
Member member = em.find(Member.class, 1L);

member.setHomeAddress(new Address("새로운도시", "신도시1", "123456"));

Set<String> favoriteFoods = member.getFavoriteFoods();
favoriteFoods.remove("탕수육");
favoriteFoods.add("치킨");

List<Address> addressHistory = member.getAddressHistory();
addressHistory.remove(new Address("서울", "기존 주소", "123-123"));
addressHistory.add(new Address("새로운도시", "새로운 주소", "123-456"));
```
1. 임베디드 값 타입 수정 : `homeAddress` 임베디드 값 타입은 `MEMBER` 테이블과 매핑했으므로 테이블만 UPDATE한다. 사실 엔티티를 수정하는 것과 같다.
2. 기본값 타입 컬렉션 수정 : 자바의 `String` 타입은 수정할 수 없다. 따라서 기존의 값을 삭제하고 새로운 값을 추가한다.
3. 임베디드 값 타입 컬렉션 수정 : 값 타입은 불변해야 한다. 따라서 컬렉션에서 기존 주소를 삭제하고 새로운 주소를 등록했다. (값 타입은 `equals()` , `hashCode()` 구현 필수)

### ➰ 값 타입 컬렉션의 제약사항
엔티티와 달리 값 타입은 식별자가 없어 값을 변경해버리면 데이터베이스에서 저장된 원본 데이터를 찾기가 어렵다. 특정 엔티티 하나에 소속된 값 타입은 값이 변경되어도 자신이 소속된 엔티티를 데이터베이스에서 찾고 값을 변경하면 된다.
- 문제는 값 타입 컬렉션이다. **별도의 테이블에 보관**되어 원본 데이터를 찾기 어렵다.

이런 문제로 인해 JPA 구현체들은 값 타입 컬렉션에 변경이 발생하면, **값 타입 컬렉션이 매핑된 테이블의 연관된 모든 데이터를 삭제**하고, **현재 값 타입 컬렉션 객체에 있는 모든 값을 데이터베이스에 다시 저장**한다.

따라서 실무에서는 값 타입 컬렉션이 매핑된 테이블에 데이터가 많다면 값 타입 컬렉션 대신에 **일대다 관계를 고려**해야 한다! (SQL을 너무 많이 실행)
- 추가로, 영속성 전이 + 고아 객체 제거 기능을 적용해 값 타입 컬렉션처럼 사용한다.

또다른 제약사항으로는, 값 타입 컬렉션을 매핑하는 테이블은 모든 컬럼을 묶어서 기본 키를 구성해야 한다.
- 따라서 데이터베이스 기본 키 제약 조건으로 인해 컬럼에 `null` 을 입력할 수 없고, 같은 값을 중복해서 저장할 수 없다는 제약도 따라붙는다.

## 📕 출처
**자바 ORM 표준 JPA 프로그래밍** - 김영한
---
title: "📚 12. 스프링 데이터 JPA"
description: "JPA 책 정리"
date: 2022-04-01
update: 2022-04-01
tags:
  - Java
  - JPA
  - SpringBoot
series: "📚 ORM 표준 JPA"
---

<em>[자바 ORM 표준 JPA 프로그래밍 - 김영한]을 읽고 인용하고 정리하는 POST입니다.</em>

> 두 레포지토리가 비슷한 기능을 한다면, 제네릭과 상속을 적절히 사용해 공통 부분을 처리하는 부모 클래스를 만들 수 있다.
> - 이를 보통 `GenenricDAO` 라 한다.
> - 하지만 이 방법은 공통 기능을 구현한 부모 클래스에 너무 종속되고 구현 클래스 상속이 가지는 단점에 노출된다.

## 💫 스프링 데이터 JPA 소개
스프링 프레임워크에서 JPA를 편하게 사용할 수 있도록 지원하는 프로젝트다. 
- CRUD를 처리하기 위한 공통 인터페이스(`org.springframework.data.jpa.repository.JpaRepository`)를 제공한다.
  - 레포지토리 개발 시 인터페이스만 작성하면 실행 시점에 스프링 데이터 JPA가 구현 객체를 동적으로 생성해 주입해준다.

> 데이터 접근 계층을 개발할 때, **구현 클래스 없이 인터페이스만 작성해도 개발을 완료**할 수 있다.

일반적인 CRUD 메소드는 제공하기에 문제가 없지만, 직접 작성한 공통으로 처리할 수 없는 메소드의 경우는 스프링 데이터 JPA가 메소드 이름을 분석해 적절한 JPQL을 실행한다.

### ➰ 스프링 데이터 프로젝트
스프링 데이터 프로젝트는 JPA, 몽고 DB, NEO4J, REDIS, HADOOP, GEMFIRE 같은 다양한 데이터 저장소에 대한 접근을 추상화하여 개발자 편의를 제공하고, 지루하게 반복하는 데이터 접근 코드를 줄여준다.
- 여기서 스프링 데이터 JPA 프로젝트는 JPA에 특화된 기능을 제공한다.

---

## 💫 스프링 데이터 JPA 설정
**📌 필요 라이브러리**<br/>
- `spring-data-jpa`

**📌 환경설정**<br/>
스프링 설정에 `base-package` 를 명시하고, `EnableJpaRepositories` annotation의 `basePackages` 에 레포지토리를 검색할 패키지 위치를 적음으로써, 스프링 데이터 JPA는 애플리케이션 실행 시 `basePackages` 에 있는 레포지토리 인터페이스들을 찾아 해당 인터페이스를 구현한 클래스를 동적으로 생성한 다음 스프링 빈으로 등록한다.
- 따라서 직접 구현 클래스를 구현하지 않아도 되는 것이다.

---

## 💫 공통 인터페이스 기능
스프링 데이터 JPA를 사용하는 가장 단순한 방법은 `JpaRepository` 인터페이스를 상속받는 것이다.
- 그리고 제네릭에 엔티티 클래스와 엔티티 클래스가 사용하는 식별자 타입을 지정한다.

```java
public interface JpaRepository<T, ID extends Serializable> extends PagingAndSortingRepository<T, ID> {...}

public interface MemberRepository extends JpaRepository<Member, Long> {...}
```

**📌 JpaRepository 인터페이스의 계층구조**<br/>
스프링 데이터 모듈이 있고, 그 안에 `Repository` , `CrudRepository` , `PagingAndSortingRepository` 가 있다. 이들은 스프링 데이터 프로젝트가 공통으로 사용하는 인터페이스다.
- 스프링 데이터 JPA가 제공하는 `JpaRepository` 인터페이스는 여기에 추가로 JPA에 특화된 기능을 제공한다.

아래는 `JpaRepository` 인터페이스의 주요 메소드이다.
- `save(S)` , `delete(T)` , `findOne(ID)` , `getOne(ID)` , `findAll(...)` (T: 엔티티, ID: 엔티티의 식별자 타입, S: 엔티티와 그 자식 타입)
- `save(S)` 는 엔티티에 식별자 값이 없으면(`null`이면) 새로운 엔티티로 판단해서 `em.persist()` 를 호출하고, 식별자 값이 있으면 이미 있는 엔티티로 판단해 `em.merge()` 를 호출한다.

---

## 💫 쿼리 메소드 기능
메소드 이름만으로 쿼리를 생성하는 등 매우 편리한 기능이다. 스프링 데이터 JPA가 제공하는 쿼리 메소드 기능은 크게 아래 3가지가 있다.
- 메소드 이름으로 쿼리 생성
- 메소드 이름으로 JPA NamedQuery 호출
- `@Query` annotation을 사용해 레포지토리 인터페이스에 쿼리 직접 정의

### ➰ 메소드 이름으로 쿼리 생성
인터페이스에 정의한 `findByEmailAndName(...)` 메소드를 실행하면, 스프링 데이터 JPA는 메소드 이름을 분석해 JPQL을 생성하고 실행한다.
- 물론 이를 위해서는 정해진 규칙에 따라 메소드 이름을 지어야 한다. (스프링 데이터 JPA 공식 문서 참고)
- **엔티티의 필드명이 변경되면, 인터페이스에 정의한 메소드 이름도 함께 변경**해야 한다.

### ➰ JPA NamedQuery
JPA Named 쿼리는 이름 그대로 쿼리에 이름을 부여해 사용하는 방법인데, annotation이나 XML에 쿼리를 정의할 수 있다. 이전에 다룬 NamedQuery와 동일하다. 또한, Named 네이티브 쿼리도 지원한다.
- 스프링 데이터 JPA를 사용하면 메소드 이름만으로 Named 쿼리를 호출할 수 있다.
- 선언한 "도메인 클래스 + . + 메소드 이름" 으로 Named 쿼리를 찾아서 실행한다.
  - 만약 실행할 Named 쿼리가 없다면 메소드 이름으로 쿼리 생성 전략을 사용한다.

### ➰ @Query, 레포지토리 메소드에 쿼리 정의
`Query` annotation을 사용해 레포지토리 메소드에 직접 쿼리를 정의할 수 있다.
- 실행할 메소드에 정적 쿼리를 직접 작성하기에 이름없는 Named 쿼리라 할 수 있다.
- 또한 애플리케이션 실행 시점에 문법 오류를 발견할 수 있다는 장점이 있다.

```java
public interface MemberRepository extends JpaRepository<Member, Long> {

  @Query("select m from Member m where m.username = ?1")
  Member findByUsername(String username);

}
```

네이티브 SQL을 사용하려면 `@Query` annotation에 `nativeQuery = true` 를 설정한다.
- 참고로 스프링 데이터 JPA가 지원하는 파라미터 바인딩을 사용하면 **JPQL은 위치 기반 파라미터를 1부터 시작**하지만 **네이티브 SQL은 0부터 시작**한다.

### ➰ 파라미터 바인딩
위치 기반 파라미터 바인딩과 이름 기반 파라미터 바인딩을 지원한다. (기본 값은 위치 기반, 파라미터 순서로 바인딩)
- 이름 기반 파라미터 바인딩 사용을 위해서는 `Param` annotation을 사용한다. (ex. `@Param("name")`)

### ➰ 벌크성 수정 쿼리
`executeUpdate()` 메소드로 벌크 연산을 수행할 수 있다.

```java
@Modifying
@Query("update Product p set p.price = p.price * 1.1 where p.stockAmount < :stockAmount")
int bulkPriceUp(@Param("stockAmount") String stockAmount);
```
- 스프링 데이터 JPA에서 벌크성 수정, 삭제 쿼리는 `Modifying` annotation을 사용하면 된다.
- 벌크성 쿼리 실행 후 영속성 컨텍스트를 초기화하려면 `Modifying` annotation의 `clearAutomatically` 속성을 `true` 로 설정하면 된다. (기본 값 : `false`)

### ➰ 반환 타입
스프링 데이터 JPA는 유연한 반환 타입을 지원한다.
- **결과가 한 건 이상이면 컬렉션 인터페이스**
- **단건이면 반환 타입을 지정**

조회 결과가 없다면, 컬렉션은 빈 컬렉션, 단건은 `null` 을 반환한다.
- 단건을 기대하고 반환 타입을 지정했는데 2건 이상 조회되면 `NonUniqueResultException` 예외가 발생한다.

> 스프링 데이터 JPA는 단건 조회 시 JPQL의 `Query.getSingleResult()` 호출로 인해 발생할 수 있는 `NoResultException` 예외가 발생하게 되면, 이를 무시하고 `null` 을 반환한다.

### ➰ 페이징과 정렬
페이징과 정렬 기능을 위한 2가지 파라미터를 제공한다.
- `org.springframework.data.domain.Sort` : 정렬 기능
- `org.springframework.data.domain.Pageable` : 페이징 기능(내부에 Sort 포함)

파라미터에 `Pageable` 을 사용하면 반환 타입으로 `List` 나 `org.springframework.data.domain.Page` 를 사용할 수 있다.
- 반환 타입으로 `Page` 를 사용하면 스프링 데이터 JPA는 페이징 기능을 제공하기 위해 검색된 전체 데이터 건수를 조회하는 `count` 쿼리를 추가로 호출한다.

---

## 💫 명세
책 도메인 주도 설계(Domain Driven Design)는 명세(SPECIFICATION)라는 개념을 소개한다. 스프링 데이터 JPA는 JPA Criteria로 이 개념을 사용할 수 있도록 지원한다. 이를 이해하기 위한 핵심 단어는 술어(predicate)인데 이는 단순히 참이나 거짓으로 평가된다.
- 그리고 이는 AND, OR 같은 연산자로 조합할 수 있다.
- ex. 데이터를 검색하기 위한 제약 조건 하나하나를 술어라 할 수 있다.
- 이 술어를 스프링 데이터 JPA는 `org.springframework.data.jpa.domain.Specification` 클래스로 정의했다.

`Specification` 은 컴포지트 패턴(Composite pattern)으로 구성되어 있어 여러 `Specification` 을 조합할 수 있다.
- 레포지토리에서 `org.springframework.data.jpa.repository.JpaSpecificationExecutor` 인터페이스를 상속받아 명세 기능을 사용할 수 있다.
- 명세를 정의하려면, 상속받은 인터페이스를 구현하면 된다.
  - 명세 정의 시에는 `toPredicate(...)` 메소드만 구현하면 되는데, JPA Criteria의 `Root` , `CriteriaQuery` , `CriteriaBuilder` 클래스가 모두 파라미터로 주어진다.

---

## 💫 사용자 정의 레포지토리 구현
다양한 이유로, 상속받은 인터페이스에 대한 구현이 필요할 때가 있다. 그렇다고 해서 레포지토리를 직접 구현하면 공통 인터페이스가 제공하는 기능까지 구현해야 한다. 
- 스프링 데이터 JPA는 이런 문제를 우회해서 필요한 메소드만 구현할 수 있는 방법을 제공한다.

1. 직접 구현할 메소드를 위한 사용자 정의 인터페이스를 작성해야 한다.
2. 사용자 정의 인터페이스를 구현한 클래스를 작성해야 한다. 
    - 레포지토리 인터페이스 이름 + `Impl` 로 지어야 스프링 데이터 JPA가 사용자 정의 구현 클래스로 인식한다.
3. 레포지토리 인터페이스에서 사용자 정의 인터페이스를 상속받으면 된다. (레포지토리 인터페이스는 결과적으로 `JpaRepository` 와 사용자 정의 인터페이스를 상속받음)

---

## 💫 Web 확장
스프링 데이터 프로젝트는 스프링 MVC에서 사용할 수 있는 편리한 기능을 제공한다. 식별자로 도메인 클래스를 바로 바인딩해주는 도메인 클래스 컨버터 기능과 페이징, 정렬 기능에 대해 알아보자.

### ➰ 설정
`org.springframework.data.web.config.SpringDataWebConfiguration` 을 스프링 빈으로 등록하면 Web 확장 기능을 사용할 수 있다. 
- JavaConfig를 사용하면 `EnableSpringDataWebSupport` annotation을 `WebAppConfig.java` 에 사용하면 된다.

### ➰ 도메인 클래스 컨버터 기능
HTTP 파라미터로 넘어온 엔티티의 아이디로 엔티티 객체를 찾아서 바인딩해주는 기능이다. 
- 특정 회원을 수정하는 화면을 보여주려면 컨트롤러는 HTTP 요청으로 넘어온 회원의 아이디를 사용해 레포지토리를 통해 회원 엔티티를 먼저 조회해야 한다.
- 이후 찾아온 회원 엔티티를 `model` 을 사용해서 뷰에 넘겨준다.

```java
// 도메인 클래스 컨버터를 적용
@Controller
public class MemberController {

  @RequestMapping("member/memberUpdateForm")
  public String memberUpdateForm(@RequestParam("id") Member member, Model model) {
    model.addAttribute("member", member);
    return "member/memberSaveForm";
  }
}
```
- `@RequestParam("id") Member member` 를 보면 HTTP 요청으로 회원 아이디(`id`)를 받지만 도메인 클래스 컨버터가 중간에 동작해 아이디를 회원 엔티티 객체로 변환해서 넘겨준다.
  - 따라서 컨트롤러를 단순하게 사용할 수 있다.

> 도메인 클래스 컨버터는 해당 엔티티와 관련된 레포지토리를 사용해서 엔티티를 찾는다. 넘어온 엔티티를 컨트롤러에서 직접 수정해도 실제 데이터베이스에는 반영되지 않는다. 

### ➰ 페이징과 정렬 기능
스프링 MVC에서 페이징과 정렬 기능을 편리하게 사용하기 위해 `HandlerMethodArgumentResolver` 를 제공한다.
- 페이징 기능: `PageableHandlerMethodArgumentResolver`
- 정렬 기능: `SortHandlerMethodArgumentResolver`

파라미터로 `Pageable` 을 받고, 이는 다음 요청 파라미터 정보로 만들어진다.
- `page` : 현재 페이지, 0부터 시작
- `size` : 한 페이지에 노출할 데이터 건수
- `sort` : 정렬 조건 정의

**📌 접두사**<br/>
사용해야 할 페이징 정보가 둘 이상이면 접두사를 사용해 구분할 수 있다. 접두사는 스프링 프레임워크가 제공하는 `@Qualifier` annotation을 사용한다.

**📌 기본값**<br/>
`Pageable` 의 기본 값은 `page = 0` , `size = 20` 이다. 이를 변경하려면 `@PageableDefault` annotation을 사용한다.

---

## 💫 스프링 데이터 JPA가 사용하는 구현체
스프링 데이터가 JPA가 제공하는 공통 인터페이스는 `org.springframework.data.jpa.repository.support.SimpleJpaRepository` 클래스가 구현한다. 해당 클래스 코드의 일부를 분석해보면 다음과 같다.

- `@Repository` 적용 : JPA 예외를 스프링이 추상화한 예외로 변환한다.
- `@Transactional` 트랜잭션 적용 : **JPA의 모든 변경은 트랜잭션 안에서 이뤄져야 한다.** 스프링 데이터 JPA가 제공하는 공통 인터페이스를 사용하면 데이터를 변경(등록, 수정, 삭제)하는 메소드에 `@Transactional` 로 트랜잭션 처리가 되어 있다.
  - 따라서 서비스 계층에서 트랜잭션을 시작하지 않으면 레포지토리에서 트랜잭션을 시작한다. 서비스 계층에서 시작했다면 레포지토리도 이를 받아 사용한다.
- `@Transactional(readOnly=true)` : 데이터를 조회하는 메소드에는 해당 옵션이 적용되어 있다. 데이터를 변경하지 않는 트랜잭션에서 해당 옵션을 사용하면 플러시를 생략할 수 있어 약간의 성능 향상을 얻을 수 있다.
- `save()` 메소드 : 저장할 엔티티가 새로운 엔티티면 저장(`persist`)하고, 이미 있는 엔티티면 병합(`merge`)한다.

> 새로운 엔티티를 판단하는 기본 전략은 엔티티의 식별자를 사용한다. 식별자가 객체일 때 `null` , 자바 기본 타입일 때 숫자 0값이면 새로운 엔티티로 판단한다.

---

## 💫 JPA 샵에 적용
### ➰ 환경 설정
`pom.xml` 에 `spring-data-jpa` 라이브러리를 추가한다. 그리고 `appConfig.xml` 에 `<jpa:repositories>` 를 추가하고, `base-package` 속성에 레포지토리 위치를 지정한다.

### ➰ 레포지토리 리팩토링
**📌 회원 레포지토리 리팩토링**
- 클래스를 인터페이스로 변경하고, 스프링 데이터 JPA가 제공하는 `JpaRepository` 를 상속받는다. 
  - 이때 제네릭 타입을 `<Member, Long>` 으로 지정해 회원 레포지토리가 관리하는 회원 엔티티 타입의 식별자 타입을 정의한다.
- 상속받은 `JpaRepository` 가 모두 제공하는 기본 메소드들을 제거한다. 남은 `findByName()` 메소드는 스프링 데이터 JPA가 해당 메소드의 이름을 분석해 적절한 쿼리를 실행해 줄 것이다.

**📌 상품 레포지토리 리팩토링**
- 모든 기능은 스프링 데이터 JPA가 제공하는 공통 인터페이스로 충분해 메소드를 모두 제거한다.

**📌 주문 레포지토리 리팩토링**
- "검색"이라는 복잡한 로직이 있다. 명세 기능을 사용해 검색을 구현해보도록 한다.
  - 공통 인터페이스로 가능한 메소드들은 모두 제거하고, `JpaSpecificationExecutor` 를 추가로 상속받는다.

### ➰ 명세 적용
명세를 작성하기 위한 클래스를 추가한다. 

```java
public static Specification<Order> memberNameLike(final String memberName) {
  return new Specificaiton<Order>() {
    public Predicate toPredicate(Root<Order> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
      if (StringUtils.isEmpty(memberName)) return null;

      Join<Order, Member> m = root.join("member", JoinType.INNER);
      return builder.like(m.<String>get("name"), "%" + memberName + "%");
    }
  };
}

public static Specification<Order> orderStatusEq(final OrderStatus orderStatus) {
  return new Specification<Order>() {
    public Predicate toPredicate(Root<Order> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
      if (orderStatus == null) return null;

      return builder.equal(root.get("status"), orderStatus);
    }
  };
}
```
- 검색조건을 가지고 있는 `OrderSearch` 객체에 자신이 가진 검색조건으로 `Specification` 을 생성하도록 코드를 추가한다.
- 그리고, 레포지토리의 검색 코드가 명세를 파라미터로 넘기도록 변경한다.

---

## 💫 스프링 데이터 JPA와 QueryDSL 통합
스프링 데이터 JPA는 2가지 방법으로 QueryDSL을 지원한다.
- `org.springframework.data.querydsl.QueryDslPredicateExecutor`
- `org.springframework.data.querydsl.QueryDslRepositorySupport`

### ➰ QueryDslPredicateExecutor 사용
첫 번째 방법은 레포지토리에서 `QueryDslPredicateExecutor` 를 상속받으면 된다.

```java
public interface ItemRepository extends JpaRepository<Item, Long>, QueryDslPredicateExecutor<Item> {}
```
- QueryDSL을 검색조건으로 사용하면서 스프링 데이터 JPA가 제공하는 페이징과 정렬 기능도 함께 사용할 수 있다.
- 다만, `join` , `fetch` 를 사용할 수 없다는 한계가 있다.
  - 따라서 QueryDSL이 제공하는 다양한 기능을 사용하려면 `JPAQuery` 를 직접 사용하거나 스프링 데이터 JPA가 제공하는 `QueryDslRepositorySupport` 를 사용해야 한다.

### ➰ QueryDslRepositorySupport 사용
QueryDSL의 모든 기능을 사용하려면 `JPAQuery` 객체를 직접 생성해서 사용해야 한다.
- 이때 스프링 데이터 JPA가 제공하는 `QueryDslRepositorySupport` 를 상속받아 사용할 수 있다.

스프링 데이터 JPA가 제공하는 공통 인터페이스는 직접 구현할 수 없기 때문에 사용자 정의 레포지토리를 만들어야 한다.
- `QueryDslRepositorySupport` 를 사용해 QueryDSL로 검색 조건에 따라 동적으로 쿼리를 생성한다.
  - 참고로 생성자에서 `QueryDslRepositorySupport` 에 엔티티 클래스 정보를 넘겨줘야 한다.

## 📕 출처
**자바 ORM 표준 JPA 프로그래밍** - 김영한
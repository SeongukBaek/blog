---
title: "📚 11. 웹 애플리케이션 제작"
description: "JPA 책 정리"
date: 2022-03-31
update: 2022-03-31
tags:
  - Java
  - JPA
  - SpringBoot
series: "📚 ORM 표준 JPA"
---

<em>[자바 ORM 표준 JPA 프로그래밍 - 김영한]을 읽고 인용하고 정리하는 POST입니다.</em>

> 스프링 프레임워크
> - 스프링 프레임워크와 JPA를 함께 사용한다는 것은 스프링 컨테이너 위에서 JPA를 사용한다는 의미다. 
> - 따라서 스프링 컨테이너가 제공하는 데이터베이스 커넥션과 트랜잭션 처리 기능을 사용할 수 있다.

## 💫 프로젝트 환경설정
**📌 프로젝트 환경설정 진행 순서**<br/>
1. 프로젝트 구조 분석
2. 메이븐과 라이브러리 설정
3. 스프링 프레임워크 설정

웹 애플리케이션을 구현하기 위해 웹 서버를 실행해야 하는데 **메이븐의 톰캣 플러그인**을 사용한다.

### ➰ 프로젝트 구조
```java
jpashop (프로젝트 루트)
- src (소스 폴더)
  - main (실행 코드)
    - java (자바 소스 코드)
    - resources (리소스)
    - webapp (웹 폴더)
  - test (테스트 코드)
- target (빌드 결과)
- pom.xml (메이븐 설정 파일)
```

### ➰ 메이븐과 사용 라이브러리 관리
`pom.xml` 에서 프로젝트 정보와 사용할 라이브러리를 지정 및 관리할 수 있다.
- `<modelVersion>` : POM 모델 버전, 그대로 사용한다.
- `<groupId>` : 프로젝트 그룹 명
- `<artifactId>` : 프로젝트를 식별하는 아이디
- `<version>` : 프로젝트 버전
- `<name>` : 프로젝트 이름
- `<packaging>` : 빌드 패키징 방법을 지정한다. 웹 애플리케이션은 `war` , 자바 라이브러리는 `jar` 로 설정한다.
- `<dependencies>` : 사용할 라이브러리를 지정한다.
- `<build>` : 빌드 관련 정보를 설정한다.

수많은 라이브러리들이 있고, 이들 간 충돌을 피하기 위해 `groupId` + `artifactId` 는 유일해야 한다.

`<dependencies>` 에는 사용할 라이브러리를지정한다. 명시한 라이브러리는 메이븐 공식 저장소에서 자동으로 내려받아 라이브러리에 추가된다.
- 핵심 라이브러리
  - 스프링 MVC : 스프링 MVC 라이브러리
  - 스프링 ORM : 스프링 프레임워크와 JPA를 연동하기 위한 라이브러리
  - JPA, Hibernate : JPA 표준과 Hibernate를 포함하는 라이브러리, hibernate-entitymanager를 라이브러리로 지정하면 다음 중요 라이브러리도 함께 내려받는다.
    - `hibernate-core` , `hibernate-jpa-2.1-api`
- 기타 라이브러리
  - H2 데이터베이스 : 아주 작은 데이터베이스다. 별도의 설치 없이 JVM 메모리 안에서 동작하는 기능도 있다.
  - 커넥션 풀 : `tomcat-jdbc` 커넥션 풀을 사용한다.
  - WEB : 서블릿, JSP와 관련된 라이브러리
  - 로깅 SLF4J & LogBack : 로그와 관련된 라이브러리
  - 테스트 : 테스트용 라이브러리, `spring-test` 는 스프링 프레임워크와 통합 테스트를 지원한다.

> **메이븐 `<dependency>` 의 `<scope>` 설정**
> - compile(default) : 컴파일 시 라이브러리를 사용한다.
> - runtime : 실행 시 라이브러리를 사용한다.
> - provided : 외부에서 라이브러리가 제공된다. 컴파일 시 사용하지만 빌드에 포함하지 않는다. 보통 JSP, 서블릿 라이브러리들에 사용한다.
> - test : 테스트 코드에만 사용한다.

> **의존성 전이(Transitive dependency)**
> - spring-mvc 라이브러리를 사용하려면 spring-core 라이브러리가 필요하다. 이를 "spring-mvc는 spring-core에 의존한다"고 표현한다. 
> - 메이븐은 의존관계가 있는 라이브러리도 함께 내려받아 라이브러리에 자동으로 추가하는데, 이를 의존성 전이라고 한다.

### ➰ 스프링 프레임워크 설정
```java
jpashop (프로젝트 루트)
- src (소스 폴더)
  - main (실행 코드)
    - java (자바 소스 코드)
      - jpabook
        - jpashop
          - domain
          - repository
          - service
          - web
    - resources (리소스)
      - appConfig.xml (스프링 애플리케이션 관련 설정 파일)
      - webAppConfig.xml (스프링 웹 관련 설정 파일)
    - webapp (웹 폴더)
      - WEB-INF
        - web.xml (웹 애플리케이션 환경설정 파일)
```
- `web.xml` : 웹 애플리케이션 환경설정 파일, 웹 애플리케이션에서 스프링 프레임워크를 구동하기 위한 설정이 대부분이다.
  - `appConfig.xml` 을 설정하는 부분과 `webAppConfig.xml` 을 설정하는 부분으로 나뉘고, 스프링 프레임워크를 설정할 때 보통 웹 계층과 비즈니스 도메인 계층을 나누어 관리한다.
  - `webAppConfig.xml` : 스프링 MVC 설정을 포함해 웹 계층을 담당
  - `appConfig.xml` : 비즈니스 로직, 도메인 계층, 서비스 계층, 데이터 저장 계층을 담당
- `webAppConfig.xml` : 스프링 웹 관련 환경설정 파일
  - `<mvc:annotation-driven>` : 스프링 MVC 기능을 활성화
  - `<context:component-scan>` : `basePackages` 를 포함한 하위 패키지를 검색해 `@Component` , `@Service` , `@Repository` , `@Controller` annotation이 있는 클래스들을 스프링 빈으로 자동 등록
  - `<bean>` : 스프링 빈을 등록
- `appConfig.xml` : 스프링 애플리케이션 관련 환경설정 파일
  - `<tx:annotation-driven/>` : 스프링 프레임워크가 제공하는 annotation 기반의 트랜잭션 관리자를 활성화, `@Transactional` 이 붙은 곳에 트랜잭션을 적용
  - H2 데이터베이스 접속 URL을 `jdbc:h2:mem:...` 으로 설정해 JVM 안에서 동작하는 **인 메모리 데이터베이스**로 사용하도록 설정 (별도의 데이터베이스 서버의 실행을 요구하지 않는 모드, 애플리케이션의 생명주기에 종속적)
  - JPA를 사용하기 위해 `org.springframework.orm.jpa.JpaTransactionManager` 를 트랜잭션 관리자로 등록
  - `@Repository` annotation이 붙어 있는 스프링 빈에 예외 변환 AOP를 적용하기 위해 `PersistenceExceptionTranslationPostProcessor` 를 설정(이 AOP는 JPA 예외를 스프링 프레임워크가 추상화한 예외로 변환)
  - JPA를 사용하려면 또한 스프링 프레임워크가 제공하는 `LocalContainerEntityManagerFactoryBean` 을 스프링 빈으로 등록
    - `LocalContainerEntityManagerFactoryBean` : JPA를 스프링 컨테이너에서 사용할 수 있도록 스프링 프레임워크가 제공하는 기능 (`spring-orm` 라이브러리가 제공)
    - `dataSource` : 사용할 데이터소스를 등록
    - `packageToScan` : `@Entity` 가 붙은 클래스를 자동으로 검색하기 위한 시작점 지정
    - `persistenceUnitName` : 영속성 유닛 이름을 지정 (설정하지 않으면 `default` 이름으로 영속성 유닛 생성)
    - `jpaVendorAdapter` : 사용할 JPA 벤더를 지정

**📌 Hibernate 속성 설정**<br/>
`jpaProperties` 를 이용해 Hibernate의 구현체 속성을 설정할 수 있다.
- `hibernate.dialect` : 사용할 데이터베이스 방언 설정
- `hibernate.show_sql` : 실행하는 SQL을 콘솔에 출력
- `hibernate.format_sql` : SQL을 보기 좋게 정리해서 출력
- `hibernate.use_sql_comments` : SQL을 출력할 때 어떻게 실행된 것인지 또는 사용자가 설정한 코멘트를 남김
- `hibernate.id.new_generator_mappings` : JPA에 맞춘 새로운 ID 생성 방법을 사용, Hibernate 레거시를 운영하는 것이 아니면 항상 `true` 설정
- `hibernate.hbm2ddl.auto` : 애플리케이션이 시작될 때 테이블과 기타 DDL을 자동으로 생성
  - `create` : 기존 제거, 새로 생성
  - `create-drop` : `create` 와 동일하지만 애플리케이션 종료 시 생성한 DDL 제거
  - `update` : 현재 데이터베이스 DDL과 비교해 변경사항만 수정
  - `validate` : 현재 엔티티 매핑 정보와 데이터베이스 스키마가 같은지 비교, 다르면 경고를 남기고 애플리케이션을 실행하지 않음. (DDL은 변경하지 않는 옵션)

---

## 💫 도메인 모델과 테이블 설계
### ➰ 요구사항 분석

### ➰ 도메인 모델 설계

### ➰ 테이블 설계

### ➰ 연관관계 정리

### ➰ 엔티티 클래스

---

## 💫 애플리케이션 구현

### ➰ 개발 방법

### ➰ 회원 기능

### ➰ 상품 기능

### ➰ 주문 기능

### ➰ 웹 계층 구현

## 📕 출처
**자바 ORM 표준 JPA 프로그래밍** - 김영한
---
title: "📚 1. JPA 소개"
description: "JPA 책 정리"
date: 2022-03-04
update: 2022-03-04
tags:
  - Java
  - JPA
  - SpringBoot
series: "📚 ORM 표준 JPA"
---

<em>[자바 ORM 표준 JPA 프로그래밍 - 김영한]을 읽고 인용하고 정리하는 POST입니다.</em>

## 💫 SQL을 직접 다룰 때 발생하는 문제점
"관계형 데이터베이스는 가장 대중적이고 신뢰할 만한 안전한 데이터 저장소이다."

자바로 작성한 애플리케이션은 JDBC API를 사용해서 SQL을 DB에 전달해야 한다. SQL을 이용해 DB로부터 결과를 반환받아 애플리케이션에서 알맞게 사용한다.

### ➰ 반복, 반복 그리고 반복
SQL을 직접 다룰 때의 문제점을 알아봐야 한다. 이를 위해 자바와 관계형 DB를 사용한 회원 관리 기능을 개발해본다.

먼저, 사용할 회원(`Member`) 객체이다.

```java
public class Member {
    private String memberId;
    private String name;
    ...

}
```

회원 객체를 DB에 관리하기 위한 회원용 DAO(Data Access Object)를 만든다.

```java
public class MemberDAO {
    public Member find(String memberId) {
        ...
    }
}
```

이제 위 메소드를 이용해 회원 조회 기능을 개발하는데, 일반적인 순서는 다음과 같다.
1. 회원 조회용 SQL을 작성한다.
   - `SELECT MEMBER_ID, NAME FROM MEMBER M WHERE MEMBER_ID = ?`

2. JDBC API를 사용해서 SQL을 실행한다.
   - `ResultSet rs = stmt.executeQuery(sql);`

3. DB로부터 반환받은 조회 결과를 `Member` 객체로 매핑한다.

```java
String memberId = rs.getString("MEMBER_ID");
String name = rs.getString("NAME");

Member member = new Member();
member.setMemberId(memberId);
member.setName(name);
```

회원 조회는 완성했고, 회원 등록 기능은 다음과 같이 구현할 수 있다.

```java
public class MemberDAO {
    public Member find(String memberId) {
        ...
    }

    public void save(Member member) {
        ...
    }
}
```

1. 회원 등록용 SQL을 작성한다.
   - `String sql = "INSERT INTO MEMBER(MEMBER_ID, NAME) VALUES(?, ?)";`

2. 회원 객체의 값을 꺼내 등록 SQL에 전달한다. 

```java
pstmt.setString(1, member.getMemberId());
pstmt.setString(2, member.getName());
```

3. JDBC API를 사용해서 SQL을 실행한다.
   - `pstmt.executeUpdate(sql);`

다음으로 필요한 기능은 회원 정보를 수정하고 삭제하는 기능일 것이다. 이또한 **SQL을 작성하고 JDBC API를 사용해 이를 실행하는 방식**으로 동일할 것이다.

> 회원 객체를 DB가 아닌 **자바 컬렉션에 보관**한다면 어떻게 될까?
> - 컬렉션은 `list.add(member);` 한 줄로 객체를 저장할 수 있다.

DB는 객체 구조와는 다른 **데이터 중심의 구조**를 가져 객체를 DB에 직접 저장하거나 조회할 수 없다.
- 따라서, 개발자가 객체지향 애플리케이션과 DB 중간에서 SQL과 JDBC API를 사용해 **직접 변환**해줘야 한다.
- 여기서 **문제**가 발생한다.
  - 이러한 CRUD를 위한 코드 작성은 매우 반복적이고, 귀찮은 작업이다.

### ➰ SQL에 의존적인 개발
"회원의 연락처를 함께 저장해달라"는 새로운 요구사항이 추가된다면 위에서 구현한 회원 객체, INSERT SQL, 회원 조회 코드, 회원 정보 수정 코드가 모두 수정되어야 한다.

#### 등록 코드 변경
회원의 연락처를 추가하기 위해 회원 객체에 `tel` field를 추가한다.

```java
public class Member {
    private String memberId;
    private String name;
    private String tel;
    ...

}
```

그리고 DB에 전달할 회원 등록 SQL 또한 연락처도 함께 등록할 수 있도록 수정하고, JDBC API도 이에 맞게 수정한다.

```java
String sql = "INSERT INTO MEMBER(MEMBER_ID, NAME, TEL) VALUES(?, ?, ?)";

...

pstmt.setString(3, member.getTel());
```

#### 조회 코드 변경
회원 조회 시 연락처 필드 또한 조회 결과로 얻을 수 있도록 SQL을 수정하고, `Member` 객체에 추가 매핑한다.

```java
String sql = "SELECT MEMBER_ID, NAME, TEL FROM MEMBER WHERE MEMBER_ID = ?";

...

String tel = rs.getString("TEL");
member.setTel(tel);
```

#### 수정 코드 변경
회원 수정 시 연락처 정보도 함께 수정될 수 있도록 UPDATE SQL과 `MemberDAO.update()` 일부를 수정한다.

> 회원 객체를 자바 컬렉션에 보관했다면, 필드가 추가되어도 많은 코드의 수정을 요구하진 않을 것이다.
> ```java
> list.add(member); // 등록
> Member member = list.get(xxx); // 조회
> member.setTel("xxx"); // 수정
> ```

#### 연관된 객체
"회원은 어떤 한 팀에 필수로 소속되어야 한다"는 요구사항이 추가된다면 `Member` 객체에 `Team team` 필드가 추가될 것이다. 
- 이때, 회원 정보와 함께 연관된 팀 이름도 출력할 수 있도록 기능을 추가한다.

```java
class Team {
    ...
    private String teamName;
    ...
}
```

```java
소속 팀: member.getTeam().getTeamName();
```

회원과 연관된 팀의 정보를 출력하기 위해서는 다음 SQL로 회원과 연관된 팀을 함께 조회해야 한다.
```java
String sql = "SELECT M.MEMBER_ID, M.NAME, M.TEL, T.TEAM_ID, T.TEAM_NAME FROM MEMBER M JOIN TEAM T ON M.TEAM_ID = T.TEAM_ID";
```

> **SQL의 문제점**
> - `Member` 객체가 연관된 `Team` 객체를 사용할 수 있을지 없을지는 전적으로 사용하는 SQL에 달려 있다. 하지만 이런 방식의 가장 큰 문제점은 데이터 접근 계층을 사용해서 SQL을 숨겨도, 어쩔 수 없이 DAO를 열어 어떤 SQL이 실행되는지 확인해야 한다는 점이다.

물리적으로 SQL과 JDBC API를 데이터 접근 계층에 숨기는데는 성공했을지 몰라도, 지금처럼 논리적으로는 **ENTITY와 아주 강한 의존관계**를 지니고 있어 객체에 대한 새로운 요구사항이 발생할 때마다 매우 큰 보수 비용이 발생하게 된다.

> **애플리케이션에서 SQL을 직접 다룰 때 발생하는 문제점**
> - 진정한 의미의 계층 분할이 어렵다.
> - ENTITY를 신뢰할 수 없다.
> - SQL에 의존적인 개발을 피할 수 없다.

### ➰ JPA와 문제 해결
JPA를 사용하면 객체를 DB에 저장하고 관리할 때, SQL을 작성하는 것이 아닌 JPA가 제공하는 API를 사용하면 된다. 다음은 JPA가 제공하는 CRUD API들이다.

#### 저장 기능
```java
jpa.persist(member);
```

- `persist()` 는 객체를 DB에 저장한다.
- JPA가 객체와 매핑정보를 보고 적절한 INSERT SQL을 생성해 DB로 전달한다.

#### 조회 기능
```java
String memberId = "ID";
Member member = jpa.find(Member.class, memberId);
```

- `find()` 는 객체 하나를 DB에서 조회한다.
- 이또한 객체와 매핑정보를 보고 적절한 SELECT SQL을 생성해 DB로 전달하고, 결과를 `Member` 객체를 생성해 반환한다.

#### 수정 기능
```java
Member member = jpa.find(Member.class, memberId);
member.setName("변경된 이름");
```

- JPA는 별도의 수정 메소드를 제공하지 않는다.
- 대신 객체를 조회해 값을 변경하면 트랜잭션을 커밋할 때 DB에 적절한 UPDATE SQL이 전달된다.

#### 연관된 객체 조회
```java
Member member = jpa.find(Member.class, memberId);
Team team = member.getTeam();
```

- JPA는 연관된 객체를 사용하는 시점에 적절한 SELECT SQL을 실행한다.
  - 따라서 연관된 객체를 마음껏 조회할 수 있다.

---

## 💫 패러다임의 불일치
> 객체지향 프로그래밍은 추상화, 캡슐화, 정보은닉, 상속, 다형성 등 시스템의 복잡성을 제어할 수 있는 다양한 장치들을 제공한다.

비즈니스 요구사항을 정의한 도메인 모델도 객체로 모델링하면 객체지향 언어의 장점들을 활용할 수 있다.
- 문제는 이 도메인 모델을 저장할 때 발생하는데, 특정 유저가 회원가입하면 회원이라는 객체를 생성한 후 **메모리가 아닌 어딘가에 영구 저장**해야 한다.

객체는 **속성(필드)**과 **기능(메소드)**을 가진다. 
- 기능은 클래스에 정의되어 있어, 저장시에는 객체의 상태인 속성만을 저장하면 된다.
- 객체가 단순하면 어렵지 않지만, 부모 객체를 상속받았거나, 다른 객체를 참조하고 있다면 저장이 쉽지 않다.
  - 예를 들어 회원 객체가 팀 객체를 참조하고 있는 경우, 두 객체를 함께 저장해야 한다.

자바는 이런 문제를 고려해 **객체를 파일로 저장하는 직렬화 기능**과 **저장된 파일을 객체로 복구하는 역 직렬화 기능**을 지원한다.
- 하지만 직렬화된 객체를 검색하기 어려운 문제가 있어 현실성이 없다.
- 현실적인 대안은 관계형 DB에 객체를 저장하는 것인데, 관계형 DB는 **데이터 중심으로 구조화**되어 있고, **집합적인 사고**를 요구한다. 또한 추상화, 상속, 다형성 같은 개념이 없다.

"객체와 관계형 DB는 지향하는 목적이 서로 달라 기능과 표현 방법도 다르다. 이를 **객체와 관계형 DB의 패러다임 불일치 문제**라고 한다. 따라서 객체 구조를 테이블 구조에 저장하는 데는 당연히 한계가 존재한다."
- 이러한 패러다임 불일치 문제를 해결하기 위해 중간에 있는 개발자는 너무 많은 시간과 코드를 소비한다.
- 아래는 이로 인해 발생하는 문제들을 구체적으로 다룬다.

### ➰ 상속
"객체는 상속이라는 기능을 가지고 있지만, 테이블은 가지고 있지 않다." (일부 DB가 지원하는 상속 기능은 객체의 상속과는 다르다.)
- DB 모델링에서 다루는 슈퍼타입 서브타입 관계를 사용하여 객체 상속과 유사한 형태로 테이블을 설계할 수는 있다.
  - 테이블의 특정 컬럼을 사용해서 어떤 자식 테이블과 관계가 있는지 정의하는 방식

객체 모델 코드는 다음과 같다.
```java
abstract class Item {
    Long id;
    String name;
    int price;
}

class Album extends Item {
    String artist;
}

class Movie extends Item {
    String director;
    String actor;
}

class Book extends Item {
    String author;
    String isbn;
}
```

- `Album` 객체를 저장하기 위해서는 객체를 분해해서 두 개의 SQL을 작성해야 한다. (`ITEM` , `ALBUM`)
- JDBC API를 사용해 부모 객체에서 부모 데이터만 꺼내서 `ITEM` 용 INSERT SQL을 작성하고, 자식 객체에서 자식 데이터만 꺼내서 `ALBUM` 용 INSERT SQL을 작성하는 것은 매우 비효율적이다.
- 조회하는 것 또한 두 테이블을 조인하고, 결과를 객체로 매핑하는 작업이 필요하다.

> 💨 **모두 패러다임의 불일치를 해결하기 위해 소모되는 비용이다.**

> 만약 **자바 컬렉션**을 사용해 해당 객체들을 보관한다면 부모 자식 관계나 타입에 상관없이 아래와 같은 코드로 가능하다.
> ```java
> list.add(album);
> list.add(movie);
>
> Album album = list.get(albumId);
> ```

#### JPA와 상속
JPA는 상속과 관련된 패러다임의 불일치 문제를 마치 **자바 컬렉션에 객체를 저장하듯이 JPA에게 객체를 저장하게 함**으로써 해결해준다. 

```java
// Item을 상속한 Album객체를 저장한다.
jpa.persist(album);
```
- 이때, JPA는 두 SQL(`ITEM` INSERT, `ALBUM` INSERT)을 실행해 객체를 두 테이블에 나눠 저장한다.

```java
// Album 객체를 조회한다.
String albumId = "id100";
Album album = jpa.find(Album.class, albumId);
```
- JPA는 두 테이블을 조인해서 필요한 결과를 가져와 반환한다.

### ➰ 연관관계
**객체는 참조**를 사용해 다른 객체와 연관관계를 가지고 이를 통해 연관된 객체를 조회하는 반면, **테이블은 외래 키(Foreign Key)**를 사용해 다른 테이블과 연관관계를 가지고 조인을 사용해 연관된 테이블을 조회한다.
- 이 둘 간의 패러다임 불일치는 매우 극복이 어렵다.

`Member` 객체는 `Member.team` 필드에 `Team` 객체의 참조를 보관해 연관관계를 가진다. 따라서 `member.getTeam()` 으로 연관된 `Team` 을 조회할 수 있다.

```java
class Member {
    Team team;
    ...

    Team getTeam() {
        return team;
    }
}

class Team {
    ...
}
```

`MEMBER` 테이블은 `MEMBER.TEAM_ID` 외래 키 컬럼을 사용해 `TEAM` 테이블과 연관관계를 가진다. 이 키를 사용해 테이블을 조인하여 연관된 `TEAM` 을 조회할 수 있다.

```sql
SELECT M.*, T.* FROM MEMBER M JOIN TEAM T ON M.TEAM_ID = T.TEAM_ID
```

여기서, **객체는 참조가 있는 방향으로만 조회가 가능**하다. 즉 `team.getMember()` 는 불가능하다. 하지만 **테이블은 외래 키 하나로 양방향으로 조회가 가능**하다.

#### 객체를 테이블에 맞추어 모델링
객체와 테이블의 차이를 알아보기 위해 객체를 단순히 테이블에 맞춰 모델링한다.

```java
class Member {
    String id; // MEMBER_ID
    Long teamId; // TEAM_ID
    String userName; // USERNAME
}

class Team {
    Long id; // TEAM_ID
    String name; // NAME
}
```

- 위와 같이 객체를 테이블에 맞춰 모델링함으로써 객체를 테이블에 저장하거나 조회하는 것은 편리해졌다.
- 하지만 외래 키 값을 그대로 보관하는 `teamId` 필드는 문제가 있다.
  - 관계형 DB의 경우, **"조인"** 기능이 있어 외래 키 값을 그대로 보관해도 상관없지만, **객체는 연관된 객체의 참조를 보관**해야 참조를 통해 연관된 객체를 조회할 수 있다.

> **외래 키까지 테이블에 맞춘 모델링 방식을 사용**하게 되면
> - 결국 참조를 통해 연관된 객체를 조회할 수가 없어지고, 
> - 객체지향의 특징을 잃어버리게 된다.

#### 객체지향 모델링
위에서 테이블에 맞춘 모델링 방식의 문제점(객체지향의 특징을 소실)을 이해했다. 이제 참조를 통한 연관관계를 가지도록 모델링한다.

```java
class Member {
    String id; // MEMBER_ID
    Team team; // 참조로 연관관계를 가짐
    String userName;

    Team getTeam() {
        return team;
    }
}

class Team {
    Long id; // TEAM_ID - PK
    String name; // NAME
}
```

- 연관된 `Team` 의 참조를 보관함으로써, `member.getTeam()` 으로 연관된 객체를 조회할 수 있다.
- 하지만 이런 객체지향 모델링은 객체를 테이블에 저장하거나 조회하는 데에 어려움이 있다. 
  - **객체와 테이블의 연관관계를 맺는 방식의 차이**(필드와 외래 키)때문인데, 이는 결국 개발자가 중간다리역할을 수행해야 해결이 가능했다.

**저장**
- 객체를 DB에 저장하기 위해 `team` 필드를 `TEAM_ID` 외래 키 값으로 변환한다.

```java
member.getId(); // MEMBER_ID - PK에 저장
member.getTeam().getId(); // TEAM_ID - FK에 저장, INSERT SQL에 사용
member.getUserName(); // USERNAME 컬럼에 저장
```

**조회**
- `TEAM_ID` 외래 키 값을 `Member` 객체의 `team` 참조로 변환한다.
- 먼저 `MEMBER` 와 `TEAM` 을 조회하고, 이 결과로 객체를 생성해 연관관계를 설정하고 반환한다.

```java
public Member find(String memberId) {
    // SQL 실행
    ...
    Member member = new Member();
    ...

    // DB에서 조회한 회원 관련 정보를 모두 입력
    Team team = new Team();
    ...
    // DB에서 조회한 팀 관련 정보를 모두 입력

    // 회원과 팀 관계 설정
    member.setTeam(team);
    return member;
}
```

> 매번 언급하듯, 자바 컬렉션에 저장한다면 이러한 패러다임 불일치 해결을 위한 비용은 소모되지 않는다.

#### JPA와 연관관계
"JPA는 연관관계와 관련된 패러다임의 불일치 문제를 해결해준다."

```java
member.setTeam(team); // 회원과 팀 관계 설정
jpa.persist(member); // 회원과 연관관계 함께 저장
```

- 개발자는 그저 관계를 설정하고 객체를 저장하기만 하면 된다.
- JPA는 위에서의 중간다리역할을 수행해 적절한 SQL을 DB에 전달하고, 적절하게 반환해준다.

### ➰ 객체 그래프 탐색
객체에서 회원이 소속된 팀 조회 시 참조를 사용하는 것을 **객체 그래프 탐색**이라고 한다. 객체 연관관계가 연속적으로 이어져있는 경우 아래 코드와 같이 마음껏 객체 그래프를 탐색할 수 있어야 한다.

```java
member.getOrder().getOrderItem();
```

하지만 DB를 사용하는 경우, `SELECT M.*, T.* FROM MEMBER M JOIN TEAM T ON M.TEAM_ID = T.TEAM_ID` 를 실행해서 회원과 팀에 대한 데이터는 조회가 가능하지만, 다른 객체 그래프는 데이터가 없어 탐색할 수 없게 된다. (`member.getOrder();` 의 결과는 `null`)

**"SQL을 직접 다루면 처음 실행하는 SQL에 따라 객체 그래프의 탐색 영역이 제한된다."** 
- 이는 비즈니스 로직에 따라 사용하는 객체 그래프가 다른데 언제 끊어질지 모를 객체 그래프를 함부로 탐색할 수는 없기에 객체지향 개발자에겐 매우 큰 제약이다.

```java
class MemberService {
    ...
    public void process() {
        Member member = memberDAO.find(memberId);
        member.getItem(); // member -> team 객체 그래프 탐색이 가능한가?
        member.getOrder().getDelivery(); // ???
    }
}
```

- 위 예제는 `memberDAO` 를 통해 `member` 객체를 조회했지만, 이 객체와 연관된 객체 방향으로 객체 그래프를 탐색할 수 있을지는 예측할 수 없다.
  - 탐색 가능 여부의 확인을 위해서는 `DAO` 의 SQL을 직접 확인하는 수밖에 없다.
  - 이는 이전에도 다룬 "ENTITY가 SQL에 논리적으로 종속"되기에 발생하는 문제이다.
  - 그렇다고 연관된 모든 객체 그래프를 DB에서 조회해서 메모리에 올려두는 것은 현실성이 없기에 `getMemberWithTeam()` , `getMemberWithOrderWithDelivery()` 와 같이 경우에 따른 메소드를 여러 개 만들어 둬야 한다.

#### JPA와 객체 그래프 탐색
JPA를 사용하면 객체 그래프를 마음껏 탐색할 수 있다.

```java
member.getOrder().getOrderItem();
```

이전에도 언급했듯, **JPA는 연관된 객체를 사용하는 시점에 적절한 SQL을 실행**한다.
- 즉, 연관된 객체를 신뢰하고 마음껏 조회할 수 있다.
- 이는 실제 객체를 사용하는 시점까지 DB 조회를 미룬다고 하여 **"지연 로딩"**이라고 한다.

**지연 로딩**
- **JPA는 지연 로딩을 투명(transparent)하게 처리**한다. 즉, JPA와 관련된 어떤 추가적인 코드도 필요하지 않다.

```java
Member member = jpa.find(Member.class, memberId);

Order order = member.getOrder();
order.getOrderDate(); // Order를 사용하는 시점에 SELECT ORDER SQL
```

- 실제 `Order` 객체를 사용하는 시점에 JPA는 DB에서 테이블을 조회하게 된다.

### ➰ 비교
DB는 **기본 키의 값**으로 각 행을 구분한다. 하지만 객체는 **동일성 비교**와 **동등성 비교**라는 두 가지 비교 방법이 있다.
- 동일성 비교는 `==` 비교이다. 객체 인스턴스의 주소 값을 비교한다.
- 동등성 비교는 `equals()` 메소드를 사용해서 객체 내부의 값을 비교한다.

> 여기서 하고 싶은 말은, 테이블의 행을 구분하는 방법과 객체를 구분하는 방법에는 차이가 있다는 것이다.

```java
class MemberDAO {
    public Member getMember(String memberId) {
        String sql = "SELECT * FROM MEMBER WHERE MEMBER_ID = ?";
        ...

        // JDBC API, SQL 실행

        return new Member(...);
    }
}
```

```java
String memberId = "100";
Member member1 = memberDAO.getMember(memberId);
Member member2 = memberDAO.getMember(memberId);

member1 == member2; // 다르다!
```

- 같은 기본 키 값으로 회원 객체를 두 번 조회했다. 
  - 조회한 결과를 동일성 비교하면, `false` 가 반환된다.
  - 이는 같은 DB 행에서 조회했지만, 객체 측면에서 볼 때, **둘은 서로 다른 인스턴스**이기 때문이다. (`getMember()` 호출 시, `new Member()` 로 인스턴스를 매번 새로 생성)
- DB에 같은 행을 조회했지만 동일성 비교는 실패한다. 하지만 이 또한 컬렉션에 보관했다면 동일성 비교에 성공했을 것이다.

> 이러한 패러다임의 불일치 문제를 해결하기 위해 DB의 같은 행을 조회할 때마다 같은 인스턴스를 반환되도록 하는 것은 쉽지 않다. 거기에 트랜잭션까지 고려한다면 더 골치가 아프다.

#### JPA와 비교
JPA는 같은 트랜잭션일 떄 같은 객체가 조회되는 것을 보장한다. 그러므로 위 예제에서 `memberDAO.getMember()` 가 아닌 `jpa.find()` 로 두 인스턴스의 동일성 비교가 성공한다.

### ➰ 정리
JPA는 객체 모델과 관계형 DB 모델이 각자 지향하는 패러다임의 불일치 문제를 해결해줌으로써, 개발자가 너무 많은 시간과 코드를 소비하지않도록 돕는다.

---

## 💫 JPA란 무엇일까?
JPA(Java Persistence API)는 자바 진영의 ORM 기술 표준이다. 어는 자바 애플리케이션과 JDBC 사이에서 동작한다.

그럼 ORM은 무엇일까? 
- **Object Relational Mapping**이라는 이름 그대로 객체와 관계형 DB를 매핑한다. 

ORM 프레임워크는 객체와 테이블을 매핑해 패러다임의 불일치 문제를 해결해준다. 즉 INSERT SQL을 직접 작성하는 것이 아닌 객체를 마치 "자바 컬렉션에 저장하듯 ORM 프레임워크에 저장"하면 된다.

`MemberDAO` 에서 `Entity Object` 를 `PERSIST`(저장) 하면 JPA는,
- 해당 ENTITY를 분석하고
- INSERT SQL을 생성하고
- JDBC API를 사용함으로써

**패러다임의 불일치 문제를 해결**한다.

`FIND`(조회)할 때 역시
- SELECT SQL을 생성하고
- JDBC API를 사용해
- 반환된 결과를 ResultSet에 매핑함으로써

**패러다임의 불일치 문제를 해결**한다.

이는 단순히 SQL을 개발자 대신 생성해 DB에 전달하는 것뿐 아닌 다양한 패러다임의 불일치 문제들도 해결해준다. 
- 따라서, 객체 측면에서는 정교한 객체 모델링이 가능해졌고, 
- 관계형 DB는 DB에 맞도록 모델링을 할 수 있다.
- 그리고 매핑 방법만 ORM 프레임워크에 전달하면 된다.

객체지향 언어에 따라 다양한 ORM 프레임워크들이 존재한다. 그중 Hibernate 프레임워크는 거의 대부분의 패러다임 불일치 문제를 해주는 프레임워크로, 가장 많이 사용된다.

### ➰ JPA 소개
과거 **엔터프라이즈 자바 빈즈(EJB)**라는 기술 표준이 있었다. 내부에는 엔티티 빈이라는 ORM 기술도 포함되어 있었는데, 너무 복잡하고 기술 성숙도도 떨어졌으며 자바 엔터프라이즈(J2EE) 애플리케이션 서버에서만 동작한다는 단점이 있었다.

이때, Hibernate 오픈소스 ORM 프레임워크가 등장했다. 이는 매우 가볍고 실용적이며 기술 성숙도 또한 높아 이를 기반으로 새로운 자바 ORM 기술 표준을 만들었고, 이것이 바로 JPA이다.

> **JPA는 자바 ORM 기술에 대한 API 표준 명세이다.**
- 인터페이스를 모아둔 것으로, JPA를 구현한 ORM 프레임워크를 선택해야 JPA를 사용할 수 있다.
  - 현재 JPA 2.1을 구현한 ORM 프레임워크는 Hibernate, EclipseLink, DataNucleus가 있다.

### ➰ 왜 JPA를 사용해야 하는가?
여러가지 이유가 있다. 하나씩 살펴보도록 한다.

#### 생산성
위에서 여러 번 언급했듯, 자바 컬렉션에 객체를 저장하는 것과 같은 코드 간결성을 얻을 수 있다. 지루하고 반복적인 CRUD용 SQL을 개발자가 직접 작성하지 않아도 되고, DDL문 또한 자동으로 생성해주기도 한다.

> DB 설계 중심의 패러다임을 객체 설계 중심으로 역전시킬 수 있다.

#### 유지보수
SQL을 직접 다루게 되면, 이전에도 언급했듯 ENTITY에 필드를 하나만 추가해도 관련된 SQL과 결과를 매핑하기 위한 JDBC API 코드를 모두 수정해야 한다. 하지만 JPA는 이런 모든 과정을 대신 처리하기에 결과적으로 유지보수해야하는 코드의 수가 줄어드는 이점을 얻을 수 있다.

#### 패러다임의 불일치 해결
JPA는 지겹도록 언급한 상속, 연관관계, 객체 그래프 탐색, 비교하기와 같은 패러다임의 불일치 문제를 해결해준다.

#### 성능
애플리케이션과 DB 사이에 계층이 하나 더 있으면 최적화 관점에서 시도해 볼 수 있는 것들이 많다. JPA는 이 중간 계층으로서, 다양한 성능 최적화 기회를 제공한다.

```java
String memberId = "helloId";
Member member1 = jpa.find(memberId);
Member member2 = jpa.find(memberId);
```

- 위 예시는 같은 트랜잭션 안에서 같은 회원을 두 번 조회하는 코드인데, JDBC API를 사용했다면 SELECT SQL을 사용해 **DB와 두 번 통신**했을 것이다.
- 하지만 JPA를 사용하면, SELECT SQL을 한 번만 DB에 전달하고, 두번째 조회는 **이미 조회한 회원 객체를 재사용**하여 최적화를 제공할 수 있다.

#### 데이터 접근 추상화와 벤더 독립성
관계형 DB는 같은 기능이라도 벤더마다 사용법이 다른 경우가 많다.
- 페이징 처리는 DB마다 달라서 사용법을 각각 배워야 한다.

결국, 애플리케이션은 처음 선택한 DB 기술에 종속되고 다른 DB로 변경이 매우 어려워진다.

JPA는 애플리케이션과 DB 사이에 **추상화된 데이터 접근 계층을 제공**해 특정 DB 기술에 종속되지 않도록 한다.
- DB를 변경하기 위해서는 JPA에게 이를 알려주기만 하면 된다.

#### 표준
JPA는 자바 진영의 ORM 기술 표준으로서, 이를 사용하면 다른 구현 기술로 손쉽게 변경할 수 있다.

>> "**JPA가 어려운 근본적인 이유는 ORM이 객체지향과 관계형 DB라는 두 기둥 위에 있기 때문입니다.**"

## 📕 출처
**자바 ORM 표준 JPA 프로그래밍** - 김영한
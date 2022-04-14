---
title: "📖 7장 DB를 활용해 데이터를 영구적으로 저장하기"
description: "자바 웹 프로그래밍 책 정리"
date: 2022-02-10
update: 2022-02-10
tags:
  - Java
  - Refactoring
  - Framework
series: "📖 자바 웹 프로그래밍 Next Step"
---

<em>[자바 웹 프로그래밍 Next Step - 박재성]을 읽고 인용하고 정리하는 POST입니다.</em>

> 사용자가 입력한 데이터가 서버를 재시작해도 사라지지 않도록 데이터베이스 서버를 도입해 영구적으로 저장하고 조회하도록 한다.

**JDBC**<br/>
: 자바 진영이 DB와의 통신을 담당하고 지원하도록 사용하는 표준

JDK에서 제공하는 `java.sql` 패키지의 JDBC 소스코드를 보면, 구현 코드는 거의 없고, 인터페이스만을 정의해 제공한다. 즉 JDBC는 **통신을 위한 규약만 정의**하고, 이에 대한 **구현체는 DB를 만들어 서비스하는 회사가 제공**하도록 한다.

서블릿 또한 인터페이스만 정의하고 서블릿 컨테이너를 만들어 제공하는 회사가 구현체를 제공한다.

> 표준만 정의함으로써, DB에 대한 연결 설정만 변경해 다른 DB를 지원하여 소스코드의 변경을 최소화한다.

## 🚩 회원 데이터를 DB에 저장하기 실습
경량 데이터베이스 중 하나인 **H2 데이터베이스**를 사용하여 실습을 진행한다.
(https://github.com/slipp/jwp-basic 의 step2-user-with-mvc-framework)

### 🔧 실습 코드 리뷰 및 JDBC 복습
서버가 시작하는 시점에 회원 정보를 저장할 테이블을 초기화한다. (`jwp.sql` 파일에 테이블 생성문이 있다.) 해당 sql파일은 톰캣 서버가 시작할 때 초기화하도록 `ContextLoaderListener` 클래스에 구현되어 있다.

```java
@WebListener
public class ContextLoaderListener implements ServletContextListener {
    private static final Logger logger = LoggerFactory.getLogger(ContextLoaderListener.class);

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
        populator.addScript(new ClassPathResource("jwp.sql"));
        DatabasePopulatorUtils.execute(populator, ConnectionManager.getDataSource());

        logger.info("Completed Load ServletContext!");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
    }
}
```

- sql 파일을 읽어 DB에 대한 초기화 작업을 위해 스프링 프레임워크에서 제공하는 기능을 활용했다.
- 톰캣 서버가 시작할 때 `contextInitialized()` 메소드를 호출함으로써 초기화 작업을 수행한다.
  - `ContextLoaderListener` 가 `ServletContextListener` 인터페이스를 상속받아 구현하고, `@WebListener` annotation이 있기 때문이다.
  - 서블릿 컨테이너는 시작하는 과정에서 `ServletContextListener` 인터페이스 구현체 중 해당 annotation이 있는 구현체의 `contextInitialized()` 메소드를 호출해 초기화 작업을 진행한다.
- `ServletContextListener` 에 대한 초기화는 서블릿 초기화보다 먼저 진행된다. 서블릿 초기화가 해당 서블릿과 관련한 초기화를 담당한다면, `ServletContextListener` 초기화는 웹 애플리케이션 전체에 영향을 미치는 초기화가 필요한 경우 활용한다.

`next.dao` 패키지에 `UserDao` 클래스를 통해 DB 접근 로직을 구현한다. 자바 진영은 **DB에 대한 접근 로직 처리를 담당하는 객체를 별도로 분리해 구현**하는 것을 추천하고, 이 객체를 **DAO(Data Access Object)**라고 한다.

현재는 `insert`, `findByUserId` 기능만 구현되어 있다. 기존에 `DataBase` 클래스를 사용하던 코드(ex. `DataBase.addUser`)를 `UserDao` 를 사용하도록 변경한다.

```java
public class CreateUserController implements Controller {
    private static final Logger log = LoggerFactory.getLogger(CreateUserController.class);

    @Override
    public String execute(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        User user = new User(req.getParameter("userId"), req.getParameter("password"), req.getParameter("name"),
                req.getParameter("email"));
        log.debug("User : {}", user);

        UserDao userDao = new UserDao();
        try {
            userDao.insert(user);
        } catch (SQLException e) {
            log.error(e.getMessage());
        }

        return "redirect:/";
    }
}
```

- 다른 기능들도 위와 같은 방식으로 변경할 수 있는데, 한 가지 불편한 점이 있다.
  - `UserDao` 의 모든 메소드가 `SQLException` 을 `throw` 하고 있기에 컴파일 에러 방지를 위해 `try - catch` 구문으로 감싸줘야 한다.

### 🔧 회원 목록 실습
`UserDao` 는 회원 전체 목록을 조회하는 `findAll()` 메소드를 구현한다.

### 🔧 개인정보 수정 실습
`UPDATE` SQL문을 활용해 개인정보를 수정할 수 있는 기능을 추가하고 컨트롤러가 추가한 메소드를 사용하도록 리팩토링한다.

---

## 🚩 DAO 리팩토링 실습
`UserDao` 에는 많은 중복 코드가 발생한다. 아래 중복 작업들을 공통 라이브러리로 만들어 중복을 제거할 수 있다.
- `Connection` 관리
- `Statement` 관리
- `ResultSet` 관리
- 파라미터 Setting
- 트랜잭션 관리

**`SQLException` 에 대한 처리**<br/>
`UserDao` 리팩토링 시 고려해야 할 사항 중 하나이다. 이는 **컴파일타임 Exception** 이므로, 매번 `try - catch` 절을 통해 예외 처리를 수행해야 한다. 하지만 이 예외를 catch해도 로그를 남기는 것외에 별다른 처리가 떠오르지 않는다. 

> 자바의 첫 등장 시, 특히 **컴파일타임 Exception**은 예외 처리를 컴파일 시점에 할 수 있다는 장점으로 많이 활용되었다. 하지만 너무 무분별하게 사용되어 불필요하게 `try - catch` 절로 감싸야 하며, 소스코드의 가독성을 떨어뜨리는 주범이 되고 있다. (`expert one-on-one J2EE 설계와 개발` 책에서 컴파일타임, 런타임 Exception에 대한 가이드라인을 제시한다.)
> 해당 가이드라인을 참고하여, 대부분의 경우 런타임 Exception을 사용하도록 한다.

위 기준으로 판단했을 때, 컴파일타임 Exception을 잘못 사용한 예가 JDBC의 `SQLException` 이다. 따라서 JDBC에 대한 공통 라이브러리를 만드는 과정에서 `SQLException` 을 **런타임 Exception**으로 변환해 소스코드의 가독성을 떨어뜨리지 않도록 한다.

### 🔧 요구사항
JDBC에 대한 공통 라이브러리를 만들어 개발자가 "SQL 쿼리, 쿼리에 전달할 인자, SELECT 구문의 경우 조회한 데이터 추출" 구현에만 집중하도록 한다. 또한 `SQLException` 을 런타임 Exception으로 변환하도록 한다.

### 🔧 요구사항 분리 및 힌트
- INSERT, UPDATE 쿼리는 비슷하기에 해당 메소드들의 중복 제거 작업을 진행한다.
  - `setValuesForInsert(User, PreparedStatement)`
  - `createQueryForInsert()`
  - `setValuesForUpdate(User, PreparedStatement)`
  - `createQueryForUpdate()`
- 분리한 메소드 중 변화가 발생하지 않는 부분(공통 라이브러리로 구현할 코드)을 새로운 클래스로 추가한 후 이동한다.
  - `insert()` 와 `update()` 메소드별로 `InsertJdbcTemplate`, `UpdateJdbcTemplate` 과 같이 새로운 클래스를 추가한 후 해당 메소드 코드들을 이동한다.
  - 이동 시, 인자로 `UserDao` 를 전달한다. 앞에서 추출한 메소드가 `private` 접근 제어자라면 `default` 접근 제어자로 리팩토링한다.
  - `UserDao` 의 `insert()` 가 `InsertJdbcTemplate` 의 `insert()` , `update()` 가 `UpdateJdbcTemplate` 의 `update()` 메소드를 호출하도록 리팩토링한다.
- `InsertJdbcTemplate` , `UpdateJdbcTemplate` 이 `UserDao` 에 대한 의존관계를 가진다. 이를 제거한다.
  - 의존관계를 가지는 이유는 `setValueFor...()`, `createQueryFor...())` 때문이다. 이 두 메소드를 추상 메소드로 구현하고 `UserDao` 의 `insert(), update()` 메소드에서 2개의 추상 메소드를 구현한다. 구현은 **익명 클래스로 구현**한다.
  > **익명 클래스**<br/>
  > : Inner class로, 이름이 없는 클래스이다. 클래스 정의와 동시에 객체를 생성할 수 있고 인터페이스와 클래스 모두 익명 클래스로 객체를 생성할 수 있다.
  > 이는 프로그램 내에서 한번만 객체로 만드는데 사용되는 클래스를 굳이 정의할 필요가 없기 때문에 사용하고, `Runnable` 이나 `Event Listener` 객체를 생성하는데 주로 사용된다.
- `InsertJdbcTemplate` 과 `UpdateJdbcTemplate` 은 구현 부분이 다르지 않다. 하나만 사용하도록 리팩토링한다. 
  - 해당 클래스들의 메소드를 `setValues()` 와 `createQuery()` 로 Rename하고 한 클래스만 사용하도록 리팩토링한다.
- `JdbcTemplate` 은 아직도 `User` 와 의존관계를 가지므로, 다른 `DAO` 클래스에서 재사용할 수 없다. 따라서 의존관계를 제거한다.
  - `User` 값은 `UserDao` 에서만 사용되기에 `JdbcTemplate` 의 `update()` 메소드에 굳이 전달할 필요가 없다.
  - SQL 쿼리와 같이 변경되는 부분을 추상 메소드가 아닌 메소드의 인자로 전달한다.
- 위와 같은 방식으로 `SelectJdbcTemplate` 을 생성해 반복 코드를 분리한다.
  - `ResultSet` 데이터를 자바 객체로 변환하는 부분을 추가한다.
  - `setValues()` 와 `mapRow()` 메소드와 같은 2개의 추상 메소드를 가져야 한다. `mapRow()` 메소드의 반환 값은 `Object` 여야 한다.
- `JdbcTemplate` 와 `SelectJdbcTemplate` 에 중복 코드가 있어, 한 개의 클래스로 리팩토링해 클래스 하나에서 모든 작업을 하도록 한다.
- 통합했을 경우, SELECT가 아닌 다른 쿼리들이 불필요한 `mapRow()` 메소드를 반드시 구현해야 한다. `setValues()` , `mapRow()` 2개의 메소드를 분리해 독립적으로 전달할 수 있도록 한다.
  - 인터페이스를 추가해 인자로 전달하도록 리팩토링한다.
- `SQLException` 을 런타임 Exception으로 변환해 `throw` 하도록 한다. 그리고 사용한 자원의 반납을 `close()` 메소드가 아닌 `try-with-resources` 구문으로 해결한다.
  - `RuntimeException` 을 상속하는 커스텀 Exception을 추가하고 `SQLException` 을 새로 추가한 커스텀 Exception을 변환해 `throw` 하도록 구현한다.
- SELECT 쿼리의 경우 조회한 데이터를 캐스팅하는 부분이 있는데 이를 캐스팅하지 않도록 개선한다.
  - `RowMapper`(`mapRow()` 의 인터페이스)에 자바 제너릭을 적용해 공통 라이브러리를 개선한다.
- 각 쿼리에 전달할 인자를 자바의 가변인자를 통해 전달할 수 있는 메소드를 추가한다.
  - 가변인자 문법으로 인자를 동적으로 전달한다. (`void update(String sql, Object ... values)`)
  - `PreparedStatement` 에 값 전달 시 `setObject()` 메소드를 활용한다.
- `PreparedStatementSetter`, `RowMapper` 인터페이스를 구현하는 부분을 **람다 표현식**을 활용하도록 리팩토링한다.

---

## 🚩 DAO 리팩토링 및 설명
### 🔧 메소드 분리
중복 코드를 제거하기 위해 **Extract Method 리팩토링**을 통해 메소드를 분리한다. 개발자가 DB 접근 로직을 구현할 때 매번 구현해야 하는 부분과 그렇지 않은 부분을 기준으로 메소드를 분리한다. 

먼저 `insert()` 와 `update()` 메소드를 다음과 같이 `setValuesFor...()` & `createQueryFor...()` 로 분리한다.

```java
public void setValuesForInsert(User user, PreparedStatement pstmt) throws SQLException {
    pstmt.setString(1, user.getUserId());
    pstmt.setString(2, user.getPassword());
    pstmt.setString(3, user.getName());
    pstmt.setString(4, user.getEmail());
}

public String createQueryForInsert() {
    return "INSERT INTO USERS VALUES (?, ?, ?, ?)";
}
```

### 🔧 클래스 분리
메소드를 분리하니 공통 라이브러리로 구현할 부분(`insert()` 메소드)과 개발자가 매번 구현해야 할 부분(`createQueryFor...()`, `setValuesFor...()` 메소드)이 나눠지는 것을 확인할 수 있다. 공통 라이브러리로 구현할 부분을 새로운 클래스(`InsertJdbcTemplate`)로 이동한다. 이후, `UserDao` 의 `insert()` 메소드를 새 클래스로 이동한다.

```java
public void insert(User user, UserDao userDao) throws SQLException {
    Connection con = null;
    PreparedStatement pstmt = null;
    try {
        con = ConnectionManager.getConnection();
        String sql = userDao.createQueryForInsert();
        pstmt = con.prepareStatement(sql);
        userDao.setValuesForInsert(user, pstmt);

        pstmt.executeUpdate();
    } finally {
        if (pstmt != null) {
            pstmt.close();
        }

        if (con != null) {
            con.close();
        }
    }
}
```

```java
public class UserDao {
    public void insert(User user) throws SQLException {
        InsertJdbcTemplate jdbcTemplate = new InsertJdbcTemplate();
        jdbcTemplate.insert(user, this);
    }

    public void setValuesForInsert(User user, PreparedStatement pstmt) throws SQLException {
        pstmt.setString(1, user.getUserId());
        pstmt.setString(2, user.getPassword());
        pstmt.setString(3, user.getName());
        pstmt.setString(4, user.getEmail());
    }

    public String createQueryForInsert() {
        return "INSERT INTO USERS VALUES (?, ?, ?, ?)";
    }
}
```

- 새로 생성한 `InsertJdbcTemplate` 에는 `createQueryForInsert()` 와 `setValuesForInsert()` 가 없으므로, 컴파일 에러가 발생한다.
  - `UserDao` 인스턴스를 인자로 전달해 메소드 호출이 가능하게 한다.
- `UserDao` 의 `insert()` 메소드가 `InsertJdbcTemplate` 의 `insert()` 메소드를 호출하도록 변경하고, `createQueryForInsert()` , `setValuesForInsert()` 메소드는 `InsertJdbcTemplate` 의 `insert()` 메소드가 접근 가능하도록 `default` 접근 제어자로 변경한다.
  - `insert()` 호출 시 필요한 `UserDao` 는 현재 자기 자신이므로 `this` 로 전달할 수 있다.
  - 그런데, `InsertJdbcTemplate` 이 `UserDao` 와 다른 패키지에 존재한다면, 접근 제어자를 `public` 으로 해야한다.

`update()` 메소드도 동일하게 진행한다.

### 🔧 `UserDAO` 와 `InsertJdbcTemplate` 의 의존관계 분리
새로 추가한 `...JdbcTemplate` 은 `UserDao` 와 의존관계를 가져 `UserDao` 가 아닌 다른 곳에서는 사용할 수 없다. 따라서 의존관계를 제거해야 한다.

이를 위해서는 `createQueryFor...()` 와 `setValuesFor...()` 메소드가 `...JdbcTemplate` 에 존재하도록 해야 한다.
- 하지만 `...JdbcTemplate` 가 아닌 `UserDao` 가 메소드의 구현을 담당해야 하므로, 두 개의 메소드를 추상 메소드로 구현하고, `...JdbcTemplate` 을 추상 클래스로 변경한다. (이로써, 의존관계를 제거해 컴파일 에러를 방지할 수 있다.)

```java
public abstract class InsertJdbcTemplate {
    public void insert(User user) throws SQLException {
        Connection con = null;
        PreparedStatement pstmt = null;
        try {
            con = ConnectionManager.getConnection();
            String sql = createQueryForInsert();
            pstmt = con.prepareStatement(sql);
            setValuesForInsert(user, pstmt);

            pstmt.executeUpdate();
        } finally {
            if (pstmt != null) {
                pstmt.close();
            }

            if (con != null) {
                con.close();
            }
        }
    }

    public abstract String createQueryForInsert();

    public abstract void setValuesForInsert(User user, PreparedStatement pstmt) throws SQLException;
}
```

```java
public class UserDao {
    public void insert(User user) throws SQLException {
        InsertJdbcTemplate jdbcTemplate = new InsertJdbcTemplate() {
            public void setValuesForInsert(User user, PreparedStatement pstmt) throws SQLException {
                pstmt.setString(1, user.getUserId());
                pstmt.setString(2, user.getPassword());
                pstmt.setString(3, user.getName());
                pstmt.setString(4, user.getEmail());
            }

            public String createQueryForInsert() {
                return "INSERT INTO USERS VALUES (?, ?, ?, ?)";
            }
        };
        jdbcTemplate.insert(user);
    }
}
```

- 먼저 `...JdbcTemplate` 을 추상 클래스로 구현하고, 사용하는 메소드들을 추상 메소드로 구현하게 되면, `UserDao` 에서는 해당 추상 메소드들에 대한 구현이 없이 `...JdbcTemplate` 인스턴스를 생성할 수 없다.
  - 추상 메소드를 구현하는 방법은 아래의 방법이 있다.
    - `...JdbcTemplate` 을 상속하는 새로운 클래스를 추가
    - 익명 클래스를 추가
  - `...JdbcTemplate` 인스턴스를 생성할 때만 사용하기에 **익명 클래스를 추가하는 방식**으로 구현한다.

> 반복적으로 발생하는 중복 로직을 상위 클래스가 구현하고 변화가 발생하는 부분만 추상 메소드로 만들어 구현하는 디자인 패턴을 **"템플릿 메소드 패턴"** 이라고 한다.

`update()` 메소드도 동일하게 진행한다.

### 🔧 `InsertJdbcTemplate` 과 `UpdateJdbcTemplate` 통합
공통 라이브러리를 담당할 클래스를 분리하니 `InsertJdbcTemplate` 의 `insert()` 와 `UpdateJdbcTemplate` 의 `update()` 의 구현이 다르지 않음을 확인할 수 있다. 굳이 두 클래스로 분리할 필요가 없다는 의미이므로, `JdbcTemplate` 이라는 클래스로 합치고 `update()` 메소드 하나를 사용하도록 변경한다.

```java
public abstract class JdbcTemplate {
    public void update(User user) throws SQLException {
        Connection con = null;
        PreparedStatement pstmt = null;

        try {
            con = ConnectionManager.getConnection();
            String sql = createQuery();
            pstmt = con.prepareStatement(sql);
            setValues(user, pstmt);

            pstmt.executeUpdate();
        } finally {
            if (pstmt != null) {
                pstmt.close();
            }

            if (con != null) {
                con.close();
            }
        }
    }

    public abstract String createQuery();

    public abstract void setValues(User user, PreparedStatement pstmt) throws SQLException;
}
```

- `InsertJdbcTemplate` 과 `UpdateJdbcTemplate` 을 하나의 클래스로 합한 후, 메소드 이름 또한 변경한다.
- 그리고, `UserDao` 의 `insert()` 와 `update()` 가 위 클래스를 사용하도록 변경한다.

```java
public void insert(User user) throws SQLException {
    JdbcTemplate jdbcTemplate = new JdbcTemplate() {
        public void setValues(User user, PreparedStatement pstmt) throws SQLException {
            pstmt.setString(1, user.getUserId());
            pstmt.setString(2, user.getPassword());
            pstmt.setString(3, user.getName());
            pstmt.setString(4, user.getEmail());
        }

        public String createQuery() {
            return "INSERT INTO USERS VALUES (?, ?, ?, ?)";
        }
    };
    jdbcTemplate.update(user);
}

public void update(User user) throws SQLException {
    JdbcTemplate jdbcTemplate = new JdbcTemplate() {
        public void setValues(User user, PreparedStatement pstmt) throws SQLException {
            pstmt.setString(1, user.getPassword());
            pstmt.setString(2, user.getName());
            pstmt.setString(3, user.getEmail());
            pstmt.setString(4, user.getUserId());
        }

        public String createQuery() {
            return "UPDATE USERS SET password=?, name=?, email=? WHERE userId=?";
        }
    };
    jdbcTemplate.update(user);
}
```

### 🔧 `User` 의존관계 제거 및 SQL 쿼리 인자로 전달
아직도 `JdbcTemplate` 은 `User` 에 대한 의존관계가 남아있다. 이렇게 되면, 위 코드들을 Post나 다른 DB에 접근해 쿼리를 날려야 하는 경우에는 `JdbcTemplate` 을 사용할 수 없다는 것이다. 그런데, `JdbcTemplate` 의 `update()` 를 보면, `setValues()` 메소드를 통해 `User` 인자를 전달하지 않고 `UserDao` 의 `insert()` , `update()` 메소드의 `User` 인스턴스에 직접 접근하도록 리팩토링하여 해당 의존관계를 제거할 수 있을 것 같다.
- `UserDao` 에서 `User` 객체를 `JdbcTemplate` 으로 전달하고, 이를 다시 `UserDao` 로 전달하여 작업을 처리하고 있는 불필요한 상황이다.

```java
public class UserDao {
    public void insert(User user) throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate() {
            public void setValues(PreparedStatement pstmt) throws SQLException {
                pstmt.setString(1, user.getUserId());
                pstmt.setString(2, user.getPassword());
                pstmt.setString(3, user.getName());
                pstmt.setString(4, user.getEmail());
            }

            public String createQuery() {
                return "INSERT INTO USERS VALUES (?, ?, ?, ?)";
            }
        };
        jdbcTemplate.update();
    }
}
```

```java
public abstract class JdbcTemplate {
    public void update() throws SQLException {
        ...

        try {
            ...

            setValues(pstmt);
            ...

        } finally {
            ...
        }
    }
    
    ...

    public abstract void setValues(PreparedStatement pstmt) throws SQLException;
}
```

- 이제 `JdbcTemplate` 에서는 `User` 객체를 직접적으로 사용하지 않는다. 이렇게 의존관계를 제거해 다른 경우에도 사용할 수 있게 되었다.

한 단계 더 개선을 위해서, `createQuery()` 를 보면 SQL 쿼리는 굳이 추상 메소드를 생성해 전달하지 않고 `JdbcTemplate` 의 `update()` 메소드 인자로 전달하는 것이 사용성 측면에서 좋아보인다. 

> 리팩토링 과정에서 컴파일 에러가 발생하지 않도록 하기 위해 기존 `update()` 메소드는 그대로 두고, 새로운 메소드를 추가한다.

```java
public abstract class JdbcTemplate {
    ...
    
    public void update2(String sql) throws SQLException {
        Connection con = null;
        PreparedStatement pstmt = null;

        try {
            con = ConnectionManager.getConnection();
            pstmt = con.prepareStatement(sql);
            setValues(pstmt);

            pstmt.executeUpdate();
        } finally {
            if (pstmt != null) {
                pstmt.close();
            }

            if (con != null) {
                con.close();
            }
        }
    }
    ...

}
```

- 이제 `update2()` 메소드를 사용하도록 변경한다. 이렇게 되면, `createQuery()` 추상 메소드는 이제 사용하지 않으므로 제거할 수 있다.
- `update2()` 메소드를 사용하도록 모든 변환을 마친 후에, 테스트 또한 정상적으로 수행된다면 `update()` 로 바꾼다.

### 🔧 SELECT 문에 대한 리팩토링
SELECT에 대해서도 앞의 과정과 유사하게 리팩토링을 진행할 수 있다. 다만, 조회한 데이터를 자바 객체로 변환하는 부분이 필요하다. 이를 `mapRow()` 라는 메소드를 추상 메소드로 추가해 구현한다.

```java
public abstract class SelectJdbcTemplate {
    public List select(String sql) throws SQLException {
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            con = ConnectionManager.getConnection();
            pstmt = con.prepareStatement(sql);
            setValues(pstmt);

            rs = pstmt.executeQuery();

            List<Object> result = new ArrayList<>();
            if (rs.next()) {
                result.add(mapRow(rs));
            }

            return result;
        } finally {
            if (rs != null) {
                rs.close();
            }
            if (pstmt != null) {
                pstmt.close();
            }
            if (con != null) {
                con.close();
            }
        }
    }
    
    public Object selectForObject(String sql) throws SQLException {
        List result = select(sql);
        if (result.isEmpty()) {
            return null;
        }
        return result.get(0);
    }

    public abstract void setValues(PreparedStatement pstmt) throws SQLException;
    
    public abstract Object mapRow(ResultSet rs) throws SQLException;
}
```

- `select` 는 여러 데이터를 조회한 경우(`UserDao` 의 `findAll()`)에 대한 구현이고, `selectForObject` 는 하나의 데이터를 조회한 경우(`UserDao` 의 `findById()`)에 대한 구현이다.
  - 하나의 데이터를 조회하는 경우 `select()` 를 활용하여 결과값 중 하나만 가져오는 형태로 구현하였다.
- `User` 객체에 종속되지 않고 다른 경우에도 사용할 수 있도록 하기 위해 `Object` 객체로 반환하도록 한다.

```java
public class UserDao {
    public List<User> findAll() throws SQLException {
        SelectJdbcTemplate selectJdbcTemplate = new SelectJdbcTemplate() {
            public void setValues(PreparedStatement pstmt) throws SQLException {
            }

            public Object mapRow(ResultSet rs) throws SQLException {
                return new User(rs.getString("userId"), rs.getString("password"), rs.getString("name"), rs.getString("email"));
            }
        };

        String sql = "SELECT userId, password, name, email FROM USERS";
        return (List<User>)selectJdbcTemplate.select(sql);
    }

    public User findByUserId(String userId) throws SQLException {
        SelectJdbcTemplate selectJdbcTemplate = new SelectJdbcTemplate() {
            public void setValues(PreparedStatement pstmt) throws SQLException {
                pstmt.setString(1, userId);
            }

            public Object mapRow(ResultSet rs) throws SQLException {
                return new User(rs.getString("userId"), rs.getString("password"), rs.getString("name"), rs.getString("email"));
            }
        };

        String sql = "SELECT userId, password, name, email FROM USERS WHERE userid=?";
        return (User)selectJdbcTemplate.selectForObject(sql);
    }
}
```

- `findAll()` 의 경우는 쿼리에 전달할 인자가 없으므로 추상 메소드의 구현을 비워두었다.

> 교재에서, `SelectJdbcTemplate` 의 각 메소드에 `@SuppressWarnings("rawtypes")` 라는 annotation이 있다. 없어도 테스트를 정상 수행하지만 알아보자면,
> **컴파일러가 정적분석을 진행할 때 오류가 아니라고 마킹하는 용도**라고 한다. 쉽게 말해 컴파일 경고를 없애준다. 그리고 `rawtypes` 의 의미는 원시 유형 사용법과 관련된 경고를 억제해주는 역할이라고 한다.

### 🔧 `JdbcTemplate` 과 `SelectJdbcTemplate` 통합
이제 모든 SQL에 대한 처리를 공통 라이브러리를 활용해 수행할 수 있다. 그런데 개발자 입장에서는 API 사용 시 여러 개의 클래스보다 클래스 하나를 제공하는 것이 더 좋을 것이다. 그래서 중복 코드가 존재하는 `JdbcTemplate` 과 `SelectJdbcTemplate` 을 하나로 통합하도록 한다.

```java
public abstract class JdbcTemplate {
    public void update(String sql) throws SQLException {
        Connection con = null;
        PreparedStatement pstmt = null;

        try {
            con = ConnectionManager.getConnection();
            pstmt = con.prepareStatement(sql);
            setValues(pstmt);

            pstmt.executeUpdate();
        } finally {
            if (pstmt != null) {
                pstmt.close();
            }

            if (con != null) {
                con.close();
            }
        }
    }

    public List select(String sql) throws SQLException {
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            con = ConnectionManager.getConnection();
            pstmt = con.prepareStatement(sql);
            setValues(pstmt);

            rs = pstmt.executeQuery();

            List<Object> result = new ArrayList<>();
            if (rs.next()) {
                result.add(mapRow(rs));
            }

            return result;
        } finally {
            if (rs != null) {
                rs.close();
            }
            if (pstmt != null) {
                pstmt.close();
            }
            if (con != null) {
                con.close();
            }
        }
    }

    public Object selectForObject(String sql) throws SQLException {
        List result = select(sql);
        if (result.isEmpty()) {
            return null;
        }
        return result.get(0);
    }

    public abstract void setValues(PreparedStatement pstmt) throws SQLException;

    public abstract Object mapRow(ResultSet rs) throws SQLException;
}
```

- `JdbcTemplate` 으로 통합하기 위해, `SelectJdbcTemplate` 의 메소드들을 이동시킨다.

```java
package next.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import core.jdbc.JdbcTemplate;
import next.model.User;

public class UserDao {
    public void insert(User user) throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate() {
            public void setValues(PreparedStatement pstmt) throws SQLException {
                ...

            }

            public Object mapRow(ResultSet rs) throws SQLException {
                return null;
            }
        };
        String sql = "INSERT INTO USERS VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql);
    }

    public void update(User user) throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate() {
            public void setValues(PreparedStatement pstmt) throws SQLException {
                ...

            }

            public Object mapRow(ResultSet rs) throws SQLException {
                return null;
            }
        };
        String sql = "UPDATE USERS SET password=?, name=?, email=? WHERE userId=?";
        jdbcTemplate.update(sql);
    }

    public List<User> findAll() throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate() {
            ...

        };

        String sql = "SELECT userId, password, name, email FROM USERS";
        return (List<User>)jdbcTemplate.select(sql);
    }

    public User findByUserId(String userId) throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate() {
            ...

        };

        String sql = "SELECT userId, password, name, email FROM USERS WHERE userid=?";
        return (User)jdbcTemplate.selectForObject(sql);
    }
}
```

- `UserDao` 에서, `insert()` 와 `update()` 도 `mapRow()` 에 대한 구현이 필요한데, 일단은 `null` 을 반환하도록 한다.

### 🔧 인터페이스 추가를 통한 문제점 해결
`UserDao` 의 `insert()` 와 `update()` 는 `mapRow()` 를 사용하지 않는데도, 구현해야 하는 문제가 생겼다. 이러한 원인은 **`JdbcTemplate` 의 추상 메소드의 변화 시점이 항상 같이 변화하도록 의존관계가 생겼기 때문**이다.
- 이를 해결하기 위해 `setValues()` 와 `mapRow()` 메소드를 분리해 서로간의 의존관계를 제거해야 한다.
  - 두 개의 추상 메소드를 같은 클래스가 가지도록 하지 않고, 각각의 추상 메소드를 인터페이스를 통해 분리하도록 한다.

```java
public interface PreparedStatementSetter {
    void setValues(PreparedStatement pstmt) throws SQLException;
}
```

```java
public interface RowMapper {
    Object mapRow(ResultSet rs) throws SQLException;
}
```

```java
public class JdbcTemplate {
    public void update(String sql, PreparedStatementSetter pss) throws SQLException {
        ...

        try {
            con = ConnectionManager.getConnection();
            pstmt = con.prepareStatement(sql);
            pss.setValues(pstmt);

            pstmt.executeUpdate();
        } finally {
            ...

        }
    }

    public List select(String sql, PreparedStatementSetter pss, RowMapper rowMapper) throws SQLException {
        ...

        try {
            con = ConnectionManager.getConnection();
            pstmt = con.prepareStatement(sql);
            pss.setValues(pstmt);

            rs = pstmt.executeQuery();

            List<Object> result = new ArrayList<>();
            if (rs.next()) {
                result.add(rowMapper.mapRow(rs));
            }

            return result;
        } finally {
            ...

        }
    }

    public Object selectForObject(String sql, PreparedStatementSetter pss, RowMapper rowMapper) throws SQLException {
        List result = select(sql, pss, rowMapper);
        ...

    }
}
```

```java
public class UserDao {
    public void insert(User user) throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        PreparedStatementSetter pss = new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement pstmt) throws SQLException {
                pstmt.setString(1, user.getUserId());
                pstmt.setString(2, user.getPassword());
                pstmt.setString(3, user.getName());
                pstmt.setString(4, user.getEmail());
            }
        };

        String sql = "INSERT INTO USERS VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, pss);
    }

    public void update(User user) throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        PreparedStatementSetter pss = new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement pstmt) throws SQLException {
                pstmt.setString(1, user.getPassword());
                pstmt.setString(2, user.getName());
                pstmt.setString(3, user.getEmail());
                pstmt.setString(4, user.getUserId());
            }
        };

        String sql = "UPDATE USERS SET password=?, name=?, email=? WHERE userId=?";
        jdbcTemplate.update(sql, pss);
    }

    public List<User> findAll() throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        PreparedStatementSetter pss = new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement pstmt) throws SQLException {

            }
        };

        RowMapper rowMapper = new RowMapper() {
            @Override
            public Object mapRow(ResultSet rs) throws SQLException {
                return new User(rs.getString("userId"), rs.getString("password"), rs.getString("name"),
                        rs.getString("email"));
            }
        };

        String sql = "SELECT userId, password, name, email FROM USERS";
        return (List<User>)jdbcTemplate.select(sql, pss, rowMapper);
    }

    public User findByUserId(String userId) throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        PreparedStatementSetter pss = new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement pstmt) throws SQLException {
                pstmt.setString(1, userId);
            }
        };
        RowMapper rowMapper = new RowMapper() {
            @Override
            public Object mapRow(ResultSet rs) throws SQLException {
                return new User(rs.getString("userId"), rs.getString("password"), rs.getString("name"),
                        rs.getString("email"));
            }
        };

        String sql = "SELECT userId, password, name, email FROM USERS WHERE userid=?";
        return (User)jdbcTemplate.selectForObject(sql, pss, rowMapper);
    }
}
```

- `setValues()` 와 `mapRow()` 추상 메소드를 인터페이스로 분리해 담당하므로, `JdbcTemplate` 은 더이상 추상 클래스일 필요가 없다.
- 메소드 하나만 가지는 인터페이스를 생성한 후 필요에 따라 메소드의 인자로 전달해 문제를 해결했다.
  - 변화 시점이 다른 부분을 서로 다른 인터페이스로 분리했고, 이렇게 사용한 인터페이스를 **콜백 인터페이스**라고 한다.

### 🔧 런타임 Exception 추가 및 AutoCloseable 활용한 자원 반환
또 다른 문제점 중 하나가 모든 메소드가 컴파일타임 Exception인 `SQLException` 을 `throw` 한다는 것이다. 런타임 Exception을 추가해 이 문제를 해결한다. 이를 위해 `RuntimeException` 을 상속하는 새로운 Exception을 추가한다.

```java
public class DataAccessException extends RuntimeException {
    public DataAccessException() {
        super();
    }

    public DataAccessException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }

    public DataAccessException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public DataAccessException(String msg) {
        super(msg);
    }

    public DataAccessException(Throwable cause) {
        super(cause);
    }
}
```

- 이제 생성한 `DataAccessException` 을 `JdbcTemplate` 에서 사용하게 함으로써, 더 이상 `SQLException` 을 처리하지 않도록 할 수 있다.

```java
public class JdbcTemplate {
    public void update(String sql, PreparedStatementSetter pss) throws DataAccessException {
        ...

        try {
            ...

        } catch (SQLException e) {
            throw new DataAccessException(e);
        } finally {
            if (pstmt != null) {
                try {
                    pstmt.close();
                } catch (SQLException e) {
                    throw new DataAccessException(e);
                }
            }

            if (con != null) {
                try {
                    con.close();
                } catch (SQLException e) {
                    throw new DataAccessException(e);
                }
            }
        }
    }

    public List select(String sql, PreparedStatementSetter pss, RowMapper rowMapper) throws DataAccessException {
        ...

        try {
            ...

        } catch (SQLException e) {
            throw new DataAccessException(e);
        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    throw new DataAccessException(e);
                }
            }
            if (pstmt != null) {
                try {
                    pstmt.close();
                } catch (SQLException e) {
                    throw new DataAccessException(e);
                }
            }
            if (con != null) {
                try {
                    con.close();
                } catch (SQLException e) {
                    throw new DataAccessException(e);
                }
            }
        }
    }
    ...

}
```

- 런타임 Exception으로 변경했지만, `finally` 절에서 자원 반환의 복잡도가 너무 높다. 
  - 이때 사용하는 `close()` 메소드에 대한 호출은 자바 7 버전부터 제공하는 `java.io.AutoCloseable` 인터페이스를 활용하여 해결할 수 있다.
  - 해당 인터페이스를 구현하는 클래스는 `try-with-resources` 구문을 활용해 자원을 자동으로 반납할 수 있다.

```java
public class JdbcTemplate {
    public void update(String sql, PreparedStatementSetter pss) throws DataAccessException {
        try (Connection conn = ConnectionManager.getConnection(); PreparedStatement pstmt = conn.prepareStatement(sql);) {
            pss.setValues(pstmt);

            pstmt.executeUpdate();
        } catch (SQLException e) {
            throw new DataAccessException(e);
        }
    }

    public List select(String sql, PreparedStatementSetter pss, RowMapper rowMapper) throws DataAccessException {
        try (Connection conn = ConnectionManager.getConnection(); PreparedStatement pstmt = conn.prepareStatement(sql);) {
            ResultSet rs = null;
            
            pss.setValues(pstmt);
            pss.setValues(pstmt);

            rs = pstmt.executeQuery();

            List<Object> result = new ArrayList<>();
            if (rs.next()) {
                result.add(rowMapper.mapRow(rs));
            }

            return result;
        } catch (SQLException e) {
            throw new DataAccessException(e);
        }
    }
    ...

}
```

- 위와 같이 `try` 구문 안에 사용할 자원을 추가하여 구현한다.
  - `try` 에 명시된 자원들은 코드가 `try` 를 벗어나는 경우 `try-with-resources` 가 `close` 를 호출한다.
  - 하지만 모든 자원에 대해 호출해주는 것은 아니고, `AutoCloseable` 을 구현하는 자원에 대해서만 가능하다.
  - 위에서는 `Connection` 과 `PreparedStatement` 가 이를 구현하고 있어 자원의 자동 반납이 가능하다.

```java
public interface Connection  extends Wrapper, AutoCloseable {...}

public interface PreparedStatement extends Statement {...}

public interface Statement extends Wrapper, AutoCloseable {...}
```

### 🔧 제너릭(`generic`)을 활용한 개선
`JdbcTemplate` 을 사용해보니, 데이터 조회 시 매번 캐스팅을 해야 된다. 이를 자바의 제너릭을 적용해 개선한다.

```java
public interface RowMapper<T> {
    T mapRow(ResultSet rs) throws SQLException;
}
```

- 자바의 제너릭 문법을 사용하도록 수정 후 `JdbcTemplate` 에도 제너릭 구문을 추가한다.

```java
public class JdbcTemplate {
    ...

    public <T> List<T> select(String sql, PreparedStatementSetter pss, RowMapper<T> rowMapper) throws DataAccessException {
        try (Connection conn = ConnectionManager.getConnection(); PreparedStatement pstmt = conn.prepareStatement(sql);) {
            ...

            List<T> result = new ArrayList<T>();
            if (rs.next()) {
                result.add(rowMapper.mapRow(rs));
            }

            return result;
        } catch (SQLException e) {
            throw new DataAccessException(e);
        }
    }

    public <T> T selectForObject(String sql, PreparedStatementSetter pss, RowMapper<T> rowMapper) throws SQLException {
        List<T> result = select(sql, pss, rowMapper);
        if (result.isEmpty()) {
            return null;
        }
        return result.get(0);
    }
}
```

- 제너릭을 사용하도록 하여 캐스팅 없이 데이터 조회가 가능하도록 한다.

```java
public class UserDao {
    ...

    public List<User> findAll() throws SQLException {
        ...

        RowMapper<User> rowMapper = new RowMapper<User>() {
            @Override
            public User mapRow(ResultSet rs) throws SQLException {
                return new User(rs.getString("userId"), rs.getString("password"), rs.getString("name"),
                        rs.getString("email"));
            }
        };
        ...

    }

    public User findByUserId(String userId) throws SQLException {
        ...

        RowMapper<User> rowMapper = new RowMapper<User>() {
            @Override
            public User mapRow(ResultSet rs) throws SQLException {
                return new User(rs.getString("userId"), rs.getString("password"), rs.getString("name"),
                        rs.getString("email"));
            }
        };
        ...

    }
}
```

> **제너릭**<br/>
> 데이터 형식에 의존하지 않고, 하나의 값이 여러 다른 데이터 타입들을 가질 수 있도록 하는 방법으로, 클래스 내부에서 지정하는 것이 아닌 외부에서 사용자에 의해 지정하는 것이다.

### 🔧 가변인자를 활용해 쿼리에 인자 전달하기
쿼리에 값 전달 시 `PreparedStatementSetter` 를 이용할 수도 있지만, 가변 인자를 활용할 수도 있다. 

```java
public class JdbcTemplate {
    public void update(String sql, Object... parameters) throws DataAccessException {
        try (Connection conn = ConnectionManager.getConnection(); PreparedStatement pstmt = conn.prepareStatement(sql);) {
            for (int i = 0; i < parameters.length; i++) {
                pstmt.setObject(i + 1, parameters[i]);
            }

            pstmt.executeUpdate();
        } catch (SQLException e) {
            throw new DataAccessException(e);
        }
    }
}
```

```java
public class UserDao {
    public void insert(User user) throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        String sql = "INSERT INTO USERS VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, user.getUserId(), user.getPassword(), user.getName(), user.getEmail());
    }

    public void update(User user) throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        String sql = "UPDATE USERS SET password=?, name=?, email=? WHERE userId=?";
        jdbcTemplate.update(sql, user.getPassword(), user.getName(), user.getEmail(), user.getUserId());
    }
}
```

- 가변 인자는 말 그대로 인자로 전달할 값의 개수가 동적으로 변경되는 경우 유용하다.

### 🔧 람다를 활용한 구현
한 단계 더 개선 된 리팩토링을 위해서는 자바 8 버전에서 추가된 **람다 표현식**을 사용할 수 있다. `UserDao` 에서 `RowMapper` 에 대한 익명 클래스를 생성하던 부분을 람다를 활용하여 깔끔하게 구현한다.

```java
public class UserDao {
    public List<User> findAll() throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        String sql = "SELECT userId, password, name, email FROM USERS";
        return (List<User>)jdbcTemplate.select(sql, (ResultSet rs) -> {
            return new User(rs.getString("userId"), rs.getString("password"), rs.getString("name"),
                    rs.getString("email"));
        });
    }

    public User findByUserId(String userId) throws SQLException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        String sql = "SELECT userId, password, name, email FROM USERS WHERE userid=?";
        return (User)jdbcTemplate.selectForObject(sql, (ResultSet rs) -> {
            return new User(rs.getString("userId"), rs.getString("password"), rs.getString("name"), rs.getString("email"));
        }, userId);
    }
}
```

- 람다 사용 전에는 `RowMapper` 에 대한 익명 클래스를 만들어 전달했지만 람다를 사용할 경우 메소드에 전달할 인자와 메소드 구현부만 구현해 위와 같이 전달한다.
  - 람다 사용을 위해서는 `RowMapper` 와 같이 인터페이스의 메소드가 하나만 존재해야 한다. (`mapRow()`)
  - 람다 표현식으로 사용할 인터페이스라고 지정하려면, `@FunctionalInterface` annotation을 추가한다.

```java
@FunctionalInterface
public interface RowMapper<T> {
    T mapRow(ResultSet rs) throws SQLException;
}
```

## 📕 출처
- **자바 웹 프로그래밍 Next Step : 하나씩 벗겨가는 양파껍질 학습법** - 박재성
- [익명 클래스](https://codechacha.com/ko/java-anonymous-class/)
- [try-with-resources](https://velog.io/@sa1341/AutoCloseable-%ED%81%B4%EB%9E%98%EC%8A%A4)
- [제너릭](https://st-lab.tistory.com/153)
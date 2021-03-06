---
title: "π 7μ₯ DBλ₯Ό νμ©ν΄ λ°μ΄ν°λ₯Ό μκ΅¬μ μΌλ‘ μ μ₯νκΈ°"
description: "μλ° μΉ νλ‘κ·Έλλ° μ± μ λ¦¬"
date: 2022-02-10
update: 2022-02-10
tags:
  - Java
  - Refactoring
  - Framework
series: "π μλ° μΉ νλ‘κ·Έλλ° Next Step"
---

<em>[μλ° μΉ νλ‘κ·Έλλ° Next Step - λ°μ¬μ±]μ μ½κ³  μΈμ©νκ³  μ λ¦¬νλ POSTμλλ€.</em>

> μ¬μ©μκ° μλ ₯ν λ°μ΄ν°κ° μλ²λ₯Ό μ¬μμν΄λ μ¬λΌμ§μ§ μλλ‘ λ°μ΄ν°λ² μ΄μ€ μλ²λ₯Ό λμν΄ μκ΅¬μ μΌλ‘ μ μ₯νκ³  μ‘°ννλλ‘ νλ€.

**JDBC**<br/>
: μλ° μ§μμ΄ DBμμ ν΅μ μ λ΄λΉνκ³  μ§μνλλ‘ μ¬μ©νλ νμ€

JDKμμ μ κ³΅νλ `java.sql` ν¨ν€μ§μ JDBC μμ€μ½λλ₯Ό λ³΄λ©΄, κ΅¬ν μ½λλ κ±°μ μκ³ , μΈν°νμ΄μ€λ§μ μ μν΄ μ κ³΅νλ€. μ¦ JDBCλ **ν΅μ μ μν κ·μ½λ§ μ μ**νκ³ , μ΄μ λν **κ΅¬νμ²΄λ DBλ₯Ό λ§λ€μ΄ μλΉμ€νλ νμ¬κ° μ κ³΅**νλλ‘ νλ€.

μλΈλ¦Ώ λν μΈν°νμ΄μ€λ§ μ μνκ³  μλΈλ¦Ώ μ»¨νμ΄λλ₯Ό λ§λ€μ΄ μ κ³΅νλ νμ¬κ° κ΅¬νμ²΄λ₯Ό μ κ³΅νλ€.

> νμ€λ§ μ μν¨μΌλ‘μ¨, DBμ λν μ°κ²° μ€μ λ§ λ³κ²½ν΄ λ€λ₯Έ DBλ₯Ό μ§μνμ¬ μμ€μ½λμ λ³κ²½μ μ΅μννλ€.

## π© νμ λ°μ΄ν°λ₯Ό DBμ μ μ₯νκΈ° μ€μ΅
κ²½λ λ°μ΄ν°λ² μ΄μ€ μ€ νλμΈ **H2 λ°μ΄ν°λ² μ΄μ€**λ₯Ό μ¬μ©νμ¬ μ€μ΅μ μ§ννλ€.
(https://github.com/slipp/jwp-basic μ step2-user-with-mvc-framework)

### π§ μ€μ΅ μ½λ λ¦¬λ·° λ° JDBC λ³΅μ΅
μλ²κ° μμνλ μμ μ νμ μ λ³΄λ₯Ό μ μ₯ν  νμ΄λΈμ μ΄κΈ°ννλ€. (`jwp.sql` νμΌμ νμ΄λΈ μμ±λ¬Έμ΄ μλ€.) ν΄λΉ sqlνμΌμ ν°μΊ£ μλ²κ° μμν  λ μ΄κΈ°ννλλ‘ `ContextLoaderListener` ν΄λμ€μ κ΅¬νλμ΄ μλ€.

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

- sql νμΌμ μ½μ΄ DBμ λν μ΄κΈ°ν μμμ μν΄ μ€νλ§ νλ μμν¬μμ μ κ³΅νλ κΈ°λ₯μ νμ©νλ€.
- ν°μΊ£ μλ²κ° μμν  λ `contextInitialized()` λ©μλλ₯Ό νΈμΆν¨μΌλ‘μ¨ μ΄κΈ°ν μμμ μννλ€.
  - `ContextLoaderListener` κ° `ServletContextListener` μΈν°νμ΄μ€λ₯Ό μμλ°μ κ΅¬ννκ³ , `@WebListener` annotationμ΄ μκΈ° λλ¬Έμ΄λ€.
  - μλΈλ¦Ώ μ»¨νμ΄λλ μμνλ κ³Όμ μμ `ServletContextListener` μΈν°νμ΄μ€ κ΅¬νμ²΄ μ€ ν΄λΉ annotationμ΄ μλ κ΅¬νμ²΄μ `contextInitialized()` λ©μλλ₯Ό νΈμΆν΄ μ΄κΈ°ν μμμ μ§ννλ€.
- `ServletContextListener` μ λν μ΄κΈ°νλ μλΈλ¦Ώ μ΄κΈ°νλ³΄λ€ λ¨Όμ  μ§νλλ€. μλΈλ¦Ώ μ΄κΈ°νκ° ν΄λΉ μλΈλ¦Ώκ³Ό κ΄λ ¨ν μ΄κΈ°νλ₯Ό λ΄λΉνλ€λ©΄, `ServletContextListener` μ΄κΈ°νλ μΉ μ νλ¦¬μΌμ΄μ μ μ²΄μ μν₯μ λ―ΈμΉλ μ΄κΈ°νκ° νμν κ²½μ° νμ©νλ€.

`next.dao` ν¨ν€μ§μ `UserDao` ν΄λμ€λ₯Ό ν΅ν΄ DB μ κ·Ό λ‘μ§μ κ΅¬ννλ€. μλ° μ§μμ **DBμ λν μ κ·Ό λ‘μ§ μ²λ¦¬λ₯Ό λ΄λΉνλ κ°μ²΄λ₯Ό λ³λλ‘ λΆλ¦¬ν΄ κ΅¬ν**νλ κ²μ μΆμ²νκ³ , μ΄ κ°μ²΄λ₯Ό **DAO(Data Access Object)**λΌκ³  νλ€.

νμ¬λ `insert`, `findByUserId` κΈ°λ₯λ§ κ΅¬νλμ΄ μλ€. κΈ°μ‘΄μ `DataBase` ν΄λμ€λ₯Ό μ¬μ©νλ μ½λ(ex. `DataBase.addUser`)λ₯Ό `UserDao` λ₯Ό μ¬μ©νλλ‘ λ³κ²½νλ€.

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

- λ€λ₯Έ κΈ°λ₯λ€λ μμ κ°μ λ°©μμΌλ‘ λ³κ²½ν  μ μλλ°, ν κ°μ§ λΆνΈν μ μ΄ μλ€.
  - `UserDao` μ λͺ¨λ  λ©μλκ° `SQLException` μ `throw` νκ³  μκΈ°μ μ»΄νμΌ μλ¬ λ°©μ§λ₯Ό μν΄ `try - catch` κ΅¬λ¬ΈμΌλ‘ κ°μΈμ€μΌ νλ€.

### π§ νμ λͺ©λ‘ μ€μ΅
`UserDao` λ νμ μ μ²΄ λͺ©λ‘μ μ‘°ννλ `findAll()` λ©μλλ₯Ό κ΅¬ννλ€.

### π§ κ°μΈμ λ³΄ μμ  μ€μ΅
`UPDATE` SQLλ¬Έμ νμ©ν΄ κ°μΈμ λ³΄λ₯Ό μμ ν  μ μλ κΈ°λ₯μ μΆκ°νκ³  μ»¨νΈλ‘€λ¬κ° μΆκ°ν λ©μλλ₯Ό μ¬μ©νλλ‘ λ¦¬ν©ν λ§νλ€.

---

## π© DAO λ¦¬ν©ν λ§ μ€μ΅
`UserDao` μλ λ§μ μ€λ³΅ μ½λκ° λ°μνλ€. μλ μ€λ³΅ μμλ€μ κ³΅ν΅ λΌμ΄λΈλ¬λ¦¬λ‘ λ§λ€μ΄ μ€λ³΅μ μ κ±°ν  μ μλ€.
- `Connection` κ΄λ¦¬
- `Statement` κ΄λ¦¬
- `ResultSet` κ΄λ¦¬
- νλΌλ―Έν° Setting
- νΈλμ­μ κ΄λ¦¬

**`SQLException` μ λν μ²λ¦¬**<br/>
`UserDao` λ¦¬ν©ν λ§ μ κ³ λ €ν΄μΌ ν  μ¬ν­ μ€ νλμ΄λ€. μ΄λ **μ»΄νμΌνμ Exception** μ΄λ―λ‘, λ§€λ² `try - catch` μ μ ν΅ν΄ μμΈ μ²λ¦¬λ₯Ό μνν΄μΌ νλ€. νμ§λ§ μ΄ μμΈλ₯Ό catchν΄λ λ‘κ·Έλ₯Ό λ¨κΈ°λ κ²μΈμ λ³λ€λ₯Έ μ²λ¦¬κ° λ μ€λ₯΄μ§ μλλ€. 

> μλ°μ μ²« λ±μ₯ μ, νΉν **μ»΄νμΌνμ Exception**μ μμΈ μ²λ¦¬λ₯Ό μ»΄νμΌ μμ μ ν  μ μλ€λ μ₯μ μΌλ‘ λ§μ΄ νμ©λμλ€. νμ§λ§ λλ¬΄ λ¬΄λΆλ³νκ² μ¬μ©λμ΄ λΆνμνκ² `try - catch` μ λ‘ κ°μΈμΌ νλ©°, μμ€μ½λμ κ°λμ±μ λ¨μ΄λ¨λ¦¬λ μ£Όλ²μ΄ λκ³  μλ€. (`expert one-on-one J2EE μ€κ³μ κ°λ°` μ±μμ μ»΄νμΌνμ, λ°νμ Exceptionμ λν κ°μ΄λλΌμΈμ μ μνλ€.)
> ν΄λΉ κ°μ΄λλΌμΈμ μ°Έκ³ νμ¬, λλΆλΆμ κ²½μ° λ°νμ Exceptionμ μ¬μ©νλλ‘ νλ€.

μ κΈ°μ€μΌλ‘ νλ¨νμ λ, μ»΄νμΌνμ Exceptionμ μλͺ» μ¬μ©ν μκ° JDBCμ `SQLException` μ΄λ€. λ°λΌμ JDBCμ λν κ³΅ν΅ λΌμ΄λΈλ¬λ¦¬λ₯Ό λ§λλ κ³Όμ μμ `SQLException` μ **λ°νμ Exception**μΌλ‘ λ³νν΄ μμ€μ½λμ κ°λμ±μ λ¨μ΄λ¨λ¦¬μ§ μλλ‘ νλ€.

### π§ μκ΅¬μ¬ν­
JDBCμ λν κ³΅ν΅ λΌμ΄λΈλ¬λ¦¬λ₯Ό λ§λ€μ΄ κ°λ°μκ° "SQL μΏΌλ¦¬, μΏΌλ¦¬μ μ λ¬ν  μΈμ, SELECT κ΅¬λ¬Έμ κ²½μ° μ‘°νν λ°μ΄ν° μΆμΆ" κ΅¬νμλ§ μ§μ€νλλ‘ νλ€. λν `SQLException` μ λ°νμ ExceptionμΌλ‘ λ³ννλλ‘ νλ€.

### π§ μκ΅¬μ¬ν­ λΆλ¦¬ λ° ννΈ
- INSERT, UPDATE μΏΌλ¦¬λ λΉμ·νκΈ°μ ν΄λΉ λ©μλλ€μ μ€λ³΅ μ κ±° μμμ μ§ννλ€.
  - `setValuesForInsert(User, PreparedStatement)`
  - `createQueryForInsert()`
  - `setValuesForUpdate(User, PreparedStatement)`
  - `createQueryForUpdate()`
- λΆλ¦¬ν λ©μλ μ€ λ³νκ° λ°μνμ§ μλ λΆλΆ(κ³΅ν΅ λΌμ΄λΈλ¬λ¦¬λ‘ κ΅¬νν  μ½λ)μ μλ‘μ΄ ν΄λμ€λ‘ μΆκ°ν ν μ΄λνλ€.
  - `insert()` μ `update()` λ©μλλ³λ‘ `InsertJdbcTemplate`, `UpdateJdbcTemplate` κ³Ό κ°μ΄ μλ‘μ΄ ν΄λμ€λ₯Ό μΆκ°ν ν ν΄λΉ λ©μλ μ½λλ€μ μ΄λνλ€.
  - μ΄λ μ, μΈμλ‘ `UserDao` λ₯Ό μ λ¬νλ€. μμμ μΆμΆν λ©μλκ° `private` μ κ·Ό μ μ΄μλΌλ©΄ `default` μ κ·Ό μ μ΄μλ‘ λ¦¬ν©ν λ§νλ€.
  - `UserDao` μ `insert()` κ° `InsertJdbcTemplate` μ `insert()` , `update()` κ° `UpdateJdbcTemplate` μ `update()` λ©μλλ₯Ό νΈμΆνλλ‘ λ¦¬ν©ν λ§νλ€.
- `InsertJdbcTemplate` , `UpdateJdbcTemplate` μ΄ `UserDao` μ λν μμ‘΄κ΄κ³λ₯Ό κ°μ§λ€. μ΄λ₯Ό μ κ±°νλ€.
  - μμ‘΄κ΄κ³λ₯Ό κ°μ§λ μ΄μ λ `setValueFor...()`, `createQueryFor...())` λλ¬Έμ΄λ€. μ΄ λ λ©μλλ₯Ό μΆμ λ©μλλ‘ κ΅¬ννκ³  `UserDao` μ `insert(), update()` λ©μλμμ 2κ°μ μΆμ λ©μλλ₯Ό κ΅¬ννλ€. κ΅¬νμ **μ΅λͺ ν΄λμ€λ‘ κ΅¬ν**νλ€.
  > **μ΅λͺ ν΄λμ€**<br/>
  > : Inner classλ‘, μ΄λ¦μ΄ μλ ν΄λμ€μ΄λ€. ν΄λμ€ μ μμ λμμ κ°μ²΄λ₯Ό μμ±ν  μ μκ³  μΈν°νμ΄μ€μ ν΄λμ€ λͺ¨λ μ΅λͺ ν΄λμ€λ‘ κ°μ²΄λ₯Ό μμ±ν  μ μλ€.
  > μ΄λ νλ‘κ·Έλ¨ λ΄μμ νλ²λ§ κ°μ²΄λ‘ λ§λλλ° μ¬μ©λλ ν΄λμ€λ₯Ό κ΅³μ΄ μ μν  νμκ° μκΈ° λλ¬Έμ μ¬μ©νκ³ , `Runnable` μ΄λ `Event Listener` κ°μ²΄λ₯Ό μμ±νλλ° μ£Όλ‘ μ¬μ©λλ€.
- `InsertJdbcTemplate` κ³Ό `UpdateJdbcTemplate` μ κ΅¬ν λΆλΆμ΄ λ€λ₯΄μ§ μλ€. νλλ§ μ¬μ©νλλ‘ λ¦¬ν©ν λ§νλ€. 
  - ν΄λΉ ν΄λμ€λ€μ λ©μλλ₯Ό `setValues()` μ `createQuery()` λ‘ Renameνκ³  ν ν΄λμ€λ§ μ¬μ©νλλ‘ λ¦¬ν©ν λ§νλ€.
- `JdbcTemplate` μ μμ§λ `User` μ μμ‘΄κ΄κ³λ₯Ό κ°μ§λ―λ‘, λ€λ₯Έ `DAO` ν΄λμ€μμ μ¬μ¬μ©ν  μ μλ€. λ°λΌμ μμ‘΄κ΄κ³λ₯Ό μ κ±°νλ€.
  - `User` κ°μ `UserDao` μμλ§ μ¬μ©λκΈ°μ `JdbcTemplate` μ `update()` λ©μλμ κ΅³μ΄ μ λ¬ν  νμκ° μλ€.
  - SQL μΏΌλ¦¬μ κ°μ΄ λ³κ²½λλ λΆλΆμ μΆμ λ©μλκ° μλ λ©μλμ μΈμλ‘ μ λ¬νλ€.
- μμ κ°μ λ°©μμΌλ‘ `SelectJdbcTemplate` μ μμ±ν΄ λ°λ³΅ μ½λλ₯Ό λΆλ¦¬νλ€.
  - `ResultSet` λ°μ΄ν°λ₯Ό μλ° κ°μ²΄λ‘ λ³ννλ λΆλΆμ μΆκ°νλ€.
  - `setValues()` μ `mapRow()` λ©μλμ κ°μ 2κ°μ μΆμ λ©μλλ₯Ό κ°μ ΈμΌ νλ€. `mapRow()` λ©μλμ λ°ν κ°μ `Object` μ¬μΌ νλ€.
- `JdbcTemplate` μ `SelectJdbcTemplate` μ μ€λ³΅ μ½λκ° μμ΄, ν κ°μ ν΄λμ€λ‘ λ¦¬ν©ν λ§ν΄ ν΄λμ€ νλμμ λͺ¨λ  μμμ νλλ‘ νλ€.
- ν΅ν©νμ κ²½μ°, SELECTκ° μλ λ€λ₯Έ μΏΌλ¦¬λ€μ΄ λΆνμν `mapRow()` λ©μλλ₯Ό λ°λμ κ΅¬νν΄μΌ νλ€. `setValues()` , `mapRow()` 2κ°μ λ©μλλ₯Ό λΆλ¦¬ν΄ λλ¦½μ μΌλ‘ μ λ¬ν  μ μλλ‘ νλ€.
  - μΈν°νμ΄μ€λ₯Ό μΆκ°ν΄ μΈμλ‘ μ λ¬νλλ‘ λ¦¬ν©ν λ§νλ€.
- `SQLException` μ λ°νμ ExceptionμΌλ‘ λ³νν΄ `throw` νλλ‘ νλ€. κ·Έλ¦¬κ³  μ¬μ©ν μμμ λ°λ©μ `close()` λ©μλκ° μλ `try-with-resources` κ΅¬λ¬ΈμΌλ‘ ν΄κ²°νλ€.
  - `RuntimeException` μ μμνλ μ»€μ€ν Exceptionμ μΆκ°νκ³  `SQLException` μ μλ‘ μΆκ°ν μ»€μ€ν Exceptionμ λ³νν΄ `throw` νλλ‘ κ΅¬ννλ€.
- SELECT μΏΌλ¦¬μ κ²½μ° μ‘°νν λ°μ΄ν°λ₯Ό μΊμ€ννλ λΆλΆμ΄ μλλ° μ΄λ₯Ό μΊμ€ννμ§ μλλ‘ κ°μ νλ€.
  - `RowMapper`(`mapRow()` μ μΈν°νμ΄μ€)μ μλ° μ λλ¦­μ μ μ©ν΄ κ³΅ν΅ λΌμ΄λΈλ¬λ¦¬λ₯Ό κ°μ νλ€.
- κ° μΏΌλ¦¬μ μ λ¬ν  μΈμλ₯Ό μλ°μ κ°λ³μΈμλ₯Ό ν΅ν΄ μ λ¬ν  μ μλ λ©μλλ₯Ό μΆκ°νλ€.
  - κ°λ³μΈμ λ¬Έλ²μΌλ‘ μΈμλ₯Ό λμ μΌλ‘ μ λ¬νλ€. (`void update(String sql, Object ... values)`)
  - `PreparedStatement` μ κ° μ λ¬ μ `setObject()` λ©μλλ₯Ό νμ©νλ€.
- `PreparedStatementSetter`, `RowMapper` μΈν°νμ΄μ€λ₯Ό κ΅¬ννλ λΆλΆμ **λλ€ ννμ**μ νμ©νλλ‘ λ¦¬ν©ν λ§νλ€.

---

## π© DAO λ¦¬ν©ν λ§ λ° μ€λͺ
### π§ λ©μλ λΆλ¦¬
μ€λ³΅ μ½λλ₯Ό μ κ±°νκΈ° μν΄ **Extract Method λ¦¬ν©ν λ§**μ ν΅ν΄ λ©μλλ₯Ό λΆλ¦¬νλ€. κ°λ°μκ° DB μ κ·Ό λ‘μ§μ κ΅¬νν  λ λ§€λ² κ΅¬νν΄μΌ νλ λΆλΆκ³Ό κ·Έλ μ§ μμ λΆλΆμ κΈ°μ€μΌλ‘ λ©μλλ₯Ό λΆλ¦¬νλ€. 

λ¨Όμ  `insert()` μ `update()` λ©μλλ₯Ό λ€μκ³Ό κ°μ΄ `setValuesFor...()` & `createQueryFor...()` λ‘ λΆλ¦¬νλ€.

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

### π§ ν΄λμ€ λΆλ¦¬
λ©μλλ₯Ό λΆλ¦¬νλ κ³΅ν΅ λΌμ΄λΈλ¬λ¦¬λ‘ κ΅¬νν  λΆλΆ(`insert()` λ©μλ)κ³Ό κ°λ°μκ° λ§€λ² κ΅¬νν΄μΌ ν  λΆλΆ(`createQueryFor...()`, `setValuesFor...()` λ©μλ)μ΄ λλ μ§λ κ²μ νμΈν  μ μλ€. κ³΅ν΅ λΌμ΄λΈλ¬λ¦¬λ‘ κ΅¬νν  λΆλΆμ μλ‘μ΄ ν΄λμ€(`InsertJdbcTemplate`)λ‘ μ΄λνλ€. μ΄ν, `UserDao` μ `insert()` λ©μλλ₯Ό μ ν΄λμ€λ‘ μ΄λνλ€.

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

- μλ‘ μμ±ν `InsertJdbcTemplate` μλ `createQueryForInsert()` μ `setValuesForInsert()` κ° μμΌλ―λ‘, μ»΄νμΌ μλ¬κ° λ°μνλ€.
  - `UserDao` μΈμ€ν΄μ€λ₯Ό μΈμλ‘ μ λ¬ν΄ λ©μλ νΈμΆμ΄ κ°λ₯νκ² νλ€.
- `UserDao` μ `insert()` λ©μλκ° `InsertJdbcTemplate` μ `insert()` λ©μλλ₯Ό νΈμΆνλλ‘ λ³κ²½νκ³ , `createQueryForInsert()` , `setValuesForInsert()` λ©μλλ `InsertJdbcTemplate` μ `insert()` λ©μλκ° μ κ·Ό κ°λ₯νλλ‘ `default` μ κ·Ό μ μ΄μλ‘ λ³κ²½νλ€.
  - `insert()` νΈμΆ μ νμν `UserDao` λ νμ¬ μκΈ° μμ μ΄λ―λ‘ `this` λ‘ μ λ¬ν  μ μλ€.
  - κ·Έλ°λ°, `InsertJdbcTemplate` μ΄ `UserDao` μ λ€λ₯Έ ν¨ν€μ§μ μ‘΄μ¬νλ€λ©΄, μ κ·Ό μ μ΄μλ₯Ό `public` μΌλ‘ ν΄μΌνλ€.

`update()` λ©μλλ λμΌνκ² μ§ννλ€.

### π§ `UserDAO` μ `InsertJdbcTemplate` μ μμ‘΄κ΄κ³ λΆλ¦¬
μλ‘ μΆκ°ν `...JdbcTemplate` μ `UserDao` μ μμ‘΄κ΄κ³λ₯Ό κ°μ Έ `UserDao` κ° μλ λ€λ₯Έ κ³³μμλ μ¬μ©ν  μ μλ€. λ°λΌμ μμ‘΄κ΄κ³λ₯Ό μ κ±°ν΄μΌ νλ€.

μ΄λ₯Ό μν΄μλ `createQueryFor...()` μ `setValuesFor...()` λ©μλκ° `...JdbcTemplate` μ μ‘΄μ¬νλλ‘ ν΄μΌ νλ€.
- νμ§λ§ `...JdbcTemplate` κ° μλ `UserDao` κ° λ©μλμ κ΅¬νμ λ΄λΉν΄μΌ νλ―λ‘, λ κ°μ λ©μλλ₯Ό μΆμ λ©μλλ‘ κ΅¬ννκ³ , `...JdbcTemplate` μ μΆμ ν΄λμ€λ‘ λ³κ²½νλ€. (μ΄λ‘μ¨, μμ‘΄κ΄κ³λ₯Ό μ κ±°ν΄ μ»΄νμΌ μλ¬λ₯Ό λ°©μ§ν  μ μλ€.)

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

- λ¨Όμ  `...JdbcTemplate` μ μΆμ ν΄λμ€λ‘ κ΅¬ννκ³ , μ¬μ©νλ λ©μλλ€μ μΆμ λ©μλλ‘ κ΅¬ννκ² λλ©΄, `UserDao` μμλ ν΄λΉ μΆμ λ©μλλ€μ λν κ΅¬νμ΄ μμ΄ `...JdbcTemplate` μΈμ€ν΄μ€λ₯Ό μμ±ν  μ μλ€.
  - μΆμ λ©μλλ₯Ό κ΅¬ννλ λ°©λ²μ μλμ λ°©λ²μ΄ μλ€.
    - `...JdbcTemplate` μ μμνλ μλ‘μ΄ ν΄λμ€λ₯Ό μΆκ°
    - μ΅λͺ ν΄λμ€λ₯Ό μΆκ°
  - `...JdbcTemplate` μΈμ€ν΄μ€λ₯Ό μμ±ν  λλ§ μ¬μ©νκΈ°μ **μ΅λͺ ν΄λμ€λ₯Ό μΆκ°νλ λ°©μ**μΌλ‘ κ΅¬ννλ€.

> λ°λ³΅μ μΌλ‘ λ°μνλ μ€λ³΅ λ‘μ§μ μμ ν΄λμ€κ° κ΅¬ννκ³  λ³νκ° λ°μνλ λΆλΆλ§ μΆμ λ©μλλ‘ λ§λ€μ΄ κ΅¬ννλ λμμΈ ν¨ν΄μ **"ννλ¦Ώ λ©μλ ν¨ν΄"** μ΄λΌκ³  νλ€.

`update()` λ©μλλ λμΌνκ² μ§ννλ€.

### π§ `InsertJdbcTemplate` κ³Ό `UpdateJdbcTemplate` ν΅ν©
κ³΅ν΅ λΌμ΄λΈλ¬λ¦¬λ₯Ό λ΄λΉν  ν΄λμ€λ₯Ό λΆλ¦¬νλ `InsertJdbcTemplate` μ `insert()` μ `UpdateJdbcTemplate` μ `update()` μ κ΅¬νμ΄ λ€λ₯΄μ§ μμμ νμΈν  μ μλ€. κ΅³μ΄ λ ν΄λμ€λ‘ λΆλ¦¬ν  νμκ° μλ€λ μλ―Έμ΄λ―λ‘, `JdbcTemplate` μ΄λΌλ ν΄λμ€λ‘ ν©μΉκ³  `update()` λ©μλ νλλ₯Ό μ¬μ©νλλ‘ λ³κ²½νλ€.

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

- `InsertJdbcTemplate` κ³Ό `UpdateJdbcTemplate` μ νλμ ν΄λμ€λ‘ ν©ν ν, λ©μλ μ΄λ¦ λν λ³κ²½νλ€.
- κ·Έλ¦¬κ³ , `UserDao` μ `insert()` μ `update()` κ° μ ν΄λμ€λ₯Ό μ¬μ©νλλ‘ λ³κ²½νλ€.

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

### π§ `User` μμ‘΄κ΄κ³ μ κ±° λ° SQL μΏΌλ¦¬ μΈμλ‘ μ λ¬
μμ§λ `JdbcTemplate` μ `User` μ λν μμ‘΄κ΄κ³κ° λ¨μμλ€. μ΄λ κ² λλ©΄, μ μ½λλ€μ Postλ λ€λ₯Έ DBμ μ κ·Όν΄ μΏΌλ¦¬λ₯Ό λ λ €μΌ νλ κ²½μ°μλ `JdbcTemplate` μ μ¬μ©ν  μ μλ€λ κ²μ΄λ€. κ·Έλ°λ°, `JdbcTemplate` μ `update()` λ₯Ό λ³΄λ©΄, `setValues()` λ©μλλ₯Ό ν΅ν΄ `User` μΈμλ₯Ό μ λ¬νμ§ μκ³  `UserDao` μ `insert()` , `update()` λ©μλμ `User` μΈμ€ν΄μ€μ μ§μ  μ κ·Όνλλ‘ λ¦¬ν©ν λ§νμ¬ ν΄λΉ μμ‘΄κ΄κ³λ₯Ό μ κ±°ν  μ μμ κ² κ°λ€.
- `UserDao` μμ `User` κ°μ²΄λ₯Ό `JdbcTemplate` μΌλ‘ μ λ¬νκ³ , μ΄λ₯Ό λ€μ `UserDao` λ‘ μ λ¬νμ¬ μμμ μ²λ¦¬νκ³  μλ λΆνμν μν©μ΄λ€.

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

- μ΄μ  `JdbcTemplate` μμλ `User` κ°μ²΄λ₯Ό μ§μ μ μΌλ‘ μ¬μ©νμ§ μλλ€. μ΄λ κ² μμ‘΄κ΄κ³λ₯Ό μ κ±°ν΄ λ€λ₯Έ κ²½μ°μλ μ¬μ©ν  μ μκ² λμλ€.

ν λ¨κ³ λ κ°μ μ μν΄μ, `createQuery()` λ₯Ό λ³΄λ©΄ SQL μΏΌλ¦¬λ κ΅³μ΄ μΆμ λ©μλλ₯Ό μμ±ν΄ μ λ¬νμ§ μκ³  `JdbcTemplate` μ `update()` λ©μλ μΈμλ‘ μ λ¬νλ κ²μ΄ μ¬μ©μ± μΈ‘λ©΄μμ μ’μλ³΄μΈλ€. 

> λ¦¬ν©ν λ§ κ³Όμ μμ μ»΄νμΌ μλ¬κ° λ°μνμ§ μλλ‘ νκΈ° μν΄ κΈ°μ‘΄ `update()` λ©μλλ κ·Έλλ‘ λκ³ , μλ‘μ΄ λ©μλλ₯Ό μΆκ°νλ€.

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

- μ΄μ  `update2()` λ©μλλ₯Ό μ¬μ©νλλ‘ λ³κ²½νλ€. μ΄λ κ² λλ©΄, `createQuery()` μΆμ λ©μλλ μ΄μ  μ¬μ©νμ§ μμΌλ―λ‘ μ κ±°ν  μ μλ€.
- `update2()` λ©μλλ₯Ό μ¬μ©νλλ‘ λͺ¨λ  λ³νμ λ§μΉ νμ, νμ€νΈ λν μ μμ μΌλ‘ μνλλ€λ©΄ `update()` λ‘ λ°κΎΌλ€.

### π§ SELECT λ¬Έμ λν λ¦¬ν©ν λ§
SELECTμ λν΄μλ μμ κ³Όμ κ³Ό μ μ¬νκ² λ¦¬ν©ν λ§μ μ§νν  μ μλ€. λ€λ§, μ‘°νν λ°μ΄ν°λ₯Ό μλ° κ°μ²΄λ‘ λ³ννλ λΆλΆμ΄ νμνλ€. μ΄λ₯Ό `mapRow()` λΌλ λ©μλλ₯Ό μΆμ λ©μλλ‘ μΆκ°ν΄ κ΅¬ννλ€.

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

- `select` λ μ¬λ¬ λ°μ΄ν°λ₯Ό μ‘°νν κ²½μ°(`UserDao` μ `findAll()`)μ λν κ΅¬νμ΄κ³ , `selectForObject` λ νλμ λ°μ΄ν°λ₯Ό μ‘°νν κ²½μ°(`UserDao` μ `findById()`)μ λν κ΅¬νμ΄λ€.
  - νλμ λ°μ΄ν°λ₯Ό μ‘°ννλ κ²½μ° `select()` λ₯Ό νμ©νμ¬ κ²°κ³Όκ° μ€ νλλ§ κ°μ Έμ€λ ννλ‘ κ΅¬ννμλ€.
- `User` κ°μ²΄μ μ’μλμ§ μκ³  λ€λ₯Έ κ²½μ°μλ μ¬μ©ν  μ μλλ‘ νκΈ° μν΄ `Object` κ°μ²΄λ‘ λ°ννλλ‘ νλ€.

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

- `findAll()` μ κ²½μ°λ μΏΌλ¦¬μ μ λ¬ν  μΈμκ° μμΌλ―λ‘ μΆμ λ©μλμ κ΅¬νμ λΉμλμλ€.

> κ΅μ¬μμ, `SelectJdbcTemplate` μ κ° λ©μλμ `@SuppressWarnings("rawtypes")` λΌλ annotationμ΄ μλ€. μμ΄λ νμ€νΈλ₯Ό μ μ μννμ§λ§ μμλ³΄μλ©΄,
> **μ»΄νμΌλ¬κ° μ μ λΆμμ μ§νν  λ μ€λ₯κ° μλλΌκ³  λ§νΉνλ μ©λ**λΌκ³  νλ€. μ½κ² λ§ν΄ μ»΄νμΌ κ²½κ³ λ₯Ό μμ μ€λ€. κ·Έλ¦¬κ³  `rawtypes` μ μλ―Έλ μμ μ ν μ¬μ©λ²κ³Ό κ΄λ ¨λ κ²½κ³ λ₯Ό μ΅μ ν΄μ£Όλ μ­ν μ΄λΌκ³  νλ€.

### π§ `JdbcTemplate` κ³Ό `SelectJdbcTemplate` ν΅ν©
μ΄μ  λͺ¨λ  SQLμ λν μ²λ¦¬λ₯Ό κ³΅ν΅ λΌμ΄λΈλ¬λ¦¬λ₯Ό νμ©ν΄ μνν  μ μλ€. κ·Έλ°λ° κ°λ°μ μμ₯μμλ API μ¬μ© μ μ¬λ¬ κ°μ ν΄λμ€λ³΄λ€ ν΄λμ€ νλλ₯Ό μ κ³΅νλ κ²μ΄ λ μ’μ κ²μ΄λ€. κ·Έλμ μ€λ³΅ μ½λκ° μ‘΄μ¬νλ `JdbcTemplate` κ³Ό `SelectJdbcTemplate` μ νλλ‘ ν΅ν©νλλ‘ νλ€.

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

- `JdbcTemplate` μΌλ‘ ν΅ν©νκΈ° μν΄, `SelectJdbcTemplate` μ λ©μλλ€μ μ΄λμν¨λ€.

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

- `UserDao` μμ, `insert()` μ `update()` λ `mapRow()` μ λν κ΅¬νμ΄ νμνλ°, μΌλ¨μ `null` μ λ°ννλλ‘ νλ€.

### π§ μΈν°νμ΄μ€ μΆκ°λ₯Ό ν΅ν λ¬Έμ μ  ν΄κ²°
`UserDao` μ `insert()` μ `update()` λ `mapRow()` λ₯Ό μ¬μ©νμ§ μλλ°λ, κ΅¬νν΄μΌ νλ λ¬Έμ κ° μκ²Όλ€. μ΄λ¬ν μμΈμ **`JdbcTemplate` μ μΆμ λ©μλμ λ³ν μμ μ΄ ν­μ κ°μ΄ λ³ννλλ‘ μμ‘΄κ΄κ³κ° μκ²ΌκΈ° λλ¬Έ**μ΄λ€.
- μ΄λ₯Ό ν΄κ²°νκΈ° μν΄ `setValues()` μ `mapRow()` λ©μλλ₯Ό λΆλ¦¬ν΄ μλ‘κ°μ μμ‘΄κ΄κ³λ₯Ό μ κ±°ν΄μΌ νλ€.
  - λ κ°μ μΆμ λ©μλλ₯Ό κ°μ ν΄λμ€κ° κ°μ§λλ‘ νμ§ μκ³ , κ°κ°μ μΆμ λ©μλλ₯Ό μΈν°νμ΄μ€λ₯Ό ν΅ν΄ λΆλ¦¬νλλ‘ νλ€.

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

- `setValues()` μ `mapRow()` μΆμ λ©μλλ₯Ό μΈν°νμ΄μ€λ‘ λΆλ¦¬ν΄ λ΄λΉνλ―λ‘, `JdbcTemplate` μ λμ΄μ μΆμ ν΄λμ€μΌ νμκ° μλ€.
- λ©μλ νλλ§ κ°μ§λ μΈν°νμ΄μ€λ₯Ό μμ±ν ν νμμ λ°λΌ λ©μλμ μΈμλ‘ μ λ¬ν΄ λ¬Έμ λ₯Ό ν΄κ²°νλ€.
  - λ³ν μμ μ΄ λ€λ₯Έ λΆλΆμ μλ‘ λ€λ₯Έ μΈν°νμ΄μ€λ‘ λΆλ¦¬νκ³ , μ΄λ κ² μ¬μ©ν μΈν°νμ΄μ€λ₯Ό **μ½λ°± μΈν°νμ΄μ€**λΌκ³  νλ€.

### π§ λ°νμ Exception μΆκ° λ° AutoCloseable νμ©ν μμ λ°ν
λ λ€λ₯Έ λ¬Έμ μ  μ€ νλκ° λͺ¨λ  λ©μλκ° μ»΄νμΌνμ ExceptionμΈ `SQLException` μ `throw` νλ€λ κ²μ΄λ€. λ°νμ Exceptionμ μΆκ°ν΄ μ΄ λ¬Έμ λ₯Ό ν΄κ²°νλ€. μ΄λ₯Ό μν΄ `RuntimeException` μ μμνλ μλ‘μ΄ Exceptionμ μΆκ°νλ€.

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

- μ΄μ  μμ±ν `DataAccessException` μ `JdbcTemplate` μμ μ¬μ©νκ² ν¨μΌλ‘μ¨, λ μ΄μ `SQLException` μ μ²λ¦¬νμ§ μλλ‘ ν  μ μλ€.

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

- λ°νμ ExceptionμΌλ‘ λ³κ²½νμ§λ§, `finally` μ μμ μμ λ°νμ λ³΅μ‘λκ° λλ¬΄ λλ€. 
  - μ΄λ μ¬μ©νλ `close()` λ©μλμ λν νΈμΆμ μλ° 7 λ²μ λΆν° μ κ³΅νλ `java.io.AutoCloseable` μΈν°νμ΄μ€λ₯Ό νμ©νμ¬ ν΄κ²°ν  μ μλ€.
  - ν΄λΉ μΈν°νμ΄μ€λ₯Ό κ΅¬ννλ ν΄λμ€λ `try-with-resources` κ΅¬λ¬Έμ νμ©ν΄ μμμ μλμΌλ‘ λ°λ©ν  μ μλ€.

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

- μμ κ°μ΄ `try` κ΅¬λ¬Έ μμ μ¬μ©ν  μμμ μΆκ°νμ¬ κ΅¬ννλ€.
  - `try` μ λͺμλ μμλ€μ μ½λκ° `try` λ₯Ό λ²μ΄λλ κ²½μ° `try-with-resources` κ° `close` λ₯Ό νΈμΆνλ€.
  - νμ§λ§ λͺ¨λ  μμμ λν΄ νΈμΆν΄μ£Όλ κ²μ μλκ³ , `AutoCloseable` μ κ΅¬ννλ μμμ λν΄μλ§ κ°λ₯νλ€.
  - μμμλ `Connection` κ³Ό `PreparedStatement` κ° μ΄λ₯Ό κ΅¬ννκ³  μμ΄ μμμ μλ λ°λ©μ΄ κ°λ₯νλ€.

```java
public interface Connection  extends Wrapper, AutoCloseable {...}

public interface PreparedStatement extends Statement {...}

public interface Statement extends Wrapper, AutoCloseable {...}
```

### π§ μ λλ¦­(`generic`)μ νμ©ν κ°μ 
`JdbcTemplate` μ μ¬μ©ν΄λ³΄λ, λ°μ΄ν° μ‘°ν μ λ§€λ² μΊμ€νμ ν΄μΌ λλ€. μ΄λ₯Ό μλ°μ μ λλ¦­μ μ μ©ν΄ κ°μ νλ€.

```java
public interface RowMapper<T> {
    T mapRow(ResultSet rs) throws SQLException;
}
```

- μλ°μ μ λλ¦­ λ¬Έλ²μ μ¬μ©νλλ‘ μμ  ν `JdbcTemplate` μλ μ λλ¦­ κ΅¬λ¬Έμ μΆκ°νλ€.

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

- μ λλ¦­μ μ¬μ©νλλ‘ νμ¬ μΊμ€ν μμ΄ λ°μ΄ν° μ‘°νκ° κ°λ₯νλλ‘ νλ€.

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

> **μ λλ¦­**<br/>
> λ°μ΄ν° νμμ μμ‘΄νμ§ μκ³ , νλμ κ°μ΄ μ¬λ¬ λ€λ₯Έ λ°μ΄ν° νμλ€μ κ°μ§ μ μλλ‘ νλ λ°©λ²μΌλ‘, ν΄λμ€ λ΄λΆμμ μ§μ νλ κ²μ΄ μλ μΈλΆμμ μ¬μ©μμ μν΄ μ§μ νλ κ²μ΄λ€.

### π§ κ°λ³μΈμλ₯Ό νμ©ν΄ μΏΌλ¦¬μ μΈμ μ λ¬νκΈ°
μΏΌλ¦¬μ κ° μ λ¬ μ `PreparedStatementSetter` λ₯Ό μ΄μ©ν  μλ μμ§λ§, κ°λ³ μΈμλ₯Ό νμ©ν  μλ μλ€. 

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

- κ°λ³ μΈμλ λ§ κ·Έλλ‘ μΈμλ‘ μ λ¬ν  κ°μ κ°μκ° λμ μΌλ‘ λ³κ²½λλ κ²½μ° μ μ©νλ€.

### π§ λλ€λ₯Ό νμ©ν κ΅¬ν
ν λ¨κ³ λ κ°μ  λ λ¦¬ν©ν λ§μ μν΄μλ μλ° 8 λ²μ μμ μΆκ°λ **λλ€ ννμ**μ μ¬μ©ν  μ μλ€. `UserDao` μμ `RowMapper` μ λν μ΅λͺ ν΄λμ€λ₯Ό μμ±νλ λΆλΆμ λλ€λ₯Ό νμ©νμ¬ κΉλνκ² κ΅¬ννλ€.

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

- λλ€ μ¬μ© μ μλ `RowMapper` μ λν μ΅λͺ ν΄λμ€λ₯Ό λ§λ€μ΄ μ λ¬νμ§λ§ λλ€λ₯Ό μ¬μ©ν  κ²½μ° λ©μλμ μ λ¬ν  μΈμμ λ©μλ κ΅¬νλΆλ§ κ΅¬νν΄ μμ κ°μ΄ μ λ¬νλ€.
  - λλ€ μ¬μ©μ μν΄μλ `RowMapper` μ κ°μ΄ μΈν°νμ΄μ€μ λ©μλκ° νλλ§ μ‘΄μ¬ν΄μΌ νλ€. (`mapRow()`)
  - λλ€ ννμμΌλ‘ μ¬μ©ν  μΈν°νμ΄μ€λΌκ³  μ§μ νλ €λ©΄, `@FunctionalInterface` annotationμ μΆκ°νλ€.

```java
@FunctionalInterface
public interface RowMapper<T> {
    T mapRow(ResultSet rs) throws SQLException;
}
```

## π μΆμ²
- **μλ° μΉ νλ‘κ·Έλλ° Next Step : νλμ© λ²κ²¨κ°λ μνκ»μ§ νμ΅λ²** - λ°μ¬μ±
- [μ΅λͺ ν΄λμ€](https://codechacha.com/ko/java-anonymous-class/)
- [try-with-resources](https://velog.io/@sa1341/AutoCloseable-%ED%81%B4%EB%9E%98%EC%8A%A4)
- [μ λλ¦­](https://st-lab.tistory.com/153)
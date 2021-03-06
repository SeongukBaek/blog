---
title: "๐ 6์ฅ ์๋ธ๋ฆฟ/JSP๋ฅผ ํ์ฉํด ๋์ ์ธ ์น ์ ํ๋ฆฌ์ผ์ด์ ๊ฐ๋ฐํ๊ธฐ"
description: "์๋ฐ ์น ํ๋ก๊ทธ๋๋ฐ ์ฑ ์ ๋ฆฌ"
date: 2022-02-09
update: 2022-02-09
tags:
  - Java
  - Refactoring
  - Framework
series: "๐ ์๋ฐ ์น ํ๋ก๊ทธ๋๋ฐ Next Step"
---

<em>[์๋ฐ ์น ํ๋ก๊ทธ๋๋ฐ Next Step - ๋ฐ์ฌ์ฑ]์ ์ฝ๊ณ  ์ธ์ฉํ๊ณ  ์ ๋ฆฌํ๋ POST์๋๋ค.</em>

> 4์ฅ ์ค์ต์์ ์ธ๊ธํ๋ ์ฟ ํค์ ๋ฌธ์ ์ ์ ๋ํด ์ดํด๋ณด๊ณ , ์ด๋ฅผ ํด๊ฒฐํ๊ธฐ ์ํ ์ธ์์ ์ง์  ๊ตฌํํด๋ณด์. ๋ํ ์๋ฐ ์ง์๋ฟ ์๋๋ผ ๋ชจ๋  ์์ด๊ฐ ์ ๊ณตํ๋ ์น ํ๋ ์์ํฌ๋ MVC ํจํด์ ๊ธฐ๋ฐ์ผ๋ก ํ๊ณ  ์์ผ๋ฏ๋ก, MVC ํจํด ๊ธฐ๋ฐ์ผ๋ก ํ๋ ์์ํฌ๋ฅผ ๊ตฌํํด๋ณด์.

## ๐ฉ ์๋ธ๋ฆฟ/JSP๋ก ํ์๊ด๋ฆฌ ๊ธฐ๋ฅ ๋ค์ ๊ฐ๋ฐํ๊ธฐ
[Github ์ ์ฅ์ ์ฝ๋](https://github.com/SeongukBaek/jwp-basic.git)๋ฅผ ๊ฐ์ ธ์ ์ค์ตํ๋ค.

### ๐ง ์๋ธ๋ฆฟ/JSP ๋ณต์ต
`step0-getting-started` ๋ธ๋์น ์์ค์ฝ๋๋ฅผ ์ด์ด๋ณด๋ฉด ์ด๋ฏธ ํ์๊ฐ์(์๋ธ๋ฆฟ)๊ณผ ์ฌ์ฉ์ ๋ชฉ๋ก(JSP) ๊ธฐ๋ฅ์ด ๊ตฌํ๋์ด ์๋ค.

**ํ์๊ฐ์**<br/>
`/user/form.html` ์ ๊ทธ๋๋ก ์ฌ์ฉํ๋ค. ์ฌ์ฉ์ ์๋ ฅ ๋ฐ์ดํฐ๋ฅผ ์ถ์ถํ ํ DB์ ์ถ๊ฐํ๋ ๋ฐฉ์์ด๋ค.

```java
@WebServlet("/user/create")
public class CreateUserServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Logger log = LoggerFactory.getLogger(CreateUserServlet.class);

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = new User(req.getParameter("userId"), req.getParameter("password"), req.getParameter("name"),
                req.getParameter("email"));
        log.debug("user : {}", user);
        DataBase.addUser(user);
        resp.sendRedirect("/user/list");
    }
}
```

- ํ์๊ฐ์์ ์๋ฃํ ํ ์ฌ์ฉ์ ๋ชฉ๋ก ์ถ๋ ฅ์ ์ํด `"/user/list"` ๋ก ๋ฆฌ๋ค์ด๋ ํธํ๋ค.

**์ฌ์ฉ์ ๋ชฉ๋ก**<br/>
ํ์๊ฐ์ํ  ๋ ์ ์ฅํ ์ฌ์ฉ์ ๋ชฉ๋ก์ ์กฐํํ ํ JSP์ `"users"` ๋ผ๋ ์ด๋ฆ์ผ๋ก ์ ๋ฌํ๋ค. ์ด์  ์ฅ์์๋ `ListUserController` ์์ ๋์ ์ผ๋ก `StringBuilder` ๋ฅผ ์ด์ฉํ์ฌ HTML์ ์์ฑํ์ง๋ง ์ฌ๊ธฐ์๋ JSPํ์ผ๋ก ์์ํ๋ค.

```java
@WebServlet("/user/list")
public class ListUserServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("users", DataBase.findAll());
        RequestDispatcher rd = req.getRequestDispatcher("/user/list.jsp");
        rd.forward(req, resp);
    }
}
```

- ์๋ธ๋ฆฟ๋ ๋์ ์ผ๋ก HTML์ ์์ฑํ๊ธฐ ์ํด์๋ 5์ฅ์ `ListUserController` ์ ๊ฐ์ ๋ฐฉ์์ผ๋ก ๊ตฌํํด์ผ ํ๋ค.
- ์ด์ ๊ฐ์ ์๋ธ๋ฆฟ์ ํ๊ณ๋ฅผ ๊ทน๋ณตํ๊ธฐ ์ํด JSP๊ฐ ๋ฑ์ฅํ๋ค.

**JSP**<br/>
์ ์ ์ธ HTML์ ๊ทธ๋๋ก ๋๊ณ , ๋์ ์ผ๋ก ๋ณ๊ฒฝ๋๋ ๋ถ๋ถ๋ง์ ๊ตฌํํ๋ค. **Java Server Page**๋ผ๋ ์ด๋ฆ๋ต๊ฒ ์๋ฐ ๊ตฌ๋ฌธ์ ๊ทธ๋๋ก ์ฌ์ฉํ  ์ ์๋ค. (์คํฌ๋ฆฝํ๋ฆฟ(scriptlet)์ด๋ผ๊ณ  ํ๋ `<% %>` ๋ด์ ์ฌ์ฉ)

ํ์ง๋ง ์น ์ ํ๋ฆฌ์ผ์ด์ ์๊ตฌ์ฌํญ์ ๋ณต์ก๋๊ฐ ์ฆ๊ฐํ๋ฉด์ ๋ง์ ๋ก์ง์ด ๊ตฌํ๋๋ค๋ณด๋ JSP๋ฅผ ์ ์ง๋ณด์ํ๊ธฐ ์ด๋ ค์์ก๋ค. ์ด๋ฅผ ํด๊ฒฐํ๊ธฐ ์ํด **JSTL(JavaServer Pages Standard Tag Library)๊ณผ EL(Expression Language)๊ฐ ๋ฑ์ฅ**ํ๊ณ , JSP์ ๋ณต์ก๋๋ฅผ ๋ฎ์ถ๊ธฐ ์ํด **MVC ํจํด์ ์ ์ฉํ ํ๋ ์์ํฌ๊ฐ ๋ฑ์ฅ**ํ๋ค.

```java
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

...

<c:forEach items="${users}" var="user" varStatus="status">
    <tr>
        <th scope="row">${status.count}</th>
        <td>${user.userId}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><a href="#" class="btn btn-success" role="button">์์ </a>
        </td>
    </tr>
</c:forEach>

...

```

- JSTL๊ณผ EL์ ํ์ฉํ๋ฉด JSP์์ ์๋ฐ ๊ตฌ๋ฌธ์ ์์ ํ ์ ๊ฑฐํ  ์ ์๋ค.
  - ์ฌ์ค ์ด๋ฅผ ์ํด์๋ JSP๊ฐ ์ถ๋ ฅํ  ๋ฐ์ดํฐ๋ฅผ ์ ๋ฌํด์ค **์ปจํธ๋กค๋ฌ๊ฐ ํ์**ํ๋ค. ์ฆ, **MVC ํจํด ๊ธฐ๋ฐ์ผ๋ก ๊ฐ๋ฐ**ํด์ผ ์๋ฐ ๊ตฌ๋ฌธ์ ์์ ํ ์ ๊ฑฐํ  ์ ์๋ค๋ ๊ฒ์ด๋ค.
  - ์ฌ๊ธฐ์๋ ์ฌ์ฉ์ ๋ชฉ๋ก ์กฐํ ํ JSP์ ์ ๋ฌํ๋ `ListUserServlet` ์ด MVC ํจํด์์ ์ปจํธ๋กค๋ฌ ์ญํ ์ ์ํํ๋ค.

### ๐ง ๊ฐ์ธ์ ๋ณด์์  ์ค์ต
๊ฐ์ธ์ ๋ณด์์  ๊ธฐ๋ฅ์ ๋ํ ๊ตฌํ์ ์์ํ๋ค. ์์  ํ๋ฉด์ ํ์๊ฐ์ ํ๋ฉด์ธ `/user/form.html` ์ ์ฌ์ฌ์ฉํ๋ค.

`list.jsp`
```html
<li><a href="../user/updateForm.jsp" role="button">๊ฐ์ธ์ ๋ณด์์ </a></li>
```

- ๋จผ์ , ๊ฐ์ธ์ ๋ณด์์  ๋ฒํผ ํด๋ฆญ ์, `../user/updateForm.jsp` ๋ก ์ด๋

`updateForm.jsp`
```html
<div class="container" id="main">
    <div class="col-md-6 col-md-offset-3">
        <div class="panel panel-default content-main">
            <form name="question" method="post" action="/user/update">
                <input type="hidden" name="userId" value="${user.userId}" />
                <div class="form-group">
                    <label>์ฌ์ฉ์ ์์ด๋</label>
                    ${user.userId}
                </div>
                <div class="form-group">
                    <label for="password">๋น๋ฐ๋ฒํธ</label>
                    <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="name">์ด๋ฆ</label>
                    <input class="form-control" id="name" name="name" placeholder="Name" value="${user.name}">
                </div>
                <div class="form-group">
                    <label for="email">์ด๋ฉ์ผ</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="Email" value="${user.email}">
                </div>
                <button type="submit" class="btn btn-success clearfix pull-right">๊ฐ์ธ์ ๋ณด์์ </button>
                <div class="clearfix" />
            </form>
        </div>
    </div>
</div>
```

- `/user/update` ๋ก POST ์์ฒญ์ ๋ณด๋ด๋ `form` ํ๊ทธ ์์ฑ

`UpdateUserServlet.java`
```java
@WebServlet(value = {"/user/update", "/user/updateForm"})
public class UpdateUserServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Logger log = LoggerFactory.getLogger(CreateUserServlet.class);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        RequestDispatcher rd = req.getRequestDispatcher("/user/updateForm.jsp");
        rd.forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = DataBase.findUserById(req.getParameter("userId"));

        User updateUser = new User(req.getParameter("userId"), req.getParameter("password"), req.getParameter("name"),
                req.getParameter("email"));
        log.debug("updateUser : {}", updateUser);
        user.update(updateUser);
        resp.sendRedirect("/user/list");
    }
}
```

- `/user/updateForm` ๋ก์ GET ์์ฒญ๊ณผ, `/user/update` ๋ก์ POST ์์ฒญ์ ์ฒ๋ฆฌํ๊ธฐ ์ํด `value` ์ฌ์ฉ
- `userId` ๋ฅผ ์ด์ฉํด DB์์ ์ฌ์ฉ์๋ฅผ ์กฐํํ๊ณ  ์๋ ฅ๋ฐ์ ๊ฐ์ผ๋ก `user.update` ์ํ

`model/User.java`
```java
public void update(User updateUser) {
    this.password = updateUser.password;
    this.name = updateUser.name;
    this.email = updateUser.email;
}
```

- `userId` ๋ฅผ ์ ์ธํ ์ฌ์ฉ์ ์ ๋ณด update๋ฅผ ์ํ ๋ฉ์๋

### ๐ง ๋ก๊ทธ์ธ/๋ก๊ทธ์์ ๊ธฐ๋ฅ ์ค์ต
ํ์ฌ ์ํ๊ฐ ๋ก๊ทธ์ธ ์ํ์ด๋ฉด ์๋จ ๋ฉ๋ด๊ฐ **๋ก๊ทธ์์**, **๊ฐ์ธ์ ๋ณด์์ **์ด ๋ํ๋์ผ ํ๋ฉฐ, ๋ก๊ทธ์์ ์ํ์ด๋ฉด **๋ก๊ทธ์ธ**, **ํ์๊ฐ์**์ด ๋ํ๋์ผ ํ๋ค.

`LoginController.java`
```java
@WebServlet(value = { "/users/login", "/users/loginForm" })
public class LoginController extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        forward("/user/login.jsp", req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String userId = req.getParameter("userId");
        String password = req.getParameter("password");
        User user = DataBase.findUserById(userId);
        if (user == null) {
            req.setAttribute("loginFailed", true);
            forward("/user/login.jsp", req, resp);
            return;
        }

        if (user.matchPassword(password)) {
            HttpSession session = req.getSession();
            session.setAttribute(UserSessionUtils.USER_SESSION_KEY, user);
            resp.sendRedirect("/");
        } else {
            req.setAttribute("loginFailed", true);
            forward("/user/login.jsp", req, resp);
        }
    }

    private void forward(String forwardUrl, HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        RequestDispatcher rd = req.getRequestDispatcher(forwardUrl);
        rd.forward(req, resp);
    }
}
```

- `/user/login`, `/user/loginForm` ์ ๋ํ ์๋ต์ ์ฒ๋ฆฌํ๋ค.
- **GET ์์ฒญ**์ ๊ฒฝ์ฐ, `/user/login.jsp` ๋ฅผ ๋ฐํํ๊ณ , 
- **POST ์์ฒญ**์ ๊ฒฝ์ฐ, ์๋ ฅ๋ id๋ฅผ ์ด์ฉํด DB์ ์กด์ฌํ๋ ์ฌ์ฉ์์ธ์ง ์กฐํํ๊ณ , ๋น๋ฐ๋ฒํธ๊น์ง ์ผ์นํ๋ฉด `HttpSession` ์ผ๋ก session์ ์ฌ์ฉ์๋ฅผ ์ถ๊ฐํ๋ค.
  - `USER_SESSION_KEY` : ์ ์ฅํ๋ `user` ๋ฅผ ์๋ณํ๊ธฐ ์ํ ํค
  - ๋์ค์ ์ํธํ๋ฅผ ํ๊ฒ ๋๋ค๋ฉด, 
    - ID๋ฅผ ๋จผ์  ์กฐํํด์ DB์ ์ ์ฅ๋ PWD๋ฅผ ๊ฐ์ ธ์ค๊ณ , 
    - ์ฌ์ฉ์ ์๋ ฅ ๊ฐ์ ์ํธํํ ๊ฐ๊ณผ์ ๋น๊ต๋ฅผ ์ํ

`include/~.jspf`
```java
<c:if test="${not empty sessionScope.user}">
    <ul class="nav dropdown-menu">
        <li><a href="/users/profile?userId=${sessionScope.user.userId}"><i class="glyphicon glyphicon-user" style="color:#1111dd;"></i> Profile</a></li>
        <li class="nav-divider"></li>
        <li><a href="#"><i class="glyphicon glyphicon-cog" style="color:#dd1111;"></i> Settings</a></li>
    </ul>
</c:if>

<c:choose>
<c:when test="${not empty sessionScope.user}">
<li><a href="/users/logout" role="button">๋ก๊ทธ์์</a></li>
<li><a href="/users/updateForm?userId=${sessionScope.user.userId}" role="button">๊ฐ์ธ์ ๋ณด์์ </a></li>
</c:when>
<c:otherwise>
<li><a href="/users/loginForm" role="button">๋ก๊ทธ์ธ</a></li>
<li><a href="/users/form" role="button">ํ์๊ฐ์</a></li>
<!--
<li><a href="#loginModal" role="button" data-toggle="modal">๋ก๊ทธ์ธ</a></li>
<li><a href="#registerModal" role="button" data-toggle="modal">ํ์๊ฐ์</a></li>
-->
</c:otherwise>
</c:choose>
```

- JSP์์ session์ ๋ก๊ทธ์ธํ ์ฌ์ฉ์ ์ฌ๋ถ๋ฅผ ์ฒดํฌํ๊ณ  JSTL์์ ๋ถ๊ธฐ๋ฌธ ์ฒ๋ฆฌํ์ฌ ๋ก๊ทธ์ธํ ์ฌ์ฉ์์ ๊ทธ๋ ์ง ์์ ์ฌ์ฉ์๊ฐ ์ฌ์ฉํ  ์ ์๋ ๊ธฐ๋ฅ์ ๋ค๋ฅด๊ฒ ์ฒ๋ฆฌํ๋ค.

`LogoutController.java`
```java
@WebServlet("/users/logout")
public class LogoutController extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        session.removeAttribute(UserSessionUtils.USER_SESSION_KEY);
        resp.sendRedirect("/");
    }
}
```

- `HttpSession` ์ ๋ ๋ ค๋ฒ๋ฆฌ๋ ๊ฒ์ผ๋ก ๋ก๊ทธ์์์ ๊ตฌํํ๋ค.

### ๐ง ํ์ ๋ชฉ๋ก ๋ฐ ๊ฐ์ธ์ ๋ณด ์์  ๋ณด์ ๊ฐํ ์ค์ต
๋ก๊ทธ์ธํ ์ฌ์ฉ์๋ง์ด ์ฌ์ฉ์ ๋ชฉ๋ก ์กฐํ๊ฐ ๊ฐ๋ฅํด์ผ ํ๋ฉฐ, ๊ฐ์ธ์ ๋ณด ์์ ์ ์์ ์ ์ ๋ณด๋ง ์์  ๊ฐ๋ฅํด์ผ ํ๋ค.

`ListUserController.java`
```java
if (!UserSessionUtils.isLogined(req.getSession())) {
    resp.sendRedirect("/users/loginForm");
    return;
}
```

- session์ ๋ก๊ทธ์ธํ ์ฌ์ฉ์๊ฐ ์๋์ง ํ์ธํ๋ค.
  - ๋ก๊ทธ์ธํ ์ฌ์ฉ์๊ฐ ์๋ ๊ฒฝ์ฐ, `loginForm` ์ผ๋ก ๋ฆฌ๋ค์ด๋ ์ํ๋ค.

`UpdateUserController.java`
```java
if (!UserSessionUtils.isSameUser(req.getSession(), user)) {
    throw new IllegalStateException("๋ค๋ฅธ ์ฌ์ฉ์์ ์ ๋ณด๋ฅผ ์์ ํ  ์ ์์ต๋๋ค.");
}
```

- ์ ๋ณด ์์  ์, ์์ ํ๋ ค๋ ์ฌ์ฉ์๊ฐ ํ์ฌ ๋ก๊ทธ์ธํ ๋ณธ์ธ์ธ์ง ํ์ธํ๋ค.

`UserSessionUtils.java`
```java
public class UserSessionUtils {
    public static final String USER_SESSION_KEY = "user";

    public static User getUserFromSession(HttpSession session) {
        Object user = session.getAttribute(USER_SESSION_KEY);
        if (user == null) {
            return null;
        }
        return (User) user;
    }

    public static boolean isLogined(HttpSession session) {
        if (getUserFromSession(session) == null) {
            return false;
        }
        return true;
    }

    public static boolean isSameUser(HttpSession session, User user) {
        if (!isLogined(session)) {
            return false;
        }

        if (user == null) {
            return false;
        }

        return user.isSameUser(getUserFromSession(session));
    }
}
```

- `getUserFromSession` : session์ ์ธ์๋ก ๋ฐ์ session์ผ๋ก๋ถํฐ `user` attribute๋ฅผ ์ถ์ถํ๋ค.
- `isLogined` : `getUserFromSession` ๋ฉ์๋๋ฅผ ํธ์ถํ์ฌ ๊ทธ ๋ฐํ๊ฐ์ผ๋ก ๋ก๊ทธ์ธํ ์ฌ์ฉ์๊ฐ ์๋์ง ํ์ธํ๋ค.
- `isSameUser` : `isLogined` ๋ฉ์๋ ํธ์ถ๋ก session์ ๋ก๊ทธ์ธํ ์ฌ์ฉ์๊ฐ ์๋์ง์ ์ธ์๋ก ๋ฐ์ `user` ์ `null` ์ฌ๋ถ๋ฅผ ํ์ธํ์ฌ `boolean` ๊ฐ์ ๋ฐํํ๋ค. ??? (์ ์ธ์๊ฐ 1๊ฐ๋ง ๋๊ฒจ์ฃผ์ง)

---

## ๐ฉ ์ธ์(`HttpSession`) ์๊ตฌ์ฌํญ ๋ฐ ์ค์ต
์ด์  ์ฅ์์ ์ธ๊ธํ๋ฏ **HTTP๋ ๋ฌด์ํ ํ๋กํ ์ฝ**์ด๋ค. ํ์ง๋ง ๋ก๊ทธ์ธ๊ณผ ๊ฐ์ด ์ํ๋ฅผ ์ ์งํ  ํ์๊ฐ ์๋ ์๊ตฌ์ฌํญ์ด ๋ฐ์ํ๋ค. ์ด์ ๊ฐ์ ๊ฒฝ์ฐ ์ฌ์ฉํ  ์ ์๋ ๋ฐฉ๋ฒ์ด "์ฟ ํค ํค๋๋ฅผ ์ฌ์ฉํ๋ ๊ฒ"์ด๋ค.

`"Set-Cookie"` ํค๋๋ฅผ ํตํด ์ฟ ํค๋ฅผ ์์ฑํ๋ฉด, ์ดํ ๋ฐ์ํ๋ ๋ชจ๋  ์์ฒญ์ `"Set-Cookie"` ๋ก ์ถ๊ฐํ ๊ฐ์ "Cookie" ํค๋๋ก ์ ๋ฌํ๋ ๋ฐฉ์์ด๋ค. 

ํ์ง๋ง ์ฟ ํค๋ฅผ ์ฌ์ฉํ๋ ๋ฐ **๋ณด์์ ์ทจ์ฝํ๋ค**๋ ๋ฌธ์ ์ ์ด ์๋ค. 
์๋๋ฉด, ๋๊ตฌ๋ ๋ธ๋ผ์ฐ์  ๊ฐ๋ฐ์ ๋๊ตฌ๋ HTTP ๋ถ์ ๋๊ตฌ๋ฅผ ํ์ฉํ์ฌ HTTP ์์ฒญ ๋ฐ ์๋ต ํค๋๋ฅผ ํ์ธํ  ์ ์๊ธฐ ๋๋ฌธ์ด๋ค. ๋ฐ๋ผ์, **์ฟ ํค๋ฅผ ํตํด ์ค์ํ ๊ฐ์ธ์ ๋ณด๋ฅผ ์ ๋ฌํ๋ ๊ฒ์ ๋ณด์์ ์ ํฉํ์ง ์๋ค.**

**Session์ ๋ฑ์ฅ**<br/>
์ฟ ํค์ ๋ณด์์ ๋จ์ ์ ๋ณด์ํ๊ธฐ ์ํด **Session**์ด ๋ฑ์ฅํ๋ค. ์ด๋ ์ํ ๊ฐ์ผ๋ก ์ ์งํ๊ณ  ์ถ์ ์ ๋ณด๋ฅผ ํด๋ผ์ด์ธํธ๋จ์ ์ ์ฅํ๋ ๊ฒ์ด ์๋ **์๋ฒ๋จ์ ์ ์ฅ**ํ๋ค.
- ์๋ฒ์ ์ ์ฅ ํ, ๊ฐ ํด๋ผ์ด์ธํธ๋ง๋ค ๊ณ ์ ํ ์์ด๋๋ฅผ ๋ฐ๊ธํด ์ด ์์ด๋๋ฅผ `"Set-Cookie"` ํค๋๋ฅผ ํตํด ์ ๋ฌํ๋ค.
  - HTTP์์ ์ํ๋ฅผ ์ ์งํ๋ ๋ฐฉ๋ฒ์ **์ฟ ํค**๋ฐ์ ์๊ธฐ์, ๊ฒฐ๊ตญ์ ์ํ ๊ฐ ์ ์ง๋ฅผ ์ํ ๊ฐ ์ ๋ฌ์๋ ์ฟ ํค๋ฅผ ์ฌ์ฉํ๋ค.

> "์ธ์์ HTTP์ ์ฟ ํค๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ๋์ํ๋ค."

### ๐ง ์๊ตฌ์ฌํญ
์๋ธ๋ฆฟ์์ ์ง์ํ๋ `HttpSession` API์ ์ผ๋ถ๋ฅผ ์ง์ํด์ผ ํ๋ค. ๊ตฌํํ  ๋ฉ์๋๋ `getId()`, `setAttribute(String name, Object value)`, `getAttribute(String name)`, `removeAttribute(String name)`, `invalidate()` ์ด๋ค.

- `String getId()` : ํ์ฌ session์ ํ ๋น๋์ด ์๋ ๊ณ ์ ํ session id๋ฅผ ๋ฐํ
- `void setAttribute(String name, Object value)` : ํ์ฌ session์ `value` ์ธ์๋ก ์ ๋ฌ๋๋ ๊ฐ์ฒด๋ฅผ `name` ์ธ์ ์ด๋ฆ์ผ๋ก ์ ์ฅ
- `Object getAttribute(String name)` : ํ์ฌ session์ `name` ์ธ์๋ก ์ ์ฅ๋์ด ์๋ ๊ฐ์ฒด ๊ฐ์ ์ฐพ์ ๋ฐํ
- `void removeAttribute(String name)` : ํ์ฌ session์ `name` ์ธ์๋ก ์ ์ฅ๋์ด ์๋ ๊ฐ์ฒด ๊ฐ์ ์ญ์ 
- `void invalidate()` : ํ์ฌ session์ ์ ์ฅ๋์ด ์๋ ๋ชจ๋  ๊ฐ์ ์ญ์ 

### ๐ง ์๊ตฌ์ฌํญ ๋ถ๋ฆฌ ๋ฐ ํํธ
- ํด๋ผ์ด์ธํธ์ ์๋ฒ ๊ฐ ์ฃผ๊ณ  ๋ฐ์ ๊ณ ์ ํ ์์ด๋๋ฅผ ์์ฑํด์ผ ํ๋ค. ๊ณ ์ ํ ์์ด๋๋ ์ฝ๊ฒ ์์ธกํ  ์ ์์ด์ผ ํ๋ค. ๊ทธ๋ ์ง ์๋ค๋ฉด, ์ฟ ํค ๊ฐ์ ์กฐ์ํด ๋ค๋ฅธ ์ฌ์ฉ์์ฒ๋ผ ์์ผ ์ ์๊ธฐ ๋๋ฌธ์ด๋ค.
- ์์ฑํ ๊ณ ์ ํ ์์ด๋๋ฅผ ์ฟ ํค๋ฅผ ํตํด ์ ๋ฌํ๋ค. (`โSet-Cookieโ` ํค๋)
- ์๋ฒ ์ธก์์ ๋ชจ๋  ํด๋ผ์ด์ธํธ์ session ๊ฐ์ ๊ด๋ฆฌํ๋ ์ ์ฅ์ ํด๋์ค๋ฅผ ์ถ๊ฐํ๋ค. (`Map<String, String>`, **Key**๋ ์์์ ์์ฑํ ๊ณ ์ ํ ์์ด๋)
- ํด๋ผ์ด์ธํธ๋ณ session ๋ฐ์ดํฐ๋ฅผ ๊ด๋ฆฌํ  ์ ์๋ ํด๋์ค(`HttpSession`)๋ฅผ ์ถ๊ฐํ๋ค.
    - ํด๋น ํด๋์ค๋ ์ 5๊ฐ์ ๋ฉ์๋๋ฅผ ๋ชจ๋ ๊ตฌํํ๊ณ , ์ํ ๋ฐ์ดํฐ๋ฅผ ์ ์ฅํ  `Map<String, Object>` ๊ฐ ํ์ํ๋ค.

---

## ๐ฉ ์ธ์(`HttpSession`) ๊ตฌํ
### ๐ง ๊ณ ์ ํ ์์ด๋ ์์ฑ
session์์ ์ฌ์ฉํ  ๊ณ ์ ํ ์์ด๋๋ฅผ ์์ฑํด ๋ณด์. ๋๋ค์ผ๋ก ์์์ ๊ฐ์ ์์ฑํ  ์ ์์ง๋ง, JDK์์ ์ ๊ณตํ๋ `UUID` ํด๋์ค๋ฅผ ํ์ฉํ๋ค. ๋จผ์  `UUIDTest` ํด๋์ค๋ฅผ ์ถ๊ฐํด ์ด๋ค ํํ๋ก ์์ฑ๋๋์ง ํ์ธํด๋ณธ๋ค.

`UUID.randomUUID()` ๋ฅผ ์ถ๋ ฅํด๋ณด๋ฉด `5736e178-a06e-422b-84be-2309a3741eff` ์ ๊ฐ์ ํํ๋ก ๊ฐ์ด ์์ฑ๋๋ค.

### ๐ง ์ฟ ํค๋ฅผ ํ์ฉํด ์์ด๋ ์ ๋ฌ
ํด๋ผ์ด์ธํธ๊ฐ ์ฒ์ ์ ๊ทผํ๋ ๊ฒฝ์ฐ, ํด๋น ํด๋ผ์ด์ธํธ๊ฐ ์ฌ์ฉํ  **session ์์ด๋๋ฅผ ์์ฑ**ํ๊ณ  ์ด๋ฅผ **์ฟ ํค๋ก ์ ๋ฌ**ํ๋ค. ์ดํ ์์ฒญ๋ถํฐ๋ ์ํ ๊ฐ ๊ณต์ ๋ฅผ ์ํด ์ ๋ฌํด์ค session ์์ด๋๋ฅผ ์ฌ์ฉํ๋ค.

`RequestHandler` ํด๋์ค์ session ์์ด๋๊ฐ ์กด์ฌํ๋์ง ์ฌ๋ถ๋ฅผ ํ๋จํ ํ ์๋ ๊ฒฝ์ฐ session ์์ด๋๋ฅผ ์๋ก ๋ฐ๊ธํ๋ค. session ์์ด๋๋ `JSESSIONID` ๋ก ์ ๋ฌํ๋ค.

```java
public class RequestHandler extends Thread {
    ...

    public void run() {
        log.debug("New Client Connect! Connected IP : {}, Port : {}", connection.getInetAddress(),
                connection.getPort());

        try (InputStream in = connection.getInputStream(); OutputStream out = connection.getOutputStream()) {
            HttpRequest request = new HttpRequest(in);
            HttpResponse response = new HttpResponse(out);

            if (getSessionId(request.getHeader("Cookie")) == null) {
                response.addHeader("Set-Cookie", "JSESSIONID=" + UUID.randomUUID());
            }
            
            ...

        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }

    private String getSessionId(String cookieValue) {
        Map<String, String> cookies = HttpRequestUtils.parseCookies(cookieValue);
        return cookies.get("JSESSIONID");
    }
    ...

}
```

- `getSessionId` ๋ฉ์๋๋ request ํค๋์ `Cookie` ๊ฐ์ ํ์ฑํ์ฌ `JSESSIONID` ๊ฐ์ ๋ฐํํ๋ค.
  - ์์ผ๋ฉด, `JSESSIONID=5736e178-a06e-422b-84be-2309a3741eff` ๊ฐ์ ํํ
  - session ์์ด๋๊ฐ ์๋ ๊ฒฝ์ฐ, ์๋ก ๋ฐ๊ธํ๋ค.

`ListUserController` ์์ ๋ก๊ทธ์ธ ์ฌ๋ถ ํ์ธ์ ์ํด `Cookie` ํค๋ ๊ฐ์ ํ์ฉํ๋ ๋ถ๋ถ์ด ์ฆ๊ฐํ๋ฏ๋ก ์ด๋ฅผ ๊ด๋ฆฌํ๋ `HttpCookie` ํด๋์ค๋ฅผ ์ถ๊ฐํ๋ ๋ฆฌํฉํ ๋ง์ ์ค์ํ๋ค.

```java
public class HttpCookie {
    private Map<String, String> cookies;

    HttpCookie(String cookieValue) {
        cookies = HttpRequestUtils.parseCookies(cookieValue);
    }

    public String getCookie(String name) {
        return cookies.get(name);
    }
}
```

```java
public class HttpRequest {
    ...

    public HttpCookie getCookies() {
		return new HttpCookie(getHeader("Cookie"));
	}
}
```

- ์ดํ `HttpRequest` ์์ `HttpCookie` ์ ์ ๊ทผํ  ์ ์๋ ๋ฉ์๋๋ฅผ ์ถ๊ฐํ๋ค.

์ด์  `RequestHandler` ํด๋์ค๋ ์๋ก ์ถ๊ฐํ `HttpCookie` ํด๋์ค์ ๋ฉ์๋๋ฅผ ์ฌ์ฉํ๋๋ก ๋ณ๊ฒฝํ  ์ ์๋ค.

```java
if (request.getCookies().getCookie("JSESSIONID") == null) {
    response.addHeader("Set-Cookie", "JSESSIONID=" + UUID.randomUUID());
}
```

### ๐ง ๋ชจ๋  ํด๋ผ์ด์ธํธ์ ์ธ์ ๋ฐ์ดํฐ์ ๋ํ ์ ์ฅ์ ์ถ๊ฐ
์๋ฒ๋ **๋ค์์ ํด๋ผ์ด์ธํธ session์ ์ง์**ํด์ผ ํ๋ค. ์ด๋ฅผ ์ํด์๋ session์ ๊ด๋ฆฌํ  ์ ์๋ **์ ์ฅ์**๊ฐ ํ์ํ๋ค. 
- ๋ชจ๋  session์ ๋งค๋ฒ ์์ฑํ๋ ๊ฒ์ด ์๋๋ผ **ํ ๋ฒ ์์ฑ ํ ์ฌ์ฌ์ฉ**ํด์ผ ํ๋ค. (`static` ์ผ๋ก `Map` ์์ฑํด (id, session)์ ์์ผ๋ก ์ ์ฅ)

```java
public class HttpSessions {
    private static Map<String, HttpSession> sessions = new HashMap<String, HttpSession>();
    
    public static HttpSession getSession(String id) {
        HttpSession session = sessions.get(id);
        
        if (session == null) {
            session = new HttpSession(id);
            sessions.put(id, session);
            return session;
        }
        
        return session;
    }
    
    static void remove (String id) {
        sessions.remove(id);
    }
}
```

### ๐ง ํด๋ผ์ด์ธํธ๋ณ ์ธ์ ์ ์ฅ์ ์ถ๊ฐ
์๋ธ๋ฆฟ์์ session ๋ฐ์ดํฐ์ ์ ๊ทผํ  ๋ ์ฌ์ฉํ ํด๋์ค์ธ, ๊ฐ ํด๋ผ์ด์ธํธ๋ณ session์ ๋ด๋นํ  `HttpSession` ํด๋์ค๋ฅผ ์ถ๊ฐํ๋ค.

```java
public class HttpSession {
    private Map<String, Object> values = new HashMap<String, Object>();
    
    private String id;
    
    public HttpSession(String id) {
        this.id = id;
    }
    
    public String getId() {
        return id;
    }
    
    public void setAttribute(String name, Object value) {
        values.put(name, value);
    }
    
    public Object getAttribute(String name) {
        return values.get(name);
    }
    
    public void removeAttribute(String name) {
        values.remove(name);
    }
    
    public void invalidate() {
        HttpSessions.remove(id);
    }
}
```

`HttpRequest` ์์ ํด๋ผ์ด์ธํธ์ ํด๋นํ๋ `HttpSession` ์ ์ ๊ทผํ  ์ ์๋๋ก ๋ฉ์๋๋ฅผ ์ถ๊ฐํ๋ค.

```java
public HttpSession getSession() {
    return HttpSessions.getSession(getCookies().getCookie("JSESSIONID"));
}
```

session ์ถ๊ฐ๋ฅผ ์๋ฃํ์ผ๋ฏ๋ก, `logined=true` ์ ๊ฐ์ ์ฟ ํค ๊ฐ์ ์ถ๊ฐํ๋ ๊ฒ์ด ์๋ `User` ๊ฐ์ฒด๋ฅผ ์ถ๊ฐํด ๋ก๊ทธ์ธ ์ฌ๋ถ๋ฅผ ํ๋จํ๋๋ก ์ฝ๋๋ฅผ ๋ณ๊ฒฝํ์.

```java
public class LoginController extends AbstractController {
    @Override
    public void doPost(HttpRequest request, HttpResponse response) {
        User user = DataBase.findUserById(request.getParameter("userId"));
        if (user != null) {
            if (user.login(request.getParameter("password"))) {
                HttpSession session = request.getSession();
                session.setAttribute("user", user);
                response.sendRedirect("/index.html");
            } else {
                response.sendRedirect("/user/login_failed.html");
            }
        } else {
            response.sendRedirect("/user/login_failed.html");
        }
    }
}
```

session์ `User` ๊ฐ์ฒด๋ฅผ ์ถ๊ฐํ์ผ๋ฏ๋ก, `ListUserController` ์์ ๋ก๊ทธ์ธ ์ฌ๋ถ ํ๋จ ์ฝ๋๋ก ๋ณ๊ฒฝํด์ค์ผ ํ๋ค.

```java
public class ListUserController extends AbstractController {
    @Override
    public void doGet(HttpRequest request, HttpResponse response) {
        if (!isLogined(request.getSession())) {
            response.sendRedirect("/user/login.html");
            return;
        }
        ...

    }

    private static boolean isLogined(HttpSession session) {
        Object user = session.getAttribute("user");
        if (user == null) {
            return false;
        }
        return true;
    }
}
```

session์ ํ์ฉํ๋ฉด, ํด๋ผ์ด์ธํธ์ ์๋ฒ ๊ฐ ์ํ ๊ณต์ ๋ฅผ ์ํด ์ ๋ฌํ๋ ๋ฐ์ดํฐ๋ session ์์ด๋ ๋ฟ์ด๋ค.
- ์์ธกํ  ์ ์๋๋ก ์์ฑํ๋ ๊ฒ์ ๋ณด์์ธก๋ฉด์์ ์ค์ํ๋ค.

์ฟ ํค๋ ๋ณด์ ๊ฐํ๋ฅผ ์ํด 
- `domain` : ์ฟ ํค์ ์ ๊ทผ ๊ฐ๋ฅํ ๋๋ฉ์ธ์ ์ง์ ํ๋ ์์ฑ
- `path` : ์น์๋ฒ์ ํน์  URL์ ์ง์ ํ๋ ์์ฑ
- `max-age` : ์ฟ ํค๋ฅผ ์ผ๋ง๋ ์ ์งํ  ๊ฒ์ธ์ง๋ฅผ ์ง์ ํ๋ ์์ฑ (์ด ๋จ์)
- `expires` : max-age์ ๋์ผํ ์ญํ , ์ ํจํ ๋ ์ง๋ฅผ ์ง์ ํ๋ ์์ฑ
- `secure` : httpsํต์ ์์๋ง ์ฟ ํค์ ์ ๊ทผํ๋๋ก ์ง์ ํ๋ ์์ฑ

์์ฑ์ ์ฌ์ฉํ  ์ ์๋ค.

> ๋จ์ํ session๋ง ์ฌ์ฉํ๋ค๊ณ  ํด์ ๋ณด์ ๋ฌธ์ ๊ฐ ํด๊ฒฐ๋๋ ๊ฒ์ ์๋๋ค.

---

## ๐ฉ MVC ํ๋ ์์ํฌ ์๊ตฌ์ฌํญ 1๋จ๊ณ
MVC ํจํด์ด ์ฌ์ฉ๋๊ธฐ ์ , ๋๋ถ๋ถ์ ์น ์ ํ๋ฆฌ์ผ์ด์ ๊ฐ๋ฐ์ JSP์ ๋๋ถ๋ถ์ ๋ก์ง์ ํฌํจํ๊ณ  ์์๋ค. ํ์ง๋ง ์ด๋ ์ด๊ธฐ ๊ฐ๋ฐ ์๋๋ ๋น ๋ฅด์ง๋ง **์ ์ง๋ณด์ ๋น์ฉ์ด ์ฆ๊ฐ**ํ๋ ๋ฌธ์ ๋ฅผ ๊ฐ์ง๊ณ  ์์๋ค. ๋ฐ๋ผ์ ์ ์ง๋ณด์ ๋น์ฉ์ ์ค์ด๊ธฐ ์ํด **MVC(Model, View, Controller) ํจํด ๊ธฐ๋ฐ**์ผ๋ก ์น ์ ํ๋ฆฌ์ผ์ด์์ ๊ฐ๋ฐํ๋ ๋ฐฉํฅ์ผ๋ก ๋ฐ์ ํ๋ค.
- JSP์ ์ง์ค๋์๋ ๋ก์ง์ `Model`, `View`, `Controller` 3๊ฐ์ ์ญํ ๋ก ๋ถ๋ฆฌ ๊ฐ๋ฐ (like ์ผ๊ถ๋ถ๋ฆฝ)

**MVC ํจํด ๊ธฐ๋ฐ ๊ฐ๋ฐ ์ ์์ฒญ๊ณผ ์๋ต ํ๋ฆ**
<img src="https://user-images.githubusercontent.com/33208303/158940954-8b29b986-3019-4ec8-bcb9-37574c618079.png" width="80%">

**MVC ํจํด ๊ธฐ๋ฐ ๊ฐ๋ฐ ์ ์์ฒญ๊ณผ ์๋ต ํ๋ฆ + ์์ค์ฝ๋**
<img src="https://user-images.githubusercontent.com/33208303/158940959-c4ea361a-fe76-40d3-b4b9-c95d9df8bbe7.png" width="80%">

MVC ํจํด์ ์ ์ฉํ๋ ๊ฒฝ์ฐ ๊ธฐ์กด๊ณผ ๋ค๋ฅธ ์ ์ "ํด๋ผ์ด์ธํธ ์์ฒญ์ด ์ฒ์ ์ง์ํ๋ ๋ถ๋ถ์ด ์ปจํธ๋กค๋ฌ"๋ผ๋ ๊ฒ์ด๋ค.
- ๊ธฐ์กด์๋ ๋ทฐ์ ํด๋นํ๋ JSP๊ฐ ์์ฒญ์ ์ฒซ ์ง์๋ถ์๋ค.
- MVC ํจํด์ ์ ์ฉํ๋ฉด **๋๋ถ๋ถ์ ๋ก์ง์ ์ปจํธ๋กค๋ฌ์ ๋ชจ๋ธ์ด ๋ด๋น**ํ๊ณ , ๋ทฐ์ ํด๋นํ๋ **JSP**๋ **์ปจํธ๋กค๋ฌ์์ ์ ๋ฌํ ๋ฐ์ดํฐ๋ฅผ ์ถ๋ ฅํ๋ ๋ก์ง๋ง**์ ํฌํจํ๋ค.
  - ๋ฐ๋ผ์ JSP์ ๋ณต์ก๋๋ ๋ฎ์์ง๋ค.

> ํ๋ ์์ํฌ๋ ๊ฐ๋ฐ์ ๊ฐ์ ์ญ๋ ์ฐจ์ด๊ฐ ์๋๋ผ๋ MVC ํจํด์ ์ ์ฉํด **์ผ๊ด์ฑ ์๋ ์ฝ๋**๋ฅผ ๊ตฌํํ๋๋ก ๊ฐ์ ํ๋ค. 

**ํ๋ ์์ํฌ์ ๋ผ์ด๋ธ๋ฌ๋ฆฌ**<br/>
๋ชจ๋ ์ ํ๋ฆฌ์ผ์ด์ ๊ฐ๋ฐ์์ ๋ฐ์ํ๋ ์ค๋ณต ์ฝ๋๋ฅผ ์ ๊ฑฐํด **์ฌ์ฌ์ฉ์ฑ์ ๋์**์ผ๋ก์จ **๊ฐ๋ฐ ์๋๋ฅผ ๋น ๋ฅด๊ฒ ํ๊ธฐ ์ํ ๋ชฉ์ **์ ๊ฐ์ง์ง๋ง, ๊ฐ์ฅ ํฐ ์ฐจ์ด๋ก๋
- **ํ๋ ์์ํฌ**๋ ํน์  ํจํด ๊ธฐ๋ฐ์ผ๋ก ๊ฐ๋ฐํ๋๋ก ๊ฐ์ ํ๋ ์ญํ ์ด๊ณ ,
- **๋ผ์ด๋ธ๋ฌ๋ฆฌ**๋ ๊ฐ์ ํ๋ ๋ถ๋ถ์ด ์๋ค.

### ๐ง ์๊ตฌ์ฌํญ
: "MVC ํจํด์ ์ง์ํ๋ ํ๋ ์์ํฌ๋ฅผ ๊ตฌํํ๋ ๊ฒ"

MVC ํจํด์ ์ง์ํ๋ ๊ธฐ๋ณธ์ ์ธ ๊ตฌ์กฐ๋ **๋ชจ๋  ์์ฒญ์ ํ๋์ ์๋ธ๋ฆฟ์ด ๋ฐ์ ํ ์์ฒญ URL์ ๋ฐ๋ผ ๋ถ๊ธฐ ์ฒ๋ฆฌํ๋ ๋ฐฉ์**์ผ๋ก ๊ตฌํํ๋ฉด ๋๋ค.

MVC ํจํด์ ์ฌ์ฉ์์ ์ต์ด ์ง์ ์ง์ ์ด **์ปจํธ๋กค๋ฌ**์ด๋ค. ๋ฐ๋ผ์ JSP(๋ทฐ) ์ง์  ์ ๊ทผํ์ง ์๋๋ก ํด์ผ ํ๋ค. ์๋๋ MVC ํ๋ ์์ํฌ๋ฅผ ๊ตฌํํ์ ๋์ ํด๋์ค ๋ค์ด์ด๊ทธ๋จ์ด๋ค.

<img src="https://user-images.githubusercontent.com/33208303/158940961-e96c2bd1-e0f1-4297-b01a-20f9a10e4770.png" width="80%">

- ๋ชจ๋  ์์ฒญ์ `DispatcherServlet` ์ด ๋ฐ์ ํ ์์ฒญ URL์ ๋ฐ๋ผ ํด๋น ์ปจํธ๋กค๋ฌ์ ์์์ ์์ํ๋ค.
  - `@WebServlet` ์ผ๋ก URL ๋งคํ ์, `urlPatterns="/"` ์ ๊ฐ์ด ์ค์ ํ์ฌ ๋ชจ๋  ์์ฒญ URL์ด `DispatcherServlet` ์ผ๋ก ์ฐ๊ฒฐ๋๋๋ก ํ๋ค.
- CSS, JS, Image์ ๊ฐ์ ์ ์  ์์์ ์ปจํธ๋กค๋ฌ๊ฐ ํ์์๋ค. ํ์ง๋ง ์์ ๊ฐ์ ๋งคํ ๋ฐฉ์์ ์ ์  ์์์ ๋ํ ์์ฒญ๊น์ง `DispatcherServlet` ์ผ๋ก ๋งคํ๋์ด๋ฒ๋ฆฐ๋ค. 
  - ์ด๋ฅผ ์ํด ์ ์  ์์์ ์ฒ๋ฆฌํ๋ ์๋ธ๋ฆฟ ํํฐ๋ฅผ ์ถ๊ฐํ๋ค. (`core.web.filter.ResourceFilter`)

> **์๋ธ๋ฆฟ ํํฐ(Servlet Filter)**<br/>
> ์๋ธ๋ฆฟ ์คํ ์  ๋๋ ํ์ ํน์  ์์์ ํ๊ณ ์ ํ  ๋ ์ฌ์ฉํ๋ค. ์๋ก๋ ์ธ์ฆ ํํฐ, ๋ก๊น ๋ฐ ๊ฐ์ ํํฐ, ์ํธํ ํํฐ, ๋ก๊ทธ ์์ฑ ๋ฑ์ด ์๋ค.

### ๐ง ์๊ตฌ์ฌํญ ๋ถ๋ฆฌ ๋ฐ ํํธ
- ๋ชจ๋  ์์ฒญ์ ์๋ธ๋ฆฟ ํ๋(`DispatcherServlet`)๊ฐ ๋ฐ์ ์ ์๋๋ก URL ๋งคํํ๋ค.
- `Controller` ์ธํฐํ์ด์ค๋ฅผ ์ถ๊ฐํ๋ค.
- ์๋ธ๋ฆฟ์ผ๋ก ๊ตฌํ๋ ํ์๊ด๋ฆฌ ๊ธฐ๋ฅ์ `Controller` ์ธํฐํ์ด์ค ๊ธฐ๋ฐ์ผ๋ก ๋ค์ ๊ตฌํํ๋ค. 
  - `execute()` ๋ฉ์๋์ ๋ฐํ ๊ฐ์ ๋ฆฌ๋ค์ด๋ ํธ ๋ฐฉ์์ผ๋ก ์ด๋ํ  ๊ฒฝ์ฐ `redirect:` ๋ก ์์ํ๊ณ , ํฌ์๋ ๋ฐฉ์์ผ๋ก ์ด๋ํ  ๊ฒฝ์ฐ JSP ๊ฒฝ๋ก๋ฅผ ๋ฐํํ๋ค.
- `RequestMapping` ํด๋์ค๋ฅผ ์ถ๊ฐํด ์์ฒญ URL๊ณผ ์ปจํธ๋กค๋ฌ ๋งคํ์ ์ค์ ํ๋ค.
- ํน๋ณํ ๋ก์ง ์์ด ๋ทฐ(JSP)์ ๋ํ ์ด๋๋ง์ ๋ด๋นํ๋ `ForwardController` ๋ฅผ ์ถ๊ฐํ๋ค. (ํ์๊ฐ์ ํ๋ฉด(`/user/form.jsp`), ๋ก๊ทธ์ธ ํ๋ฉด(`/user/login.jsp`))
- `DispatcherServlet` ์์ ์์ฒญ URL์ ํด๋นํ๋ `Controller` ๋ฅผ ์ฐพ์ `execute()` ๋ฉ์๋๋ฅผ ํธ์ถํด ์ค์ง์ ์ธ ์์์ ์์ํ๋ค.
- `Controller` ์ `execute()` ๋ฉ์๋ ๋ฐํ ๊ฐ `String` ์ ๋ฐ์ ์๋ธ๋ฆฟ์์ JSP๋ก ์ด๋ํ  ๋์ ์ค๋ณต์ ์ ๊ฑฐํ๋ค.

---

## ๐ฉ MVC ํ๋ ์์ํฌ ๊ตฌํ 1๋จ๊ณ
ํด๋ผ์ด์ธํธ ์์ฒญ์ ๋ํ ์ฒ๋ฆฌ๋ฅผ ๋ด๋นํ๋ ๋ถ๋ถ์ **`Controller` ๋ผ๋ ์ธํฐํ์ด์ค๋ก ์ถ์ํ**ํ  ์ ์๋ค.

```java
public interface Controller {
    String execute(HttpServletRequest req, HttpServletResponse resp)
        throws Exception;
}
```

์ง๊ธ๊น์ง `HttpServlet` ์ ์์ํด ๊ตฌํํ ์๋ธ๋ฆฟ ์ฝ๋๋ค์ `Controller` ์ธํฐํ์ด์ค๋ฅผ ์์ํด ๊ตฌํํ๋๋ก ๋ณ๊ฒฝํ๋ค.

```java
@WebServlet("/users")
public class ListUserController implements Controller {

    @Override
    public String execute(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        if (!UserSessionUtils.isLogined(req.getSession())) {
            return "redirect:/users/loginForm";
        }

        req.setAttribute("users", DataBase.findAll());
        return "/user/list.jsp";
    }
}
```

- ์๋ธ๋ฆฟ์์ JSP๋ก ์ด๋ํ  ๋ ๊ตฌํํด์ผ ํ๋ ์ค๋ณต ์ฝ๋๊ฐ ์ ๊ฑฐ๋์๋ค.

ํน๋ณํ ๋ก์ง ๊ตฌํ์ด ํ์ ์์ด ๋ทฐ์ ๋ํ ์ด๋๋ง์ ๋ด๋นํ๋ ๊ฒฝ์ฐ ์ปจํธ๋กค๋ฌ ์์ฑ์ด ๋ถํฉ๋ฆฌํ๋ค๊ณ  ํ๋จํด, ๋ทฐ์ ๋ํ ์ด๋๋ง์ ๋ด๋นํ๋ ์ปจํธ๋กค๋ฌ๋ฅผ ์์ฑํ๋ค. (`ForwardController`)

```java
public class ForwardController implements Controller {
    private String forwardUrl;

    public ForwardController(String forwardUrl) {
        this.forwardUrl = forwardUrl;
        if (forwardUrl == null) {
            throw new NullPointerException("forwardUrl is null. ์ด๋ํ  URL์ ์๋ ฅํ์ธ์.");
        }
    }

    @Override
    public String execute(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        return forwardUrl;
    }
}
```

๋ชจ๋  ์๋ธ๋ฆฟ๋ค์ด `Controller` ์ธํฐํ์ด์ค๋ฅผ ์์ํ๋๋ก ๊ตฌํํ ํ, ์์ฒญ URL๊ณผ ์ปจํธ๋กค๋ฌ ๋งคํ์ ๋ด๋นํ๋ `RequestMapping` ์ ์์ฑํ๋ค.

```java
public class RequestMapping {
    private static final Logger logger = LoggerFactory.getLogger(DispatcherServlet.class);
    private Map<String, Controller> mappings = new HashMap<>();

    void initMapping() {
        mappings.put("/", new HomeController());
        mappings.put("/users/form", new ForwardController("/user/form.jsp"));
        mappings.put("/users/loginForm", new ForwardController("/user/login.jsp"));
        mappings.put("/users", new ListUserController());
        mappings.put("/users/login", new LoginController());
        mappings.put("/users/profile", new ProfileController());
        mappings.put("/users/logout", new LogoutController());
        mappings.put("/users/create", new CreateUserController());
        mappings.put("/users/updateForm", new UpdateFormUserController());
        mappings.put("/users/update", new UpdateUserController());

        logger.info("Initialized Request Mapping!");
    }

    public Controller findController(String url) {
        return mappings.get(url);
    }

    void put(String url, Controller controller) {
        mappings.put(url, controller);
    }
}
```

- ๋ฐ์ํ๋ ๋ชจ๋  ์์ฒญ URL๊ณผ ์๋น์ค๋ฅผ ๋ด๋นํ  ์ปจํธ๋กค๋ฌ๋ฅผ ์ฐ๊ฒฐํ์ฌ `Map` ์ผ๋ก ์ ์ฅํ๋ค.

๋ง์ง๋ง ์์์ ํด๋ผ์ด์ธํธ์ ๋ชจ๋  ์์ฒญ์ ๋ฐ์ URL์ ํด๋นํ๋ ์ปจํธ๋กค๋ฌ๋ก ์์์ ์์ํ๊ณ , ์คํ๋ ๊ฒฐ๊ณผ ํ์ด์ง๋ก ์ด๋ํ๋ ์์์ด๋ค. ์ด๋ `DispatcherServlet` ์์ ๊ตฌํํ๋ค. (ํด๋์ค ๋ค์ด์ด๊ทธ๋จ์์ ํด๋ผ์ด์ธํธ์ ์์ฒญ์ ๋ฐ๋ ์ง์ )

```java
@WebServlet(name = "dispatcher", urlPatterns = "/", loadOnStartup = 1)
public class DispatcherServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Logger logger = LoggerFactory.getLogger(DispatcherServlet.class);
    private static final String DEFAULT_REDIRECT_PREFIX = "redirect:";

    private RequestMapping rm;

    @Override
    public void init() throws ServletException {
        rm = new RequestMapping();
        rm.initMapping();
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String requestUri = req.getRequestURI();
        logger.debug("Method : {}, Request URI : {}", req.getMethod(), requestUri);

        Controller controller = rm.findController(requestUri);
        try {
            String viewName = controller.execute(req, resp);
            move(viewName, req, resp);
        } catch (Throwable e) {
            logger.error("Exception : {}", e);
            throw new ServletException(e.getMessage());
        }
    }

    private void move(String viewName, HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        if (viewName.startsWith(DEFAULT_REDIRECT_PREFIX)) {
            resp.sendRedirect(viewName.substring(DEFAULT_REDIRECT_PREFIX.length()));
            return;
        }

        RequestDispatcher rd = req.getRequestDispatcher(viewName);
        rd.forward(req, resp);
    }
}
```

- `urlPatterns = "/"` ๋ก ๋งคํํ์ฌ ๋ชจ๋  ์์ฒญ URL์ด `DispatcherServlet` ์ผ๋ก ๋งคํ๋๋๋ก ํ๋ค.
  - ์ผ๋ฐ์ ์ผ๋ก ๋ชจ๋  ์์ฒญ URL์ ๋งคํํ๋ค๊ณ  ํ๋ฉด `"/*"` ์ผ๋ก ์๊ฐํ  ์๋ ์๋ค. ํ๋ฆฌ์ง ์์์ง๋ง, ์ด๋ ๊ฒ ํ๊ฒ ๋๋ฉด ๋ชจ๋  JSP์ ๋ํ ์์ฒญ ๋ํ ๋งคํ๋์ด JSP์ ๋ํ ์์ฒญ์ด ์ ์์ ์ผ๋ก ์ฒ๋ฆฌ๋์ง ์๋๋ค.
- `"/"` ๋งคํ์ ๋งคํ๋์ด ์๋ ์๋ธ๋ฆฟ, JSP ์์ฒญ์ด ์๋ JS, CSS, Images์ ๊ฐ์ ์์ฒญ์ ์ฒ๋ฆฌํ๋๋ก ์ค๊ณ๋์๋ค. ํฐ์บฃ ์๋ฒ ๊ธฐ๋ณธ ์ค์ ์์, `"/"` ์ค์ ์ `"default"` ๋ผ๋ ์ด๋ฆ์ ๊ฐ์ง๋ ์๋ธ๋ฆฟ์ ๋งคํํด ์ ์  ์์์ ์ฒ๋ฆฌํ๋๋ก ๊ตฌํ๋์ด ์๋ค.
  - ํด๋น ์ค์ ์ `DispatcherServlet` ์์ ์ฌ์ ์ํ์ฌ JSP์ ๋ํ ์์ฒญ์ ์ ์ธํ ๋ชจ๋  ์์ฒญ์ ๋ด๋นํ๋๋ก ๊ตฌํํ๋ค.
- `"default"` ์๋ธ๋ฆฟ์์ ์ฒ๋ฆฌํ๋ ์ ์  ์์์ ๋ํ ์ฒ๋ฆฌ๋ `DispatcherServlet` ์ผ๋ก ์์ฒญ๋๊ธฐ ์ ์ `ResourceFilter` ์์ ์ฒ๋ฆฌํ๋๋ก ๊ตฌํํ๋ค.

**์ฃผ์ํ  ์ **
- `HomeController` ์์ `"/"` ๋ก ๋งคํํ ํ `localhost:8080` ์์ฒญ์ ๊ฒฝ์ฐ, ์น ์์์ ๊ด๋ฆฌํ๋ `webapp` ๋๋ ํ ๋ฆฌ์ `index.jsp` ๊ฐ ์กด์ฌํ๋ฉด `HomeController` ๊ฐ ์๋ `index.jsp` ๋ก ์์ฒญ์ด ์ฒ๋ฆฌ๋๋ค.
  - ์ด๋ `path` ๊ฐ ์๋ ๊ฒฝ์ฐ ์ฒ๋ฆฌ๋ฅผ ๋ด๋นํ๋ ๊ธฐ๋ณธ ํ์ผ์ด `index.jsp` ๋ก ์ค์ ๋์ด ์๊ธฐ ๋๋ฌธ์ด๋ค.
  - ์ด๋ฌํ ์ด์ ๋ก `HomeController` ์์ ์ด๋ํ  ๋ทฐ์ ์ด๋ฆ์ด `home.jsp` ์ด๋ค.

**`loadOnStartup`** ์์ฑ
- ์๋ธ๋ฆฟ ์ธ์คํด์ค๋ฅผ ์์ฑํ๋ ์์ ๊ณผ ์ด๊ธฐํ๋ฅผ ๋ด๋นํ๋ `init()` ๋ฉ์๋๋ฅผ ์ด๋ ์์ ์ ํธ์ถํ  ๊ฒ์ธ๊ฐ๋ฅผ ๊ฒฐ์ ํ๋ ์ค์ 
  - **์ด๋ฅผ ํ์ง ์์ ๊ฒฝ์ฐ** ์๋ธ๋ฆฟ ์ธ์คํด์ค ์์ฑ๊ณผ ์ด๊ธฐํ๋ ์๋ธ๋ฆฟ ์ปจํ์ด๋๊ฐ ์์์ ์๋ฃํ ํ **ํด๋ผ์ด์ธํธ์ ์์ฒญ์ด ์ต์ด๋ก ๋ฐ์ํ๋ ์์ ์ ์งํ**๋๋ค.
  - **์ค์ ํ ๊ฒฝ์ฐ ์๋ธ๋ฆฟ ์ปจํ์ด๋๊ฐ ์์ํ๋ ์์ ์ ์๋ธ๋ฆฟ ์ธ์คํด์ค ์์ฑ๊ณผ ์ด๊ธฐํ๊ฐ ์งํ**๋๋ค.
- ์ค์ ์ ์ซ์ ๊ฐ์ผ๋ก ์๋ธ๋ฆฟ์ ์ด๊ธฐํ ์์๋ฅผ ๊ฒฐ์ ํ๋ค. (๋ฎ์ ์์ผ๋ก ๋จผ์  ์งํ)

**`move()` ๋ฉ์๋**
- ๊ฐ ์๋ธ๋ฆฟ์์ ์๋ธ๋ฆฟ๊ณผ JSP ์ฌ์ด๋ฅผ ์ด๋ํ๊ธฐ ์ํด ๊ตฌํํ ๋ชจ๋  ์ค๋ณต ์ฝ๋๋ฅผ ๋ด๋นํ๋ค.

**ํ๋ก ํธ ์ปจํธ๋กค๋ฌ(front controller) ํจํด**
- ๊ฐ ์ปจํธ๋กค๋ฌ์ ์์ ๋ชจ๋  ์์ฒญ์ ๋ฐ์ ๊ฐ ์ปจํธ๋กค๋ฌ์ ์์์ ์์ํ๋ ๋ฐฉ์์ผ๋ก ๊ตฌํํ๋ ๊ฒ

**MVC ํ๋ ์์ํฌ ๊ธฐ๋ฐ์ผ๋ก ์์ฒญ์์ ์๋ต๊น์ง์ ํ๋ฆ**
- ํด๋ผ์ด์ธํธ์ ์์ฒญ ๋ฐ์
- `ServletFilter`(`ResourceFilter`) ์์์ ์ ์ฒ๋ฆฌ
- `DispatcherServlet` ์ผ๋ก ์์ฒญ ์ ๋ฌ
- `RequestMapping` ์ url์ ์ ๋ฌํ๊ณ  ํด๋น ์ฒ๋ฆฌ๋ฅผ ๋งก์ `Controller` ๋ฅผ ๋ฐํ
- `Controller` ๊ฐ ์์์ ์ฒ๋ฆฌ
- ์๋ต์ ๋ณด๋ด๊ธฐ ์  `ServletFilter` ์์์ ํ์ฒ๋ฆฌ
- ํด๋ผ์ด์ธํธ๋ก ์๋ต์ ์ ์ก

---

## ๐ฉ ์ ์คํฌ๋ฆฝํธ๋ฅผ ํ์ฉํ ๋ฐฐํฌ ์๋ํ
์๊ฒฉ ์๋ฒ์ ํฐ์บฃ ์๋ฒ๋ฅผ ์ค์นํ๊ณ , ์ง๊ธ๊น์ง ๊ตฌํํ ์์ค์ฝ๋๋ฅผ ๋ฐฐํฌํ๋ค. ์๋์ผ๋ก ๋ฐฐํฌํ๋ ์์์ ์ ์คํฌ๋ฆฝํธ๋ฅผ ํ์ฉํด ์๋ํํ๋ ๊ณผ์ ๊น์ง ์งํํ๋ค.

### ๐ง ์๊ตฌ์ฌํญ
- ๊ตฌํํ ๊ธฐ๋ฅ์ ๊ฐ๋ฐ ์๋ฒ์ ํฐ์บฃ ์๋ฒ๋ฅผ ์ค์นํ ํ ๋ฐฐํฌํ๋ค.
- ํฐ์บฃ ๋ก๊ทธ ํ์ผ์ ํตํด ์๋ฒ์ ์ ์์ ์ธ ์คํ์ ํ์ธํ๋ค.
- ์ ์คํฌ๋ฆฝํธ๋ฅผ ๋ง๋ค์ด ๋ฐฐํฌ๋ฅผ ์๋ํํ๋ค.

## ๐ ์ถ์ฒ
- **์๋ฐ ์น ํ๋ก๊ทธ๋๋ฐ Next Step : ํ๋์ฉ ๋ฒ๊ฒจ๊ฐ๋ ์ํ๊ป์ง ํ์ต๋ฒ** - ๋ฐ์ฌ์ฑ
- [์๋ธ๋ฆฟ ํํฐ](https://atoz-develop.tistory.com/entry/Servlet-Filter-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
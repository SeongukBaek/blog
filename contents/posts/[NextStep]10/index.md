---
title: "๐ 10์ฅ ์๋ก์ด MVC ํ๋ ์์ํฌ ๊ตฌํ์ ํตํ ์ ์ง์  ๊ฐ์ "
description: "์๋ฐ ์น ํ๋ก๊ทธ๋๋ฐ ์ฑ ์ ๋ฆฌ"
date: 2022-02-18
update: 2022-02-18
tags:
  - Java
  - Refactoring
  - Framework
series: "๐ ์๋ฐ ์น ํ๋ก๊ทธ๋๋ฐ Next Step"
---

<em>[์๋ฐ ์น ํ๋ก๊ทธ๋๋ฐ Next Step - ๋ฐ์ฌ์ฑ]์ ์ฝ๊ณ  ์ธ์ฉํ๊ณ  ์ ๋ฆฌํ๋ POST์๋๋ค.</em>

"์๋ก์ด ์ ํ๋ฆฌ์ผ์ด์์ ๊ฐ๋ฐํ๋ ์์์ ์ฝ์ง ์์ ์์์ด๋ค. ํ์ง๋ง ๊ทธ๋ณด๋ค ๋ ์ด๋ ค์ด ์์์ ๋๊ตฐ๊ฐ ๊ฐ๋ฐํด๋์ ์ ํ๋ฆฌ์ผ์ด์์ ์ง์์ ์ผ๋ก ๊ธฐ๋ฅ ์ถ๊ฐ, ๊ฐ์ ์ ํ๋ฉด์ ๊ธฐ์ ์ ์ผ๋ก ๊ณ์ํด์ ๋ฐ์ ์์ผ ๋๊ฐ๋ ์์์ด๋ค."

> ์ง๊ธ๊น์ง ๊ตฌํํ MVC ํ๋ ์์ํฌ์ ๋ฌธ์ ์ ์ ํ์ํ ํ ์๋ก์ด MVC ํ๋ ์์ํฌ๋ฅผ ๊ตฌํํ๋ค. ์ด์ ์ ๊ตฌํํ MVC ํ๋ ์์ํฌ ๊ธฐ๋ฐ์ผ๋ก ๋์ํ๋ ์ปจํธ๋กค๋ฌ๊ฐ ์ ์์ ์ผ๋ก ๋์ํ๋ ์ํ์์ ์๋ก์ด MVC ํ๋ ์์ํฌ๋ก ์ ์ง์ ์ผ๋ก ์ ํํด๊ฐ๋ ๊ณผ์ ์ ๋ํด ์ดํด๋ณธ๋ค.

## ๐ฉ MVC ํ๋ ์์ํฌ ์๊ตฌ์ฌํญ 3๋จ๊ณ
์๋ฐ์ ๋ฆฌํ๋ ์ API์ ๋ํ ํ์ฉ๊ณผ ๊ตฌํํด์ผ ํ  ํด๋์ค๊ฐ ๋ง์์ ธ ๋์ด๋๊ฐ ๋์์ง๋ค. 

### ๐ง ์๊ตฌ์ฌํญ
9์ฅ ์ค๊ฐ ์ ๊ฒ์ ๋ง์ง๋ง ๋ฌธ์ ๋ฅผ ๋ณด๋ฉด, ์๋ก์ด ์ปจํธ๋กค๋ฌ ์ถ๊ฐ๋ง๋ค ๋งค๋ฒ `RequestMapping` ํด๋์ค์ ์์ ์ฌํญ์ด ๋ฐ์ํ๋ ๊ฒ์ ๋ํ ๊ท์ฐฎ์์ ์ ๊ธฐํ๋ค. ์ ์ง๋ณด์ ์ฐจ์์์ ์ปจํธ๋กค๋ฌ์ ์๊ฐ ๊ณ์ ์ฆ๊ฐํ๊ณ  ์๊ณ , ๊ฐ ์ปจํธ๋กค๋ฌ์ `execute()` ๋ฉ์๋๋ฅผ ๋ณด๋ฉด, 10์ค ์ด์์ธ ๊ฒฝ์ฐ๋ ๊ฑฐ์ ์๋ค.

" ๋ฐ๋ผ์, ์๋ก์ด ๊ธฐ๋ฅ์ด ์ถ๊ฐ๋  ๋๋ง๋ค ๋งค๋ฒ ์ปจํธ๋กค๋ฌ๋ฅผ ์ถ๊ฐํ๋ ๊ฒ์ด ์๋ **๋ฉ์๋๋ฅผ ์ถ๊ฐํ๋ ๋ฐฉ์**์ด๋ฉด ๋ ํจ์จ์ ์ผ ๋ฏํ๋ค. "

๋ ํ ๊ฐ์ง ์์ฌ์ด ์ ์ **์์ฒญ URL ๋งคํ ์, HTTP ๋ฉ์๋ ์ ๋ณด๋ ํจ๊ป ๋งคํ**๋๋ฉด ์ข์ ๊ฒ ๊ฐ๋ค. URL์ ๊ฐ์ง๋ง, ๋ค๋ฅธ ๊ธฐ๋ฅ ์ํ์ ์ํด ๋ค๋ฅธ ๋ฉ์๋๋ก ๋งคํํ๋ ๊ฒ ๋ํ ๊ฐ๋ฅํ๋ฉด ์ข์ ๊ฒ ๊ฐ๋ค.

```java
@Controller
public class MyController {
    private static final Logger log = LoggerFactory.getLogger(MyController.class);

    @RequestMapping("/users")
    public ModelAndView list(HttpServletRequest req, HttpServletResponse res) {
        log.debug("users findUserId");
        return new ModelAndView(new JspView("/users/list.jsp"));
    }

    @RequestMapping(value = "/users/show", method = RequestMethod.GET)
    public ModelAndView show(HttpServletRequest req, HttpServletResponse res) {
        log.debug("users findUserId");
        return new ModelAndView(new JspView("/users/show.jsp"));
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ModelAndView create(HttpServletRequest req, HttpServletResponse res) {
        log.debug("users create");
        return new ModelAndView(new JspView("redirect:/users"));
    }
}
```

- ์ ๊ธฐ๋ฅ์ ์ง์ํ๋ annotation ๊ธฐ๋ฐ์ ์๋ก์ด MVC ํ๋ ์์ํฌ๋ฅผ ๊ตฌํํด์ผ ํ๋ค.
  - ์ค์ต์ ์ํด ๋ผ๋๊ฐ ๋๋ ์ฝ๋์ ํ์คํธ ์ฝ๋๊ฐ ์๊ณ , ํด๋น ํ์คํธ ํด๋์ค์ 3๊ฐ์ ํ์คํธ ๋ฉ์๋๋ค์ด ์ฑ๊ณตํ๋ฉด ๊ตฌํ์ด ์๋ฃ๋ ๊ฒ์ด๋ค.

์๋ก์ด MVC ํ๋ ์์ํฌ๋ฅผ ์ถ๊ฐํ์ผ๋ ์ด์ ์ ๊ตฌํํ ์ปจํธ๋กค๋ฌ๋ฅผ **annotation** ๊ธฐ๋ฐ์ผ๋ก ๋ณ๊ฒฝํด์ผ ํ๋ค. 
- ํ์ง๋ง ์ ํ๋ ์์ํฌ ์ ์ฉ์ ์ํด ํ ๋ฒ์ ๋ชจ๋  ์ปจํธ๋กค๋ฌ๋ฅผ ๋ณ๊ฒฝํ๊ฒ ๋๋ฉด, ์ผ์  ๊ธฐ๊ฐ ๋์ ์๋ก์ด ๊ธฐ๋ฅ์ ์ถ๊ฐํ๊ฑฐ๋ ๋ณ๊ฒฝํ๋ ์์์ ์ค๋จํด์ผ ํ๋ค.
  - ์ด๋ฅผ ๋ณด์ํ๊ธฐ ์ํด **์ ์ง์  ๋ฆฌํฉํ ๋ง์ด ๊ฐ๋ฅํ ๊ตฌ์กฐ๋ก ๊ฐ๋ฐ**ํด์ผ ํ๋ค.

**์ ์ง์  ๋ฆฌํฉํ ๋ง์ด ๊ฐ๋ฅํ ๊ตฌ์กฐ**<br/>
- annotation ๊ธฐ๋ฐ์ผ๋ก MVC ํ๋ ์์ํฌ๋ฅผ ๊ตฌํํ ํ ๋ ๊ฑฐ์ MVC ํ๋ ์์ํฌ(8์ฅ์์ ๊ตฌํํ๋ MVC ํ๋ ์์ํฌ)์ annotation ๊ธฐ๋ฐ์ ์๋ก์ด MVC ํ๋ ์์ํฌ๋ฅผ ํตํฉํ๋ ๋ฐฉ์์ผ๋ก ๊ตฌํํด์ผ ํ๋ค.
- ex. ์์ฒญ URL๊ณผ ์ปจํธ๋กค๋ฌ๋ฅผ ๋งคํํ๋ ํด๋์ค๊ฐ ๋ ๊ฑฐ์ MVC ํ๋ ์์ํฌ = `LegacyHandlerMapping` , ์๋ก์ด MVC ํ๋ ์์ํฌ = `AnnotationHandlerMapping` ์ด๋ผ๋ฉด `DispatcherServlet` ์์ ์ด ๋์ ํตํฉํด ๋ ํํ์ ์ปจํธ๋กค๋ฌ๊ฐ ๋ชจ๋ ๋์ ๊ฐ๋ฅํ๋๋ก ๊ตฌํํ  ์ ์๋ค.

```java
@WebServlet(name = "dispatcher", urlPatterns = "/", loadOnStartup = 1)
public class DispatcherServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Logger logger = LoggerFactory.getLogger(DispatcherServlet.class);

    private LegacyHandlerMapping lhm;
    private AnnotationHandlerMapping ahm;

    @Override
    public void init() throws ServletException {
        lhm = new LegacyHandlerMapping();
        lhm.initMapping();
        ahm = new AnnotationHandlerMapping("next.controller");
        ahm.initialize();
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            Controller controller = lhm.findController(req.getRequestURI());
            if (controller != null) {
                render(req,resp,controller.execute(req, resp));
            } else {
                HandlerExecution he = ahm.getHandler(req);
                if (he == null) {
                    throw new ServletException("์ ํจํ์ง ์์ ์์ฒญ์๋๋ค.");
                }
                render(req, resp, he.handle(req, resp));
            }
        } catch (Throwable e) {
            throw new ServletException(e.getMessage());
        }
    }

    private void render (HttpServletRequest req, HttpServletResponse resp, ModelAndView mav) throws Exception {
        View view = mav.getView();
        view.render(mav.getModel(), req, resp);
    }
}
```

- `HandlerExecution` ์ ์๋ก ์ถ๊ฐํ MVC ํ๋ ์์ํฌ์ ์ปจํธ๋กค๋ฌ์ ๊ฐ์ ์ญํ ์ ํ๋ ํด๋์ค์ด๋ค.
- ์์ ๊ฐ์ ๊ตฌ์กฐ๋ก ๊ตฌํํ๋ค๋ฉด ์๋ก ๋ค๋ฅธ ์ปจํธ๋กค๋ฌ๋ฅผ ๊ฐ์ด ์๋น์คํ๋ ๊ฒ์ด ๊ฐ๋ฅํ  ๊ฒ์ด๋ค.

์ค์ต์ 1์ฐจ ๋ชฉํ๋ "๋ ๊ฑฐ์ MVC ํ๋ ์์ํฌ์ annotation ๊ธฐ๋ฐ์ ์๋ก์ด MVC ํ๋ ์์ํฌ๊ฐ ๋์์ ์๋น์ค ๊ฐ๋ฅํ๋๋ก ๊ตฌํํ๋ ๊ฒ"์ด๋ค.
- 1์ฐจ ๊ตฌํ์ ์๋ฃํ ํ, ๋ฆฌํฉํ ๋งํ  ๋ถ๋ถ์ ์ฐพ์๋ณด๋ฉด 2๊ฐ์ ํ๋ ์์ํฌ๊ฐ ๊ณต์กดํ๊ธฐ์ ์ธํฐํ์ด์ค๋ก ์ถ์ํํ๋ฉด ์ข์๋ณด์ด๋ ๋ถ๋ถ์ด ์์ ๊ฒ์ด๋ค.

> ์ด ์ค์ต์ ํด๋์คํจ์ค๋ก ์ค์ ๋์ด ์๋ ํด๋์ค ์ค `@Controller` annotation์ด ์ค์ ๋์ด ์๋ ํด๋์ค๋ฅผ ์ฐพ๊ธฐ ์ํด [reflections](https://github.com/ronmamo/reflections) ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ํ์ฉํ  ์ ์๋ค. ์ด๋ฅผ ํ์ฉํด `@Controller` annotation์ด ์ค์ ๋ ํด๋์ค๋ฅผ ์ฐพ์ ํ `@RequestMapping` ์ค์ ์ ๋ฐ๋ผ ์์ฒญ URL๊ณผ ๋ฉ์๋๋ฅผ ์ฐ๊ฒฐํ๋๋ก ๊ตฌํํ  ์ ์๋ค.

### ๐ง ์๋ฐ ๋ฆฌํ๋ ์
๋ฆฌํ๋ ์์ด๋
: ๊ตฌ์ฒด์ ์ธ ํด๋์ค ํ์์ ์์ง ๋ชปํด์ ๊ทธ ํด๋์ค์ ๋ฉ์๋์ ํ์ ๊ทธ๋ฆฌ๊ณ  ๋ณ์๋ค์ ์ ๊ทผํ  ์ ์๋๋ก ํด์ฃผ๋ ์๋ฐ API์ด๋ค.

**์๋ฐ ๋ฆฌํ๋ ์ API ํ์ฉํด ํด๋์ค ์ ๋ณด ์ถ๋ ฅ**<br/>
`Question` ํด๋์ค์ ๋ชจ๋  ํ๋, ์์ฑ์, ๋ฉ์๋ ์ ๋ณด๋ฅผ ์ถ๋ ฅํ๋ค. (`core.ref.ReflectionTest` ์ `showClass()` ๋ฉ์๋ ๊ตฌํ)

```java
@Test
public void showClass() {
    Class<Question> clazz = Question.class;
    logger.debug(clazz.getName());
    logger.debug(Arrays.toString(clazz.getDeclaredFields()));
    logger.debug(Arrays.toString(clazz.getConstructors()));
    logger.debug(Arrays.toString(clazz.getMethods()));
}
```

- `Question` ์ ๋ชจ๋  ํ๋๊ฐ `private` ์ด๋ฏ๋ก `getDeclaredFields()` ๋ฅผ ์ฌ์ฉํ๊ณ , ์์ฑ์์ ๋ฉ์๋๋ค์ `public` ์ด๋ฏ๋ก `get...()` ์ ์ฌ์ฉํ๋ค.

**"test" ๋ก ์์ํ๋ ๋ฉ์๋ ์คํ**<br/>
`core.ref.Junit3Test` ์์ `test` ๋ก ์์ํ๋ ๋ชจ๋  ๋ฉ์๋๋ฅผ ์คํํด์ผ ํ๋ค. `core.ref.Junit3TestRunner` ํด๋์ค์ `run()` ๋ฉ์๋๋ฅผ ์คํํ์ ๋, `Junit3Test` ์์ ๋ฉ์๋ ์ด๋ฆ์ด `test` ๋ก ์์ํ๋ ๋ชจ๋  ๋ฉ์๋๋ฅผ ์คํํ๋ฉด ๋๋ค.

```java
public class Junit3TestRunner {
    @Test
    public void run() throws Exception {
        Class<Junit3Test> clazz = Junit3Test.class;
        Method[] ary = clazz.getMethods();
        for (Method str : ary) {
            if (str.getName().startsWith("test")) {
                str.invoke(clazz.newInstance());
            }
        }
    }
}
```

- `Method` ๋ฐฐ์ด์ `Junit3Test.class` ์ ์๋ `public` ๋ฉ์๋๋ค์ ๊ฐ์ ธ์ค๊ณ , `getName()` ์ผ๋ก ์ด๋ฆ์ ์ป์ด `test` ๋ก ์์ํ๋์ง ํ์ธํ๊ณ  ์คํํ๋ค.

**@MyTest annotation์ผ๋ก ์ค์ ๋ ๋ฉ์๋ ์คํ**<br/>
`core.ref.Junit4Test` ์์ `@MyTest` annotation์ด ์ค์ ๋์ด ์๋ ๋ชจ๋  ๋ฉ์๋๋ฅผ ์คํํ๋ค. ์์ ๋น์ทํ ๋ฐฉ์์ด๋ค.

```java
public class Junit4TestRunner {
    @Test
    public void run() throws Exception {
        Class<Junit4Test> clazz = Junit4Test.class;
        Method[] ary = clazz.getMethods();
        for (Method tmp : ary) {
            if (tmp.isAnnotationPresent(MyTest.class)) {
                tmp.invoke(clazz.newInstance());
            }
        }
    }
}
```

- `isAnnotationPresent` ๋ฉ์๋๋ก ํด๋น `Method` ๊ฐ ์ธ์๋ก ๋๊ฒจ์ค annotation์ด ์ค์ ๋์๋์ง ํ์ธํ  ์ ์๋ค.

**์์ฑ์๊ฐ ์๋ ํด๋์ค์ ์ธ์คํด์ค ์์ฑ**<br/>
`User` ํด๋์ค์ ์ธ์คํด์ค๋ฅผ ์์ฑํ๋ค. ํด๋น ํด๋์ค๋ ๊ธฐ๋ณธ ์์ฑ์๊ฐ ์์ผ๋ฉฐ, 4๊ฐ์ ์ธ์๋ฅผ ๊ฐ์ง๋ ์์ฑ์๋ฐ์ ์๋ค. `core.ref.ReflectionTest` ์ `newInstanceWithConstructorArgs()` ๋ฉ์๋๋ฅผ ๊ตฌํํ๋ค.

```java
@Test
public void newInstanceWithConstructorArgs() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
    Class<User> clazz = User.class;
    logger.debug(clazz.getName());
    Constructor<?> constructor = clazz.getDeclaredConstructor();
    constructor.newInstance();
}
```

- `getDeclaredConstructors()` ๋ฅผ ํตํด ์ธ์คํด์ค ์์ฑ์ ์ํ ์์ฑ์๋ฅผ ๋จผ์  ์ฐพ์ผ๋ผ๋๋ฐ, `NoSuchMethodException` ์์ธ๊ฐ ๋ฐ์ํ๋ค.

**`private` ํ๋์ ์ ๊ทผ**<br/>
๋ฆฌํ๋ ์ API๋ฅผ ํตํด ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ํด๋์ค์ `private` ํ๋์ ์ ๊ทผํด ๊ฐ์ ์ ๋ฌํ  ์ ์๋ค. ๋ค์๊ณผ ๊ฐ์ด 
2๊ฐ์ `private` ํ๋๋ฅผ ๊ฐ์ง๋ ํด๋์ค๊ฐ ์๋ ๊ฒฝ์ฐ, ์ธ์คํด์ค๋ฅผ ์ง์  ์์ฑํด ๊ฐ์ ์ ๋ฌํ  ์ ์๋ค. ์ด๋ ์๋ฐ ๋ฆฌํ๋ ์ API๋ฅผ ํ์ฉํด ๊ฐ์ ๊ฐ์ง๋ ์ธ์คํด์ค๋ฅผ ์์ฑํ  ์ ์๋ค.

```java
package next.model;

public class Student {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

- `Student` ํด๋์ค์ `name` ๊ณผ `age` ํ๋์ ๊ฐ์ ํ ๋นํ๊ณ , `getter` ๋ฉ์๋๋ฅผ ํตํด ๊ฐ์ ํ์ธํ๋ค.

```java
@Test
public void privateFieldAccess() throws NoSuchFieldException, IllegalAccessException {
    Class<Student> clazz = Student.class;
    logger.debug(clazz.getName());

    next.model.Student student = new next.model.Student();

    Field[] fields = clazz.getDeclaredField("name");
    for (Field field : fields) {
        field.setAccessible(true);

        ...
        
    }

    logger.debug(student.getName() + student.getAge());
}
```

- `Field` ์ ๋ณด๋ฅผ ๊ฐ์ ธ์์ ์ ๊ทผ ๊ถํ์ `true` ๋ก ๋ฐ๊ฟ์ค ํ ๊ฐ์ ์ธํํ๋ค.

### ๐ง ์๊ตฌ์ฌํญ ๋ถ๋ฆฌ ๋ฐ ํํธ
- `reflections` ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ํ์ฉํด `@Controller` annotation์ด ์ค์ ๋์ด ์๋ ๋ชจ๋  ํด๋์ค๋ฅผ ์ฐพ๊ณ , ๊ฐ ํด๋์ค์ ๋ํ ์ธ์คํด์ค ์์ฑ์ ๋ด๋นํ๋ `ControllerScanner` ํด๋์ค๋ฅผ ์ถ๊ฐํ๋ค.
- annotation ๊ธฐ๋ฐ ๋งคํ์ ๋ด๋นํ  `AnnotationHandlerMapping` ํด๋์ค๋ฅผ ์ถ๊ฐํ ํ ์ด๊ธฐํํ๋ค.
- `AnnotationHandlerMapping` ํด๋์ค์ ํด๋ผ์ด์ธํธ ์์ฒญ ์ ๋ณด(`HttpServletRequest`)๋ฅผ ์ ๋ฌํ๋ฉด ์์ฒญ์ ํด๋นํ๋ `HandlerExecution` ์ ๋ฐํํ๋ ๋ฉ์๋๋ฅผ ๊ตฌํํ๋ค.

annotation ๊ธฐ๋ฐ์ผ๋ก ๋์ํ๋ ์๋ก์ด ๋งคํ ํด๋์ค(`AnnotationHandlerMapping`) ์ถ๊ฐ๋ฅผ ์๋ฃํ๋ค. ๋ค์์ ๊ธฐ์กด์ ์ฌ์ฉํ๋ MVC ํ๋ ์์ํฌ์ `RequestMapping` ๊ณผ ์๋ก ์ถ๊ฐํ `AnnotationHandlerMapping` ์ด ๊ฐ์ด ๋์ํ๋๋ก ๊ตฌํํ๋ ๋จ๊ณ์ด๋ค. ์ด ๊ณผ์ ์ผ๋ก `RequestMapping` , `AnnotationHandlerMapping` ์ ํตํฉํ  ์ ์๋ค๋ฉด, ๊ธฐ์กด์ ๊ตฌํํ ์ปจํธ๋กค๋ฌ์ ์๋ก ์ถ๊ฐํ  ์ปจํธ๋กค๋ฌ(`@Controller`)๋ฅผ ๊ฐ์ด ์ฌ์ฉํ  ์ ์๊ฒ ๋ค.

- `RequestMapping` , `AnnotationHandlerMapping` ์ ์์ฒญ URL๊ณผ ์คํํ  ์ปจํธ๋กค๋ฌ ํด๋์ค ๋๋ ๋ฉ์๋๋ฅผ ๋งคํํ๋ ์ญํ ์ ๊ฐ๋ค. ํ์ง๋ง ์๋ ๋งคํ์ด๋, annotation ๊ธฐ๋ฐ ์๋ ๋งคํ์ด๋ ์ฐจ์ด์ด๋ค. ๋ ํด๋์ค์ ์ค๋ณต๋ ๋ถ๋ถ์ ์ธํฐํ์ด์ค๋ก ์ถ์ํํ๋ค. (`HandlerMapping` interface)
- `DispatcherServlet` ์ ์ด๊ธฐํ(`init()` ๋ฉ์๋) ๊ณผ์ ์์ `LegacyHandlerMapping` , `AnnotationHandlerMapping` ๋ชจ๋ ์ด๊ธฐํํ๋ค. ๋ `HandlerMapping` ์ `List` ๋ก ๊ด๋ฆฌํ๋ค.
- `DispatcherServlet` ์ `service()` ๋ฉ์๋์์๋ ์์์ ์ด๊ธฐํํ 2๊ฐ์ `HandlerMapping` ์์ ์์ฒญ URL์ ํด๋นํ๋ ์ปจํธ๋กค๋ฌ๋ฅผ ์ฐพ์ ๋ฉ์๋๋ฅผ ์คํํ๋ค.
- ๊ธฐ์กด ์ปจํธ๋กค๋ฌ๋ฅผ ์๋ก ์ถ๊ฐํ annotation ๊ธฐ๋ฐ์ผ๋ก ์ค์ ํ๊ณ  ํ์คํธํ๋ค.

---

## ๐ฉ MVC ํ๋ ์์ํฌ ๊ตฌํ 3๋จ๊ณ
### ๐ง @Controller annotation ์ค์  ํด๋์ค ์ค์บ
annotation ๊ธฐ๋ฐ์ผ๋ก MVC ํ๋ ์์ํฌ๋ฅผ ๊ตฌํํ๋ ค๋ฉด ๋จผ์  `@Controller` annotation์ด ์ค์ ๋ ํด๋์ค๋ฅผ ์ฐพ์์ผ ํ๋ค. ๋ฆฌํ๋ ์์ ์ด์ฉํด ํด๋น ํด๋์ค๋ค์ ์ฐพ๊ณ , ๊ฐ ํด๋์ค์ ๋ํ ์ธ์คํด์ค ๋ชฉ๋ก๊น์ง ๊ตฌํํ๋ค.

```java
public class ControllerScanner {
    private static final Logger log = LoggerFactory.getLogger(ControllerScanner.class);

    private Reflections reflections;

    public ControllerScanner(Object... backPackage) {
        reflections = new Reflections(backPackage);
    }

    public Map<Class<?>, Object> getControllers() {
        Set<Class<?>> preInitiatedControllers = reflections.getTypesAnnotatedWith(Controller.class);
        return instantiateControllers(preInitiatedControllers);
    }

    Map<Class<?>, Object> instantiateControllers(Set<Class<?>> preInitiatedControllers) {
        Map<Class<?>, Object> controllers = Maps.newHashMap();
        try {
            for (Class<?> clazz : preInitiatedControllers) {
                controllers.put(clazz, clazz.newInstance());
            }
        } catch (InstantiationException | IllegalAccessException e) {
            e.printStackTrace();
        }
        return controllers;
    }
}
```

- ํ์คํธ๋ฅผ ์ํด `@Controller` annotation์ ์ฌ์ฉํ๋ ํ์คํธ์ฉ ์ปจํธ๋กค๋ฌ๋ฅผ ๊ตฌํํ๊ณ , ํ์คํธ ์ฝ๋๋ฅผ ์์ฑํ๋ค.

```java
@Controller
public class MyController {
    private static final Logger log = LoggerFactory.getLogger(MyController.class);

    @RequestMapping("/users/findUserId")
    public ModelAndView list(HttpServletRequest req, HttpServletResponse res) {
        log.debug("users findUserId");
        return new ModelAndView(new JspView("/users/list.jsp"));
    }

    @RequestMapping(value = "/users/show", method = RequestMethod.GET)
    public ModelAndView show(HttpServletRequest req, HttpServletResponse res) {
        log.debug("users findUserId");
        return new ModelAndView(new JspView("/users/show.jsp"));
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ModelAndView create(HttpServletRequest req, HttpServletResponse res) {
        log.debug("users create");
        return new ModelAndView(new JspView("redirect:/users"));
    }
}
```

```java
public class ControllerScannerTest {
    private static final Logger log = LoggerFactory.getLogger(ControllerScannerTest.class);

    private ControllerScanner cs;

    @Before
    public void setup() {
        cs = new ControllerScanner("core.nmvc");
    }

    @Test
    public void getControllers() throws Exception {
        Map<Class<?>, Object> controllers = cs.getControllers();
        for (Class<?> controller : controllers.keySet()) {
            log.debug("controller : {}", controller);
        }
    }
}
```

- ํ์คํธ์์๋ ์ปจํธ๋กค๋ฌ๋ฅผ ์ ๋งคํํ์ฌ ์ ๋ณด๋ฅผ ๊ฐ์ ธ์ค๋์ง ์ถ๋ ฅ๋ฌธ์ผ๋ก ํ์ธํ๋ค.
  - ์์์ `@Controller` annotation์ ์ฌ์ฉํ `MyController` ์ปจํธ๋กค๋ฌ๋ฅผ ์ถ๋ ฅํ๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

### ๐ง @RequestMapping annotation ์ค์ ์ ํ์ฉํ ๋งคํ
์์์ ์ฐพ์ ์ปจํธ๋กค๋ฌ ํด๋์ค์ `RequestMapping` annotation ์ค์ ์ ๊ธฐ๋ฐ์ผ๋ก ๋งคํํ๋ค. ๋งคํ์ ์ด์  MVC ํ๋ ์์ํฌ์ ๊ฐ์ด `Map` ์ ํ์ฉํ๋ค.
- ๋ค๋ฅธ ์ ์ `Map` ์ key๋ก ์ฌ์ฉ๋๋ ๊ฐ์ด **์์ฒญ URL๊ณผ HTTP ๋ฉ์๋์ ์กฐํฉ**์ด๋ผ๋ ์ ์ด๋ค.
- ์์ฒญ URL๊ณผ HTTP ๋ฉ์๋ ์ ๋ณด๋ฅผ ๊ฐ์ง๋ ํด๋์ค๋ฅผ `HandleKey` ๋ผ๋ ์ด๋ฆ์ผ๋ก ๊ตฌํํ๋ค.

```java
public class HandlerKey {
    private String url;
    private RequestMethod requestMethod;

    public HandlerKey(String url, RequestMethod requestMethod) {
        this.url = url;
        this.requestMethod = requestMethod;
    }

    @Override
    public String toString() {
        return "HandlerKey [url=" + url + ", requestMethod=" + requestMethod + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((requestMethod == null) ? 0 : requestMethod.hashCode());
        result = prime * result + ((url == null) ? 0 : url.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        HandlerKey other = (HandlerKey) obj;
        if (requestMethod != other.requestMethod)
            return false;
        if (url == null) {
            if (other.url != null)
                return false;
        } else if (!url.equals(other.url))
            return false;
        return true;
    }
}
```

- `HashMap` ์ ํค๋ก ํ์ฉํ๊ธฐ ์ํด `hashCode()` , `equals()` ๋ฉ์๋๋ฅผ ๋ฐ๋์ ๊ตฌํํ๋ค.
- `Map` ์ ๊ฐ์ `@RequestMapping` annotation์ด ์ค์ ๋์ด ์๋ ๋ฉ์๋ ์ ๋ณด์ด๋ค. 
  - ๊ฐ์ ์ ์ฅ๋๋ ๋ฉ์๋ ์ ๋ณด๋ ์๋ฐ ๋ฆฌํ๋ ์์ผ๋ก ํด๋น ๋ฉ์๋๋ฅผ ์คํํ  ์ ์๋ ์ ๋ณด์ฌ์ผ ํ๋ค.
  - ์ฆ, ๋ฉ์๋๊ฐ ์์นํ๋ ํด๋์ค์ ์ธ์คํด์ค ์ ๋ณด์ `java.lang.reflect.Method` ์ ๋ณด๋ฅผ ๊ฐ์ ธ์ผ ํ๋ค.
  - ์ด๋ฅผ `HandlerExecution` ํด๋์ค๋ก ๊ตฌํํ๋ค.

```java
public class HandlerExecution {
    private static final Logger log = LoggerFactory.getLogger(HandlerExecution.class);
    private Object declaredObject;
    private Method method;

    public HandlerExecution(Object declaredObject, Method method) {
        this.declaredObject = declaredObject;
        this.method = method;
    }

    public ModelAndView handle(HttpServletRequest request, HttpServletResponse response) throws Exception {
        try {
            return (ModelAndView) method.invoke(declaredObject, request, response);
        } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
            log.error("{} method invoke fail. error message : {}", method, e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
```

์ด์  `HandleKey` ์ `HandleExecution` ์ ์ฐ๊ฒฐ(mapping)ํ๋๋ก ํ๋ค. ๋งคํ ์ด๊ธฐํ ์์์ `AnnotationHandlerMapping` ํด๋์ค์์ ๊ตฌํํ๋ค.

```java
public class AnnotationHandlerMapping {
    private static final Logger log = LoggerFactory.getLogger(AnnotationHandlerMapping.class);
    private Object[] basePackage;

    private Map<HandlerKey, HandlerExecution> handlerExecutions = Maps.newHashMap();

    public AnnotationHandlerMapping(Object... basePackage) {
        this.basePackage = basePackage;
    }

    public void initialize() {
        ControllerScanner controllerScanner = new ControllerScanner(basePackage);
        Map<Class<?>, Object> controllers = controllerScanner.getControllers();
        Set<Method> methods = getRequestMappingMethods(controllers.keySet());
        for (Method method : methods) {
            RequestMapping rm = method.getAnnotation(RequestMapping.class);
            log.debug("register handlerExecution : url is {}, method is {}", rm.value(), method);
            handlerExecutions.put(createHandleKey(rm), new HandlerExecution(controllers.get(method.getDeclaringClass()), method));
        }
    }

    private HandlerKey createHandleKey(RequestMapping rm) {
        return new HandlerKey(rm.value(), rm.method());
    }

    private Set<Method> getRequestMappingMethods(Set<Class<?>> controllers) {
        Set<Method> requestMappingMethods = Sets.newHashSet();
        for (Class<?> clazz : controllers) {
            requestMappingMethods.addAll(ReflectionUtils.getAllMethods(clazz, ReflectionUtils.withAnnotation(RequestMapping.class)));
        }
        return requestMappingMethods;
    }
    ...

}
```

### ๐ง ํด๋ผ์ด์ธํธ ์์ฒญ์ ํด๋นํ๋ HandlerExecution ๋ฐํ
๋ง์ง๋ง์ผ๋ก ํด๋ผ์ด์ธํธ ์์ฒญ์ ํด๋นํ๋ `HandlerExecution` ์ ์กฐํํ๋ ๋ฉ์๋์ด๋ค. `AnnotationHandlerMapping` ์ ๋ค์๊ณผ ๊ฐ์ด ๊ตฌํํ๋ค.

```java
public class AnnotationHandlerMapping {
    private static final Logger log = LoggerFactory.getLogger(AnnotationHandlerMapping.class);
    private Object[] basePackage;

    private Map<HandlerKey, HandlerExecution> handlerExecutions = Maps.newHashMap();

    ...

    public HandlerExecution getHandler(HttpServletRequest request) {
        String requestUri = request.getRequestURI();
        RequestMethod rm = RequestMethod.valueOf(request.getMethod().toUpperCase());
        log.debug("requestUri : {}, requestMethod : {}", requestUri, rm);
        return handlerExecutions.get(new HandlerKey(requestUri, rm));
    }
}
```

`AnnotationHandlerMappingTest` ๋ก ์ ์์ ์ผ๋ก ๊ตฌํ์ ์๋ฃํ๋์ง ํ๋จํ๋ค.

### ๐ง DispatcherServlet๊ณผ AnnotationHandlerMapping ํตํฉ
์ด์  `DispatcherServlet` ์์ ์๋ก ์ถ๊ฐํ `AnnotationHandlerMapping` ์ ํ์ฉํด ์๋น์คํ  ์ ์๋๋ก ํตํฉํ๋ ์์์ ์ํํ  ์ฐจ๋ก์ด๋ค.
- `DispatcherServlet` ์ `RequestMapping` ๊ณผ `AnnotationHandlerMapping` ์ ๋ชจ๋ ์ง์ํด์ผ ํ๋ค.
  - ๋ถ๋ฆฌํด์ ๊ด๋ฆฌํ  ์๋ ์์ง๋ง ๋์ ์ผ๊ด๋ ์ธํฐํ์ด์ค๋ฅผ ๊ตฌํํ๋๋ก ํตํฉํ ํ ๊ด๋ฆฌํ๋ ๊ฒ์ด ํฅํ ํ์ฅ์ฑ์ ๊ณ ๋ คํ์ ๋ ์ ์ ํ๋ค๊ณ  ํ๋จ๋๋ค.
  - ๋จผ์  ๋ `Mapping` ํด๋์ค์ ๋ํด ์ถ์ํํ ์ธํฐํ์ด์ค๋ฅผ `HandlerMapping` ์ด๋ผ๋ ์ด๋ฆ์ผ๋ก ์ถ๊ฐํ๋ค.

```java
public interface HandlerMapping {
    Object getHandler(HttpServletRequest request);
}
```

์ด์  ์ ์ธํฐํ์ด์ค๋ฅผ ๋ ํด๋์ค๊ฐ ๊ตฌํํ๋๋ก ํ๋ค. `RequestMapping` ํด๋์ค๋ฅผ `LegacyHandlerMapping` ์ผ๋ก ๋ณ๊ฒฝํ์ฌ ๊ตฌํํ๋ค.

```java
public class LegacyHandlerMapping implements HandlerMapping {
    private static final Logger logger = LoggerFactory.getLogger(DispatcherServlet.class);
    private Map<String, Controller> mappings = new HashMap<>();

    public void initMapping() {
        ...
    }
    ...

    @Override
    public Object getHandler(HttpServletRequest request) {
        return mappings.get(request.getRequestURI());
    }
}
```

- ์์ฒญ์ URI๋ฅผ ๊ฐ์ ธ์ `mappings` ์์ ์กฐํํด ๋ฐํํ๋ค.

```java
public class AnnotationHandlerMapping implements HandlerMapping {
    ...

    public HandlerExecution getHandler(HttpServletRequest request) {
        String requestUri = request.getRequestURI();
        RequestMethod rm = RequestMethod.valueOf(request.getMethod().toUpperCase());
        log.debug("requestUri : {}, requestMethod : {}", requestUri, rm);
        return handlerExecutions.get(new HandlerKey(requestUri, rm));
    }
}
```

- `AnnotationHandlerMapping` ์ ์ด๋ฏธ `getHandler` ๋ฅผ ๊ตฌํํ๊ธฐ์ ์ถ๊ฐ ๊ตฌํ์ ์๋ค.

์ด์  `DispatcherServlet` ์ด ๋ ๊ฐ์ `HandlerMapping` ์ด ๋ชจ๋ ๋์ํ๋๋ก ํตํฉํ๋ ์์์ ์ํํ๋ค.
- ์ด๊ธฐํ๊ฐ ๋๋ `HandlerMapping` ์ `List` ๋ก ๊ด๋ฆฌํ๋ค.
- ์์ฒญ URL๊ณผ HTTP ๋ฉ์๋์ ํด๋นํ๋ ์ปจํธ๋กค๋ฌ๋ฅผ ์ฐพ์ ์์์ ์ํํ๋ค.

```java
@WebServlet(name = "dispatcher", urlPatterns = "/", loadOnStartup = 1)
public class DispatcherServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Logger log = LoggerFactory.getLogger(DispatcherServlet.class);
    private List<HandlerMapping> mappings = Lists.newArrayList();

    private LegacyHandlerMapping lhm;
    private AnnotationHandlerMapping ahm;

    @Override
    public void init() throws ServletException {
        lhm = new LegacyHandlerMapping();
        lhm.initMapping();
        ahm = new AnnotationHandlerMapping("next.controller");
        ahm.initialize();

        mappings.add(lhm);
        mappings.add(ahm);
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Object handler = getHandler(req);
        if (handler == null) {
            throw new IllegalArgumentException("์กด์ฌํ์ง ์๋ URL์๋๋ค.");
        }

        try {
            ModelAndView mav = execute(handler, req, resp);
            View view = mav.getView();
            view.render(mav.getModel(), req, resp);
        } catch (Throwable e) {
            log.error("Exception : {}", e);
            throw new ServletException(e.getMessage());
        }
    }

    private Object getHandler(HttpServletRequest req) {
        for (HandlerMapping handlerMapping : mappings) {
            Object handler = handlerMapping.getHandler(req);
            if (handler != null) {
                return handler;
            }
        }
        return null;
    }

    private ModelAndView execute(Object handler, HttpServletRequest req, HttpServletResponse resp) throws Exception {
        if (handler instanceof Controller) {
            return ((Controller)handler).execute(req, resp);
        } else {
            return ((HandlerExecution)handler).handle(req, resp);
        }
    }
}
```

- ํตํฉ์ ์๋ฃํ ํ ๊ธฐ์กด์ ๊ตฌํํ ์ปจํธ๋กค๋ฌ๋ฅผ ์๋กญ๊ฒ ์ถ๊ฐํ ์ปจํธ๋กค๋ฌ ๊ธฐ๋ฐ์ผ๋ก ๋ณ๊ฒฝํ๋ค. 
  - ๊ธฐ์กด ์ปจํธ๋กค๋ฌ์ ๋ํ ์ง์๋ ๊ฐ๋ฅํ๋ฉด์ ์๋ก ์ถ๊ฐํ `AnnotationHandlerMapping` ์ง์๋ ๊ฐ๋ฅํด ์ ์ง์ ์ธ ๋ฆฌํฉํ ๋ง ์์์ด ๊ฐ๋ฅํ๋ค.
- ์ฌ์ฉ์ ๊ด๋ฆฌ ๊ธฐ๋ฅ์ ์ผ๋ถ๋ฅผ `UserController` ๋ฅผ ์ถ๊ฐํด ์ด์  ์์ํ์ฌ ์ ์ ๋์์ ํ์ธํ๋ค.

```java
public class UserController extends AbstractNewController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private UserDao userDao = UserDao.getInstance();

    @RequestMapping("/users")
    public ModelAndView list(HttpServletRequest req, HttpServletResponse resp) throws SQLException {
        if (!UserSessionUtils.isLogined(req.getSession())) {
            return jspView("redirect:/users/loginForm");
        }

        ModelAndView mav = jspView("/user/list.jsp");
        mav.addObject("users", userDao.findAll());
        return mav;
    }

    @RequestMapping("/users/form")
    public ModelAndView form(HttpServletRequest req, HttpServletResponse resp) {
        return jspView("/user/form.jsp");
    }

    @RequestMapping(value = "/users/create", method = RequestMethod.POST)
    public ModelAndView create(HttpServletRequest req, HttpServletResponse resp) {
        User user = new User(
                req.getParameter("userId"),
                req.getParameter("password"),
                req.getParameter("name"),
                req.getParameter("email")
        );
        log.debug("User : {}", user);
        userDao.insert(user);
        return jspView("redirect:/");
    }
}
```

์ด์ ๊ฐ์ด ์ปจํธ๋กค๋ฌ ํด๋์ค ํ๋๋ก ํตํฉ ์์์ ์งํํ์ฌ
- ๊ด๋ฆฌํ  ํด๋์ค ์๋ ์ ์ด์ง๊ณ ,
- ์ปจํธ๋กค๋ฌ์์ ๋ฐ์ํ๋ ์ค๋ณต๋ ์ ๊ฑฐํ  ์ ์๋ค.
- ๋ํ ์ ์ง์ ์ธ ์ด์  ์์์ผ๋ก ์๋น์ค ์ค๋จ์ด ์๋ค.

---

## ๐ฉ ์ธํฐํ์ด์ค๊ฐ ๋ค๋ฅธ ๊ฒฝ์ฐ ํ์ฅ์ฑ ์๋ ์ค๊ณ
๊ธฐ์กด ์ปจํธ๋กค๋ฌ์ ์๋ก ์ถ๊ฐํ ์ปจํธ๋กค๋ฌ ํด๋์ค๋ฅผ ๋ณด๋ฉด, ๋ฉ์๋ ์ธ์์ ๋ฐํ ๊ฐ์ด ๊ฐ์ ํตํฉ์ด ๊ฐ๋ฅํ๋ค. `HandlerExecution` ํด๋์ค๊ฐ `Controller` ์ธํฐํ์ด์ค๋ฅผ ๊ตฌํํ๋๋ก ๋ฆฌํฉํ ๋งํ์ฌ `HandlerMapping` ์ `getHandler()` ๋ฉ์๋์ ๋ฐํ ๊ฐ๋ `Object` ๊ฐ ์๋ `Controller` ๋ก ๋ณ๊ฒฝํ  ์ ์๋ค.

์ด๋ก์จ, ์บ์คํ๊ณผ ๊ฐ์ ์์์ด ํ์์์ด **์์ค์ฝ๋๊ฐ ๊น๋**ํด์ง์ง๋ง, **ํ์ฅ์ฑ์ด ๋จ์ด์ง๋ค๋ ๋จ์ **์ด ๋ฐ์ํ๋ค.
- ๋ง์ฝ ๋ชจ๋  ์ฝ๋๋ฅผ ํ๋ก์ ํธ ๋ด์์ ์์ ํ  ์ ์๋ ๊ถํ์ด ์๋ค๋ฉด ํ๋๋ก ํตํฉํด ๊ด๋ฆฌํ๋ ๊ฒ์ด ๊ฐ๋ฅํ๋ค.
- ํ์ง๋ง ์ธ๋ถ ๋ผ์ด๋ธ๋ฌ๋ฆฌ, ํ๋ ์์ํฌ๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ์ปจํธ๋กค๋ฌ๋ฅผ ๊ฐ๋ฐํ๋ค๋ฉด ์ด ์ปจํธ๋กค๋ฌ์ ์ธํฐํ์ด์ค๋ฅผ ํ๋๋ก ํตํฉํ๋ ๊ฒ์ ๋ถ๊ฐ๋ฅํ๋ค.

"์ ํ๋ฆฌ์ผ์ด์์ ๊ฐ๋ฐํ๋ค๋ณด๋ฉด, ์ญํ ์ ๊ฐ์๋ฐ ์๋ก ๋ค๋ฅธ ์ธํฐํ์ด์ค๋ฅผ ์ฌ์ฉํ์ฌ ํตํฉํ๊ธฐ ํ๋  ์ํฉ์ด ๋ฐ์ํ๋ค. ๋ฐ๋ผ์ ๋ ์ ์ฐํ ๊ตฌ์กฐ๋ฅผ ์ง์ํ๋ ค๋ฉด ์ธํฐํ์ด์ค ํ๋๋ก ๊ฐ์ ํ๋ ๊ฒ์ ๋ฐ๋์งํ์ง ์๋ค."

์๋ก ๋ค๋ฅธ ์ธํฐํ์ด์ค ํตํฉ ์, `DispatcherServlet` ์ `execute()` ๋ฉ์๋์ ๊ตฌํ ์ฝ๋์ ๊ฐ์ด ์บ์คํ์ ํด์ผ ํ๋ ์ํฉ์ด ์ข์ข ๋ฐ์ํ๋ค.

```java
public class DispatcherServlet extends HttpServlet {
    ...

    private ModelAndView execute(Object handler, HttpServletRequest req, HttpServletResponse resp) throws Exception {
        if (handler instanceof Controller) {
            return ((Controller)handler).execute(req, resp);
        } else {
            return ((HandlerExecution)handler).handle(req, resp);
        }
    }
}
```

์ ๊ตฌ์กฐ๋ ์๋ก์ด ์ปจํธ๋กค๋ฌ ์ ํ์ด ์ถ๊ฐ๋  ๊ฒฝ์ฐ, `else if` ์ ์ด ์ถ๊ฐ๋๋ ๊ตฌ์กฐ์ด๋ค. ์ด๋ฅผ ๊ฐ์ ํด ์๋ก ๊ฐ์ ์ํฅ์ ์ฃผ์ง ์์ผ๋ฉด์ ํ์ฅํ  ์ ์๋ ๋ฐฉ๋ฒ์ ๊ฐ๊ตฌํ๋ค. (๊ฐ๋ฐฉ ํ์์ ์์น์ ์ค์?)
- ์๋ก ๋ค๋ฅธ ์ธํฐํ์ด์ค๋ฅผ ์ธํฐํ์ด์ค ํ๋๋ก ์ฐ๊ฒฐํ๋ ๋ฐฉ๋ฒ์ด ํ์ํ๋ค.
  - `Controller` ์ธํฐํ์ด์ค๋ฅผ ์ถ๊ฐํ  ๋๋ ๊ฐ์ ์ ๋ต
  - `Controller` ๋ ํ๋ ์์ํฌ ๋ด์์ ๋ชจ๋  ์ปจํธ๋กค๋ฌ๋ฅผ ์ถ์ํํ ์ธํฐํ์ด์ค๋ผ๋ฉด, ์ง๊ธ์ ์ฌ๋ฌ ๊ฐ์ ํ๋ ์์ํฌ ์ปจํธ๋กค๋ฌ๋ฅผ ํ๋๋ก ํตํฉํด์ผ ํ๋ ์ด์์ด๋ค.
  - ๊ฐ ์ปจํธ๋กค๋ฌ์ ์ญํ ์ ๋์ผํ๊ธฐ์, **๋ ํ๋์ ์ถ์ํ ๋จ๊ณ๊ฐ ํ์ํ๋ค**๋ ์๋ฏธ์ด๋ค.

`DispatcherServlet` ์ `execute()` ๋ฉ์๋์ ๊ตฌํ ๋ก์ง์ **์ปจํธ๋กค๋ฌ์ ์ธ์คํด์ค๊ฐ ๋ฌด์์ธ์ง๋ฅผ ํ๋จํ๋ ๋ถ๋ถ**๊ณผ **ํด๋น ์ปจํธ๋กค๋ฌ๋ก ์บ์คํํ ํ ์ปจํธ๋กค๋ฌ๋ฅผ ์คํํ๋ ๋ถ๋ถ**์ผ๋ก ๋๋๋ค.
- ์ด ๋ถ๋ถ๋ค์ `HandlerAdapter` ์ธํฐํ์ด์ค๋ก ์ถ์ํํ ํ ๊ฐ ์ปจํธ๋กค๋ฌ ๊ตฌํ์ฒด๊ฐ `DispatcherServlet` ์ `execute()` ๋ก์ง์ ๋๋  ๊ตฌํํ๋ค.

```java
public interface HandlerAdapter {
    boolean supports(Object handler);

    ModelAndView handle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception;
}
```

์ด์  ๊ฐ ์ปจํธ๋กค๋ฌ์ ๋ํ `HandlerAdapter` ๋ฅผ ๊ตฌํํ๋ค. `Controller` ์ `HandlerExecution` ์ธํฐํ์ด์ค์ ๋ํ ๊ตฌํ์ฒด์ด๋ค.

```java
public class ControllerHandlerAdapter implements HandlerAdapter {
    @Override
    public boolean supports(Object handler) {
        return handler instanceof Controller;
    }

    @Override
    public ModelAndView handle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception {
        return ((Controller)handler).execute(req, resp);
    }
}
```

```java
public class HandlerExecutionHandlerAdapter implements HandlerAdapter {
    @Override
    public boolean supports(Object handler) {
        return handler instanceof Controller;
    }

    @Override
    public ModelAndView handle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception {
        return ((HandlerExecution)handler).handle(req, resp);
    }
}
```

์ด์  `DispatcherServlet` ์ ๋ค์๊ณผ ๊ฐ์ด ๋ฆฌํฉํ ๋งํ๋ค.

```java
@WebServlet(name = "dispatcher", urlPatterns = "/", loadOnStartup = 1)
public class DispatcherServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Logger log = LoggerFactory.getLogger(DispatcherServlet.class);
    private List<HandlerMapping> mappings = Lists.newArrayList();
    private List<HandlerAdapter> handlerAdapters = Lists.newArrayList();

    private LegacyHandlerMapping lhm;
    private AnnotationHandlerMapping ahm;

    @Override
    public void init() throws ServletException {
        lhm = new LegacyHandlerMapping();
        lhm.initMapping();
        ahm = new AnnotationHandlerMapping("next.controller");
        ahm.initialize();

        mappings.add(lhm);
        mappings.add(ahm);

        handlerAdapters.add(new ControllerHandlerAdapter());
        handlerAdapters.add(new HandlerExecutionHandlerAdapter());
    }

    ...

    private ModelAndView execute(Object handler, HttpServletRequest req, HttpServletResponse resp) throws Exception {
        for (HandlerAdapter handlerAdapter : handlerAdapters) {
            if (handlerAdapter.supports(handler)) {
                return handlerAdapter.handle(req, resp, handler);
            }
        }
        return null;
    }
}
```

- ์ด์  ์๋ก์ด ์ปจํธ๋กค๋ฌ ์ ํ์ด ์ถ๊ฐ๋๋๋ผ๋, `HandlerAdapter` ๊ตฌํ์ฒด๋ง ๊ตฌํ(๋ฐํํ์ ์ ์ปจํธ๋กค๋ฌ์ ์ ํ์ผ๋ก ์์ ) ํ `DispatcherServlet` ์ `HandlerAdapter` ๋ชฉ๋ก์ ์ถ๊ฐํ๋ฉด ๋๋ค.

์ด ๊ฐ์ ๊ตฌ์กฐ๋ก ํ์ฅํ์ฌ ๋ค๋ฅธ `HandlerAdapter` ์ ์ํฅ์ ๋ฏธ์น์ง ์์ผ๋ฉด์ ๋๋ฆฝ์ ์ธ ํ์ฅ์ด ๊ฐ๋ฅํด์ก๋ค.

## ๐ ์ถ์ฒ
- **์๋ฐ ์น ํ๋ก๊ทธ๋๋ฐ Next Step : ํ๋์ฉ ๋ฒ๊ฒจ๊ฐ๋ ์ํ๊ป์ง ํ์ต๋ฒ** - ๋ฐ์ฌ์ฑ
- [์๋ฐ ๋ฆฌํ๋ ์ ๊ฐ๋ ๋ฐ ์ฌ์ฉ๋ฒ ์์๋ณด๊ธฐ](https://kingname.tistory.com/164)
---
title: "📖 10장 새로운 MVC 프레임워크 구현을 통한 점진적 개선"
description: "자바 웹 프로그래밍 책 정리"
date: 2022-02-18
update: 2022-02-18
tags:
  - Java
  - Refactoring
  - Framework
series: "📖 자바 웹 프로그래밍 Next Step"
---

<em>[자바 웹 프로그래밍 Next Step - 박재성]을 읽고 인용하고 정리하는 POST입니다.</em>

"새로운 애플리케이션을 개발하는 작업은 쉽지 않은 작업이다. 하지만 그보다 더 어려운 작업은 누군가 개발해놓은 애플리케이션을 지속적으로 기능 추가, 개선을 하면서 기술적으로 계속해서 발전시켜 나가는 작업이다."

> 지금까지 구현한 MVC 프레임워크의 문제점을 파악한 후 새로운 MVC 프레임워크를 구현한다. 이전에 구현한 MVC 프레임워크 기반으로 동작하는 컨트롤러가 정상적으로 동작하는 상태에서 새로운 MVC 프레임워크로 점진적으로 전환해가는 과정에 대해 살펴본다.

## 🚩 MVC 프레임워크 요구사항 3단계
자바의 리플렉션 API에 대한 활용과 구현해야 할 클래스가 많아져 난이도가 높아진다. 

### 🔧 요구사항
9장 중간 점검의 마지막 문제를 보면, 새로운 컨트롤러 추가마다 매번 `RequestMapping` 클래스에 수정사항이 발생하는 것에 대한 귀찮음을 제기한다. 유지보수 차원에서 컨트롤러의 수가 계속 증가하고 있고, 각 컨트롤러의 `execute()` 메소드를 보면, 10줄 이상인 경우도 거의 없다.

" 따라서, 새로운 기능이 추가될 때마다 매번 컨트롤러를 추가하는 것이 아닌 **메소드를 추가하는 방식**이면 더 효율적일 듯하다. "

또 한 가지 아쉬운 점은 **요청 URL 매핑 시, HTTP 메소드 정보도 함께 매핑**되면 좋을 것 같다. URL은 같지만, 다른 기능 수행을 위해 다른 메소드로 매핑하는 것 또한 가능하면 좋을 것 같다.

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

- 위 기능을 지원하는 annotation 기반의 새로운 MVC 프레임워크를 구현해야 한다.
  - 실습을 위해 뼈대가 되는 코드와 테스트 코드가 있고, 해당 테스트 클래스의 3개의 테스트 메소드들이 성공하면 구현이 완료된 것이다.

새로운 MVC 프레임워크를 추가했으니 이전에 구현한 컨트롤러를 **annotation** 기반으로 변경해야 한다. 
- 하지만 새 프레임워크 적용을 위해 한 번에 모든 컨트롤러를 변경하게 되면, 일정 기간 동안 새로운 기능을 추가하거나 변경하는 작업을 중단해야 한다.
  - 이를 보완하기 위해 **점진적 리팩토링이 가능한 구조로 개발**해야 한다.

**점진적 리팩토링이 가능한 구조**<br/>
- annotation 기반으로 MVC 프레임워크를 구현한 후 레거시 MVC 프레임워크(8장에서 구현했던 MVC 프레임워크)와 annotation 기반의 새로운 MVC 프레임워크를 통합하는 방식으로 구현해야 한다.
- ex. 요청 URL과 컨트롤러를 매핑하는 클래스가 레거시 MVC 프레임워크 = `LegacyHandlerMapping` , 새로운 MVC 프레임워크 = `AnnotationHandlerMapping` 이라면 `DispatcherServlet` 에서 이 둘을 통합해 두 형태의 컨트롤러가 모두 동작 가능하도록 구현할 수 있다.

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
                    throw new ServletException("유효하지 않은 요청입니다.");
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

- `HandlerExecution` 은 새로 추가한 MVC 프레임워크의 컨트롤러와 같은 역할을 하는 클래스이다.
- 위와 같은 구조로 구현한다면 서로 다른 컨트롤러를 같이 서비스하는 것이 가능할 것이다.

실습의 1차 목표는 "레거시 MVC 프레임워크와 annotation 기반의 새로운 MVC 프레임워크가 동시에 서비스 가능하도록 구현하는 것"이다.
- 1차 구현을 완료한 후, 리팩토링할 부분을 찾아보면 2개의 프레임워크가 공존하기에 인터페이스로 추상화하면 좋아보이는 부분이 있을 것이다.

> 이 실습은 클래스패스로 설정되어 있는 클래스 중 `@Controller` annotation이 설정되어 있는 클래스를 찾기 위해 [reflections](https://github.com/ronmamo/reflections) 라이브러리를 활용할 수 있다. 이를 활용해 `@Controller` annotation이 설정된 클래스를 찾은 후 `@RequestMapping` 설정에 따라 요청 URL과 메소드를 연결하도록 구현할 수 있다.

### 🔧 자바 리플렉션
리플렉션이란
: 구체적인 클래스 타입을 알지 못해서 그 클래스의 메소드와 타입 그리고 변수들을 접근할 수 있도록 해주는 자바 API이다.

**자바 리플렉션 API 활용해 클래스 정보 출력**<br/>
`Question` 클래스의 모든 필드, 생성자, 메소드 정보를 출력한다. (`core.ref.ReflectionTest` 의 `showClass()` 메소드 구현)

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

- `Question` 의 모든 필드가 `private` 이므로 `getDeclaredFields()` 를 사용하고, 생성자와 메소드들은 `public` 이므로 `get...()` 을 사용한다.

**"test" 로 시작하는 메소드 실행**<br/>
`core.ref.Junit3Test` 에서 `test` 로 시작하는 모든 메소드를 실행해야 한다. `core.ref.Junit3TestRunner` 클래스의 `run()` 메소드를 실행했을 때, `Junit3Test` 에서 메소드 이름이 `test` 로 시작하는 모든 메소드를 실행하면 된다.

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

- `Method` 배열에 `Junit3Test.class` 에 있는 `public` 메소드들을 가져오고, `getName()` 으로 이름을 얻어 `test` 로 시작하는지 확인하고 실행한다.

**@MyTest annotation으로 설정된 메소드 실행**<br/>
`core.ref.Junit4Test` 에서 `@MyTest` annotation이 설정되어 있는 모든 메소드를 실행한다. 위와 비슷한 방식이다.

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

- `isAnnotationPresent` 메소드로 해당 `Method` 가 인자로 넘겨준 annotation이 설정되었는지 확인할 수 있다.

**생성자가 있는 클래스의 인스턴스 생성**<br/>
`User` 클래스의 인스턴스를 생성한다. 해당 클래스는 기본 생성자가 없으며, 4개의 인자를 가지는 생성자밖에 없다. `core.ref.ReflectionTest` 의 `newInstanceWithConstructorArgs()` 메소드를 구현한다.

```java
@Test
public void newInstanceWithConstructorArgs() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
    Class<User> clazz = User.class;
    logger.debug(clazz.getName());
    Constructor<?> constructor = clazz.getDeclaredConstructor();
    constructor.newInstance();
}
```

- `getDeclaredConstructors()` 를 통해 인스턴스 생성을 위한 생성자를 먼저 찾으라는데, `NoSuchMethodException` 예외가 발생한다.

**`private` 필드에 접근**<br/>
리플렉션 API를 통해 인스턴스를 생성하여 클래스의 `private` 필드에 접근해 값을 전달할 수 있다. 다음과 같이 
2개의 `private` 필드를 가지는 클래스가 있는 경우, 인스턴스를 직접 생성해 값을 전달할 수 없다. 이때 자바 리플렉션 API를 활용해 값을 가지는 인스턴스를 생성할 수 있다.

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

- `Student` 클래스의 `name` 과 `age` 필드에 값을 할당하고, `getter` 메소드를 통해 값을 확인한다.

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

- `Field` 정보를 가져와서 접근 권한을 `true` 로 바꿔준 후 값을 세팅한다.

### 🔧 요구사항 분리 및 힌트
- `reflections` 라이브러리를 활용해 `@Controller` annotation이 설정되어 있는 모든 클래스를 찾고, 각 클래스에 대한 인스턴스 생성을 담당하는 `ControllerScanner` 클래스를 추가한다.
- annotation 기반 매핑을 담당할 `AnnotationHandlerMapping` 클래스를 추가한 후 초기화한다.
- `AnnotationHandlerMapping` 클래스에 클라이언트 요청 정보(`HttpServletRequest`)를 전달하면 요청에 해당하는 `HandlerExecution` 을 반환하는 메소드를 구현한다.

annotation 기반으로 동작하는 새로운 매핑 클래스(`AnnotationHandlerMapping`) 추가를 완료했다. 다음은 기존에 사용하던 MVC 프레임워크의 `RequestMapping` 과 새로 추가한 `AnnotationHandlerMapping` 이 같이 동작하도록 구현하는 단계이다. 이 과정으로 `RequestMapping` , `AnnotationHandlerMapping` 을 통합할 수 있다면, 기존에 구현한 컨트롤러와 새로 추가할 컨트롤러(`@Controller`)를 같이 사용할 수 있겠다.

- `RequestMapping` , `AnnotationHandlerMapping` 은 요청 URL과 실행할 컨트롤러 클래스 또는 메소드를 매핑하는 역할은 같다. 하지만 수동 매핑이냐, annotation 기반 자동 매핑이냐 차이이다. 두 클래스의 중복된 부분을 인터페이스로 추상화한다. (`HandlerMapping` interface)
- `DispatcherServlet` 의 초기화(`init()` 메소드) 과정에서 `LegacyHandlerMapping` , `AnnotationHandlerMapping` 모두 초기화한다. 두 `HandlerMapping` 을 `List` 로 관리한다.
- `DispatcherServlet` 의 `service()` 메소드에서는 앞에서 초기화한 2개의 `HandlerMapping` 에서 요청 URL에 해당하는 컨트롤러를 찾아 메소드를 실행한다.
- 기존 컨트롤러를 새로 추가한 annotation 기반으로 설정하고 테스트한다.

---

## 🚩 MVC 프레임워크 구현 3단계
### 🔧 @Controller annotation 설정 클래스 스캔
annotation 기반으로 MVC 프레임워크를 구현하려면 먼저 `@Controller` annotation이 설정된 클래스를 찾아야 한다. 리플렉션을 이용해 해당 클래스들을 찾고, 각 클래스에 대한 인스턴스 목록까지 구현한다.

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

- 테스트를 위해 `@Controller` annotation을 사용하는 테스트용 컨트롤러를 구현하고, 테스트 코드를 작성한다.

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

- 테스트에서는 컨트롤러를 잘 매핑하여 정보를 가져오는지 출력문으로 확인한다.
  - 위에서 `@Controller` annotation을 사용한 `MyController` 컨트롤러를 출력하는 것을 확인할 수 있다.

### 🔧 @RequestMapping annotation 설정을 활용한 매핑
앞에서 찾은 컨트롤러 클래스의 `RequestMapping` annotation 설정을 기반으로 매핑한다. 매핑은 이전 MVC 프레임워크와 같이 `Map` 을 활용한다.
- 다른 점은 `Map` 의 key로 사용되는 값이 **요청 URL과 HTTP 메소드의 조합**이라는 점이다.
- 요청 URL과 HTTP 메소드 정보를 가지는 클래스를 `HandleKey` 라는 이름으로 구현한다.

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

- `HashMap` 의 키로 활용하기 위해 `hashCode()` , `equals()` 메소드를 반드시 구현한다.
- `Map` 의 값은 `@RequestMapping` annotation이 설정되어 있는 메소드 정보이다. 
  - 값에 저장되는 메소드 정보는 자바 리플렉션으로 해당 메소드를 실행할 수 있는 정보여야 한다.
  - 즉, 메소드가 위치하는 클래스의 인스턴스 정보와 `java.lang.reflect.Method` 정보를 가져야 한다.
  - 이를 `HandlerExecution` 클래스로 구현한다.

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

이제 `HandleKey` 와 `HandleExecution` 을 연결(mapping)하도록 한다. 매핑 초기화 작업은 `AnnotationHandlerMapping` 클래스에서 구현한다.

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

### 🔧 클라이언트 요청에 해당하는 HandlerExecution 반환
마지막으로 클라이언트 요청에 해당하는 `HandlerExecution` 을 조회하는 메소드이다. `AnnotationHandlerMapping` 을 다음과 같이 구현한다.

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

`AnnotationHandlerMappingTest` 로 정상적으로 구현을 완료했는지 판단한다.

### 🔧 DispatcherServlet과 AnnotationHandlerMapping 통합
이제 `DispatcherServlet` 에서 새로 추가한 `AnnotationHandlerMapping` 을 활용해 서비스할 수 있도록 통합하는 작업을 수행할 차례이다.
- `DispatcherServlet` 은 `RequestMapping` 과 `AnnotationHandlerMapping` 을 모두 지원해야 한다.
  - 분리해서 관리할 수도 있지만 둘을 일관된 인터페이스를 구현하도록 통합한 후 관리하는 것이 향후 확장성을 고려했을 때 적절하다고 판단된다.
  - 먼저 두 `Mapping` 클래스에 대해 추상화한 인터페이스를 `HandlerMapping` 이라는 이름으로 추가한다.

```java
public interface HandlerMapping {
    Object getHandler(HttpServletRequest request);
}
```

이제 위 인터페이스를 두 클래스가 구현하도록 한다. `RequestMapping` 클래스를 `LegacyHandlerMapping` 으로 변경하여 구현한다.

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

- 요청의 URI를 가져와 `mappings` 에서 조회해 반환한다.

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

- `AnnotationHandlerMapping` 은 이미 `getHandler` 를 구현했기에 추가 구현은 없다.

이제 `DispatcherServlet` 이 두 개의 `HandlerMapping` 이 모두 동작하도록 통합하는 작업을 수행한다.
- 초기화가 끝난 `HandlerMapping` 을 `List` 로 관리한다.
- 요청 URL과 HTTP 메소드에 해당하는 컨트롤러를 찾아 작업을 위힘한다.

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
            throw new IllegalArgumentException("존재하지 않는 URL입니다.");
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

- 통합을 완료한 후 기존에 구현한 컨트롤러를 새롭게 추가한 컨트롤러 기반으로 변경한다. 
  - 기존 컨트롤러에 대한 지원도 가능하면서 새로 추가한 `AnnotationHandlerMapping` 지원도 가능해 점진적인 리팩토링 작업이 가능하다.
- 사용자 관리 기능의 일부를 `UserController` 를 추가해 이전 작업하여 정상 동작을 확인한다.

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

이와 같이 컨트롤러 클래스 하나로 통합 작업을 진행하여
- 관리할 클래스 수도 적어지고,
- 컨트롤러에서 발생하는 중복도 제거할 수 있다.
- 또한 점진적인 이전 작업으로 서비스 중단이 없다.

---

## 🚩 인터페이스가 다른 경우 확장성 있는 설계
기존 컨트롤러와 새로 추가한 컨트롤러 클래스를 보면, 메소드 인자와 반환 값이 같아 통합이 가능하다. `HandlerExecution` 클래스가 `Controller` 인터페이스를 구현하도록 리팩토링하여 `HandlerMapping` 의 `getHandler()` 메소드의 반환 값도 `Object` 가 아닌 `Controller` 로 변경할 수 있다.

이로써, 캐스팅과 같은 작업이 필요없어 **소스코드가 깔끔**해지지만, **확장성이 떨어진다는 단점**이 발생한다.
- 만약 모든 코드를 프로젝트 내에서 수정할 수 있는 권한이 있다면 하나로 통합해 관리하는 것이 가능하다.
- 하지만 외부 라이브러리, 프레임워크를 기반으로 컨트롤러를 개발했다면 이 컨트롤러의 인터페이스를 하나로 통합하는 것은 불가능하다.

"애플리케이션을 개발하다보면, 역할은 같은데 서로 다른 인터페이스를 사용하여 통합하기 힘든 상황이 발생한다. 따라서 더 유연한 구조를 지원하려면 인터페이스 하나로 강제하는 것은 바람직하지 않다."

서로 다른 인터페이스 통합 시, `DispatcherServlet` 의 `execute()` 메소드의 구현 코드와 같이 캐스팅을 해야 하는 상황이 종종 발생한다.

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

위 구조는 새로운 컨트롤러 유형이 추가될 경우, `else if` 절이 추가되는 구조이다. 이를 개선해 서로 간의 영향을 주지 않으면서 확장할 수 있는 방법을 강구한다. (개방 폐쇄의 원칙을 준수?)
- 서로 다른 인터페이스를 인터페이스 하나로 연결하는 방법이 필요하다.
  - `Controller` 인터페이스를 추가할 때도 같은 전략
  - `Controller` 는 프레임워크 내에서 모든 컨트롤러를 추상화한 인터페이스라면, 지금은 여러 개의 프레임워크 컨트롤러를 하나로 통합해야 하는 이슈이다.
  - 각 컨트롤러의 역할은 동일하기에, **또 하나의 추상화 단계가 필요하다**는 의미이다.

`DispatcherServlet` 의 `execute()` 메소드의 구현 로직은 **컨트롤러의 인스턴스가 무엇인지를 판단하는 부분**과 **해당 컨트롤러로 캐스팅한 후 컨트롤러를 실행하는 부분**으로 나뉜다.
- 이 부분들을 `HandlerAdapter` 인터페이스로 추상화한 후 각 컨트롤러 구현체가 `DispatcherServlet` 의 `execute()` 로직을 나눠 구현한다.

```java
public interface HandlerAdapter {
    boolean supports(Object handler);

    ModelAndView handle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception;
}
```

이제 각 컨트롤러에 대한 `HandlerAdapter` 를 구현한다. `Controller` 와 `HandlerExecution` 인터페이스에 대한 구현체이다.

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

이제 `DispatcherServlet` 을 다음과 같이 리팩토링한다.

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

- 이제 새로운 컨트롤러 유형이 추가되더라도, `HandlerAdapter` 구현체만 구현(반환형을 새 컨트롤러의 유형으로 수정) 후 `DispatcherServlet` 의 `HandlerAdapter` 목록에 추가하면 된다.

이 같은 구조로 확장하여 다른 `HandlerAdapter` 에 영향을 미치지 않으면서 독립적인 확장이 가능해졌다.

## 📕 출처
- **자바 웹 프로그래밍 Next Step : 하나씩 벗겨가는 양파껍질 학습법** - 박재성
- [자바 리플렉션 개념 및 사용법 알아보기](https://kingname.tistory.com/164)
---
title: "📖 5장 웹 서버 리팩토링, 서블릿 컨테이너와 서블릿의 관계"
description: "자바 웹 프로그래밍 책 정리"
date: 2022-02-07
update: 2022-02-07
tags:
  - Java
  - Refactoring
  - Framework
series: "📖 자바 웹 프로그래밍 Next Step"
---

<em>[자바 웹 프로그래밍 Next Step - 박재성]을 읽고 인용하고 정리하는 POST입니다.</em>

"설계는 한 번의 작업으로 끝내야 하는 것이 아니라 애플리케이션을 개발하고 배포해 운영하는 동안 끊임없이 진행해야 하는 것이 설계이다. 이러한 지속적인 설계와 구현을 잘할 수 있는 방법이 지속적인 리팩토링이다."

> 4장에서 구현한 HTTP 웹 서버를 리팩토링하면서 설계를 개선해보자.

## 🚩 HTTP 웹 서버 리팩토링 실습
### 🔧 리팩토링할 부분 찾기
"리팩토링을 어떻게 하느냐는 능력보다 리팩토링이 필요한 시점과 종료해야 하는 시점을 판단하는 능력이 중요하다."

### 🔧 리팩토링 1단계
**요청 데이터를 처리하는 로직을 별도의 클래스로 분리** (`HttpRequest`)<br/>
해당 요구사항을 만족시키기 위한 새로운 클래스를 만들고, 요청 데이터를 담고 있는 `Http_GET.txt` 파일을 생성해 테스트 코드를 기반으로 개발한다. 아래와 같은 흐름을 가진다.
- HTTP 요청 데이터를 저장한 텍스트 파일을 `FileInputStream` 으로 읽는다.
- 이 `InputStream` 을 새로 생성한 `HttpRequest` 클래스의 생성자로 전달한다.

**GET** 뿐 아니라 **POST**에 대한 테스트 데이터(`Http_POST.txt`)도 추가해 테스트할 수 있다.

```java
public class HttpRequestTest {
    private String testDirectory = "./src/test/resources/";

    @Test
    public void request_GET() throws Exception {
        InputStream in = new FileInputStream(new File(testDirectory + "Http_GET.txt"));
        HttpRequest request = new HttpRequest(in);

        assertEquals("GET", request.getMethod());
        assertEquals("/user/create", request.getPath());
        assertEquals("keep-alive", request.getHeader("Connection"));
        assertEquals("javajigi", request.getParameter("userId"));
    }

    @Test
    public void request_POST() throws Exception {
        InputStream in = new FileInputStream(new File(testDirectory + "Http_POST.txt"));
        HttpRequest request = new HttpRequest(in);

        assertEquals("POST", request.getMethod());
        assertEquals("/user/create", request.getPath());
        assertEquals("keep-alive", request.getHeader("Connection"));
        assertEquals("javajigi", request.getParameter("userId"));
    }
}
```

**응답 데이터를 처리하는 로직을 별도의 클래스로 분리** (`HttpResponse`)<br/>
요청 데이터에 대한 처리를 담당하고 있는 `HttpResponse` 가 정상적으로 동작하는지 확인하는 테스트 코드를 작성한다.

```java
@Test
public void responseForward() throws Exception {
    HttpResponse response = new HttpResponse(createOutputStream("Http_Forward.txt"));
    response.forward("/index.html");
}

@Test
public void responseRedirect() throws Exception {
    HttpResponse response = new HttpResponse(createOutputStream("Http_Redirect.txt"));
    response.sendRedirect("/index.html");
}

@Test
public void responseCookies() throws Exception {
    HttpResponse response = new HttpResponse(createOutputStream("Http_Cookie.txt"));
    response.sendRedirect("/index.html");
}

private OutputStream createOutputStream(String filename) throws FileNotFoundException {
    return new FileOutputStream(new File(testDirectory + filename));
}
```

- 해당 테스트 코드는 생성된 응답 데이터를 파일로 생성하여 수동으로 확인하도록 구현되어 있다.
  - 수동으로 확인하는 것이 번거롭긴 하지만, `HttpResponse` 를 다른 클래스에서 사용하기 전에 정상 동작을 검증할 수 있다.

**다형성을 활용해 클라이언트 요청 URL에 대한 분기 처리를 제거**<br/>
`RequestHandler` 클래스를 보면, 기능이 추가될 때마다 분기문이 하나씩 추가되는 방식이다. 기능에 비례해 분기문의 수가 증가하기에 **자바의 다형성**을 활용해 분기문을 제거한다.

> **클래스 다이어그램**<br/>
> : 클래스 간의 관계를 쉽게 파악하기 위한 목적으로 사용하는 UML 중 하나
> 
> <img src="../blog/images/JAVA/classDiagram.png" width="50%">
> 
> 1. 인터페이스 구현(implements)는 점선 표시, 상속(extends) 실선 표시
> 2. 클래스 간 의존관계
>   - 클래스 의존관계가 클래스의 필드를 통해 연결되는 경우 실선
>   - 클래스 의존관계가 메소드의 로컬 변수로 연결되는 경우 점선
>   - 의존관계의 클래스를 해당 클래스의 인스턴스를 직접 생성하는 경우 <\<create>>

---

## 🚩 웹 서버 리팩토링 구현 및 설명
`RequestHandler` 클래스에서 각 객체가 하나의 책임을 가지도록 설계를 개선하는 리팩토링을 진행한다.

### 🔧 Map, Set
리팩토링 전에, 많이 사용할 `Map`, `Set` 개념을 정리한다.

**`Map`**<br/>
: 사전과 비슷하게, **Key와 Value를 한 쌍**으로 가지는 자료형이다.
- 리스트나 배열처럼 순차적으로 해당 요소 값을 구하지 않고, **Key 값을 이용해 Value를 탐색**한다.
- 순서가 없다.(Unordered)

**`put`, `get`**<br/>
: 각각 Key & Value 쌍을 넣는 메소드, Key 값을 이용해 Value를 얻는 메소드이다.

**`keySet`**<br/>
: `Map` 의 모든 Key를 모아서 `Set` 자료형으로 반환해주는 메소드이다.

**`Set`**<br/>
: 집합과 관련된 것을 쉽게 처리하기 위해 만든 자료형이다.
- 중복을 허용하지 않는다.
- 순서가 없다.(Unordered)

### 🔧 `HttpRequest`
클라이언트 요청 데이터에서 요청 라인(request line)을 읽고, 헤더를 읽는 로직을 `HttpRequest` 클래스를 추가해 구현한다.

`HttpRequest` 의 책임
: 클라이언트 요청 데이터를 읽은 후, 각 데이터를 사용하기 좋은 형태로 분리한다.

분리한 데이터를 사용하는 부분은 `RequestHandler` 가 가진다. 즉, 데이터를 파싱하는 작업(`HttpRequest`)과 사용하는 부분(`RequestHandler`)을 분리한다.

```java
public class HttpRequest {
    private static final Logger log = LoggerFactory.getLogger(HttpRequest.class);

    private String method;
    private String path;
    private Map<String, String> headers = new HashMap<String, String>();
    private Map<String, String> params = new HashMap<String, String>();

    public HttpRequest(InputStream in) {
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(in, "UTF-8"));
            String line = br.readLine();
            if (line == null) {
                return;
            }

            processRequestLine(line);

            line = br.readLine();
            while(!line.equals("")) {
                log.debug("header : {}", line);
                String[] tokens = line.split(":");
                headers.put(tokens[0].trim(), tokens[1].trim());
                line = br.readLine();
            }

            if("POST".equals(method)) {
                String body = IOUtils.readData(br, Integer.parseInt(headers.get("Content-Length")));
                params = HttpRequestUtils.parseQueryString(body);
            }
        } catch (IOException io) {
            log.error(io.getMessage());
        }
    }

    private void processRequestLine(String requestLine) {
        log.debug("request line : {}", requestLine);
        String[] tokens = requestLine.split(" ");
        method = tokens[0];

        if ("POST".equals(method)) {
            path = tokens[1];
            return;
        }

        int index = tokens[1].indexOf("?");
        if (index == -1) {
            path = tokens[1];
        } else {
            path = tokens[1].substring(0, index);
            params = HttpRequestUtils.parseQueryString(tokens[1].substring(index+1));
        }
    }

    public String getMethod() {
        return method;
    }

    public String getPath() {
        return path;
    }

    public String getHeader(String name) {
        return headers.get(name);
    }

    public String getParameter(String name) {
        return params.get(name);
    }
}
```

- `HttpRequest` 는 `InputStream` 을 생성하여 인자로 받은 후 `InputStream` 에 담겨있는 데이터를 필요한 형태로 분리한 후 객체의 필드에 저장하는 역할을 수행한다.
  - 저장한 값에 접근할 수 있는 4 종류의 `get()` 메소드를 제공한다.

**테스트 코드를 기반으로 개발**하는 경우, 아래의 효과를 얻을 수 있다.
- 클래스에 버그가 있는지를 빨리 찾아 구현할수 있다.
- 디버깅이 쉬워진다.
- 테스트 코드가 있기에 마음 놓고 리팩토링을 수행할 수 있다.

이제 테스트 코드가 준비되었으므로, 리팩토링을 진행할 수 있다.

**리팩토링 1단계 `processRequestLine()`**<br/>

`HttpRequest` 의 로직을 보면, 요청 라인을 처리하는 `processRequestLine()` 메소드의 복잡도가 높아보인다. 개발을 진행하다보면, 이와 같이 `private` 메소드인데 로직의 복잡도가 높아 추가적인 테스트가 필요하다고 생각되는 메소드가 발생한다. 그런데, 해당 메소드만 분리하여 테스트하기 어려운 경우에는 두 가지 방법이 있다.
1. `private` 접근 제어자인 메소드를 `default` 접근 제어자로 수정하고 메소드 처리 결과를 반환하도록 수정해 테스트한다.
2. 메소드 구현 로직을 새로운 클래스로 분리한다.

> **`default` 접근 제어자**<br/>
> : 메소드에 아무런 접근 제어자도 추가하지 않을 경우 패키지가 같은 클래스의 경우 접근 가능한 접근 제어자
> `private` 와 `protected` 의 중간 정도 접근 제어 권한을 가진다.

`processRequestLine()` 의 경우 첫번째 방법을 적용하기엔 메소드 처리 후 반환해야 하는 상태 값이 한 개가 아니라 쉽지 않다. 따라서 두번째 방법을 택한다.

```java
public class RequestLine {
    private static final Logger log = LoggerFactory.getLogger(HttpRequest.class);

    private String method;
    private String path;
    private Map<String, String> params = new HashMap<String, String>();

    public RequestLine(String requestLine) {
        log.debug("request line : {}", requestLine);
        String[] tokens = requestLine.split(" ");
        if (tokens.length !=3) {
            throw new IllegalArgumentException(requestLine + "이 형식에 맞지 않습니다.");
        }
        method = tokens[0];

        if ("POST".equals(method)) {
            path = tokens[1];
            return;
        }

        int index = tokens[1].indexOf("?");
        if (index == -1) {
            path = tokens[1];
        } else {
            path = tokens[1].substring(0, index);
            params = HttpRequestUtils.parseQueryString(tokens[1].substring(index+1));
        }
    }

    public String getMethod() {
        return method;
    }

    public String getPath() {
        return path;
    }

    public String getParameter(String name) {
        return params.get(name);
    }
}
```

위와 같이 클래스로 분리하여, 클래스에 대한 테스트가 가능해진다.

```java
public class RequestLineTest {

    @Test
    public void create_method() {
        RequestLine line = new RequestLine("GET /index.html HTTP/1.1");
        assertEquals("GET", line.getMethod());
        assertEquals("/index.html", line.getPath());

        line = new RequestLine("POST /index.html HTTP/1.1");
        assertEquals("/index.html", line.getPath());
    }

    @Test
    public void create_path_and_params() {
        RequestLine line = new RequestLine("GET /user/create?userId=javajigi&password=password&name=JaeSung HTTP/1.1");
        assertEquals("GET", line.getMethod());
        assertEquals("/user/create", line.getPath());

        Map<String, String> params = line.getParams();
        assertEquals(2, params.size());
    }
}
```

이제 앞서 생성했던 `HttpRequest` 클래스가 새로 생성한 `RequestLine` 클래스를 사용하도록 리팩토링하면 다음과 같다.

```java
public class HttpRequest {
    private static final Logger log = LoggerFactory.getLogger(HttpRequest.class);

    private Map<String, String> headers = new HashMap<String, String>();
    private Map<String, String> params = new HashMap<String, String>();
    private RequestLine requestLine;

    public HttpRequest(InputStream in) {
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(in, "UTF-8"));
            String line = br.readLine();
            if (line == null) {
                return;
            }

            requestLine = new RequestLine(line);

            line = br.readLine();
             while((line != null) && !line.isEmpty()) {
                log.debug("header : {}", line);
                String[] tokens = line.split(":");
                headers.put(tokens[0].trim(), tokens[1].trim());
                line = br.readLine();
            }

            if("POST".equals(getMethod())) {
                String body = IOUtils.readData(br, Integer.parseInt(headers.get("Content-Length")));
                params = HttpRequestUtils.parseQueryString(body);
            } else {
                params = requestLine.getParams();
            }
        } catch (IOException io) {
            log.error(io.getMessage());
        }
    }

    public String getMethod() {
        return requestLine.getMethod();
    }

    public String getPath() {
        return requestLine.getPath();
    }

    public String getHeader(String name) {
        return headers.get(name);
    }

    public String getParameter(String name) {
        return params.get(name);
    }
}
```

리팩토링 과정을 살펴보면,
- `RequestLine` 이라는 새로운 클래스를 추가해 `HttpRequest` 에서 요청 라인을 처리하는 책임을 분리했다.
  - 하지만 `HttpRequest` 메소드 원형은 바뀌지 않았다.
  - 따라서 기존의 `HttpRequestTest` 도 변경없이 테스트가 가능하다.

`processRequestLine()` 메소드 로직에 대한 테스트를 새로운 클래스를 추가하여 해결했다. 하지만 메소드가 `private` 이고 메소드 처리 후 반환되는 값이 여러 개(`method`, `path`, `params` ?)라고 반드시 새로운 객체를 추가하는 것이 정답은 아니다. 

**리팩토링 2단계 `GET, POST`**<br/>
**GET**, **POST** 문자열이 하드코딩되어 사용되는 부분이 보인다. 상수 값이 서로 연관되어 있는 경우로, 자바의 `enum` 을 쓰기 적합해보인다. (ex. 남자(M), 여자(F) / 동, 서, 남, 북)

```java
public enum HttpMethod {
    GET,
    POST;
}
```

위 `HttpMethod` 를 사용하여 **GET**, **POST**를 사용하는 코드를 수정할 수 있고, 이렇게 되면 이전까지 문자열을 직접 사용하던 코드들 모두 수정해야 한다. (`HttpRequest`, `RequestLineTest`, `HttpRequestTest`, `RequestLine`)

```java
public class RequestLine {
    private HttpMethod method;
    ...

    public RequestLine(String requestLine) {
        ...
        method = HttpMethod.valueOf(tokens[0]);

        if (method == HttpMethod.POST) {
            path = tokens[1];
            return;
        }

        ...
    }

    public HttpMethod getMethod() {
        return method;
    }

    ...
}
```

또한 아래의 이용해 **POST** 메소드인지 여부를 판단하던 로직을 `if (method.isPost())` 와 같이 리팩토링할 수 있다.

```java
public enum HttpMethod {
    GET,
    POST;

    public boolean isPost() {
        return this == POST;
    }
}
```

"경험이 많지 않은 상태에서는 일단 새로운 객체를 추가했으면 객체를 최대한 활용하기 위해 노력해 본다."
- 객체에서 값을 꺼낸 후 로직을 구현하려 하지 말고 값을 가지고 있는 객체에 메세지를 보내 일을 시키도록 연습하자.

이제 `HttpRequest` 에 대한 리팩토링을 마쳤으니, `RequestHandler` 에서 `HttpRequest` 를 사용하도록 수정하자.

```java
try (InputStream in = connection.getInputStream(); OutputStream out = connection.getOutputStream()) {
    HttpRequest request = new HttpRequest(in);
    DataOutputStream dos = new DataOutputStream(out);
    String path = getDefaultPath(request.getPath());

    if ("/user/create".equals(path)) {
        User user = new User(
                request.getParameter("userId"),
                request.getParameter("password"),
                request.getParameter("name"),
                request.getParameter("email")
        );

        if (request.getMethod().isPost()) {
            DataBase.addUser(user);
            response302Header(dos, "/index.html");
        }
    } else if ("/user/login".equals(path)) {
        if (request.getMethod().isPost()) {
            User user = DataBase.findUserById(request.getParameter("userId"));
            log.debug("User : {}", user);
            if (user == null) {
                responseResource(dos, "/user/login_failed.html");
                return;
            }
            if (user.getPassword().equals(request.getParameter("password"))) {
                response302Logined(dos);
            } else {
                responseResource(dos, "/user/login_failed.html");
                return;
            }
        }
    } else if ("/user/list".equals(path)) {
        if (!isLogin(request.getHeader("Cookie"))) {
            responseResource(out, "/user/login.html");
            return;
        }
        Collection<User> users = DataBase.findAll();
        StringBuilder sb = new StringBuilder();
        sb.append("<h1>회원 목록</h1>");
        for (User user : users) {
            sb.append("<p>" + user.getUserId() + "</p>");
            sb.append("<p>" + user.getName() + "</p>");
            sb.append("<p>" + user.getEmail() + "</p>");
        }
        sb.append("<h2>목록 끝</h2>");
        byte[] body = sb.toString().getBytes();
        response200Header(dos, body.length);
        responseBody(dos, body);
    } else if (path.endsWith(".css")) {
        responseCssResource(out, path);
    } else {
        responseResource(out, path);
    }
} catch (IOException e) {
    log.error(e.getMessage());
}
```

- 크게 각 `path` 별로 분기문을 구분한다.
- `HttpRequest` 에서 전처리를 수행하므로 코드가 훨씬 간결해졌다.

클라이언트 요청 데이터에 대한 처리를 `HttpRequest` 객체에 추상화하여 구현함으로써, `RequestHandler` 는 요청 데이터를 처리하는 모든 로직을 제거할 수 있게 된다. 

추가적으로, `RequestHandler` 의 `isLogin()` 메소드도 `HttpRequest` 에서 쿠키 헤더 값에 대한 처리를 하도록 하는 것이 좋아보인다. 
- `HttpRequest` 에 `public boolean isLogin()` 메소드를 생성해 읽은 `header` 중 `Cookie` 가 존재하는 라인을 가져와 `parseCookies` 로 가지고 있는 값을 반환하도록 한다.

### 🔧 `HttpResponse`
응답 데이터 처리를 담당할 `HttpResponse` 클래스를 추가한다. 이 클래스의 역할은 응답 데이터의 상태에 따라 적절한 HTTP 헤더를 처리한다.

- HTML, CSS, JS 파일을 읽어 반환하는 부분과 302 상태 코드를 처리하는 부분이 가능해야 한다.
- 쿠키 추가와 같이 HTTP 헤더에 임의의 값을 추가할 수 있어야 한다.

```java
public class HttpResponse {
    private static final Logger log = LoggerFactory.getLogger(HttpResponse.class);
    private DataOutputStream dos = null;
    private Map<String, String> headers = new HashMap<String, String>();

    public HttpResponse(OutputStream out) {
        dos = new DataOutputStream(out);
    }

    public void addHeader(String key, String value) {
        headers.put(key, value);
    }

    public void forward(String url) {
        try {
            byte[] body = Files.readAllBytes(new File("./webapp" + url).toPath());
            if (url.endsWith(".css")) {
                headers.put("Content-Type", "text/css");
            } else if (url.endsWith(".js")) {
                headers.put("Content-Type", "application/javascript");
            } else {
                headers.put("Content-Type", "text/html;charset=utf-8");
            }
            headers.put("Content-Length", body.length + "");
            response200Header(body.length);
            responseBody(body);
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }

    public void forwardBody(String body) {
        byte[] contents = body.getBytes();
        headers.put("Content-Type", "text/html;charset=utf-8");
        headers.put("Content-Length", contents.length + "");
        response200Header(contents.length);
        responseBody(contents);
    }

    public void sendRedirect(String redirectUrl) {
        try {
            dos.writeBytes("HTTP/1.1 302 Found \r\n");
            processHeaders();
            dos.writeBytes("Location: " + redirectUrl + " \r\n");
            dos.writeBytes("\r\n");
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }

    private void response200Header(int lengthOfBodyContent) {
        try {
            dos.writeBytes("HTTP/1.1 200 OK \r\n");
            processHeaders();
            dos.writeBytes("\r\n");
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }

    private void responseBody(byte[] body) {
        try {
            dos.write(body, 0, body.length);
            dos.writeBytes("\r\n");
            dos.flush();
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }

    private void processHeaders() {
        try {
            Set<String> keys = headers.keySet();
            for (String key : keys) {
                dos.writeBytes(key + ": " + headers.get(key) + "\r\n");
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }
}
```

- 클래스 생성자로 사용할 `DataOutputStream` 을 생성한다.
- `addHeader()` 는 헤더에 붙일 정보들을 인자로 받아 헤더에 추가한다.
- `forward()` 는 요청된 파일에 따라 헤더의 `Content-Type` 정보를 다르게 채우는 역할을 수행한다.
- `forwardBody()` 는 인자로 받은 문자열을 Byte단위로 읽고 header 정보를 채우는 역할을 수행한다.
- `sendRedirect()` 는 인자로 받은 `redirectUrl` 로의 리다이렉션(302) 응답을 처리한다.
- `response200Header()` 는 성공(200)을 처리한다.
- `responseBody()` 는 인자로 받은 `byte[]` 값을 응답하는 역할을 수행한다.
- `processHeader()` 는 지금까지 `header` 에 더해진 정보들을 꺼내어 응답 헤더에 쓰는 역할을 수행한다.

이제 `RequestHandler` 클래스가 `HttpResponse` 를 사용하도록 리팩토링한다.

```java
try (InputStream in = connection.getInputStream(); OutputStream out = connection.getOutputStream()) {
    HttpRequest request = new HttpRequest(in);
    HttpResponse response = new HttpResponse(out);
    
    ...

    if ("/user/create".equals(path)) {
        User user = new User(
                request.getParameter("userId"),
                request.getParameter("password"),
                request.getParameter("name"),
                request.getParameter("email")
        );
        log.debug("user : {}", user);
        DataBase.addUser(user);
        response.sendRedirect("/index.html");
    } else if ("/user/login".equals(path)) {
        User user = DataBase.findUserById(request.getParameter("userId"));
        if (user != null) {
            if (user.login(request.getParameter("password"))) {
                response.addHeader("Set-Cookie", "logined=true");
                response.sendRedirect("/index.html");
            } else {
                response.sendRedirect("/user/login_failed.html");
            }
        } else {
            response.sendRedirect("/user/login_failed.html");
        }
    } else if ("/user/list".equals(path)) {
        if (!request.isLogin()) {
            response.sendRedirect("/user/login.html");
            return;
        }

        ...

        response.forwardBody(sb.toString());
    } else {
        response.forward(path);
    }
} catch (IOException e) {
    log.error(e.getMessage());
}
```

### 🔧 다형성
리팩토링을 통해 `RequestHandler` 의 복잡도를 많이 낮추었다. 하지만 아직 `run()` 메소드의 복잡도를 완전히 낮추지는 못했다. 가장 큰 문제점은 **기능 추가**마다 **새로운 `else if` 절이 추가**되는 구조의 구현이다. **이러한 구조는 OCP 원칙을 위반하고 있다.**

> **OCP 원칙**
> 개방폐쇄의 원칙 (Open-Closed Principle)
> 요구사항의 변경이나 추가사항이 발생하더라도, 기존 구성요소는 수정이 일어나지 말아야 하며, 기존 구성요소를 쉽게 확장해서 재사용할 수 있어야 한다.

**`run()` 메소드 리팩토링**<br/>
해당 메소드의 복잡도가 높아 먼저 각 분기문 구현을 별도의 메소드로 분리하는 리팩토링(Extract Method 리팩토링)을 진행한다.
- `createUser`, `login`, `listUser`

메소드로 분리하고 보니, 각 메소드는 `HttpRequest`, `HttpResponse` 만 인자로 받는 것을 확인할 수 있다. 즉, 메소드의 원형이 같기에 자바의 인터페이스(`Interface`)로 추출하는 것이 가능하다.

```java
import http.HttpRequest;
import http.HttpResponse;

public interface Controller {
    void service(HttpRequest request, HttpResponse response);
}
```

- 인터페이스를 추가한 후 앞의 분기문에서 분리했던 메소드 구현 코드들을 `Controller` 인터페이스에 대한 구현 클래스로 이동한다. 
- `CreateUserController`, `LoginController`, `ListUserController`

각 분기문에 해당하는 `Controller` 들을 추가했으므로, 이제 각 **요청 URL과 URL에 대응하는 `Controller` 를 연결**해줘야 한다. 이를 위해 `RequestMapping` 이라는 클래스를 생성한다.

```java
public class RequestMapping {
    private static Map<String, Controller> controllers = new HashMap<String, Controller>();
    
    static {
        controllers.put("/user/create", new CreateUserController());
        controllers.put("/user/login", new LoginController());
        controllers.put("/user/list", new ListUserController());
    }
    
    public static Controller getController(String requestUrl) {
        return controllers.get(requestUrl);
    }
}
```

- `Map` 자료형을 사용하여 URL과 `Controller` 를 한 쌍으로 저장함으로써 웹 애플리케이션에서 서비스하는 모든 URL과 `Controller` 를 관리한다.
- `getController()` 로, 요청 URL에 해당하는 `Controller` 를 반환한다.

```java
public class RequestHandler extends Thread {
    private static final Logger log = LoggerFactory.getLogger(RequestHandler.class);

    private Socket connection;

    public RequestHandler(Socket connectionSocket) {
        this.connection = connectionSocket;
    }

    public void run() {
        log.debug("New Client Connect! Connected IP : {}, Port : {}", connection.getInetAddress(),
                connection.getPort());

        try (InputStream in = connection.getInputStream(); OutputStream out = connection.getOutputStream()) {
            HttpRequest request = new HttpRequest(in);
            HttpResponse response = new HttpResponse(out);

            Controller controller = RequestMapping.getController(request.getPath());
            if (controller == null) {
                String path = getDefaultPath(request.getPath());
                response.forward(path);
            } else {
                controller.service(request, response);
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }
    ...
}
```

- 이제 `RequestHandler` 에서 요청 URL에 대한 `Controller` 를 찾은 후 모든 작업을 해당 `Controller` 가 처리하도록 한다.
- 앞으로 다른 기능이 추가된다면, 
  - `Controller` 인터페이스를 구현하는 새로운 클래스를 추가하고, 
  - `RequestMapping` 의 `Map` 에 요청 URL과 `Controller` 클래스를 추가한다.
- 이렇게 각 클래스 간 어떠한 영향도 없이 기능 구현이 가능해진다.

추가적으로, 각 HTTP 메소드(GET, POST)에 따른 처리를 하도록 추상 클래스를 추가할 수도 있다.

```java
public abstract class AbstractController implements Controller {
    @Override
    public void service(HttpRequest request, HttpResponse response) {
        HttpMethod method = request.getMethod();

        if (method.isPost()) {
            doPost(request, response);
        } else {
            doGet(request, response);
        }
    }

    protected void doPost(HttpRequest request, HttpResponse response) {

    }

    protected void doGet(HttpRequest request, HttpResponse response) {

    }
}
```

- 이제 각 `Controller` 는 `Controller` 인터페이스를 직접 구현하는 것이 아닌 `AbstractController` 를 상속해 각 HTTP 메소드에 맞는 메소드를 `@Override` 하도록 구현할 수 있다.

```java
public class CreateUserController extends AbstractController {
    private static final Logger log = LoggerFactory.getLogger(CreateUserController.class);

    @Override
    public void doPost(HttpRequest request, HttpResponse response) {
        User user = new User(request.getParameter("userId"), request.getParameter("password"), request.getParameter("name"), request.getParameter("email"));
        log.debug("user : {}", user);
        DataBase.addUser(user);
        response.sendRedirect("/index.html");
    }
}
```

```java
public class ListUserController extends AbstractController{
    @Override
    public void doGet(HttpRequest request, HttpResponse response) {
        if (!request.isLogin()) {
            response.sendRedirect("/user/login.html");
            return;
        }
        Collection<User> users = DataBase.findAll();
        StringBuilder sb = new StringBuilder();
        sb.append("<h1>회원 목록</h1>");
        for (User user : users) {
            sb.append("<p>" + user.getUserId() + "</p>");
            sb.append("<p>" + user.getName() + "</p>");
            sb.append("<p>" + user.getEmail() + "</p>");
        }
        sb.append("<h2>목록 끝</h2>");
        response.forwardBody(sb.toString());
    }
}
```

```java
public class LoginController extends AbstractController {
    @Override
    public void doPost(HttpRequest request, HttpResponse response) {
        User user = DataBase.findUserById(request.getParameter("userId"));
        if (user != null) {
            if (user.login(request.getParameter("password"))) {
                response.addHeader("Set-Cookie", "logined=true");
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

**위 구현의 장점**은, 요청 URL이 같더라도 HTTP 메소드가 다른 경우, 새로운 `Controller` 클래스 추가없이 **하나의 `Controller` 에서 메소드(`doGet`, `doPost`)만 변경하여 구현이 가능**해진다는 것이다.

### 🔧 HTTP 웹 서버의 문제점
지금까지 구현한 웹 서버는 다음과 같은 한계를 가진다.
- HTTP 요청과 응답 헤더, 본문 처리와 같은 데 시간을 투자함으로써 정작 중요한 로직 구현에 투자할 시간이 상대적으로 적다.
- 동적인 HTML을 지원하는 데 한계가 있다. 이는 많은 코딩량을 필요로 한다.
- 사용자가 입력한 데이터가 계속 유지되지 않는다.

---

## 🚩 서블릿 컨테이너, 서블릿/JSP를 활용한 문제 해결
웹서버의 3가지 문제점 중 앞 2가지 문제점의 해결을 위해 자바 진영에서 표준으로 정한 것이 **서블릿 컨테이너**와 **서블릿/JSP**이다.

**서블릿**<br/>
: 앞에서 구현한 웹 서버의 `Controller`, `HttpRequest`, `HttpResponse` 를 추상화해 인터페이스로 정의해 놓은 표준이다. 즉, HTTP의 클라이언트 요청과 응답에 대한 표준을 정해 놓은 것이다.

**서블릿 컨테이너**<br/>
: 서블릿 표준에 대한 구현을 담당하고 있으며, 앞에서 구현한 웹 서버가 서블릿 컨테이너 역할과 같다.

앞서 구현한 HTTP 웹 서버는,
- 서버를 시작하는 시점에 `Controller` 의 인스턴스를 생성하고,
- 요청 URL과 생성한 `Controller` 인스턴스를 연결시켜 놓는다.
- 클라이언트에서 요청이 오면 요청 URL에 해당하는 `Controller` 를 찾아 작업을 위임한다.

서블릿 컨테이너와 서블릿의 동작 방식도 동일하다.
- 서블릿 컨테이너는 서버 시작 시 서블릿 인스턴스를 생성해, 요청 URL과 서블릿 인스턴스를 연결한다.
- 클라이언트 요청 URL에 해당하는 서블릿을 찾아 작업을 위임한다.

```java
public class WebServerLauncher {
    private static final Logger logger = LoggerFactory.getLogger(WebServerLauncher.class);

    public static void main(String[] args) throws Exception {
        String webappDirLocation = "webapp/";
        Tomcat tomcat = new Tomcat();
        String webPort = System.getenv("PORT");
        if (webPort == null || webPort.isEmpty()) {
            webPort = "8080";
        }

        tomcat.setPort(Integer.parseInt(webPort));
        Connector connector = tomcat.getConnector();
        connector.setURIEncoding("UTF-8");
        tomcat.addWebapp("/", new File(webappDirLocation).getAbsolutePath());
        System.out.println("configuring app with basedir: " + new File("./" + webappDirLocation).getAbsolutePath());
        tomcat.start();
        tomcat.getServer().await();
    }
}
```

- 위는 톰캣 서버를 생성한 모습이다. 
- 톰캣 서버 시작 시, 포트번호는 8080으로 세팅, 인코딩은 UTF-8로 세팅한다.
- "/" 를 root로 접근할 수 있도록 지정하고, "/" 요청 시 해당 root directory를 `webappDirLocation` 으로 지정한다.
  - `webappDirLocation` 에서 자원을 관리한다.
  - 현재 서버를 동작시키면 서버에 아무런 자원이 없어 404 응답 코드가 뜬다.

`webapp/index.html` 을 생성하여 `localhost:8080` 으로 접속하면 해당 HTML의 내용이 보여지는 것을 확인할 수 있다.
- 이는 톰캣 서버가 `index.html` 을 default로 인식하기 때문이다.

이제, 간단한 문구를 출력하는 서블릿을 생성한다.

`src/net.bsu/HeeloWorldServlet.java`

```java
package net.bsu;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hello")
public class HelloWorldServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        out.print("Hello World");
    }
}
```

- 톰캣 서버가 해당 클래스가 서블릿임을 인식하기 위해서는 `HttpServlet` 을 상속해야 한다.
- 해당 서블릿은 간단한 문구 출력을 위해 GET 메소드에 응답을 보내는 것이므로 `doGet` 메소드를 `@Override` 한다.
- 해당 서블릿이 응답하기 위해서는 특정 요청 URL과 대응되어야 한다.
  - URL Mapping을 위해 `@WebServlet` annotation을 사용한다.
- 서버 실행 후 `/hello` 로 접근해도 404 상태코드를 만나는데, 이는 서블릿 표준 directory의 차이때문이다.
  - 표준 root directory는 `tomcatServer/webapp` 이고, 클래스 파일이 위치하는 default 위치는 `webapp/WEB-INF/classes/MyPackage/` 이다. 
  - 따라서, `Project Structure - Project Settings - Modules - Paths` 에서 `Use module compile output path` 를 선택 후, `Output path` 를 위 형태에 맞게 변경한다.
  - 이후 서버를 재시작하여 접근하면 정상적으로 보여지는 것을 확인할 수 있다.

### 🔧 서블릿 컨테이너, 서블릿
위 서블릿 코드들을 보면 이전의 `Controller` 인터페이스 구현체와 비슷하다는 것을 알 수 있다. 서블릿은 앞서 구현한 `Controller` 와 정확히 같은 역할을 수행하며, 똑같은 방식으로 동작한다.
- `doGet()` 메소드의 인자로 전달하는 `HttpServletRequest`, `HttpServletResponse` 는 `HttpRequest`, `HttpResponse` 와 같다.
- 더 정확하게는 `Controller` 인터페이스는 서블릿의 `Servlet` 인터페이스, `AbstractController` 는 `HttpServlet` 과 같다.

서블릿 컨테이너는 서버를 시작할 때
- 클래스패스에 있는 클래스 중 `HttpServlet` 을 상속하는 클래스를 찾는다.
- `@WebServlet` annotation의 값을 읽어 요청 URL과 서블릿을 연결하는 `Map` 을 생성한다.

즉, 앞에서 구현한 `RequestMapping` 의 `Map` 에 서블릿을 추가하고, 요청 URL에 대한 서블릿을 찾아 서비스하는 역할을 서블릿 컨테이너가 담당한다.

**서블릿 컨테이너의 중요한 역할**<br/>
- 서블릿 클래스의 인스턴스 생성
- 요청 URL과 서블릿 인스턴스 Mapping
- 클라이언트 요청에 해당하는 서블릿을 찾은 후 서블릿에 작업을 위임
- 이외에도 서블릿과 관련한 초기화(init)와 소멸(destroy) 작업을 담당

**서블릿 컨테이너가 시작하고 종료할 때의 과정**<br/>
- 서블릿 컨테이너 시작
- 클래스패스에 있는 `Servlet` 인터페이스를 구현하는 서블릿 클래스를 찾음
- `@WebServlet` 설정을 통해 요청 URL과 서블릿 Mapping
- 서블릿 인스턴스 생성
- `init()` 메소드를 호출해 초기화

초기화를 완료한 후, 클라이언트 요청이 있을 때까지 **대기상태**로 있다가 요청이 오는 경우 해당 서블릿을 찾아 `service()` 메소드를 호출한다.

서비스를 제공하다 서블릿 컨테이너를 종료하면, 컨테이너가 관리하고 있던 모든 서블릿의 `destroy()` 메소드를 호출해 **소멸작업**을 진행한다.

이와 같이 서블릿 생성, 초기화, 서비스, 소멸을 거치는 전체 과정을 **서블릿의 생명주기(Life Cycle)**라 하고, 서블릿 컨테이너는 서블릿의 생명주기를 관리한다. (외에도, 멀티쓰레딩 지원, 설정 파일을 활용한 보안관리, JSP 지원 등도 있다.)

**컨테이너**<br/>
개발하면서 많은 컨테이너들을 접하게 된다. 각 컨테니어마다 다른 기능을 지원할 수 있지만 기본적으로 생명주기를 관리하는 기능을 제공한다.

- EJB(Enterprise Java Bean) 컨테이너는 EJB에 대한 생명주기를  관리한다.
- 스프링 프레임워크의 빈(Bean) 컨테이너는 빈에 대한 생명주기를 관리한다.

**컨테이너가 관리하는 객체의 인스턴스**는 개발자가 직접 생성하는 인스턴스가 아니다. (개발자가 직접 생성한다면, 개발자가 원하는 메소드를 호출해 초기화, 소멸과 같은 작업을 진행)
- 초기화, 소멸과 같은 작업을 위한 메소드를 인터페이스 규약으로 만들어 놓고 확장할 수 있도록 지원한다.
  - 2장의 `JUnit` 이 `@Before`, `@Test`, `@After` 와 같이 초기화, 테스트, 소멸 작업을 위해 확장할 부분을 제공한 것처럼 컨테이너도 같은 방식으로 생명주기를 지원한다.

서블릿 컨테이너는 멀티스레드로 동작한다. 동시에 여러 명의 클라이언트가 접속할 수 있도록 지원한다. 그렇다면 서블릿 인스턴스는 몇 개나 생성될까?
- 새로운 스레드 생성마다 생성할까?

정답은 `HTTP` 웹 서버 실습에서 구현한 `RequestMapping` 의 `Map` 을 보면 된다. 
- 이는 `static` 으로 구현되어 있어 서버가 시작할 때 초기화하고 나면 **더이상의 초기화없이 재사용**된다.
- 서블릿도 동일하게, **모든 스레드가 같은 인스턴스를 재사용**(공유)한다.

## 📕 출처
- **자바 웹 프로그래밍 Next Step : 하나씩 벗겨가는 양파껍질 학습법** - 박재성
- [Map 자료형](https://wikidocs.net/208)
- [Set 자료형](https://wikidocs.net/157108)
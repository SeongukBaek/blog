---
title: "π 5μ₯ μΉ μλ² λ¦¬ν©ν λ§, μλΈλ¦Ώ μ»¨νμ΄λμ μλΈλ¦Ώμ κ΄κ³"
description: "μλ° μΉ νλ‘κ·Έλλ° μ± μ λ¦¬"
date: 2022-02-07
update: 2022-02-07
tags:
  - Java
  - Refactoring
  - Framework
series: "π μλ° μΉ νλ‘κ·Έλλ° Next Step"
---

<em>[μλ° μΉ νλ‘κ·Έλλ° Next Step - λ°μ¬μ±]μ μ½κ³  μΈμ©νκ³  μ λ¦¬νλ POSTμλλ€.</em>

"μ€κ³λ ν λ²μ μμμΌλ‘ λλ΄μΌ νλ κ²μ΄ μλλΌ μ νλ¦¬μΌμ΄μμ κ°λ°νκ³  λ°°ν¬ν΄ μ΄μνλ λμ λμμμ΄ μ§νν΄μΌ νλ κ²μ΄ μ€κ³μ΄λ€. μ΄λ¬ν μ§μμ μΈ μ€κ³μ κ΅¬νμ μν  μ μλ λ°©λ²μ΄ μ§μμ μΈ λ¦¬ν©ν λ§μ΄λ€."

> 4μ₯μμ κ΅¬νν HTTP μΉ μλ²λ₯Ό λ¦¬ν©ν λ§νλ©΄μ μ€κ³λ₯Ό κ°μ ν΄λ³΄μ.

## π© HTTP μΉ μλ² λ¦¬ν©ν λ§ μ€μ΅
### π§ λ¦¬ν©ν λ§ν  λΆλΆ μ°ΎκΈ°
"λ¦¬ν©ν λ§μ μ΄λ»κ² νλλλ λ₯λ ₯λ³΄λ€ λ¦¬ν©ν λ§μ΄ νμν μμ κ³Ό μ’λ£ν΄μΌ νλ μμ μ νλ¨νλ λ₯λ ₯μ΄ μ€μνλ€."

### π§ λ¦¬ν©ν λ§ 1λ¨κ³
**μμ²­ λ°μ΄ν°λ₯Ό μ²λ¦¬νλ λ‘μ§μ λ³λμ ν΄λμ€λ‘ λΆλ¦¬** (`HttpRequest`)<br/>
ν΄λΉ μκ΅¬μ¬ν­μ λ§μ‘±μν€κΈ° μν μλ‘μ΄ ν΄λμ€λ₯Ό λ§λ€κ³ , μμ²­ λ°μ΄ν°λ₯Ό λ΄κ³  μλ `Http_GET.txt` νμΌμ μμ±ν΄ νμ€νΈ μ½λλ₯Ό κΈ°λ°μΌλ‘ κ°λ°νλ€. μλμ κ°μ νλ¦μ κ°μ§λ€.
- HTTP μμ²­ λ°μ΄ν°λ₯Ό μ μ₯ν νμ€νΈ νμΌμ `FileInputStream` μΌλ‘ μ½λλ€.
- μ΄ `InputStream` μ μλ‘ μμ±ν `HttpRequest` ν΄λμ€μ μμ±μλ‘ μ λ¬νλ€.

**GET** λΏ μλλΌ **POST**μ λν νμ€νΈ λ°μ΄ν°(`Http_POST.txt`)λ μΆκ°ν΄ νμ€νΈν  μ μλ€.

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

**μλ΅ λ°μ΄ν°λ₯Ό μ²λ¦¬νλ λ‘μ§μ λ³λμ ν΄λμ€λ‘ λΆλ¦¬** (`HttpResponse`)<br/>
μμ²­ λ°μ΄ν°μ λν μ²λ¦¬λ₯Ό λ΄λΉνκ³  μλ `HttpResponse` κ° μ μμ μΌλ‘ λμνλμ§ νμΈνλ νμ€νΈ μ½λλ₯Ό μμ±νλ€.

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

- ν΄λΉ νμ€νΈ μ½λλ μμ±λ μλ΅ λ°μ΄ν°λ₯Ό νμΌλ‘ μμ±νμ¬ μλμΌλ‘ νμΈνλλ‘ κ΅¬νλμ΄ μλ€.
  - μλμΌλ‘ νμΈνλ κ²μ΄ λ²κ±°λ‘­κΈ΄ νμ§λ§, `HttpResponse` λ₯Ό λ€λ₯Έ ν΄λμ€μμ μ¬μ©νκΈ° μ μ μ μ λμμ κ²μ¦ν  μ μλ€.

**λ€νμ±μ νμ©ν΄ ν΄λΌμ΄μΈνΈ μμ²­ URLμ λν λΆκΈ° μ²λ¦¬λ₯Ό μ κ±°**<br/>
`RequestHandler` ν΄λμ€λ₯Ό λ³΄λ©΄, κΈ°λ₯μ΄ μΆκ°λ  λλ§λ€ λΆκΈ°λ¬Έμ΄ νλμ© μΆκ°λλ λ°©μμ΄λ€. κΈ°λ₯μ λΉλ‘ν΄ λΆκΈ°λ¬Έμ μκ° μ¦κ°νκΈ°μ **μλ°μ λ€νμ±**μ νμ©ν΄ λΆκΈ°λ¬Έμ μ κ±°νλ€.

> **ν΄λμ€ λ€μ΄μ΄κ·Έλ¨**<br/>
> : ν΄λμ€ κ°μ κ΄κ³λ₯Ό μ½κ² νμνκΈ° μν λͺ©μ μΌλ‘ μ¬μ©νλ UML μ€ νλ
> 
> <img src="../blog/images/JAVA/classDiagram.png" width="50%">
> 
> 1. μΈν°νμ΄μ€ κ΅¬ν(implements)λ μ μ  νμ, μμ(extends) μ€μ  νμ
> 2. ν΄λμ€ κ° μμ‘΄κ΄κ³
>   - ν΄λμ€ μμ‘΄κ΄κ³κ° ν΄λμ€μ νλλ₯Ό ν΅ν΄ μ°κ²°λλ κ²½μ° μ€μ 
>   - ν΄λμ€ μμ‘΄κ΄κ³κ° λ©μλμ λ‘μ»¬ λ³μλ‘ μ°κ²°λλ κ²½μ° μ μ 
>   - μμ‘΄κ΄κ³μ ν΄λμ€λ₯Ό ν΄λΉ ν΄λμ€μ μΈμ€ν΄μ€λ₯Ό μ§μ  μμ±νλ κ²½μ° <\<create>>

---

## π© μΉ μλ² λ¦¬ν©ν λ§ κ΅¬ν λ° μ€λͺ
`RequestHandler` ν΄λμ€μμ κ° κ°μ²΄κ° νλμ μ±μμ κ°μ§λλ‘ μ€κ³λ₯Ό κ°μ νλ λ¦¬ν©ν λ§μ μ§ννλ€.

### π§ Map, Set
λ¦¬ν©ν λ§ μ μ, λ§μ΄ μ¬μ©ν  `Map`, `Set` κ°λμ μ λ¦¬νλ€.

**`Map`**<br/>
: μ¬μ κ³Ό λΉμ·νκ², **Keyμ Valueλ₯Ό ν μ**μΌλ‘ κ°μ§λ μλ£νμ΄λ€.
- λ¦¬μ€νΈλ λ°°μ΄μ²λΌ μμ°¨μ μΌλ‘ ν΄λΉ μμ κ°μ κ΅¬νμ§ μκ³ , **Key κ°μ μ΄μ©ν΄ Valueλ₯Ό νμ**νλ€.
- μμκ° μλ€.(Unordered)

**`put`, `get`**<br/>
: κ°κ° Key & Value μμ λ£λ λ©μλ, Key κ°μ μ΄μ©ν΄ Valueλ₯Ό μ»λ λ©μλμ΄λ€.

**`keySet`**<br/>
: `Map` μ λͺ¨λ  Keyλ₯Ό λͺ¨μμ `Set` μλ£νμΌλ‘ λ°νν΄μ£Όλ λ©μλμ΄λ€.

**`Set`**<br/>
: μ§ν©κ³Ό κ΄λ ¨λ κ²μ μ½κ² μ²λ¦¬νκΈ° μν΄ λ§λ  μλ£νμ΄λ€.
- μ€λ³΅μ νμ©νμ§ μλλ€.
- μμκ° μλ€.(Unordered)

### π§ `HttpRequest`
ν΄λΌμ΄μΈνΈ μμ²­ λ°μ΄ν°μμ μμ²­ λΌμΈ(request line)μ μ½κ³ , ν€λλ₯Ό μ½λ λ‘μ§μ `HttpRequest` ν΄λμ€λ₯Ό μΆκ°ν΄ κ΅¬ννλ€.

`HttpRequest` μ μ±μ
: ν΄λΌμ΄μΈνΈ μμ²­ λ°μ΄ν°λ₯Ό μ½μ ν, κ° λ°μ΄ν°λ₯Ό μ¬μ©νκΈ° μ’μ ννλ‘ λΆλ¦¬νλ€.

λΆλ¦¬ν λ°μ΄ν°λ₯Ό μ¬μ©νλ λΆλΆμ `RequestHandler` κ° κ°μ§λ€. μ¦, λ°μ΄ν°λ₯Ό νμ±νλ μμ(`HttpRequest`)κ³Ό μ¬μ©νλ λΆλΆ(`RequestHandler`)μ λΆλ¦¬νλ€.

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

- `HttpRequest` λ `InputStream` μ μμ±νμ¬ μΈμλ‘ λ°μ ν `InputStream` μ λ΄κ²¨μλ λ°μ΄ν°λ₯Ό νμν ννλ‘ λΆλ¦¬ν ν κ°μ²΄μ νλμ μ μ₯νλ μ­ν μ μννλ€.
  - μ μ₯ν κ°μ μ κ·Όν  μ μλ 4 μ’λ₯μ `get()` λ©μλλ₯Ό μ κ³΅νλ€.

**νμ€νΈ μ½λλ₯Ό κΈ°λ°μΌλ‘ κ°λ°**νλ κ²½μ°, μλμ ν¨κ³Όλ₯Ό μ»μ μ μλ€.
- ν΄λμ€μ λ²κ·Έκ° μλμ§λ₯Ό λΉ¨λ¦¬ μ°Ύμ κ΅¬νν μ μλ€.
- λλ²κΉμ΄ μ¬μμ§λ€.
- νμ€νΈ μ½λκ° μκΈ°μ λ§μ λκ³  λ¦¬ν©ν λ§μ μνν  μ μλ€.

μ΄μ  νμ€νΈ μ½λκ° μ€λΉλμμΌλ―λ‘, λ¦¬ν©ν λ§μ μ§νν  μ μλ€.

**λ¦¬ν©ν λ§ 1λ¨κ³ `processRequestLine()`**<br/>

`HttpRequest` μ λ‘μ§μ λ³΄λ©΄, μμ²­ λΌμΈμ μ²λ¦¬νλ `processRequestLine()` λ©μλμ λ³΅μ‘λκ° λμλ³΄μΈλ€. κ°λ°μ μ§ννλ€λ³΄λ©΄, μ΄μ κ°μ΄ `private` λ©μλμΈλ° λ‘μ§μ λ³΅μ‘λκ° λμ μΆκ°μ μΈ νμ€νΈκ° νμνλ€κ³  μκ°λλ λ©μλκ° λ°μνλ€. κ·Έλ°λ°, ν΄λΉ λ©μλλ§ λΆλ¦¬νμ¬ νμ€νΈνκΈ° μ΄λ €μ΄ κ²½μ°μλ λ κ°μ§ λ°©λ²μ΄ μλ€.
1. `private` μ κ·Ό μ μ΄μμΈ λ©μλλ₯Ό `default` μ κ·Ό μ μ΄μλ‘ μμ νκ³  λ©μλ μ²λ¦¬ κ²°κ³Όλ₯Ό λ°ννλλ‘ μμ ν΄ νμ€νΈνλ€.
2. λ©μλ κ΅¬ν λ‘μ§μ μλ‘μ΄ ν΄λμ€λ‘ λΆλ¦¬νλ€.

> **`default` μ κ·Ό μ μ΄μ**<br/>
> : λ©μλμ μλ¬΄λ° μ κ·Ό μ μ΄μλ μΆκ°νμ§ μμ κ²½μ° ν¨ν€μ§κ° κ°μ ν΄λμ€μ κ²½μ° μ κ·Ό κ°λ₯ν μ κ·Ό μ μ΄μ
> `private` μ `protected` μ μ€κ° μ λ μ κ·Ό μ μ΄ κΆνμ κ°μ§λ€.

`processRequestLine()` μ κ²½μ° μ²«λ²μ§Έ λ°©λ²μ μ μ©νκΈ°μ λ©μλ μ²λ¦¬ ν λ°νν΄μΌ νλ μν κ°μ΄ ν κ°κ° μλλΌ μ½μ§ μλ€. λ°λΌμ λλ²μ§Έ λ°©λ²μ ννλ€.

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
            throw new IllegalArgumentException(requestLine + "μ΄ νμμ λ§μ§ μμ΅λλ€.");
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

μμ κ°μ΄ ν΄λμ€λ‘ λΆλ¦¬νμ¬, ν΄λμ€μ λν νμ€νΈκ° κ°λ₯ν΄μ§λ€.

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

μ΄μ  μμ μμ±νλ `HttpRequest` ν΄λμ€κ° μλ‘ μμ±ν `RequestLine` ν΄λμ€λ₯Ό μ¬μ©νλλ‘ λ¦¬ν©ν λ§νλ©΄ λ€μκ³Ό κ°λ€.

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

λ¦¬ν©ν λ§ κ³Όμ μ μ΄ν΄λ³΄λ©΄,
- `RequestLine` μ΄λΌλ μλ‘μ΄ ν΄λμ€λ₯Ό μΆκ°ν΄ `HttpRequest` μμ μμ²­ λΌμΈμ μ²λ¦¬νλ μ±μμ λΆλ¦¬νλ€.
  - νμ§λ§ `HttpRequest` λ©μλ μνμ λ°λμ§ μμλ€.
  - λ°λΌμ κΈ°μ‘΄μ `HttpRequestTest` λ λ³κ²½μμ΄ νμ€νΈκ° κ°λ₯νλ€.

`processRequestLine()` λ©μλ λ‘μ§μ λν νμ€νΈλ₯Ό μλ‘μ΄ ν΄λμ€λ₯Ό μΆκ°νμ¬ ν΄κ²°νλ€. νμ§λ§ λ©μλκ° `private` μ΄κ³  λ©μλ μ²λ¦¬ ν λ°νλλ κ°μ΄ μ¬λ¬ κ°(`method`, `path`, `params` ?)λΌκ³  λ°λμ μλ‘μ΄ κ°μ²΄λ₯Ό μΆκ°νλ κ²μ΄ μ λ΅μ μλλ€. 

**λ¦¬ν©ν λ§ 2λ¨κ³ `GET, POST`**<br/>
**GET**, **POST** λ¬Έμμ΄μ΄ νλμ½λ©λμ΄ μ¬μ©λλ λΆλΆμ΄ λ³΄μΈλ€. μμ κ°μ΄ μλ‘ μ°κ΄λμ΄ μλ κ²½μ°λ‘, μλ°μ `enum` μ μ°κΈ° μ ν©ν΄λ³΄μΈλ€. (ex. λ¨μ(M), μ¬μ(F) / λ, μ, λ¨, λΆ)

```java
public enum HttpMethod {
    GET,
    POST;
}
```

μ `HttpMethod` λ₯Ό μ¬μ©νμ¬ **GET**, **POST**λ₯Ό μ¬μ©νλ μ½λλ₯Ό μμ ν  μ μκ³ , μ΄λ κ² λλ©΄ μ΄μ κΉμ§ λ¬Έμμ΄μ μ§μ  μ¬μ©νλ μ½λλ€ λͺ¨λ μμ ν΄μΌ νλ€. (`HttpRequest`, `RequestLineTest`, `HttpRequestTest`, `RequestLine`)

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

λν μλμ μ΄μ©ν΄ **POST** λ©μλμΈμ§ μ¬λΆλ₯Ό νλ¨νλ λ‘μ§μ `if (method.isPost())` μ κ°μ΄ λ¦¬ν©ν λ§ν  μ μλ€.

```java
public enum HttpMethod {
    GET,
    POST;

    public boolean isPost() {
        return this == POST;
    }
}
```

"κ²½νμ΄ λ§μ§ μμ μνμμλ μΌλ¨ μλ‘μ΄ κ°μ²΄λ₯Ό μΆκ°νμΌλ©΄ κ°μ²΄λ₯Ό μ΅λν νμ©νκΈ° μν΄ λΈλ ₯ν΄ λ³Έλ€."
- κ°μ²΄μμ κ°μ κΊΌλΈ ν λ‘μ§μ κ΅¬ννλ € νμ§ λ§κ³  κ°μ κ°μ§κ³  μλ κ°μ²΄μ λ©μΈμ§λ₯Ό λ³΄λ΄ μΌμ μν€λλ‘ μ°μ΅νμ.

μ΄μ  `HttpRequest` μ λν λ¦¬ν©ν λ§μ λ§μ³€μΌλ, `RequestHandler` μμ `HttpRequest` λ₯Ό μ¬μ©νλλ‘ μμ νμ.

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
        sb.append("<h1>νμ λͺ©λ‘</h1>");
        for (User user : users) {
            sb.append("<p>" + user.getUserId() + "</p>");
            sb.append("<p>" + user.getName() + "</p>");
            sb.append("<p>" + user.getEmail() + "</p>");
        }
        sb.append("<h2>λͺ©λ‘ λ</h2>");
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

- ν¬κ² κ° `path` λ³λ‘ λΆκΈ°λ¬Έμ κ΅¬λΆνλ€.
- `HttpRequest` μμ μ μ²λ¦¬λ₯Ό μννλ―λ‘ μ½λκ° ν¨μ¬ κ°κ²°ν΄μ‘λ€.

ν΄λΌμ΄μΈνΈ μμ²­ λ°μ΄ν°μ λν μ²λ¦¬λ₯Ό `HttpRequest` κ°μ²΄μ μΆμννμ¬ κ΅¬νν¨μΌλ‘μ¨, `RequestHandler` λ μμ²­ λ°μ΄ν°λ₯Ό μ²λ¦¬νλ λͺ¨λ  λ‘μ§μ μ κ±°ν  μ μκ² λλ€. 

μΆκ°μ μΌλ‘, `RequestHandler` μ `isLogin()` λ©μλλ `HttpRequest` μμ μΏ ν€ ν€λ κ°μ λν μ²λ¦¬λ₯Ό νλλ‘ νλ κ²μ΄ μ’μλ³΄μΈλ€. 
- `HttpRequest` μ `public boolean isLogin()` λ©μλλ₯Ό μμ±ν΄ μ½μ `header` μ€ `Cookie` κ° μ‘΄μ¬νλ λΌμΈμ κ°μ Έμ `parseCookies` λ‘ κ°μ§κ³  μλ κ°μ λ°ννλλ‘ νλ€.

### π§ `HttpResponse`
μλ΅ λ°μ΄ν° μ²λ¦¬λ₯Ό λ΄λΉν  `HttpResponse` ν΄λμ€λ₯Ό μΆκ°νλ€. μ΄ ν΄λμ€μ μ­ν μ μλ΅ λ°μ΄ν°μ μνμ λ°λΌ μ μ ν HTTP ν€λλ₯Ό μ²λ¦¬νλ€.

- HTML, CSS, JS νμΌμ μ½μ΄ λ°ννλ λΆλΆκ³Ό 302 μν μ½λλ₯Ό μ²λ¦¬νλ λΆλΆμ΄ κ°λ₯ν΄μΌ νλ€.
- μΏ ν€ μΆκ°μ κ°μ΄ HTTP ν€λμ μμμ κ°μ μΆκ°ν  μ μμ΄μΌ νλ€.

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

- ν΄λμ€ μμ±μλ‘ μ¬μ©ν  `DataOutputStream` μ μμ±νλ€.
- `addHeader()` λ ν€λμ λΆμΌ μ λ³΄λ€μ μΈμλ‘ λ°μ ν€λμ μΆκ°νλ€.
- `forward()` λ μμ²­λ νμΌμ λ°λΌ ν€λμ `Content-Type` μ λ³΄λ₯Ό λ€λ₯΄κ² μ±μ°λ μ­ν μ μννλ€.
- `forwardBody()` λ μΈμλ‘ λ°μ λ¬Έμμ΄μ Byteλ¨μλ‘ μ½κ³  header μ λ³΄λ₯Ό μ±μ°λ μ­ν μ μννλ€.
- `sendRedirect()` λ μΈμλ‘ λ°μ `redirectUrl` λ‘μ λ¦¬λ€μ΄λ μ(302) μλ΅μ μ²λ¦¬νλ€.
- `response200Header()` λ μ±κ³΅(200)μ μ²λ¦¬νλ€.
- `responseBody()` λ μΈμλ‘ λ°μ `byte[]` κ°μ μλ΅νλ μ­ν μ μννλ€.
- `processHeader()` λ μ§κΈκΉμ§ `header` μ λν΄μ§ μ λ³΄λ€μ κΊΌλ΄μ΄ μλ΅ ν€λμ μ°λ μ­ν μ μννλ€.

μ΄μ  `RequestHandler` ν΄λμ€κ° `HttpResponse` λ₯Ό μ¬μ©νλλ‘ λ¦¬ν©ν λ§νλ€.

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

### π§ λ€νμ±
λ¦¬ν©ν λ§μ ν΅ν΄ `RequestHandler` μ λ³΅μ‘λλ₯Ό λ§μ΄ λ?μΆμλ€. νμ§λ§ μμ§ `run()` λ©μλμ λ³΅μ‘λλ₯Ό μμ ν λ?μΆμ§λ λͺ»νλ€. κ°μ₯ ν° λ¬Έμ μ μ **κΈ°λ₯ μΆκ°**λ§λ€ **μλ‘μ΄ `else if` μ μ΄ μΆκ°**λλ κ΅¬μ‘°μ κ΅¬νμ΄λ€. **μ΄λ¬ν κ΅¬μ‘°λ OCP μμΉμ μλ°νκ³  μλ€.**

> **OCP μμΉ**
> κ°λ°©νμμ μμΉ (Open-Closed Principle)
> μκ΅¬μ¬ν­μ λ³κ²½μ΄λ μΆκ°μ¬ν­μ΄ λ°μνλλΌλ, κΈ°μ‘΄ κ΅¬μ±μμλ μμ μ΄ μΌμ΄λμ§ λ§μμΌ νλ©°, κΈ°μ‘΄ κ΅¬μ±μμλ₯Ό μ½κ² νμ₯ν΄μ μ¬μ¬μ©ν  μ μμ΄μΌ νλ€.

**`run()` λ©μλ λ¦¬ν©ν λ§**<br/>
ν΄λΉ λ©μλμ λ³΅μ‘λκ° λμ λ¨Όμ  κ° λΆκΈ°λ¬Έ κ΅¬νμ λ³λμ λ©μλλ‘ λΆλ¦¬νλ λ¦¬ν©ν λ§(Extract Method λ¦¬ν©ν λ§)μ μ§ννλ€.
- `createUser`, `login`, `listUser`

λ©μλλ‘ λΆλ¦¬νκ³  λ³΄λ, κ° λ©μλλ `HttpRequest`, `HttpResponse` λ§ μΈμλ‘ λ°λ κ²μ νμΈν  μ μλ€. μ¦, λ©μλμ μνμ΄ κ°κΈ°μ μλ°μ μΈν°νμ΄μ€(`Interface`)λ‘ μΆμΆνλ κ²μ΄ κ°λ₯νλ€.

```java
import http.HttpRequest;
import http.HttpResponse;

public interface Controller {
    void service(HttpRequest request, HttpResponse response);
}
```

- μΈν°νμ΄μ€λ₯Ό μΆκ°ν ν μμ λΆκΈ°λ¬Έμμ λΆλ¦¬νλ λ©μλ κ΅¬ν μ½λλ€μ `Controller` μΈν°νμ΄μ€μ λν κ΅¬ν ν΄λμ€λ‘ μ΄λνλ€. 
- `CreateUserController`, `LoginController`, `ListUserController`

κ° λΆκΈ°λ¬Έμ ν΄λΉνλ `Controller` λ€μ μΆκ°νμΌλ―λ‘, μ΄μ  κ° **μμ²­ URLκ³Ό URLμ λμνλ `Controller` λ₯Ό μ°κ²°**ν΄μ€μΌ νλ€. μ΄λ₯Ό μν΄ `RequestMapping` μ΄λΌλ ν΄λμ€λ₯Ό μμ±νλ€.

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

- `Map` μλ£νμ μ¬μ©νμ¬ URLκ³Ό `Controller` λ₯Ό ν μμΌλ‘ μ μ₯ν¨μΌλ‘μ¨ μΉ μ νλ¦¬μΌμ΄μμμ μλΉμ€νλ λͺ¨λ  URLκ³Ό `Controller` λ₯Ό κ΄λ¦¬νλ€.
- `getController()` λ‘, μμ²­ URLμ ν΄λΉνλ `Controller` λ₯Ό λ°ννλ€.

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

- μ΄μ  `RequestHandler` μμ μμ²­ URLμ λν `Controller` λ₯Ό μ°Ύμ ν λͺ¨λ  μμμ ν΄λΉ `Controller` κ° μ²λ¦¬νλλ‘ νλ€.
- μμΌλ‘ λ€λ₯Έ κΈ°λ₯μ΄ μΆκ°λλ€λ©΄, 
  - `Controller` μΈν°νμ΄μ€λ₯Ό κ΅¬ννλ μλ‘μ΄ ν΄λμ€λ₯Ό μΆκ°νκ³ , 
  - `RequestMapping` μ `Map` μ μμ²­ URLκ³Ό `Controller` ν΄λμ€λ₯Ό μΆκ°νλ€.
- μ΄λ κ² κ° ν΄λμ€ κ° μ΄λ ν μν₯λ μμ΄ κΈ°λ₯ κ΅¬νμ΄ κ°λ₯ν΄μ§λ€.

μΆκ°μ μΌλ‘, κ° HTTP λ©μλ(GET, POST)μ λ°λ₯Έ μ²λ¦¬λ₯Ό νλλ‘ μΆμ ν΄λμ€λ₯Ό μΆκ°ν  μλ μλ€.

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

- μ΄μ  κ° `Controller` λ `Controller` μΈν°νμ΄μ€λ₯Ό μ§μ  κ΅¬ννλ κ²μ΄ μλ `AbstractController` λ₯Ό μμν΄ κ° HTTP λ©μλμ λ§λ λ©μλλ₯Ό `@Override` νλλ‘ κ΅¬νν  μ μλ€.

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
        sb.append("<h1>νμ λͺ©λ‘</h1>");
        for (User user : users) {
            sb.append("<p>" + user.getUserId() + "</p>");
            sb.append("<p>" + user.getName() + "</p>");
            sb.append("<p>" + user.getEmail() + "</p>");
        }
        sb.append("<h2>λͺ©λ‘ λ</h2>");
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

**μ κ΅¬νμ μ₯μ **μ, μμ²­ URLμ΄ κ°λλΌλ HTTP λ©μλκ° λ€λ₯Έ κ²½μ°, μλ‘μ΄ `Controller` ν΄λμ€ μΆκ°μμ΄ **νλμ `Controller` μμ λ©μλ(`doGet`, `doPost`)λ§ λ³κ²½νμ¬ κ΅¬νμ΄ κ°λ₯**ν΄μ§λ€λ κ²μ΄λ€.

### π§ HTTP μΉ μλ²μ λ¬Έμ μ 
μ§κΈκΉμ§ κ΅¬νν μΉ μλ²λ λ€μκ³Ό κ°μ νκ³λ₯Ό κ°μ§λ€.
- HTTP μμ²­κ³Ό μλ΅ ν€λ, λ³Έλ¬Έ μ²λ¦¬μ κ°μ λ° μκ°μ ν¬μν¨μΌλ‘μ¨ μ μ μ€μν λ‘μ§ κ΅¬νμ ν¬μν  μκ°μ΄ μλμ μΌλ‘ μ λ€.
- λμ μΈ HTMLμ μ§μνλ λ° νκ³κ° μλ€. μ΄λ λ§μ μ½λ©λμ νμλ‘ νλ€.
- μ¬μ©μκ° μλ ₯ν λ°μ΄ν°κ° κ³μ μ μ§λμ§ μλλ€.

---

## π© μλΈλ¦Ώ μ»¨νμ΄λ, μλΈλ¦Ώ/JSPλ₯Ό νμ©ν λ¬Έμ  ν΄κ²°
μΉμλ²μ 3κ°μ§ λ¬Έμ μ  μ€ μ 2κ°μ§ λ¬Έμ μ μ ν΄κ²°μ μν΄ μλ° μ§μμμ νμ€μΌλ‘ μ ν κ²μ΄ **μλΈλ¦Ώ μ»¨νμ΄λ**μ **μλΈλ¦Ώ/JSP**μ΄λ€.

**μλΈλ¦Ώ**<br/>
: μμμ κ΅¬νν μΉ μλ²μ `Controller`, `HttpRequest`, `HttpResponse` λ₯Ό μΆμνν΄ μΈν°νμ΄μ€λ‘ μ μν΄ λμ νμ€μ΄λ€. μ¦, HTTPμ ν΄λΌμ΄μΈνΈ μμ²­κ³Ό μλ΅μ λν νμ€μ μ ν΄ λμ κ²μ΄λ€.

**μλΈλ¦Ώ μ»¨νμ΄λ**<br/>
: μλΈλ¦Ώ νμ€μ λν κ΅¬νμ λ΄λΉνκ³  μμΌλ©°, μμμ κ΅¬νν μΉ μλ²κ° μλΈλ¦Ώ μ»¨νμ΄λ μ­ν κ³Ό κ°λ€.

μμ κ΅¬νν HTTP μΉ μλ²λ,
- μλ²λ₯Ό μμνλ μμ μ `Controller` μ μΈμ€ν΄μ€λ₯Ό μμ±νκ³ ,
- μμ²­ URLκ³Ό μμ±ν `Controller` μΈμ€ν΄μ€λ₯Ό μ°κ²°μμΌ λλλ€.
- ν΄λΌμ΄μΈνΈμμ μμ²­μ΄ μ€λ©΄ μμ²­ URLμ ν΄λΉνλ `Controller` λ₯Ό μ°Ύμ μμμ μμνλ€.

μλΈλ¦Ώ μ»¨νμ΄λμ μλΈλ¦Ώμ λμ λ°©μλ λμΌνλ€.
- μλΈλ¦Ώ μ»¨νμ΄λλ μλ² μμ μ μλΈλ¦Ώ μΈμ€ν΄μ€λ₯Ό μμ±ν΄, μμ²­ URLκ³Ό μλΈλ¦Ώ μΈμ€ν΄μ€λ₯Ό μ°κ²°νλ€.
- ν΄λΌμ΄μΈνΈ μμ²­ URLμ ν΄λΉνλ μλΈλ¦Ώμ μ°Ύμ μμμ μμνλ€.

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

- μλ ν°μΊ£ μλ²λ₯Ό μμ±ν λͺ¨μ΅μ΄λ€. 
- ν°μΊ£ μλ² μμ μ, ν¬νΈλ²νΈλ 8080μΌλ‘ μΈν, μΈμ½λ©μ UTF-8λ‘ μΈννλ€.
- "/" λ₯Ό rootλ‘ μ κ·Όν  μ μλλ‘ μ§μ νκ³ , "/" μμ²­ μ ν΄λΉ root directoryλ₯Ό `webappDirLocation` μΌλ‘ μ§μ νλ€.
  - `webappDirLocation` μμ μμμ κ΄λ¦¬νλ€.
  - νμ¬ μλ²λ₯Ό λμμν€λ©΄ μλ²μ μλ¬΄λ° μμμ΄ μμ΄ 404 μλ΅ μ½λκ° λ¬λ€.

`webapp/index.html` μ μμ±νμ¬ `localhost:8080` μΌλ‘ μ μνλ©΄ ν΄λΉ HTMLμ λ΄μ©μ΄ λ³΄μ¬μ§λ κ²μ νμΈν  μ μλ€.
- μ΄λ ν°μΊ£ μλ²κ° `index.html` μ defaultλ‘ μΈμνκΈ° λλ¬Έμ΄λ€.

μ΄μ , κ°λ¨ν λ¬Έκ΅¬λ₯Ό μΆλ ₯νλ μλΈλ¦Ώμ μμ±νλ€.

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

- ν°μΊ£ μλ²κ° ν΄λΉ ν΄λμ€κ° μλΈλ¦Ώμμ μΈμνκΈ° μν΄μλ `HttpServlet` μ μμν΄μΌ νλ€.
- ν΄λΉ μλΈλ¦Ώμ κ°λ¨ν λ¬Έκ΅¬ μΆλ ₯μ μν΄ GET λ©μλμ μλ΅μ λ³΄λ΄λ κ²μ΄λ―λ‘ `doGet` λ©μλλ₯Ό `@Override` νλ€.
- ν΄λΉ μλΈλ¦Ώμ΄ μλ΅νκΈ° μν΄μλ νΉμ  μμ²­ URLκ³Ό λμλμ΄μΌ νλ€.
  - URL Mappingμ μν΄ `@WebServlet` annotationμ μ¬μ©νλ€.
- μλ² μ€ν ν `/hello` λ‘ μ κ·Όν΄λ 404 μνμ½λλ₯Ό λ§λλλ°, μ΄λ μλΈλ¦Ώ νμ€ directoryμ μ°¨μ΄λλ¬Έμ΄λ€.
  - νμ€ root directoryλ `tomcatServer/webapp` μ΄κ³ , ν΄λμ€ νμΌμ΄ μμΉνλ default μμΉλ `webapp/WEB-INF/classes/MyPackage/` μ΄λ€. 
  - λ°λΌμ, `Project Structure - Project Settings - Modules - Paths` μμ `Use module compile output path` λ₯Ό μ ν ν, `Output path` λ₯Ό μ ννμ λ§κ² λ³κ²½νλ€.
  - μ΄ν μλ²λ₯Ό μ¬μμνμ¬ μ κ·Όνλ©΄ μ μμ μΌλ‘ λ³΄μ¬μ§λ κ²μ νμΈν  μ μλ€.

### π§ μλΈλ¦Ώ μ»¨νμ΄λ, μλΈλ¦Ώ
μ μλΈλ¦Ώ μ½λλ€μ λ³΄λ©΄ μ΄μ μ `Controller` μΈν°νμ΄μ€ κ΅¬νμ²΄μ λΉμ·νλ€λ κ²μ μ μ μλ€. μλΈλ¦Ώμ μμ κ΅¬νν `Controller` μ μ νν κ°μ μ­ν μ μννλ©°, λκ°μ λ°©μμΌλ‘ λμνλ€.
- `doGet()` λ©μλμ μΈμλ‘ μ λ¬νλ `HttpServletRequest`, `HttpServletResponse` λ `HttpRequest`, `HttpResponse` μ κ°λ€.
- λ μ ννκ²λ `Controller` μΈν°νμ΄μ€λ μλΈλ¦Ώμ `Servlet` μΈν°νμ΄μ€, `AbstractController` λ `HttpServlet` κ³Ό κ°λ€.

μλΈλ¦Ώ μ»¨νμ΄λλ μλ²λ₯Ό μμν  λ
- ν΄λμ€ν¨μ€μ μλ ν΄λμ€ μ€ `HttpServlet` μ μμνλ ν΄λμ€λ₯Ό μ°Ύλλ€.
- `@WebServlet` annotationμ κ°μ μ½μ΄ μμ²­ URLκ³Ό μλΈλ¦Ώμ μ°κ²°νλ `Map` μ μμ±νλ€.

μ¦, μμμ κ΅¬νν `RequestMapping` μ `Map` μ μλΈλ¦Ώμ μΆκ°νκ³ , μμ²­ URLμ λν μλΈλ¦Ώμ μ°Ύμ μλΉμ€νλ μ­ν μ μλΈλ¦Ώ μ»¨νμ΄λκ° λ΄λΉνλ€.

**μλΈλ¦Ώ μ»¨νμ΄λμ μ€μν μ­ν **<br/>
- μλΈλ¦Ώ ν΄λμ€μ μΈμ€ν΄μ€ μμ±
- μμ²­ URLκ³Ό μλΈλ¦Ώ μΈμ€ν΄μ€ Mapping
- ν΄λΌμ΄μΈνΈ μμ²­μ ν΄λΉνλ μλΈλ¦Ώμ μ°Ύμ ν μλΈλ¦Ώμ μμμ μμ
- μ΄μΈμλ μλΈλ¦Ώκ³Ό κ΄λ ¨ν μ΄κΈ°ν(init)μ μλ©Έ(destroy) μμμ λ΄λΉ

**μλΈλ¦Ώ μ»¨νμ΄λκ° μμνκ³  μ’λ£ν  λμ κ³Όμ **<br/>
- μλΈλ¦Ώ μ»¨νμ΄λ μμ
- ν΄λμ€ν¨μ€μ μλ `Servlet` μΈν°νμ΄μ€λ₯Ό κ΅¬ννλ μλΈλ¦Ώ ν΄λμ€λ₯Ό μ°Ύμ
- `@WebServlet` μ€μ μ ν΅ν΄ μμ²­ URLκ³Ό μλΈλ¦Ώ Mapping
- μλΈλ¦Ώ μΈμ€ν΄μ€ μμ±
- `init()` λ©μλλ₯Ό νΈμΆν΄ μ΄κΈ°ν

μ΄κΈ°νλ₯Ό μλ£ν ν, ν΄λΌμ΄μΈνΈ μμ²­μ΄ μμ λκΉμ§ **λκΈ°μν**λ‘ μλ€κ° μμ²­μ΄ μ€λ κ²½μ° ν΄λΉ μλΈλ¦Ώμ μ°Ύμ `service()` λ©μλλ₯Ό νΈμΆνλ€.

μλΉμ€λ₯Ό μ κ³΅νλ€ μλΈλ¦Ώ μ»¨νμ΄λλ₯Ό μ’λ£νλ©΄, μ»¨νμ΄λκ° κ΄λ¦¬νκ³  μλ λͺ¨λ  μλΈλ¦Ώμ `destroy()` λ©μλλ₯Ό νΈμΆν΄ **μλ©Έμμ**μ μ§ννλ€.

μ΄μ κ°μ΄ μλΈλ¦Ώ μμ±, μ΄κΈ°ν, μλΉμ€, μλ©Έμ κ±°μΉλ μ μ²΄ κ³Όμ μ **μλΈλ¦Ώμ μλͺμ£ΌκΈ°(Life Cycle)**λΌ νκ³ , μλΈλ¦Ώ μ»¨νμ΄λλ μλΈλ¦Ώμ μλͺμ£ΌκΈ°λ₯Ό κ΄λ¦¬νλ€. (μΈμλ, λ©ν°μ°λ λ© μ§μ, μ€μ  νμΌμ νμ©ν λ³΄μκ΄λ¦¬, JSP μ§μ λ±λ μλ€.)

**μ»¨νμ΄λ**<br/>
κ°λ°νλ©΄μ λ§μ μ»¨νμ΄λλ€μ μ νκ² λλ€. κ° μ»¨νλμ΄λ§λ€ λ€λ₯Έ κΈ°λ₯μ μ§μν  μ μμ§λ§ κΈ°λ³Έμ μΌλ‘ μλͺμ£ΌκΈ°λ₯Ό κ΄λ¦¬νλ κΈ°λ₯μ μ κ³΅νλ€.

- EJB(Enterprise Java Bean) μ»¨νμ΄λλ EJBμ λν μλͺμ£ΌκΈ°λ₯Ό  κ΄λ¦¬νλ€.
- μ€νλ§ νλ μμν¬μ λΉ(Bean) μ»¨νμ΄λλ λΉμ λν μλͺμ£ΌκΈ°λ₯Ό κ΄λ¦¬νλ€.

**μ»¨νμ΄λκ° κ΄λ¦¬νλ κ°μ²΄μ μΈμ€ν΄μ€**λ κ°λ°μκ° μ§μ  μμ±νλ μΈμ€ν΄μ€κ° μλλ€. (κ°λ°μκ° μ§μ  μμ±νλ€λ©΄, κ°λ°μκ° μνλ λ©μλλ₯Ό νΈμΆν΄ μ΄κΈ°ν, μλ©Έκ³Ό κ°μ μμμ μ§ν)
- μ΄κΈ°ν, μλ©Έκ³Ό κ°μ μμμ μν λ©μλλ₯Ό μΈν°νμ΄μ€ κ·μ½μΌλ‘ λ§λ€μ΄ λκ³  νμ₯ν  μ μλλ‘ μ§μνλ€.
  - 2μ₯μ `JUnit` μ΄ `@Before`, `@Test`, `@After` μ κ°μ΄ μ΄κΈ°ν, νμ€νΈ, μλ©Έ μμμ μν΄ νμ₯ν  λΆλΆμ μ κ³΅ν κ²μ²λΌ μ»¨νμ΄λλ κ°μ λ°©μμΌλ‘ μλͺμ£ΌκΈ°λ₯Ό μ§μνλ€.

μλΈλ¦Ώ μ»¨νμ΄λλ λ©ν°μ€λ λλ‘ λμνλ€. λμμ μ¬λ¬ λͺμ ν΄λΌμ΄μΈνΈκ° μ μν  μ μλλ‘ μ§μνλ€. κ·Έλ λ€λ©΄ μλΈλ¦Ώ μΈμ€ν΄μ€λ λͺ κ°λ μμ±λ κΉ?
- μλ‘μ΄ μ€λ λ μμ±λ§λ€ μμ±ν κΉ?

μ λ΅μ `HTTP` μΉ μλ² μ€μ΅μμ κ΅¬νν `RequestMapping` μ `Map` μ λ³΄λ©΄ λλ€. 
- μ΄λ `static` μΌλ‘ κ΅¬νλμ΄ μμ΄ μλ²κ° μμν  λ μ΄κΈ°ννκ³  λλ©΄ **λμ΄μμ μ΄κΈ°νμμ΄ μ¬μ¬μ©**λλ€.
- μλΈλ¦Ώλ λμΌνκ², **λͺ¨λ  μ€λ λκ° κ°μ μΈμ€ν΄μ€λ₯Ό μ¬μ¬μ©**(κ³΅μ )νλ€.

## π μΆμ²
- **μλ° μΉ νλ‘κ·Έλλ° Next Step : νλμ© λ²κ²¨κ°λ μνκ»μ§ νμ΅λ²** - λ°μ¬μ±
- [Map μλ£ν](https://wikidocs.net/208)
- [Set μλ£ν](https://wikidocs.net/157108)
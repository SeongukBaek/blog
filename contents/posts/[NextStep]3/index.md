---
title: "π 3μ₯ κ°λ° νκ²½ κ΅¬μΆ λ° μΉ μλ² μ€μ΅ μκ΅¬μ¬ν­"
description: "μλ° μΉ νλ‘κ·Έλλ° μ± μ λ¦¬"
date: 2022-01-25
update: 2022-01-25
tags:
  - Java
  - Refactoring
  - Framework
series: "π μλ° μΉ νλ‘κ·Έλλ° Next Step"
---

<em>[μλ° μΉ νλ‘κ·Έλλ° Next Step - λ°μ¬μ±]μ μ½κ³  μΈμ©νκ³  μ λ¦¬νλ POSTμλλ€.</em>

> 3μ₯μ λ‘μ»¬μμ μΉ μ νλ¦¬μΌμ΄μμ κ°λ°, λ²μ  κ΄λ¦¬ μμ€νμμ μμ€μ½λλ₯Ό κ΄λ¦¬, κ°λ°ν μΉ μ νλ¦¬μΌμ΄μμ μκ²© μλ²μ μ€μ  λ°°ν¬νλ κ²½νμ νκ³ , κ΅¬νν  μ§λ¬Έ/λ΅λ³ κ²μνμ λν μλΉμ€ μκ΅¬μ¬ν­κ³Ό μ€μ΅ μκ΅¬μ¬ν­μ μ μνλ€.
> λν, HTTP μΉ μλ²λ₯Ό μ§μ  κ΅¬ννλ κ²½νμ ν¨μΌλ‘μ¨ μΉ ν΄λΌμ΄μΈνΈμ μλ² κ° λ°μ΄ν°λ₯Ό μ΄λ»κ² μ£Όκ³  λ°λμ§μ λν΄ νμ΅νλ€.

## π© μλΉμ€ μκ΅¬μ¬ν­
<em>μ§λ¬Έ/λ΅λ³ κ²μν</em>

### π§ μ§λ¬Έ λͺ©λ‘ νλ©΄
- νμκ°μ
- λ‘κ·ΈμΈ
- λ‘κ·Έμμ
- κ°μΈμ λ³΄ μμ 
- μ§λ¬ΈνκΈ°
- κ° μ§λ¬Έ μ λͺ©μ ν΄λ¦­νμ¬ μμΈλ³΄κΈ° νλ©΄μΌλ‘ μ΄λ
  - λ΅λ³ μΆκ°, μ§λ¬Έκ³Ό λ΅λ³μ μμ /μ­μ 

---

## π© λ‘μ»¬ κ°λ° νκ²½ κ΅¬μΆ
<em>μλ° 8λ²μ  & Intellij ν΅ν© κ°λ° νκ²½</em>

https://github.com/slipp/web-application-server, https://www.youtube.com/watch?v=5hjYe_PggJI μ°Έκ³ !

---

## π© μκ²© μλ²μ λ°°ν¬
<em>μ μμΌ νλ‘μΈμ€μ μ κ·Ό λ°©μ</em>
: ν μμ μ κ°μ₯ κ°μΉμλ, λμνλ μννΈμ¨μ΄λ₯Ό λ§λλ κ²μ μμΉμΌλ‘ νλ λ°©μμ΄λ€.

λ‘μ»¬ κ°λ° νκ²½μ κ΅¬μΆν ν λ°λ‘ μ€μ΅ λ¨κ³λ₯Ό μ§νν  μ μμ§λ§ μ€μ΅μ μ§ννκΈ° μ μ λ¨Όμ  HTTP μΉ μλ²λ₯Ό μκ²© μλ²μ λ°°ν¬ν΄λ³΄μ. μ΄λ¬ν κ²½νμ ν΅ν΄ ν°λ―Έλ νκ²½μμ μμνλ κ²μ μ΅μν΄μ§λλ‘ νλ€. 
https://opentutorials.org/module/1946 μ°Έκ³ νμ¬ AWSμ λν νμκ°μ, μ°λΆν¬ μ΄μμ²΄μ  μ€μΉ, SSHλ₯Ό ν΅ν μ κ·Όμ μ§νν  μ μλ€.

### π§ μκ΅¬μ¬ν­
λ‘μ»¬ κ°λ° νκ²½μ μ€μΉν HTTP μΉ μλ²λ₯Ό λ¬Όλ¦¬μ μΌλ‘ λ¨μ΄μ Έ μλ μκ²© μλ²μ λ°°ν¬ν΄ μ μμ μΌλ‘ λμνλμ§ νμ€νΈνλ€.

---

## π© μΉ μλ² μ€μ΅
### π§ μ€μ΅ νκ²½ μΈν λ° μμ€μ½λ λΆμ
μ€μ΅μΌλ‘ μ§νν  HTTP μΉ μλ²λ μμ λ‘μ»¬ κ°λ° νκ²½μμ μΈνν Git μ μ₯μμ **master** λΈλμΉμμ μμνλ©΄ λλ€.

μ€μ΅ HTTP μΉ μλ²μ ν΅μ¬μ΄ λλ μ½λλ `webserver` ν¨ν€μ§μ `WebServer`, `RequestHandler` ν΄λμ€μ΄λ€.
- `WebServer` ν΄λμ€λ μΉ μλ²λ₯Ό μμνκ³ , μ¬μ©μμ μμ²­μ΄ μμ λκΉμ§ λκΈ° μνμ μλ€κ° μ¬μ©μ μμ²­μ΄ μμ κ²½μ° ν΄λΉ μμ²­μ `RequestHandler` ν΄λμ€μ μμνλ μ­ν μ μννλ€.

```java
// in WebServer.java
try (ServerSocket listenSocket = new ServerSocket(port)) {
  log.info("Web Application Server started {} port.", port);

  // ν΄λΌμ΄μΈνΈκ° μ°κ²°λ λκΉμ§ λκΈ°νλ€.
  Socket connection;
  while ((connection = listenSocket.accept()) != null) {
      RequestHandler requestHandler = new RequestHandler(connection);
      requestHandler.start();
  }
}
```

- μ¬μ©μ μμ²­μ΄ λ°μν  λκΉμ§ λκΈ° μνμ μλλ‘ μ§μνλ μ­ν μ μλ°μ ν¬ν¨λμ΄ μλ `ServerSocket` ν΄λμ€κ° λ΄λΉνλ€. 
- μ¬μ©μ μμ²­μ΄ λ°μνλ μκ° ν΄λΌμ΄μΈνΈμ μ°κ²°μ λ΄λΉνλ `Socket` μ `RequestHandler` μ μ λ¬νλ©΄μ μλ‘μ΄ μ€λ λλ₯Ό μ€ννλ λ°©μμΌλ‘ **λ©ν°μ€λ λ νλ‘κ·Έλλ°**μ μ§μνλ€.

```java
// in RequestHandler.java
package webserver;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
            // TODO μ¬μ©μ μμ²­μ λν μ²λ¦¬λ μ΄ κ³³μ κ΅¬ννλ©΄ λλ€.
            DataOutputStream dos = new DataOutputStream(out);
            byte[] body = "Hello World".getBytes();
            response200Header(dos, body.length);
            responseBody(dos, body);
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }

    private void response200Header(DataOutputStream dos, int lengthOfBodyContent) {
        try {
            dos.writeBytes("HTTP/1.1 200 OK \r\n");
            dos.writeBytes("Content-Type: text/html;charset=utf-8\r\n");
            dos.writeBytes("Content-Length: " + lengthOfBodyContent + "\r\n");
            dos.writeBytes("\r\n");
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }

    private void responseBody(DataOutputStream dos, byte[] body) {
        try {
            dos.write(body, 0, body.length);
            dos.flush();
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }
}
```

- `RequestHandler` ν΄λμ€λ `Thread` λ₯Ό μμνκ³ , **μ¬μ©μμ μμ²­μ λν μ²λ¦¬μ μλ΅μ λν μ²λ¦¬λ₯Ό λ΄λΉνλ ν΄λμ€**μ΄λ€.
- μμΌλ‘μ λͺ¨λ  μ€μ΅μ `RequestHandler` ν΄λμ€μ `run()` λ©μλμμ κ΅¬νν  μ μλ€.
  - ν΄λΉ λ©μλμ λ³΅μ‘λκ° μ¦κ°νλ κ²½μ°, μλ‘μ΄ ν΄λμ€ λλ λ©μλλ‘ λΆλ¦¬νλ λ°©μμΌλ‘ λ¦¬ν©ν λ§μ μνν  μ μλ€.
- `InputStream` : ν΄λΌμ΄μΈνΈ(μΉ λΈλΌμ°μ )μμ μλ²λ‘ μμ²­μ λ³΄λΌ λ μ λ¬λλ λ°μ΄ν°λ₯Ό λ΄λΉ
- `OutputStream` : μλ²μμ ν΄λΌμ΄μΈνΈμ μλ΅μ λ³΄λΌ λ μ λ¬λλ λ°μ΄ν°λ₯Ό λ΄λΉ
  - μΉ μλ² μμ₯μμ μ΄ν΄!

μ μ²΄μ μΈ νλ¦μ,
- `λΈλΌμ°μ ` μ `WebServerμ RequestHandler` λ `Socket` μ΄λΌλ ν΅λ‘λ‘ ν΅μ νλ€.
- ν΄λΉ ν΅λ‘μ `InputStream` & `OutputStream` μλ¨μ ν΅ν΄ λ°μ΄ν°λ₯Ό μ£Όκ³  λ°λλ€.

> "νλ‘κ·Έλλ° μ€ν μ€ λ°μνλ λ‘κ·Έ λ©μΈμ§λ₯Ό μ£Όμ κΉκ² μ΄ν΄λ³΄λ κ²μ μ’μ μ΅κ΄ μ€ νλμ΄λ€."

### π§ μ€μ΅ μκ΅¬μ¬ν­
**μκ΅¬μ¬ν­ 1 - index.html μλ΅νκΈ°**<br/>
: νμ¬ HTTP μΉ μλ²μ μ μνλ©΄ λ¬΄μ‘°κ±΄ "Hello World" λΌλ λ¬Έκ΅¬λ§ λ¬λ€. μ΄λ₯Ό `http://localhost:8080/index.html` λ‘ μ μνμ λ, `index.html` νμΌμ μλ΅ν  μ μλλ‘ νλ€.

```java
 try (InputStream in = connection.getInputStream(); OutputStream out = connection.getOutputStream()) {
  // TODO μ¬μ©μ μμ²­μ λν μ²λ¦¬λ μ΄ κ³³μ κ΅¬ννλ©΄ λλ€.
  BufferedReader br = new BufferedReader(new InputStreamReader(in));

  String line = br.readLine();
  if (line == null) {return ;}
  String[] tokens = line.split(" ");

  while (!"".equals(line)) {
      line = br.readLine();
  }

  byte[] body = Files.readAllBytes(new File("./webapp" + tokens[1]).toPath());
  // byte[] body = "Hello World".getBytes();

  DataOutputStream dos = new DataOutputStream(out);
  response200Header(dos, body.length);
  responseBody(dos, body);
} catch (IOException e) {
  log.error(e.getMessage());
}
```

- `InputStream` , μ¦ ν΄λΌμ΄μΈνΈκ° λ³΄λ΄λ μμ²­μ ν μ€ λ¨μλ‘ μ½κΈ° μν΄ `BufferedReader` λ₯Ό μ¬μ©νλ€.
- `null` μΈ κ²½μ°λ `return`
- `line` μ **" "** λ¨μλ‘ μλΌ μ μ₯νκ³ , `GET /index.html HTTP/1.1` κ°μ νμμ΄λ―λ‘ `token[1]` μ μμ²­νλ νμΌμ μ λ³΄κ° λ΄κΈ΄λ€.
- ν΄λΉ νμΌ λ°μ΄ν°λ₯Ό `byte[]` λ‘ μ½μ΄ `response` μ μ λ¬νλ€.

**μκ΅¬μ¬ν­ 2 - GET λ°©μμΌλ‘ νμκ°μνκΈ°**<br/>
: νμκ°μ λ©λ΄λ₯Ό ν΄λ¦­νλ©΄ http://localhost:8080/user/form.html λ‘ μ΄λνλ©΄μ νμκ°μμ΄ κ°λ₯νλ€. νμκ°μμ μννλ©΄ λ€μκ³Ό κ°μ ννλ‘ μ¬μ©μ μλ ₯κ°μ΄ μλ²μ μ λ¬λλ€.

```bash
/user/create?userId=javajigi&password=password&name=JaeSung&email=javajigi%40slipp.net
```

HTMLκ³Ό URLμ λΉκ΅νκ³  μ¬μ©μ μλ ₯ κ°μ νμ±ν΄ `model.User` ν΄λμ€μ μ μ₯νλ€.

```java
if (url.startsWith("/user/create")) {
    int index = url.indexOf("?");
    if (index != -1) {
        Map<String, String> map = HttpRequestUtils.parseQueryString(url.substring(index+1));
        User user = new User(map.get("userId"), map.get("password"), map.get("name"), map.get("email"));
        System.out.println(user);
    }
}
```

- URLμ΄ `/user/create` λ‘ μμνλ κ²½μ°, νμκ°μ μμ²­μ΄λ€.
- μΏΌλ¦¬ λ¬Έμμ΄μ (μ΄λ¦, κ°) κ³Ό κ°μ ννλ‘ λΆμνλ `parseQueryString` μ μ΄μ©νμ¬ νλΌλ―Έν°λ‘λΆν° μ¬μ©μ μλ ₯ κ°μ νμ±νλ€.
- νμ±ν κ°μ `User` κ°μ²΄μ λ΄λλ€.
- κ·Έ λ€μμ μ΄λ»κ² ...

**μκ΅¬μ¬ν­ 3 - POST λ°©μμΌλ‘ νμκ°μνκΈ°**<br/>
: http://localhost:8080/user/form.html νμΌμ `form` νκ·Έ λ©μλλ₯Ό **`POST`** λ‘ μμ ν ν νμκ°μμ κ΅¬ννλ€.

```java
else if (tokens[0].equals("POST")) {
    while(!line.equals("")) {
        line = br.readLine();
        if (line.contains("Content-Length")) {
            String[] content = line.split(":");
            contLength = Integer.parseInt(content[1].trim());
        }
    }
    String body = IOUtils.readData(br, contLength);
    Map<String, String> map = HttpRequestUtils.parseQueryString(body);
    User user = new User(map.get("userId"), map.get("password"), map.get("name"), map.get("email"));
    System.out.println(user);
}
```

- `/user/create` λΆκΈ°μμ κ±Έλ¬μ§κ³ , `GET` or `POST` μ΄λ―λ‘ ν λ² λ λΆκΈ°λ₯Ό λλλ€.
- HTTP headerμ body μ¬μ΄μ λΉ κ³΅λ°±μ΄ μ‘΄μ¬νλ€κ³  νμΌλ―λ‘, κ·Έ μ κΉμ§ HTTP μμ²­μ μ½μΌλ©΄μ, `Content-Length` κ°μ νμνλ€.
  - μ΄λ, `Content-Length: 55` μ κ°μ νμμ΄λΌ `content[1]` μ μ²«λ²μ§Έ μλ¦¬μ κ³΅λ°±μ΄ ν¬ν¨λλ―λ‘ `trim()` μ μ΄μ©ν΄ μ΄λ₯Ό μ κ±°νλ€.
- `IOUtils.readData` μ `reader` μ `size` λ₯Ό μ£Όκ³  λ°μ΄ν°λ₯Ό μ½κ³  `GET` κ³Ό λμΌνκ² μ¬μ©μ μλ ₯ κ°μ νμ±νλ€.

**μκ΅¬μ¬ν­ 4 - 302 status code μ μ©**<br/>
: νμκ°μμ μλ£ν ν `/index.html` λ‘ μ΄λνκ³  μΆλ€.

```java
response302Header(dos, "/index.html");

...

private void response302Header(DataOutputStream dos, String url) {
    try {
        dos.writeBytes("HTTP/1.1 302 Redirect \r\n");
        dos.writeBytes("Location: " + url + " \r\n");
        dos.writeBytes("\r\n");
    } catch (IOException e) {
        log.error(e.getMessage());
    }
}
```

- **302** codeλ 3XX Redirection ν΄λμ€μ μνλ HTTP μνμ½λμ΄λ€.
  - ν΄λΌμ΄μΈνΈλ₯Ό μ§μ λ μμΉλ‘ μ΄λμν€κ±°λ μ°Έμ‘°νκ² νλ λ±μ λμμ μννλ€.
  - [μ°Έκ³ 1](https://en.wikipedia.org/wiki/HTTP_302), [μ°Έκ³ 2](https://nsinc.tistory.com/168)

**μκ΅¬μ¬ν­ 5 - λ‘κ·ΈμΈνκΈ°**<br/>
: λ‘κ·ΈμΈ λ©λ΄λ₯Ό ν΄λ¦­νλ©΄ `~/user/login.html` λ‘ μ΄λν΄ λ‘κ·ΈμΈν  μ μλ€. μ±κ³΅νλ©΄ `/index.html` λ‘ μ΄λνκ³ , κ·Έλ μ§ μμΌλ©΄ `/user/login_failed.html` λ‘ μ΄λν΄μΌ νλ€.

μμμ νμκ°μν μ¬μ©μλ‘ λ‘κ·ΈμΈν  μ μμ΄μΌ νλ€. λ‘κ·ΈμΈ μ±κ³΅ μ, μΏ ν€λ₯Ό νμ©ν΄ λ‘κ·ΈμΈ μνλ₯Ό μ μ§ν  μ μμ΄μΌ νλ€. λ‘κ·ΈμΈμ΄ μ±κ³΅ν  κ²½μ° μμ²­ ν€λμ Cookie ν€λ κ°μ΄ `logined=true`, μ€ν¨ν  κ²½μ° `logined=false` λ‘ μ λ¬λμ΄μΌ νλ€.

```java
else if (url.equals("/user/login")) {
    if (tokens[0].equals("POST")) {
        while(!line.equals("")) {
            line = br.readLine();
            log.debug("Header : {}", line);
            if (line.contains("Content-Length")) {
                String[] content = line.split(":");
                contLength= Integer.parseInt(content[1].trim());
            }
        }
        String body = IOUtils.readData(br, contLength);
        Map<String, String> map = HttpRequestUtils.parseQueryString(body);
        User user = DataBase.findUserById(map.get("userId"));
        log.debug("User : {}", user);
        if (user == null) {
            responseFail(dos, "/user/login_failed.html");
            return;
        }
        if (user.getPassword().equals(map.get("password"))) {
            response302Logined(dos);
        } else {
            responseFail(dos, "/user/login_failed.html");
            return;
        }
    }
}

private void response302Logined(DataOutputStream dos) {
    try {
        dos.writeBytes("HTTP/1.1 302 Redirect \r\n");
        dos.writeBytes("Location: /index.html \r\n");
        dos.writeBytes("Set-Cookie: logined=true \r\n");
        dos.writeBytes("\r\n");
    } catch (IOException e) {
        log.error(e.getMessage());
    }
}

private void responseFail(DataOutputStream dos, String url) throws IOException {
    byte[] body = Files.readAllBytes(new File("./webapp" + url).toPath());

    response200Header(dos, body.length);
    responseBody(dos, body);
}
```

- `/user/login` μ **POST**λ₯Ό λ³΄λ΄λ κ²½μ°, HTTP bodyλ₯Ό μ½μ΄ μ¬μ©μ μλ ₯ κ°μ μΆμΆνλ€.
- DBμ μ μ₯λμ΄ μλ κ°κ³Ό λΉκ΅ν ν, κ° κ²½μ°μ λ§κ² responseλ₯Ό μ λ¬νλ€.

**μκ΅¬μ¬ν­ 6 - μ¬μ©μ λͺ©λ‘ μΆλ ₯**<br/>
: μ¬μ©μκ° λ‘κ·ΈμΈ μνμΈ κ²½μ° `http://localhost:8080/user/list` λ‘ μ κ·Όνμ λ μ¬μ©μ λͺ©λ‘μ μΆλ ₯νλ€. λ‘κ·ΈμΈνμ§ μμ μνλΌλ©΄ `login.html` λ‘ μ΄λνλ€.

```java
else if (url.equals("/user/list")) {
    if (tokens[0].equals("GET")) {
        while(!line.equals("")) {
            line = br.readLine();
            log.debug("Header : {}", line);
            if (line.contains("Cookie")) {
                login = isLogin(line);
            }
        }
        if (!login) {
            responseFail(dos, "/user/login.html");
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
    }
}
```

- `Cookie` κ°μ κ°μ Έμ λ‘κ·ΈμΈν μ¬μ©μμΈμ§ νλ¨νλ€.
  - λ‘κ·ΈμΈνμ§ μμ κ²½μ° `login.html` μ μ λ¬νλ€.
  - `Database.findAll()` λ‘ νμκ°μλ λͺ¨λ  μ¬μ©μλ₯Ό κ°μ Έμ¨λ€.
  - `StringBuilder` λ₯Ό μ΄μ©ν΄ μΆλ ₯ν  HTML codeλ₯Ό μμ±νκ³ , μ΄λ₯Ό responseνλ€.

> **Stringμ λΆλ³ κ°μ²΄**μ΄λ€. 2κ°μ String κ°μ²΄κ° μμ λ, λ κ°μ²΄λ₯Ό λνλ μ°μ°μ μλ‘μ΄ Stringμ μμ±νλ€. μ΄ λ, **λ©λͺ¨λ¦¬ ν λΉκ³Ό ν΄μ λ₯Ό λ°μ**μμΌ λνλ μ°μ°μ΄ λ§μμ§μλ‘ μ±λ₯μ μΌλ‘ μ’μ§ μλ€.
> λ°λΌμ, λ¬Έμμ΄μ λν  λ μλ‘μ΄ κ°μ²΄λ₯Ό μμ±νλ κ²μ΄ μλ κΈ°μ‘΄μ λ°μ΄ν°μ λνλ λ°©μμ μ¬μ©νλ **`StringBuilder`** ν΄λμ€κ° μκ²¨λ¬λ€.

**μκ΅¬μ¬ν­ 7 - CSS μ§μνκΈ°**<br/>
: CSS νμΌμ μ§μνλλ‘ κ΅¬ννλ€.

```java
else if (url.endsWith(".css")) {
    byte[] body = Files.readAllBytes(new File("./webapp" + url).toPath());
    response200CssHeader(dos, body.length);
    responseBody(dos, body);
}

...

private void response200CssHeader(DataOutputStream dos, int length) {
    try {
        dos.writeBytes("HTTP/1.1 200 OK \r\n");
        dos.writeBytes("Content-Type: text/css\r\n");
        dos.writeBytes("Content-Length: " + length + "\r\n");
        dos.writeBytes("\r\n");
    } catch (IOException e) {
        log.error(e.getMessage());
    }
}
```

- HTTP μμ²­μ headerμ `./css/style.css` μ κ°μ΄ λ λΌμ€κΈ°μ, `endsWith()` λ©μλλ₯Ό μ¬μ©ν΄ μ΄λ₯Ό μΆμΆνλ€.
- `Content-Type` μ΄ `text/css` λ‘ λ¬λΌμ§ κ²μ νμΈν  μ μλ€.

---

## π© μΆκ° νμ΅ μλ£
### π§ Gitκ³Ό Github
**Git**<br/>
: μ΅κ·Όμ κ°μ₯ λ§μ΄ μ¬μ©νλ λ²μ  κ΄λ¦¬ μμ€ν(Version Control System) μ ν μ’λ₯, VCSμ λν κΈ°λ³Έ κΈ°λ₯μ μ κ³΅νλ λκ΅¬μ΄λ€.

**Github**<br/>
: Gitμ΄ μ κ³΅νλ κΈ°λ₯κ³Ό λλΆμ΄ κ°λ°μλ€μ΄ μ μ©νκ² μ¬μ©ν  μ μλ μΆκ°μ μΈ κΈ°λ₯μ μ κ³΅νλ μΉ μ νλ¦¬μΌμ΄μμ΄λ€.

μ°Έκ³ 
[λΈλμΉ rebase λ±μ λ°°μ°λ μ€μ΅](http://pcottle.github.io/learnGitBranching)
[GUI λκ΅¬](http://www.sourcetreeapp.com)

### π§ λΉλ λκ΅¬ λ©μ΄λΈ
**λΉλ λκ΅¬**<br/>
: νλ‘μ νΈμ κ΄λ ¨ν μ€μ μ κ΄λ¦¬νλ©΄μ μμ€μ½λ(νλ‘λμ, νμ€νΈ)μ λν μ»΄νμΌ, μ»΄νμΌμ μν΄ νμν λΌμ΄λΈλ¬λ¦¬ κ΄λ¦¬, νμ€νΈ, λ°°ν¬λ₯Ό μν ν¨νΉ μμ λ±μ μμμ μλνν  μ μλλ‘ μ§μνλ λκ΅¬
- νλ‘μ νΈ λλ ν λ¦¬ κ΅¬μ‘°μ μμ‘΄μ± λΌμ΄λΈλ¬λ¦¬λ₯Ό κ΄λ¦¬νλ―λ‘, νλ‘μ νΈλ₯Ό ν΅ν© κ°λ° λκ΅¬ νλ‘μ νΈλ‘ λ³ννλ κ²λ κ°λ₯νλ€.
- μΉ μ νλ¦¬μΌμ΄μ κ°λ°μμ λ°μνλ λ¨μ, λ°λ³΅μ μΈ μμμ μλνν  μ μλ€.
- κ°λ¨ν λ°°ν¬ μμκΉμ§ μνν  μ μλ€.

**Maven (λ©μ΄λΈ)κ³Ό Gradle (κ·Έλλ€)**<br/>
**λ©μ΄λΈ**<br/>
: μλ° μ§μμμ λ μ€λ« λμ μ¬μ©ν΄μ¨ λΉλ λκ΅¬λ‘, μ€μ  νμΌμ **XML**λ‘ μμ±νλ€.
- **XML**μ μ¬μ©νκΈ°μ νλ‘μ νΈμ ν¬κΈ°κ° μ»€μ§μλ‘ λ΄μ©μ΄ κΈΈμ΄μ§κ³  κ°λμ±μ΄ λ¨μ΄μ§λ€.

**κ·Έλλ€**<br/>
: μ΅κ·Ό μΈκΈ°λκ° λμμ§λ λΉλ λκ΅¬λ‘, `κ·Έλ£¨λΉ` λΌλ μΈμ΄λ₯Ό κΈ°λ°μΌλ‘ μ€μ  νμΌμ κ΄λ¦¬νμ¬ μ€μ  νμΌμ λν μ μ°μ±λ λκ³ , μ½λ©λλ λ©μ΄λΈμ **XML**μ λΉν΄ μ λ€.
- λΉλ μλκ° λ©μ΄λΈμ λΉν΄ 10~100λ°°κ°λ λΉ λ₯΄λ€.
- κΈΈμ΄μ κ°λμ± μΈ‘λ©΄μμ ν¨μ¨μ μ΄λ€.

λ λΉλ λκ΅¬μ κΈ°λ³Έ κ°λμ λΉμ·ν μ μ΄ λ§μ, νλμ λΉλ λκ΅¬λ§ μ΅νλ©΄ λ€λ₯Έ λΉλ λκ΅¬μ λν νμ΅ λΉμ©λ λ?λ€. 

### π§ λλ²κΉμ μν λ‘κΉ(logging)
κ°λ°μλ λ€μκ³Ό κ°μ λͺ©μ μΌλ‘ μλ§μ λ©μΈμ§λ₯Ό μΆλ ₯νλ€.
- μ νλ¦¬μΌμ΄μμ΄ μ μμ μΌλ‘ λμνλμ§ νμΈνκΈ° μν λͺ©μ 
- μ νλ¦¬μΌμ΄μμ λ¬Έμ κ° λ°μνμ λ μμΈμ νμνκΈ° μν λλ²κΉ λͺ©μ 

μ΄λ, μΉμν `System.out.println()` μΌλ‘ μΆλ ₯νλλ°, μ΄λ **μ νλ¦¬μΌμ΄μμ μ±λ₯μ μ ν**μν€λ μμΈμ΄λ€.
- μ΄λ₯Ό μ΄μ©ν΄ λλ²κΉ λ©μΈμ§λ₯Ό μΆλ ₯νλ©΄ νμΌλ‘ λ©μΈμ§κ° μΆλ ₯νκ² λλλ°, νμΌμ λ©μΈμ§λ₯Ό μΆλ ₯νλ μμμ μλΉν λΉμ©μ΄ λ°μνλ€.

**logging λΌμ΄λΈλ¬λ¦¬**<br/>
μ΄μ κ°μ λ¨μ μ λ³΄μνκΈ° μν΄ **logging λΌμ΄λΈλ¬λ¦¬**κ° λ±μ₯νλ€. μλ° μ§μμμ λ§μ΄ μ¬μ©νλ λ‘κΉ λΌμ΄λΈλ¬λ¦¬λ `Logback` μ΄λ€. 

μλ° μ§μμλ λ§μ λ‘κΉ λΌμ΄λΈλ¬λ¦¬ κ΅¬νμ²΄κ° μ‘΄μ¬νλλ°, λ μ’μ κ΅¬νμ²΄κ° λ±μ₯ν  λλ§λ€ μ μ²΄ μμ€μ½λμμ λ‘κΉ λΌμ΄λΈλ¬λ¦¬ κ΅¬ν λΆλΆμ μμ νλ μ΄λ €μμ΄ μλ€. μ΄λ₯Ό ν΄κ²°νκΈ° μν΄ `SLF4J` λΌλ λΌμ΄λΈλ¬λ¦¬λ₯Ό νμ©ν΄ λ‘κΉ APIμ λν μ°½κ΅¬λ₯Ό μΌμννλ€.
- μ¦, μλ° μμ€μ½λλ `SLF4J` λΌμ΄λΈλ¬λ¦¬λ₯Ό μ¬μ©ν΄ λλ²κΉ λ©μΈμ§λ₯Ό λ¨κΈ°λ©΄ μ€μ λ‘ λλ²κΉ λ©μΈμ§λ₯Ό μΆλ ₯νλ κ΅¬νμ²΄λ `Log4J`, `Logback` μ΄ λ΄λΉνλ λ°©μμ΄λ€.

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

private static final Logger log = LoggerFactory.getLogger(RequestHandler.class);
```

- ν΄λΉ νλ‘μ νΈλ λ‘κΉ κ΅¬νμ²΄λ‘ `Logback` λΌμ΄λΈλ¬λ¦¬λ₯Ό μ¬μ©νλ€. νμ§λ§ μ΄λ₯Ό μ§μ  μ¬μ©νμ§ μκ³  `SLF4J` λ₯Ό importνκ³  μλ€.
- `Logback` λΌμ΄λΈλ¬λ¦¬μ λν κ΅¬νμ²΄λ λ©μ΄λΈ μ€μ  νμΌμΈ `pom.xml` μμ μ€μ νκ³  μλ€.

**λ‘κ·Έ λ λ²¨**<br/>
λ‘κΉ λΌμ΄λΈλ¬λ¦¬λ λ©μΈμ§ μΆλ ₯ μ¬λΆλ₯Ό **λ‘κ·Έ λ λ²¨**μ ν΅ν΄ κ΄λ¦¬νλ€.
- `TRACE` = `log.trace()`, `DEBUG` = `log.debug()`, `INFO` = `log.info()`, `WARN` = `log.warn()`, `ERROR` = `log.error()`
- TRACE < DEBUG < INFO < WARN < ERROR μμΌλ‘ λμμ§λ€.
  - λ λ²¨μ΄ λμ μλ‘ μΆλ ₯λλ λ©μΈμ§λ μ μ΄μ§κ³ , λ?μ μλ‘ λ λ§μ λ‘κΉ λ λ²¨μ΄ μΆλ ₯λλ€.
- κ° λ©μΈμ§μ λν λ‘κ·Έ λ λ²¨μ λ‘κΉ λ©μΈμ§λ₯Ό κ΅¬νν  λ κ²°μ λλ€.

**λ‘κ·Έ λ©μΈμ§ μμ±**<br/>
λ‘κ·Έ λ©μΈμ§ μΆλ ₯ μ λ€μκ³Ό κ°μ λ©μΈμ§ κ΅¬ν λ°©μμ΄ μΌλ°μ μ΄λ€.
```java
log.debug("New Client Connect! Connected IP : " + connection.getInetAddress() + ", Port : " + conneciton.getPort());
```

- νμ§λ§ μμ κ°μ λ°©μμ λ‘κ·Έ λ λ²¨μ΄ `INFO` λ `WARN` μΈ κ²½μ° κ΅³μ΄ ν΄λΉ λ©μλμ μΈμ μ λ¬μ μν΄ λ¬Έμμ΄μ λνλ λΆλΆμ΄ μ€νλ  νμκ° μλ€. (μκΉ μμμ `StringBuilder` λ₯Ό μ¬μ©νλ μ΄μ μ λμΌ)
- `SLF4J` λ μ΄λ¬ν λ¨μ  λ³΄μμ μν΄ λμ μΈ λ©μΈμ§λ₯Ό κ΅¬ννλ λ³λμ λ©μλλ₯Ό μ κ³΅νλ€.

```java
log.debug("New Client Connect! Connected IP : {}, Port : {}", connection.getInetAddress(), conneciton.getPort());
```

- μ λ°©μμΌλ‘ `debug()` λ©μλμμ λ‘κ·Έ λ λ²¨μ λ°λΌ λ©μΈμ§λ₯Ό λν  νμκ° μλμ§μ μ¬λΆλ₯Ό νλ¨νκ² λλ€.

`Logback` μ λ‘κ·Έ λ λ²¨κ³Ό λ©μΈμ§ νμμ λν μ€μ  νμΌμ `logback.xml` μ΄λ©°, μ΄λ₯Ό ν΅ν΄ μΆλ ₯λλ λ‘κ·Έ λ©μΈμ§μ ν¨ν΄μ λ³κ²½ν  μ μλ€.

> Log4j. SLF4J λΌμ΄λΈλ¬λ¦¬λ³ ννλ¦Ώ λν μ‘΄μ¬ν΄, λ¨μ λ°λ³΅μ μΌλ‘ λ°μνλ μ½λλ₯Ό μΆκ°νμ¬ κ°λ° μμ°μ±μ λμ΄λ λ° λμμ΄ λ  μ μλ€.

## π μΆμ²
**μλ° μΉ νλ‘κ·Έλλ° Next Step : νλμ© λ²κ²¨κ°λ μνκ»μ§ νμ΅λ²** - λ°μ¬μ±
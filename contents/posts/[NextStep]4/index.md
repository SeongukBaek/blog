---
title: "📖 4장 HTTP 웹 서버 구현을 통해 HTTP 이해하기"
description: "자바 웹 프로그래밍 책 정리"
date: 2022-01-31
update: 2022-01-31
tags:
  - Java
  - Refactoring
  - Framework
series: "📖 자바 웹 프로그래밍 Next Step"
---

<em>[자바 웹 프로그래밍 Next Step - 박재성]을 읽고 인용하고 정리하는 POST입니다.</em>

> 3장에서 요구사항으로 제시한 내용을 직접 구현하면서 HTTP 프로토콜에 대해 이해하는 장이다.

## 🚩 HTTP 웹 서버 구현
### 🔧 요구사항 1 - index.html 응답하기
이 요구사항을 구현하기 위해서는 먼저 "클라이언트가 서버로 전송하는 데이터의 구성"을 확인해야 한다.

```java
BufferedReader br = new BufferedReader(new InputStreamReader(in, "UTF-8"));
String line = br.readLine();
log.debug("request line: {}", line);

if (line == null) {
    return;
}

while (!line.equals("")) {
    line = br.readLine();
    log.debug("header : {}", line);
}
```

- 요청 데이터를 위와 같이 출력한다.
  - 서버를 동작시키면 `New Client Connect! ... Port : 6217`, `New Client Connect! ... Port : 6218`, `request line : GET /index.html HTTP/1.1`, `header : Host: localhost:8080` ... 등의 정보가 출력되는 것을 확인할 수 있다. 

이를 통해 확인할 수 있는 내용은 다음과 같다.
1. 우선 클라이언트 연결 출력문이 2개다. 이는 2개의 요청이 발생했다는 의미이며 각 요청마다 서로 다른 **Port**로 연결한다.
   - 이때 서버는 각 요청에 대해 순차적 실행이 아닌 **Thread**를 생성하여 각 요청에 동시에 대응한다. (출력문을 확인해보면 `[Thread-0]` or `[Thread-1]` 과 같이 사용하는 Thread의 정보를 확인할 수 있다.)
2. 각 요청의 첫번째 라인은 `GET /index.html HTTP/1.1` 과 같은 형태이다. 
3. 첫번째 라인을 제외한 나머지 요청 데이터는 **"필드 이름: 필드 값"** 형태로 구성된다.
4. 각 요청의 마지막은 **빈 문자열("")**이다.

웹 클라이언트는 웹 서버와 데이터를 주고 받기 위해 `HTTP` 라는 통신 규약을 따른다. 통신 규약은 다음과 같다.
> POST /user/create HTTP/1.1 → **요청 라인**
> HOST: localhost:8080 <br/>
> Connection-Length: 59 <br/>
> Content-Type: application/x-www-form-urlencoded <br/>
> Accept: \*/* → 여기까지가 **요청 헤더** <br/>
> → **헤더와 본문 사이의 빈 공백라인** <br/>
> userId=javajigi@password=password → **요청 본문**

모든 HTTP 요청에 대해 요청 라인, 요청 헤더, 빈 공백 라인은 필수이고, 요청 본문은 필수가 아니다.

**요청 라인 (Request Line)**<br/>
: 요청 데이터의 첫 번째 라인

**"HTTP-메소드 URI HTTP-버전"** 으로 구성되어 있다.
- **HTTP 메소드**는 요청의 종류를 나타낸다.
- **URI**는 클라이언트가 서버에 유일하게 식별할 수 있는 요청 자원의 경로를 의미한다.
  - 일반적으로 URL과 거의 같은 의미
- **HTTP-버전**은 현재 요청의 HTTP 버전이다.

**요청 헤더 (Request Headers)**<br/>
: <필드 이름> : <필드 값> 쌍으로 이루어져 있다. 여러 개의 필드 값을 전달하는 경우 쉼표(,)를 구분자로 전달할 수 있다.

클라이언트의 요청을 받은 서버는 요청에 대한 응답을 한다. HTTP 응답 또한 요청과 같이 **헤더**와 **본문**으로 구성되어 있다. 아래는 응답의 예시이다.

> HTTP/1.1 200 OK → **상태 라인** <br/>
> Content-Type : text/html;charset=utf-8 <br/>
> Content-Length: 20 → 여기까지가 **응답 헤더** <br/>
> → **헤더와 본문 사이의 빈 공백 라인** <br/>
> \<h1>Hello World\</h1> → **응답 본문**

응답 메세지의 첫 번째 라인은 상태 라인(Status), 두 번째 라인부터 빈 공백 문자열 라인까지 응답 헤더(header)이고, 그 다음부터 응답으로 보낼 본문(body) 데이터이다.

> 요청 메세지와 같은 문법이지만, 첫 번째 라인의 형식이 다르다.
 
**상태 라인 (Status Line)**<br/>
**"HTTP-버전 상태코드 응답구문"** 으로 구성되어 있다. 
- **HTTP-버전**은 HTTP 요청 라인(Request line)의 HTTP-버전과 같은 의미이다.
- **상태코드**는 응답에 대한 상태를 의미하는 코드 값으로 200은 "성공"을 의미한다.
  - 상태코드는 이외에도 다양한 상태코드가 있다.
- **응답 구문**은 응답 상태에 대한 설명이다.

이제, 클라이언트가 요청하는 자원이 무엇인지 구분할 필요가 있다. `GET /index.html HTTP/1.1` 에서 `/index.html` 을 분리해 해당 자원을 웹 서버에서 읽은 후 브라우저로 응답을 전송하면 된다.

```java
String[] tokens = line.split("");
...
byte[] body = Files.readAllBytes(new File("./webapp" + tokens[1]).toPath());
```

- 요청 메세지 구조 분석이 끝나면, 요청 URI에 해당하는 자원을 읽어 응답으로 보낸다.
- 분명 `/index.html` 로 요청을 한 번 보냈을 뿐인데 여러 번의 요청이 발생하는 것을 확인할 수 있다.
  - `GET /css/bootstrap.min.css HTTP/1.1`, `GET /css/style.css HTTP/1.1`, `GET /js/jquery-2.2.0.min.js HTTP/1.1` 와 같은 여러 요청에 대한 Thread가 생성되어 처리된다.
- 이렇게 여러 개의 요청이 발생하는 이유는 **"서버가 웹 페이지를 구성하는 모든 자원(HTML, CSS, JS, 이미지 등)을 한 번에 응답으로 보내지 않기 때문"** 이다.
  1. 웹 서버는 `/index.html` 요청에 대한 응답에 HTML만 보낸다.
  2. 응답을 받은 브라우저는 HTML 내용을 분석해 CSS, JS, 이미지 등의 자원이 포함되어 있는지 확인하고, 서버에 해당 자원을 다시 요청한다.
  3. 결과적으로 여러 번의 요청과 응답이 발생하게 된다.

### 🔧 요구사항 2 - GET 방식으로 회원가입하기
회원가입을 할 경우 사용자 입력 데이터가 웹 서버에 전달되어야 한다. 요청 메세지를 분석해보면, 첫 번째 라인에 사용자 입력 데이터가 전달되는 것을 확인할 수 있다.
```bash
GET /user/create?userId=javajigi&password=password&name=jaesung&email=javajigi%40slipp.net HTTP1/1.1
```

- 위와 같이 요청이 보내지는 이유는 `user/form.html` 을 확인해보면 알 수 있다.
  - 요청 라인의 **GET** : `form` 태그에서 사용하는 `method` 가 `get`
  - 요청 **URI** : `form` 태그의 `action` 이 `user/create`

요청 URI을 더 자세하게 살펴보면,
- `"/user/create"` 는 요청 자원의 위치를 나타내는 경로(path)이고, 물음표 뒤에 전달되는 매개변수를 쿼리 스트링(query string)이다.
- 회원가입 기능의 구현을 위해서는 **경로와 쿼리 스트링을 분리**하는 것이 먼저이다.
  - 이를 분리한 후 쿼리 스트링에서 사용자의 입력 값은 **매개변수와 값**으로 분리해 `User` 객체에 저장하는 방식으로 구현해야 한다.
  - 물음표(?)를 기준으로 경로와 쿼리 스트링으로 분리하는 방법은 `split()`, 정규표현식 사용, 물음표가 위치하는 위치 값(index)을 사용하는 방법 등으로 여러 가지가 있다.
  - 예제에서는 물음표가 위치하는 값(index)을 사용하여 쿼리 스트링을 매개변수와 값으로 분리해 `Map<String, String>` 에 저장하고 있다.

**GET 방식의 문제점**<br/>
- 사용자가 입력한 데이터가 브라우저 URL 입력창에 그대로 노출된다.
  - 회원가입을 하는 경우, 비밀번호까지 URL에 노출되기 때문에 보안 측면에서도 좋지 않다. (로그인의 경우도 동일할 듯하다.)
- 요청 라인의 길이에 제한이 있다. 즉, 사용자가 입력할 수 있는 데이터 크기에 제한이 있다.

이러한 문제점을 극복하기 위해 HTTP는 **POST 방식**을 지원한다.

### 🔧 요구사항 3 - POST 방식으로 회원가입하기
요구사항 2에서 사용한 GET 방식의 문제를 해결하기 위해 POST 방식을 사용한다. 이를 위해 `/user/form.html` 의 `form` 태그 `method` 속성을 **post**으로 수정한다.

**POST 방식의 요청 라인**<br/>
: `POST /user/create HTTP/1.1`

요청 URI에 포함되어 있던 **쿼리 스트링이 없어지고, method가 변경**되었다.
- 사라진 쿼리 스트링은 **HTTP 요청의 본문(body)을 통해 전달**된다.
- POST 방식으로 데이터를 전달하면서 헤더에 본문 데이터에 대한 길이가 `Content-Length` 라는 필드 이름으로 전달된다.

**요구 사항 3의 구현**
1. 헤더에 포함되어 있는 `Content-Length` 의 값을 구해 본문의 길이를 구한다.
2. 구한 길이만큼 본문을 읽은 후 본문 데이터를 `Map<String, String>` 형태로 변환한다.
   - `IOUtils.readData()` 를 사용해 본문을 읽고 있다.

HTTP는 사용자의 요청 형태에 따라 여러 개의 메소드를 지원한다. <br/>
웹 애플리케이션 개발 시 자주 사용하는 메소드는 **GET** & **POST**이다. 
- HTTP가 지원하는 메소드는 HEAD, PUT, DELETE, PATCH, TRACE, OPTIONS가 있다.
  - [HTTP 메소드](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)
- HTML에서 GET, POST 메소드만 사용 가능하도록 지원하고 있지만, 최근 REST API 설계와 AJAX 기반 웹 애플리케이션 개발 경향이 생기면서 PUT, DELETE 메소드까지 활용할 것을 추천한다.

HTML의 모든 `<a>` 태그 링크, CSS, JS, 이미지 요청 모두 **GET** 방식으로 요청을 보낸다. **POST** 방식은 `<form>` 태그를 통해 요청을 보낼 수 있다. (`<form>` 태그가 지원하는 method 속성은 **GET**과 **POST** 뿐이다.)
- 나머지 메소드는 서버와의 비동기 통신을 담당하는 **AJAX**에서 사용할 수 있다.

> **GET과 POST를 사용하는 기준**<br/>
> 웹 애플리케이션 개발 시 HTTP method를 사용하는 기준이 필요하다. 
> - **GET**은 서버에 존재하는 데이터(또는 자원)을 가져오는 것이다.
> - **POST**는 서버에 요청을 보내 데이터 추가, 수정, 삭제와 같은 작업을 실행하도록 하는 것이다.
> 
> **GET**은 서버에 존재하는 데이터를 조회하는 역할만 하는 것이지 **데이터의 상태를 변경하지 않는다.** 
> 하지만 **POST**는 **데이터의 상태를 변경하는 작업을 담당**한다.

### 🔧 요구사항 4 - 302 status code 적용
회원가입을 완료한 후 사용자에게 첫 화면(`/index.html`)을 보여주고 싶다. 이를 위해 회원가입 요청(`/user/create`)을 완료한 후 요청 URL 값을 `"/index.html"` 로 변경하면 웹 서버는 `/index.html` 파일을 읽어 응답으로 전달한다.

```java
String url = tokens[1];
if ("/user/create".equals(url)) {
  ...
  log.debug("User: {}", user);
  url = "/index.html";
}
```

이 구현 방식에는 문제점이 하나 있다. 
-  브라우저에서 **새로고침**하면, 보이는 화면은 `index.html` 이지만, 앞에서 요청한 회원가입 양식이 재전송되는 것을 확인할 수 있다.
-  이러한 요청이 재발생하는 이유는 **브라우저가 이전 요청 정보를 유지**하고 있기 때문이다.
   -  **새로고침하면 유지하고 있던 요청을 다시 요청하는 방식으로 동작**하기 때문이다.
-  이전 요청 정보를 확인하기 위해 브라우저의 URL을 확인하면, 회원가입 완료 후 브라우저 URL은 `/user/create` 이고 보고 있는 화면은 `/index.html` 의 결과 화면이다.
   -  이 상태에서 새로고침하면 `/index.html` 화면을 보여주기 전에 회원가입 처리를 한 후 `/index.html` 을 응답으로 전송한다.
   -  즉, **데이터가 증복으로 전송**된다!

이러한 문제를 해결하기 위해서는,
- 회원가입을 처리하는 `/user/create` 요청과 첫 화면(`/index.html`)을 보여주는 요청을 분리한다.
- **HTTP의 302 상태 코드**를 활용한다.

```bash
HTTP/1.1 302 Found
Location: /index.html
```

- 위와 같은 응답으로, 클라이언트는 첫 라인의 상태 코드를 확인한 후 **302**라면 `Location` 의 값을 읽어 서버에 재요청을 보낸다.
- 클라이언트의 요청은 회원가입 처리를 위한 `/user/create` 요청이 아닌 `/index.html` 요청으로 변경된다.
- 브라우저 URL도 변경된 것을 확인할 수 있다. (눈으로 확인은 어려움)

**클라이언트와 서버 사이의 요청과 응답 흐름**<br/>
**302 상태 코드를 사용하기 전**
1. 회원가입 요청
2. 회원가입 처리 완료
3. `index.html` 파일 읽기
4. `/index.html 200` 응답

→ **클라이언트와 서버 간의 요청과 응답이 한 번만 발생**한다.

**302 상태 코드를 사용한 후**
1. 회원가입 요청
2. 회원가입 처리
3. `/index.html 302` 응답
4. `/index.html` 요청
5. `/index.html` 파일 읽기
6. `/index.html 200` 응답

→ **클라이언트와 서버 간의 요청과 응답이 두 번 발생**한다.

**대표적인 상태 코드**<br/>
- 2XX : **성공**, 클라이언트가 요청한 동작을 수신하여 이해했고 승낙했으며 성공적으로 처리
- 3XX : **리다이렉션**, 클라이언트는 요청을 마치기 위해 추가 동작을 수행해야 함
- 4XX : **요청 오류**, 클라이언트의 요청에 오류가 있음
- 5XX : **서버 오류**, 서버가 유효한 요청을 정상적으로 수행하지 못함

### 🔧 요구사항 5 - 로그인하기
"HTTP는 요청을 보내고 응답을 받으면 클라이언트와 서버 간의 연결을 끊는다."

이와 같이 클라이언트와 서버 간의 연결을 끊기 때문에 각 요청 사이에 상태를 공유할 수 없어 **무상태 프로토콜**이라고 한다. 이러한 특성으로 인해 서버는 클라이언트가 누구인지 식별할 방법이 없다는 문제가 발생한다.

로그인과 같이 클라이언트의 행위를 기억하기 위한 무언가가 필요한데, HTTP는 이 목적으로 **쿠키(Cookie)**를 지원한다.
- 서버에서 로그인 요청을 받으면 로그인 성공/실패 여부에 따라 응답 헤더에 `Set-Cookie` 로 결과 값을 저장한다.
- 클라이언트는 응답 헤더에 `Set-Cookie` 가 존재할 경우 이 값을 읽어 서버에 보내는 요청 헤더의 **Cookie 값**으로 다시 전송한다.

**즉, HTTP는 헤더를 통해 공유할 데이터를 매번 다시 전송하는 방식으로 각 요청 간의 데이터(상태)를 공유한다.**

- 로그인 기능의 구현을 위해서는 회원가입한 사용자를 DB에 저장하고 있어야 한다. 
- 로그인이 성공하면 응답 헤더에 `Set-Cookie` 헤더의 값으로 `logined=true` 를 전달한다.
- 로그인이 성공한 이후부터의 요청 헤더를 보면, `Cookie: logined=true` 가 추가되어 전달되는 것을 확인할 수 있다.

이와 같이 모든 요청에 로그인 성공 유무에 대한 정보가 전달되어, 서버가 클라이언트의 상태를 파악할 수 있다.

> **모든 요청에 전달된다**는 특성으로, **쿠키의 크기가 커질수록 서버 트래픽에 부하가 가해질 수 있다**는 단점 또한 존재한다.

### 🔧 요구사항 6 - 사용자 목록 출력
**Cookie 헤더 값**을 활용해 현재 요청을 보낸 사용자가 로그인한 사용자인지를 판단해야 한다.
- 로그인을 정상적으로 수행한 사용자라면, 앞의 구현을 통해 `Cookie` 에 `logined=true` 가 저장되어 있을 것이다.
- `/user/list` 로 요청이 들어온 경우, 요청 헤더를 확인하여 `Cookie` 값이 존재하는지, 그리고 `logined=true` 인지를 확인하여 로그인 유무를 판단한다.
- 로그인하지 않은 사용자라면 `/user/login.html` 로 보낸다.

> 서버가 전달하는 쿠키 정보는 **클라이언트에 저장해 관리**한다. 이로 인해 **보안 이슈**가 존재한다.
> 이러한 단점을 보완하기 위해 **세션**이 등장했다. 이 또한 쿠키를 기반으로 하지만 보안 강화를 위해 **상태 데이터를 서버에 저장**한다.

### 🔧 요구사항 7 - CSS 지원하기
서비스한 HTML 소스코드를 보면,
- `<link>` 태그에 CSS 파일도 정상적으로 설정
- 물리적인 CSS 파일도 해당 위치에 존재
- CSS 파일에 대한 요청도 정상

하지만 CSS 파일이 적용되지 않고 있다.

이는 브라우저는 응답을 받은 후 `Content-Type` 헤더 값을 통해 응답 본문에 포함되어 있는 컨텐츠의 유형을 판단한다. 하지만 현재 응답을 보낼 때, 모든 컨텐츠의 타입을 `text/html` 로 보내기 때문에 브라우저는 CSS 파일도 HTML로 판단하여 정상적으로 적용되지 않았다.

문제 해결을 위해, CSS 파일 요청 시, `Content-Type` 헤더 값을 `text/css` 로 수정한 응답을 보내야 한다.
- 요청 URL의 확장자가 `css` 인 경우 `text/css` 응답을 보내도록 구현한다.

```java
else if (url.endsWith(".css")) {
  byte[] body = Files.readAllBytes(new File("./webapp" + url).toPath());
  response200CssHeader(dos, body.length);
  responseBody(dos, body);
}

...

private void response200CssHeader(DataOutputStream dos, int lengthOfBodyContent) {
  try {
    dos.writeBytes("HTTP/1.1 200 OK \r\n");
    dos.writeBytes("Content-Type: text/css\r\n");
    dos.writeBytes("Content-Length: " + lengthOfBodyContent + "\r\n");
    dos.writeBytes("\r\n");
  } catch (IOException e) {
    log.error(e.getMessage());
  }
}
```

각 요청과 응답 헤더는 각 요청과 응답이 포함하고 있는 본문 컨텐츠에 대한 정보를 제공한다. 이러한 헤더 정보들을 **메타데이터**라고 한다.
예로, `Content-Type` , `Content-Length` 헤더 정보는 실제 데이터가 아닌 본문 컨텐츠에 대한 타입과 길이 정보를 포함한다.

## 📕 출처
**자바 웹 프로그래밍 Next Step : 하나씩 벗겨가는 양파껍질 학습법** - 박재성
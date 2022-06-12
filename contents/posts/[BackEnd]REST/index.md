---
title: "💻 REST"
description: "백엔드 지식"
date: 2022-02-19
update: 2022-02-19
tags:
  - REST
  - RESTful
  - RESTAPI
series: "💻 BackEnd"
---

<em>REST의 개념에 대해서 정리하는 POST입니다.</em>

### 🔧 REST
#### ⚙️ REST의 정의
: "Representational State Transfer"의 약자로, 자원을 이름으로 구분하여 자원의 상태정보를 주고 받는 모든 것을 의미한다.

- HTTP URI를 통해 자원을 명시하고,
- HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원(URI)에 대한 CRUD를 적용하는 것이다.

#### 🔩 구성 요소
- 자원 : HTTP URI의 형태
- 자원에 대한 행위 : HTTP Method
- 자원에 대한 행위의 내용 : HTTP Message payload

#### 🔑 특징
1. Server-Client(서버-클라이언트 구조)
: REST 서버는 API 제공, 클라이언트는 사용자 인증이나 Context(session, 로그인 정보) 등을 직접 관리하는 구조로, 각각의 역할이 확실히 구분되기 때문에 클라이언트와 서버에서 개발해야 할 내용이 명확해지고 서로 간 의존성이 줄어들게 된다.

2. Stateless(무상태)
: REST는 상태를 가지지 않는다. 즉 작업을 위한 상태정보를 저장하거나 관리하지 않는다. 위에서 설명했듯, 서버는 session 정보나 쿠키 정보를 별도로 저장하고 관리하지 않기에 단순히 들어오는 요청만을 처리하는 구조이다. 따라서 서비스의 자유도가 높아지고 서버에서의 구현이 단순해진다.

3. Cacheable(캐시 처리 가능)
: HTTP라는 기존 웹 표준을 그대로 사용하기에, 웹에서 사용하는 기존 인프라를 그대로 활용할 수 있다. 즉, HTTP가 가진 캐싱 기능을 적용할 수 있다. (`Last-Modified` or `E-Tag` 사용)

4. Layered System(계층화)
: REST 서버는 다중 계층으로 구성될 수 있으며, 보안, load balancing, 암호화 계층을 추가해 유연성을 둘 수 있다. 또한 PROXY, Gateway 같은 네트워크 기반의 중간 매체를 사용할 수 있게 한다.

5. Uniform Interface(인터페이스 일관성)
: 위에서 언급했듯, HTTP 표준을 따르기에 특정 언어나 기술에 종속되지 않고 모든 플랫폼에 사용할 수 있으며, URI로 지정한 자원에 대한 조작이 가능하다.

#### 🔒 장단점
##### 장점
- HTTP 인프라를 그대로 사용하므로 REST API 사용을 위한 별도 인프라 구축이 필요하지 않다.
  - 또한, HTTP 표준을 최대한 활용하여 여러 추가 장점을 가진다.
- HTTP 표준을 따르는 모든 플랫폼에서 사용 가능하다. (Uniform Interface)
- Hypermedia API 내에서, 범용성을 보장한다.
  - > **Hypermedia API**
    > : 다른 말로 HATEOAS(Hypermedia As The Engine Of Application State)로, hypermedia를 application의 상태를 관리하기 위한 매커니즘으로 사용한다는 개념이다. REST API 구현의 마지막 단계로, API 관리에 어려움이 있다면 도입을 고려해볼만하다.
- REST API 메세지가 의도하는 바를 명확하게 나타내기에 의도를 파악하기 쉽다.
- 서버와 클라이언트의 역할을 명확하게 분리한다.

##### 단점
- 표준이 존재하지 않아 정의가 필요하고 관리가 쉽지 않다.
- 사용할 수 있는 메소드가 4가지뿐이다. (HTTP 메소드가 제한적)
- 안티패턴으로 설계될 가능성이 있다.
  - > **안티패턴**
    > : 표준이 없기에 REST API이 특징을 이해하지 못하고 어긋나는 패턴
    > HTTP 메소드의 잘못된 사용, HTTP Response code의 제한적 활용이 원인이 될 수 있다.

---

### 🔨 REST API
#### 🧭 REST API의 정의
: REST를 기반으로 만들어진 API

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--YTDTEgpk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/ekawmj3rafdtn06hzj79.png" width="70%">

#### 🔦 특징
- REST 기반으로 시스템을 분산해 확장성과 재사용성을 높여 유지보수 및 운용이 편리해진다.
- HTTP 표준을 기반으로 구현해, HTTP를 지원하는 프로그램 언어로 클라이언트와 서버를 구현할 수 있다.

#### 🕯 설계
##### 기본 규칙
1. URI는 정보의 자원을 표현한다.
2. 자원에 대한 행위는 HTTP 메소드로 표현한다.

##### 예시
|CRUD|HTTP 메소드|Route|
|:---:|:---:|:---:|
|자원들의 목록을 표시|GET|`/resource` |
|자원 하나의 내용을 표시|GET|`/resource/:id` |
|자원 생성|POST|`/resource` |
|자원 수정|PUT|`/resource/:id` |
|자원 삭제|DELETE|`/resource/:id` |

---

### ⛏ RESTful
#### 💳 RESTful의 정의
: 일반적으로 REST라는 아키텍처를 구현하는 웹 서비스 (REST API를 제공하는 웹 서비스)
- RESTful한 API를 구현하는 근본적인 목적은 성능 향상이 아닌 일관적인 컨벤션을 통한 API의 이해도 및 호환성을 높이는 것이다. 따라서 성능이 중요한 경우 굳이 이를 구현할 필요는 없다.

#### 💣 RESTful하지 못한 경우
- CRUD 기능을 모두 POST로만 처리하는 경우, 즉 HTTP 메소드를 모두 활용하지 않는 경우
- Route에 resource, id 외의 정보가 들어가는 경우(ex. `/students/updateName`)

### 📕 참고
- [REST란? REST API란? RESTful이란?](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)
- [REST API란? REST, RESTful이란?](https://khj93.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-REST-API%EB%9E%80-REST-RESTful%EC%9D%B4%EB%9E%80)
- [REST](http://www.incodom.kr/REST)
- [REST API의 단점 3가지](https://round-round.tistory.com/entry/REST-API%EC%9D%98-%EB%8B%A8%EC%A0%90-3%EA%B0%80%EC%A7%80)
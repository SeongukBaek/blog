---
title: "📡 Application Layer"
description: "개발 상식"
date: 2022-06-11
update: 2022-06-11
tags:
  - Network
  - OSI
  - Application
series: "📡 Network"
---

> **OSI 7 계층은 왜 나누는 것일까?**
> - OSI 7계층은 네트워크 통신을 구성하는 요소를 7개의 계층으로 표준화한 것으로, 이를 통해 통신이 일어나는 과정을 단계별로 파악할 수 있고, 문제 발생 시 해당 문제를 파악하고 해결하기 용이해진다.

> **OSI 7계층과 TCP/IP 5계층**
> - OSI 7계층 중 `Presentation` & `Session` 계층은 TCP/IP의 `Application` 계층에 속한다.
> - OSI 7계층이 표준이 되기는 하지만, 실질적인 통신은 TCP/IP 5계층을 사용한다!

## 🧷 Application Layer
TCP/IP 네트워크 프로토콜 스택에서 가장 상위 계층을 담당하고 있다. 이름대로, **여러 End System에게 여러 서비스를 제공하거나 받는 부분**을 책임진다. **응용 계층**이라고도 한다.

> **"이메일, 웹 서핑 등과 같은 서비스를 제공하고 받기 위해 어떤 형식으로 메시지를 주고 받아야 하는지의 프로토콜들이 정의되어 있는 계층"**

### 🪚 구조
대부분의 응용 계층들은 **"Client - Server" 구조**로 이루어져 있다.
- **Client**는 서비스를 제공받는 호스트를 의미한다.
  - `Dynamic IP 주소` 를 가질 수 있으며, Client끼리는 직접 통신이 불가능하다.
- **Server**는 서비스를 제공해주는 호스트를 의미한다.
  - `always-on host` 로, Client의 요청을 대기한다.
  - `Permanent IP 주소` 를 가져야 한다. (항상 할당되어있어야 함)

"Client - Server" 구조 외에, **P2P 구조**도 있다. 이는 임의의 `End System` 끼리 통신하는 방식이다.
- Client, Server의 구분이 없다.
- Peer는 다른 Peer에게 서비스를 요청한다.
- `No always-on Server`
- P2P File sharing이 이 방식을 이용한다.

### 🪚 Process Communicating
프로그램과 프로그램 간의 통신은 사실 해당 프로그램들의 **프로세스의 통신**이다.
- 같은 호스트에서 두 프로세스는 **IPC(Inter-process Communication) 방식**을 이용하여 통신이 가능하다.
- 서로 다른 호스트에서는 **message**를 통해 통신이 가능하다.
  - 여기서도 Client, Server를 구분할 수 있는데,
    - Client process: Communication 시작
    - Server process: Client의 요청 대기

### 🪚 Sockets
TCP/IP 프로토콜 스택에서는 총 5개의 계층이 존재하고, 이들간의 패킷(데이터) 송수신이 이뤄진다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbQz6ga%2FbtqT02qo7Z6%2FqYgs2gKVdUP6yEkzWhw7mk%2Fimg.png" width="80%">

Application 계층을 제외한 **나머지 4계층은 모두 OS에 구현**되어 있다.
- 개발자에겐 보여지지 않는 부분이고, 내부적으로 알아서 패킷을 생성하고 주고 받는다.
- 그렇다면, Application 계층과 나머지 4계층의 제일 윗단인 Transport 계층은 어떻게 메세지를 주고 받을 수 있을까?

이때, **Socket**이라는 일종의 통로를 사용한다. 
- 이는 Application 계층과 Transport 계층 사이에 위치하여 Application 계층의 process에게 **Socket API나 함수를 제공**하여 메세지를 송수신할 수 있도록 돕는다.

### 🪚 Addressing Processes
메세지를 주고 받는 방법은 알았다. 하지만, 여러 Program이 있고, 그만큼 여러 Process가 존재할텐데, 어떤 Process가 메세지를 보냈는지 알아야 한다.
- 이를 위해서는 Process를 식별할 수 있는 **식별자**가 필요하다.
- 그리고 하나의 호스트에는 많은 process가 동작 가능하기에, **IP 주소만으로는 식별이 불가능**하다.

따라서 **IP 주소 + Port #**을 식별자로서 사용한다.
- Port #은 아래와 같이 대표적으로 사용되는 예가 있다.
  - Http server: 80
  - Mail server: 25
  - Well Known Port #: 0 ~ 1024

### 🪚 Application Layer Protocol Defines
응용 계층 프로토콜의 규정이다. 아래에 대한 규정이 있어야 한다.

1. Types of message exchange
: message는 **요청** 또는 **응답**일 수 있다. (request or response)

2. Message Syntax
: message의 어느 field가 어떻게 기술되어야 하고, 각각의 field는 어떻게 구분되는지에 대한 정보

3. Message Semantics
: 각 field에 담긴 정보의 의미

4. Rules
: 언제, 어떻게 process들이 요청하고 응답해야 하는지에 대한 정보

### 🪚 Transport Layer가 제공하는 Service
응용 계층은 전송 계층과 통신한다. 전송 계층은 2가지 종류의 서비스를 제공할 수 있는데, 아래와 같다.
- **Reliable한 Service**
  - 데이터의 Write와 Read가 동일하게 발생하여 Sync가 맞다.
  - ex. File transfer
- **Unreliable한 Service**
  - 데이터를 바로바로 전송하여 딜레이가 적다.
  - ex. Audio

### 🪚 Application Layer Protocols
인터넷은 응용 계층에 2개의 전송 프로토콜을 제공한다. TCP(Transmission Control Protocol)과 UDP(User Datagram Protocol)이다.
- 이는 응용 계층이 아니라 전송 계층의 프로토콜이다!

### 🪚 TCP
Transmission Control Protocol, 이름 그대로 전송을 제어하는 프로토콜이라고 생각할 수 있다.
- **Reliable**하다.
- `3-way handshake` 를 통해 초기 연결을 설정한다.
- **Flow control(흐름 제어)**: 수신측의 상태를 확인하면서 전송을 이어간다.
  - 수신 데이터를 담는 `Buffer` 는 유한한 자원이므로, **Overflow**가 발생할 수 있다.
  - 따라서 수신측의 `Buffer` 가 수용 가능한 만큼을 전송한다.
- **Congesting control(혼잡 제어)**: 네트워크 상태를 확인하면서 전송을 이어간다.
  - 네트워크가 혼잡하다면, 보내는 패킷 양을 제어하여 전송한다.
- Timing, Security, Minimum Throughput guarantee를 제공하지 않는다.
- **Connection-Oriented**: 물리적 연결이 아닌 논리적 연결로, **순서에 맞게 손실 없이 데이터를 전송**한다.

모든 TCP 연결은 `Full-duplex`, `Point to Point` 방식이다.
- `Full-duplex` 는 전송이 양방향으로 동시에 일어날 수 있음을 의미하고,
- `Point to Point` 는 각 연결이 정확히 2개의 목적 포인트를 가짐을 의미한다.
  - 따라서 **TCP는 멀티캐스팅이나 브로드캐스팅을 지원하지 않는다.**

> 인터넷은 기본적으로 **Best-Effort Service**로, 신뢰성을 보장하지 않는다.

### 🪚 UDP
User Datagram Protocol
- **Unreliable**하다.
  - Network 계층의 data를 응용 계층으로 바로 전달하기에 매우 단순한 구조이다.
- **Connection-Less** (비연결형 프로토콜)
- IP 데이터그램을 **캡슐화**하여 보내는 방법과, **연결 설정 없이** 보내는 방법을 제공한다.
- **빠른 데이터 처리**를 요구하는 경우 사용할 수 있다.
- TCP에서 필요했던 초기 연결 설정 메세지보다 적은 메세지를 요구한다.

---

## 🧷 HTTP
HTTP (Hyper Text Transfer Protocol)
: 웹의 응용 계층 프로토콜이다.

- 이는 클라이언트 프로그램과 서버 프로그램으로 구현된다.
- 서로 다른 end system에서 수행되는 클라이언트와 서버 프로그램은 **HTTP 메세지를 통해 통신**한다.
  - 기본적으로, 클라이언트는 **어떠한 자원(object)을 요청**하고, 서버는 이를 찾아 **응답**하는 형태이다.
- 그리고 이는 신뢰성을 필요로 하므로, **TCP 프로토콜을 사용**한다.
  - 통신은 "연결 초기화(클라이언트) -> 연결 수락(서버) -> HTTP 메세지 교환 -> 연결 종료"
- HTTP는 **State-less**하다. 따라서, 과거 정보에 대한 관리를 하지 않는다.

이러한 HTTP 연결에는 **두 가지 타입**이 존재하는데, 아래와 같다.

**Non-persistent HTTP**
- 이름 그대로, 영구적이지 않다. 
- 여러 객체의 교환을 위해서는 여러 개의 연결을 필요로 한다. (일회성 연결을 여러 번 사용)

**Persistent HTTP**
- 동일한 서버와 여러 번 통신하는 경우, 불필요하게 일회성 연결을 반복하는 것을 막고자 한다.
- 연결 하나를 고정적으로 열어두고 사용한다.

HTTP 프로토콜을 사용한 통신의 `response time` 을 구하기 위해 간단한 `Non-persistent HTTP` 에 대한 예제를 살펴본다.

<img src="https://velog.velcdn.com/images%2Fkms9887%2Fpost%2F2d2d7518-b78c-47d2-89ec-00b9805aa03d%2Fimage.png" width="50%">

- RTT(Round Trip Time): 클라이언트와 서버 간 패킷이 갔다 오는데 걸리는 시간
- 그림에서 볼 수 있듯, 연결을 초기화하고, 자원 요청한 후 이를 받는데 걸리는 시간은 **2RTT + file transmission rate**이다.

### 🪚 HTTP methods
HTTP는 요청 메소드를 정의하여 주어진 자원에 수행하길 원하는 행동을 나타낸다. 주요 메소드는 아래와 같다.

**GET**
: 특정 자원의 표시를 요청한다. 이를 사용하는 요청은 오직 데이터를 받기만 한다.

**HEAD**
: GET 요청과 동일한 응답을 요청하지만, 응답 본문을 포함하지 않는다.

**POST**
: 특정 자원에 객체(엔티티)를 제출할 때 사용된다. 이는 서버의 상태 변화를 일으킬 수 있다.

**PUT**
: 요청 payload를 사용해 새로운 자원을 생성하거나, 기존의 자원을 수정하는 데 사용된다.

**PATCH**
: PUT은 자원 자체의 교체를 요구하지만, PATCH는 자원의 부분적인 수정만을 요청할 때 사용된다.

### 🪚 GET & POST?
두 메소드 모두 서버에 무엇인가를 요청할 때 사용하는 메소드이다. 하지만 HTTP 메소드의 목적은 특정 자원에 수행하길 원하는 행동을 명시하는 것이므로, 혼용되어서는 안된다. 따라서 두 메소드의 차이점을 알아본다.

**GET**
- 요청하는 데이터가 `HTTP Request Message` 의 `Header` 부분에 담겨서 전송된다. 
  - 때문에 `url` 상에서 `?` 뒤에 데이터가 붙어 요청을 보내게 되는 것이다. 
  - 이러한 방식은 `url` 에 요청하는 데이터가 담겨가기 때문에 **전송할 수 있는 데이터의 크기가 제한적**이다. 
  - 또한 **보안**이 필요한 데이터에 대해서는 데이터가 **그대로 노출되므로 적절하지 않다.** (ex. 비밀번호)
- GET 요청은 캐싱될 수 있고, 브라우저 히스토리에 남는다.
- 아스키 코드만 전송할 수 있다.

**POST**
- 요청하는 데이터가 `HTTP Request Message` 의 `Body` 부분에 담겨서 전송된다.
  - **전송할 수 있는 데이터의 크기가 GET 방식보다 크고, 보안면에서 조금 더 낫다.** (하지만 암호화를 하지 않는다면, 언제든 노출될 수 있다.)
- POST 요청은 캐싱될 수 없고, 브라우저 히스토리에 남지 않는다.
- 데이터 타입에 구애받지 않는다. **이진 데이터 또한 가능**하다.

GET은 **데이터를 가져와서 보여주는 용도**로 사용한다. 즉, **서버에 어떤 변경사항을 발생시키지 않는다.** 하지만 POST는 **서버의 값이나 상태를 변경하기 위해 사용**한다.

또한, GET 요청은 캐싱될 수 있다고 했다. 그러므로, 기존에 캐싱되었던 데이터가 또다시 응답될 가능성이 있다. POST 방식으로 요청해야 할 데이터를 크기가 작다는 이유로 GET 방식으로 요청한다면, 목적에 맞지 않는 응답을 받을 가능성이 있다!

### 🪚 HTTP response status code
HTTP 응답 상태 코드는 특정 HTTP 요청(위에서 다룬 요청들)이 성공적으로 완료되었는지, 혹은 어떠한 문제가 발생했는지 알려준다. 응답은 총 5개의 그룹으로 나눠진다.
- 정보를 제공하는 응답(1xx)
- 성공적인 응답(2xx)
- 리다이렉트(3xx)
- 클라이언트 에러(4xx)
- 서버 에러(5xx)

그리고 흔하게 볼 수 있는 코드는 다음과 같다.

**200**: 요청이 성공적으로 처리되었다. 그리고 이 성공이라는 의미는 HTTP 메소드에 따라 다르다.
- GET: 자원을 불러와서 message body에 전송되었다.
- HEAD: header가 message body에 있다.
- PUT or POST: 수행 결과에 대한 자원이 message body에 전송되었다.

**400**: 이 응답은 잘못된 문법으로 인해 서버가 요청을 이해할 수 없음을 의미한다.

**401**: 비인증을 의미한다. 클라이언트는 요청한 응답을 받기 위해 스스로를 인증해야 한다.

**404**: 서버는 요청받은 자원을 찾을 수 없다. 
- 서버들은 비인증 클라이언트로부터 자원을 숨기기 위해 이 응답을 403 대신에 전송할 수도 있다.

**418**: 서버는 커피를 찻 주전자에 끓이는 것을 거절한다.

**500**: Internal Server Error, 서버가 처리 방법을 모르는 상황이 발생했음을 의미한다.
- 서버 개발자라면 가장 많이 볼 수 있을 코드이다...

---

## 🧷 HTTP/2
이전까지 언급한 HTTP/1.1은 Persistent HTTP로, TCP 통신 1개당 요청 1개를 고정적으로 처리해야 하는 구조였다.
- 하지만 여러 요청이 있고, 제일 먼저 처리되는 요청의 요청량이 매우 많은 경우, 뒤의 요청들은 대기해야 한다.
  - 이를 **Head-Of-Line Blocking 문제**라 한다. 그리고 이는 HTTP/2에서 해결하고 있다.

### 🪚 HTTP/2: HOL blocking 해결
<img src="../../images/Network/HOLblocking.jpeg" width="80%">

요청에 대한 응답을 **frame이라는 단위로 쪼개어 전송**한다.
- 위 그림에서, 비교적 요청량이 적은 O2, O3, O4의 응답 속도는 빨라지고, O1은 비교적 느리게 응답받을 것이다.

---

## 🧷 HTTP/3
HTTP/2는 HOL blocking 문제를 해결한 듯하다. 하지만, TCP 프로토콜을 사용하는 이상, TCP 패킷이 네트워크 경로상에서 손실된다면 입력 스트림에 공백이 생겨 그 다음에 오는 데이터(바이트)도 **재전송**으로 인해 지연이 발생한다. (TCP는 전송 제어 프로토콜이므로, 재전송을 수행)
- 특히, HTTP/2는 **여러 개의 HTTP 스트림을 하나의 TCP 연결로 처리**하기에 손실에 대해 더 크게 영향을 받는다.

따라서, HTTP/3가 등장하게 되었고, 이는 TCP가 아닌 **UDP를 사용**한다.
- 정확하게는 **QUIC**라는 프로토콜 위에서 돌아가는 HTTP이다.
  - QUIC(Quick UDP Internet Connection)

TCP는 3-way-handshake, 연결 종료 시 사용하는 4-way-handshake 등 오버헤드와 HOL blocking 문제를 피할 수 없다. 하지만 **QUIC는 TCP handshake 과정을 최적화하는 것에 초점을 맞춰 설계**되었다.
- 기본적으로 UDP는 데이터그램 방식을 사용하기에 각 패킷 간의 순서가 존재하지 않는 **독립적인 패킷**이다.

아래는 각 HTTP 버전에 대한 간략한 그림이다.

<img src="../../images/Network/HTTP1,2,3.jpeg" width="80%">

---

## 🧷 HTTP & HTTPS
### 🪚 HTTP의 문제점
- HTTP는 평문 통신이므로 도청이 가능하다.
- 통신 상대를 확인하지 않아 위장이 가능하다.
- 완전성을 증명할 수 없어 변조가 가능하다.

> 위의 문제들은 암호화를 사용하지 않는 모든 프로토콜에도 적용되는 문제점이다.

각 문제점을 하나하나 살펴보면,

**TCP/IP는 도청 가능한 네트워크다.**

**통신 상대를 확인하지 않아 위장이 가능하다.**

**완전성을 증명할 수 없어 변조가 가능하다.**

### 🪚 HTTPS
이는 HTTP에 암호화와 인증, 그리고 완전성 보호를 더한 것이다.

---

## 📕 참고
- [OSI 7 Layer vs TCP/IP 5 Layer](https://velog.io/@osk3856/TCP-Updated-Model)
- [Application Layer 개요](https://ddongwon.tistory.com/71)
- [Part 1-3 Network](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/Network)
- [HTTP 요청 메서드](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)
- [HTTP 2, HTTP 3](https://woojinger.tistory.com/85)
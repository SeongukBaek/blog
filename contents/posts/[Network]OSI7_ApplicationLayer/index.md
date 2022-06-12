---
title: "📡 [OSI 7계층] Application Layer"
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
Transmission Control Protocol, 이름 그대로 전송을 통제하는 프로토콜이라고 생각할 수 있다.
- Reliable하다.
- **Flow control(흐름 제어)**: 수신측의 상태를 확인하면서 전송을 이어간다.
  - 수신 데이터를 담는 `Buffer` 는 유한한 자원이므로, **Overflow**가 발생할 수 있다.
  - 따라서 수신측의 `Buffer` 가 수용 가능한 만큼을 전송한다.
- **Congesting control(혼잡 제어)**: 네트워크 상태를 확인하면서 전송을 이어간다.
  - 네트워크가 혼잡하다면, 보내는 패킷 양을 제어하여 전송한다.
- Timing, Security, Minimum Throughput guarantee를 제공하지 않는다.
- **Connection-Oriented**: 물리적 연결이 아닌 논리적 연결로, 순서에 맞게 손실 없이 데이터를 전송한다.

### 🪚 UDP
User Datagram Protocol
- Unreliable하다.
  - Network 계층의 data를 응용 계층으로 바로 전달하기에 매우 단순한 구조이다.
- Connection-Less
- 빠른 데이터 처리를 요구하는 경우 사용할 수 있다.


---

## 📕 참고
- [OSI 7 Layer vs TCP/IP 5 Layer](https://velog.io/@osk3856/TCP-Updated-Model)
- [Application Layer 개요](https://ddongwon.tistory.com/71)
- [Part 1-3 Network](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/Network)
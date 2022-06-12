---
title: "📡 [OSI 7계층] Transport Layer"
description: "개발 상식"
date: 2022-06-12
update: 2022-06-12
tags:
  - Network
  - OSI
  - Transport
series: "📡 Network"
---

## 🧷 Transport Layer

### 🪚 3-way handshake & 4-way handshake
**연결 성립**

<img src="https://velog.velcdn.com/images%2Fxx0hn%2Fpost%2Fb8c269b8-760a-4d5a-9b87-ba0dbe9d0c62%2Fwhat-is-a-tcp-3-way-handshake-process-three-way-handshaking-establishing-connection-6a724e77ba96e241.jpeg" width="80%">

1. 클라이언트는 서버에 접속을 요청하는 `SYN` 패킷을 전송한다. (그리고 해당 패킷의 `seq #` 는 M이라 한다.)
2. 서버는 `SYN` 패킷을 받아 클라이언트에게 요청을 수락한다는 의미의 `ACK(M + 1)` 패킷과, `SYN(N)` 을 전송한다.
3. `ACK(M + 1)` 을 받은 클라이언트는 서버에게 `ACK(N + 1)` 패킷을 보냄으로써 연결이 성립된다.

**연결 해제**
<img src="https://velog.velcdn.com/images%2Fxx0hn%2Fpost%2F536dfd93-2252-4dce-bc11-b9f6c44fa2dd%2F99229C485C1D90C038.png" width="80%">

1. 클라이언트가 연결을 종료하겠다는 `FIN` 플래그를 전송한다.
2. 서버는 클라이언트의 연결 종료 요청 (`FIN`)을 받고, 확인용으로 `ACK` 를 전송한다.
   1. 이후 남은 데이터를 모두 보낼 때까지 잠깐 **TIME OUT**된다.
3. 데이터를 모두 보내고, 통신이 끝났다면 연결이 종료되었다고 클라이언트에게 `FIN` 플래그를 전송한다.
4. 클라이언트는 `FIN` 메세지를 확인했다는 `ACK` 을 전송한다.
5. 클라이언트의 `ACK` 을 받은 서버는 소켓 연결을 종료한다.
6. 클라이언트는 아직 서버로부터 받지 못한 데이터가 있을 것을 대비해 일정 시간 동안 잉여 패킷을 기다린다. (**WAITING TIME**)

---

## 📕 참고
- [OSI 7 Layer vs TCP/IP 5 Layer](https://velog.io/@osk3856/TCP-Updated-Model)
- [Application Layer 개요](https://ddongwon.tistory.com/71)
- [Part 1-3 Network](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/Network)
- [[TCP] 3-way-handshake & 4-way-handshake](https://asfirstalways.tistory.com/356)
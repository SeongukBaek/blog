---
title: "📡 Network Layer"
description: "개발 상식"
date: 2022-07-01
update: 2022-07-01
tags:
  - Network
  - OSI
series: "📡 Network"
---

## 🧷 Network Layer
이전에 다룬 Transport Layer의 바로 하단에 위치하는 계층으로, 컴퓨터 네트워크의 핵심이라고 할 수 있다.

### 🪚 네트워크 계층의 핵심 기능
**Forwarding**
- data plane이 담당한다.
- 패킷이 들어왔을 때, 이를 내보내는 기능을 수행한다.

**Routing**
- control plane이 담당한다.
- 들어온 패킷을 어디로 내보낼 지 판단하는 기능을 수행한다.

### 🪚 Data plane & Control plane
**Data plane**
- 라우터 내부 local로 범위가 한정되고, 각각의 라우터마다 동작한다.
- **들어온 패킷이 어떻게 forwarding**될 지 결정한다.

**Control plane**
- 네트워크 전체에 대한 범위를 가진다.
- forwarding table(라우터들이 사용하는 표)를 이용해 결정하는 **전통적인 방식**과, 중앙 서버를 활용하는 **SDN 방식**이 존재한다.
  - 전통 방식은 라우터들끼리 라우팅 프로토콜에 의해 정보를 주고받으며 생성하는 방식
  - SDN 방식은 중앙 서버 (Remote Controller) 에서 RT를 생성한 후, 이를 라우터들에게 전달해주는 방식

> **네트워크 서비스 모델**
> - 개별 패킷에 대한 서비스 요구가 가능해야 한다.
> - 연속적으로 패킷을 전송할 수 있어야 한다.

---

## 🧷 라우터 내부 구조
<img src="../../images/Network/라우터구조.jpeg" width="80%">

- 라우팅을 담당하고 관리하는 SW형태의 routing processor와, Forwarding을 담당하는 HW형태의 high-speed switching fabric이 존재한다.
- routing processor는 패킷의 목적지 주소를 가지고 RT를 참고한다. 이후 다음 라우터를 결정한다.
- 패킷은 router input ports에서 목적지 주소를 확인하고, 버퍼링된다. 
- 또한 **Forwarding은 2가지 방식**이 존재한다.
  - destination-based forwarding: 목적지 주소에 기반한 forwarding
    - longest prefix matching: 목적 주소와 일치하는 address prefix 중 가장 긴 것과 매칭시키는 것, TCAMs를 이용한다.
  - generalized forwarding: header fields 값에 기반한 forwarding

> **TCAMs** (Ternary Content Addressable Memories)
> : 메모리에 모두 로드한 후 매칭하는 방식
> - Content-addressable: TCAMs에 의해 테이블 크기에 상관없이 금방 결과를 찾을 수 있게 된다.

### 🪚 Switching fabrics
패킷을 input ports에서 적절한 output port로 이동시키는 기술이다. 아래와 같은 방식들이 있다.

**Switching via a memory**
<img src="../../images/Network/switchingmemory.jpeg" width="60%">

- 이동수단으로서 **메모리를 이용**하는 방식이다.
- 패킷이 특정 메모리에 복사되고, 이를 특정 output port에서 읽어 이동시킨다.
- **메모리에 load하고, access하는 시간**으로 인해 느리다는 단점이 있다.
  - memory bandwidth만큼으로 제한된다.

**Switching via a bus**
<img src="../../images/Network/switchingbus.jpeg" width="60%">

- 이동수단으로서 **bus**를 이용하는 방식이다.
- **버스 사용에 대한 관리가 필요**하다.
  - 동시에 버스를 사용하려는 경우 등

**Switching via a Interconnection Network**
<img src="../../images/Network/swtichinginter.jpeg" width="60%">

- 그림처럼, 상호 연결된 네트워크 망을 사용한다.
  - 망이 접하는 점은 `crossbar point` 라고 한다.
- 철도길처럼, 패킷은 crossbar point에서 switching하면서 이동이 가능하다.
- 하지만 **네트워크가 증가할수록, point도 증가한다**는 문제가 있다.

**Switching via a multistage switch**
<img src="../../images/Network/swtichingmulti.jpeg" width="60%">

- Interconnection network를 사용했을때의 point가 증가하는 문제를 해결하는 방식이다.
- 패킷(datagram)을 **고정된 길이의 셀 단위로 나누고**, 이를 fabric을 통해 전달한 다음, 목적지에서 이를 **결합하여 사용**한다.
- multistage인 이유는, 각 switch가 n x n crossbar 구조이기 때문이다.

### 🪚 Input port Queuing

### 🪚 Output port Queuing

---

## 📕 참고
- [Network layer 개요](https://ddongwon.tistory.com/88)
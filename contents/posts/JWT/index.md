---
title: "💻 JWT"
description: "백엔드 지식"
date: 2022-01-16
update: 2022-01-16
tags:
  - jwt
  - Token
  - Cookie
  - Session
series: "💻 BackEnd"
---

> 로그인 기능을 제공하기 위해서는 사용자의 정보를 지키는 보안이 필수라고 생각했습니다. 
> 처음으로 서버를 구현해보면서, 
> - 로그인한 사용자의 정보를 Session에는 어떻게 저장할 것인지, 
> - 이를 어디서 활용할 것인지, 
> - 사용자의 비밀번호는 어떻게 암호화 (복호화도?) 할 것인지
> 
> 와 같은 고민을 해보았습니다.

## 💡 jwt
= Json Web Token
클라이언트와 서버, 서비스와 서비스 간의 통신 시 Authorization을 위해 사용하는 Token입니다. 이때, Json 포맷을 이용하여 사용자의 속성 정보를 저장한다.

클라이언트와 서버 간 정보를 주고 받을 때, HTTP request header에 JSON Token을 포함한 후 서버는 별도의 인증 과정 없이 Header에 포함된 jwt 정보를 통해 인증을 수행한다.

### 🦈 구조
<img src="https://images.velog.io/images/bsu1209/post/fb8e3c76-9388-44a0-8307-c09b4b88a4dc/springboot-Page-4.drawio.png" width="60%">

jwt는 header, payload, signature 세 파트로 나누어진다.

#### header

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- jwt를 어떻게 검증하는가에 대한 정보를 가지고 있다.
- `alg` 는 Signature를 해싱하는 알고리즘 방식을 지정하며, Signature 및 Token 검증에 사용된다.
- `typ` 은 Token의 타입을 지정한다.

이와 같은 JSON 객체를 문자열로 직렬화하고 `UTF-8` 과 `Base64 URL-safe` 로 인코딩하게 되면 header를 생성할 수 있다.

```json
Base64URLSafe(UTF-8('{"alg": "HS256", "typ": "JWT"}')) → header!
```

#### payload

```json
{
  "iss": "seongukbaek",
  "sub": "test",
  ...
}
```

- Token을 통해 클라이언트와 서버 간 사용할 정보의 조각인 **"Claim"**이 저장된다.
- 이러한 Claim의 모음을 **Claim Set**이라고 한다.
- Claim은 총 3가지로 나누어지며, Json(Key-Value) 형태로 저장이 가능하다.

##### Registered Claim (등록된 Claim)
Token 정보를 표현하기 위해 이미 정해진 종류의 데이터
- 선택적으로 사용 가능하며, 권장되는 claim
- jwt를 간결하게 하기 위해 key는 모두 길이 3의 String이다.
- 여기서 subject(sub)로는 고유한 값을 사용하는데, 대체로 사용자의 이메일을 사용한다.

> - iss: 토큰 발급자(issuer)
> - sub: 토큰 제목(subject)
> - aud: 토큰 대상자(audience)
> - exp: 토큰 만료 시간(expiration), NumbericDate 형식이어야 함(ex. 1480849147370) = unix time
> - nbf: 토큰 활성 날짜(not before), 해당 날짜가 지나기 전의 토큰은 활성화되지 않음
> - iat: 토큰 발급 시간(issued at), 토큰 발급 이후 경과 시간을 알 수 있음
> - jti: jwt 토큰 식별자(jwt ID), 중복 방지를 위해 사용하며, 일회용 토큰(Access Token) 등에 사용

##### Public Claim (공개 Claim)
사용자 정의 Claim
- 공개용 정보를 위해 사용된다. 
- 충돌 방지를 위해 URI 포맷을 이용한다.

```json
{ 
  "https://baeksulog.netlify.app": true 
}
```

##### Private Claim (비공개 Claim)
사용자 정의 Claim
- 서버와 클라이언트 사이에 임의로 지정한 정보를 저장한다.

```json
{ 
  "isLogin": true 
}
```

#### signature
Token을 인코딩하거나 유효성 검증을 할 때 사용하는 고유한 암호화 코드이다. 
- 서명은 위에서 만든 header와 payload의 값을 각각 BASE64 URL-Safe로 인코딩하고, 
- 인코딩한 값을 Secret key를 이용해 header에서 정의한 알고리즘으로 해싱을 하고,
- 이 값을 다시 BASE64 URL-Safe로 인코딩하여 생성한다.

> **Base64 URL-Safe**
> - URI에서 parameter로 사용될 수 있도록 "+", "/", "=" 를 제외한 인코딩 방식이다.
> 
> 점을 구분자로 하여 header, payload, signature를 합치면 **jwt** 가 완성된다.

### 🐢 장, 단점
#### 장점
주된 이점은 사용자 인증에 필요한 모든 정보는 **Token** 자체에 포함되어 별도의 인증을 위한 저장공간이 필요하지 않다는 점이다. (서버 기반의 인증 시스템은 별도 저장공간이 필요하다.)

#### 단점
- Tore Token: Token은 클라이언트 단에 저장되어 DB에서 사용자 정보를 수정하더라도 Token에 직접 적용할 수 없다.
- Token 길이: 많은 field(Claim)이 추가되면 Token의 길이가 길어질 수 있고, 이는 네트워크의 부하로 작용될 수 있다.
- Self-contained: Token 자체에 정보를 담고 있으므로 양날의 검이 될 수 있다. 
- payload 인코딩: payload 자체는 암호화된 것이 아니라, BASE64로 인코딩 된 것이다. 중간에 이를 탈취하여 디코딩하면 데이터를 볼 수 있으므로, JWE로 암호화하거나 payload에 중요 데이터를 넣지 않아야 한다. 
- Stateless: JWT는 상태를 저장하지 않기 때문에 한 번 만들어지면 제어가 불가능하다. 즉, Token을 임의로 삭제하는 것이 불가능하므로 Token 만료 시간을 꼭 넣어주어야 한다.
	
    - Logout을 구현 시 어떻게 처리할 것인지에 대한 고민이 필요하다.

### Access Token & Refresh Token
**jwt** 에 대해 찾아보다보니, `Refresh Token` 이라는 개념에 대해 알게 되었다. 

#### Refresh Token이 필요한 이유?
기본 jwt 방식으로 Access Token을 하나만 두는 경우 **해당 Token이 탈취**되었을 때, 보안의 취약하다는 문제가 발생한다.

- 그렇다면, Access Token의 **유효기간**을 짧게 하여 탈취의 위험성을 낮추는 방법은 어떨까?
   - 사용자는 그만큼 로그인을 자주 하여 새로운 Token을 발급받아야 해 불편하다.

유효 기간을 길게 하면서, 보안에 덜 취약한 방법이 없을까? 라는 질문에 대한 답으로, **Refresh Token** 이 등장한다.
아래는 **Access Token, Refresh Token**을 이용한 로그인 기능의 흐름도이다.

<img src="https://images.velog.io/images/bsu1209/post/7f8cb095-1a4f-4f0f-8590-1de6d4b45a0a/springboot-Page-7.drawio.png" width="80%">

이러한 방식을 사용하면,
- 당연히 기존의 방식보다 더 안전하다.
- 하지만, **Access Token**이 만료될 때마다 새 Token을 발급하는 과정에서 생기는 HTTP 요청 횟수가 많아지고, 이는 곧 **서버의 자원 낭비**로 귀결된다.

### 🐡 저장
저장위치에 있어 정답은 없는 것 같다.
그저 개발 환경에 있어 최선책을 사용하는 것이 답인 것 같다.
먼저, 보안에 있어 문제가 되는 몇 가지를 알고 가야한다.

#### XSS
Cross Site Script의 약자로, 이미 `CSS` 라는 약자가 존재해 `XSS` 로 지어졌다.
게시판이나 웹 메일 등에 `js` 와 같은 script code를 삽입해 개발자가 의도치 않은 기능이 동작하게 해 치명적인 공격이다.
XSS에는 `Reflected XSS` , `Stored XSS` , `DOM Based XSS` 가 있다.
자세한 내용은 참고에서 확인할 수 있다.

#### CSRF
Cross Site Request Forgery의 약자이다.
정상적인 request를 가로채 피해자인 척 하고 서버에 변조된 request를 보내 악의적인 동작을 수행하는 공격을 의미한다.
자세한 내용은 참고에서 확인할 수 있다.

> **XSS 예방이 최소한의 조치**
> js로 의도하지 않은 request를 날린다던가 localStorage, 변수 값 등 모든 것이 탈취 가능하기에 XSS 공격 방지가 웹 보안의 시작이라고 할 수 있다.

**Cookie**, **LocalStorage** 를 이용하면서 위와 같은 보안 문제를 맞닥뜨리게 된다.

#### LocalStorage
##### 장점
**CSRF** 공격에는 안전하다.
- 자동으로 request에 담기는 쿠키와 다르게 js에 의해 헤더에 담기므로 **XSS**를 뚫지 않는 이상 공격자가 정상적인 사용자인 척 request를 보내기가 어렵다.

##### 단점
**XSS**에 취약하다.
- 공격자가 **LocalStorage**에 접근하는 js 한 줄만 주입하면 **LocalStorage**를 공격자가 내 집처럼 드나들 수 있다.

#### Cookie
##### 장점
**XSS** 공격으로부터 **LocalStorage**에 비해 안전하다.
- **Cookie**의 `httpOnly` 옵션을 사용하면 js에서 **Cookie**에 접근 자체가 불가능하다.
- 그래서 **XSS** 공격으로 **Cookie** 정보를 탈취할 수 없다. (`httpOnly` 옵션은 서버에서 설정할 수 있음)

하지만 **XSS** 공격으로부터 완전히 안전한 것은 아니다.
- `httpOnly` 옵션으로 **Cookie**의 내용을 볼 수 없다 해도 js로 request를 보낼 수 있으므로 자동으로 request에 실리는 **Cookie**의 특성 상 사용자의 컴퓨터에서 요청을 위조할 수 있기 때문이다.
- 공격자가 귀찮을 뿐이지 **XSS**가 뚫린다면 `httpOnly` **Cookie**도 안전하진 않다.

##### 단점
**CSRF** 공격에 취약하다.
- 자동으로 request에 담아서 보내기 때문에 공격자가 request url만 안다면 사용자가 관련 link를 클릭하도록 유도하여 request를 위조하기 쉽다.

#### DB vs. Redis (Refresh token)
**LocalStorage** & **Cookie** 의 문제점을 피하기 위해 가장 좋은 방법은 서버사이드에 저장하는 것이다.

"즉, **DB**에 **Refresh Token**을 저장하고 저장되는 **index**를 **Cookie**에 저장한다."

이때, 구글링을 통해 **Redis** 또는 일반적인 **DB**에 저장하는 방식을 발견했다.
이미 사용자의 정보를 `Mysql` 을 사용하여 저장하고 있으므로, **DB**에 저장하는 방식을 사용하긴 할 것이다.

하지만 **Redis**에 대해 알아보자면,

##### Redis
메모리 기반의 key-value 구조 데이터 관리 시스템으로, 비관계형 데이터베이스이다.
- 자바 자료구조와 유사한 영속적인 자료구조 제공 (키는 자바에서 참조와 동일한 역할, 즉 객체를 식별)
- 크게 `String` , `Set` , `Sorted Set` , `Hash` , `List` 데이터 형식 지원
- 읽기 성능 증대를 위한 서버 측 복제를 지원
- 쓰기 성능 증대를 위한 클라이언트 측 Sharding 지원

**장점**
- 리스트, 배열 데이터를 처리하는 데 유용
- 리스트 형 데이터 입력 & 삭제가 **MySQL**에 비해 10배정도 빠름
- 영속적인 데이터 보존

이러한 특징이 있고 자세한 내용은 참고에서 확인할 수 있다.

위에서 다룬 사항들을 종합해보았을 때, 아래와 같은 방식으로 구현할 예정이다.
- **Access Token**, **Refresh Token** 을 사용
- **Access Token**은 짧은 유효기간으로, **Cookie**에만 저장 (`httpOnly`)
- **Refresh Token**은 비교적 긴 유효기간으로, **DB**에 저장

### 🐳 필요한 기능
큰 흐름으로는 아래와 같은 기능들이 필요할 것이라 판단했다.
- Token이 유효하다 = 로그인된 상태
- Token이 만료되었다 = 유효 기간이 지난 상태

#### 사용자의 login post 처리
1. `User` DB에 저장되어 있는 사용자인지 확인
2. 로그인하는 사용자에 대한 **Access Token & Refresh Token** 생성 (`jwt.sign()`)
3. **Refresh Token**은 DB에 저장하고, **Access Token** 을 Cookie(httpOnly)에 저장

#### Access Token의 유효성을 검사하는 `middleware`
1. request의 header에 있는 **Access Token** 을 확인
2. Token이 없는 경우, `Status 400` return
3. 그렇지 않은 경우, `jwt.verify()` 로 Token의 유효성 검사
   - `verify()` 매개변수 3개
      - client에게서 받은 **Token**, Token 생성 시 사용했던 **secretKey**, 유효성 검사 결과를 처리할 **callback function**
4. 기간이 지나지 않은 유효한 Access Token이라면, 통과
5. 기간이 지났고 유효한 Access Token이라면, **재발급** 과정으로 전달

#### Refresh Token을 기반으로 새로운 Access Token 발급
1. request의 body로부터 사용자의 **Refresh Token** 추출
2. Token이 없다면, `Status 401` return
3. **DB**에 저장된 **Refresh Token**와 동일한지 검사, `jwt.verify()` 로 Token의 유효성 검사
4. 유효하다면, `user의 id` (or else) 를 이용하여 새로운 **Access Token**과 **Refresh Token** 생성
5. 그렇지 않다면, **DB**에서 **Refresh Token** 삭제하고 재로그인 요청

### 💁‍♂️ 이슈사항
#### Refresh Token
- 서버 - 클라이언트 간 Token이 담긴 Cookie을 주고 받으면서 사용하는데, Refresh Token의 안전을 위해 DB에 Refresh Token 저장 시 자동 생성된 Unique한 Token_id 값을 Cookie에 저장해 주고 받는 방식은 어떨까
	
    - Refresh Token Cookie가 탈취되어도, Token이 저장된 DB에 접근하지 못하면 Refresh Token을 보호할 수 있지 않을까

#### Cookie 저장
- Token 발급 시, 서버에서 이를 Cookie(httpOnly)에 담아 전송할 지 또는 서버는 발급한 Token을 그대로 클라이언트로 전송하여 Front에서 Cookie에 담아 사용할지
	
    - 서버에서 Cookie에 담아 클라이언트로 전송하는 방식이 좀 더 안전해보일 것 같다.

### 📕 참고
- [[Server] JWT(Json Web Token)란?](https://mangkyu.tistory.com/56)
- [JWT (JSON Web Token) 이해와 활용](http://www.opennaru.com/opennaru-blog/jwt-json-web-token/)
- [JWT를 소개합니다.](https://meetup.toast.com/posts/239)
- [TIL 50 | JWT 원리와 장단점](https://velog.io/@mygomi/TIL-50-JWT%EC%97%90-%EB%8C%80%ED%95%B4-%EB%B0%9C%ED%91%9C%ED%95%B4%EB%B3%B4%EA%B2%A0%EC%8A%B5%EB%8B%88%EB%8B%A4#jwt%EC%9D%98-%EC%9E%A5%EC%A0%90%ED%95%84%EC%9A%94%EC%84%B1)
- Access Token & Refresh Token
  - [쉽게 알아보는 서버 인증 2편(Access Token + Refresh Token)](https://tansfil.tistory.com/59)
- 저장
  - [XSS](https://4rgos.tistory.com/1)
  - [CSRF](https://itstory.tk/entry/CSRF-%EA%B3%B5%EA%B2%A9%EC%9D%B4%EB%9E%80-%EA%B7%B8%EB%A6%AC%EA%B3%A0-CSRF-%EB%B0%A9%EC%96%B4-%EB%B0%A9%EB%B2%95)
	
    - [JWT는 어디에 저장해야 할까?](https://velog.io/@0307kwon/JWT%EB%8A%94-%EC%96%B4%EB%94%94%EC%97%90-%EC%A0%80%EC%9E%A5%ED%95%B4%EC%95%BC%ED%95%A0%EA%B9%8C-localStorage-vs-cookie)
	
    - [Redis](https://velog.io/@ayoung0073/database-redis)
- 필요한 기능
  - [JWT 사용하기](https://surprisecomputer.tistory.com/39)
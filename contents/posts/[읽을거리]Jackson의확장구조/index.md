---
title: "📰 [Naver D2] Jackson의 확장 구조를 파헤쳐 보자"
description: "개발 상식"
date: 2022-06-26
update: 2022-06-26
tags:
  - 읽을거리
series: "📰 읽을 거리"
---

네이버 D2를 보다가, 스프링과 관련된 재밌는 주제를 발견해서 읽으며 느낀 점을 기록하는 POST입니다.

## 🧷 생각해본 것들 & 알게 된 것들 & 찾아봐야 할 것들
1. (찾) 역직렬화가 뭘까 -> [직렬화와 역직렬화 정리](https://subbblog.netlify.app/[Java%EC%A7%80%EC%8B%9D]%EC%A7%81%EB%A0%AC%ED%99%94&%EC%97%AD%EC%A7%81%EB%A0%AC%ED%99%94/)
2. (알) 네이버 페이에서는 Rest API 통신 시 각종 타입 정보에 대해 Enum을 적극 활용한다.
3. (생) 네이버 페이 통신 방식에서, API Client에서 하던 Convert Code to Enum 작업을 API Server로 옮기는 것으로 보이는데, 처음부터 이런 방식을 사용했으면 되지 않을까?
4. (알) 객체의 역직렬화를 위해서는 `@JsonDeserialize` annotation을 사용해 deserializer 등록이 가능하다. 이 방법은 특정 필드나 클래스에 한해 deserializer 등록 시 용이하다.

## 🧷 느낀 점
- 

## 📕 참고
- [Jackson의 확장 구조를 파헤쳐 보자](https://d2.naver.com/helloworld/0473330)
- [Getting Started with Custom Deserialization in Jackson](https://www.baeldung.com/jackson-deserialization)
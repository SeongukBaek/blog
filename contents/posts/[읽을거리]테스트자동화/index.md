---
title: "📰 테스트 자동화"
description: "개발 상식"
date: 2022-06-18
update: 2022-06-18
tags:
  - 읽을거리
  - 테스트
  - 자동화
series: "📰 읽을 거리"
---

해당 포스트를 읽으면서 느낀 점, 생각한 것들을 자유롭게 적는 POST입니다.

## 🧷 생각해본 것들 & 알게 된 것들 & 찾아봐야 할 것들
1. (생)미디어 플랫폼의 특성 상 Spring 프레임워크에서 제공하는 Mock MVC와 같은 테스트 도구를 사용하지 못했다고 하는데,  그렇다면 테스트가 완벽하게 진행되긴 어려웠을텐데, 어떤 식으로 테스트를 진행한 것일까

2. (알)Maven 빌드 도구에서는 특정 단위 테스트만 진행할 수 있도록 하는 기능을 제공한다.

3. (알)Jenkins의 'GitHub pull request builder'라는 플러그인을 통해 코드 리뷰 단계에서 배포 가능 여부를 판단할 수 있다.

4. (찾)일반 API 트래픽과 미디어 스트림 트래픽의 차이가 뭘까

5. (찾)병목 현상이 뭘까

6. 

## 🧷 느낀 점
- 테스트는 매우매우 중요하다. 그만큼 테스트 케이스도 중요하지만 비용이 많이 든다. 나도 테스트 자동화라는 것을 경험해보고 싶다.



## 📕 참고
- [서버 사이드 테스트 자동화 여정 - 1. 테스트 자동화를 시작한 계기와 그 첫 발걸음](https://engineering.linecorp.com/ko/blog/server-side-test-automation-journey-1/)
- [서버 사이드 테스트 자동화 여정 - 2. 통합 테스트 수준의 회귀 테스트 환경 구축 및 Docker 활용](https://engineering.linecorp.com/ko/blog/server-side-test-automation-journey-2)
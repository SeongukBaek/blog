---
title: "💬 좋은 코드"
description: "개발 상식"
date: 2022-01-05
update: 2022-01-05
tags:
  - 개발상식
series: "💬 면접"
---

### ⌘ 좋은 코드 ?
좋은 코드라고 하면 과연 어떤 게 좋은 것일까 ?
- 읽기 쉬운 코드 ?
- 중복이 없는 코드 ?
- 테스트가 용이한 코드 ?

#### 읽기 쉬운 코드
읽기 쉬우려면, 작성자에게 익숙한 언어를 사용하면 된다.
그리고 한국어로 적힌 주석도 적절하게 달아주면 잘 읽히지 않을까.

하지만

##### 주석은 **관리가 어렵다**는 단점이 있다.
- 주석은 메타데이터이기에 내용과 함수의 실제 동작에 대한 보장이 어렵다.
- 수시로 발생하는 수정사항에 대해 주석이 동기화되지 않으면, 오히려 더 큰 혼란을 야기할 수 있다.

##### '읽기 쉽다' 라는 말 자체의 모호성 ?
읽기 쉽다는 것의 기준은 사람마다 너무 다를 것이다. 
변수명 또는 함수명에 대한 네이밍은 사람마다 매우 다르기에, 각자의 배경지식 수준에 따라 기준이 모호하다.

또한, 코드를 작성하는 시점에는 이해도가 100%이지만, 이는 점점 떨어지기 때문에 아무리 코드 작성에 노력을 가해도 한계는 존재할 수밖에 없다.

#### 중복이 없는 코드
동일한 로직을 수행하는 코드가 줄줄 작성되어 있다면, 대부분은 이를 추출하여 함수화하기를 원할 것이다. (또는 반복문?)
왜냐하면, 이러한 동일 코드가 여러 군데 널브러져 있는 것은 "불편하다"고 느껴지기 때문이다.

이렇게 추출한 코드는 시간이 지나 조금 다른 역할을 수행하기 위해 수정되어져야 할 수 있다.
이때, 추출되었던 코드를 다시 합치거나 수정해야 하는데 비용이 발생하게 된다.

#### 테스트가 용이한 코드
테스트는 매우 중요한 역할을 한다. 
작성한 코드에 대한 확실한 증거가 될 수 있다.

하지만 테스트가 용이해야 좋은 코드일까?
어떻게 하면 테스트가 용이한 코드를 작성할 수 있을까?

---

### ⌘ 좋지 않은 코드가 생산되는 이유 ?
모두들 좋은 코드를 생성하고 싶지만, 좋지 않은 코드를 생산하는 결과를 맞이하기도 한다.
그럼 어쩌다가 코드가 좋지 못한 방향으로 생산되게 될까?

#### 우리가 마주하는 상황
새로운 프로젝트에 대한 개발을 진행하기도 하고,
이미 존재하는 프로젝트에 대한 리팩토링을 진행하기도 한다.

##### 쓰이지 않는 코드
여러 번의 수정을 거쳐, 결국엔 쓰이지 않게 된 코드가 있을 것이다.
이러한 코드의 호출범위에 대한 확신이 없다면, 다른 코드들에 대한 위험요소가 될 수 있다.

**"깨진 유리창"** 이라는 표현이 아주 좋은 것 같다. <a href="#help">참고에서 가져온 표현</a>

###### 거리
코드가 동작하는 곳과 코드가 선언된 곳의 물리적인 거리가 멀면, 파악이 어려워진다.
선언한 코드의 동작범위를 정확하게 제어할 수 있다면, 이러한 불안감은 해소될 수 있다.

###### 순수하지 않은 함수
함수의 외부의 특정 값을 기반으로 동작하는 함수는, (외부의 특정 값에 의존하는 함수) 그 **side effect** 를 제어하는 것이 어렵다.

함수의 입출력만으로 함수 내부를 수정할 수 없다면, 순수하지 않은 함수라고 한다.

##### 급하게 수정한 코드
추가적인 로직을 수행하기 위해, 사용하는 곳에서 수정이 이뤄져야 하는 경우를 종종 볼 수 있다. 이런 경우, side effect가 발생하는 것을 피하고자, 함수에 입력을 추가하거나, 옵션을 변경시켜 당장은 정상적으로 동작하는 것처럼 보이게 해결할 수는 있다.

하지만 이러한 **응급처치**를 여러 번 거친 함수는, 쉽게 알아볼 수 없는 코드로 변하게 된다.

여기서, **기술부채** 라는 표현이 등장한다. <a href="#help">참고에서 가져온 표현</a>

---

### ⌘ 좋지 않은 코드 줄이기
"좋은 코드" 를 정의하는 것은 어렵다.
그렇다면 반대로, 위에서 다룬 좋지 않은 코드를 줄이는 방법을 택한다.

#### 추출, 추상화
어원을 살펴보면, 둘 다 -tract(끌어내기)과 결합된 합성어이다. 그렇다면 ex-, ab- 과 결합되어 어떻게 다를까?

##### 추출
ex- 는 '밖으로' 라는 의미를 가진다. 중요한 부분과 관련된 개념들을 끌어내는 것이다.

##### 추상화
ab- 는 '형상적인 모습과는 먼 개념' 이라는 의미를 가진다. 즉, 실체가 없는 추상적인 개념들을 끌어내 자신만의 방식으로 정리한 것이다.

#### 의존성을 드러내기 위한 추상화
우리가 코드를 추출하는 이유는 재사용의 용이성, 너무 커지는 파일이라고 할 수 있다.
단순히 중복된 코드 덩어리(chunk)에 대해 추출하면 재사용이 어려워진다. 오히려 함수 간의 의존 관계를 파악하기 위해 추가 비용이 발생하므로, 이는 잘못 추출한 것이다.

함수를 분리할 때는 **함수의 역할을 인지**하고 **하나의 역할만 하도록 정의**해야 한다. 즉 **의존성을 드러내기 위함**이 추출의 목적이 되어야 한다.

한 파일에 여러 로직이 얽혀있을 때 각 코드 조각 중 **서로 의존 관계에 있는 것들을 추출**하여 추상화가 된 함수가 하나의 목적(역할)만을 갖도록 해야 한다.

#### 삭제하기 쉬운 코드와 어려운 코드의 분리
비즈니스 요구사항을 맞추다보면 어쩔 수 없이 복잡한 코드가 생산될 수 밖에 없다.
사용하는 라이브러리의 문제일 수도 있고, 여러 브라우저에 대응하기 위해 생산된 코드일 수도 있다.

이러한 코드들은 제 3자의 입장에서는 섣불리 어찌할 수 없기에, 별도로 분리해야 한다. 어렵다면, 제대로 관리, 통제할 수 있도록 격리하여야 한다.
이 때, 주석과 함께 격리하여 관리하도록 한다.

#### 일관성 있는 코드
최소한의 코드 가독성을 보장하기 위해서는 개발하는 코드의 일관성을 유지하는 것이다. 합의된 규칙을 사용하여 개개인에게 동일하게 적용되도록 한다.

일관성이 지켜진다면, 코드에 대한 예상도 가능하다. 특정 코드가 어디에 위치될 지 예측이 가능하다는 의미이다.

##### NAMING
변수의 Naming 뿐 아니라 함수의 Naming에도 합의된 규칙이 존재하면 일관성을 유지할 수 있다.

```javascript
// Case 1.
// prefix: handle
// target: button
// action: click
const handleButtonClick = () => {}

// Case 2.
// prefix: on
// action: click
// target: button
const onClickButton = () => {}
```
위 예시처럼, `prefix` , `target` , `action` 이 일관된 규칙으로 Naming을 수행하여 함수의 파악을 도울 수 있다.

##### DIRECTORY
디렉터리는 코드를 어디로 분리할지와 관련이 있다.
일관된 디렉터리 구조는 전체 구조를 파악하고 코드의 역할을 이해하는데 큰 도움이 된다.

디렉터리 구조는 크게 **역할에 따라**, **페이지(도메인)에 따라** 분리할 수 있다.
애플리케이션이 커지고 복잡해지면,
- 전자의 경우, 코드가 정의된 곳과 사용되는 곳이 멀어지는 문제점이 발생한다. 이는 위에서 다룬 거리에 대한 문제로 코드 제어를 어렵게 만들 수 있다.
- 후자는 Featured Based라고 할 수 있는데 이러한 구조로 거리 문제를 해결할 수 있다. 애플리케이션 전반에서 공통으로 사용되는 것들만 Top Level의 `@shared` 디렉터리에서 관리하고 나머지는 응집도 높게 각각의 디렉터리에서 관리한다.

#### 확장성 있는 코드
확장성이 없는 코드의 경우, 수정사항에 대한 많은 변경을 요구하며, 자연히 생산성이 떨어지는 요소가 된다. 확장성의 보장을 위해, 기존의 HTML HTML element가 받을 수 있는 attribute를 모두 수용할 수 있도록 구현해야 한다.

---

### 💡 정리
좋은 코드라는 정의의 답은 없는 것 같다.
아마 개발자라는 직업을 가지고 사는 이상 평생의 숙제가 아닐까 싶다.
그래서 좋지 않은 코드를 최대한 만들지 않도록 하는 것이 곧 좋은 코드를 만들어내는 방법이 아닐까 생각한다.

### 🚩 참고<span id="help"></span>
[좋은 코드](https://jbee.io/etc/what-is-good-code/#%EC%9D%BD%EA%B8%B0-%EC%89%AC%EC%9A%B4-%EC%BD%94%EB%93%9C%EA%B0%80-%EC%A2%8B%EC%9D%80-%EC%BD%94%EB%93%9C) 를 **많이 참고**하여 제 생각을 덧붙여봤습니다.
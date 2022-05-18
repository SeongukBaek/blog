---
title: "💻 동기 및 비동기 처리"
description: "백엔드 지식"
date: 2022-01-21
update: 2022-01-21
tags:
  - Callback
  - Async
  - Await
  - Promise
series: "💻 BackEnd"
---

<em>동기처리 및 비동기처리에 대해 정리하는 POST입니다.</em>

백엔드 개발을 수행하면서, (~~사실 이전에 프론트 개발 시에도~~) **동기처리**, **비동기처리**라는 용어를 많이 봤지만, 정확하게 이해하고 넘어가진 않았다. 이 POST를 계기로 정확하게 이해하고 앞으로 적용할 수 있도록 한다.

"기본적으로 함수는 선언된 시기가 아닌 **호출되는 시기**에 동작한다."

## 💡 동기, 비동기 처리란?
동기와 비동기는 **"프로세스의 수행 순서 보장에 대한 매커니즘"**이다.

### ☺️ 동기 (Synchronous)
동시에 일어난다는 의미
즉, **요청과 그 결과가 동시에 일어난다**는 약속인데, 요청을 하면, 시간이 얼마가 걸리던지 요청한 자리에서 바로 결과가 주어져야 하고, 결과를 받은 이후 다음 요청이 가능하다.

코드측면에서 쉽게 이해하자면, **프로그램이 작성된 순서대로 실행되는 것**이라고 할 수 있다.

**예시** : "은행 계좌의 돈을 송금하는 과정"
- A의 계좌에서 돈을 송금, B의 계좌에 입금
- B의 계좌에 입금이 완료된 경우, A의 계좌에서 출금
- A의 계좌의 출금과 B의 계좌의 입금이 **동시에 발생**

위의 과정이 동기적으로 일어나야 문제가 발생하지 않는다. 따라서 동기처리가 이뤄져야 한다.

### 😇 비동기 (Asynchronous)
동기와 반대의미로, 동시에 일어나지 않는다는 의미
즉 요청과 결과가 동시에 일어나지 않을 거라는 약속이다. 요청을 하면, 그 자리에서 결과가 주어지지 않는다. 따라서, 요청에 대한 결과를 전달받지 않고 다음 요청을 수행할 수 있다.

코드측면에서 쉽게 이해하자면, **프로그램이 작성된 순서대로 실행되지 않고 독자적인 흐름이 생기는 것**이라고 할 수 있다.

**예시** : "시험치는 학생과 교사"
- 학생은 시험지를 풀고 제출
- 교사는 시험지는 채점하고 학생에게 전달

위의 과정은 동기적으로 이뤄지지 않아도 되기에 비동기처리가 가능하다.

### 🙃 장, 단점
**동기**
- 설계가 매우 간단하고 직관적
- 결과가 주어질 때까지 다른 작업을 수행하지 못하고 대기해야 한다.

**비동기**
- 동기보다 복잡
- 결과가 주어지는데 시간이 걸리더라도 그 시간동안 다른 작업을 수행할 수 있으므로 효율적인 자원의 사용이 가능하다.

---

## 💡 Callback
다른 함수에 인자로서 전달되는 함수로, 호출방식에 의한 구분으로 붙은 이름이다.
특정 함수에 전달되어, 특정 함수 내에서의 어떠한 조건(또는 Event)에 의해 호출된다.

**특정 함수에 전달**

```javascript
function printFirst() {
    console.log('hello');
}

function printSecond() {
    console.log('bye');
}

function sleepAndExec(sleepTime, callback) {
    sleep(sleepTime);
    callback();
}

sleepAndExec(3, printFirst);
sleepAndExec(5, printSecond);
```

- `sleepAndExec()` 는 대기 시간과 호출할 함수를 지정하여 사용할 수 있다.
- `sleepAndExec(3, printFirst);` 에서 `printFirst` 는 `sleepAndExec()` 의 인자로 전달되기에 **Callback 함수**이다.

**어떠한 조건(또는 Event)**

```javascript
function onDetected() {
    console.log("감지!");
}

setOnDetected(onDetected);
```

- `setOnDetected` 로 설정한 `onDetected` 가, 특정 조건이 감지되었을 때마다 호출되기에 이는 **Callback 함수**이다.

이러한 Callback은 **Non-block**이며, **비동기 (Asynchronous) 방식의 함수**로 사용된다.
- Callback을 전달하고, 바로 실행되는 것이 아니기 때문에 비동기 방식으로 사용된다.

```javascript
tmp = function(a, b, callback) {
    callback(a+b, a-b);
}

tmp(1, 2, function(x, y) {
    console.log(x);
    console.log(y);
})

// output
3
-1
```

### 🤪 이유
Javascript는 현재 **비동기식 프로그래밍**을 사용하고 있다.
이는 모든 요청을 실행하고 결과를 받는 순서대로 다음 요청을 수행하는 방식이므로, 자원의 낭비를 줄인다.

이러한 비동기 프로그래밍을 처리하기 위해 **Callback 함수**가 사용된다.

---

## 💡 Promise
Callback의 원리를 이용해서 만든 라이브러리로, 비동기 처리에 사용하기 위해 `Promise 객체` 를 생성한다.

> **"내용은 실행되었지만, 결과는 아직 반환하지 않은 객체"**

### 🥺 상태
**Pending** (대기), **Fulfilled** (이행), **Rejected** (실패)

- 비동기 처리가 완료되지 않았다면 → **Pending** 
- 완료되었다면 → **Fulfilled**
- 실패하거나 오류가 발생했다면 → **Rejected**

```javascript
const condition = true;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('resolved');
  } else {
    reject('rejected');
  }
});

promise
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
```

- `condition` 값에 따라 `promise` 의 반환 값이 결정된다.
	
    - 값이 `참` 인 경우 `resolve` 를 호출하고, `거짓` 인 경우 (또는 에러가 발생한 경우) `reject` 를 호출한다.
    - 따라서, 한 `Promise 객체` 에 `resolve` 와 `reject` 가 동시에 존재할 수 없다.
- `then` 을 통해 `resolove` 된 경우의 반환 값을 받을 수 있고, `catch` 를 통해 `reject` 된 경우의 반환 값을 받을 수 있다.
- `then`, `catch` 의 chaining을 통해 비동기 로직의 성공 여부에 따른 분기 처리가 가능하다.

---

## 💡 async, await
가장 최근의 비동기 처리 문법으로, 기존의 **Callback** 이나 **Promise**의 단점을 해소하고자 만들어졌다.

기존의 방식의 단점은 꼬리에 꼬리를 무는 chaining 코드가 나올 수 있어 **콜백 지옥**, **`then` 지옥**이 만들어질 수 있다는 점이다.

### 😠 사용 방식
`await` 를 통해 `Promise` 객체의 반환 값을 받아올 수 있다.

`async/await` 사용 시, **"`await` 는 `async` 함수 안에서만 동작한다"**는 점을 인지해야 한다.

**예시**

```javascript
(async () => {
  const condition = true;
  const promise = new Promise((resolve, reject) => {
    if (condition) {
      resolve('resolved');
    } else {
      reject('rejected');
    }
  });

  try {
    const result = await promise;
    console.log(result);
  } catch (err) {
    console.error(err);
  }
})();
```

- `async` 함수 내의 `await` 를 통해 `Promise` 의 반환 값을 `result` 에 담아 출력한다.
- 주의할 점으로는 `Promise` 에서의 `then & catch` 와 같은 **Error Handling**이 없어 ` try-catch` 문을 활용해야 한다는 점이다.

---

## 💡 정리
**Error Handling**
- `Promise` 는 `then & catch` 문으로 Error Handling이 가능하다.
- `async & await` 는 이러한 기능이 없어 `try-catch` 문을 활용해야 한다.

**Code 가독성**
- `Promise` 는 콜백 지옥과 같은 `then` 지옥이 만들어질 수도 있다.
- `async & await` 는 코드 길이나 가독성 측면에서 효율적이고 흐름을 이해하는 데도 좋다.

---

## 📕 참고
동기, 비동기 처리란?
- [동기와 비동기의 개념과 차이](https://private.tistory.com/24)
- [동기는 정확히 무엇을 의미하는 걸까?](https://evan-moon.github.io/2019/09/19/sync-async-blocking-non-blocking/)

Callback
- [동기/ 비동기의 이해 - callback함수, promise, async, await](https://lunuloopp.tistory.com/entry/%EB%8F%99%EA%B8%B0-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%9D%98-%EC%9D%B4%ED%95%B4-callback%ED%95%A8%EC%88%98-promise-async-await)
- [콜백함수의 정확한 의미는 무엇일까?](https://satisfactoryplace.tistory.com/18)
- [Callback 함수란 무엇인가?](https://dalkomit.tistory.com/65)
- [콜백 함수 사용 방법](https://koonsland.tistory.com/159)

async, await
- [Promise와 async/await 차이점](https://velog.io/@pilyeooong/Promise%EC%99%80-asyncawait-%EC%B0%A8%EC%9D%B4%EC%A0%90)

Promise
- [Promise와 async/await 차이점](https://velog.io/@pilyeooong/Promise%EC%99%80-asyncawait-%EC%B0%A8%EC%9D%B4%EC%A0%90)
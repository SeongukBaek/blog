---
title: "💻 객체지향 생활체조"
description: "백엔드 지식"
date: 2022-03-11
update: 2022-03-14
tags:
  - Java
  - 객체지향
series: "💻 BackEnd"
---

<em>프로젝트를 수행하면서 객체 지향 생활 체조 9가지 원칙에 대해 알게 되었다. 각각을 예시를 통해 이해하고자 정리한다.</em>

## 💡 1. 메소드당 들여쓰기는 한 번만 사용한다.
한 메소드안에 들여쓰기가 여러 번 되어 있다면, 해당 메소드는 여러 가지 일을 하고 있다고 봐도 무방하다. 메소드는 가능한 작게 쪼개어 역할을 분담하는 것이 재사용성도 높고 디버깅에 용이하기에, 메소드 안의 들여쓰기를 최소한으로 하고, 여러 개의 메소드로 추출해 나누는 것이 좀 더 효율적인 프로그래밍이 될 것이다.

```java
public class Example {
  String makeString() {
    int N = 5;
    int M = 3;
    StringBuilder sb = new StringBuilder();

    for (int i = 0; i < N; i++) {
      for (int j = 0; j < M; j++) {
        sb.append("Something append");
        sb.append("!!!");
      }
      sb.append("\n");
    }

    return sb.toString();
  }
}
```

위와 같이 들여쓰기가 두 번 이상 들어간 코드를 아래와 같이 메소드로 추출하여 좀 더 직관적이게 변경할 수 있다.

```java
public class Example {
  String makeString() {
    int N = 5;
    int M = 3;
    StringBuilder sb = new StringBuilder();

    newLineAppend(sb, N, M);

    return sb.toString();
  }

  private void newLineAppend(StringBuilder sb, int N, int M) {
    for (int i = 0; i < N; i++) {
      somethingAppend(sb, M);
      sb.append("\n");
    }
  }

  private void somethingAppend(StringBuilder sb, int M) {
    for (int j = 0; j < M; j++) {
      sb.append("Something append");
      sb.append("!!!");
    }
  }
}
```

> 사실 위의 예제는 뭔가 어거지로 한 거 같아서 ... 다음에 프로젝트 코드 리팩토링을 하게 되면 참고해야겠다.

## 💡 2. else 키워드를 쓰지 않는다.
이 내용은 [자바 웹 프로그래밍 Next Step - 박재성]을 읽으면서 한 번 접했던 내용이다. 조건문은 복제의 원인이 되기도 하고 가독성도 좋지 못하다. 객체지향 언어는 다형성을 이용해 복잡한 조건문을 처리할 수 있고, 간단한 경우라면 조기 반환(early return)과 보호절(guard clause)을 사용해 처리할 수 있다.

> 해당 원칙을 접하기 전에는 `else` 키워드를 사용하는 코드에 대해 별다른 생각이 없었던 것 같다. '해당 조건이 아닌 경우는 다 이걸로 처리해야지' 하고 사용했던 것 같다.

```java
public class Example {
  String exampleStatus(int score, boolean check) {
    String result = "";
    if (score > 10) {
      result = "YES!";
    } else {
      if (check) {
        result = "SOSO";
      } else {
        result = "BAD...";
      }
    }
    return result;
  }
}
```

```java
public class Example {
  String exampleStatus(int score, boolean check) {
    if (score > 10) {
      return "YES!";
    }
    return check ? "SOSO" : "BAD...";
  }
}
```

## 💡 3. 모든 원시값과 문자열을 Wrap한다.
일반적으로 프로그래밍에서 사용되는 원시값들은 값의 정의만 가질 뿐 다른 의미를 지니지는 못한다. 이때 Wrap을 통해 이름을 가질 수 있게 하여, 어떤 것을 표현하고, 왜 쓰이는지에 대한 정보를 전달할 수 있게끔 한다.

```java
String say = "Hello";
```

```java
public class SeongUk {
  String say = "Hello";
}
```

위와 같이 클래스를 사용해 `String` 타입의 원시값을 감싸서 표현했다. 첫 코드보다는 좀 더 명확한 의미를 가지고 있다.

> 처음에는 이게 무슨 의미인가..를 고민했는데, 예시를 보고 바로 와닿았다. 

## 💡 4. 한 줄에 점을 한 번만 사용한다.
이 원칙은 디미터의 법칙 - "Don't talk to stranger", 즉 친구하고만 말하라는 의미를 가진다. 한 줄에 점이 하나 이상인 경우는 한 가지 이상의 일을 하고 있다는 의미이다. 단순히 여러 일을 한다는 것일 수 있지만, 연쇄적으로 호출되는 형태인 경우 **강한 결합도**를 가지고 있다는 것을 뜻하게 된다.

```java
public class Post {
  ...

  User user;
}

public class User {
  ...

  String name;
}

public class PostViewer {
  ...

  String postPrintUserName() {
    StringBuffer sb = new StringBuffer();

    for (Post post : posts) {
      sb.append(post.user.name);
    }
    
    return sb.toString();
  }
}
```

강한 결합도를 가진 예시이다. `PostViewer` 는 `Post` 를 통해야지만 `User` 에 접근해 `name` 을 사용할 수 있다.

```java
public class Post {
  ...

  User user;

  void addTo(StringBuffer sb) {
    user.addTo(sb);
  }
}

public class User {
  ...

  public String name;

  void addTo(StringBuffer sb) {
    sb.append(name);
  }
}

public class PostViewer {
  ...

  String postPrintUserName() {
    StringBuffer sb = new StringBuffer();

    for (Post post : posts) {
      post.addTo(sb);
    }
    
    return sb.toString();
  }
}
```

이처럼 자신이 알고 있는 객체하고만 소통하게 만듦으로써,
- 한 객체가 알아야 하는 다른 객체의 수를 최소화하고
- 결합도를 약하게 만들어 종속성을 최소화한다.

> 어떻게 보면, 1번 원칙과 비슷한 흐름인 것 같다. 

## 💡 5. 줄여쓰지 않는다.
보통 프로그래밍하면서 변수 이름이나 메소드 이름을 축약해서 적는 경우가 많았다. 자주 쓰는 `cnt` , `num` 과 같은 변수명들은 금방 의미를 파악할 수 있지만, 어떻게 네이밍을 해야 하나 고민하는데 시간을 들이는 경우도 종종 있었다.

이 원칙이 줄여쓰지 말라하는 이유는 내가 종종 고민했던 경우들을 피하기 위함이다. 즉, **줄여써서 이름을 짓는 방법은 혼돈을 야기시키기에 사용하지 말라**는 의미이다.

의미전달뿐 아니라, 이름이 길어진다는 것은 **객체가 가져야 할 책임의 소재가 잘못 전가되었다거나 상황에 알맞은 객체의 부재**를 나타낼 수도 있다. 

> 이 원칙은 지금 당장에도 적용시킬 수 있을만큼 중요한 것 같다.

## 💡 6. 모든 Entity를 작게 유지한다.
이 원칙은 **50줄 이상 되는 클래스와 10개 이상의 파일들을 가지는 패키지는 없어야 한다**는 의미이다. 그말인즉슨, 한 객체가 한 가지 이상의 일을 하지 못하게끔 하라는 의미인 것 같다. 작게 유지하려 할 수록, 한 가지의 목표만을 가지게 할 수 있기 때문이다.

> 하지만 실제 개발을 하다보면, 이 원칙을 적용하지 못하는 경우가 종종 발생할 것 같다.

## 💡 7. 2개 이상의 인스턴스 변수를 가진 클래스를 쓰지 않는다.
대부분의 클래스가 하나의 상태 변수를 처리하는 일을 맡는 것이 마땅하지만 몇몇 경우 두 개 이상이 필요할 때가 있다. 이를 위해 새로운 인스턴스 변수를 추가하는 것은 **클래스의 응집도를 떨어뜨리는 일**이다.

새로운 인스턴스 변수를 추가하는 것이 아닌 협력 객체의 계층구조로 분해해 더 직접적으로 효율적인 객체 모델을 구현할 수 있도록 한다.

> 하나의 객체는 한 가지의 책임만을 수행한다와 3번 원칙이 합쳐진 개념인 것 같다.

## 💡 8. 1급 컬렉션을 사용한다.
먼저 1급 컬렉션이란, `Collection` 을 Wrapping하면서 그 외 다른 멤버 변수가 없는 상태를 일컫는다. 아래의 예시를 통해 감을 잡을 수 있을 것이다.

```java
Map<String, String> map = new HashMap<>();
map.put("1", "A");
map.put("2", "B");
map.put("3", "C");

// wrapping

public class Ranking {
  private Map<String, String> ranks;

  public Ranking(Map<String, String> ranks) {
    this.ranks = ranks;
  }
}
```

그리고 이 원칙은 **컬렉션을 포함한 클래스는 반드시 다른 멤버 변수가 없어야 한다**는 원칙이다. 각 컬렉션은 그 자체로 포장되어 있기에 컬렉션과 관련된 동작의 근거지가 마련된 것이다. 

> 이 원칙은 잘 이해가 되지 않는다...

## 💡 9. getter/setter/property를 쓰지 않는다.
이 원칙은 "묻지 말고 말을 해(Tell, don't ask)"로 대변된다. 즉, 객체의 상태를 가져오는 접근자를 사용하는 것은 허용되지만, 객체 외부에서 그 결과값을 사용해 객체에 대한 결정을 내리는 것은 안된다는 의미이다. (한 객체의 상태에 대한 결정은 반드시 그 객체 내부에서만 이뤄져야 한다.)
- 그래서 getter/setter가 이를 위배하게 하고, 이는 곧 **개방폐쇄 원칙을 위배**하게 된다.

> 쉽게 말해, 객체 외부에서 객체 내부의 값을 변경하도록 하는 것이 아닌, 객체 외부에서는 "이 값 좀 이걸로 수정해줘" 라고 말하고, 객체 내부에서는 그 요청에 대한 처리를 수행하면 될 것 같다.
> - `setter` 로 외부에서 값을 수정하지 말고, `updateValue()` 와 같은 메소드를 생성해 수정할 값을 넘겨주는 방식!

## 📕 참고
- [객체지향 생활 체조 원칙 9가지(from 소트웍스 앤솔러지)](https://jamie95.tistory.com/99)
- [객체지향 생활 체조](https://developerfarm.wordpress.com/2012/01/27/object_calisthenics_3/)
- [객체지향 생활 체조](https://7942yongdae.tistory.com)
- [1급 컬렉션](https://jojoldu.tistory.com/412)
- [9번째 원칙](https://devwooks.tistory.com/59)
---
title: "💬 Overloading vs. Overriding"
description: "개발 상식"
date: 2022-05-20
update: 2022-05-20
tags:
  - 개발상식
  - Java
  - 오버로딩
  - 오버라이딩
series: "💬 면접"
---

## 🧷 Overloading
이름은 같지만, 파라미터 수, 타입은 다른 메소드를 중복으로 선언하는 것을 말한다.
- 같은 메소드라도 매개변수만 다르다면 얼마든지 정의하고 사용할 수 있다.

### 🗝 특징
1. 메소드 이름이 같아야 한다.
2. 반환형이 같아도 되고, 달라도 된다.
3. 파라미터의 개수가 달라야 한다.
4. 파라미터의 개수가 같을 경우, 데이터 타입이 달라야 한다.

```java
public class OverloadingTest {
  void test() {
    System.out.println("매개변수 없음");
  }

  void test(int a, int b) {
    System.out.println("매개변수 " + a + "와 " + b);
  }

  void test(double d) {
    System.out.println("매개변수" + d);
  }
}

public class OverloadingExample {
  public static void main(String[] args) {
    OverloadingTest ob = new OverloadingTest();

    // 매개변수 없음
    ob.test();

    // 매개변수 10와 20
    ob.test(10, 20);

    // 매개변수 50.0
    ob.test(50);

    // 매개변수 123.4
    ob.test(123.4);
  }
}
```

---

## 🧷 Overriding
부모 클래스의 메소드의 동작 방법을 재정의하여 우선적으로 사용하는 것을 말한다.
- 상속 관계에 있는 클래스 간에 같은 이름의 메소드를 정의하는 기술이다.
- 자식 클래스가 부모 클래스에서 선언된 것과 같은 메소드를 가질 때, 메소드 오버라이딩이라 한다.
- 하나의 코드로 여러 객체를 처리할 수 있다.

### 🗝 특징
1. 오버라이드하고자 하는 메소드가 상위 클래스에 존재해야 한다.
2. 메소드 이름이 같아야 한다.
3. 메소드의 파라미터 개수, 데이터 타입이 같아야 한다.
4. 메소드의 반환형이 같아야 한다.
5. 상위 메소드와 동일하거나 내용이 추가되어야 한다.

```java
public class People {
  public String name;
  public int age;

  public void print() {
    System.out.println("이름은 " + this.name + "이고, 나이는 " + this.age + "입니다.");
  }
}

public class Student extends People {
  String job;

  public void print() {
    System.out.println("이름은 " + this.name + "이고, 나이는 " + this.age + "입니다.");
    System.out.println(this.name + "은 " + this.job + "입니다.");
  }
}

public class OverridingExample {
  public static void main(String[] args) {
    Student st = new Student();

    st.name = "BAEK";
    st.age = 25;
    st.job = "취준생";

    st.print();
    // 이름은 BAEK이고, 나이는 25입니다.
    // BAEK은 취준생입니다.
  }
}
```

> **Overloading**은 한 클래스 내에, 여러 개의 같은 이름의 메소드를 정의하는 것으로, 메소드의 이름을 동일하게 만들어 프로그램의 가독성을 증가시킬 수 있다.<br/>
> **Overriding**은 부모로부터 받은 메소드의 로직을 변경시키는 것으로, 객체지향 언어의 특징인 다형성 중 하나이다.

## 📕 참고
- [overloading vs. overriding](https://brunch.co.kr/@kimkm4726/2)
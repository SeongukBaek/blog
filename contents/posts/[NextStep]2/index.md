---
title: "📖 2장 문자열 계산기 구현을 통한 테스트와 리팩토링"
description: "자바 웹 프로그래밍 책 정리"
date: 2022-01-24
update: 2022-01-24
tags:
  - Java
  - Refactoring
  - Framework
series: "📖 자바 웹 프로그래밍 Next Step"
---

<em>[자바 웹 프로그래밍 Next Step - 박재성]을 읽고 인용하고 정리하는 POST입니다.</em>

> **"테스트와 리팩토링은 개발자가 갖추어야 할 중요한 역량이다."**

## 🚩 main() 메소드를 활용한 테스트의 문제점
일반적인 테스트 방법은 `main()` 메소드를 활용해 우리가 의도한 결과 값이 정상적으로 출력되는지를 콘솔을 통해 확인하는 것이다.

```java
public class Calculator {
    int add (int x, int y) {
        return x + y;
    }
    int subtract (int x, int y) {
        return x - y;
    }
    int multiply (int x, int y) {
        return x * y;
    }
    int divide (int x, int y) {
        return x / y;
    }

    public static void main(String[] args) {
        Calculator cal = new Calculator();

        System.out.println(cal.add(3,4));
        System.out.println(cal.subtract(5,4));
        System.out.println(cal.multiply(2,6));
        System.out.println(cal.divide(8,4));
    }
}
```

### 🔧 계산기 코드
- 실제 서비스를 담당하는 프로덕션 코드(production code)와 이 프로덕션 코드가 정상 동작하는지 확인하는 `main()` 으로 나뉜다.
  - 일반적으로 `main()` 은 **프로그래밍을 실행하기 위한 목적**과 **프로덕션 코드가 정상 동작하는지 확인하기 위한 목적**으로 나뉜다.

**🧭 코드의 문제점!**
- 프로덕션 코드와 테스트 코드(`main()` 메소드)가 같은 클래스에 위치하고 있다.
   - 테스트 코드의 경우 테스트 단계에서만 필요하므로 굳이 서비스하는 시점에 같이 배포할 필요가 없다. 
   - 따라서 문제 해결을 위해 **프로덕션 코드(`Calculator` 클래스)와 테스트 코드(`CalculatorTest`)를 분리**한다.

```java
public class CalcultorTest {
    public static void main(String[] args) {
        Calculator cal = new Calculator();

        System.out.println(cal.add(3,4));
        System.out.println(cal.subtract(5,4));
        System.out.println(cal.multiply(2,6));
        System.out.println(cal.divide(8,4));
    }
}
```

- 테스트를 담당하는 별도의 클래스를 추가했지만 `main()` 메소드 하나에 프로덕션 코드의 여러 메소드를 동시에 테스트하고 있다.
  - 프로덕션 코드의 복잡도가 증가할수록, `main()` 메소드의 복잡도도 증가하게 되고, 이는 결과적으로 **`main()` 메소드 유지에 부담**이 된다.

> 함수 유지 보수를 위해 테스트 코드를 각 메소드별 분리

```java
public class CalcultorTest {
    public static void main(String[] args) {
        // main에서는 함수 호출만 수행
        Calculator cal = new Calculator();

        add(cal);
        subtract(cal);
        multiply(cal);
        divide(cal);
    }

    private static void divide(Calculator cal) {
        System.out.println(cal.divide(8,4));
    }
    private static void multiply(Calculator cal) {
        System.out.println(cal.multiply(2,6));
    }
    private static void subtract(Calculator cal) {
        System.out.println(cal.subtract(5,4));
    }
    private static void add(Calculator cal) {
        System.out.println(cal.add(3,4));
    }
}
```

- 이 또한 개발자가 프로그래밍하는 과정을 살펴보면, 2가지 이유에서 결국 최종적인 해결책이 될 수 없음을 알 수 있다.
  - 클래스가 가지고 있는 모든 메소드에 관심이 있는 것이 아니라 **현재 내가 구현하는 메소드에만 집중**하고 싶다.
  - 하지만 위 테스트 코드는 `Calculator` 클래스의 모든 메소드를 테스트할 수 밖에 없다.
  - 그렇다고 다른 메소드를 주석 처리하는 것 또한 불합리적이다.
- 또 다른 문제점은, 테스트 결과를 매번 콘솔에 출력되는 값을 통해 **수동으로 확인**해야 한다는 것이다.
  - 로직이 간단한 경우에는 결과 값을 쉽게 예측할 수 있다.
  - 하지만 로직의 복잡도가 높은 경우, 후에 결과 값을 예측하는 것은 매우 번거롭고, 시간이 걸리는 작업일 것이다.

`main()` 메소드를 활용한 테스트의 이 같은 문제점을 해결하기 위해 등장한 라이브러리가 **`JUnit`** 이다. 
- 이는 **내가 관심 가지는 메소드에 대한 테스트만 가능**하고 로직 실행 후의 **결과 값 확인을 프로그래밍을 통해 자동화**하는 것이 가능하다.

### 🔧 JUnit을 활용해 main() 메소드 문제점 극복
[JUnit](http://junit.org)은 단위 테스트 프레임워크 중 하나이다. 사용하기 쉽고 학습 비용이 낮은 라이브러리이다.

**🧭 첫 번째 문제 해결, 한 번에 메소드 하나에만 집중**

```java
import org.junit.Test;

public class CalculatorTest {

    @Test
    public void add() {
        Calculator cal = new Calculator();
        System.out.println(cal.add(6,3));
    }
}
```

- **JUnit**은 테스트 메소드에 `@Test` annotation을 추가한다. (테스트 메소드로 인식하기 위함!)
- 위와 같은 방법으로 다른 메소드 코드도 작성한다. 
- **JUnit** 기반으로 테스트 코드를 구현하면 `CalculatorTest` 클래스가 가지는 전체 메소드를 한 번에 실행할 수도 있으며, 메소드 각각을 실행할 수도 있다.
  - 다른 메소드에 영향을 받지 않고 구현 중인 프로덕션 코드에 집중할 수 있다.

> "**중요한 것은, 테스트 코드는 작성한 순서대로 실행되지 않는다!**"

**🧭 두 번째 문제 해결, 결과 값을 눈이 아닌 프로그램을 통해 자동화**
- `main()` 메소드의 두 번째 문제점은 실행 결과를 눈으로 직접 확인해야 한다는 것이다. **JUnit**은 이 문제점 극복을 위해 `assertEquals()` 메소드를 제공한다.

```java
import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class CalculatorTest {

    @Test
    public void add() {
        Calculator cal = new Calculator();
        assertEquals(9, cal.add(6,3));
    }

    @Test
    public void subtract() {
        Calculator cal = new Calculator();
        assertEquals(3, cal.subtract(6,3));
    }
}
```

- `assertEquals` 는 static 메소드이므로 `import static` 으로 메소드를 import하여 사용해야 한다.
- 메소드의 첫 번째 인자는 **기대하는 결과값(expected)** 이고, 두 번째 인자는 프로덕션 코드의 **메소드를 실행한 결과값(actual)** 이다.
- `int`, `long`, `String` 등 다양한 데이터 타입을 지원한다.
- 테스트가 실패한 경우는 아래 상태창에서 실패 원인을 확인할 수 있다.

**JUnit**의 `assertEquals()` 메소드를 활용하면 실행 결과를 자동화하는 것이 가능하다. **JUnit**의 `Assert` 클래스는 이외에도 다음과 같은 메소드를 제공한다.
- 결과 값의 T/F 유무를 확인하는 `assertTrue()`, `assertFalse()`
- 결과 값의 null 유무를 판단하는 `assertNull()`, `assertNotNull()`
- 배열 값이 같은지 검증하는 `assertArrayEquals()`

**🧭 테스트 코드 중복 제거**

> **"개발자가 가져야 할 좋은 습관 중 하나는 중복 코드를 제거하는 것이다."**

앞서 구현한 `CalculatorTest` 클래스에서, `Calculator` 인스턴스를 생성하는 부분에서 중복이 발생한다. 이러한 중복을 다음과 같이 제거할 수 있다.

```java
public class CalculatorTest {
    private Calculator cal = new Calculator();

    @Test
    public void add() {
        assertEquals(9, cal.add(6,3));
    }

    @Test
    public void subtract() {
        assertEquals(3, cal.subtract(6,3));
    }
}
```

- 이러한 방식은 자바 문법에 있어 아무런 문제가 되지 않지만, **JUnit**은 테스트를 실행하기 위한 초기화 작업을 이렇게 하지 않고 `@Before` annotation을 활용하는 것을 추천한다.

```java
import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

public class CalculatorTest {
    private Calculator cal;

    @Before
    public void setup() {
        cal = new Calculator();
    }
    @Test
    public void add() {
        assertEquals(9, cal.add(6,3));
    }

    @Test
    public void subtract() {
        assertEquals(3, cal.subtract(6,3));
    }
}
```

- 이와 같이 `@Before` annotation을 활용하여도 각 단위 테스트를 실행할 때마다 `Calculator` 인스턴스를 생성하는 것은 같다.
  - 이렇게 매 테스트마다 `Calculator` 인스턴스를 생성하는 이유는 **특정 테스트 메소드를 실행할 때, `Calculator` 의 상태 값이 변경되어 다음 메소드에 영향을 미칠 수 있기 때문**이다.
  - 다음 테스트 메소드에 영향을 미치게 되면, 테스트 실행 순서나 `Calculator` 의 상태 값에 따라 테스트의 성공 여부가 달라질 수 있다.

그럼에도 코딩량이 더 많아 구현 비용이 큰 `@Before` annotation을 사용하는 이유는 다음과 같다.
- **JUnit**에는 `@RunWith`, `@Rule` 같은 annotation을 사용해 기능을 확장할 수 있는데, `@Before` 안이어야만 해당 annotation에서 초기화된 객체 접근할 수 있기 때문이다.
- 따라서, 가능한 `@Before` annotation을 사용해 테스트 메소드에 대한 초기화 작업을 하는 것이 문제 발생의 가능성을 낮춰준다.

`@Before` annotation과 비슷하게, `@After` annotation으로 메소드 실행이 끝난 후 후처리 작업을 담당하는 annotation도 존재한다.

### 🔧 문자열 계산기 요구사항 및 실습
**요구사항**: 전달하는 문자를 구분자로 분리한 후 각 숫자의 합을 구해 반환해야 한다.
- 쉼표 또는 콜론을 구분자로 가지는 문자열을 전달하는 경우 구분자를 기준으로 분리한 각 숫자의 합을 반환
- 위의 기본 구분자 외에 Custom 구분자를 지정할 수 있다. Custom 구분자는 문자열 앞부분의 "//"와 "\n" 사이에 위치하는 문자로 사용
- 문자열 계산기에 음수를 전달하는 경우 `RuntimeException` 으로 예외 처리

간단해보이지만 구현을 바로 시작하지 않고, 요구사항을 더 작은 단위로 나눠 테스트할 경우의 수를 분리해본다.

**🧭 요구사항 분리 및 각 단계별 힌트**
- 최대한 힌트 없이 진행 !

**🧭 추가 요구사항**
- 요구사항을 만족하는 코드를 구현했다고 해서 개발이 완료된 것은 아니다. 구현 완료 이후, **중복 제거 & 읽기 좋은 코드 구현을 위한 리팩토링(구조 변경)**이 이뤄져야 한다.

> **리팩토링**
> : 소스코드의 가독성을 높이고 유지보수를 편하게 하기 위해 소스코드의 구조를 변경하는 것을 의미한다. 리팩토링을 하더라도 기능상의 결과가 변경되는 것은 아니다.

다음은 **추가적인 요구사항**이다.
- 메소드가 한 가지 책임만 가지도록 구현한다.
- indent(들여쓰기) 깊이를 1단계로 유지한다. 
- `else` 를 사용하지 마라.
  
위 3가지 원칙을 제시하는 이유는 "**소스코드를 최대한 깔끔하게 구현할 것을 요구하기 위함**"이다. 초보 프로그래머의 경우, 구현에 있어 막막한 경우가 많다. 이러한 막막함을 해소하기 위해 위 3가지 원칙을 제시한다. (물론 무조건 위 원칙을 지킬 수는 없지만, 최대한 지키도록 노력하면 좀 더 깔끔한 코드를 작성할 수 있을 것이다.)

### 🔧 테스트와 리팩토링을 통한 문자열 계산기 구현
요구사항의 복잡도가 높을 수록, 당연히 구현의 복잡도가 증가할 수밖에 없다. 하지만 개발자라면 이러한 복잡도와 평생 부대끼며 살아가야 한다. 

그렇다면 이 복잡도를 낮출 수 있는 방법을 찾아야 하지 않겠는가. 그 방법 중 하나가 끊임없는 리팩토링을 통해 소스코드를 깔끔하게 구현하는 연습을 하는 것이다.

**🧭 요구사항을 작은 단위로 나누기**
- 복잡한 문제를 풀기 위한 첫 번째 작업은 "**복잡한 문제를 작은 단위로 나눠 좀 더 쉬운 문제로 변형**"하는 것이다. 하지만 이러한 작업은 쉽지 않기에 다양한 문제를 해결함으로써 연습하는 수밖에 없다.

**🧭 모든 단계의 끝은 리팩토링**
- 소스코드의 복잡도가 쉽게 증가하는 이유는 "**하나의 요구사항을 완료한 후 리팩토링을 하지 않은 상태에서 다음 단계로 이동**"하기 때문이다. 다음 단계로 넘어가기 위한 마지막 작업은 **결과를 확인한 후 리팩토링까지 완료**하는 것이다.

**🧭 문자열 계산기 구현**
- **빈 문자열 또는 null 값을 입력할 경우 0을 반환해야 한다.** (ex. `""` => `0`, `null` => `0`)

`StringCalculator.java`
```java
public class StringCalculator {
    public int add(String text) {
        if (text == null || text.isEmpty()) {
            return 0;
        }

        return 0;
    }

    public static void main(String[] args) {
        StringCalculator cal = new StringCalculator();
    }
}
```

`StringCalculatorTest.java`
```java
import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

public class StringCalculatorTest {
    private StringCalculator cal;

    @Before
    public void setup() {
        cal = new StringCalculator();
    }
    
    @Test
    public void add_null_또는_빈문자() {
        assertEquals(0, cal.add(null));
        assertEquals(0, cal.add(""));
    }
}
```

- 구현에 있어 특별한 점은 없지만, 한 가지 눈여겨 볼 것은 테스트 메소드 이름에 **한글**을 사용했다는 것이다. 테스트 메소드의 정확한 의미 전달을 위해 한글로 작성할 수도 있다.


**🧭 숫자 하나를 문자열로 입력할 경우 해당 숫자를 반환한다.** (ex. "1" => 1)

`StringCalculator.java`
```java
public class StringCalculator {
    public int add(String text) {
        if (text == null || text.isEmpty()) {
            return 0;
        }

        return Integer.parseInt(text);
    }

    public static void main(String[] args) {
        StringCalculator cal = new StringCalculator();
    }
}
```

`StringCalculatorTest.java`
```java
import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

public class StringCalculatorTest {
    ...

    @Test
    public void add_숫자하나() throws Exception {
        assertEquals(1, cal.add("1"));
    }
}
```

**🧭 숫자 두 개를 쉼표 구분자로 입력할 경우 두 숫자의 합을 반환한다.** (ex. "1,2" => 3)

`StringCalculator.java`
```java
public class StringCalculator {
    public int add(String text) {
        if (text == null || text.isEmpty()) {
            return 0;
        }

        if (text.contains(",")) {
            String[] values = text.split(",");
            int sum = 0;
            for (String value : values) {
                sum += Integer.parseInt(value);
            }
            return sum;
        }

        return Integer.parseInt(text);
    }

    public static void main(String[] args) {
        StringCalculator cal = new StringCalculator();
    }
}
```

`StringCalculatorTest.java`
```java
import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

public class StringCalculatorTest {
    ...

    @Test
    public void add_쉼표구분자() throws Exception {
        assertEquals(3, cal.add("1,2"));
    }
}
```

- 위와 같은 로직을 구현할 때 보통 `if`, `else if`, `else` 형태로 구현하는 것이 일반적이지만 3가지 원칙 중 하나인 "else를 가능한 사용하지 말라"에 따라 `else` 를 사용하지 않고 구현했다.

구현 완료 후 테스트까지 정상적으로 작동했다. 이제는 리팩토링을 할 차례이다. 
- 첫 번째로, "**숫자가 하나인 경우**와 **쉼표 구분자를 포함하는 경우**를 따로 분기해서 처리해야 한다"는 점이다.
- `String` 의 `split()` 메소드에 숫자 하나를 가지는 문자열을 전달했을 때, 숫자 하나가 담긴 `String[]` 을 반환한다면 해당 부분의 `if` 문을 제거할 수 있을 것 같다.

`SplitTest.java`
```java
import static org.junit.Assert.*;

import org.junit.Test;

public class SplitTest {
    @Test
    public void split() {
        assertArrayEquals(new String[] {"1"}, "1".split(","));
        assertArrayEquals(new String[] {"1","2"}, "1,2".split(","));
    }
}
```

`StringCalculator.java`
```java
public class StringCalculator {
    public int add(String text) {
        if (text == null || text.isEmpty()) {
            return 0;
        }

        String[] values = text.split(",");
        int sum = 0;
        for (String value : values) {
            sum += Integer.parseInt(value);
        }
        return sum;
    }

    public static void main(String[] args) {
        StringCalculator cal = new StringCalculator();
    }
}
```

- `SplitTest` 의 테스트 코드가 정상적으로 동작하므로, 위와 같이 리팩토링했다.
- `if` 절 하나를 제거해 더 깔끔하게 만들었다. 
- 하지만 `add()` 메소드의 복잡도가 증가하고 있어 **숫자의 합을 구하는 부분을 별도의 메소드로 분리**할 수 있을 것 같다.

```java
public class StringCalculator {
    public int add(String text) {
        if (text == null || text.isEmpty()) {
            return 0;
        }

        String[] values = text.split(",");
        return sum(values);
    }

    private int sum(String[] values) {
        int sum = 0;
        for (String value : values) {
            sum += Integer.parseInt(value);
        }
        return sum;
    }

    public static void main(String[] args) {
        StringCalculator cal = new StringCalculator();
    }
}
```

- "각 메소드가 하나의 책임만 수행하고 있는가?" 질문에 대해 생각해보면, 새로 분리한 `sum()` 메소드가 **문자열 배열을 숫자로 변환하는 작업**과 **숫자 배열의 합을 구하는 작업**을 하고 있음을 알 수 있다.
- 따라서 다음과 같이 분리한다.

```java
public class StringCalculator {
    public int add(String text) {
        if (text == null || text.isEmpty()) {
            return 0;
        }

        String[] values = text.split(",");
        return sum(toInts(values));
    }

    private int[] toInts(String[] values) {
        int[] numbers = new int[values.length];
        for (int i = 0; i < values.length; i++) {
            numbers[i] = Integer.parseInt(values[i]);
        }
        return numbers;
    }
    
    private int sum(int[] numbers) {
        int sum = 0;
        for (int number : numbers) {
            sum += number;
        }
        return sum;
    }

    public static void main(String[] args) {
        StringCalculator cal = new StringCalculator();
    }
}
```
 
- 소스 코드 복잡도가 감소하는 것이 아니라 오히려 복잡해진 느낌이다. 이는 그저 연습이기 때문이다.
  - 실제 프로젝트에서 모든 소스코드에 대해 이 같은 리팩토링을 진행할 수 없다. 하지만 이런 작은 코드에서 극단적으로 리팩토링을 하는 연습을 통해 실제 프로젝트에서 리팩토링할 부분을 더 쉽게 찾아 수행할 수 있다.
- 리팩토링한 후 주의 깊게 봐야할 부분은 `private` 로 분리한 메소드가 아닌 `public` 으로 공개하고 있는 `add()` 메소드가 얼마나 읽기 쉽고, 좋은가이다. 
  - 좀 더 극단적으로 리팩토링한다면 `text == null || text.isEmpty()` 또한 다른 메소드로 추출할 수도 있다.
  - 이와 같이 극단적으로 리팩토링하여 소스코드를 읽을 때 해당 메소드가 어떤 작업을 수행하는지를 최대한 쉽게 파악할 수 있을 것이다. 세부 구현은 `private` 메소드로 분리하고 `add()` 메소드가 무슨 일을 하는 지 글로 표현해보면 "text 값이 비어 있으면 0을 반환, 비어있지 않으면 구분자로 분리, 숫자로 변환한 다음 이 숫자의 합을 구한다." 로 파악할 수 있다.

> "세부 구현에 집중하도록 하지 않고 논리적인 로직을 쉽게 파악할 수 있도록 구현하는 것이 읽기 좋은 코드라 생각한다."

**🧭 구분자를 쉼표 이외에 콜론을 사용할 수 있다.** (ex. "1,2:3" => 6)

```java
import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

public class StringCalculatorTest {
    ...
    
    @Test
    public void add_쉼표_또는_콜론_구분자() throws Exception {
        assertEquals(6, cal.add("1,2:3"));
    }
}
```

```java
public class StringCalculator {
    public int add(String text) {
        if (isBlank(text))
            return 0;

        return sum(toInts(split(text)));
    }

    private String[] split(String text) {
        return text.split(",|:");
    }
    ...
}
```

- 상당히 작은 부분이 수정되었다.

**🧭 "//"와 "\n" 문자 사이에 Custom 구분자를 지정할 수 있다.** ex."//;\n1;2;3" => 6

```java
@Test
public void add_custom_구분자() throws Exception {
    assertEquals(6, cal.add("//;\n1;2;3"));
}
```

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringCalculator {
    public int add(String text) {
        if (isBlank(text)) {
            return 0;
        }

        return sum(toInts(split(text)));
    }

    private String[] split(String text) {
        Matcher m = Pattern.compile("//(.)\n(.*)").matcher(text);
        if (m.find()) {
            String customDelimeter = m.group(1);
            return m.group(2).split(customDelimeter);
        }
        
        return text.split(",|:");
    }
}
```

- Custom 구분자는 정규 표현식을 이용해 문자열을 분리하고 있다. 이를 활용해 복잡한 문자열에서 원하는 문자열을 찾거나 특정한 패턴을 찾을 수 있다.

**🧭 문자열 계산기에 음수를 전달하는 경우 RuntimeException 예외를 throw**

```java
@Test(expected = RuntimeException.class)
public void add_negative() throws Exception {
    cal.add("-1,2,3");
}
```

- **JUnit**에서 **기대하는 결과 값이 예외**인 경우 `@Test` annotation의 `expected` 속성에 기대하는 `Exception` 클래스를 전달할 수 있다.

```java
...
private int[] toInts(String[] values) {
    int[] numbers = new int[values.length];
    for (int i = 0; i < values.length; i++) {
        numbers[i] = toPositive(values[i]);
    }
    return numbers;
}

private int toPositive(String value) {
    int number = Integer.parseInt(value);
    if (number < 0) {
        throw new RuntimeException();
    }
    return number;
}
...
```

- 요구사항이 변경되면서 메소드의 이름, 변수 이름을 변경하는 것 또한 리팩토링의 중요한 부분이다. 

**🧭 각 단계의 개발과정**
- 구현 => 테스트를 통해 결과 확인 => 리팩토링
- 개발자들이 소홀히 하는 부분이 리팩토링이다. 하지만 깔끔하고 읽기 좋은 코드를 구현하기 위해 개발자가 갖추어야 할 중요한 역량이므로 꾸준한 연습이 필요하다.

**🧭 3가지 원칙**
- 가능한 위에서 언급한 3가지 원칙을 지키도록 노력하자.
- 리팩토링할 부분을 찾기 힘들 때, 3가지 원칙을 생각하면서 찾는다면 약간의 힌트는 얻을 수 있을 것이다.

**🧭 극단적인 리팩토링**
- 프로덕션 코드를 변경하더라도 바로바로 테스트 코드로 검증이 가능했기에 극단적인 리팩토링이 가능했다. 
- 실제 프로젝트에서도, 리팩토링을 통해 소스코드의 개선을 원한다면, 테스트 코드가 뒷받침되어야 한다.

> **"테스트와 리팩토링은 분리할 수 없는 동반자 관계이고 같이 연습해야 한다."**

## 📕 출처
**자바 웹 프로그래밍 Next Step : 하나씩 벗겨가는 양파껍질 학습법** - 박재성
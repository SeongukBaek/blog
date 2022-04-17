---
title: "📃 정규표현식"
description: "java 지식"
date: 2022-04-14
update: 2022-04-14
tags:
  - Java
series: "📃 Java 지식"
---

<em>문자열 알고리즘을 풀 때, 생각보다 유용하게 사용된다고 하는 정규표현식에 대해 간단히 정리해보는 POST</em>

## 📍 정규표현식
컴퓨터 과학의 정규언어로부터 유래한 것으로, 특정한 규칙을 가진 문자열의 집합을 표현하기 위해 쓰이는 형식언어이다.
- 주로 정해져 있는 입력 형식에 맞는지 검증하기 위해 사용한다.

---

## 📍 작성 방법
JAVA API `java.util.regex` 패키지를 사용해야 한다. 해당 패키지에 있는 `Pattern` 클래스와 `Matcher` 클래스를 주로 사용한다.

### 📝 Pattern 클래스
정규 표현식에 대상 문자열을 검증하는 기능은 `Pattern` 클래스의 `matches()` 메소드를 활용해 검증할 수 있다.
- 첫 번째 인자는 정규 표현식이고, 두 번째 인자는 검증 대상 문자열이다.
- 검증 후 정규 표현식과 일치하면 `true` 를 반환한다.

```java
import java.util.regex.Pattern;

public class Example {
  public static void main(String[] args) {
    String pattern = "^[0-9]*$"; // 숫자만
    String val = "123456789";

    boolean regex = Pattern.matches(pattern, val);
    System.out.println(regex);
    // true 출력
  }
}
```

**📌 Pattern 클래스 주요 메소드**
- `compile(String regex)` : 주어진 정규 표현식으로부터 패턴을 생성한다.
- `matcher(CharSequence input)` : 대상 문자열이 패턴과 일치할 경우 `true` 를 반환한다.
- `asPredicate()` : 문자열을 일치시키는데 사용할 수 있는 술어를 작성한다.
- `pattern()` : 컴파일된 정규 표현식을 `String` 형태로 반환한다.
- `split(CharSequence input)` : 문자열을 주어진 인자값 `CharSequence` 패턴에 따라 분리한다.

### 📝 Matcher 클래스
대상 문자열의 패턴을 해석하고 주어진 패턴과 일치하는지 판별할 때 사용한다.
- 입력값으로는 `CharSequence` 라는 인터페이스를 사용하는데, 이를 통해 다양한 형태의 입력 데이터로부터 문자 단위의 매칭 기능을 지원할 수 있다.
- `Matcher` 객체는 `Pattern` 객체의 `matcher()` 메소드를 호출하여 받아올 수 있다.

```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args){
        Pattern pattern = Pattern.compile("^[a-zA-Z]*$"); // 영문자만
        String val = "abcdef";
        Matcher matcher = pattern.matcher(val);
        
        System.out.println(matcher.find());
        // true 출력
    }
}
```

**📌 Matcher 클래스 주요 메소드**
- `matches()` : 대상 문자열과 패턴이 일치할 경우 `true` 를 반환한다.
- `find()` : 대상 문자열과 패턴이 일치하는 경우 `true` 를 반환하고, 그 위치로 이동한다.
- `find(int start)` : `start` 위치 이후부터 매칭 검색을 수행한다.
- `start()` : 매칭되는 문자열 시작 위치를 반환한다.
- `start(int group)` : 지정된 그룹이 매칭되는 시작 위치를 반환한다.
- `end()` : 매칭되는 문자열 끝 다음 문자 위치를 반환한다.
- `end(int group)` : 지정된 그룹이 매칭되는 끝 다음 문자 위치를 반환한다.
- `group()` : 매칭된 부분을 반환한다.
- `group(int group)` : 매칭된 부분 중 `group` 번 그룹핑 매칭 부분을 반환한다.
- `groupCount()` : 패턴 내 그룹핑한 전체 갯수를 반환한다.

### 📝 숫자
위 예제에서는 `[0-9]` 로 표현했지만, 정규 표현식 문법을 사용하면 `\\d` 라는 숫자를 대표하는 정규 표현식으로 표현할 수 있다. (d = digit)

```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\n다스베이더 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\d");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### 📝 글자
`a, b, c, 가, 나, 다, 1, 2, 3` 과 같은 알파벳과 숫자를 포함한 글자를 대표하는 정규 표현식은 `\\w` 이다.
- 특수 문자는 포함하지 않지만, `_` 는 포함한다.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\n다스베이더 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\w");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### 📝 하나 이상
`\\d` 는 숫자를 한 글자만 찾는다. 하지만 전화번호와 같이 붙어있는 경우에 대해서는 어떻게 해야 할까?
- "하나 혹은 그 이상 연결된" 이라는 의미를 가진 `+` 를 사용하여 연결된 숫자에 대해 찾는다.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\n다스베이더 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### 📝 0개 이상
정규 표현식으로 010, 123, 456 중 자연수를 찾으려면 어떻게 해야 할까?
- 0으로 시작하지 않으니 자연수의 첫 자리는 반드시 1 ~ 9 중 하나여야 한다.
- 그 다음 자리부터는 0 ~ 9 사이의 숫자가 나올 수도 있고, 그렇지 않을 수도 있다.

정리하자면 자연수는,
1. 처음에 1 ~ 9 중 하나의 숫자가 나온 다음
2. 그 뒤에는 숫자가 0개 이상 나오면 된다.

`*` 는 "0개 이상" 이라는 의미이다. 따라서, `\\d*` 는 "숫자가 0개 이상이다" 를 의미한다.
- 이를 통해 자연수는 `[1-9]\\d*` 로 표현할 수 있다.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\n다스베이더 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("[1-9]\\d*");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### 📝 있거나 없거나(1)
전화번호는 "-" 를 포함하거나, 포함하지 않을 수 있다. 
- 따라서 전화번호는 연속되는 숫자 3 ~ 4개 사이에 `-` 가 있거나 없다고 표현할 수 있다.

`?` 는 "있거나 없거나" 를 의미한다. 
- `-?` 는 "-가 있거나 없거나" 를 의미한다.
- `\\d+-?\\d+-?\\d+` 로 전화번호를 찾는 정규 표현식을 생성할 수 있다.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\n다스베이더 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\d+-?\\d+-?\\d+");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### 📝 있거나 없거나(2)
위의 예제는 전화번호 사이에 공백이 포함된 경우를 찾을 수 없다. (출력 결과를 보면 다른 전화번호로 인식)
- 즉, "- 또는 공백이 있거나 없거나" 는 조건을 써야 한다.

`[- ]?` 로 "`-` 또는 ` `(공백)이 있거나 없거나" 를 표현한다.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\n다스베이더 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\d+[- ]?\\d+[- ]?\\d+");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### 📝 n번(1)
위에서 다룬 `\\d+[- ]?\\d+[- ]?\\d+` 정규 표현식은 "0030589-5-95826" 과 같이 연결된 숫자가 너무 많은 문자열도 전화번호로 인식한다.

### 📝 n번(2)
`{숫자}` 는 "`{숫자}` 번 반복한다" 는 의미이다. 
- `\\d{2}` 는 숫자가 연속 2번 나온다는 의미이다.

`\\d{2}[- ]?\\d{3}[- ]?\\d{4}` 는 **숫자가 2번, - 또는 공백, 숫자가 3번, - 또는 공백, 숫자가 4번 나온다**는 표현이다.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\n다스베이더 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\d{2}[- ]?\\d{3}[- ]?\\d{4}");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### 📝 n~m번
`\\d{2}` 로 전화번호의 첫 부분을 찾으려고 하여, 첫 부분에 숫자가 3번 나오는 경우(010 2454 3457)를 인식하지 못한다.
- `{숫자1, 숫자2}` 는 "숫자1부터 숫자2까지 반복한다" 는 의미로, `\\d{2,3}` 정규 표현식은 숫자가 2~3개 반복된다는 의미이다.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\n다스베이더 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\d{2,3}[- ]?\\d{3,4}[- ]?\\d{4}");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### 📝 몇 개 중에 고르기
특정 알파벳만 고르고 싶은 경우, `[]` 안에 특정 알파벳을 명시하면 된다.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\n다스베이더 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("[aeiou]");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### 📝 범위에서 고르기(1)
소문자 알파벳만 고르고 싶은 경우, 위 예제처럼 `[abcd ... xyz]` 라고 명시하면 되겠지만 뭔가 찜찜하다.
- 간단하게 `[a-z]` 라고 명시하여 소문자 알파벳을 찾을 수 있다.

### 📝 범위에서 고르기(2)
소문자 알파벳을 고르는데, 이들 중 연속된 소문자 알파벳을 고르고 싶은 경우는 어떻게 해야 할까?
- 지금까지 배운 정규 표현식들을 활용하면, 소문자 알파벳을 의미하는 `[a-z]` 에 반복을 의미하는 `+` 를 붙여 찾을 수 있겠다.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\n다스베이더 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("[a-z]+");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### 📝 한글 고르기
한글을 어떻게 찾아야 할까 ? 
- 한글의 첫 번째 글자는 `가` 이고, 마지막 글자는 `힣` 이다. 
- 따라서, `[가-힣]` 으로 모든 한글을 찾을 수 있을 것이다.
- 연속된 한글을 찾으려면, `[가-힣]+` 를 사용한다.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\n다스베이더 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("[가-힣]+");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### 📝 기타 대표문자
숫자를 의미하는 `\\d` 나 글자를 의미하는 `\\w` 말고 다음과 같은 대표 문자들이 있다.
- `\\s` : 공백 문자(스페이스. 탭, 뉴라인)
- `\\S` : 공백 문자를 제외한 문자
- `\\D` : 숫자를 제외한 모든 문자
- `\\W` : 글자를 제외한 모든 문자

### 📝 정규 표현식을 사용해 풀어본 문제
[Programmers - 튜플](https://programmers.co.kr/learn/courses/30/lessons/64065)

```java
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class Solution {
    // 개수로 정렬하고, 첫번째 요소의 값을 튜플의 첫 요소로 삽입,
    // 이후 정렬된 배열을 순차적으로 돌면서, 이미 튜플에 넣은 값이 아닌 값이 나오면 튜플에 삽입, 반복
    public int[] solution(String s) {
        Map<Integer, Integer> map = new HashMap<>();

        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(s);

        while(matcher.find()) {
            int num = Integer.parseInt(matcher.group(0));
            map.put(num, map.getOrDefault(num, 0) + 1);
        }

        ArrayList<Integer> tuple = new ArrayList<>(map.keySet());
        tuple.sort((value1, value2) -> (map.get(value2).compareTo(map.get(value1))));

        return tuple.stream().mapToInt(i -> i).toArray();
    }
}
```

- 원래는 문자열을 하나하나 파싱하고, 튜플을 저장한 배열에 값이 있는지 없는지 확인해가면서 구현했었다.
- 코드가 너무 지저분한 것 같고, 좀 더 효율적인 방법이 없을까 고심하다가 배운 정규 표현식이 떠올라 사용해봤고, 간결한 코드와 효율적인 메모리 사용으로 해결할 수 있었다.

## 📕 참고
- [프로그래머스](https://programmers.co.kr/learn/courses/11)
- [[Java] 자바 정규 표현식 (Pattern, Matcher) 사용법 & 예제](https://coding-factory.tistory.com/529)
---
title: "π μ κ·ννμ"
description: "java μ§μ"
date: 2022-04-14
update: 2022-04-14
tags:
  - Java
series: "π Java μ§μ"
---

<em>λ¬Έμμ΄ μκ³ λ¦¬μ¦μ ν λ, μκ°λ³΄λ€ μ μ©νκ² μ¬μ©λλ€κ³  νλ μ κ·ννμμ λν΄ κ°λ¨ν μ λ¦¬ν΄λ³΄λ POST</em>

## π μ κ·ννμ
μ»΄ν¨ν° κ³Όνμ μ κ·μΈμ΄λ‘λΆν° μ λν κ²μΌλ‘, νΉμ ν κ·μΉμ κ°μ§ λ¬Έμμ΄μ μ§ν©μ νννκΈ° μν΄ μ°μ΄λ νμμΈμ΄μ΄λ€.
- μ£Όλ‘ μ ν΄μ Έ μλ μλ ₯ νμμ λ§λμ§ κ²μ¦νκΈ° μν΄ μ¬μ©νλ€.

---

## π μμ± λ°©λ²
JAVA API `java.util.regex` ν¨ν€μ§λ₯Ό μ¬μ©ν΄μΌ νλ€. ν΄λΉ ν¨ν€μ§μ μλ `Pattern` ν΄λμ€μ `Matcher` ν΄λμ€λ₯Ό μ£Όλ‘ μ¬μ©νλ€.

### π Pattern ν΄λμ€
μ κ· ννμμ λμ λ¬Έμμ΄μ κ²μ¦νλ κΈ°λ₯μ `Pattern` ν΄λμ€μ `matches()` λ©μλλ₯Ό νμ©ν΄ κ²μ¦ν  μ μλ€.
- μ²« λ²μ§Έ μΈμλ μ κ· ννμμ΄κ³ , λ λ²μ§Έ μΈμλ κ²μ¦ λμ λ¬Έμμ΄μ΄λ€.
- κ²μ¦ ν μ κ· ννμκ³Ό μΌμΉνλ©΄ `true` λ₯Ό λ°ννλ€.

```java
import java.util.regex.Pattern;

public class Example {
  public static void main(String[] args) {
    String pattern = "^[0-9]*$"; // μ«μλ§
    String val = "123456789";

    boolean regex = Pattern.matches(pattern, val);
    System.out.println(regex);
    // true μΆλ ₯
  }
}
```

**π Pattern ν΄λμ€ μ£Όμ λ©μλ**
- `compile(String regex)` : μ£Όμ΄μ§ μ κ· ννμμΌλ‘λΆν° ν¨ν΄μ μμ±νλ€.
- `matcher(CharSequence input)` : λμ λ¬Έμμ΄μ΄ ν¨ν΄κ³Ό μΌμΉν  κ²½μ° `true` λ₯Ό λ°ννλ€.
- `asPredicate()` : λ¬Έμμ΄μ μΌμΉμν€λλ° μ¬μ©ν  μ μλ μ μ΄λ₯Ό μμ±νλ€.
- `pattern()` : μ»΄νμΌλ μ κ· ννμμ `String` ννλ‘ λ°ννλ€.
- `split(CharSequence input)` : λ¬Έμμ΄μ μ£Όμ΄μ§ μΈμκ° `CharSequence` ν¨ν΄μ λ°λΌ λΆλ¦¬νλ€.

### π Matcher ν΄λμ€
λμ λ¬Έμμ΄μ ν¨ν΄μ ν΄μνκ³  μ£Όμ΄μ§ ν¨ν΄κ³Ό μΌμΉνλμ§ νλ³ν  λ μ¬μ©νλ€.
- μλ ₯κ°μΌλ‘λ `CharSequence` λΌλ μΈν°νμ΄μ€λ₯Ό μ¬μ©νλλ°, μ΄λ₯Ό ν΅ν΄ λ€μν ννμ μλ ₯ λ°μ΄ν°λ‘λΆν° λ¬Έμ λ¨μμ λ§€μΉ­ κΈ°λ₯μ μ§μν  μ μλ€.
- `Matcher` κ°μ²΄λ `Pattern` κ°μ²΄μ `matcher()` λ©μλλ₯Ό νΈμΆνμ¬ λ°μμ¬ μ μλ€.

```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args){
        Pattern pattern = Pattern.compile("^[a-zA-Z]*$"); // μλ¬Έμλ§
        String val = "abcdef";
        Matcher matcher = pattern.matcher(val);
        
        System.out.println(matcher.find());
        // true μΆλ ₯
    }
}
```

**π Matcher ν΄λμ€ μ£Όμ λ©μλ**
- `matches()` : λμ λ¬Έμμ΄κ³Ό ν¨ν΄μ΄ μΌμΉν  κ²½μ° `true` λ₯Ό λ°ννλ€.
- `find()` : λμ λ¬Έμμ΄κ³Ό ν¨ν΄μ΄ μΌμΉνλ κ²½μ° `true` λ₯Ό λ°ννκ³ , κ·Έ μμΉλ‘ μ΄λνλ€.
- `find(int start)` : `start` μμΉ μ΄νλΆν° λ§€μΉ­ κ²μμ μννλ€.
- `start()` : λ§€μΉ­λλ λ¬Έμμ΄ μμ μμΉλ₯Ό λ°ννλ€.
- `start(int group)` : μ§μ λ κ·Έλ£Ήμ΄ λ§€μΉ­λλ μμ μμΉλ₯Ό λ°ννλ€.
- `end()` : λ§€μΉ­λλ λ¬Έμμ΄ λ λ€μ λ¬Έμ μμΉλ₯Ό λ°ννλ€.
- `end(int group)` : μ§μ λ κ·Έλ£Ήμ΄ λ§€μΉ­λλ λ λ€μ λ¬Έμ μμΉλ₯Ό λ°ννλ€.
- `group()` : λ§€μΉ­λ λΆλΆμ λ°ννλ€.
- `group(int group)` : λ§€μΉ­λ λΆλΆ μ€ `group` λ² κ·Έλ£Ήν λ§€μΉ­ λΆλΆμ λ°ννλ€.
- `groupCount()` : ν¨ν΄ λ΄ κ·Έλ£Ήνν μ μ²΄ κ°―μλ₯Ό λ°ννλ€.

### π μ«μ
μ μμ μμλ `[0-9]` λ‘ νννμ§λ§, μ κ· ννμ λ¬Έλ²μ μ¬μ©νλ©΄ `\\d` λΌλ μ«μλ₯Ό λννλ μ κ· ννμμΌλ‘ ννν  μ μλ€. (d = digit)

```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\nλ€μ€λ² μ΄λ 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\d");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### π κΈμ
`a, b, c, κ°, λ, λ€, 1, 2, 3` κ³Ό κ°μ μνλ²³κ³Ό μ«μλ₯Ό ν¬ν¨ν κΈμλ₯Ό λννλ μ κ· ννμμ `\\w` μ΄λ€.
- νΉμ λ¬Έμλ ν¬ν¨νμ§ μμ§λ§, `_` λ ν¬ν¨νλ€.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\nλ€μ€λ² μ΄λ 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\w");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### π νλ μ΄μ
`\\d` λ μ«μλ₯Ό ν κΈμλ§ μ°Ύλλ€. νμ§λ§ μ νλ²νΈμ κ°μ΄ λΆμ΄μλ κ²½μ°μ λν΄μλ μ΄λ»κ² ν΄μΌ ν κΉ?
- "νλ νΉμ κ·Έ μ΄μ μ°κ²°λ" μ΄λΌλ μλ―Έλ₯Ό κ°μ§ `+` λ₯Ό μ¬μ©νμ¬ μ°κ²°λ μ«μμ λν΄ μ°Ύλλ€.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\nλ€μ€λ² μ΄λ 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### π 0κ° μ΄μ
μ κ· ννμμΌλ‘ 010, 123, 456 μ€ μμ°μλ₯Ό μ°ΎμΌλ €λ©΄ μ΄λ»κ² ν΄μΌ ν κΉ?
- 0μΌλ‘ μμνμ§ μμΌλ μμ°μμ μ²« μλ¦¬λ λ°λμ 1 ~ 9 μ€ νλμ¬μΌ νλ€.
- κ·Έ λ€μ μλ¦¬λΆν°λ 0 ~ 9 μ¬μ΄μ μ«μκ° λμ¬ μλ μκ³ , κ·Έλ μ§ μμ μλ μλ€.

μ λ¦¬νμλ©΄ μμ°μλ,
1. μ²μμ 1 ~ 9 μ€ νλμ μ«μκ° λμ¨ λ€μ
2. κ·Έ λ€μλ μ«μκ° 0κ° μ΄μ λμ€λ©΄ λλ€.

`*` λ "0κ° μ΄μ" μ΄λΌλ μλ―Έμ΄λ€. λ°λΌμ, `\\d*` λ "μ«μκ° 0κ° μ΄μμ΄λ€" λ₯Ό μλ―Ένλ€.
- μ΄λ₯Ό ν΅ν΄ μμ°μλ `[1-9]\\d*` λ‘ ννν  μ μλ€.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\nλ€μ€λ² μ΄λ 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("[1-9]\\d*");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### π μκ±°λ μκ±°λ(1)
μ νλ²νΈλ "-" λ₯Ό ν¬ν¨νκ±°λ, ν¬ν¨νμ§ μμ μ μλ€. 
- λ°λΌμ μ νλ²νΈλ μ°μλλ μ«μ 3 ~ 4κ° μ¬μ΄μ `-` κ° μκ±°λ μλ€κ³  ννν  μ μλ€.

`?` λ "μκ±°λ μκ±°λ" λ₯Ό μλ―Ένλ€. 
- `-?` λ "-κ° μκ±°λ μκ±°λ" λ₯Ό μλ―Ένλ€.
- `\\d+-?\\d+-?\\d+` λ‘ μ νλ²νΈλ₯Ό μ°Ύλ μ κ· ννμμ μμ±ν  μ μλ€.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\nλ€μ€λ² μ΄λ 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\d+-?\\d+-?\\d+");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### π μκ±°λ μκ±°λ(2)
μμ μμ λ μ νλ²νΈ μ¬μ΄μ κ³΅λ°±μ΄ ν¬ν¨λ κ²½μ°λ₯Ό μ°Ύμ μ μλ€. (μΆλ ₯ κ²°κ³Όλ₯Ό λ³΄λ©΄ λ€λ₯Έ μ νλ²νΈλ‘ μΈμ)
- μ¦, "- λλ κ³΅λ°±μ΄ μκ±°λ μκ±°λ" λ μ‘°κ±΄μ μ¨μΌ νλ€.

`[- ]?` λ‘ "`-` λλ ` `(κ³΅λ°±)μ΄ μκ±°λ μκ±°λ" λ₯Ό νννλ€.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\nλ€μ€λ² μ΄λ 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\d+[- ]?\\d+[- ]?\\d+");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### π nλ²(1)
μμμ λ€λ£¬ `\\d+[- ]?\\d+[- ]?\\d+` μ κ· ννμμ "0030589-5-95826" κ³Ό κ°μ΄ μ°κ²°λ μ«μκ° λλ¬΄ λ§μ λ¬Έμμ΄λ μ νλ²νΈλ‘ μΈμνλ€.

### π nλ²(2)
`{μ«μ}` λ "`{μ«μ}` λ² λ°λ³΅νλ€" λ μλ―Έμ΄λ€. 
- `\\d{2}` λ μ«μκ° μ°μ 2λ² λμ¨λ€λ μλ―Έμ΄λ€.

`\\d{2}[- ]?\\d{3}[- ]?\\d{4}` λ **μ«μκ° 2λ², - λλ κ³΅λ°±, μ«μκ° 3λ², - λλ κ³΅λ°±, μ«μκ° 4λ² λμ¨λ€**λ ννμ΄λ€.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\nλ€μ€λ² μ΄λ 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\d{2}[- ]?\\d{3}[- ]?\\d{4}");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### π n~mλ²
`\\d{2}` λ‘ μ νλ²νΈμ μ²« λΆλΆμ μ°ΎμΌλ €κ³  νμ¬, μ²« λΆλΆμ μ«μκ° 3λ² λμ€λ κ²½μ°(010 2454 3457)λ₯Ό μΈμνμ§ λͺ»νλ€.
- `{μ«μ1, μ«μ2}` λ "μ«μ1λΆν° μ«μ2κΉμ§ λ°λ³΅νλ€" λ μλ―Έλ‘, `\\d{2,3}` μ κ· ννμμ μ«μκ° 2~3κ° λ°λ³΅λλ€λ μλ―Έμ΄λ€.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\nλ€μ€λ² μ΄λ 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("\\d{2,3}[- ]?\\d{3,4}[- ]?\\d{4}");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### π λͺ κ° μ€μ κ³ λ₯΄κΈ°
νΉμ  μνλ²³λ§ κ³ λ₯΄κ³  μΆμ κ²½μ°, `[]` μμ νΉμ  μνλ²³μ λͺμνλ©΄ λλ€.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\nλ€μ€λ² μ΄λ 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("[aeiou]");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### π λ²μμμ κ³ λ₯΄κΈ°(1)
μλ¬Έμ μνλ²³λ§ κ³ λ₯΄κ³  μΆμ κ²½μ°, μ μμ μ²λΌ `[abcd ... xyz]` λΌκ³  λͺμνλ©΄ λκ² μ§λ§ λ­κ° μ°μ°νλ€.
- κ°λ¨νκ² `[a-z]` λΌκ³  λͺμνμ¬ μλ¬Έμ μνλ²³μ μ°Ύμ μ μλ€.

### π λ²μμμ κ³ λ₯΄κΈ°(2)
μλ¬Έμ μνλ²³μ κ³ λ₯΄λλ°, μ΄λ€ μ€ μ°μλ μλ¬Έμ μνλ²³μ κ³ λ₯΄κ³  μΆμ κ²½μ°λ μ΄λ»κ² ν΄μΌ ν κΉ?
- μ§κΈκΉμ§ λ°°μ΄ μ κ· ννμλ€μ νμ©νλ©΄, μλ¬Έμ μνλ²³μ μλ―Ένλ `[a-z]` μ λ°λ³΅μ μλ―Ένλ `+` λ₯Ό λΆμ¬ μ°Ύμ μ μκ² λ€.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\nλ€μ€λ² μ΄λ 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("[a-z]+");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### π νκΈ κ³ λ₯΄κΈ°
νκΈμ μ΄λ»κ² μ°ΎμμΌ ν κΉ ? 
- νκΈμ μ²« λ²μ§Έ κΈμλ `κ°` μ΄κ³ , λ§μ§λ§ κΈμλ `ν£` μ΄λ€. 
- λ°λΌμ, `[κ°-ν£]` μΌλ‘ λͺ¨λ  νκΈμ μ°Ύμ μ μμ κ²μ΄λ€.
- μ°μλ νκΈμ μ°ΎμΌλ €λ©΄, `[κ°-ν£]+` λ₯Ό μ¬μ©νλ€.

```java
public class Main {
    public static void main(String[] args){
        String searchTarget = "Luke Skywarker 02-123-4567 luke@daum.net\nλ€μ€λ² μ΄λ 070-9999-9999 darth_vader@gmail.com\nprincess leia 010 2454 3457 leia@gmail.com";

        Pattern pattern = Pattern.compile("[κ°-ν£]+");
        Matcher matcher = pattern.matcher(searchTarget);

        while(matcher.find()) {
            System.out.println(matcher.group(0));
        }
    }
}
```

### π κΈ°ν λνλ¬Έμ
μ«μλ₯Ό μλ―Ένλ `\\d` λ κΈμλ₯Ό μλ―Ένλ `\\w` λ§κ³  λ€μκ³Ό κ°μ λν λ¬Έμλ€μ΄ μλ€.
- `\\s` : κ³΅λ°± λ¬Έμ(μ€νμ΄μ€. ν­, λ΄λΌμΈ)
- `\\S` : κ³΅λ°± λ¬Έμλ₯Ό μ μΈν λ¬Έμ
- `\\D` : μ«μλ₯Ό μ μΈν λͺ¨λ  λ¬Έμ
- `\\W` : κΈμλ₯Ό μ μΈν λͺ¨λ  λ¬Έμ

### π μ κ· ννμμ μ¬μ©ν΄ νμ΄λ³Έ λ¬Έμ 
[Programmers - νν](https://programmers.co.kr/learn/courses/30/lessons/64065)

```java
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class Solution {
    // κ°μλ‘ μ λ ¬νκ³ , μ²«λ²μ§Έ μμμ κ°μ ννμ μ²« μμλ‘ μ½μ,
    // μ΄ν μ λ ¬λ λ°°μ΄μ μμ°¨μ μΌλ‘ λλ©΄μ, μ΄λ―Έ ννμ λ£μ κ°μ΄ μλ κ°μ΄ λμ€λ©΄ ννμ μ½μ, λ°λ³΅
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

- μλλ λ¬Έμμ΄μ νλνλ νμ±νκ³ , ννμ μ μ₯ν λ°°μ΄μ κ°μ΄ μλμ§ μλμ§ νμΈν΄κ°λ©΄μ κ΅¬ννμλ€.
- μ½λκ° λλ¬΄ μ§μ λΆν κ² κ°κ³ , μ’ λ ν¨μ¨μ μΈ λ°©λ²μ΄ μμκΉ κ³ μ¬νλ€κ° λ°°μ΄ μ κ· ννμμ΄ λ μ¬λΌ μ¬μ©ν΄λ΄€κ³ , κ°κ²°ν μ½λμ ν¨μ¨μ μΈ λ©λͺ¨λ¦¬ μ¬μ©μΌλ‘ ν΄κ²°ν  μ μμλ€.

## π μ°Έκ³ 
- [νλ‘κ·Έλλ¨Έμ€](https://programmers.co.kr/learn/courses/11)
- [[Java] μλ° μ κ· ννμ (Pattern, Matcher) μ¬μ©λ² & μμ ](https://coding-factory.tistory.com/529)
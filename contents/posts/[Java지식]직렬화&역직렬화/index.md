---
title: "π μ§λ ¬ν(Serialization)μ μ­μ§λ ¬ν(Deserialization)"
description: "java μ§μ"
date: 2022-06-19
update: 2022-06-19
tags:
  - Java
series: "π Java μ§μ"
---

λ€μ΄λ² D2 λΈλ‘κ·Έλ₯Ό μ½λ μ€ μ­μ§λ ¬νλΌλ κ°λμ λ°κ²¬νλ€. κ·Έλμ μλ°μ μ§λ ¬νμ μ­μ§λ ¬νκ° λ¬΄μμΈμ§μ λν΄ μ λ¦¬νλ € νλ€.

## π μ§λ ¬νμ μ­μ§λ ¬ν
### π μ§λ ¬ν
"κ°μ²΄λ₯Ό μ§λ ¬ννμ¬ μ μ‘ κ°λ₯ν νν(byte)λ‘ λ§λλ κ²"μ μλ―Ένλ€. κ°μ²΄λ€μ λ°μ΄ν°λ₯Ό μ°μμ μΈ λ°μ΄ν°λ‘ λ³ννμ¬ μ€νΈλ¦Όμ ν΅ν΄ λ°μ΄ν°λ₯Ό μ½λλ‘ ν΄μ€λ€.
- μ£Όλ‘ κ°μ²΄λ€μ ν΅μ§Έλ‘ νμΌλ‘ μ μ₯νκ±°λ μ μ‘ν  λ μ¬μ©νλ€.
- λν JVMμ λ©λͺ¨λ¦¬μ μμ£Ό(ν λλ μ€ν)λμ΄ μλ κ°μ²΄ λ°μ΄ν°λ₯Ό λ°μ΄νΈ ννλ‘ λ³ννλ κΈ°μ μ΄λΌκ³ λ νλ€.

### π μ­μ§λ ¬ν
"μ§λ ¬νλ νμΌ λ±μ μ­μΌλ‘ μ§λ ¬ννμ¬ λ€μ κ°μ²΄μ ννλ‘ λ§λλ κ²"μ μλ―Ένλ€. μ μ₯λ νμΌμ μ½κ±°λ μ μ‘λ μ€νΈλ¦Ό λ°μ΄ν°λ₯Ό μ½μ΄ μλ κ°μ²΄μ ννλ‘ λ³΅μνλ€.

---

## π μ§λ ¬ν κ°λ₯ν ν΄λμ€
μ§λ ¬νλ₯Ό νκΈ° μν΄μλ μ μ μ‘°κ±΄μ΄ μλ€. λ°λ‘ **"μ§λ ¬νκ° κ°λ₯ν ν΄λμ€λ₯Ό λ¨Όμ  λ§λλ κ²"** μ΄λ€.
- κ·Έλ¦¬κ³  μ΄λ `Serializable` μ ν΅ν΄ μ ν  μ μλ€.

```java
public class A {

}

// μ΄λ¬ν ννλΌλ©΄

public class A implements Serializable {

}
```

- μμ κ°μ΄ μ§λ ¬νκ° κ°λ₯ν ν΄λμ€ Aμ **`Serializable` μΈν°νμ΄μ€λ₯Ό implements**νλ©΄ λλ€.
  - νμ§λ§ λ¨μν μΈν°νμ΄μ€λ₯Ό κ΅¬ννλ€κ³  ν΄μ μ§λ ¬ν λμμ΄ λλ κ²μ μλλ€.
  - μ¬λ¬ μν©μ λ°λΌ μ§λ ¬ν κ°λ₯ν ν΄λμ€μ λ°μ΄ν°κ° κ²°μ λλ€.

### π Serializable μΈν°νμ΄μ€λ₯Ό implements
μ΄λ μ μμμ κ°μ΄ `Serializable` μΈν°νμ΄μ€λ₯Ό κ΅¬ννλ ν΄λμ€λ‘ λ§λλ κ²μ΄λ€.

### π Serializable μλ κ²½μ°
λ³΄ν΅μ κ²½μ°λ μ§λ ¬νκ° λΆκ°λ₯νλ€. νμ§λ§ ν΄λμ€λ€κ°μ κ΄κ³λ₯Ό κ³ λ €ν΄λ³΄λ©΄, κ°λ₯ν κ²½μ°λ μλ€. 
- λ°λ‘ **`Serializable` μΈν°νμ΄μ€λ₯Ό κ΅¬νν ν΄λμ€λ₯Ό μμλ°μ κ²½μ°**μ΄λ€.

<img src="../../images/μ§λ ¬ν1.jpeg" width="40%">

- ν΄λμ€ Aλ `Serializable` μΈν°νμ΄μ€λ₯Ό κ΅¬ννκ³  μκ³ , ν΄λμ€ Bλ μ΄λ₯Ό μμλ°κ³  μλ€.
- **ν΄λμ€ Bλ μ§λ ¬ν κ°λ₯ν ν΄λμ€κ° λλ€.**

### π transientλ₯Ό μ΄μ©νμ¬ μ§λ ¬ν λμμμ μ μΈνκΈ°
λ³΄ν΅ ν΄λμ€μ λ©€λ²λ³μ μ λΆ μ§λ ¬ν λμμ ν΄λΉλλ€. νμ§λ§ λ³΄μ λ±μ μ΄μ λ‘ μΌλΆ λ³μλ₯Ό μ μΈν΄μΌ ν  κ²½μ°κ° μλ€.
- μ΄λ, `transient` λ₯Ό ν΅ν΄ μ΄λ₯Ό μ§μ ν  μ μλ€.

```java
public class User implements Serializable {
  private String id;
  private String password;
  private String email;

  ...
}

// λΉλ°λ²νΈλ μ€μν μ λ³΄μ΄λ―λ‘ μ§λ ¬νμμ μ μΈνκ³  μΆλ€.

public class User implements Serializable {
  private String id;
  private transient String password;
  private String email;

  ...
}
```

### π λ€λ₯Έ κ°μ²΄λ₯Ό λ©€λ² λ³μλ‘ κ°μ§κ³  μλ κ²½μ°
`int`, `long`, `String` λ± κΈ°λ³Έ μλ£ν λΏ μλλΌ λ€λ₯Έ κ°μ²΄λ₯Ό λ©€λ² λ³μλ‘ μ¬μ©νλ κ²½μ°κ° λ§λ€. μ΄λ° κ²½μ°λ μ΄λ¨κΉ

```java
public class User implements Serializable {
  private String id;
  private transient String password;
  private String email;

  ItemInfo itemInfo;
  Calendar regDate;

  ...
}
```
- μμ΄νμ λ³΄λ₯Ό κ°μ§κ³  μλ `ItemInfo` ν΄λμ€μ κ°μμΌμλ₯Ό λνλ΄λ `Calendar` ν΄λμ€μ λ©€λ² λ³μλ₯Ό κ°μ§κ³  μλ€.
- μ΄λ λ ν΄λμ€λ€ μ€ **`Serializable` μΈν°νμ΄μ€λ₯Ό κ΅¬νν ν΄λμ€κ° νλλΌλ μλ€λ©΄ μ§λ ¬νν  μ μλ€.**

> `Calendar` ν΄λμ€λ `java.util` μ κΈ°λ³Έ μ κ³΅ ν΄λμ€λ‘, `Serializable` λ₯Ό κ΅¬νν ν΄λμ€μ΄λ€. λ°λΌμ `User` ν΄λμ€λ μ§λ ¬νκ° κ°λ₯νλ€.

---

## π μ§λ ¬ν κ΅¬ν
**μ¬μ©ν  ν΄λμ€**
```java
public class User implements Serializable{
    private String name;
    private transient String password;
    private String email;
    private int age;
    
    public User(String name, String password, String email, int age) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.age = age;
    }
    
    public String toString() {
        return "(" + name + ", " + password + ", " + email + ", " + age + ")";
    }
}
```

**μ§λ ¬νμ μ­μ§λ ¬ν**
- `ObjectOutputStream` κ°μ²΄μ `ObjectInputStream` κ°μ²΄λ₯Ό μ¬μ©νλ€.

```java
public class Main {
  private static final String USERINFO_SER = "user.ser";

  public static void main(String[] args) {
    conductSerializing();
    conductDeserializing();
  }

  private static void conductSerializing() {
      try (FileOutputStream fos = new FileOutputStream(USERINFO_SER);
            BufferedOutputStream bos = new BufferedOutputStream(fos);
            ObjectOutputStream out = new ObjectOutputStream(bos)) {
          User u1 = new User("μ μ§±κ΅¬", "1234", "jjanggu@abc.com", 5);
          User u2 = new User("λ΄λ―Έμ ", "5678", "misun@abc.com", 27);

          ArrayList<User> list = new ArrayList<>();
          list.add(u1);
          list.add(u2);

          out.writeObject(u1);
          out.writeObject(u2);
          out.writeObject(list);
          System.out.println("μ§λ ¬ν μλ£");
      } catch (Exception e) {
          e.printStackTrace();
      }
  }

  private static void conductDeserializing() {
      try (FileInputStream fis = new FileInputStream(USERINFO_SER);
              BufferedInputStream bis = new BufferedInputStream(fis);
              ObjectInputStream in = new ObjectInputStream(bis)) {
          User u1 = (User) in.readObject();
          User u2 = (User) in.readObject();
          ArrayList<User> list = (ArrayList<User>) in.readObject();

          System.out.println(u1.toString());
          System.out.println(u2.toString());
          System.out.println(list.toString());
      } catch (Exception e) {
          e.printStackTrace();
      }
  }
}
```

κ²°κ³Όλ λ€μκ³Ό κ°λ€.

<img src="../../images/μ§λ ¬ν,μ­μ§λ ¬νκ²°κ³Ό.png" width="60%">

- `conductSerializing()` μμ μ§λ ¬νλ₯Ό μννμ¬ `user.ser` νμΌμ μμ±νκ³ , μ΄λ₯Ό μ½μ΄μ λ°λ‘ μ­μ§λ ¬νλ₯Ό μννλ€.
  - μ­μ§λ ¬ν κ²°κ³Όλ₯Ό λ³΄λ©΄, μ§λ ¬νν μμκ° κ·Έλλ‘ μΆλ ₯λκ³  μλ€. **μ¦, μ§λ ¬νμ μ­μ§λ ¬νλ μμλ₯Ό λ³΄μ₯νλ€.**
  - μμκ° λ§μ§ μλ€λ©΄, μ­μ§λ ¬νμ μ€ν¨νλ€.

---

## π SerialVersionUID, ν΄λμ€μ λ²μ κ΄λ¦¬
μ§λ ¬νλ₯Ό μννλ©΄, λ΄λΆμμ μλμΌλ‘ `SerialVersionUID` λΌλ κ³ μ μ λ²νΈλ₯Ό μμ±νμ¬ κ΄λ¦¬νλ€. 
- μ΄λ μ§λ ¬νμ μ­μ§λ ¬ν μ μ€μν μ­ν μ μννλ€.
- μ΄ κ°μ΄ λ§λμ§ νμΈν ν μ²λ¦¬λ₯Ό μννκΈ° λλ¬Έμ΄λ€. μΌμΉνμ§ μλ€λ©΄ `java.io.InvalidClassException` μμΈκ° λ°μνλ€.

μμ€ μμμ UIDλ₯Ό μ μΈνμ§ μμλ λ΄λΆμμ μλμΌλ‘ μμ±νμ¬ κ΄λ¦¬νλ€. νμ§λ§ μμ± λΉμμ UIDμ λ³κ²½ν μ΄νμ UIDκ° λ§μ§ μμ μμΈκ° λ°μνλλ°, μλΉμ€ λ°°ν¬ ν κ°μ²΄μ λ³κ²½μ μλ μμ΄ λ°μν  κ²μ΄κ³ , κ·Έλλ§λ€ μ»΄νμΌνκ³  λ°°ν¬νλ€λ©΄, λ§€μ° λΆνΈν  κ²μ΄λ€!

λ°λΌμ Javaμμλ **`SerialVersionUID` λ₯Ό μ§μ  μ μΈνκ³  κ΄λ¦¬νλ λ°©μμ μ κ·Ή κΆμ₯**νλ€.

### π SerialVersionUIDλ₯Ό μΆκ°
```java
class User implements Serializable {
  private static final long serialVersionUid = 1L;

  private String name;
  private transient String password;
  private String email;
  private int age;

  public User(String name, String password, String email, int age) {
      this.name = name;
      this.password = password;
      this.email = email;
      this.age = age;
  }

  public String toString() {
      return "(" + name + ", " + password + ", " + email + ", " + age + ")";
  }
}
```
- `1L` μ κ°μ λ³κ²½νλ©΄ λκ³ , μ΄λ κ² μ μΈνλ€λ©΄ μΆν `User` ν΄λμ€μ λ³κ²½μ΄ μκΈΈμ§λΌλ UIDκ° μ¬μ ν 1μ΄λ―λ‘ μ­μ§λ ¬νλ₯Ό μ±κ³΅μ μΌλ‘ ν  μ μλ€.
 
---

## π μ§λ ¬νλ₯Ό μ£Όλ‘ μ΄λμ μ¬μ©νλκ°
JVMμ λ©λͺ¨λ¦¬μλ§ μμ£Όλμ΄ μλ κ°μ²΄ λ°μ΄ν°λ₯Ό κ·Έλλ‘ **μμν(persist)** ν  λ μ¬μ©νλ€.
- μμ€νμ΄ μ’λ£λμ΄λ μμ΄μ§μ§ μλ μ₯μ μ κ°μ§λ©° μμνλ λ°μ΄ν°μ΄κΈ° λλ¬Έμ λ€νΈμν¬λ‘ μ μ‘λ κ°λ₯νλ€.
- νμν  λ μ§λ ¬νλ κ°μ²΄ λ°μ΄ν°λ₯Ό κ°μ Έμμ μ­μ§λ ¬ννμ¬ κ°μ²΄λ₯Ό λ°λ‘ μ¬μ©ν  μ μκ² λλ€.

**μλΈλ¦Ώ μΈμ**
- μλΈλ¦Ώ μΈμμ λλΆλΆ μΈμμ Java μ§λ ¬νλ₯Ό μ§μνκ³  μλ€. 
- λ¨μν μΈμμ μλΈλ¦Ώ λ©λͺ¨λ¦¬ μμμ μ΄μ©νλ€λ©΄ μ§λ ¬νκ° νμμμ§λ§, νμΌλ‘ μ μ₯νκ±°λ μΈμ ν΄λ¬μ€ν°λ§, DBλ₯Ό μ μ₯νλ μ΅μ λ±μ μ ννκ² λλ©΄ μΈμ μμ²΄κ° μ§λ ¬νλ μ±λ‘ μ μ₯λμ΄ μ λ¬λλ€.

**μΊμ**
- μ£Όλ‘ DBλ₯Ό μ‘°νν ν κ°μ Έμ¨ λ°μ΄ν° κ°μ²΄ κ°μ κ²½μ° μ€μκ° ννλ‘ μκ΅¬νλ λ°μ΄ν°κ° μλλΌλ©΄ μ μ₯μλ₯Ό μ΄μ©ν΄ λ°μ΄ν° κ°μ²΄λ₯Ό μ μ₯ν ν λμΌν μμ²­μ΄ μ€λ©΄ DBλ₯Ό λ€μ μμ²­νλ κ²μ΄ μλλΌ μ μ₯λ κ°μ²΄λ₯Ό μ°Ύμ μλ΅νκ² νλ ννλ₯Ό μΊμλ₯Ό μ¬μ©νλ€κ³  νλ€.
- μΊμλ₯Ό μ΄μ©νλ©΄ DB λ¦¬μμ€λ₯Ό μ μ½ν  μ μμ΄ μμ£Ό νμ©λκ³ , μ΄λ κ² μΊμν  λΆλΆμ μλ° μ§λ ¬νλ λ°μ΄ν°λ₯Ό μ μ₯ν΄μ μ¬μ©λλ€.
 
## π μ°Έκ³ 
- [Java κ°μ²΄ μ§λ ¬ν(Serialization) μ μ­μ§λ ¬ν(Deserialization)](https://flowarc.tistory.com/entry/Java-%EA%B0%9D%EC%B2%B4-%EC%A7%81%EB%A0%AC%ED%99%94Serialization-%EC%99%80-%EC%97%AD%EC%A7%81%EB%A0%AC%ED%99%94Deserialization)
- [Java μ§λ ¬νλ₯Ό νλ μ΄μ κ° λ¬΄μμΌκΉ?](https://velog.io/@sa1341/Java-%EC%A7%81%EB%A0%AC%ED%99%94%EB%A5%BC-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0%EA%B0%80-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C)
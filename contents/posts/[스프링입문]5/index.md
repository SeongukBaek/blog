---
title: "πΊ 5. μΉ MVC κ°λ°"
description: "μ€νλ§ μλ¬Έ κ°μ μ λ¦¬"
date: 2022-01-06
update: 2022-01-06
tags:
  - Java
  - SpringBoot
series: "πΊ μ€νλ§ μλ¬Έ"
---

<em><strong>[μ€νλ§ μλ¬Έ - μ½λλ‘ λ°°μ°λ μ€νλ§ λΆνΈ, μΉ MVC, DB μ κ·Ό κΈ°μ ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)μ λ€μΌλ©° μ λ¦¬νλ POSTμλλ€.</strong></em>

> **μ μ²΄μ μΈ νλ¦**
> - Spring Project μμ±
> - Spring bootλ‘ μΉ μλ² μ€ν
> - νμ λλ©μΈ κ°λ°
> - μΉ MVC κ°λ°
> - DB μ°λ - JDBC, JPA, Spring data JPA
> - νμ€νΈ μΌμ΄μ€ μμ±

## π νμ μΉ κΈ°λ₯ - ν νλ©΄ μΆκ°
μ΄μ  μκ°μ κ΅¬νν `MemberController` λ₯Ό μ΄μ©νμ¬ νμμ λ±λ‘νκ³  μ‘°ννλ νλ©΄μ κ΅¬μ±νλ€.

### β `controller/HomeController` μμ±
`controller/HomeController.java`

```java
@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "home";
    }
}
```

- `@GetMapping("/")` μΌλ‘ λ§¨ μ²μ λλ©μΈμΌλ‘ λ€μ΄μ€κ² λλ©΄, `String home()` μ΄ νΈμΆλλλ‘ λ§€ννλ€.
- κ·Έλ¦¬κ³  `home()` μ `return "home"` μΌλ‘ `home.html` μ νΈμΆνλ€.

`templates/home.html`
```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org" lang="ko">
<body>

<div class="container">
    <div>
        <h1>Hello Spring</h1> <p>νμ κΈ°λ₯</p>
        <p>
            <a href="/members/new">νμ κ°μ</a> <a href="/members">νμ λͺ©λ‘</a>
        </p>
    </div>
</div>

</body>
</html>
```
<img src="https://images.velog.io/images/bsu1209/post/26e98787-9f8c-4710-9bc9-2f2ddc22b796/image.png" width="80%">

- κ°λ¨νκ², νμ κ°μμ λλ₯΄λ©΄ `/members/new` λ‘ μ΄λνκ³ , νμ λͺ©λ‘μ λλ₯΄λ©΄ `/members` λ‘ μ΄λνλλ‘ κ΅¬ννλ€.
- μ€νμ νλ©΄, `static/index.html` κ° μλ `templates/home.html` μ΄ λ³΄μ¬μ§λλ°, μ΄λ μ΄μ μ λ€λ£¬ [μ μ  μ»¨νμΈ ](https://velog.io/@bsu1209/Spring-%EB%91%90%EB%B2%88%EC%A7%B8.-%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9B%B9-%EA%B0%9C%EB%B0%9C-%EA%B8%B0%EC%B4%88#spring-boot%EB%8A%94-%EC%A0%95%EC%A0%81-%EC%BB%A8%ED%85%90%EC%B8%A0-%EA%B8%B0%EB%8A%A5-%EC%9E%90%EB%8F%99-%EC%A0%9C%EA%B3%B5) λΆλΆμμ, μ€νλ§μ΄ λ΄μ₯ ν°μΊ£ μλ²λ₯Ό κ±°μ³, μ€νλ§ μ»¨νμ΄λμμ λ¨Όμ  κ΄λ ¨ **Controller**λ₯Ό μ°ΎκΈ° λλ¬Έμ΄λ€.

---

## π νμ μΉ κΈ°λ₯ - λ±λ‘
`controller/MemberController.java`
```java
@GetMapping("/members/new")
public String createForm() {
    return "members/createMemberForm";
}
```

- `home.html` μμ νμ κ°μ λ²νΌμ λλ₯΄λ©΄ `/members/new` λ‘ μ΄λνλ€.
- ν΄λΉ urlλ‘ μ΄λλμμ λ, `/members/createMemberForm.html` μ μ λ¬νκΈ° μν΄μ λ€μκ³Ό κ°μ Mappingμ μννλ€.

`templates/members/createMemberForm.html`
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
  <div class="container">
    <form action="/members/new" method="post">
      <div class="form-group">
        <label for="name">μ΄λ¦</label>
        <input type="text" id="name" name="name" placeholder="μ΄λ¦μ μλ ₯νμΈμ">
        <label for="name">λΉλ°λ²νΈ</label>
        <input type="password" id="pwd" name="pwd" placeholder="λΉλ°λ²νΈλ₯Ό μλ ₯νμΈμ">
        <label for="name">μ νλ²νΈ</label>
        <input type="text" id="phone" name="phone" placeholder="μ νλ²νΈλ₯Ό μλ ₯νμΈμ">
      </div>
      <button type="submit">λ±λ‘</button> </form>
  </div>
</body>
</html>
```

<img src="https://images.velog.io/images/bsu1209/post/e52623f1-62f3-49f2-867b-51b21f9960ad/image.png" width="80%">

- `form` νκ·Έλ₯Ό μ΄μ©νμ¬ `input` μ μ΄λ¦μ μλ ₯νκ³ , `λ±λ‘` λ²νΌμ λλ₯΄λ©΄ `name = name`, `value` λ μλ ₯ν κ°μΌλ‘ λ΄κ²¨ μλ²λ‘ `post` λλ€. (`name` μ μλ²μμ κ°μ λ°μ λ **KEY**κ° λλ€.)
- μμ§μ `/members/new` μμ μ΄λ₯Ό μ²λ¦¬νμ§ μμ μλ¬κ° λ¬λ€.

`controller/MemberForm.java`
```java
package hello.hellospring.controller;

public class MemberForm {
    private String name;
    private int pwd;
    private String phone;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPwd() {
        return pwd;
    }

    public void setPwd(int pwd) {
        this.pwd = pwd;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
```

- `private String name` κ³Ό `templates/members/createMemberForm.html` μμμ `name=name` μ΄ λ§€μΉ­λμ΄ κ°μ΄ μ μ₯λ  κ²μ΄λ€.
- `pwd`, `phone` λ κ°μ λ°©μμΌλ‘ μ μ₯λλ€.

`controller/MemberController.java`
```java
@PostMapping("/members/new")
public String create(MemberForm form) {
    Member member = new Member();
    member.setName(form.getName());
    member.setPwd(form.getPwd());
    member.setPhone(form.getPhone());
        
    memberService.join(member);
        
    return "redirect:/";
}
```

- μ΄μ κ³Όλ λ€λ₯΄κ² `@PostMapping` μΌλ‘ `/members/new` λ‘ μμ²­λ Postμ λν μ²λ¦¬λ₯Ό μννλ€.
- μλ‘μ΄ `Member` κ°μ²΄λ₯Ό μμ±νκ³ , μ΄ κ°μ²΄μ μ΄λ¦μ post μμ²­μ nameμΌλ‘ μ§μ νκΈ° μν΄ `form.getName()` μΌλ‘ `setName` νλ€. (`pwd`, `phone` λ λμΌ)
- κ·Έλ¦¬κ³  μ΄μ μ κ΅¬νν `join(member)` μΌλ‘ λ±λ‘νλ€.
- λ§μ§λ§μΌλ‘ νμ λ±λ‘μ΄ λ μ΄νμλ ν νλ©΄μΌλ‘ λλ €λ³΄λ΄κΈ° μν΄ `return redirect:/` ν΄μ€λ€.

μ€νν΄μ μ΄λ¦μ μλ ₯νκ³  λ±λ‘νλ©΄, μ μμ μΌλ‘ ννλ©΄μΌλ‘ λμμ€λ κ²μ νμΈν  μ μλ€.

### β νλ¦
1. `HomeController` μμ `home.html` μ λΏλ €μ€
2. `home.html` μμ **νμ κ°μ λ²νΌ**μ ν΄λ¦­, `/members/new` λ‘ μ΄λ
3. `MemberController` μμ `/members/new` λ‘ **GET** μμ²­μ΄ λ€μ΄μ€λ©΄, `members/createMemberForm.html` μ λΏλ €μ£Όλλ‘ μ§μ 
4. `createMember.html` μμ `form` νκ·Έλ‘ μ΄λ¦μ μλ ₯λ°κ³ , λ±λ‘ λ²νΌμ ν΄λ¦­νμ¬ `/members/new` λ‘ **POST** μμ²­
5. `MemberController` μμ `/members/new` λ‘ λ€μ΄μ¨ **POST** μμ²­μ λ°μ νμ λ±λ‘μ μ²λ¦¬νκ³ , `/` μΌλ‘ **redirect** μν

---

## π νμ μΉ κΈ°λ₯ - μ‘°ν
μμμ κ΅¬νν λ±λ‘μ΄ μ λμλμ§ νμΈνκΈ° μν΄ μ‘°ν κΈ°λ₯μ κ΅¬ννλ€.

`MemberController.java`
```java
@GetMapping("/members")
public String list(Model model) {
    List<Member> members = memberService.findMembers();
    model.addAttribute("members", members);
    return "members/memberList";
}
```

- `home.html` μμ, νμ λͺ©λ‘ λ²νΌμ λλ₯΄λ©΄ `/members` λ‘ μ΄λνλ€.
- λ°λΌμ, controllerμμ `/members` μ λν **GET** mappingμ΄ νμνλ€.
- `memberService.findMembers()` λ‘ νμ λͺ©λ‘μ `List<>` ννλ‘ λ°μμ¨λ€.
- λ°μμ¨ `members` λ₯Ό `model` μ `attribute` λ‘ μΆκ°νκ³  `members/memberList.html` λ‘ μ λ¬νλ€.

`members/memberList.html`
```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org" lang="ko">
<body>
<div class="container">
    <div>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>μ΄λ¦</th>
                    <th>λΉλ°λ²νΈ</th>
                    <th>μ νλ²νΈ</th>
                </tr>
            </thead>
            <tbody>
            <tr th:each="member : ${members}">
                <td th:text="${member.id}"></td>
                <td th:text="${member.name}"></td>
                <td th:text="${member.pwd}"></td>
                <td th:text="${member.phone}"></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
</body>
</html>
```

<img src="https://images.velog.io/images/bsu1209/post/e52623f1-62f3-49f2-867b-51b21f9960ad/image.png" width="80%">

μμ κ°μ΄ μ λ³΄λ₯Ό μλ ₯νμ¬ λ±λ‘νλ€.

νμ λͺ©λ‘μ ν΄λ¦­νλ©΄, μλμ κ°μ΄ λ±λ‘λ νμ μ λ³΄λ₯Ό νμΈν  μ μλ€.

<img src="https://images.velog.io/images/bsu1209/post/af8f8496-5bd7-4d8e-984a-808f04bedfc3/image.png" width="80%">

νμ΄μ§ μμ€ λ³΄κΈ°λ₯Ό ν΄λ¦­νλ©΄

<img src="https://images.velog.io/images/bsu1209/post/28657fa6-e067-4421-8bc5-aeedc3aba4a5/image.png" width="50%">

- `${members}` λ attributeλ₯Ό μΆκ°νλ `model` μμλΆν° κ°μ κ°μ Έμ¨λ€.
- `th:each="member: ${members}"` λ‘ loopλ₯Ό λλ©΄μ `List<Member> members` μ κ°μ μμ°¨μ μΌλ‘ μ½λλ€.
- κ·Έλ¦¬κ³  `th:text="${member.id}"` μμ, `id` λ `domain/Member` μμμ `id` κ°μ μλ―Ένλλ°, `private Long id` μ΄λ―λ‘, μΈλΆμμλ μ κ·Όμ΄ λΆκ°λ₯νλ€. λ°λΌμ, **`public` ν `getId()` μ μ κ·Ό**νμ¬ κ°μ κ°μ Έμ¨λ€.

> **Property μ κ·Ό λ°©μ** = Getter & Setter μ κ·Ό λ°©μ

**λ©λͺ¨λ¦¬ Repositoryλ₯Ό μ¬μ©νκΈ° λλ¬Έμ μλ²λ₯Ό μ¬κ°λνλ©΄, λΉμ°ν RESETλλ€.**
λ°λΌμ, fileμ΄λ DBμ λ¬Όλ¦¬μ μΌλ‘ μ μ₯μ ν΄μ€μΌ νλ€.

---

## π μ°Έκ³ 
- [μ€νλ§ μλ¬Έ-μ½λλ‘ λ°°μ°λ μ€νλ§ λΆνΈ, μΉ MVC, DB μ κ·Ό κΈ°μ ](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)
---
title: "📺 5. 웹 MVC 개발"
description: "스프링 입문 강의 정리"
date: 2022-01-06
update: 2022-01-06
tags:
  - Java
  - SpringBoot
series: "📺 스프링 입문"
---

<em><strong>[스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)을 들으며 정리하는 POST입니다.</strong></em>

> **전체적인 흐름**
> - Spring Project 생성
> - Spring boot로 웹 서버 실행
> - 회원 도메인 개발
> - 웹 MVC 개발
> - DB 연동 - JDBC, JPA, Spring data JPA
> - 테스트 케이스 작성

## 🔍 회원 웹 기능 - 홈 화면 추가
이전 시간에 구현한 `MemberController` 를 이용하여 회원을 등록하고 조회하는 화면을 구성한다.

### ⛏ `controller/HomeController` 생성
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

- `@GetMapping("/")` 으로 맨 처음 도메인으로 들어오게 되면, `String home()` 이 호출되도록 매핑한다.
- 그리고 `home()` 은 `return "home"` 으로 `home.html` 을 호출한다.

`templates/home.html`
```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org" lang="ko">
<body>

<div class="container">
    <div>
        <h1>Hello Spring</h1> <p>회원 기능</p>
        <p>
            <a href="/members/new">회원 가입</a> <a href="/members">회원 목록</a>
        </p>
    </div>
</div>

</body>
</html>
```
<img src="https://images.velog.io/images/bsu1209/post/26e98787-9f8c-4710-9bc9-2f2ddc22b796/image.png" width="80%">

- 간단하게, 회원 가입을 누르면 `/members/new` 로 이동하고, 회원 목록을 누르면 `/members` 로 이동하도록 구현했다.
- 실행을 하면, `static/index.html` 가 아닌 `templates/home.html` 이 보여지는데, 이는 이전에 다룬 [정적 컨텐츠](https://velog.io/@bsu1209/Spring-%EB%91%90%EB%B2%88%EC%A7%B8.-%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9B%B9-%EA%B0%9C%EB%B0%9C-%EA%B8%B0%EC%B4%88#spring-boot%EB%8A%94-%EC%A0%95%EC%A0%81-%EC%BB%A8%ED%85%90%EC%B8%A0-%EA%B8%B0%EB%8A%A5-%EC%9E%90%EB%8F%99-%EC%A0%9C%EA%B3%B5) 부분에서, 스프링이 내장 톰캣 서버를 거쳐, 스프링 컨테이너에서 먼저 관련 **Controller**를 찾기 때문이다.

---

## 🔍 회원 웹 기능 - 등록
`controller/MemberController.java`
```java
@GetMapping("/members/new")
public String createForm() {
    return "members/createMemberForm";
}
```

- `home.html` 에서 회원 가입 버튼을 누르면 `/members/new` 로 이동한다.
- 해당 url로 이동되었을 때, `/members/createMemberForm.html` 을 전달하기 위해서 다음과 같은 Mapping을 수행한다.

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
        <label for="name">이름</label>
        <input type="text" id="name" name="name" placeholder="이름을 입력하세요">
        <label for="name">비밀번호</label>
        <input type="password" id="pwd" name="pwd" placeholder="비밀번호를 입력하세요">
        <label for="name">전화번호</label>
        <input type="text" id="phone" name="phone" placeholder="전화번호를 입력하세요">
      </div>
      <button type="submit">등록</button> </form>
  </div>
</body>
</html>
```

<img src="https://images.velog.io/images/bsu1209/post/e52623f1-62f3-49f2-867b-51b21f9960ad/image.png" width="80%">

- `form` 태그를 이용하여 `input` 에 이름을 입력하고, `등록` 버튼을 누르면 `name = name`, `value` 는 입력한 값으로 담겨 서버로 `post` 된다. (`name` 은 서버에서 값을 받을 때 **KEY**가 된다.)
- 아직은 `/members/new` 에서 이를 처리하지 않아 에러가 뜬다.

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

- `private String name` 과 `templates/members/createMemberForm.html` 에서의 `name=name` 이 매칭되어 값이 저장될 것이다.
- `pwd`, `phone` 도 같은 방식으로 저장된다.

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

- 이전과는 다르게 `@PostMapping` 으로 `/members/new` 로 요청된 Post에 대한 처리를 수행한다.
- 새로운 `Member` 객체를 생성하고, 이 객체의 이름을 post 요청의 name으로 지정하기 위해 `form.getName()` 으로 `setName` 한다. (`pwd`, `phone` 도 동일)
- 그리고 이전에 구현한 `join(member)` 으로 등록한다.
- 마지막으로 회원 등록이 된 이후에는 홈 화면으로 돌려보내기 위해 `return redirect:/` 해준다.

실행해서 이름을 입력하고 등록하면, 정상적으로 홈화면으로 돌아오는 것을 확인할 수 있다.

### ⛏ 흐름
1. `HomeController` 에서 `home.html` 을 뿌려줌
2. `home.html` 에서 **회원 가입 버튼**을 클릭, `/members/new` 로 이동
3. `MemberController` 에서 `/members/new` 로 **GET** 요청이 들어오면, `members/createMemberForm.html` 을 뿌려주도록 지정
4. `createMember.html` 에서 `form` 태그로 이름을 입력받고, 등록 버튼을 클릭하여 `/members/new` 로 **POST** 요청
5. `MemberController` 에서 `/members/new` 로 들어온 **POST** 요청을 받아 회원 등록을 처리하고, `/` 으로 **redirect** 수행

---

## 🔍 회원 웹 기능 - 조회
위에서 구현한 등록이 잘 되었는지 확인하기 위해 조회 기능을 구현한다.

`MemberController.java`
```java
@GetMapping("/members")
public String list(Model model) {
    List<Member> members = memberService.findMembers();
    model.addAttribute("members", members);
    return "members/memberList";
}
```

- `home.html` 에서, 회원 목록 버튼을 누르면 `/members` 로 이동한다.
- 따라서, controller에서 `/members` 에 대한 **GET** mapping이 필요하다.
- `memberService.findMembers()` 로 회원 목록을 `List<>` 형태로 받아온다.
- 받아온 `members` 를 `model` 의 `attribute` 로 추가하고 `members/memberList.html` 로 전달한다.

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
                    <th>이름</th>
                    <th>비밀번호</th>
                    <th>전화번호</th>
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

위와 같이 정보를 입력하여 등록한다.

회원 목록을 클릭하면, 아래와 같이 등록된 회원 정보를 확인할 수 있다.

<img src="https://images.velog.io/images/bsu1209/post/af8f8496-5bd7-4d8e-984a-808f04bedfc3/image.png" width="80%">

페이지 소스 보기를 클릭하면

<img src="https://images.velog.io/images/bsu1209/post/28657fa6-e067-4421-8bc5-aeedc3aba4a5/image.png" width="50%">

- `${members}` 는 attribute를 추가했던 `model` 에서부터 값을 가져온다.
- `th:each="member: ${members}"` 로 loop를 돌면서 `List<Member> members` 의 값을 순차적으로 읽는다.
- 그리고 `th:text="${member.id}"` 에서, `id` 는 `domain/Member` 에서의 `id` 값을 의미하는데, `private Long id` 이므로, 외부에서는 접근이 불가능하다. 따라서, **`public` 한 `getId()` 에 접근**하여 값을 가져온다.

> **Property 접근 방식** = Getter & Setter 접근 방식

**메모리 Repository를 사용하기 때문에 서버를 재가동하면, 당연히 RESET된다.**
따라서, file이나 DB에 물리적으로 저장을 해줘야 한다.

---

## 📕 참고
- [스프링 입문-코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)
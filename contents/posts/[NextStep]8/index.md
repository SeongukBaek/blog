---
title: "π 8μ₯ AJAXλ₯Ό νμ©ν΄ μλ‘κ³ μΉ¨ μμ΄ λ°μ΄ν° κ°±μ νκΈ°"
description: "μλ° μΉ νλ‘κ·Έλλ° μ± μ λ¦¬"
date: 2022-02-12
update: 2022-02-12
tags:
  - Java
  - Refactoring
  - Framework
series: "π μλ° μΉ νλ‘κ·Έλλ° Next Step"
---

<em>[μλ° μΉ νλ‘κ·Έλλ° Next Step - λ°μ¬μ±]μ μ½κ³  μΈμ©νκ³  μ λ¦¬νλ POSTμλλ€.</em>

> μ§μ  κ΅¬νν νλ μμν¬μ λΌμ΄λΈλ¬λ¦¬λ₯Ό νμ©ν΄ μ§λ¬Έ/λ΅λ³ κ²μνμ κ΅¬νν΄λ³΄μ. μ΄λ, AJAX κΈ°μ μ νμ©ν΄ λ΅λ³μ μΆκ°, μ­μ νλ κΈ°λ₯μ κ΅¬ννλ€. μ΄λ μλ²μΈ‘μ HTMLμ΄ μλ JSON λ°μ΄ν°λ‘ μλ΅νλλ‘ κ΅¬ννλ€.

## π© AJAX νμ©ν΄ λ΅λ³ μΆκ°, μ­μ  μ€μ΅
**λΈλΌμ°μ κ° μλ²μμ HTML μλ΅μ λ°μ μ²λ¦¬νλ κ³Όμ **<br/>
- HTML μλ΅μ λ°μ λΈλΌμ°μ λ λ¨Όμ  HTMLμ λΌμΈ λ¨μλ‘ μ½μ΄κ°λ©΄μ μλ²μ μ¬μμ²­μ΄ νμν λΆλΆ(CSS, JS, Image)μ μ°Ύμ μλ²μ μ¬μμ²­νλ€.
- μλ²μμ μμμ λ€μ΄λ‘λνλ©΄μ HTML DOM νΈλ¦¬λ₯Ό κ΅¬μ±νλ€.
- μλ²μμ CSS νμΌμ λ€μ΄λ‘λνλ©΄ μμ±ν HTML DOM νΈλ¦¬μ CSS μ€νμΌμ μ μ©ν ν νλ©΄μ κ·Έλ¦°λ€.
- λ°λ³΅

**λ΅λ³ μΆκ°, μ­μ  κΈ°λ₯μ κ²½μ°**<br/>
- νλ©΄ λλΆλΆμ λ³κ²½ν  νμμμ΄ λ΅λ³μ΄ μΆκ°λλ λΆλΆ, μ­μ λλ λΆλΆλ§ μ²λ¦¬κ° νμνλ€.
- μ¦, λ§€λ² μλ²μ μμ²­μ λ³΄λ΄ μ κ³Όμ  μ μ²΄λ₯Ό μ€ννλ κ²μ λΉν¨μ¨μ μ΄λ€.

μ΄ κ°μ λ¨μ  λ³΄μμ μν΄ **AJAX(Asynchronous JavaScript and XML)**κ° λ±μ₯νλ€.

### π§ λ΅λ³νκΈ°
- μ¬μ©μκ° λ΅λ³νκΈ° λ²νΌμ ν΄λ¦­
- μ¬μ©μκ° μλ ₯ν λ°μ΄ν°λ₯Ό μλ²λ‘ μ μ‘
- μλ²λ μ¬μ©μκ° μλ ₯ν λ°μ΄ν°λ₯Ό DBμ μ μ₯
- μ μ₯ν λ°μ΄ν°λ₯Ό ν΄λΌμ΄μΈνΈμ JSON ννλ‘ μ μ‘
- ν΄λΌμ΄μΈνΈλ μλ²κ° μλ΅ν JSON λ°μ΄ν°λ₯Ό HTMLλ‘ λ³νν΄ νλ©΄μ μΆλ ₯

λ¨Όμ  λ΅λ³νκΈ° λ²νΌ ν΄λ¦­μ μν HTML μ½λλ₯Ό λ³΄λ©΄,

```html
<div class="answerWrite">
    <form name="answer" method="post">
        <input type="hidden" name="questionId" value="${question.questionId}">
        <div class="form-group col-lg-4" style="padding-top:10px;">
            <input class="form-control" id="writer" name="writer" placeholder="μ΄λ¦">
        </div>
        <div class="form-group col-lg-12">
            <textarea name="contents" id="contents" class="form-control" placeholder=""></textarea>
        </div>
        <input class="btn btn-success pull-right" type="submit" value="λ΅λ³νκΈ°" />
        <div class="clearfix" />
    </form>
</div>
```

- μ¬μ©μλ λ΅λ³ μμ± ν λ΅λ³νκΈ° λ²νΌμ ν΄λ¦­νλ€.
- ν΄λΉ λ²νΌ ν΄λ¦­ μ΄λ²€νΈλ `webapp/js/scripts.js` μ κ΅¬ννλ€.

```js
$(".answerWrite input[type=submit]").click(addAnswer);

function addAnswer(e) {
  e.preventDefault();
  var queryString = $("form[name=answer]").serialize();

  $.ajax({
    type : 'post',
    url : '/api/qna/addAnswer',
    data : queryString,
    dataType : 'json',
    error : onError,
    success : onSuccess,
  });
}
```

**`addAnswer()`**
- `submit` λ²νΌμ κΈ°λ³Έ λμμ λ§κ³ , `<form>` νκ·Έμ μ¬μ©μκ° μλ ₯ν λ°μ΄ν°λ₯Ό μΆμΆνμ¬ `queryString` μ λ΄λλ€.
- κ·Έλ¦¬κ³  jQueryμ `ajax()` ν¨μλ₯Ό νμ©ν΄ μλ²μ μμ²­μ λ³΄λΈλ€.
  - μμ²­ λ©μλλ POST
  - μμ²­ URLμ `/api/qna/addAnswer`
  - μλ΅ λ°μ΄ν° νμμ `Json`
  - μλ²μ μλ΅μ΄ μ±κ³΅νλ©΄, `onSuccess()` ν¨μλ₯Ό νΈμΆνλ©΄μ μλ΅ λ°μ΄ν°λ₯Ό μ λ¬λ°λλ€.
  - μ€ν¨νλ©΄, `onError()` ν¨μλ₯Ό νΈμΆνλ©΄μ μ€ν¨ μμΈμ μ λ¬λ°λλ€.

μ κ΅¬νμΌλ‘ ν΄λΌμ΄μΈνΈμμ μλ²μ μμ²­μ λ³΄λ΄λ κ²μ μλ£νλ€. μ΄μ  μλ²κ° ν΄λΌμ΄μΈνΈμ μμ²­μ μ²λ¦¬ν΄μΌ νλ€. ν΄λΉ μμ²­μ μ²λ¦¬ν  ν΄λμ€λ₯Ό μμ±νκ³ , μμ²­ URLμ λμνλλ‘ `RequestMapping` μ μΆκ°ν΄μ€λ€.

```java
import com.fasterxml.jackson.databind.ObjectMapper;

public class AddAnswerController implements Controller {
    private static final Logger log = LoggerFactory.getLogger(AddAnswerController.class);

    @Override
    public String execute(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        Answer answer = new Answer(req.getParameter("writer"), req.getParameter("contents"), Long.parseLong(req.getParameter("questionId")));
        log.debug("answer : {}", answer);
        
        AnswerDao answerDao = new AnswerDao();
        Answer savedAnswer = answerDao.insert(answer);
        ObjectMapper mapper = new ObjectMapper();
        resp.setContentType("application/json;charset=UTF-8");
        PrintWriter out = resp.getWriter();
        out.print(mapper.writeValueAsString(savedAnswer));
        return null;
    }
}
```

- κΈ°μ‘΄μ Controllerλ€κ³Ό λ¬λ¦¬, μλ΅ μ HTMLμ΄ μλ **JSON ννλ‘ λ°μ΄ν°λ§ μ λ¬**νλ€.
  - μλ° κ°μ²΄μ λ°μ΄ν°λ₯Ό JSONμΌλ‘ λ³ννκΈ° μν΄ [Jackson λΌμ΄λΈλ¬λ¦¬](https://github.com/FasterXML/jackson)λ₯Ό μ¬μ©νλ€.
- JSON λ°μ΄ν° μμ± ν λ°λ‘ μλ΅μΌλ‘ λ³΄λ΄κΈ° λλ¬Έμ μ΄λν  νμ΄μ§κ° μμ΄ `null` μ λ°ννλ€.
  - `DispatchServlet` μ΄ `null` μ²λ¦¬λ₯Ό νμ§ μκΈ°μ λ·° μ΄λ¦μ΄ `null` μΈ κ²½μ° νμ΄μ§ μ΄λμ νμ§ μλλ‘ `null` μ²λ¦¬λ₯Ό νλ€.

```java
public class DispatcherServlet extends HttpServlet {
    ...

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String requestUri = req.getRequestURI();
        logger.debug("Method : {}, Request URI : {}", req.getMethod(), requestUri);

        Controller controller = rm.findController(requestUri);
        try {
            String viewName = controller.execute(req, resp);
            if (viewName != null) {
                move(viewName, req, resp);
            }
        } catch (Throwable e) {
            logger.error("Exception : {}", e);
            throw new ServletException(e.getMessage());
        }
    }
}
```

- μ μ½λμμ λ³Ό μ μλ―, `viewName` μ΄ `null` μ΄ μλ κ²½μ°λ§ `move()` νλ λ‘μ§μ΄μ΄μ κ·Έλ° κ² κ°λ€.

κ·Έλμ κ΅¬νν μλ΅ κ²°κ³Όλ λ€μκ³Ό κ°μ΄ ν΄λΌμ΄μΈνΈ JSμ μ λ¬λλ€.

```json
{"answerId":6,"writer":"μ¬μ±","contents":"νμ€νΈ","createdDate":1456066690411,"questionId":8,"timeFromCreateDate":1457066690411}
```

μ΄μ , μλ²μμ μλ΅ν μ΄ JSON λ°μ΄ν°λ₯Ό νμ©ν΄ HTMLμ λμ μΌλ‘ μμ±ν ν νλ©΄μ μΆλ ₯νλ©΄ λλ€. μκΉ μλ² μλ΅ μ±κ³΅ μ, `onSuccess()` ν¨μκ° νΈμΆλλλ‘ κ΅¬ννλ€. λ°λΌμ λμ μΌλ‘ HTMLμ μμ±νλ λΆλΆμ `onSuccess()` μ κ΅¬ννλ€.

```js
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
  });
};
...

function onSuccess(json, status) {
  var answerTemplate = $("#answerTemplate").html();
  var template = answerTemplate.format(json.writer, new Date(json.createdDate), json.contents, json.answerId);
  $(".qna-comment-slipp-articles").prepend(template);
}
```

- κ°λ¨ν HTML ννλ¦Ώκ³Ό μ΄ ννλ¦Ώμ κ°μ μ λ¬νλ `template()` ν¨μλ₯Ό `format()` μΌλ‘ κ΅¬ννκΈ°μ κ°λ¨νκ² κ΅¬νν  μ μλ€.
- λμ μΌλ‘ μμ±ν HTMLμ `qna-comment-slipp-articles` classμμ μ¬μ©ν  μ μλλ‘ `prepend` νμ¬ λ΅λ³ μ€ μ μΌ μμ μμΉνλλ‘ νλ€.
- μλλ HTML ννλ¦Ώμ΄λ€. ννλ¦Ώκ³Ό `template()` ν¨μλ₯Ό νμ©ν΄ λμ μΈ HTMLμ κ°λ¨νκ² μμ±ν  μ μλ€.

```html
<script type="text/template" id="answerTemplate">
	<article class="article">
		<div class="article-header">
			<div class="article-header-thumb">
				<img src="https://graph.facebook.com/v2.3/1324855987/picture" class="article-author-thumb" alt="">
			</div>
			<div class="article-header-text">
				{0}
				<div class="article-header-time">{1}</div>
			</div>
		</div>
		<div class="article-doc comment-doc">
			{2}
		</div>
		<div class="article-util">
			<ul class="article-util-list">
				<li>
					<a class="link-modify-article" href="/api/qna/updateAnswer/{3}">μμ </a>
				</li>
				<li>
					<form class="form-delete" action="/api/qna/deleteAnswer" method="POST">
						<input type="hidden" name="answerId" value="{4}" />
						<button type="submit" class="link-delete-article">μ­μ </button>
					</form>
				</li>
			</ul>
		</div>
	</article>
</script>
```

### π§ λ΅λ³ μ­μ νκΈ° μ€μ΅
- μ¬μ©μκ° μ­μ  λ²νΌμ ν΄λ¦­
- ν΄λΉ λ΅λ³ μ­μ  μμ²­μ μλ²λ‘ μ μ‘
- μλ²λ μμ²­μ λν΄ λ΅λ³μ μ­μ 
  - λ΅λ³ μ­μ  μ±κ³΅ μ, `next.model.Result` μ `ok()` μλ΅
  - μ€ν¨ μ, `fail("error message")` μλ΅
- ν΄λΌμ΄μΈνΈλ μλ² μλ΅ `status` κ°μ΄ `true` μΈ κ²½μ° HTMLμμ ν΄λΉ λ΅λ³μ HTMLμ μ­μ 
  - ν΄λ¦­ν μ­μ  λ²νΌ(`$(this)`)μμ κ°μ₯ κ°κΉμ΄ μλ `article` νκ·Έλ₯Ό μ°Ύμ μ­μ 

```js
$(".qna-comment").click(deleteAnswer);

function deleteAnswer(e) {
  e.preventDefault();

  var deleteBtn = $(this);
  var deleteId = deleteBtn.closest("form").serialize();

  $.ajax({
    type : 'post',
    url : '/api/qna/deleteAnswer',
    data : deleteId,
    dataType : 'json',
    error : onError,
    success : function (json, status) {
      if (json.status) {
        deleteBtn.closest("article").remove();
      }
    },
  });
}
```

- μ­μ  λ²νΌ ν΄λ¦­ μ΄λ²€νΈ μ²λ¦¬μ μλ²μ μ­μ  μμ²­μ λ³΄λ΄λ ν¨μλ₯Ό κ΅¬ννλ€.
  - `deleteBtn` μΌλ‘ ν΄λ¦­λ μ­μ  λ²νΌμ κ°μ Έμ€κ³ , μ΄μ κ°μ₯ κ°κΉμ΄ `form` νκ·Έμ μλ ₯ κ°μ κ°μ Έμ¨λ€. (`deleteId` μλ `answerId` μ λ³΄)
  - μλ² μλ΅μ΄ μ±κ³΅μ΄λ©΄, `deleteBtn` μμ κ°μ₯ κ°κΉμ΄ `article` νκ·Έλ₯Ό μ­μ νλ€.

```java
public void delete(long answerId) {
    JdbcTemplate jdbcTemplate = new JdbcTemplate();
    String sql = "DELETE FROM ANSWERS WHERE answerId = ?";
    jdbcTemplate.update(sql, answerId);
}
```

- λ΅λ³μ μ­μ λ₯Ό μν΄, `AnswerDao` μ `delete()` λ©μλλ₯Ό μΆκ° κ΅¬ννλ€.

```java
public class DeleteAnswerController implements Controller {
    private static final Logger log = LoggerFactory.getLogger(AddAnswerController.class);

    @Override
    public String execute(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        Long deleteId = Long.parseLong(req.getParameter("answerId").replaceAll("[{}]", ""));
        log.debug("deleteId : {}", deleteId);

        AnswerDao answerDao = new AnswerDao();
        answerDao.delete(deleteId);

        ObjectMapper mapper = new ObjectMapper();
        resp.setContentType("application/json;charset=UTF-8");
        PrintWriter out = resp.getWriter();
        out.print(mapper.writeValueAsString(Result.ok()));
        return null;
    }
}
```

- `AddAnswerController` μ λμΌνκ² μ΄λ₯Ό μ²λ¦¬ν  μ»¨νΈλ‘€λ¬λ₯Ό μμ±νκ³  mappingνλ€.
- κΈλ°© μμ±ν `delete()` λ©μλλ₯Ό μ΄μ©ν΄ λ΅λ³μ μ­μ νκ³ , `Result.ok()` λ©μλλ₯Ό μ΄μ©νμ¬ μ±κ³΅μ μΈ JSON λ°μ΄ν°λ₯Ό μλ΅νλ€.

> μμ κ°μ΄ κ΅¬ν μ, ajaxμμ `success` λ‘ λμ΄κ°μ§μ§ μμ νλ©΄μ JSONμ΄ κ·Έλλ‘ μΆλ ₯λλ€. μ μλλ κ±΄μ§ μ΄μ λ₯Ό λͺ¨λ₯΄κ² λ€ ...

---

## π© MVC νλ μμν¬ μκ΅¬μ¬ν­ 2λ¨κ³
MVC νλ μμν¬ κ΅¬μ‘°μ λΉνμ΄ λ³΄μΈλ€. `DeleteAnswerController` μ½λμ λ¬Έμ μ μ μ°Ύμλ³΄μ.

**μ²«λ²μ§Έ λ¬Έμ μ **<br/>
: JSONμΌλ‘ μλ΅μ λ³΄λ΄λ κ²½μ° μ΄λν  JSP νμ΄μ§κ° μλ€λ³΄λ λΆνμνκ² `null` μ λ°νν΄μΌ νλ€. (AJAXμμ μ¬μ©ν  μ»¨νΈλ‘€λ¬λ λ°ν κ°μ΄ κ΅³μ΄ νμμλ€.)

ν΄λΉ λ¬Έμ μ μ΄ λ°μν μ΄λ΄λ μ»¨νΈλ‘€λ¬μμ μλ΅ν  λ·°κ° JSP νλμμ JSPμ JSON λ κ°λ‘ μ¦κ°νκΈ° λλ¬Έμ΄λ€. λ·°κ° JSP(λλ μλΈλ¦Ώ)μΌ κ²½μ° ν­μ `String` μ λ°νν΄μΌ νμ§λ§, JSONμΌ κ²½μ°λ λ°ν κ°μ΄ νμμλ€. 
- μ΄λ₯Ό ν΄κ²°νκΈ° μν΄ `DispatcherServlet` μμ `execute()` λ©μλμ λ°ν κ°μ΄ `null` μΌ λ μλ¬΄ μ²λ¦¬λ νμ§ μλλ‘ `if/else` ννλ‘ κ΅¬νν  μ μλ€.
  - νμ§λ§ λ λ€λ₯Έ λ·°κ° μΆκ°λλ€λ©΄, μ΄μ λν μμΈ μ²λ¦¬κ° νμν΄μ§λ€. κ·Όλ³Έμ μΈ ν΄κ²°μ±μ΄ λμ§ λͺ»νλ€.

**λλ²μ§Έ λ¬Έμ μ **<br/>
: `AddAnswerController` μ `DeleteAnswerController` λ₯Ό λ³΄λ©΄, μλ° κ°μ²΄λ₯Ό JSONμΌλ‘ λ³ννκ³  μλ΅νλ λΆλΆμ μ€λ³΅μ΄ λ°μνλ€. μ΄λ₯Ό μ κ±°νλ€.

- μ€λ³΅ μ½λλ₯Ό λ³λμ λ©μλλ‘ λΆλ¦¬ν ν `Abstract JsonController` μ κ°μ λΆλͺ¨ ν΄λμ€λ₯Ό λ§λ€μ΄ μ€λ³΅μ ν΄κ²°ν  μ μλ€.

### π§ μκ΅¬μ¬ν­ λΆλ¦¬ λ° ννΈ
- λ·°λ₯Ό μΆμνν μΈν°νμ΄μ€λ₯Ό μΆκ°νλ€. (μ΄μ μ `Controller` μΈν°νμ΄μ€λ₯Ό μΆκ°ν κ²κ³Ό λμΌ)
  - `View` λΌλ μ΄λ¦μ μΈν°νμ΄μ€λ₯Ό μΆκ°νλ€.
- `View` λ₯Ό κ΅¬ννλ `JspView` μ `JsonView` λ₯Ό μμ±ν΄ κ° κΈ°λ₯μ λ§κ² κ΅¬ννλ€.
  - `JspView` μ μμ±μλ μ΄λν  URLμ μΈμλ‘ λ°λλ€. μ¦, `Controller` μ `execute()` λ©μλμ λ°ν κ°μ κ°μ§λ€.
  - `JsonView` λ μμ±μλ‘ μΈμλ₯Ό μ λ¬νμ§ μμλ λλ€.
  - `JspView` μ `render()` λ©μλλ `DispatcherServlet` μ `move()` λ₯Ό κ΅¬ννλ€.
  - `JsonView` λ μλ° κ°μ²΄λ₯Ό JSONμΌλ‘ λ³ν ν μλ΅μ λ³΄λ΄λ κΈ°λ₯μ κ΅¬ννλ€.
  - `HttpServletRequest` λ₯Ό ν΅ν΄ μ λ¬νλ λͺ¨λ  κ°μ `Map` μ μ μ₯ν ν JSONμΌλ‘ λ³ννλ€.
- `Controller` μΈν°νμ΄μ€μ λ°ν κ°μ `String` μμ `View` λ‘ λ³κ²½νλ€.
- κ° `Controller` μμ `String` λμ  μλ‘ μμ±ν `JspView` μ `JsonView` μ€ νλλ₯Ό μ¬μ©νλλ‘ λ³κ²½νλ€.
- `DispatcherServlet` μμ `String` λμ  `View` μΈν°νμ΄μ€λ₯Ό μ¬μ©νλλ‘ λ³κ²½νλ€.

<img src="../../images/classDiagram2.png" width="80%">

**`HttpServletRequest` λ₯Ό μ¬μ©νλ©΄μ λ°μνλ μ΄μ**
- `JsonView` λ `HttpServletRequest` μ μΆκ°λμ΄ μλ λͺ¨λ  λ°μ΄ν°λ₯Ό JSONμΌλ‘ λ³κ²½νλ€.
- κ·Έλ°λ° `HttpRequestServlet` μ κ²½μ° μλΈλ¦Ώ νν°, μλΈλ¦Ώμ μ¬λ¬ λ¨κ³λ₯Ό κ±°μΉλ©΄μ κ°λ°μ λͺ¨λ₯΄κ² κ°μ΄ μΆκ°λ  μλ μλ€.
  - μ΄λ‘ μΈν΄ μλμΉ μμ λ°μ΄ν°κ° λΆνμνκ² JSONμΌλ‘ λ³κ²½λμ΄ ν΄λΌμ΄μΈνΈ μλ΅μΌλ‘ λ³΄λ΄μ§ μλ μλ€.
- `HttpRequestServlet` λ₯Ό ν΅ν΄ λ°μ΄ν°λ₯Ό μ λ¬νμ§ μκ³  κ°λ°μκ° μνλ λ°μ΄ν°λ§ λ·°μ μ λ¬ν  μ μλλ‘ λͺ¨λΈ λ°μ΄ν°μ λν μΆμν μμμ μ§ννλ€.
  - λͺ¨λΈ λ°μ΄ν°λ₯Ό `View` μ κ°μ΄ μ λ¬ν΄μΌ νλ―λ‘, `ModelAndView` μ κ°μ μ΄λ¦μ ν΄λμ€λ₯Ό μλ‘ μΆκ°νλ€.
  - `ModelAndView` λ `View` μ λͺ¨λΈ λ°μ΄ν°λ₯Ό `Map<String, Object>` ννλ‘ κ΄λ¦¬νλλ‘ κ΅¬ννλ€.
- `View` μ `render()` λ©μλμ λͺ¨λΈ λ°μ΄ν°λ₯Ό μΈμλ‘ μΆκ°νκ³  `JspView` μ `JsonView` λ₯Ό μμ νλ€.
  - `View` μ `render()` λ©μλ μΈμμ `Map` μ μΆκ°νλ€.
  - `JspView` μ `render()` λ©μλλ λͺ¨λΈ λ°μ΄ν°λ₯Ό κΊΌλ΄ `HttpServletRequest` μ μ λ¬νλ€.
  - `JsonView` μ `render()` λ©μλλ `HttpServletRequest` λ©μλμμ `Map` μΌλ‘ λ³κ²½νλ λΆλΆμ μ κ±°νλ€.
- `Controller` μ λ°ν κ°μ `View` β `ModelAndView`, κ° `Controller` κ΅¬νμ²΄λ `HttpServletRequest` β `ModelAndView`, `DispatcherServlet` μμ `View` β `ModelAndView`

---

## π© MVC νλ μμν¬ κ΅¬ν 2λ¨κ³
### π§ View μΈν°νμ΄μ€ μΆκ°
JSPμ JSON λ·°λ₯Ό μΆμνν `View` μΈν°νμ΄μ€λ₯Ό μΆκ°νλ€.

```java
public interface View {
    void render(HttpServletRequest req, HttpServletResponse resp) throws Exception;
}
```

### π§ JspViewμ JsonView μΆκ°
JSPμ λν νμ΄μ§ μ΄λ μ²λ¦¬λ₯Ό λ΄λΉνλ `JspView` λ₯Ό μΆκ°νλ€. μ΄λ μ΄λν  λ·° μ΄λ¦μ μμ±μλ‘ λ°μ ν `render()` λ©μλ νΈμΆ μ ν΄λΉ νμ΄μ§λ‘ μ΄λνλ©΄ λλ€. 
- `DispatcherServlet` μ `move()` λ©μλ κ΅¬νλΆλ₯Ό `render()` λ©μλμ κ΅¬ννλ€.

```java
public class JspView implements View {
    private static final String DEFAULT_REDIRECT_PREFIX = "redirect:";
    
    private String viewName;
    
    public JspView(String viewName) {
        if (viewName == null) {
            throw new NullPointerException("viewName is null. μ΄λν  URLμ μΆκ°ν΄μ£ΌμΈμ.");
        }
        this.viewName = viewName;
    }
    
    @Override
    public void render(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        if (viewName.startsWith(DEFAULT_REDIRECT_PREFIX)) {
            resp.sendRedirect(viewName.substring(DEFAULT_REDIRECT_PREFIX.length()));
            return;
        }

        RequestDispatcher rd = req.getRequestDispatcher(viewName);
        rd.forward(req, resp);
    }
}
```

JSON λ°μ΄ν° μλ΅μ λ΄λΉν  `JsonView` λ₯Ό μΆκ°νλ€. μ΄λν  URLμ΄ μμΌλ―λ‘, `render()` λ©μλλ `HttpServletRequest` λ₯Ό ν΅ν΄ μ λ¬λλ μλ° κ°μ²΄λ₯Ό JSONμΌλ‘ λ³νν ν μλ΅νλ κΈ°λ₯μ κ°μ§λλ‘ κ΅¬ννλ€.

```java
public class JsonView implements View {
    @Override
    public void render(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        resp.setContentType("application/json; charset=UTF-8");
        PrintWriter out = resp.getWriter();
        out.print(mapper.writeValueAsString(createModel(req)));
    }
    
    private Map<String, Object> createModel(HttpServletRequest req) {
        Enumeration<String> names = req.getAttributeNames();
        Map<String, Object> model = new HashMap<>();
        while(names.hasMoreElements()) {
            String name = names.nextElement();
            model.put(name, req.getAttribute(name));
        }
        return model;
    }
}
```

### π§ Controller λ°ν κ°μ Stringμμ Viewλ‘ μμ 
μ΄μ  `Controller` κ° `String` μ λ°ννμ§ μκ³ , `View` λ₯Ό λ°ννλλ‘ μμ νλ€.
- `execute()` μ λ°ννμ `View` λ‘ μμ νλ€.

### π§ Controller κ΅¬νμ²΄κ° String λμ  Viewλ₯Ό λ°ννλλ‘ μμ 
μ»΄νμΌ μλ¬ ν΄κ²°μ μν΄ λͺ¨λ  `Controller` κ΅¬νμ²΄κ° `String` λμ  `View` λ₯Ό λ°ννλλ‘ μμ νκ³  λ°ννμ λ§κ² `new JspView()` or `new JsonView()` λ‘ μμ νλ€.

### π§ DispatcherServletμ΄ Viewμ μμμ μμνλλ‘ μμ 
`DispatcherServlet` μμ `String` κ°μ λ°μ μ²λ¦¬νλ μμμ `View` λ₯Ό νμ©νλλ‘ μμ νλ€.

```java
@WebServlet(name = "dispatcher", urlPatterns = "/", loadOnStartup = 1)
public class DispatcherServlet extends HttpServlet {
    ...

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String requestUri = req.getRequestURI();
        logger.debug("Method : {}, Request URI : {}", req.getMethod(), requestUri);

        Controller controller = rm.findController(requestUri);
        try {
            View view = controller.execute(req, resp);
            view.render(req, resp);
        } catch (Throwable e) {
            logger.error("Exception : {}", e);
            throw new ServletException(e.getMessage());
        }
    }
}
```

- `DispatcherServlet` μμ `move()` λ©μλλ₯Ό μ΄μ©ν΄ μ²λ¦¬νλ νμ΄μ§ μ΄λ μμμ `JspView` μ `render()` λ©μλλ‘ μ΄λνκΈ°μ λ κΉλν΄μ‘λ€.

### π§ ModelAndView μΆκ°λ₯Ό ν΅ν λͺ¨λΈ μΆμν
λ·°λ₯Ό ν¬ν¨ν΄ λͺ¨λΈ λ°μ΄ν°μ λν μΆμνλ₯Ό λ΄λΉνλ `ModelAndView` λ₯Ό κ΅¬ννλ€.

```java
public class ModelAndView {
    private View view;
    private Map<String, Object> model = new HashMap<>();
    
    public ModelAndView(View view) {
        this.view = view;
    }
    
    public ModelAndView addObject(String attributeName, Object attributeValue) {
        model.put(attributeName, attributeValue);
        return this;
    }
    
    public Map<String, Object> getModel() {
        return Collections.unmodifiableMap(model);
    }
    
    public View getView() {
        return view;
    }
}
```

- `View` μ `render()` λ©μλμ λͺ¨λΈ λ°μ΄ν°λ₯Ό μΈμλ‘ μ λ¬ν  μ μλλ‘ λ³κ²½νλ€.

```java
public interface View {
    void render(Map<String, ?> model, HttpServletRequest req, HttpServletResponse resp) throws Exception;
}
```

- `View` μΈν°νμ΄μ€ λ³κ²½μ λ°λΌ `JspView` μ `JsonView` λν μμ νλ€.
- `Controller` μΈν°νμ΄μ€μ λ°ν κ° λν `ModelAndView` λ‘ μμ νλ€.

```java
public class JspView implements View {
  @Override
  public void render(Map<String, ?> model, HttpServletRequest req, HttpServletResponse resp) throws Exception {
    if (viewName.startsWith(DEFAULT_REDIRECT_PREFIX)) {
        resp.sendRedirect(viewName.substring(DEFAULT_REDIRECT_PREFIX.length()));
        return;
    }
    
    Set<String> keys = model.keySet();
    for (String key : keys) {
        req.setAttribute(key, model.get(key));
    }

    RequestDispatcher rd = req.getRequestDispatcher(viewName);
    rd.forward(req, resp);
  }
}

...

public class JsonView implements View {
    @Override
    public void render(Map<String, ?> model, HttpServletRequest req, HttpServletResponse resp) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        resp.setContentType("application/json; charset=UTF-8");
        PrintWriter out = resp.getWriter();
        out.print(mapper.writeValueAsString(model));
    }
}

... 

public interface Controller {
    ModelAndView execute(HttpServletRequest req, HttpServletResponse resp) throws Exception;
}
```

`ModelAndView` μμ±μ λ μ½κ² λμμ£ΌκΈ° μν΄ `AbstractController` λ₯Ό μΆκ°ν ν μλ λ λ©μλλ₯Ό μ κ³΅νλ€.

```java
public abstract class AbstractController implements Controller {
    protected ModelAndView jspView(String forwardUrl) {
        return new ModelAndView(new JspView(forwardUrl));
    }

    protected ModelAndView jsonView() {
        return new ModelAndView(new JsonView());
    }
}
```

- `Controller` κ΅¬νμ²΄κ° `View` κ° μλ `ModelAndView` λ₯Ό λ°ννλλ‘ μμ νλ€.
- κ·Έλ¦¬κ³  μ§κΈκΉμ§ `HttpServletRequest` λ₯Ό ν΅ν΄ μ λ¬νλ λͺ¨λΈ λ°μ΄ν°λ₯Ό `ModelAndView` λ₯Ό ν΅ν΄ μ λ¬νλλ‘ μμ νλ€.

```java
public class HomeController extends AbstractController {
    private QuestionDao questionDao = new QuestionDao();
    
    @Override
    public ModelAndView execute(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        return jspView("home.jsp").addObject("questions", questionDao.findAll());
    }
}

...

public class AddAnswerController extends AbstractController {
    private static final Logger log = LoggerFactory.getLogger(AddAnswerController.class);
    private AnswerDao answerDao = new AnswerDao();

    @Override
    public ModelAndView execute(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        Answer answer = new Answer(req.getParameter("writer"), req.getParameter("contents"),
                Long.parseLong(req.getParameter("questionId")));
        log.debug("answer : {}", answer);

        Answer savedAnswer = answerDao.insert(answer);
        return jsonView().addObject("answer", savedAnswer);
    }
}
```

λͺ¨λ  `Controller` κ΅¬νμ²΄μ λν μμ μ΄ λλλ©΄, `DispatcherServlet` μ΄ `View` κ° μλ `ModelAndView` λ₯Ό μ¬μ©νλλ‘ λ¦¬ν©ν λ§νλ€.

```java
@WebServlet(name = "dispatcher", urlPatterns = "/", loadOnStartup = 1)
public class DispatcherServlet extends HttpServlet {
    ...

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ...

        ModelAndView mav;
        try {
            mav = controller.execute(req, resp);
            View view = mav.getView();
            view.render(mav.getModel(), req, resp);
        } catch (Throwable e) {
            logger.error("Exception : {}", e);
            throw new ServletException(e.getMessage());
        }
    }
}
```

## π μΆμ²
**μλ° μΉ νλ‘κ·Έλλ° Next Step : νλμ© λ²κ²¨κ°λ μνκ»μ§ νμ΅λ²** - λ°μ¬μ±
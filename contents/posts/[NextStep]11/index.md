---
title: "π 11μ₯ μμ‘΄κ΄κ³ μ£Όμ(DI)μ ν΅ν νμ€νΈνκΈ° μ¬μ΄ μ½λ λ§λ€κΈ°"
description: "μλ° μΉ νλ‘κ·Έλλ° μ± μ λ¦¬"
date: 2022-02-21
update: 2022-02-21
tags:
  - Java
  - Refactoring
  - Framework
series: "π μλ° μΉ νλ‘κ·Έλλ° Next Step"
---

<em>[μλ° μΉ νλ‘κ·Έλλ° Next Step - λ°μ¬μ±]μ μ½κ³  μΈμ©νκ³  μ λ¦¬νλ POSTμλλ€.</em>

## π© μ DIκ° νμνκ°?
λ¨Όμ  μμ‘΄κ΄κ³(dependency)μ λν΄ μκ°ν΄λ³΄μ. κ°μ²΄μκ² μμ‘΄κ΄κ³λ λ¬΄μμ΄κ³  μ΄λ€ κ²½μ°μ μμ‘΄κ΄κ³κ° λ°μν κΉ?

**μμ‘΄κ΄κ³**<br/>
: κ°μ²΄ νΌμ λͺ¨λ  μΌμ μ²λ¦¬νκΈ° νλ€κΈ°μ μμμ λ€λ₯Έ κ°μ²΄μκ² μμνλ©΄μ λ°μνλ€.
- μ¦, **λ΄κ° κ°μ§ μ±μκ³Ό μ­ν μ λ€λ₯Έ κ°μ²΄μκ² μμνλ μκ° λ°μ**νλ κ²μ΄λ€.
- μλ₯Ό λ€μ΄, `QnaService` λ μ§λ¬Έ μ­μ  κΈ°λ₯ κ΅¬νμ μν΄ `QuestionDao` , `AnswerDao` μκ² DB μ κ·Ό λ‘μ§μ μμνκ³  μλ€.
  - μ΄λ `QnaService` κ° `QuestionDao` μ `AnswerDao` μ μμ‘΄νκ³  μλ€λ μλ―Έμ΄λ€.

**DI**λ "κ°μ²΄ κ° μμ‘΄κ΄κ³λ₯Ό μ΄λ»κ² ν΄κ²°νλλ"μ λ°λ₯Έ μλ‘μ΄ μ κ·Ό λ°©μμ΄λ€. 
- μ΄μ κΉμ§λ μμ‘΄κ΄κ³μ μλ κ°μ²΄λ₯Ό μ¬μ©νκΈ° μν΄ κ°μ²΄λ₯Ό μ§μ  μμ±νκ³ , μ¬μ©νλ λ°©μμΌλ‘ κ΅¬ννλ€. (`QnaService` λν `QuestionDao` μ `AnswerDao` μ¬μ©μ μν΄ μμ±νκ³  μ¬μ©νλ€.)

νμ§λ§ μ΄κ°μ λ°©μμΌλ‘ κ΅¬ν μ μ μ°ν κ°λ°μ νκ³κ° μκΈ°μ **μΈμ€ν΄μ€λ₯Ό μμ±νλ μ±μ**κ³Ό **μ¬μ©νλ μ±μ**μ λΆλ¦¬νμλ κ²μ΄ **DIμ ν΅μ¬**μ΄λ€.
- μ¦ μ μμμ `QnaService` λ `QuestionDao` μ `AnswerDao` μ λν μμ± μμ΄ μ¬μ©λ§ ν¨μΌλ‘μ¨ μ μ°μ±μ λμ΄μλ λ°©μμ΄λ€.

κ·ΈλΌ μ§κΈκΉμ§μ κ΅¬ν λ°©μμ λ¬Έμ μ μ κ°λ¨ν μμ λ‘ μ΄ν΄λ³΄λλ‘ νλ€.

```java
public class DateMessageProvider {
    public String getDateMessage() {
        Calendar now = Calendar.getInstance();
        int hour = now.get(Calendar.HOUR_OF_DAY);

        if (hour < 12) {
            return "μ€μ ";
        }
        return "μ€ν";
    }
}
```

- νμ¬ μμ€ν μκ°μ λ°λΌ μ€μ  λλ μ€νλ₯Ό λ°ννλ ν΄λμ€μ΄λ€. μ΄ ν΄λμ€μ `getDateMessage()` μ λν νμ€νΈ ν΄λμ€λ λ€μκ³Ό κ°μ΄ κ΅¬νν  μ μλ€.

```java
public class DateMessageProviderTest {
    @Test
    public void μ€μ () throws Exception {
        DateMessageProvider provider = new DateMessageProvider();
        assertEquals("μ€μ ", provider.getDateMessage());
    }

    @Test
    public void μ€ν() throws Exception {
        DateMessageProvider provider = new DateMessageProvider();
        assertEquals("μ€ν", provider.getDateMessage());
    }
}
```

- μ νμ€νΈλ₯Ό μ€ννλ©΄, λ°λμ νλμ νμ€νΈλ μ€ν¨νλ€. μκ΅¬μ¬ν­μ μ΄ λ νμ€νΈκ° λͺ¨λ μ±κ³΅νλλ‘ λ¦¬ν©ν λ§νλ κ²μ΄λ€.
  - μ΄λ₯Ό μν΄μλ λ¨Όμ  νμ€νΈκ° λͺ¨λ μ±κ³΅νμ§ λͺ»νλ μμΈμ μμμΌ ν  κ²μ΄λ€.

μμΈμ, `DateMessageProvider` κ° `Calendar` μ μμ‘΄κ΄κ³λ₯Ό κ°μ§λλ° νμ€νΈλ₯Ό μν΄ `Calendar` μ μκ°μ λ³κ²½ν  μ μλ λ°©λ²μ΄ μλ€.
- **μμ€μ½λλ₯Ό μ»΄νμΌνλ μμ μ `Calendar` μΈμ€ν΄μ€κ° μ΄λ―Έ κ²°μ **λμ΄ λ²λ¦¬κΈ° λλ¬Έμ΄λ€.
  - μ΄κ°μ μμ‘΄κ΄κ³λ₯Ό κ°νκ² κ²°ν©(**tightly coupling**)λμ΄ μλ€κ³  νλ€.
- λͺ¨λ  νμ€νΈμ μ±κ³΅μ μν΄μλ **`Calendar` μμ λ°νλλ μκ°μ λ³κ²½ν  μ μλλ‘ `DateMessageProvider` λ₯Ό λ¦¬ν©ν λ§**ν΄μΌ νλ€.
  - μ¦, `getDateMessage()` κ° μλ `DateMessageProvider` μΈλΆμμ `Calendar` μΈμ€ν΄μ€ μμ± ν μ λ¬νλ κ΅¬μ‘°λ‘ λ°κΏμΌ νλ€.
    - μμ±μλ₯Ό ν΅ν΄ μ λ¬νκ±°λ, `getDateMessage()` λ©μλ μΈμλ‘ μ λ¬ν  μ μλ€. (λλ²μ§Έ λ°©λ² μ¬μ©)

```java
public class DateMessageProvider {
    public String getDateMessage(Calendar now) {
        int hour = now.get(Calendar.HOUR_OF_DAY);

        if (hour < 12) {
            return "μ€μ ";
        }
        return "μ€ν";
    }
}
```

```java
public class DateMessageProviderTest {
    @Test
    public void μ€μ () throws Exception {
        DateMessageProvider provider = new DateMessageProvider();
        assertEquals("μ€μ ", provider.getDateMessage(createCurrentDate(11)));
    }

    @Test
    public void μ€ν() throws Exception {
        DateMessageProvider provider = new DateMessageProvider();
        assertEquals("μ€ν", provider.getDateMessage(createCurrentDate(13)));
    }

    public Calendar createCurrentDate(int hourOfDay) {
        Calendar now = Calendar.getInstance();
        now.set(Calendar.HOUR_OF_DAY, hourOfDay);
        return now;
    }
}
```

μ΄μ  λͺ¨λ  νμ€νΈκ° μ±κ³΅μ΄λ€.
- `DateMessageProvider` κ° μμ‘΄νκ³  μλ `Calendar` μΈμ€ν΄μ€μ μμ±μ `DateMessageProvider` κ° κ²°μ νμ§ μκ³ , μΈλΆλ‘λΆν° μ λ¬λ°μμΌλ‘μ¨ μνλ μκ°μΌλ‘ λ³κ²½ν΄ λͺ¨λ  νμ€νΈλ₯Ό μ±κ³΅ν  μ μμλ€.
- μ΄μ²λΌ DIλ **κ°μ²΄ κ°μ μμ‘΄κ΄κ³μ λν κ²°μ κΆ**μ, μμ‘΄κ΄κ³λ₯Ό κ°μ§λ κ°μ²΄(`DateMessageProvider`)κ° κ°μ§λ κ²μ΄ μλ **μΈλΆμ λκ΅°κ°κ° λ΄λΉ**νλλ‘ λ§‘κ²¨ λ μ μ°ν κ΅¬μ‘°λ‘ κ°λ°νλ€.

---

## π© DIλ₯Ό μ μ©νλ©΄μ μμ΄λ λΆνΈν¨ λλ λΆλ§
μ§λ¬Έ/λ΅λ³ κ²μνμ `QnaService` λ₯Ό DIκΈ°λ°μΌλ‘ λ³κ²½νλ©΄μ κΈ°μ‘΄μ λ°©μκ³Ό μ΄λ»κ² λ€λ₯΄κ³ , μ΄λ€ λΆνΈν¨μ΄ μλμ§ μ΄ν΄λ³Έλ€. 

```java
public class QnaService {
    private static QnaService qnaService;

    private QuestionDao questionDao = QuestionDao.getInstance();
    private AnswerDao answerDao = AnswerDao.getInstance();

    private QnaService() {
    }

    public static QnaService getInstance() {
        if (qnaService == null) {
            qnaService = new QnaService();
        }
        return qnaService;
    }
    ...

}
```

- λ³΄μ΄λ κ²κ³Ό κ°μ΄ `QuestionDao` μ `AnswerDao` μ μμ‘΄κ΄κ³λ₯Ό κ°μ§λ€. μ΄λ₯Ό DIκ΅¬μ‘°λ‘ λ³κ²½ν΄λ³Έλ€.

```java
public class QnaService {
    private static QnaService qnaService;

    private QuestionDao questionDao;
    private AnswerDao answerDao;

    private QnaService(QuestionDao questionDao, AnswerDao answerDao) {
        this.questionDao = questionDao;
        this.answerDao = answerDao;
    }

    public static QnaService getInstance(QuestionDao questionDao, AnswerDao answerDao) {
        if (qnaService == null) {
            qnaService = new QnaService(questionDao, answerDao);
        }
        return qnaService;
    }
    ...

}
```

- μμμ λ€λ£¬ `DateMessageProvider` μμ μμλ `getDateMessage()` μμλ§ λ°μνλ μμ‘΄κ΄κ³λ₯Ό ν΄κ²°νκΈ° μν΄ λ©μλ μΈμλ‘ μ λ¬νλ€.
- `QnaService` μ `QuestionDao` , `AnswerDao` λ `QnaService` λ©μλ μ μ²΄μμ μ¬μ©λκΈ°μ μμ±μλ₯Ό ν΅ν΄ νλλ‘ κ΄λ¦¬νλλ‘ λ³κ²½νλ€.
  - `getInstance()` λ©μλλ₯Ό λ³κ²½νκΈ°μ μ΄λ₯Ό μ¬μ©νλ λ€λ₯Έ μ»¨νΈλ‘€λ¬μμ μλ¬κ° λ°μνλ€. μ΄λ₯Ό `private QnaService qnaService = QnaService.getInstance(QuestionDao.getInstance(), AnswerDao.getInstance());` μ κ°μ΄ κ³ μ³μ€λ€.

μ΄μ  νμ€νΈλ₯Ό μνν νλ°, `QuestionDao` μ `AnswerDao` κ° DBμμ μμ‘΄κ΄κ³λ₯Ό κ°μ§κΈ°μ μ΄λ₯Ό κ°μ§μ§ μλλ‘ λ³κ²½ν  μ μμ΄μΌ DBμ μμ‘΄νμ§ μλ νμ€νΈκ° κ°λ₯νλ€.
- `QuestionDao` μ `AnswerDao` λ₯Ό μμν΄ λ©μλλ₯Ό μ€λ²λΌμ΄λ©νμ¬ ν΄κ²°νλ€.
  - λ¨Όμ  `MockQuestionDao` ν΄λμ€λ₯Ό μΆκ°νκ³  `QuestionDao` λ₯Ό μμνλ€.
  - μ΄λ, `QuestionDao` μ κΈ°λ³Έ μμ±μκ° **μ±κΈν€ ν¨ν΄μ μ μ©**μ μν΄ `private` μΌλ‘ κ΅¬ννμ¬ μμν  μ μλ€.

λ λ€λ₯Έ λ°©λ²μΌλ‘, κ°μ²΄ κ°μ μμ‘΄κ΄κ³μ λν κ°ν κ²°ν©(tightly coupling)μ μ€μ΄κΈ° μν΄ DIλ₯Ό μ μ©νλ©΄μ **μΈν°νμ΄μ€λ₯Ό μ¬μ©**νλ€.
- `QuestionDao` β `JdbcQuestionDao` renaming
- `AnswerDao` β `JdbcAnswerDao` renaming
- μΈν°νμ΄μ€ μ΄λ¦μ `QuestionDao` , `AnswerDao` λ‘ μ¬μ©
- `JdbcQuestionDao` , `JdbcAnswerDao` μ μμ‘΄νκ³  μλ `QnaService` μ½λλ₯Ό μλ‘ μΆκ°ν μΈν°νμ΄μ€ κ°κ°μ μμ‘΄νλλ‘ λ³κ²½
- `MockQuestionDao` , `MockAnswerDao` λ₯Ό κ΅¬ν

```java
public class MockAnswerDao implements AnswerDao {
    private Map<Long, Answer> answers = Maps.newHashMap();

    @Override
    public Answer insert(Answer answer) {
        return answers.put(answer.getAnswerId(), answer);
    }

    @Override
    public Answer findById(long answerId) {
        return answers.get(answerId);
    }

    @Override
    public List<Answer> findAllByQuestionId(long questionId) {
        return answers.values().stream()
                .filter(a -> a.getQuestionId() == questionId)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long answerId) {
        answers.remove(answerId);
    }
}
```

- `MockQuestionDao` λν μμ λμΌνκ² κ°λ¨ν λ©λͺ¨λ¦¬ DB μ­ν μ νλλ‘ κ΅¬ννλ€.
- μ΄μ  νμ€νΈ μ½λλ₯Ό μΆκ°νλ€.

```java
public class QnaServiceTest {
    private QnaService qnaService;
    private MockQuestionDao questionDao;
    private MockAnswerDao answerDao;

    @Before
    public void setup() {
        questionDao = new MockQuestionDao();
        answerDao = new MockAnswerDao();
        qnaService = QnaService.getInstance(questionDao, answerDao);
    }

    @Test(expected = CannotDeleteException.class)
    public void deleteQuestion_μλ_μ§λ¬Έ() throws Exception {
        qnaService.deleteQuestion(1L, newUser("userId"));
    }

    @Test(expected = CannotDeleteException.class)
    public void deleteQuestion_λ€λ₯Έ_μ¬μ©μ() throws Exception {
        Question question = newQuestion(1L, "javajigi");
        questionDao.insert(question);
        qnaService.deleteQuestion(1L, newUser("userId"));
    }

    @Test
    public void deleteQuestion_κ°μ_μ¬μ©μ_λ΅λ³μμ() throws Exception {
        Question question = newQuestion(1L, "javajigi");
        questionDao.insert(question);
        qnaService.deleteQuestion(1L, newUser("javajigi"));
    }
}
```

- `newUser` μ `newQuestion` λ©μλλ `model` μ κ° ν΄λμ€ νμ€νΈ μ½λμ κ΅¬ννλ€.
- μ νμ€νΈμμ `deleteQuestion_κ°μ_μ¬μ©μ_λ΅λ³μμ()` λ§ "μ‘΄μ¬νμ§ μλ μ§λ¬Έμλλ€." λΌλ μλ¬κ° λ°μνλ κ²μ νμΈν  μ μλ€. λΆλͺ μ§λ¬Έμ μΆκ°νλλ°λ μ΄λ¬ν μλ¬κ° λ¬λ€.
  - μ΄λ **`QnaService` κ° μ±κΈν€ μΈμ€ν΄μ€**μ΄κΈ°μ λ°μνλ μλ¬μ΄λ€.
  - μ¦, `QnaService` κ° μ°Έμ‘°νλ `QuestionDao` (μ²μ μΈμ€ν΄μ€ μμ± μ ν΄λΉ μΈμ€ν΄μ€)μ νμ€νΈ λ©μλμμ μμ±ν μΈμ€ν΄μ€κ° λ€λ₯΄λ€λ κ²μ΄λ€.
  - μ΄λ νμ€νΈ λ°μ΄ν°λ₯Ό μ΄κΈ°ννλ μμμ `setup()` λ©μλμμλ§ νλλ‘ λ³κ²½ν΄ ν΄κ²°ν  μ μλ€.

---

## π© λΆλ§ ν΄μνκΈ°
- μ±κΈν€ ν¨ν΄μ μ¬μ©ν¨μΌλ‘ μΈν΄ νμ€νΈμ μ΄λ €μμ΄ μμλ€. μ΄λ€ ννλ‘λ  νμ€νΈν  μ μμ§λ§ κ³ λ €ν΄μΌ ν  λΆλΆμ΄ λ§μμ§λ€λ κ²μ λ°κ°μ§ μλ€. 
- νμ€νΈλ₯Ό μν΄ λ§€λ² `Mock` κ°μ²΄λ₯Ό λ§λλ κ²μ λ§μ λΉμ©μ΄ λλ μμμ΄λ€.

### π§ μ±κΈν€ ν¨ν΄μ μ κ±°ν DI
μ΄ λμμΈ ν¨ν΄μ μ΄ν΄νκΈ°λ κ°μ₯ μ½κΈ°μ λλ¦¬ μ¬μ©λμλ€. νμ§λ§ κ·Έμ λ°λ₯Έ λ¨μ λ λ§λ€. 
- μ±κΈν€ ν¨ν΄μΌλ‘ κ΅¬νλ ν΄λμ€μ μμ‘΄κ΄κ³λ₯Ό κ°μ§λ κ²½μ° ν΄λΉ ν΄λμ€μ κ°ν μμ‘΄κ΄κ³λ₯Ό κ°μ§κΈ° λλ¬Έμ νμ€νΈνκΈ° μ΄λ ΅κ³ ,
- μμ±μλ₯Ό `private` λ‘ κ΅¬νν΄ μμν  μ μλ€.
- λν κ°μ²΄μ§ν₯ μ€κ³ μμΉμ λ°λΌ κ°λ°νλ κ²μ μ ν΄νλ μμΈμ΄ λλ€.

> μ±κΈν€ ν¨ν΄μ μ¬μ©νμ§ μμΌλ©΄μ μΈμ€ν΄μ€ νλλ§ μ μ§νλ λ°©λ²μ΄ μμκΉ?

- μ§κΈκΉμ§ μΈμ€ν΄μ€ νλλ§ μμ±νκΈ° μν΄ `Service` , `DAO` , `JdbcTemplate` μ μ±κΈν€ ν¨ν΄μ μ μ©νλ€.
- νμ§λ§ **μ»¨νΈλ‘€λ¬**λ μ΄λ₯Ό μ μ©νμ§ μκ³ λ κ°μ ν¨κ³Όλ₯Ό λΌ μ μμλ€.
  - μλΈλ¦Ώ μ»¨νμ΄λκ° `DispatcherServlet` μ μ΄κΈ°ννλ μμ μ μ»¨νΈλ‘€λ¬ μΈμ€ν΄μ€λ₯Ό μμ±ν ν μ¬μ¬μ© κ°λ₯νλλ‘ κ΅¬ννκΈ° λλ¬Έμ΄λ€.
  - κ·Έλ λ€λ©΄, μ΄ λ°©μμΌλ‘ λ€λ₯Έ ν΄λμ€λ μΈμ€ν΄μ€λ₯Ό κ΄λ¦¬νλ€λ©΄ λ¬Έμ λ₯Ό ν΄κ²°ν  μ μμ§ μμκΉ? κ·Έλ¦¬κ³  κ° μΈμ€ν΄μ€ κ° μμ‘΄κ΄κ³λ DI κΈ°λ°μΌλ‘ κ΅¬ννλ€.

λ¨Όμ  `QnaService` μ `QuestionDao` μ `AnswerDao` λ₯Ό μ΄ λ°©λ²μΌλ‘ κ΅¬ννκ³  νμ€νΈλ₯Ό μ§ννλ€.
- μ±κΈν€ ν¨ν΄ μ½λλ₯Ό μ κ±°νκ³  μμ±μλ₯Ό `public` μΌλ‘ λ³κ²½νλ€.

```java
public class QnaService {
    private QuestionDao questionDao;
    private AnswerDao answerDao;

    public QnaService(QuestionDao questionDao, AnswerDao answerDao) {
        this.questionDao = questionDao;
        this.answerDao = answerDao;
    }
    ...

}
```

- μμ κ°μ΄ μμ  ν `getInstance()` λ©μλλ₯Ό μ κ±°νκ³  νμ€νΈλ₯Ό μ§ννλ©΄ μ μμ μΌλ‘ λμνλ€. μ΄μ  `QnaService` μ μμ‘΄κ΄κ³λ₯Ό κ°μ§λ λ€λ₯Έ μ»¨νΈλ‘€λ¬λ€μ μμ νλ€.

```java
public class DeleteQuestionController extends AbstractController {
    private QnaService qnaService;
    
    public DeleteQuestionController(QnaService qnaService) {
        this.qnaService = qnaService;
    }
    ...

}
```

- μμ²λΌ, `public` μμ±μλ₯Ό λ§λ€μ΄ μΈμλ‘ λ°μ `QnaService` μΈμ€ν΄μ€λ₯Ό μ¬μ©νλλ‘ μμ νλ€.
- μ΄μ  μ΄ μ»¨νΈλ‘€λ¬λ€μ μμ±ν  λ `QnaService` λ₯Ό DIλ‘ μ λ¬ν΄μ€λ€.

```java
public class LegacyHandlerMapping implements HandlerMapping {
    private static final Logger logger = LoggerFactory.getLogger(DispatcherServlet.class);
    private Map<String, Controller> mappings = new HashMap<>();

    public void initMapping() {
        QnaService qnaService = new QnaService(JdbcQuestionDao.getInstance(), JdbcAnswerDao.getInstance());
        ...

        mappings.put("/qna/delete", new DeleteQuestionController(qnaService));
        mappings.put("/api/qna/deleteQuestion", new ApiDeleteQuestionController(qnaService));
        ...

        logger.info("Initialized Request Mapping!");
    }
    ...

}
```

- λ€μ λ³΄λ, `JdbcQuestionDao` , `JdbcAnswerDao` λ μμ§ μ±κΈν€ ν¨ν΄μ μ¬μ©νκ³  μλ€. μ΄λ€λ μ±κΈν€ ν¨ν΄μ μ μ©νμ§ μλλ‘ μμ νλ€. κ·Έλ¦¬κ³  μ°μ΄μ΄ λ°μνλ μ»¨νΈλ‘€λ¬μμμ μ»΄νμΌ μλ¬λ λͺ¨λ μμ νλ€.
  - `getInstance()` λ©μλλ₯Ό μ¬μ©νλ μ½λλ₯Ό λͺ¨λ μ κ±°νκ³ , `public` μμ±μμ μΈμλ‘ νμν μΈμ€ν΄μ€λ₯Ό λ°μ μ¬μ©νλλ‘ μμ νκ³ , λ§€ν μ΄κΈ°ν μ νμν μΈμ€ν΄μ€λ₯Ό λͺ¨λ μ λ¬ν΄μ£Όλλ‘ νλ€.

### π§ Mockitoλ₯Ό νμ©ν νμ€νΈ
DBκ° μλ μνμμλ νμ€νΈκ° κ°λ₯νλλ‘ `QuestionDao` μ `AnswerDao` μ λν κ°μ§(`Mock`) ν΄λμ€λ₯Ό κ΅¬ννλ€. νμ§λ§ μ΄λ° λ°©μμ νμ€νΈ μ½λ κ΅¬νλ λΆλ΄μΈλ° λ§€λ² μλ‘μ΄ κ°μ§ ν΄λμ€λ₯Ό λ§λ€μ΄μΌ νλ λΆλ΄μ΄ μΆκ°λλ κ²©μ΄λ€. 
- μ΄λ₯Ό μν΄ `Mock` ν΄λμ€ κ΅¬ν μμ΄λ νμ€νΈκ° κ°λ₯νλλ‘ μ§μνλ `Mock` νμ€νΈ νλ μμν¬λ₯Ό νμ©νλ€.

λ¨Όμ  λ©μ΄λΈ μ€μ  νμΌμ μμ‘΄κ΄κ³λ₯Ό μΆκ°νλ€.
```xml
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>1.10.19</version>
    <scope>test</scope>
</dependency>
```

μ΄μ  μ΄λ₯Ό νμ©ν΄ `QnaService` μ `deleteQuestion()` λ©μλμ λν νμ€νΈ μ½λλ₯Ό μμ νλ€.

```java
@RunWith(MockitoJUnitRunner.class)
public class QnaServiceTest {
    @Mock
    private QuestionDao questionDao;
    @Mock
    private AnswerDao answerDao;

    private QnaService qnaService;

    @Before
    public void setup() {
        qnaService = new QnaService(questionDao, answerDao);
    }

    @Test(expected = CannotDeleteException.class)
    public void deleteQuestion_μλ_μ§λ¬Έ() throws Exception {
        when(questionDao.findById(1L)).thenReturn(null);
        qnaService.deleteQuestion(1L, newUser("userId"));
    }
    ...

    @Test
    public void deleteQuestion_κ°μ_μ¬μ©μ_λ΅λ³μμ() throws Exception {
        Question question = newQuestion(1L, "javajigi");
        when(questionDao.findById(1L)).thenReturn(question);
        when(answerDao.findAllByQuestionId(1L)).thenReturn(Lists.newArrayList());
        qnaService.deleteQuestion(1L, newUser("javajigi"));
    }
}
```

- `Mock` ν΄λμ€ μμ΄ νμ€νΈλ₯Ό μ±κ³΅μ μΌλ‘ μλ£νλ€.
  - **Mockito**λ `Mock` ν΄λμ€ λμ  `@Mock` annotationμΌλ‘ μ€μ ν ν΄λμ€μ λ©μλλ₯Ό νΈμΆνμ λ, λ°ν κ°μ μ§μ ν  μ μλ€.
  - λν ν΄λΉ annotationμ μ€μ ν ν΄λμ€μ λ©μλκ° νΈμΆλλμ§ μ¬λΆλ₯Ό `verify()` λ©μλλ₯Ό ν΅ν΄ κ²μ¦νλ μμ λν κ°λ₯νλ€.
  - μ΄μ²λΌ λ€λ₯Έ ν΄λμ€μ μμ‘΄κ΄κ³λ₯Ό κ°μ§λ ν΄λμ€λ₯Ό νμ€νΈνλ κ²½μ° `Mock` νλ μμν¬μ μ¬μ©μ μΆμ²νλ€.

### π§ DIλ³΄λ€ μ°μ νλ κ°μ²΄μ§ν₯ κ°λ°
"κ³μΈ΅ν μν€νμ² κ΄μ κ³Ό κ°μ²΄μ§ν₯ μ€κ³ κ΄μ μμ ν΅μ¬μ μΈ λΉμ¦λμ€ λ‘μ§μ κ΅¬νν΄μΌ νλ μ­ν μ λκ° λ΄λΉν΄μΌν κΉ?"
- λ¨Όμ  μμμ κ΅¬νν `DateMessageProvider` μ½λλ₯Ό λ€μ λ³΄λ©΄μ λ΅μ λν΄ μκ°ν΄λ³Έλ€.
- μ΄ μ½λλ₯Ό μν νμ€νΈ μ½λλ λ€μκ³Ό κ°λ€. 

```java
public class DateMessageProviderTest {
    @Test
    public void μ€μ () throws Exception {
        DateMessageProvider provider = new DateMessageProvider();
        assertEquals("μ€μ ", provider.getDateMessage(createCurrentDate(11)));
    }

    @Test
    public void μ€ν() throws Exception {
        DateMessageProvider provider = new DateMessageProvider();
        assertEquals("μ€ν", provider.getDateMessage(createCurrentDate(13)));
    }

    public Calendar createCurrentDate(int hourOfDay) {
        Calendar now = Calendar.getInstance();
        now.set(Calendar.HOUR_OF_DAY, hourOfDay);
        return now;
    }
}
```

- μ΄μ²λΌ κ°λ¨ν λ‘μ§μ κ΅¬ννλλ° μ’ λ κ°λ¨ν νμ€νΈν  μ μλ λ°©λ²μ μμκΉμ λν΄ μκ°ν΄λ³Ό μ μλ€.
  - `DateMessageProvider` μ κ΅¬μ‘°λ₯Ό κ°μ ν΄ νμ€νΈλ₯Ό λ μ½κ² ν  μ μμκΉ?
  - μ’ λ κ°μ²΄μ§ν₯μ μΈ κ°λ°μ μννλ€λ©΄ ν΄κ²°μ±μ μ»μ μ μμ κ²μ΄λ€.

λ¨Όμ  μκ°μ μΆμννλ `Hour` ν΄λμ€λ₯Ό μΆκ°νλ€.

```java
public class Hour {
    private int hour;

    public Hour(int hour) {
        this.hour = hour;
    }

    public String getMessage() {
        if (hour < 12) {
            return "μ€μ ";
        }
        return "μ€ν";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        return false;

        if (getClass() != obj.getClass()) {
            return false;
        }
        Hour other = (Hour) obj;
        if (hour != obj.hour) {
            return false;
        }
        return true;
    }
}
```

- `Hour` ν΄λμ€κ° `DateMessageProvider` κ° κ΅¬ννλ λ‘μ§μ λ΄λΉνκ² λμλ€. νμ€νΈ μ½λλ λ€μκ³Ό κ°λ€.

```java
public class MyCalendarTest {
    @Test
    public void getHour() throws Exception {
        Calendar now = Calendar.getInstance();
        now.set(Calendar.HOUR_OF_DAY, 11);
        MyCalendar calendar = new MyCalendar(now);
        assertEquals(new Hour(11), calendar.getHour());
    }
}
```

μμμ λ§ν μ§λ¬Έμ λν λ΅λ³μΌλ‘, λλΆλΆ Service layerλ₯Ό λ΄λΉνκ³  μλ `QnaService` μμ μ²λ¦¬ν΄μΌ νλ€κ³  μκ°νλ€. νμ§λ§ **ν΅μ¬μ μΈ λΉμ¦λμ€ λ‘μ§ κ΅¬νμ Domain κ°μ²΄κ° λ΄λΉ**νλ κ²μ΄ λ§λ€.
- **Service layer**μ ν΅μ¬ μ­ν μ Domain κ°μ²΄λ€μ΄ λΉμ¦λμ€ λ‘μ§μ κ΅¬νν  μ μλλ‘ Domain κ°μ²΄λ₯Ό μ‘°ν©νκ±°λ, λ‘μ§ μ²λ¦¬ μλ£ μ μν κ°μ DAOλ₯Ό νμ©ν΄ DBμ μκ΅¬ μ μ₯νλ λ±μ΄λ€.

λλΆλΆμ κ°λ°μλ€μ `QnaService` μ `deleteQuestion()` λ©μλμ κ°μ΄ κ΅¬ννλ κ²½μ°κ° λ§λ€. μ΄λ λνμ μΈ **μ μ°¨μ§ν₯μ  κ°λ°**μ΄λ€. 
- μ΄μ κ°μ κ°λ°μ **Service layerμ λ³΅μ‘λλ μ μ  λ μ¦κ°**νκ³ 
- **μ μ§λ³΄μμ νμ€νΈνκΈ° νλ  μν©**μ λ§λ₯λ¨λ¦¬κ² λλ€.
- λν ν΅μ¬ κ°μ²΄λΌ ν  μ μλ Domain κ°μ²΄λ μ¬μ©μκ° μλ ₯ν λ°μ΄ν°λ₯Ό DAOμ μ λ¬νκ±°λ DB λ°μ΄ν°λ₯Ό λ·°μ μ λ¬νλ μ­ν λ§μ μννκ² λλ€. (ν΅μ¬μ μΈ μ­ν  μν X)
  - κ·Έλ¦¬νμ¬ Domain κ°μ²΄κ° κ°μ μ λ¬νλ `Getter` & `Setter` λ©μλλ§μ κ°μ§λ μν©μ΄ λ°μνλ€.

μ΄μ λΆν°λ Domain κ°μ²΄μ λ λ§μ μ­ν μ λΆμ¬νλ λ°©ν₯μΌλ‘ κ΅¬ννλλ‘ νλ€.
- `QnaService` μ `deleteQuestion()` λ©μλκ° κ΅¬ννκ³  μλ λ‘μ§μ Domain κ°μ²΄, μ¦ `Question` & `Answer` κ° λ΄λΉνλλ‘ νλ€.
- λ¨Όμ , μ­μ  κ°λ₯ μ¬λΆλ₯Ό `Question` μ λ©μΈμ§λ₯Ό λ³΄λ΄(`canDelete()`) νμΈνλ λ°©μμΌλ‘ λ¦¬ν©ν λ§νλ€.

```java
public class Question {
    ...

    public boolean canDelete(User user, List<Answer> answers) throws CannotDeleteException {
        if (!user.isSameUser(this.writer)) {
            throw new CannotDeleteException("λ€λ₯Έ μ¬μ©μκ° μμ±ν κΈμ μ­μ ν  μ μμ΅λλ€.");
        }
        
        for (Answer answer : answers) {
            if (!answer.canDelete(user)) {
                throw new CannotDeleteException("λ€λ₯Έ μ¬μ©μκ° μΆκ°ν λκΈμ΄ μ‘΄μ¬ν΄ μ­μ ν  μ μμ΅λλ€.");
            }
        }
        
        return true;
    }
}
```

- `Question` μ μΈμλ‘ μ λ¬λ `User` , `Answer` μ μ­ν μ λλ  μ­μ  κ°λ₯ μ¬λΆλ₯Ό νλ¨νλ€.
  - `User` μ μ§λ¬Έν μ¬λμ IDλ₯Ό μ λ¬ν΄ μ¬μ©μκ° λμΌνμ§ νλ¨νκ³ ,
  - κΈμ΄μ΄μ λ‘κ·ΈμΈ μ¬μ©μκ° κ°μ κ²½μ° κ° λ΅λ³μ΄ μ­μ  κ°λ₯ν μνμΈμ§ νμΈνλ€. (`Answer`)

```java
public class User {
    ...

    public boolean isSameUser(String newUserId) {
        return userId.equals(newUserId);
    }
}
```

```java
public class Answer {
    ...

    public boolean canDelete(User user) {
        return user.isSameUser(this.writer);
    }
}
```

μ΄μ  μ΄λ₯Ό νμ©ν΄ `deleteQuestion()` μ μμ νλ€.

```java
public class QnaService {
    ...

    public void deleteQuestion(long questionId, User user) throws CannotDeleteException {
        Question question = questionDao.findById(questionId);
        if (question == null) {
            throw new CannotDeleteException("μ‘΄μ¬νμ§ μλ μ§λ¬Έμλλ€.");
        }

        List<Answer> answers = answerDao.findAllByQuestionId(questionId);
        if (question.canDelete(user, answers)) {
            questionDao.delete(questionId);
        }
    }
}
```

- Domain κ°μ²΄λ‘ λ‘μ§μ μ΄λμμΌ λ§€μ° κΉλν΄μ‘λ€. κ·Έλ λ€κ³  Domain κ°μ²΄μ λ³΅μ‘ν λ‘μ§μ΄ κ΅¬νλ κ²μ μλλ€.

> "κ°μ²΄μ§ν₯ κ°λ°μ νκΈ° μν μ’μ μ°μ΅μ μν κ°μ κ°μ§λ Domain κ°μ²΄μμ κ°μ κΊΌλ΄λ €κ³  νμ§ λ§κ³  κ°μ²΄μ λ©μΈμ§λ₯Ό λ³΄λ΄ μμμ μμνλ€λ μκ°μΌλ‘λΆν° μμνλ€."

κ°μ²΄μ§ν₯μ  κ°λ° μ μ₯μ  μ€ νλλ **νμ€νΈνκΈ° μ½λ€**λ κ²μ΄λ€. μλλ `Question` μ `canDelete()` λ©μλμ λν νμ€νΈ μ½λμ΄λ€.

```java
public class QuestionTest {
    public static Question newQuestion(String writer) {
        return new Question(1L, writer, "title", "contents", new Date(), 0);
    }

    public static Question newQuestion(long questionId, String writer) {
        return new Question(questionId, writer, "title", "contents", new Date(), 0);
    }

    @Test(expected = CannotDeleteException.class)
    public void canDelete_λ€λ₯Έ_κΈμ΄μ΄() throws Exception {
        User user = newUser("javajigi");
        Question question = newQuestion("sanjigi");
        question.canDelete(user, new ArrayList<Answer>());
    }

    @Test
    public void canDelete_κΈμ΄μ΄_κ°μ_λ΅λ³_μμ() throws Exception {
        User user = newUser("javajigi");
        Question question = newQuestion("javajigi");
        assertTrue(question.canDelete(user, new ArrayList<Answer>()));
    }

    @Test
    public void canDelete_κ°μ_μ¬μ©μ_λ΅λ³() throws Exception {
        User user = newUser("javajigi");
        Question question = newQuestion("javajigi");
        List<Answer> answers = Arrays.asList(newAnswer("javajigi"), newAnswer("javajigi"));
        question.canDelete(user, answers);
    }

    @Test(expected = CannotDeleteException.class)
    public void canDelete_λ€λ₯Έ_μ¬μ©μ_λ΅λ³() throws Exception {
        User user = newUser("javajigi");
        Question question = newQuestion("javajigi");
        List<Answer> answers = Arrays.asList(newAnswer("javajigi"), newAnswer("sanjigi"));
        question.canDelete(user, answers);
    }
}
```

- νμ€νΈ μ½λλ₯Ό λ³΄λ©΄, `QuestionDao` , `AnswerDao` μ λν μμ‘΄κ΄κ³κ° μκΈ°μ `Mock` νλ μμν¬λ₯Ό μ¬μ©ν  νμλ μμΌλ©°, κ΅¬ν λν κ°λ¨ν κ²μ νμΈν  μ μλ€.

μ΄μ  `QnaService` μ λν νμ€νΈλ₯Ό μ§ννλ€λ©΄ λ€μκ³Ό κ°μ΄ ν  μ μλ€. μ΄λ―Έ ν΅μ¬ λΉμ¦λμ€ λ‘μ§μ `QuestionTest` μμ λͺ¨λ λλΈ μνμ΄λ€. μ¦, `QnaServiceTest` μμλ `QnaService` λ‘μ§μ λν΄μλ§ νμ€νΈλ₯Ό μννλ©΄ λλ€.

```java
@RunWith(MockitoJUnitRunner.class)
public class QnaServiceTest {
    @Mock
    private QuestionDao questionDao;
    @Mock
    private AnswerDao answerDao;

    private QnaService qnaService;

    @Before
    public void setup() {
        qnaService = new QnaService(questionDao, answerDao);
    }

    @Test(expected = CannotDeleteException.class)
    public void deleteQuestion_μλ_μ§λ¬Έ() throws Exception {
        when(questionDao.findById(1L)).thenReturn(null);
        qnaService.deleteQuestion(1L, newUser("userId"));
    }

    @Test
    public void deleteQuestion_μ­μ ν μ_μμ() throws Exception {
        User user = newUser("userId");
        Question question = new Question(1L, user.getUserId(), "title", "contents", new Date(), 0) {
            public boolean canDelete(User user, List<Answer> answers) throws CannotDeleteException {
                return true;
            };
        };
        when(questionDao.findById(1L)).thenReturn(question);
        qnaService.deleteQuestion(1L, newUser("userId"));
        verify(questionDao).delete(question.getQuestionId());
    }

    @Test(expected = CannotDeleteException.class)
    public void deleteQuestion_μ­μ ν μ_μμ() throws Exception {
        User user = newUser("userId");
        Question question = new Question(1L, user.getUserId(), "title", "contents", new Date(), 0) {
            public boolean canDelete(User user, List<Answer> answers) throws CannotDeleteException {
                throw new CannotDeleteException("μ­μ ν  μ μμ.");
            };
        };
        when(questionDao.findById(1L)).thenReturn(question);
        qnaService.deleteQuestion(1L, newUser("userId"));
    }
}
```

κ΄κ³ν DBλ₯Ό μ¬μ©νλ©΄μ μ’ λ κ°μ²΄μ§ν₯μ μΈ κ°λ°μ μν΄μλ ORM(Object-Relational Mapping) νλ μμν¬λ₯Ό μ¬μ©ν  νμκ° μλ€. νμ§λ§ μ΄λ₯Ό μ¬μ©νμ§ μμλ λ©μλμ μΈμλ‘ κ°μ²΄λ₯Ό μ λ¬ν¨μΌλ‘μ¨ μΌμ  λΆλΆ κ°μ²΄μ§ν₯μ μΈ κ°λ°μ΄ κ°λ₯νλ€.

---

## π© DI νλ μμν¬ μ€μ΅
### π§ μκ΅¬μ¬ν­
μ§λ¬Έ/λ΅λ³ κΈ°λ₯μ DIλ₯Ό μ μ©νλ μμμ `LegacyHandlerMapping` μμ κ΅¬ννλ€. DIκ° νμν  λλ§λ€ λ§€λ² μ§μ  μΈμ€ν΄μ€λ₯Ό μμ±ν΄ μ λ¬νκΈ° κ·μ°?μΌλ―λ‘, μμ²΄μ μΈ DI νλ μμν¬λ₯Ό κ΅¬νν΄λ³Έλ€.

μλ‘ λ§λ  MVC νλ μμν¬λ μλ° λ¦¬νλ μμ νμ©ν΄ `@Controller` annotationμ΄ μ€μ λμ΄ μλ ν΄λμ€λ₯Ό μ°Ύμ μΈμ€ν΄μ€λ₯Ό μμ±νκ³ , URL λ§€ν μμμ μλννλ€. κ°μ λ°©λ²μΌλ‘ κ° ν΄λμ€μ λν μΈμ€ν΄μ€ μμ± λ° μμ‘΄κ΄κ³ μ€μ μ μλννλ€.
- λ¨Όμ  κ° ν΄λμ€ μ­ν μ λ§λλ‘ `@Controller` , `@Service` , `@Repository` annotationμ μ€μ νλ€.
  - 3κ°μ μ€μ μΌλ‘ μμ±λ κ° μΈμ€ν΄μ€ κ°μ μμ‘΄κ΄κ³λ `@Inject` annotationμ μ¬μ©νλ€.
- DI νλ μμν¬λ‘ μμ±λ μΈμ€ν΄μ€μ κ°λ°μκ° `new` ν€μλλ‘ μμ±ν μΈμ€ν΄μ€λ₯Ό λΆλ¦¬νλ€.
  - DI νλ μμν¬λ₯Ό ν΅ν΄ μμ±λ μΈμ€ν΄μ€λ **λΉ(Bean)**μ΄λΌκ³  νλ€.

```java
@Controller
public class QnaController extends AbstractController {
    private MyQnaService qnaService;

    @Inject
    public QnaController(MyQnaService qnaService) {
        this.qnaService = qnaService;
    }

    @RequestMapping("/questions")
    public ModelAndView list(HttpServletRequest req, HttpServletResponse resp) throws Exception {
        return jspView("/qna/list.jsp");
    }
}
```

```java
@Service
public class MyQnaService {
    private UserRepository userRepository;
    private QuestionRepository questionRepository;

    @Inject
    public MyQnaService(UserRepository userRepository, QuestionRepository questionRepository) {
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
    }
    ...

}
```

```java
@Repository
public class JdbcQuestionRepository implements QuestionRepository {

}

@Repository
public class JdbcUserRepository implements UserRepository {
    
}
```

- μ μ½μ¬ν­μ λΉμ `@Inject` annotationμ κ°μ§λ μμ±μλ νλλ§ μ‘΄μ¬νλ©°, ν΄λΉ annotation μ€μ μ΄ λμ΄μμ§ μμΌλ©΄ μΈμκ° μλ κΈ°λ³Έ μμ±μλ₯Ό μ κ³΅νλ κ²μΌλ‘ νλ€.

### π§ 1λ¨κ³ ννΈ
μ΄ λ¬Έμ  ν΄κ²°μ μν΄μλ **μ¬κ·ν¨μ**λ₯Ό μ¬μ©ν΄ κ΅¬νν  μ μλ€. `@Inject` annotationμ΄ μ€μ λ μμ±μλ₯Ό ν΅ν΄ λΉμ μμ±ν΄μΌ νλ€.
- κ·Έλ°λ° μ΄ μμ±μμ μΈμλ‘ μ λ¬ν  λΉλ λ€λ₯Έ λΉκ³Ό μμ‘΄κ΄κ³κ° μλ€. μ΄μ²λΌ λΉ κ°μ μμ‘΄κ΄κ³κ° μ°κ²°λμ΄ μμ μ μλλ°, μ΄λ λ€λ₯Έ λΉκ³Ό μμ‘΄κ΄κ³λ₯Ό κ°μ§μ§ μλ λΉμ μ°Ύμ μΈμ€ν΄μ€λ₯Ό μμ±ν  λκΉμ§ μ¬κ·λ₯Ό μ€ννλ λ°©μμΌλ‘ κ΅¬νν  μ μλ€.

μ¬κ·λ₯Ό ν΅ν΄ μμ±ν λΉμ `BeanFactory` μ `Map<Class<?>, Object>` μ μΆκ°ν΄ κ΄λ¦¬νλ€. 
- μΈμ€ν΄μ€ μμ± μ  λ¨Όμ  `Class<?>` μ ν΄λΉνλ λΉμ΄ `Map<Class<?>, Object>` μ μ‘΄μ¬ μ¬λΆλ₯Ό νμΈν ν μμ±νλ λ°©μμΌλ‘ κ΅¬ννλ€.
- **μΌλ°μ μΈ μΊμμ λμ μλ¦¬**μ κ°μ μ¬μ¬μ© λ°©λ²μ΄λ€.

### π§ 2λ¨κ³ ννΈ
λΉ μΈμ€ν΄μ€λ₯Ό μμ±νκΈ° μν μ¬κ· ν¨μ μ§μμ μν΄ Classμ λν λΉ μΈμ€ν΄μ€λ₯Ό μμ±νλ λ©μλμ μμ±μμ λν λΉ μΈμ€ν΄μ€λ₯Ό μμ±νλ λ©μλκ° νμνλ€.

```java
private Object instantiateClass(Class<?> clazz) {
    ...
    
    return null;
}

private Object instantiateConstructor(Constructor<?> constructor) {
    ...

    return null;
}
```

- μμμ `instantiateClass()` μ΄λ€. 
- `@Inject` annotationμ΄ μ€μ λ μμ±μκ° μ‘΄μ¬νλ©΄ `instantiateConstructor()` λ©μλλ₯Ό ν΅ν΄ μΈμ€ν΄μ€λ₯Ό μμ±νκ³ , μ‘΄μ¬νμ§ μμ κ²½μ° κΈ°λ³Έ μμ±μλ‘ μΈμ€ν΄μ€λ₯Ό μμ±νλ€.
- `instantiateConstructor()` λ©μλλ μμ±μμ μΈμλ‘ μ λ¬ν  λΉμ΄ μμ±λμ΄ `Map<Class<?>, Object>` μ μ΄λ―Έ μ‘΄μ¬νλ©΄ ν΄λΉ λΉμ νμ©νκ³ , κ·Έλ μ§ μμΌλ©΄ `instantiateClass()` μ ν΅ν΄ μλ‘μ΄ λΉμ μμ±νλ€. 

```java
private Object instantiateConstructor(Constructor<?> constructor) {
    Class<?>[] parameterTypes = constructor.getParameterTypes();
    List<Object> args = Lists.newArrayList();
    for (Class<?> clazz : parameterTypes) {
        ...

        args.add(bean);
    }
    return BeanUtils.instantiateClass(constructor, args.toArray());
}
```

### π§ μΆκ° μκ΅¬μ¬ν­ λ° ννΈ
`@Controller` κ° μ€μ λμ΄ μλ ν΄λμ€λ₯Ό μ°Ύλ `ControllerScanner` λ₯Ό DI νλ μμν¬κ° μλ ν¨ν€μ§λ‘ μ΄λν΄ `@Controller` , `@Service` , `@Repository` μ λν μ§μμ΄ κ°λ₯νλλ‘ κ°μ νλ€. κ·Έλ¦¬κ³  λ€λ₯Έ annotationκΉμ§ μ§μμ΄ κ°λ₯νκ² λλ―λ‘, `BeanScanner` λ‘ renameνλ€.
- λν `AnnotationHandlerMapping` μ΄ `BeanFactory` μ `BeanScanner` λ₯Ό νμ©νλλ‘ λ¦¬ν©ν λ§νλ€.

---

## π© DI νλ μμν¬ κ΅¬ν
`BeanFactory` μ `initialize()` λ©μλλ₯Ό κ΅¬ννλ€. 

```java
public class BeanFactory {
    private static final Logger logger = LoggerFactory.getLogger(BeanFactory.class);

    private Set<Class<?>> preInstanticateBeans;

    private Map<Class<?>, Object> beans = Maps.newHashMap();

    public BeanFactory(Set<Class<?>> preInstanticateBeans) {
        this.preInstanticateBeans = preInstanticateBeans;
    }

    @SuppressWarnings("unchecked")
    public <T> T getBean(Class<T> requiredType) {
        return (T) beans.get(requiredType);
    }

    public void initialize() {
        for (Class<?> clazz : preInstanticateBeans) {
            if (beans.get(clazz) == null) {
                instantiateClass(clazz);
            }
        }
    }

    private Object instantiateClass(Class<?> clazz) {
        Object bean = beans.get(clazz);
        if (bean != null) {
            return bean;
        }

        Constructor<?> injectedConstructor = BeanFactoryUtils.getInjectedConstructor(clazz);
        if (injectedConstructor == null) {
            bean = BeanUtils.instantiate(clazz);
            beans.put(clazz, bean);
            return bean;
        }

        logger.debug("Constructor : {}", injectedConstructor);
        bean = instantiateConstructor(injectedConstructor);
        beans.put(clazz, bean);
        return bean;
    }

    private Object instantiateConstructor(Constructor<?> constructor) {
        Class<?>[] parameterTypes = constructor.getParameterTypes();
        List<Object> args = Lists.newArrayList();
        for (Class<?> clazz : parameterTypes) {
            Class<?> concreteClazz = BeanFactoryUtils.findConcreteClass(clazz, preInstanticateBeans);
            if (!preInstanticateBeans.contains(concreteClazz)) {
                throw new IllegalStateException(clazz + "λ Beanμ΄ μλλλ€.");
            }
            Object bean = beans.get(concreteClazz);
            if (bean == null) {
                bean = instantiateClass(concreteClazz);
            }
            args.add(bean);
        }
        return BeanUtils.instantiateClass(constructor, args.toArray());
    }
}
```

- `BeanFactory` μμ ν΅μ¬ κ΅¬ν λ‘μ§μ `instantiateClass()` , `instantiateConstructor()` λ©μλμ΄λ€. μ΄ λ λ©μλμ μ¬κ·νΈμΆμ ν΅ν΄ λ³΅μ‘ν μμ‘΄κ΄κ³μ μλ λΉμ μμ±νλ κ³Όμ μ μλ£ν  μ μλ€.

μ΄μ  `@Controller` , `@Service` , `@Repository` annotationμ΄ μ€μ λ λΉμ μ°Ύλ `BeanScanner` λ₯Ό κ΅¬ννλ€.

```java
public class BeanScanner {
    private Reflections reflections;

    public BeanScanner(Object... basePackage) {
        reflections = new Reflections(basePackage);
    }
    
    public Set<Class<?>> scan() {
        return getTypeAnnotatedWith(Controller.class, Service.class, Repository.class);
    }

    private Set<Class<?>> getTypeAnnotatedWith(Class<? extends Annotation>... annotations) {
        Set<Class<?>> preInstantiatedBeans = Sets.newHashSet();
        for (Class<? extends Annotation> annotation : annotations) {
            preInstantiatedBeans.addAll(reflections.getTypesAnnotatedWith(annotation));
        }
        return preInstantiatedBeans;
    }
}
```

μ΄μ  μμ±ν `BeanFactory` λ₯Ό `AnnotationHandlerMapping` μ΄ μ¬μ©νλλ‘ λ¦¬ν©ν λ§νλ€. λ¨Όμ  `@Controller` annotationμ μ€μ ν λΉμ μ‘°ννλ λ©μλλ₯Ό μΆκ°νλ€.

```java
public class BeanFactory {
    ...

    public Map<Class<?>, Object> getControllers() {
        Map<Class<?>, Object> controllers = Maps.newHashMap();
        for (Class<?> clazz : preInstanticateBeans) {
            Annotation annotation = clazz.getAnnotation(Controller.class);
            if (annotation != null) {
                controllers.put(clazz, annotation);
            }
        }
        return controllers;
    }
}
```

`AnnotationHandlerMapping` μμλ `BeanFactory` λ₯Ό μ΄κΈ°νν ν `@Controller` λ‘ μ€μ ν λΉμ μ¬μ©νλ©΄ λλ€.

```java
public class AnnotationHandlerMapping implements HandlerMapping {
    private static final Logger logger = LoggerFactory.getLogger(AnnotationHandlerMapping.class);

    private Object[] basePackage;

    private Map<HandlerKey, HandlerExecution> handlerExecutions = Maps.newHashMap();

    public AnnotationHandlerMapping(Object... basePackage) {
        this.basePackage = basePackage;
    }

    public void initialize() {
        BeanScanner beanScanner = new BeanScanner(basePackage);
        BeanFactory beanFactory = new BeanFactory(beanScanner.scan());
        beanFactory.initialize();
        
        Map<Class<?>, Object> controllers = beanFactory.getControllers();
        Set<Method> methods = getRequestMappingMethods(controllers.keySet());
        for (Method method : methods) {
            RequestMapping rm = method.getAnnotation(RequestMapping.class);
            logger.debug("register handlerExecution : url is {}, method is {}", rm.value(), method);
            handlerExecutions.put(createHandlerKey(rm),
                    new HandlerExecution(controllers.get(method.getDeclaringClass()), method));
        }

        logger.info("Initialized AnnotationHandlerMapping!");
    }
    ...

}
```

## π μΆμ²
**μλ° μΉ νλ‘κ·Έλλ° Next Step : νλμ© λ²κ²¨κ°λ μνκ»μ§ νμ΅λ²** - λ°μ¬μ±
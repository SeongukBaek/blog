---
title: "📖 11장 의존관계 주입(DI)을 통한 테스트하기 쉬운 코드 만들기"
description: "자바 웹 프로그래밍 책 정리"
date: 2022-02-21
update: 2022-02-21
tags:
  - Java
  - Refactoring
  - Framework
series: "📖 자바 웹 프로그래밍 Next Step"
---

<em>[자바 웹 프로그래밍 Next Step - 박재성]을 읽고 인용하고 정리하는 POST입니다.</em>

## 🚩 왜 DI가 필요한가?
먼저 의존관계(dependency)에 대해 생각해보자. 객체에게 의존관계란 무엇이고 어떤 경우에 의존관계가 발생할까?

**의존관계**<br/>
: 객체 혼자 모든 일을 처리하기 힘들기에 작업을 다른 객체에게 위임하면서 발생한다.
- 즉, **내가 가진 책임과 역할을 다른 객체에게 위임하는 순간 발생**하는 것이다.
- 예를 들어, `QnaService` 는 질문 삭제 기능 구현을 위해 `QuestionDao` , `AnswerDao` 에게 DB 접근 로직을 위임하고 있다.
  - 이는 `QnaService` 가 `QuestionDao` 와 `AnswerDao` 에 의존하고 있다는 의미이다.

**DI**는 "객체 간 의존관계를 어떻게 해결하느냐"에 따른 새로운 접근 방식이다. 
- 이전까지는 의존관계에 있는 객체를 사용하기 위해 객체를 직접 생성하고, 사용하는 방식으로 구현했다. (`QnaService` 또한 `QuestionDao` 와 `AnswerDao` 사용을 위해 생성하고 사용했다.)

하지만 이같은 방식으로 구현 시 유연한 개발에 한계가 있기에 **인스턴스를 생성하는 책임**과 **사용하는 책임**을 분리하자는 것이 **DI의 핵심**이다.
- 즉 위 예에서 `QnaService` 는 `QuestionDao` 와 `AnswerDao` 에 대한 생성 없이 사용만 함으로써 유연성을 높이자는 방식이다.

그럼 지금까지의 구현 방식의 문제점을 간단한 예제로 살펴보도록 한다.

```java
public class DateMessageProvider {
    public String getDateMessage() {
        Calendar now = Calendar.getInstance();
        int hour = now.get(Calendar.HOUR_OF_DAY);

        if (hour < 12) {
            return "오전";
        }
        return "오후";
    }
}
```

- 현재 시스템 시간에 따라 오전 또는 오후를 반환하는 클래스이다. 이 클래스의 `getDateMessage()` 에 대한 테스트 클래스는 다음과 같이 구현할 수 있다.

```java
public class DateMessageProviderTest {
    @Test
    public void 오전() throws Exception {
        DateMessageProvider provider = new DateMessageProvider();
        assertEquals("오전", provider.getDateMessage());
    }

    @Test
    public void 오후() throws Exception {
        DateMessageProvider provider = new DateMessageProvider();
        assertEquals("오후", provider.getDateMessage());
    }
}
```

- 위 테스트를 실행하면, 반드시 하나의 테스트는 실패한다. 요구사항은 이 두 테스트가 모두 성공하도록 리팩토링하는 것이다.
  - 이를 위해서는 먼저 테스트가 모두 성공하지 못하는 원인을 알아야 할 것이다.

원인은, `DateMessageProvider` 가 `Calendar` 와 의존관계를 가지는데 테스트를 위해 `Calendar` 의 시간을 변경할 수 있는 방법이 없다.
- **소스코드를 컴파일하는 시점에 `Calendar` 인스턴스가 이미 결정**되어 버리기 때문이다.
  - 이같은 의존관계를 강하게 결합(**tightly coupling**)되어 있다고 한다.
- 모든 테스트의 성공을 위해서는 **`Calendar` 에서 반환되는 시간을 변경할 수 있도록 `DateMessageProvider` 를 리팩토링**해야 한다.
  - 즉, `getDateMessage()` 가 아닌 `DateMessageProvider` 외부에서 `Calendar` 인스턴스 생성 후 전달하는 구조로 바꿔야 한다.
    - 생성자를 통해 전달하거나, `getDateMessage()` 메소드 인자로 전달할 수 있다. (두번째 방법 사용)

```java
public class DateMessageProvider {
    public String getDateMessage(Calendar now) {
        int hour = now.get(Calendar.HOUR_OF_DAY);

        if (hour < 12) {
            return "오전";
        }
        return "오후";
    }
}
```

```java
public class DateMessageProviderTest {
    @Test
    public void 오전() throws Exception {
        DateMessageProvider provider = new DateMessageProvider();
        assertEquals("오전", provider.getDateMessage(createCurrentDate(11)));
    }

    @Test
    public void 오후() throws Exception {
        DateMessageProvider provider = new DateMessageProvider();
        assertEquals("오후", provider.getDateMessage(createCurrentDate(13)));
    }

    public Calendar createCurrentDate(int hourOfDay) {
        Calendar now = Calendar.getInstance();
        now.set(Calendar.HOUR_OF_DAY, hourOfDay);
        return now;
    }
}
```

이제 모든 테스트가 성공이다.
- `DateMessageProvider` 가 의존하고 있는 `Calendar` 인스턴스의 생성을 `DateMessageProvider` 가 결정하지 않고, 외부로부터 전달받음으로써 원하는 시간으로 변경해 모든 테스트를 성공할 수 있었다.
- 이처럼 DI는 **객체 간의 의존관계에 대한 결정권**을, 의존관계를 가지는 객체(`DateMessageProvider`)가 가지는 것이 아닌 **외부의 누군가가 담당**하도록 맡겨 더 유연한 구조로 개발한다.

---

## 🚩 DI를 적용하면서 쌓이는 불편함 또는 불만
질문/답변 게시판의 `QnaService` 를 DI기반으로 변경하면서 기존의 방식과 어떻게 다르고, 어떤 불편함이 있는지 살펴본다. 

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

- 보이는 것과 같이 `QuestionDao` 와 `AnswerDao` 에 의존관계를 가진다. 이를 DI구조로 변경해본다.

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

- 앞에서 다룬 `DateMessageProvider` 예제에서는 `getDateMessage()` 에서만 발생하는 의존관계를 해결하기 위해 메소드 인자로 전달했다.
- `QnaService` 의 `QuestionDao` , `AnswerDao` 는 `QnaService` 메소드 전체에서 사용되기에 생성자를 통해 필드로 관리하도록 변경했다.
  - `getInstance()` 메소드를 변경했기에 이를 사용하는 다른 컨트롤러에서 에러가 발생한다. 이를 `private QnaService qnaService = QnaService.getInstance(QuestionDao.getInstance(), AnswerDao.getInstance());` 와 같이 고쳐준다.

이제 테스트를 수행할텐데, `QuestionDao` 와 `AnswerDao` 가 DB와의 의존관계를 가지기에 이를 가지지 않도록 변경할 수 있어야 DB에 의존하지 않는 테스트가 가능하다.
- `QuestionDao` 와 `AnswerDao` 를 상속해 메소드를 오버라이딩하여 해결한다.
  - 먼저 `MockQuestionDao` 클래스를 추가하고 `QuestionDao` 를 상속한다.
  - 이때, `QuestionDao` 의 기본 생성자가 **싱글톤 패턴의 적용**을 위해 `private` 으로 구현하여 상속할 수 없다.

또 다른 방법으로, 객체 간의 의존관계에 대한 강한 결합(tightly coupling)을 줄이기 위해 DI를 적용하면서 **인터페이스를 사용**한다.
- `QuestionDao` → `JdbcQuestionDao` renaming
- `AnswerDao` → `JdbcAnswerDao` renaming
- 인터페이스 이름을 `QuestionDao` , `AnswerDao` 로 사용
- `JdbcQuestionDao` , `JdbcAnswerDao` 에 의존하고 있던 `QnaService` 코드를 새로 추가한 인터페이스 각각에 의존하도록 변경
- `MockQuestionDao` , `MockAnswerDao` 를 구현

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

- `MockQuestionDao` 또한 위와 동일하게 간단한 메모리 DB 역할을 하도록 구현했다.
- 이제 테스트 코드를 추가한다.

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
    public void deleteQuestion_없는_질문() throws Exception {
        qnaService.deleteQuestion(1L, newUser("userId"));
    }

    @Test(expected = CannotDeleteException.class)
    public void deleteQuestion_다른_사용자() throws Exception {
        Question question = newQuestion(1L, "javajigi");
        questionDao.insert(question);
        qnaService.deleteQuestion(1L, newUser("userId"));
    }

    @Test
    public void deleteQuestion_같은_사용자_답변없음() throws Exception {
        Question question = newQuestion(1L, "javajigi");
        questionDao.insert(question);
        qnaService.deleteQuestion(1L, newUser("javajigi"));
    }
}
```

- `newUser` 와 `newQuestion` 메소드는 `model` 의 각 클래스 테스트 코드에 구현한다.
- 위 테스트에서 `deleteQuestion_같은_사용자_답변없음()` 만 "존재하지 않는 질문입니다." 라는 에러가 발생하는 것을 확인할 수 있다. 분명 질문을 추가했는데도 이러한 에러가 뜬다.
  - 이는 **`QnaService` 가 싱글톤 인스턴스**이기에 발생하는 에러이다.
  - 즉, `QnaService` 가 참조하는 `QuestionDao` (처음 인스턴스 생성 시 해당 인스턴스)와 테스트 메소드에서 생성한 인스턴스가 다르다는 것이다.
  - 이는 테스트 데이터를 초기화하는 작업을 `setup()` 메소드에서만 하도록 변경해 해결할 수 있다.

---

## 🚩 불만 해소하기
- 싱글톤 패턴을 사용함으로 인해 테스트에 어려움이 있었다. 어떤 형태로든 테스트할 수 있지만 고려해야 할 부분이 많아진다는 것은 반갑지 않다. 
- 테스트를 위해 매번 `Mock` 객체를 만드는 것은 많은 비용이 드는 작업이다.

### 🔧 싱글톤 패턴을 제거한 DI
이 디자인 패턴은 이해하기도 가장 쉽기에 널리 사용되었다. 하지만 그에 따른 단점도 많다. 
- 싱글톤 패턴으로 구현된 클래스와 의존관계를 가지는 경우 해당 클래스와 강한 의존관계를 가지기 때문에 테스트하기 어렵고,
- 생성자를 `private` 로 구현해 상속할 수 없다.
- 또한 객체지향 설계 원칙에 따라 개발하는 것을 저해하는 요인이 된다.

> 싱글톤 패턴을 사용하지 않으면서 인스턴스 하나만 유지하는 방법이 있을까?

- 지금까지 인스턴스 하나만 생성하기 위해 `Service` , `DAO` , `JdbcTemplate` 은 싱글톤 패턴을 적용했다.
- 하지만 **컨트롤러**는 이를 적용하지 않고도 같은 효과를 낼 수 있었다.
  - 서블릿 컨테이너가 `DispatcherServlet` 을 초기화하는 시점에 컨트롤러 인스턴스를 생성한 후 재사용 가능하도록 구현했기 때문이다.
  - 그렇다면, 이 방식으로 다른 클래스도 인스턴스를 관리한다면 문제를 해결할 수 있지 않을까? 그리고 각 인스턴스 간 의존관계는 DI 기반으로 구현한다.

먼저 `QnaService` 의 `QuestionDao` 와 `AnswerDao` 를 이 방법으로 구현하고 테스트를 진행한다.
- 싱글톤 패턴 코드를 제거하고 생성자를 `public` 으로 변경한다.

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

- 위와 같이 수정 후 `getInstance()` 메소드를 제거하고 테스트를 진행하면 정상적으로 동작한다. 이제 `QnaService` 와 의존관계를 가지는 다른 컨트롤러들을 수정한다.

```java
public class DeleteQuestionController extends AbstractController {
    private QnaService qnaService;
    
    public DeleteQuestionController(QnaService qnaService) {
        this.qnaService = qnaService;
    }
    ...

}
```

- 위처럼, `public` 생성자를 만들어 인자로 받은 `QnaService` 인스턴스를 사용하도록 수정한다.
- 이제 이 컨트롤러들을 생성할 때 `QnaService` 를 DI로 전달해준다.

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

- 다시 보니, `JdbcQuestionDao` , `JdbcAnswerDao` 는 아직 싱글톤 패턴을 사용하고 있다. 이들도 싱글톤 패턴을 적용하지 않도록 수정한다. 그리고 연이어 발생하는 컨트롤러에서의 컴파일 에러도 모두 수정한다.
  - `getInstance()` 메소드를 사용하는 코드를 모두 제거하고, `public` 생성자의 인자로 필요한 인스턴스를 받아 사용하도록 수정하고, 매핑 초기화 시 필요한 인스턴스를 모두 전달해주도록 한다.

### 🔧 Mockito를 활용한 테스트
DB가 없는 상태에서도 테스트가 가능하도록 `QuestionDao` 와 `AnswerDao` 에 대한 가짜(`Mock`) 클래스를 구현했다. 하지만 이런 방식은 테스트 코드 구현도 부담인데 매번 새로운 가짜 클래스를 만들어야 하는 부담이 추가되는 격이다. 
- 이를 위해 `Mock` 클래스 구현 없이도 테스트가 가능하도록 지원하는 `Mock` 테스트 프레임워크를 활용한다.

먼저 메이븐 설정 파일에 의존관계를 추가한다.
```xml
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>1.10.19</version>
    <scope>test</scope>
</dependency>
```

이제 이를 활용해 `QnaService` 의 `deleteQuestion()` 메소드에 대한 테스트 코드를 수정한다.

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
    public void deleteQuestion_없는_질문() throws Exception {
        when(questionDao.findById(1L)).thenReturn(null);
        qnaService.deleteQuestion(1L, newUser("userId"));
    }
    ...

    @Test
    public void deleteQuestion_같은_사용자_답변없음() throws Exception {
        Question question = newQuestion(1L, "javajigi");
        when(questionDao.findById(1L)).thenReturn(question);
        when(answerDao.findAllByQuestionId(1L)).thenReturn(Lists.newArrayList());
        qnaService.deleteQuestion(1L, newUser("javajigi"));
    }
}
```

- `Mock` 클래스 없이 테스트를 성공적으로 완료했다.
  - **Mockito**는 `Mock` 클래스 대신 `@Mock` annotation으로 설정한 클래스의 메소드를 호출했을 때, 반환 값을 지정할 수 있다.
  - 또한 해당 annotation을 설정한 클래스의 메소드가 호출되는지 여부를 `verify()` 메소드를 통해 검증하는 작업 또한 가능하다.
  - 이처럼 다른 클래스와 의존관계를 가지는 클래스를 테스트하는 경우 `Mock` 프레임워크의 사용을 추천한다.

### 🔧 DI보다 우선하는 객체지향 개발
"계층형 아키텍처 관점과 객체지향 설계 관점에서 핵심적인 비즈니스 로직을 구현해야 하는 역할은 누가 담당해야할까?"
- 먼저 앞에서 구현한 `DateMessageProvider` 코드를 다시 보면서 답에 대해 생각해본다.
- 이 코드를 위한 테스트 코드는 다음과 같다. 

```java
public class DateMessageProviderTest {
    @Test
    public void 오전() throws Exception {
        DateMessageProvider provider = new DateMessageProvider();
        assertEquals("오전", provider.getDateMessage(createCurrentDate(11)));
    }

    @Test
    public void 오후() throws Exception {
        DateMessageProvider provider = new DateMessageProvider();
        assertEquals("오후", provider.getDateMessage(createCurrentDate(13)));
    }

    public Calendar createCurrentDate(int hourOfDay) {
        Calendar now = Calendar.getInstance();
        now.set(Calendar.HOUR_OF_DAY, hourOfDay);
        return now;
    }
}
```

- 이처럼 간단한 로직을 구현하는데 좀 더 간단히 테스트할 수 있는 방법은 없을까에 대해 생각해볼 수 있다.
  - `DateMessageProvider` 의 구조를 개선해 테스트를 더 쉽게 할 수 없을까?
  - 좀 더 객체지향적인 개발을 수행한다면 해결책을 얻을 수 있을 것이다.

먼저 시간을 추상화하는 `Hour` 클래스를 추가한다.

```java
public class Hour {
    private int hour;

    public Hour(int hour) {
        this.hour = hour;
    }

    public String getMessage() {
        if (hour < 12) {
            return "오전";
        }
        return "오후";
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

- `Hour` 클래스가 `DateMessageProvider` 가 구현하던 로직을 담당하게 되었다. 테스트 코드는 다음과 같다.

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

위에서 말한 질문에 대한 답변으로, 대부분 Service layer를 담당하고 있는 `QnaService` 에서 처리해야 한다고 생각한다. 하지만 **핵심적인 비즈니스 로직 구현은 Domain 객체가 담당**하는 것이 맞다.
- **Service layer**의 핵심 역할은 Domain 객체들이 비즈니스 로직을 구현할 수 있도록 Domain 객체를 조합하거나, 로직 처리 완료 시 상태 값을 DAO를 활용해 DB에 영구 저장하는 등이다.

대부분의 개발자들은 `QnaService` 의 `deleteQuestion()` 메소드와 같이 구현하는 경우가 많다. 이는 대표적인 **절차지향적 개발**이다. 
- 이와 같은 개발은 **Service layer의 복잡도는 점점 더 증가**하고
- **유지보수와 테스트하기 힘든 상황**을 맞닥뜨리게 된다.
- 또한 핵심 객체라 할 수 있는 Domain 객체는 사용자가 입력한 데이터를 DAO에 전달하거나 DB 데이터를 뷰에 전달하는 역할만을 수행하게 된다. (핵심적인 역할 수행 X)
  - 그리하여 Domain 객체가 값을 전달하는 `Getter` & `Setter` 메소드만을 가지는 상황이 발생한다.

이제부터는 Domain 객체에 더 많은 역할을 부여하는 방향으로 구현하도록 한다.
- `QnaService` 의 `deleteQuestion()` 메소드가 구현하고 있는 로직을 Domain 객체, 즉 `Question` & `Answer` 가 담당하도록 한다.
- 먼저, 삭제 가능 여부를 `Question` 에 메세지를 보내(`canDelete()`) 확인하는 방식으로 리팩토링한다.

```java
public class Question {
    ...

    public boolean canDelete(User user, List<Answer> answers) throws CannotDeleteException {
        if (!user.isSameUser(this.writer)) {
            throw new CannotDeleteException("다른 사용자가 작성한 글을 삭제할 수 없습니다.");
        }
        
        for (Answer answer : answers) {
            if (!answer.canDelete(user)) {
                throw new CannotDeleteException("다른 사용자가 추가한 댓글이 존재해 삭제할 수 없습니다.");
            }
        }
        
        return true;
    }
}
```

- `Question` 은 인자로 전달된 `User` , `Answer` 와 역할을 나눠 삭제 가능 여부를 판단한다.
  - `User` 에 질문한 사람의 ID를 전달해 사용자가 동일한지 판단하고,
  - 글쓴이와 로그인 사용자가 같은 경우 각 답변이 삭제 가능한 상태인지 확인한다. (`Answer`)

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

이제 이를 활용해 `deleteQuestion()` 을 수정한다.

```java
public class QnaService {
    ...

    public void deleteQuestion(long questionId, User user) throws CannotDeleteException {
        Question question = questionDao.findById(questionId);
        if (question == null) {
            throw new CannotDeleteException("존재하지 않는 질문입니다.");
        }

        List<Answer> answers = answerDao.findAllByQuestionId(questionId);
        if (question.canDelete(user, answers)) {
            questionDao.delete(questionId);
        }
    }
}
```

- Domain 객체로 로직을 이동시켜 매우 깔끔해졌다. 그렇다고 Domain 객체에 복잡한 로직이 구현된 것은 아니다.

> "객체지향 개발을 하기 위한 좋은 연습은 상태 값을 가지는 Domain 객체에서 값을 꺼내려고 하지 말고 객체에 메세지를 보내 작업을 위임한다는 생각으로부터 시작한다."

객체지향적 개발 시 장점 중 하나는 **테스트하기 쉽다**는 것이다. 아래는 `Question` 의 `canDelete()` 메소드에 대한 테스트 코드이다.

```java
public class QuestionTest {
    public static Question newQuestion(String writer) {
        return new Question(1L, writer, "title", "contents", new Date(), 0);
    }

    public static Question newQuestion(long questionId, String writer) {
        return new Question(questionId, writer, "title", "contents", new Date(), 0);
    }

    @Test(expected = CannotDeleteException.class)
    public void canDelete_다른_글쓴이() throws Exception {
        User user = newUser("javajigi");
        Question question = newQuestion("sanjigi");
        question.canDelete(user, new ArrayList<Answer>());
    }

    @Test
    public void canDelete_글쓴이_같음_답변_없음() throws Exception {
        User user = newUser("javajigi");
        Question question = newQuestion("javajigi");
        assertTrue(question.canDelete(user, new ArrayList<Answer>()));
    }

    @Test
    public void canDelete_같은_사용자_답변() throws Exception {
        User user = newUser("javajigi");
        Question question = newQuestion("javajigi");
        List<Answer> answers = Arrays.asList(newAnswer("javajigi"), newAnswer("javajigi"));
        question.canDelete(user, answers);
    }

    @Test(expected = CannotDeleteException.class)
    public void canDelete_다른_사용자_답변() throws Exception {
        User user = newUser("javajigi");
        Question question = newQuestion("javajigi");
        List<Answer> answers = Arrays.asList(newAnswer("javajigi"), newAnswer("sanjigi"));
        question.canDelete(user, answers);
    }
}
```

- 테스트 코드를 보면, `QuestionDao` , `AnswerDao` 에 대한 의존관계가 없기에 `Mock` 프레임워크를 사용할 필요도 없으며, 구현 또한 간단한 것을 확인할 수 있다.

이제 `QnaService` 에 대한 테스트를 진행한다면 다음과 같이 할 수 있다. 이미 핵심 비즈니스 로직은 `QuestionTest` 에서 모두 끝낸 상태이다. 즉, `QnaServiceTest` 에서는 `QnaService` 로직에 대해서만 테스트를 수행하면 된다.

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
    public void deleteQuestion_없는_질문() throws Exception {
        when(questionDao.findById(1L)).thenReturn(null);
        qnaService.deleteQuestion(1L, newUser("userId"));
    }

    @Test
    public void deleteQuestion_삭제할수_있음() throws Exception {
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
    public void deleteQuestion_삭제할수_없음() throws Exception {
        User user = newUser("userId");
        Question question = new Question(1L, user.getUserId(), "title", "contents", new Date(), 0) {
            public boolean canDelete(User user, List<Answer> answers) throws CannotDeleteException {
                throw new CannotDeleteException("삭제할 수 없음.");
            };
        };
        when(questionDao.findById(1L)).thenReturn(question);
        qnaService.deleteQuestion(1L, newUser("userId"));
    }
}
```

관계형 DB를 사용하면서 좀 더 객체지향적인 개발을 위해서는 ORM(Object-Relational Mapping) 프레임워크를 사용할 필요가 있다. 하지만 이를 사용하지 않아도 메소드의 인자로 객체를 전달함으로써 일정 부분 객체지향적인 개발이 가능하다.

---

## 🚩 DI 프레임워크 실습
### 🔧 요구사항
질문/답변 기능에 DI를 적용하는 작업은 `LegacyHandlerMapping` 에서 구현했다. DI가 필요할 때마다 매번 직접 인스턴스를 생성해 전달하기 귀찮으므로, 자체적인 DI 프레임워크를 구현해본다.

새로 만든 MVC 프레임워크는 자바 리플렉션을 활용해 `@Controller` annotation이 설정되어 있는 클래스를 찾아 인스턴스를 생성하고, URL 매핑 작업을 자동화했다. 같은 방법으로 각 클래스에 대한 인스턴스 생성 및 의존관계 설정을 자동화한다.
- 먼저 각 클래스 역할에 맞도록 `@Controller` , `@Service` , `@Repository` annotation을 설정한다.
  - 3개의 설정으로 생성된 각 인스턴스 간의 의존관계는 `@Inject` annotation을 사용한다.
- DI 프레임워크로 생성된 인스턴스와 개발자가 `new` 키워드로 생성한 인스턴스를 분리한다.
  - DI 프레임워크를 통해 생성된 인스턴스는 **빈(Bean)**이라고 한다.

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

- 제약사항은 빈은 `@Inject` annotation을 가지는 생성자는 하나만 존재하며, 해당 annotation 설정이 되어있지 않으면 인자가 없는 기본 생성자를 제공하는 것으로 한다.

### 🔧 1단계 힌트
이 문제 해결을 위해서는 **재귀함수**를 사용해 구현할 수 있다. `@Inject` annotation이 설정된 생성자를 통해 빈을 생성해야 한다.
- 그런데 이 생성자의 인자로 전달할 빈도 다른 빈과 의존관계가 있다. 이처럼 빈 간의 의존관계가 연결되어 있을 수 있는데, 이는 다른 빈과 의존관계를 가지지 않는 빈을 찾아 인스턴스를 생성할 때까지 재귀를 실행하는 방식으로 구현할 수 있다.

재귀를 통해 생성한 빈은 `BeanFactory` 의 `Map<Class<?>, Object>` 에 추가해 관리한다. 
- 인스턴스 생성 전 먼저 `Class<?>` 에 해당하는 빈이 `Map<Class<?>, Object>` 에 존재 여부를 확인한 후 생성하는 방식으로 구현한다.
- **일반적인 캐시의 동작 원리**와 같은 재사용 방법이다.

### 🔧 2단계 힌트
빈 인스턴스를 생성하기 위한 재귀 함수 지원을 위해 Class에 대한 빈 인스턴스를 생성하는 메소드와 생성자에 대한 빈 인스턴스를 생성하는 메소드가 필요하다.

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

- 시작은 `instantiateClass()` 이다. 
- `@Inject` annotation이 설정된 생성자가 존재하면 `instantiateConstructor()` 메소드를 통해 인스턴스를 생성하고, 존재하지 않을 경우 기본 생성자로 인스턴스를 생성한다.
- `instantiateConstructor()` 메소드는 생성자의 인자로 전달할 빈이 생성되어 `Map<Class<?>, Object>` 에 이미 존재하면 해당 빈을 활용하고, 그렇지 않으면 `instantiateClass()` 을 통해 새로운 빈을 생성한다. 

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

### 🔧 추가 요구사항 및 힌트
`@Controller` 가 설정되어 있는 클래스를 찾는 `ControllerScanner` 를 DI 프레임워크가 있는 패키지로 이동해 `@Controller` , `@Service` , `@Repository` 에 대한 지원이 가능하도록 개선한다. 그리고 다른 annotation까지 지원이 가능하게 되므로, `BeanScanner` 로 rename한다.
- 또한 `AnnotationHandlerMapping` 이 `BeanFactory` 와 `BeanScanner` 를 활용하도록 리팩토링한다.

---

## 🚩 DI 프레임워크 구현
`BeanFactory` 의 `initialize()` 메소드를 구현한다. 

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
                throw new IllegalStateException(clazz + "는 Bean이 아닙니다.");
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

- `BeanFactory` 에서 핵심 구현 로직은 `instantiateClass()` , `instantiateConstructor()` 메소드이다. 이 두 메소드의 재귀호출을 통해 복잡한 의존관계에 있는 빈을 생성하는 과정을 완료할 수 있다.

이제 `@Controller` , `@Service` , `@Repository` annotation이 설정된 빈을 찾는 `BeanScanner` 를 구현한다.

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

이제 생성한 `BeanFactory` 를 `AnnotationHandlerMapping` 이 사용하도록 리팩토링한다. 먼저 `@Controller` annotation을 설정한 빈을 조회하는 메소드를 추가한다.

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

`AnnotationHandlerMapping` 에서는 `BeanFactory` 를 초기화한 후 `@Controller` 로 설정한 빈을 사용하면 된다.

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

## 📕 출처
**자바 웹 프로그래밍 Next Step : 하나씩 벗겨가는 양파껍질 학습법** - 박재성
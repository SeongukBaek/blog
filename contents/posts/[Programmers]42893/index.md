---
title: "👩‍💻 42893. 매칭 점수"
description: "알고리즘 문제 풀기"
date: 2022-06-05
update: 2022-06-05
tags:
  - 문자열
  - 정규표현식
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 매칭 점수](https://programmers.co.kr/learn/courses/30/lessons/42893)

### 📍 **Logic**

```java
for (String page : pages) {
    Page p = new Page(word, page);
    // url을 키로 하여 맵 추가
    pageInfo.put(p.url, p);
}
```

- `Page` 클래스의 `setScore()`, `setExtPages()` , `setLinkScore()` 로 각 `page` 에 대해 기본 점수와 외부 링크 수, 링크 점수를 계산한다.

```java
for (Page p : pageInfo.values()) {
    for (String extPage : p.extPages) {
        if (pageInfo.containsKey(extPage))
            pageInfo.get(extPage).addScore(p.getLinkScore());
    }
}
```

- 해당 웹 페이지로 링크가 걸린 다른 웹 페이지의 링크 점수(기본 점수 / 외부 링크 수)의 총합을 구해 해당 웹 페이지의 매칭 점수를 계산한다. 

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;
    import java.util.regex.Matcher;
    import java.util.regex.Pattern;

    class Page {
        String url;
        double score = 0;
        double linkScore = 0;
        ArrayList<String> extPages;

        public Page(String word, String page) {
            this.url = getUrl(page);
            extPages = new ArrayList<>();

            setScore(page, word);
            setExtPages(page);
            setLinkScore();
        }

        private String getUrl(String page) {
            Pattern pattern = Pattern.compile("<meta property=\"og:url\" content=\"(\\S*)\"");
            Matcher matcher = pattern.matcher(page);

            if (matcher.find())
                return matcher.group().split("=")[2].replaceAll("\"", "");
            return "";
        }
        
        public void addScore(double score) {
            this.score += score;
        }
        
        public double getScore() {
            return score;
        }

        private void setScore(String page, String word) {
            // body 태그 내 모든 숫자들을 공백으로 replace하여, word를 찾기 쉽도록 함
            String body = page.split("<body>")[1].split("</body>")[0].replaceAll("\\d", " ");
            Pattern pattern = Pattern.compile("\\b(?i)" + word + "\\b");
            Matcher matcher = pattern.matcher(body);

            while(matcher.find())
                score++;
        }

        private void setExtPages(String page) {
            Pattern pattern = Pattern.compile("<a href=\"https://(\\S*)\"");
            Matcher matcher = pattern.matcher(page);

            while(matcher.find())
                extPages.add(matcher.group().split("\"")[1]);
        }
        
        public double getLinkScore() {
            return linkScore;
        }5

        private void setLinkScore() {
            this.linkScore = this.score / extPages.size();
        }
    }

    class Solution {
        public int solution(String word, String[] pages) {
            word = word.toLowerCase();

            Map<String, Page> pageInfo = new LinkedHashMap<>();

            for (String page : pages) {
                Page p = new Page(word, page);
                // url을 키로 하여 맵 추가
                pageInfo.put(p.url, p);
            }

            for (Page p : pageInfo.values()) {
                for (String extPage : p.extPages) {
                    if (pageInfo.containsKey(extPage))
                        pageInfo.get(extPage).addScore(p.getLinkScore());
                }
            }

            double maxScore = 0;
            int maxIdx = 0;
            int idx = 0;
            for (Map.Entry<String, Page> entry : pageInfo.entrySet()) {
                double score = entry.getValue().getScore();
                if (score > maxScore) {
                    maxScore = score;
                    maxIdx = idx;
                }
                idx++;
            }
            
            return maxIdx;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 문제 자체는 매우 간단했지만 구현이 진짜 더러웠던 문제 ... 정규 표현식을 제대로 이해하지 않으면 절대 그냥 못 풀 듯 하다..
- 문제 이해를 잘못해서, **해당 웹 페이지로 링크가 걸린 다른 웹페이지의 기본 점수 / 외부 링크의 수의 총합**을 해당 웹 페이지로 링크가 걸린 다른 웹 페이지의 기본 점수와 현재 페이지의 링크의 수에 대한 계산으로 착각해서 시간을 더 날렸다.
---
title: "๐ฉโ๐ป 42893. ๋งค์นญ ์ ์"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-06-05
update: 2022-06-05
tags:
  - ๋ฌธ์์ด
  - ์ ๊ทํํ์
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ๋งค์นญ ์ ์](https://programmers.co.kr/learn/courses/30/lessons/42893)

### ๐ **Logic**

```java
for (String page : pages) {
    Page p = new Page(word, page);
    // url์ ํค๋ก ํ์ฌ ๋งต ์ถ๊ฐ
    pageInfo.put(p.url, p);
}
```

- `Page` ํด๋์ค์ `setScore()`, `setExtPages()` , `setLinkScore()` ๋ก ๊ฐ `page` ์ ๋ํด ๊ธฐ๋ณธ ์ ์์ ์ธ๋ถ ๋งํฌ ์, ๋งํฌ ์ ์๋ฅผ ๊ณ์ฐํ๋ค.

```java
for (Page p : pageInfo.values()) {
    for (String extPage : p.extPages) {
        if (pageInfo.containsKey(extPage))
            pageInfo.get(extPage).addScore(p.getLinkScore());
    }
}
```

- ํด๋น ์น ํ์ด์ง๋ก ๋งํฌ๊ฐ ๊ฑธ๋ฆฐ ๋ค๋ฅธ ์น ํ์ด์ง์ ๋งํฌ ์ ์(๊ธฐ๋ณธ ์ ์ / ์ธ๋ถ ๋งํฌ ์)์ ์ดํฉ์ ๊ตฌํด ํด๋น ์น ํ์ด์ง์ ๋งค์นญ ์ ์๋ฅผ ๊ณ์ฐํ๋ค. 

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
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
            // body ํ๊ทธ ๋ด ๋ชจ๋  ์ซ์๋ค์ ๊ณต๋ฐฑ์ผ๋ก replaceํ์ฌ, word๋ฅผ ์ฐพ๊ธฐ ์ฝ๋๋ก ํจ
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
                // url์ ํค๋ก ํ์ฌ ๋งต ์ถ๊ฐ
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

### โ๏ธ **Review**
- ๋ฌธ์  ์์ฒด๋ ๋งค์ฐ ๊ฐ๋จํ์ง๋ง ๊ตฌํ์ด ์ง์ง ๋๋ฌ์ ๋ ๋ฌธ์  ... ์ ๊ท ํํ์์ ์ ๋๋ก ์ดํดํ์ง ์์ผ๋ฉด ์ ๋ ๊ทธ๋ฅ ๋ชป ํ ๋ฏ ํ๋ค..
- ๋ฌธ์  ์ดํด๋ฅผ ์๋ชปํด์, **ํด๋น ์น ํ์ด์ง๋ก ๋งํฌ๊ฐ ๊ฑธ๋ฆฐ ๋ค๋ฅธ ์นํ์ด์ง์ ๊ธฐ๋ณธ ์ ์ / ์ธ๋ถ ๋งํฌ์ ์์ ์ดํฉ**์ ํด๋น ์น ํ์ด์ง๋ก ๋งํฌ๊ฐ ๊ฑธ๋ฆฐ ๋ค๋ฅธ ์น ํ์ด์ง์ ๊ธฐ๋ณธ ์ ์์ ํ์ฌ ํ์ด์ง์ ๋งํฌ์ ์์ ๋ํ ๊ณ์ฐ์ผ๋ก ์ฐฉ๊ฐํด์ ์๊ฐ์ ๋ ๋ ๋ ธ๋ค.
---
title: "๐ฉโ๐ป 17686. ํ์ผ๋ช ์ ๋ ฌ"
description: "์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  ํ๊ธฐ"
date: 2022-05-27
update: 2022-05-27
tags:
  - ๋ฌธ์์ด
series: "๐ฉโ๐ป Programmers"
---

## ๋ฌธ์ 
[Programmers - ํ์ผ๋ช ์ ๋ ฌ](https://programmers.co.kr/learn/courses/30/lessons/17686)

### ๐ **Logic**

```java
fileList.sort(((o1, o2) -> {
    // head๊ฐ ๋์ผํ๋ค๋ฉด, number ๊ธฐ์ค ์ค๋ฆ์ฐจ์ ์ ๋ ฌ
    if (o1.head.compareTo(o2.head) == 0) return o1.number - o2.number;
    // head ๊ธฐ์ค ์ฌ์ ์ ์ ๋ ฌ
    return o1.head.compareTo(o2.head);
}));
```
- `head` ๊ฐ ๋์ผํ ๊ฒฝ์ฐ์ ๋์ผํ์ง ์์ ๊ฒฝ์ฐ์ ๋ํ ์ ๋ ฌ ์กฐ๊ฑด ๋ช์

### ๐ **CODE**

<details>
  <summary>์ฝ๋ ๋ณด๊ธฐ/์ ๊ธฐ๐ซ</summary>
    <div markdown="1">

    import java.util.*;
    import java.util.regex.Matcher;
    import java.util.regex.Pattern;

    class File {
        // ๋ณํํ์ง ์์ ์๋ณธ ํ์ผ๋ช
        String file;
        String head;
        int number;

        public File(String file) {
            this.file = file;
            file = file.toLowerCase();

            // ์ซ์๊ฐ ์ฐ์์ด๊ฑฐ๋, ์ซ์๊ฐ ์๋ ๋ฌธ์๊ฐ ์ฐ์์ธ ๊ฒฝ์ฐ ์ฐพ๊ธฐ
            Pattern p = Pattern.compile("\\d+|\\D+");
            Matcher matcher = p.matcher(file);

            matcher.find();
            this.head = matcher.group(0);
            matcher.find();
            this.number = Integer.parseInt(matcher.group(0));
        }
    }

    class Solution {
        public String[] solution(String[] files) {
            ArrayList<File> fileList = new ArrayList<>();

            for (String file : files)
                fileList.add(new File(file));

            fileList.sort(((o1, o2) -> {
                // head๊ฐ ๋์ผํ๋ค๋ฉด, number ๊ธฐ์ค ์ค๋ฆ์ฐจ์ ์ ๋ ฌ
                if (o1.head.compareTo(o2.head) == 0) return o1.number - o2.number;
                // head ๊ธฐ์ค ์ฌ์ ์ ์ ๋ ฌ
                return o1.head.compareTo(o2.head);
            }));
            
            String[] answer = new String[files.length];
            
            for (int i = 0; i < fileList.size(); i++) 
                answer[i] = fileList.get(i).file;
            
            return answer;
        }
    }
  	</div>
</details>

### โ๏ธ **Review**
- `head` ์ `number` ์ ๋ํ ์ ๋ ฌ ์กฐ๊ฑด๋ง ์ธ์ด๋ค๋ฉด ํด๊ฒฐ๋๋ ๋ฌธ์ !
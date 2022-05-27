---
title: "👩‍💻 20922. 겹치는 건 싫어"
description: "알고리즘 문제 풀기"
date: 2022-05-28
update: 2022-05-28
tags:
  - 투 포인터
series: "👩‍💻 BOJ"
---

## 문제
[BOJ - 겹치는 건 싫어](https://www.acmicpc.net/problem/20922)

### 📍 **Logic**

```java
while(s <= e) {
    if (e == numbers.length) {
        max = Math.max(max, e - s);
        break;
    }
    int n = numbers[e];

    if (numMap.containsKey(n)) {
        if (numMap.get(n) == K) {
            max = Math.max(max, e - s);
            int count = numMap.get(numbers[s]) - 1;
            if (count == 0) numMap.remove(numbers[s]);
            else numMap.put(numbers[s], count);
            s++;
        } else {
            numMap.put(n, numMap.getOrDefault(n, 0) + 1);
            e++;
        }
    } else {
        numMap.put(n, 1);
        e++;
    }
}
```
- `Map` 을 이용해 해당 숫자가 문자열에 나타난 횟수를 저장한다.
- 이미 `K` 개가 문자열에 들어있다면, `s` 지점에 있는 숫자부터 1개씩 줄여나간다.
  - `Map` 에서 -1하고, `s` 를 1씩 증가시킨다.
- 아직 `K` 개가 문자열에 들어있지 않다면, 나타난 횟수를 1씩 증가시킨다.
- 아직 문자열에 들어있지 않은 경우와 `K` 개가 문자열에 들어있지 않은 경우만 `e` 를 증가시켜 다음 숫자를 확인할 수 있도록 한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.lang.reflect.Array;
    import java.util.*;
    import java.util.regex.Matcher;
    import java.util.regex.Pattern;


    class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int[] info = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            int N = info[0];
            int K = info[1];
            int s = 0;
            int e = 0;
            int max = 0;
            Map<Integer, Integer> numMap = new HashMap<>();

            int[] numbers = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();

            while(s <= e) {
                if (e == numbers.length) {
                    max = Math.max(max, e - s);
                    break;
                }
                int n = numbers[e];

                if (numMap.containsKey(n)) {
                    if (numMap.get(n) == K) {
                        max = Math.max(max, e - s);
                        int count = numMap.get(numbers[s]) - 1;
                        if (count == 0) numMap.remove(numbers[s]);
                        else numMap.put(numbers[s], count);
                        s++;
                    } else {
                        numMap.put(n, numMap.getOrDefault(n, 0) + 1);
                        e++;
                    }
                } else {
                    numMap.put(n, 1);
                    e++;
                }
            }

            System.out.println(max);
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 투 포인터를 사용하는 문제 중 그나마 쉬워보여서 푼 문제
- `s` 와 `e` 에 대한 착각으로 시간이 좀 걸렸다...

### 📕 출처
Baekjoon : https://www.acmicpc.net/problem/17779
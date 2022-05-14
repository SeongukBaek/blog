---
title: "👩‍💻 16472. 고냥이"
description: "알고리즘 문제 풀기"
date: 2022-05-14
update: 2022-05-14
tags:
  - 투 포인터
series: "👩‍💻 BOJ"
---

## 문제
고양이는 너무 귀엽다. 사람들은 고양이를 너무 귀여워했고, 결국 고양이와 더욱 가까워지고 싶어 고양이와의 소통을 위한 고양이 말 번역기를 발명하기로 했다. 이 번역기는 사람의 언어를 고양이의 언어로, 고양이의 언어를 사람의 언어로 바꾸어 주는 희대의 발명품이 될 것이다.

현재 고양이말 번역기의 베타버전이 나왔다. 그러나 이 베타버전은 완전 엉망진창이다. 베타버전의 번역기는 문자열을 주면 그 중에서 최대 N개의 종류의 알파벳을 가진 연속된 문자열밖에 인식하지 못한다. 굉장히 별로지만 그나마 이게 최선이라고 사람들은 생각했다. 그리고 문자열이 주어졌을 때 이 번역기가 인식할 수 있는 최대 문자열의 길이는 얼마인지가 궁금해졌다.

고양이와 소통할 수 있도록 우리도 함께 노력해보자.

## 입, 출력

입력
- 첫째 줄에는 인식할 수 있는 알파벳의 종류의 최대 개수 N이 입력된다. (1 < N ≤ 26)
- 둘째 줄에는 문자열이 주어진다. (1 ≤ 문자열의 길이 ≤ 100,000) 단, 문자열에는 알파벳 소문자만이 포함된다.

출력
- 첫째 줄에 번역기가 인식할 수 있는 문자열의 최대길이를 출력한다.

### 📍 **Logic**

```java
while(left <= right) {
    // 범위 벗어나면 종료, 기본적으로 right가 먼저 움직임
    if (right >= str.length()) break;

    char rightCh = str.charAt(right);

    if ((left != right || right == 0) && prev == left)
        wordIndexMap.put(rightCh, wordIndexMap.getOrDefault(rightCh, 0) + 1);

    // 아직 N개 이하인 경우, 계속 length를 늘림
    if (wordIndexMap.size() <= N) {
        maxLength = Math.max(maxLength, right - left + 1);
        right++;
        prev = left;
    } else {
        // N개가 채워져 기존의 종류를 하나 제외하는 경우
        char leftCh = str.charAt(left);
        int num = wordIndexMap.get(leftCh) - 1;
        if(num == 0)
            wordIndexMap.remove(leftCh);
        else
            wordIndexMap.put(leftCh, num);
        left++;
    }
}
```

- `Map` 으로 종류와 빈도 수를 저장한다.
- `N` size가 된 경우와 그렇지 않은 경우로 나눠, `right` 를 늘리거나 `Map` 에서 알파벳을 지운다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.HashMap;
    import java.util.HashSet;
    import java.util.Map;
    import java.util.Set;

    class Cat {
        int maxLength = 0;
        public Cat() {}

        public void translate(int N, String str) {
            Map<Character, Integer> wordIndexMap = new HashMap<>();
            int left = 0;
            int right = 0;
            int prev = left;

            while(left <= right) {
                // 범위 벗어나면 종료, 기본적으로 right가 먼저 움직임
                if (right >= str.length()) break;

                char rightCh = str.charAt(right);

                if ((left != right || right == 0) && prev == left)
                    wordIndexMap.put(rightCh, wordIndexMap.getOrDefault(rightCh, 0) + 1);

                // 아직 N개 이하인 경우, 계속 length를 늘림
                if (wordIndexMap.size() <= N) {
                    maxLength = Math.max(maxLength, right - left + 1);
                    right++;
                    prev = left;
                } else {
                    // N개가 채워져 기존의 종류를 하나 제외하는 경우
                    char leftCh = str.charAt(left);
                    int num = wordIndexMap.get(leftCh) - 1;
                    if(num == 0)
                        wordIndexMap.remove(leftCh);
                    else
                        wordIndexMap.put(leftCh, num);
                    left++;
                }
            }
        }

        public int getMaxLength() {
            return maxLength;
        }
    }

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int N = Integer.parseInt(br.readLine());
            String str = br.readLine();

            Cat cat = new Cat();

            cat.translate(N, str);

            System.out.println(cat.getMaxLength());
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 투 포인터 알고리즘을 알게 되어 아이디어는 쉽게 잡을 수 있었으나 구현에서 조금 막혔다.
- `right` 를 늘리면서 `prev` 를 확인해주는 과정이 필요했다.

### 📕 출처
- Baekjoon : https://www.acmicpc.net/problem/16472
---
title: "👩‍💻 92335. k진수에서 소수 개수 구하기"
description: "알고리즘 문제 풀기"
date: 2022-07-07
update: 2022-07-07
tags:
  - 소수 구하기
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - k진수에서 소수 개수 구하기](https://programmers.co.kr/learn/courses/30/lessons/92335)

### 📍 **Logic**

```java
private static boolean isPrime(long n) {
    // 소수는 1과 자기 자신만으로 나누어지는 수
    // 따라서 2부터 루트 n까지의 수로 나누어보고, 나눠진다면 소수가 아니다.
    // (int) Math.sqrt(n) : 소수점 버림
    for (int i = 2; i <= (int) Math.sqrt(n); i++)
        if (n % i == 0)
            return false;

    return true;
}
```

- 소수인지 아닌지 판별하는 함수

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	class Solution {
        public int solution(int n, int k) {
            int answer = 0;
            
            String[] nums = convertToK(n, k).split("0");
            
            for (String num : nums) {
                if (num.equals("") || num.equals("1")) continue;
                if (isPrime(Long.parseLong(num))) answer++;
            }
            
            return answer;
        }
        
        private static String convertToK(int num, int k) {
            StringBuilder sb = new StringBuilder();

            while(num > 0) {
                sb.append(num % k);
                num /= k;
            }

            return sb.reverse().toString();
        }

        private static boolean isPrime(long n) {
            // 소수는 1과 자기 자신만으로 나누어지는 수
            // 따라서 2부터 루트 n까지의 수로 나누어보고, 나눠진다면 소수가 아니다.
            // (int) Math.sqrt(n) : 소수점 버림
            for (int i = 2; i <= (int) Math.sqrt(n); i++)
                if (n % i == 0)
                    return false;

            return true;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 소수를 구하는 알고리즘이 중요했다.
- 뭔가 0에 대해서 막 조건 설명을 늘어놓길래 .. 아 0으로 `split` 하면 되겠구나 싶었다.
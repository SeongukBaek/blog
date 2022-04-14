---
title: "👩‍💻 2437. 저울"
description: "알고리즘 문제 풀기"
date: 2022-03-04
update: 2022-03-04
tags:
  - 그리디
  - 정렬
series: "👩‍💻 BOJ"
---

## 문제

하나의 양팔 저울을 이용하여 물건의 무게를 측정하려고 한다. 이 저울의 양 팔의 끝에는 물건이나 추를 올려놓는 접시가 달려 있고, 양팔의 길이는 같다. 또한, 저울의 한쪽에는 저울추들만 놓을 수 있고, 다른 쪽에는 무게를 측정하려는 물건만 올려놓을 수 있다.

<img src="https://upload.acmicpc.net/7d2a2428-a1b0-47f5-9f53-fecd714d1b1b/-/preview/" width="30%">

무게가 양의 정수인 N개의 저울추가 주어질 때, 이 추들을 사용하여 측정할 수 없는 양의 정수 무게 중 최솟값을 구하는 프로그램을 작성하시오.

예를 들어, 무게가 각각 3, 1, 6, 2, 7, 30, 1인 7개의 저울추가 주어졌을 때, 이 추들로 측정할 수 없는 양의 정수 무게 중 최솟값은 21이다. 

### 입력
- 첫 째 줄에는 저울추의 개수를 나타내는 양의 정수 N이 주어진다. N은 1 이상 1,000 이하이다. 둘째 줄에는 저울추의 무게를 나타내는 N개의 양의 정수가 빈칸을 사이에 두고 주어진다. 각 추의 무게는 1이상 1,000,000 이하이다.

### 출력
- 첫째 줄에 주어진 추들로 측정할 수 없는 양의 정수 무게 중 최솟값을 출력한다.

### 📍 **Logic**

```java
Arrays.sort(nums);
```

- 입력된 저울추들을 정렬한다.

```java
for (int i = 0; i < N; i++) {
    if (sum + 1 < nums[i]) break;
    sum += nums[i];
}
```

- 주어진 추들로 측정 가능한 무게를 찾는 반복문

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.util.Arrays;

    public class Main {
        public static void main(String[] args) throws IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int N = Integer.parseInt(br.readLine());
            int[] nums = Arrays.stream( br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            int sum = 0;

            Arrays.sort(nums);

            for (int i = 0; i < N; i++) {
                if (sum + 1 < nums[i]) break;
                sum += nums[i];
            }

            System.out.println(sum + 1);

            br.close();
        }
    }
  	</div>
</details>

### ✏️ **Review**
- c++로 풀었을 당시 왜 이렇게 풀이가 간단할까를 고심했던 것 같아 Java로 다시 풀어보았다.
- 측정할 무게는 주어진 저울추로 측정이 가능한 경우, 주어진 저울추의 무게를 더하고, 거기에 +1 한 무게와 다음 저울추의 무게를 비교한다.
- 다시 봐도 뭔가 명쾌하게 이해는 가지 않아 다음에 다시 풀라고하면 또 헤맬 거 같다..ㅋㅋ

### 📕 출처
https://www.acmicpc.net/problem/2437
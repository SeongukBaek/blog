---
title: "💡 최장 증가 수열(LIS)"
description: "개발 상식"
date: 2022-05-09
update: 2022-05-09
tags:
  - 개발상식
  - Java
  - LIS
series: "💡 Algorithm"
---

## 🧷 최장 증가 수열
가장 긴 증가하는 부분 수열(Longest Increasing Sequence)로, 일반적으로는 DP를 이용해 해결한다.

```
{7, 2, 3, 8, 4, 5} -> LIS -> {2, 3, 4, 5}
```

### 🪚 DP를 활용한 구현 및 시간 복잡도
```java
int[] arr = {7, 2, 3, 8, 4, 5};
int[] dp = new int[arr.length]; // LIS 저장 배열
int max = 0;

for (int i = 1; i < dp.length; i++) {
  for (int j = i - 1; j >= 0; j--) {
    if (arr[i] > arr[j]) {
      dp[i] = (dp[i] < dp[j] + 1) ? dp[j] + 1 : dp[i];
      if (max < dp[i]) max = dp[i];
    }
  }
}

int[] answer = new int[max + 1];
int check = dp[dp.length - 1];
for (int i = dp.length - 1; i >= 0; i--) {
  if (dp[i] == check) {
    answer[check] = arr[i];
    check--;
  }
}

// DP에 저장된 값 중 최댓값 + 1이 LIS의 길이
System.out.println(Arrays.toString(answer));
```

> 하지만 위와 같이 **DP를 활용하는 방식의 시간 복잡도**는 $O(N^2)$이다.

이를 줄이는 좋은 방법은 **이분 탐색**을 활용하는 것이다.

### 🪚 이분 탐색을 활용한 구현 및 시간 복잡도
LIS를 구성할 때 이분 탐색을 활용한다. 
- LIS의 형태를 유지하기 위해 주어진 배열의 인덱스를 하나씩 살펴본다.
- 해당 숫자가 들어갈 위치를 이분 탐색으로 탐색해 삽입한다.

> 일반적으로 이분 탐색의 시간 복잡도는 $O(logN)$이다. 따라서 이를 이용해 시간 복잡도를 **$O(NlogN)$** 으로 줄일 수 있다.

<img src="https://i.imgur.com/tPAmqre.png" width="80%">

```java
static int[] arr = {7, 2, 3, 8, 4, 5};
static ArrayList<Integer> lis = new ArrayList<>();

public static void main(String[] args) {
  lis.add(arr[0]);
  int idx = 1;
  int j = 0;

  while(idx < arr.length) {
    if (lis.get(j) < arr[idx]) {
      lis.add(arr[idx]);
      j++;
    } else {
      lis.remove(j);
      lis.add(binarySearch(j, arr[idx]), arr[idx]);
    }
    idx++;
  }

  System.out.println(j + 1);
  System.out.println(lis);
}

private static int binarySearch(int right, int target) {
  // 항상 left는 시작점
  int left = 0;
  int mid;

  while(left < right) {
    mid = (left + right) / 2;

    if (lis.get(left) < target) left = mid + 1;
    else right = mid;
  }

  return right;
}
```

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog)
- [알고리즘 - 최장 증가 부분 수열(LIS) 알고리즘](https://chanhuiseok.github.io/posts/algo-49/)
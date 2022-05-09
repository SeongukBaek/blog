---
title: "💡 이분 탐색(Binary Search)"
description: "개발 상식"
date: 2022-05-05
update: 2022-05-05
tags:
  - 개발상식
  - Java
  - 이분탐색
series: "💡 Algorithm"
---

## 🧷 이분 탐색
탐색 범위를 두 부분으로 분할하면서 찾는 방식
- 처음부터 끝까지 탐색하는 것보다 더 빠른 시간 복잡도를 가지는 방식

```
**시간 복잡도**
전체 탐색: O(N)
이분 탐색: O(logN)
```

### 🪚 과정
가장 핵심은 **정렬이 되어 있어야 한다**는 점이다.
- `left` 와 `right` 를 사용해 `mid` 를 설정한다.
- `mid` 와 구하고자 하는 값을 비교한다.
  - 구하고자 하는 값이 더 큰 경우, `left = mid + 1`
  - 더 작은 경우, `right = mid - 1`
- `left > right` 가 될 때까지 반복
- 탐색할 배열의 범위를 벗어난다면, 구하고자 하는 값이 배열에 없음을 판단할 수 있다.

```java
int binarySearch(int[] numbers, int M) {
  Arrays.sort(numbers);

  int left = 0;
  int right = numbers.length - 1;
  int mid; 

  while (left < right) {
    mid = (left + right) / 2;

    if (numbers[mid] == M)
      return mid;
    else if (numbers[mid] < M) 
      left = mid + 1;
    else 
      right = mid - 1;
  }
}
```

### 🪚 추가 예제
이분 탐색은 정렬된 데이터에서 특정 값을 찾고자 할 때 빠른 시간 복잡도로 탐색이 가능하다는 장점이 있다. 이를 이용해 정수 N이 주어졌을 때, N의 제곱근을 구하는 코드를 작성해본다.
- 1부터 주어진 정수까지의 단순 반복 및 확인으로 구할 수는 있지만 이는 $O(N)$의 시간 복잡도를 가진다. 

이를 이분 탐색을 사용하여 "0부터 N까지의 자연수 중 N의 제곱근이 있는지 없는지" 확인하는 코드로 변경한다. 즉, **0부터 N까지의 정렬된 자연수 중에서 특정 값을 찾고 있는 것**이다.

```java
int squareRootSearch(int M) {
  int left = 0;
  int right = M;
  int num, squareNum; 

  while (left < right) {
    num = (left + right) / 2;
    squareNum = num * num;

    if (squareNum == M)
      return num;
    else if (squareNum < M) 
      left = num + 1;
    else 
      right = num - 1;
  }
}
```

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog/algorithm/Bubble%20Sort.html)
- [이진 탐색(Binary Search) 알고리즘 개념 이해 및 추가 예제](https://cjh5414.github.io/binary-search/)
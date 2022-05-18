---
title: "💡 배열 (Array)"
description: "개발 상식"
date: 2022-05-18
update: 2022-05-18
tags:
  - 개발상식
  - Java
  - 배열
series: "📂 Computer Science"
---

## 🧷 배열 (Array)
동일한 자료형의 데이터를 연속된 공간에 저장하기 위한 자료구조이다. **연관된 데이터를 그룹화하여 묶어준다.**

### 🪚 장점
- 연관된 데이터를 저장하기 위한 변수의 선언을 줄여준다.
- 반복문 등을 이용하여 계산 과정을 쉽게 처리할 수 있다.

```java
int[] array = { 1,2,3,4,5,6 };
int arraySize = array.length;
```

### 🪚 배열 회전 프로그램
<img src="https://t1.daumcdn.net/cfile/tistory/99AFA23F5BE8F31B0C" width="70%">

**기본적인 회전 알고리즘**
- `tmp` 에 첫 번째 인덱스의 값을 저장하고, 나머지 값들을 한 칸씩 앞으로 땡겨서 저장한다.
- 이후 `array[n]` 에 `tmp` 값을 저장한다.

**저글링 알고리즘**
- 최대공약수 gcd를 이용해 집합을 나누어 여러 요소를 한꺼번에 이동시킨다.

<img src="https://cdncontribute.geeksforgeeks.org/wp-content/uploads/arra.jpg" width="80%">

- 주어진 배열이 `int[] array = {1,2,3,4,5,6,7,8,9,10,11,12}` 라면, `1,2,3` 을 뒤로 옮길 때, 인덱스를 3개씩 묶고 회전시키는 방법이다.

1. `[]arrary` -> `{4,2,3,7,5,6,10,8,9,1,11,12}`
2. `[]arrary` -> `{4,5,3,7,8,6,10,11,9,1,2,12}`
3. `[]arrary` -> `{4,5,6,7,8,9,10,11,12,1,2,3}`

**역전 알고리즘**
- 회전시키는 수에 대해 구간을 나눠 **reverse**로 구현한다.
  
`d=2` 이면, 구간을 1,2 / 3,4,5,6,7 로 나눈다.
- 첫 번째 구간 `reverse` -> 2,1
- 두 번째 구간 `reverse` - > 7,6,5,4,3
- 합치기 -> 2,1,7,6,5,4,3
- 합친 배열을 `reverse` -> 3,4,5,6,7,1,2

```java
void reverseArr(int[] array, int start, int end) {
  while (start < end) {
    int temp = array[start];
    array[start] = array[end];
    array[end] = temp;

    start++;
    end--;
  }
}

void rotateLeft(int[] array, int d, int n) {
  reverseArr(array, 0, d - 1);
  reverseArr(array, d, n - 1);
  reverseArr(array, 0, n - 1);
}
```

### 🪚 배열의 특정 최대 합 구하기
`array[i]` 가 있을 때, `i * array[i]` 의 합이 가장 클 때 그 값을 출력하기
- 이를 회전을 통해 찾을 수 있다.

```java
// Input
array = { 1, 20, 2, 10 }
// Output
72

2번 회전했을 때 아래와 같이 최댓값이 나온다.
{ 2, 10, 1, 20 }
20 * 3 + 1 * 2 + 10 * 1 + 20 * 0 = 72
```

**접근법**
- `array[i]` 의 전체 합과 `i * array[i]` 의 전체 합을 저장할 변수 선언
- 최종 가장 큰 `sum` 값을 저장할 변수 선언
- 배열을 회전시키면서 `i * array[i]` 의 합 중 최댓값을 저장한다.

**해결법**
- 회전 없이 `i * array[i]` 의 sum을 저장한 값 = `R0`
- 1번 회전하고 `i * array[i]` 의 sum을 저장한 값 = `R1`
- 이 두 개를 빼면 `R1 - R0 = array[0] + array[1] + ... array[n - 2] - (n - 1) * array[n - 1]`
- 이를 계속 반복하다보면, `Rj - R(j-1) = arrSum - n * array[n - j]` 라는 규칙을 얻을 수 있다.

```java
int arrSum = 배열의 총 합
int maxSum = 회전없이 구한 i * array[i]의 sum;
    
for (int j = 1; j < n; j++){
  curSum = curSum + arrSum - n*arr[n-j];
  
  if ( curSum > maxSum )
    maxSum = curSum;
}

return maxSum;
```

### 🪚 특정 배열을 `array[i] = i` 로 재배열
주어진 배열에서 `array[i] = i` 가 가능한 것만 재배열시키기 (`array[i] = i` 가 없으면 -1로 채운다.)

```java
// Input
array = { -1, -1, 6, 1, 9, 3, 2, -1, 4, -1 }
// Output
{ -1, 1, 2, 3, 4, -1, 6, -1, -1, 9 }
```

**접근법**
- `array[i] != -1` && `array[i] != i` 가 우선 조건
- 해당 값을 저장(`x`)해두고, 이 값이 `x` 일때 `array[x]` 를 탐색
- `array[x]` 값을 저장(`y`)해두고, `array[x]` 가 -1이 아니면서 `array[x]` 가 `x` 가 아닌 동안을 탐색
- `array[x]` 를 `x` 값으로 저장해주고, 기존의 `x` 를 `y` 로 수정

```java
int fix(int[] array, int len) {
  for (int i = 0; i < len; i++) {
    if (array[i] != -1 && array[i] != i) {
      int x = array[i];

      while (array[x] != -1 && array[x] != x) {
        int y = array[x];
        array[x] = x;
        x = y;
      }
      array[x] = x;

      if (array[i] != i) array[i] = -1;
    }
  }
}
```

---

## 📕 참고
- [Tech Interview for developer](https://gyoogle.dev/blog/computer-science/data-structure/Array.html)
- [JaeYeopHan/Interview_Question_for_Beginner](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#array-vs-linked-list)
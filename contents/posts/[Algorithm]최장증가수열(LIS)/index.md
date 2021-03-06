---
title: "π‘ μ΅μ₯ μ¦κ° μμ΄(LIS)"
description: "κ°λ° μμ"
date: 2022-05-09
update: 2022-05-09
tags:
  - κ°λ°μμ
  - Java
  - LIS
series: "π‘ Algorithm"
---

## π§· μ΅μ₯ μ¦κ° μμ΄
κ°μ₯ κΈ΄ μ¦κ°νλ λΆλΆ μμ΄(Longest Increasing Sequence)λ‘, μΌλ°μ μΌλ‘λ DPλ₯Ό μ΄μ©ν΄ ν΄κ²°νλ€.

```
{7, 2, 3, 8, 4, 5} -> LIS -> {2, 3, 4, 5}
```

### πͺ DPλ₯Ό νμ©ν κ΅¬ν λ° μκ° λ³΅μ‘λ
```java
int[] arr = {7, 2, 3, 8, 4, 5};
int[] dp = new int[arr.length]; // LIS μ μ₯ λ°°μ΄
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

// DPμ μ μ₯λ κ° μ€ μ΅λκ° + 1μ΄ LISμ κΈΈμ΄
System.out.println(Arrays.toString(answer));
```

> νμ§λ§ μμ κ°μ΄ **DPλ₯Ό νμ©νλ λ°©μμ μκ° λ³΅μ‘λ**λ $O(N^2)$μ΄λ€.

μ΄λ₯Ό μ€μ΄λ μ’μ λ°©λ²μ **μ΄λΆ νμ**μ νμ©νλ κ²μ΄λ€.

### πͺ μ΄λΆ νμμ νμ©ν κ΅¬ν λ° μκ° λ³΅μ‘λ
LISλ₯Ό κ΅¬μ±ν  λ μ΄λΆ νμμ νμ©νλ€. 
- LISμ ννλ₯Ό μ μ§νκΈ° μν΄ μ£Όμ΄μ§ λ°°μ΄μ μΈλ±μ€λ₯Ό νλμ© μ΄ν΄λ³Έλ€.
- ν΄λΉ μ«μκ° λ€μ΄κ° μμΉλ₯Ό μ΄λΆ νμμΌλ‘ νμν΄ μ½μνλ€.

> μΌλ°μ μΌλ‘ μ΄λΆ νμμ μκ° λ³΅μ‘λλ $O(logN)$μ΄λ€. λ°λΌμ μ΄λ₯Ό μ΄μ©ν΄ μκ° λ³΅μ‘λλ₯Ό **$O(NlogN)$** μΌλ‘ μ€μΌ μ μλ€.

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
  // ν­μ leftλ μμμ 
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

## π μ°Έκ³ 
- [Tech Interview for developer](https://gyoogle.dev/blog)
- [μκ³ λ¦¬μ¦ - μ΅μ₯ μ¦κ° λΆλΆ μμ΄(LIS) μκ³ λ¦¬μ¦](https://chanhuiseok.github.io/posts/algo-49/)
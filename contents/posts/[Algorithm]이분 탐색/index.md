---
title: "π‘ μ΄λΆ νμ(Binary Search)"
description: "κ°λ° μμ"
date: 2022-05-05
update: 2022-05-05
tags:
  - κ°λ°μμ
  - Java
  - μ΄λΆνμ
series: "π‘ Algorithm"
---

## π§· μ΄λΆ νμ
νμ λ²μλ₯Ό λ λΆλΆμΌλ‘ λΆν νλ©΄μ μ°Ύλ λ°©μ
- μ²μλΆν° λκΉμ§ νμνλ κ²λ³΄λ€ λ λΉ λ₯Έ μκ° λ³΅μ‘λλ₯Ό κ°μ§λ λ°©μ

```
**μκ° λ³΅μ‘λ**
μ μ²΄ νμ: O(N)
μ΄λΆ νμ: O(logN)
```

### πͺ κ³Όμ 
κ°μ₯ ν΅μ¬μ **μ λ ¬μ΄ λμ΄ μμ΄μΌ νλ€**λ μ μ΄λ€.
- `left` μ `right` λ₯Ό μ¬μ©ν΄ `mid` λ₯Ό μ€μ νλ€.
- `mid` μ κ΅¬νκ³ μ νλ κ°μ λΉκ΅νλ€.
  - κ΅¬νκ³ μ νλ κ°μ΄ λ ν° κ²½μ°, `left = mid + 1`
  - λ μμ κ²½μ°, `right = mid - 1`
- `left > right` κ° λ  λκΉμ§ λ°λ³΅
- νμν  λ°°μ΄μ λ²μλ₯Ό λ²μ΄λλ€λ©΄, κ΅¬νκ³ μ νλ κ°μ΄ λ°°μ΄μ μμμ νλ¨ν  μ μλ€.

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

### πͺ μΆκ° μμ 
μ΄λΆ νμμ μ λ ¬λ λ°μ΄ν°μμ νΉμ  κ°μ μ°Ύκ³ μ ν  λ λΉ λ₯Έ μκ° λ³΅μ‘λλ‘ νμμ΄ κ°λ₯νλ€λ μ₯μ μ΄ μλ€. μ΄λ₯Ό μ΄μ©ν΄ μ μ Nμ΄ μ£Όμ΄μ‘μ λ, Nμ μ κ³±κ·Όμ κ΅¬νλ μ½λλ₯Ό μμ±ν΄λ³Έλ€.
- 1λΆν° μ£Όμ΄μ§ μ μκΉμ§μ λ¨μ λ°λ³΅ λ° νμΈμΌλ‘ κ΅¬ν  μλ μμ§λ§ μ΄λ $O(N)$μ μκ° λ³΅μ‘λλ₯Ό κ°μ§λ€. 

μ΄λ₯Ό μ΄λΆ νμμ μ¬μ©νμ¬ "0λΆν° NκΉμ§μ μμ°μ μ€ Nμ μ κ³±κ·Όμ΄ μλμ§ μλμ§" νμΈνλ μ½λλ‘ λ³κ²½νλ€. μ¦, **0λΆν° NκΉμ§μ μ λ ¬λ μμ°μ μ€μμ νΉμ  κ°μ μ°Ύκ³  μλ κ²**μ΄λ€.

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

## π μ°Έκ³ 
- [Tech Interview for developer](https://gyoogle.dev/blog/algorithm/Bubble%20Sort.html)
- [μ΄μ§ νμ(Binary Search) μκ³ λ¦¬μ¦ κ°λ μ΄ν΄ λ° μΆκ° μμ ](https://cjh5414.github.io/binary-search/)
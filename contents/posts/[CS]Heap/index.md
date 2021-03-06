---
title: "π Heap"
description: "κ°λ° μμ"
date: 2022-05-21
update: 2022-05-21
tags:
  - κ°λ°μμ
  - Java
  - ν
series: "π Computer Science"
---

## π§· ν(Heap)
μ°μ μμ νλ₯Ό μν΄ λ§λ€μ΄μ§ μλ£κ΅¬μ‘°μ΄λ€.
- μ½μκ³Ό μ­μ  λͺ¨λ $O(logN)$μΌλ‘ ν΄κ²°ν  μ μλ€.
- μμ  μ΄μ§ νΈλ¦¬μ μΌμ’μ΄λ€.
  - μ¬λ¬ κ° μ€, μ΅λκ°κ³Ό μ΅μκ°μ λΉ λ₯΄κ² μ°Ύμλ΄λλ‘ λ§λ€μ΄μ§ μλ£κ΅¬μ‘°
- λ° μ λ ¬ μν (λ¬΄μ‘°κ±΄ μ λ ¬λμ΄ μμ νμκ° μλ€.)
- ν νΈλ¦¬λ μ€λ³΅λ κ° νμ© (μ΄μ§ νμ νΈλ¦¬λ μ€λ³΅κ°μ νμ©νμ§ μμ)

> **μ°μ μμ ν?**
> : μ°μ μμμ κ°λμ νμ λμν μλ£κ΅¬μ‘°λ‘, λ°μ΄ν°λ€μ΄ μ°μ μμλ₯Ό κ°μ§κ³  μκ³  μ΄μ λ°λΌ μ°μ μμκ° λμ λ°μ΄ν°κ° λ¨Όμ  λκ°κ² λλ κ΅¬μ‘°μ΄λ€.
> - μ°μ μμ νλ λ°°μ΄, μ°κ²°λ¦¬μ€νΈ, νμΌλ‘ κ΅¬νν  μ μλλ°, κ·Έ μ€ νμ΄ κ°μ₯ ν¨μ¨μ μ΄λ€.

> **μμ  μ΄μ§ νΈλ¦¬?**
> : λΈλλ₯Ό μ½μν  λ, μΌμͺ½λΆν° μ°¨λ‘λλ‘ μ½μνλ νΈλ¦¬μ΄λ€.

### πͺ μ’λ₯
**μ΅λ ν(Max Heap)**
- λΆλͺ¨ λΈλμ ν€ κ°μ΄ μμ λΈλμ ν€ κ°λ³΄λ€ ν¬κ±°λ κ°μ μμ  μ΄μ§ νΈλ¦¬

**μ΅μ ν(Min Heap)**
- λΆλͺ¨ λΈλμ ν€ κ°μ΄ μμ λΈλμ ν€ κ°λ³΄λ€ μκ±°λ κ°μ μμ  μ΄μ§ νΈλ¦¬

### πͺ κ΅¬ν
νμ μ μ₯νλ νμ€μ  μλ£κ΅¬μ‘°λ `λ°°μ΄` μ΄λ€.
- κ΅¬νμ μ½κ² νκΈ° μν΄ λ°°μ΄μ μ²« λ²μ§Έ μΈλ±μ€μΈ 0μ μ¬μ©λμ§ μλλ€.
- νΉμ  μμΉμ λΈλ λ²νΈλ μλ‘μ΄ λΈλκ° μΆκ°λμ΄λ λ³νμ§ μλλ€.

**λΆλͺ¨ λΈλμ μμ λΈλμ κ΄κ³**
```java
μΌμͺ½ μμ index = (λΆλͺ¨ index) * 2
μ€λ₯Έμͺ½ μμ index = (λΆλͺ¨ index) * 2 + 1
λΆλͺ¨ index = (μμ index) / 2
```

**μ½μ**
1. νμ μλ‘μ΄ μμκ° λ€μ΄μ€λ©΄, μΌλ¨ μλ‘μ΄ λΈλλ₯Ό νμ λ§μ§λ§ λΈλμ μ½μ
2. μλ‘μ΄ λΈλλ₯Ό λΆλͺ¨ λΈλλ€κ³Ό κ΅ν

```java
// μ΅λ νμ μ½μ κ΅¬ν

void insertMaxHeap(int x) {
  // ν ν¬κΈ°λ₯Ό μ¦κ°μν€κ³ , λ§μ§λ§ λΈλμ μ½μ
  maxHeap[++heapSize] = x;

  for (int i = heapSize; i > 1; i/=2) {
    // λ§μ§λ§ λΈλκ° μμ μ λΆλͺ¨ λΈλλ³΄λ€ ν¬λ©΄ swap
    if (maxHeap[i/2] < maxHeap[i]) swap(i/2, i);
    else break;
  }
}
```

**μ­μ **
1. μ΅λ νμμ μ΅λκ°μ λ£¨νΈ λΈλμ΄λ―λ‘ λ£¨νΈ λΈλκ° μ­μ λ¨
2. μ­μ λ λ£¨νΈ λΈλμλ νμ λ§μ§λ§ λΈλλ₯Ό κ°μ Έμ΄
3. νμ μ¬κ΅¬μ±(`heapify`)

```java
// μ΅λ ν μ­μ  κ΅¬ν

int deleteMaxHeap() {
  if (heapSize == 0) return 0;

  // λ£¨νΈ λΈλμ κ°μ μ μ₯νκ³ , λ§μ§λ§ λΈλ κ°μ λ£¨νΈλ‘ μ΄λν ν ν ν¬κΈ°λ₯Ό μ€μ¬ λ§μ§λ§ λΈλλ₯Ό 0μΌλ‘ μ΄κΈ°ν
  int item = maxHeap[1];
  maxHeap[1] = maxHeap[heapSize];
  maxHeap[heapSize--] = 0;

  for (int i = 1; i*2 <= heapSize;) {
    // λ§μ§λ§ λΈλκ° μΌμͺ½ λΈλμ μ€λ₯Έμͺ½ λΈλλ³΄λ€ ν¬λ©΄ μ΅λ νμ΄λ―λ‘ μ’λ£
    if (maxHeap[i] > maxHeap[i*2] && maxHeap[i] > maxHeap[i*2+1]) break;
    // μμ λΈλκ° λ ν° κ²½μ°, κ΅νν ν, iλ₯Ό λ³κ²½
    else if (maxHeap[i*2] > maxHeap[i*2+1]) {
      swap(i, i*2);
      i *= 2;
    } else {
      swap(i, i*2+1);
      i = i*2+1;
    }
  }

  return item;
}
```

---

## π μ°Έκ³ 
- [Tech Interview for developer](https://gyoogle.dev/blog/computer-science/data-structure/Heap.html)
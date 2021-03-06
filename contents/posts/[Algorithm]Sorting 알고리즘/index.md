---
title: "π‘ Sorting μκ³ λ¦¬μ¦"
description: "κ°λ° μμ"
date: 2022-04-24
update: 2022-05-05
tags:
  - κ°λ°μμ
  - Java
  - μ λ ¬
series: "π‘ Algorithm"
---

> Sorting μκ³ λ¦¬μ¦μ ν¬κ² **Comparisons** λ°©μκ³Ό **Non-Comparisons** λ°©μμΌλ‘ λλ μ μλ€.

## π§· Comparisons λ°©μ μκ³ λ¦¬μ¦
`Bubble Sort`, `Selection Sort`, `Insertion Sort`, `Quick Sort`, `Merge Sort`, `Heap Sort`

## π§· Non-Comparisons λ°©μ μκ³ λ¦¬μ¦
`Counting Sort`, `Radix Sort`

> **Stable sort**
> : μ€λ³΅λ ν€λ₯Ό μμλλ‘ μ λ ¬νλ μ λ ¬ λ°©μμ΄λ€. μ¦, κ°μ΄ κ°μ μμκ° μμ΄λ μ λ ¬ μ κ·Έ μμλ₯Ό λ³΄μ₯νλ λ°©μμ΄λ€.
> 
> **In-place sort**
> : μμλ€μ κ°μμ λΉν΄ μΆ©λΆν λ¬΄μν λ§ν, κ±°μ μΆκ°μ μΈ λ©λͺ¨λ¦¬ κ³΅κ°μ μ¬μ©νμ§ μλ μ λ ¬ λ°©μμ΄λ€.

---

## π§· κ±°ν μ λ ¬ (Bubble Sort)
μλ‘ μΈμ ν λ μμμ λμλ₯Ό λΉκ΅νκ³ , μ‘°κ±΄μ λ§μ§ μλ€λ©΄ μλ¦¬λ₯Ό κ΅ννλ©° μ λ ¬νλ μκ³ λ¦¬μ¦μ΄λ€.
- κ° νμ λ§λ€, μ²« λ²μ§Έ μμμ λ λ²μ§Έ μμλ₯Ό λΉκ΅νκ³ , λ λ²μ§Έ μμμ μΈ λ²μ§Έ μμλ₯Ό λΉκ΅νκ³  κ΅μ²΄νλ λ°©μμΌλ‘ μ μ²΄ λ°°μ΄μ ν λ² μννλ€.
  - 1νμ μ κ²°κ³Όλ‘ κ°μ₯ ν° κ°μ΄ λ§¨ λ€λ‘ μ΄λνλ€.
- λ€μ νμ λΆν°λ λ§¨ λ μμλ μ μΈνκ³  μ΄λ₯Ό λ°λ³΅νλ€.

```java
void bubbleSort(int[] numbers) {
  int tmp = 0;
  for (int i = 0; i < numbers.length; i++) {
    for (int j = 1; j < numbers.length - i; j++) {
      if (numbers[j - 1] > numbers[j]) {
        tmp = numbers[j - 1];
        numbers[j - 1] = numbers[j];
        numbers[j] = tmp;
      }
    }
  }
}
```

### πͺ μ₯μ 
- κ°λ¨ν κ΅¬νκ³Ό μ§κ΄μ μΈ μ½λ
- In-place sort
- Stable sort

### πͺ λ¨μ 
- μ λ ¬λμ΄ μλ, μλμ΄ μλ, 2κ°μ μμλ₯Ό λΉκ΅νκΈ° λλ¬Έμ μ΅μ , νκ· , μ΅μμ κ²½μ° λͺ¨λ μκ° λ³΅μ‘λκ° $O(N^2)$ μΌλ‘ λμΌνλ€.
- κ΅νμ΄ λ§μ΄ λ°μνλ€.

|Time Complexity|Space Complexity|
|:---:|:---:|
|$O(N^2)$|$O(1)$|

> β
> - `>=` μ°μ°μ μννλ€λ©΄ unstable ν κΉ?
>   - κ·Έλ μ§ μμκΉ?
> - κ°μ μ μν΄μλ μ΄λ»κ² ν΄μΌ νλκ°?
>   - λΉκ΅λ₯Ό μννμ§ μμ νμ μ΄ μλ€λ©΄ λ°λ‘ μ λ ¬μ μ’λ£!
>   - μ λ ¬ λ²μλ₯Ό κ³μ μλ°μ΄νΈνλ λ°©μ
>   - μλ°©ν₯ λ²λΈ μ λ ¬

### πͺ μλ°©ν₯ λ²λΈ μ λ ¬
μ λ ¬ λ²μλ₯Ό κ³μ μλ°μ΄νΈνλ κ°μ  λ°©μμ ν¨μ€μ μ€μΊ λ°©ν₯μ κ΅λλ‘ λ°κΎΈλ λ°©μμ λνλ€. μ΄λ₯Ό ν΅ν΄ μ μ  μ€μΊνλ λ²μκ° μ€μ΄λ€κ² λλ€.

```java
void cocktailSort(int[] numbers) {
  int left = 0;
  int right = numbers.length - 1;
  int last = right;

  while(left < right) {
    int i;
    int tmp = 0;

    // κ°μ₯ μμ μμκ° λ§¨ μμ μμΉ!
    for (i = right; i > left; i--) {
      if (numbers[i - 1] > numbers[i]) {
        tmp = numbers[i - 1];
        numbers[i - 1] = numbers[i];
        numbers[i] = tmp;
        last = i;
      }
    }
    // λ§μ§λ§μΌλ‘ κ΅νμ΄ μΌμ΄λ μμΉ
    left = last;

    // κ°μ₯ ν° μμκ° λ§¨ λ€μ μμΉ
    for (i = left; i < right; i++) {
      if (numbers[i] > numbers[i + 1]) {
        tmp = numbers[i + 1];
        numbers[i + 1] = numbers[i];
        numbers[i] = tmp;
        last = i;
      }
    }
    // λ§μ§λ§μΌλ‘ κ΅νμ΄ μΌμ΄λ μμΉ
    right = last;
  }
}
```

---

## π§· μ ν μ λ ¬ (Selection Sort)
λ²λΈ μ λ ¬κ³Ό μ μ¬ν μκ³ λ¦¬μ¦μΌλ‘, ν΄λΉ νμ μ μμλ₯Ό λ£μ μμΉλ μ΄λ―Έ μ ν΄μ Έ μκ³ , μ΄λ€ μμλ₯Ό λ£μμ§ μ ννλ μκ³ λ¦¬μ¦μ΄λ€.
- κ° νμ λ§λ€, λ°°μ΄μμ μ΅μκ°μ μ°Ύλλ€.
- κ·Έ κ°μ λ§¨ μμ μμΉν μμμ κ΅μ²΄νλ€.
- μ΄ν νμ λΆν°λ λ§¨ μ μμλ₯Ό μ μΈνκ³  λ°λ³΅νλ€.

> Insertion sortμ λ€λ₯Έ μ μ, λ°°μ΄μμ ν΄λΉ μλ¦¬λ₯Ό μ ννκ³ , κ·Έ μλ¦¬μ μ¬ κ°μ λ°°μ΄μμ μ ννμ¬ μμΉμν€λ λ°©μμ΄λ€.

```java
void selectionSort(int[] numbers) {
  int tmp = 0;
  for (int i = 0; i < numbers.length - 1; i++) {
    // μ λ ¬λ  μμλ₯Ό λ£μ μμΉ μ§μ , μΌμͺ½μμλΆν° μ°¨λ‘λλ‘ μν
    int minIndex = i;
    // μ΅μκ°μ κ°μ§λ μΈλ±μ€ νμ
    for (int j = i + 1; j < numbers.length; j++) {
      if (numbers[j] < numbers[minIndex])
        minIndex = j;
    }
    tmp = numbers[minIndex];
    numbers[minIndex] = numbers[i];
    numbers[i] = tmp;
  }
}
```

### πͺ μ₯μ 
- κ°λ¨ν κ΅¬ν
- μ λ ¬μ μν λΉκ΅ νμλ λ§μ§λ§, λ²λΈ μ λ ¬μ λΉν΄ μ€μ λ‘ κ΅ννλ νμλ μ λ€.
- In-place sort

### πͺ λ¨μ 
- λ§€ νμ λ§λ€, μ λ ¬λ μμλ₯Ό μ μΈνκ³  λͺ¨λ  μμμ λν΄ λΉκ΅λ₯Ό μνν΄μΌ νλ€. μ΅μ , νκ· , μ΅μμ κ²½μ° λͺ¨λ μκ° λ³΅μ‘λκ° $O(N^2)$ μΌλ‘ λμΌνλ€.
- Unstable sort

|Time Complexity|Space Complexity|
|:---:|:---:|
|$O(N^2)$|$O(1)$|

> β 
> - stableνκ² νλ λ°©λ²μ?
>   - μ΅μκ°κ³Όμ κ΅νμ΄ μλ, λλ¨Έμ§ μμλ€μ ν μλ¦¬μ© λ€λ‘ λ―Έλ λ°©μμΌλ‘ stableνκ² ν  μ μλ€.

---

## π§· μ½μ μ λ ¬ (Insertion Sort)
μ ν μ λ ¬κ³Ό μ μ¬νμ§λ§, μ’ λ ν¨μ¨μ μΈ λ°©μμ΄λ€. `i` λ²μ§Έλ₯Ό μ λ ¬ν  μμλΌκ³  κ°μ νλ©΄, `0` λΆν° `i - 1` λ²μ§Έ μμλ€μ μ λ ¬λμ΄μλ€λ κ°μ νμ, `i` λ²μ§Έ μμμ `i - 1` λ²μ§Έ μμλΆν° `0` λ²μ§Έ μμκΉμ§ λΉκ΅νλ©΄μ ν° κ²½μ°μλ§ κ΅ννλ€.
- 2λ²μ§Έ μμΉμ κ°μ `tmp` μ μ μ₯νλ€. (1λ²μ§Έ μμλ μ λ ¬λμλ€κ³  κ°μ )
- `tmp` μ μ΄μ μ μλ μμλ€κ³Ό λΉκ΅νλ©° μ½μν΄λκ°λ€. μ΄μ μ μμλ€λ³΄λ€ `tmp` μ μλ κ°μ΄ μμ κ²½μ° κ΅ννλ€.
  - ν νμ μ΄ λλκ³  λλ©΄, `tmp` μ  μλ κ°μ μμΉμν¨λ€.
- λ€μ μμΉμ κ°(2λ²μ§Έ μ΄ν)μ `tmp` μ μ μ₯νκ³  μ΄λ₯Ό λ°λ³΅νλ€.

```java
void insertionSort(int[] numbers) {
  for (int i = 1; i < numbers.length; i++) {
    int tmp = numbers[i];
    int prev = i - 1;
    // μ΄μ  μμΉκΉμ§μ μμλ€ μ€ νμ¬ μ½μν  κ°λ³΄λ€ μμ κ°μ΄ λμ¬ λκΉμ§ μΈλ±μ€λ₯Ό μ?κΉ
    while(prev >= 0 && numbers[prev] > tmp) {
      numbers[prev + 1] = numbers[prev];
      prev--;
    }
    numbers[prev + 1] = tmp;
  }
}
```

### πͺ μ₯μ 
- λ¨μν μκ³ λ¦¬μ¦
- λλΆλΆμ μμκ° μ΄λ―Έ μ λ ¬λ μνλΌλ©΄, λ§€μ° ν¨μ¨μ μΌ μ μλ€.
- In-place sort
- Stable sort
- μ΅μ μ κ²½μ°(λͺ¨λ μ λ ¬λ κ²½μ°, 1λ²μ©λ§ λΉκ΅λ₯Ό μν) $O(N)$μ μκ° λ³΅μ‘λλ₯Ό κ°μ§κΈ°μ, μ ν μ λ ¬μ΄λ λ²λΈ μ λ ¬λ³΄λ€λ μλμ μΌλ‘ λΉ λ₯΄λ€.
- Online μκ³ λ¦¬μ¦

> **Online alg**
> : μμνλ μμ μ λͺ¨λ  μ λ³΄λ₯Ό κ°μ§κ³  μμ§ μκ³ , μλ ₯μ μ°¨λ‘λ‘ λ°μΌλ©΄μ μ²λ¦¬νλ μκ³ λ¦¬μ¦

### πͺ λ¨μ 
- νκ· κ³Ό μ΅μμ μκ°λ³΅μ‘λκ° $O(N^2)$μ΄λ€.
- λ°°μ΄μ κΈΈμ΄κ° κΈΈμ΄μ§μλ‘ λΉν¨μ¨μ μ΄λ€.

> **μ ν μ λ ¬κ³Όμ λΉκ΅**
> - kλ²μ§Έ λ°λ³΅ μ΄ν, μ²« λ²μ§Έ k μμκ° μ λ ¬λ μμλ‘ μ¨λ€λ μ μμ μ μ¬νμ§λ§, μ ν μ λ ¬μ k + 1λ²μ§Έ μμλ₯Ό μ°ΎκΈ° μν΄ λλ¨Έμ§ λͺ¨λ  μμλ₯Ό νμν΄μΌ νλ€.
> - μ½μ μ λ ¬μ΄ λ ν¨μ¨μ μΈ μ΄μ μ΄λ€.

|Time Complexity|Space Complexity|
|:---:|:---:|
|$O(N^2)$|$O(1)$|

---

## π§· ν΅ μ λ ¬ (Quick Sort)
λΆν  μ λ³΅μ ν΅ν΄ μ£Όμ΄μ§ λ°°μ΄μ μ λ ¬νλ λ°©μμ΄λ€.
- λ°°μ΄ κ°μ΄λ°μ νλμ μμλ₯Ό μ ννλ€. (Pivotμ΄λΌ μΉ­νλ€.)
- νΌλ΄ μμλ νΌλ΄λ³΄λ€ κ°μ΄ μμ λͺ¨λ  μμλ€μ΄ μμΉνκ³ , νΌλ΄ λ€μλ νΌλ΄λ³΄λ€ κ°μ΄ ν° λͺ¨λ  μμλ€μ΄ μμΉνλλ‘ νΌλ΄μ κΈ°μ€μΌλ‘ λ°°μ΄μ λλ‘ λΆν νλ€. 
  - λΆν μ λ§μΉ λ€ νΌλ΄μ λ μ΄μ μμ§μ΄μ§ μλλ€.
- λΆν λ λ κ°μ μμ λ°°μ΄μ λν΄ μ¬κ·μ μΌλ‘ μ κ³Όμ μ λ°λ³΅νλ€.

> **λΆν  μ λ³΅(Divide & Conquer)**
> : λ¬Έμ λ₯Ό μμ 2κ°μ κ²ΉμΉμ§ μλ λ¬Έμ λ‘ λΆλ¦¬νμ¬ κ°κ°μ ν΄κ²°ν λ€μ, κ²°κ³Όλ₯Ό λͺ¨μμ μλμ λ¬Έμ λ₯Ό ν΄κ²°νλ μ λ΅

```java
// λΆλΆ λ°°μ΄μ μ λ ¬νλ€. λΆλΆ λ°°μ΄μ ν¬κΈ°κ° μΆ©λΆν μμ§ μμ κ²½μ° μν νΈμΆνμ¬ λΆν  μ λ³΅νλ€.
void quickSort(int[] numbers, int left, int right) {
  if (left >= right) return;

  int pivot = partition(numbers, left, right);

  quickSort(numbers, left, pivot - 1);
  quickSort(numbers, pivot, right);
}

// λ°°μ΄μ νΌλ΄ κΈ°μ€μΌλ‘ λΉκ· λ±νκ² 2κ°μ λΆλΆ λ°°μ΄λ‘ λΆν νλ€.
int partition(int[] numbers, int left, int right) {
  int pivot = numbers[left];
  int i = left, j = right;
  int tmp = 0;

  while(i < j) {
    while(pivot < numbers[j]) j--;
    while(i < j && pivot >= numbers[i]) i++;
    tmp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = tmp;
  }
  numbers[left] = numbers[i];
  numbers[i] = pivot;

  return i;
}
```

### πͺ κ°μ 
`partition()` ν¨μμμ νΌλ΄ κ°μ΄ μ΅μλ μ΅λκ°μΌλ‘ μ§μ λμ΄ λΆλΆ λ°°μ΄λ‘ λλ μ§μ§ μμμ λ, $O(N^2)$ μ μκ° λ³΅μ‘λλ₯Ό κ°μ§λ€.
- μ¦, μ΄λ―Έ λ°°μ΄μ΄ μ λ ¬λ κ²½μ° μ΅μμ μκ° λ³΅μ‘λλ₯Ό κ°μ§λ€.
- λ°°μ΄μμ κ°μ₯ μμ μλ κ°κ³Ό μ€κ°κ°μ κ΅νν΄μ€λ€λ©΄, μκ° λ³΅μ‘λλ₯Ό $O(NlogN)$ μΌλ‘ κ°μ ν  μ μλ€.(μ΅μμ μκ° λ³΅μ‘λκ° λλ κ²μ μλ!)

### πͺ μ₯μ 
- μ΅μ μ κ²½μ°(λ§€ νΌλ΄μ΄ μ ννκ² λ λΆλΆ λ°°μ΄λ‘ λΆν νλ κ²½μ°), μκ° λ³΅μ‘λκ° $O(NlogN)$ μ΄λ€. (κ° μν νΈμΆ λ¨κ³μ λΉκ΅ μ°μ°μ `N` λ², μ΄ λΉκ΅ νμλ `logN` λ²)
- λΆνμν λ°μ΄ν°μ μ΄λμ μ€μ΄κ³ , λ¨Ό κ±°λ¦¬μ λ°μ΄ν°λ₯Ό κ΅νν  λΏλ§ μλλΌ, ν λ² κ²°μ λ νΌλ΄λ€μ΄ μΆν μ°μ°μμ μ μΈλλ νΉμ±μΌλ‘, μκ° λ³΅μ‘λκ° $O(NlogN)$ μΈ μκ³ λ¦¬μ¦ μ€ κ°μ₯ λΉ λ₯Έ μ λ ¬ μκ³ λ¦¬μ¦μ΄λ€.
- In-place sort

### πͺ λ¨μ 
- μ΅μμ κ²½μ°(μ΄λ―Έ λ°°μ΄μ΄ μ λ ¬λ κ²½μ°), μκ° λ³΅μ‘λκ° $O(N^2)$ μ΄λ€.
- Unstable sort

|Time Complexity|Space Complexity|
|:---:|:---:|
|$O(NlogN)$|$O(1)$|

> Javaμ `Arrays.sort()` λ λ΄λΆμ μΌλ‘ Dual Pivot Quick Sortλ₯Ό μ¬μ©νλ€.
> - μ½μ μ λ ¬κ³Ό ν΅ μ λ ¬μ ν©μΉ κ°λμ΄λ€.
> - λ§ κ·Έλλ‘ νΌλ΄μ 2κ° μ¬μ©νκ³ , μ΄ 3κ°μ κ΅¬μ­μΌλ‘ λΆν νμ¬ μ λ ¬νλ€.

---

## π§· λ³ν© μ λ ¬ (Merge Sort)
ν©λ³ μ λ ¬μ΄λΌκ³ λ νλ©°, μ΄ λν λΆν  μ λ³΅ μκ³ λ¦¬μ¦μ μ¬μ©νλ€.
- μμ­μ μͺΌκ°€ μ μμ λ§νΌ μͺΌκ°  ν, ν©λ³μν€λ©΄μ μ λ ¬ν΄λκ°λ€.

```java
void mergeSort(int[] numbers, int left, int right) {
  if (left < right) {
    int mid = (left + right) / 2;

    // mergeSort()λ₯Ό μ¬κ·μ μΌλ‘ κ³μ νΈμΆν¨μΌλ‘μ¨, μͺΌκ°μ§ λκΉμ§ κ³μ μͺΌκ°¬
    mergeSort(numbers, left, mid);
    mergeSort(numbers, mid + 1, right);
    merge(numbers, left, mid, right);
  }
}

// μ λ ¬λ λ λΆλΆ λ°°μ΄μ μμ°¨μ μΌλ‘ λΉκ΅νλ©΄μ λ³ν©
void merge(int[] numbers, int left, int mid, int right) {
  int[] L = Arrays.copyOfRange(numbers, left, mid + 1);
  int[] R = Arrays.copyOfRange(numbers, mid + 1, right + 1);

  int i = 0, j = 0, k = left;
  int lenL = L.length, lenR = R.length;

  while(i < lenL && j < lenR) {
    if (L[i] <= R[j]) numbers[k] = L[i++];
    else numbers[k] = R[j++];
    k++;
  }

  while(i < lenL) numbers[k++] = L[i++];
  while(j < lenR) numbers[k++] = R[j++];
}
```

> μμ°¨μ μΈ λΉκ΅λ₯Ό ν΅ν΄ μ λ ¬μ μννκΈ° λλ¬Έμ `LinkedList` μ μ λ ¬μ΄ νμν  λ ν¨μ¨μ μ΄λ€.
> - ν΅ μ λ ¬μ μμ μ κ·Όμ΄κΈ° λλ¬Έμ `LinkedList` μ λν΄μλ μ±λ₯μ΄ μ’μ§ μλ€.

> **ν΅ μ λ ¬κ³Ό λ³ν© μ λ ¬μ μ°¨μ΄μ **
> - ν΅ μ λ ¬: μ°μ  νΌλ΄μ ν΅ν΄ μ λ ¬ν ν μμ­μ μͺΌκ°¬
> - λ³ν© μ λ ¬: μμ­μ μͺΌκ°€ μ μμ λ§νΌ μͺΌκ°  ν μ λ ¬

### πͺ μ₯μ 
- μ΅μ , μ΅μ, νκ· μ κ²½μ° λͺ¨λ μκ° λ³΅μ‘λκ° $O(NlogN)$ μ΄λ€.
- Stable sort

### πͺ λ¨μ 
- μΆκ°μ μΈ λ©λͺ¨λ¦¬ κ³΅κ°μ΄ λ νμνλ€.
  - In-place sortμ΄ μλλ€.
  - `LinkedList` λ₯Ό μ¬μ©νλ©΄ In-place νκ² ν  μ μλ€.

|Time Complexity|Space Complexity|
|:---:|:---:|
|$O(NlogN)$|$O(N)$|

---

## π§· ν μ λ ¬ (Heap Sort)
μμ  μ΄μ§ νΈλ¦¬λ₯Ό κΈ°λ°μΌλ‘ νλ νμ(`Binary Heap`) κΈ°λ°μΌλ‘ νλ μ λ ¬ λ°©μ
- `Binary Heap` μ νμ©ν μ λ ¬ λ°©μμ 2κ°μ§κ° μλ€.
  - μ λ ¬ λμμΈ λ°μ΄ν°λ€μ νμ λ£μλ€κ°, κΊΌλ΄λ μλ¦¬λ‘ μ λ ¬ (inplace sort X)
  - κΈ°μ‘΄ λ°°μ΄μ `heapify`(`heap` μΌλ‘ λ§λλ κ³Όμ )μ κ±°μ³ κΊΌλ΄λ μλ¦¬λ‘ μ λ ¬ (inplace sort O)
- **μ΅λ ν**μ κ΅¬μ±νλ€.
- μ¦, νμ¬ νμ λ£¨νΈμλ μ΅λκ°μ΄ μ‘΄μ¬νκ² λλ€. λ£¨νΈμ κ°μ λ§μ§λ§ λΈλμ λ°κΎΌ ν, ν μ¬μ΄μ¦λ₯Ό 1 μ€μΈλ€.
- νμ μ¬μ΄μ¦κ° 1λ³΄λ€ ν° κ²½μ°μ λν΄ μ κ³Όμ μ λ°λ³΅νλ€.
- λ§€ κ³Όμ λ§λ€ μ΅λκ°μ λ§¨ λ€μ μμΉμν€λ©΄μ μ λ ¬νλ€.

> **μμ  μ΄μ§ νΈλ¦¬?**
> : μ½μν  λ μΌμͺ½λΆν° μ°¨λ‘λλ‘ μΆκ°νλ μ΄μ§ νΈλ¦¬λ‘, λ§μ§λ§ λ λ²¨μ μ μΈν λͺ¨λ  λ λ²¨μ μ±μμ Έ μμ΄μΌ νλ€.

> **μ΅λ ν, μ΅μ ν**
> - μ΅λ ν : κ° λΈλμ κ°μ΄ ν΄λΉ `children` μ κ°λ³΄λ€ ν¬κ±°λ κ°μ μμ  μ΄μ§ νΈλ¦¬
> - μ΅μ ν : κ° λΈλμ κ°μ΄ ν΄λΉ `children` μ κ°λ³΄λ€ μκ±°λ κ°μ μμ  μ΄μ§ νΈλ¦¬

```java
void heapSort(int[] array) {
  int n = array.length;
  
  // μ΅λ ν κ΅¬μ±
  for (int i = n / 2 - 1; i >= 0; i--)
    heapify(array, n, i);
  
  // μ΅λ κ° μΆμΆ ν, λ€μ μ΅λ ν κ΅¬μ± λ°λ³΅
  for (int i = n - 1; i > 0; i--) {
    swap(array, 0, i);
    heapify(array, i, 0);
  }
}

void heapify(int[] array, int n, int i) {
  int p = i;
  // λΆλͺ¨ λΈλ κΈ°μ€μΌλ‘, μΌμͺ½ μμ λΈλμ μ€λ₯Έμͺ½ μμ λΈλ idx μ§μ 
  int l = i * 2 + 1;
  int r = i * 2 + 2;
  
  // μΌμͺ½ μμλΈλ
  if (l < n && array[p] < array[l])
    p = l;

  // μ€λ₯Έμͺ½ μμλΈλ
  if (r < n && array[p] < array[r])
    p = r;
  
  // λΆλͺ¨λΈλ < μμλΈλ
  if(i != p) {
    swap(array, p, i);
    heapify(array, n, p);
  }
}
```

### πͺ μ₯μ 
- μ΅μ , μ΅μ, νκ· μ κ²½μ° λͺ¨λ μκ° λ³΅μ‘λκ° $O(NlogN)$μ΄λ€.
  - `heap` μ λ°μ΄ν°λ₯Ό μ μ₯νλ μκ° λ³΅μ‘λ: $O(logN)$
  - `heap` μμ λ°μ΄ν°λ₯Ό μ­μ νλ μκ° λ³΅μ‘λ: $O(logN)$
- κ°μ₯ ν¬κ±°λ κ°μ₯ μμ κ°μ κ΅¬ν  λ, μ΅λ k λ§νΌ λ¨μ΄μ§ μμλ€μ μ λ ¬ν  λ νμ©νλ€λ©΄ ν¨μ¨μ μ΄λ€.
  - μ΅μ ν or μ΅λ νμ λ£¨νΈ κ°μ΄κΈ° λλ¬Έμ **ν λ²μ ν κ΅¬μ±**μ ν΅ν΄ κ΅¬νλ κ²μ΄ κ°λ₯νκ³ , μ½μ μ λ ¬λ³΄λ€ λμ± κ°μ λ κ²°κ³Όλ₯Ό μ»μ΄λΌ μ μκΈ° λλ¬Έμ΄λ€.

### πͺ λ¨μ 
- Unstable sort
- λ°μ΄ν°μ μνμ λ°λΌ κ°μ μκ° λ³΅μ‘λλ₯Ό κ°μ§λ λ€λ₯Έ μ λ ¬ μκ³ λ¦¬μ¦μ λΉν΄ λλ¦¬λ€.

|Time Complexity|Space Complexity|
|:---:|:---:|
|$O(NlogN)$|$O(N)$|

---

> μλ 2κ°μ§μ μ λ ¬ μκ³ λ¦¬μ¦μ λΉκ΅λ₯Ό μννμ§ μλ **`non-Comparisons Sorting Algorithm`** μ΄λ€.

## π§· κΈ°μ μ λ ¬ (Radix Sort)
λ°μ΄ν°λ₯Ό κ΅¬μ±νλ κΈ°λ³Έ μμ(κΈ°μ: Radix)λ₯Ό μ΄μ©νλ μ λ ¬ λ°©μ
- λ?μ μλ¦ΏμλΆν° λΉκ΅νμ¬ νλμ λ²ν·μ μμ±ν΄ λΆλ₯νκ³ , κ·Έ λ€μ μλ¦Ώμλ₯Ό κΈ°μ€μΌλ‘ μ΄λ₯Ό λ°λ³΅νλ€.
- **LSD(Least Significant Digit) λ°©μ**κ³Ό **MSD(Most Significant Digit) λ°©μ**μ΄ μλ€.
  - LSD λ°©μμ λ μ€μν μ«μλΆν° μ λ ¬νλ λ°©μμΌλ‘, μΌμ μλ¦¬λΆν° μ λ ¬νλ€.
  - MSD λ°©μμ μ€μν μ«μλΆν° μ λ ¬νλ λ°©μμΌλ‘, κ°μ₯ ν° μλ¦ΏμλΆν° μ λ ¬νλ€.

> β **λ?μ μλ¦ΏμλΆν° μ λ ¬νλ μ΄μ  (MSDμ LSDμ λΉκ΅)**
> - LSDλ μ€κ°μ μ λ ¬ κ²°κ³Όλ₯Ό λ³Ό μ μλ€. μΌμ μλ¦¬λΆν° λ°±μ μλ¦¬κΉμ§ μ λ ¬μ λ§μΉ ν κ²°κ³Όλ₯Ό μ μ μλ€.
> - MSDλ μ€κ°μ μ λ ¬ κ²°κ³Όλ₯Ό νμΈν  μ μλ€. λ°λΌμ μ λ ¬νλλ° κ±Έλ¦¬λ μκ°μ λ¨μΆμν¬ μ μλ€.
>   - νμ§λ§ μ΄λ, μ λ ¬μ΄ μλ£λμλμ§ νμΈνλ κ³Όμ μ΄ νμνκ³ , μ΄λ λ©λͺ¨λ¦¬λ₯Ό λ μ¬μ©νκ² λλ€.
> 
> κ²°λ‘ μ μΌλ‘, **LSDκ° MSDλ³΄λ€ λ μΌκ΄λ μκ³ λ¦¬μ¦**μ΄λ―λ‘, λκ° **κΈ°μ μ λ ¬μ λΌν  λλ LSDλ₯Ό λΌνλ€.**

> μλ ₯ λ°μ΄ν°μ μ΅λκ°μ λ°λΌ μ λ ¬νλ `Counting Sort` μ λΉν¨μ¨μ±μ κ°μ νκΈ° μν΄ μ¬μ© κ°λ₯νλ€.
> - μλ¦Ώμμ κ° λ³λ‘ μ λ ¬μ νκΈ°μ λμ¬ μ μλ κ°μ μ΅λ μ¬μ΄μ¦λ 0 ~ 9(10)μ΄λ€.

<img src="https://blog.kakaocdn.net/dn/DWH0S/btqFOYnIbCu/Q7HOAOzzvlD4xW279LqTLK/img.gif" width="80%">

```java
void radixSort(int[] arr, int n) {
  // μ΅λκ° μ°ΎκΈ°
  int m = Arrays.stream(arr).max().getAsInt();
  
  // μ΅λκ°μ λλ΄μ λ, 0μ΄ λμ€λ©΄ λͺ¨λ  μ«μκ° expμ μλ
  for (int exp = 1; m / exp > 0; exp *= 10)
    countSort(arr, n, exp);
}

void countSort(int[] arr, int n, int exp) {
  int[] buffer = new int[n];
  int[] count = new int[10];
  int i = 0;
  
  // expμ μλ¦Ώμμ ν΄λΉνλ count μ¦κ°
  for (i = 0; i < n; i++) {
    count[(arr[i] / exp) % 10]++;
  }

  // λμ ν© κ΅¬νκΈ°
  for (i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // μΌλ°μ μΈ Counting sort κ³Όμ 
  for (i = n - 1; i >= 0; i--) {
    int idx = (arr[i] / exp) % 10;
    buffer[count[idx] - 1] = arr[i];
    count[idx]--;
  }

  for (i = 0; i < n; i++) {
    arr[i] = buffer[i];
  }
}
```

### πͺ μ₯μ 
- λ¬Έμμ΄κ³Ό μ μμ μ λ ¬μ΄ κ°λ₯νλ€.
- Stable sort

### πͺ λ¨μ 
- μλ¦Ώμκ° μλ λ°μ΄ν°μ λν μ λ ¬μ λΆκ°λ₯νλ€. (ex. λΆλ μμ«μ )
- μ€κ° κ²°κ³Όλ₯Ό μ μ₯ν  μΆκ°μ μΈ λ©λͺ¨λ¦¬ κ³΅κ°μ΄ νμνλ€.

|Time Complexity|Space Complexity|
|:---:|:---:|
|$O(N)$|$O(N)$|

---

## π§· κ³μ μ λ ¬ (Counting Sort)
λ§ κ·Έλλ‘, λͺ κ°μΈμ§ κ°μλ₯Ό μΈμ΄ μ λ ¬νλ λ°©μμ΄λ€.
- μ£Όμ΄μ§ λ°μ΄ν° μ€ κ°μ₯ ν° κ°μ sizeλ‘ νλ λ°°μ΄μ μμ±νλ€.
- λ°°μ΄μ νμνλ©°, λ°μ΄ν°μ λ±μ₯ νμλ₯Ό ν΄λΉ indexμ μ μ₯νλ€.
- μ΄ν μμ±λ λ±μ₯ νμ λ°°μ΄μ λμ ν©μΌλ‘ λ³κ²½νλ€.
- μ£Όμ΄μ§ λ°μ΄ν° λ°°μ΄μ λ€μμλΆν° νμνλ©°, `λ±μ₯ νμ λ°°μ΄[μ£Όμ΄μ§ λ°μ΄ν° λ°°μ΄μ κ°]` μ ν΄λΉ μ«μλ₯Ό μμΉμν¨λ€.
  - κ·Έλ¦¬κ³  λμ ν© λ°°μ΄μ κ°μ 1μ© κ°μμν¨λ€.

<img src="https://t1.daumcdn.net/cfile/tistory/22538A4D56D2FFBA2E" width="80%">

<img src="https://t1.daumcdn.net/cfile/tistory/23057D4956D2FFE314" width="80%">

```java
void countingSort(int[] numbers) {
  int[] sortedArr = new int[numbers.length];
  int[] counting = new int[Arrays.stream(numbers).max().getAsInt() + 1];

  // λ±μ₯ νμ κ³μ°
  for (int num : numbers)
    counting[num]++;

  // λμ ν© κ³μ°
  for (int i = 1; i < counting.length; i++)
    counting[i] += counting[i - 1];

  // λμ ν© λ°°μ΄κ³Ό μ£Όμ΄μ§ λ°μ΄ν°λ₯Ό μ΄μ©ν΄ μ λ ¬ μν
  for (int i = numbers.length - 1; i >= 0; i--) {
    sortedArr[counting[numbers[i]] - 1] = numbers[i];
    counting[numbers[i]]--;
  }

  System.out.println(Arrays.toString(sortedArr));
}
```

### πͺ μ₯μ 
- μ΅μ μ κ²½μ° $O(N)$μ μκ° λ³΅μ‘λλ₯Ό κ°μ Έ, κ°μ₯ λΉ λ₯Έ μ λ ¬ μκ³ λ¦¬μ¦μ΄λ€.
- Stable sort
- μ λ ¬ν  λ°μ΄ν°κ° νΉμ ν λ²μ μμ μλ κ²½μ° μμ£Ό μ¬μ©νλ€.
  - λνμ μΌλ‘λ 26κ°μ μνλ²³μΌλ‘ μ΄λ£¨μ΄μ§ λ¬Έμμ΄μμ `Suffix Array` λ₯Ό μ»λ κ²½μ°μ΄λ€.

### πͺ λ¨μ 
- λ°μ΄ν°μ μ΅λκ°μ ν΄λΉνλ λ§νΌμ μΆκ°μ μΈ λ©λͺ¨λ¦¬ κ³΅κ°μ΄ νμνκΈ°μ(λμ ν© λ°°μ΄μ μ κ·Όνλ μκ°μ $O(1)$λ‘ νκΈ° μν΄) λλΆλΆμ κ²½μ° μμ²­λ **λ©λͺ¨λ¦¬ λ­λΉ**λ₯Ό μΌκΈ°ν  μ μλ€.
  - λ§μ½ μ£Όμ΄μ§ λ°μ΄ν°μ κ° λ²μκ° λλ¬΄ ν° κ²½μ°, μ¬μ©νμ§ μλ λ©λͺ¨λ¦¬ κ³΅κ°μ λ­λΉλ λ°μνκ² λλ€.

|Time Complexity|Space Complexity|
|:---:|:---:|
|$O(N)$|$O(N)$|

---

## π μ°Έκ³ 
- [Tech Interview for developer](https://gyoogle.dev/blog/algorithm/Bubble%20Sort.html)
- [JaeYeopHan/Interview_Question_for_Beginner](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/Algorithm)
- [[μκ³ λ¦¬μ¦ κ°λ] Stable Sort &Inplace](https://velog.io/@cookncoding/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B0%9C%EB%85%90-Stable-Sort-Inplace)
- [μλ°©ν₯ λ²λΈ μ λ ¬](https://hevton.tistory.com/192)
- [[Dual-Pivot Quick Sort] λ κ°μ νΌλ΄μΌλ‘ ν΅ μ λ ¬](https://cs-vegemeal.tistory.com/53)
- [Counting Sort : κ³μ μ λ ¬](https://bowbowbow.tistory.com/8)
- [κΈ°μ μ λ ¬-Radix Sort](https://herong.tistory.com/entry/%EA%B8%B0%EC%88%98%EC%A0%95%EB%A0%ACRidix-Sort?category=818669)
---
title: "π‘ λΉνΈλ§μ€ν¬(BitMask)"
description: "κ°λ° μμ"
date: 2022-05-16
update: 2022-05-16
tags:
  - κ°λ°μμ
  - Java
  - λΉνΈλ§μ€ν¬
series: "π‘ Algorithm"
---

## π§· λΉνΈλ§μ€ν¬
νλμ λͺ¨λ  CPUλ μ΄μ§μλ₯Ό μ΄μ©ν΄ λͺ¨λ  μλ£λ₯Ό νννκ³ , μ΄λ μ΄μ§λ² κ΄λ ¨ μ°μ°μ μμ£Ό λΉ¨λ¦¬ μ²λ¦¬ν  μ μλ€λ μ₯μ μ΄ μλ€. μ΄μ κ°μ νΉμ±μ μ΄μ©ν΄ μ μμ μ΄μ§μ ννμ μλ£ κ΅¬μ‘°λ‘ μ°λ κΈ°λ²μ λ§νλ€.

> μ§ν©μ μμλ€μ κ΅¬μ± μ¬λΆλ₯Ό ννν  λ μ μ©ν μκ³ λ¦¬μ¦μ΄λ€.

### πͺ μ₯μ 
**λ λΉ λ₯Έ μν μκ°**
- λΉνΈ λ§μ€ν¬ μ°μ°μ $O(1)$ μ κ΅¬νλλ κ²μ΄ λ§μ λ€λ₯Έ μλ£ κ΅¬μ‘°λ³΄λ€ ν¨μ¬ λΉ¨λ¦¬ λμνλ€.
- λ¬Όλ‘  λΉνΈλ§μ€ν¬λ₯Ό μ¬μ©ν  μ μλ€λ λ§μ μμμ μκ° λ§μ§ μλ€λ μλ―Έμ΄λ―λ‘, μμ²­λκ² ν° μλ ν₯μμ μλλ€.

**κ°κ²°ν μ½λ**
- λ€μν μ§ν© μ°μ°λ€μ λ°λ³΅λ¬Έ μμ΄ ν μ€μ μΈ μ μμ΄ μ§§μ μ½λλ₯Ό μμ±ν  μ μλ€.

**λ μμ λ©λͺ¨λ¦¬ μ¬μ©λ**
- κ°μ λ°μ΄ν°λ₯Ό λ μ μ λ©λͺ¨λ¦¬λ₯Ό μ¬μ©ν΄ ννν  μ μλ€.
- μ΄λ‘ μΈν΄ λ λ§μ λ°μ΄ν°λ₯Ό λ―Έλ¦¬ κ³μ°ν΄μ μ μ₯ν΄ λ μ μκ² λλ€.

**μ°κ΄ λ°°μ΄μ λ°°μ΄λ‘ λμ²΄**
- μ§ν©μ λ°°μ΄μ μΈλ±μ€λ‘ ννν  μ μλ€.

**DPλ μμ΄ λ± λ°°μ΄ νμ©λ§μΌλ‘ ν΄κ²°ν  μ μλ λ¬Έμ  ν΄κ²°**

### πͺ λΉνΈλ§μ€νΉ νμ©
> 0κ³Ό 1λ‘ flag νμ©νκΈ°

`[1,2,3,4,5]` λΌλ μ§ν©μ΄ μλ€κ³  κ°μ νλ€. μ¬κΈ°μ μμλ‘ λͺ κ°λ₯Ό κ³¨λΌ λ½μ νμΈν΄μΌ νλ μν©μ΄ μ£Όμ΄μ‘λ€. (λΆλΆ μ§ν©μ μλ―Έ)

```java
{1}, {2}, ... , {1,2}, {1,2,5}, {1,2,3,4,5}
```

λΉνΈλ§μ€νΉμ ν΅ν΄, κ° μμλ₯Ό μΈλ±μ€μ²λΌ νννμ¬ ν¨μ¨μ μΈ μ κ·Όμ ν  μ μλ€.

```java
[1,2,3,4,5] -> 11111
[2,3,4,5]   -> 11110
[1,2,5]     -> 10011
[3]         -> 00100
```
μ΄λ¬ν 2μ§μλ₯Ό 10μ§μλ‘ λ³ννμ¬ λΆλΆμ§ν©μ μ μλ₯Ό ν΅ν΄ λνλ΄λ κ²λ κ°λ₯νλ€.

> `11111` -> 10μ§μ λ³ν -> `31`

μ΄λ‘μ¨, ν΄λΉ λΆλΆμ§ν©μ `i` λ₯Ό μΆκ°νκ³  μΆλ€λ©΄ `i` λ²μ§Έ λΉνΈλ₯Ό 1λ‘ λ°κΏμ£Όμ΄ ννν  μ μλ€. κ·Έλ¦¬κ³  μ΄λ **λΉνΈ μ°μ°**μ μ¬μ©νλ€.

### πͺ λΉνΈ μ°μ°
- `AND(&)` : λμνλ λ λΉνΈκ° λͺ¨λ 1μΌλλ§ 1μ λ°ν
- `OR(|)` : λμνλ λ λΉνΈ μ€ νλλΌλ 1μΌλ 1μ λ°ν
- `XOR(^)` : λμνλ λ λΉνΈκ° μλ‘ λ€λ₯Ό λλ§ 1μ λ°ν
- `NOT(~)` : λΉνΈ κ°μ λ°μ νμ¬ λ°ν
- `SHIFT(>>, <<)` : μΌμͺ½ νΉμ μ€λ₯Έμͺ½μΌλ‘ λΉνΈλ₯Ό μ?κ²¨ λ°ν
  - μΌμͺ½ SHIFT (`A << B`) : `A * 2^B`
  - μ€λ₯Έμͺ½ SHIFT (`A >> B`) : `A / 2^B`

```java
[μΌμͺ½]   0001 β 0010 β 0100 β 1000 : 1 β 2 β 4 β 8
[μ€λ₯Έμͺ½] 1000 β 0100 β 0010 β 0001 : 8 β 4 β 2 β 1
```

### πͺ μμ λ₯Ό ν΅ν κ΅¬ν
νΌμμ§μ΄ μλ€. μ¬κΈ°μλ 0λΆν° 19κΉμ§μ λ²νΈλ₯Ό κ°λ μ€λ¬΄ κ°μ§μ ν νμ΄ μκ³ , μ£Όλ¬Έ μ ν νμ λ£κ±°λ λΊ μ μλ€.
- κ·Έλ λ€λ©΄ ν νΌμμ μ λ³΄λ μ€λ¬΄ μ’λ₯μ μμλ§μ κ°μ§λ μ§ν©μΌλ‘ ννν  μ μλ€.
- μ΄λ₯Ό `boolean[]` μΌλ‘ ννν  μλ μμ§λ§, λΉνΈλ§μ€νΉμ μ¬μ©νλ€.

**κ³΅μ§ν©κ³Ό κ½ μ°¬ μ§ν©**
- ν νμ μ¬λ¦¬μ§ μμ νΌμμ λͺ¨λ  ν νμ μ¬λ¦° νΌμλ₯Ό νννλ €λ©΄ μλμ κ°μ΄ ν  μ μλ€.

```java
// ν νμ΄ μλ νΌμ
int emptyPizza = 0;
// μ€λ¬΄ κ°μ ν νμ λͺ¨λ μ¬λ¦° νΌμ
int fullPizza = (1 << 20) - 1;
```
- `1 << 20` μ 1λ€μ 20κ°μ 0μ΄ μλ μ μμ΄λ―λ‘, μ¬κΈ°μ 1μ λΉΌλ©΄ 20κ°μ λΉνΈκ° λͺ¨λ μΌμ§ μ μλ₯Ό μ»μ μ μλ€.

**μμ μΆκ°**
- μ§ν©μ κ°μ₯ κΈ°λ³Έμ μΈ μ°μ°μ μμλ₯Ό μΆκ°νκ³  μ­μ νλ κ²μ΄λ€.
- λΉνΈλ§μ€ν¬λ₯Ό μ¬μ©ν μ§ν©μμ μμλ₯Ό μΆκ°νλ€λ κ²μ ν΄λΉ λΉνΈλ₯Ό ν¨λ€λ μλ―Έμ΄λ€.

```java
// ν ν λͺ©λ‘μ pλ² ν νμ μΆκ°νκ³  μΆμ κ²½μ°
toppings |= (1 << p);
```
- `1 << p` λ pλ²μ§Έ λΉνΈλ§ μΌμ§ μ μμ΄λ€.
- μ΄λ―Έ `toppings` μ pλ² ν νμ΄ μΆκ°λ κ²½μ° κ°μ λ³νμ§ μλλ€.

**μμ μ­μ **
```java
// ν ν λͺ©λ‘μμ pλ² ν νμ μ­μ νκ³  μΆμ κ²½μ° (ν ν λͺ©λ‘μ pλ² ν νμ΄ μμ΄μΌ ν¨)
toppings -= (1 << p);

// ν νμ΄ μμ λλ μ μμ μΌλ‘ λμνλ μ­μ 
toppings &= ~(1 << p);
```

**μμ ν¬ν¨ μ¬λΆ νμΈ**
- ν ν λͺ©λ‘μ μνλ ν νμ΄ μ μΆκ°λμλμ§ νμΈνλ€.

```java
if ((toppings & (1 << p)) == (1 << p))
  System.out.println("Topping is in!");
```
- `&` μ°μ°μ κ²°κ³Όκ°μ 0 λλ `1 << p` μ΄λ€.

**μμμ ν κΈ**
- ν΄λΉ λΉνΈκ° μΌμ Έ μμΌλ©΄ λκ³ , κΊΌμ Έ μλ€λ©΄ ν¨λ€.
- `XOR` μ°μ°μ μ¬μ©νλ€.

```java
toppings ^= (1 << p);
```

**μ§ν©μ ν¬κΈ° κ΅¬νκΈ°**
- κ°μ₯ κ°λ¨ν λ°©λ²μ κ° λΉνΈλ₯Ό μννλ©΄μ μΌμ Έ μλ λΉνΈμ μλ₯Ό μ§μ  μΈλ λ°©λ²μ΄λ€.
- νμ§λ§ JAVAμμλ μ΄μ κ΄λ ¨λ λ΄μ₯ λͺλ Ήμ΄λ₯Ό μ κ³΅νλ€.

```java
System.out.println(Integer.bitCount(toppings));
```

**μ΅μ μμ μ§μ°κΈ°**
- μ΅μ μμκ° λ¬΄μμΈμ§ μκ΄μμ΄ μ§μ°λ μ°μ°μ΄ νμν  λ μ μ©νλ€.

```java
toppings &= (toppings - 1);
```

`toppings - 1` μ μ΄μ§μ ννμ μκ°ν΄λ³΄λ©΄, μ΄λ `toppings` μμ μΌμ Έ μλ μ΅νμ λΉνΈλ₯Ό λκ³ , κ·Έ λ°μ λΉνΈλ€μ μ λΆ ν¨ μ»·μ΄λ€.
- λ°λΌμ λ κ°μ AND μ°μ°νλ©΄ μ΅νμ λΉνΈμ κ·Έ μ΄νμ λΉνΈλ€μ μ λΆ 0μ΄ λλ€.
- 40(10 1000)κ³Ό 39(10 0111)μ AND μ°μ°νλ©΄ 32(10 0000)λ‘ μ΅νμ λΉνΈκ° κΊΌμ§ κ²μ νμΈν  μ μλ€.

**λͺ¨λ  λΆλΆ μ§ν© μν**
- μ£Όμ΄μ§ μ§ν©μ λͺ¨λ  λΆλΆ μ§ν©μ μνν  κ²½μ°λ μ μ©νλ€.

```java
for (int subset = pizza; subset; subset = ((subset - 1) & pizza)) {
  // subsetμ pizzaμ λΆλΆ μ§ν©
}
```
- `(subset - 1) & pizza` μμ, `subset - 1` λ‘ μΌμ Έ μλ μ΅νμ λΉνΈκ° κΊΌμ§κ³ , κ·Έ λ°μ λΉνΈλ€μ μ λΆ μΌμ§κ² λλ€. μ΄ κ²°κ³Όμ `pizza` μ κ΅μ§ν©μ κ΅¬νλ©΄ κ·Έ μ€ `pizza` μ μνμ§ μλ λΉνΈλ€μ λͺ¨λ κΊΌμ§κ² λλ€.
- μ΄ μ°μ°μ λ°λ³΅νμ¬ λͺ¨λ  λΆλΆ μ§ν©μ μνν  μ μλ€. νμ§λ§ `subset = 0` μΈ μμ μ μ’λ£λκΈ°μ κ³΅μ§ν©μ μννμ§ μλλ€.

---

## π μ°Έκ³ 
- [Tech Interview for developer](https://gyoogle.dev/blog)
- [**νλ‘κ·Έλλ° λνμμ λ°°μ°λ μκ³ λ¦¬μ¦ λ¬Έμ  ν΄κ²° μ λ΅**] κ΅¬μ’λ§
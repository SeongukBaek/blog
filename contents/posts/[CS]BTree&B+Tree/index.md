---
title: "π B Tree & B+ Tree"
description: "java μ§μ"
date: 2022-05-30
update: 2022-05-30
tags:
  - Java
  - BTree
  - B+Tree
series: "π Computer Science"
---

> **μ΄μ§ νΈλ¦¬**λ νλμ λΆλͺ¨κ° λ κ°μ μμλ°μ κ°μ§μ§ λͺ»νκ³ , νΈν₯λλ€λ©΄ νμ ν¨μ¨μ΄ μ ν νμκΈμΌλ‘ λ¨μ΄μ§λ€. νμ§λ§ μ΄μ§ νΈλ¦¬ κ΅¬μ‘°μ κ°κ²°ν¨κ³Ό κ· νλ§ λ§λ€λ©΄ νμ, μ½μ, μ­μ  λͺ¨λ $O(logN)$μ μ±λ₯μ λ³΄μ΄λ μ₯μ μ΄ μλ€.

## π§· B Tree
λ°μ΄ν°λ² μ΄μ€, νμΌ μμ€νμμ λλ¦¬ μ¬μ©λλ νΈλ¦¬ μλ£κ΅¬μ‘°μ μΌμ’μ΄λ€. μ΄μ§ νΈλ¦¬λ₯Ό νμ₯νμ¬ **λ λ§μ μμ μμ**μ κ°μ§ μ μκ² μΌλ°νμν¨ νΈλ¦¬ μλ£κ΅¬μ‘°μ΄λ€. (**μ΄μ§ νΈλ¦¬λ μλλ€!**)
- μμ μμ λν μΌλ°νλ₯Ό μ§ννλ©΄μ, νλμ λ λ²¨μ λ μ μ₯ν  μ μλ κ²λΏ μλλΌ νΈλ¦¬μ κ· νμ μλμΌλ‘ λ§μΆ°μ£Όλ λ‘μ§ λν κ°μΆμλ€.
  - λ°λΌμ, **κ· ν νΈλ¦¬**μ μ₯μ κ³Ό **ν¨μ¨μ μΈ λ°μ΄ν° λ‘λ**μ μ₯μ μ κ°μΆμλ€.

> **λ λ²¨μ λ λ§μ μ μ₯μ΄ κ°λ₯νλ€λ κ²μ μ₯μ **
> 
> λλμ λ°μ΄ν° μ²λ¦¬ μ, κ²μ κ΅¬μ‘°μ κ²½μ° νλμ λΈλμ λ§μ λ°μ΄ν°λ₯Ό κ°μ§ μ μλ€λ κ²μ ν° μ₯μ μ΄λ€. λλμ λ°μ΄ν°λ λ©λͺ¨λ¦¬λ³΄λ€ λΈλ­ λ¨μλ‘ μμΆλ ₯νλ HDD or SSDμ μ μ₯ν΄μΌ νκΈ° λλ¬Έμ΄λ€.
> - ex. ν λΈλ­μ΄ 1024λ°μ΄νΈλ©΄, 2λ°μ΄νΈλ₯Ό μ½μΌλ 1024λ°μ΄νΈλ₯Ό μ½μΌλ λκ°μ μμΆλ ₯ λΉμ©μ΄ λ°μνλ€. λ°λΌμ νλμ λΈλλ₯Ό λͺ¨λ 1024λ°μ΄νΈλ‘ κ½ μ±μμ μ‘°μ ν  μ μλ€λ©΄ ν¨μ¨μ μΌ κ²μ΄λ€.
>
> B Treeλ μ΄λ¬ν μ₯μ μ ν λλ‘ λ§μ DB μμ€νμ μΈλ±μ€ μ μ₯ λ°©λ²μΌλ‘ μ μ©νκ³  μλ€.

### πͺ κ·μΉ
- λΈλμ μλ£μκ° Nκ°μ΄λ©΄, μμ μλ N + 1μ΄μ΄μΌ νλ€.
- κ° λΈλμ μλ£λ μ λ ¬λ μνμ¬μΌ νλ€.
- λ£¨νΈ λΈλλ μ μ΄λ 2κ° μ΄μμ μμμ κ°μ ΈμΌ νλ€.
- λ£¨νΈ λΈλλ₯Ό μ μΈν λͺ¨λ  λΈλλ μ μ΄λ M/2κ°μ μλ£λ₯Ό κ°μ§κ³  μμ΄μΌ νλ€.
- μΈλΆ λΈλλ‘ κ°λ κ²½λ‘μ κΈΈμ΄λ λͺ¨λ κ°λ€.
- μλ ₯ μλ£λ μ€λ³΅μ΄ μμ΄μΌ νλ€.

---

## π§· B+ Tree

<img src="../../images/B+Tree.jpeg" width="80%">

λ°μ΄ν°μ λΉ λ₯Έ μ κ·Όμ μν **μΈλ±μ€ μ­ν λ§ νλ λΉλ¨λ§ λΈλκ° μΆκ°λ‘ μλ** νΈλ¦¬ μλ£κ΅¬μ‘°μ΄λ€. κΈ°μ‘΄μ B Treeμ λ°μ΄ν°μ μ°κ²°λ¦¬μ€νΈλ‘ κ΅¬νλ μμΈ κ΅¬μ‘°μ΄λ€.
- B Treeμ λ³ν κ΅¬μ‘°λ‘, index λΆλΆκ³Ό leaf λΈλλ‘ κ΅¬μ±λ μμ°¨ λ°μ΄ν° λΆλΆμΌλ‘ μ΄λ£¨μ΄μ§λ€. μΈλ±μ€ λΆλΆμ key κ°μ leafμ μλ key κ°μ μ§μ  μ°Ύμκ°λλ° μ¬μ©νλ€.
- `p` (fanout) μ΄λΌλ κ°μΌλ‘ ν nodeμ λͺ κ°μ entryκ° μ±μμ ΈμΌ νλμ§λ₯Ό λνλΈλ€.

### πͺ μ₯μ 
- λΈλ‘ μ¬μ΄μ¦λ₯Ό λ λ§μ΄ μ¬μ©ν  μ μλ€. (key κ°μ λν HDD μ κ·Ό μ£Όμκ° μκΈ° λλ¬Έμ΄λ€.)
- leaf λΈλλΌλ¦¬ μ°κ²° λ¦¬μ€νΈλ‘ μ°κ²°λμ΄ λ²μ νμμ λ§€μ° μ λ¦¬νλ€.

### πͺ λ¨μ 
- B Treeμ κ²½μ° μ΅μ μΌμ΄μ€μμλ λ£¨νΈμμ λλ  μ μμ§λ§, B+ Treeλ λ¬΄μ‘°κ±΄ leaf λΈλκΉμ§ λ΄λ €κ°λ΄μΌ νλ€.
  - **νμ λΉμ©μ΄ νΈλ¦¬μ λμ΄μ λΉλ‘**νκ² λλ€!

### πͺ μ½μ
- μ½μνλ €λ entryκ° μμΉν  κ³³μ μ°Ύλλ€.
- ν΄λΉ nodeκ° μΆ©λΆν κ³΅κ°μ΄ μλ€λ©΄ μ½μνκ³  μ’λ£νλ€.
- κ·Έλ μ§ μμ κ²½μ°, **ν΄λΉ nodeλ₯Ό λΆλ¦¬**νλ€.
  - nodeμ μνΈλ¦¬λ€μ λΆλ°°νκ³ , `middle key` λ₯Ό **COPY UP**νλ€.

> PUSH UPνλ©΄, `middle key` μ λν Data pointerκ° μμ€λκΈ° λλ¬Έμ΄λ€.

### πͺ μ½μ μ΄ν ...

<img src="../../images/AfterInsertionB+Tree.jpeg" width="80%">

B+ Treeμ nodeλ₯Ό μ½μν μ΄ν νΈλ¦¬μ λμ΄κ° μ¦κ°νμ§ μμ μλ μκ³ , μ¦κ°ν  μλ μλ€.
- B+ Treeμ νμ λΉμ©μ νΈλ¦¬μ λμ΄μ λΉλ‘νλ€.
- **νΈλ¦¬λ₯Ό μ¬λΆλ°°**ν¨μΌλ‘μ¨, λμ΄λ₯Ό λ?μΆ μ μλ€!

> μ¬λΆλ°°λ₯Ό ν΅ν΄ νμ λΉμ©μ λ?μΆ μλ μμ§λ§, νκ·  I/O λ°μ©μ μ¦κ°μν¨λ€.

### πͺ μ­μ 
- λ£¨νΈλΆν°, ν΄λΉ entryκ° μ‘΄μ¬νλ leaf nodeλ₯Ό μ°Ύλλ€.
- ν΄λΉ nodeμμ entryλ₯Ό μ§μλ μ±μμ ΈμΌ νλ `p` λ₯Ό λ§μ‘±νλ€λ©΄ κ·Έλλ‘ μ­μ νλ€.
- μ§μ΄ ν nodeμ entry μκ° `p - 1` μ΄λΌλ©΄, μ£Όλ³ leaf node(κ°μ λΆλͺ¨λ₯Ό κ°μ§λ μ£Όλ³ node)λ‘λΆν° entryλ₯Ό λΉλ €μ `p` λ₯Ό λ§μ‘±μν¨λ€.
  - μ΄λ `middle key` μ λ³κ²½μ μ λ°νλ€.
  - λ§μ½ μ£Όλ³ leaf nodeλ‘λΆν° λΉλ €μ¬ μ μλ€λ©΄, κ·Έ **leaf nodeμ κ²°ν©**νλ€.
    - κ²°ν©μ΄ λ°μνλ©΄, **λ μ€ ν nodeλ μ κ±°**νλ€.
    - κ²°ν©μ ν΅ν΄ **νΈλ¦¬μ λμ΄κ° κ°μ**ν  μλ μλ€.

---

## π§· B Treeμ B+ Tree λΉκ΅
- B Treeλ κ° λΈλμ λ°μ΄ν°κ° μ μ₯λλ€.
- B+ Treeλ index λΈλμ leaf λΈλλ‘ λΆλ¦¬λμ΄ μ μ₯λλ€. (λν leaf λΈλλ μλ‘ μ°κ²°λμ΄ μμ΄ μμ μ κ·Όμ΄λ μμ°¨ μ κ·Ό λͺ¨λ μ±λ₯μ΄ μ’λ€.)

- B Treeλ κ° λΈλμμ keyμ data λͺ¨λ λ€μ΄κ° μ μκ³ , dataλ disk blockμΌλ‘ ν¬μΈν°κ° λ  μ μλ€.
- B+ Treeλ κ° λΈλμμ keyλ§ λ€μ΄κ° μ μλ€. λ°λΌμ dataλ λͺ¨λ leaf λΈλμλ§ μ‘΄μ¬νλ€.
  - B+ Treeμ μ½μκ³Ό μ­μ λ λͺ¨λ leaf λΈλμμλ§ λ°μνλ€.

---

## π μ°Έκ³ 
- [Tech Interview for developer](https://gyoogle.dev/blog/computer-science/data-structure/B%20Tree%20&%20B+%20Tree.html)
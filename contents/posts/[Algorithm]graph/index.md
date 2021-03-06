---
title: "π‘ Graph μ΄λ‘ "
description: "μ’λ§λΆ"
date: 2021-12-28
update: 2021-12-28
tags:
  - μ’λ§λΆ
  - Graph
  - DFS
  - BFS
series: "π‘ Algorithm"
---

# π κ·Έλν

κ³μΈ΅μ μΈ κ΅¬μ‘°λ³΄λ€ μ’ λ μΌλ°μ μ΄κ³  κ°λ ₯ν μλ£ κ΅¬μ‘°, μ¬λ¬Όμ΄λ κ°λ κ°μ μ°κ²° κ΅¬μ‘°
ex. μ¬λ¬ λμλ€μ μ°κ²°νλ λλ‘λ§, μ¬λλ€ κ°μ μ§μΈ κ΄κ³, μΉ μ¬μ΄νΈ κ°μ λ§ν¬

**νΈλ¦¬**μ μμλ λΆλͺ¨ μμ κ΄κ³μ λν μ μ½μ΄ μμ΄ μ’ λ λ€μνκ³  μμ λ‘μ΄ κ΅¬μ‘° ννμ΄ κ°λ₯νλ€.

---

## π‘ μ μ
κ·Έλν G(V, E)λ μ΄λ€ μλ£λ κ°λμ νννλ μ μ (vertex)λ€μ μ§ν© Vμ μ΄λ€μ μ°κ²°νλ κ°μ (edge)λ€μ μ§ν© Eλ‘ κ΅¬μ±λ μλ£ κ΅¬μ‘°

* μ μ μ μμΉ μ λ³΄λ κ°μ μ μμ λ±μ κ·Έλνμ μ μμ ν¬ν¨λμ§ μλλ€.

---

## π‘ μ’λ₯
νννκ³ μ νλ λμμ λ°λΌ μ¬λ¬ κ°μ§ λ³νλ ννλ₯Ό κ°μ§ μ μλ€.

### λ°©ν₯ κ·Έλν(directed graph) or μ ν₯ κ·Έλν
κ° κ°μ μ΄ βλ°©ν₯β μ΄λΌλ μλ‘μ΄ μμ±μ κ°μ§λ€. μ¦, λ°©ν₯μ λ°λΌ μλ‘μ΄ κ°μ μΌλ‘ λΆλ₯λλ€. 
ex. μ¬λλ€ κ°μ μ§μ¬λ κ΄κ³, λλ‘μμμ μΌλ°© ν΅ν λ±

> **λ¬΄ν₯ κ·Έλν(undirected graph)**
> κ°μ μ λ°©ν₯μ΄ μλ κ·Έλν

### κ°μ€μΉ κ·Έλν(weighted graph)
κ° κ°μ μ βκ°μ€μΉβ λΌλ μ€μ μμ±μ΄ μΆκ°λλ€. 
ex. λ λμ μ¬μ΄μ κ±°λ¦¬, λ λ¬Όκ±΄ μ¬μ΄μ κ΅ν λΉμ¨ λ±

> μ΅μ μ€ν¨λ νΈλ¦¬μ μ΅λ¨ κ²½λ‘ λ¬Έμ μμ μ€μν κ°λμΌλ‘ μ¬μ©λλ€!

### λ€μ€ κ·Έλν(multigraph)
λ μ μ  μ¬μ΄μ λ κ° μ΄μμ κ°μ μ΄ μμ μ μλ κ·Έλν

### λ¨μ κ·Έλν(simple graph)
λ μ μ  μ¬μ΄μ μ΅λ ν κ°μ κ°μ λ§ μλ κ·Έλν

> π νΈλ¦¬ or λ£¨νΈ μλ νΈλ¦¬(unrooted tree)λ λΆλͺ¨ μμ κ΄κ³κ° μμ λΏ, κ°μ λ€μ μ°κ²° κ΄κ³λ§μ λ³΄λ©΄ **λ¬΄ν₯ κ·Έλν**μ΄λ€.
> μ¦, κ°μ μ ν΅ν΄ λ μ μ μ μλ λ°©λ²μ΄ λ± νλλΏμμ μλ―Ένλ€.

### μ΄λΆ κ·Έλν(bipartite graph)
κ·Έλνμ μ μ λ€μ κ²ΉμΉμ§ μλ λ κ°μ κ·Έλ£ΉμΌλ‘ λλ μ μλ‘ λ€λ₯Έ κ·Έλ£Ήμ μν μ μ λ€ κ°μλ§ κ°μ μ΄ μ‘΄μ¬νλλ‘ λ§λ€ μ μλ κ·Έλν 
ex. ννΈ μκ·Έλκ³Ό κ°μ νλ‘κ·Έλ¨μμμ μ¬λμ μλκΈ°
* κ°μ κ·Έλ£Ήμ μ μ λ€ κ°μλ κ°μ μ΄ μλ€.

### μ¬μ΄ν΄ μλ λ°©ν₯ κ·Έλν(directed acyclic graph) = DAG
ν μ μμ μΆλ°ν΄ λ€μ μκΈ° μμ μΌλ‘ λμμ€λ κ²½λ‘κ° μλ, μ¦ **cycleμ΄ μλ** λ°©ν₯ κ·Έλν 
ex. μ¬λ¬ μμλ€ κ°μ μνΈ μμ‘΄ κ΄κ³
* κ°μ μ λ°©ν₯μ λ¬΄μν  κ²½μ° cycleμ΄ μ‘΄μ¬ν  μλ μλ€.

---

## π‘ κ²½λ‘
λκ³Ό λμ΄ μλ‘ μ°κ²°λ κ°μ λ€μ μμλλ‘ λμ΄ν κ²

### λ¨μ κ²½λ‘
κ²½λ‘ μ€ ν μ μ μ μ΅λ ν λ²λ§ μ§λλ κ²½λ‘

### μ¬μ΄ν΄(cycle)
μμν μ μμ λλλ κ²½λ‘

---

## π‘ νν λ°©λ²
μ¬λ¬ κ°μ²΄λ€μ΄ μλ‘ μ°κ²°λμ΄ μλ€λ μ μ νΈλ¦¬μ ν° μ°¨μ΄κ° μλ€.

* κ° μ μ μ κ°μ²΄λ‘ νν
* κ° κ°μ²΄κ° μμ κ³Ό κ°μ μΌλ‘ μ°κ²°λ μ μ λ€μ λν μ λ³΄μ λͺ©λ‘μ μ μ₯

**λλ€μμ κ²½μ°, κ·Έλνλ νΈλ¦¬μ λΉν΄ ν¨μ¬ μ μ μΈ μ©λλ‘ μ¬μ©λλ€.**
* μλ‘μ΄ μ μ μ΄λ κ°μ μ μΆκ°νκ³  μ­μ νλ μΌμ΄ μμ£Ό μΌμ΄λμ§ μλλ€λ μλ―Έ
* λ°λΌμ, κ΅¬μ‘°μ λ³κ²½μ΄ μ΄λ ΅λλΌλ **μ’ λ κ°λ¨νκ³  λ©λͺ¨λ¦¬λ₯Ό μ κ² μ°¨μ§νλ λ°©λ²μΌλ‘ κ΅¬ν**νλ€.

### κ°λ¨ν λ°©λ²
1. κ·Έλνμ μ μ λ€μ κ°μ²΄μ instanceλ‘ νννλ λμ  κ° μ μ μ 0λΆν° μμνλ λ²νΈλ₯Ό λΆμ΄κ³ ,
2. λ°°μ΄μ κ° μ μ μ μ λ³΄λ₯Ό μ μ₯
3. κ°μ μ λ°λμͺ½ μ μ μ λ²νΈλ₯Ό μ μ₯νλ λ°©μμΌλ‘ κ΅¬ν

### μΈμ  λ¦¬μ€νΈ
κ·Έλνμ κ° μ μ λ§λ€ ν΄λΉ μ μ μμ λκ°λ κ°μ μ΄ λͺ©λ‘μ μ μ₯νλ λ°©μ
β **κ·Έλνλ κ° μ μ λ§λ€ νλμ μ°κ²° λ¦¬μ€νΈλ₯Ό κ°λ λ°©μμΌλ‘ κ΅¬ν**

**`Java`** β’ List λ΄λΆμ λμ  Listλ₯Ό μ μΈνμ¬ μ²λ¦¬νκ³  ν΄λΉ nodeμ costλ₯Ό Listμ²λΌ μ²λ¦¬νλ κ²½μ°κ° λ§κΈ° λλ¬Έμ, μ΄λ₯Ό κ΄λ¦¬νκΈ° μν Classλ₯Ό μ μΈνμ¬ μ¬μ©νλ€.

```java
class Node {
	int node;
	int cost;
	
	Node (int node, int cost) {
		this.node = node;
		this.cost = cost;
	}
}
```

> **λ¨μ **
> λ μ μ μ΄ μ£Όμ΄μ§ λ μ΄ μ μ μ΄ μ°κ²°λμ΄ μλμ§λ₯Ό μκΈ° μν΄μλ λͺ¨λ  μ°κ²° λ¦¬μ€νΈλ₯Ό μΌμΌμ΄ νμν΄μΌ νλ€λ κ²
> β μ΄μ κ°μ μ°μ°μλλ₯Ό λμ΄κΈ° μν΄ **μΈμ  νλ ¬ (adjacency matrix)** νν λ°©μμ μ¬μ©

### μΈμ  νλ ¬
2μ°¨μ λ°°μ΄μ μ΄μ©ν΄ κ·Έλνμ κ°μ  μ λ³΄λ₯Ό μ μ₯ 
ex. 1 β 2 β’ `graph[1][2] = true or cost`
β κ°μ₯ κ°λ¨ν ννμ κ²½μ°, 2μ°¨μ `boolean` κ° λ°°μ΄

### λ λ°©μμ λΉκ΅
λ λ°©μμ μ λ°λμ νΉμ§μ κ°μ Έ, μλ‘μ λ¨μ μ΄ μλ‘μ μ₯μ μ΄ λλ€.
**λ©λͺ¨λ¦¬ κ³΅κ° μΈ‘λ©΄**κ³Ό **νμ μκ° μΈ‘λ©΄**μΌλ‘ λλλ€.

#### μΈμ  λ¦¬μ€νΈμ μ₯μ 
* |V| κ°μ μ°κ²° λ¦¬μ€νΈμ μ€μ  κ°μ  μλ§νΌμ μμλ§ μ‘΄μ¬νκΈ°μ O(|V|+|E|) ν¬κΈ°μ κ³΅κ°λ§ μ¬μ©νλ€.
#### μΈμ  λ¦¬μ€νΈμ λ¨μ 
* μ μ μ λ²νΈκ° μ£Όμ΄μ§ κ²½μ°, λ μ μ μ μλ κ°μ μ μ‘΄μ¬λ₯Ό μκΈ° μν΄μλ λͺ¨λ  μ°κ²° λ¦¬μ€νΈλ₯Ό νμν΄μΌ νλ€.
#### μΈμ  νλ ¬μ μ₯μ 
* μ μ μ λ²νΈκ° μ£Όμ΄μ§ κ²½μ°, λ μ μ μ μλ κ°μ μ μ‘΄μ¬λ₯Ό ν λ²μ λ°°μ΄ μ κ·Όλ§μΌλ‘ μ μ μλ€.
#### μΈμ  νλ ¬μ λ¨μ 
* ν­μ μ μ  μ§ν© μ μ²΄λ₯Ό μ μ₯νκΈ° μν 2μ°¨μ λ°°μ΄μ μ¬μ©νκΈ° λλ¬Έμ, ν­μ O(|V|^2) ν¬κΈ°μ κ³΅κ°μ μ¬μ©ν΄μΌ νλ€. 

> κ°μ μ μκ° |V|^2μ λΉν΄ ν¨μ¬ μ μ κ·Έλν: ν¬μ κ·Έλν(sparse graph) β’ μΈμ  λ¦¬μ€νΈ
> κ°μ μ μκ° |V|^2μ κ±°μ λΉλ‘νλ κ·Έλν: λ°μ§ κ·Έλν(dense graph) β’ μΈμ  νλ ¬

---

## π κΉμ΄ μ°μ  νμ (DFS)
κ·Έλνμ λͺ¨λ  μ μ μ λ°κ²¬νλ κ°μ₯ λ¨μνκ³  κ³ μ μ μΈ λ°©λ²μΌλ‘, νμ¬ μ μ μμ λ€μ κ°μ§λ‘ λμ΄κ°κΈ° μ μ, **ν΄λΉ κ°μ§λ₯Ό λͺ¨λ νμνλ λ°©λ²**μ΄λ€.
1. νμ¬ μ μ κ³Ό μΈμ ν κ°μ λ€μ νλμ© κ²μ¬
2. μμ§ λ°©λ¬Ένμ§ μμ μ μ μΌλ‘ ν₯νλ κ°μ μ΄ μλ€λ©΄ κ·Έ κ°μ μ νμ
3. λ μ΄μ κ° κ³³μ΄ μλ κ²½μ°, λ§μ§λ§μ λ°λΌμλ κ°μ μ λ°λΌ λ€λ‘ λμκ°

DFSμμ κ°μ₯ μ€μν νΉμ§μ **3λ²**μ΄λ€.
μ΄λ₯Ό μν΄μ μ§κΈκΉμ§ κ±°μ³μ¨ μ μ λ€μ μ μ₯ν΄μΌ νλλ°, **μ¬κ· νΈμΆ**μ μ΄μ©νμ¬ κ°λ¨νκ² κ΅¬νν  μ μλ€.

> **μ£Όμν  μ **
> κ·Έλνμ λͺ¨λ  μ μ λ€μ΄ κ°μ μΌλ‘ μ°κ²°λμ§ μμ κ²½μ°κ° μμ μ μλ€.
> μ΄λλ λͺ¨λ  μ μ λ€μ λ³Ό μ μλ μ½λλ₯Ό μμ±ν  μ μμ΄μΌ νλ€.

### π‘ μκ° λ³΅μ‘λ
#### μΈμ  λ¦¬μ€νΈλ₯Ό μ¬μ©νλ κ²½μ°
* ν μ μ λ§λ€ `DFS()` λ ν λ²μ© νΈμΆ β |V| λ²
* O(|V| + |E|)

#### μΈμ  νλ ¬μ μ¬μ©νλ κ²½μ°
* `DFS()` μ νΈμΆνμλ μΈμ  λ¦¬μ€νΈμ λμΌνκ² |V| λ²
* λ€λ₯Έ λͺ¨λ  μ μ μ μννλ©° λ μ μ  μ¬μ΄μ κ°μ μ΄ μλκ°λ₯Ό νμΈνλ―λ‘ ν λ²μ O(|V|) μκ°μ΄ μλͺ¨
* O(|V|^2)

### π‘ μμ μ λ ¬
μμ‘΄μ±μ΄ μλ μμλ€μ΄ μ£Όμ΄μ§ λ, μ΄λ€μ μ΄λ€ μμλ‘ μνν΄μΌ νλμ§ κ³μ°

**μμ‘΄μ± κ·Έλν(dependency graph)**
κ° μμμ μ μ μΌλ‘ νννκ³ , μμ κ°μ μμ‘΄ κ΄κ³λ₯Ό κ°μ μΌλ‘ ννν λ°©ν₯ κ·Έλν
β cycleμ΄ μλ λ°©ν₯ κ·Έλν, μ¦ DAG

#### μμ μ λ ¬
μμ‘΄μ± κ·Έλνμ λͺ¨λ  μμ‘΄μ±μ΄ λ§μ‘±λλ €λ©΄, λͺ¨λ  κ°μ μ΄ μΌμͺ½μμ μ€λ₯Έμͺ½μΌλ‘ κ°μΌ νλλ°, μ΄λ₯Ό μν΄ **DAGμ μ μ μ λ°°μ΄νλ λ¬Έμ **

**μ§κ΄μ μΈ λ°©λ²**
* λ€μ΄μ€λ κ°μ μ΄ νλλ μλ μ μ μ νμ
* μ λ ¬ κ²°κ³Όμ μ΄μ΄ λΆμ΄κΈ°
* κ·Έλνμμ ν΄λΉ μ μ μ μ­μ 
μ κ³Όμ μ λ°λ³΅

μ΄λ₯Ό `DFS` λ₯Ό μ΄μ©ν΄ ν΄κ²°ν  μ μλ€.
* ν μ μ μ λν `DFS()` κ° μ’λ£λ  λλ§λ€ νμ¬ μ μ μ λ²νΈλ₯Ό κΈ°λ‘
* λͺ¨λ  νμμ΄ λλ ν, μ μ  λ²νΈλ€μ λ€μ§μΌλ©΄ μμ μ λ ¬ κ²°κ³Ό

### π‘ μ΄λ‘ μ  λ°°κ²½κ³Ό μμ©
#### κΉμ΄ μ°μ  νμκ³Ό κ°μ μ λΆλ₯
κΉμ΄ μ°μ  νμμ μννλ©΄ κ·Έ κ³Όμ μμ κ·Έλνμ λͺ¨λ  κ°μ μ ν λ²μ©μ λ§λκ² λλλ°, μΌλΆ κ°μ λ§μ΄ μ²μ λ°κ²¬ν μ μ κ³Ό μ°κ²°λμ΄ μκΈ°μ μ΄λ₯Ό λ°λΌκ°κ² λλ€.
! νμ§λ§ μ¬κΈ°μ, λ¬΄μλλ κ°μ λ€μ ν΅ν΄ κ·Έλνμ κ΅¬μ‘°μ λν μ λ³΄λ₯Ό μ μ μλ€.

μ΄λ ν κ·Έλνμ λν κΉμ΄ μ°μ  νμ μ, νμμ΄ λ°λΌκ°λ μΌλΆ κ°μ λ€λ§ λͺ¨μλ³΄λ©΄ **βνΈλ¦¬β** ννλ₯Ό λκ² λλ€.
β μ΄μ κ°μ΄ μ»μ΄μ§ νΈλ¦¬λ₯Ό **κΉμ΄ μ°μ  νμ μ€ν¨λ νΈλ¦¬** νΉμ **DFS μ€ν¨λ νΈλ¦¬** λΌκ³  νλ€.

**κ°μ μ λΆλ₯**
* νΈλ¦¬ κ°μ (tree edge) : μ€ν¨λ νΈλ¦¬μ ν¬ν¨λ κ°μ 
* μλ°©ν₯ κ°μ (forward edge) : μ€ν¨λ νΈλ¦¬μ μ μ‘°μμ μμμΌλ‘ μ°κ²°λμμ§λ§ νΈλ¦¬ κ°μ μ΄ μλ κ°μ 
* μ­λ°©ν₯ κ°μ (back edge) : μ€ν¨λ νΈλ¦¬μ μμμμ μ μ‘°λ‘ μ°κ²°λλ κ°μ 
* κ΅μ°¨ κ°μ (cross edge) : μμ μΈ κ°μ μ΄ μλ κ°μ , μ μ‘°μ μμ κ΄κ³κ° μλ μ μ λ€ κ° μ°κ²°λ κ°μ 

> **μ΄λ ν μμλ‘ μ μ μ λ°©λ¬Ένλλ**μ λ°λΌ μλ‘ λ€λ₯Έ νΈλ¦¬κ° λ  μλ μκ³ , κ°μ μ λν λΆλ₯κ° λ¬λΌμ§ μλ μλ€.

**λ¬΄ν₯ κ·Έλν κ°μ μ λΆλ₯**
λ¬΄ν₯ κ·Έλνμ λͺ¨λ  κ°μ μ μλ°©ν₯μΌλ‘ ν΅ν κ°λ₯νκΈ° λλ¬Έμ **κ΅μ°¨ κ°μ μ΄ μμ μ μλ€.**
λν, μλ°©ν₯ κ°μ κ³Ό μ­λ°©ν₯ κ°μ μ κ΅¬λΆλ μ‘΄μ¬νμ§ μλλ€.

> **μ¬μ΄ν΄ μ‘΄μ¬ μ¬λΆ νμΈ**
> κ°μ  κ΅¬λΆμ μ΄μ©νμ¬ λ°©ν₯ κ·Έλνμμ μ¬μ΄ν΄μ΄ μ‘΄μ¬νλμ§ μ¬λΆλ₯Ό νλ¨ν  μ μλ€.
> β μ­λ°©ν₯ κ°μ μ μ‘΄μ¬ μ¬λΆμ λμΌν λ¬Έμ 

##### κ°μ μ κ΅¬λΆνλ λ°©λ²
κ°μ₯ κ΅¬λΆνκΈ° μ¬μ΄ κ°μ μ νΈλ¦¬ κ°μ μ΄λ€.
κ°μ  (u, v)λ₯Ό κ²μ¬νμ λ, vκ° λ°©λ¬Έλ μ μ΄ μλ€λ©΄ μ΄λ βνΈλ¦¬ κ°μ βμ΄ λλ€.
νμ§λ§ vκ° λ°©λ¬Έλ μ΄νμλ€λ©΄, λΆλͺ¨μΈμ§ μμμΈμ§ μ μ μλ λ°©λ²μ΄ μλ€.
κ·Έλμ μΆκ°μ μΈ μ λ³΄λ₯Ό μ μ₯νκ³  μ΄λ₯Ό ν΅ν΄ λΆλͺ¨ μμ κ΄κ³λ₯Ό νμν  μ μμ΄μΌ νλ€.
* κ° μ μ μ λ°©λ¬Έν  λ, μ΄ μ μ μ΄ λ°©λ¬Έλμλ€λ μ¬μ€ = `visited`
* μ΄ μ μ μ΄ λͺλ²μ§Έλ‘ λ°κ²¬λμλμ§ = `discovered`

**κ°μ  (u, v)μμ uμ vμ λ°©λ¬Έ μμ**
* μλ°©ν₯ κ°μ μ΄λΌλ©΄, vλ uμ μμμ΄μ΄μΌ νλ€.
* μ­λ°©ν₯ κ°μ μ΄λΌλ©΄, vλ uμ μ μ‘°μ¬μΌ νλ€.
* κ΅μ°¨ κ°μ μ΄λΌλ©΄, dfs(v)κ° μ’λ£ν ν dfs(u)κ° νΈμΆλμ΄μΌ νλ€.

μ κ²½μ° μ€, λ°κ²¬ μμ μ λ³΄λ₯Ό ν λλ‘ μλ°©ν₯ κ°μ μ λν κ΅¬λΆμ κ°λ₯νμ§λ§, μ­λ°©ν₯ κ°μ κ³Ό κ΅μ°¨ κ°μ μ λν κ΅¬λΆμ μ¬μ ν λΆκ°λ₯νλ€.
κ·Έλμ, **dfs(v)μ μ’λ£ μ¬λΆ** λν νμΈν΄μ£Όμ΄μΌ νλ€.

---

## π λλΉ μ°μ  νμ (BFS)
κΉμ΄ μ°μ  νμκ³Ό ν¨κ» κ°μ₯ λλ¦¬ μ¬μ©λλ κ·Έλν νμ μκ³ λ¦¬μ¦μΌλ‘, "λ€μ΅μ€νΈλΌμ μ΅λ¨ κ±°λ¦¬ μκ³ λ¦¬μ¦"μ΄λ "νλ¦Όμ μ΅μ μ€ν¨λ νΈλ¦¬ μκ³ λ¦¬μ¦" λ±μ μ¬μ©λλ€.

**βμμμ μμ μ΅μ κ±°λ¦¬ κΈ°μ€μΌλ‘ κ°κΉμ΄ μ μ λΆν° μμλλ‘ λ°©λ¬Ένλ νμ μκ³ λ¦¬μ¦βμΌλ‘, μ΅μ λΉμ©μ κ΅¬ν  λ μ ν©νλ€.**

1. κ° μ μ μ λ°©λ¬Έν  λλ§λ€ λͺ¨λ  μΈμ  μ μ λ€μ κ²μ¬
2. μ΄ μ€ μ²μ λ³΄λ μ μ μ λ°κ²¬νλ©΄ λ°©λ¬Έ μμ μ΄λΌκ³  κΈ°λ‘νκ³  λ³λμ μμΉμ μ μ₯(`Queue`)
3. μΈμ ν μ μ μ λͺ¨λ κ²μ¬νκ³  λλ©΄, μ§κΈκΉμ§ μ μ₯ν λͺ©λ‘μμ λ€μ μ μ μ κΊΌλ΄μ λ°©λ¬Έ

> λλΉ μ°μ  νμμ λ°©λ¬Έ μμλ **μ μ μ λͺ©λ‘μμ μ΄λ€ μ μ μ λ¨Όμ  κΊΌλ΄λμ§μ μν΄ κ²°μ **

μμμ μΈκΈν **βλ³λμ μμΉβ** λ λ¨Όμ  λ€μ΄μ¨ μ μ μ λ¨Όμ  κΊΌλ΄μΌ νλ νΉμ±μ κ°μ ΈμΌ νλ―λ‘, **`Queue`** λ₯Ό μ¬μ©νμ¬ ν΄λΉ μ‘°κ±΄μ λ§μ‘±μν¨λ€.

κΉμ΄ μ°μ  νμκ³Ό λ¬λ¦¬ λλΉ μ°μ  νμμμλ λ°κ²¬κ³Ό λ°©λ¬Έμ΄ κ°μ§ μλ€.
λ°λΌμ λͺ¨λ  μ μ μ 
* μμ§ λ°κ²¬λμ§ μμ μν
* λ°κ²¬λμμ§λ§ μμ§ λ°©λ¬Έλμ§λ μμ μν (`Queue` μ μ μ₯λ μν)
* λ°©λ¬Έλ μν
λ‘ 3κ°μ§ μνλ₯Ό κ°μ§ μ μλ€.

κΉμ΄ μ°μ  νμμμμ²λΌ, μ μ μ μ λ°κ²¬νλ λ° μ¬μ©νλ κ°μ λ€λ§μ λͺ¨μ νΈλ¦¬λ₯Ό **λλΉ μ°μ  νμ μ€ν¨λ νΈλ¦¬(BFS Spanning Tree)**λΌκ³  νλ€.

### π‘ μκ° λ³΅μ‘λ
λͺ¨λ  μ μ μ ν λ²μ© λ°©λ¬Ένλ©°, μ μ μ λ°©λ¬Έν  λλ§λ€ μΈμ ν λͺ¨λ  κ°μ μ κ²μ¬νκΈ° λλ¬Έμ, **κΉμ΄ μ°μ  νμκ³Ό λμΌ**νλ€.

### π‘ λλΉ μ°μ  νμκ³Ό μ΅λ¨ κ±°λ¦¬
**κ·Έλνμμμ μ΅λ¨ κ²½λ‘ λ¬Έμ λ₯Ό ν΄κ²°**νλλ° μ£Όλ‘ μ¬μ©λλ€.

λλΉ μ°μ  νμ μκ³ λ¦¬μ¦μ κ°λ¨νκ² λ³κ²½ν΄ λͺ¨λ  μ μ μ λν΄ μμμ μΌλ‘λΆν°μ κ±°λ¦¬ `distance[]` λ₯Ό κ³μ°νλλ‘ ν  μ μλ€.
* νμ κ³Όμ μμ κ°μ  (u, v)λ₯Ό ν΅ν΄ μ μ  vλ₯Ό μ²μ λ°κ²¬ν΄ `Queue` μ λ£λλ€κ³  κ°μ 
* μμμ μΌλ‘λΆν° vκΉμ§μ μ΅λ¨ κ±°λ¦¬ `distance[v]` λ μμμ μΌλ‘λΆν° uκΉμ§μ μ΅λ¨ κ±°λ¦¬ `distance[u]` +1
μ΄λ κ³§ μμμ μΌλ‘λΆν° λ€λ₯Έ λͺ¨λ  μ μ κΉμ§μ μ΅λ¨ κ²½λ‘λ₯Ό λλΉ μ°μ  νμ μ€ν¨λ νΈλ¦¬ (BFS Spanning Tree) μμ μ°Ύμ μ μλ€λ κ²μ μλ―Ένλ€.

### π‘ μλ°©ν₯ νμ
λ μ μ  μ¬μ΄μ μ΅λ¨ κ²½λ‘λ₯Ό μ°Ύμ λ μ¬μ©ν  μ μλ νν¬λ
μμ μ μ μμ μμνλ **μ λ°©ν₯ νμ**κ³Ό λͺ©ν μ μ μμ μμν΄ κ±°κΎΈλ‘ μ¬λΌμ€λ **μ­λ°©ν₯ νμ**μ λμμ νλ©΄μ, μ΄ λμ΄ κ°μ΄λ°μ λ§λλ©΄ μ’λ£

μ΄λ₯Ό μ½λλ‘ κ΅¬ννλ €λ©΄,
μ λ°©ν₯κ³Ό μ­λ°©ν₯ νμμμ λ°©λ¬Έν΄μΌ ν  μ μ λ€μ λͺ¨λ κ°μ `Queue` μ μ μ₯νλ, μ΅λ¨ κ±°λ¦¬λ₯Ό μ μ₯ν  λ μ λ°©ν₯μ **μμ**, μ­λ°©ν₯μ **μμ**λ‘ μ μ₯νλ€.
μΈμ ν μν κ²μ¬ μ, μλ‘ λΆνΈκ° λ€λ₯΄λ€λ©΄ κ°μ΄λ°μ λ§λ¬μμ νμν  μ μλ€.

μλ°©ν₯ νμμ λλΉ μ°μ  νμλ³΄λ€ ν¨μ¬ μ μ μ μ λ§μ λ°©λ¬Ένκ³ λ μ΅λ¨ κ²½λ‘λ₯Ό μ°Ύμ μ μμ΄ **λ©λͺ¨λ¦¬ μ¬μ©λμ΄ ν¨μ¬ μ λ€.**
νμ§λ§ μ΄λ₯Ό μ¬μ©ν  μ μλ κ²½μ°λ, λͺ©ν μ μ κΉμ§μ μ΅λ¨ κ±°λ¦¬κ° λλ¬΄ μ»€μ μλ°©ν₯ νμμΌλ‘λ μ΅λ¨ κ²½λ‘λ₯Ό μ°Ύμ μ μλ κ²½μ°λ μ΄λ»κ² ν΄μΌ ν κΉ?

### π‘ μ μ  κΉμ΄μ§λ νμ
= Iteratively Deepening Search = IDS

* μμμ κΉμ΄ μ ν lμ μ ν ν μ΄ μ νλ³΄λ€ μ§§μ κ²½λ‘κ° μ‘΄μ¬νλμ§λ₯Ό **κΉμ΄ μ°μ  νμ**μΌλ‘ νμΈ
* λ΅μ μ°ΎμΌλ©΄ μ±κ³΅, μ΄λ₯Ό λ°ν
* λ΅μ μ°Ύμ§ λͺ»νλ©΄ lμ λλ €μ λ€μ μλ

μ΄λ **βμ‘°ν© νμβ** κ³Ό κ΄λ ¨μ΄ κΉλ€.

### π‘ νμ λ°©λ² μ ννκΈ°
1. μν κ³΅κ°μμμ μ΅λ¨ κ²½λ‘λ₯Ό μ°Ύλ κ²½μ°,
**λλΉ μ°μ  νμ**μ μ°μ μ μΌλ‘ κ³ λ € (μ§κ΄μ μ΄κ³  κ΅¬νλ κ°λ¨)
νμμ κΉμ΄ νκ³κ° μ ν΄μ Έ μμ§ μκ±°λ λλ¬΄ κΉμ΄ λ©λͺ¨λ¦¬ μ¬μ©λμ΄ λλ¬΄ ν¬μ§ μμμ§μ λν νμΈμ΄ νμ
2. μν κ³΅κ°μμμ μ΅λ¨ κ²½λ‘λ₯Ό μ°Ύλλ°, νμμ μ΅λ κΉμ΄κ° μ ν΄μ Έ μκ³  λλΉ μ°μ  νμμ νκΈ°μλ λ©λͺ¨λ¦¬μ μκ°μ΄ λΆμ‘±ν  κ²½μ°,
**μλ°©ν₯ νμ**μ κ³ λ €
λͺ©ν μνμμ μ­λ°©ν₯μΌλ‘ μμ§μ΄κΈ°κ° μ¬μ΄μΌ νλ€.
3. λ νμμ΄ λͺ¨λ λλ¬΄ λ©λͺ¨λ¦¬λ₯Ό λ§μ΄ μ¬μ©νκ±°λ λλ¬΄ λλ¦° κ²½μ°,
μ΅μ νλ₯Ό ν  κ±°λ¦¬κ° λ λ§μ **μ μ  κΉμ΄μ§λ νμ**μ μ¬μ©

---

### π μ°Έκ³ 
* νλ‘κ·Έλλ° λνμμ λ°°μ°λ μκ³ λ¦¬μ¦ λ¬Έμ ν΄κ²°μ λ΅_κ΅¬μ’λ§
* [Javaκ·Έλνμ νν :: TH](https://sskl660.tistory.com/60)
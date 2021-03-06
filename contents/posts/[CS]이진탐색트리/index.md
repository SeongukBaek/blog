---
title: "π μ΄μ§νμνΈλ¦¬(Binary Search Tree)"
description: "κ°λ° μμ"
date: 2022-05-28
update: 2022-05-28
tags:
  - κ°λ°μμ
  - Java
  - BST
series: "π Computer Science"
---

## π§· μ΄μ§ νμ νΈλ¦¬
> μ΄μ§ νμ + μ°κ²° λ¦¬μ€νΈ

- **μ΄μ§ νμ** : νμμ μμλλ μκ°λ³΅μ‘λλ $O(logN)$, νμ§λ§ μ½μ, μ­μ κ° λΆκ°λ₯
- **μ°κ²° λ¦¬μ€νΈ** : μ½μ, μ­μ μ μκ°λ³΅μ‘λλ$O(1)$, νμνλ μκ°λ³΅μ‘λκ° $O(N)$

μ΄ λ κ°μ§λ₯Ό ν©νμ¬ μ₯μ μ λͺ¨λ μ»μ΄ ν¨μ¨μ μΈ νμ λ₯λ ₯κ³Ό μλ£μ μ½μ, μ­μ λ κ°λ₯νκ² νλ **μ΄μ§ νμ νΈλ¦¬**

### πͺ νΉμ§
- λΈλμ μ μ₯λ ν€λ μ μΌ (μ€λ³΅μ΄ μμ΄μΌ ν¨)
- κ° λΈλμ μμμ΄ 2κ° μ΄ν
- κ° λΈλμ μΌμͺ½ μμμ λΆλͺ¨λ³΄λ€ μκ³ , μ€λ₯Έμͺ½ μμμ λΆλͺ¨λ³΄λ€ νΌ
- μΌμͺ½κ³Ό μ€λ₯Έμͺ½ μλΈ νΈλ¦¬λ μ΄μ§ νμ νΈλ¦¬

> **μ€λ³΅μ΄ μμ΄μΌ νλ μ΄μ **
> 
> : κ²μ λͺ©μ  μλ£κ΅¬μ‘°μΈλ°, κ΅³μ΄ μ€λ³΅μ΄ λ§μ κ²½μ°μ νΈλ¦¬λ₯Ό μ¬μ©νμ¬ κ²μ μλλ₯Ό λλ¦¬κ² ν  νμκ° μλ€.

μ΄μ§ νμ νΈλ¦¬μ μνλ **"μ€μ μν(inorder)"** λ°©μμΌλ‘, μ λ ¬λ μμλ‘ μ½μ μ μλ€.

### πͺ BST ν΅μ¬ μ°μ°
- κ²μ
- μ½μ
- μ­μ 
- νΈλ¦¬ μμ±, μ­μ 

### πͺ μκ° λ³΅μ‘λ
λΈλ κ°μκ° Nκ°μΌ λ,
- κ· λ± νΈλ¦¬: $O(logN)$
- νΈν₯ νΈλ¦¬: $O(N)$

> μ½μ, κ²μ, μ­μ  μκ°λ³΅μ‘λλ **νΈλ¦¬μ Depth**μ λΉλ‘

**μ­μ μ 3κ°μ§ κ²½μ°**
1. μμμ΄ μλ λ¦¬ν λΈλμΌ λ -> κ·Έλ₯ μ­μ !
2. μμμ΄ 1κ°μΈ λΈλμΌ λ -> μμ λΈλμ κ΅ν ν, μ­μ 
3. μμμ΄ 2κ°μΈ λΈλμΌ λ -> μ€λ₯Έμͺ½ μμ λΈλμμ κ°μ₯ μμ κ° λλ μΌμͺ½ μμ λΈλμμ κ°μ₯ ν° κ°κ³Ό κ΅ν ν, μ­μ 

νΈν₯λ νΈλ¦¬λ μκ°λ³΅μ‘λκ° $O(N)$μ΄λ―λ‘ νΈλ¦¬λ₯Ό μ¬μ©ν  μ΄μ κ° μλ€!
- μ΄λ₯Ό λ°λ‘ μ‘λλ‘ `Rebalancing` νλ κ°μ λ°©μμ΄ **AVL Tree**, **RedBlack Tree**

```java
class BinarySearchTree {
  public class Node {
    int data;
    Node left;
    Node right;

    public Node(int data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }

  public Node root;
  public BinarySearchTree() {
    this.root = null;
  }

  public boolean find(int id) {
    Node cur = root;

    while(cur != null) {
      if (cur.data == id) return true;
      else if(cur.data > id) cur = cur.left;
      else cur = cur.right;
    }

    return false;
  }

  public boolean delete(int id) {
    Node parent = root;
    Node cur = root;
    boolean isLeftChild = false;

    while(cur.data != id) {
      parent = cur;
      if (cur.data > id) {
        isLeftChild = true;
        cur = cur.left;
      } else {
        isLeftChild = false;
        cur = cur.right;
      }
      if (cur == null) return false;
    }

    // case1. μμ λΈλκ° μλ κ²½μ° -> κ·Έλ₯ μ­μ 
    if (cur.left == null && cur.right == null) {
      if (cur == root) root = null;
      if (isLeftChild == true) parent.left = null;
      else parent.right = null;
    } 
    // case2. μμ λΈλκ° 1κ°μΈ κ²½μ° -> κ΅ν ν μ­μ 
    else if (cur.right == null) {
      if (cur == root) root = cur.left;
      else if (isLeftChild) parent.left = cur.left;
      else parent.right = cur.left;
    } else if (cur.left == null) {
      if (cur == root) root = cur.left;
      else if (isLeftChild) parent.left = cur.right;
      else parent.right = cur.right;
    }
    // case3. μμ λΈλκ° 2κ°μΈ κ²½μ° -> μ€λ₯Έμͺ½ μμ λΈλ μ€ μ΅μκ°κ³Ό κ΅ν ν μ­μ 
    else if (cur.left != null && cur.right != null) {
      Node minNode = getMin(cur);
      if (cur == root) root = minNode;
      else if (isLeftChild) parent.left = minNode;
      else parent.right = minNode;
      minNode.left = cur.left;
    }

    return true;
  }

  // μ€λ₯Έμͺ½ μλΈ νΈλ¦¬μμ μ΅μκ°μ λ°ν
  public Node getMin(Node deleteNode) {
    Node minNode = null;
    Node minNodeParent = null;
    Node cur = deleleNode.right;

		while(cur != null) {
			minNodeParent = minNode;
			minNode = cur;
			cur = cur.left;
		}

		if (minNode != deleleNode.right) {
			minNodeParent.left = minNode.right;
			minNode.right = deleleNode.right;
		}

		return minNode;
  }

  public void insert(int id) {
    Node newNode = new Ndoe(id);
    if (root == null) {
      root = newNode;
      return;
    }

    Node cur = root;
    Node parent = null;

    while(true) {
      parent = cur;

      if (id < cur.date) {
        cur = cur.left;
        if (cur == null) {
          parent.left = newNode;
          return;
        }
      } else {
        cur = cur.right;
        if (cur == null) {
          parent.right = newNode;
          return;
        }
      }
    }
  }

  public void print(Node root) {
    if (root != null) {
      print(root.left);
      System.out.println(" " + root.date);
      print(root.right);
    }
  }
}
```

---

## π μ°Έκ³ 
- [Tech Interview for developer](https://gyoogle.dev/blog/computer-science/data-structure/Tree.html)
- [BST (Binary Search Tree)](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#bst-binary-search-tree)
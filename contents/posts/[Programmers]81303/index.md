---
title: "👩‍💻 81303. 표 편집"
description: "알고리즘 문제 풀기"
date: 2022-05-04
update: 2022-05-04
tags:
  - Stack
  - LinkedList
series: "👩‍💻 Programmers"
---

## 문제
[Programmers - 표 편집](https://programmers.co.kr/learn/courses/30/lessons/81303)

### 📍 **Logic**

```java
private void init() {
    for (int i = 0; i < n; i++) {
        pre[i] = i - 1;
        next[i] = i + 1;
    }
    next[n - 1] = -1;
}
```

- 현재 node의 이전과 이후 node를 저장하기 위한 배열을 초기화한다.

```java
public void delete() {
    trash.push(new Node(now, pre[now], next[now]));
    
    // now의 pre와 next를 update함으로써 해당 node를 제거
    if (pre[now] != -1) next[pre[now]] = next[now];
    if (next[now] != -1) pre[next[now]] = pre[now];
    
    // 해당 위치는 원본과 달라지므로 X로 변경
    sb.setCharAt(now, 'X');
    
    // now 이동
    if(next[now] != -1) now = next[now];
    else now = pre[now];
}

public void undo() {
    Node insert = trash.pop();
    
    // 다시 추가할 insert node의 pre와 next를 update함으로써 해당 node를 추가
    if (insert.before != -1) next[insert.before] = insert.cur;
    if (insert.after != -1) pre[insert.after] = insert.cur;
    
    // 원상복구
    sb.setCharAt(insert.cur, 'O');
}
```

- `goUp()` 과 `goDown()` 으로 `now` 를 계속 최신화하고, 삭제 및 복구 시에는 `pre` 와 `next` 배열을 업데이트하는 방식을 사용한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Node {
        int cur;
        int before;
        int after;

        public Node(int cur, int before, int after) {
            this.cur = cur;
            this.before = before;
            this.after = after;
        }
    }
    class Table {
        StringBuilder sb;
        Stack<Node> trash = new Stack<>();

        // 현재 node의 이전과 이후 node를 저장할 배열
        int[] pre;
        int[] next;
        int n;
        int now;

        public Table(int n, int now) {
            this.n = n;
            this.now = now;
            pre = new int[n];
            next = new int[n];
            sb = new StringBuilder("O".repeat(n));

            init();
        }

        private void init() {
            for (int i = 0; i < n; i++) {
                pre[i] = i - 1;
                next[i] = i + 1;
            }
            next[n - 1] = -1;
        }

        // 중간에 삭제된 node가 있을 수 있기에 n만큼 반복하면서 now 이동
        public void goUp(int n) {
            while(n-- > 0) now = pre[now];
        }

        public void goDown(int n) {
            while(n-- > 0) now = next[now];
        }

        public void delete() {
            trash.push(new Node(now, pre[now], next[now]));
            
            // now의 pre와 next를 update함으로써 해당 node를 제거
            if (pre[now] != -1) next[pre[now]] = next[now];
            if (next[now] != -1) pre[next[now]] = pre[now];
            
            // 해당 위치는 원본과 달라지므로 X로 변경
            sb.setCharAt(now, 'X');
            
            // now 이동
            if(next[now] != -1) now = next[now];
            else now = pre[now];
        }

        public void undo() {
            Node insert = trash.pop();
            
            // 다시 추가할 insert node의 pre와 next를 update함으로써 해당 node를 추가
            if (insert.before != -1) next[insert.before] = insert.cur;
            if (insert.after != -1) pre[insert.after] = insert.cur;
            
            // 원상복구
            sb.setCharAt(insert.cur, 'O');
        }

        public String print() {
            return sb.toString();
        }
    }

    class Solution {
        public String solution(int n, int k, String[] cmd) {
            Table t = new Table(n, k);

            for (String c : cmd) {
                switch (c.charAt(0)) {
                    case 'U' -> t.goUp(Integer.parseInt(c.substring(2)));
                    case 'D' -> t.goDown(Integer.parseInt(c.substring(2)));
                    case 'C' -> t.delete();
                    case 'Z' -> t.undo();
                }
            }

            // 최종적으로 표를 비교하여 answer를 완성하는 method
            return t.print();
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 처음 구현은 `List` 와 `Stack` 을 이용했다. 실패한 테케가 너무 많았고, 효율성은 아예 돌아가지도 않았다.
- 요소의 삽입과 삭제가 자주 일어나기에, 이에 적합한 자료구조가 필요한 것 같았다. 이에는 `LinkedList` 가 적합해보였다.
- 생각보다 쉬워보였으나, 구현할수록 꼼꼼히 생각해야 할 구현부들이 생겨나, [참고](https://moonsbeen.tistory.com/294)가 필요했다...
---
title: "👩‍💻 67258. 보석 쇼핑"
description: "알고리즘 문제 풀기"
date: 2022-04-28
update: 2022-04-28
tags:
  - 
series: "👩‍💻 Programmers"
---

## 문제
개발자 출신으로 세계 최고의 갑부가 된 어피치는 스트레스를 받을 때면 이를 풀기 위해 오프라인 매장에 쇼핑을 하러 가곤 합니다.
어피치는 쇼핑을 할 때면 매장 진열대의 특정 범위의 물건들을 모두 싹쓸이 구매하는 습관이 있습니다.
어느 날 스트레스를 풀기 위해 보석 매장에 쇼핑을 하러 간 어피치는 이전처럼 진열대의 특정 범위의 보석을 모두 구매하되 특별히 아래 목적을 달성하고 싶었습니다.
진열된 모든 종류의 보석을 적어도 1개 이상 포함하는 가장 짧은 구간을 찾아서 구매

예를 들어 아래 진열대는 4종류의 보석(RUBY, DIA, EMERALD, SAPPHIRE) 8개가 진열된 예시입니다.

|진열대 번호|1|2|3|4|5|6|7|8|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|보석 이름|DIA|RUBY|RUBY|DIA|DIA|EMERALD|SAPPHIRE|DIA|

진열대의 3번부터 7번까지 5개의 보석을 구매하면 모든 종류의 보석을 적어도 하나 이상씩 포함하게 됩니다.

진열대의 3, 4, 6, 7번의 보석만 구매하는 것은 중간에 특정 구간(5번)이 빠지게 되므로 어피치의 쇼핑 습관에 맞지 않습니다.

진열대 번호 순서대로 보석들의 이름이 저장된 배열 gems가 매개변수로 주어집니다. 이때 모든 보석을 하나 이상 포함하는 가장 짧은 구간을 찾아서 return 하도록 solution 함수를 완성해주세요.
가장 짧은 구간의 시작 진열대 번호와 끝 진열대 번호를 차례대로 배열에 담아서 return 하도록 하며, 만약 가장 짧은 구간이 여러 개라면 시작 진열대 번호가 가장 작은 구간을 return 합니다.

### 제한사항
- gems 배열의 크기는 1 이상 100,000 이하입니다.
  - gems 배열의 각 원소는 진열대에 나열된 보석을 나타냅니다.
  - gems 배열에는 1번 진열대부터 진열대 번호 순서대로 보석이름이 차례대로 저장되어 있습니다.
  - gems 배열의 각 원소는 길이가 1 이상 10 이하인 알파벳 대문자로만 구성된 문자열입니다.

### 입출력 예
|gems|return|
|:---:|:---:|:---:|
|["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"]|[3, 7]|
|["AA", "AB", "AC", "AA", "AC"]|[1, 3]|
|["XYZ", "XYZ", "XYZ"]|[1, 1]|
|["ZZZ", "YYY", "NNNN", "YYY", "BBB"]|[1, 5]|



### 📍 **Logic**

```java

```

- 

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        long answer = 0;
        ArrayList<Long> nums = new ArrayList<>();
        ArrayList<Character> perm = new ArrayList<>();
        StringBuilder operands = new StringBuilder();
        
        public long solution(String expression) {
            StringBuilder tmp = new StringBuilder();
            
            for (int i = 0; i < expression.length(); i++) {
                char ch = expression.charAt(i);
                if (48 <= ch && ch <= 57) tmp.append(ch); 
                else {
                    nums.add((long) Integer.parseInt(String.valueOf(tmp)));
                    if (!perm.contains(ch)) perm.add(ch);
                    operands.append(ch);
                    tmp.delete(0, tmp.length());
                }
            }
            nums.add((long) Integer.parseInt(String.valueOf(tmp)));
            
            // 순열 생성
            makePerm(0, perm.size(), perm.size());
            
            return answer;
        }
        
        private void makePerm(int depth, int n, int r) {
            if (depth == r) {
                compute(n);
                return;
            }

            for (int i = depth; i < n; i++) {
                Collections.swap(perm, depth, i);
                makePerm(depth + 1, n, r);
                Collections.swap(perm, depth, i);
            }
        }
        
        private void compute(int n) {
            ArrayList<Long> numbers = new ArrayList<>(nums);
            // 연산자 임시 배열이 필요
            // string은 각 문자별 위치 조회가 가능하지만, 요소 삭제가 안됨
            // arrayList는 요소 삭제가 용이하지만, 위치 조회가 안됨
            StringBuilder tmpOps = new StringBuilder(operands);

            for (char p : perm) {
                int idx = tmpOps.indexOf(String.valueOf(p));
                while(idx != -1) {
                    long n1 = numbers.get(idx);
                    long n2 = numbers.get(idx+1);

                    numbers.set(idx, calculator(n1,n2,p));
                    numbers.remove(idx+1);
                    tmpOps.deleteCharAt(idx);

                    idx = tmpOps.indexOf(String.valueOf(p));
                }
            }

            long sum = Math.abs(numbers.get(0));
            if (answer < sum) answer = sum;
        }
        
        private long calculator(long n1, long n2, char op) {
            return switch (op) {
                case '-' -> n1 - n2;
                case '+' -> n1 + n2;
                case '*' -> n1 * n2;
                default -> 0;
            };
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 

### 📕 출처
Programmers : https://programmers.co.kr/learn/courses/30/lessons/67258
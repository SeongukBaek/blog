---
title: "👩‍💻 67257. 수식 최대화"
description: "알고리즘 문제 풀기"
date: 2022-04-28
update: 2022-04-28
tags:
  - 순열
series: "👩‍💻 Programmers"
---

## 문제
IT 벤처 회사를 운영하고 있는 라이언은 매년 사내 해커톤 대회를 개최하여 우승자에게 상금을 지급하고 있습니다.
이번 대회에서는 우승자에게 지급되는 상금을 이전 대회와는 다르게 다음과 같은 방식으로 결정하려고 합니다.
해커톤 대회에 참가하는 모든 참가자들에게는 숫자들과 3가지의 연산문자(+, -, *) 만으로 이루어진 연산 수식이 전달되며, 참가자의 미션은 전달받은 수식에 포함된 연산자의 우선순위를 자유롭게 재정의하여 만들 수 있는 가장 큰 숫자를 제출하는 것입니다.
단, 연산자의 우선순위를 새로 정의할 때, 같은 순위의 연산자는 없어야 합니다. 즉, + > - > * 또는 - > * > + 등과 같이 연산자 우선순위를 정의할 수 있으나 +,* > - 또는 * > +,-처럼 2개 이상의 연산자가 동일한 순위를 가지도록 연산자 우선순위를 정의할 수는 없습니다. 수식에 포함된 연산자가 2개라면 정의할 수 있는 연산자 우선순위 조합은 2! = 2가지이며, 연산자가 3개라면 3! = 6가지 조합이 가능합니다.
만약 계산된 결과가 음수라면 해당 숫자의 절댓값으로 변환하여 제출하며 제출한 숫자가 가장 큰 참가자를 우승자로 선정하며, 우승자가 제출한 숫자를 우승상금으로 지급하게 됩니다.

예를 들어, 참가자 중 네오가 아래와 같은 수식을 전달받았다고 가정합니다.

"100-200*300-500+20"

일반적으로 수학 및 전산학에서 약속된 연산자 우선순위에 따르면 더하기와 빼기는 서로 동등하며 곱하기는 더하기, 빼기에 비해 우선순위가 높아 * > +,- 로 우선순위가 정의되어 있습니다.
대회 규칙에 따라 + > - > * 또는 - > * > + 등과 같이 연산자 우선순위를 정의할 수 있으나 +,* > - 또는 * > +,- 처럼 2개 이상의 연산자가 동일한 순위를 가지도록 연산자 우선순위를 정의할 수는 없습니다.
수식에 연산자가 3개 주어졌으므로 가능한 연산자 우선순위 조합은 3! = 6가지이며, 그 중 + > - > * 로 연산자 우선순위를 정한다면 결괏값은 22,000원이 됩니다.
반면에 * > + > - 로 연산자 우선순위를 정한다면 수식의 결괏값은 -60,420 이지만, 규칙에 따라 우승 시 상금은 절댓값인 60,420원이 됩니다.

참가자에게 주어진 연산 수식이 담긴 문자열 expression이 매개변수로 주어질 때, 우승 시 받을 수 있는 가장 큰 상금 금액을 return 하도록 solution 함수를 완성해주세요.

### 제한사항
- expression은 길이가 3 이상 100 이하인 문자열입니다.
- expression은 공백문자, 괄호문자 없이 오로지 숫자와 3가지의 연산자(+, -, *) 만으로 이루어진 올바른 중위표기법(연산의 두 대상 사이에 연산기호를 사용하는 방식)으로 표현된 연산식입니다. 잘못된 연산식은 입력으로 주어지지 않습니다.
  - 즉, "402+-561*"처럼 잘못된 수식은 올바른 중위표기법이 아니므로 주어지지 않습니다.
- expression의 피연산자(operand)는 0 이상 999 이하의 숫자입니다.
  - 즉, "100-2145*458+12"처럼 999를 초과하는 피연산자가 포함된 수식은 입력으로 주어지지 않습니다.
  - "-56+100"처럼 피연산자가 음수인 수식도 입력으로 주어지지 않습니다.
- expression은 적어도 1개 이상의 연산자를 포함하고 있습니다.
- 연산자 우선순위를 어떻게 적용하더라도, expression의 중간 계산값과 최종 결괏값은 절댓값이 263 - 1 이하가 되도록 입력이 주어집니다.
- 같은 연산자끼리는 앞에 있는 것의 우선순위가 더 높습니다.

### 입출력 예
|expression|return|
|:---:|:---:|:---:|
|"100-200*300-500+20"|60420|
|"50\*6-3\*2"|300|

### 📍 **Logic**

```java
private void compute(int n) {
    ArrayList<Long> numbers = new ArrayList<>(nums);
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
```

- 수식의 숫자들을 저장하고 있는 `nums` 을 복사한 `numbers` 와 연산자들을 순서대로 저장하는 `operands` 를 복사한 `tmpOps` 를 사용한다.
  - 이후 계산 시 숫자와 연산자를 배열에서 삭제하기 위해 임시 저장소를 사용한다.
- 우선 순위대로 연산자를 저장한 `perm` 을 탐색하면서, 해당 연산자의 위치를 기준으로 숫자들을 계산하고, 대치한 후, 삭제한다.

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
- 연산자에 대한 순열이 필요하다는 점은 쉽게 알았지만, 이후 계산을 구현하는데 시간을 너무 많이 썼다.
- 아직 자바에 대한 공부가 더 필요할 것 같다. (`String`, `StringBuilder`, `ArrayList<String>` 에서 사용하는 메소드)

### 📕 출처
Programmers : https://programmers.co.kr/learn/courses/30/lessons/67257
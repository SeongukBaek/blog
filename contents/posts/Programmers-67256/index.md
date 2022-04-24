---
title: "👩‍💻 67256. 키패드 누르기"
description: "알고리즘 문제 풀기"
date: 2022-04-24
update: 2022-04-24
tags:
  - 수학
series: "👩‍💻 Programmers"
---

## 문제
스마트폰 전화 키패드의 각 칸에 숫자들이 적혀 있습니다.

이 전화 키패드에서 왼손과 오른손의 엄지손가락만을 이용해서 숫자만을 입력하려고 합니다.
맨 처음 왼손 엄지손가락은 * 키패드에 오른손 엄지손가락은 # 키패드 위치에서 시작하며, 엄지손가락을 사용하는 규칙은 다음과 같습니다.

- 엄지손가락은 상하좌우 4가지 방향으로만 이동할 수 있으며 키패드 이동 한 칸은 거리로 1에 해당합니다.
- 왼쪽 열의 3개의 숫자 1, 4, 7을 입력할 때는 왼손 엄지손가락을 사용합니다.
- 오른쪽 열의 3개의 숫자 3, 6, 9를 입력할 때는 오른손 엄지손가락을 사용합니다.
- 가운데 열의 4개의 숫자 2, 5, 8, 0을 입력할 때는 두 엄지손가락의 현재 키패드의 위치에서 더 가까운 엄지손가락을 사용합니다.
  - 만약 두 엄지손가락의 거리가 같다면, 오른손잡이는 오른손 엄지손가락, 왼손잡이는 왼손 엄지손가락을 사용합니다.

순서대로 누를 번호가 담긴 배열 numbers, 왼손잡이인지 오른손잡이인 지를 나타내는 문자열 hand가 매개변수로 주어질 때, 각 번호를 누른 엄지손가락이 왼손인 지 오른손인 지를 나타내는 연속된 문자열 형태로 return 하도록 solution 함수를 완성해주세요.

### 제한사항
- numbers 배열의 크기는 1 이상 1,000 이하입니다.
- numbers 배열 원소의 값은 0 이상 9 이하인 정수입니다.
- hand는 "left" 또는 "right" 입니다.
- "left"는 왼손잡이, "right"는 오른손잡이를 의미합니다.
- 왼손 엄지손가락을 사용한 경우는 L, 오른손 엄지손가락을 사용한 경우는 R을 순서대로 이어붙여 문자열 형태로 return 해주세요.

### 입출력 예
|numbers|hand|return|
|:---:|:---:|:---:|
|[1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5]|"right"|"LRLLLRLLRRL"|
|[7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2]|"left"|"LRLLRRLLLRR"|
|[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]|"right"|"LLRLLRLLRL"|

### 📍 **Logic**

```java
int leftDist = Math.abs(number.x - left.x) + Math.abs(number.y - left.y);
int rightDist = Math.abs(number.x - right.x) + Math.abs(number.y - right.y);
```

- 각 엄지손가락과 누를 번호의 거리를 계산한다.

### 📄 **CODE**

<details>
  <summary>코드 보기/접기💫</summary>
    <div markdown="1">

	import java.util.*;

    class Pair {
        int x;
        int y;
        
        public Pair(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    class Solution {
        // 각 엄지 위치
        Pair left = new Pair(3, 0);
        Pair right = new Pair(3, 2);
        // 누를 번호 위치
        Pair number = new Pair(0, 0);
        
        public String solution(int[] numbers, String hand) {
            StringBuilder answer = new StringBuilder();
            
            for (int n : numbers) {
                if (n == 1 || n == 4 || n == 7) {
                    answer.append("L");
                    left.x = n/3;
                    left.y = 0;
                }
                else if (n == 3 || n == 6 || n == 9) {
                    answer.append("R");
                    right.x = n/3 - 1;
                    right.y = 2;
                }
                else answer.append(thumb(hand, n));
            }
            
            return answer.toString();
        }
        
        // 2, 5, 8, 0에 대해서는 거리 계산과 잡이 정보가 필요
        private String thumb(String hand, int n) {
            if (n == 0) n = 11;
            
            // 현재 눌러야 하는 번호의 위치
            number.x = (n - 1)/3;
            number.y = (n - 1)%3;

            // 가까운 엄지를 찾기 위해 거리 계산
            int leftDist = Math.abs(number.x - left.x) + Math.abs(number.y - left.y);
            int rightDist = Math.abs(number.x - right.x) + Math.abs(number.y - right.y);
            
            // 차이가 같은 경우, 잡이 정보에 따라 반환
            if (leftDist == rightDist) {
                if (hand.equals("left")) {
                    updateThumb(left);
                    return "L";
                }
                updateThumb(right);
                return "R";
            } else {
                // 차이가 다른 경우
                if (leftDist < rightDist) {
                    updateThumb(left);
                    return "L";
                }
                updateThumb(right);
                return "R";
            }
        }
        
        private void updateThumb(Pair thumb) {
            thumb.x = number.x;
            thumb.y = number.y;
        }
    }
  	</div>
</details>

### ✏️ **Review**
- 처음에는 무작정으로 구현했으나, 번호 간 거리를 구하는 깔끔한 방법이 있을 것 같아서 고민하다가 피타고라스에서 세 점 간 거리 구하듯 거리를 구하면 될 것 같아 구현해보았다.
- 처음에는 2차원 배열에 각 키패드 번호들을 저장해두고 좌표를 사용할까 했는데, 주어진 번호로부터 좌표를 바로 얻어낼 수 있을 것 같아 배열을 지웠다.

### 📕 출처
Programmers : https://programmers.co.kr/learn/courses/30/lessons/67256
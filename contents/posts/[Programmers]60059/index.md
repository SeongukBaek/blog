---
title: "ð©âð» 60059. ìë¬¼ì ì ì´ì "
description: "ìê³ ë¦¬ì¦ ë¬¸ì  íê¸°"
date: 2022-06-12
update: 2022-06-12
tags:
  - êµ¬í
series: "ð©âð» Programmers"
---

## ë¬¸ì 
[Programmers - ìë¬¼ì ì ì´ì ](https://programmers.co.kr/learn/courses/30/lessons/60059)

### ð **Logic**

```java
for (int r = 0; r < M - 1 + N; r++) {
    for (int c = 0; c < M - 1 + N; c++) {
        for (int rotate = 0; rotate < 4; rotate++) {
            // ìë¬¼ì ë¥¼ ì¤ìì ëê³ , í¤ë¥¼ ëë ¤ê°ë©´ì íì¸í  í° ë°°ì´ ì ì¸
            bigMap = new int[N + (M - 1) * 2][N + (M - 1) * 2];

            // ìë¬¼ì ë¥¼ ì¤ìì ë°°ì¹
            for (int i = 0; i < N; i++)
                System.arraycopy(lock[i], 0, bigMap[M - 1 + i], M - 1, N);

            // bigMapì í¤ë¥¼ ëí´ ìë¬¼ì ì ë§ëì§ íì¸í  ê²
            match(key, r, c);
            if (canUnlock()) return true;
        }
    }
}
```

- ì ì²´ íë¦ì, 
  - ìë¬¼ì ì í¤ë¥¼ ë ì ìë í° 2ì°¨ì ë°°ì´ì ì ì¸íê³ , 
  - ìë¬¼ì ë¥¼ ì¤ìì ë ì±ë¡, í¤ë¥¼ ëë ¤ê°ë©´ì ë§ì¶°ë³´ê³ , ì ê¸ í´ì ê° ê°ë¥íì§ íì¸íë¤.

### ð **CODE**

<details>
  <summary>ì½ë ë³´ê¸°/ì ê¸°ð«</summary>
    <div markdown="1">

	import java.util.*;

    class Solution {
        static int M;
        static int N;
        static int[][] bigMap;
        
        public boolean solution(int[][] key, int[][] lock) {  
            M = key.length;
            N = lock.length;
            
            for (int r = 0; r < M - 1 + N; r++) {
                for (int c = 0; c < M - 1 + N; c++) {
                    for (int rotate = 0; rotate < 4; rotate++) {
                        // ìë¬¼ì ë¥¼ ì¤ìì ëê³ , í¤ë¥¼ ëë ¤ê°ë©´ì íì¸í  í° ë°°ì´ ì ì¸
                        bigMap = new int[N + (M - 1) * 2][N + (M - 1) * 2];

                        // ìë¬¼ì ë¥¼ ì¤ìì ë°°ì¹
                        for (int i = 0; i < N; i++)
                            System.arraycopy(lock[i], 0, bigMap[M - 1 + i], M - 1, N);

                        // bigMapì í¤ë¥¼ ëí´ ìë¬¼ì ì ë§ëì§ íì¸í  ê²
                        match(key, r, c);
                        if (canUnlock()) return true;
                    }
                }
            }
            
            return false;
        }
        
        // bigMapì´ 1ë¡ë§ ì´ë£¨ì´ì§ëì§ íì¸
        static private boolean canUnlock() {
            for (int i = 0; i < N; i++)
                for (int j = 0; j < N; j++)
                    if (bigMap[M - 1 + i][M - 1 + j] != 1) return false;
            return true;
        }

        // í¤ì ìë¬¼ì ë¥¼ ëíë í¨ì
        static private void match(int[][] key, int r, int c) {
            key = rotatingKey(key);

            for (int i = 0; i < M; i++)
                for (int j = 0; j < M; j++)
                    bigMap[i + r][j + c] += key[i][j];
        }
        
        // í¤ë¥¼ ìê³ë°©í¥ì¼ë¡ 90ë ëë¦¬ë í¨ì
        static private int[][] rotatingKey(int[][] key) {
            for (int i = 0; i < M / 2; i++) {
                int[] tmp = Arrays.copyOf(key[M - i - 1], M);
                key[M - i - 1] = key[i];
                key[i] = tmp;
            }

            for (int i = 0; i < M; i++) {
                for (int j = i; j < M; j++) {
                    int temp = key[i][j];
                    key[i][j] = key[j][i];
                    key[j][i] = temp;
                }
            }

            return key;
        }
    }
  	</div>
</details>

### âï¸ **Review**
- ì´ë² ì£¼ì°¨ ë¬¸ì  ì¤ìì ì ì¼ ì´ë ¤ì ë ë¬¸ì 
- êµ¬íì´ ê¹ëíê² ì´ë¤ì§ì§ ìì íì´ ììì ë³´ë, ìëì ê°ì ì ê¸°í íì´ë¥¼ ë³¼ ì ììë¤.
  - í¤ë¥¼ ëë¦¬ì§ ìê³  ì¸ë±ì¤ ì ê·¼ì¼ë¡ êµ¬í
  - ìë¬¼ì ë¥¼ ì¤ìì ëê³ , í¤ë¥¼ ì¬ë¬ ë°©ë©´ìì ëí´ë³¼ ì ìë í° ë°°ì´ ì ì¸
- ì´ë° êµ¬í ë¬¸ì ë ë¨¸ë¦¬ë¥¼ ì¢ ì êµ´ë¦´ ì¤ ììì¼ í  ê² ê°ë¤...
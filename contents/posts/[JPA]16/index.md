---
title: "๐ 16. ํธ๋์ญ์๊ณผ ๋ฝ, 2์ฐจ ์บ์"
description: "JPA ์ฑ ์ ๋ฆฌ"
date: 2022-04-12
update: 2022-04-12
tags:
  - Java
  - JPA
  - SpringBoot
series: "๐ ORM ํ์ค JPA"
---

<em>[์๋ฐ ORM ํ์ค JPA ํ๋ก๊ทธ๋๋ฐ - ๊น์ํ]์ ์ฝ๊ณ  ์ธ์ฉํ๊ณ  ์ ๋ฆฌํ๋ POST์๋๋ค.</em>

## ๐ซ ํธ๋์ญ์๊ณผ ๋ฝ
### โฐ ํธ๋์ญ์๊ณผ ๊ฒฉ๋ฆฌ ์์ค
ํธ๋์ญ์์ ACID๋ผ ํ๋ ์์์ฑ, ์ผ๊ด์ฑ, ๊ฒฉ๋ฆฌ์ฑ, ์ง์์ฑ์ ๋ณด์ฅํด์ผ ํ๋ค.
- **์์์ฑ**(Atomicity): ํธ๋์ญ์ ๋ด์์ ์คํํ ์์๋ค์ ํ๋์ ์์์ธ ๊ฒ์ฒ๋ผ ๋ชจ๋ ์ฑ๊ณตํ๋ ๊ฐ ์คํจํด์ผ ํ๋ค.
- **์ผ๊ด์ฑ**(Consistency): ๋ชจ๋  ํธ๋์ญ์์ ์ผ๊ด์ฑ์๋ ๋ฐ์ดํฐ๋ฒ ์ด์ค ์ํ๋ฅผ ์ ์งํด์ผ ํ๋ค.
- **๊ฒฉ๋ฆฌ์ฑ**(Isolation): ๋์์ ์คํ๋๋ ํธ๋์ญ์๋ค์ด ์๋ก์๊ฒ ์ํฅ์ ๋ฏธ์น์ง ์๋๋ก ๊ฒฉ๋ฆฌํ๋ค. ๊ฒฉ๋ฆฌ์ฑ์ ๋์์ฑ๊ณผ ๊ด๋ จ๋ ์ฑ๋ฅ ์ด์๋ก ์ธํด ๊ฒฉ๋ฆฌ ์์ค์ ์ ํํ  ์ ์๋ค.
- **์ง์์ฑ**(Durability): ํธ๋์ญ์์ ์ฑ๊ณต์ ์ผ๋ก ๋๋ด๋ฉด ๊ทธ ๊ฒฐ๊ณผ๊ฐ ํญ์ ๊ธฐ๋ก๋์ด์ผ ํ๋ค. ์์คํ์ ๋ฌธ์ ๊ฐ ๋ฐ์ํด๋ ๋ฐ์ดํฐ๋ฒ ์ด์ค ๋ก๊ทธ ๋ฑ์ ์ฌ์ฉํด ์ฑ๊ณตํ ํธ๋์ญ์ ๋ด์ฉ์ ๋ณต๊ตฌํด์ผ ํ๋ค.

ํธ๋์ญ์ ๊ฐ ๊ฒฉ๋ฆฌ์ฑ์ ์๋ฒฝ ๋ณด์ฅ์ ์ํด์๋, ํธ๋์ญ์์ ๊ฑฐ์ ์ฐจ๋ก๋๋ก ์คํํด์ผ ํ๋ค.
- ํ์ง๋ง ์ด๋ ๊ฒ ํ๋ฉด ๋์์ฑ ์ฒ๋ฆฌ ์ฑ๋ฅ์ด ๋งค์ฐ ๋๋น ์ง๋ค. ๋ฐ๋ผ์ ํธ๋์ญ์ ํ์ค์ 4๋จ๊ณ๋ก ๋๋  ์ ์ํ๋ค.

**๐ ํธ๋์ญ์ ๊ฒฉ๋ฆฌ ์์ค**<br/>
- READ UNCOMMITED(์ปค๋ฐ๋์ง ์์ ์ฝ๊ธฐ)
- READ COMMITTED(์ปค๋ฐ๋ ์ฝ๊ธฐ)
- REPEATABLE READ(๋ฐ๋ณต ๊ฐ๋ฅํ ์ฝ๊ธฐ)
- SERIALIZABLE(์ง๋ ฌํ ๊ฐ๋ฅ)

์์๋๋ก ๊ฒฉ๋ฆฌ ์์ค์ด ๋์์ง๋ค. ๋ฎ์ ์๋ก ๋์์ฑ์ ์ฆ๊ฐํ์ง๋ง, ์๋์ ๊ฐ์ ๋ฌธ์ ์ ์ด ์๋ค.

|๊ฒฉ๋ฆฌ ์์ค|DIRTY READ|NON-REPEATABLE READ|PHANTOM READ|
|:---:|:---:|:---:|:---:|
|READ UNCOMMITED|O|O|O|
|READ COMMITTED||O|O|
|REPEATABLE READ|||O|
|SERIALIZABLE||||

**READ UNCOMMITED**
- ์ปค๋ฐํ์ง ์์ ๋ฐ์ดํฐ๋ฅผ ์ฝ์ ์ ์๋ค. ex. ํธ๋์ญ์1์ด ๋ฐ์ดํฐ๋ฅผ ์์ ํ๊ณ  ์์ ๋, ์ปค๋ฐํ์ง ์์๋ ํธ๋์ญ์2๊ฐ ์์  ์ค์ธ ๋ฐ์ดํฐ๋ฅผ ์กฐํํ  ์ ์๋ค.
  - ์ด๋ฅผ **DIRTY READ**๋ผ ํ๋ค.
- ํธ๋์ญ์2๊ฐ DIRTY READํ ๋ฐ์ดํฐ๋ฅผ ์ฌ์ฉํ๋๋ฐ ํธ๋์ญ์1์ ๋กค๋ฐฑํ๋ฉด ๋ฐ์ดํฐ ์ ํฉ์ฑ์ ์ฌ๊ฐํ ๋ฌธ์ ๊ฐ ๋ฐ์ํ  ์ ์๋ค.

> DIRTY READ๋ฅผ ํ์ฉํ๋ ๊ฒฉ๋ฆฌ ์์ค

**READ COMMITTED**
- ์ปค๋ฐํ ๋ฐ์ดํฐ๋ง ์ฝ์ ์ ์๋ค. ๋ฐ๋ผ์ DIRTY READ๋ ๋ฐ์ํ์ง ์๋๋ค.
  - ํ์ง๋ง NON-REPEATABLE READ๋ ๋ฐ์ํ  ์ ์๋ค. ex. ํธ๋์ญ์1์ด ํ์ A๋ฅผ ์กฐํ ์ค์ธ๋ฐ, ๊ฐ์๊ธฐ ํธ๋์ญ์2๊ฐ ํ์ A๋ฅผ ์์ ํ๊ณ  ์ปค๋ฐํ๋ฉด ํธ๋์ญ์1์ด ๋ค์ ํ์ A๋ฅผ ์กฐํํ์ ๋ ์์ ๋ ๋ฐ์ดํฐ๊ฐ ์กฐํ๋๋ค.
  - ์ด์ฒ๋ผ ๋ฐ๋ณตํด์ ๊ฐ์ ๋ฐ์ดํฐ๋ฅผ ์ฝ์ ์ ์๋ ์ํ๋ฅผ **NON-REPEATABLE READ**๋ผ ํ๋ค.

> DIRTY READ๋ ํ์ฉํ์ง ์์ง๋ง, NON-REPEATABLE READ๋ ํ์ฉํ๋ ๊ฒฉ๋ฆฌ ์์ค

**REPEATABLE READ**
- ํ ๋ฒ ์กฐํํ ๋ฐ์ดํฐ๋ฅผ ๋ฐ๋ณตํด์ ์กฐํํด๋ ๊ฐ์ ๋ฐ์ดํฐ๊ฐ ์กฐํ๋๋ค. 
  - ํ์ง๋ง PHANTOM READ๋ ๋ฐ์ํ  ์ ์๋ค. ex. ํธ๋์ญ์1์ด 10์ด ์ดํ์ ํ์์ ์กฐํํ๋๋ฐ ํธ๋์ญ์2๊ฐ 5์ด ํ์์ ์ถ๊ฐํ๊ณ  ์ปค๋ฐํ๋ฉด ํธ๋์ญ์1์ด ๋ค์ 10์ด ์ดํ์ ํ์์ ์กฐํํ์ ๋ ํ์ ํ๋๊ฐ ์ถ๊ฐ๋ ์ํ๋ก ์กฐํ๋๋ค.
  - ์ด์ฒ๋ผ ๋ฐ๋ณต ์กฐํ ์ ๊ฒฐ๊ณผ ์งํฉ์ด ๋ฌ๋ผ์ง๋ ๊ฒ์ **PHANTOM READ**๋ผ ํ๋ค. (์๋์น ์๊ฒ ์์ํ ๊ฒฐ๊ณผ์ ๋ค๋ฅธ ๊ฒฐ๊ณผ๋ฅผ ๋์ถ์ํด)

> NON-REPEATABLE READ๋ ํ์ฉํ์ง ์์ง๋ง, PHANTOM READ๋ ํ์ฉํ๋ ๊ฒฉ๋ฆฌ ์์ค

**SERIALIZABLE**
- ๊ฐ์ฅ ์๊ฒฉํ ํธ๋์ญ์ ๊ฒฉ๋ฆฌ ์์ค์ด๋ค. 
- PHANTOM READ๋ ๋ฐ์ํ์ง ์์ง๋ง, ๋์์ฑ ์ฒ๋ฆฌ ์ฑ๋ฅ์ด ๊ธ๊ฒฉํ ๋จ์ด์ง ์ ์๋ค.

๋๋ถ๋ถ์ ์ ํ๋ฆฌ์ผ์ด์๋ค์ ๋์์ฑ ์ฒ๋ฆฌ๋ฅผ ์ค์์ํ๋ฏ๋ก, ๋ณดํต **READ COMMITTED ๊ฒฉ๋ฆฌ ์์ค์ ๊ธฐ๋ณธ์ผ๋ก ์ฌ์ฉ**ํ๋ค.

### โฐ ๋๊ด์  ๋ฝ๊ณผ ๋น๊ด์  ๋ฝ ๊ธฐ์ด
JPA์ ์์์ฑ ์ปจํ์คํธ(1์ฐจ ์บ์)๋ฅผ ์ ์ ํ ํ์ฉํ์ฌ ๋ฐ์ดํฐ๋ฒ ์ด์ค ํธ๋์ญ์์ด READ COMMITTED ๊ฒฉ๋ฆฌ ์์ค์ด์ด๋ REPEATABLE READ๊ฐ ๊ฐ๋ฅํ๋ค.
- ๋ฌผ๋ก  ์ํฐํฐ๊ฐ ์๋ ์ค์นผ๋ผ ๊ฐ์ ์ง์  ์กฐํํ๋ฉด ์์์ฑ ์ปจํ์คํธ์ ๊ด๋ฆฌ๋ฅผ ๋ฐ์ง ๋ชปํ๋ฏ๋ก ๋ถ๊ฐ๋ฅํ๋ค.

JPA๋ ๊ฒฉ๋ฆฌ ์์ค์ READ COMMITTED๋ก ๊ฐ์ ํ๋ค. ๋ ๋์ ๊ฒฉ๋ฆฌ ์์ค์ด ํ์ํ ๊ฒฝ์ฐ ๋๊ด์  ๋ฝ๊ณผ ๋น๊ด์  ๋ฝ ์ค ํ๋๋ฅผ ์ฌ์ฉํ๋ค.

**๋๊ด์  ๋ฝ**
- ํธ๋์ญ์ ๋๋ถ๋ถ์ ์ถฉ๋์ด ๋ฐ์ํ์ง ์๋๋ค๊ณ  ๊ฐ์ ํ๋ ๋ฐฉ๋ฒ์ด๋ค.
- ๋ฐ์ดํฐ๋ฒ ์ด์ค๊ฐ ์ ๊ณตํ๋ ๋ฝ ๊ธฐ๋ฅ์ ์ฌ์ฉํ๋ ๊ฒ์ด ์๋๋ผ JPA๊ฐ ์ ๊ณตํ๋ ๋ฒ์  ๊ด๋ฆฌ ๊ธฐ๋ฅ์ ์ฌ์ฉํ๋ค.

> ์ ํ๋ฆฌ์ผ์ด์์ด ์ ๊ณตํ๋ ๋ฝ, ํธ๋์ญ์์ ์ปค๋ฐํ๊ธฐ ์ ๊น์ง๋ ํธ๋์ญ์์ ์ถฉ๋์ ์ ์ ์๋ค.

**๋น๊ด์  ๋ฝ**
- ํธ๋์ญ์์ ์ถฉ๋์ด ๋ฐ์ํ๋ค๊ณ  ๊ฐ์ ํ๊ณ  ์ฐ์  ๋ฝ์ ๊ฑธ๊ณ  ๋ณด๋ ๋ฐฉ๋ฒ์ด๋ค.

> ๋ฐ์ดํฐ๋ฒ ์ด์ค๊ฐ ์ ๊ณตํ๋ ๋ฝ, `select for update` ๊ฐ ๋ํ์ 

์ถ๊ฐ๋ก ๋ฐ์ดํฐ๋ฒ ์ด์ค ํธ๋์ญ์ ๋ฒ์๋ฅผ ๋์ด์๋ ๋ฌธ์ ๋ ์๋ค. 
- ex. ์ฌ์ฉ์ ๋ ๋ช์ด ๋์์ ์ ๋ชฉ์ด ๊ฐ์ ๊ณต์ง์ฌํญ์ ์์ ํ๋ค๊ณ  ๊ฐ์ ํ๋ค. ์ฒซ ๋ฒ์งธ ์ฌ์ฉ์๊ฐ ๋จผ์  ์์ ์๋ฃ ๋ฒํผ์ ๋๋ฅด๊ณ  ๋ ๋ฒ์งธ ์ฌ์ฉ์๊ฐ ์์ ์๋ฃ ๋ฒํผ์ ๋๋ฅด๋ฉด, ๊ฒฐ๊ณผ์ ์ผ๋ก ๋ ๋ฒ์งธ ์์ ์ฌํญ๋ง์ด ๋จ๊ฒ ๋๋ค.
  - ์ด๋ฅผ **๋ ๋ฒ์ ๊ฐฑ์  ๋ถ์ค ๋ฌธ์ **(second lost updates problem)๋ผ ํ๋ค.
  - ์ด๋ ๋ฐ์ดํฐ๋ฒ ์ด์ค ํธ๋์ญ์์ ๋ฒ์๋ฅผ ๋์ด์๋ฏ๋ก, ํธ๋์ญ์๋ง์ผ๋ก๋ ํด๊ฒฐํ  ์ ์์ด ์๋ 3๊ฐ์ง ๋ฐฉ๋ฒ ์ค ์ ํํด์ผ ํ๋ค.

1. **๋ง์ง๋ง ์ปค๋ฐ๋ง ์ธ์ ํ๊ธฐ**: ์ฒซ ๋ฒ์งธ ์ฌ์ฉ์์ ๋ด์ฉ์ ๋ฌด์ํ๊ณ , ๋ง์ง๋ง์ ์ปค๋ฐํ ์ฌ์ฉ์์ ๋ด์ฉ๋ง์ ์ธ์ ํ๋ค.
2. **์ต์ด ์ปค๋ฐ๋ง ์ธ์ ํ๊ธฐ**: ์ฒซ ๋ฒ์งธ ์ฌ์ฉ์๊ฐ ์ด๋ฏธ ์์ ์๋ฃํ์ผ๋ฏ๋ก, ๋ ๋ฒ์งธ ์ฌ์ฉ์๊ฐ ์์ ์๋ฃํ  ๋ ์ค๋ฅ๊ฐ ๋ฐ์ํ๋ค.
3. **์ถฉ๋ํ๋ ๊ฐฑ์  ๋ด์ฉ ๋ณํฉํ๊ธฐ**: ๋ ์ฌ์ฉ์์ ์์ ์ฌํญ์ ๋ณํฉํ๋ค.

๊ธฐ๋ณธ์ "๋ง์ง๋ง ์ปค๋ฐ๋ง ์ธ์ ํ๊ธฐ"์ด๋ค.
- JPA๊ฐ ์ ๊ณตํ๋ ๋ฒ์  ๊ด๋ฆฌ ๊ธฐ๋ฅ์ ์ฌ์ฉํ๋ฉด ์์ฝ๊ฒ ์ต์ด ์ปค๋ฐ๋ง ์ธ์ ํ๊ธฐ๋ฅผ ๊ตฌํํ  ์ ์๋ค.

### โฐ @Version
JPA๊ฐ ์ ๊ณตํ๋ ๋๊ด์  ๋ฝ์ ์ฌ์ฉํ๊ธฐ ์ํด `@Version` annotation์ ์ฌ์ฉํด ๋ฒ์  ๊ด๋ฆฌ ๊ธฐ๋ฅ์ ์ถ๊ฐํด์ผ ํ๋ค. `@Version` ์ ์ฉ ๊ฐ๋ฅ ํ์์ ์๋์ ๊ฐ๋ค.
- `Long (long)`
- `Integer (int)`
- `Short (short)`
- `Timestamp`

์ํฐํฐ์ ๋ฒ์  ๊ด๋ฆฌ์ฉ ํ๋๋ฅผ ์ถ๊ฐํ๊ณ  ํด๋น annotation์ ๋ถ์ฌ, ์ํฐํฐ๋ฅผ ์์ ํ  ๋๋ง๋ค ๋ฒ์ ์ด ํ๋์ฉ ์๋์ผ๋ก ์ฆ๊ฐํ๊ฒ ๋๋ค.
- ์ํฐํฐ๋ฅผ ์์ ํ  ๋, ์กฐํ ์์ ์ ๋ฒ์ ๊ณผ ์์  ์์ ์ ๋ฒ์ ์ด ๋ค๋ฅด๋ฉด ์์ธ๊ฐ ๋ฐ์ํ๋ค.

> ๋ฒ์  ์ ๋ณด๋ฅผ ์ฌ์ฉํ๋ฉด **์ต์ด ์ปค๋ฐ๋ง ์ธ์ ํ๊ธฐ**๊ฐ ์ ์ฉ๋๋ค.

**๐ ๋ฒ์  ์ ๋ณด ๋น๊ต ๋ฐฉ๋ฒ**<br/>
์ํฐํฐ๋ฅผ ์์ ํ๊ณ  ํธ๋์ญ์์ ์ปค๋ฐํ๋ฉด ์์์ฑ ์ปจํ์คํธ๋ฅผ ํ๋ฌ์ํ๋ฉด์ UPDATE ์ฟผ๋ฆฌ๋ฅผ ์คํํ๋ค.
- ์ด๋ ๋ฒ์ ์ ์ฌ์ฉํ๋ ์ํฐํฐ๋ฉด ๊ฒ์ ์กฐ๊ฑด์ ์ํฐํฐ์ ๋ฒ์  ์ ๋ณด๋ฅผ ์ถ๊ฐํ๋ค.
- ๋ฐ์ดํฐ๋ฒ ์ด์ค ๋ฒ์ ๊ณผ ์ํฐํฐ ๋ฒ์ ์ด ๊ฐ์ผ๋ฉด, ๋ฐ์ดํฐ๋ฅผ ์์ ํ๋ฉด์ ๋์์ ๋ฒ์ ๋ ํ๋ ์ฆ๊ฐ์ํจ๋ค.
  - ๋ฒ์ ์ด ๋ค๋ฅด๋ค๋ฉด, ์์ธ ๋ฐ์!
- **๋ฒ์ ์ ์ํฐํฐ์ ๊ฐ์ ๋ณ๊ฒฝํ๋ฉด ์ฆ๊ฐํ๋ค.**
  - ๊ทธ๋ฆฌ๊ณ  ๊ฐ ํ์์ธ ์๋ฒ ๋๋ ํ์๊ณผ ๊ฐ ํ์ ์ปฌ๋ ์์ ๊ฐ๋์ ์ํฐํฐ์ ๊ฐ์ด๋ฏ๋ก ์ด ๋ํ ๋ฒ์ ์ด ์ฆ๊ฐํ๋ค.
  - ๋จ ์ฐ๊ด๊ด๊ณ ํ๋๋ ์ธ๋ ํค๋ฅผ ๊ด๋ฆฌํ๋ **์ฐ๊ด๊ด๊ณ์ ์ฃผ์ธ ํ๋๋ฅผ ์์ ํ  ๋๋ง ๋ฒ์ ์ด ์ฆ๊ฐ**ํ๋ค.

> ๋ฒํฌ ์ฐ์ฐ์ ๋ฒ์ ์ ๋ฌด์ํ๋ค. ๋ฒ์  ์ฆ๊ฐ๋ฅผ ์ํด์๋ ๋ฒ์  ํ๋๋ฅผ ๊ฐ์ ๋ก ์ฆ๊ฐ์์ผ์ผ ํ๋ค.

### โฐ JPA ๋ฝ ์ฌ์ฉ
> JPA ์ถ์ฒ ์ ๋ต์ READ COMMITTED ๊ฒฉ๋ฆฌ ์์ค + ๋๊ด์  ๋ฒ์  ๊ด๋ฆฌ(๋ ๋ฒ์ ๊ฐฑ์  ๋ด์ญ ๋ถ์ค ๋ฌธ์  ์๋ฐฉ)

๋ฝ์ ๋ค์ ์์น์ ์ ์ฉํ  ์ ์๋ค.
- `EntityManager.lock()` , `EntityManager.find()` , `EntityManager.refresh()`
- `Query.setLockMode()` (`TypedQuery`)
- `@NamedQuery`
- ์กฐํํ๋ฉด์ ์ฆ์ ๋ฝ์ ๊ฑธ ์๋ ์๊ณ , ํ์ํ  ๋ ๋ฝ์ ๊ฑธ ์ ์๋ค.

> JPA๊ฐ ์ ๊ณตํ๋ ๋ฝ ์ต์์ `javax.persistence.LockModeType` ์ ์ ์๋์ด ์๋ค.

### โฐ JPA ๋๊ด์  ๋ฝ
JPA๊ฐ ์ ๊ณตํ๋ ๋๊ด์  ๋ฝ์ ๋ฒ์ (`@Version`)์ ์ฌ์ฉํ๋ค.
- ๋๊ด์  ๋ฝ์ ํธ๋์ญ์์ ์ปค๋ฐํ๋ ์์ ์ ์ถฉ๋์ ์ ์ ์๋ค๋ ํน์ง์ด ์๋ค.
- ๋ฐ์ํ๋ ์์ธ๋ ๋ค์๊ณผ ๊ฐ๋ค.
  - `javax.persistence.OptimisticLockException` (JPA ์์ธ)
  - `org.hibernate.StaleObjectStateException` (Hibernate ์์ธ)
  - `org.springframework.orm.ObjectOptimisticLockingFailureException` (์คํ๋ง ์์ธ ์ถ์ํ)

> ๋ฝ ์ต์ ์์ด `@Version` ๋ง ์์ด๋ ๋๊ด์  ๋ฝ์ด ์ ์ฉ๋๋ค.

**๐ NONE**<br/>
๋ฝ ์ต์์ ์ ์ฉํ์ง ์์๋ ์ํฐํฐ์ `@Version` ์ด ์ ์ฉ๋ ํ๋๋ง ์์ผ๋ฉด ๋๊ด์  ๋ฝ์ด ์ ์ฉ๋๋ค.
- ์ฉ๋: ์กฐํํ ์ํฐํฐ๋ฅผ ์์ ํ  ๋ ๋ค๋ฅธ ํธ๋์ญ์์ ์ํด ๋ณ๊ฒฝ(์ญ์ )๋์ง ์์์ผ ํ๋ค. ์กฐํ ์์ ๋ถํฐ ์์  ์์ ๊น์ง๋ฅผ ๋ณด์ฅํ๋ค.
- ๋์: ์ํฐํฐ๋ฅผ ์์ ํ  ๋ ๋ฒ์ ์ ์ฒดํฌํ๋ฉด์ ๋ฒ์ ์ ์ฆ๊ฐํ๋ค. ์ด๋ ๋ฒ์ ์ด ๋ค๋ฅด๋ฉด ์์ธ๊ฐ ๋ฐ์ํ๋ค.
- ์ด์ : ๋ ๋ฒ์ ๊ฐฑ์  ๋ถ์ค ๋ฌธ์ ๋ฅผ ์๋ฐฉํ๋ค.

**๐ OPTIMISTIC**<br/>
`@Version` ๋ง ์ ์ฉํ๋ฉด ์ํฐํฐ๋ฅผ ์์ ํด์ผ ๋ฒ์ ์ ์ฒดํฌํ์ง๋ง, ์ด ์ต์์ ์ถ๊ฐํ๋ฉด ์ํฐํฐ๋ฅผ ์กฐํ๋ง ํด๋ ๋ฒ์ ์ ์ฒดํฌํ๋ค.
- ํ ๋ฒ ์กฐํํ ์ํฐํฐ๋ ํธ๋์ญ์์ ์ข๋ฃํ  ๋๊น์ง ๋ค๋ฅธ ํธ๋์ญ์์์ ๋ณ๊ฒฝํ์ง ์์์ ๋ณด์ฅํ๋ค.
- ์ฉ๋: ์กฐํํ ์ํฐํฐ๋ ํธ๋์ญ์์ด ๋๋  ๋๊น์ง ๋ค๋ฅธ ํธ๋์ญ์์ ์ํด ๋ณ๊ฒฝ๋์ง ์์์ผ ํ๋ค. ์กฐํ ์์ ๋ถํฐ ํธ๋์ญ์ ์ข๋ฃ ์์ ๊น์ง ์ํฐํฐ๊ฐ ๋ณ๊ฒฝ๋์ง ์์์ ๋ณด์ฅํ๋ค.
- ๋์: ํธ๋์ญ์์ ์ปค๋ฐํ  ๋ ๋ฒ์  ์ ๋ณด๋ฅผ ์กฐํํด์ ํ์ฌ ์ํฐํฐ์ ๋ฒ์ ๊ณผ ๊ฐ์์ง ๊ฒ์ฆํ๋ค. ๋ฒ์ ์ด ๋ค๋ฅด๋ฉด ์์ธ๊ฐ ๋ฐ์ํ๋ค.
- ์ด์ : ํด๋น ์ต์์ DIRTY READ์ NON-REPEATABLE READ๋ฅผ ๋ฐฉ์งํ๋ค.

**๐ OPTIMISTIC_FORCE_INCREMENT**<br/>
๋๊ด์  ๋ฝ์ ์ฌ์ฉํ๋ฉด์ ๋ฒ์  ์ ๋ณด๋ฅผ ๊ฐ์ ๋ก ์ฆ๊ฐํ๋ค.
- ์ฉ๋: ๋ผ๋ฆฌ์ ์ธ ๋จ์์ ์ํฐํฐ ๋ฌถ์์ ๊ด๋ฆฌํ  ์ ์๋ค. ์ฐ๊ด๊ด๊ณ๋ก ๋ฌถ์ธ ์ํฐํฐ๋ค์ ๋ํ ๋ฒ์ ์ ๊ฐ์  ์ฆ๊ฐ๋ฅผ ์ํํ๋ค.
- ๋์: ์ํฐํฐ๋ฅผ ์์ ํ์ง ์์๋ ํธ๋์ญ์์ ์ปค๋ฐํ  ๋ UPDATE ์ฟผ๋ฆฌ๋ฅผ ์ฌ์ฉํด์ ๋ฒ์  ์ ๋ณด๋ฅผ ๊ฐ์ ๋ก ์ฆ๊ฐ์ํจ๋ค. ์ด๋ ๋ฒ์ ์ด ๋ค๋ฅด๋ฉด ์์ธ๊ฐ ๋ฐ์ํ๋ค.
  - ์ถ๊ฐ๋ก, ์ํฐํฐ๋ฅผ ์์ ํ๋ฉด ๋ฒ์  UPDATE๊ฐ ๋ฐ์ํ์ฌ, ์ด 2๋ฒ์ ๋ฒ์  ์ฆ๊ฐ๊ฐ ๋ํ๋  ์ ์๋ค.
- ์ด์ : ๋ผ๋ฆฌ์ ์ธ ๋จ์์ ์ํฐํฐ ๋ฌถ์์ ๊ด๋ฆฌํ  ์ ์๋ค.

### โฐ JPA ๋น๊ด์  ๋ฝ
๋ฐ์ดํฐ๋ฒ ์ด์ค ํธ๋์ญ์ ๋ฝ ๋ฉ์ปค๋์ฆ์ ์์กดํ๋ ๋ฐฉ๋ฒ์ด๋ค.
- ์ฃผ๋ก SQL ์ฟผ๋ฆฌ์ `select for update` ๊ตฌ๋ฌธ์ ์ฌ์ฉํ๋ฉด์ ์์ํ๊ณ , ๋ฒ์  ์ ๋ณด๋ ์ฌ์ฉํ์ง ์๋๋ค.
- ์ฃผ๋ก `PESSIMISTIC_WRITE` ๋ชจ๋๋ฅผ ์ฌ์ฉํ๋ค.
- ์ํฐํฐ๊ฐ ์๋ ์ค์นผ๋ผ ํ์ ์กฐํ ์์๋ ์ฌ์ฉํ  ์ ์๊ณ , ๋ฐ์ดํฐ๋ฅผ ์์ ํ๋ ์ฆ์ ํธ๋์ญ์ ์ถฉ๋์ ๊ฐ์งํ  ์ ์๋ค.
- ๋ฐ์ํ๋ ์์ธ๋ ๋ค์๊ณผ ๊ฐ๋ค.
  - `javax.persistence.PessimisticLockException` (JPA ์์ธ)
  - `org.springframework.dao.PessimisticLockingFailureException` (์คํ๋ง ์์ธ ์ถ์ํ)

**๐ PESSIMISTIC_WRITE**<br/>
์ผ๋ฐ์ ์ธ ์ต์์ผ๋ก ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์ฐ๊ธฐ ๋ฝ์ ๊ฑธ ๋ ์ฌ์ฉํ๋ค.
- ์ฉ๋: ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์ฐ๊ธฐ ๋ฝ์ ๊ฑด๋ค.
- ๋์: `select for update` ๋ฅผ ์ฌ์ฉํด์ ๋ฝ์ ๊ฑด๋ค.
- ์ด์ : NON-REPEATABLE READ๋ฅผ ๋ฐฉ์งํ๋ค. ๋ฝ์ด ๊ฑธ๋ฆฐ ๋ก์ฐ๋ ๋ค๋ฅธ ํธ๋์ญ์์ด ์์ ํ  ์ ์๋ค.

**๐ PESSIMISTIC_READ**<br/>
๋ฐ์ดํฐ๋ฅผ ๋ฐ๋ณต ์ฝ๊ธฐ๋ง ํ๊ณ  ์์ ํ๋ ์๋ ์ฉ๋๋ก ๋ฝ์ ๊ฑธ ๋ ์ฌ์ฉํ๋ค. 
- ๋ฐ์ดํฐ๋ฒ ์ด์ค ๋๋ถ๋ถ์ ๋ฐฉ์ธ์ ์ํด `PESSIMISTIC_WRITE` ๋ก ๋์ํ๋ค.
- MySQL: `lock in share mode`
- PostgreSQL: `for share`

**๐ PESSIMISTIC_FORCE_INCREMENT**<br/>
์ ์ผํ๊ฒ ๋ฒ์  ์ ๋ณด๋ฅผ ์ฌ์ฉํ๋ค. ๋ฒ์  ์ ๋ณด๋ฅผ ๊ฐ์ ๋ก ์ฆ๊ฐ์ํจ๋ค.
- Hibernate๋ `nowait` ๋ฅผ ์ง์ํ๋ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ๋ํด์ `for update nowait` ์ต์์ ์ ์ฉํ๋ค.
- `nowait` ๋ฅผ ์ง์ํ์ง ์์ผ๋ฉด `for update` ๊ฐ ์ฌ์ฉ๋๋ค.

### โฐ ๋น๊ด์  ๋ฝ๊ณผ ํ์์์
๋น๊ด์  ๋ฝ์ ์ฌ์ฉํ๋ฉด ๋ฝ์ ํ๋ํ  ๋๊น์ง ํธ๋์ญ์์ด ๋๊ธฐํ๋ค.
- ๋ฌดํ์  ๊ธฐ๋ค๋ฆฌ์ง ์๊ธฐ ์ํด ํ์์์ ์๊ฐ์ ์ค ์ ์๋ค.
- ํ์์์ ์๊ฐ๋์ ์๋ต์ด ์์ผ๋ฉด `javax.persistence.LockTimeoutException` ์์ธ๊ฐ ๋ฐ์ํ๋ค.

---

## ๐ซ 2์ฐจ ์บ์
### โฐ 1์ฐจ ์บ์์ 2์ฐจ ์บ์
์กฐํํ ๋ฐ์ดํฐ๋ฅผ ๋ฉ๋ชจ๋ฆฌ์ ์บ์ํด์ ๋ฐ์ดํฐ๋ฒ ์ด์ค ์ ๊ทผ ํ์๋ฅผ ์ค์ฌ ์ ํ๋ฆฌ์ผ์ด์ ์ฑ๋ฅ์ ํ๊ธฐ์ ์ผ๋ก ๊ฐ์ ํ  ์ ์๋ค. ์์์ฑ ์ปจํ์คํธ ๋ด๋ถ์๋ **1์ฐจ ์บ์**๊ฐ ์๋ค. ๋ง์ ์ด์ ์ด ์์ง๋ง, ์ผ๋ฐ์ ์ธ ์น ์ ํ๋ฆฌ์ผ์ด์ ํ๊ฒฝ์ ํธ๋์ญ์์ ์์ํ๊ณ  ์ข๋ฃํ  ๋๊น์ง๋ง 1์ฐจ ์บ์๊ฐ ์ ํจํ๋ค.
- OSIV๋ฅผ ์ฌ์ฉํด๋ ํด๋ผ์ด์ธํธ์ ์์ฒญ์ด ๋ค์ด์ฌ ๋๋ถํฐ ๋๋  ๋๊น์ง๋ง ์ ํจํ๋ค.
- ์ฆ, ์ ํ๋ฆฌ์ผ์ด์ ์ ์ฒด๋ก ๋ดค์ ๋, ํ๊ธฐ์ ์ด์ง ๋ชปํ๋ค.

Hibernate๋ฅผ ํฌํจํ ๋๋ถ๋ถ์ JPA ๊ตฌํ์ฒด๋ค์ ์ ํ๋ฆฌ์ผ์ด์ ๋ฒ์์ ์บ์๋ฅผ ์ง์ํ๋๋ฐ, ์ด๋ฅผ **๊ณต์  ์บ์ ๋๋ 2์ฐจ ์บ์**๋ผ ํ๋ค.
- 1์ฐจ ์บ์์ 2์ฐจ ์บ์๋ฅผ ํจ๊ป ์ฌ์ฉํ๋ค.
- 1์ฐจ ์บ์์ ์์ผ๋ฉด 2์ฐจ ์บ์, 2์ฐจ ์บ์์ ์์ผ๋ฉด ๋ฐ์ดํฐ๋ฒ ์ด์ค ์กฐํํ๋ ์์ด๋ค.

**๐ 1์ฐจ ์บ์**<br/>
์์์ฑ ์ปจํ์คํธ ๋ด๋ถ์ ์กด์ฌํ๋ ์บ์๋ก, ์ํฐํฐ ๋งค๋์ ๋ก ์กฐํํ๊ฑฐ๋ ๋ณ๊ฒฝํ๋ ๋ชจ๋  ์ํฐํฐ๋ 1์ฐจ ์บ์์ ์ ์ฅ๋๋ค. ํธ๋์ญ์์ ์ปค๋ฐํ๊ฑฐ๋ ํ๋ฌ์๋ฅผ ํธ์ถํ๋ฉด 1์ฐจ ์บ์์ ์๋ ์ํฐํฐ์ ๋ณ๊ฒฝ ๋ด์ญ์ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ๋๊ธฐํํ๋ค.

> ์์์ฑ ์ปจํ์คํธ ์์ฒด๊ฐ ์ฌ์ค์ 1์ฐจ ์บ์๋ค!

๋ค์์ 1์ฐจ ์บ์์ ๋์ ๋ฐฉ์์ด๋ค.
1. ์ต์ด ์กฐํํ  ๋๋ 1์ฐจ ์บ์์ ์ํฐํฐ๊ฐ ์์ผ๋ฏ๋ก
2. ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์ํฐํฐ๋ฅผ ์กฐํํด์
3. 1์ฐจ ์บ์์ ๋ณด๊ดํ๊ณ 
4. 1์ฐจ ์บ์์ ๋ณด๊ดํ ๊ฒฐ๊ณผ๋ฅผ ๋ฐํํ๋ค.
5. ์ดํ ๊ฐ์ ์ํฐํฐ๋ฅผ ์กฐํํ๋ฉด 1์ฐจ ์บ์์ ์๋ ์ํฐํฐ๋ฅผ ๊ทธ๋๋ก ๋ฐํํ๋ค.

**1์ฐจ ์บ์์ ํน์ง**
- ๊ฐ์ ์ํฐํฐ๊ฐ ์์ผ๋ฉด ํด๋น ์ํฐํฐ๋ฅผ ๊ทธ๋๋ก ๋ฐํํ๋ค. ์ฆ, ๊ฐ์ฒด ๋์ผ์ฑ(`a==b`)์ ๋ณด์ฅํ๋ค.
- ์์์ฑ ์ปจํ์คํธ ๋ฒ์์ ์บ์๋ค.

**๐ 2์ฐจ ์บ์**<br/>
์ ํ๋ฆฌ์ผ์ด์ ๋ฒ์์ ์บ์๋ค. ๋ฐ๋ผ์ ์ ํ๋ฆฌ์ผ์ด์์ ์ข๋ฃํ  ๋๊น์ง ์บ์๊ฐ ์ ์ง๋๋ค.

๋ค์์ 2์ฐจ ์บ์์ ๋์ ๋ฐฉ์์ด๋ค.
1. ์์์ฑ ์ปจํ์คํธ๋ ์ํฐํฐ๊ฐ ํ์ํ๋ฉด 2์ฐจ ์บ์๋ฅผ ์กฐํํ๋ค.
2. 2์ฐจ ์บ์์ ์ํฐํฐ๊ฐ ์์ผ๋ฉด ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ฅผ ์กฐํํด์
3. ๊ฒฐ๊ณผ๋ฅผ 2์ฐจ ์บ์์ ๋ณด๊ดํ๋ค.
4. 2์ฐจ ์บ์๋ ์์ ์ด ๋ณด๊ดํ๊ณ  ์๋ ์ํฐํฐ๋ฅผ ๋ณต์ฌํด์ ๋ฐํํ๋ค.
5. 2์ฐจ ์บ์์ ์ ์ฅ๋์ด ์๋ ์ํฐํฐ๋ฅผ ์กฐํํ๋ฉด ๋ณต์ฌ๋ณธ์ ๋ง๋ค์ด ๋ฐํํ๋ค.

2์ฐจ ์บ์๋ ๋์์ฑ์ ๊ทน๋ํํ๋ ค๊ณ  ์บ์ํ ๊ฐ์ฒด๋ฅผ ์ง์  ๋ฐํํ์ง ์๊ณ  ๋ณต์ฌ๋ณธ์ ๋ง๋ค์ด ๋ฐํํ๋ค.
- ์บ์ํ ๊ฐ์ฒด๋ฅผ ๊ทธ๋๋ก ๋ฐํํ๋ฉด ์ฌ๋ฌ ๊ณณ์์ ๊ฐ์ ๊ฐ์ฒด๋ฅผ ๋์์ ์์ ํ๋ ๋ฌธ์ ๊ฐ ๋ฐ์ํ  ์ ์๋ค. (์ด๋ฅผ ์ํด ๋ฝ์ ๊ฑธ๋ฉด ๋์์ฑ ์ ํ)

**2์ฐจ ์บ์์ ํน์ง**
- ์์์ฑ ์ ๋ ๋ฒ์์ ์บ์
- ์กฐํํ ๊ฐ์ฒด๋ฅผ ๊ทธ๋๋ก ๋ฐํํ์ง ์๊ณ  ๋ณต์ฌ๋ณธ์ ๋ฐํ
- ๋ฐ์ดํฐ๋ฒ ์ด์ค ๊ธฐ๋ณธ ํค๋ฅผ ๊ธฐ์ค์ผ๋ก ์บ์ํ์ง๋ง ์์์ฑ ์ปจํ์คํธ๊ฐ ๋ค๋ฅด๋ฉด ๊ฐ์ฒด ๋์ผ์ฑ(`a==b`)์ ๋ณด์ฅํ์ง ์๋๋ค.

### โฐ JPA 2์ฐจ ์บ์ ๊ธฐ๋ฅ
**๐ ์บ์ ๋ชจ๋ ์ค์ **<br/>
2์ฐจ ์บ์๋ฅผ ์ฌ์ฉํ๋ ค๋ฉด ์ํฐํฐ์ `javax.persistence.Cacheable` annotation์ ์ฌ์ฉํ๋ค. ์ดํ, `persistence.xml` ์ `shared-cache-mode` ๋ฅผ ์ค์ ํด ์ ํ๋ฆฌ์ผ์ด์ ์ ์ฒด์ ์บ์๋ฅผ ์ด๋ป๊ฒ ์ ์ฉํ ์ง ์ต์์ ์ค์ ํด์ผ ํ๋ค.

```xml
<bean id="entityManagerFactory" class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">
  <property name="sharedCacheMode" value="ENABLE_SELECTIVE" />
  ...

```

**`SharedCacheMode` ์บ์ ๋ชจ๋ ์ค์ **
|์บ์ ๋ชจ๋|์ค๋ช|
|:---:|:---:|
|ALL|๋ชจ๋  ์ํฐํฐ๋ฅผ ์บ์ํ๋ค.|
|NONE|์บ์๋ฅผ ์ฌ์ฉํ์ง ์๋๋ค.|
|**ENABLE_SELECTIVE**|**Cacheable(true)๋ก ์ค์ ๋ ์ํฐํฐ๋ง ์บ์๋ฅผ ์ ์ฉํ๋ค.**|
|DISABLE_SELECTIVE|๋ชจ๋  ์ํฐํฐ๋ฅผ ์บ์ํ๋๋ฐ Cacheable(false)๋ก ๋ช์๋ ์ํฐํฐ๋ ์บ์ํ์ง ์๋๋ค.|
|UNSPECIFIED|JPA ๊ตฌํ์ฒด๊ฐ ์ ์ํ ์ค์ ์ ๋ฐ๋ฅธ๋ค.|

**๐ ์บ์ ์กฐํ, ์ ์ฅ ๋ฐฉ์ ์ค์ **<br/>
์บ์๋ฅผ ๋ฌด์ํ๊ณ  ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ฅผ ์ง์  ์กฐํํ๊ฑฐ๋ ์บ์๋ฅผ ๊ฐฑ์ ํ๋ ค๋ฉด ์บ์ ์กฐํ ๋ชจ๋์ ์บ์ ๋ณด๊ด ๋ชจ๋๋ฅผ ์ฌ์ฉํ๋ฉด ๋๋ค.

```java
em.setProperty("javax.persistence.cache.retrieveMode", CacheRetrieveMode.BYPASS);
```

์บ์ ์กฐํ ๋ชจ๋๋ ๋ณด๊ด ๋ชจ๋์ ๋ฐ๋ผ ์ฌ์ฉํ  ํ๋กํผํฐ์ ์ต์์ด ๋ค๋ฅด๋ค.
- `javax.persistence.cache.retrieveMode` : ์บ์ ์กฐํ ๋ชจ๋ ํ๋กํผํฐ ์ด๋ฆ
- `javax.persistence.cache.storeMode` : ์บ์ ๋ณด๊ด ๋ชจ๋ ํ๋กํผํฐ ์ด๋ฆ
- `javax.persistence.cache.CacheRetrieveMode` : ์บ์ ์กฐํ ๋ชจ๋ ์ค์  ์ต์ (USE, BYPASS)
- `javax.persistence.cache.CacheStoreMode` : ์บ์ ๋ณด๊ด ๋ชจ๋ ์ค์  ์ต์ (USE, BYPASS, REFRESH)

**์บ์ ์กฐํ ๋ชจ๋ ์ต์**
- USE : ์บ์์์ ์กฐํ, ๊ธฐ๋ณธ ๊ฐ
- BYPASS : ์บ์๋ฅผ ๋ฌด์ํ๊ณ  ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์ง์  ์ ๊ทผ

**์บ์ ๋ณด๊ด ๋ชจ๋ ์ต์**
- USE : ์กฐํํ ๋ฐ์ดํฐ๋ฅผ ์บ์์ ์ ์ฅ, ์ด๋ฏธ ์กด์ฌํ๋ค๋ฉด ๊ฐฑ์ ํ์ง ์๋๋ค. ํธ๋์ญ์์ ์ปค๋ฐํ๋ฉด ๋ฑ๋ก ์์ ํ ์ํฐํฐ๋ ์บ์์ ์ ์ฅ, ๊ธฐ๋ณธ ๊ฐ
- BYPASS : ์บ์์ ์ ์ฅํ์ง ์๋๋ค.
- REFRESH : USE ์ ๋ต์ ์ถ๊ฐ๋ก ๋ฐ์ดํฐ๋ฒ ์ด์ค์์ ์กฐํํ ์ํฐํฐ๋ฅผ ์ต์  ์ํ๋ก ๋ค์ ์บ์

**๐ JPA ์บ์ ๊ด๋ฆฌ API**<br/>
JPA๋ ์บ์๋ฅผ ๊ด๋ฆฌํ๊ธฐ ์ํ `Cache` interface๋ฅผ ์ ๊ณตํ๋ค.

```java
Cache cache = emf.getCache();
boolean contains = cache.contains(TestEntity.class, testEntity.getId());
System.out.println("contains = " + contains);
```

### โฐ Hibernate์ EHCACHE ์ ์ฉ
Hibernate๊ฐ ์ง์ํ๋ ์บ์๋ ํฌ๊ฒ 3๊ฐ์ง๊ฐ ์๋ค.

1. **์ํฐํฐ ์บ์** : ์ํฐํฐ ๋จ์๋ก ์บ์ํ๋ค. ์๋ณ์๋ก ์ํฐํฐ๋ฅผ ์กฐํํ๊ฑฐ๋ ์ปฌ๋ ์์ด ์๋ ์ฐ๊ด๋ ์ํฐํฐ๋ฅผ ๋ก๋ฉํ  ๋ ์ฌ์ฉํ๋ค.
2. **์ปฌ๋ ์ ์บ์** : ์ํฐํฐ์ ์ฐ๊ด๋ ์ปฌ๋ ์์ ์บ์ํ๋ค. **์ปฌ๋ ์์ด ์ํฐํฐ๋ฅผ ๋ด๊ณ  ์์ผ๋ฉด ์๋ณ์ ๊ฐ๋ง ์บ์ํ๋ค.**
3. **์ฟผ๋ฆฌ ์บ์** : ์ฟผ๋ฆฌ์ ํ๋ผ๋ฏธํฐ ์ ๋ณด๋ฅผ ํค๋ก ์ฌ์ฉํด์ ์บ์ํ๋ค. **๊ฒฐ๊ณผ๊ฐ ์ํฐํฐ๋ฉด ์๋ณ์ ๊ฐ๋ง ์บ์ํ๋ค.**

**๐ ํ๊ฒฝ ์ค์ **<br/>
Hibernate์์ EHCACHE๋ฅผ ์ฌ์ฉํ๋ ค๋ฉด `pom.xml` ์ `hibernate-ehcache` ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ถ๊ฐํ๋ค.
- ์ด๋ฅผ ์ถ๊ฐํ๋ฉด `net.sf.ehcache-core` ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ ์ถ๊ฐ๋๋ค.
- EHCACHE๋ `ehcache.xml` ์ ์ค์  ํ์ผ๋ก ์ฌ์ฉํ๋ค.
- ์ดํ Hibernate์ ์บ์ ์ฌ์ฉ์ ๋ณด๋ฅผ ์ค์ ํ๊ธฐ ์ํด `persistence.xml` ์ ์บ์ ์ ๋ณด๋ฅผ ์ถ๊ฐํ๋ค.

**๐ ์ํฐํฐ ์บ์์ ์ปฌ๋ ์ ์บ์**<br/>
- `javax.persistence.Cacheable` : ์ํฐํฐ๋ฅผ ์บ์ํ๋ ค๋ฉด ํด๋น annotation์ ์ ์ฉํ๋ค.
- `org.hibernate.annotations.Cache` : ํด๋น annotation์ Hibernate ์ ์ฉ์ด๋ค. `usage` ์์ฑ์ ์ด์ฉํด ์บ์์ ๊ด๋ จ๋ ๋ ์ธ๋ฐํ ์ค์ ์ ํ  ๋ ์ฌ์ฉํ๋ค.

**๐ @Cache**<br/>
์ธ๋ฐํ ์บ์ ์ค์ ์ ์ํด ์ฌ์ฉํ๋ค.
- usage : CacheConcurrencyStrategy๋ฅผ ์ฌ์ฉํด ์บ์ ๋์์ฑ ์ ๋ต์ ์ค์ ํ๋ค.
- region : ์บ์ ์ง์ญ ์ค์ 
- include : ์ฐ๊ด ๊ฐ์ฒด๋ฅผ ์บ์์ ํฌํจํ ์ง ์ ํํ๋ค. all, non-lazy ์ต์์ ์ ํํ  ์ ์๋ค. (๊ธฐ๋ณธ ๊ฐ all)

๊ฐ์ฅ ์ค์ํ ๊ฒ์ ์บ์ ๋์์ฑ ์ ๋ต์ ์ค์ ํ๋ `usage` ์์ฑ์ด๋ค.
- NONE
- READ_ONLY
- NONSTRICT_READ_WRITE
- READ_WRITE
- TRANSACTIONAL

**๐ ์บ์ ์์ญ**<br/>
์บ์๋ฅผ ์ ์ฉํ ์ฝ๋๋ ์๋ ์บ์ ์์ญ์ ์ ์ฅ๋๋ค.
- ์ํฐํฐ ์บ์ ์์ญ
- ์ปฌ๋ ์ ์บ์ ์์ญ

์ํฐํฐ ์บ์ ์์ญ์ ๊ธฐ๋ณธ๊ฐ์ผ๋ก [ํจํค์ง ๋ช + ํด๋์ค ๋ช]์ ์ฌ์ฉํ๊ณ , ์ปฌ๋ ์ ์บ์ ์์ญ์ ์ํฐํฐ ์บ์ ์์ญ ์ด๋ฆ์ ์บ์ํ ์ปฌ๋ ์์ ํ๋ ๋ช์ด ์ถ๊ฐ๋๋ค.
- ์์ญ๋ณ ์ธ๋ถ ์ค์ ์ด ๊ฐ๋ฅํ๋ค. `ehcache.xml` ์์ ์ค์ ํ  ์ ์๋ค.

**๐ ์ฟผ๋ฆฌ ์บ์**<br/>
์ฟผ๋ฆฌ ์บ์๋ ์ฟผ๋ฆฌ์ ํ๋ผ๋ฏธํฐ ์ ๋ณด๋ฅผ ํค๋ก ์ฌ์ฉํด ์ฟผ๋ฆฌ ๊ฒฐ๊ณผ๋ฅผ ์บ์ํ๋ ๋ฐฉ๋ฒ์ด๋ค.
- ์ ์ฉํ๊ธฐ ์ํด ์์์ฑ ์ ๋์ ์ค์ ์ `hibernate.cache.use_query_cache` ์ต์์ ๊ผญ `true` ๋ก ์ค์ ํด์ผ ํ๋ค.
- ์ดํ ์ฟผ๋ฆฌ ์บ์๋ฅผ ์ ์ฉํ  ์ฟผ๋ฆฌ์ `org.hibernate.cacheable` ์ `true` ๋ก ์ค์ ํ๋ ํํธ๋ฅผ ์ค๋ค.

**๐ ์ฟผ๋ฆฌ ์บ์ ์์ญ**<br/>
์ฟผ๋ฆฌ ์บ์๋ฅผ ํ์ฑํํ๋ฉด ๋ค์ ๋ ์บ์ ์์ญ์ด ์ถ๊ฐ๋๋ค.
- `org.hibernate.cache.internal.StandardQueryCache` : ์ฟผ๋ฆฌ ์บ์๋ฅผ ์ ์ฅํ๋ ์์ญ์ด๋ค. ์ฟผ๋ฆฌ, ์ฟผ๋ฆฌ ๊ฒฐ๊ณผ ์งํฉ, ์ฟผ๋ฆฌ๋ฅผ ์คํํ ์์ ์ ํ์์คํฌํ๋ฅผ ๋ณด๊ดํ๋ค.
- `org.hibernate.cache.spi.UpdateTimestampsCache` : ์ฟผ๋ฆฌ ์บ์๊ฐ ์ ํจํ์ง ํ์ธํ๊ธฐ ์ํด ์ฟผ๋ฆฌ ๋์ ํ์ด๋ธ์ ๊ฐ์ฅ ์ต๊ทผ ๋ณ๊ฒฝ ์๊ฐ์ ์ ์ฅํ๋ ์์ญ์ด๋ค. ํ์ด๋ธ ๋ช๊ณผ ํด๋น ํ์ด๋ธ์ ์ต๊ทผ ๋ณ๊ฒฝ๋ ํ์์คํฌํ๋ฅผ ๋ณด๊ดํ๋ค.

์ฟผ๋ฆฌ ์บ์๋ฅผ ์ ์ฉํ๊ณ  ๋ ํ ์ฟผ๋ฆฌ ์บ์๊ฐ ์ฌ์ฉํ๋ ํ์ด๋ธ์ ์กฐ๊ธ์ด๋ผ๋ ๋ณ๊ฒฝ์ด ์์ผ๋ฉด ๋ฐ์ดํฐ๋ฒ ์ด์ค์์ ๋ฐ์ดํฐ๋ฅผ ์ฝ์ด์ ์ฟผ๋ฆฌ ๊ฒฐ๊ณผ๋ฅผ ๋ค์ ์บ์ํ๋ค. ์ด๋ฅผ ์ ํ์ฉํ๋ฉด ๊ทน์ ์ธ ์ฑ๋ฅ ํฅ์์ด ์์ง๋ง, ๋น๋ฒํ ๋ณ๊ฒฝ์ด ๋ฐ์ํ๋ ํ์ด๋ธ์๋ ์ ์ ํ์ง ์๋ค.

**๐ ์ฟผ๋ฆฌ ์บ์์ ์ปฌ๋ ์ ์บ์์ ์ฃผ์์ **<br/>
์ฟผ๋ฆฌ ์บ์์ ์ปฌ๋ ์ ์บ์๋ ์งํฉ์ ์๋ณ์ ๊ฐ๋ง์ ์บ์ํ๋ค.
- ์ฟผ๋ฆฌ ์บ์๋ ์ปฌ๋ ์ ์บ์๋ง ์ฌ์ฉํ๊ณ  ๋์ ์ํฐํฐ์ ์ํฐํฐ ์บ์๋ฅผ ์ ์ฉํ์ง ์์ผ๋ฉด ์ฑ๋ฅ์ ๋ฌธ์ ๊ฐ ๋ฐ์ํ  ์ ์๋ค.

1. `select m from Member m` ์ฟผ๋ฆฌ๋ฅผ ์คํํ๋๋ฐ ์ฟผ๋ฆฌ ์บ์๊ฐ ์ ์ฉ๋์ด ์๋ค. ๊ฒฐ๊ณผ ์งํฉ์ 100๊ฑด์ด๋ค.
2. ๊ฒฐ๊ณผ ์งํฉ์๋ ์๋ณ์๋ง ์์ผ๋ฏ๋ก ํ ๊ฑด์ฉ ์ํฐํฐ ์บ์ ์์ญ์์ ์กฐํํ๋ค.
3. `Member` ์ํฐํฐ๋ ์ํฐํฐ ์บ์๋ฅผ ์ฌ์ฉํ์ง ์์ผ๋ฏ๋ก ํ ๊ฑด์ฉ ๋ฐ์ดํฐ๋ฒ ์ด์ค์์ ์กฐํํ๋ค.
4. ๊ฒฐ๊ตญ 100๊ฑด์ SQL์ด ์คํ๋๋ค.

๊ฒฐ๊ณผ์ ์ผ๋ก ์ต์์ ๊ฒฝ์ฐ ๊ฒฐ๊ณผ ์งํฉ ์๋งํผ์ SQL์ ์คํํ๊ฒ ๋๋ค.

> **์ฟผ๋ฆฌ ์บ์๋ ์ปฌ๋ ์ ์บ์๋ฅผ ์ฌ์ฉํ๋ฉด ๊ฒฐ๊ณผ ๋์ ์ํฐํฐ์๋ ๊ผญ ์ํฐํฐ ์บ์๋ฅผ ์ ์ฉํด์ผ ํ๋ค.**

## ๐ ์ถ์ฒ
**์๋ฐ ORM ํ์ค JPA ํ๋ก๊ทธ๋๋ฐ** - ๊น์ํ
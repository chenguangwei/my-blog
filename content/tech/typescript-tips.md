---
title: "TypeScript 实用技巧"
date: "2024-01-25"
excerpt: "分享一些 TypeScript 开发中的实用技巧和高级类型用法。"
tags: ["TypeScript", "前端", "技巧"]
language: "zh"
author: "Your Name"
---

## 类型推断

TypeScript 有强大的类型推断能力：

```typescript
// 自动推断为 string
const message = "Hello, World!";

// 自动推断为 number[]
const numbers = [1, 2, 3, 4, 5];
```

## 泛型

### 基础泛型

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

### 泛型约束

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

## 实用类型

### Partial 和 Required

```typescript
interface User {
  name: string;
  age: number;
}

type PartialUser = Partial<User>;  // 所有属性可选
type RequiredUser = Required<User>; // 所有属性必需
```

### Pick 和 Omit

```typescript
type UserName = Pick<User, 'name'>;
type UserWithoutAge = Omit<User, 'age'>;
```

## 类型守卫

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

## 总结

掌握这些技巧可以让你更好地使用 TypeScript。


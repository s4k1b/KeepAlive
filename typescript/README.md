# TypeScript

## Basics
### Why typescript ?

- *Static type checking:* Static types systems describe the shapes and behaviors of what our values will be when we run our programs. A type-checker like TypeScript uses that information and tells us when things might be going off the rails.
- *Non Exception Failure:* Typescript checks what properties of an object are existing and accessible. So, it will throw error when we try to access an object property that does not exist.
- *Types of Tooling:*TypeScript can deliver “quick fixes” to automatically fix errors, refactorings to easily re-organize code, and useful navigation features for jumping to definitions of a variable, or finding all references to a given variable.

### Why is typescript called the structurally typed type system

Because typescript is only concered with the structure and capabilities of types.

### Compiler

- *Install* - `npm i -g typescript`
- *Run* - `tsc <path to your .ts file>`
  - The compiler will compile your typescript code to javascript and generate a javascript file
  - If the typescript code produces typed errors, the compiler will show an error, although the corresponding working javascript file will be created.
  - To prevent the compiler from showing the error run `tsc --noEmitOnError <path to the .ts file>`
  - By default typscript compiler generates javascript code in ES3 (older version). We can set `target` flag to set our target javascript version. eg `tsc --target es2015 <path to the .ts file>`. This will produce javascript code in ES6.

### Strictness

There are two types of strictness supported by typescript.

- *default:* Types are optional, inference takes the most linient the most linient types and there is no checking for potential `null/undefined` values. This mode is helpful when migrating javascript to typescript. Here, typescript stays out of our way of migrating.
- *strict:* This turns the type checking of typescript from a switch to a dial. User can set different levels of strictness, based on their preference. If we are building an app from group up, it is suggested to turn the dial to maximum strictness as it will provide more helpful tooling and type checking.

Typescript has several typechecking strictness flags, that can be turned on and off individually from the command line (`strict` flag) or from the `tsconfig.json` file (`"strict": true`).

- `noImplicitAny`: prevents typescript from implicitely inferring the type of a variable to any. Typescript will throw error in that case.
- `strictNullChecks`: makes handling `undefined/null` assigning more explicit. Makes sure we do not forget to handle them.

## Everyday types

- *string*: Denotes string type variables. `let a: string = "sakib"`
- *number*: Denotes number type variables. `let a: number = 42`
- *boolean*: Denotes boolean type variables. `let a: boolean = false`
- *Array*: Denotes an array type variable line `[1, 2, 3]`. Type can be denoted by either `string[]` or `number[]`, depending on the array content. They can also be like `Array<number>`. `let arr: string[]`
- *any*: This type can be used when we do not want to go throw the process of defining a proper type. This should be avoided.

  ```ts
  let obj: any = { x: 0 };
  // None of these lines of code are errors
  obj.foo();
  obj();
  obj.bar = 100;
  obj = "hello";
  const n: number = obj;
  ```

### The type annotation of variables

In typescript we can explicitely specify the type of a variable by using `let`, `const` or `var`. eg: `let a: string = "sakib"`. But this is not required because typescript can automatically infer the type of a varibe by analyzing it's initializer.

```ts
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```

### Functions

In typescript, we can specify the types of a funciton's parameter as well as the type of it's return value. eg:

```ts
function myFunc(a: string, b: number): string {
  return `string is ${string} and number is ${number}`;
}
```

##### Anonymous functions

When a function appears in place where typescript can automatically determine how it's going to be called, it's parameters are automatically given types. This process is called *contextual typing*, because the *context* in which the function is called informs typescript what types are it's parameters. eg:

```ts
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUppercase());
  //Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUppercase());
  //Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
```

*I think, this applies to function callbacks*

### Object types

To define an object type, we simply list all it's properties along with their respective types. The type part of each property is optional, if not specified, it will be `any` type.

```ts
function printCoord(pt: {x: Number, y: Number}) {
  console.log("Coordinate is", pt.x, "and ", pt,y);
}
```

We can separate the proterties in type declaration by `,` or `;` except the last property (optional)
We can also specify optional properties by using `?` sign after the property name

```ts
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

### Union types

Typescript allows use to create new types by combining existing ones with varous operators

- We can declare a union type by using `|` operator between two types. This means that the value can be any one of those types. Each of those types are called *union memebrs*

  ```ts
  function printId(id: Number | String) {
    console.log("ID is ", id);
  }
  // OK
  printId(101);
  // OK
  printId("202");
  // Error
  printId({ myID: 22342 });
  ```

- Typescript will allow us to do certain things to a value if it's union type. The operations that are supported by all the union members are allowed to be formormed on the value by typescript.
- If we want to perform special operations for a certain type we have to type check before performing.

### Type aliases

- We can assign names to any type declarations. These are called type aliases. eg:

  ```ts
  type Point = {
    x: number,
    y: number
  }

  type ID = number | string;
  ```

- Aliases are only aliases. We can not use alias to declare different versions of the same type. When we use aliases, the aliases act like that they are replaced by type notations itself.

### Interfaces

- An interface declaration is another way of name an object type.

  ```ts
  interface Point {
    x: number;
    y: number
  }

  function printCoord(pt: Point) {
    console.log("The coordinate's x value is", pt.x);
    console.log("The coordinate's y value is", pt.y);
  }
  ```

##### Difference between `Aliases` and `Interfaces`

- Interfaces and Aliases are mostly similar with a few key differences. Allmost all the features of Interfaces are available on Aliases, the key difference is that a type alias can not be re-openend to add new properties vs an interface is always extendable.

### Type Assertions

- Type assertion is needed when typescript can not know about the exact type of something. eg: typescript knows `document.getElementById()` returns DOM object of type `HTMLElement`, but we may know that it will always return a `HTMLCanvasElement`. So, we may use type assertion to tell typescript the specific type.

  ```ts
  const canvas = document.getElementById("my_canvas") as HTMLCanvasElement;
  ```

- Typescript only allows type assertions to a more specific or a less specific type. It prevents coersions like

  ```ts
  const x = "hello" as number;

  // Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  ```

### Literal Types

- In addition to `strings` and `numbers`, we can specify specific strings or numbers in type positions.

  ```ts
  let x = "hello world"
  x = "no way"
  ```
  In this case typescript will infer the type of `x` to be `string`.

  ```ts
  let x = "hello world"
  ```
  In this case typescript will infer the type of `x` to the specific string `'hello world'`. This string is called *literal type*

- We can use multiple literal types in Union to make them more useful

  ```ts
  function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
  }
  printText("Hello, world", "left");
  printText("G'day, mate", "centre");
  //Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
  ```

- They can also be combined with non literal types
- There is one more literal type: `boolean` literals. The type `boolean` is an *alias* for *union* `true | false`.

##### Literal Interface

- When we initialize a variable with object, typescript assumes that all the properties of that object might change values later. That means it does not infer the initial property values as their literal type.

  ```ts
  const obj = { counter: 0 };
  if (someCondition) {
    obj.counter = 1;
  }
  ```

  here, typescript allows the value of `counter` to be changed. It infers the `counter` type to be `number`, not `0`.

- We can use `as const` to convert entier object to be type literals.

  ```ts
  const req = { url: "https://example.com", method: "GET"} as const;
  handleRequest(req.url, req.method);
  ```

  here, typescript forces the `url` and `method` property of `req` object to be example "https://example.com" and "GET" respectively.


### `null` and `undefined`

- `null` and `undefined` are used to signal absent or uninitialized value. In typescript their behaviour depends on the `strictNullChecks` options.

##### `strictNullChecks` off

- Values that might be `null` or `undefined` can be accessed normally and the values `null` and `undefined` can be assigned to a property of any type. This tends to be a major source of bugs. It is recommended to turn the `strictNullChecks` on.

##### `strictNullChecks` on

- While `strctNullChecks` on, when a value is `null` or `undefined` we will need to test those values before using any methods or properties on that value.

  ```ts
  function doSomething(x: string | undefined) {
    if (x === undefined) {
      // do nothing
    } else {
      console.log("Hello, " + x.toUpperCase());
    }
  }
  ```

##### Non-null Assertion Operator (Postfix `!`)

- TypeScript als has a special syntex for removing `null` and `undefined` from a tpye without doing any explicit checking. Writing `!` after any expression is effectively a type assertion that the value isn't `null` or `undefined`.

### Enums

- Enums are features added to javascript by typescript. It is not a type level feature added to javascript, rather it is somthing added to the language at runtime.
- Eunums allows for describing a value which could be one of a set of possible named constants. [Enum reference page](https://www.typescriptlang.org/docs/handbook/enums.html)


### Less Common Primitives

- `bigInt` - From ES2020 onwards, there is a primitive in JavaScript used for very large integers
- `symbol` - A primitive used to create a globally unique reference via the function `Symbol()`

## Narrowing

The process by which typescript uses type guards to narrow down the type of a value which may have multiple types is known as *Narrowing*. Example.

```js
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return new Array(padding + 1).join(" ") + input;
//                   ^ = (parameter) padding: number
  }
  return padding + input;
  //     ^ = (parameter) padding: string
}
```

### `typeof` type guards

- TypeScript uses `typeof` operator of Javascript as type guards. The return value of `typeof` is checked against the following values to perform as type guards in typescript.
  - `"string"`
  - `"number"`
  - `"bigint"`
  - `"boolean"`
  - `"symbol"`
  - `"undefined"`
  - `"object"`
  - `"function"`

**For `null` values, the `typeof` operator in javascript doesn't return `"null"`, rather it returns `object`. This may cause some missunderstanding.**

### Truthiness narrowing

- In javascript, some values are falsy values and others are truthiness values. We can pass any value through `if` or negation `!` operation to covert it to boolean according to it's truthiness value. So, the follwoing values will be converted to `false`.
  - `0`
  - `NaN`
  - `""`
  - `0n` (the `bigInt` version of zero)
  - `null`
  - `undefined`
- We can use this truthiness check before `typeof` to remove the inconvenience caused by `null` values.

### Equality narrowing

- TypeScript uses `switch` statements and equality operators like `===, !==, ==, !==` for type narrowing.

  ```ts
  function example(x: string | number, y: string | boolean) {
    if (x === y) {
      // We can now call any 'string' method on 'x' or 'y'.
      x.toUpperCase();
  //     ^ = (method) String.toUpperCase(): string
      y.toLowerCase();
  //     ^ = (method) String.toLowerCase(): string
    } else {
      console.log(x);
    //            ^ = (parameter) x: string | number
      console.log(y);
  //              ^ = (parameter) y: string | boolean
    }
  }
  ```

  `===` operator also checks if x and y have same type and the only common type between them is stirng. So, after that the type is narrowed down to string.

- These type checks can be done agians specific literal values and the narrowing will still work

  ```ts
  function printAll(strs: string | string[] | null) {
    if (strs !== null) {
      if (typeof strs === "object") {
        for (const s of strs) {
  //                    ^ = (parameter) strs: string[]
          console.log(s);
        }
      } else if (typeof strs === "string") {
        console.log(strs);
      //            ^ = (parameter) strs: string
      }
    }
  }
  ```

- The `==, !==` operators also get narrowed correctly, if we use `!=null`, it narrows the value to be not undefined and null.

### `instanceof` Narrowing

- The `instanceof` operator in javascript is also a type guard. Typescript also narrows in branches guarded by `instanceof`s.

  ```ts
  function logValue(x: Date | string) {
    if (x instanceof Date) {
      console.log(x.toUTCString());
  //              ^ = (parameter) x: Date
    } else {
      console.log(x.toUpperCase());
    //            ^ = (parameter) x: string
    }
  }
  ```

### Assignements

- We knowt that, typescript asigns a type to a variabel when it's first assigned a value. It looks at the right side of the assignment operator and assigns a type to the left side appropriately.

  ```ts
  let x = Math.random() < 0.5 ? 10 : "hello world!";
  //  ^ = let x: string | number
  x = 1;

  console.log(x);
  //          ^ = let x: number
  x = "goodbye!";

  console.log(x);
  //          ^ = let x: string
  ```

  When `x` is firsts assigned a value, the type is declared as `string | number`. So the followign two assignements are valid.


### Contorl Flow analysis

- The analysis of code base reachability is known as *control flow analysis*.
- TypeScript can use this analysis to narrow down the types.

  ```ts
  function padLeft(padding: number | string, input: string) {
    if (typeof padding === "number") {
      return new Array(padding + 1).join(" ") + input;
    }
    return padding + input;
  }
  ```

  By the time the execution reaches the last line, typescript already knows the type off padding will be `string`.

### Using Type Predicates

- We can define a user defined guard using type predicate. It's simply a function whose return type is a *type predicate*

  ```ts
  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }
  ```

  A predicate takes the form `parameterName is Type`. Where `parameterName` is the name of the parameter from the currect function signature. Anytime `isFish` is called, typescript will narrow the type to be `Fish`.

- We can also use `isFish` guard to filter between array of `Fish | Bird`.

### Discriminated Unions

- When every type in a union contains a common property with literal types, TypeScript considers that to be a *discriminated union*, and can narrow out the memebers of the union.

```ts
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;
```

- In the above example `kind` is the common property (which is considered the *discriminant* property of `Shape`). Checking whether `kind` property is `"circle"` or not will get rid of the all the types where `kind` property is not `"circle"`.

### The `never` type

- When narrowing, we can reduce the options of a union to a point where we have removed all possibilities and have nothing left, In those cases, TypeScript will use a `never` type to represent a state which shouldn't exist.

### Exhaustiveness Checking

- We can use narrowing and rely on `never` turning up to do exhaustive checking in a switch statement.

```ts
type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

- The `default` block handles the `never` types.


## Functions

TypeScript has many ways that describe how functions can be called. Let's learn about how to write types that describe functinons.

### Function Type Expressions

- This type of function type declarations are similar to arrow functions.

```ts
type GreeterFunction = (a: string) => void;
function greeter(fn: GreeterFunction) {
  fn();
}
```

### Call Signatures

- In JavaScript functions may have properties in addition to being callable. *Function type expressions* does not provide a way to describe function properties.
- If we want to describe function properties we need to use *call signatures* in an object type.

```ts
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
}

functino doSomething(fn: DescribableFunction) {
  console.log(fn.description + "returned " + fn(6));
}
```

### Constructor Signatures

- In Javascript functions can be invoked using `new` operator. These are called constructor functions.
- We can declare a function of constructor type in typescript using `new` keyword before a function *call signature*.

```ts
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

- We can also combine function *call signature* and *constructor signature* in the same interface

```ts
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}
```

### Generic Functions

- Sometimes the return value of a function is related to the function input. Suppose a function takes array as paramter and returns the first value of that array. So, if the type of the array is `any[]`, typescript can not infer the return value of the function and it defaults to `any` also.
- In typescript when we want to describe correspondance between two values (like this case) we use *generics*. It's done by declaring a *type parameter* in the function signature:
  ```ts
  function firstElement<Type>(arr: Type[]): Type {
    return arr[0];
  }
  ```
  By adding type parameter `Type` to this function and using it in two places, we've created a link between the input of the function (the array) and the output (the return value). Now, when we call the function, a more specific *type* comes out.
  ```ts
  // s is of type 'string'
  const s = firstElement(["a", "b", "c"]);
  // n is of type 'number'
  const n = firstElement([1, 2, 3])
  ```

#### Inference

- In the above example of *generic function* we didn't have to specify the `Type`, it was inferred automatically.
- We can use multiple type parameters as well

```ts
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

- Here also, typescript inferred the types of `Input` and `Output` correctly.

#### Constraints

- Sometimes we want to relate two values, but can only operate on a certain subset of values. In this case, we need to use *contraints* to limit the kinds of types that a tpe parameter can accept.
- Let's write a function that returns the longest value. To do this, we need to access to the length property of those values, for which we need to extend the `Type` parameter:

  ```ts
  function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
      return a;
    } else {
      return b;
    }
  }

  // longerArray is of type 'number[]'
  const longerArray = longest([1, 2], [1, 2, 3]);
  // longerString is of type 'string'
  const longerString = longest("alice", "bob");
  // Error! Numbers don't have a 'length' property
  const notOK = longest(10, 100);
  ```

- Without extending the type parameter, we will get error while accessing the length property, because the parameters can be some other type without any `length` property.

#### Working with Constrained Values

- While working with constrained values, we can not simple return *some* object from a function matching with the constraint.

  ```ts
  function minimumLength<Type extends { length: number }>(
    obj: Type,
    minimum: number
  ): Type {
    if (obj.length >= minimum) {
      return obj;
    } else {
      return { length: minimum };
  /*Type '{ length: number; }' is not assignable to type 'Type'.
    '{ length: number; }' is assignable to the constraint of type 'Type', but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.*/
    }
  }
  ```

- If the above example was legal, then we could write code that definitely wouldn't work

  ```ts
  // 'arr' gets value { length: 6 }
  const arr = minimumLength([1, 2, 3], 6);
  // and crashes here because arrays have
  // a 'slice' method, but not the returned object!
  console.log(arr.slice(0));
  ```

#### Specifying Type Arguments

- When working with generics, TypeScript can not always infer the intended type argumentsin a generic call.

```ts
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
```

- This will normally give error when called with two different type parameters

```ts
const arr = combine([1, 2, 3], ["hello"]);
//Type 'string' is not assignable to type 'number'.
```

- We can manually specify `Type` to avoid this:

```ts
const arr = combine<number | string>([1, 2, 3], ["hello"])
```

#### Guidlines on writing good generic functions

- Avoid too many tye parameters or using constraints where they aren't needed.
- Push type parameters down

  ```ts
  function firstElement1<Type>(arr: Type[]) {
    return arr[0];
  }

  function firstElement2<Type extends any[]>(arr: Type) {
    return arr[0];
  }

  // a: number (good)
  const a = firstElement1([1, 2, 3]);
  // b: any (bad)
  const b = firstElement2([1, 2, 3]);
  ```

- Use fewer type parameters

  ```ts
  function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
    return arr.filter(func);
  }

  function filter2<Type, Func extends (arg: Type) => boolean>(
    arr: Type[],
    func: Func
  ): Type[] {
    return arr.filter(func);
  }
  ```

- Type parameters should appear atleast twice

  ```ts
  function greet1<Str extends string>(s: Str) {
    console.log("Hello, " + s);
  }

  function greet2(s: string) {
    console.log("Hello, " + s);
  }
  ```

### Optional Parameters

- We can specify optional parameter in function signature by using the `?` operator after the parameter name.
- This will allow the function to be called without that parameter and also `undefined` can be passes as value of that parameter.

```ts
declare function f(x?: number): void;
// cut
// All OK
f();
f(10);
f(undefined);
```

- We can also pass a default value if not provided.

```ts
function f(x = 10) {
  // ...
}
```

#### Optional Parameters in Callbacks

- While working with optinal parameters and function type expressions, we can easily make the following mistake

```ts
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
```

- What we usually intend when writing `index?` as an optional parameter is that we want both of these calls to be legal:

```ts
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));
```

- Here we failt to notice that, this is function definition, not invoking of the function. The `index` is optional when we invoke the function, not when we define it.

### Function Overloads

Sometimes we need our functions to accept a variety of parameters. Let's suppose, we have function that returns a Date object. This function can either accept timeStamp or day, month, year in it's parameter. It typescrip, we can do this by declaring two or more function signatures, along with a signature that will define the function body. These extra fuction signatures are known as *Function Overloads*.

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// will give error
const d3 = makeDate(1, 3);
```

Notice that, we can not call `makeDate` with two parameters.

#### Overload signature and Implementation signature

In the above example, seeing the function implementation signature (the 3rd `makeDate`) we would assume that we can call the `makeDate` function one only two parameters. But, that is not the case. The function implemention signature can not be called directly, as it is kept hidden from the outside. So from the other two signatures of `makeDate` we have to assume that the function will either accept one parameter or three parameters.

The function implementation signature also has to be *compatible* with function overload signatures.

```ts
function fn(x: boolean): void;
// Argument type isn't right
function fn(x: string): void;

//This overload signature is not compatible with its implementation signature.
function fn(x: boolean) {}
```

```ts
function fn(x: string): string;
// Return type isn't right
function fn(x: number): boolean;

//This overload signature is not compatible with its implementation signature.
function fn(x: string | number) {
  return "oops";
}
```

#### Writing Good Overloads

Just like generics, we need to keep in mind before writing overloads that if it's actually required here. For example, let's write a function that will accept a string or an array as parameter and return it's length.

```ts
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
```

This function is fine, we can invoke it with either strings or arrays, but we can not invoke it with value with type `string | array` because typescript will resolve a function call to only one of it's overloads. In this instance we can fix it by not declaring any overloads.

```ts
function len(x: any[] | string) {
  return x.length;
}
```

#### Declaring `this` in Function

Typescrip will infer what `this` should be in a function via code flow analysis.

```ts
const user = {
  id: 123,

  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};
```
Typescrip understands that `user.becomeAdmin` function has a corresponding `this` which is the outer object `user`. This is enough for most cases. But there are a lot of cases where we need more control over what object `this` represents. Typescrip let's use declare the type of `this` in function body, as Javacript does not allow `this` to be declared as parameter.

```ts
const db = getDB();
const admins = db.filterUsers(function () {
  return this.admin;
});
```

This pattern is common with callback-style APIs, where another object typically controls when your function is called. Note that you need to use function and not arrow functions to get this behavior

### Other Types to Know About

- `void` - represents return value of a function that doesn't return anything. It's the iferred type anytime a function doesn't return anything. **Void and undefined are not same**.
- `object` - special type `object` refers to any value that isn't primitive (`string`, `number`, `boolean`, `symbol`, `null` or `undefined`). This is different from empty object type `{}` or global type `Object`.
- `unknown` - it represents any value. This is similar to `any` type, but is safer because it's not legal to perform anything with `unknow` type value.
- `never` - used when we need to specify that the function will never return any value. It specifies that the function throws error or terminates execution.
- `Function` - It's the global type `Function`, describes properties like `bind`, `call`, `apply`.

### Rest Parameters and Arguments

#### Parameters

We can define function that can take *unbounded* number of arguments using the spread operator.

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```
By default, the type annotations of these parameters are `any[]` if not specified, if specified, it has to be of the form `Array[T]` or `T[]`.

#### Arguments

We can provide a variable number of arguments from an array using spread operator when calling a function.

```ts
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

Typescript sees arrays as mutation objects, this can lead to following error

```ts
const args = [8, 5];
const angle = Math.atan2(...args);
//Expected 2 arguments, but got 0 or more.
```

It can be solved by,

```ts
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);
```

### Parameter Destructuring

We can destructure an object or array type parameter as an argument into one or more local variables in the function. The type definition of these arguments goes after the destructuring syntax.

```ts
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
```

We can use a named type here to make the code look more organized

```ts
// Same as prior example
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

### Assignability of Functions

If a variable is assigned the return value of a function which returns `void`, the type of that variable will be `void` too.
If a `type` of a function's return value is said to be `void` at definition, it can not return any value.

```ts
function f2(): void {
  // @ts-expect-error
  return true;
}

const f3 = function (): void {
  // @ts-expect-error
  return true;
};
```

## Object Types

Object types can be declared:

- Anonymous
  ```ts
  function greet(person: { name: string; age: number }) {
    return "Hello " + person.age;
  }
  ```
- Interface
  ```ts
  interface Person {
    name: string;
    age: number;
  }

  function greet(person: Person) {
    return "Hello " + person.age;
  }
  ```
- Type alias
  ```ts
  type Person = {
    name: string;
    age: number;
  };

  function greet(person: Person) {
    return "Hello " + person.age;
  }
  ```

### Property Modifiers

Each property in an object type can be modified to specify whether the property is *optional* or *readonly*;

#### Optional Properties

We can specify optional properties by using the `?` symbol at the end of their namees.

```ts
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  // ...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
```

We can also read from these optional properties, but we have to check for undefined before accessing it's value.

#### Readonly Properties

We can specify a property to be readonly by attaching `readonly` syntax before it's name.

```ts
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);

  // But we can't re-assign it.
  obj.prop = "hello";
  // Cannot assign to 'prop' because it is a read-only property.
}
```

Readonly properties can be accessed, but can not be modified or set. Readonly modifiers doesn't necessarily imply that the value is totally immutable - or in other worlds the internal contents can be changed.

```ts
interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}

function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  home.resident = {
  //Cannot assign to 'resident' because it is a read-only property.
    name: "Victor the Evictor",
    age: 42,
  };
}
```

### Extending Types

We can copy all the properties of one type to another type along with some specific extra properties using the `extend` operator.

```ts
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

Here, `AddressWithUnit` has all the properties of `BasicAddress` along with an extra property `unit`.
Interfaces an also extend multiple times.

```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

### Intersection Types

We can combine properties of two types using the `&` operator. This is called the intersection of types.

```ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

here, the `ColorfulCircle` type has all the properties of `Colorul` and `Circle` types.

```ts
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: "blue", radius: 42 });

// oops
draw({ color: "red", raidus: 42 });
// Argument of type '{ color: string; raidus: number; }' is not assignable to parameter of type 'Colorful & Circle'.
  //Object literal may only specify known properties, but 'raidus' does not exist in type 'Colorful & Circle'. Did you mean to write 'radius'?
```

### Interfaces vs. Intersections

This is basically `Interfaces` vs `Type aliases` again. We can use an `extend` clause to extend from other types in case of interfaces. In case of type aliases, we are able to do similar thing using intersections. The principle difference is how conflicts are handled, and that difference is typically one of the main reason why you'd pick one over the other between an iterface and a type alias of an itersection type.
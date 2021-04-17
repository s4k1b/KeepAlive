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
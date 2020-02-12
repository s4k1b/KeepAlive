# JavaScript trickeries

-----------------------------

## The `const` variable trickeries

If a variable is declared as `const` it cannot be re-assigned, but it can be modified.

```js
const ab = {
  a: 1,
  b: 2
}

ab = { a: 3, b: 2 } // will not work

// but

ab.a = 3 // will work
```

Same goes for Javascript arrays. **Javascript primitive variables are not mutable.** So they can only be assigned which can not be possible if they are declared as `const`.

## The Pass by Value / Pass by reference trickeries

- All primitive variables in javascript are always passed by value. So, the function always gets a new copy of the value being passed. **Any re-assignment or modification of that value inside the function will not change the original value.**

  ```js
  let a = "ab";
  let doSomething = function(a) {
    a += "cd";
    console.log(a);
    // => "abcd"
  }
  doSomething(a);

  console.log(a);
  // => "ab"
  ```

- Javascript Objects and Arrays are passed by reference. So, they can be mutated inside the function, but can not be re-assinged new value because, the reference itself is passed as a value.

  ```js
  let ab = { a: 1, b: 2 }
  let doSomething = function(a) {
    a.a = 3;
    console.log(a);
    // => { a: 3, b: 2 }
  }
  doSomething(ab);
  console.log(ab);
  // => { a: 3, b: 2 }
  ```

    ```js
  let ab = { a: 1, b: 2 }
  let doSomething = function(a) {
    a = { a: 3, b: 2 }
    console.log(a);
    // => { a: 3, b: 2 }
  }
  doSomething(ab);
  console.log(ab);
  // => { a: 1, b: 2 }
  ```
So, basically the parametes of a function act as if they are declared as `const` inside the function.
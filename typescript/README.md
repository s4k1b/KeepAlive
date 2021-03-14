# TypeScript

## Why typescript ?

- *Static type checking:* Static types systems describe the shapes and behaviors of what our values will be when we run our programs. A type-checker like TypeScript uses that information and tells us when things might be going off the rails.
- *Non Exception Failure:* Typescript checks what properties of an object are existing and accessible. So, it will throw error when we try to access an object property that does not exist.
- *Types of Tooling:*TypeScript can deliver “quick fixes” to automatically fix errors, refactorings to easily re-organize code, and useful navigation features for jumping to definitions of a variable, or finding all references to a given variable.

## Compiler

- *Install* - `npm i -g typescript`
- *Run* - `tsc <path to your .ts file>`
  - The compiler will compile your typescript code to javascript and generate a javascript file
  - If the typescript code produces typed errors, the compiler will show an error, although the corresponding working javascript file will be created.
  - To prevent the compiler from showing the error run `tsc --noEmitOnError <path to the .ts file>`
`
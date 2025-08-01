# branch exchange (BX)

consider this simple code

```c
int main() {
        /* nop */
        return 10;
}
```

produces this:
![image](/assets/8679d31db2d22a5b165c92d842214ff3d0ff3ba1b69436d093cf0b7a04125e545167bd788a2acd38cc6c210ad9477096c426cc04aa3fa264e3f6a3ef.png)

It's almost always returning from a function, like ret in some other ISAs like AArch64.

nice read:
- [https://developer.arm.com/documentation/dui0379/e/arm-and-thumb-instructions/bx](https://developer.arm.com/documentation/dui0379/e/arm-and-thumb-instructions/bx)
- [https://developer.arm.com/documentation/dui0231/b/arm-instruction-reference/arm-branch-instructions/b-and-bl](https://developer.arm.com/documentation/dui0231/b/arm-instruction-reference/arm-branch-instructions/b-and-bl)

why?
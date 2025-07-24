# analysis how printf rp2040 work under low level stuff

in order to know how printf works in rp2040 uart bridge, lets compile simple program, compile as debug, then run GDB

consider this very simple hello world

```c
#include <pico/printf.h>
#include <pico/time.h>

int main() {
    int n = 0;
    stdio_init_all();
    while (true) {
        printf("Hello, world! %d\n", n);
        sleep_ms(1000);
        n = n + 1;
    }
}
```

# analysis

![image](/assets/c9a172f5c6ce190e648f88df4af894d4d115b23d2128cad758833395f62d3f5e5d2ef9cb3dc4d695806f538fa26510bf6bc0da2b995b7fceeaff4899.png)

see?
```c
=> 0x100002b4 <+12>:    bl      0x10003a64 <__wrap_printf>
```

its call `__wrap_printf` which mean, the backend call `-Wl,--wrap=printf` internally, but if we reffer to `/home/fadhil_riyanto/git_clone/pico-sdk/src/rp2_common/pico_stdio/stdio.c:347`

![image](/assets/44f66f5c4e0c51a2c0b4bc3885079beb5de306725363b91ba2a38898bf59d0e76fe467ec3abf98eb4881aaf0ce408cf5ebd19b28747ef3720bb99107.png)

the signature is different, this function has signature 

```c
int __printflike(1, 0) PRIMARY_STDIO_FUNC(printf)(const char* format, ...)
```

so, what exactly happen?

# result
lets look at stdio.c line 289

![image](/assets/a00ffec057742b32cb76c8db0d3da75c299ceba49a218edf9d559fb31eb9ae029da9b798e2d255ca0af5754dcd7ac62929645ad3aa63155c62bf61a8.png)

when the macro `PICO_STDIO_SHORT_CIRCUIT_CLIB_FUNCS` is active, we replace the function name by `WRAPPER_FUNC(x)`, not `stdio_printf`

after that, lets jump into [https://github.com/raspberrypi/pico-sdk/blob/9a4113fbbae65ee82d8cd6537963bc3d3b14bcca/src/rp2_common/pico_platform_compiler/include/pico/platform/compiler.h#L185](https://github.com/raspberrypi/pico-sdk/blob/9a4113fbbae65ee82d8cd6537963bc3d3b14bcca/src/rp2_common/pico_platform_compiler/include/pico/platform/compiler.h#L185), very clear definition


so, basically. this function 
![image](/assets/b0dbbe24380b5411221dbffcf2cb8409180135d704b9ede610a1e8f3e032a9ce6071551b9c2628a7d85fec6dcb88aa3f8b529d15999cdf75570fdab8.png)

call `__wrap_printf`

make sense?

#
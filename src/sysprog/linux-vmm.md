# linux virtual memory map

Documentation/x86/x86_64/mm.txt

```txt

<previous description obsolete, deleted>

Virtual memory map with 4 level page tables:

0000000000000000 - 00007fffffffffff (=47 bits) user space, different per mm
hole caused by [47:63] sign extension
ffff800000000000 - ffff87ffffffffff (=43 bits) guard hole, reserved for hypervisor
ffff880000000000 - ffffc7ffffffffff (=64 TB) direct mapping of all phys. memory
ffffc80000000000 - ffffc8ffffffffff (=40 bits) hole
ffffc90000000000 - ffffe8ffffffffff (=45 bits) vmalloc/ioremap space
ffffe90000000000 - ffffe9ffffffffff (=40 bits) hole
ffffea0000000000 - ffffeaffffffffff (=40 bits) virtual memory map (1TB)
... unused hole ...
ffffec0000000000 - fffffbffffffffff (=44 bits) kasan shadow memory (16TB)
... unused hole ...
ffffff0000000000 - ffffff7fffffffff (=39 bits) %esp fixup stacks
... unused hole ...
ffffffef00000000 - fffffffeffffffff (=64 GB) EFI region mapping space
... unused hole ...
ffffffff80000000 - ffffffff9fffffff (=512 MB)  kernel text mapping, from phys 0
ffffffffa0000000 - ffffffffff5fffff (=1526 MB) module mapping space (variable)
ffffffffff600000 - ffffffffffdfffff (=8 MB) vsyscalls
ffffffffffe00000 - ffffffffffffffff (=2 MB) unused hole

Virtual memory map with 5 level page tables:

0000000000000000 - 00ffffffffffffff (=56 bits) user space, different per mm
hole caused by [56:63] sign extension
ff00000000000000 - ff0fffffffffffff (=52 bits) guard hole, reserved for hypervisor
ff10000000000000 - ff8fffffffffffff (=55 bits) direct mapping of all phys. memory
ff90000000000000 - ff91ffffffffffff (=49 bits) hole
ff92000000000000 - ffd1ffffffffffff (=54 bits) vmalloc/ioremap space
ffd2000000000000 - ffd3ffffffffffff (=49 bits) hole
ffd4000000000000 - ffd5ffffffffffff (=49 bits) virtual memory map (512TB)
... unused hole ...
ffd8000000000000 - fff7ffffffffffff (=53 bits) kasan shadow memory (8PB)
... unused hole ...
ffffff0000000000 - ffffff7fffffffff (=39 bits) %esp fixup stacks
... unused hole ...
ffffffef00000000 - fffffffeffffffff (=64 GB) EFI region mapping space
... unused hole ...
ffffffff80000000 - ffffffff9fffffff (=512 MB)  kernel text mapping, from phys 0
ffffffffa0000000 - ffffffffff5fffff (=1526 MB) module mapping space
ffffffffff600000 - ffffffffffdfffff (=8 MB) vsyscalls
ffffffffffe00000 - ffffffffffffffff (=2 MB) unused hole

Architecture defines a 64-bit virtual address. Implementations can support
less. Currently supported are 48- and 57-bit virtual addresses. Bits 63
through to the most-significant implemented bit are set to either all ones
or all zero. This causes hole between user space and kernel addresses.

The direct mapping covers all memory in the system up to the highest
memory address (this means in some cases it can also include PCI memory
holes).

vmalloc space is lazily synchronized into the different PML4/PML5 pages of
the processes using the page fault handler, with init_top_pgt as
reference.

Current X86-64 implementations support up to 46 bits of address space (64 TB),
which is our current limit. This expands into MBZ space in the page tables.

We map EFI runtime services in the 'efi_pgd' PGD in a 64Gb large virtual
memory window (this size is arbitrary, it can be raised later if needed).
The mappings are not part of any other kernel PGD and are only available
during EFI runtime calls.

The module mapping space size changes based on the CONFIG requirements for the
following fixmap section.

Note that if CONFIG_RANDOMIZE_MEMORY is enabled, the direct mapping of all
physical memory, vmalloc/ioremap space and virtual memory map are randomized.
Their order is preserved but their base will be offset early at boot time.

-Andi Kleen, Jul 2004
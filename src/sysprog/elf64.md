# ELF64

what is ELF64? ELF64 is Executable and Linkable Format for unix system (mostly), lets look the structure of elf64_hdr

this struct located at beginning of object file, the main usage is locate all other parts of object file. the header (such \*.o file contains this header)

## preface


```c
typedef struct elf64_hdr {
  unsigned char	e_ident[EI_NIDENT];	/* ELF "magic number" */
  Elf64_Half e_type;
  Elf64_Half e_machine;
  Elf64_Word e_version;
  Elf64_Addr e_entry;		/* Entry point virtual address */
  Elf64_Off e_phoff;		/* Program header table file offset */
  Elf64_Off e_shoff;		/* Section header table file offset */
  Elf64_Word e_flags;
  Elf64_Half e_ehsize;
  Elf64_Half e_phentsize;
  Elf64_Half e_phnum;
  Elf64_Half e_shentsize;
  Elf64_Half e_shnum;
  Elf64_Half e_shstrndx;
} Elf64_Ehdr;

```

code: [https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/include/uapi/linux/elf.h#n234](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/include/uapi/linux/elf.h#n234)

the ELF file is always start by this bytes `7f 45 4c 46`, which `DEL E L F`

![image](/assets/b89533896a5f2d38cf09f1354e807b4f6276057affaf8fafe54372090ba70e9fae73f4e83a156800ff863c7a4196e99a73b8ffed8a0717b694c00ad3.png)

The first 16 bytes [link](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/include/uapi/linux/elf.h#n215) is a magic number, `7f` make sure the text editor, this is not a normal file, this is binary, preventing to open the file. `45 4c 46` is a ELF signature

# ELFCLASS

This footage shown program compiled by normal gcc (my machine is 64 bit), vs compiled by `-m32`

![image](/assets/587e7d3b9bdafd01ed1a1b4cc59a9a11d6e60d773336d7827385aab80b6e453fb1c4ae17ae0f4f5feadef9a8822d51794a8f07f5f7911975eb319853.png)
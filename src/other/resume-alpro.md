# Resume alpro

## flowchart
Apa itu flowchart? simplenya, flowchat itu semacam bentuk gambar atau visual dari suatu langkah langkah algoritma. dan tentunya karna ini algoritma, maka ada step step seperti jika x maka y, lalu panah panah dari atas ke bawah, lalu input, dll. contoh flowchart cara memperbiaki lampu

![gambar](/assets/LampFlowchart.svg)

## Class
Apa itu class? class adalah cara kita mengatur kode agar scope nya bisa dipecah, misal func a isinya ada 1000 line, nah agar mudah mendebugnya, kita bisa pecah ke method method yang sangat banyak, dan juga kita tidak perlu lagi pusing dengan banyak variabel, kita cukup memakai satu varlable, lalu gunakan di seluruh class yang dinamai "property"

contoh simple, pakai property untuk nyimpan-tampilkan data,

```cpp
#include <string>
#include <iostream>

using namespace std;

class abc {
    string nama;
public:
    void set_nama(string nama) {
        this->nama = nama;
    }

    void get_nama() {
        cout << this->nama << endl;
    }
};

int main() {
    abc abc;
    abc.set_nama("fadhil");
    abc.get_nama();
}
```

## Enkapsulasi (encapsulation)
Trik atau cara agar kita bisa memberi aturan ke class/property apakah ia bisa terlihat (public)? atau tidak (private/protected) ke class.

Intinya, bagaimana cara kita agar method atau property, tidak bisa secara sembarang diakses oleh kode lain. misal kita ada class trigonometri, dan method hitung sin, tetapi didalam hitung sin tersebut, ada method kecil kecil lagi yang banyak, tetapi fungsinya seperti hanya untuk ngebantu fungsi sin menjalankan tugasnya, nah fungsi2 yang kecil tadi itu nanti dibuat private, sedangkan fungsi sin yg dipakai dimana mana, dibuat public.

contoh kecil

```cpp
#include <string>
#include <iostream>

using namespace std;

class abc {
    string nama;
private:
    void print_perkenalan() {
        cout << "perkenalkan nama saya ";
    }

public:
    void set_nama(string nama) {
        this->nama = nama;
    }

    void get_nama() {
        this->print_perkenalan();
        cout << this->nama << endl;
    }
};

int main() {
    abc abc;
    abc.set_nama("fadhil");
    abc.get_nama();
}
```

terlihat public, private? nah itu adalah contoh encapsulation.

nah, `print_perkenalan` (hanya contoh) bertindak seolah olah dia hanya internal function dari suatu class yg besar. dan yang dipanggil dimana mana adalah get nama, dimana dibaliknya dia manggil banyak func yang lain.

dan `print_perkenalan` tidak boleh diakses langsung. termasuk property `nama` juga tidak boleh diakses langsung

## Sorting
### Bubble Sort
Konsepnya, dengan cara melempar lempar data array, sampai dia urut, BigO nya `O(n^2)`. cara kerja nya yaitu dengan cara menukar-nukar posisi array sekarang dengan array didepannya, jika array saat ini > dari array didepannya, maka tukar posisinya

misal ada data simple seperti ini

```txt
2  3  1  (awal mulanya)
2  1  3  (3 ditukar karna 3 > 1)
1  2  3 (2 ditukar karna 2 > 1)
1  2  3  (selesai)
```

### Selection Sort

TL;DR, menemukan data yg lebih kecil dari nilai minimum saat ini, tunggu loopnya yang didalam selesai baru di swap.
```txt
contoh kita akan sorting

2  9  4   1  (belum diapa-apakan)
2  9  4   1  (minimum index ke 0, yaitu 2)
2  9  4   1  (bandingkan 9 dgn index ke 0 yaitu 2, 9 < 2 false)
2  9  4   1  (bandingkan 4 dgn index ke 0, yaitu 2, 4 < 2, false)
2  9  4   1  (bandingkan 1 dgn index ke 0, yaitu 2, 1 < 2, true, maka tukar)
1  9  4   2  (set minimum di index  ke 1 sekarang, yaitu 9)
1  9  4   2  (bandingkan 4 dgn index ke 1, 4 < 9, true, maka kita biarkan karna loop belum selesai, tapi set minimum ke 4)
1  9  4   2  (cek apakah 2 < 4, ya, set minimum ke 2)
1  2  4   9  (tukar)
1  2  4   9  (set minimum ke index ke 3, yaitu 4, apakah 9 < 4, tidak)
--end---
```
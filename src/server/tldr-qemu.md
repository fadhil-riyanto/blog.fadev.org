# TLDR qemu

setup-network.sh
```sh
sudo ip link add br0-lan type bridge
sudo ip tuntap add tap0 mode tap
sudo ip tuntap add tap1 mode tap
sudo ip tuntap add tap2 mode tap

sudo ip link set tap0 master br0-lan
sudo ip link set tap1 master br0-lan
sudo ip link set tap2 master br0-lan

sudo ip link set br0-lan up
sudo ip link set tap0 up
sudo ip link set tap0 up
sudo ip link set tap0 up

sudo ip a

```

sudo chmod 666 setup-network.sh
sh ./setup-network.sh


# running qemu

run routeros

```sh
qemu-img convert -f raw -O qcow2 chr-7.19.1.img chr7.qcow2

qemu-system-x86_64 \
	-enable-kvm \
	-smp 4 \
	-m 256M \
	-drive file=chr7.qcow2,format=qcow2 \
	-boot order=d \
	-net user,hostfwd=tcp::8291-:8291,hostfwd=tcp::30022-:22 \
	-net nic \
	-nographic \
	-netdev tap,id=net0,ifname=tap0,script=no,downscript=no \
	-device virtio-net-pci,netdev=net0,mac=02:11:2a:3b:ff:c3
```

run ubuntu server
```sh
qemu-system-x86_64 \
	-enable-kvm \
	-boot order=d \
	-drive if=pflash,format=raw,readonly=on,file=/usr/share/edk2/x64/OVMF_CODE.4m.fd \
	-drive if=pflash,format=raw,file=OVMF_VARS_ubuntu_server_gpt.4m.fd \
	-drive file=ubuntu-server.img,format=qcow2 \
	-m 4G \
	-smp 4 \
	-netdev user,id=net0,hostfwd=tcp::20022-:22,hostfwd=tcp::10000-:5432 \
	-device e1000,netdev=net0 \
	-netdev tap,id=net1,ifname=tap1,script=no,downscript=no \
	-device virtio-net-pci,netdev=net1,mac=02:11:2a:3b:aa:c4 \
	-vga virtio \
	-nographic
```
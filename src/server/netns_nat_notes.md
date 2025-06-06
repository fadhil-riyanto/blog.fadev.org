# network namespace + NAT notes

- `ip a`
- `sudo ip link add veth0 type veth peer name veth0-peer`
- `sudo ip addr add 10.200.1.1/24 dev veth0`
- `sudo ip netns add firefoxns`
- `sudo ip link set veth0-peer netns firefoxns`
- `sudo sysctl -w net.ipv4.ip_forward=1`
- `sudo iptables -t nat -A POSTROUTING -s 10.200.1.0/24 -o wlan0 -j MASQUERADE`
- `sudo ip netns exec firefoxns ip addr add 10.200.1.2/24 dev veth0-peer`
- `sudo ip netns exec firefoxns ip addr add 127.0.0.1/8 dev lo`
- `sudo ip netns exec firefoxns ip link set lo up`
- `sudo ip netns exec firefoxns ip link set veth0-peer up`
- `sudo ip netns exec firefoxns ip route add default via 10.200.1.1`
- `sudo ip netns exec firefoxns ip link add br0-lan type bridge`
- `sudo ip netns exec firefoxns ip tuntap add tap0 mode tap`
- `sudo ip netns exec firefoxns ip tuntap add tap1 mode tap`
- `sudo ip netns exec firefoxns ip tuntap add tap2 mode tap`
- `sudo ip netns exec firefoxns ip link set dev tap0 master br0-lan`
- `sudo ip netns exec firefoxns ip link set dev tap1 master br0-lan`
- `sudo ip netns exec firefoxns ip link set dev tap2 master br0-lan`
- `sudo ip netns exec firefoxns ip link set dev tap0 up`
- `sudo ip netns exec firefoxns ip link set dev tap1 up`
- `sudo ip netns exec firefoxns ip link set dev tap2 up`
- `sudo ip netns exec firefoxns ip link set dev br0-lan up`
- `sudo ip netns exec firefoxns qemu-system-x86_64 -enable-kvm -m 256 -smp 4 -cpu host -drive file=chr.qcow2,format=qcow2 -boot d -nographic -netdev tap,id=net0,ifname=tap0,script=no,downscript=no -device virtio-net-pci,netdev=net0,mac=02:aa:bb:cc:dd:ee -net user,hostfwd=tcp::8291-:8291 -net nic`
- `sudo ip netns exec firefoxns qemu-system-x86_64 -enable-kvm -m 256 -smp 4 -cpu host -drive file=pc-1.qcow2,format=qcow2 -cdrom alpine-virt-3.21.3-x86_64.iso -boot d -nographic -netdev tap,id=net0,ifname=tap1,script=no,downscript=no -device virtio-net-pci,netdev=net0,mac=$(randommac)`

randommac source code
```rust
use rand::Rng;

fn main() {
    let mut rng = rand::thread_rng();
    let mac = format!(
        "52:54:00:{:02x}:{:02x}:{:02x}",
        rng.gen::<u8>(),
        rng.gen::<u8>(),
        rng.gen::<u8>()
    );
    println!("{}", mac);
}

```
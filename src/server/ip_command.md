# ip command

## `ip addr`
ip addr is used to display and manage IP addresses assigned to network interfaces.

example: 
- `ip addr`
- `ip addr show`
- `sudo ip addr add 192.168.1.100/24 dev eth0`
- `sudo ip addr del 192.168.1.100/24 dev eth0`

anything about ip assigment

## `ip link`
ip link is used to display and manage network interfaces (links), focusing on layer 2 (Ethernet, loopback, etc.), not IP addresses.

example:
- `ip link`
- `sudo ip link set dev eth0 up`
- `sudo ip link set dev eth0 down`
- `sudo ip link set dev eth0 mtu 1400`

anyting about interface

## `ip tuntap`
ip tuntap manages TUN/TAP virtual network interfaces, which provide a way for user-space programs to interact with network packets as if they were network devices.

- TUN: Simulates a point-to-point device (layer 3), used for routing IP packets (e.g., VPN tunnels).
- TAP: Simulates an Ethernet device (layer 2), used for bridging Ethernet frames (e.g., virtual switches, VMs).

example: 
- `sudo ip tuntap add mode tap dev tap0`
- `sudo ip tuntap add mode tun dev tun0`
- `sudo ip tuntap del mode tap dev tap0`
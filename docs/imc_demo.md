---
layout: default
title: IMC'22 Demo Information
nav_order: 6
permalink: /imc_demo/
---

![PKTLABxIMC](/assets/images/pktlab_logo_imc.png)

---

# ACM IMC 2022 Demo Information
{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

## Running Sample Measurements Using PacketLab
Via our demo setup, attendees could see sample measurements being run on geo-distributed CAIDA-controlled endpoints using the PacketLab software package. Our setup also allows attendees to try out sample measurements using PacketLab in person.

Sample measurements runnable to attendees:
1. Query A record for `DOMAIN` (default to `www.example.org`, using `8.8.8.8`):
```
pktxpmgr -c ~/.pktlab/xpmgr.proxy.conf -a pktproxy.caida.org [-i HOSTID] test_dns [DOMAIN [DNS_RESOLVER_IP]]
```
2. Issue HTTP GET request for `DOMAIN` for `PATH` file (default to `www.example.org` for `/`):
```
pktxpmgr -c ~/.pktlab/xpmgr.proxy.conf -a pktproxy.caida.org [-i HOSTID] test_http_get [DOMAIN [PATH]]`
```
3. Send an ICMP echo (ping) packet for `DOMAIN` and wait for the reply (default to `www.example.org`):
```
pktxpmgr -c ~/.pktlab/xpmgr.proxy.conf -a pktproxy.caida.org [-i HOSTID] test_icmp_echo [DOMAIN]`
```
4. Run traceroute to `IP_ADDR`:
```
pktxpmgr -c ~/.pktlab/xpmgr.proxy.conf -a pktproxy.caida.org [-i HOSTID] test_pktif_traceroute IP_ADDR
```
> The `-i HOSTID` option allows attendees to select the specific endpoint of interest by supplying the endpoint `HOSTID`. See **[here (TBA)]** for a list of available endpoints.

## Getting *Privileges* from the PacketLab Team
Via our demo setup, attendees could experience the process of requesting experiment privilege certificates from the PacketLab team and installing the certificate to be used with the PacketLab software package.
> The following instructions can also be found within the tutorial [Running our First External Experiment](/tutorial/first_run_external).

The steps to request and install privileges from the PacketLab team are as follows:
1. Navigate to our [experiment privilege certificate download page](http://riverrun.sprai.org:5000/), and follow the instructions to upload the exppriv CSR & download the exppriv certificate.
2. Download the [CAIDA Endpoint Operator Publickey (`caida_k_eop.pub`)](/assets/caida_k_eop.pub)
3. Move `caida_k_eop.pub` to under `~/.pktlab/keys` via
```
mv caida_k_eop.pub ~/.pktlab/keys
```
4. Move the downloaded certificate (`caida_exppriv.cert`) to under `~/.pktlab/certs` via
```
mv caida_exppriv.cert ~/.pktlab/certs
```
5. Run the following command to amend `~/.pktlab/xpmgr.conf` and `~/.pktlab/xpmgr.proxy.conf`:
```
printf "%b" "\nExpExec 0::${HOME}/.pktlab/certs/caida_exppriv.cert,${HOME}/.pktlab/certs/pubcmd_exper_xc.cert:${HOME}/.pktlab/keys/caida_k_eop.pub::\n" >> xpmgr.proxy.conf
```

After following the step, the privileges are now set up. Attendees can now run sample measurements using commands specified in the [Running Sample Measurements Using PacketLab](#running-sample-measurements-using-packetlab) section, and use CAIDA endpoints to run experiments!

## Set up PacketLab on my own equipment
If any attendees are interested and would like to use PacketLab on their equipment, please follow through the [Tutorial - Getting Started](/tutorial#getting-started) section (PacketLab Overview page is purely informational and may be skipped), which contains instructions on package installation and local/external experiment running.
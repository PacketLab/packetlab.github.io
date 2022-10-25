---
layout: default
title: IMC'22 Demo Information
nav_order: 6
permalink: /imc_demo/
---

![PKTLAB_at_IMC](/assets/images/pktlab_logo_at_imc.png)

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

## For Demo Participants
> Find us at our poster during the poster session to see the demo!

For demo participants, we will provide the setup for you to directly use the PacketLab software package without needing to install anything. For this demo, there are two things for you to try out:

### Running Sample Measurements on External PacketLab Endpoints
Via our demo setup, you can run sample measurements on geo-distributed PacketLab endpoints using the PacketLab software package.

Sample measurements runnable to participants:
- Query A record for `DOMAIN` (default to `www.example.org`, using `8.8.8.8`):
```
pktxpmgr -c ~/.pktlab/xpmgr.proxy.conf -a pktproxy.caida.org [-i HOSTID] mlets/test_dns [DOMAIN [DNS_RESOLVER_IP]]
```
- Issue HTTP GET request to `DOMAIN` for `PATH` file (default to `www.example.org` for `/`):
```
pktxpmgr -c ~/.pktlab/xpmgr.proxy.conf -a pktproxy.caida.org [-i HOSTID] mlets/test_http_get [DOMAIN [PATH]]`
```
- Send an ICMP echo request (ping) packet to `DOMAIN` and wait for the reply (default to `www.example.org`):
```
pktxpmgr -c ~/.pktlab/xpmgr.proxy.conf -a pktproxy.caida.org [-i HOSTID] mlets/test_icmp_echo [DOMAIN]`
```
- Run traceroute to `DOMAIN`:
```
pktxpmgr -c ~/.pktlab/xpmgr.proxy.conf -a pktproxy.caida.org [-i HOSTID] mlets/test_pktif_traceroute DOMAIN
```

> The `-i HOSTID` option allows users to select the specific endpoint of interest by supplying the endpoint `HOSTID`. See **[here (TBA)]** for a list of available endpoints.

> Big thanks to [EdgeNet](https://www.edge-net.org/) for hosting most of the demo endpoints!

### Getting and Using Privileges from the PacketLab Team
Via our demo setup, you can experience the process of requesting experiment privilege certificates from the PacketLab team and installing the certificate to be used with the PacketLab software package.

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
5. Run the following commands to amend `~/.pktlab/xpmgr.conf` and `~/.pktlab/xpmgr.proxy.conf`:
```
printf "%b" "\nExpExec 0::${HOME}/.pktlab/certs/caida_exppriv.cert,${HOME}/.pktlab/certs/pubcmd_exper_xc.cert:${HOME}/.pktlab/keys/caida_k_eop.pub::\n" >> ~/.pktlab/xpmgr.conf
printf "%b" "\nExpExec 0::${HOME}/.pktlab/certs/caida_exppriv.cert,${HOME}/.pktlab/certs/pubcmd_exper_xc.cert:${HOME}/.pktlab/keys/caida_k_eop.pub::\n" >> ~/.pktlab/xpmgr.proxy.conf
```

After following the steps, the privileges are now set up. You can now run sample measurements using commands specified in the [Running Sample Measurements on External PacketLab Endpoints](#running-sample-measurements-on-external-packetlab-endpoints) section, and use external PacketLab endpoints to run experiments!

---
## For Other Interested Attendees
For other interested attendees who could not attend the demo, you will need to set up the PacketLab software package on your local machine to try out the package. We provide the following options:

**Try-it-out Special Bundle** We provide a **Try-it-out special bundle** (for a selected set of OS/arch) that would alleviate you from the full installation steps required to set up the PacketLab software package on your local machine. The steps to use the bundle are as follows:
1. Download the special bundle based on your OS/arch: [Linux/amd64](https://packetlab.web.illinois.edu/release/special_bundle/pktlab-special.linux.amd64.zip), [MacOS/amd64](https://packetlab.web.illinois.edu/release/special_bundle/pktlab-special.macos.amd64.zip), and [MacOS/arm](https://packetlab.web.illinois.edu/release/special_bundle/pktlab-special.macos.arm.zip).
2. Unzip the bundle.
3. cd into the unzipped directory.
You can then run the commands described at [Running Sample Measurements on External PacketLab Endpoints](#running-sample-measurements-on-external-packetlab-endpoints) as well (note you will need to change the `-c` option argument to give `-c xpmgr.proxy.conf` and do `./pktxpmgr` instead)!

> Note the special bundle is for temporary use only due to endpoint-side resource limits. For attendees who would like to use PacketLab in a more permanent manner, we recommend they follow the [Installation Tutorial](/tutorial/installation) to set up the full PacketLab software package.

> Note for MacOS users: when running our binaries, a warning may be given on *the developer cannot be verified*. To fix this, you can go to **System Preferences->Security & Privacy->Allow Anyway** to allow execution of our binaries.

**Other OS/Arch Users** Due to lack of time, we are not able to provide other OS/arch users with special bundles. However, if you are running a POSIX.1-2004-compliant OS, you could still follow our [Tutorial - Getting Started](/tutorial#getting-started) on setting up the software package and trying them out.
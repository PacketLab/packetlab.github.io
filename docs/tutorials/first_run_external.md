---
layout: default
title: Running our First External Experiment
parent: Tutorial
nav_order: 4
permalink: /tutorial/first_run_external/
---

<style>
.img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
}
.caption {
    text-align: center;
}
</style>

# Running our First External Experiment
After installation (and potentially running our first local experiment), we are now ready to run our first *external* experiment. For this tutorial, we will demonstrate how to run an experiment using external endpoints (taking the PacketLab team endpoints as an example) using the PacketLab software package.

## 1. Setup
For this tutorial, we will only use the `pktxpmgr` program (PacketLab Experiment Manager Utility). If `pktxpmgr` cannot be found via the `PATH` environment variable, one will need to navigate to the `bin` directory under the package installation directory to find the program.
> In the following text, we will assume that `pktxpmgr` can be found via the `PATH` environment variable when describing the commands to run the programs.

## 2. Requesting experiment privileges
Instead of directly running `pktxpmgr` as in the local setup, to run experiments on external endpoints operated by other parties, we will need to first obtain the correct experiment privileges from them and then configure `pktxpmgr` to utilize those privileges. Privilege provision in PacketLab is done via the privilege owner signing a **certificate** to the privilege-requesting party. In many cases, this can be done by requesting the privilege-requesting party to submit a certificate signing request (CSR), after which the privilege owner can then sign the corresponding certificate based on the submitted CSR.
> For convenience, during the software package user home directory setup process, CSRs for requesting experiment/representation privileges are pre-generated for experimenters and endpoint operators to use. The pre-generated X.509 CRMF CSRs can be found under `~/.pktlab/csrs`.

The PacketLab team, in cooperation with [the EdgeNet team](https://www.edge-net.org/), has set up external endpoints for PacketLab users to run experiments against. To obtain the certificate from us, visit our [experiment privilege certificate download page](http://riverrun.sprai.org:5000/), and follow the instructions on the page to upload a CSR & download the generated experiment privilege certificate.

## 3. Configuring `pktxpmgr` to use the obtained privileges
After acquiring the certificate, we will then need to set up `pktxpmgr` to use the new privileges. We will need to do the following steps to achieve this (using the PacketLab team certificate provision setup as an example):
1. Download the [CAIDA Endpoint Operator Publickey (`caida_k_eop.pub`)](/assets/caida_k_eop.pub)
2. Move `caida_k_eop.pub` to under `~/.pktlab/keys` via
```
mv caida_k_eop.pub ~/.pktlab/keys
```
3. Move the downloaded certificate (`caida_exppriv.cert`) to under `~/.pktlab/certs` via
```
mv caida_exppriv.cert ~/.pktlab/certs
```
4. Run the following two commands to amend `~/.pktlab/xpmgr.conf` and `~/.pktlab/xpmgr.proxy.conf`:
```
printf "%b" "\nExpExec 0::${HOME}/.pktlab/certs/caida_exppriv.cert,${HOME}/.pktlab/certs/pubcmd_exper_xc.cert:${HOME}/.pktlab/keys/caida_k_eop.pub::\n" >> ~/.pktlab/xpmgr.conf
printf "%b" "\nExpExec 0::${HOME}/.pktlab/certs/caida_exppriv.cert,${HOME}/.pktlab/certs/pubcmd_exper_xc.cert:${HOME}/.pktlab/keys/caida_k_eop.pub::\n" >> ~/.pktlab/xpmgr.proxy.conf
```
> Note the moved files must be named `caida_k_eop.pub` and `caida_exppriv.cert` for the amendment to work.
>
> Also note for the case of interacting with other PacketLab users, one can still utilize the pre-generated CSRs and submit them to the privilege owner. The privilege owner can use the `PPKSMan` scripts shipped within the `pktlab` Python module to sign the certificate based on the received CSR and hand the certificate (along with the signing key public key) back to the privilege-requesting party. The receiving party can then still follow steps 2-4 to install the new privileges, except the received key and certificate filenames need to be updated to reflect the actual filenames.

After these steps, the `pktxpmgr` is now configured to use the new privileges and ready to go.

## 4. Running the Experiment Manager
After finishing configuring `pktxpmgr`, we can now run our experiment on external endpoints. For this tutorial, we will directly specify the example command for running `pktxpmgr`. For more information on `pktxpmgr`, see [Running our First Local Experiment - step 2](/tutorial/first_run_local#2-running-the-experiment-manager).
> **The following instruction only applies if you have public IP on your host machine.** See [Running the Experiment Manager in Proxy Mode](#41-running-the-experiment-manager-in-proxy-mode) to run `pktxpmgr` behind NAT.

We can now run `pktxpmgr` as follows:
```
pktxpmgr [EXAMPLE_MLETS_DIR_PATH]/test_http_get
```
where `[EXAMPLE_MLETS_DIR_PATH]` is the path to the `example_mlets` directory under the installation directory.
> Note when running this command, two things are happening:
> 1. `pktxpmgr` publishes the experiment (in experiment descriptor form) to the CAIDA broker at `pktbrokr.caida.org`.
> 2. `pktxpmgr` creates a listening socket to greet incoming endpoints.
>
> Afterward, for any incoming endpoint, `pktxpmgr` also performs TLS handshake with the endpoints, fork & exec the mlet, and forward any traffic between the endpoint and the mlet process.

### 4.1. Running the Experiment Manager in Proxy Mode
Note for the case where the host running `pktxpmgr` is behind NAT, we will need to run it in **proxy mode**, where the proxy is an intermediate traffic facilitator that helps forward traffic between endpoints and controllers. We can run `pktxpmgr` in proxy mode as follows:
```
pktxpmgr -c ~/.pktlab/xpmgr.proxy.conf -a pktproxy.caida.org [EXAMPLE_MLETS_DIR_PATH]/test_http_get
```
where `[EXAMPLE_MLETS_DIR_PATH]` is the path to the `example_mlets` directory under the installation directory.
> Note when running this command, a couple of things are happening:
> 1. `pktxpmgr` publishes the experiment (in experiment descriptor form) to the CAIDA broker at `pktbrokr.caida.org`.
> 2. `pktxpmgr` creates backlog connections to the proxy `pktproxy.caida.org` (run by the PacketLab team) to register for specific SNIs (*snikeys* in PacketLab jargon).
> 3. The proxy accepts the registration requests and listens for incoming endpoint connections. Whenever a connection is established, the proxy tries to identify the endpoint snikey, and if the proxy found that the snikey is registered, the proxy helps forward TCP traffic between the endpoint and the registering `pktxpmgr`.
> Based on the received TCP data from the proxy, `pktxpmgr` performs the normal TLS handshake, fork & exec the mlet, and forward any traffic between the proxy and the mlet process.

## 5. Seeing the Result
After successfully running `pktxpmgr`, one should see HTML code (potentially multiple) retrieved from the HTTP server `www.example.com`. Congratulations, you have just run your first external experiment using PacketLab! For more information, see below for a rundown of what exactly happened for the HTML code to be displayed.
> Note one can kill `pktxpmgr` with SIGINT directly.

### Process Rundown
**Passive (listen) mode** The CAIDA broker forwards the experiment descriptor to the PacketLab team endpoints after being notified of the experiment by `pktxpmgr`. Receiving the experiment descriptor, the PacketLab team endpoints initiate the connections to the controller described by the descriptor. `pktxpmgr` then performs TLS handshake with each of the incoming endpoints, exec-ing the mlet `test_http_get` at the end, which starts issuing PacketLab protocol requests to one of the endpoints over `pktxpmgr`. By design, `test_http_get` asks the endpoint (via multiple PacketLab protocol requests) on sending out the HTTP GET request, and receives the forwarded back HTTP response from the endpoint which is then displayed in the terminal. Also see Image 1 below for a graphical representation of the overall process.

**Active (proxy) mode** The process is similar to the passive case, except that `pktxpmgr` now connects to the proxy to register for snikeys, and then relies on the proxy to forward the `pktxpmgr`-endpoint traffic with the correct endpoint.

![PacketLab Experiment Running Overview](/assets/images/poster.cropped.png){:class="img"}
<div class="caption">Image 1. Graphical Overview of How a PacketLab Experiment is Run</div>
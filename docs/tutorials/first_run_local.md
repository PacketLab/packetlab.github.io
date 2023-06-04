---
layout: default
title: Running our First Local Experiment
parent: Tutorial
nav_order: 3
permalink: /tutorial/first_run_local/
---

# Running our First Local Experiment
After installation, we are now ready to run our first experiment. To keep things simple, for this tutorial we will demonstrate how to run an experiment *locally* (i.e. having both the controller and endpoint run on your machine for the experiment) using the PacketLab software package.

## 1. Setup
For this tutorial, we will use both the `pktxpmgr` program (PacketLab Experiment Manager Utility) and the `pktendpt` program (PacketLab Reference Measurement Endpoint). As two programs need to be run at the same time, it is recommended to open two terminals, one for `pktxpmgr` and one for `pktendpt`. If either program cannot be found via the `PATH` environment variable, one will need to navigate to the `bin` directory under the package installation directory to find the programs.
> In the following text, we will assume that the programs can be found via the `PATH` environment variable when describing the commands to run the programs.

## 2. Running the Experiment Manager
We will first start with running the Experiment Manager. Running the `pktxpmgr` requires supplying some additional arguments, which can be displayed by running `pktxpmgr -h`:
```
USAGE: pktxpmgr [-hs] [-c XM_CONF_PATH] [-a ADDR:[PORT]] [-p PUBLISH_ADDR:[PORT]] [-i HOSTID] [-n ATTEMPT_CNT] MLET [MLET_ARGS ...]
```
- `MLET` is the path to the compiled measurement applets (abbrev. mlet, pronounce as [EM-LET]) to run for this experiment. A set of compiled example mlets (`test_dns`, `test_http_get`, `test_icmp_echo`, and `test_pktif_traceroute`) can be found within the installation directory under `example_mlets` for prebuilt package and `share/pktlab/example_mlets` for installation from source. For this tutorial, one can choose any mlet (note `test_icmp_echo` requires `pktendpt` special setup; see [here](#more-information-on-pktxpmgr-options-and-arguments)). We will use the `test_http_get` mlet as an example.
- `[-a ADDR[:PORT]]` refers to the target host address and port that `pktxpmgr` should use when running the experiment. For this tutorial, one should omit this option.
- `[-p PUBLISH_ADDR[:PORT]]` refers to the host address and port that `pktxpmgr` should use as the publication controller address. When an endpoint receives experiment notifications, this is the address that they will see and attempt to connect to. For this tutorial, one should omit this option.
- `[-i HOSTID]` refers to a glob pattern (only * and ? supported) to match against endpoint exported hostids. This is useful when targeting specific endpoints for experiment execution. For this tutorial, one should omit this option.
- `[-n ATTEMPT_CNT]` refers to the maximum number of successful attempts for `pktxpmgr` to serve incoming endpoints. This is useful when one would like to stop `pktxpmgr` after serving some number of incoming endpoints. For this tutorial, one should omit this option.
> See [here](#more-information-on-pktxpmgr-options-and-arguments) for more information on the supported options and arguments (including some explanation on what each example mlet does).

One can now run `pktxpmgr` as follows:
```
pktxpmgr [EXAMPLE_MLETS_DIR_PATH]/test_http_get
```
where `[EXAMPLE_MLETS_DIR_PATH]` is the path to the `example_mlets` directory under the installation directory.
> Note when running this command, two things are happening:
> 1. `pktxpmgr` publishes the experiment (in experiment descriptor form) to the CAIDA broker at `pktbrokr.caida.org`.
> 2. `pktxpmgr` creates a listening socket to greet incoming endpoints.
>
> Afterward, for any incoming endpoint, `pktxpmgr` also performs TLS handshake with the endpoints, fork & exec the mlet, and forward any traffic between the endpoint and the mlet process.

## 3. Running the Reference Endpoint
Next, we will need to run the Reference Endpoint. Running the `pktendpt` does **not** require any additional arguments. One can directly run `pktendpt` as follows:
```
pktendpt
```
> Note when running this command, `pktendpt` does one thing:
> - `pktendpt` contacts the CAIDA broker at `pktbrokr.caida.org` to subscribe for experiments.
>
> Afterward for any received experiment descriptor from the broker, `pktendpt` creates a connection to the controller described by the descriptors.

## 4. Seeing the Result
After successfully running the two commands, one should see HTML code retrieved from the HTTP server `www.example.com`. Congratulations, you have just run your first experiment using PacketLab! For more information, see below for a rundown of what exactly happened for the HTML code to be displayed. Also see **[Running our First External Experiment](/tutorial/first_run_external)** on steps to run the example mlets with external endpoints.
> Note one can kill the two processes with SIGINT directly.

### Process Rundown
To briefly explain the process, The CAIDA broker forwards the experiment descriptor to `pktendpt` after being notified of the experiment by `pktxpmgr`. Receiving an experiment descriptor, `pktendpt` initiates the connection to the controller described by the descriptor. Both processes then complete the TLS handshake with `pktxpmgr` exec-ing the mlet `test_http_get` at the end, which starts issuing PacketLab protocol requests to `pktendpt` over `pktxpmgr`. By design `test_http_get` then asks `pktendpt` (via multiple PacketLab protocol requests) on sending out the HTTP GET request, and receives the forwarded back HTTP response from `pktendpt` which is then displayed in the terminal.

## More information on `pktxpmgr` options and arguments
1. For a high-level description of what each mlet does:
- `test_dns`: Craft and issue a DNS A record query. The default is to `8.8.8.8` for `www.example.com`. The domain name and DNS resolver IP address can be passed in using `MLET_ARGS`: `test_dns [DOMAIN_NAME] [IP]`. E.g. `pktxpmgr example_mlets/test_dns www.example.org 1.1.1.1`.
- `test_http_get`: Craft and issue a HTTP GET request. The default is to request `www.example.com` for `/`. The domain name and path can be passed in using `MLET_ARGS`: `test_http_get [DOMAIN_NAME] [PATH]`. E.g. `pktxpmgr example_mlets/test_http_get www.example.org /index.html`.
- `test_icmp_echo`: Ping a target with a single ICMP echo request packet. The default is to ping `www.example.com`. The target can be passed in using `MLET_ARGS`: `test_icmp_echo [TARGET]`. E.g. `pktxpmgr example_mlets/test_icmp_echo 1.1.1.1`. Note to run this mlet, the endpoint needs to be compiled and configured for raw support (currently only for Linux). The compilation is done by default if one is using the raw-flavor prebuilt package or compiling from source tarball on Linux. For configuration, one can check if it is correct by checking whether in `~/.pktlab/endpt.conf`, the `TransprotoSup` option has `raw` specified. In addition, as the `test_icmp_echo` mlet requires endpoints to use raw sockets and eBPF filters, one will need to give `pktendpt` the correct privileges by either (1) run `pktendpt` with `sudo`, or (2) set the `CAP_NET_RAW` capability for `pktendpt` (can be done with `sudo setcap cap_net_raw=ep PATH_TO_pktendpt`) and enable kernel unprivileged BPF support with `sudo sysctl -w kernel.unprivileged_bpf_disabled=0`.
- `test_pktif_traceroute`: Perform traceroute to a target via traditional UDP probes. The target can be passed in using `MLET_ARGS`: `test_pktif_traceroute TARGET`. E.g. `pktxpmgr example_mlets/test_pktif_traceroute www.example.org`. Note similar to `test_icmp_echo`, the endpoint needs to be compiled and configured for raw support to run this mlet.
2. For option `-a`, when omitted `pktxpmgr` tries to listen on `0.0.0.0:20556`. If supplied, how `pktxpmgr` uses the address depends on the operation mode specified by the config file used:
- Passive (listen) mode (default): `pktxpmgr` listens on the address for incoming endpoint connection.
- Active (proxy) mode: `pktxpmgr` connects to the address to set up proxy backlog connections. Note this option is **REQUIRED** if running `pktxpmgr` in active mode.
3. For option `-p`:
- In passive (listen) mode (default), if the option is specified, the supplied address is always used by `pktxpmgr` as the publication controller address. If not, if the `-a` option is given, the `-a`-supplied address is used instead. If both `-a` and `-p` are not specified, if `PubControllerAddr` is specified within the currently-used config, the address supplied via `PubControllerAddr` is used. Otherwise, the local host address used by `pktxpmgr` (retrieved by `getsockname`) to talk to the broker is used.
- In active (proxy) mode, if the option is specified, the supplied address is always used by `pktxpmgr` as the publication controller address. If not, if `PubControllerAddr` is specified within the currently-used config, the address supplied via `PubControllerAddr` is used. Otherwise, the host part of the `-a`-supplied address with port 20556 is used.
4. The `-c` option is to specify alternative config files to use when running `pktxpmgr`. Note that we will not need to supply this option as the config file `~/.pktlab/xpmgr.conf` is used by default, which is created and populated when running `pktlab_init`.
5. If the `-n` option was not specified, the default is to serve incoming endpoints indefinitely.
6. The `-s` option enables *singleton mlet mode* of `pktxpmgr`. Under this mode, instead of the default spawning one mlet process per incoming endpoint, the mlet is spawned only once up front, and for each incoming endpoint, a file descriptor is passed to the single mlet process (see `SCM_RIGHTS`), which can be used to talk to the incoming endpoint. The singleton mlet mode allows easier cross-endpoint coordination than other IPC methods. An example mlet using singleton mlet mode (`test_single_mlet`) is shipped in the software package, which spawns another command-line-specified mlet for each incoming endpoint. Note mlets working under singleton mlet mode should always be run with the `-s` option.
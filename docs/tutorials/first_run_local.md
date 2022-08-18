---
layout: default
title: Running our First Local Experiment
parent: Tutorial
nav_order: 3
permalink: /tutorial/first_run_local/
---

# Running our First Local Experiment
After installation, we are now ready to run our first experiment. To keep things simple, for this tutorial we will demonstrate how to run an experiment *locally* (i.e. having both the controller and endpoint run on your machine for the experiment) using the PacketLab software package.

## Setup
For this tutorial, we will use both the `pktxpmgr` program (PacketLab Experiment Manager Utility) and the `pktendpt` program (PacketLab Reference Measurement Endpoint). As two programs need to be run at the same time, it is recommended to open two terminals, one for `pktxpmgr` and one for `pktendpt`. If either program cannot be found via the `PATH` environment variable, one will need to navigate to the `bin` directory under the package installation directory to find the programs.
> In the following text, we will assume that the programs can be found via the `PATH` environment variable when describing the commands to run the programs.

## Running the Experiment Manager
We will first start with running the Experiment Manager. Running the `pktxpmgr` requires supplying some additional arguments, which can be displayed by running `pktxpmgr -h`:
```
USAGE: pktxpmgr [-h] [-c XM_CONF_PATH] ADDR[:PORT] MLET [MLET_ARGS ...]
```
- `ADDR[:PORT]` refers to the IP address and port that the `pktxpmgr` should listen to accept incoming endpoint connections. For this tutorial, one should use `127.0.0.1:5566`, i.e. listen on localhost port 5566.
- `MLET` is the path to the compiled measurement applets (abbrev. mlet, pronounce as [EM-LET]) to run for this experiment. A set of compiled example mlets (`test_fd`, `test_dns`, and `test_http_get`) can be found within the installation directory under `example_mlets` for prebuilt package and `share/pktlab/example_mlets` for installation from source. For this tutorial, one can choose any mlet. We will use the `test_http_get` mlet as an example.
> For a high level description on what each mlet does:
> - `test_fd`: Test if file descriptor 0 and 1 is open. This mlet does not issue any request to the endpoint.
> - `test_dns`: Craft and issues a DNS request to `8.8.8.8` for `www.example.com`.
> - `test_http_get`: Craft and issue a HTTP GET request to `93.184.216.34` (`www.example.com` resolved) for `www.example.com`.
>
> The `-c` option is to specify alternative config files to use when running `pktxpmgr`. Note that we will not need to supply this option as the config file `~/.pktlab/xpmgr.conf` is used by default, which is created and populated when running `pktlab_init`.
>
> Though not used by the example mlets, mlets are allowed to accept arguments from the command-line via the `[MLET_ARGS ...]` arguments.

One can now run `pktxpmgr` as follows:
```
pktxpmgr 127.0.0.1:5566 [EXAMPLE_MLETS_DIR_PATH]/test_http_get
```
where `[EXAMPLE_MLETS_DIR_PATH]` is the path to the `example_mlets` directory under the installation directory.
> Note when running this command, two things are happening:
> 1. `pktxpmgr` publishes the experiment (in experiment descriptor form) to the CAIDA broker at `pktbrokr.caida.org`.
> 2. `pktxpmgr` creates a listening socket to greet incoming endpoints.
>
> Afterward for any incoming endpoint, `pktxpmgr` also perform TLS handshake with the endpoints, fork and exec the mlet, and forward any traffic between the endpoint and the mlet process.

## Running the Reference Endpoint
Next, we will need to run the Reference Endpoint. Running the `pktendpt` does **not** require any additional arguments. One can directly run `pktendpt` as follows:
```
pktendpt
```
> Note when running this command, `pktendpt` does one thing:
> - `pktendpt` contacts the CAIDA broker at `pktbrokr.caida.org` to subscribe for experiments.
>
> Afterward for any received experiment descriptor from the broker, `pktendpt` creates a connection to the controller described by the descriptors.

## Seeing the Result
After successfully running the two commands, one should see HTML code retrieved from the HTTP server `www.example.com`. Congratulations, you have just run your first experiment using PacketLab! For more information, see below for a rundown of what exactly happened for the HTML code to be displayed. Also see **[Running our First External Experiment]** on steps to run the example mlets with external (CAIDA) endpoints.
> Note one can kill the two processes with SIGINT directly.

### Process Rundown
To briefly explain the process, The Caida broker forwards the experiment descriptor to `pktendpt` after being notified of the experiment by `pktxpmgr`. Receiving an experiment descriptor, `pktendpt` initiates the connection to the controller described by the descriptor (in this case `127.0.0.1:5566`). Both processes then complete the TLS handshake with `pktxpmgr` exec-ing the mlet `test_http_get` at the end, which starts issuing PacketLab protocol request to `pktendpt` over `pktxpmgr`. By design `test_http_get` then asks `pktendpt` (via multiple PacketLab protocol requests) on sending out the HTTP GET request, and receives the forwarded back HTTP response from `pktendpt` which is then displayed in the terminal.

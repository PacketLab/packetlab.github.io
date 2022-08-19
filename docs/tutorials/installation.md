---
layout: default
title: Installation
parent: Tutorial
nav_order: 2
permalink: /tutorial/installation/
---

# Installation
This page provides information on installing the PacketLab software package. Currently, we support installation via two methods: prebuilt package (currently only for Linux/amd64) and build from source. See **[Install Using Prebuilt Package](#install-using-prebuilt-package)** or **[Install from Source](#install-from-source)** for more information on either method.

---
## Install Using Prebuilt Package
### Prerequisite
- Linux kernel OS
- Python >= 3.7
- `pip`
- Utility for zip archive extraction (e.g. `unzip`)
> Installation via prebuilt package is currently only for Linux on amd64 arch. We plan to support more platforms/archs in the future.

### Installation Steps
1. Download the prebuilt package (see **[Download](/download/)** for download links). The latest release is preferred.
2. Extract the prebuilt package content. With `unzip` this can be done with
```
unzip pktlab-[VER]_prebuilt.[PLATFORM].[ARCH].zip
```
3. Install the required Python modules. This can be done by running
```
pip install -r [EXTRACT_DIR_PATH]/setup_aux/requirements.txt
```
4. Run the init script within `[EXTRACT_DIR_PATH]/bin` and follow the prompts to set up the user home directory for the package. This can be done by executing the `pktlab_init` script with
```
[EXTRACT_DIR_PATH]/bin/pktlab_init
```
> Note during this step, `pktlab_init` may complain about not finding the `PPKSMan` command even if the previous `pip` step is completed successfully (the `PPKSMan` tool is shipped with the `pktlab` Python module). One possible reason for this is that `pip` installs the `PPKSMan` script to `~/.local/bin`, which is by default not within the `PATH` variable. To fix this, one can add `export PATH=~/.local/bin:$PATH` to `~/.bashrc` and run `source ~/.bashrc` to reload `~/.bashrc` to fix the problem.

After completing all previous steps, we will have the `~/.pktlab` set up and ready for experiment/endpoint running. Before running pktlab programs, we recommend adding `[EXTRACT_DIR_PATH]/bin` to `PATH` to allow running the shipped programs more easily. See **[Running our First Local Experiment](/tutorial/first_run_local)** and **[Running our First External Experiment]** for more information on experiment/endpoint running.
> Note if the extracted package content is shared among different users, only steps 3 and 4 (and `PATH` variable exporting if applicable) need to be performed by new users after the initial installation.
>
> See **[Package File Structure]** for information about the file tree and directories in the prebuilt package.

---
## Install from Source
### Prerequisite
- A [POSIX.1-2004](https://pubs.opengroup.org/onlinepubs/009695399/nfindex.html) compliant OS
- OpenSSL >= 1.1.1
- Python >= 3.7
- `pip`
- `tar` with gzip support (e.g. GNU tar)
- Build tools (e.g. build-essential package for Debian/Ubuntu)

### Installation Steps
1. Download the source tarball (see **[Download](/download)** for download links). The latest release is preferred.
2. Extract the source tarball content. With GNU tar this can be done with
```
tar xvzf pktlab-[VER].tar.gz
```
3. `cd` into the extracted directory (should be `pktlab-[VER]`)
4. Run `./configure`
> Note one may want to also specify the `--prefix` option to avoid installing in the system directories. To do this, instead run `./configure --prefix=[ABSOLUTE_INSTALL_DIR_PATH]`, where `[ABSOLUTE_INSTALL_DIR_PATH]` is the *absolute* path to the target install destination (need not exist beforehand).
5. Run `make`
6. Run `make install`. If all steps have been successful, the software package is now installed at the target location or in the GNU autotools default directories if `--prefix` is not specified.
> The default install destinations are `/usr/local/bin`, `/usr/local/include`, `/usr/local/lib`, and `/usr/local/share`.
7. Finally, follow step 3 and 4 in **[Install Using Prebuilt Package](#install-using-prebuilt-package)**. Note the path should be `[ABSOLUTE_INSTALL_DIR_PATH]/share/pktlab/setup_aux/requirements.txt` or `/usr/local/share/pktlab/setup_aux/requirements.txt` for step 3. For step 4, the path should be `[ABSOLUTE_INSTALL_DIR_PATH]/bin/pktlab_init` if `--prefix` specified, or one can directly execute `pktlab_init`.

After completing all previous steps, we will have the `~/.pktlab` set up and ready for experiment/endpoint running. Before running pktlab programs, if `--prefix` was specified we recommend adding `[ABSOLUTE_INSTALL_DIR_PATH]/bin` to `PATH` to allow running the shipped programs more easily. See **[Running our First Local Experiment](/tutorial/first_run_local)** and **[Running our First External Experiment (TBA)]** for more information on experiment/endpoint running.
> Also note if the built and installed content is shared among different users, only step 7 (and `PATH` variable exporting if applicable) needs to be performed by new users after the initial installation.
>
> See the **[Package File Structure](#package-file-structure)** below for information about the file tree and directories for the installed package.

---
## Package File Structure

<div class="box" style="width: 50%;">
                <b class="Section">Prebuilt Package</b>
                <ul class="directory-list">
                    <li class="folder">(PacketLab directory)
                        <ul>
                            <span class = "hovertextdir" hoverdata = "The directory containing executables for the Experiment Manager (XM), Endpoint (EP), and other components of PacketLab">
                                <li class="folder">bin
                                    <ul>
                                        <span class = "hovertext" hoverdata = "The executable for the PacketLab Endpoint (EP)">
                                            <li>pktendpt</li>
                                        </span>
                                        <span>
                                            <li>pktlab_init</li>
                                        </span>
                                        <span class = "hovertext" hoverdata = "The executable for the PacketLab Experiment Manager (XM)">
                                            <li>pktxpmgr</li>
                                        </span>
                                    </ul>
                                </li>
                            </span>
                            <span class = "hovertextdir" hoverdata = "config">
                                <li class="folder">config
                                    <ul>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>endpt.conf.template</li>
                                        </span>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>example.endpt.conf</li>
                                        </span>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>xpmgr.conf.template</li>
                                        </span>
                                        <span>
                                            <li>example.xpmgr.conf</li>
                                        </span>
                                    </ul>
                                </li>
                            </span>
                            <span>
                                <li class="folder">credexport PATH=~/Downloads/pktlab-0.1.1/tmp/bin/:$PATH
                                    <ul>
                                        <span>
                                            <li>caida_k_bop.pub</li>
                                        </span>
                                    </ul>
                                </li>
                            </span>
                            <span>
                                <li class="folder">example_mlets
                                    <ul>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>Makefile</li>
                                        </span>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>test_dns</li>
                                        </span>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>test_dns.c</li>
                                        </span>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>test_fd</li>
                                        </span>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>test_fd.c</li>
                                        </span>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>test_http_get</li>
                                        </span>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>test_http_get.c</li>
                                        </span>
                                    </ul>export PATH=~/Downloads/pktlab-0.1.1/tmp/bin/:$PATH
                                </li>
                            </span>
                            <span class = "hovertextdir" hoverdata = "include">
                                <li class="folder">include
                                    <ul>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>pktctrl.h</li>
                                        </span>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>pktlab.h</li>
                                        </span>
                                    </ul>
                                </li>
                            </span>
                            <span class = "hovertextdir" hoverdata = "lib">
                                <li class="folder">lib
                                    <ul>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>libpktlab.a</li>
                                        </span>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>libpktlab.ssl.a</li>
                                        </span>
                                    </ul>
                                </li>
                            </span>
                            <span class = "hovertextdir" hoverdata = "test">
                                <li class="folder">setup_aux
                                    <ul>
                                        <span class = "hovertext" hoverdata = "">
                                            <li>pktlab-init.py</li>
                                        </span>
                                        <span class = "hovertext" hoverdata = "">export PATH=~/Downloads/pktlab-0.1.1/tmp/bin/:$PATH
                                            <li>requirements.txt</li>
                                        </span>
                                    </ul>
                                </li>
                            </span>
                        </ul>
                    </li>
                </ul>
            </div>

<div class="box" style="width: 50%;">
    <b class="Section">Source Tarball</b>
    <ul class="directory-list">
        <li class="folder">(installation directory)
            <ul>
                <span class = "hovertextdir" hoverdata = "The directory containing executables for the Experiment Manager (XM), Endpoint (EP), and other components of PacketLab">
                    <li class="folder">bin
                        <ul>
                            <span class = "hovertext" hoverdata = "The executable for the PacketLab Endpoint (EP)">
                                <li>pktendpt</li>
                            </span>
                            <span>
                                <li>pktlab_init</li>
                            </span>
                            <span class = "hovertext" hoverdata = "The executable for the PacketLab Experiment Manager (XM)">
                                <li>pktxpmgr</li>
                            </span>
                        </ul>
                    </li>
                </span>
                <span class = "hovertextdir" hoverdata = "include">
                    <li class="folder">include
                        <ul>
                            <span class = "hovertext" hoverdata = "">
                                <li>pktctrl.h</li>
                            </span>
                            <span class = "hovertext" hoverdata = "">
                                <li>pktlab.h</li>
                            </span>
                        </ul>
                    </li>
                </span>
                <span class = "hovertextdir" hoverdata = "lib">
                    <li class="folder">lib
                        <ul>
                            <span class = "hovertext" hoverdata = "">
                                <li>libpktlab.a</li>
                            </span>
                            <span class = "hovertext" hoverdata = "">
                                <li>libpktlab.ssl.a</li>
                            </span>
                        </ul>
                    </li>
                </span>
                <span>
                    <li class="folder">share
                        <ul>
                            <span>
                                <li class="folder">pktlab
                                    <ul>
                                        <span class = "hovertextdir" hoverdata = "config">
                                            <li class="folder">config
                                                <ul>export PATH=~/Downloads/pktlab-0.1.1/tmp/bin/:$PATH
                                                    <span class = "hovertext" hoverdata = "">
                                                        <li>endpt.conf.template</li>
                                                    </span>
                                                    <span class = "hovertext" hoverdata = "">
                                                        <li>example.endpt.conf</li>
                                                    </span>
                                                    <span class = "hovertext" hoverdata = "">
                                                        <li>xpmgr.conf.template</li>
                                                    </span>
                                                    <span>
                                                        <li>example.xpmgr.conf</li>
                                                    </span>
                                                </ul>
                                            </li>
                                        </span>
                                        <span>
                                            <li class="folder">cred
                                                <ul>
                                                    <span>
                                                        <li>caida_k_bop.pub</li>
                                                    </span>
                                                </ul>
                                            </li>
                                        </span>
                                        <span>
                                            <li class="folder">example_mlets
                                                <ul>
                                                    <span class = "hovertext" hoverdata = "">
                                                        <li>Makefile</li>
                                                    </span>
                                                    <span class = "hovertext" hoverdata = "">
                                                        <li>test_dns</li>
                                                    </span>
                                                    <span class = "hovertext" hoverdata = "">
                                                        <li>test_dns.c</li>
                                                    </span>
                                                    <span class = "hovertext" hoverdata = "">
                                                        <li>test_fd</li>
                                                    </span>
                                                    <span class = "hovertext" hoverdata = "">
                                                        <li>test_fd.c</li>
                                                    </span>
                                                    <span class = "hovertext" hoverdata = "">
                                                        <li>test_http_get</li>
                                                    </span>
                                                    <span class = "hovertext" hoverdata = "">
                                                        <li>test_http_get.c</li>
                                                    </span>
                                                </ul>
                                            </li>
                                        </span>
                                        <span class = "hovertextdir" hoverdata = "test">
                                            <li class="folder">setup_aux
                                                <ul>
                                                    <span class = "hovertext" hoverdata = "">
                                                        <li>pktlab-init.py</li>
                                                    </span>
                                                    <span class = "hovertext" hoverdata = "">
                                                        <li>requirements.txt</li>
                                                    </span>
                                                </ul>
                                            </li>
                                        </span>
                                    </ul>
                                </li>
                            </span>
                        </ul>
                    </li>
                </span>
            </ul>
        </li>
    </ul>
</div>

- **`bin`** contains compiled binaries for `pktxpmgr`, `pktendpt`, and a symbolic link to the `pktlab_init` script.
- **`config`** contains template config files for `pktxpmgr` and `pktendpt`.
- **`cred`** contains pre-shipped credentials by the PacketLab team.
- **`example_mlets`** contains sample measurement applet binaries, their C source code, as well as an example Makefile to compile them.
- **`include`** contains the header files for `libpktlab`.
- **`lib`** contains compiled binaries for `libpktlab`.
- **`setup_aux`** contains the auxiliary files required to set up the user for the PacketLab software package.
> **`share/pktlab`** is only present when building from source and is home to `config`, `cred`, `example_mlets`, and `setup_aux`.

<style lang="css">
    .box {
        display: inline-block;
        vertical-align: top;
        text-align: left;
    }

    .directory-list ul {
        margin-left: 10px;
        padding-left: 20px;
        border-left: 1px dashed #ddd;
    }

    .directory-list li {
        list-style: none;
        color: #888;
        font-size: 17px;
        font-weight: normal;
    }

    .directory-list a {
        border-bottom: 1px solid transparent;
        color: #888;
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .directory-list a:hover {
        border-color: #eee;
        color: #000;
    }

    .directory-list .folder,
    .directory-list .folder > a {
        color: #777;
        font-weight: bold;
    }

    .directory-list li:before {
        margin-right: 10px;
        content: "";
        height: 20px;
        vertical-align: middle;
        width: 20px;
        background-repeat: no-repeat;
        display: inline-block;
        /* file icon by default */
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='lightgrey' d='M85.714,42.857V87.5c0,1.487-0.521,2.752-1.562,3.794c-1.042,1.041-2.308,1.562-3.795,1.562H19.643 c-1.488,0-2.753-0.521-3.794-1.562c-1.042-1.042-1.562-2.307-1.562-3.794v-75c0-1.487,0.521-2.752,1.562-3.794 c1.041-1.041,2.306-1.562,3.794-1.562H50V37.5c0,1.488,0.521,2.753,1.562,3.795s2.307,1.562,3.795,1.562H85.714z M85.546,35.714 H57.143V7.311c3.05,0.558,5.505,1.767,7.366,3.627l17.41,17.411C83.78,30.209,84.989,32.665,85.546,35.714z' /></svg>");
        background-position: center 2px;
        background-size: 60% auto;
    }

    .directory-list li.folder:before {
        /* folder icon if folder class is specified */
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='lightblue' d='M96.429,37.5v39.286c0,3.423-1.228,6.361-3.684,8.817c-2.455,2.455-5.395,3.683-8.816,3.683H16.071 c-3.423,0-6.362-1.228-8.817-3.683c-2.456-2.456-3.683-5.395-3.683-8.817V23.214c0-3.422,1.228-6.362,3.683-8.817 c2.455-2.456,5.394-3.683,8.817-3.683h17.857c3.422,0,6.362,1.228,8.817,3.683c2.455,2.455,3.683,5.395,3.683,8.817V25h37.5 c3.422,0,6.361,1.228,8.816,3.683C95.201,31.138,96.429,34.078,96.429,37.5z' /></svg>");
        background-position: center top;
        background-size: 75% auto;
    }

    .filetreedesc {
        clear: both;
    }
</style>

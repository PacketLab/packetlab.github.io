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
- Python ≥ 3.7
- `pip`
- Utility for zip archive extraction (e.g. `unzip`)
> Installation via prebuilt package is currently only for Linux on amd64 arch. We plan to support more platforms/archs in the future.

### Installation Steps
1. Download the prebuilt package (see **[Download](/download/)** for download links). The latest release is preferred.
2. Extract the prebuilt package content. With `unzip` this can be done with
```
unzip pktlab-[VER]_prebuilt.[raw|noraw].[PLATFORM].[ARCH].zip
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
> See **[Package File Structure](/tutorial/package_file_structure)** for information about the file tree and directories in the prebuilt package.

---
## Install from Source
### Prerequisite
- A [POSIX.1-2004](https://pubs.opengroup.org/onlinepubs/009695399/nfindex.html) compliant OS
- OpenSSL ≥ 1.1.1
- Python ≥ 3.7
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
> See the **[Package File Structure](/tutorial/package_file_structure)** for information about the file tree and directories for the installed package.
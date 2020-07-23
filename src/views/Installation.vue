<template>
    <main class="main-content">
        <h1 id="setup-manipulation-and-removal-of-packetlab-endpoints">Setup, Manipulation, and Removal of PacketLab Endpoints</h1>
        <p>Currently, PacketLab measurement endpoint utilizes Docker (in the form of endpoint containers) to ease the process of deployment. The following content of this page provides information on</p>
        <ul>
            <li><page-anchor href="setting-up-and-running-an-endpoint-container-on-docker"><strong>(1) How to set up and run an endpoint container on Docker</strong></page-anchor></li>
            <li><page-anchor href="manipulating-the-endpoint-container-after-setup"><strong>(2) Ways to manipulate the endpoint container after setup</strong></page-anchor>, and</li>
            <li><page-anchor href="removing-the-endpoint"><strong>(3) How to remove the endpoint</strong></page-anchor>.</li>
        </ul>
        <h2 id="setting-up-and-running-an-endpoint-container-on-docker">Setting up and running an endpoint container on Docker</h2>
        <p>To set up an endpoint on your local machine, follow the provided steps below to retrieve and deploy the endpoint Docker image:</p>
        <ul>
            <li>Step (1): Set up your local machine to fulfill the <page-anchor href="prerequisite"><strong>Prerequisite</strong></page-anchor>.</li>
            <li>Step (2): Follow the steps in the <page-anchor href="retrieve-and-load-the-endpoint-docker-image"><strong>Retrieve and Load the Endpoint Docker Image</strong></page-anchor> section to obtain (and optionally verify) the endpoint Docker image.</li>
            <li>Step (3): Follow the steps in the <page-anchor href="instantiate-and-run-the-loaded-endpoint-image"><strong>Instantiate and Run the Loaded Endpoint Image</strong></page-anchor> section to run the endpoint Docker container.</li>
        </ul>
        <h3 id="prerequisite">Prerequisite</h3>
        <h4 id="general">General</h4>
        <ol>
            <li>120 MB of available disk space</li>
            <li>40 MB of free memory for endpoint container running</li>
            <li>
                Internet connectivity
                <blockquote>
                    <p>Running endpoint containers behind NAT is generally not an issue (Docker by default runs containers behind NAT). However, failures may be suffered by experiments due to potential bizarre behavior of NAT such as messing up long-term TCP connections and dropping outgoing UDP packets.</p>
                </blockquote>
            </li>
        </ol>
        <h4 id="linux">Linux</h4>
        <ol>
            <li>
                Docker supported Linux distro with a recent enough kernel 
                <blockquote>
                    <p>See <a href="https://docs.docker.com/engine/install/">Install Docker Engine</a> for more information on a list of supported distros, additional requirements by Docker, and steps for how to install Docker on each of the distros.
                        Tested on an Ubuntu 18.04 machine with kernel version 4.15.0.
                    </p>
                </blockquote>
            </li>
            <li>
                An up to date Docker installation
                <blockquote>
                    <p>Tested on Docker community edition with client version 19.03.8, server engine version 19.03.8, server containerd version 1.2.13, server runc version 1.0.0-rc10, and server docker-init version 0.18.0.</p>
                </blockquote>
            </li>
        </ol>
        <h4 id="windows">Windows</h4>
        <ol>
            <li>
                Docker desktop supported Microsoft Windows 10 operating system
                <blockquote>
                    <p>See <a href="https://docs.docker.com/docker-for-windows/install/">Install Docker Desktop on Windows</a> for more information on supported Windows 10 versions, additional requirements by Docker, and steps for how to install Docker desktop.
                        Tested with Microsoft Windows 10 64-bit Professional (Build 17763.1158).
                    </p>
                </blockquote>
            </li>
            <li>
                An up to date Docker desktop installation
                <blockquote>
                    <p>Tested with Docker desktop community version 2.2.0.5 (43884), engine version 19.03.8, notary version 0.6.1, compose version 1.25.4, credential helper version 0.6.3, and Kubernetes v1.15.5.</p>
                </blockquote>
            </li>
        </ol>
        <h4 id="macos">macOS</h4>
        <ol>
            <li>
                Docker desktop supported macOS and Mac hardware
                <blockquote>
                    <p>See <a href="https://docs.docker.com/docker-for-mac/install/">Install Docker Desktop on Mac</a> for more information on supported macOS and hardware versions, additional requirements by Docker, and steps for how to install Docker desktop.
                        Tested with macOS Catalina version 10.15.1.
                    </p>
                </blockquote>
            </li>
            <li>
                An up to date Docker desktop installation
                <blockquote>
                    <p>Tested with Docker desktop version 2.2.0.5 (43884), engine 19.03.8, notary 0.6.1, compose 1.25.4, credential helper 0.6.3, and Kubernetes v1.15.5.</p>
                </blockquote>
            </li>
        </ol>
        <h4 id="optional-for-image-verification">Optional for image verification</h4>
        <ul>
            <li>
                <code>openssl</code>
                <blockquote>
                    <p>Tested with OpenSSL 1.1.1</p>
                </blockquote>
            </li>
        </ul>
        <h3 id="retrieve-and-load-the-endpoint-docker-image">Retrieve and Load the Endpoint Docker Image</h3>
        <p>To retrieve and load the image, follow the 2 steps below:</p>
        <ul>
            <li>Step (1): Download the endpoint Docker image <a href="http://pktlab.caida.org:20557/pktlabme_image.tar.gz">pktlabme_image.tar.gz</a>.</li>
        </ul>
        <blockquote>
            <p>Optional: The digital signature for the image is available <a href="http://pktlab.caida.org:20557/pktlabme_image.tar.gz.sha256">here</a>. To verify the image, one could download the <a href="https://packetlab.github.io/First-Shot/pktlab_public.pem">ECDSA public key</a> and verify the image tarball via the following OpenSSL command (tested with OpenSSL 1.1.1):</p>
            <code class="code-block">openssl dgst -sha256 -verify pktlab_public.pem -signature pktlabme_image.tar.gz.sha256 pktlabme_image.tar.gz</code>
            <p>The command will print <code>Verified OK</code> if the image and signature match. </p>
            <ul>
                <li>
                    Step (2): Load the downloaded endpoint image via running the following command in the terminal:
                    <code class="code-block">docker load -i pktlabme_image.tar.gz</code>
                    The endpoint image is now loaded and ready to go.
                    For Windows users, one can access the terminal via <code>cmd</code> or <code>powershell</code>
                </li>
            </ul>
            <p>One can explicitly verify that the load is successful via executing <code>docker images</code> in the terminal and see if there is an image named <code>pktlabme</code> with the <code>latest</code> tag.</p>
        </blockquote>
        <h3 id="instantiate-and-run-the-loaded-endpoint-image">Instantiate and Run the Loaded Endpoint Image</h3>
        <p>To instantiate a container from the endpoint image and run it, execute the following command in the terminal:</p>
        <code class="code-block">docker run -t -i pktlabme</code>
        <p>The terminal will then start printing some information regarding execution. At this point, the endpoint is now up and available for experiment running. Please take note of the endpoint ID information (a base10 integer shown in the printed information, e.g. <code>12345</code> in <code>2020-07-09 19:46:20 UTC (ID:12345): [INFO] Running pktlab measurement endpoint binary</code>), since this ID can be used to retrieve additional information regarding experiments that were run on the corresponding endpoint.</p>
        <blockquote>
            <p>Note that running the container with <code>-t</code> (allocate a pseudo-TTY) and <code>-i</code> (interactive mode) options is highly recommended to allow for detaching and reattaching to the container.</p>
        </blockquote>
        <h4 id="detaching">Detaching</h4>
        <p>After running the container with the <code>-i</code> and <code>-t</code> options, to detach from the container, type in <code>Ctrl-p</code> + <code>Ctrl-q</code> in the container terminal.</p>
        <blockquote>
            <p>Note that the endpoint ID can still be retrieved after detaching from the container terminal. Please see the subsequent <page-anchor href="endpoint-id"><strong>Endpoint ID</strong></page-anchor> subsection for further instructions.</p>
        </blockquote>
        <h4 id="endpoint-id">Endpoint ID</h4>
        <p>In addition to retrieving the endpoint ID when running the container, one can also retrieve the endpoint ID by accessing the logs of the container. To print out the logs in the terminal, run</p>
        <code class="code-block">docker logs [container ID]</code>
        <p>where <code>container ID</code> is the Docker-assigned ID of the endpoint container.</p>
        <blockquote>
            <p>Note that the <code>container ID</code>, which is for Docker container management, is <strong>different</strong> from the endpoint ID given by the endpoint. To find the container ID, first detach from the container, then run </p>
            <code class="code-block">docker ps -a</code>
            <p>in the terminal, and identify the container having the image name <code>pktlabme</code> to find the corresponding container ID.</p>
        </blockquote>
        <p>For those running the endpoint with Docker Desktop, the endpoint ID is also available by accessing the Logs for the endpoint container in the Docker Desktop dashboard.</p>
        <h4 id="reattaching">Reattaching</h4>
        <p>Although unnecessary in normal circumstances, to reattach to the endpoint container after detaching, run</p>
        <code class="code-block">docker attach [container ID]</code>
        <p>where <code>container ID</code> is the Docker-assigned ID of the endpoint container (the same as that used to access the logs of the container).</p>
        <h3 id="optional-verify-that-the-endpoint-is-running-experiments">Optional: Verify that the Endpoint is Running Experiments</h3>
        <p>Due to the design of the PacketLab protocol, an endpoint does not know what experiment is currently run at the endpoint. However, the information regarding the endpoint's connection with the controller is available in the logs of the endpoint, which can be used to infer experiment running on the endpoint. For example, the entry:</p>
        <code class="code-block">2020-07-09 20:12:40 UTC (ID:12345) (endpoint binary): [INFO] X.X.X.X,X: Controller socket connected</code>
        <p>indicates that the endpoint has established connection with the experiment controller, while</p>
        <code class="code-block">
            2020-07-09 20:12:46 UTC (ID:12345) (endpoint binary): [INFO] X.X.X.X,X: Controller socket read EOF
            <br>
            2020-07-09 20:12:46 UTC (ID:12345) (endpoint binary): [INFO] X.X.X.X,X: Controller connection closed
        </code>
        <p>indicates that the endpoint has ended connection with the experiment controller, possibly implying the end of experiment execution.</p>
        <p>We are currently working on creating a website for endpoint operators to view information (e.g. plots) regarding past executed experiments for a particular endpoint.</p>
        <h2 id="manipulating-the-endpoint-container-after-setup">Manipulating the endpoint container after setup</h2>
        <p>With the endpoint container instantiated, one can choose to stop the endpoint if intended and resume running afterward.</p>
        <h3 id="stop-running-the-endpoint">Stop Running the Endpoint</h3>
        <p>If one would like to stop running the endpoint, first find the container ID by running</p>
        <code class="code-block">docker ps -a</code>
        <p>
            and identify the container ID corresponding to the <code>pktlabme</code> image. 
            After having the container ID, run the following command:
        </p>
        <code class="code-block">docker stop [container ID]</code>
        <p>to stop the container.</p>
        <h3 id="resume-running-the-endpoint">Resume Running the Endpoint</h3>
        <p>If one would like to resume running a stopped endpoint container, run the following command:</p>
        <code class="code-block">docker start [container ID]</code>
        <p>with the <code>container ID</code> being the same as that used to stop the container (still accessible via <code>docker ps -a</code>).</p>
        <h2 id="removing-the-endpoint">Removing the endpoint</h2>
        <p>To completely remove an endpoint from the local machine, one will need to perform the following three steps:</p>
        <ul>
            <li>
                Step (1): Follow the instructions in the 
                <page-anchor href="stop-running-the-endpoint">
                    <strong>Stop Running the Endpoint</strong>
                </page-anchor> 
                section to stop the endpoint.
            </li>
            <li>
                Step (2): Follow the instructions in the 
                <page-anchor href="remove-the-instantiated-endpoint-container">
                    <strong>Remove the Instantiated Endpoint Container</strong>
                </page-anchor> 
                section to remove the instantiated endpoint container from Docker.
            </li>
            <li>
                Step (3): Follow the instructions in the 
                <page-anchor href="remove-the-loaded-endpoint-image">
                    <strong>Remove the Loaded Endpoint Image</strong>
                </page-anchor> section to remove the previously loaded endpoint image.
            </li>
        </ul>
        <h3 id="remove-the-instantiated-endpoint-container">Remove the Instantiated Endpoint Container</h3>
        <p>After stopping the endpoint container, to clean up the instantiated container one will need to remove it. To remove the container run</p>
        <code class="code-block">docker rm [container ID]</code>
        <p>with the <code>container ID</code> being the same as that used to stop the container.</p>
        <h3 id="remove-the-loaded-endpoint-image">Remove the Loaded Endpoint Image</h3>
        <p>To delete the loaded endpoint Docker image, run the following command:</p>
        <code class="code-block">docker rmi pktlabme</code>
    </main>
</template>
<script type="text/javascript">
    import pageAnchor from "@/components/page-anchor"
    export default {
        data(){
            return {

            }
        },
        mounted(){

        },
        components:{
            pageAnchor
        }
    }
</script>
<style lang="scss" scoped>
   @use "@/styles/text-styles"
</style>
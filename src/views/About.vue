<template>
    <main class="main-content">
        <h1 id="internet-measurement-during-the-covid-19-pandemic-with-packetlab-front-page-">Internet measurement during the COVID-19 pandemic with PacketLab</h1>
        <h2 id="overview">Overview</h2>
        <p>In this project, we will use PacketLab prototype endpoints to measure the availability of Internet critical services during the period of the COVID-19 pandemic. Our main goals are <strong>(1) to test the PacketLab prototype endpoints and search for possible improvements to PacketLab</strong>, <strong>(2) to showcase the diverse functionality provided by PacketLab in real-world network measurements</strong>, and <strong>(3) obtain statistics regarding the availability of critical Internet services during the pandemic</strong>. Some measurements that we are currently planning of doing are measuring DNS query latencies from measurement endpoints, as well as measuring available bandwidth of endpoints. We hope that via the results of this project, we can further improve the existing PacketLab design and also obtain more information on the variation of network resource consumption during this time.</p>
        <h2 id="what-is-packetlab-">What is PacketLab?</h2>
        <p><a href="https://www.caida.org/publications/papers/2017/packetlab/packetlab.pdf"><strong>PacketLab</strong></a> is a universal measurement endpoint interface that lowers the barriers faced by experimenters and measurement endpoint operators. PacketLab is built on two key ideas: It moves the measurement logic out of the endpoint to a separate experiment control server, making each endpoint a lightweight packet source/sink. At the same time, it provides a way to delegate access to measurement endpoints while retaining fine-grained control over how endpoints are used by others, allowing research groups to share measurement infrastructure with little overhead. PacketLab is currently still under development. However, a prototype reference endpoint implementation as a stand-alone binary (packaged in a Docker image) is available to run network measurement experiments utilizing TCP and UDP services, which we will use to perform network measurements in this project.</p>
        <h2 id="why-packetlab-why-even-do-this-">Why PacketLab? Why even do this?</h2>
        <p>Contrary to utilizing existing measurement infrastructure, in this project, we opt to use PacketLab due to the general functionality provided where a much larger variety of different experiments can be executed without needing to change the measurement endpoint in any way. With this project, we hope to showcase the diverse ability of PacketLab as well as put the existing prototype of PacketLab to test and identify some possible improvements for the PacketLab design.</p>
        <p>In addition, as we go through the COVID-19 pandemic with social distancing being practiced, Internet usage is expected to rise with additional multimedia traffic introduced due to the utilization of video conferencing software and multimedia entertainment services. It would therefore be interesting to perform network measurements to see the actual impact of the pandemic on Internet performance, especially in terms of availability of critical network services.</p>
        <h2 id="what-will-we-do-with-the-deployed-endpoints-">What will we do with the deployed endpoints?</h2>
        <p>For the deployed endpoints, we currently plan to perform Internet measurement experiments such as measuring latency for queries to public DNS resolvers (e.g. Google public DNS) and local DNS resolvers, as well as measurement of the available bandwidth from each endpoint to the controller.</p>
        <p>As the PacketLab reference endpoint implementation is currently still under development, it may be possible that we will distribute updated endpoint binaries to deployed endpoint Docker containers for bug fix and feature enhancement. The process of updating will be done securely with digital signatures utilized to prevent tampering with the sent binary.</p>
        <p>Due to this project being temporary during the period of the COVID-19 pandemic, a kill switch mechanism is embedded in the endpoint where when signaled, the execution of the endpoint will be stopped and the Docker container will exit afterward. The kill switch will be turned on after the measurement experiments have all been completed.</p>
        <p>In addition, the execution of the endpoint will also be halted if the endpoint failed to reach the pktlab.caida.org:20557 HTTP server for 3 consecutive days to prevent the existence of lingering measurement endpoints that do not have Internet connectivity.</p>
        <h3 id="usage-patterns">Usage patterns</h3>
        <h4 id="network-bandwidth-required">Network bandwidth required</h4>
        <p>A combined total of all traffic incurred due to experiments and endpoint periodic update checking will top at around 5MB per hour. Additional traffic may be incurred due to endpoint update retrieving but is expected to be infrequent and should result in less than 1 MB of additional traffic.</p>
        <h4 id="type-of-network-traffic-to-expect-for-endpoint">Type of network traffic to expect for endpoint</h4>
        <ol>
            <li>Periodic outgoing TCP connection and bidirectional TCP traffic against <code>pktlab.caida.org</code> port <code>20556</code> for PacketLab experiment operations.</li>
            <li>Periodic HTTP request against <code>pktlab.caida.org:20557</code> HTTP server for potential updates and kill switch polling.</li>
            <li>One-time TCP connection against <code>pktlab.caida.org</code> port <code>20558</code> for endpoint ID assignment.</li>
            <li>DNS traffic for <code>pktlab.caida.org</code> domain resolving.</li>
            <li>Experiment-specific traffic as follows:</li>
        </ol>
        <table>
            <thead>
                <tr>
                    <th>Exp. Name</th>
                    <th>Type of Traffic</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>DNS_quad_X</code></td>
                    <td>DNS traffic (A record query for <code>www.example.com</code> and response) against the public DNS resolver at <code>X.X.X.X</code> over UDP.</td>
                </tr>
                <tr>
                    <td><code>DNS_local</code></td>
                    <td>DNS traffic (A record query for <code>www.example.com</code> and response) against the endpoint local DNS resolver over UDP.</td>
                </tr>
                <tr>
                    <td><code>avail_band</code></td>
                    <td>Outgoing UDP traffic toward <code>pktlab.caida.org</code> port <code>10241</code> for available bandwidth measuring using the <a href="https://www.cs.cmu.edu/afs/cs/project/cmcl/archive/papers/igi-tr.pdf">packet pair technique</a>. Potential incoming UDP traffic (one packet per experiment) for time synchronization using the NTP clock sync algorithm.</td>
                </tr>
            </tbody>
        </table>
        <h2 id="how-do-i-participate-in-the-project-">How do I participate in the project?</h2>
        <p>To participate in this project, join us by setting up an endpoint on your local machine via following the provided steps in the <router-link :to="{'name':'Installation','query':{
            'target':'setting-up-and-running-an-endpoint-container-on-docker'
        }}"><strong>Setup, Manipulation, and Removal of PacketLab Endpoints</strong></router-link> page.</p>
    </main>
</template>
<script type="text/javascript">
    export default{
        data(){
            return {
                
            }
        }
    }
</script>
<style lang="scss" scoped>
   @use "@/styles/text-styles"
</style>
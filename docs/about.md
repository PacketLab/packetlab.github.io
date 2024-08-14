---
layout: default
title: About
nav_order: 5
permalink: /about/
---

# About
This page contains information for the PacketLab project, including [the problem](#the-problem) PacketLab addresses, [the PacketLab design](#the-design), and [the People](#the-people) behind PacketLab. Readers looking for more in-depth information can also refer to the [original IMC'17 paper](https://www.caida.org/publications/papers/2017/packetlab/packetlab.pdf) that first introduced PacketLab to the measurement community.
> Part of the following text is adapted from the extended abstract *PacketLab - Tools Alpha Release and Demo* for the IMC'22 poster session.

## The Problem
One tricky problem for distributed network measurement studies is having access to the proper vantage points for experiment data collection. Due to the high cost of establishing and maintaining a large distributed measurement infrastructure, researchers have relied on sharing of measurement infrastructure. This nevertheless introduces new difficulties:
- **Compatibility**: Varying measurement platform designs require the taxing process of porting experiments across platforms.
- **Incentives**: Deploying new experiments requires platform operator support.
- **Trust**: Platforms supporting custom measurements limit their availability to vetted researchers for security reasons.

## The Design
In response to the difficulties, we proposed PacketLab. PacketLab addresses the aforementioned problems with two design choices:
1. Exporting the network (BSD-socket-like) interface of endpoints (i.e. vantage points) to experimenters via a common mechanism - the PacketLab protocol.
2. Introducing the use of cryptographic certificates with program-based restrictions for endpoint access control.

Exporting a common interface helps experiment compatibility via the notion of *write once, run anywhere*. Moreover, exporting a common interface reduces platform operator burden for new experiments as no effort other than interface maintenance is required. The relatively-simple BSD-socket-like interface also reduces the platform operator effort in supporting the PacketLab interface. The cryptographic certificate design enables a scalable trust architecture as operators can use PacketLab experiment privilege provisioning capabilities to customize restrictions.

## The People
PacketLab is currently being developed by a collaboration of students and researchers from the Center for Applied Data Analysis ([CAIDA](https://www.caida.org)), the University of California at San-Diego ([UCSD](https://ucsd.edu)), and the University of Illinois at Urbana-Champaign ([UIUC](https://illinois.edu)).

### Active Members
<table width="100%" border="0" align="center" cellspacing="0" cellpadding="0">
<tbody>
    <tr>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/levchenko.jpg" alt="Kirill Levchenko" class="avatar"/>
        </td>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/kc_claffy.jpg" alt="kc claffy" class="avatar"/>
        </td>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/bradbuffaker.png" alt="Bradley Huffaker" class="avatar"/>
        </td>
    </tr>
    <tr>
        <td width="30%" align="center" valign="middle">
            <p class="name">Kirill Levchenko (UIUC)</p>
        </td>
        <td width="30%" align="center" valign="middle">
            <p class="name">kc claffy (CAIDA)</p>
        </td>
        <td width="30%" align="center" valign="middle">
            <p class="name">Bradley Huffaker (CAIDA)</p>
        </td>
    </tr>
    <tr>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/rickymok.jpeg" alt="Ricky Mok" class="avatar"/>
        </td>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/tbyan.jpeg" alt="Tzu-Bin Yan" class="avatar"/>
        </td>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/jasonzhang.jpg" alt='Zesen "Jason" Zhang' class="avatar"/>
        </td>
    </tr>
    <tr>
        <td width="30%" align="center" valign="middle">
            <p class="name">Ricky Mok (CAIDA)</p>
        </td>
        <td width="30%" align="center" valign="middle">
            <p class="name">Tzu-Bin Yan (UIUC)</p>
        </td>
        <td width="30%" align="center" valign="middle">
            <p class="name">Zesen "Jason" Zhang (UCSD)</p>
        </td>
    </tr>
    <tr>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/patrickmarschoun.jpg" alt="Patrick Marschoun" class="avatar"/>
        </td>
        <td width="30%" align="center" valign="middle">
        </td>
        <td width="30%" align="center" valign="middle">
        </td>
    </tr>
    <tr>
        <td width="30%" align="center" valign="middle">
            <p class="name">Patrick Marschoun (UIUC)</p>
        </td>
        <td width="30%" align="center" valign="middle">
        </td>
        <td width="30%" align="center" valign="middle">
        </td>
    </tr>
</tbody>
</table>



### Past Members
<table width="100%" border="0" align="center" cellspacing="0" cellpadding="0">
<tbody>
    <tr>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/empty.png" alt="Lamya Alowain" class="avatar"/>
        </td>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/anshshah.png" alt="Ansh Shah" class="avatar"/>
        </td>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/vinaypillai.jpg" alt="Vinay Pillai" class="avatar"/>
        </td>
    </tr>
    <tr>
        <td width="30%" align="center" valign="middle">
            <p class="name">Lamya Alowain (UIUC)</p>
        </td>
        <td width="30%" align="center" valign="middle">
            <p class="name">Ansh Shah (UIUC)</p>
        </td>
        <td width="30%" align="center" valign="middle">
            <p class="name">Vinay Pillai (UCSD)</p>
        </td>
    </tr>
    <tr>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/michaelchen.jpg" alt='Yuxuan "Michael" Chen' class="avatar"/>
        </td>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/antheachen.jpg" alt='Anthea Chen' class="avatar"/>
        </td>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/tabishshaik.png" alt="Tabish Shaik" class="avatar"/>
        </td>
    </tr>
    <tr>
        <td width="30%" align="center" valign="middle">
            <p class="name">Yuxuan "Michael" Chen (UIUC)</p>
        </td>
        <td width="30%" align="center" valign="middle">
            <p class="name">Anthea Chen (UIUC)</p>
        </td>
        <td width="30%" align="center" valign="middle">
            <p class="name">Tabish Shaik (UIUC)</p>
        </td>
    </tr>
    <tr>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/richardmasserfrye.jpg" alt="Richard Masser-Frye" class="avatar"/>
        </td>
        <td width="30%" align="center" valign="middle">
            <img src="/assets/images/jingxuan.jpg" alt="Jingxuan Wu" class="avatar"/>
        </td>
        <td width="30%" align="center" valign="middle">
        </td>
    </tr>
    <tr>
        <td width="30%" align="center" valign="middle">
            <p class="name">Richard Masser-Frye (UCSD)</p>
        </td>
        <td width="30%" align="center" valign="middle">
            <p class="name">Jingxuan Wu (UIUC)</p>
        </td>
        <td width="30%" align="center" valign="middle">
        </td>
    </tr>
</tbody>
</table>

<style lang="css">
    .avatar {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
    }
    .name {
        margin: 0px;
        font-size: 16px;
        text-align: center;
    }
</style>

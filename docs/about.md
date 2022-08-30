---
layout: default
title: About
nav_order: 5
permalink: /about/
---

# About
This page contains information for the PacketLab project, including the problem PacketLab addresses, the PacketLab design, and the People behind PacketLab. Readers looking for more in depth information can also refer to the [original IMC'17 paper](https://www.caida.org/publications/papers/2017/packetlab/packetlab.pdf) that first introduced PacketLab to the measurement community.
> Part of the following text is adapted from the extended abstract *Poster: PacketLab - Tools Alpha Release and Demo* for the IMC'22 poster session.

## The Problem
One tricky problem for distributed network measurement studies is having access to the proper vantage points for experiment data collection. Due to the high cost of establishing and maintaining a large distributed measurement infrastructure, researcher have relied on sharing of measurement infrastructure. This nevertheless introduces new difficulties:
- **Compatibility**: Varying measurement platform designs require the taxing process of porting experiments across platforms.
- **Incentives**: Deploying new experiments requires platform operator support.
- **Trust**: Platforms supporting custom measurements limit their availability to vetted researchers for security reasons.

## The Design
In response to the difficulties, we proposed PacketLab. PacketLab addresses the aforementioned problems by two design choices:
1. Exporting the network (BSD-socket-like) interface of endpoints (i.e. vantage points) to experimenters via a common mechanism - the PacketLab protocol.
2. Introducing the use of cryptographic certificates with program-based restrictions for endpoint access control.

Exporting a common interface helps experiment compatibility via the notion of write once, run anywhere. Moreover, exporting a common interface reduces platform operator burden for new experiments as no effort other than interface maintenance is required. The relatively-simple BSD-socket-like interface also reduces the platform operator effort on supporting the PacketLab interface. The cryptographic certificate design enables a scalable trust architecture as operators can use PacketLab experiment privilege provisioning capabilities to customize restrictions.

## The People
PacketLab is currently being developed by a collaboration of students and researchers from the Center for Applied Data Analysis ([CAIDA](https://www.caida.org)), the University of California at San-Diego ([UCSD](https://ucsd.edu)), and the University of Illinois at Urbana-Champaign ([UIUC](https://illinois.edu)).

<div id="photowall">
    <div class="tile">
        <img src="/assets/images/levchenko.jpg" alt="Kirill Levchenko" class="avatar"/>
        <p class="name">Kirill Levchenko (UIUC)</p>
    </div>
    <div class="tile">
        <img src="/assets/images/kc_claffy.jpg" alt="kc claffy" class="avatar"/>
        <p class="name">kc claffy (CAIDA)</p>
    </div>
    <div class="tile">
        <img src="/assets/images/bradbuffaker.png" alt="Bradley Huffaker" class="avatar"/>
        <p class="name">Bradley Huffaker (CAIDA)</p>
    </div>
    <div class="tile">
        <img src="/assets/images/tbyan.jpeg" alt="Tzu-Bin Yan" class="avatar"/>
        <p class="name">Tzu-Bin Yan (UIUC)</p>
    </div>
    <div class="tile">
        <img src="/assets/images/rickymok.jpeg" alt="Ricky Mok" class="avatar"/>
        <p class="name">Ricky Mok (CAIDA)</p>
    </div>
    <div class="tile">
        <img src="/assets/images/jasonzhang.jpg" alt='Zesen "Jason" Zhang' class="avatar"/>
        <p class="name">Zesen "Jason" Zhang (UCSD)</p>
    </div>
    <div class="tile">
        <img src="/assets/images/michaelchen.jpg" alt='Yuxuan "Michael" Chen' class="avatar"/>
        <p class="name">Yuxuan "Michael" Chen (UIUC)</p>
    </div>
    <div class="tile">
        <img src="/assets/images/antheachen.jpg" alt='Anxue "Anthea" Chen' class="avatar"/>
        <p class="name">Anxue "Anthea" Chen (UIUC)</p>
    </div>
    <div class="tile">
        <img src="/assets/images/empty.png" alt="Lamya Alowain" class="avatar"/>
        <p class="name">Lamya Alowain (UIUC)</p>
    </div>
    <div class="tile">
        <img src="/assets/images/anshshah.png" alt="Ansh Shah" class="avatar"/>
        <p class="name">Ansh Shah (UIUC)</p>
    </div>
    <div class="tile">
        <img src="/assets/images/vinaypillai.jpg" alt="Vinay Pillai" class="avatar"/>
        <p class="name">Vinay Pillai (UCSD)</p>
    </div>
    <div class="tile">
        <img src="/assets/images/patrickmarschoun.jpg" alt="Patrick Marschoun" class="avatar"/>
        <p class="name">Patrick Marschoun (UIUC)</p>
    </div>
    <div class="tile">
        <img src="/assets/images/tabishshaik.png" alt="Tabish Shaik" class="avatar"/>
        <p class="name">Tabish Shaik (UIUC)</p>
    </div>
</div>

<style lang="css">
    .avatar {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
    }
    .tile {
        float: left;
        margin-left: 55px;
        margin-bottom: 30px;
    }
    @media screen and (max-width: 650px) {
        .tile {
            width: 100%;
            display: block;
        }
    }
    #team {
        margin-left: 20px;
    }
    .name {
        margin: 0px;
        font-size: 16px;
        text-align: center;
    }
</style>
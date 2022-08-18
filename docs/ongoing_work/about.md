---
layout: default
title: About
nav_order: 1
permalink: /about/
---

# About
This page contains general information on what PacketLab is, the problem PacketLab tries to solve, and how PacketLab can be used. Readers looking for more in depth information can also refer to the [original IMC'17 paper](https://www.caida.org/publications/papers/2017/packetlab/packetlab.pdf) that first introduced PacketLab to the measurement community.

> TODO: below

## The problem
Finding and having access to the proper vantage

PacketLab is a universal measurement endpoint interface that lowers the barriers faced by experimenters and measurement endpoint operators. PacketLab is designed to complement existing network measurement interfaces rather than replace them entirely.

PacketLab is based on two key ideas:
1. Moving measurement logic out of the endpoint to a separate experiment control server, making each endpoint a lightweight packet source/sink
2. Providing a way to delegate access to measurement endpoints while retaining fine-grained control over how endpoints are used

PacketLab is currently still under development, and many additions are underway. The current build of PacketLab (which can be downloaded at the top of this page) is suitable for creating and running experiments using an Experiment Controller and a Measurement Endpoint. A Broker and Proxy are currently in the works, as well as support for additional experiments.

## How is PacketLab used?

PacketLab makes **running network experiments** easier by connecting experimenters to measurement endpoints. What makes PacketLab powerful is its flexibility. Experimenters have control over the experiments they want to use PacketLab resources to run, and PacketLab supports the running of custom experiments.

PacketLab is also meant for experimenters interested in **writing network experiments** and exploring new frontiers of computer networking. The PacketLab library contains tools that can come in handy for many different types of experiments. The library's functions and objects make experiment-writing simpler, and help experiments run seamlessly with PacketLab endpoints and controllers.

However, **hosting experiments** is just as vital as writing them, and PacketLab is also made for endpoint operators. PacketLab endpoint operators can make their endpoints completely private, completely public, or anywhere in between. By volunteering your server as a public PacketLab endpoint, you enable experimenters to make discoveries through PacketLab and help advance computer networking knowledge.

PacketLab can also be used for **managing endpoints** and handling the sharing of measurement resources. Operators can restrict what experiments experimenters can run based on type or resources needed. This can come in handy for a small group using private endpoints for internal use, as well as for people hosting public endpoints that want to manage how much their endpoints are used and who is able to use them.

## Who made PacketLab?
PacketLab is currently being developed by a collaboration of students and researchers from the Center for Applied Data Analysis ([CAIDA](https://www.caida.org)), the University of California at San-Diego ([UCSD](https://ucsd.edu)), and the University of Illinois at Urbana-Champaign ([UIUC](https://illinois.edu)). The team consists of professional research scientists, professors, graduate students, and even some undergrads! Check out <a>**OUR TEAM**</a> of researchers and students.

[See the paper that started PacketLab]().

## Host an Endpoint!
Currently, PacketLab is not yet ready for endpoint operators to host public endpoints for PacketLab. However, we expect to be ready to welcome endpoint hosts very soon!
---
layout: default
title: PacketLab Overview
parent: Tutorial
nav_order: 1
permalink: /tutorial/pktlab_overview/
---

# PacketLab Overview
This page contains information w.r.t. the settings and jargons of PacketLab. The goal of this page is to allow software package users to have a better grasp of what is happening when setting up and running programs in the package in later tutorials. For users seeking more information on the design of PacketLab, see **[About](/about/)**.

## PacketLab Entities
In the PacketLab design, there are six types of entities: **[experimenters](#experimenter)**, **[experiment controllers](#experiment-controller)** (abbrev. controllers), **[endpoint operators](#endpoint-operator)**, **[measurement endpoints](#measurement-endpoint)** (abbrev. endpoints), **[broker operators](#broker-operator-and-broker)**, and **[brokers](#broker-operator-and-broker)**. Controllers, endpoints, and brokers are *agents* usually represented by computer processes and communicate with each other through the Internet. Experimenters and operators are *principals* (usually some real-world person) manipulating *privileges* and their owned agents. In the following sections, we provide more detailed description for each entity.

> TBA: picture on describing entity relation

### Experimenter
An experimenter entity represents a real-world network measurement researcher that wants to perform network measurements. To achieve this, the experimenter needs to request experiment privileges (in the form of certificates) from endpoint operators owning the required network resources, and then utilize the obtained privileges by running controllers that announce the experiments and carry out the actual measurement using the obtained privileges by submitting PacketLab protocol requests to endpoints.

#### Experiment Controller
Experiment controllers are computer processes run by experimenters that perform (1) the actual announcement of experiments and (2) the execution of measurements via the PacketLab protocol. The announcement of an experiment is done by contacting a broker agent and publishing *experiment descriptors*, which are strings describing the experiment containing information such as controller address and experiment priority, etc. Before a publication is accepted, the controller will also need to demonstrate that sufficient experiment privilege has been obtained for publication via supplying a valid privilege certificate chain to the broker. After publication, controllers simply wait for incoming endpoints that responded to the publication. For an incoming endpoint, a controller first demonstrates (again) that sufficient experiment privilege has been obtained to the endpoint, and only after successful endpoint verification is the actual measurement carried out using the PacketLab protocol against the endpoint.

Note for the PacketLab software package, the controller is represented via two parts: the Experiment Manager Utility program `pktxpmgr` that handles the experiment publication and endpoint connection setup (both including privilege demonstration), and the exchangeable mlets accepted by `pktxpmgr` that handle the actual measurement logic.

### Endpoint Operator
An endpoint operator entity represents a real-world network measurement researcher that wants to volunteer their network resource for the community to utilize for measurement experiments. To achieve this, the endpoint operator will need to hand out experiment privileges (in the form of signing certificates) to requesting experimenters, and also run endpoints that will subscribe for experiments and contact controllers for actual measurement running via serving PacketLab protocol requests.

#### Measurement Endpoint
Measurement endpoints are computer processes run by endpoint operators that perform (1) the actual subscription of experiments and (2) the execution of measurement network operations based on PacketLab protocol requests. The subscription of an experiment is done by contacting a broker agent for a subscription and waiting for notifications containing *experiment descriptors* from the broker after subscription. For an incoming notification, the endpoint first connects to the controller specified by the descriptor, then verifies the corresponding experiment privilege presented by the controller. Only if the verification passes will the endpoint continue serving the controller.
> Note that similar to controllers, before a subscription is accepted, the endpoint will need to demonstrate that sufficient representation privilege (i.e. the subscription is allowed by some endpoint operator) has been obtained for a subscription via supplying a valid privilege certificate chain to the broker.

Note for the PacketLab software package, the endpoint is represented via the Reference PacketLab Endpoint Program `pktendpt`.

### Broker Operator and Broker
In PacketLab, broker operators are volunteers that help facilitate experiments running by running the broker which performs matching-making among controller and endpoints by supporting experiment publication and subscription. Currently, no broker program is shipped within the PacketLab software package. Instead, PacketLab users are encouraged to utilize the public broker server hosted at the Center for Applied Internet Data Analysis (CAIDA) at `pktbrokr.caida.org`.

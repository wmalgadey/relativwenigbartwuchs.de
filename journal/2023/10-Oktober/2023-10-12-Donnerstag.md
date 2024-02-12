---
tags:
  - type/journal/daily
  - okd
title: 10-12 Donnerstag
date: 2024-02-04T16:13
modified: 2024-02-04T18:26
---

<< [[2023-10-11-Mittwoch|Mittwoch]] | [[2023-10-13-Freitag|Freitag]] >>

# [[2023-10-12-Donnerstag|10-12 Donnerstag]]

* https://docs.okd.io/latest/installing/installing-troubleshooting.html
```
rm -rf os

scp -r root@pve-01:/root/okd os

chmod -R +xrw os

openshift-install --dir=os/okd/ignitions wait-for bootstrap-complete --log-level=debug

openshift-install gather bootstrap --dir os/okd/ignitions --bootstrap okd-bootstrap.homelab.zwonull.local --master okd-master-0.homelab.zwonull.local
```

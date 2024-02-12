---
title: <% tp.file.title %>
date: <%Ttp.file.creation_date() %>
tags:
  - type/journal/daily
  - journal/year/<% tp.date.now("YYYY", 0, tp.file.title, "YYYY-MM-DD-dddd")%>
  - journal/month/<% tp.date.now("YYYY-MM", 0, tp.file.title, "YYYY-MM-DD-dddd")%>
  - journal/day/<% tp.date.now("YYYY-MM-DD-dddd", 0, tp.file.title, "YYYY-MM-DD-dddd")%>
type: journal
---

[[journal]]

<< [[<% tp.date.now("YYYY-MM-DD-dddd", -1, tp.file.title, "YYYY-MM-DD-dddd") %>|<% tp.date.now("dddd", -1, tp.file.title, "YYYY-MM-DD-dddd") %>]] | [[<% tp.date.now("YYYY-MM-DD-dddd", 1, tp.file.title, "YYYY-MM-DD-dddd") %>|<% tp.date.now("dddd", 1, tp.file.title, "YYYY-MM-DD-dddd") %>]] >>

# [[<% tp.file.title %>|<% tp.date.now("MM-DD dddd", 0, tp.file.title, "YYYY-MM-DD-dddd") %>]]

- ...

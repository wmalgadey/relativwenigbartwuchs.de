---
title: <% tp.file.title == "index.md" ? tp.file.folder() : tp.file.title %>
status:
source:
categories:
  - Website
tags:
  - type/note
type: note
date: <%tp.file.creation_date() %>
---

[[notes]]

# [[<% tp.file.title == "index.md" ? tp.file.folder() : tp.file.title %>]]

<% tp.file.cursor() %>

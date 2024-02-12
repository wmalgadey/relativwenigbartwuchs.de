---
title: <% tp.file.title == "index.md" ? tp.file.folder() : tp.file.title %>
categories:
tags:
 - type/post
type: post
date: <%Ttp.file.creation_date() %>
---

# [[<% tp.file.title == "index.md" ? tp.file.folder() : tp.file.title %>]]

<% tp.file.cursor() %>
---
source: https://thisdavej.com/copy-table-in-excel-and-paste-as-a-markdown-table/
---
![[copy-excel-paste-markdown.png]]

Copy a table from Excel or Google Sheets and paste it into the text box below to create a Markdown table. This online tool is made possible by Jonathan Hoyt’s innovative [copy-excel-paste-markdown](https://github.com/jonmagic/copy-excel-paste-markdown) code. I’ve also modified his code to [create a version](https://github.com/thisdavej/copy-excel-paste-markdown) that supports column alignments as explained below. Here are the steps:

1. In Excel or Google Sheets, select a range of cells and press Ctrl+C to copy.
2. Paste (Ctrl+V) into the text box below to create a Markdown table.

### Additional Notes

- If your table is wide, the resulting text in the text box will appear to be wrapped and misaligned; however, everything will align properly when you copy it from the text box and paste it into your Markdown editor/text editor.
- I have written an article on [using Markdown with Visual Studio Code](https://thisdavej.com/build-an-amazing-markdown-editor-using-visual-studio-code-and-pandoc/) if you are looking for a good Markdown editor.

### Column Alignments

You can optionally specify column alignment information by prepending one of the following to the column heading names in Excel:

- ^c – center alignment
- ^r – right alignment
- ^l – left alignment (the default)

For example: enter the following in Excel to right-align the second column and center-align the third column:

This will produce the following markdown table when pasted:

```
| animal | weight | color  |
|--------|-------:|:------:|
| dog    | 30lb   | tan    |
| dog    | 85lb   | black  |
| cat    | 18lb   | calico |
```

Enjoy!

### Additional articles

[Build an Amazing Markdown Editor Using Visual Studio Code and Pandoc](https://thisdavej.com/build-an-amazing-markdown-editor-using-visual-studio-code-and-pandoc/)[Guide to Installing Node.js on a Raspberry Pi](https://thisdavej.com/beginners-guide-to-installing-node-js-on-a-raspberry-pi/)[Debian apt Command Cheat Sheet](https://thisdavej.com/while-i-napped-we-got-a-new-apt-debian-apt-command-cheat-sheet/)[Consuming JSON Web Data Using Google Sheets](https://thisdavej.com/consuming-json-web-data-using-google-sheets/)

[Follow @thisDaveJ](https://twitter.com/thisDaveJ) (Dave Johnson) on Twitter to stay up to date with the latest tutorials and tech articles.
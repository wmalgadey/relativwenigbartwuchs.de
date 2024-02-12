---
categories:
  - Webseite
status: gefunden
source: https://en.wikibooks.org/wiki/LaTeX/Glossary
tags:
  - Pandoc
  - Markdown
  - PDF
type: note
area:
  - Forschung-und-Portfolio
project:
  - APOSAN-Pacemaker
---

# LaTex Glossary

Many technical documents use terms or acronyms unknown to the general population. It is common practice to add a glossary to make such documents more accessible.

The glossaries package can be used to create glossaries. It supports multiple glossaries, acronyms, and symbols. This package replaces the glossary package and can be used instead of the nomencl package.[[1]](https://en.wikibooks.org/wiki/LaTeX/Glossary) Users requiring a simpler solution should consider hand-coding their entries by using the [description](https://en.wikibooks.org/wiki/LaTeX/List_Structures) environment, or the [longtabu](https://en.wikibooks.org/wiki/LaTeX/Tables) environment provided by the tabu package.

Place `\usepackage{glossaries}` and `\makeglossaries` in your preamble (after `\usepackage{hyperref}` if present). Then define any number of `\newglossaryentry` and `\newacronym` glossary and acronym entries in your preamble (recommended) or before first use in your document proper. Finally add a `\printglossaries` call to locate the glossaries list within your document structure. Then pepper your writing with `\gls{mylabel}` macros (and similar) to simultaneously insert your predefined text and build the associated glossary. File processing must now include a call to `makeglossaries` followed by at least one further invocation of `latex` or `pdflatex`.

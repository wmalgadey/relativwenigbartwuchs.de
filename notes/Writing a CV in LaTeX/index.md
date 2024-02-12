---
source: https://texblog.org/2012/04/25/writing-a-cv-in-latex/
---
Writing my curriculum in LaTeX was a task that has been on my TODO-list for quite a while. I liked the style of my Word-written CV and I believed it would take hours to come up with a reasonable CV in LaTeX. Nevertheless, I recently sat down, began writing, and after not too long, I came up with a presentable result that I would like to share.

A complete minimal example can be found at the end of this post.

**The Title**

In order to even spacing all around, we change the page margins to 3cm using the geometry package. We further make use of the standard article maketitle command, printing the person’s name (title field) and e-mail address (author field).

```
\documentclass
```

```
[10pt]{article}
```

```
\usepackage
```

```
[margin=3cm]{geometry}
```

```
\title
```

```
{
```

```
\bfseries
```

```
\Huge
```

```
Tom T. Texblog}
```

```
\author
```

```
{texblog+cv@gmail.com}
```

```
\date
```

```
{}
```

```
\begin
```

```
{document}
```

```
\maketitle
```

```
\end
```

```
{document}
```

![[cv-title11.png]]

In case you prefer to add a photo to your CV, try the following slightly more complex code, using minipage:

```
\documentclass
```

```
[10pt]{article}
```

```
\usepackage
```

```
[margin=3cm]{geometry}
```

```
\title
```

```
{
```

```
\bfseries
```

```
\Huge
```

```
Tom T. Texblog}
```

```
\author
```

```
{texblog+cv@gmail.com}
```

```
\date
```

```
{}
```

```
\begin
```

```
{document}
```

```
\begin
```

```
{minipage}{0.65
```

```
\textwidth
```

```
}
```

```
\begingroup
```

```
\let
```

```
\center
```

```
\flushleft
```

```
\let
```

```
\endcenter
```

```
\endflushleft
```

```
\maketitle
```

```
\endgroup
```

```
\end
```

```
{minipage}
```

```
\begin
```

```
{minipage}{0.3
```

```
\textwidth
```

```
}
```

```
\flushright
```

```
{
```

```
\rule
```

```
{3.5cm}{4.5cm}}
```

```
\end
```

```
{minipage}
```

```
\end
```

```
{document}
```

![[cv-title-photo1.png]]

**Address and Personal Information**

We use minipage again to split the page into two parts, one for the address and the second for some personal information if that’s required. Straight forward.

```
\begin
```

```
{minipage}[ht]{0.48
```

```
\textwidth
```

```
}
```

```
Main Road 25
```

```
\
```

```
\
```

```
City 12345
```

```
\
```

```
\
```

```
State of Sabotage
```

```
\end
```

```
{minipage}
```

```
\begin
```

```
{minipage}[ht]{0.48
```

```
\textwidth
```

```
}
```

```
Nonlandian
```

```
\
```

```
\
```

```
January 3rd, 2020
```

```
\
```

```
\
```

```
+12 34 56 789
```

```
\end
```

```
{minipage}
```

![[cv-address1.png]]

The space between the title and the address is just about right. To add more space, use:

```
\vspace
```

```
{2em}
```

**The Content**

After the cosmetics, we now add the actual content. We use the standard article section with a star to omit numbering. Sections may include: Objective (of the CV), Professional Experience, Education, Languages, Publications, Programming Languages, etc. We will show a few examples here, the structure is always the same.

Let’s first prepare the content with some code in the preamble. We use the tabular environment to divide the page into two columns, a small column for the year/title and a wide column for the description. In order to minimize typing, we define two new columntypes in the preamble, “L” and “R” as well as a thin light-gray line in between, \VRule.

Now we can start creating content sections using the tabular environment as follows:

For better readability, we add small vertical spaces between rows in the tabular.

**Education**

Let’s start by looking at the example with education. We highlighted the parts in bold which are most recent or most important.

**Languages**

Here, we use the left column for the language and the right column for the level of proficiency.

**Professional Experience**

![[cv-profexp11.png]]

**Publications**

We use the [bibentry package](http://www.ctex.org/documents/packages/bibref/bibentry.pdf) to generate an inline list of publications. The references are stored in a bibtex file.

**Minimal Example CV**

![[cv-test-full1.png]]

**Additional Resources**

- [**moderncv: A modern curriculum vitae class**](http://www.ctan.org/pkg/moderncv)
- [CVs on LaTeX templates](http://www.latextemplates.com/cat/curricula-vitaes)

Drop me a comment if you know of other resources and I will add them to the list.

**Update**

A few days after publishing this post, a vivid discussion took place with lots of interesting CV examples on [hackerne.ws](http://hackerne.ws/item?id=3901506).
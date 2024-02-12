---
date: 2024-01-01
modified: 2024-02-04T18:26
source: https://swizec.com/blog/how-to-export-a-large-wordpress-site-to-markdown
title: How to export a large Wordpress site to Markdown
---

# How to export a large Wordpress site to Markdown

![[How-to-export-a-large-Wordpress-site-to-Markdown.png]]

This is a technical followup to [Lessons from migrating a 14 year old blog with 1500 posts to Gatsby](https://swizec.com/blog/lessons-from-migrating-a-14-year-old-blog-with-1500-posts-to-gatsby/).

Migrating from Wordpress to Markdown sounds easy. Mention it to any developer and they'll say _"Pfft, an afternoon of work at worst"_

- take a Wordpress export from admin tools – 10min
- find a script that converts to markdown – 20min
- sip margaritas while the script runs – 1h

Suddenly it's 6months later and you're losing your mind.

[When I started migrating in September 2019](https://swizec.com/blog/moving-13-years-of-wordpress-blog-to-gatsby-markdown/), there were no good scripts. Best I could find was somebody's 7 year old college project – [wordpress-to-markdown](https://github.com/DengYiping/wordpress-to-markdown).

Complete with bugs, old JavaScript, and gnarly edge cases on my humongous site. Your site accumulates lots of cruft in 14 years 😅

> A script that converts Wordpress dumps into clean Markdown may have been the dumbest project I ever took on. Sooooo many edge cases 😅 pic.twitter.com/z8dPUMrBGk— Swizec Teller (@Swizec) August 25, 2020

Nowadays you have [wordpress-export-to-markdown](https://github.com/lonekorean/wordpress-export-to-markdown) from @lonekorean. Works better and is easier to use.

> Dude, did you not come across this? https://t.co/ZguvarKuyZ— Kyle Shevlin (@kyleshevlin) August 25, 2020

But the output isn't what I wanted. Great for simple cases, doesn't deal with all the edge cases on a large technical site.

## [The challenge](https://swizec.com/blog/how-to-export-a-large-wordpress-site-to-markdown)

The core challenge is two-fold: The easy part and the hard part.

**The easy part** is that Worpdress outputs valid XML that you have to parse. Tons of good libraries for this, problem solved.

You also want to download images.

Wordpress likes to use linked `<img>` tags. Sometimes 3rd party, sometimes part of the site.

Gatsby, NextJS, Hugo, and other Markdown-based site generators prefer that you keep images part of your source code. Lets you do fun transformations, hosting via CDN, and ensures you don't lose your images.

I lost many images to [link rot](https://en.wikipedia.org/wiki/Link_rot) ☹️

**The hard part** is that Wordpress HTML is not valid HTML.

And that's where the fun begins.

[https://media4.giphy.com/media/xUPGctzUJGYIUnQNqw/giphy-loop.mp4?cid=7cf28b0fvxknihkvamja0k6cxe2v22x441hk4r9diduy58pa&rid=giphy-loop.mp4](https://media4.giphy.com/media/xUPGctzUJGYIUnQNqw/giphy-loop.mp4?cid=7cf28b0fvxknihkvamja0k6cxe2v22x441hk4r9diduy58pa&rid=giphy-loop.mp4)

You're looking for a script that builds a processing pipeline:

1. Parse XML
2. Iterate through posts
3. Create a `/out/<slug>` directory
4. Create a `/out/<slug>/img` directory for images
5. Extract metadata into Markdown frontmatter
6. Download images into the `/img` directory
7. Hacks to convert Wordpress HTML into almost valid HTML
8. Parse said HTML into a Markdown Abstract Syntax Tree (AST)
9. Fix edge cases in your AST
10. Output clean Markdown with frontmatter into `/out/<slug>/index.md`

You can see this setup in my [wordpress-to-markdown script](https://github.com/Swizec/wordpress-to-markdown).

```js
function processExport(file) {const parser = new xml2js.Parser()  fs.readFile(file, function (err, data) {if (err) {return console.log("Error: " + err)    parser.parseString(data, function (err, result) {if (err) {return console.log("Error parsing xml: " + err)console.log("Parsed XML")const posts = result.rss.channel[0].item      fs.mkdir("out", function () {.filter((p) => p["wp:post_type"][0] === "post").forEach(processPost)
```

Parses the XML, iterates through `<item>` entries, and runs `processPost` on each.

### [Metadata into Frontmatter](https://swizec.com/blog/how-to-export-a-large-wordpress-site-to-markdown)

I wanted to create full frontmatter without manual edits. That means:

Title from post title, description based on meta data, a publish date, keep old URL for redirects, combine categories and tags into categories, find a good hero/social image.

Data comes from digging around Wordpress exports and figuring out what fits.

```js
const postTitle = typeof post.title === "string" ? post.title : post.title[0]console.log("Post title: " + postTitle)const postDate = isFinite(new Date(post.pubDate))? new Date(post.pubDate): new Date(post["wp:post_date"])console.log("Post date: "T+ postDate)let postData = post["content:encoded"][0]console.log("Post length: " + postData.length + " bytes")const slug = slugify(postTitle, {  remove: /[^\w\s]/g,.toLowerCase().replace(/\*/g, "")console.log("Post slug: " + slug)const description = [  post.description,...post["wp:postmeta"].filter((meta) =>      meta["wp:meta_key"][0].includes("metadesc") ||      meta["wp:meta_key"][0].includes("description")].sort((a, b) => b.length - a.length)[0]const categories = post.category && post.category.map((cat) => cat["_"])
```

Despite this, you'll notice lots of empty descriptions. Folks get lazy and don't write custom descriptions because Wordpress can guess from the article. I know I did 😇

Should I add that guess-work or write 1500 descriptions by hand 🤔

Finding the hero image is a matter of processing all images in your article and picking the first.

Initial candidates come from your meta data.

```js
const heroURLs = post["wp:postmeta"].filter((meta) =>      meta["wp:meta_key"][0].includes("opengraph-image") ||      meta["wp:meta_key"][0].includes("twitter-image").map((meta) => meta["wp:meta_value"][0]).filter((url) => url.startsWith("http"))
```

The rest come from your article body.

```js
let images = []if (heroURLs.length > 0) {const url = heroURLs[0];[postData, images] = await processImage({;[postData, images] = await processImages({ postData, directory })heroImage = images.find((img) => !img.endsWith("gif"))
```

From all this metadata, frontmatter comes together with a bit of string concatenation.

```js
  frontmatter = [`title: '${postTitle.replace(/'/g, "''")}'`,`description: "${description}"`,`published: ${format(postDate, "yyyy-MM-dd")}`,        - ${redirect_from}`,} catch (e) {console.log("----------- BAD TIME", postTitle, postDate)if (categories && categories.length > 0) {  frontmatter.push(`categories:
  - "${categories.join(", ")}"`)frontmatter.push(`hero: ${heroImage || "../../../defaultHero.jpg"}`)frontmatter.push("---")frontmatter.push("")
```

Okay that's the easy part.

## [Converting to Markdown and fixing edge cases](https://swizec.com/blog/how-to-export-a-large-wordpress-site-to-markdown)

Converting Wordpress's invalid HTML to Markdown is the fun part. Edge cases make it even better.

You can choose 2 paths here:

- [turndown](https://github.com/domchristie/turndown), which is a solid HTML to Markdown converter that I didn't know about when doing this
- [UnifiedJS](https://unifiedjs.com/), which is a suite of tools for manipulating ASTs used by a lot of popular libraries

I went with Unified.

Core setup looks like a pipeline of plugins. You start with an input string, parse it as HTML, turn it into Markdown, output as text.

```js
const markdown = await new Promise((resolve, reject) => {unified().use(parseHTML, {      fragment: true,      emitParseErrors: true,      duplicateAttribute: false,.use(fixCodeBlocks) // edge case.use(fixEmbeds) // edge case.use(rehype2remark).use(cleanupShortcodes) // edge-ish case.use(stringify, {      fences: true,      listItemIndent: 1,      gfm: false,      pedantic: false,.process(fixBadHTML(postData), (err, markdown) => {if (err) {reject(err)} else {let content = markdown.contents        content = content.replace(/(?<=https?:\/\/.*)\\_(?=.*\n)/g, "_")resolve(prettier.format(content, { parser: "mdx" }))
```

Wordpress HTML is pretty good. Plop it in an HTML parser and, like, it won't choke ... but it won't parse correctly either.

You'll need to change double newlines to paragraph breaks. Wordpress doesn't wrap paragraphs in `<p></p>` tags

```js
function fixBadHTML(html) {  html = html.replace(/(\r?\n){2}/g, "<p></p>")
```

Yep, Regex for HTML fixing. Find double newlines, replace with empty paragraphs.

### [Edge case 2: Bad code blocks](https://swizec.com/blog/how-to-export-a-large-wordpress-site-to-markdown)

I wrote about fixing bad code blocks in my [You though computer science has no place in webdev? Here's a fun coding challenge](https://swizec.com/blog/you-though-computer-science-has-no-place-in-webdev-heres-a-fun-coding-challenge/) article.


JSX tags get parsed as HTML and break your code block. You want them to include a `<code></code>` tag as well. Otherwise Markdown stringifying doesn't work right.

Fixing this is tricky and I won't share the full code here. You can see it in [articleCleanup.js line 77](https://github.com/Swizec/wordpress-to-markdown/blob/master/articleCleanup.js#L77). All 139 lines of it 🤘

The process goes like this:

1. Find code blocks
2. Grab language definition
3. Replace children with a `<code>` element
4. Fix JSX object props in child nodes
5. Stringify block into HTML
6. Clean HTML with gnarly regex buffoonery
7. Run result through Prettier

```js
for (let block of codeBlocks) {const lang = block.properties && block.properties.lang  block.children = [      type: "element",      tagName: "code",      properties: {        className: lang ? [`language-${lang}`] : null,      children: [          type: "text",          value: cleanBlockHTML(toHTML(fixJsxObjectProps(block), settings),            block.properties && block.properties.lang
```

### [Edge case 3: Fixing embeds](https://swizec.com/blog/how-to-export-a-large-wordpress-site-to-markdown)

Lots of ways to embed 3rd party content on a wordpress site. You can use plain old links pasted on their own line, shortcodes, and full HTML embeds.

Markdown site generators like to use plain links.

You want to change code like:

```html
<blockquote class="twitter-tweet"><p lang="en" dir="ltr"><a href="https://t.co/z8dPUMrBGk">pic.twitter.com/z8dPUMrBGk</a></p>href="https://twitter.com/Swizec/status/1298308910072307713?ref_src=twsrc%5Etfw">August 25, 2020</asrc="https://platform.twitter.com/widgets.js"charset="utf-8"></script>
```

Into Markdown that's a link:

```
https://twitter.com/Swizec/status/1298308910072307713
```

Site generator can take this and turn it into an embed. When it starts as a blockquote, you'll have trouble.

[Another 106 lines of code](https://github.com/Swizec/wordpress-to-markdown/blob/master/articleCleanup.js#L220) that I won't share here.

Basic idea is that:

1. You find all blockquote nodes
2. All iframe nodes
3. All paragraph nodes
4. Filter for potential embeds
5. Fix the AST for each embed you want to support

Taking Twitter as an example, you get this:

```js
function fixEmbeds() {function isTweet(blockquote) {return (      blockquote.properties &&      blockquote.properties.className &&      blockquote.properties.className.includes("twitter-tweet")return (tree) => {const blockquotes = findRehypeNodes(tree, "blockquote")for (let blockquote of blockquotes) {if (isTweet(blockquote)) {const link = findRehypeNodes(blockquote, "a").pop()        blockquote.type = "element"        blockquote.tagName = "p"        blockquote.children = [{ type: "text", value: link.properties.href }]
```

### [Edge case 4: Fixing shortcodes](https://swizec.com/blog/how-to-export-a-large-wordpress-site-to-markdown)

Shortcodes are a semi-standard system of snippets. Denoted by `[]` they give CMS users the ability to go beyond writing text.

These were popular on internet forums of the late 2000's. Wordpress supports them to this day. Don't know about others.

I wanted to get rid of most and preserve any embeds.

You can identify an embed because it's a closed shortcode prefixed with the name of a service followed by a link.

The gnarly ones are Wordpress's almost-html shortcodes. Big issue on my site were the `[caption][/caption]` shortcodes.

```html
[caption id="" align="alignnone" width="560"]<imgclass=" "title="Spirograph"src="http://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Spirograph3.jpg/800px-Spirograph3.jpg"alt="Spirograph"width="560"height="420"class="zem_slink"title="Spirograph"href="http://en.wikipedia.org/wiki/Spirograph"rel="wikipedia"target="_blank">Spirograph</a>
```

It's a shortcode tag with an image and a link. You want to get a clean Markdown image out of this. 🤨

You fix this mess by:

1. Finding all paragraphs
2. Seeing if they contain shortcodes
3. Cleaning it up with Regex

Core structure is an AST traversal with a loop over candidates:

```js
function cleanupShortcodes() {const shortCodeOpenTag = /\[\w+ .*\]/gconst shortCodeCloseTag = /\[\/\w+]/gconst embedShortCode = /\[\w+ (https?:\/\/.*)\]/gconst captionShortCode = /\[caption.*\]/greturn (tree) => {visit(tree, "text", (node, index, parent) => {if (parent.type === "paragraph" && node.value) {
```

Inside the loop you then:

1. Turn embed shortcodes into plain URLs with regex

```js
if (node.value.match(embedShortCode)) {  node.value = node.value.replace(embedShortCode, "$1")
```

1. Turn `[caption]` shortcodes into image nodes

```js
if (node.value.match(captionShortCode)) {visit(parent, "text", (node) => {    node.value = ""visit(parent, "link", (node) => {    node.type = "image"    node.title = node.children[0].title    node.alt = node.children[0].alt    node.url = node.children[0].url    node.children = []
```

This changes the parent paragraph node into an image and deletes all children text nodes.

1. Remove other shortcodes

```js
node.value = node.value.replace(shortCodeOpenTag, "").replace(shortCodeCloseTag, "")
```

I couldn't find a use for them ✌️

### [Edge case 5: Underscores in links](https://swizec.com/blog/how-to-export-a-large-wordpress-site-to-markdown)

This one was frustrating. Embed links can include underscores, like when you embed a tweet from `@_developit`.

Markdown stringification escapes underscores because it thinks they're emphasis and doesn't understand that some text nodes are link nodes despite not being links.

```
https://twitter.com/_developit/status/1300154097170083842
```

That breaks your embed machinery. 🤪

You can fix it with a dirty regex hack:

```js
let content = markdown.contentscontent = content.replace(/(?<=https?:\/\/.*)\\_(?=.*\n)/g, "_")
```

The reverse lookup with `(?<=)` ensures you don't touch escaped underscores anywhere other than links.[1](https://swizec.com/blog/how-to-export-a-large-wordpress-site-to-markdown)

## [The solution](https://swizec.com/blog/how-to-export-a-large-wordpress-site-to-markdown)

You can use my script 👉 [github/Swizec/wordpress-to-markdown](https://github.com/Swizec/wordpress-to-markdown)

Deals with every edge case described above, produces clean markdown output. Even runs it through Prettier ✌️

PRs welcome.

Cheers,
~Swizec

[1](https://swizec.com/blog/how-to-export-a-large-wordpress-site-to-markdown) the look-behind and look-ahead support in PCRE regexes means they are technically more powerful than regular languages. On the level of pushdown automata I think.

Here's how it works 👇

Leave your email and I'll send you an **Interactive Modern JavaScript Cheatsheet** 📖right away. After that you'll get thoughtfully written emails every week about **React**, **JavaScript**, and **your career**. Lessons learned over my 20 years in the industry working with companies ranging from tiny startups to Fortune5 behemoths.

Then get thoughtful letters 💌 on **mindsets, tactics, and technical skills** for your career.

"Man, love your simple writing! Yours is the only email I open from marketers and only blog that I give a fuck to read & scroll till the end. And wow always take away lessons with me. Inspiring! And very relatable. 👌"

Join over 10,000 engineers just like you already improving their careers with my letters, workshops, courses, and talks. ✌️

**Have a burning question that you think I can answer?** I don't have all of the answers, but I have some! Hit me up on [twitter](https://twitter.com/swizec) or book a [30min ama](https://calendly.com/swizec/quick-ama) for in-depth help.

**Ready to Stop copy pasting D3 examples and create data visualizations of your own?** Learn how to build scalable dataviz components your whole team can understand with [React for Data Visualization](https://reactfordataviz.com/)

**Curious about Serverless and the modern backend?** Check out [Serverless Handbook](https://serverlesshandbook.dev/), modern backend for the frontend engineer.

**Ready to learn how it all fits together and build a modern webapp from scratch?** Learn how to launch a webapp and make your first 💰 on the side with [ServerlessReact.Dev](https://serverlessreact.dev/)

**Want to brush up on your modern JavaScript syntax?** Check out my interactive cheatsheet: [es6cheatsheet.com](https://es6cheatsheet.com/)

**By the way, just in case no one has told you it yet today: I love and appreciate you for who you are ❤️**
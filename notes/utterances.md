---
categories:
  - Webseite
source: https://utteranc.es/
tags:
  - comments
  - web
  - SSG
---
A lightweight comments widget built on GitHub issues. Use GitHub issues for blog comments, wiki pages and more!

- [Open source](https://github.com/utterance). 🙌
- No tracking, no ads, always free. 📡🚫
- No lock-in. All data stored in GitHub issues. 🔓
- Styled with [Primer](http://primer.style/), the css toolkit that powers GitHub. 💅
- Dark theme. 🌘
- Lightweight. Vanilla TypeScript. No font downloads, JavaScript frameworks or polyfills for evergreen browsers. 🐦🌲

## how it works

When Utterances loads, the GitHub [issue search API](https://developer.github.com/v3/search/#search-issues) is used to find the issue associated with the page based on `url`, `pathname` or `title`. If we cannot find an issue that matches the page, no problem, [utterances-bot](https://github.com/utterances-bot) will automatically create an issue the first time someone comments.

To comment, users must authorize the utterances app to post on their behalf using the GitHub [OAuth flow](https://developer.github.com/v3/oauth/#web-application-flow). Alternatively, users can comment on the GitHub issue directly.

## configuration

### Repository

Choose the repository utterances will connect to.

1. Make sure the repo is public, otherwise your readers will not be able to view the issues/comments.
2. Make sure the [utterances app](https://github.com/apps/utterances) is installed on the repo, otherwise users will not be able to post comments.
3. If your repo is a fork, navigate to its _settings_ tab and confirm the _issues_ feature is turned on.

repo:

A **public** GitHub repository. This is where the blog post issues and issue-comments will be posted.

### Blog Post ↔️ Issue Mapping

Choose the mapping between blog posts and GitHub issues.

Issue title contains page pathname

Utterances will search for an issue whose title contains the blog post's pathname URL component. If a matching issue is not found, Utterances will automatically create one the first time someone comments on your post.

Issue title contains page URL

Utterances will search for an issue whose title contains the blog post's URL. If a matching issue is not found, Utterances will automatically create one the first time someone comments on your post.

Issue title contains page title

Utterances will search for an issue whose title contains the blog post's title. If a matching issue is not found, Utterances will automatically create one the first time someone comments on your post.

Issue title contains page og:title

Utterances will search for an issue whose title contains the page's [Open Graph](http://ogp.me/) title meta. If a matching issue is not found, Utterances will automatically create one the first time someone comments on your post.

Specific issue number

You configure Utterances to load a specific issue by number. Issues are not automatically created.

Issue title contains specific term

You configure Utterances to search for an issue whose title contains a specific term of your choosing. If a matching issue is not found, Utterances will automatically create one the first time someone comments on your post. The issue's title will be the term you chose.

### Issue Label

Choose the label that will be assigned to issues created by Utterances.

label (optional):

Label names are case sensitive. The label must exist in your repo- Utterances cannot attach labels that do not exist. Emoji are supported in label names.✨💬✨

### Theme

Choose an Utterances theme that matches your blog. Can't find a theme you like? [Contribute](https://github.com/utterance/utterances/blob/master/CONTRIBUTING.md) a custom theme.

GitHub Light

### Enable Utterances

Add the following script tag to your blog's template. Position it where you want the comments to appear. Customize the layout using the `.utterances` and `.utterances-frame` selectors.

```
<script src="https://utteranc.es/client.js"
        repo="[ENTER REPO HERE]"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```

## sites using utterances

- Haxe [documentation](https://haxe.org/manual) and [cookbook](https://code.haxe.org/)
- [sadsloth.net](https://sadsloth.net/)
- [danyow.net](https://danyow.net/)
- [**and many more...**](https://github.com/topics/utterances)

Are you using utterances? [Add the](https://docs.github.com/en/github/administering-a-repository/classifying-your-repository-with-topics) [`utterances`](https://docs.github.com/en/github/administering-a-repository/classifying-your-repository-with-topics) [topic on your repo](https://docs.github.com/en/github/administering-a-repository/classifying-your-repository-with-topics)!

# try it out 👇👇👇
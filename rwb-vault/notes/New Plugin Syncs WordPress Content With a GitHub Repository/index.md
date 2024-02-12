---
source: https://wptavern.com/new-plugin-syncs-wordpress-content-with-a-github-repository
---
![[wpvsgithub.jpg]]

WordPress is excellent for writing posts privately by yourself and can be extended to allow collaborative writing with other registered authors. But what if you could open up your posts and revisions to even more contributors without requiring them to register to your site or even use WordPress?

[WordPress GitHub Sync](https://github.com/benbalter/wordpress-github-sync) is a new plugin that enables collaborative writing. It was created by [Ben Balter](https://twitter.com/BenBalter), who has fully embraced this practice and hosts his [blog](http://ben.balter.com/) on GitHub pages where you can view all of his drafts and revisions. Balter is also the creator of the first working prototype of what later became version 0.1 of the [Post Forking](https://wptavern.com/introducing-wordpress-post-forking-version-control-for-writers) plugin, which offers version control for writers working in WordPress.

### Collaborative Writing with WordPress and GitHub

[WordPress GitHub Sync](https://github.com/benbalter/wordpress-github-sync) makes it possible for you to accept pull requests to your WordPress posts. Additionally, if you are blogging with [Jekyll](http://jekyllrb.com/), the plugin enables you to author your Jekyll site with WordPress’ user-friendly web interface.

Balter outlines the three major benefits of WordPress GitHub Sync:

- Allows content publishers to version their content in GitHub, exposing “who made what change when” to readers
- Allows readers to submit proposed improvements to WordPress-served content via GitHub’s Pull Request model
- Allows non-technical writers to draft and edit a Jekyll site in WordPress’s best-of-breed editing interface

Whenever WordPress’ save_post hook is called, the plugin will fire a sync in response and will push the content to GitHub. In turn, GitHub’s push webhook will trigger a sync of all changed files back to WordPress.

When you install the plugin, you’ll need to enter your GitHub hostname and specify a repository to commit to. You’ll also need to enter your Oauth Token and Webhook Secret. At the bottom of the settings page, you’ll find bulk actions for exporting to GitHub and importing from GitHub, so it doesn’t necessarily have to be started on a brand new blog.

![[wp-github-sync-settings-500x378.jpg]]

In the future, Balter says the plugin may allow you to do even more, such as sync the content of two different WordPress installations via GitHub. It could also be adapted to allow you to stage and preview content before “deploying” to your production server.

For many writers the [idea of writing](https://konklone.com/post/writing-in-public-syncing-with-github) in public may seem a bit daunting, but the practice and benefits are very much akin to writing open source code. Public revisions and incorporation of improvements bring a new transparency to the writer’s process and transforms the work into a shared community document. Publications that embrace collaborative writing have the potential to bring a whole new level of community participation to online journalism.

If you’re interested in experimenting with collaborative writing, Balter’s [WordPress GitHub Sync](https://github.com/benbalter/wordpress-github-sync) is a good starting point. Be advised that it’s still a work in progress. If you’d like to help make it better, please refer to the [contributing documentation](https://github.com/benbalter/wordpress-github-sync/blob/master/CONTRIBUTING.md).
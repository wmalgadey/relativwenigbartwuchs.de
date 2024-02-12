---
source: http://guides.beanstalkapp.com/deployments/deploying-wordpress.html
---
This guide was contributed by [SlicenPress](http://slicenpress.com/), a WordPress development company located in northeast Indiana. Founded in 2004, SlicenPress works with agencies, PR firms, and designers to create WordPress powered sites and plugins for a wide range of clients.

Any application or web site should have a consistent process for managing code and deploying updates. With WordPress, this can sometimes be a challenge due to plugins, database migrations, and updates from the WordPress core. In this guide you will learn how to manage your WordPress site with version control and consistently deploy updates to your servers using Beanstalk's [deployment tools](http://www.beanstalkapp.com/features/deployments). We'll also cover several important best practices when using source control and deployments with WordPress. The end result will be a single and consistent process that you and your team can use to manage any WordPress site in Beanstalk.

## Configure repository

For every new WordPress site, create a new repository in Beanstalk.

Next add your starter files – we have a copy of WordPress in a separate repo that has a few config file changes, our starter theme, some common plugins, and a `.gitignore` file.

The first thing we do with the fresh set of files is change our config settings. We use a `local-config.php` file for developing things locally so that our main `wp-config.php` file can use the dev or live server settings.

```
// Check for a local config file
if ( file_exists( dirname( __FILE__ ) . '/local-config.php' ) ) {
    define( 'WP_LOCAL_DEV', true );
    include( dirname( __FILE__ ) . '/local-config.php' );
} else {
    define( 'WP_LOCAL_DEV', false );
    define('DB_NAME', 'db');
    define('DB_USER', 'user');
    define('DB_PASSWORD', 'pass');
    define('DB_HOST', 'localhost');
}
```

We also use `.gitignore` to ignore the `local-config.php` file in our repository. Alternatively, you can use the `svn:ignore` property in Subversion.

Finally, we’ll push or commit our initial files up to Beanstalk.

## Configure deployment environments

After our files are in Beanstalk, we’ll setup a development environment where we can deploy the WordPress site. We recommend using SFTP to publish the files to your servers.

![[sftp-deployment-location.png]]

For WordPress, you will most likely want to use an “ignore” list. The ignore list allows you to flag files in your repository that you don’t want to deploy, all on an environment by environment basis. So for example, if you wanted to avoid deploying `wp-config.php`, but you still wanted that managed in your repo, you could add `wp-config.php` to your ignore list. Here’s the list of ignores we use:

```
.htaccess
wp-config.php
wp-content/uploads
_db
```

The `_db` directory is used for database backups. If you’re running a cache plugin or another plugin that generates uploaded files, you would likely want to add those directories to your ignore list as well.

![[ignore.png]]

Once everything is setup in the environment, we’ll do the initial deployment to the dev site. We also setup a database and install WordPress on the dev server. After the deployment is complete, double check that the site is functioning as expected.

From this point forward you can just make updates to the repository as usual, deploying code as you progress. A plugin like [WP Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro/) comes in handy for syncing the dev site database with your local machine. Just use it carefully when working with multiple people so you don’t overwrite each other’s changes if you push the database up from your local machine to the dev server.

Once you are comfortable with the development environment, you can create a "production" branch in the repository. You’ll then setup a new Beanstalk environment to deploy this branch to the production servers. There are many ways to handle branches, but for most of our projects we keep things simple with a master and live branch. If a site is more complex, we sometimes create new branches for major features and merge those back into master and then live, as needed.

For general best practices on using Branches, check out [Beanstalk's guide](http://guides.beanstalkapp.com/version-control/branching-best-practices.html).

Once a site is live, it’s common for clients to request further changes or updates to a site. The way we handle that is by working in the master branch (or a feature branch) to make the changes, then deploying those to the dev environment with `[deploy:dev]` for testing, and then merging into live. Once changes are in live, we use `[deploy:live]` to deploy those changes to our production servers.

## Best practices to ensure smooth deployments

While this process generally works really well, there are a few things to keep in mind to avoid problems.

### Don’t give clients direct FTP access

If they edit files directly on the server, those files could get overwritten when you do a deployment. That’s also why it’s important to add directories like the uploads directory to the ignore list in Beanstalk.

### Disable the file editor in WordPress

This is just like FTP access – any changes here will likely be overwritten when you make changes and deploy via the repo. You can disable the editor by dropping the following code in your theme’s `functions.php` file:

```
/* Disable Theme Editor */

function remove_editor_menu() {
    remove_action('admin_menu', '_add_themes_utility_last', 101);
}
add_action('_admin_menu', 'remove_editor_menu', 1);
```

### Disable automatic WordPress updates

They’re great, but you don’t want the live server getting updates that your repo doesn’t have. Check out the [definitive guide to disabling WordPress updates](http://make.wordpress.org/core/2013/10/25/the-definitive-guide-to-disabling-auto-updates-in-wordpress-3-7/).

### Update plugins locally

If you’re going to add plugins or upgrade WordPress, do it on your local copy and push that up to dev and live. You want to make sure those new files are in the repo, not directly on the server.

### Purge cache if you use a CDN

If you’re running a cache plugin or a service like CloudFlare, be sure to clear your cache after pushing changes to your dev or live server. Often times cache plugins will clear the cache when you’re working from within the WP Admin but rarely do they automatically refresh the cache when you’re pushing code via Beanstalk, FTP, etc.

By using Beanstalk’s post deploy hooks, you can insert the following URL, which will clear the cache for your site. Just update the URL with your own settings:

```
https://www.cloudflare.com/api_json.html?a=fpurge_ts&tkn=TOKEN&email=your@email.com&z=yourdomain.com&v=1
```

### Maintain database changes in each environment

Keep in mind that using this setup will manage your files in Git/Beanstalk but it will not manage your database. Any WordPress content, plugin settings, extra fields, categories, etc are stored in your database. So if you make changes to your dev site database, you’ll need to make the same changes to your live database. You’ll want to be especially careful with things like category id values or page id’s. If you’re writing a custom query in your theme to call in a category by id, the id value may be different on your dev and live sites if you’ve created that category on each database separately.

### Disable the site when updating WordPress Core

If you’re going to be pushing WordPress core files or plugin files to your live site, I’d recommend disabling your site to visitors while you push the files. This will protect both your users and your site from any activity during major changes. One easy way to do this is by using a `.maintenance` file at the root of your live site. We usually login via FTP, upload the `.maintenance` file, do the Beanstalk push, and then remove the `.maintenance` file. The content of your `.maintenance` file just needs to be:

```
<?php $upgrading = time(); ?>
```

This will put up a notice that your site is being upgraded and will be back soon. If you want to avoid all FTP access, you could use Beanstalk to push the `.maintenance` file before you push the files and then remove it when you’re done. It’s a couple extra commits, but it should work fine if you prefer that route.

What solution are you using? Have a better way of using Beanstalk? Let us know on Twitter or email support.
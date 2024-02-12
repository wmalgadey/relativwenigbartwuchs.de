---
categories:
  - Webseite
status: gefunden
source: https://itnext.io/angular-development-in-docker-with-dev-containers-49d2cabad445
---
[![](https://miro.medium.com/max/1200/0*IaKAXQbXDL_0bd0k)](https://miro.medium.com/max/1200/0*IaKAXQbXDL_0bd0k)

---

![[0IaKAXQbXDL_0bd0k]]

Photo by [Pawel Czerwinski](https://unsplash.com/@pawel_czerwinski?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

Next up in my series on dong fun things with Visual Studio Code and Dev Containers, I am going to set up an Angular front end, and of course, build out a dev environment using Docker and Visual Studio Code.

You can find the code that accompanies this article on my [GitHub](https://github.com/AndyWatt83/angular-docker-dev-env).

Before we get started, let’s recap some of the reasons for doing this in the first place:

- Consistency across all developer environments, which means an end to “well it works on my machine”.
- On boarding new developers is incredibly easy — they just pull the repo and all of the dev dependencies are already there.
- Updating every dev machine is also incredibly easy.
- The requirements to build and run the project on a dev machine are expressed as code, and move with the repo. (Extending the concept of ‘infrastructure as code’ to also include the dev environment)
- You don’t need to ‘pollute’ your machine with the dependencies for every single project you are working on.
- It is not mandatory. If any dev in the team has an aversion to Docker for whatever reason, they can simply opt out and not use the Docker functionality.
- The environment you are working in is tailored to the project you are working on.

# Prerequisites

As per the last couple of posts, I am assuming that you know what you are doing with Docker, VSCode, and Linux / WSL. The machine that you are using will need to have the following installed:

- The ‘[Remote Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)’ extension for VSCode
- If you are on Windows, [I recommend WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10), although it’s not essential for this.

# Getting Started

Open a WSL terminal, create a new folder, and open VSCode with `code .`

When VSCode opens, hit F1 and search for `Add Development Container Configuration Files`

![[06IhhW-3u5q8s3WXl.png]]

Now Search for `Node.js & TypeScript`

![[1El76qBPguErxsdnPN9STrA.png]]

Choose your version — **It’s important to use V14, as there are compatibility issues currently with v16**. [CONFIRM THAT THIS IS STILL CURRENT]

![[15JhnrRshyGKIJGOabnEZMw.png]]

![[1E3AzhaJqQSUsyRONca4IEw.png]]

There’s no need to add any additional features, just click ‘OK’

![[18JU_CenG83NPlm5MFkQ_Og.png]]

VSCode will pop up the following

![[0PcdItQW1NXizoByD.png]]

(Hint: If it doesn’t pop up, hit F1 and search for `Rebuild and Reopen in Container` )

Click Reopen in Container. This can take a while the first time you do it, but it’s much faster in subsequent times. Once this is done, the bottom-left corner of VSCode should look like:

And so now we know that we are running in a container. It’s not entirely obvious that anything has changed, but if you open a terminal, you’ll see that it’s neither windows, nor your WSL set up

You can try and create a new Angular project at this stage, but, the Docker environment has no idea what Angular is, so we have some work to do…

# Install Angular

Open up the Dockerfile (found in the `.devcontainer` folder), uncomment the line to install global node packages, and add the angular cli. It should look like this:

It’s definitely worth specifying the version number at this point. If you do not specify a version, then you’ll just get the latest one at the time at which the container is built, and you can’t guarantee consistency across every environment.

**Before you will see the changes reflected in the terminal, you will need to exit and re-enter the remote container environment (press** `**F1**`**).**

Once back in the container environment, open a terminal and type in `ng --version` to confirm that the cli is installed.

Good to go!

Create a new application with `ng new test-app` (don’t worry about the options, just select the defaults).

cd into the folder `cd test-app` and build the application `ng build` to see the following output.

And now run the application `ng serve` and then go to [http://127.0.0.1:4200/](http://127.0.0.1:4200/) and see the application running!

![[1efcnt5m22pGKT3FWR3zh7A.png]]

# Extensions

One of the biggest benefits of using a dev container, is that you can configure VSCode specifically for the project type. To do this, set a list of Angular specific extensions.

Go into the devcontainer.json file and add the following extensions:

```
"lucono.karma-test-explorer",
"angular.ng-template",
"johnpapa.angular2",
"alexiv.vscode-angular2-files",
"esbenp.prettier-vscode",
"dbaeumer.vscode-eslint",
"shardulm94.trailing-spaces"
```

Feel free to add any more that you might have become used to at this point. The above is a good start for Angular development, but it is by no means exhaustive.

# Testing

Before this can be classed as a ‘dev environment’, we will need to make sure that the unit tests can run.

You can run the tests by typing `ng test` … and you’ll see the following errors.

These errors are caused as the docker image doesn’t have a browser. Install Chrome by adding the following to the Dockerfile:

```
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
```

**Again, you’ll need to exit and re-enter the Docker environment to see these changes.** Press F1, Reopen Folder in WSL, then same again to get back into the Docker environment.

We’ll also need to set up Karma to run Chrome in headless mode. Go into the Karma config file, and replace `browsers:['Chrome']` with

```
browsers: ['ChromeHeadlessNoSandbox'],
customLaunchers: {
  ChromeHeadlessNoSandbox: {
    base: "ChromeHeadless",
    flags: [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ]
  }
},
```

Now running `ng test` should result in the tests passing!

## Test Explorer

We have added the karma Test Explorer extension, so let’s add the config for that, and make it work!

Create a folder called `.vscode` in the project root, and in that folder add a file called `settings.json` and paste in the following:

```
{
"karmaTestExplorer.projectRootPath": "test-app",
}
```

Now clicking on the test explorer should show the dummy tests that are automatically added, and you should be able to click to run them, and see them pass.

_(If you get an error here, you will need to close and restart VSCode, and re-enter the Docker environment.)_

# Conclusions

I think this is a good place to pause this for now, although there is obviously a lot that could still be added to this. At this point we have:

- An Debian based Angular development environment.
- Access to the Angular command line tools.
- Customised Visual Studio Code, with extensions specifically for Angular development.
- An basic / default project that can be built upon as required.
- Unit tests that run through the command line, and via the test explorer

The next steps could be

- Add end to end testing with Cypress (watch this space!)
- Add git credentials — currently I am interacting with git on the host.

Let me know what you think in the comments. I’d be very interested to hear if anyone is using this on a real world project already. I think that this is a very powerful technique, and one that we will see more and more of as the technology matures!

![[0DqO5uwhhbDZHO1B_]]

Photo by [Junseong Lee](https://unsplash.com/@bearsnap?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)
---
author: "Karlo Delalic"
date: "2019-06-18"
title: "Efficient developing: iTerm2 and Oh My Zsh"
type: "blog"
tags: 
  - gatsbyjs
  - developer portfolio
  - statically generated
---
If you want to become a better developer, you must learn to be efficient in your communication with your computer. This means putting your entire focus on the problem at hand, and not wasting any time with menial tasks. This article will show you how to become more efficient at using a terminal.
<!-- end -->
If you, like most developers, rely on the terminal to do certain tasks such as, communicating with a remote server, configuring applications, setting up environments, then you should be familiar with the pain of remembering commands or fiddling with the terminal history to get to your desired command. Remembering and typing out commands may only take a few seconds but these seconds accumulate over time.

Initially, it may not seem like a big deal to type out something like `ssh root@server.myhost.com:9123` each time you want to connect to your remote server, but then, if you realize that you might type this out multiple times a day, then you should also realize that there has to be a better way of doing this. After all, a part of writing efficient and quality code is minimizing duplications and unnecessary work.

With OhMyZsh and a few plugins, you can save yourself the pain of remembering and typing commands such as these.

Taking the `ssh` command example from above, with OhMyZsh configured, you could simply begin typing `ssh root@ser` and then you would get a shadow text which would show you an autosuggested command which you can then use by pressing the right arrow key on your keyboard.

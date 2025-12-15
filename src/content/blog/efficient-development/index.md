---
author: "Karlo Delalic"
date: "2019-10-02"
title: "Efficient development: iTerm2 and Oh My Zsh"
type: "blog"
tags: 
  - ohmyzsh
  - iterm2
  - terminal improvements
---
If you want to become a better developer, learning to communicate efficiently with your computer is essential. This involves focusing intently on the problem at hand and avoiding distractions from menial tasks. In this article, we'll explore how to enhance your efficiency using the terminal.
<!-- end -->
Like many developers, if you depend on the terminal for tasks such as communicating with remote servers, configuring applications, or setting up environments, you're likely familiar with the hassle of remembering commands or digging through terminal history to find the right one. Although recalling and typing commands might only take a few seconds, these seconds add up over time.

## Autosuggest

Typing commands like `ssh root@server.myhost.com:9123` every time you need to connect to a remote server might seem trivial, but if you do this multiple times a day, you'll realize the need for a more efficient approach. Minimizing redundancy and unnecessary work is a key component of writing quality code.

With OhMyZsh and a few plugins, you can reduce the need to remember and type frequent commands.

For example, with OhMyZsh installed, start typing `ssh root@ser` and you'll see a shadow text appear, showing the most recently executed command that matches your input. Complete the command by pressing the → key.

![Autosuggestion example](./autosuggest.png)

## Word Jumps and Word Deletion

Ever typed or pasted a long command only to realize you need to edit something in the middle? Rather than repeatedly pressing the ← key, use word jumps by pressing `option + ←` a few times to reach the desired point. This is particularly useful for developers with faulty Macbook keyboards.

Word deletion works similarly by pressing `delete + ←`, deleting each word as you go.

## GitHub Information

A handy feature when working within a git repository is the GitHub info display. It shows the current branch, whether there are uncommitted changes, and if changes are staged.

![Clean tree on branch 'zsh'](./clean.png)

![Unstaged changes](./unstaged.png)

![Staged changes](./staged.png)

![Committed changes](./committed.png)

## Cycle Through Files in a Directory

When you need to `cd` into a specific directory or execute a command like `cp` on a particular file, type `cd` and then press `tab` to cycle through all available options. Unlike zsh, bash only lists the entries that are relevant to the command.

![Cycling through files by pressing the tab key](./cycle.png)

## And Many More...

The Oh My Zsh community has developed many such innovations. If you find these features intriguing, I definitely recommend installing Oh My Zsh to try them out!

## Installation

To introduce this excellent tool to others, I usually share this GitHub gist: [here](https://gist.github.com/kevin-smets/8568070#how-to-install), which explains how to install iTerm 2, Oh My Zsh, and all of the features discussed above.

---
__I hope you found this article helpful. Check out all of my projects on [GitHub](https://github.com/kdelalic)!__

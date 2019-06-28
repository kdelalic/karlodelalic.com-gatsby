---
author: "Karlo Delalic"
date: "2019-06-05"
title: "Building a Statically Generated Personal Website Using GatsbyJS"
type: "blog"
tags:
 - gatsbyjs
 - developer portfolio
 - statically generated
---
A personal website is a great tool for showing the world exactly who you are and what you do. It can be a great way of displaying your best projects, sharing your thoughts, and helping people connect with you. It makes sense for most developers to have one since they conduct most of their business online.
<!-- end -->
Your website is a showcase of your skills and therefore, should also be a display of your skills in and of themselves. The quality of the website reflects your competence as a developer and is a testament to your work ethic.

Whether you're doing contract work for a client or you're simply maintaining a website for display to company recruiters, your website should be developed with high quality.

In order to ensure a smooth experience for both the user and you as a developer, it is essential for a personal website to cover the following three foundational pillars:

 1. __Performance__ - The website should load quickly on the first load as well as in between pages
 2. __Design__ -  The design should be simple and intuitive, yet appealing
 3. __Maintainability__ - Adding posts and editing the website should not be overbearing

[GatsbyJS](https://www.gatsbyjs.org/) is the perfect framework that will allow you to seamlessly cover these pillars.

## Performance

Being a developer, it is of utmost importance that your website loads each page quickly.

Too often do I see developers that load an entire treasure trove of assets for their unnecessarily long, single-page portfolios. This is the exact opposite of how you would want to build your webpage. If you were looking to hire a developer for your own company and a potential hire's personal website took 4 seconds to load, what message would this convey to you? Perhaps, you would be better suited to take your business to someone with a better understanding of quality.

The mistake of bloating a website can be caused by a few different issues. Usually, the prime suspect is using libraries to do the heavy lifting of making a flashy and interactive page. This adds JavaScript code that the client has to first download and then run on their machine which leads to lower than optimal performance. Another issue may be using React for your simple webpage. This is not necessary and can add a significant amount of code which would end up not being used anyway. It's overkill!

This is where static site rendering comes into the picture. Instead of making a full-on React project for a simple webpage and handling all of the rendering on the client side, it is better to render once through the build process of the application.

Gatsby also uses React, except it uses what you could call a type of server-side rendering. In other words, instead of sending JavaScript code to be rendered on the client's machine, it builds the static code on a server which then serves it to the client. It works like this:

 1. You make a few pages such as Home, About, and Contact, along with any React based components you may need to create
 2. Then you run Gatsby's build process which takes advantage of some built-in code optimizations such as code splitting
 3. Finally, you publish the code to your webserver (such as [Netlify](https://netlify.com)) where the static code is served to the user

This is a very simplified version of Gatsby's process, but it is enough to give you an example of how the code is statically generated.

Due to the fact that there is no extra overhead of libraries like jQuery or React re-rendering happening on the client side, the webpage is blazingly fast.

## Design

Your primary goal should be to show off your projects and work experience. Therefore, the design should be straight-forward, and the website should be easy to navigate. Having said that, it is a good idea to make your website look at least somewhat appealing.

Ideally you will want a clutter free design. The home page should have your name, profession, maybe a motto or something of the sort, a few links to your social media such as LinkedIn or GitHub, and a photo of yourself if you like. The other pages should be very straight forward as well and should follow suit with the home page. Nothing complicated or too complex.

This also means that animations or unnecessary eye-catching add-ons of the sort should be explicitly avoided.

If you were a recruiter or somebody looking to do business with a developer, you would want to have direct access to the developer's experience, and personal details. You would not care very much for unnecessary animations on the buttons.

Although your main goal is to direct the user to your details, your website should not be off-putting. Therefore, it is a good idea to have a few of the following:

- Consistent structure (using a grid system)
- A good color palette (a primary color which your design is based upon and maybe a second one for accenting)
- Appropriate shadows if using cards to display information (for added depth)
- An appropriate font

Note: Be careful not to include too many external fonts hosting sites such as Google Fonts as this can add unwanted performance overhead.

The design elements listed above are easily attainable with Gatsby since it leverages React. You can simply create a Layout component which keeps a consistent design across all pages you choose to add to your website. The layout component should have any elements which are used among multiple pages such as the header or footer.

You can go one step further and make your life easier with SCSS or CSS-in-JS which ensures styling consistency. I will go into more detail about these in the following section.

Ensure that your website is based on the above design elements and you will have a beautiful, yet minimal design which does not distract from your work.

## Maintainability

If you've ever maintained any sort of code base, you would know that the ease of modification of the code is what is usually a large barrier. In other words, if it's a huge burden to add a piece of code to the code base, you probably won't want to go anywhere near the code very often. This is why high maintainability of your website is something which should be established early in the development process.

With Gatsby, this is easy. I'll give you a really high-level overview of how it works:

You can specify one or multiple data sources - such as a CMS like WordPress, markdown files, other data in the form of JSON, YAML, CSV, or even REST APIs. You can then query these data sources and pull them into your code in a structured manner using GraphQL. This can be useful if you want to automate adding blog posts, projects, or images to your website.

Here's an example of a markdown file:

```
---
title: "Lunch Roulette"
description: "Lunch Roulette helps users decide where to eat for lunch"
type: "project"
demo: "https://lunch-roulette.netlify.com"
github: "https://github.com/kdelalic/lunch-roulette"
tech:
 - ReactJS
 - Material UI
 - NodeJS
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat id porta.
```

In order to add a project to my projects page, I simply have to create a new markdown file with the information above, put it in the appropriate directory for projects, and that's it! My new project will be appended to the other projects on the projects page with almost no additional work besides writing the actual content of the post.

## Try it out

Now that you have a bit of a better understanding of Gatsby, you should try it out for yourself! If you keep the above information in mind while making your website, you should have a minimal, blazing fast, and easily updatable website where you can show the world what kinds of things you enjoy building.

Furthermore, the [Gatsby showcase](https://www.gatsbyjs.org/showcase/) is perfect if you want to look around for some inspiration for some designs or if you simply want to see what others have created.

Also, if you're interested, you can check out how I made this website in this [repository](https://github.com/kdelalic/karlodelalic-gatsby).

---
__Hope you enjoyed this article and found it to be worthwhile. You can check out all my projects on [Github](https://github.com/kdelalic) and don’t hesitate to reach out to me on [Twitter](https://twitter.com/karlodelalic)!__

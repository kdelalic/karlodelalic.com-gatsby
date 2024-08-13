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
A personal website is an excellent platform for showcasing who you are and what you do to the world. It serves as a central hub for displaying your best projects, sharing your thoughts, and facilitating connections. For most developers, who conduct much of their business online, having a personal website makes perfect sense.
<!-- end -->
Your website is not just a showcase of your skills but also a demonstration of them. The quality of your website reflects your competence as a developer and stands as a testament to your work ethic.

Whether you're doing contract work for clients or maintaining a website to attract company recruiters, it is crucial that your website is developed with high quality, embodying the following three foundational pillars:

1. __Performance__ - Your website should load quickly, both on initial visits and as users navigate between pages.
2. __Design__ - The design should be simple and intuitive yet visually appealing.
3. __Maintainability__ - The website should be easy to update, whether adding posts or making edits.

[GatsbyJS](https://www.gatsbyjs.org/) is an ideal framework that helps you achieve these pillars seamlessly.

## Performance

As a developer, it's critical that your website loads quickly. Often, I see developers overloading their single-page portfolios with too many assets, which slows down page load times significantly. This could send a negative message to potential employers or clients about your understanding of web performance.

A common mistake is using heavy libraries for flashy, interactive elements, which adds unnecessary JavaScript that users must download and execute. Using React for simple web pages is often overkill and can contribute to performance issues.

Gatsby addresses these issues by employing static site rendering, which involves:

1. Creating pages like Home, About, and Contact, along with any React components you might need.
2. Running Gatsby's build process, which includes code optimizations such as code splitting.
3. Publishing the static files to a web server (like [Netlify](https://netlify.com)), where they are served to users.

This method eliminates the need for libraries like jQuery or client-side React re-rendering, ensuring that your website is incredibly fast.

## Design

The primary goal of your website should be to showcase your projects and experience. Therefore, the design should be straightforward and easy to navigate while still being visually appealing.

A clutter-free design is essential. The homepage should display your name, profession, a personal motto if you wish, links to your social media profiles like LinkedIn or GitHub, and optionally, a photo of yourself. Subsequent pages should maintain this simplicity and continuity.

Avoid unnecessary animations and other eye-catching but superfluous elements, as they can distract from the core information.

While the main goal is to direct users to your professional details, the site should still be aesthetically pleasing. Consider the following design elements:

- Use a consistent structure, such as a grid system.
- Choose a coherent color palette with a primary color and perhaps a secondary accent color.
- Use appropriate shadows for depth if displaying information on cards.
- Select an appropriate font, and limit the use of external font hosting sites to avoid performance issues.

Gatsby allows you to manage design consistency easily through React components like a Layout component, which can include shared elements such as headers and footers.

For styling, consider using SCSS or CSS-in-JS to ensure consistent styling across your site.

## Maintainability

Ease of code modification is crucial for maintaining any software, including websites. Gatsby simplifies this process by allowing you to integrate multiple data sources, such as CMSs like WordPress, markdown files, or APIs, and access them via GraphQL. This makes adding new content like blog posts or projects straightforward.

For example, to add a new project, simply create a markdown file with the necessary details and place it in the designated directory. Here's a markdown example:

```md
---
title: "Lunch Roulette"
description: "Lunch Roulette helps users decide where to eat for lunch."
type: "project"
demo: "https://lunch-roulette.netlify.com"
github: "https://github.com/kdelalic/lunch-roulette"
tech:
 - ReactJS
 - Material UI
 - NodeJS
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

## Try it Out

Now that you're more familiar with Gatsby, why not try it out for yourself? If you keep the above principles in mind while developing your website, you'll end up with a minimal, fast, and easily maintainable site that effectively showcases your abilities.

For inspiration, check out the [Gatsby showcase](https://www.gatsbyjs.org/showcase/), or view examples of other developers' work.

Additionally, you can explore how I built this website by visiting my [repository](https://github.com/kdelalic/karlodelalic-gatsby).

---
__I hope you enjoyed this article and found it to be worthwhile. You can check out all of my projects on [GitHub](https://github.com/kdelalic) and don’t hesitate to reach out to me on [Twitter](https://twitter.com/karlodelalic)!__
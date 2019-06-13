---
path: "/blog/gatsby-personal-site"
date: "2019-06-05"
title: "Building a Statically Generated Personal Website Using GatsbyJS"
type: "blog"
tags: "gatsbyjs,developer portfolio,statically generated"
---
A personal website is a great tool for showing the world exactly what you're about. It is akin to an online business card for developers who conduct most of their business on the internet. Having a personal website can be a great way of displaying your best projects, sharing your thoughts, as well as helping people connect with you. The personal website is a showcase of your skills and therefore, should also be a display of your skills in and of itself. Your website directly relates with your competance as a developer and it shows a first time visitor exactly what kind of work ethic you have. No matter if you're doing contracts or you're maintaining the website for display to recruiters, your website should be of top quality.

In order to ensure a smooth user and developer experience, it is essential for a personal website to cover the following three foundational pillars: 
  1. __Performance__ - The website must load quickly on first load as well as between pages
  2. __Design__ - The website must have a simple and intuitive design
  3. __Maintainability__ - Adding posts and editting the website must not be overbearing 

GatsbyJS is the perfect framework that allows developers to seamlessly cover these pillars.

## Performance
Being a developer, it is of utmost importance that your website loads each page quickly. Too often do I see developer portfolios that load an entire treasure trove of assets for their super long single page portfolio. This is the exact opposite of how you want to build your webpage. If you were looking to hire a developer for your company and a potential hire's personal website took 4 seconds to load, what would this say to you? Would you want to hire somebody who does not even have the attention span to develop a simple page?

The mistake of bloating up a website can be due to many reasons. Usually the prime suspect is using libraries to do the heavy lifting of making a flashy and interactive page. This adds Javascript code that the client has to first download and then run on their machine which leads to low performance. An example of a different type of overkill would be using React for your simple webpage. This is not necessary and can add a lot of code which would end up not being used anyway. 

This is where static site rendering comes into the picture. Instead of making a full on React project for a simple webpage and handling all of the rendering on the client side, it is better to render once through a build process. 

Gatsby also uses React, except it uses what you could call a type of server side rendering instead of sending it to the client's machine. It works like this: 
  1. You make a few pages such as Home, About, and Contact, along with any React based components you may need to create
  2. Then you run Gatsby's build process which takes advantage of some built in code optimizations such as code splitting, 
  3. Finally, you publish the code to your webserver where the static code is served to the user

This is a very simplified version of Gatsby's process but it is enough to give you an example of how the code is statically generated.

Due to the fact that there is no extra overhead of libraries like jQuery or React re-rendering happening on the client side, the webpage is blazingly fast. 

## Design
Your primary goal should be to show off your projects and experience. Therefore, the design should be straight-forward and the website should be easy to navigate. Having said that, it is a good idea to make your website look at least somewhat appealing. 

Ideally you will want a clutter free design. The home page should have your name, profession, maybe a motto or something of the sort, a few links to your social media such as LinkedIn or Github, and a photo of yourself if you like. The other pages should be very straight forward as well, and should follow suit with the home page. Nothing complicated or complex.

This also means that animations or unecessary eye catching things of the sort should be explicitly avoided. 

If you were a recruiter or somebody looking to do business with a developer, you would want to have direct access to the developer's experience, and personal details. You would not care very much for unnecessary animations on the buttons.

Although your main goal is to direct the user to your details, your website should not be off-putting. Therefore, it is a good idea to have a few of the following:
 - Consistent structure (maybe through a grid system)
 - A good color palette (a primary color which your design is based upon and maybe a second one for accenting elements)
 - Appropriate shadows if using cards to display information (for added depth)
 - A good looking font

Note: Be careful not to include too many external fonts hosting sites such as Google Fonts as this can add unwanted performance overhead.

The design elements listed above are easily attainable with Gatsby since it leverages React. You can simply create a Layout component which keeps a consistent design across all pages you choose to add to your website. The layout component should have the any elements which used among multiple pages such as the header or footer. 

You can go one step further and make your life easier with SCSS or CSS-in-JS which ensures styling consistency. I will go into more detail about these in the following section. 

Ensure that your website is based on the above design elements and you will have a good looking, minimal design which does not distract from your work.

## Maintainability
If you've ever maintained any sort of code base, you would know that the ease of modification of the code is what is usually a large barrier. In other words, if it's a huge burden to add a piece of code to the code base, you probably won't want to go near the code very often. This is why high maintainability of your website is something which should be established early in the development process.

With Gatsby, this is easy. I'll give you a really high level overview of how it works: 

You can specify one or multiple datasources - such as a CMS like Wordpress, simple files in markdown format, and other data in the form of JSON, YAML, CSV, or APIs. You can then query these datasources and pull them into your code in a structured manner. This can be useful if you want to automate adding posts, projects, or images to your website. 

Let me give you a concrete example of a markdown file which contains project information.

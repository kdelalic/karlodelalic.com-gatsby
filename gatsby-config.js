module.exports = {
  siteMetadata: {
    title: `Karlo Delalic`,
    description: `Karlo Delalic is a student, software engineer, and fullstack web developer in the Toronto area.`,
    author: `@karlodelalic`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/src/assets/markdown-pages`,
          name: "markdown-pages",
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/src/pages`,
          name: "pages",
        },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/icon.png`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-offline`,
    {
        resolve: `gatsby-transformer-remark`,
        options: {
          // CommonMark mode (default: true)
          commonmark: true,
          // Footnotes mode (default: true)
          footnotes: true,
          // Pedantic mode (default: true)
          pedantic: true,
          // GitHub Flavored Markdown mode (default: true)
          gfm: true,
        },
      },
  ],
}
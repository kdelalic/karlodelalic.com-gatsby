const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)
  const projectTemplate = path.resolve(`src/templates/projectTemplate.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              type
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if (node.frontmatter.type === "project") {
            createPage({
                path: node.frontmatter.path,
                component: projectTemplate,
                context: {}, // additional data can be passed via context
            })
        } else if (node.frontmatter.type === "blog") {
            createPage({
                path: node.frontmatter.path,
                component: blogPostTemplate,
                context: {}, // additional data can be passed via context
              })
        }
    })
  })
}
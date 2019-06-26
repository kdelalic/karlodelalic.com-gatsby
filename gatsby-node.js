const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "pages", trailingSlash: false })
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            html
            fields {
              slug
            }
            frontmatter {
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
        if (node.html) {
          createPage({
            path: node.fields.slug,
            component: path.resolve("src/templates/project-post.js"),
            context: {
              slug: node.fields.slug,
            },
          })
        }
      } else if (node.frontmatter.type === "blog") {
        createPage({
          path: node.fields.slug,
          component: path.resolve("src/templates/blog-post.js"),
          context: {
            slug: node.fields.slug,
          },
        })
      }
    })
  })
}
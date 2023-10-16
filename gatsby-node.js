const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "pages",
      trailingSlash: false,
    });

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  try {
    const result = await graphql(`
      {
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
          edges {
            node {
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
    `);

    if (result.errors) {
      throw new Error(result.errors);
    }

    const blogPosts = result.data.allMarkdownRemark.edges.filter(
      ({ node }) => node.frontmatter.type === "blog"
    );

    blogPosts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve("src/templates/blog-post.js"),
        context: {
          slug: node.fields.slug,
        },
      });
    });
  } catch (error) {
    console.error("Error creating pages:", error);
  }
};

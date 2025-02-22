const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const parent = getNode(node.parent);
    let basePath = "";

    // Use the source instance name to set an appropriate basePath.
    if (parent.sourceInstanceName === "pages") {
      basePath = "pages";
    } else if (parent.sourceInstanceName === "custom-recipes") {
      basePath = "custom-recipes";
    }

    const slug = createFilePath({
      node,
      getNode,
      basePath,
      trailingSlash: false,
    });

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemarkFrontmatter {
      title: String!
      date: Date @dateformat
      ingredients: [String]
      notes: String
      image: File @fileByRelativePath
      type: String
      tags: [String]
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  try {
    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { frontmatter: { date: DESC } }
          limit: 1000
        ) {
          edges {
            node {
              id
              fileAbsolutePath
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

    const customRecipes = result.data.allMarkdownRemark.edges.filter(
      ({ node }) => node.fileAbsolutePath.includes("/content/markdown/custom-recipes/")
    );

    customRecipes.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve("src/templates/custom-recipe.js"),
        context: {
          id: node.id,
        },
      });
    });
  } catch (error) {
    console.error("Error creating pages:", error);
    reporter.panicOnBuild("Error creating pages", error);
  }
};

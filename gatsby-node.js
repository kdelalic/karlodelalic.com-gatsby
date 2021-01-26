const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const jsonld = require('jsonld')
const { chromium } = require('playwright')

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

exports.createPages = async ({ actions, graphql }) => {
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
              source
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(async ({ node }) => {
      if (node.frontmatter.type === "blog") {
        createPage({
          path: node.fields.slug,
          component: path.resolve("src/templates/blog-post.js"),
          context: {
            slug: node.fields.slug,
          },
        })
      } else if (node.frontmatter.type === "recipe") {
        // let recipe = await scrapeRecipe(node.frontmatter.source)
        // console.log(recipe)
      }
    })
  })
}

const scrapeRecipe = async (url) => {
  console.log('scraping url: ' + url)

  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto(url)

  const handle = await page.$('script[type="application/ld+json"]')
  if (handle === null) return
  const text = await handle.innerText()

  const schemaContext = {
    recipe: 'http://schema.org/Recipe',
    recipeIngredient: 'http://schema.org/recipeIngredient',
  }

  const compacted = await jsonld.compact(JSON.parse(text), schemaContext)

  let ingredients = compacted.recipeIngredient

  if (Array.isArray(compacted)) {
    ingredients = compacted['@graph'].filter(
      (item) => item['@type'] === 'recipe'
    )[0].recipeIngredient
  }

  console.log(JSON.stringify(ingredients))

  await browser.close()
  return ingredients
}
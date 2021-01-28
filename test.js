const jsonld = require('jsonld')
const { chromium } = require('playwright')

const scrapeRecipe = async (url) => {
    console.log('scraping url: ' + url)
  
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(url)
  
    const handle = await page.$$('script[type="application/ld+json"]')
    if (!handle) return "No JSONLD found"

    let text;

    for (let i = 0; i < handle.length; i++) {
        let val = handle[i]
        const checkText = await val.innerText()
        const parse = JSON.parse(checkText)
        if (parse["@type"].toLowerCase() === "recipe") {
            text = parse
            break
        }
    }

    if (!text) return "No recipe type found"
  
    const schemaContext = {
      recipe: 'http://schema.org/Recipe',
      recipeIngredient: 'http://schema.org/recipeIngredient',
    }
  
    const compacted = await jsonld.compact(text, schemaContext)
  
    let ingredients = compacted.recipeIngredient
  
    if (Array.isArray(compacted)) {
      ingredients = compacted['@graph'].filter(
        (item) => item['@type'] === 'recipe'
      )[0].recipeIngredient
    }
  
    let instructions

    i

  
    await browser.close()
    return ingredients
  }

const run = async () => {
    let recipe = await scrapeRecipe("https://www.seriouseats.com/recipes/2013/06/grilled-skirt-steak-fajitas-food-lab-recipe.html")

    console.log(recipe)
}

run()
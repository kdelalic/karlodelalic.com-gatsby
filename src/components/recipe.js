import React from "react"
import Img from "gatsby-image"

import Chip from "./chip"

import "./recipe.scss"

const Recipe = ({ image, source, tags, title }) => {
  return (
    <div className="recipe">
      <div className="paper recipe__content">
        <h2 className="recipe__title">{title}</h2>
        <div className="recipe__body">
          {image && <Img className="recipe__image" alt={title} fluid={image} />}
          <div className="recipe__body__buttons">
            {source && (
              <a
                className="link-button"
                href={source}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                Source
              </a>
            )}
          </div>
          <div className="recipe__body__chips">
            {tags.map(tag => {
              return <Chip key={tag} label={tag} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recipe

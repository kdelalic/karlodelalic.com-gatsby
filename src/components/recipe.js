import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import Chip from "./chip";
import { FaRegStickyNote } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import "./recipe.scss";

const capitalizeTitle = (title = "") =>
  title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const Recipe = ({
  image,
  source,
  tags,
  title,
  tagClick,
  tagFilters,
  notes,
  type,
  slug
}) => {
  const tagFiltersSet = new Set(tagFilters);

  const handleTagClick = (tag) => {
    tagClick(tag);
  };

  return (
    <div className="recipe">
      <h2 className="recipe__title">
        {capitalizeTitle(title)}
        {notes && notes.trim() !== "" && (
          <Tooltip title={notes} arrow placement="top">
            <span className="recipe__note-icon">
              <FaRegStickyNote />
            </span>
          </Tooltip>
        )}
      </h2>
      <div className="recipe__body">
        {image &&
          (type === "custom-recipe" ? (
            <Link to={slug} className="recipe__link">
              <GatsbyImage
                className="recipe__image"
                alt={title}
                image={getImage(image) ?? undefined}
              />
            </Link>
          ) : (
            <a
              href={source}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="recipe__link"
            >
              <GatsbyImage
                className="recipe__image"
                alt={title}
                image={getImage(image) ?? undefined}
              />
            </a>
          ))}
        <div className="recipe__body__chips">
          {tags &&
            tags.sort().map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagClick(tag)}
                active={tagFiltersSet.has(tag)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Recipe);

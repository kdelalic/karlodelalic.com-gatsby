import React, { useState } from "react";
import { useInView } from 'react-intersection-observer';
import Chip from "./Chip";
import { FaRegStickyNote } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
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
  slug,
}) => {
  const tagFiltersSet = new Set(tagFilters);
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const open = clicked || hover;

  const handleTagClick = (tag) => {
    tagClick(tag);
  };

  const handleTooltipClick = (e) => {
    e.stopPropagation();
    setClicked((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleClickAway = () => {
    setClicked(false);
    setHover(false);
  };

  return (
    <div
      className={`recipe ${inView ? 'fade-in' : ''}`}
      ref={ref}
    >
      <h2 className="recipe__title">
        {capitalizeTitle(title)}
        {notes && notes.trim() !== "" && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Tooltip
              title={notes}
              arrow
              placement="top"
              open={open}
              disableFocusListener
              disableTouchListener
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className="recipe__note-icon"
                onClick={handleTooltipClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTooltipClick(e);
                  }
                }}
                role="button"
                tabIndex="0"
              >
                <FaRegStickyNote />
              </span>
            </Tooltip>
          </ClickAwayListener>
        )}
      </h2>
      <div className="recipe__body">
        {image &&
          (type === "custom-recipe" ? (
            <a href={slug} className="recipe__link">
              <img
                className="recipe__image"
                alt={title}
                src={image}
              />
            </a>
          ) : (
            <a
              href={source}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="recipe__link"
            >
              <img
                className="recipe__image"
                alt={title}
                src={image}
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

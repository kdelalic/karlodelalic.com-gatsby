import React from "react"

import "./chip.scss"

const Chip = ({ active, onClick, label }) => {
  let chipProps = {
    onClick: onClick,
    className: "chip",
  }

  if (onClick) {
    chipProps.role = "button"
    chipProps.tabIndex = "0"
    chipProps.className += " button"
  }

  if (active) {
    chipProps.className += " active"
  }

  return (
    // eslint-disable-line jsx-a11y/click-events-have-key-events
    <div {...chipProps}>
      <span className="chip__label noselect">{label}</span>
    </div>
  )
}

export default Chip

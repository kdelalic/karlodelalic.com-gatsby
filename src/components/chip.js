import React from "react"

import "./chip.scss"

const Chip = ({ active, onClick, label }) => (
  <div
    onKeyDown={onClick}
    onClick={onClick}
    role="button"
    tabIndex="0"
    className={`chip${active ? " active" : ""}${onClick ? " button" : ""}`}
  >
    <span className="chip__label noselect">{label}</span>
  </div>
)

export default Chip

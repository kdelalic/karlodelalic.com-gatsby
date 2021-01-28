import React from "react"

import "./chip.scss"

const Chip = ({ active, onClick, label }) => (
  <div
    onKeyDown={onClick}
    onClick={onClick}
    role="button"
    tabIndex="0"
    className={active ? "active chip" : "chip"}
  >
    <span className="chip__label noselect">{label}</span>
  </div>
)

export default Chip

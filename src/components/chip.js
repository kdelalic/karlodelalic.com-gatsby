import React from "react"
import "./chip.scss"

const Chip = ({ active, onClick, label }) => {
  const classNames = ["chip"]
  if (active) classNames.push("active")
  if (onClick) classNames.push("button")

  const handleKeyDown = (event) => {
    // Check if the key pressed is "Enter" or "Space"
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <button className={classNames.join(' ')} onClick={onClick} onKeyDown={handleKeyDown}>
      <span className="chip__label noselect">{label}</span>
    </button>
  )
}

export default Chip

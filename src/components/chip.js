import React from "react"

import "./chip.scss"

const Chip = ({ label }) => (
  <div class="chip">
    <span class="chip__label">{label}</span>
  </div>
)

export default Chip

import Typography from "typography"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.25,
  headerWeight: 600,
  bodyWeight: 400,
  boldWeight: 700,
  headerFontFamily: [
    "Open sans",
    "Avenir Next",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  bodyFontFamily: ["Lato", "sans-serif"],
  googleFonts: [
    {
      name: "Open Sans",
      styles: ["300", "400", "600", "700"],
    },
    {
      name: "Lato",
      styles: ["300", "400"]
    }
  ],
})

export default typography
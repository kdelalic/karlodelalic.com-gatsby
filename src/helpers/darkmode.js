import { useState, useEffect } from "react"

const useDarkMode = () => {
  const [isDarkMode, setStoredDarkMode] = useState(() => {
    const storedDarkMode = window.localStorage.getItem("isDarkMode");

    return JSON.parse(storedDarkMode);
  });

  const setDarkMode = isDark => {
    setStoredDarkMode(isDark);
    window.localStorage.setItem("isDarkMode", JSON.stringify(isDark));
  }

  useEffect(() => {
    const className = "dark";
    const element = window.document.body;

    if (isDarkMode) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }

  }, [isDarkMode]);

  return [isDarkMode, setDarkMode];
}

export default useDarkMode;
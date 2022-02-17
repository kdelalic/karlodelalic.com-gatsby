import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import Switch from "@mui/material/Switch"

const DarkSwitch = styled(Switch)(() => ({
  '& .MuiSwitch-switchBase': {
    color: "#6772e5",
    '&.Mui-checked': {
      color: "#6772e5",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#fff',
      },
    },
  },
  checked: {},
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: "#252525",
  },
}))

const DarkModeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(typeof window != 'undefined' ? window.__theme === 'dark' : true);

  const onChange = useCallback(
    e => {
      const isDarkMode = e.target.checked;
      setIsDarkMode(isDarkMode);
      if (typeof window != 'undefined') {
        window.__setPreferredTheme(isDarkMode ? 'dark' : 'light');
      }
    },
    [setIsDarkMode]
  )

  return <DarkSwitch
    className="dark-switch"
    checked={isDarkMode}
    onChange={onChange}
    value="darkMode"
    inputProps={{ "aria-label": "dark mode switch" }}
  />;
};

export default DarkModeSwitch;
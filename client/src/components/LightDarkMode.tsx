import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const LightDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const rootElement = document.getElementById("root");
    const isDark = rootElement?.classList.toggle('dark-mode');
    setIsDarkMode(isDark || false);
  }, []);

  const toggleColor = () => {
    const rootElement = document.getElementById("root");
    rootElement?.classList.toggle('dark-mode');
    setIsDarkMode(!isDarkMode);
  };

  return (
    <IconButton onClick={toggleColor} color="inherit">
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default LightDarkMode;

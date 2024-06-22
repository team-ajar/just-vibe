import React from 'react';
import { PaletteMode } from "@mui/material";
import { DarkModeIcon, IconButton, LightModeIcon } from "../style";
const LightDarkMode = ({
  toggle,
  mode,
}: {
  toggle: () => void;
  mode: PaletteMode;
}) => {
  return (
    <IconButton onClick={toggle} color='inherit'>
      {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default LightDarkMode;
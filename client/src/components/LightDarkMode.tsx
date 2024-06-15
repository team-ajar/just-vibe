import React, { useState, useEffect } from "react";



const LightDarkMode = () => {

  const [theme, setTheme] = useState('Dark Mode');
  
  const toggleColor = () => {
    const rootElement = document.getElementById("root");
    rootElement?.classList.toggle('dark-mode')
    setTheme(theme === "Light Mode" ? 'Dark Mode' : 'Light Mode')
  }


  return (
    <button onClick={toggleColor}>
      Toggle {theme}
    </button>
  )
}

export default LightDarkMode;
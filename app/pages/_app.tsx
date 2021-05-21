import { useEffect } from "react"
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import { themeDark, themeLight } from "lib/theme"


export default function MyApp({ Component, pageProps }){
  useEffect(() => {
    // remove the server-sizde injectedd CSS
    const jssStyle = document.querySelector("jss-server-side");
    if(jssStyle && jssStyle.parentNode){
      jssStyle.parentNode.removeChild(jssStyle)
    }
  }, [])
  return (
    <ThemeProvider theme={ false ? themeDark : themeLight}>
      <CssBaseline />
      <Component {...pageProps}  />
    </ThemeProvider>
  )
}

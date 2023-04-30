import '@/styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StyledEngineProvider } from '@mui/material'
import { ThemeProvider, createTheme } from "@mui/material";

export default function App({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#39C6A5',
      },
    },
    components :{
      MuiButton: {
        defaultProps :{
          disableRipple : true,
        }
      }
    }
  })
  return (
    <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
    <Component {...pageProps} />
    </ThemeProvider>
  </StyledEngineProvider>
  )
}

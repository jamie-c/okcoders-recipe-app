import { dosis, theme } from '@/lib/theme'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Header from './Header'

export default function Layout({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={`${dosis.className}`}>
                <Header />
                <main>{children}</main>
                {/* <Footer /> */}
            </div>
        </ThemeProvider>
    )
}

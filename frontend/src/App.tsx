import { ThemeProvider } from './components/theme-provider'
import { Layout } from './components/Layout'
import { Hero } from './components/sections/Hero'
function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Layout title="PixelPursuit">
        <Hero/>
      </Layout>
    </ThemeProvider>
  )
}

export default App

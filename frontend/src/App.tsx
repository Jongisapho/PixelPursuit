import './App.css'
import { ThemeProvider } from './components/theme-provider'
function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <h1 className='text-4l font-bold text-center pt-10'>
          Welcome to My vite + React + shacn/ui app!
        </h1>
      </div>
    </ThemeProvider>
  )
}

export default App

import './App.css'
import { ThemeProvider } from './components/theme-provider'
function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        {/* Responsive container with padding that grows on larger screens */}
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Pages, header, main content, etc. */}
          <main>
            {/*Starter content */}
            <h1 className='text-3xl font-bold text-center py-10'>
              My Responsive App
            </h1>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App

import { ThemeProvider } from './components/theme-provider'
import { Layout } from './components/Layout'
import { Hero } from './components/sections/Hero'
import { WelcomePage } from './pages/WelcomePage'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { WelcomeLayout } from './WelcomeLayout'


const HomePage = () => (
  <>
    <Hero />
    {/* More Sections to be added later */}
  </>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout title="PixelPursuit - Find your Next Opportunity">
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true, 
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/welcome",
    element: (
      <WelcomeLayout title="welcome to pixelPursuit">
        <WelcomePage />
      </WelcomeLayout>
    ),
  },
]);


function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App

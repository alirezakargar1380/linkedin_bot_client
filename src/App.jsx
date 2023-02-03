import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useParams
} from 'react-router-dom'

// layouts and pages
import RootLayout from './layouts/RootLayout'
import Dashboard from './pages/Dashboard'
import Create from './pages/Create'
import Profile from './pages/Profile'

// router and routes
const router = () => {
  const Wapper = () => {
    const params = useParams()
    return <Create match={params} />
  }

  const params = useParams()
  console.log(params)
  return createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/user/:user_id" element={<Wapper />} />
        <Route path="my_connections" element={<Profile />} />
      </Route>
    )
  )
}

function App() {
  return (
    <RouterProvider router={router()} />
  )
}

export default App

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
import User from './pages/User'
import MyConnections from './pages/MyConnections'

// router and routes
const router = () => {
  const Wapper = () => {
    const params = useParams()
    return <User match={params} />
  }

  const params = useParams()
  console.log(params)
  return createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/user/:user_id" element={<Wapper />} />
        <Route path="my_connections" element={<MyConnections />} />
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

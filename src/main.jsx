import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayoutOne from './Layout/LayoutOne.jsx'
import Homepage from './Pages/Homepage/Homepage.jsx'
import AuthContext from './Context/AuthContext'
import Signin from './Pages/Signin/Signin'
import Signup from './Pages/Signup/Signup'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DashboardLayout from './Layout/DashboardLayout'
import AddClass from './Dashboard/Instructor/AddClass'
import DashboardHome from './Dashboard/DashboardHome'
import UseRole from './Hook/UseRole'



const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutOne />,
    children: [
      {
        path: '/',
        element: <Homepage />
      },
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  },
  {
    path: '/',
    element: <DashboardLayout/>,
    children: [
      {
        path: '/dashboard',
        element: <DashboardHome></DashboardHome>
      },
      {
        path: '/instructor/add-class',
        element: <AddClass></AddClass>
      }
    ]
  }
])

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <RouterProvider router={router}>
        </RouterProvider>
      </AuthContext>
    </QueryClientProvider>
  </React.StrictMode>,
)

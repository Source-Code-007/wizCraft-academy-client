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
import MyClasses from './Dashboard/Instructor/MyClasses'
import ManageClasses from './Dashboard/Admin/ManageClasses/ManageClasses'
import ManageUsers from './Dashboard/Admin/ManageUsers/ManageUsers'
import AdminRoute from './PrivateRoute/AdminRoute'
import InstructorRoute from './PrivateRoute/InstructorRoute'
import InstructorsPage from './Pages/InstructorsPage/InstructorsPage'
import ClassesPage from './Pages/ClassesPage/ClassesPage'
import SelectedClasses from './Dashboard/Student/SelectedClasses/SelectedClasses'
import EnrolledClasses from './Dashboard/Student/EnrolledClasses/EnrolledClasses'
import PaymentPage from './Dashboard/Student/PaymentPage/PaymentPage'
import PaymentHistory from './Dashboard/Student/PaymentHistory/PaymentHistory'
import StudentRoute from './PrivateRoute/StudentRoute'
import ErrorPage from './Pages/ErrorPage/ErrorPage'
import SingleNews from './Pages/SingleNews/SingleNews'
import InstructorClassesPage from './Pages/InstructorClassesPage/InstructorClassesPage'
import ServicesPage from './Pages/ServicesPage/ServicesPage'



const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutOne />,
    errorElement: <ErrorPage></ErrorPage>,
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
      {
        path: '/instructors',
        element: <InstructorsPage />
      },
      {
        path: '/classes',
        element: <ClassesPage />
      },
      {
        path: '/news/:id',
        element: <SingleNews></SingleNews>
      },
      {
        path: '/instructor-classes/:name',
        element:<InstructorClassesPage></InstructorClassesPage>
      },
      {
        path: '/services',
        element: <ServicesPage></ServicesPage>
      },
    ]
  },

  {
    path: '/',
    element: <DashboardLayout/>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/dashboard-home',
        element: <DashboardHome></DashboardHome>
      },
      {
        path: '/my-selected-classes',
        element: <StudentRoute><SelectedClasses></SelectedClasses></StudentRoute>
      },
      {
        path: '/my-enrolled-classes',
        element: <StudentRoute><EnrolledClasses></EnrolledClasses></StudentRoute>
      },
      {
        path: '/make-payment',
        element: <StudentRoute><PaymentPage></PaymentPage></StudentRoute>
      },
      {
        path: '/payment-history',
        element: <StudentRoute><PaymentHistory></PaymentHistory></StudentRoute>
      },

      {
        path: '/instructor/add-class',
        element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
      },
      {
        path: '/instructor/my-classes',
        element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
      },
      
      {
        path: '/admin/manage-classes',
        element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
      },
      {
        path: '/admin/manage-users',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
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

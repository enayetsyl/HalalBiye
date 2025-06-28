/**
 * Home page component (pages/index.tsx)
 *
 * This is the root landing page of the application. It simply renders
 * the Login component to present the user with the authentication form
 * when they visit the “/” route.
 */

import React from 'react'
import Login from '@/components/login/Login'

/**
 * Home
 *
 * @component
 * @returns {JSX.Element} The Login form for unauthenticated users.
 */
const Home = () => {
  return (
    <Login />
  )
}

export default Home

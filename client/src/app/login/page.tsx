/**
 * LoginPage
 *
 * This Next.js page component serves as the entry point for the user login flow.
 * It simply renders the shared <Login /> component, which contains the actual
 * form and related logic for authentication.
 *
 * @component
 * @returns {JSX.Element} The Login page element.
 */

import React from 'react'
import Login from '@/components/login/Login'

const LoginPage: React.FC = () => {
  return (
    <Login />
  )
}

export default LoginPage

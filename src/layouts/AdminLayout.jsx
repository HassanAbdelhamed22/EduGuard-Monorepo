import React from 'react'
import { Outlet } from 'react-router'

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <header>Admin Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Admin Footer</footer>
    </div>
  )
}

export default AdminLayout
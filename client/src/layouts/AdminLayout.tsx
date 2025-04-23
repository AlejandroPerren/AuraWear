import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderAdmin from '../components/admin/Header'

const AdminLayout = () => {
  return (
    <div>
      <HeaderAdmin/>
      
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
import React from 'react'
import { Outlet } from 'react-router-dom'
import { DashboardSideBar } from './DashboardSideBar'

const DashboardLayout = () => {
  return (
    <div className='flex gap-4 flex-col md:flex-row'>
        <DashboardSideBar />
        <Outlet />
    </div>
  )
}

export default DashboardLayout
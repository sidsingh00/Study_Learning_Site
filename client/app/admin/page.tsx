'use client'
import React from 'react'
import Heading from '../Utils/Heading'
import AdminSideBar from '../Components/admin/Sidebar/AdminSideBar'
import AdminProtected from '../hooks/AdminProtected'
import DashboardHero from '../Components/admin/DashboardHero'

type Props = {}

const page = (props: Props) => {
  return (

    <div>
        <AdminProtected>
                <Heading
                    title='Stude Aloud - Admin'
                    description='LMS is a platform for students to learn'
                    keywords='Programmin,DSA,REDUX,'
                />
                <div className='flex h-[200vh]'>
                    <div className='1500px:w-[16%] w-1/5'>
                        <AdminSideBar />
                    </div>
                    <div className='w-[85%]'>
                        <DashboardHero />
                    </div>
                    
                </div>
                <div className="text-4xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
        perspiciatis. Aliquid, omnis perspiciatis unde earum illo aliquam ea
        minus saepe. Deleniti vero ut aspernatur molestias itaque rerum maxime
        quaerat repudiandae?
      </div>
            </AdminProtected>
    </div>
  )
}

export default page
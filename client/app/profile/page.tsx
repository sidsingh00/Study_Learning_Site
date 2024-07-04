/* eslint-disable react-hooks/rules-of-hooks */

'use client'
import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../Utils/Heading'
import Header from '../Components/Header'
import Profile from '../Components/Profile/Profile'
import { useSelector } from 'react-redux'

type Props = {}

const page:FC<Props>  = (props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(5)
  const [route, setRoute] = useState("Login")

  const {user} = useSelector((state:any) => state.auth)
  

  return (
    <div>
      <Protected>
      <Heading 
      title={`${user?.name} Profile`}
      description="Study Aloud is a platform for students to learn and get help from teachers"
      keywords="Programming,MERN,Redux,Machine Learning"
      />
      <Header
      open={open}
      setOpen={setOpen}
      activeItem={activeItem}
      setRoute={setRoute}
      route={route}
      />
      <Profile user={user}/>
      </Protected>
    </div>
  )
}

export default page
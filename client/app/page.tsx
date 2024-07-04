'use client'
import React, {FC,useState} from "react"
import Heading from "./Utils/Heading"
import Header from "./Components/Header";
import Hero from "./Components/Route/Hero"

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("Login")

  return (
    <div>
      <Heading 
      title="Study Aloud"
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
      <Hero/>
    </div>
  )
}

export default Page
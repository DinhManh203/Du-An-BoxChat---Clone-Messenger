import React from 'react'
import { Outlet } from 'react-router-dom'

const home = () => {
  return (
    <div>
      home

      {/** The nested route view will render here **/}
      <section>
        <Outlet/>
      </section>

    </div>
  )
}

export default home
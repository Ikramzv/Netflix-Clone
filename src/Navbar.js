import React, { useEffect, useState } from 'react'
import './Navbar.css'

function Navbar() {
    const[show , handleShow] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll' , () => {
            if(window.scrollY > 100) {
                handleShow(true)
            }else handleShow(false)
        })
        return window.removeEventListener('scroll' , () => {})
    } , [])

  return (
    <div className={`navbar ${show && 'nav_black'}`} >
        <img src='./logo.svg' alt='Netflix Logo' className='logo' />

    </div>
  )
}

export default Navbar
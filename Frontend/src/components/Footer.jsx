import React from 'react'
import {Link} from 'react-router-dom'
function Footer() {
  return (
    <footer className='container footer-section'>
      <div className="footer">
      <Link to="/" className="logo">
            <img src="/logo.png" alt="abhaypixel" />
        </Link>
      </div>
        <p> © 2025 AbhayPixel. All rights reserved.</p>
        <p>Develope By <Link  style={{color:"#5097FF"}} target='_blank' to={"https://www.linkedin.com/in/abhaysisotiya/"}>Abhay Sisotiya</Link></p>
    </footer>
  )
}

export default Footer

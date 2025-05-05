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
    </footer>
  )
}

export default Footer

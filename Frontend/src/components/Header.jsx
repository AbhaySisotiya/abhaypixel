import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth'


function Header() {

const {islogin} = useAuth()
  
  return (
    <header className="container header">
        <Link to="/" className="logo">
            <img src="/logo.png" alt="abhaypixel" />
        </Link>
        <nav>
            <ul className="navbar">

                {islogin ?  
                  <li><Link to="profile">My Account</Link></li>: <>
                    <li><Link to="signup">Signup</Link></li>
                    <li><Link to="login">Login</Link></li>
                  </>
                   
                   }
            </ul>
        </nav>
    </header>
  )
}

export default Header

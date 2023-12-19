import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Navbar() {
  const isUserSignedIn = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className='flex justify-around p-3 border-b border-zinc-800 items-center bg-[#1a1a1a]/90 text-zinc-300'>
      <Link to='/'><h1>AuthDB</h1></Link>
      <ul className='flex gap-6'>
        {isUserSignedIn ? (
          <>
            <Link to="/account"><li>Account</li></Link>
            <li><button onClick={handleSignOut}>Sign Out</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
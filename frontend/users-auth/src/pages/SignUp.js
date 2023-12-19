import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {

  const [users, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    axios.get('http://localhost:3001/register')
      .then(res => {
        console.log(res)
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', {
      email,
      username,
      password
    })
      .then(() => {
        alert('User registered')
        setEmail('')
        setUsername('')
        setPassword('')
        fetchUsers()
        navigate('/login')
      })
      .catch(err => {
        console.log(err)
      })

  }

  return (
    <div className='w-full h-screen flex'>
      <div className='m-auto'>
        <form onSubmit={handleRegister} className='text-center border rounded-lg w-[600px] h-[400px] p-9'>
          {/* Email Input */}
          <label>Email</label>
          <br />
          <input className='w-[400px] h-[40px] rounded-xl p-2 border' 
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => (setEmail(e.target.value))}/>
          <br />
          <br />
          {/* Username Input */}
          <label>Username</label>
          <br />
          <input className='w-[400px] h-[40px] rounded-xl p-2 border' 
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => (setUsername(e.target.value))}/>
          <br />
          <br />
          {/* Password Input */}
          <label>Password</label>
          <br />
          <input className='w-[400px] h-[40px] rounded-xl p-2 border' 
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => (setPassword(e.target.value))}/>
          <br />
          <br />
          <button type='submit' className='w-[200px] h-[50px] border'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
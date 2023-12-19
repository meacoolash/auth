import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {

  const [users, setUsers] = useState([])
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/login', {
        username,
        password
      })
      const token = res.data.token
      console.log(token)
      console.log(res)
      alert('User logged in')
      setUsername('')
      setPassword('')
      fetchUsers()
      navigate('/account')
      window.location.reload()
      localStorage.setItem('token', token)  
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='w-full h-screen flex'>
      <div className='m-auto'>
        <form onSubmit={handleLogin} className='text-center border rounded-lg p-9'>
          {/* Username Input */}
          <label>Username</label>
          <br />
          <input className='w-[400px] h-[40px] rounded-xlp-2 border'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => (setUsername(e.target.value))} />
          <br />
          <br />
          {/* Password Input */}
          <label>Password</label>
          <br />
          <input className='w-[400px] h-[40px] rounded-xlp-2 border'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => (setPassword(e.target.value))} />
          <br />
          <br />
          <button type='submit' className='w-[200px] h-[50px] border'>Login</button>
        </form>
      </div>
      

    </div>
  )
}

export default Login
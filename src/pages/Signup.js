import { useState, useEffect } from 'react'
import useAuthStore from '../stores/authStore'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signup, isLoading, error, user } = useAuthStore()

  const handleSubmit = e => {
    e.preventDefault()

    signup(email, password)
  }

  useEffect(() => {
    console.log('user: ', user)
  }, [user])

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>Email:</label>
      <input 
        type="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input 
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

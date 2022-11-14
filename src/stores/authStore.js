import create from 'zustand'
import useWorkoutStore from './workoutStore'

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: null,
  isLoading: false,
  signup: async (email, password) => {
    set({ isLoading: true, error: null })   

    const res = await fetch('https://workout-buddy-express-backend.herokuapp.com/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }) 
    const json = await res.json()

    if (!res.ok) set({ isLoading: false, error: json.error })

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      set({ user: json, isLoading: false })
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null })   

    const res = await fetch('https://workout-buddy-express-backend.herokuapp.com/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }) 
    const json = await res.json()

    if (!res.ok) {
      set({ isLoading: false, error: json.error })
    }

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      set({ user: json, isLoading: false })
    }
  },
  logout: async () => {
    localStorage.removeItem('user')
    set({ user: null })

    const workouts = useWorkoutStore.getState().workouts    

    useWorkoutStore.setState({ workouts: [] })
    console.log(`user logout, workouts: ${JSON.stringify(workouts)}`)    
  }
}))

export default useAuthStore
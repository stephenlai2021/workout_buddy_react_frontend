import create from 'zustand'
import useWorkoutStore from './workoutStore'

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  // user: null,
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
      // console.log('user: ', get().user)
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
      // console.log('user: ', get().user)
    }

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      set({ user: json, isLoading: false })
      // set({ isLoading: false })
      // console.log('user: ', get().user)
    }
  },
  logout: async () => {
    localStorage.removeItem('user')
    set({ user: null })

    const workouts = useWorkoutStore.getState().workouts
    // console.log(`user logout, workouts: ${JSON.stringify(workouts)}`)
    
    useWorkoutStore.setState({ workouts: [] })
    console.log(`user logout, workouts: ${JSON.stringify(workouts)}`)    
  }
}))

export default useAuthStore
import { useEffect, useState } from "react";
import useWorkoutStore from "../stores/workoutStore";
import { v4 as uuidv4 } from 'uuid'

export default function WorkoutForm() {
  const {id, setId} = useState('')
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [error, setError] = useState(null)

  const { addWorkout, workoutError } = useWorkoutStore(state => ({
    addWorkout: state.addWorkout,
    workoutError: state.workoutError
  }))

  const handleSubmit = async e => {
    e.preventDefault()

    if (!title) {
      setError('title cannot be empty !')
      return
    }
    if (!load) {
      setError('load cannot be empty !')
      return
    }
    if (!reps) {
      setError('reps cannot be empty !')
      return
    }

    const workout = { title, load, reps }

    /* supabase */
    // const workout = { _id: uuidv4(), title, load, reps, createdAt: new Date() }

    // const res = await fetch('http://localhost:5000/api/workouts', {
    //   method: 'POST',
    //   body: JSON.stringify(workout),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // const data = await res.json()

    // if (!res.ok) {
    //   setError(data.error)
    // }
    // if (res.ok) {
    //   setError(null)
    //   console.log('new workout added')
    // }

    addWorkout(workout)
    if (workoutError) setError(workoutError)
    if (!workoutError) {
      setTitle('')
      setLoad('')
      setReps('')
    }
  }

  useEffect(() => {
    setError(null)
  }, [title, load, reps])

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

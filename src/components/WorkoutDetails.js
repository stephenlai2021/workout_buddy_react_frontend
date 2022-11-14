import React from 'react'
import useTaskStore from '../stores/workoutStore'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function WorkoutDetails({ workout }) {
  const { deleteWorkout } = useTaskStore(state => ({
    deleteWorkout: state.deleteWorkout
  }))

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>

      {/* supabase */}
      {/* <p>{formatDistanceToNow(new Date(workout.created_at), { addSuffix: true })}</p> */}
      
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <i 
        className='material-icons icon-delete'
        onClick={() => deleteWorkout(workout._id)}
      >delete</i>
    </div>
  )
}

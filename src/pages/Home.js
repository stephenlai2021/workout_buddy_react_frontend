import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutStore from "../stores/workoutStore";
import useAuthStore from "../stores/authStore";

export default function Home() {
  const { workouts, fetchWorkouts } = useWorkoutStore();
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) fetchWorkouts();
  }, [user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

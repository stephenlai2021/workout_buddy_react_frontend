import create from "zustand";
import supabase from "../supabase/config";
import { v4 as uuidv4 } from "uuid";
import authStore from "./authStore";

const useWorkoutStore = create((set, get) => ({
  workouts: [],
  workoutError: null,
  fetchWorkouts: async () => {
    /* supabase */
    // const { data, error } = await supabase
    //   .from('workout_buddy')
    //   .select()

    // if (error) console.log('fetch workouts error: ', error)

    // if (data) {
    //   console.log('workouts: ', data)
    //   set(state => ({
    //     workouts: state.workouts = data
    //   }))
    // }

    /* express */
    const user = JSON.parse(localStorage.getItem("user"));    
    console.log("get user: ", user);

    const res = await fetch("https://workout-buddy-express-backend.herokuapp.com/api/workouts", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await res.json();
    console.log("workouts: ", data);

    if (res.ok) {
      set({ workouts: data.workouts });
    }
  },
  addWorkout: async (workout) => {
    /* supabase */
    // const { data, error } = await supabase
    //   .from('workout_buddy')
    //   .insert([{
    //     id: workout.id,
    //     title: workout.title,
    //     load: workout.load,
    //     reps: workout.reps,
    //     created_at: workout.created_at
    //   }])
    //   .select()

    // if (error) console.log('add workout error: ', error)
    // if (data) {
    //   console.log('added workout: ', data)
    //   set(state => ({
    //     workouts: [workout, ...state.workouts]
    //   }))
    // }

    /* express */
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch("https://workout-buddy-express-backend.herokuapp.com//api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    });
    const data = await res.json();

    if (!res.ok) {
      set({ workoutError: data.error });
    }
    if (res.ok) {
      set({ workoutError: null });
      set((state) => ({
        workouts: [data, ...state.workouts],
      }));
      console.log("new workout added", data);
    }
  },
  deleteWorkout: async (id) => {
    /* supabase */
    // const { data, error } = await supabase
    //   .from('workout_buddy')
    //   .delete()
    //   .eq('id', id)
    //   .select()

    // if (error) console.log('deleted error: ', error)
    // if (data) {
    //   console.log('deleted task: ', data)
    //   set(state => ({
    //     workouts: state.workouts.filter(workout => workout.id !== id)
    //   }))
    // }

    /* express */
    const user = JSON.parse(localStorage.getItem('user'))

    const res = await fetch(`https://workout-buddy-express-backend.herokuapp.com//api/workouts/${id}`, {
      method: "DELETE",
      headers: { 'Authorization': `Bearer ${user.token}` }
    });
    const data = await res.json();

    if (!res.ok) {
      set({ workoutError: data.error });
    }

    if (res.ok) {
      console.log("deleted workout: ", data);

      set({ workoutError: null });
      set((state) => ({
        workouts: state.workouts.filter((workout) => workout._id !== id),
      }));
    }
  },
}));

export default useWorkoutStore;

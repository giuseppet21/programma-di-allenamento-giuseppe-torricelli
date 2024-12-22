class WorkoutService:
    def __init__(self):
        self.workouts = {}
    
    def create_workout(self, user_id, workout_type, exercises):
        workout = {
            'user_id': user_id,
            'type': workout_type,
            'exercises': exercises,
            'date': datetime.now()
        }
        self.workouts[len(self.workouts) + 1] = workout
        return workout 
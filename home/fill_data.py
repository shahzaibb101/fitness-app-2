from .models import ActivePlans

def fill():
    data = {
        "trainer_id": "65f85abf9f7dd3d992a82c79",
        "user_id": "65fc90c62ded312fd3f116fa",
        "name": "shyzii",
        "user_email": "shyzii@gmail.com",
        "rec1": "Deadlift 3 reps (12 each)",
        "rec2": "Flying Dumbell 3 reps (12 each)",
        "rec3": "Side Raises 4 reps (8 each)",
        "rec4": "Treadmill 300 seconds",
        "est_time": "45 minutes"
    }

    ActivePlans.insert_one(data)
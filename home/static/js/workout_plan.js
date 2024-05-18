var workoutItems = document.querySelectorAll(".workout__list-item");

// Hide all workout items beyond the first four
for (var i = 4; i < workoutItems.length; i++) {
    workoutItems[i].style.display = "none";
}

// Add event listener to the button to toggle visibility
document.getElementById("toggleButton").addEventListener("click", function () {
    for (var i = 4; i < workoutItems.length; i++) {
        if (workoutItems[i].style.display === "none") {
            workoutItems[i].style.display = "block";
        } else {
            workoutItems[i].style.display = "none";
        }
    }
    // Change button text based on visibility state
    var buttonText = this.textContent;
    this.textContent = (buttonText === "View All Workouts") ? "Hide Workouts" : "View All Workouts";
});

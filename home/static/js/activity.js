document.addEventListener("DOMContentLoaded", function () {
  fetch(todayActivityChartDataUrl)
    .then((response) => response.json())
    .then((data) => {
      var todayActivity = document.getElementById("todayActivity");

      // Create progress bars for each day
      for (var i = 0; i < data.today_activity.length; i++) {
        var progressBarContent = document.createElement("div");
        progressBarContent.classList.add("progress-bar-content");
        var progressBarContainer = document.createElement("div");
        progressBarContainer.classList.add("progress-bar");
        var progressBarInner = document.createElement("div");
        progressBarInner.classList.add("progress-bar-inner");
        progressBarInner.style.height = data.today_activity[i] + "%";
        progressBarContent.appendChild(progressBarContainer);
        progressBarContainer.appendChild(progressBarInner);
        todayActivity.appendChild(progressBarContent);

        // Create progress bar text for each day
        var progressBarText = document.createElement("div");
        progressBarText.classList.add("progress-bar-text");
        progressBarText.innerText = data.day_time[i];
        progressBarContent.appendChild(progressBarText);
      }

      // Render goal completion percentage circle
      var todayGoalPercentage = data.today_goal_completion_percentage;
      var goalCircleInner = document.querySelector(".progress-circle-inner");
      goalCircleInner.style.transform =
        "rotate(" + (todayGoalPercentage * 3.6 - 270) + "deg)";

      var goalText = document.getElementById("todayGoalText");
      goalText.innerText = todayGoalPercentage + "%";
    });

  fetch(weeklyActivityChartDataUrl)
    .then((response) => response.json())
    .then((data) => {
      var weeklyActivity = document.getElementById("weeklyActivity");

      // Create progress bars for each day
      for (var i = 0; i < data.weekly_activity.length; i++) {
        var progressBarContent = document.createElement("div");
        progressBarContent.classList.add("progress-bar-content");
        var progressBarContainer = document.createElement("div");
        progressBarContainer.classList.add("progress-bar");
        var progressBarInner = document.createElement("div");
        progressBarInner.classList.add("progress-bar-inner");
        progressBarInner.style.height = data.weekly_activity[i] + "%";
        progressBarContent.appendChild(progressBarContainer);
        progressBarContainer.appendChild(progressBarInner);
        weeklyActivity.appendChild(progressBarContent);

        // Create progress bar text for each day
        var progressBarText = document.createElement("div");
        progressBarText.classList.add("progress-bar-text");
        progressBarText.innerText = data.week_days[i];
        progressBarContent.appendChild(progressBarText);
      }

      // Render goal completion percentage circle
      var weeklyGoalPercentage = data.weekly_goal_completion_percentage;
      var goalCircleInner = document.querySelector(".progress-circle-inner");
      goalCircleInner.style.transform =
        "rotate(" + (weeklyGoalPercentage * 3.6 - 270) + "deg)";

      var goalText = document.getElementById("weeklyGoalText");
      goalText.innerText = weeklyGoalPercentage + "%";
    });

  fetch(monthlyActivityChartDataUrl)
    .then((response) => response.json())
    .then((data) => {
      var monthlyActivity = document.getElementById("monthlyActivity");

      // Create progress bars for each day
      for (var i = 0; i < data.monthly_activity_chart.length; i++) {
        var progressBarContent = document.createElement("div");
        progressBarContent.classList.add("progress-bar-content");
        var progressBarContainer = document.createElement("div");
        progressBarContainer.classList.add("progress-bar");
        var progressBarInner = document.createElement("div");
        progressBarInner.classList.add("progress-bar-inner");
        progressBarInner.style.height = data.monthly_activity_chart[i] + "%";
        progressBarContent.appendChild(progressBarContainer);
        progressBarContainer.appendChild(progressBarInner);
        monthlyActivity.appendChild(progressBarContent);

        // Create progress bar text for each day
        var progressBarText = document.createElement("div");
        progressBarText.classList.add("progress-bar-text");
        progressBarText.innerText = data.months[i];
        progressBarContent.appendChild(progressBarText);
      }

      // Render goal completion percentage circle
      var monthlyGoalPercentage = data.monthly_goal_completion_percentage;
      var goalCircleInner = document.querySelector(".progress-circle-inner");
      goalCircleInner.style.transform =
        "rotate(" + (monthlyGoalPercentage * 3.6 - 270) + "deg)";

      var goalText = document.getElementById("monthlyGoalText");
      goalText.innerText = monthlyGoalPercentage + "%";
    });
});

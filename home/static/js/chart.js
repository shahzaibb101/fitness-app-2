document.addEventListener("DOMContentLoaded", function () {
  fetch(weeklyAchievedChartDataUrl)
    .then((response) => response.json())
    .then((data) => {
      var weeklyAchievedActivity = document.getElementById(
        "weeklyAchievedActivity"
      );

      // Create goal achieved bars for each day
      for (var i = 0; i < data.weekly_achieved_activity.length; i++) {
        var goalAchievedBarContent = document.createElement("div");
        goalAchievedBarContent.classList.add("goal-achieved-bar-content");
        var goalAchievedBarContainer = document.createElement("div");
        goalAchievedBarContainer.classList.add("goal-achieved-bar");
        var goalAchievedBarInner = document.createElement("div");
        goalAchievedBarInner.classList.add("goal-achieved-bar-inner");
        goalAchievedBarInner.style.height =
          data.weekly_achieved_activity[i] + "%";
        goalAchievedBarContent.appendChild(goalAchievedBarContainer);
        goalAchievedBarContainer.appendChild(goalAchievedBarInner);
        weeklyAchievedActivity.appendChild(goalAchievedBarContent);

        // Create goal achieved bar text for each day
        var goalAchievedBarText = document.createElement("div");
        goalAchievedBarText.classList.add("goal-achieved-bar-text");
        goalAchievedBarText.innerText = data.week_days_chart[i];
        goalAchievedBarContent.appendChild(goalAchievedBarText);
      }

      // Render goal completion percentage circle
      var weeklyGoalAchievedPercentage = data.weekly_goal_achieved_percentage;
      var goalAchievedText = document.getElementById("weeklyAchievedGoalText");
      goalAchievedText.innerText = weeklyGoalAchievedPercentage + "%";
    });

  $(document).ready(function () {
    $(".line-graphs-items").addClass("owl-carousel");
    $(".line-graphs-items").owlCarousel({
      loop: false,
      margin: 20,
      nav: true,
      dots: false,
      items: 1,
    });
  });

  fetch(julyMonthGraphDataUrl)
    .then((response) => response.json())
    .then((data) => {
      var ctx = document
        .getElementsByClassName("julyMonthLineGraph")[0]
        .getContext("2d");
      var gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(102, 126, 234, 1)');
      gradient.addColorStop(1, 'rgba(118, 75, 162, 1)');
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Monthly Data",
              data: data.values,
              backgroundColor: gradient,
              borderColor: gradient,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
              borderColor: "rgba(265, 265, 265, 1)",
              borderWidth: 2,
            },
            y: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
              borderColor: "rgba(265, 265, 265, 1)",
              borderWidth: 2,
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "white",  // not 'fontColor:' anymore
                // fontSize: 18  // not 'fontSize:' anymore
                font: {
                  size: 18 // 'size' now within object 'font {}'
                }
              }
            }
          },
        },
      });
    });

  fetch(augMonthGraphDataUrl)
    .then((response) => response.json())
    .then((data) => {
      var ctx = document
        .getElementsByClassName("augMonthLineGraph")[0]
        .getContext("2d");
      var gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(102, 126, 234, 1)');
      gradient.addColorStop(1, 'rgba(118, 75, 162, 1)');
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Monthly Data",
              data: data.values,
              backgroundColor: gradient,
              borderColor: gradient,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
              borderColor: gradient,
              borderWidth: 2,
            },
            y: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
              borderColor: gradient,
              borderWidth: 2,
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
        },
      });
    });

  fetch(sepMonthGraphDataUrl)
    .then((response) => response.json())
    .then((data) => {
      var ctx = document
        .getElementsByClassName("sepMonthLineGraph")[0]
        .getContext("2d");
      var gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(102, 126, 234, 1)');
      gradient.addColorStop(1, 'rgba(118, 75, 162, 1)');
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Monthly Data",
              data: data.values,
              backgroundColor: gradient,
              borderColor: gradient,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
              borderColor: gradient,
              borderWidth: 2,
            },
            y: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
              borderColor: gradient,
              borderWidth: 2,
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
        },
      });
    });

  fetch(octMonthGraphDataUrl)
    .then((response) => response.json())
    .then((data) => {
      var ctx = document
        .getElementsByClassName("octMonthLineGraph")[0]
        .getContext("2d");
      var gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(102, 126, 234, 1)');
      gradient.addColorStop(1, 'rgba(118, 75, 162, 1)');
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Monthly Data",
              data: data.values,
              backgroundColor: gradient,
              borderColor: gradient,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
              borderColor: gradient,
              borderWidth: 2,
            },
            y: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
              borderColor: gradient,
              borderWidth: 2,
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
        },
      });
    });

  fetch(novMonthGraphDataUrl)
    .then((response) => response.json())
    .then((data) => {
      var ctx = document
        .getElementsByClassName("novMonthLineGraph")[0]
        .getContext("2d");
      var gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(102, 126, 234, 1)');
      gradient.addColorStop(1, 'rgba(118, 75, 162, 1)');
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Monthly Data",
              data: data.values,
              backgroundColor: gradient,
              borderColor: gradient,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
              borderColor: gradient,
              borderWidth: 2,
            },
            y: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
              borderColor: gradient,
              borderWidth: 2,
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
        },
      });
    });

  fetch(decMonthGraphDataUrl)
    .then((response) => response.json())
    .then((data) => {
      var ctx = document
        .getElementsByClassName("decMonthLineGraph")[0]
        .getContext("2d");
      var gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(102, 126, 234, 1)');
      gradient.addColorStop(1, 'rgba(118, 75, 162, 1)');
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Monthly Data",
              data: data.values,
              backgroundColor: gradient,
              borderColor: gradient,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
              borderColor: gradient,
              borderWidth: 2,
            },
            y: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
              borderColor: gradient,
              borderWidth: 2,
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
        },
      });
    });
});

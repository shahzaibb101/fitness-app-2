// JavaScript code to create the chart
    // Access the canvas element
    const ctx = document.getElementById('monthlyMusclePerformanceChart').getContext('2d');
    
    // Data for the chart
    const monthlyMusclePerformanceData = {
      labels: ['January', 'February', 'March', 'April'], // Monthly labels
      datasets: [
        {
          label: 'Chest',
          data: [80, 85, 90, 82], // Monthly performance data for Chest
          backgroundColor: 'rgba(255, 99, 132, 0.5)', // Red color
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Shoulders',
          data: [75, 78, 80, 77], // Monthly performance data for Shoulders
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue color
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Abs',
          data: [90, 88, 92, 89], // Monthly performance data for Abs
          backgroundColor: 'rgba(255, 206, 86, 0.5)', // Yellow color
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        },
        {
          label: 'Legs',
          data: [85, 82, 88, 86], // Monthly performance data for Legs
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Green color
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };

    // Configuration for the chart
    const monthlyMuscleChartConfig = {
      type: 'bar', // Type of chart (bar chart in this case)
      data: monthlyMusclePerformanceData,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Workout Completeness', // Title for the chart
            font: {
              size: 23 // Adjust title font size if needed
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 10 // Adjust step size of y-axis ticks as needed
            }
          }
        }
      }
    };

    // Creating the chart
    const monthlyMusclePerformanceChart = new Chart(ctx, monthlyMuscleChartConfig);

    // console.log("user.js user id: ", user_id);


    // Function to fetch data from CSV
    async function fetchDataFromCSV() {
      console.log("Fetching data from CSV...");
      const response = await fetch('/serve-csv/?user_id=' + user_id);
      const data = await response.text();
      // console.log("CSV data:", data);

      const rows = data.trim().split('\n');
      // console.log("CSV rows:", rows);

      const header = rows[0].split(','); // Split header row into individual keys
      // console.log("CSV header:", header);

      const rowData = rows[1].split(',');
      // console.log("CSV row data:", rowData);

      const jointsData = {};

      // Construct jointsData object from CSV data
      header.forEach((key, index) => {
          const position = key.split('_')[0]; // Extract joint position (e.g., Pelvis, LeftUpperLeg)
          if (!jointsData[position]) {
              jointsData[position] = {};
          }
          const coordinate = key.split('_')[2]; // Extract coordinate (x, y, z)
          const cleanedCoordinate = coordinate.replace(/\W/g, ''); // Remove non-alphanumeric characters
          const coordinateValue = parseFloat(rowData[index]);
          jointsData[position][cleanedCoordinate.toUpperCase()] = coordinateValue;
      });

      // console.log("Parsed joints data:", jointsData);
      return jointsData;
  }


  // Function to create Plotly trace from joints data
  function createTrace(jointsData) {
      const trace = {
          x: [],
          y: [],
          z: [],
          mode: 'markers',
          type: 'scatter3d',
          marker: {
              size: 5,
              opacity: 0.8,
              color: 'rgb(23, 190, 207)'
          },
          text: []
      };

      // Populate trace with data from jointsData
      Object.keys(jointsData).forEach(key => {
          const joint = jointsData[key];
          trace.text.push(key); // Add corresponding name as text
          trace.x.push(joint.X);
          trace.y.push(joint.Y);
          trace.z.push(joint.Z);
      });

      // console.log("Created trace:", trace);
      return trace;
  }

  // Function to create Plotly layout
  function createLayout() {
      return {
          margin: {
              l: 0,
              r: 0,
              b: 0,
              t: 0
          }
      };
  }

  // Main function to plot data
  async function plotData() {
      // console.log("Plotting data...");
      const jointsData = await fetchDataFromCSV();
      const trace = createTrace(jointsData);
      const layout = createLayout();

      // console.log("Trace:", trace);
      // console.log("Layout:", layout);

      Plotly.newPlot('scatterPlot', [trace], layout);
  }

  // Call main function to plot data
  plotData();
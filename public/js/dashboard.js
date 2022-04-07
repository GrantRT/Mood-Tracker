const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Daily Mood',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [2, 4, 5, 7, 9, 10, 5],
    },
  ],
};

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Min and Max Settings',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
      },
    },
  },
};

const moodChart = new Chart(document.getElementById('moodChart'), config);

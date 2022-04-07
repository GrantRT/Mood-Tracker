// To do: make chart dynamic

moodDataArr = [];

const getMoodData = () => {
  fetch('/api/moods', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => moodDataArr.push(data[0]));
};

getMoodData();

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

function findOutputForSlider(el) {
  var idVal = el.id;
  outputs = document.getElementsByTagName('output');
  for (var i = 0; i < outputs.length; i++) {
    if (outputs[i].htmlFor == idVal) return outputs[i];
  }
}

var sliders = document.querySelectorAll('input[type="range"].slider');
[].forEach.call(sliders, function (slider) {
  var output = findOutputForSlider(slider);
  if (output) {
    slider.addEventListener('input', function (event) {
      output.value = event.target.value;
    });
  }
});

// get mood data

console.log(moodDataArr);

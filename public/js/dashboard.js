var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

// To do: make chart dynamic

mondayDataArr = [];
tuesdayDataArr = [];
wednesdayDataArr = [];
thursdayDataArr = [];
fridayDataArr = [];
saturdayDataArr = [];
sundayDataArr = [];

// const getMoodData = () => {
//   fetch('/api/moods', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // data.length -1 to make sure you get the most recent weeks data
//       const mondayData = data[data.length - 1].monday;
//       mondayDataArr.push(mondayData);
//     });
// };

const getMoodData = async () => {
  const response = await fetch('/api/moods', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  const mondayData = await data[data.length - 1].monday;
  const tuesdayData = await data[data.length - 1].tuesday;
  const wednesdayData = await data[data.length - 1].wednesday;
  const thursdayData = await data[data.length - 1].thursday;
  const fridayData = await data[data.length - 1].friday;
  const saturdayData = await data[data.length - 1].saturday;
  const sundayData = await data[data.length - 1].sunday;
  await mondayDataArr.push(mondayData);
  await tuesdayDataArr.push(tuesdayData);
  await wednesdayDataArr.push(wednesdayData);
  await wednesdayDataArr.push(wednesdayData);
  await thursdayDataArr.push(thursdayData);
  await fridayDataArr.push(fridayData);
  await saturdayDataArr.push(saturdayData);
  await sundayDataArr.push(sundayData);
  renderWeeklyChart();
};

getMoodData();

const renderWeeklyChart = () => {
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Daily Mood',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [
          mondayDataArr[mondayDataArr.length - 1],
          tuesdayDataArr[tuesdayDataArr.length - 1],
          wednesdayDataArr[wednesdayDataArr.length - 1],
          thursdayDataArr[thursdayDataArr.length - 1],
          fridayDataArr[fridayDataArr.length - 1],
          saturdayDataArr[saturdayDataArr.length - 1],
          sundayDataArr[sundayDataArr.length - 1],
        ],
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
};

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

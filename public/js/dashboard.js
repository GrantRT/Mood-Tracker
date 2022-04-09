const allRanges = document.querySelectorAll('.slider-card');
allRanges.forEach((wrap) => {
  const slider = wrap.querySelector('.slider');
  const bubble = wrap.querySelector('.bubble');

  slider.addEventListener('input', () => {
    setBubble(slider, bubble);
  });
  setBubble(slider, bubble);
});

function setBubble(slider, bubble) {
  const val = slider.value;
  const min = slider.min ? slider.min : 0;
  const max = slider.max ? slider.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

mondayDataArr = [];
tuesdayDataArr = [];
wednesdayDataArr = [];
thursdayDataArr = [];
fridayDataArr = [];
saturdayDataArr = [];
sundayDataArr = [];

// Get todays day
const todaysDay = () => {
  const today = new Date();
  if (today.getDay() == 6) {
    return 'saturday';
  }
};

// Todo: Submit the users current mood to populate the database and chart.
const moodFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the mood form
  const mood = document.querySelector('#myRange').value;
  let day = { [todaysDay()]: parseInt(mood) };

  if (mood) {
    const response = await fetch('/api/moods', {
      method: 'POST',
      body: JSON.stringify({ ...day }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

const getMoodData = async () => {
  const response = await fetch('/api/moods', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  const mondayData = data[data.length - 1].monday;
  const tuesdayData = data[data.length - 1].tuesday;
  const wednesdayData = data[data.length - 1].wednesday;
  const thursdayData = data[data.length - 1].thursday;
  const fridayData = data[data.length - 1].friday;
  const saturdayData = data[data.length - 1].saturday;
  const sundayData = data[data.length - 1].sunday;
  mondayDataArr.push(mondayData);
  tuesdayDataArr.push(tuesdayData);
  wednesdayDataArr.push(wednesdayData);
  wednesdayDataArr.push(wednesdayData);
  thursdayDataArr.push(thursdayData);
  fridayDataArr.push(fridayData);
  saturdayDataArr.push(saturdayData);
  sundayDataArr.push(sundayData);
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

document.querySelector('.todays-mood-form').addEventListener('submit', moodFormHandler);

dayjs.extend(window.dayjs_plugin_weekOfYear);

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

const mondayDataArr = [];
const tuesdayDataArr = [];
const wednesdayDataArr = [];
const thursdayDataArr = [];
const fridayDataArr = [];
const saturdayDataArr = [];
const sundayDataArr = [];

// Get todays day
const todaysDayAndWeek = () => {
  const today = new Date();
  const week = dayjs(today).week();
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const day = 'friday';
  // const day = daysOfWeek[today.getDay()];

  return { day, week };
};

// Todo: Submit the users current mood to populate the database and chart.
const moodFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the mood form
  const mood = document.querySelector('#myRange').value;
  const { week, day } = todaysDayAndWeek();
  const dayMood = { [day]: parseInt(mood) };

  if (mood) {
    const response = await fetch('/api/moods', {
      method: 'POST',
      body: JSON.stringify({ week, day: dayMood }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
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
          text: 'Your weekly mood',
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

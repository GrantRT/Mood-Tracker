// Bring in day.js to be used to determine the current week
dayjs.extend(window.dayjs_plugin_weekOfYear);

// Logic for the round slider to only be shown on mobile devices
$('#slider').roundSlider({
  sliderType: 'min-range',
  min: 0,
  max: 10,
  value: '',
  editableTooltip: false,
  radius: 200,
  width: 60,
  handleShape: 'round',
  tooltipFormat: 'tooltipVal1',
  drag: function (event, ui) {},
});

// Logic for the normal slider to be shown on larger devices
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

// Empty arrays for each day of the week to be populated with user data
const mondayDataArr = [];
const tuesdayDataArr = [];
const wednesdayDataArr = [];
const thursdayDataArr = [];
const fridayDataArr = [];
const saturdayDataArr = [];
const sundayDataArr = [];

// Get todays day and week
const todaysDayAndWeek = () => {
  const today = new Date();
  const week = dayjs(today).week();
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const daySelect = document.getElementById('day-select').value;
  const dayToday = daysOfWeek[today.getDay()];
  // If a day is selected use it, otherwise use today's day
  const day = daySelect || dayToday;
  return { day, week };
};

// Submit the users current mood to populate the database and chart.
const moodFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the mood form
  const mood = $('#slider').roundSlider('option', 'value') || document.querySelector('#myRange').value;
  const { week, day } = todaysDayAndWeek();
  const dayMood = { [day]: parseInt(mood) };

  if (mood <= 4) {
    alert("We've noticed your mood is low today, please view the links page for help");
  }
  // If the user submits a mood, POST the data
  if (mood) {
    const response = await fetch('/api/moods', {
      method: 'POST',
      body: JSON.stringify({ week, day: dayMood }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

// GET the user's mood data
const getMoodData = async () => {
  const response = await fetch('/api/moods', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (data.length < 1) {
    return;
  } else {
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
  }
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

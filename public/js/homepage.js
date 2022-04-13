const mondayDataArr = [];
const tuesdayDataArr = [];
const wednesdayDataArr = [];
const thursdayDataArr = [];
const fridayDataArr = [];
const saturdayDataArr = [];
const sundayDataArr = [];

// TODO: search for a user by username
const searchFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the search form
  const username = document.querySelector('#search-input').value;

  if (username) {
    const response = await fetch(`/api/users/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const userData = await response.json();
    const userId = userData[0].id;
    const getMoodData = async () => {
      const response = await fetch(`/api/moods/${userId}`, {
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
              text: `${username}'s weekly mood`,
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

      if (window.friendMoodChart instanceof Chart) {
        window.friendMoodChart.destroy();
      }
      window.friendMoodChart = new Chart(document.getElementById('friendMoodChart'), config);
    };
  }
};

document.querySelector('.search-form').addEventListener('submit', searchFormHandler);
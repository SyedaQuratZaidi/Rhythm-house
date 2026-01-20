window.onload = function() {
  document.querySelector('.carousel').classList.add('loaded');
};

const ctx = document.getElementById('salesChart').getContext('2d');
  const initialData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'CDs',
        data: [120, 130, 125, 140, 135, 145],
        borderColor: '#ec407a',
        backgroundColor: '#ec407a',
        fill: false,
        tension: 0.3
      },
      {
        label: 'DVDs',
        data: [100, 95, 105, 110, 100, 108],
        borderColor: '#42a5f5',
        backgroundColor: '#42a5f5',
        fill: false,
        tension: 0.3
      },
      {
        label: 'Tapes',
        data: [60, 65, 70, 75, 80, 85],
        borderColor: '#ffca28',
        backgroundColor: '#ffca28',
        fill: false,
        tension: 0.3
      },
      {
        label: 'Magazines',
        data: [150, 155, 160, 158, 165, 170],
        borderColor: '#66bb6a',
        backgroundColor: '#66bb6a',
        fill: false,
        tension: 0.3
      }
    ]
  };

  let chart = new Chart(ctx, {
    type: 'line',
    data: initialData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 200,
          title: {
            display: true,
            text: 'Units'
          }
        }
      }
    }
  });

  function refreshChart() {
    // Example: randomize data
    chart.data.datasets.forEach(dataset => {
      dataset.data = dataset.data.map(() => Math.floor(Math.random() * 200));
    });
    chart.update();
  }

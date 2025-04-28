const form = document.getElementById('growthForm');
const hasil = document.getElementById('hasil');
const biodata = document.getElementById('biodata');
const stuntingStatus = document.getElementById('stuntingStatus');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nama = document.getElementById('nama').value;
  const tanggalLahir = document.getElementById('tanggalLahir').value;
  const beratBadan = document.getElementById('beratBadan').value;
  const tinggiBadan = document.getElementById('tinggiBadan').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;

  hasil.style.display = 'block';

  biodata.innerHTML = `
    Nama: ${nama}<br>
    Jenis Kelamin: ${gender}<br>
    Tanggal Lahir: ${tanggalLahir}<br>
    Berat Badan: ${beratBadan} kg<br>
    Tinggi Badan: ${tinggiBadan} cm
  `;

  // Cek apakah anak aman dari stunting
  if (tinggiBadan >= 80.3) {
    stuntingStatus.innerText = "Aman dari STUNTING";
    stuntingStatus.style.backgroundColor = "limegreen";
  } else {
    stuntingStatus.innerText = "Berisiko STUNTING";
    stuntingStatus.style.backgroundColor = "red";
  }

  // Update Chart
  createChart(tinggiBadan);
});

// Chart.js
function createChart(userHeight) {
  const ctx = document.getElementById('growthChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['0', '4', '8', '12', '16', '20'],
      datasets: [{
        label: 'Standar WHO',
        data: [50, 65, 75, 80, 82, 84],
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Data Anak',
        data: [null, null, null, null, null, userHeight],
        borderColor: 'blue',
        borderDash: [5, 5],
        fill: false,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 40,
          max: 100
        }
      }
    }
  });
}
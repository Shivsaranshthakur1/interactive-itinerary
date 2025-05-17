const container = document.getElementById('itinerary');

const sampleData = [
  { day: 1, location: 'Arrive in City', activity: 'Check in to hotel' },
  { day: 2, location: 'Museum', activity: 'Explore local history' },
  { day: 3, location: 'Park', activity: 'Enjoy nature and relax' }
];

function render() {
  container.innerHTML = sampleData.map(item => `<div><strong>Day ${item.day}:</strong> ${item.location} - ${item.activity}</div>`).join('');
}

render();

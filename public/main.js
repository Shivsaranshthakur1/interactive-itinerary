const container = document.getElementById('itinerary');
const form = document.getElementById('add-form');
const dayInput = document.getElementById('day');
const locationInput = document.getElementById('location');
const activityInput = document.getElementById('activity');

const itinerary = [
  { day: 1, location: 'Arrive in City', activity: 'Check in to hotel' },
  { day: 2, location: 'Museum', activity: 'Explore local history' },
  { day: 3, location: 'Park', activity: 'Enjoy nature and relax' }
];

function render() {
  container.innerHTML = itinerary
    .map(item => `<div><strong>Day ${item.day}:</strong> ${item.location} - ${item.activity}</div>`)
    .join('');
}

form.addEventListener('submit', evt => {
  evt.preventDefault();
  itinerary.push({
    day: parseInt(dayInput.value, 10),
    location: locationInput.value,
    activity: activityInput.value
  });
  form.reset();
  render();
});

render();

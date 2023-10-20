document.addEventListener('DOMContentLoaded', function() {

  const birthdayTime = document.querySelector('#birthdayTime')
  const countdownContainer = document.querySelector('#countdown')
  const daysCountdown = document.querySelector('#days')
  const hoursCountdown = document.querySelector('#hours')
  const minutesCountdown = document.querySelector('#minutes')
  const secondsCountdown = document.querySelector('#seconds')

  const currentTime = new Date();
  const yearOfTheEvent = currentTime.getFullYear();
  const eventDate = new Date(yearOfTheEvent, 9, 20); // Month is zero-based, so 9 represents October

  function countdown() {
    const now = new Date();

    if (now > eventDate) {
      eventDate.setFullYear(yearOfTheEvent + 1);
    }

    const remainingTime = eventDate - now;

    const seconds = Math.floor(remainingTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const displayHours = hours % 24;
    const displayMinutes = minutes % 60;
    const displaySeconds = seconds % 60;

    if (
      now.getFullYear() === eventDate.getFullYear() &&
      now.getMonth() === 9 &&
      now.getDate() === 20
    ) {
      console.log('Happy HRT Anniversary!');

      countdownContainer.style.display = 'none';
      birthdayTime.style.display = 'block';
    } else {
      daysCountdown.textContent = days;
      hoursCountdown.textContent = displayHours;
      minutesCountdown.textContent = displayMinutes;
      secondsCountdown.textContent = displaySeconds;

      setTimeout(countdown, 1000);
    }
  }

  countdown();

}); // end of DOMContentLoaded

let date_1 = new Date('10/20/2023');
let date_2 = new Date(); // Set date_2 to the current date

const daysHRT = Math.ceil((date_2 - date_1) / (1000 * 3600 * 24));

if (daysHRT > 0) {
  document.getElementById('hrt').innerHTML = daysHRT + ' days till HRT';
} else if (daysHRT <= 0 && daysHRT > -30) {
  document.getElementById('hrt').innerHTML = Math.abs(daysHRT) + ' days passed since HRT';
  document.getElementById('img1').src = 'https://media.tenor.com/jY84qSwONRwAAAAM/anime-happy.gif';
} else {
  const monthsSinceHRT = Math.floor(daysHRT / 30);
  document.getElementById('hrt').innerHTML = monthsSinceHRT + ' months passed since HRT';
  document.getElementById('img1').src = 'https://media.tenor.com/jY84qSwONRwAAAAM/anime-happy.gif';
}

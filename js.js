document.addEventListener('DOMContentLoaded', function() {
    const birthdayTime = document.querySelector('#birthdayTime');
    const countdownContainer = document.querySelector('#countdown');
    const daysCountdown = document.querySelector('#days');
    const hoursCountdown = document.querySelector('#hours');
    const minutesCountdown = document.querySelector('#minutes');
    const secondsCountdown = document.querySelector('#seconds');
    const hrtContainer = document.querySelector('#hrt');

    const currentTime = new Date();
    let yearOfTheEvent = currentTime.getFullYear();
    let eventDate = new Date(yearOfTheEvent, 03, 05); // April 5th in Bulgarian time
    const isItApril5th = currentTime.getMonth() === 03 && currentTime.getDate() === 05;

    // Date when HRT started
    let hrtStartDate = new Date('10/20/2023'); // Adjust this date accordingly

    function countdown() {
        const now = new Date();

        if (now > eventDate) {
            eventDate = new Date(yearOfTheEvent + 1, 03, 05);
        } else if (now.getFullYear() === eventDate.getFullYear() + 1) {
            eventDate = new Date(now.getFullYear(), 03, 05);
        }

        const currentTime = now.getTime();
        const eventTime = eventDate.getTime();
        const remainingTime = eventTime - currentTime;

        let seconds = Math.floor(remainingTime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        if (isItApril5th) {
            console.log('Happy birthday, Shinni!');

            countdownContainer.style.display = "none";
            birthdayTime.style.display = "block";

        } else {

            daysCountdown.textContent = days;
            hoursCountdown.textContent = hours;
            minutesCountdown.textContent = minutes;
            secondsCountdown.textContent = seconds;

            setTimeout(countdown, 1000);
        }
    }

    countdown();

    // Calculate days on HRT
    function calculateDaysOnHRT() {
        const daysOnHRT = Math.floor((currentTime - hrtStartDate) / (1000 * 60 * 60 * 24));
        hrtContainer.textContent = `On HRT since ${daysOnHRT} day${daysOnHRT === 1 ? '' : 's'}`;
    }

    calculateDaysOnHRT();
});

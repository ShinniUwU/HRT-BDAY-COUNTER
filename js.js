document.addEventListener('DOMContentLoaded', function() {
    const birthdayTime = document.querySelector('#birthdayTime');
    const hrtTime = document.querySelector('#hrtTime');
    const countdownContainer = document.querySelector('#countdown');
    const daysCountdown = document.querySelector('#days');
    const hoursCountdown = document.querySelector('#hours');
    const minutesCountdown = document.querySelector('#minutes');
    const secondsCountdown = document.querySelector('#seconds');

    const currentTime = new Date();
    let yearOfTheEvent = currentTime.getFullYear();

    // Set the event date to April 5th for birthday
    let birthdayDate = new Date(yearOfTheEvent, 3 - 1, 5); // Month is 0-indexed

    const isItApril5th = currentTime.getMonth() === 3 - 1 && currentTime.getDate() === 5;

    function birthdayCountdown() {
        const now = new Date();

        if (now > birthdayDate) {
            birthdayDate = new Date(yearOfTheEvent + 1, 3 - 1, 5);
        } else if (now.getMonth() === 3 - 1 && now.getDate() === 5 && now.getFullYear() === birthdayDate.getFullYear() + 1) {
            birthdayDate = new Date(now.getFullYear(), 3 - 1, 5);
        }

        const currentTime = now.getTime();
        const eventTime = birthdayDate.getTime();
        const remainingTime = eventTime - currentTime;

        let seconds = Math.floor(remainingTime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        if (isItApril5th) {
            console.log('Happy birthday!');
            countdownContainer.style.display = "none";
            birthdayTime.style.display = "block";
        } else {
            daysCountdown.textContent = days;
            hoursCountdown.textContent = hours;
            minutesCountdown.textContent = minutes;
            secondsCountdown.textContent = seconds;

            setTimeout(birthdayCountdown, 1000);
        }
    }

    birthdayCountdown();

    // Set the start date for HRT
    let hrtStartDate = new Date('10/20/2023');
    let currentDate = new Date();

    const daysSinceHRT = (date1, date2) => {
        let difference = date2.getTime() - date1.getTime();
        let totalDays = Math.floor(difference / (1000 * 3600 * 24));
        return totalDays;
    };

    hrtTime.textContent = daysSinceHRT(hrtStartDate, currentDate) + " days since HRT";
});

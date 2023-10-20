document.addEventListener('DOMContentLoaded', function() {
    const birthdayTime = document.querySelector('#birthdayTime');
    const countdownContainer = document.querySelector('#countdown');
    const daysCountdown = document.querySelector('#days');
    const hoursCountdown = document.querySelector('#hours');
    const minutesCountdown = document.querySelector('#minutes');
    const secondsCountdown = document.querySelector('#seconds');

    const currentTime = new Date();
    let yearOfTheEvent = currentTime.getFullYear();
    
    // Set the event date to April 5th
    let eventDate = new Date(yearOfTheEvent, 3 - 1, 5); // Month is 0-indexed

    const isItApril5th = currentTime.getMonth() === 3 - 1 && currentTime.getDate() === 5;

    function countdown() {
        const now = new Date();

        if (now > eventDate) {
            eventDate = new Date(yearOfTheEvent + 1, 3 - 1, 5);
        } else if (now.getMonth() === 3 - 1 && now.getDate() === 5 && now.getFullYear() === eventDate.getFullYear() + 1) {
            eventDate = new Date(now.getFullYear(), 3 - 1, 5);
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

});

let date_1 = new Date('10/20/2023');
let date_2 = new Date();

const days = (date_1, date_2) => {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
};

document.getElementById("hrt").innerHTML = days(date_1, date_2) + " days until HRT";

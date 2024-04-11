document.addEventListener('DOMContentLoaded', function () {
    const birthdayTime = document.querySelector('#birthdayTime');
    const countdownContainer = document.querySelector('#countdown');
    const daysCountdown = document.querySelector('#days');
    const hoursCountdown = document.querySelector('#hours');
    const minutesCountdown = document.querySelector('#minutes');
    const secondsCountdown = document.querySelector('#seconds');
    const hrtContainer = document.querySelector('#hrt');
    const datingTimeContainer = document.querySelector('#datingTime');
    const gifImage = document.getElementById('img1');
    const clickSound = document.getElementById('clickSound');

    const currentTime = new Date();
    const yearOfTheEvent = currentTime.getFullYear();
    const eventDate = new Date(yearOfTheEvent, 3, 5); // April 5th in Bulgarian time
    const isItApril5th = currentTime.getMonth() === 3 && currentTime.getDate() === 5;

    // Date when HRT started
    const hrtStartDate = new Date('10/20/2023'); // Adjust this date accordingly
    // Date when you started dating your girlfriend
    const datingStartDate = new Date('02/13/2024'); // Date when you started dating your girlfriend

    let buttonClicked = false; // Variable to track button click
    let gifCount = 0; // Variable to track the number of displayed GIFs



    let currentTimestamp = luxon.DateTime.local().setZone("Europe/Sofia").toMillis();

    function updateTime() {
        // Get the current time in Bulgaria
        const bulgariaTime = luxon.DateTime.now().setZone("Europe/Sofia");
    
        // Format the time in AM/PM format
        const formattedTime = bulgariaTime.toLocaleString({
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    
        // Get the existing time element or create a new one if it doesn't exist
        let timeElement = document.getElementById('formattedTime');
        if (!timeElement) {
            timeElement = document.createElement('div');
            timeElement.id = 'formattedTime';
            timeElement.style.marginTop = '20px'; // Add spacing below h1
            timeElement.style.fontSize = '54px'; // Set the font size
            // Get the header element
            const header = document.querySelector('header');
            // Insert the formatted time element after the h1 within the header
            header.insertBefore(timeElement, header.children[1]); // Insert after the h1
        }
    
        // Set the text content of the time element to the formatted time
        timeElement.textContent = `${formattedTime}`;
    
        // Schedule the next update
        scheduleNextUpdate();
    }
    
    function scheduleNextUpdate() {
        const newTimestamp = luxon.DateTime.local().setZone("Europe/Sofia").toMillis();
        const timeDifference = newTimestamp - currentTimestamp;
        currentTimestamp = newTimestamp;
        setTimeout(updateTime, timeDifference);
    }
    
    // Call updateTime initially to set the time
    updateTime();
    
    
    function countdown() {
        const now = new Date();
    
        if (now > eventDate) {
            eventDate.setFullYear(yearOfTheEvent + 1);
        } else if (now.getFullYear() === eventDate.getFullYear() + 1) {
            eventDate.setFullYear(now.getFullYear());
        }
    
        const remainingTime = eventDate - now;
    
        let seconds = Math.floor(remainingTime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
    
        hours %= 24;
        minutes %= 60;
        seconds %= 60;
    
        if (isItApril5th) {
            // Display birthday message
            birthdayTime.textContent = 'Happy birthday, Hana!';
    
            // Hide countdown container
            countdownContainer.style.display = "none";
            // Show birthdayTime container
            birthdayTime.style.display = "block";
        } else {
            // Update countdown display
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
        let monthsOnHRT = Math.floor(daysOnHRT / 30); // Assuming each month has 30 days
        const remainingDays = daysOnHRT % 30;

        // If more than 30 days, display in months and days
        if (monthsOnHRT > 0) {
            hrtContainer.textContent = `On HRT for ${monthsOnHRT} month${monthsOnHRT === 1 ? '' : 's'}, ${remainingDays} day${remainingDays === 1 ? '' : 's'}`;
        } else {
            hrtContainer.textContent = `On HRT for ${daysOnHRT} day${daysOnHRT === 1 ? '' : 's'}`;
        }
    }

    calculateDaysOnHRT();

    // Calculate days dating
    function calculateDaysDating() {
        const daysDating = Math.floor((currentTime - datingStartDate) / (1000 * 60 * 60 * 24));
        datingTimeContainer.textContent = `Days since I'm in a ship with a cutie: ${daysDating}`;
    }

    calculateDaysDating();

    // Function to create additional GIF containers
    function createGifContainers() {
        // Check if the maximum number of GIFs has been reached
        if (gifCount < 5) {
            // Create left and right gif containers
            const leftGifContainer = document.createElement('div');
            const rightGifContainer = document.createElement('div');

            leftGifContainer.classList.add('gif-container', 'left');
            rightGifContainer.classList.add('gif-container', 'right');

            document.body.appendChild(leftGifContainer);
            document.body.appendChild(rightGifContainer);

            // Set a timeout to wait for the sound to finish
            setTimeout(() => {
                // Get a random index to select a random GIF
                const randomIndex = Math.floor(Math.random() * gifs.length);

                // Display additional GIFs on the left with a delay
                displayGifsWithDelay(leftGifContainer, gifs, randomIndex, 0);

                // Display additional GIFs on the right with a delay
                displayGifsWithDelay(rightGifContainer, gifs, randomIndex, 0);

                // Set a timeout to apply fade-out effect and then remove the additional GIF containers
                setTimeout(() => {
                    leftGifContainer.classList.add('fadeOut');
                    rightGifContainer.classList.add('fadeOut');
                    // Remove the additional GIF containers after the fade-out animation completes (1 second delay)
                    setTimeout(() => {
                        document.body.removeChild(leftGifContainer);
                        document.body.removeChild(rightGifContainer);
                        buttonClicked = false; // Reset the buttonClicked flag
                        gifCount++; // Increment the gifCount
                    }, 1000);
                }, 10000); // 10000 milliseconds (10 seconds) timeout
            }, clickSound.duration * 1000); // Wait for the duration of the sound
        }
    }

    // Display up to 5 GIFs with a delay
    // Function to display GIFs with a delay and sliding effect
function displayGifsWithDelay(gifContainer, gifs, index, count) {
    if (index < gifs.length && count < 5) {
        // Create an additional gif element
        const additionalGif = document.createElement('img');
        additionalGif.src = gifs[index];
        additionalGif.classList.add('additional-gif');

        // Append the additional gif element to the gif container
        gifContainer.appendChild(additionalGif);

        // Increment the count
        count++;

        // Display the next GIF after a delay (adjust the delay as needed)
        setTimeout(() => {
            displayGifsWithDelay(gifContainer, gifs, index + 1, count);
        }, 500); // 500 milliseconds (0.5 second) delay
    }
}
let lastClickTime = 0; // Variable to store the timestamp of the last click
const clickCooldown = 1000; // Cooldown period in milliseconds


gifImage.addEventListener('click', function () {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < clickCooldown) {
        // If clicked within the cooldown period, initiate the GIF creation
        if (!buttonClicked) { // Check if the button has not been clicked
            buttonClicked = true; // Set the buttonClicked flag
            // Play the sound
            clickSound.currentTime = 0; // Reset the sound to the beginning
            clickSound.play();
            createGifContainers();
        }
    }
    lastClickTime = currentTime; // Update the last click time
});



   // Make the honk spammable
gifImage.addEventListener('mousedown', function () {
    clickSound.currentTime = 0; // Reset the sound to the beginning
    clickSound.play();
});

    // Function to toggle display format between months + days and days only
    function toggleDisplayFormat(container, startDate) {
        const currentTime = new Date();
        const timeDiff = currentTime - startDate;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        container.textContent = `On ${container.id === 'hrt' ? 'HRT' : 'anti-androgen'} for ${days} day${days === 1 ? '' : 's'}`;
    }

    // Add click event listener to toggle display format for time on HRT
    hrtContainer.addEventListener('click', function () {
        toggleDisplayFormat(hrtContainer, hrtStartDate);
    });

    // Add click event listener to toggle display format for days on HRT
    daysCountdown.addEventListener('click', function () {
        if (hrtContainer.textContent.includes('month')) {
            toggleDisplayFormat(hrtContainer, hrtStartDate);
        } else {
            calculateDaysOnHRT();
        }
    });

});
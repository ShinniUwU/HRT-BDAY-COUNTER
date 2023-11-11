document.addEventListener('DOMContentLoaded', function () {
    const birthdayTime = document.querySelector('#birthdayTime');
    const countdownContainer = document.querySelector('#countdown');
    const daysCountdown = document.querySelector('#days');
    const hoursCountdown = document.querySelector('#hours');
    const minutesCountdown = document.querySelector('#minutes');
    const secondsCountdown = document.querySelector('#seconds');
    const hrtContainer = document.querySelector('#hrt');
    const switchedTimeContainer = document.querySelector('#switchedTime');

    let buttonClicked = false; // Variable to track button click

    const currentTime = new Date();
    let yearOfTheEvent = currentTime.getFullYear();
    let eventDate = new Date(yearOfTheEvent, 03, 05); // April 5th in Bulgarian time
    const isItApril5th = currentTime.getMonth() === 03 && currentTime.getDate() === 05;

    // Date when HRT started
    let hrtStartDate = new Date('10/20/2023'); // Adjust this date accordingly

    // Date when switched from finasteride to bicalutamide
    let switchedDate = new Date('10/31/2023'); // Adjust this date accordingly

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
            console.log('Happy birthday, Hana!');

            countdownContainer.style.display = "none";
            birthdayTime.style.display = "block";
        } else {
            daysCountdown.textContent = days;
            hoursCountdown.textContent = hours;
            minutesCountdown.textContent = minutes;
            secondsCountdown.textContent = seconds;

            // Additional countdown for the time since switched
            const switchedTime = Math.floor((currentTime - switchedDate) / (1000 * 60 * 60 * 24));
            const switchedTimeText = `Time on anti-androgen: ${switchedTime} day${switchedTime === 1 ? '' : 's'}`;
            switchedTimeContainer.textContent = switchedTimeText;

            // Add the information icon next to the "Time until switch" text
            const infoIcon = document.createElement('i');
            infoIcon.classList.add('fas', 'fa-info-circle');
            infoIcon.style.marginLeft = '5px'; // Adjust the margin as needed
            switchedTimeContainer.appendChild(infoIcon);

            // Make the information icon clickable
            infoIcon.addEventListener('click', function () {
                const chatBox = document.getElementById('chatBox');
                const chatContent = document.getElementById('chatContent');

                chatContent.innerHTML = `Time since I switched from finasteride to bicalutamide (anti-androgens): ${switchedTime} days`;

                chatBox.style.display = 'block';

                const closeChatButton = document.getElementById('closeChat');
                closeChatButton.addEventListener('click', function () {
                    chatBox.style.display = 'none';
                });
            });

            setTimeout(countdown, 1000);
        }
    }

    countdown();

    // Calculate days on HRT
    function calculateDaysOnHRT() {
        const daysOnHRT = Math.floor((currentTime - hrtStartDate) / (1000 * 60 * 60 * 24));
        hrtContainer.textContent = `On HRT for ${daysOnHRT} day${daysOnHRT === 1 ? '' : 's (no anti-androgen)'}`;
    }

    calculateDaysOnHRT();

     // Get the img element
     const gifImage = document.getElementById('img1');

     // Get the audio element
     const clickSound = document.getElementById('clickSound');
 
     // Function to create additional GIF containers
     function createGifContainers() {
         // Get the container for additional GIFs on the left
         const leftGifContainer = document.createElement('div');
         leftGifContainer.classList.add('gif-container', 'left');
 
         // Get the container for additional GIFs on the right
         const rightGifContainer = document.createElement('div');
         rightGifContainer.classList.add('gif-container', 'right');
 
         // Append the containers to the document body
         document.body.appendChild(leftGifContainer);
         document.body.appendChild(rightGifContainer);
 
         // Function to display up to 5 GIFs with a delay
         function displayGifsWithDelay(gifContainer, gifs, index, count) {
             if (index < gifs.length && count < 5) {
                 // Create a new img element for the current GIF
                 const newGif = document.createElement('img');
                 newGif.src = gifs[index];
                 newGif.classList.add('additional-gif');
 
                 // Append the img element to the container
                 gifContainer.appendChild(newGif);
 
                 // Increment the count
                 count++;
 
                 // Display the next GIF after a delay (adjust the delay as needed)
                 setTimeout(() => {
                     displayGifsWithDelay(gifContainer, gifs, index + 1, count);
                 }, 1000); // 1000 milliseconds (1 second) delay
             }
         }
 
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
             }, 1000);
         }, 10000); // 10000 milliseconds (10 seconds) timeout
     }
 
     // Add a click event listener to the img element
     gifImage.addEventListener('click', function () {
         // Play the sound
         clickSound.play();
         createGifContainers();
     });
});


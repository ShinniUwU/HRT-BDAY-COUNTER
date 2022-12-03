document.addEventListener('DOMContentLoaded', function() {

    const birthdayTime = document.querySelector('#birthdayTime')
    const countdownContainer = document.querySelector('#countdown')
    const daysCountdown = document.querySelector('#days')
    const hoursCountdown = document.querySelector('#hours')
    const minutesCountdown = document.querySelector('#minutes')
    const secondsCountdown = document.querySelector('#seconds')
  
    const currentTime = new Date()
    let yearOfTheEvent = currentTime.getFullYear()
    let eventDate = new Date( yearOfTheEvent, 03, 06 )
    const isItApril5th = currentTime.getMonth() === 03 && currentTime.getDate() === 06
  
    function countdown() {
      const now = new Date()
      
      if (now > eventDate) {
        eventDate = new Date( yearOfTheEvent + 1, 03, 06 )
      } else if ( now.getFullYear() === eventDate.getFullYear() + 1 ) {
        eventDate = new Date( now.getFullYear(), 03, 06 )
      }
      
      const currentTime = now.getTime()
      const eventTime = eventDate.getTime()
      const remainingTime = eventTime - currentTime
  
      let seconds = Math.floor( remainingTime / 1000 )
      let minutes = Math.floor( seconds / 60 )
      let hours =  Math.floor( minutes / 60 )
      let days = Math.floor( hours / 24 )
  
      hours %= 24
      minutes %= 60
      seconds %= 60
  
      if ( isItApril5th ) {
        console.log('Happy birthday, Shinni!')
  
        countdownContainer.style.display = "none"
        birthdayTime.style.display = "block"
  
      } else {
  
        daysCountdown.textContent = days
        hoursCountdown.textContent = hours
        minutesCountdown.textContent = minutes
        secondsCountdown.textContent = seconds
  
        setTimeout(countdown, 1000)
  
      } // end of if ( isItApril5th )
  
    } // end of countdown
    countdown()
  
  }) // end of DOMContentLoaded
  
  let date_1 = new Date('4/5/2023');
  let date_2 = new Date();
  
  const days = (date_1, date_2) =>{
      let difference = date_1.getTime() - date_2.getTime();
      let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
      return TotalDays;
  }
  document.getElementById("hrt").innerHTML = days(date_1, date_2) + " days unitil hrt";
 
  let daysHRT = days(date_1, date_2)
  if (daysHRT > 0)
{
    document.getElementById("hrt").innerHTML = daysHRT + " days till hrt";
} else if (daysHRT <= 0 && daysHRT > -30)    {
    document.getElementById("hrt").innerHTML = Math.abs(daysHRT) + " days passed since hrt";
    document.getElementById("img1").src="https://media.tenor.com/jY84qSwONRwAAAAM/anime-happy.gif";
} else {
    document.getElementById("hrt").innerHTML = (Math.abs(daysHRT) / 30).toFixed(0) + " months passed since hrt";
    document.getElementById("img1").src="https://media.tenor.com/jY84qSwONRwAAAAM/anime-happy.gif";
}



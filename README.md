# Hana's Personal Tracker

Welcome to Hana's Personal Tracker! This React-based web application provides a fun and interactive way to keep track of important dates, milestones, and events in Hana's life.

## Features

### Bulgaria Time Display
- Shows the current time and date in Bulgaria.

### Birthday Countdown
- Displays a countdown to Hana's next birthday, showing days, hours, minutes, and seconds.

### HRT Progress Tracker
- Tracks and displays the duration Hana has been on Hormone Replacement Therapy (HRT).

### Dating Anniversary Tracker
- Keeps track of the number of days since Hana started dating.

### Interactive GIF Display
- Features a clickable GIF that changes on each click.
- After 5 clicks, it briefly displays a grid of all available GIFs.

### Sound Effect
- Plays a "honk" sound when the GIF is clicked.

## Technologies Used

- React
- Next.js
- TypeScript
- Luxon (for date and time manipulation)
- Framer Motion (for animations)
- Tailwind CSS (for styling)

## How It Works

1. The app initializes with the current time and calculates various durations.
2. It updates the countdown, HRT progress, and dating anniversary information every second.
3. The GIF display allows for user interaction, changing the displayed GIF on each click.
4. After 5 clicks, it shows a brief animation displaying all available GIFs.

## Setup and Running

1. Clone the repository
2. Install dependencies: `yarn install`
3. Run the development server: `yarn run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

You can easily customize this tracker by modifying the following in the `BirthdayCountdown` component:

- `eventDate`: Set your birthday
- `hrtStartDate`: Set the date you started HRT
- `datingStartDate`: Set the date you started dating
- `presetGifs`: Add or modify the list of GIFs

## Contributing

Feel free to fork this project and make your own versions or improvements. Pull requests are welcome!

## License

This project is open source and available under the [MIT License](LICENSE).
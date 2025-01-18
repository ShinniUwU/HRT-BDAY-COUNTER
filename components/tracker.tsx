/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
'use client';

import { useEffect, useState, useRef } from 'react';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import styles from '../styles/BirthdayCountdown.module.css';

const BirthdayCountdown = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hrtInfo, setHrtInfo] = useState('');
  const [datingInfo, setDatingInfo] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [gifCount, setGifCount] = useState(0);
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [bulgariaTime, setBulgariaTime] = useState('');
  const [bulgariaDate, setBulgariaDate] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [showAllGifs, setShowAllGifs] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  const eventDate = new Date(new Date().getFullYear(), 3, 5);
  const hrtStartDate = new Date('10/20/2023');
  const datingStartDate = new Date('09/01/2024');

  const presetGifs = [
    'https://media.giphy.com/avatars/40hara/Yoz2OSXiiBS9.gif',
    'https://media.tenor.com/aZbJeTIckT8AAAAC/catgirl-isekai-mao.gif',
    'https://media.tenor.com/e4z1BEWHiPMAAAAC/guh.gif',
    'https://media.tenor.com/z88st-CKXoUAAAAM/chika-yeah.gif',
    'https://media.tenor.com/myCsjxxbtXAAAAAM/anime-happy.gif',
    'https://media.tenor.com/g8rtlSwFcdEAAAAM/slow-loop-koharu-minagi.gif',
    'https://media.tenor.com/u6yoDKoczXEAAAAM/adachi-anime-happy.gif',
    'https://media.tenor.com/5AXa89n7PgwAAAAM/honoka-kousaka-arms-up.gif',
    'https://media1.giphy.com/media/qlbcqVraSMEak/giphy.gif?cid=6c09b952t1niwn0xih0djmu2fa6adyn0bzn1lybgz4e5lcpn&ep=v1_gifs_search&rid=giphy.gif&ct=g',
  ];

  // Ensure we have 9 gifs by duplicating the last one if necessary
  const fullPresetGifs = [
    ...presetGifs,
    presetGifs[presetGifs.length - 1],
  ].slice(0, 9);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to start
      audioRef.current.play();
    }
  };

  const handleGifClick = () => {
    playSound();
    setCurrentGifIndex((prevIndex) => (prevIndex + 1) % presetGifs.length);
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount === 5) {
        setShowAllGifs(true);
        setTimeout(() => {
          setShowAllGifs(false);

          return 0; // Reset click count
        }, 2000); // Increased duration to 2 seconds for better visibility on mobile

        return 0;
      }

      return newCount;
    });
  };

  useEffect(() => {
    // Set a random GIF index on component mount (page load)
    setCurrentGifIndex(Math.floor(Math.random() * presetGifs.length));

    const countdown = () => {
      const now = new Date();
      let targetDate = new Date(now.getFullYear(), 3, 5); // April 5th of current year

      if (now > targetDate) {
        targetDate.setFullYear(targetDate.getFullYear() + 1);
      }

      const remainingTime = targetDate.getTime() - now.getTime();

      setSeconds(Math.floor((remainingTime / 1000) % 60));
      setMinutes(Math.floor((remainingTime / 1000 / 60) % 60));
      setHours(Math.floor((remainingTime / 1000 / 60 / 60) % 24));
      setDays(Math.floor(remainingTime / 1000 / 60 / 60 / 24));
    };

    const calculateDaysOnHRT = () => {
      const currentTime = new Date();
      const daysOnHRT = Math.floor(
        (currentTime.getTime() - hrtStartDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );
      let monthsOnHRT = Math.floor(daysOnHRT / 30);
      const remainingDays = daysOnHRT % 30;

      if (monthsOnHRT > 0) {
        setHrtInfo(
          `On HRT for ${monthsOnHRT} month${monthsOnHRT === 1 ? '' : 's'}, ${remainingDays} day${remainingDays === 1 ? '' : 's'}`,
        );
      } else {
        setHrtInfo(`On HRT for ${daysOnHRT} day${daysOnHRT === 1 ? '' : 's'}`);
      }
    };

    const calculateDaysDating = () => {
      const currentTime = new Date();
      const daysDating = Math.floor(
        (currentTime.getTime() - datingStartDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      setDatingInfo(`Days since dating: ${daysDating}`);
    };

    const detectDevice = () => {
      const isPhoneDevice =
        window.innerWidth <= 768 && window.innerHeight <= 1024;

      setIsPhone(isPhoneDevice);
    };

    countdown();
    calculateDaysOnHRT();
    calculateDaysDating();
    detectDevice();

    const interval = setInterval(() => {
      const bulgariaTime = DateTime.now().setZone('Europe/Sofia');

      const formattedDate = bulgariaTime.toLocaleString({
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      setDate(formattedDate);
    }, 1000);

    const countdownInterval = setInterval(countdown, 1000);

    const updateBulgariaTime = () => {
      const bulgariaDateTime = DateTime.now().setZone('Europe/Sofia');

      setBulgariaTime(bulgariaDateTime.toFormat('h:mm a'));
      setBulgariaDate(bulgariaDateTime.toFormat('MMMM d, yyyy'));
    };

    updateBulgariaTime();
    const timeInterval = setInterval(updateBulgariaTime, 1000);

    window.addEventListener('resize', detectDevice);

    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
      clearInterval(timeInterval);
      window.removeEventListener('resize', detectDevice);
    };
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white min-h-screen flex flex-col justify-center items-center px-4 lg:px-8">
        <div className="relative isolate px-6 pt-14 lg:px-8 max-w-screen-md mx-auto w-full">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

          <div
            className={`${styles.container} bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-6`}
          >
            <h1
              className={`${styles.title} text-3xl font-bold mb-6 text-pink-300`}
            >
              Hana's Trackers
            </h1>
            <div
              className={`${styles.bulgariaTime} bg-pink-500/20 rounded-lg p-4 mb-6`}
            >
              <p className="text-2xl font-bold text-pink-200">Bulgaria Time</p>
              <p className="text-3xl font-semibold">{bulgariaTime}</p>
              <p className="text-lg text-pink-200">{bulgariaDate}</p>
            </div>
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-center text-pink-200">
              Countdown to Hana's Birthday
            </h2>
            {isPhone ? (
              <div
                className={`${styles.countdown} flex flex-col space-y-2 sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-4`}
              >
                {[
                  { value: days, label: 'Days' },
                  { value: hours, label: 'Hours' },
                  { value: minutes, label: 'Minutes' },
                  { value: seconds, label: 'Seconds' },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className={`${styles.countdownItem} bg-pink-500/20 rounded-lg p-1 sm:p-2 md:p-4`}
                  >
                    <span
                      className={`${styles.countdownValue} text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold`}
                    >
                      {value}
                    </span>
                    <span
                      className={`${styles.countdownLabel} text-[10px] sm:text-xs md:text-sm uppercase text-pink-200`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`${styles.countdown} grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6`}
              >
                {[
                  { value: days, label: 'Days' },

                  { value: hours, label: 'Hours' },

                  { value: minutes, label: 'Minutes' },

                  { value: seconds, label: 'Seconds' },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className={`${styles.countdownItem} bg-pink-500/20 rounded-lg p-1 sm:p-2 md:p-4`}
                  >
                    <span
                      className={`${styles.countdownValue} text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold`}
                    >
                      {value}
                    </span>
                    <span
                      className={`${styles.countdownLabel} text-[10px] sm:text-xs md:text-sm uppercase text-pink-200`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div
              className={`${styles.infoSection} grid grid-cols-1 md:grid-cols-2 gap-6 mb-8`}
            >
              <div
                className={`${styles.infoItem} bg-purple-500/20 rounded-lg p-4`}
              >
                <p className="text-xl font-bold text-purple-200">
                  HRT Progress
                </p>
                <p className="text-2xl font-semibold">{hrtInfo}</p>
              </div>
              <div
                className={`${styles.infoItem} bg-indigo-500/20 rounded-lg p-4`}
              >
                <p className="text-xl font-bold text-indigo-200">
                  Dating Progress
                </p>
                <p className="text-2xl font-semibold">{datingInfo}</p>
              </div>
            </div>
            <div className="mt-8 sm:mt-12">
              <div
                className={`${styles.gifContainer} rounded-xl overflow-hidden shadow-lg cursor-pointer w-[200px] h-[200px] mx-auto`}
                onClick={handleGifClick}
              >
                <Image
                  alt=""
                  className="w-full h-full object-cover"
                  height={200}
                  src={presetGifs[currentGifIndex]}
                  width={200}
                />
              </div>
            </div>
            <AnimatePresence>
              {showAllGifs && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-3 gap-2 p-4 rounded-lg bg-gradient-to-br from-purple-900 to-indigo-900 shadow-2xl max-w-xs w-full">
                    {fullPresetGifs.map((gif, index) => (
                      <motion.div
                        key={`${gif}-${index}`}
                        animate={{ scale: 1 }}
                        className="w-full h-24 rounded-md overflow-hidden"
                        initial={{ scale: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Image
                          alt=""
                          className="w-full h-full object-cover"
                          height={96}
                          src={gif}
                          width={96}
                          onError={() => {
                            console.error(`Error loading image: ${gif}`);
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <audio ref={audioRef} src="./honk.mp3" />
      </div>
    </>
  );
};

export default BirthdayCountdown;

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const localStorageKey = 'videoplayer-current-time';
const onTimeUpdate = function (data) {
    localStorage.setItem(localStorageKey, data.seconds);
    console.log('Current time saved to localStorage:', data.seconds);
};
player.on('timeupdate', throttle(onTimeUpdate, 1000));
player
    .setCurrentTime(JSON.parse(localStorage.getItem(localStorageKey)) || 0)
    .then(function (seconds) {
        console.log('Video resumed from saved time:', seconds);
    })
    .catch(function (error) {
        console.error('Error setting current time:', error);
    });

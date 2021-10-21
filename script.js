// ***** Video controllers ***** //

// Button
const play_pause_button = document.querySelector('button#play_pause')

// Icon
const play_pause_icon = document.querySelector('button#play_pause span')
const play = 'play_arrow'
const pause = 'pause'
const replay = 'replay'

//// Filling the play/pause button with icon when the page load ////
function fillingTheButton() {
  play_pause_icon.innerText = play
}

fillingTheButton()

//// Playing/Pause functions for video /////
const video = document.getElementById('my_video')

const play_video = () => video.play()
const pause_video = () => video.pause()

// ProgressBar
let progress_bar = document.querySelector('.progress-bar')

// Video time
let screen_current_time = document.querySelector('.current-time')
let screen_left_time = document.querySelector('.time-left')

//// Changing the icon of play/pause button and playing/pause the video on click ////
function change_icon() {
  if (play_pause_icon.textContent === play) {
    play_pause_icon.innerText = pause
    play_video()
  } else if (play_pause_icon.textContent === replay) {
    play_pause_icon.innerText = pause
    play_video()
  } else {
    play_pause_icon.innerText = play
    pause_video()
  }

  ///// Verifying if the video is ended and if true we change the icon to replay and we can start video again because the else if above help us to do this. /////
  let is_ended = setInterval(() => {
    if (video.ended) {
      play_pause_icon.innerText = replay
      clearInterval(is_ended)
    }
  }, 500)

  // Calculating the time percentual of video and attribute the result to width of progress bar
  let progress = setInterval(() => {
    if (!video.ended) {
      progress_bar.style.width = `${(
        (parseFloat(video.currentTime) / parseFloat(video.duration)) *
        100
      ).toFixed(2)}%`

      screen_current_time.innerText = `${(parseInt(video.currentTime) / 100)
        .toFixed(2)
        .replace('.', ':')}`

      screen_left_time.innerText = `${(
        parseInt(video.duration - video.currentTime) / 100
      )
        .toFixed(2)
        .replace('.', ':')}`
    } else {
      clearInterval(progress)
    }
  }, 1)
}

play_pause_button.addEventListener('click', change_icon)

///// Advance video /////
const advance = document.querySelector('button#advance_button')
const advance_video = () => (video.currentTime += 15)

advance.addEventListener('click', advance_video)

///// Retroceed video /////
const retroceed_button = document.querySelector('button#retroceed_button')
const retroceed_video = () => (video.currentTime -= 15)

retroceed_button.addEventListener('click', retroceed_video)

///// Control of audio /////
const potenciometer = document.querySelector('input#range'),
  volume_level = document.querySelector('span.volume_level')

const volume = () => {
  video.volume = potenciometer.value
  volume_level.innerText = ` ${parseInt(100 * potenciometer.value)}%`
}

potenciometer.addEventListener('input', volume)

///// FullScreen Mode /////
const fullscreen_button = document.querySelector('button#fullscreen_button')
const fullScreen = () => video.requestFullscreen()

fullscreen_button.addEventListener('click', fullScreen)

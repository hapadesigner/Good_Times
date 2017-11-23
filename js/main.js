// grab our header and desktop header
// insert contents of our header into the desktop-header

const header = document.querySelector('.header')
const desktopHeader = document.querySelector('.header-desktop')
desktopHeader.innerHTML = header.innerHTML

// 1. when .header enters the viewport, hide the desktop header (removing visible class)
// 2. when the header leaves, so desktop header (by adding visible class)
// code from inview.js
inView('.header')
  .on('enter', el => desktopHeader.classList.remove('visible'))
  .on('exit', el => desktopHeader.classList.add('visible'))

// enable tilt.js library on all our images
VanillaTilt.init(document.querySelectorAll('.image'), {
  max: 25,
  speed: 400
})

// grab all images we want to fade in
// add visible class to toggle visible class when images are in viewport
inView('.fade')
	.on('enter', img => img.classList.add('visible'))
	.on('exit', img => img.classList.remove('visible'))


// when register button is clicked
// run a function
// grab .front element
// add class of .slide-up

const registerButton = document.querySelector('.register-button')
registerButton.addEventListener('click', even => {
  event.preventDefault()
  const frontEl = document.querySelector('.front')
  frontEl.classList.add('slide-up')
})

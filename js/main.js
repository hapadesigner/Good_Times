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






// Create a Stripe client
const stripe = Stripe('pk_test_cucWEL0zZ0Ttl8sDgYcAdeD6');

// Create an instance of Elements
const elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
const style = {
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element
const card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission
const form = document.getElementById('payment-form');
// Inform the user if there was an error
const errorElement = document.getElementById('card-errors');


form.addEventListener('submit', function(event) {
  event.preventDefault();
  // lock form when it is submitting
  form.classList.add('processing')

  stripe.createToken(card).then(function(result) {


    if (result.error) {
      // unlock form again if there is an error
      form.classList.remove('processing')

      // set error text to error message
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server
      stripeTokenHandler(result.token);
    }
  });
});



function stripeTokenHandler(token) {
  // here we handle and make the actual payment
  // steps to make the payment

  // 1. create variable for token name and token email
  const stripe_token = token.id
  // grab element by its id and take its value
  const name = document.querySelector('#name').value
  const email = document.querySelector('#email').value


  // 2. grab our form action url from the form
  const url = form.getAttribute('action')

  // 3, send the data to the url using fetch
  // from fetch post on github

  fetch(url, {
  // we tell fetch to post it to our url rather then 'GET'
  method: 'POST',
   // tell fetch we are sending json data
  headers: {
    'Content-Type': 'application/json'
  },
  // 4. ensure the data is ready/secure to be sent over
  // send json data across
  // stringify turns it into strings so that it is safe to send across the web
  body: JSON.stringify ({
    // what info the backend expects to receive
    order: {
      // same as stripe_token: stipe_
      stripe_token,
      //same as name: name
      name,
      email
    }
  })
})
 // with fetch we get back a response that we turn into json
 .then(response => response.json())
  // then we get it back as data (rather than json, only used json to make it safe to send across web)
  // no we can do things with the data
 .then(data => {
// check that we have actually gotten an order back and do something with it if we have an order
    if(data.order) {
      const order = data.order
    	// tell user their payment was successful
    	// 1. grab form and run a query selector
    	// 2. change the text
    	form.querySelector('.form-title').textContent = 'Payment Successful!'
    	form.querySelector('.form-fields').textContent = `
 			Thank you ${order.name}, your payment was successful and we have sent an email receipt to ${order.email}`

    	// remove processing class again
    	form.classList.remove('processing')
    }
  })
  // if there are any errors we can do something as well
  .catch(error => {
    errorElement.textContent = `There was an error with payment. please try again or contact us at help@goodtimes.es`
    // remove processing class if there is an error
    form.classList.remove('processing')
  })
}




// grab all the anchor tags on the page
const anchors = document.querySelectorAll('a')
// loop over them
anchors.forEach(anchor => {
  // listen for clicks on each one
  anchor.addEventListener('click', event => {
    // grab the href attribute
    const href = anchor.getAttribute('href')
    // if the href starts with a #
    if (href.charAt(0) === '#') {
      // stop the default action
      event.preventDefault()
      // find the element the href points to and scroll it into view
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      })
    }
  })
})

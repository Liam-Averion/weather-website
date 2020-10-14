console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // Stop refreshing the browser when button is clicked.
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    const location = search.value
    console.log(location)
    const url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageTwo.textContent = data.forecast
                messageOne.textContent = data.location
            }
        })
    })
})
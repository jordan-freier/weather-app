console.log('Client side javascript file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const thisPlace = document.querySelector('input')
const messageOne = document.querySelector('#cringle')
const messageTwo = document.querySelector("#sprungus")

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = thisPlace.value
    messageOne.textContent = 'Crangus'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            console.log(data.error)

        }
        else {
            messageOne.textContent = data.location
            console.log(data.location)
            messageTwo.textContent = data.forecast
            console.log(data.forecast)
            }
        })
    })
})
console.log('Client side javascript file is loaded!')



var formSelector=document.querySelector("form")
var formInput=document.querySelector("input")
var message1=document.querySelector("#message1")
var message2=document.querySelector("#message2")



formSelector.addEventListener("submit",(event)=>{
   
    event.preventDefault()
    message1.textContent="loading...."
    message2.textContent=""
    var input=formInput.value
    fetch("http://localhost:3000/weather?address="+encodeURIComponent(input)).then((response) => {
    return response.json().then((data) => {
        if (data.error) {
           
            formInput.value=""
            message1.textContent=data.error
        } else {
           
            formInput.value=""
            message1.textContent=data.location
            message2.textContent=data.forecast
        }
    })
})
})
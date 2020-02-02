console.log('Client side javascript file is loaded!')

$(document).ready(function(){

var formSelector=document.querySelector("form")
var formInput=document.querySelector("input")
var message1=document.querySelector("#message1")
var message2=document.querySelector("#message2")


//ΑΝΑΖΗΤΗΣΗ ΤΩΝ ΠΕΡΙΟΧΩΝ-VANILLA JS
formSelector.addEventListener("submit",(event)=>{
    $('li').remove()
    event.preventDefault()
    message1.textContent="loading...."
    message2.textContent=""
    var input=formInput.value
    fetch("/geolocation?address="+encodeURIComponent(input)).then((response) => {
        
    return response.json().then((data) => {
        if (data.error) {
           
            formInput.value=""
            message1.textContent=data.error
        } else {
            data.forEach(function(place){
                var newplace=$("<li class=task>"+place.place_name_el+"</li>")
                newplace.data(place.center)
                
                $("ul").append(newplace)
                formInput.value=""
                message1.textContent=""
                })
        }
    })
})
})

//ΑΝΑΖΗΤΗΣΗ FORECAST-JQUERY
$("ul").on("click", "li", function(){
    
    fetch("/forecast?longtitude="+$(this).data()[0]+"&latitude="+$(this).data()[1]).then((response) => {
        
        return response.json().then((data) => {
            if (data.error) {
               
                
                message1.textContent=data.error
            } else {
                $('li').remove()
                
                message2.textContent=data.forecast
            }
        })
    })
    
})


})

/*fetch("/weather?address="+encodeURIComponent(input)).then((response) => {
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
})*/
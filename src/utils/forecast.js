const request = require('request')

var forecast=(latitude, longtitude, callback)=>{
    var url1="https://api.darksky.net/forecast/3a2befefe2a309b803a8bd1ed9642031/"+encodeURIComponent(latitude)+","+
    encodeURIComponent(longtitude)
    
     request({url:url1, json:true}, (error, response)=>{
          console.log(response.headers) 
        if (error){
             callback(error, undefined)
         }else if (response.body.error){
           // callback(undefined, response.body.error)
         }else{
            callback(undefined, response.body.daily.data[0].summary)
     }
     })

}

module.exports = forecast
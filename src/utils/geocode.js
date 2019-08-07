const request = require('request')

const geocode=(adress,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(adress)+".json?access_token=pk.eyJ1IjoiZGltdG9iIiwiYSI6ImNqeXFkejJxeDAxY3AzYm53c2V4MjZ1NWEifQ.YgbzAv0cek4WimTGUjhf4w&language=el&limit=2"
    request({url:url, json:true}, (error, response)=>{
        
       
        if (error){
            callback(error, undefined)
        }else if (response.body.message||response.body.features.length===0){
        
            
           callback("something went wrong",undefined)
        }else{
            callback(undefined, {longtitude:response.body.features[0].center[0],
                                latitude:response.body.features[0].center[1],
                                 location:response.body.features[0].place_name}) //στην απαντηση αντικειμενο με 
            //μηκος - πλατοσ και τοποθεσια
        }
     })
}

module.exports = geocode
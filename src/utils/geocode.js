const request = require('postman-request')

const geocode = (address ,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e0658fdcbe15227258ccbd41df821eb7&query='+ address

    request({ url },(error,{body})=>{
        if(error){
            callback('The connection could not be established',undefined)
        } else if(body.error){
            callback('The given coordinates are not correct',undefined)
        }else{
            const data= JSON.parse(body)
            const location = data.location
            callback(undefined,location)
        }
    })

}

module.exports = geocode
const express = require('express')
const isTimestamp = require( 'validate.io-timestamp' )
const app = express()


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/*', function (req, res) {
  const params = req.params[0]
  const d = new Date(params)
  
  if (!isNaN(params) && isTimestamp(parseInt(params))){
     // Is Unix timestamp
     res.send( dateArray( timestampToDate(parseInt(params)) , parseInt(params) ) )
  } else {
     if ( Object.prototype.toString.call(d) === "[object Date]" ) {
       if ( !isNaN( d.getTime() ) ) {
         // is a date
         res.send( dateArray( params, timeToTimestamp(params) ) )
       } else {
         // not a date
         res.send( dateArray( null , null ) )
       }
     }
  }
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
})


/**
 * Functions
 */
const timeToTimestamp = (date) => new Date(date).getTime() / 1000

const timestampToDate = (timestamp) => {
  var objDate = new Date( timestamp * 1000 )
  return objDate.toLocaleString("en-us", { month: "long" }) + ' ' + objDate.getDay() + ', ' + objDate.getFullYear()
}
  
const dateArray = (date, timestamp) => ({ unix: timestamp, natural: date })

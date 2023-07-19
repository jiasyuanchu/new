const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const gpxParse = require("gpx-parse")

const app = express()
const PORT = 3000

// app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// app.set('view engine', 'hbs')
// app.use(express.urlencoded({ extended: true }))
// app.use(methodOverride('_method'))
// app.get('/', (req, res) => {
//   res.send('hello world')
// })

//操作fast-xml-parser
const fs = require('fs');
const { XMLParser } = require("fast-xml-parser");

const gpxData = fs.readFileSync('./path/2023_07_15.gpx', 'utf8');
const options = {
  attributeNamePrefix: '',
  ignoreAttributes: false,
  parseAttributeValue: true
};

const parser = new XMLParser(options);
const jsonObj = parser.parse(gpxData);
const waypoints = jsonObj.gpx.trk.trkseg.trkpt;

const parsedData = waypoints.map(waypoint => {
  return {
    latitude: waypoint.lat,
    longitude: waypoint.lon,
    elevation: waypoint.ele,
    time: waypoint.time
  }
})
console.log(parsedData) //印出json格式的回傳資料

//將回傳資料轉為前端指定的array格式
const waypointsArray = []

for (const waypoint of parsedData) {
  const waypointArray = [
    waypoint.latitude,
    waypoint.longitude,
    waypoint.elevation,
    waypoint.time
  ];

  waypointsArray.push(waypointArray)
}
console.log(waypointsArray)//此為前端希望的回傳格式


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
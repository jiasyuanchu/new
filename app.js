const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const gpxParse = require("gpx-parse")

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.get('/', (req, res) => {
  res.send('hello world')
})

//操作gpx-parse
let parsedData; // 儲存解析後的資料

gpxParse.parseGpxFromFile('./path/2023_07_15.gpx', function (error, data) {
  if (error) {
    console.error(error);
    return;
  }
  const waypoints = data.tracks[0].segments[0];
  parsedData = waypoints.map(waypoint => {
    return {
      latitude: waypoint.lat,
      longitude: waypoint.lon,
      elevation: waypoint.ele,
      time: waypoint.time
    };
  });
  console.log(parsedData); // 確認資料正確解析
});

app.get('/coordinates', (req, res) => {
  res.json(parsedData); // 回傳解析後的資料給前端
});


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
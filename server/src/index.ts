import * as express from 'express'
const app = express()
app.use(express.static('../client/dist'))

app.get('/api', function (req, res) {
  res.send('Hello World!')
})

app.get('*', express.static(__dirname + '/../../client'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

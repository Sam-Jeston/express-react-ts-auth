import * as express from 'express'
import { runMigrations } from './utils/run_migrations'

export async function boot() {
  await runMigrations()
  const app = express()
  app.use(express.static('../client/dist'))

  app.get('/api', function (req, res) {
    res.send('Hello World!')
  })

  app.get('*', express.static(__dirname + '/../../client'))

  return app
}

boot().then((app) => {
  app.listen(3000, function () {
    console.log('Example app listening on port 60!')
  })
})

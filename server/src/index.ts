import * as express from 'express'
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
import { runMigrations } from './utils/run_migrations'
import { secrets } from './config/secrets'
import { User } from './db/interfaces'
import * as c from './controllers'
import * as m from './middleware'
import * as path from 'path'

export interface IRequest extends express.Request {
  user: User
}

export enum ApiPath {
  authenticationBasePath = '/api',
  login = '/pub/login',
  signup = '/pub/signup'
}

export async function boot() {
  await runMigrations()
  const app = express()

  app.use(helmet())
  app.use(bodyParser.json())
  app.use(cookieParser(secrets.cookie))

  // Authenticate against all /api namespaced routes
  app.use(m.authenticateRequest)

  // A permission middleware can sit perfectly here, explicitly comparing req.path
  // against ApiPath Enum vals

  // Routes
  app.get(ApiPath.authenticationBasePath, (req, res) => res.send('Hello World!'))
  app.post(ApiPath.login, c.login)
  app.post(ApiPath.signup, c.signup)

  // Static Serving
  const publicRoot = path.join(__dirname, '..', '..', 'client')
  const publicPath = path.join(__dirname, '..', '..', 'client', 'dist')
  app.use('/dist', express.static(publicPath))
  app.get('/favicon.ico', (req, res) => res.sendFile(path.join(publicRoot, 'favicon.ico')))
  // The problem with this strategy is that it fails to send 404s for files that don't exist
  app.get('*', (req, res) => res.sendFile(path.join(publicRoot, 'index.html')))

  // Error Handler
  app.use(m.errorHandler)

  return app
}

boot().then((app) => {
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })
})

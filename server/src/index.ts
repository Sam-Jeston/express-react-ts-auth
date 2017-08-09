import * as express from 'express'
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
import { runMigrations } from './utils/run_migrations'
import { secrets } from './config/secrets'
import { getUserByEmail, getUserById } from './db/users'
import { validatePassword, createUser } from './services/users'
import { User } from './db/interfaces'
import * as path from 'path'

interface IRequest extends express.Request {
  user: User
}

export async function boot() {
  await runMigrations()
  const app = express()

  app.use(bodyParser.json())
  app.use(cookieParser(secrets.cookie))

  // Authenticate against all /api namespaced routes
  app.use(async function (req: IRequest, res, next) {
    try {
      const path = req.path
      if (path.substring(0, 4) === '/api') {
        const targetCookie = req.signedCookies['userId']
        if (!targetCookie) return res.status(401).json({message: 'Authentication required'})
        const user = await getUserById(targetCookie)
        if (!user) return res.status(401).json({message: 'Authentication required'})
        req.user = user
        next()
      } else {
        next()
      }
    } catch (e) {
      console.error(e)
      return res.status(500).json({message: 'Internal Server Error'})
    }
  })

  app.get('/api', function (req, res) {
    res.send('Hello World!')
  })

  app.post('/pub/login', async function (req, res, next) {
    try {
      const email = req.body.email
      const password = req.body.password

      const user = await getUserByEmail(email)
      if (!user.email) return res.status(400).json({message: 'Invalid email or password'})

      const passwordIsValid = await validatePassword(password, user.password)
      if (passwordIsValid === false) return res.status(400).json({message: 'Invalid email or password'})

      res.cookie('userId', user.id, {signed: true})
      res.status(204).json()
    } catch (e) {
      console.error(e)
      next(e)
    }
  })

  app.post('/pub/signup', async function (req, res, next) {
    try {
      const email = req.body.email
      const password = req.body.password

      const user = await getUserByEmail(email)
      if (user.email) return res.status(400).json({message: 'Invalid email'})

      const newUser = await createUser(email, password)
      res.cookie('userId', newUser.id, {signed: true})
      res.status(201).json(newUser)
    } catch (e) {
      console.error(e)
      next(e)
    }
  })

  // Static Serving
  const publicRoot = path.join(__dirname, '..', '..', 'client')
  const publicPath = path.join(__dirname, '..', '..', 'client', 'dist')
  app.use('/dist', express.static(publicPath))
  app.get('/favicon.ico', (req, res) => res.sendFile(path.join(publicRoot, 'favicon.ico')))

  // The problem with this strategy is that it fails to send 404s for files
  app.get('*', (req, res) => res.sendFile(path.join(publicRoot, 'index.html')))

  // Error Handler
  app.use(function (err: Error, req: IRequest, res: any, next: Function) {
    const message = err.message
    return res.status(500).json({message})
  })

  return app
}

boot().then((app) => {
  app.listen(3000, function () {
    console.log('Example app listening on port 60!')
  })
})

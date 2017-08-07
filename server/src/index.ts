import * as express from 'express'
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
import { runMigrations } from './utils/run_migrations'
import { secrets } from './config/secrets'
import { getUserByUsername, getUserById } from './db/users'
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
      const username = req.body.username
      const password = req.body.password

      const user = await getUserByUsername(username)
      if (!user.username) return res.status(400).json({message: 'Invalid username or password'})

      const passwordIsValid = await validatePassword(password, user.password)
      if (passwordIsValid === false) return res.status(400).json({message: 'Invalid username or password'})

      res.cookie('userId', user.id, {signed: true})
      res.status(204).json()
    } catch (e) {
      console.error(e)
      next(e)
    }
  })

  app.post('/pub/signup', async function (req, res, next) {
    try {
      const username = req.body.username
      const password = req.body.password

      const user = await getUserByUsername(username)
      if (user.username) return res.status(400).json({message: 'Invalid username'})

      const newUser = await createUser(username, password)
      res.cookie('userId', newUser.id, {signed: true})
      res.status(201).json(newUser)
    } catch (e) {
      console.error(e)
      next(e)
    }
  })

  const publicRoot = path.join(__dirname, '..', '..', 'client')
  const publicPath = path.join(__dirname, '..', '..', 'client', 'dist')
  app.use('/dist', express.static(publicPath))
  app.get('*', (req, res) => res.sendFile(path.join(publicRoot, 'index.html')))

  return app
}

boot().then((app) => {
  app.listen(3000, function () {
    console.log('Example app listening on port 60!')
  })
})

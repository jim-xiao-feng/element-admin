import '@babel/polyfill'
import Koa from 'koa'
import bodyParser from 'koa-body'
import { user } from './routes/user'

const app = new Koa()

const start = () => {
  const host = process.env.HOST || '0.0.0.0'
  const port = process.env.PORT || 8000
  app.use(bodyParser({
    urlencoded: true
  }))
  app.use(user().routes())
  app.listen(port, host)
  console.log(`Server listening on http://${host}:${port}`)
}

start()

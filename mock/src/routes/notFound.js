import Router from 'koa-router'
import { returnValue } from '../utils'

export default () => {
  const router = new Router()
  router.all('*', (ctx, next) => {
    ctx.status = 404
    ctx.body = returnValue(49004)
  })
  return router
}

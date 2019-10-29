import Router from 'koa-router'
import {
  verifyPassword,
  getToken,
  genToken,
  verifyToken,
  returnValue
} from '../utils'

export const user = () => {
  const router = new Router()
  router.post(
    '/user/login',
    async (ctx, next) => {
      ctx.cookies.set('X-Respond-Time', new Date())
      try {
        await next()
      } catch(e) {
        ctx.status = 500 // Internal Server Error
        ctx.body = returnValue(50000)
      }
    },
    async (ctx, next) => {
      const {
        username, password
      } = ctx.request.body
      let token = getToken(ctx.request.get('authorization'))
      if (token) {
        const isTokenPass = await verifyToken(token)
        if (!isTokenPass) {
          ctx.status = 401
          ctx.body = returnValue(40001)
        } else {
          ctx.status = 200
          ctx.body = returnValue(20000, {
            token
          })
        }
      } else if (verifyPassword(username, password)) {
        token = genToken(username)
        ctx.status = 200
        ctx.body = returnValue(20000, {
          token
        })
      }
      await next()
    }
  )
  return router
}

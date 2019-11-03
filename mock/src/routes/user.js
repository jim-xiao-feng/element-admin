import Router from 'koa-router'
import {
  verifyPassword,
  getToken,
  genToken,
  verifyToken,
  returnValue,
  imageToBase64
} from '../utils'
import { select } from '../store'

export default () => {
  const router = new Router()
  router.post(
    '/user/login',
    async (ctx, next) => {
      const {
        username
      } = ctx.request.body
      ctx.cookies.set('X-Respond-Time', new Date().toDateString())
      ctx.cookies.set('username', username)
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
      } else {
        ctx.status = 401
        ctx.body = returnValue(40001)
      }
    }
  )

  router.get(
    '/user',
    async (ctx, next) => {
      let token = getToken(ctx.request.get('authorization'))
      if (token) {
        const isTokenPass = await verifyToken(token)
        if (isTokenPass) {
          await next()
        } else {
          ctx.status = 401
          ctx.body = returnValue(40001)
        }
      }
    },
    async (ctx, next) => {
      const username = ctx.cookies.get('username')
      const userInfo = select('user', username)
      if (userInfo) {
        if (userInfo.avatar) {
          userInfo.avatar = await imageToBase64(userInfo.avatar)
        }
        ctx.status = 200
        ctx.body = returnValue(20000, userInfo)
      } else {
        ctx.status = 404
        ctx.body = returnValue(40004)
      }
    }
  )
  return router
}

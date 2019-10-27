exports.user = () => {
  const Router = require('koa-router')
  const { login, tokens } = require('../fixtures/user')

  const router = new Router()
  router.post(
    '/user/login',
    (ctx, next) => {
      ctx.cookies.set('X-Respond-Time', new Date())
      next()
    },
    (ctx, next) => {
      try {
        const { username } = ctx.request.body
        const targetUser = login.filter(user => user.username === username)[0]
        if (targetUser && tokens[targetUser.username]) {
          ctx.body = {
            code: 20000,
            data: {
              token: tokens[targetUser.username].token
            }
          }
          ctx.status = 200
        } else {
          ctx.status = 401 // Unauthorized Error
          ctx.body = {
            code: 40001,
            message: "未授权"
          }
        }
      } catch(e) {
        ctx.status = 500 // Internal Server Error
        ctx.body = {
          code: 50000,
          message: "服务器内部错误"
        }
        next()
      }
    }
  )
  return router
}

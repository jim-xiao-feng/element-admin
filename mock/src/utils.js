import crypto from 'crypto'
import { statSync, readFile } from 'fs'
import jwt from 'jsonwebtoken'
import { Promise } from 'bluebird'
import config from './config'
import {
  select,
  update
} from './store'

const _hashed = (salt, password) => {
  const hmac = crypto.createHmac('sha256', salt)
  hmac.update(password)
  const hash = hmac.digest('hex')
  return hash
}

const _genJwtS3et = () => {
  const cryptoRandomString = require('crypto-random-string')
  return cryptoRandomString({
    length: 64,
    type: 'url-safe'
  })
}

export const returnValue = (code, data) => {
  let result = {
    code, data
  }
  switch (code) {
    case 20000: {
      result.message = '请求成功'
      break
    }
    case 40001: {
      result.message = '未授权或用户不存在'
      break
    }
    case 40004: {
      result.message = '无法找到用户详情'
      break
    }
    case 49004: {
      result.message = '不好意思，当前访问的资源不存在'
      break
    }
    case 50000: {
      result.message = '服务器内部错误'
      break
    }
    default: {
      result.message = '无法识别'
    }
  }
  return result
}
export const saltify = (username, password) => {
  const salt = _genJwtS3et()
  const hash = _hashed(salt, password)
  const loginUser = {
    [username]: {
      username,
      salt,
      hash
    }
  }
  update('login', username, loginUser)
}

export const verifyPassword = (username, password) => {
  const loginUser = select('login', username)
  if (loginUser) {
    const hash = _hashed(loginUser.salt, password)
    if (hash === loginUser.hash) {
      return true
    }
  }
  return false
}

export const getToken = (authHeader) => {
  if (!authHeader) {
    return undefined
  }
  const regAuth = /(Basic|Bearer|Auth0)\s(.*)/
  const regHeader = regAuth.exec(authHeader)
  const token = regHeader[2]
  return token
}

export const genToken = (username) => {
  let token = jwt.sign({
    username
  }, config.secret, {
    expiresIn: '24h'
  })
  return token
}

export const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        resolve(false)
      } else {
        resolve(decoded) // {username: "test", iat: 1572321007, exp: 1572407407}
      }
    })
  })
}

export const imageToBase64 = async (path) => {
  const readFileAsync = Promise.promisify(readFile)
  return new Promise((resolve) => {
    if (statSync(path)) {
      readFileAsync(path).then(buf => {
        resolve(buf.toString('base64'))
      }).catch(err => {
        resolve('')
      })
    } else {
      resolve('')
    }
  })
}

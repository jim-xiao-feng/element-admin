import http from '../http'

export function login(userInfo) {
  return http({
    url: '/user/login',
    method: 'post',
    data: userInfo
  })
}
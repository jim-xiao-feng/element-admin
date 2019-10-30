export const login = {
  test: { // username 作为 primary key
    username: 'test',
    salt: 'a1VEkTini-VIqklBKGVVwPh9IWTv2~Z0-h4SYcjeEpREhQTIKt0fxBWM.ZsbyK6p', // _genJwtS3et
    hash: '6501944508acd886541b92cdb8a043832f81081d69429f1e28e19bf2f246723e' // salted password: (testtest)
  },
  admin: {
    username: 'admin',
    salt: 'IxLeNvdrOURprMS~5.uwrBpegodDZVBTFimM4t062GO3xg8e4_NH1x~xOVOhNP7m',
    hash: '72a83f4ee09146a0be84dd0af460eb0464c1f460af4596465734257d9352543c' // (adminadmin)
  }
}

export const user = {
  test: { // username 作为 primary key
    ['test-user-info']: {
      name: 'test',
      intro: 'This is Test.'
    }
  },
  admin: {
    ['admin-user-info']: {
      name: 'admin',
      intro: 'This is Admin.'
    }
  }
}

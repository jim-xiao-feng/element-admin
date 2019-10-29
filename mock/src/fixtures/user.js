export const login = {
  test: { // username 作为 primary key
    username: 'test',
    salt: '6I5PpoUXQvTThp1_kAvJmgUd9vdZXqkempH6svN-QtTF~04cJGvXqLoWtVMwm0J8', // _genJwtS3et
    hash: '05f1263b80e9f7525310309bb616d84d255083a258deaea44900985df4853a09' // salted password
  },
  admin: {
    username: 'admin',
    salt: 'WBDu2ZPoAQxZhevHfnKe1x2Ji7CWXvRxGw3YsXbrrlDpktIH4CzUpIW59iP7bjc0',
    hash: 'f31b07542c9a296f379498900c3515e76ccfe5ff407b5ec1b37f46cbc41313d5'
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

module.exports = {
  apps : [{
    name: 'mock server',
    script: 'lib/index.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};

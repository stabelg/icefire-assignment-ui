const proxy = [
    {
      context: '/login',
      target: 'http://localhost:8080',
      pathRewrite: {'^/login' : 'login'}
    }
  ];
  module.exports = proxy;